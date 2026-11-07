const { ghGet, update, handler, body, isAdmin } = require('./_lib');

const FILE = 'access.json';
const ID = /^G\d{2}$/;

// Leçons ouvertes : { lessons: { G01: true, ... } }. Une leçon absente du fichier est FERMÉE.
module.exports = handler(async (req, res, token) => {
  if (req.method === 'GET') {
    const f = await ghGet(FILE, token);
    const lessons = (f && f.data.lessons) || {};
    const open = {};
    for (const k of Object.keys(lessons)) if (ID.test(k) && lessons[k] === true) open[k] = true;
    return res.json({ open });
  }

  if (req.method === 'POST') {
    if (!isAdmin(req)) return res.status(401).json({ error: 'Accès administrateur requis.' });
    const b = body(req);
    // { lesson, open } pour une leçon ; { lessons: [...], open } pour plusieurs à la fois
    const ids = Array.isArray(b.lessons) ? b.lessons : [b.lesson];
    if (typeof b.open !== 'boolean' || !ids.length || ids.length > 100 || !ids.every(x => ID.test(String(x)))) return res.status(400).json({ error: 'Données invalides.' });
    let out = {};
    await update(FILE, token, { lessons: {} }, cur => {
      for (const id of ids) { if (b.open) cur.lessons[id] = true; else delete cur.lessons[id]; }
      out = { ...cur.lessons };
      return cur;
    }, `lessons ${b.open ? 'open' : 'close'} ${ids.join(',')}`);
    return res.json({ open: out });
  }

  return res.status(405).json({ error: 'Méthode non autorisée.' });
});
