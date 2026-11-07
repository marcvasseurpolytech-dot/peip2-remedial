import { CHAPTERS, SETS, findSet } from '../data/index.js';
import { msgTextEn } from './i18n.js';

const app = document.getElementById('app');
const KEY = 'peip2.admin.v1';
let students = [], classes = [], results = null;
let tab = 'students';
let msg = '';
let sortKey = 'nom';

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = iso => (iso ? new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '');

function session() {
  try { const s = JSON.parse(sessionStorage.getItem(KEY)); return s && s.expires > Date.now() ? s : null; } catch (e) { return null; }
}

async function api(path, { method = 'GET', body } = {}) {
  const s = session();
  const r = await fetch(path, { method, headers: { 'Content-Type': 'application/json', ...(s ? { Authorization: 'Bearer ' + s.token } : {}) }, body: body === undefined ? undefined : JSON.stringify(body) });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) {
    if (r.status === 401 && s) { sessionStorage.removeItem(KEY); }
    throw new Error(msgTextEn(data.error || 'Erreur ' + r.status));
  }
  return data;
}

function frame(inner) {
  const logged = !!session();
  app.innerHTML = `<header class="top"><div class="in"><a class="brand" href="admin.html">Administration<small>PEIP2 English · Polytech Lille</small></a>
    ${logged ? `<nav><a href="#" data-tab="students" class="${tab === 'students' ? 'on' : ''}">Students</a><a href="#" data-tab="lessons" class="${tab === 'lessons' ? 'on' : ''}">Lessons</a><a href="#" data-tab="results" class="${tab === 'results' ? 'on' : ''}">Results</a><a href="./">Student site</a></nav>
    <div class="who"><button class="link" data-act="logout" style="color:#e4c77d">Sign out</button></div>` : ''}</div></header>
    <main>${inner}</main>
    <footer><b>MARC VASSEUR | POLYTECH LILLE</b><br>Marc Vasseur · marc.vasseur@polytech-lille.fr</footer>`;
}

function viewLogin() {
  frame(`<div class="auth card"><h1>Administration</h1>
    <form data-form="login"><label class="f">Administrator password</label>
    <input class="t" type="password" name="pw" required autocomplete="current-password">
    ${msg ? `<div class="msg err">${esc(msg)}</div>` : ''}
    <p><button class="btn gold" style="width:100%">Enter</button></p></form></div>`);
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
    <td>${s.approved ? '<span class="pill good">approved</span>' : '<span class="pill mid">pending</span>'}</td>
    <td class="small muted">${fmt(s.createdAt)}</td>
    <td style="white-space:nowrap">${s.approved ? `<button class="btn ghost sm" data-act="unapprove">Suspend</button>` : `<button class="btn gold sm" data-act="approve">Approve</button>`}
      <button class="btn ghost sm" data-act="reset">New code</button>
      <button class="btn ghost sm" data-act="delete">Delete</button></td></tr>`).join('');
  frame(`<h1>Students</h1>
    ${msg ? `<div class="msg info">${esc(msg)}</div>` : ''}
    <p>${students.length} account(s), of which <b>${pending.length}</b> awaiting approval.
      <button class="btn gold sm" data-act="approveAll" ${pending.length ? '' : 'disabled'}>Approve all pending (${pending.length})</button>
      ${students.length ? '<button class="btn ghost sm" data-act="deleteAll" style="float:right;color:#9b1c1c;border-color:#9b1c1c">Delete all accounts</button>' : ''}</p>
    <div class="card" style="overflow-x:auto"><table><thead><tr><th>Student</th><th>Class</th><th>Status</th><th>Registered on</th><th>Actions</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="5" class="muted">No accounts yet.</td></tr>'}</tbody></table></div>`);
}

let expanded = new Set();   // chapitres dont la liste des séries est déployée
async function viewLessons() {
  frame('<p class="muted">Loading lessons…</p>');
  let acc;
  try { acc = await api('/api/access'); } catch (e) { frame(`<div class="msg err">${esc(e.message)}</div>`); return; }
  const open = acc.open || {}, sets = acc.sets || {};
  const isOpen = (set, ch) => (typeof sets[set.id] === 'boolean' ? sets[set.id] : !!open[ch.id]);
  const cards = CHAPTERS.map(ch => {
    const n = ch.sets.filter(st => isOpen(st, ch)).length;
    const status = n === ch.sets.length ? '<span class="pill good">all open</span>' : n === 0 ? '<span class="pill low">closed</span>' : `<span class="pill mid">${n} of ${ch.sets.length} open</span>`;
    const rows = ch.sets.map(st => `<tr data-set="${esc(st.id)}"><td>${esc((st.en && st.en.title) || st.title)}</td><td class="small muted">${st.items.length} questions</td>
      <td>${isOpen(st, ch) ? '<span class="pill good">open</span>' : '<span class="pill low">closed</span>'}</td>
      <td>${isOpen(st, ch) ? '<button class="btn ghost sm" data-act="setClose">Close</button>' : '<button class="btn gold sm" data-act="setOpen">Open</button>'}</td></tr>`).join('');
    return `<div class="card" data-lesson="${esc(ch.id)}" style="margin-bottom:.8rem">
      <div style="display:flex;flex-wrap:wrap;gap:.6rem;align-items:center;justify-content:space-between">
        <div><b>${esc(ch.id)}</b> · ${esc((ch.en && ch.en.title) || ch.title)} <span class="small muted">· ${ch.sets.reduce((k, st) => k + st.items.length, 0)} questions</span> ${status}</div>
        <div style="display:flex;gap:.4rem"><button class="btn gold sm" data-act="lessonOpen"${n === ch.sets.length ? ' disabled' : ''}>Open all</button><button class="btn ghost sm" data-act="lessonClose"${n === 0 ? ' disabled' : ''}>Close all</button></div></div>
      <details data-exp="${esc(ch.id)}"${expanded.has(ch.id) ? ' open' : ''} style="margin-top:.5rem"><summary class="small">Exercises (${ch.sets.length}): open them one by one</summary>
        <table style="margin-top:.4rem"><thead><tr><th>Exercise</th><th>Size</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></details></div>`;
  }).join('');
  frame(`<h1>Lessons</h1>
    ${msg ? `<div class="msg info">${esc(msg)}</div>` : ''}
    <p class="small muted">Students only see what you open. You can open a whole lesson at once (Open all) or each exercise one by one, which is handy when a lesson is new. Use is unlimited while an exercise is open. Closing hides it from students; their history and notes are kept.</p>
    <p><button class="btn gold sm" data-act="lessonOpenAll">Open everything</button> <button class="btn ghost sm" data-act="lessonCloseAll">Close everything</button></p>
    ${cards}`);
}

async function setLessons(ids, open) {
  msg = '';
  try { await api('/api/access', { method: 'POST', body: { lessons: ids, open } }); msg = open ? `Opened: ${ids.join(', ')}.` : `Closed: ${ids.join(', ')}.`; } catch (e) { msg = e.message; }
  viewLessons();
}
async function setSetsOpen(ids, open) {
  msg = '';
  try { await api('/api/access', { method: 'POST', body: { sets: ids, open } }); msg = open ? `Exercise opened.` : `Exercise closed.`; } catch (e) { msg = e.message; }
  viewLessons();
}

// Double confirmation : un premier clic pour continuer, puis il faut taper YES.
function confirmYes(message, onConfirm) {
  const back = document.createElement('div');
  back.style.cssText = 'position:fixed;inset:0;background:rgba(10,18,40,.6);display:flex;align-items:center;justify-content:center;z-index:50;padding:1rem';
  const close = () => back.remove();
  const step1 = () => {
    back.innerHTML = `<div class="card" style="max-width:30rem;background:#fff"><h3>Are you sure?</h3><p>${esc(message)}</p><p><b>This cannot be undone.</b></p>
      <p style="display:flex;gap:.6rem;justify-content:flex-end"><button class="btn ghost sm" data-m="cancel">Cancel</button><button class="btn sm" data-m="next" style="background:#9b1c1c;color:#fff">Continue</button></p></div>`;
  };
  const step2 = () => {
    back.innerHTML = `<div class="card" style="max-width:30rem;background:#fff"><h3>Second confirmation</h3><p>Type <b>YES</b> in capital letters to confirm.</p>
      <input class="t" data-m="yes" autocomplete="off" placeholder="YES" style="font-family:var(--mono)">
      <p style="display:flex;gap:.6rem;justify-content:flex-end"><button class="btn ghost sm" data-m="cancel">Cancel</button><button class="btn sm" data-m="go" disabled style="background:#9b1c1c;color:#fff">Delete</button></p></div>`;
    const inp = back.querySelector('input'), go = back.querySelector('[data-m=go]');
    inp.focus();
    inp.addEventListener('input', () => { go.disabled = inp.value !== 'YES'; });
    inp.addEventListener('keydown', ev => { if (ev.key === 'Enter' && inp.value === 'YES') { close(); onConfirm(); } });
  };
  back.addEventListener('click', ev => {
    const m = ev.target.closest('[data-m]');
    if (ev.target === back || (m && m.dataset.m === 'cancel')) return close();
    if (m && m.dataset.m === 'next') return step2();
    if (m && m.dataset.m === 'go') { close(); onConfirm(); }
  });
  step1();
  document.body.appendChild(back);
}

async function viewResults() {
  frame('<p class="muted">Loading results…</p>');
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
  frame(`<h1>Results</h1>
    <p class="small muted">Sort by: ${[['nom', 'name'], ['dept', 'class'], ['sets', 'exercise sets done'], ['avg', 'average'], ['last', 'last activity']].map(([k, l]) => `<button class="link" data-sort="${k}" style="${sortKey === k ? 'font-weight:700' : ''}">${l}</button>`).join(' · ')}</p>
    <div class="card" style="overflow-x:auto"><table><thead><tr><th>Student</th><th>Class</th><th>Different exercise sets</th><th>Attempts</th><th>Average</th><th>Last activity</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="6" class="muted">No approved student yet.</td></tr>'}</tbody></table></div>`);
}

async function show() {
  if (!session()) return viewLogin();
  try {
    if (tab === 'lessons') return await viewLessons();
    if (tab === 'results') return await viewResults();
    await load(); viewStudents();
  } catch (e) { if (!session()) { msg = e.message; viewLogin(); } else { frame(`<div class="msg err">${esc(e.message)}</div>`); } }
}

async function act(name, nom, extra = {}) {
  msg = '';
  try {
    const r = await api('/api/admin?resource=students', { method: 'POST', body: { action: name, nom, ...extra } });
    if (name === 'approveAll') msg = `${r.count} account(s) approved.`;
    if (name === 'deleteAll') msg = `${r.count} account(s) deleted.`;
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
  const lessonEl = t.closest('[data-lesson]');
  const lesson = lessonEl && lessonEl.dataset.lesson;
  const a = t.dataset.act;
  if (a === 'logout') { sessionStorage.removeItem(KEY); return show(); }
  if (a === 'approveAll') return act('approveAll');
  if (a === 'approve') return act('approve', nom);
  if (a === 'unapprove') return act('approve', nom, { value: false });
  if (a === 'setOpen') return setSetsOpen([t.closest('tr').dataset.set], true);
  if (a === 'setClose') return setSetsOpen([t.closest('tr').dataset.set], false);
  if (a === 'lessonOpen') return setLessons([lesson], true);
  if (a === 'lessonClose') return setLessons([lesson], false);
  if (a === 'lessonOpenAll') return setLessons(CHAPTERS.map(c => c.id), true);
  if (a === 'lessonCloseAll') return setLessons(CHAPTERS.map(c => c.id), false);
  if (a === 'delete') return confirmYes(`Delete the account of ${nom}, with their exercise history and notes?`, () => act('delete', nom, { confirm: 'YES' }));
  if (a === 'deleteAll') return confirmYes(`Delete ALL ${students.length} accounts, with their exercise history and notes?`, async () => { await act('deleteAll', undefined, { confirm: 'YES' }); });
  if (a === 'reset') {
    const cell = t.parentElement;
    if (!cell.querySelector('input')) { t.insertAdjacentHTML('afterend', ' <input class="t" data-code style="width:6ch;display:inline-block;padding:.2rem .4rem" inputmode="numeric" maxlength="4" placeholder="0000" aria-label="New code"> <button class="btn sm" data-act="resetOk">OK</button>'); cell.querySelector('input').focus(); }
    return;
  }
  if (a === 'resetOk') {
    const code = t.parentElement.querySelector('input').value.trim();
    if (!/^\d{4}$/.test(code)) { msg = 'The code must be 4 digits.'; return viewStudents(); }
    await act('resetCode', nom, { code });
    msg = `New code saved for ${nom}.`; return viewStudents();
  }
});

// mémorise les chapitres déployés pour qu'ils le restent après chaque action
app.addEventListener('toggle', e => { const d = e.target; if (d.dataset && d.dataset.exp) { if (d.open) expanded.add(d.dataset.exp); else expanded.delete(d.dataset.exp); } }, true);

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
