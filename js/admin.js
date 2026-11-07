import { CHAPTERS, SETS, findSet } from '../data/index.js';

const app = document.getElementById('app');
const KEY = 'peip2.admin.v1';
let students = [], classes = [], results = null;
let tab = 'students';
let msg = '';
let sortKey = 'nom';

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = iso => (iso ? new Date(iso).toLocaleString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '');

function session() {
  try { const s = JSON.parse(sessionStorage.getItem(KEY)); return s && s.expires > Date.now() ? s : null; } catch (e) { return null; }
}

async function api(path, { method = 'GET', body } = {}) {
  const s = session();
  const r = await fetch(path, { method, headers: { 'Content-Type': 'application/json', ...(s ? { Authorization: 'Bearer ' + s.token } : {}) }, body: body === undefined ? undefined : JSON.stringify(body) });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) {
    if (r.status === 401 && s) { sessionStorage.removeItem(KEY); }
    throw new Error(data.error || 'Erreur ' + r.status);
  }
  return data;
}

function frame(inner) {
  const logged = !!session();
  app.innerHTML = `<header class="top"><div class="in"><a class="brand" href="admin.html">Administration<small>PEIP2 Anglais · Polytech Lille</small></a>
    ${logged ? `<nav><a href="#" data-tab="students" class="${tab === 'students' ? 'on' : ''}">Élèves</a><a href="#" data-tab="results" class="${tab === 'results' ? 'on' : ''}">Résultats</a><a href="./">Site élèves</a></nav>
    <div class="who"><button class="link" data-act="logout" style="color:#e4c77d">Déconnexion</button></div>` : ''}</div></header>
    <main>${inner}</main>
    <footer><b>MARC VASSEUR | POLYTECH LILLE</b><br>Marc Vasseur · marc.vasseur@polytech-lille.fr</footer>`;
}

function viewLogin() {
  frame(`<div class="auth card"><h1>Administration</h1>
    <form data-form="login"><label class="f">Mot de passe administrateur</label>
    <input class="t" type="password" name="pw" required autocomplete="current-password">
    ${msg ? `<div class="msg err">${esc(msg)}</div>` : ''}
    <p><button class="btn gold" style="width:100%">Entrer</button></p></form></div>`);
}

async function load() {
  const d = await api('/api/admin?resource=students');
  students = d.students; classes = d.classes;
}

function viewStudents() {
  const pending = students.filter(s => !s.approved);
  const rows = students.slice().sort((a, b) => (a.approved === b.approved ? a.nom.localeCompare(b.nom) : a.approved ? 1 : -1)).map(s => `
    <tr data-nom="${esc(s.nom)}"><td><b>${esc(s.nom)}</b> ${esc(s.prenom)}</td>
    <td><select class="t" data-act="dept" style="padding:.2rem .4rem">${(classes.includes(s.dept) ? [] : [s.dept]).concat(classes).map(c => `<option ${c === s.dept ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></td>
    <td>${s.approved ? '<span class="pill good">validé</span>' : '<span class="pill mid">en attente</span>'}</td>
    <td class="small muted">${fmt(s.createdAt)}</td>
    <td style="white-space:nowrap">${s.approved ? `<button class="btn ghost sm" data-act="unapprove">Suspendre</button>` : `<button class="btn gold sm" data-act="approve">Valider</button>`}
      <button class="btn ghost sm" data-act="reset">Nouveau code</button>
      <button class="btn ghost sm" data-act="delete">Supprimer</button></td></tr>`).join('');
  frame(`<h1>Élèves</h1>
    ${msg ? `<div class="msg info">${esc(msg)}</div>` : ''}
    <p>${students.length} compte(s), dont <b>${pending.length}</b> en attente de validation.
      ${pending.length ? '<button class="btn gold sm" data-act="approveAll">Tout valider</button>' : ''}</p>
    <div class="card" style="overflow-x:auto"><table><thead><tr><th>Élève</th><th>Classe</th><th>Statut</th><th>Inscrit le</th><th>Actions</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="5" class="muted">Aucun compte pour l\'instant.</td></tr>'}</tbody></table></div>`);
}

async function viewResults() {
  frame('<p class="muted">Chargement des résultats…</p>');
  try { results = (await api('/api/admin?resource=results')).rows; } catch (e) { frame(`<div class="msg err">${esc(e.message)}</div>`); return; }
  paintResults();
}

function paintResults() {
  const sorters = {
    nom: (a, b) => a.nom.localeCompare(b.nom), dept: (a, b) => a.dept.localeCompare(b.dept) || a.nom.localeCompare(b.nom),
    sets: (a, b) => b.sets - a.sets, avg: (a, b) => (b.avg ?? -1) - (a.avg ?? -1), last: (a, b) => String(b.last || '').localeCompare(String(a.last || ''))
  };
  const rows = results.slice().sort(sorters[sortKey]).map(r => `
    <tr><td><b>${esc(r.nom)}</b> ${esc(r.prenom)}</td><td>${esc(r.dept)}</td><td>${r.sets} / ${SETS.length}</td><td>${r.attempts}</td>
    <td>${r.avg === null ? '-' : `<span class="pill ${r.avg >= 80 ? 'good' : r.avg >= 50 ? 'mid' : 'low'}">${r.avg} %</span>`}</td><td class="small muted">${fmt(r.last)}</td></tr>`).join('');
  frame(`<h1>Résultats</h1>
    <p class="small muted">Trier par : ${[['nom', 'nom'], ['dept', 'classe'], ['sets', 'exercices faits'], ['avg', 'moyenne'], ['last', 'dernière activité']].map(([k, l]) => `<button class="link" data-sort="${k}" style="${sortKey === k ? 'font-weight:700' : ''}">${l}</button>`).join(' · ')}</p>
    <div class="card" style="overflow-x:auto"><table><thead><tr><th>Élève</th><th>Classe</th><th>Exercices différents</th><th>Tentatives</th><th>Moyenne</th><th>Dernière activité</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="6" class="muted">Aucun élève validé pour l\'instant.</td></tr>'}</tbody></table></div>`);
}

async function show() {
  if (!session()) return viewLogin();
  try {
    if (tab === 'results') return await viewResults();
    await load(); viewStudents();
  } catch (e) { if (!session()) { msg = e.message; viewLogin(); } else { frame(`<div class="msg err">${esc(e.message)}</div>`); } }
}

async function act(name, nom, extra = {}) {
  msg = '';
  try {
    const r = await api('/api/admin?resource=students', { method: 'POST', body: { action: name, nom, ...extra } });
    if (name === 'approveAll') msg = `${r.count} compte(s) validé(s).`;
    await load(); viewStudents();
  } catch (e) { msg = e.message; viewStudents(); }
}

app.addEventListener('click', async e => {
  const tabEl = e.target.closest('[data-tab]');
  if (tabEl) { e.preventDefault(); tab = tabEl.dataset.tab; msg = ''; return show(); }
  const sortEl = e.target.closest('[data-sort]');
  if (sortEl) { sortKey = sortEl.dataset.sort; return paintResults(); }
  const t = e.target.closest('[data-act]');
  if (!t) return;
  const tr = t.closest('tr');
  const nom = tr && tr.dataset.nom;
  const a = t.dataset.act;
  if (a === 'logout') { sessionStorage.removeItem(KEY); return show(); }
  if (a === 'approveAll') return act('approveAll');
  if (a === 'approve') return act('approve', nom);
  if (a === 'unapprove') return act('approve', nom, { value: false });
  if (a === 'delete') {
    if (t.dataset.armed !== '1') { t.dataset.armed = '1'; t.textContent = 'Confirmer'; return; }
    return act('delete', nom);
  }
  if (a === 'reset') {
    const cell = t.parentElement;
    if (!cell.querySelector('input')) { t.insertAdjacentHTML('afterend', ' <input class="t" data-code style="width:6ch;display:inline-block;padding:.2rem .4rem" inputmode="numeric" maxlength="4" placeholder="0000" aria-label="Nouveau code"> <button class="btn sm" data-act="resetOk">OK</button>'); cell.querySelector('input').focus(); }
    return;
  }
  if (a === 'resetOk') {
    const code = t.parentElement.querySelector('input').value.trim();
    if (!/^\d{4}$/.test(code)) { msg = 'Le code doit contenir 4 chiffres.'; return viewStudents(); }
    await act('resetCode', nom, { code });
    msg = `Nouveau code enregistré pour ${nom}.`; return viewStudents();
  }
});

app.addEventListener('change', e => {
  const t = e.target;
  if (t.dataset.act === 'dept') act('setDept', t.closest('tr').dataset.nom, { dept: t.value });
});

app.addEventListener('submit', async e => {
  e.preventDefault();
  if (e.target.dataset.form !== 'login') return;
  msg = '';
  try {
    const r = await api('/api/admin?resource=login', { method: 'POST', body: { password: e.target.elements.pw.value } });
    sessionStorage.setItem(KEY, JSON.stringify(r));
    show();
  } catch (err) { msg = err.message; viewLogin(); }
});

show();
