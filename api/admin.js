const { CLASSES, ghGet, ghDelete, update, slug, normNom, sha256hex, checkAdminPassword, adminConfigured, issueAdminToken, isAdmin, throttled, noteFailure, clearFailures, handler, body } = require('./_lib');

const FILE = 'students.json';
const HASH = /^[a-f0-9]{64}$/i;

async function mapLimit(list, n, fn) {
  const out = new Array(list.length);
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, list.length) }, async () => {
    while (i < list.length) { const k = i++; out[k] = await fn(list[k]); }
  }));
  return out;
}

module.exports = handler(async (req, res, token) => {
  const resource = (req.query || {}).resource || 'students';

  // Connexion admin : le mot de passe est vérifié ici, côté serveur.
  if (req.method === 'POST' && resource === 'login') {
    if (!adminConfigured()) return res.status(503).json({ error: "ADMIN_HASH n'est pas configuré sur Vercel." });
    if (throttled(req, 'admin')) return res.status(429).json({ error: 'Trop d\'essais. Réessaie dans quelques minutes.' });
    if (!checkAdminPassword(body(req).password)) { noteFailure(req, 'admin'); return res.status(401).json({ error: 'Mot de passe incorrect.' }); }
    clearFailures(req, 'admin');
    return res.json(issueAdminToken());
  }

  if (!isAdmin(req)) return res.status(401).json({ error: 'Accès administrateur requis.' });

  if (req.method === 'GET' && resource === 'students') {
    const f = await ghGet(FILE, token);
    const students = ((f && f.data.students) || []).map(s => ({ nom: s.nom, prenom: s.prenom, dept: s.dept, approved: s.approved === true, createdAt: s.createdAt }));
    return res.json({ students, classes: CLASSES });
  }

  if (req.method === 'POST' && resource === 'students') {
    const b = body(req);
    const nom = normNom(b.nom);
    let found = true, count = 0;
    await update(FILE, token, { students: [] }, cur => {
      if (b.action === 'approveAll') { cur.students.forEach(s => { if (s.approved !== true) { s.approved = true; count++; } }); return count ? cur : undefined; }
      const s = cur.students.find(x => x.nom === nom);
      if (!s) { found = false; return undefined; }
      if (b.action === 'approve') s.approved = b.value !== false;
      else if (b.action === 'setDept') { if (!CLASSES.includes(b.dept)) return undefined; s.dept = b.dept; }
      else if (b.action === 'resetCode') { if (!/^\d{4}$/.test(String(b.code || ''))) return undefined; s.codeHash = sha256hex(String(b.code)); }
      else if (b.action === 'delete') cur.students = cur.students.filter(x => x.nom !== nom);
      else return undefined;
      return cur;
    }, `admin ${b.action} ${nom || ''}`);
    if (!found) return res.status(404).json({ error: 'Élève introuvable.' });
    if (b.action === 'delete') { await ghDelete(`attempts/${slug(nom)}.json`, token); await ghDelete(`notes/${slug(nom)}.json`, token); }
    return res.json({ success: true, count });
  }

  // Résultats : un résumé par élève (lecture de tous les fichiers d'élèves, quelques-uns en parallèle)
  if (req.method === 'GET' && resource === 'results') {
    const f = await ghGet(FILE, token);
    const students = ((f && f.data.students) || []).filter(s => s.approved === true);
    const rows = await mapLimit(students, 8, async s => {
      const a = await ghGet(`attempts/${slug(s.nom)}.json`, token);
      const list = (a && a.data.attempts) || [];
      const bySet = {};
      let sc = 0, tot = 0, last = null;
      for (const t of list) {
        const cur = bySet[t.set_id] || (bySet[t.set_id] = { best: 0, count: 0, last: t.created_at });
        cur.count++; cur.best = Math.max(cur.best, t.total ? Math.round(100 * t.score / t.total) : 0);
        if (t.created_at > cur.last) cur.last = t.created_at;
        sc += t.score; tot += t.total;
        if (!last || t.created_at > last) last = t.created_at;
      }
      return { nom: s.nom, prenom: s.prenom, dept: s.dept, attempts: list.length, sets: Object.keys(bySet).length, avg: tot ? Math.round(100 * sc / tot) : null, last, bySet };
    });
    return res.json({ rows });
  }

  return res.status(405).json({ error: 'Méthode non autorisée.' });
});
