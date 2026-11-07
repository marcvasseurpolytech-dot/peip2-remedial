// Fonctions partagées : stockage JSON dans un dépôt GitHub privé, sessions élève et admin.
// Le soulignement initial empêche Vercel d'exposer ce fichier comme point d'entrée.
const crypto = require('crypto');

const REPO = process.env.DATA_REPO || '';                       // ex. marcvasseurpolytech-dot/toeic-entrainement-data
const PREFIX = (process.env.DATA_PREFIX || 'peip2').replace(/^\/+|\/+$/g, '');
const API = process.env.GITHUB_API_URL || 'https://api.github.com';

// Classes proposées à l'inscription (liste fermée). À adapter ici : c'est la seule source.
const CLASSES = ['PEIP2 G1', 'PEIP2 G2', 'PEIP2 G3', 'PEIP2 G4'];

const sha256hex = s => crypto.createHash('sha256').update(String(s)).digest('hex');
const safeEqual = (a, b) => {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---------- stockage GitHub ---------- */
const P = p => `${PREFIX}/${p}`;
const headers = token => ({ Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json', 'User-Agent': 'peip2-anglais' });

class StorageError extends Error {}

// Lit un fichier JSON. Renvoie null UNIQUEMENT si le fichier n'existe pas ; toute autre erreur lève
// une exception (on ne doit jamais prendre une panne pour un fichier vide, au risque de l'écraser).
async function ghGet(path, token) {
  if (!REPO) throw new StorageError('DATA_REPO non configuré');
  const r = await fetch(`${API}/repos/${REPO}/contents/${encodeURI(P(path))}`, { headers: headers(token) });
  if (r.status === 404) return null;
  if (!r.ok) throw new StorageError(`GitHub ${r.status} en lecture`);
  const d = await r.json();
  return { data: JSON.parse(Buffer.from(d.content, 'base64').toString('utf8')), sha: d.sha };
}

async function ghPut(path, content, sha, token, message) {
  const body = { message: message || `update ${path}`, content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64') };
  if (sha) body.sha = sha;
  const r = await fetch(`${API}/repos/${REPO}/contents/${encodeURI(P(path))}`, {
    method: 'PUT', headers: { ...headers(token), 'Content-Type': 'application/json' }, body: JSON.stringify(body)
  });
  return r.status;
}

async function ghDelete(path, token, message) {
  const f = await ghGet(path, token);
  if (!f) return true;
  const r = await fetch(`${API}/repos/${REPO}/contents/${encodeURI(P(path))}`, {
    method: 'DELETE', headers: { ...headers(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: message || `delete ${path}`, sha: f.sha })
  });
  return r.ok || r.status === 404;
}

// Lecture, modification, écriture avec nouvelle tentative en cas de conflit (deux écritures simultanées).
// mutate(data) reçoit la donnée actuelle (ou `fallback` si le fichier n'existe pas) et renvoie la nouvelle
// donnée, ou undefined pour ne rien écrire.
async function update(path, token, fallback, mutate, message) {
  for (let i = 0; i < 5; i++) {
    const f = await ghGet(path, token);
    const cur = f ? f.data : JSON.parse(JSON.stringify(fallback));
    const next = await mutate(cur);
    if (next === undefined) return cur;
    const st = await ghPut(path, next, f && f.sha, token, message);
    if (st === 200 || st === 201) return next;
    if (st !== 409 && st !== 422) throw new StorageError(`GitHub ${st} en écriture`);
    await sleep(150 + Math.random() * 250 * (i + 1));
  }
  throw new StorageError("Conflit d'écriture, réessaie.");
}

/* ---------- identité ---------- */
const normNom = s => String(s || '').trim().replace(/\s+/g, ' ').toUpperCase();
const slug = nom => {
  const base = normNom(nom).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'x';
  return base + '-' + sha256hex(normNom(nom)).slice(0, 6);
};

/* ---------- sessions signées ---------- */
const secret = label => process.env.SESSION_SECRET || sha256hex(label + ':' + (process.env.GITHUB_TOKEN || ''));
const sign = (label, payload) => crypto.createHmac('sha256', secret(label)).update(payload).digest('hex');
const b64 = s => Buffer.from(s, 'utf8').toString('base64url');
const unb64 = s => Buffer.from(s, 'base64url').toString('utf8');

const STUDENT_DAYS = 30;
function issueStudentToken(nom) {
  const exp = Date.now() + STUDENT_DAYS * 86400000;
  const body = `${b64(nom)}.${exp}`;
  return `${body}.${sign('student', body)}`;
}
function studentFrom(req) {
  const h = req.headers['authorization'] || '';
  const tok = h.startsWith('Bearer ') ? h.slice(7) : '';
  const [n, exp, sig] = tok.split('.');
  if (!n || !exp || !sig || !/^\d+$/.test(exp) || Number(exp) < Date.now()) return null;
  if (!safeEqual(sig, sign('student', `${n}.${exp}`))) return null;
  try { return unb64(n); } catch (e) { return null; }
}

const ADMIN_HOURS = 12;
const adminConfigured = () => /^[a-f0-9]{64}$/i.test(process.env.ADMIN_HASH || '');
const checkAdminPassword = pw => adminConfigured() && safeEqual(sha256hex(pw || ''), process.env.ADMIN_HASH.toLowerCase());
function issueAdminToken() {
  const exp = Date.now() + ADMIN_HOURS * 3600000;
  return { token: `${exp}.${sign('admin', 'admin:' + exp)}`, expires: exp };
}
function isAdmin(req) {
  const h = req.headers['authorization'] || '';
  const tok = h.startsWith('Bearer ') ? h.slice(7) : '';
  const [exp, sig] = tok.split('.');
  if (!exp || !sig || !/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  return safeEqual(sig, sign('admin', 'admin:' + exp));
}

/* ---------- limitation des essais (au mieux, par instance et par IP) ---------- */
const fails = new Map();
const ip = req => String(req.headers['x-forwarded-for'] || (req.socket && req.socket.remoteAddress) || '?').split(',')[0].trim();
const throttled = (req, key) => { const f = fails.get(key + ip(req)); return !!f && f.n >= 8 && Date.now() - f.t < 10 * 60000; };
function noteFailure(req, key) {
  const k = key + ip(req), f = fails.get(k);
  if (!f || Date.now() - f.t > 10 * 60000) fails.set(k, { n: 1, t: Date.now() }); else { f.n++; f.t = Date.now(); }
}
const clearFailures = (req, key) => fails.delete(key + ip(req));

/* ---------- réponses ---------- */
function handler(fn) {
  return async (req, res) => {
    try {
      const token = process.env.GITHUB_TOKEN;
      if (!token) return res.status(500).json({ error: 'Serveur mal configuré (GITHUB_TOKEN manquant).' });
      if (!REPO) return res.status(500).json({ error: 'Serveur mal configuré (DATA_REPO manquant).' });
      await fn(req, res, token);
    } catch (e) {
      if (e instanceof StorageError) return res.status(502).json({ error: 'Stockage indisponible : ' + e.message });
      console.error(e);
      return res.status(500).json({ error: 'Erreur du serveur.' });
    }
  };
}
const body = req => (req.body && typeof req.body === 'object' ? req.body : (() => { try { return JSON.parse(req.body || '{}'); } catch (e) { return {}; } })());

// g01-niv-a -> G01, wh-03 -> WH
const lessonOfSet = setId => { const m = /^(g\d{2}|wh)-/.exec(String(setId || '')); return m ? m[1].toUpperCase() : null; };
// Une série est ouverte si elle est ouverte à l'unité, sinon si sa leçon l'est.
const isSetOpen = (acc, setId) => {
  const d = (acc && acc.data) || {};
  const lesson = lessonOfSet(setId);
  if (!lesson) return false;
  if (d.sets && typeof d.sets[setId] === 'boolean') return d.sets[setId];
  return !!(d.lessons && d.lessons[lesson] === true);
};

module.exports = {
  lessonOfSet, isSetOpen,
  CLASSES, ghGet, ghPut, ghDelete, update, slug, normNom, sha256hex, safeEqual,
  issueStudentToken, studentFrom, checkAdminPassword, adminConfigured, issueAdminToken, isAdmin,
  throttled, noteFailure, clearFailures, handler, body, StorageError
};
