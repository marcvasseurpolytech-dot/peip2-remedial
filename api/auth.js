const { CLASSES, ghGet, update, normNom, safeEqual, issueStudentToken, studentFrom, throttled, noteFailure, clearFailures, handler, body } = require('./_lib');

const FILE = 'students.json';
const HASH = /^[a-f0-9]{64}$/i;
const pub = s => ({ nom: s.nom, prenom: s.prenom, dept: s.dept });

module.exports = handler(async (req, res, token) => {
  // Liste des classes (source unique côté serveur)
  if (req.method === 'GET' && (req.query || {}).what === 'classes') return res.json({ classes: CLASSES });

  // Vérification de session : renvoie l'élève si le compte existe toujours et est validé
  if (req.method === 'GET' && (req.query || {}).what === 'me') {
    const nom = studentFrom(req);
    if (!nom) return res.status(401).json({ error: 'Session expirée.' });
    const f = await ghGet(FILE, token);
    const s = ((f && f.data.students) || []).find(x => x.nom === nom);
    if (!s || s.approved !== true) return res.status(401).json({ error: 'Compte indisponible.' });
    return res.json({ student: pub(s) });
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée.' });
  const { action, prenom, dept, codeHash } = body(req);
  const nom = normNom(body(req).nom);
  if (!nom || nom.length < 2 || nom.length > 60 || !HASH.test(codeHash || '')) return res.status(400).json({ error: 'Données manquantes ou invalides.' });

  if (action === 'login') {
    if (throttled(req, 'login')) return res.status(429).json({ error: 'Trop d\'essais. Réessaie dans quelques minutes.' });
    const f = await ghGet(FILE, token);
    const s = ((f && f.data.students) || []).find(x => x.nom === nom);
    if (!s || !safeEqual(s.codeHash || '', codeHash.toLowerCase())) { noteFailure(req, 'login'); return res.status(401).json({ error: 'NOM ou code incorrect.' }); }
    clearFailures(req, 'login');
    if (s.approved !== true) return res.status(403).json({ error: 'Ton compte attend la validation de ton enseignant. Reviens plus tard.', pending: true });
    return res.json({ student: pub(s), token: issueStudentToken(s.nom) });
  }

  if (action === 'signup') {
    const pre = String(prenom || '').trim();
    if (!pre || pre.length > 60 || !CLASSES.includes(String(dept || ''))) return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    if (throttled(req, 'signup')) return res.status(429).json({ error: 'Trop de demandes. Réessaie plus tard.' });
    let exists = false;
    await update(FILE, token, { students: [] }, cur => {
      if (cur.students.some(x => x.nom === nom)) { exists = true; return undefined; }
      cur.students.push({ nom, prenom: pre, dept, codeHash: codeHash.toLowerCase(), approved: false, createdAt: new Date().toISOString() });
      return cur;
    }, `signup ${nom}`);
    if (exists) return res.status(409).json({ error: `Le nom « ${nom} » est déjà inscrit. Connecte-toi plutôt.` });
    noteFailure(req, 'signup');
    return res.json({ pending: true, student: { nom, prenom: pre, dept } });
  }

  return res.status(400).json({ error: 'Action inconnue.' });
});
