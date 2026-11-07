import { CHAPTERS, SETS, findSet, findChapter } from '../data/index.js';
import { gradeItem, hasAnswer, expectedText, isScored } from './check.js';
import { createStore } from './store.js';
import { L, getLang, setLang, locale, lz, msgText } from './i18n.js';

const store = createStore();
const app = document.getElementById('app');
let user = null;
let classes = null;
let attemptsCache = null;
let run = null; // exercice en cours : { set, given, res, revealed, hints }
let notesState = null;
let accessCache = null; // ouvertures décidées par l'enseignant : { open: { G01: true }, sets: { 'g01-niv-a': false } }

/* ---------- utilitaires ---------- */
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pct = a => (a.total ? Math.round((100 * a.score) / a.total) : 0);
const pillClass = p => (p >= 80 ? 'good' : p >= 50 ? 'mid' : 'low');
const fmtDate = iso => new Date(iso).toLocaleString(locale(), { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const firstName = () => (user && user.prenom ? user.prenom : '');
const scoredItems = set => set.items.filter(isScored);

async function getAttempts(force) {
  if (force || !attemptsCache) attemptsCache = await store.listAttempts();
  return attemptsCache;
}

// Une série est ouverte si l'enseignant l'a ouverte seule, sinon si son chapitre l'est.
const setIsOpen = (acc, set) => (typeof acc.sets[set.id] === 'boolean' ? acc.sets[set.id] : !!acc.open[set.chapter]);
const chapterIsOpen = (acc, ch) => ch.sets.some(s => setIsOpen(acc, s));
async function getAccess(force) {
  if (force || !accessCache) accessCache = await store.access();
  return accessCache;
}
const closedNotice = back => `<h1>${L('Leçon fermée', 'Lesson closed')}</h1><p>${L("Cette leçon n'est pas ouverte pour le moment. Ton enseignant l'ouvrira quand ce sera le moment.", 'This lesson is not open at the moment. Your teacher will open it when the time comes.')}</p><p><a href="#/">${L('Retour au tableau de bord', 'Back to the dashboard')}</a></p>`;

function bestBySet(attempts) {
  const m = new Map();
  for (const a of attempts) {
    const cur = m.get(a.set_id) || { best: -1, count: 0, last: a.created_at };
    cur.count++;
    cur.best = Math.max(cur.best, pct(a));
    if (a.created_at > cur.last) cur.last = a.created_at;
    m.set(a.set_id, cur);
  }
  return m;
}

/* ---------- brouillons (reprise d'un exercice interrompu) ---------- */
const draftKey = setId => 'peip2.draft.' + user.id + '.' + setId;
function saveDraft() {
  if (!run) return;
  try { localStorage.setItem(draftKey(run.set.id), JSON.stringify({ given: run.given, res: run.res, revealed: run.revealed })); } catch (e) { /* stockage indisponible */ }
}
function loadDraft(setId) {
  try { return JSON.parse(localStorage.getItem(draftKey(setId))); } catch (e) { return null; }
}
function clearDraft(setId) { try { localStorage.removeItem(draftKey(setId)); } catch (e) { /* ignore */ } }
function listDrafts() {
  const out = [];
  try {
    const prefix = 'peip2.draft.' + user.id + '.';
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) {
        const set = findSet(k.slice(prefix.length));
        const d = JSON.parse(localStorage.getItem(k));
        if (set && d && Object.keys(d.res || {}).length) out.push({ set, done: Object.keys(d.res).length });
      }
    }
  } catch (e) { /* ignore */ }
  return out;
}

/* ---------- gabarit général ---------- */
function shell(inner, active) {
  document.title = L('PEIP2 Anglais · Polytech Lille', 'PEIP2 English · Polytech Lille');
  const demo = store.mode === 'demo'
    ? `<div class="demo">${L("Mode démo : les données restent dans ce navigateur, rien n'est envoyé au serveur.", 'Demo mode: your data stays in this browser, nothing is sent to the server.')}</div>` : '';
  const nav = user ? `
    <nav>
      <a href="#/" class="${active === 'home' ? 'on' : ''}">${L('Tableau de bord', 'Dashboard')}</a>
      <a href="#/history" class="${active === 'history' ? 'on' : ''}">${L('Historique', 'History')}</a>
      <a href="#/notes" class="${active === 'notes' ? 'on' : ''}">${L('Carnet de corrections', 'Correction notebook')}</a>
    </nav>` : '';
  const who = `<div class="who">${user ? `${esc(user.name)} <button class="link" data-act="logout" style="color:#e4c77d">${L('Déconnexion', 'Sign out')}</button> ` : ''}</div>`;
  return `${demo}
  <header class="top"><div class="in">
    <a class="brand" href="#/">${L('PEIP2 Anglais', 'PEIP2 English')}<small>${L('Remédiation', 'Remedial classes')} · Polytech Lille</small></a>${nav}${who}
  </div></header>
  <main>${inner}</main>
  <footer><b>MARC VASSEUR | POLYTECH LILLE</b><br>Marc Vasseur · <a href="mailto:marc.vasseur@polytech-lille.fr" style="color:#e4c77d">marc.vasseur@polytech-lille.fr</a><br><a href="/admin" style="color:#c9cfdd;opacity:.6;font-size:.75rem">Admin</a></footer>`;
}

function setApp(html, active) { app.innerHTML = shell(html, active); window.scrollTo(0, 0); }

/* ---------- authentification ---------- */
let authTab = 'in';
let authDraft = { nom: '', prenom: '', dept: '' };
async function viewAuth(msg) {
  const signup = authTab === 'up';
  if (signup && !classes) { try { classes = await store.classes(); } catch (e) { classes = []; msg = msg || e.message; } }
  const cls = (classes || []).map(c => `<option value="${esc(c)}" ${c === authDraft.dept ? 'selected' : ''}>${esc(c)}</option>`).join('');
  const isOk = msg && msg.startsWith('ok:');
  const shown = msg ? (isOk ? msg.replace(/^ok:/, '') : msgText(msg)) : '';
  setApp(`<div class="auth card">
    <h1>${L("Exercices d'anglais", 'English exercises')}</h1>
    <p class="muted">${L('Connecte-toi pour retrouver tes exercices, ton historique et ton carnet de corrections.', 'Sign in to find your exercises, your history and your correction notebook.')}</p>
    <div class="tabs"><button data-act="tab" data-tab="in" class="${signup ? '' : 'on'}">${L('Connexion', 'Sign in')}</button><button data-act="tab" data-tab="up" class="${signup ? 'on' : ''}">${L('Créer un compte', 'Create an account')}</button></div>
    <form data-form="${signup ? 'signup' : 'signin'}">
      ${signup ? `<label class="f">${L('Prénom', 'First name')}</label><input class="t" name="prenom" required autocomplete="given-name" value="${esc(authDraft.prenom)}">` : ''}
      <label class="f">${L('NOM', 'SURNAME')}</label><input class="t" name="nom" required autocomplete="family-name" value="${esc(authDraft.nom)}" style="text-transform:uppercase">
      ${signup ? `<label class="f">${L('Classe', 'Class')}</label><select class="t" name="dept" required><option value="">${L('Choisis ta classe', 'Choose your class')}</option>${cls}</select>` : ''}
      <label class="f">${L('Code à 4 chiffres', '4-digit code')}${signup ? L(' (invente-le et retiens-le)', ' (make it up and remember it)') : ''}</label>
      <input class="t" type="password" name="code" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" required autocomplete="off" placeholder="••••">
      ${signup ? `<label class="f">${L('Confirme ton code', 'Confirm your code')}</label><input class="t" type="password" name="code2" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" required autocomplete="off" placeholder="••••">` : ''}
      ${msg ? `<div class="msg ${isOk ? 'info' : 'err'}">${esc(shown)}</div>` : ''}
      <p><button class="btn gold" style="width:100%">${signup ? L('Créer mon compte', 'Create my account') : L('Me connecter', 'Sign in')}</button></p>
      <p class="small muted">${signup ? L('Ton compte sera actif après validation par ton enseignant.', 'Your account will be active once your teacher has approved it.') : L('Code oublié ? Demande à ton enseignant de le réinitialiser.', 'Forgotten your code? Ask your teacher to reset it.')}</p>
    </form></div>`);
}

/* ---------- tableau de bord ---------- */
async function viewHome() {
  setApp(`<p class="muted">${L('Chargement…', 'Loading…')}</p>`, 'home');
  const attempts = await getAttempts();
  const open = await getAccess(true);
  const best = bestBySet(attempts);
  const totalScore = attempts.reduce((s, a) => s + a.score, 0);
  const totalMax = attempts.reduce((s, a) => s + a.total, 0);
  const avg = totalMax ? Math.round((100 * totalScore) / totalMax) : null;
  const drafts = listDrafts().filter(d => setIsOpen(open, d.set));
  const chapters = CHAPTERS.map(ch => {
    const done = ch.sets.filter(s => best.has(s.id)).length;
    const p = Math.round((100 * done) / ch.sets.length);
    if (!chapterIsOpen(open, ch)) return `<div class="card" style="opacity:.65"><h3>${esc(ch.id)} · ${esc(lz(ch).title)}</h3>
      <p class="small muted">${L("Pas encore ouverte. Ton enseignant l'ouvrira bientôt.", 'Not open yet. Your teacher will open it soon.')}</p></div>`;
    return `<div class="card"><h3>${esc(ch.id)} · ${esc(lz(ch).title)}</h3>
      <div class="bar" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><i style="width:${p}%"></i></div>
      <p class="small muted">${L(`${done} exercice(s) sur ${ch.sets.length} déjà faits`, `${done} of ${ch.sets.length} exercise sets already done`)}</p>
      <a class="btn gold" href="#/chapter/${esc(ch.id)}">${L('Ouvrir le chapitre', 'Open the chapter')}</a></div>`;
  }).join('');
  const recent = attempts.slice(0, 5).map(a => {
    const set = findSet(a.set_id);
    return `<tr><td>${fmtDate(a.created_at)}</td><td>${esc(set ? lz(set).title : a.set_id)}</td><td><span class="pill ${pillClass(pct(a))}">${a.score}/${a.total}</span></td><td><a href="#/attempt/${esc(a.id)}">${L('Revoir', 'Review')}</a></td></tr>`;
  }).join('');
  setApp(`
    <h1>${L('Bonjour', 'Hello')} ${esc(firstName())}</h1>
    <div class="grid g4" style="margin:1rem 0 1.4rem">
      <div class="card stat"><div class="n">${best.size}</div><div class="l">${L('exercices différents faits', 'different exercise sets done')}</div></div>
      <div class="card stat"><div class="n">${attempts.length}</div><div class="l">${L('tentatives au total', 'attempts in total')}</div></div>
      <div class="card stat"><div class="n">${avg === null ? '-' : avg + ' %'}</div><div class="l">${L('score moyen', 'average score')}</div></div>
      <div class="card stat"><div class="n" style="font-size:1.1rem;padding-top:.5rem">${attempts[0] ? fmtDate(attempts[0].created_at) : L('Pas encore', 'Not yet')}</div><div class="l">${L('dernière activité', 'last activity')}</div></div>
    </div>
    ${drafts.length ? `<div class="card" style="margin-bottom:1.4rem"><h3>${L('À reprendre', 'Resume')}</h3>${drafts.map(d => `<div class="setrow"><div><span class="t">${esc(lz(d.set).title)}</span><div class="d">${L(`${d.done} réponse(s) déjà vérifiée(s)`, `${d.done} answer(s) already checked`)}</div></div><a class="btn" href="#/ex/${esc(d.set.id)}">${L('Reprendre', 'Resume')}</a></div>`).join('')}</div>` : ''}
    <h2>${L('Chapitres', 'Chapters')}</h2><div class="grid g2" style="margin-bottom:1.6rem">${chapters}</div>
    <h2>${L('Derniers exercices', 'Recent exercises')}</h2>
    <div class="card">${attempts.length ? `<table><thead><tr><th>Date</th><th>${L('Exercice', 'Exercise')}</th><th>Score</th><th></th></tr></thead><tbody>${recent}</tbody></table><p class="small"><a href="#/history">${L("Tout l'historique", 'Full history')}</a></p>` : `<p class="muted">${L("Rien pour l'instant. Ouvre un chapitre et lance ton premier exercice.", 'Nothing yet. Open a chapter and start your first exercise.')}</p>`}</div>
    <p style="margin-top:1.4rem"><a class="btn ghost" href="#/notes">${L('Ouvrir mon carnet de corrections', 'Open my correction notebook')}</a></p>`, 'home');
}

/* ---------- chapitre ---------- */
async function viewChapter(id) {
  const ch0 = findChapter(id);
  if (!ch0) return viewNotFound();
  const open = await getAccess(true);
  if (!chapterIsOpen(open, ch0)) { setApp(closedNotice(), 'home'); return; }
  const ch = lz(ch0);
  const attempts = await getAttempts();
  const best = bestBySet(attempts);
  const r = ch.recap;
  const rows = (arr) => arr.map(([a, b]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join('');
  const mk = L('Marqueurs :', 'Time markers:');
  // Rappel de cours générique : blocks (titre, formes, emplois, marqueurs), tables (titre, lignes), notes, règle.
  const blocks = r.blocks || [r.simple, r.cont];
  const tables = r.tables || [{ title: L("Verbes d'état (jamais au continu dans ce sens)", 'Stative verbs (never in the continuous in this sense)'), rows: r.stative }];
  const notes = r.notes || [r.trap];
  const recap = `<details class="card recap" style="margin-bottom:1.2rem"><summary>${L('Rappel de cours', 'Course recap')}</summary>
    <div class="grid g2" style="margin-top:.8rem">
      ${blocks.map(x => `<div><h3>${esc(x.title)}</h3>${x.forms && x.forms.length ? `<table><tbody>${rows(x.forms)}</tbody></table>` : ''}
        ${x.uses && x.uses.length ? `<ul class="clean">${x.uses.map(u => `<li>${esc(u)}</li>`).join('')}</ul>` : ''}${x.marks ? `<p class="small"><b>${mk}</b> ${esc(x.marks)}</p>` : ''}</div>`).join('')}
    </div>
    ${tables.map(x => `<h3>${esc(x.title)}</h3><table><tbody>${rows(x.rows)}</tbody></table>`).join('')}
    ${notes.map(n => `<p class="small">${esc(n)}</p>`).join('')}<p><b>${esc(r.rule)}</b></p>
    ${ch.coursUrl ? `<p class="small"><a href="${esc(ch.coursUrl)}" target="_blank" rel="noopener">${L('Ouvrir le cours complet en diaporama', 'Open the full course slideshow (in French)')}</a></p>` : ''}</details>`;
  const sets = ch.sets.map(lz);
  const groups = [...new Set(sets.map(s => s.group))];
  const list = groups.map(g => `<div class="grouphead">${esc(g)}</div><div class="card">${sets.filter(s => s.group === g).map(s => {
    const b = best.get(s.id);
    const dr = loadDraft(s.id);
    const hasDraft = dr && Object.keys(dr.res || {}).length;
    if (!setIsOpen(open, s)) return `<div class="setrow" style="opacity:.6"><div><span class="t">${esc(s.title)}</span><span class="badge">${esc(s.level)}</span>
      <div class="d">${L("Pas encore ouvert. Ton enseignant l'ouvrira bientôt.", 'Not open yet. Your teacher will open it soon.')}</div></div><span class="pill low">${L('Fermé', 'Closed')}</span></div>`;
    return `<div class="setrow"><div><span class="t">${esc(s.title)}</span><span class="badge">${esc(s.level)}</span>
      <div class="d">${esc(s.desc)} · ${s.items.length} question(s)</div></div>
      <div style="display:flex;gap:.6rem;align-items:center">${b ? `<span class="pill ${pillClass(b.best)}" title="${L('Meilleur score', 'Best score')}">${b.best} %</span><span class="small muted">${b.count}×</span>` : ''}
      <a class="btn ${b ? 'ghost' : 'gold'} sm" href="#/ex/${esc(s.id)}">${hasDraft ? L('Reprendre', 'Resume') : b ? L('Refaire', 'Redo') : L('Commencer', 'Start')}</a></div></div>`;
  }).join('')}</div>`).join('');
  setApp(`<p class="crumbs"><a href="#/">${L('Tableau de bord', 'Dashboard')}</a> / ${esc(ch.id)}</p><h1>${esc(ch.id)} · ${esc(ch.title)}</h1>${recap}${list}`, 'home');
}

/* ---------- affichage d'un exercice ---------- */
// Phrase avec le groupe de mots à interroger souligné (champ u).
function underlined(it) {
  const s = it.s, u = it.u;
  const i = u ? s.indexOf(u) : -1;
  if (i < 0) return esc(s);
  return esc(s.slice(0, i)) + '<u class="ul">' + esc(u) + '</u>' + esc(s.slice(i + u.length));
}
function plain(it) {
  if (it.t === 'free' || it.t === 'essay') return (it.instr ? it.instr + ' ' : '') + it.s;
  const sent = it.u && it.s.includes(it.u) ? it.s.replace(it.u, '[' + it.u + ']') : it.s;
  return (it.instr && !it.fix ? it.instr + ' ' : '') + sent.replace(/\n/g, ' ');
}
function givenText(it, g) {
  if (g == null) return '';
  if (it.t === 'cloze') return g.join(' / ');
  if (it.t === 'choice') return it.o[Number(g)] || '';
  return String(g);
}

function clozeHTML(it, given, disabled, results) {
  let gi = 0;
  const lines = esc(it.s).replace(/___/g, () => {
    const i = gi++;
    const v = given ? given[i] || '' : '';
    const cls = results ? (results[i] ? 'good' : 'bad') : '';
    return `<input class="gap ${cls}" data-item="${esc(it.id)}" data-g="${i}" value="${esc(v)}" ${disabled ? 'disabled' : ''} style="width:${Math.max(10, v.length + 2)}ch" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="${L('Réponse', 'Answer')} ${i + 1}">`;
  });
  return `<div class="sent">${lines.replace(/\n/g, '<br>')}</div>`;
}

function choiceHTML(it, given, disabled, ok) {
  const sent = esc(it.s).replace('___', '<span class="blank">&nbsp;&nbsp;&nbsp;</span>');
  const opts = it.o.map((o, i) => {
    const sel = given != null && String(given) === String(i);
    let cls = sel ? 'sel' : '';
    if (disabled) { if (i === it.c) cls += ' good'; else if (sel) cls += ' bad'; }
    return `<label class="${cls}"><input type="radio" name="r-${esc(it.id)}" data-item="${esc(it.id)}" value="${i}" ${sel ? 'checked' : ''} ${disabled ? 'disabled' : ''}>${esc(o)}</label>`;
  }).join('');
  return `<div class="sent">${sent}</div><div class="opts ${disabled ? 'done' : ''}">${opts}</div>`;
}

function feedbackHTML(it, res, given) {
  if (it.t === 'free' || it.t === 'essay') {
    const alts = it.m.slice(1);
    const verdict = it.t === 'essay' ? '' : res && res.ok === true ? `<div class="verdict">${L("✓ Tu l'avais bon", '✓ You got it right')}</div>` : res && res.ok === false ? `<div class="verdict">${L('À revoir', 'Review this')}</div>` : '';
    return `<div class="fb ${res && res.ok === true ? 'ok' : res && res.ok === false ? 'ko' : 'neutral'}" aria-live="polite">${verdict}
      <p><span class="lbl">${it.t === 'essay' ? L('Exemple', 'Example') : L('Modèle', 'Model')}</span><span class="${it.isTr ? 'mono' : ''}">${esc(it.m[0])}</span></p>
      ${alts.map(a => `<p class="small"><span class="lbl">${L('Autre version', 'Another version')}</span><span class="mono">${esc(a)}</span></p>`).join('')}
      ${it.why ? `<p>${esc(it.why)}</p>` : ''}</div>`;
  }
  const ok = res && res.ok;
  const neutral = !res;
  let variants = '';
  if (it.t === 'cloze') {
    const v = it.a.map(alts => alts.slice(1)).filter(x => x.length).map(x => x.join(L(' ou ', ' or ')));
    if (v.length) variants = `<p class="small"><span class="lbl">${L('Aussi accepté', 'Also accepted')}</span><span class="mono">${esc(v.join(' ; '))}</span></p>`;
  } else if (it.t === 'text' && !it.ok && it.a.length > 1) {
    variants = `<p class="small"><span class="lbl">${L('Aussi accepté', 'Also accepted')}</span><span class="mono">${esc(it.a.slice(1).join('  |  '))}</span></p>`;
  }
  const mine = !ok && given != null && givenText(it, given) ? `<p><span class="lbl">${L('Ta réponse', 'Your answer')}</span><span class="mono">${esc(givenText(it, given))}</span></p>` : '';
  return `<div class="fb ${neutral ? 'neutral' : ok ? 'ok' : 'ko'}" aria-live="polite">
    ${neutral ? '' : `<div class="verdict">${ok ? '✓ Correct' : L('✗ Pas tout à fait', '✗ Not quite')}</div>`}
    ${mine}
    <p><span class="lbl">${L('Réponse attendue', 'Expected answer')}</span><span class="mono">${esc(expectedText(it).replace(/\n/g, ' / '))}</span></p>
    ${variants}
    <p>${esc(it.why)}</p>
    ${getLang() === 'fr' && it.fr ? `<p><span class="lbl">En français</span><em>${esc(it.fr)}</em></p>` : ''}</div>`;
}

function itemHTML(rawIt, idx, st, review) {
  const it = lz(rawIt);
  const given = st.given[it.id];
  const res = st.res[it.id];
  const checked = res !== undefined;
  const disabled = review || checked;
  let body = '';
  let actions = '';
  const hintShown = st.hints && st.hints[it.id];
  if (it.t === 'cloze') body = clozeHTML(it, given, disabled, checked ? gradeItem(it, given || []).gaps : null);
  else if (it.t === 'choice') body = choiceHTML(it, given, disabled);
  else if (it.t === 'text') body = `<div class="quote">${underlined(it)}</div><input class="t wide" data-item="${esc(it.id)}" value="${esc(given || '')}" ${disabled ? 'disabled' : ''} placeholder="${it.fix ? L('Ta phrase corrigée, ou Correct', 'Your corrected sentence, or Correct') : L('Ta réponse', 'Your answer')}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" style="font-family:var(--mono)">`;
  else body = `${it.s ? `<div class="quote">${esc(it.s)}</div>` : ''}
    <textarea class="t ans" data-item="${esc(it.id)}" ${disabled ? 'disabled' : ''} placeholder="${L('Écris ta réponse ici', 'Write your answer here')}">${esc(given || '')}</textarea>`;

  if (!review) {
    if (!checked) {
      if (it.t === 'free' || it.t === 'essay') {
        const shown = st.revealed && st.revealed[it.id];
        actions = shown ? '' : `<button class="btn sm" data-act="reveal" data-item="${esc(it.id)}">${it.t === 'essay' ? L('Voir un exemple', 'See an example') : L('Voir le modèle', 'See the model')}</button>`;
      } else actions = `<button class="btn sm" data-act="check" data-item="${esc(it.id)}">${L('Vérifier', 'Check')}</button>`;
      if (it.hint) actions += ` <button class="link small" data-act="hint" data-item="${esc(it.id)}">${hintShown ? L('Masquer', 'Hide') : L('Indice', 'Hint')}</button>`;
    }
  }
  let fb = '';
  if (checked) fb = feedbackHTML(it, res, given);
  else if (st.revealed && st.revealed[it.id] && (it.t === 'free' || it.t === 'essay')) {
    fb = feedbackHTML(it, null, given) + (it.t === 'essay'
      ? `<div class="actions"><button class="btn sm gold" data-act="self" data-v="done" data-item="${esc(it.id)}">${L("J'ai terminé", "I'm done")}</button></div>`
      : `<div class="actions"><span class="small muted">${L('Compare avec ta réponse :', 'Compare with your answer:')}</span><button class="btn sm gold" data-act="self" data-v="1" data-item="${esc(it.id)}">${L("Je l'avais bon", 'I got it right')}</button><button class="btn sm ghost" data-act="self" data-v="0" data-item="${esc(it.id)}">${L('À revoir', 'Review this')}</button></div>`);
  } else if (review && !checked) fb = feedbackHTML(it, null, given);
  const cls = checked ? (res.ok === true ? 'ok' : res.ok === false ? 'ko' : '') : '';
  return `<article class="item ${cls}" data-id="${esc(it.id)}">
    <div class="num">${idx + 1}. ${review && !checked ? L('non traité', 'not attempted') : ''}</div>
    ${it.instr ? `<div class="instr">${esc(it.instr)}</div>` : ''}
    ${body}
    ${actions ? `<div class="actions">${actions}</div>` : ''}
    ${hintShown && !checked ? `<div class="hintline">${esc(it.hint)}</div>` : ''}
    ${fb}
    <div class="actions"><button class="link small" data-act="tonote" data-item="${esc(it.id)}">${L('Envoyer cette phrase dans mon carnet pour réviser', 'Send this sentence to my notes for revision')}</button></div></article>`;
}

function liveScore() {
  const items = scoredItems(run.set);
  const ok = items.filter(it => run.res[it.id] && run.res[it.id].ok === true).length;
  const done = run.set.items.filter(it => run.res[it.id] !== undefined).length;
  return { ok, total: items.length, done, all: run.set.items.length };
}

function updateRunHead() {
  const s = liveScore();
  const el = document.getElementById('runhead');
  if (!el) return;
  el.querySelector('[data-role=prog]').textContent = L(`${s.done} / ${s.all} traité(s)`, `${s.done} / ${s.all} done`);
  el.querySelector('[data-role=score]').textContent = L(`Score provisoire : ${s.ok} / ${s.total}`, `Provisional score: ${s.ok} / ${s.total}`);
  el.querySelector('.bar > i').style.width = Math.round((100 * s.done) / s.all) + '%';
  const fin = document.getElementById('finishNote');
  if (fin) fin.textContent = s.done < s.all ? L(`Il reste ${s.all - s.done} question(s) non traitée(s). Elles compteront comme non réussies.`, `${s.all - s.done} question(s) left. They will count as not passed.`) : L('Tout est traité. Tu peux enregistrer.', 'Everything is done. You can save.');
}

async function viewExercise(setId) {
  const set = findSet(setId);
  if (!set) return viewNotFound();
  const open = await getAccess(true);
  if (!setIsOpen(open, set)) { run = null; setApp(closedNotice(), 'home'); return; }
  if (!run || run.set.id !== setId) {
    const d = loadDraft(setId) || {};
    run = { set, given: d.given || {}, res: d.res || {}, revealed: d.revealed || {}, hints: {}, confirm: false };
  }
  const ch = findChapter(set.chapter);
  const ls = lz(set);
  setApp(`<p class="crumbs"><a href="#/">${L('Tableau de bord', 'Dashboard')}</a> / <a href="#/chapter/${esc(ch.id)}">${esc(ch.id)}</a> / ${esc(ls.title)}</p>
    <h1>${esc(ls.title)} <span class="badge">${esc(ls.level)}</span></h1>
    <p class="muted">${esc(ls.desc)}</p>
    <div class="runhead" id="runhead"><div class="row"><span data-role="prog"></span><span data-role="score"></span></div>
      <div class="bar" style="margin-top:.4rem"><i style="width:0"></i></div></div>
    <div id="items">${set.items.map((it, i) => itemHTML(it, i, run, false)).join('')}</div>
    <div class="finish"><button class="btn gold" data-act="finish" id="finishBtn">${L('Terminer et enregistrer', 'Finish and save')}</button>
      <span class="small muted" id="finishNote"></span></div>
    <p class="small muted">${L("Tes réponses sont conservées si tu quittes la page. Rien n'est enregistré dans ton historique avant de cliquer sur « Terminer et enregistrer ».", 'Your answers are kept if you leave the page. Nothing is saved in your history until you click "Finish and save".')}</p>`, 'home');
  updateRunHead();
  document.querySelectorAll('.gap').forEach(g => { g.style.width = Math.max(10, g.value.length + 2) + 'ch'; });
}

function rerenderItem(it) {
  const el = document.querySelector(`.item[data-id="${CSS.escape(it.id)}"]`);
  if (!el) return;
  const idx = run.set.items.indexOf(it);
  const tmp = document.createElement('div');
  tmp.innerHTML = itemHTML(it, idx, run, false);
  el.replaceWith(tmp.firstElementChild);
  updateRunHead();
}

function readGiven(it) {
  const root = document.querySelector(`.item[data-id="${CSS.escape(it.id)}"]`);
  if (!root) return null;
  if (it.t === 'cloze') return [...root.querySelectorAll('.gap')].map(i => i.value);
  if (it.t === 'choice') { const r = root.querySelector('input[type=radio]:checked'); return r ? r.value : null; }
  const f = root.querySelector('textarea, input.wide');
  return f ? f.value : '';
}

function doCheck(it) {
  const given = readGiven(it);
  run.given[it.id] = given;
  if (!hasAnswer(it, given)) {
    const root = document.querySelector(`.item[data-id="${CSS.escape(it.id)}"]`);
    let n = root.querySelector('.needs');
    if (!n) { n = document.createElement('div'); n.className = 'hintline needs'; n.textContent = it.t === 'choice' ? L('Choisis une réponse.', 'Choose an answer.') : L('Complète tous les champs avant de vérifier.', 'Fill in every field before checking.'); root.appendChild(n); }
    return;
  }
  run.res[it.id] = { ok: gradeItem(it, given).ok };
  saveDraft();
  rerenderItem(it);
}

async function finishRun() {
  const set = run.set;
  const left = set.items.filter(it => run.res[it.id] === undefined).length;
  if (left && !run.confirm) {
    run.confirm = true;
    const b = document.getElementById('finishBtn');
    b.textContent = L(`Enregistrer quand même (${left} non traitée${left > 1 ? 's' : ''})`, `Save anyway (${left} unanswered)`);
    return;
  }
  const b = document.getElementById('finishBtn');
  b.disabled = true; b.textContent = L('Enregistrement…', 'Saving…');
  const items = set.items.map(it => {
    const r = run.res[it.id];
    return { id: it.id, given: run.given[it.id] === undefined ? null : run.given[it.id], ok: r ? r.ok : false, done: !!r };
  });
  const score = scoredItems(set).filter(it => run.res[it.id] && run.res[it.id].ok === true).length;
  try {
    const a = await store.addAttempt({ set_id: set.id, score, total: scoredItems(set).length, items });
    clearDraft(set.id);
    attemptsCache = null;
    run = null;
    location.hash = '#/attempt/' + a.id;
  } catch (e) {
    b.disabled = false; b.textContent = L('Terminer et enregistrer', 'Finish and save');
    const n = document.getElementById('finishNote');
    n.textContent = L("L'enregistrement a échoué : ", 'Saving failed: ') + msgText(e.message || e) + L(' Tes réponses sont conservées, réessaie.', ' Your answers are kept, please try again.');
  }
}

/* ---------- revue d'une tentative ---------- */
async function viewAttempt(id) {
  setApp(`<p class="muted">${L('Chargement…', 'Loading…')}</p>`, 'history');
  const a = await store.getAttempt(id);
  if (!a) return viewNotFound();
  const set = findSet(a.set_id);
  if (!set) { setApp(`<h1>${L('Exercice introuvable', 'Exercise not found')}</h1><p>${L("Cet exercice n'existe plus dans la version actuelle du site.", 'This exercise no longer exists in the current version of the site.')}</p><p><a href="#/history">${L("Retour à l'historique", 'Back to history')}</a></p>`, 'history'); return; }
  const st = { given: {}, res: {}, hints: {}, revealed: {} };
  for (const it of a.items) { st.given[it.id] = it.given; if (it.done) st.res[it.id] = { ok: it.ok }; }
  const p = pct(a);
  const missed = a.items.filter(x => x.ok === false);
  const lset = lz(set);
  setApp(`<p class="crumbs"><a href="#/history">${L('Historique', 'History')}</a> / ${esc(lset.title)}</p>
    <h1>${esc(lset.title)}</h1>
    <div class="card" style="display:flex;gap:1.6rem;align-items:center;flex-wrap:wrap;margin-bottom:1.2rem">
      <div><div class="score">${a.score}<span style="font-size:1.4rem;color:var(--mute)"> / ${a.total}</span></div><div class="small muted">${p} % · ${fmtDate(a.created_at)}</div></div>
      <div style="display:flex;gap:.6rem;flex-wrap:wrap">
        <a class="btn gold" href="#/ex/${esc(set.id)}" data-act="retry" data-set="${esc(set.id)}">${L('Refaire cet exercice', 'Redo this exercise')}</a>
        ${missed.length ? `<button class="btn" data-act="tonotes" data-attempt="${esc(a.id)}">${L('Reporter mes erreurs dans mon carnet', 'Copy my mistakes to my notebook')}</button>` : ''}
        <a class="btn ghost" href="#/chapter/${esc(set.chapter)}">${L('Retour au chapitre', 'Back to the chapter')}</a>
      </div></div>
    ${set.items.map((it, i) => itemHTML(it, i, st, true)).join('')}`, 'history');
  window.__attempt = a;
}

// Ajoute une phrase au carnet : une note « Révisions » par série, qui s'allonge au fil des ajouts.
async function sentenceToNotes(itemId, btn) {
  const setId = itemId.split('.')[0];
  const set = findSet(setId);
  const raw = set && set.items.find(x => x.id === itemId);
  if (!raw) return;
  const it = lz(raw);
  const n = set.items.indexOf(raw) + 1;
  // état de la phrase : exercice en cours ou revue d'une tentative
  let given = null, done = false;
  if (run && run.set.id === setId) { given = run.given[itemId]; done = run.res[itemId] !== undefined || !!(run.revealed && run.revealed[itemId]); }
  else if (window.__attempt && window.__attempt.set_id === setId) {
    const rec = window.__attempt.items.find(x => x.id === itemId);
    if (rec) { given = rec.given; done = !!rec.done; }
  }
  const co = L(' : ', ': ');
  const first = `${n}. ${plain(it)}`;
  const lines = [first];
  if (done) {
    const mine = givenText(it, given);
    if (mine) lines.push(`   ${L('Ma réponse', 'My answer')}${co}${mine}`);
    lines.push(`   ${L('Réponse attendue', 'Expected answer')}${co}${expectedText(it).replace(/\n/g, ' / ')}`);
    if (it.why) lines.push(`   ${L('À retenir', 'Rule')}${co}${it.why}`);
    if (getLang() === 'fr' && it.fr) lines.push(`   En français${co}${it.fr}`);
  }
  const title = L('Révisions : ', 'Revision: ') + lz(set).title;
  const old = btn.textContent;
  btn.disabled = true;
  try {
    const notes = await store.listNotes();
    const cur = notes.find(x => x.set_id === setId && /^(Revision|Révisions?)\b/.test(x.title || ''));
    if (cur && cur.body.includes(first)) { btn.textContent = L('Déjà dans ton carnet', 'Already in your notes'); }
    else {
      const block = lines.join('\n');
      await store.saveNote({ id: cur ? cur.id : undefined, title: cur ? cur.title : title, body: cur && cur.body.trim() ? cur.body.replace(/\s+$/, '') + '\n\n' + block : block, set_id: setId });
      btn.textContent = L('✓ Ajoutée à ton carnet', '✓ Added to your notes');
    }
  } catch (e) {
    btn.textContent = msgText(e.message || e);
  }
  setTimeout(() => { btn.disabled = false; btn.textContent = old; }, 2500);
}

async function attemptToNotes(attemptId) {
  const a = window.__attempt && window.__attempt.id === attemptId ? window.__attempt : await store.getAttempt(attemptId);
  const set = findSet(a.set_id);
  const co = L(' : ', ': ');
  const lines = [`${L('Exercice', 'Exercise')}${co}${lz(set).title}`, `Date${co}${fmtDate(a.created_at)}`, `Score${co}${a.score} / ${a.total}`, ''];
  let n = 0;
  for (const rec of a.items) {
    if (rec.ok !== false) continue;
    const it = set.items.find(x => x.id === rec.id);
    if (!it) continue;
    n++;
    const li = lz(it);
    lines.push(`${n}. ${plain(li)}`);
    lines.push(`   ${L('Ma réponse', 'My answer')}${co}${givenText(li, rec.given) || L('(pas de réponse)', '(no answer)')}`);
    lines.push(`   ${L('Réponse attendue', 'Expected answer')}${co}${expectedText(li).replace(/\n/g, ' / ')}`);
    lines.push(`   ${L('Ma correction, avec mes mots :', 'My correction, in my own words:')}`);
    lines.push('');
  }
  const note = await store.saveNote({ title: L('Corrections : ', 'Corrections: ') + lz(set).title, body: lines.join('\n'), set_id: set.id });
  location.hash = '#/notes/' + note.id;
}

/* ---------- historique ---------- */
async function viewHistory() {
  setApp(`<p class="muted">${L('Chargement…', 'Loading…')}</p>`, 'history');
  const attempts = await getAttempts(true);
  const filter = sessionStorage.getItem('peip2.hfilter') || '';
  const shown = filter ? attempts.filter(a => a.set_id === filter) : attempts;
  const usedSets = [...new Set(attempts.map(a => a.set_id))].map(findSet).filter(Boolean);
  setApp(`<h1>${L('Mon historique', 'My history')}</h1>
    <div class="card">
      ${attempts.length ? `<p><label class="small muted">${L('Filtrer :', 'Filter:')} <select class="t" style="width:auto;display:inline-block" data-act="hfilter"><option value="">${L('Tous les exercices', 'All exercises')}</option>${usedSets.map(s => `<option value="${esc(s.id)}" ${s.id === filter ? 'selected' : ''}>${esc(lz(s).title)}</option>`).join('')}</select></label></p>
      <table><thead><tr><th>Date</th><th>${L('Exercice', 'Exercise')}</th><th>Score</th><th>${L('Pourcentage', 'Percentage')}</th><th></th></tr></thead><tbody>
      ${shown.map(a => { const set = findSet(a.set_id); return `<tr><td>${fmtDate(a.created_at)}</td><td>${esc(set ? lz(set).title : a.set_id)}</td><td><span class="pill ${pillClass(pct(a))}">${a.score}/${a.total}</span></td><td>${pct(a)} %</td><td><a href="#/attempt/${esc(a.id)}">${L('Revoir', 'Review')}</a></td></tr>`; }).join('')}
      </tbody></table>` : `<p class="muted">${L("Ton historique est vide pour l'instant.", 'Your history is empty for now.')}</p>`}
    </div>`, 'history');
}

/* ---------- carnet de corrections ---------- */
async function viewNotes(currentId) {
  setApp(`<p class="muted">${L('Chargement…', 'Loading…')}</p>`, 'notes');
  const notes = await store.listNotes();
  notesState = { notes, id: null, timer: null, pending: null };
  const cur = notes.find(n => n.id === currentId) || (currentId ? null : notes[0]) || null;
  notesState.id = cur ? cur.id : null;
  const sets = SETS.map(s => `<option value="${esc(s.id)}">${esc(s.chapter)} · ${esc(lz(s).title)}</option>`).join('');
  setApp(`<h1>${L('Carnet de corrections', 'Correction notebook')}</h1>
    <p class="muted">${L('Écris ici tes corrections, tes règles et tes pièges. Tout est enregistré automatiquement et tu peux y revenir quand tu veux.', 'Write your corrections, rules and pitfalls here. Everything is saved automatically and you can come back whenever you like.')}</p>
    <p><button class="btn gold" data-act="newnote">${L('Nouvelle note', 'New note')}</button></p>
    <div class="notes"><div class="nlist" id="nlist"></div>
    <div class="card" id="neditor">${cur ? '' : `<p class="muted">${L("Aucune note pour l'instant. Crée ta première note, ou reporte tes erreurs depuis l'historique d'un exercice.", 'No notes yet. Create your first note, or copy your mistakes from the history of an exercise.')}</p>`}</div></div>`, 'notes');
  paintNoteList();
  if (cur) {
    document.getElementById('neditor').innerHTML = `
      <label class="f" style="margin-top:0">${L('Titre', 'Title')}</label><input class="t" id="ntitle" value="${esc(cur.title)}">
      <label class="f">${L('Exercice lié (facultatif)', 'Linked exercise (optional)')}</label><select class="t" id="nset"><option value="">${L('Aucun', 'None')}</option>${sets}</select>
      <label class="f">Note</label><textarea class="t big" id="nbody">${esc(cur.body)}</textarea>
      <p class="actions"><span class="save" id="nsave">${L('Enregistré', 'Saved')}</span><span style="flex:1"></span>
      <button class="btn ghost sm" data-act="delnote">${L('Supprimer cette note', 'Delete this note')}</button></p>`;
    document.getElementById('nset').value = cur.set_id || '';
  }
}

function paintNoteList() {
  const el = document.getElementById('nlist');
  if (!el) return;
  el.innerHTML = notesState.notes.map(n => `<a class="nitem ${n.id === notesState.id ? 'on' : ''}" href="#/notes/${esc(n.id)}"><span class="nt">${esc(n.title || L('Sans titre', 'Untitled'))}</span><span class="nd">${fmtDate(n.updated_at)}</span></a>`).join('');
}

async function flushNote() {
  if (notesState && notesState.pending) { clearTimeout(notesState.timer); await notesState.pending(); }
}

function scheduleNoteSave() {
  const status = document.getElementById('nsave');
  if (status) status.textContent = L('Modifications en attente…', 'Changes pending…');
  clearTimeout(notesState.timer);
  const id = notesState.id;
  const doSave = async () => {
    notesState.pending = null;
    if (!document.getElementById('ntitle')) return;
    try {
      const saved = await store.saveNote({ id, title: document.getElementById('ntitle').value, body: document.getElementById('nbody').value, set_id: document.getElementById('nset').value });
      const i = notesState.notes.findIndex(n => n.id === id);
      if (i >= 0) notesState.notes[i] = saved;
      notesState.notes.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
      paintNoteList();
      const s2 = document.getElementById('nsave');
      if (s2) s2.textContent = L('Enregistré à ', 'Saved at ') + new Date().toLocaleTimeString(locale(), { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      const s2 = document.getElementById('nsave');
      if (s2) s2.textContent = L("Échec de l'enregistrement : ", 'Saving failed: ') + msgText(e.message || e) + L(' (réessaie en modifiant le texte)', ' (try again by editing the text)');
    }
  };
  notesState.pending = doSave;
  notesState.timer = setTimeout(doSave, 1500);
}

/* ---------- page introuvable ---------- */
function viewNotFound() { setApp(`<h1>${L('Page introuvable', 'Page not found')}</h1><p><a href="#/">${L('Retour au tableau de bord', 'Back to the dashboard')}</a></p>`, 'home'); }

/* ---------- routeur ---------- */
async function render() {
  const parts = (location.hash.replace(/^#/, '') || '/').split('/').filter(Boolean);
  await flushNote();
  if (!user) { viewAuth(); return; }
  try {
    if (parts.length === 0) return await viewHome();
    if (parts[0] === 'chapter') return await viewChapter(parts[1]);
    if (parts[0] === 'ex') return await viewExercise(parts[1]);
    if (parts[0] === 'attempt') return await viewAttempt(parts[1]);
    if (parts[0] === 'history') return await viewHistory();
    if (parts[0] === 'notes') return await viewNotes(parts[1]);
    return viewNotFound();
  } catch (e) {
    setApp(`<h1>${L('Un problème est survenu', 'Something went wrong')}</h1><div class="msg err">${esc(msgText(e.message || e))}</div><p><a href="#/">${L('Retour au tableau de bord', 'Back to the dashboard')}</a></p>`);
  }
}

/* ---------- événements ---------- */
app.addEventListener('click', async e => {
  const t = e.target.closest('[data-act]');
  if (!t) return;
  const act = t.dataset.act;
  const item = t.dataset.item && run ? run.set.items.find(i => i.id === t.dataset.item) : null;
  if (act === 'lang') {
    const f = app.querySelector('form[data-form]');
    if (f && !user) authDraft = { nom: (f.elements.nom ? f.elements.nom.value : '').toUpperCase(), prenom: f.elements.prenom ? f.elements.prenom.value : '', dept: f.elements.dept ? f.elements.dept.value : '' };
    setLang(getLang() === 'en' ? 'fr' : 'en');
    render();
  }
  else if (act === 'tab') { authTab = t.dataset.tab; viewAuth(); }
  else if (act === 'logout') { await store.signOut(); }
  else if (act === 'tonote') sentenceToNotes(t.dataset.item, t);
  else if (act === 'check' && item) doCheck(item);
  else if (act === 'hint' && item) { run.hints[item.id] = !run.hints[item.id]; rerenderItem(item); }
  else if (act === 'reveal' && item) { run.given[item.id] = readGiven(item); run.revealed[item.id] = true; saveDraft(); rerenderItem(item); }
  else if (act === 'self' && item) {
    run.res[item.id] = { ok: t.dataset.v === 'done' ? null : t.dataset.v === '1', self: true };
    saveDraft(); rerenderItem(item);
  }
  else if (act === 'finish') finishRun();
  else if (act === 'retry') { run = null; clearDraft(t.dataset.set); }
  else if (act === 'tonotes') { t.disabled = true; t.textContent = L('Création de la note…', 'Creating the note…'); await attemptToNotes(t.dataset.attempt); }
  else if (act === 'newnote') {
    const n = await store.saveNote({ title: L('Nouvelle note', 'New note'), body: '', set_id: null });
    location.hash = '#/notes/' + n.id;
  }
  else if (act === 'delnote') {
    if (t.dataset.armed !== '1') { t.dataset.armed = '1'; t.textContent = L('Confirmer la suppression', 'Confirm deletion'); return; }
    await store.deleteNote(notesState.id);
    const same = location.hash === '#/notes';
    location.hash = '#/notes';
    if (same) render();
  }
});

app.addEventListener('change', e => {
  const t = e.target;
  if (t.dataset && t.dataset.act === 'hfilter') { sessionStorage.setItem('peip2.hfilter', t.value); viewHistory(); return; }
  if (t.id === 'nset') { scheduleNoteSave(); return; }
  if (t.type === 'radio' && run) {
    const it = run.set.items.find(i => i.id === t.dataset.item);
    if (it) {
      run.given[it.id] = t.value; saveDraft();
      t.closest('.opts').querySelectorAll('label').forEach(l => l.classList.toggle('sel', l.contains(t)));
    }
  }
});

app.addEventListener('input', e => {
  const t = e.target;
  if (t.id === 'ntitle' || t.id === 'nbody') { scheduleNoteSave(); return; }
  if (t.classList && t.classList.contains('gap')) t.style.width = Math.max(10, t.value.length + 2) + 'ch';
  if (run && t.dataset && t.dataset.item) {
    const it = run.set.items.find(i => i.id === t.dataset.item);
    if (it && (t.classList.contains('gap') || t.matches('textarea, input.wide'))) {
      run.given[it.id] = readGiven(it);
      const n = t.closest('.item').querySelector('.needs'); if (n) n.remove();
      saveDraft();
    }
  }
});

app.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const t = e.target;
  if (!run || !t.dataset || !t.dataset.item || t.tagName === 'TEXTAREA') return;
  const it = run.set.items.find(i => i.id === t.dataset.item);
  if (!it) return;
  e.preventDefault();
  if (t.classList.contains('gap')) {
    const gaps = [...t.closest('.item').querySelectorAll('.gap')];
    const next = gaps[gaps.indexOf(t) + 1];
    if (next && !next.value.trim()) { next.focus(); return; }
  }
  doCheck(it);
});

app.addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target;
  const kind = f.dataset.form;
  const v = n => (f.elements[n] ? f.elements[n].value.trim() : '');
  const btn = f.querySelector('button.btn');
  authDraft = { nom: v('nom').toUpperCase(), prenom: v('prenom'), dept: v('dept') };
  if (!/^\d{4}$/.test(v('code'))) { viewAuth(L('Le code doit contenir exactement 4 chiffres.', 'The code must contain exactly 4 digits.')); return; }
  if (btn) btn.disabled = true;
  try {
    if (kind === 'signin') await store.signIn(v('nom'), v('code'));
    else if (kind === 'signup') {
      if (v('code') !== v('code2')) { viewAuth(L('Les deux codes ne sont pas identiques.', 'The two codes do not match.')); return; }
      await store.signUp({ nom: v('nom'), prenom: v('prenom'), dept: v('dept'), code: v('code') });
      authTab = 'in'; authDraft.prenom = ''; authDraft.dept = '';
      viewAuth(L('ok:Compte créé. Ton enseignant doit maintenant le valider ; tu pourras te connecter ensuite.', 'ok:Account created. Your teacher now has to approve it; you will then be able to sign in.'));
    }
  } catch (err) {
    viewAuth(err.message || String(err));
  }
});

window.addEventListener('hashchange', render);

/* ---------- démarrage ---------- */
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flushNote(); });
window.addEventListener('pagehide', () => { flushNote(); });

(async function boot() {
  try { user = await store.getUser(); } catch (e) { user = null; }
  store.onAuth((evt, u) => {
    const before = user && user.id;
    user = u;
    if ((u && u.id) !== before) { attemptsCache = null; accessCache = null; run = null; classes = null; setTimeout(render, 0); }
  });
  render();
})();
