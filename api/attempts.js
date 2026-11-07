const { ghGet, update, slug, studentFrom, handler, body } = require('./_lib');

const MAX_PER_STUDENT = 2000;
const rnd = () => require('crypto').randomUUID();

function cleanItems(items) {
  if (!Array.isArray(items) || items.length === 0 || items.length > 200) return null;
  const out = [];
  for (const it of items) {
    if (!it || typeof it.id !== 'string' || it.id.length > 60) return null;
    let given = it.given == null ? null : it.given;
    if (Array.isArray(given)) given = given.slice(0, 10).map(x => String(x == null ? '' : x).slice(0, 400));
    else if (given !== null) given = String(given).slice(0, 4000);
    out.push({ id: it.id, given, ok: it.ok === true ? true : it.ok === false ? false : null, done: !!it.done });
  }
  return out;
}

module.exports = handler(async (req, res, token) => {
  const nom = studentFrom(req);
  if (!nom) return res.status(401).json({ error: 'Session expirée, reconnecte-toi.' });
  const file = `attempts/${slug(nom)}.json`;

  if (req.method === 'GET') {
    const f = await ghGet(file, token);
    const list = (f && f.data.attempts) || [];
    const id = (req.query || {}).id;
    if (id) return res.json({ attempt: list.find(a => a.id === id) || null });
    return res.json({ attempts: list.slice().sort((a, b) => b.created_at.localeCompare(a.created_at)) });
  }

  if (req.method === 'POST') {
    const b = body(req);
    const items = cleanItems(b.items);
    const score = Number(b.score), total = Number(b.total);
    if (!/^[a-z0-9-]{1,40}$/.test(String(b.set_id || '')) || !items || !Number.isInteger(score) || !Number.isInteger(total) || score < 0 || total < 0 || score > total) {
      return res.status(400).json({ error: 'Données invalides.' });
    }
    const attempt = { id: rnd(), set_id: b.set_id, score, total, items, created_at: new Date().toISOString() };
    await update(file, token, { nom, attempts: [] }, cur => {
      cur.nom = nom;
      cur.attempts.push(attempt);
      if (cur.attempts.length > MAX_PER_STUDENT) cur.attempts = cur.attempts.slice(-MAX_PER_STUDENT);
      return cur;
    }, `attempt ${nom} ${b.set_id}`);
    return res.json({ attempt });
  }

  return res.status(405).json({ error: 'Méthode non autorisée.' });
});
