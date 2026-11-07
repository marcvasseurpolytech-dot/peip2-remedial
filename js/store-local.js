// Mode démo : tout est stocké dans le navigateur (localStorage). Ne sert qu'à tester l'interface.
const K = 'peip2.demo.v1';
const read = () => { try { return JSON.parse(localStorage.getItem(K)) || { users: [], session: null, attempts: [], notes: [] }; } catch (e) { return { users: [], session: null, attempts: [], notes: [] }; } };
const write = d => localStorage.setItem(K, JSON.stringify(d));
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2));
const pub = u => (u ? { id: u.id, nom: u.nom, prenom: u.prenom, dept: u.dept, name: `${u.prenom} ${u.nom}` } : null);

export function createLocalStore() {
  let listener = null;
  const emit = (evt, u) => { if (listener) listener(evt, u); };
  const me = () => { const d = read(); return d.users.find(u => u.id === d.session) || null; };
  return {
    mode: 'demo',
    async getUser() { return pub(me()); },
    onAuth(cb) { listener = cb; },
    async classes() { return ['PEIP2 G1', 'PEIP2 G2', 'PEIP2 G3', 'PEIP2 G4']; },
    async signUp({ nom, prenom, dept, code }) {
      const d = read();
      const n = nom.trim().toUpperCase();
      if (d.users.some(u => u.nom === n)) throw new Error('Le nom « ' + n + ' » est déjà inscrit. Connecte-toi plutôt.');
      const u = { id: uid(), nom: n, prenom, dept, code };
      d.users.push(u); write(d);
      return { pending: true, student: pub(u) };
    },
    async signIn(nom, code) {
      const d = read();
      const u = d.users.find(x => x.nom === nom.trim().toUpperCase() && x.code === code);
      if (!u) throw new Error('NOM ou code incorrect.');
      d.session = u.id; write(d); emit('SIGNED_IN', pub(u));
    },
    async signOut() { const d = read(); d.session = null; write(d); emit('SIGNED_OUT', null); },
    async access() { return new Proxy({}, { get: () => true, has: () => true }); },
    async listAttempts() { const d = read(); return d.attempts.filter(a => a.user_id === d.session).sort((a, b) => b.created_at.localeCompare(a.created_at)); },
    async getAttempt(id) { const d = read(); return d.attempts.find(a => a.id === id && a.user_id === d.session) || null; },
    async addAttempt({ set_id, score, total, items }) {
      const d = read();
      const a = { id: uid(), user_id: d.session, set_id, score, total, items, created_at: new Date().toISOString() };
      d.attempts.push(a); write(d); return a;
    },
    async listNotes() { const d = read(); return d.notes.filter(n => n.user_id === d.session).sort((a, b) => b.updated_at.localeCompare(a.updated_at)); },
    async saveNote(n) {
      const d = read(); const now = new Date().toISOString();
      if (n.id) {
        const i = d.notes.findIndex(x => x.id === n.id && x.user_id === d.session);
        if (i >= 0) { d.notes[i] = { ...d.notes[i], title: n.title, body: n.body, set_id: n.set_id || null, updated_at: now }; write(d); return d.notes[i]; }
      }
      const created = { id: uid(), user_id: d.session, title: n.title, body: n.body, set_id: n.set_id || null, created_at: now, updated_at: now };
      d.notes.push(created); write(d); return created;
    },
    async deleteNote(id) { const d = read(); d.notes = d.notes.filter(n => !(n.id === id && n.user_id === d.session)); write(d); }
  };
}
