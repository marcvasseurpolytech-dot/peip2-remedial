const { ghGet, update, slug, studentFrom, handler, body } = require('./_lib');

const MAX_NOTES = 300, MAX_BODY = 30000, MAX_TITLE = 200;
const rnd = () => require('crypto').randomUUID();

module.exports = handler(async (req, res, token) => {
  const nom = studentFrom(req);
  if (!nom) return res.status(401).json({ error: 'Session expirée, reconnecte-toi.' });
  const file = `notes/${slug(nom)}.json`;

  if (req.method === 'GET') {
    const f = await ghGet(file, token);
    const list = (f && f.data.notes) || [];
    return res.json({ notes: list.slice().sort((a, b) => b.updated_at.localeCompare(a.updated_at)) });
  }

  if (req.method === 'POST') {
    const b = body(req);
    const title = String(b.title == null ? '' : b.title).slice(0, MAX_TITLE);
    const text = String(b.body == null ? '' : b.body);
    if (text.length > MAX_BODY) return res.status(413).json({ error: `Note trop longue (${MAX_BODY} caractères maximum).` });
    const set_id = b.set_id && /^[a-z0-9-]{1,40}$/.test(String(b.set_id)) ? String(b.set_id) : null;
    const now = new Date().toISOString();
    let saved = null, full = false;
    await update(file, token, { nom, notes: [] }, cur => {
      cur.nom = nom;
      const i = b.id ? cur.notes.findIndex(n => n.id === b.id) : -1;
      if (i >= 0) { cur.notes[i] = { ...cur.notes[i], title, body: text, set_id, updated_at: now }; saved = cur.notes[i]; }
      else {
        if (cur.notes.length >= MAX_NOTES) { full = true; return undefined; }
        saved = { id: rnd(), title, body: text, set_id, created_at: now, updated_at: now };
        cur.notes.push(saved);
      }
      return cur;
    }, `note ${nom}`);
    if (full) return res.status(409).json({ error: 'Carnet plein : supprime d\'anciennes notes.' });
    return res.json({ note: saved });
  }

  if (req.method === 'DELETE') {
    const id = (req.query || {}).id;
    if (!id) return res.status(400).json({ error: 'Identifiant manquant.' });
    await update(file, token, { nom, notes: [] }, cur => { const n = cur.notes.length; cur.notes = cur.notes.filter(x => x.id !== id); return cur.notes.length === n ? undefined : cur; }, `delete note ${nom}`);
    return res.json({ success: true });
  }

  return res.status(405).json({ error: 'Méthode non autorisée.' });
});
