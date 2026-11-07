import { CHAPTERS, SETS, findSet, findChapter } from '../data/index.js';
import { gradeItem, hasAnswer, expectedText, isScored } from './check.js';
import { createStore } from './store.js';

const store = createStore();
const app = document.getElementById('app');
let user = null;
let classes = null;
let attemptsCache = null;
let run = null; // exercice en cours : { set, given, res, revealed, hints }
let notesState = null;

/* ---------- utilitaires ---------- */
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pct = a => (a.total ? Math.round((100 * a.score) / a.total) : 0);
const pillClass = p => (p >= 80 ? 'good' : p >= 50 ? 'mid' : 'low');
const fmtDate = iso => new Date(iso).toLocaleString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const firstName = () => (user && user.prenom ? user.prenom : '');
const scoredItems = set => set.items.filter(isScored);

async function getAttempts(force) {
  if (force || !attemptsCache) attemptsCache = await store.listAttempts();
  return attemptsCache;
}

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
  const demo = store.mode === 'demo'
    ? '<div class="demo">Mode démo : les données restent dans ce navigateur, rien n\'est envoyé au serveur.</div>' : '';
  const nav = user ? `
    <nav>
      <a href="#/" class="${active === 'home' ? 'on' : ''}">Tableau de bord</a>
      <a href="#/history" class="${active === 'history' ? 'on' : ''}">Historique</a>
      <a href="#/notes" class="${active === 'notes' ? 'on' : ''}">Carnet de corrections</a>
    </nav>
    <div class="who">${esc(user.name)} <button class="link" data-act="logout" style="color:#e4c77d">Déconnexion</button></div>` : '';
  return `${demo}
  <header class="top"><div class="in">
    <a class="brand" href="#/">PEIP2 Anglais<small>Remédiation · Polytech Lille</small></a>${nav}
  </div></header>
  <main>${inner}</main>
  <footer><b>MARC VASSEUR | POLYTECH LILLE</b><br>Marc Vasseur · <a href="mailto:marc.vasseur@polytech-lille.fr" style="color:#e4c77d">marc.vasseur@polytech-lille.fr</a></footer>`;
}

function setApp(html, active) { app.innerHTML = shell(html, active); window.scrollTo(0, 0); }

/* ---------- authentification ---------- */
let authTab = 'in';
let authDraft = { nom: '', prenom: '', dept: '' };
async function viewAuth(msg) {
  const signup = authTab === 'up';
  if (signup && !classes) { try { classes = await store.classes(); } catch (e) { classes = []; msg = msg || e.message; } }
  const cls = (classes || []).map(c => `<option value="${esc(c)}" ${c === authDraft.dept ? 'selected' : ''}>${esc(c)}</option>`).join('');
  setApp(`<div class="auth card">
    <h1>Exercices d'anglais</h1>
    <p class="muted">Connecte-toi pour retrouver tes exercices, ton historique et ton carnet de corrections.</p>
    <div class="tabs"><button data-act="tab" data-tab="in" class="${signup ? '' : 'on'}">Connexion</button><button data-act="tab" data-tab="up" class="${signup ? 'on' : ''}">Créer un compte</button></div>
    <form data-form="${signup ? 'signup' : 'signin'}">
      ${signup ? `<label class="f">Prénom</label><input class="t" name="prenom" required autocomplete="given-name" value="${esc(authDraft.prenom)}">` : ''}
      <label class="f">NOM</label><input class="t" name="nom" required autocomplete="family-name" value="${esc(authDraft.nom)}" style="text-transform:uppercase">
      ${signup ? `<label class="f">Classe</label><select class="t" name="dept" required><option value="">Choisis ta classe</option>${cls}</select>` : ''}
      <label class="f">Code à 4 chiffres${signup ? ' (invente-le et retiens-le)' : ''}</label>
      <input class="t" type="password" name="code" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" required autocomplete="off" placeholder="••••">
      ${signup ? `<label class="f">Confirme ton code</label><input class="t" type="password" name="code2" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" required autocomplete="off" placeholder="••••">` : ''}
      ${msg ? `<div class="msg ${msg.startsWith('ok:') ? 'info' : 'err'}">${esc(msg.replace(/^ok:/, ''))}</div>` : ''}
      <p><button class="btn gold" style="width:100%">${signup ? 'Créer mon compte' : 'Me connecter'}</button></p>
      <p class="small muted">${signup ? 'Ton compte sera actif après validation par ton enseignant.' : 'Code oublié ? Demande à ton enseignant de le réinitialiser.'}</p>
    </form></div>`);
}

/* ---------- tableau de bord ---------- */
async function viewHome() {
  setApp('<p class="muted">Chargement…</p>', 'home');
  const attempts = await getAttempts();
  const best = bestBySet(attempts);
  const totalScore = attempts.reduce((s, a) => s + a.score, 0);
  const totalMax = attempts.reduce((s, a) => s + a.total, 0);
  const avg = totalMax ? Math.round((100 * totalScore) / totalMax) : null;
  const drafts = listDrafts();
  const chapters = CHAPTERS.map(ch => {
    const done = ch.sets.filter(s => best.has(s.id)).length;
    const p = Math.round((100 * done) / ch.sets.length);
    return `<div class="card"><h3>${esc(ch.id)} · ${esc(ch.title)}</h3>
      <div class="bar" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><i style="width:${p}%"></i></div>
      <p class="small muted">${done} exercice(s) sur ${ch.sets.length} déjà faits</p>
      <a class="btn gold" href="#/chapter/${esc(ch.id)}">Ouvrir le chapitre</a></div>`;
  }).join('');
  const recent = attempts.slice(0, 5).map(a => {
    const set = findSet(a.set_id);
    return `<tr><td>${fmtDate(a.created_at)}</td><td>${esc(set ? set.title : a.set_id)}</td><td><span class="pill ${pillClass(pct(a))}">${a.score}/${a.total}</span></td><td><a href="#/attempt/${esc(a.id)}">Revoir</a></td></tr>`;
  }).join('');
  setApp(`
    <h1>Bonjour ${esc(firstName())}</h1>
    <div class="grid g4" style="margin:1rem 0 1.4rem">
      <div class="card stat"><div class="n">${best.size}</div><div class="l">exercices différents faits</div></div>
      <div class="card stat"><div class="n">${attempts.length}</div><div class="l">tentatives au total</div></div>
      <div class="card stat"><div class="n">${avg === null ? '–' : avg + ' %'}</div><div class="l">score moyen</div></div>
      <div class="card stat"><div class="n" style="font-size:1.1rem;padding-top:.5rem">${attempts[0] ? fmtDate(attempts[0].created_at) : 'Pas encore'}</div><div class="l">dernière activité</div></div>
    </div>
    ${drafts.length ? `<div class="card" style="margin-bottom:1.4rem"><h3>À reprendre</h3>${drafts.map(d => `<div class="setrow"><div><span class="t">${esc(d.set.title)}</span><div class="d">${d.done} réponse(s) déjà vérifiée(s)</div></div><a class="btn" href="#/ex/${esc(d.set.id)}">Reprendre</a></div>`).join('')}</div>` : ''}
    <h2>Chapitres</h2><div class="grid g2" style="margin-bottom:1.6rem">${chapters}</div>
    <h2>Derniers exercices</h2>
    <div class="card">${attempts.length ? `<table><thead><tr><th>Date</th><th>Exercice</th><th>Score</th><th></th></tr></thead><tbody>${recent}</tbody></table><p class="small"><a href="#/history">Tout l'historique</a></p>` : '<p class="muted">Rien pour l\'instant. Ouvre un chapitre et lance ton premier exercice.</p>'}</div>
    <p style="margin-top:1.4rem"><a class="btn ghost" href="#/notes">Ouvrir mon carnet de corrections</a></p>`, 'home');
}

/* ---------- chapitre ---------- */
async function viewChapter(id) {
  const ch = findChapter(id);
  if (!ch) return viewNotFound();
  const attempts = await getAttempts();
  const best = bestBySet(attempts);
  const r = ch.recap;
  const rows = (arr) => arr.map(([a, b]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join('');
  const recap = `<details class="card recap" style="margin-bottom:1.2rem"><summary>Rappel de cours</summary>
    <div class="grid g2" style="margin-top:.8rem">
      <div><h3>${esc(r.simple.title)}</h3><table><tbody>${rows(r.simple.forms)}</tbody></table>
        <ul class="clean">${r.simple.uses.map(u => `<li>${esc(u)}</li>`).join('')}</ul><p class="small"><b>Marqueurs :</b> ${esc(r.simple.marks)}</p></div>
      <div><h3>${esc(r.cont.title)}</h3><table><tbody>${rows(r.cont.forms)}</tbody></table>
        <ul class="clean">${r.cont.uses.map(u => `<li>${esc(u)}</li>`).join('')}</ul><p class="small"><b>Marqueurs :</b> ${esc(r.cont.marks)}</p></div>
    </div>
    <h3>Verbes d'état (jamais au continu dans ce sens)</h3><table><tbody>${rows(r.stative)}</tbody></table>
    <p class="small">${esc(r.trap)}</p><p><b>${esc(r.rule)}</b></p>
    <p class="small"><a href="${esc(ch.coursUrl)}" target="_blank" rel="noopener">Ouvrir le cours complet en diaporama</a></p></details>`;
  const groups = [...new Set(ch.sets.map(s => s.group))];
  const list = groups.map(g => `<div class="grouphead">${esc(g)}</div><div class="card">${ch.sets.filter(s => s.group === g).map(s => {
    const b = best.get(s.id);
    const dr = loadDraft(s.id);
    const hasDraft = dr && Object.keys(dr.res || {}).length;
    return `<div class="setrow"><div><span class="t">${esc(s.title)}</span><span class="badge">${esc(s.level)}</span>
      <div class="d">${esc(s.desc)} · ${s.items.length} question(s)</div></div>
      <div style="display:flex;gap:.6rem;align-items:center">${b ? `<span class="pill ${pillClass(b.best)}" title="Meilleur score">${b.best} %</span><span class="small muted">${b.count}×</span>` : ''}
      <a class="btn ${b ? 'ghost' : 'gold'} sm" href="#/ex/${esc(s.id)}">${hasDraft ? 'Reprendre' : b ? 'Refaire' : 'Commencer'}</a></div></div>`;
  }).join('')}</div>`).join('');
  setApp(`<p class="crumbs"><a href="#/">Tableau de bord</a> / ${esc(ch.id)}</p><h1>${esc(ch.id)} · ${esc(ch.title)}</h1>${recap}${list}`, 'home');
}

/* ---------- affichage d'un exercice ---------- */
function plain(it) {
  if (it.t === 'free' || it.t === 'essay') return (it.instr ? it.instr + ' ' : '') + it.s;
  return (it.instr && !it.instr.startsWith('Corrige la phrase') ? it.instr + ' ' : '') + it.s.replace(/\n/g, ' ');
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
    return `<input class="gap ${cls}" data-item="${esc(it.id)}" data-g="${i}" value="${esc(v)}" ${disabled ? 'disabled' : ''} style="width:${Math.max(10, v.length + 2)}ch" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Réponse ${i + 1}">`;
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
    const verdict = it.t === 'essay' ? '' : res && res.ok === true ? '<div class="verdict">✓ Tu l\'avais bon</div>' : res && res.ok === false ? '<div class="verdict">À revoir</div>' : '';
    return `<div class="fb ${res && res.ok === true ? 'ok' : res && res.ok === false ? 'ko' : 'neutral'}" aria-live="polite">${verdict}
      <p><span class="lbl">${it.t === 'essay' ? 'Exemple' : 'Modèle'}</span><span class="${it.instr === 'Traduis en anglais.' ? 'mono' : ''}">${esc(it.m[0])}</span></p>
      ${alts.map(a => `<p class="small"><span class="lbl">Autre version</span><span class="mono">${esc(a)}</span></p>`).join('')}
      ${it.why ? `<p>${esc(it.why)}</p>` : ''}</div>`;
  }
  const ok = res && res.ok;
  const neutral = !res;
  let variants = '';
  if (it.t === 'cloze') {
    const v = it.a.map(alts => alts.slice(1)).filter(x => x.length).map(x => x.join(' ou '));
    if (v.length) variants = `<p class="small"><span class="lbl">Aussi accepté</span><span class="mono">${esc(v.join(' ; '))}</span></p>`;
  } else if (it.t === 'text' && !it.ok && it.a.length > 1) {
    variants = `<p class="small"><span class="lbl">Aussi accepté</span><span class="mono">${esc(it.a.slice(1).join('  |  '))}</span></p>`;
  }
  const mine = !ok && given != null && givenText(it, given) ? `<p><span class="lbl">Ta réponse</span><span class="mono">${esc(givenText(it, given))}</span></p>` : '';
  return `<div class="fb ${neutral ? 'neutral' : ok ? 'ok' : 'ko'}" aria-live="polite">
    ${neutral ? '' : `<div class="verdict">${ok ? '✓ Correct' : '✗ Pas tout à fait'}</div>`}
    ${mine}
    <p><span class="lbl">Réponse attendue</span><span class="mono">${esc(expectedText(it).replace(/\n/g, ' / '))}</span></p>
    ${variants}
    <p>${esc(it.why)}</p>
    <p><span class="lbl">En français</span><em>${esc(it.fr)}</em></p></div>`;
}

function itemHTML(it, idx, st, review) {
  const given = st.given[it.id];
  const res = st.res[it.id];
  const checked = res !== undefined;
  const disabled = review || checked;
  let body = '';
  let actions = '';
  const hintShown = st.hints && st.hints[it.id];
  if (it.t === 'cloze') body = clozeHTML(it, given, disabled, checked ? gradeItem(it, given || []).gaps : null);
  else if (it.t === 'choice') body = choiceHTML(it, given, disabled);
  else if (it.t === 'text') body = `<div class="quote">${esc(it.s)}</div><input class="t wide" data-item="${esc(it.id)}" value="${esc(given || '')}" ${disabled ? 'disabled' : ''} placeholder="${it.instr && it.instr.startsWith('Corrige') ? 'Ta phrase corrigée, ou Correct' : 'Ta réponse'}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" style="font-family:var(--mono)">`;
  else body = `${it.s ? `<div class="quote">${esc(it.s)}</div>` : ''}
    <textarea class="t ans" data-item="${esc(it.id)}" ${disabled ? 'disabled' : ''} placeholder="Écris ta réponse ici">${esc(given || '')}</textarea>`;

  if (!review) {
    if (!checked) {
      if (it.t === 'free' || it.t === 'essay') {
        const shown = st.revealed && st.revealed[it.id];
        actions = shown ? '' : `<button class="btn sm" data-act="reveal" data-item="${esc(it.id)}">${it.t === 'essay' ? 'Voir un exemple' : 'Voir le modèle'}</button>`;
      } else actions = `<button class="btn sm" data-act="check" data-item="${esc(it.id)}">Vérifier</button>`;
      if (it.hint) actions += ` <button class="link small" data-act="hint" data-item="${esc(it.id)}">${hintShown ? 'Masquer' : 'Indice'}</button>`;
    }
  }
  let fb = '';
  if (checked) fb = feedbackHTML(it, res, given);
  else if (st.revealed && st.revealed[it.id] && (it.t === 'free' || it.t === 'essay')) {
    fb = feedbackHTML(it, null, given) + (it.t === 'essay'
      ? `<div class="actions"><button class="btn sm gold" data-act="self" data-v="done" data-item="${esc(it.id)}">J'ai terminé</button></div>`
      : `<div class="actions"><span class="small muted">Compare avec ta réponse :</span><button class="btn sm gold" data-act="self" data-v="1" data-item="${esc(it.id)}">Je l'avais bon</button><button class="btn sm ghost" data-act="self" data-v="0" data-item="${esc(it.id)}">À revoir</button></div>`);
  } else if (review && !checked) fb = feedbackHTML(it, null, given);
  const cls = checked ? (res.ok === true ? 'ok' : res.ok === false ? 'ko' : '') : '';
  return `<article class="item ${cls}" data-id="${esc(it.id)}">
    <div class="num">${idx + 1}. ${review && !checked ? 'non traité' : ''}</div>
    ${it.instr ? `<div class="instr">${esc(it.instr)}</div>` : ''}
    ${body}
    ${actions ? `<div class="actions">${actions}</div>` : ''}
    ${hintShown && !checked ? `<div class="hintline">${esc(it.hint)}</div>` : ''}
    ${fb}</article>`;
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
  el.querySelector('[data-role=prog]').textContent = `${s.done} / ${s.all} traité(s)`;
  el.querySelector('[data-role=score]').textContent = `Score provisoire : ${s.ok} / ${s.total}`;
  el.querySelector('.bar > i').style.width = Math.round((100 * s.done) / s.all) + '%';
  const fin = document.getElementById('finishNote');
  if (fin) fin.textContent = s.done < s.all ? `Il reste ${s.all - s.done} question(s) non traitée(s). Elles compteront comme non réussies.` : 'Tout est traité. Tu peux enregistrer.';
}

function viewExercise(setId) {
  const set = findSet(setId);
  if (!set) return viewNotFound();
  if (!run || run.set.id !== setId) {
    const d = loadDraft(setId) || {};
    run = { set, given: d.given || {}, res: d.res || {}, revealed: d.revealed || {}, hints: {}, confirm: false };
  }
  const ch = findChapter(set.chapter);
  const s = liveScore();
  setApp(`<p class="crumbs"><a href="#/">Tableau de bord</a> / <a href="#/chapter/${esc(ch.id)}">${esc(ch.id)}</a> / ${esc(set.title)}</p>
    <h1>${esc(set.title)} <span class="badge">${esc(set.level)}</span></h1>
    <p class="muted">${esc(set.desc)}</p>
    <div class="runhead" id="runhead"><div class="row"><span data-role="prog"></span><span data-role="score"></span></div>
      <div class="bar" style="margin-top:.4rem"><i style="width:0"></i></div></div>
    <div id="items">${set.items.map((it, i) => itemHTML(it, i, run, false)).join('')}</div>
    <div class="finish"><button class="btn gold" data-act="finish" id="finishBtn">Terminer et enregistrer</button>
      <span class="small muted" id="finishNote"></span></div>
    <p class="small muted">Tes réponses sont conservées si tu quittes la page. Rien n'est enregistré dans ton historique avant de cliquer sur « Terminer et enregistrer ».</p>`, 'home');
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
    if (!n) { n = document.createElement('div'); n.className = 'hintline needs'; n.textContent = it.t === 'choice' ? 'Choisis une réponse.' : 'Complète tous les champs avant de vérifier.'; root.appendChild(n); }
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
    b.textContent = `Enregistrer quand même (${left} non traitée${left > 1 ? 's' : ''})`;
    return;
  }
  const b = document.getElementById('finishBtn');
  b.disabled = true; b.textContent = 'Enregistrement…';
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
    b.disabled = false; b.textContent = 'Terminer et enregistrer';
    const n = document.getElementById('finishNote');
    n.textContent = "L'enregistrement a échoué : " + (e.message || e) + ' Tes réponses sont conservées, réessaie.';
  }
}

/* ---------- revue d'une tentative ---------- */
async function viewAttempt(id) {
  setApp('<p class="muted">Chargement…</p>', 'history');
  const a = await store.getAttempt(id);
  if (!a) return viewNotFound();
  const set = findSet(a.set_id);
  if (!set) { setApp('<h1>Exercice introuvable</h1><p>Cet exercice n\'existe plus dans la version actuelle du site.</p><p><a href="#/history">Retour à l\'historique</a></p>', 'history'); return; }
  const st = { given: {}, res: {}, hints: {}, revealed: {} };
  for (const it of a.items) { st.given[it.id] = it.given; if (it.done) st.res[it.id] = { ok: it.ok }; }
  const p = pct(a);
  const missed = a.items.filter(x => x.ok === false);
  setApp(`<p class="crumbs"><a href="#/history">Historique</a> / ${esc(set.title)}</p>
    <h1>${esc(set.title)}</h1>
    <div class="card" style="display:flex;gap:1.6rem;align-items:center;flex-wrap:wrap;margin-bottom:1.2rem">
      <div><div class="score">${a.score}<span style="font-size:1.4rem;color:var(--mute)"> / ${a.total}</span></div><div class="small muted">${p} % · ${fmtDate(a.created_at)}</div></div>
      <div style="display:flex;gap:.6rem;flex-wrap:wrap">
        <a class="btn gold" href="#/ex/${esc(set.id)}" data-act="retry" data-set="${esc(set.id)}">Refaire cet exercice</a>
        ${missed.length ? `<button class="btn" data-act="tonotes" data-attempt="${esc(a.id)}">Reporter mes erreurs dans mon carnet</button>` : ''}
        <a class="btn ghost" href="#/chapter/${esc(set.chapter)}">Retour au chapitre</a>
      </div></div>
    ${set.items.map((it, i) => itemHTML(it, i, st, true)).join('')}`, 'history');
  window.__attempt = a;
}

async function attemptToNotes(attemptId) {
  const a = window.__attempt && window.__attempt.id === attemptId ? window.__attempt : await store.getAttempt(attemptId);
  const set = findSet(a.set_id);
  const lines = [`Exercice : ${set.title}`, `Date : ${fmtDate(a.created_at)}`, `Score : ${a.score} / ${a.total}`, ''];
  let n = 0;
  for (const rec of a.items) {
    if (rec.ok !== false) continue;
    const it = set.items.find(x => x.id === rec.id);
    if (!it) continue;
    n++;
    lines.push(`${n}. ${plain(it)}`);
    lines.push(`   Ma réponse : ${givenText(it, rec.given) || '(pas de réponse)'}`);
    lines.push(`   Réponse attendue : ${expectedText(it).replace(/\n/g, ' / ')}`);
    lines.push('   Ma correction, avec mes mots :');
    lines.push('');
  }
  const note = await store.saveNote({ title: 'Corrections : ' + set.title, body: lines.join('\n'), set_id: set.id });
  location.hash = '#/notes/' + note.id;
}

/* ---------- historique ---------- */
async function viewHistory() {
  setApp('<p class="muted">Chargement…</p>', 'history');
  const attempts = await getAttempts(true);
  const filter = sessionStorage.getItem('peip2.hfilter') || '';
  const shown = filter ? attempts.filter(a => a.set_id === filter) : attempts;
  const usedSets = [...new Set(attempts.map(a => a.set_id))].map(findSet).filter(Boolean);
  setApp(`<h1>Mon historique</h1>
    <div class="card">
      ${attempts.length ? `<p><label class="small muted">Filtrer : <select class="t" style="width:auto;display:inline-block" data-act="hfilter"><option value="">Tous les exercices</option>${usedSets.map(s => `<option value="${esc(s.id)}" ${s.id === filter ? 'selected' : ''}>${esc(s.title)}</option>`).join('')}</select></label></p>
      <table><thead><tr><th>Date</th><th>Exercice</th><th>Score</th><th>Pourcentage</th><th></th></tr></thead><tbody>
      ${shown.map(a => { const set = findSet(a.set_id); return `<tr><td>${fmtDate(a.created_at)}</td><td>${esc(set ? set.title : a.set_id)}</td><td><span class="pill ${pillClass(pct(a))}">${a.score}/${a.total}</span></td><td>${pct(a)} %</td><td><a href="#/attempt/${esc(a.id)}">Revoir</a></td></tr>`; }).join('')}
      </tbody></table>` : '<p class="muted">Ton historique est vide pour l\'instant.</p>'}
    </div>`, 'history');
}

/* ---------- carnet de corrections ---------- */
async function viewNotes(currentId) {
  setApp('<p class="muted">Chargement…</p>', 'notes');
  const notes = await store.listNotes();
  notesState = { notes, id: null, timer: null, pending: null };
  const cur = notes.find(n => n.id === currentId) || (currentId ? null : notes[0]) || null;
  notesState.id = cur ? cur.id : null;
  const sets = SETS.map(s => `<option value="${esc(s.id)}">${esc(s.chapter)} · ${esc(s.title)}</option>`).join('');
  setApp(`<h1>Carnet de corrections</h1>
    <p class="muted">Écris ici tes corrections, tes règles et tes pièges. Tout est enregistré automatiquement et tu peux y revenir quand tu veux.</p>
    <p><button class="btn gold" data-act="newnote">Nouvelle note</button></p>
    <div class="notes"><div class="nlist" id="nlist"></div>
    <div class="card" id="neditor">${cur ? '' : '<p class="muted">Aucune note pour l\'instant. Crée ta première note, ou reporte tes erreurs depuis l\'historique d\'un exercice.</p>'}</div></div>`, 'notes');
  paintNoteList();
  if (cur) {
    document.getElementById('neditor').innerHTML = `
      <label class="f" style="margin-top:0">Titre</label><input class="t" id="ntitle" value="${esc(cur.title)}">
      <label class="f">Exercice lié (facultatif)</label><select class="t" id="nset"><option value="">Aucun</option>${sets}</select>
      <label class="f">Note</label><textarea class="t big" id="nbody">${esc(cur.body)}</textarea>
      <p class="actions"><span class="save" id="nsave">Enregistré</span><span style="flex:1"></span>
      <button class="btn ghost sm" data-act="delnote">Supprimer cette note</button></p>`;
    document.getElementById('nset').value = cur.set_id || '';
  }
}

function paintNoteList() {
  const el = document.getElementById('nlist');
  if (!el) return;
  el.innerHTML = notesState.notes.map(n => `<a class="nitem ${n.id === notesState.id ? 'on' : ''}" href="#/notes/${esc(n.id)}"><span class="nt">${esc(n.title || 'Sans titre')}</span><span class="nd">${fmtDate(n.updated_at)}</span></a>`).join('');
}

async function flushNote() {
  if (notesState && notesState.pending) { clearTimeout(notesState.timer); await notesState.pending(); }
}

function scheduleNoteSave() {
  const status = document.getElementById('nsave');
  if (status) status.textContent = 'Modifications en attente…';
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
      if (s2) s2.textContent = 'Enregistré à ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      const s2 = document.getElementById('nsave');
      if (s2) s2.textContent = "Échec de l'enregistrement : " + (e.message || e) + ' (réessaie en modifiant le texte)';
    }
  };
  notesState.pending = doSave;
  notesState.timer = setTimeout(doSave, 1500);
}

/* ---------- page introuvable ---------- */
function viewNotFound() { setApp('<h1>Page introuvable</h1><p><a href="#/">Retour au tableau de bord</a></p>', 'home'); }

/* ---------- routeur ---------- */
async function render() {
  const parts = (location.hash.replace(/^#/, '') || '/').split('/').filter(Boolean);
  await flushNote();
  if (!user) { viewAuth(); return; }
  try {
    if (parts.length === 0) return await viewHome();
    if (parts[0] === 'chapter') return await viewChapter(parts[1]);
    if (parts[0] === 'ex') return viewExercise(parts[1]);
    if (parts[0] === 'attempt') return await viewAttempt(parts[1]);
    if (parts[0] === 'history') return await viewHistory();
    if (parts[0] === 'notes') return await viewNotes(parts[1]);
    return viewNotFound();
  } catch (e) {
    setApp(`<h1>Un problème est survenu</h1><div class="msg err">${esc(e.message || e)}</div><p><a href="#/">Retour au tableau de bord</a></p>`);
  }
}

/* ---------- événements ---------- */
app.addEventListener('click', async e => {
  const t = e.target.closest('[data-act]');
  if (!t) return;
  const act = t.dataset.act;
  const item = t.dataset.item && run ? run.set.items.find(i => i.id === t.dataset.item) : null;
  if (act === 'tab') { authTab = t.dataset.tab; viewAuth(); }
  else if (act === 'logout') { await store.signOut(); }
  else if (act === 'check' && item) doCheck(item);
  else if (act === 'hint' && item) { run.hints[item.id] = !run.hints[item.id]; rerenderItem(item); }
  else if (act === 'reveal' && item) { run.given[item.id] = readGiven(item); run.revealed[item.id] = true; saveDraft(); rerenderItem(item); }
  else if (act === 'self' && item) {
    run.res[item.id] = { ok: t.dataset.v === 'done' ? null : t.dataset.v === '1', self: true };
    saveDraft(); rerenderItem(item);
  }
  else if (act === 'finish') finishRun();
  else if (act === 'retry') { run = null; clearDraft(t.dataset.set); }
  else if (act === 'tonotes') { t.disabled = true; t.textContent = 'Création de la note…'; await attemptToNotes(t.dataset.attempt); }
  else if (act === 'newnote') {
    const n = await store.saveNote({ title: 'Nouvelle note', body: '', set_id: null });
    location.hash = '#/notes/' + n.id;
  }
  else if (act === 'delnote') {
    if (t.dataset.armed !== '1') { t.dataset.armed = '1'; t.textContent = 'Confirmer la suppression'; return; }
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
  if (!/^\d{4}$/.test(v('code'))) { viewAuth('Le code doit contenir exactement 4 chiffres.'); return; }
  if (btn) btn.disabled = true;
  try {
    if (kind === 'signin') await store.signIn(v('nom'), v('code'));
    else if (kind === 'signup') {
      if (v('code') !== v('code2')) { viewAuth('Les deux codes ne sont pas identiques.'); return; }
      await store.signUp({ nom: v('nom'), prenom: v('prenom'), dept: v('dept'), code: v('code') });
      authTab = 'in'; authDraft.prenom = ''; authDraft.dept = '';
      viewAuth('ok:Compte créé. Ton enseignant doit maintenant le valider ; tu pourras te connecter ensuite.');
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
    if ((u && u.id) !== before) { attemptsCache = null; run = null; classes = null; setTimeout(render, 0); }
  });
  render();
})();
