// Stockage réel : fonctions Vercel (/api/*) qui écrivent dans un dépôt GitHub privé.
const KEY = 'peip2.session.v1';

async function sha256Hex(s) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(s)));
  return [...new Uint8Array(d)].map(x => x.toString(16).padStart(2, '0')).join('');
}
const readSession = () => { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } };
const writeSession = s => { try { if (s) localStorage.setItem(KEY, JSON.stringify(s)); else localStorage.removeItem(KEY); } catch (e) { /* stockage indisponible */ } };
const toUser = s => (s ? { id: s.nom, nom: s.nom, prenom: s.prenom, dept: s.dept, name: `${s.prenom} ${s.nom}` } : null);

export function createApiStore() {
  let listener = null;
  const emit = (evt, u) => { if (listener) listener(evt, u); };

  async function call(path, { method = 'GET', body, auth = true, keepalive = false } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    const sess = readSession();
    if (auth && sess) headers.Authorization = 'Bearer ' + sess.token;
    let r;
    try { r = await fetch(path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body), keepalive }); }
    catch (e) { throw new Error('Connexion impossible. Vérifie ton réseau et réessaie.'); }
    let data = {};
    try { data = await r.json(); } catch (e) { /* réponse vide */ }
    if (!r.ok) {
      if (auth && r.status === 401 && sess) { writeSession(null); emit('SIGNED_OUT', null); }
      const err = new Error(data.error || `Erreur ${r.status}`);
      err.status = r.status; err.pending = !!data.pending;
      throw err;
    }
    return data;
  }

  return {
    mode: 'api',
    async classes() { return (await call('/api/auth?what=classes', { auth: false })).classes; },
    async getUser() {
      const sess = readSession();
      if (!sess) return null;
      try {
        const { student } = await call('/api/auth?what=me');
        writeSession({ ...sess, student });
        return toUser(student);
      } catch (e) {
        if (e.status === 401) return null;
        return toUser(sess.student); // hors ligne : on garde la session locale
      }
    },
    onAuth(cb) { listener = cb; },
    async signUp({ nom, prenom, dept, code }) {
      return call('/api/auth', { method: 'POST', auth: false, body: { action: 'signup', nom, prenom, dept, codeHash: await sha256Hex(code) } });
    },
    async signIn(nom, code) {
      const r = await call('/api/auth', { method: 'POST', auth: false, body: { action: 'login', nom, codeHash: await sha256Hex(code) } });
      writeSession({ token: r.token, student: r.student });
      emit('SIGNED_IN', toUser(r.student));
    },
    async signOut() { writeSession(null); emit('SIGNED_OUT', null); },
    async access() { return (await call('/api/access', { auth: false })).open; },
    async listAttempts() { return (await call('/api/attempts')).attempts; },
    async getAttempt(id) { return (await call('/api/attempts?id=' + encodeURIComponent(id))).attempt; },
    async addAttempt(a) { return (await call('/api/attempts', { method: 'POST', body: a })).attempt; },
    async listNotes() { return (await call('/api/notes')).notes; },
    async saveNote(n) { return (await call('/api/notes', { method: 'POST', body: n, keepalive: true })).note; },
    async deleteNote(id) { await call('/api/notes?id=' + encodeURIComponent(id), { method: 'DELETE' }); }
  };
}
