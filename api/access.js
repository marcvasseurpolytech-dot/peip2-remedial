const { ghGet, update, handler, body, isAdmin, lessonOfSet } = require('./_lib');

const FILE = 'access.json';
const ID = /^(G\d{2}|WH)$/;
const SET_ID = /^(g\d{2}|wh)-[a-z0-9-]{1,30}$/;

// Fichier : { lessons: { G01: true }, sets: { 'g01-niv-a': true | false } }
// Une série suit sa leçon (ouverte si la leçon l'est), sauf si elle a un réglage à elle (true ou false).
// Rien dans le fichier : tout est FERMÉ.
const clean = d => {
  const open = {}, sets = {};
  for (const k of Object.keys((d && d.lessons) || {})) if (ID.test(k) && d.lessons[k] === true) open[k] = true;
  for (const k of Object.keys((d && d.sets) || {})) if (SET_ID.test(k) && typeof d.sets[k] === 'boolean') sets[k] = d.sets[k];
  return { open, sets };
};

module.exports = handler(async (req, res, token) => {
  if (req.method === 'GET') {
    const f = await ghGet(FILE, token);
    return res.json(clean(f && f.data));
  }

  if (req.method === 'POST') {
    if (!isAdmin(req)) return res.status(401).json({ error: 'Accès administrateur requis.' });
    const b = body(req);
    if (typeof b.open !== 'boolean') return res.status(400).json({ error: 'Données invalides.' });
    let out = {};
    if (Array.isArray(b.sets)) {
      // Séries une par une : { sets: [ids], open }
      if (!b.sets.length || b.sets.length > 400 || !b.sets.every(x => SET_ID.test(String(x)))) return res.status(400).json({ error: 'Données invalides.' });
      await update(FILE, token, { lessons: {}, sets: {} }, cur => {
        cur.sets = cur.sets || {};
        for (const id of b.sets) {
          const lessonOpen = !!(cur.lessons && cur.lessons[lessonOfSet(id)] === true);
          if (b.open === lessonOpen) delete cur.sets[id]; else cur.sets[id] = b.open; // pas de réglage inutile
        }
        out = clean(cur);
        return cur;
      }, `sets ${b.open ? 'open' : 'close'} ${b.sets.length}`);
    } else {
      // Leçons entières : { lesson | lessons: [ids], open } ; les réglages à l'unité de ces leçons sont effacés
      const ids = Array.isArray(b.lessons) ? b.lessons : [b.lesson];
      if (!ids.length || ids.length > 100 || !ids.every(x => ID.test(String(x)))) return res.status(400).json({ error: 'Données invalides.' });
      await update(FILE, token, { lessons: {}, sets: {} }, cur => {
        cur.lessons = cur.lessons || {}; cur.sets = cur.sets || {};
        for (const id of ids) {
          if (b.open) cur.lessons[id] = true; else delete cur.lessons[id];
          for (const k of Object.keys(cur.sets)) if (lessonOfSet(k) === id) delete cur.sets[k];
        }
        out = clean(cur);
        return cur;
      }, `lessons ${b.open ? 'open' : 'close'} ${ids.join(',')}`);
    }
    return res.json(out);
  }

  return res.status(405).json({ error: 'Méthode non autorisée.' });
});
