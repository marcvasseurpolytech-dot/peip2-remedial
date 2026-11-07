// Compétences : chaque phrase est rattachée à un point de grammaire.
// G22 / WH : le mot interrogatif attendu (who, what, how many...). G01 à G05 : le point de grammaire de la série.
import { SETS, findSet } from '../data/index.js';

const T = (fr, en) => ({ fr, en });

// Séries des chapitres G01 à G05 : suffixe de l'identifiant de série -> compétence.
const CH_MIXED = {
  G01: T('Présent simple et continu (mélange)', 'Present Simple and Continuous (mixed)'),
  G02: T('Prétérit simple (mélange)', 'Past Simple (mixed)'),
  G03: T('Present Perfect (mélange)', 'Present Perfect (mixed)'),
  G04: T('Tous les temps (mélange)', 'All tenses (mixed)'),
  G05: T('Voix passive (mélange)', 'Passive voice (mixed)')
};
const SET_SKILL = {
  'g01-guidee-b': T("Verbes d'état et nuances", 'Stative verbs and nuances'),
  'g01-m1a-1': T('Présent simple', 'Present Simple'), 'g01-m1a-2': T('Présent simple', 'Present Simple'),
  'g01-m1b': T("Verbes d'état et nuances", 'Stative verbs and nuances'),
  'g01-m1c-1': T('Présent continu', 'Present Continuous'), 'g01-m1c-2': T('Présent continu', 'Present Continuous'),
  'g01-m1d-1': T('Simple ou continu', 'Simple or Continuous'), 'g01-m1d-2': T('Questions aux présents', 'Questions in the present tenses'),
  'g02-guidee-a': T('Prétérit : affirmatif', 'Past Simple: affirmative'),
  'g02-guidee-b': T('Prétérit : négatif et questions', 'Past Simple: negative and questions'),
  'g02-m2a-1': T('Prétérit : réguliers et irréguliers', 'Past Simple: regular and irregular verbs'),
  'g02-m2a-2': T('Prétérit : négatif et questions', 'Past Simple: negative and questions'),
  'g02-m2b': T('Was ou were', 'Was or were'),
  'g02-m2c-1': T('Past Continuous', 'Past Continuous'), 'g02-m2c-2': T('Past Continuous', 'Past Continuous'),
  'g03-guidee-a': T('Present Perfect', 'Present Perfect'),
  'g03-guidee-b': T('For, since, ago', 'For, since, ago'), 'g03-bonus': T('For, since, ago', 'For, since, ago'),
  'g03-m3a': T('Present Perfect ou prétérit', 'Present Perfect or Past Simple'),
  'g03-m3b-1': T('For, since, ago', 'For, since, ago'), 'g03-m3b-2': T('For, since, ago', 'For, since, ago'),
  'g03-m3c': T('Present Perfect Continuous', 'Present Perfect Continuous'),
  'g03-m3d-1': T('Present Perfect Continuous', 'Present Perfect Continuous'), 'g03-m3d-2': T('Present Perfect Continuous', 'Present Perfect Continuous'),
  'g04-m4a': T('Past Perfect', 'Past Perfect'),
  'g04-m4b-1': T('Have got', 'Have got'), 'g04-m4b-2': T('Used to', 'Used to'),
  'g04-m4c-1': T('Formes du futur', 'Future forms'), 'g04-m4c-2': T('Formes du futur', 'Future forms'),
  'g04-m4d': T('Ordre des mots', 'Word order'),
  'g05-guidee-b': T('Passif : modaux et cas complexes', 'Passive: modals and complex cases'),
  'g05-m5b': T('Passif : modaux et style scientifique', 'Passive: modals and scientific style'),
  'g05-m5c': T('It is said that, he is said to', 'It is said that, he is said to'),
  'g05-m5d': T('Have something done', 'Have something done'),
  'g05-m5e': T('Ordre des mots', 'Word order')
};

// Mot interrogatif attendu dans la réponse : "How many ...", "Which ...", "At what time ..."
const WH = ['how many', 'how much', 'how long', 'how often', 'how far', 'how old', 'how fast', 'how tall', 'how deep', 'how big', 'how high',
  'whose', 'whom', 'who', 'which', 'what', 'when', 'where', 'why', 'how'];
function whWord(it) {
  const a = Array.isArray(it.a) ? it.a : [];
  const first = (typeof a[0] === 'string' ? a[0] : '').toLowerCase().replace(/[^a-z' ]/g, ' ');
  const words = first.split(/\s+/).filter(Boolean);
  // question introduite par une préposition (At what time, In which year, With whom)
  const head = words.slice(0, 4).join(' ');
  for (const w of WH) if (head === w || head.startsWith(w + ' ')) return w;
  for (const w of WH) if (new RegExp('^(at|in|on|for|by|with|from|to|of|about|during|since|until|after|before) ' + w + '\\b').test(head)) return w;
  return 'other';
}
const WH_SKILL = {
  who: T('Questions : who / whom', 'Questions: who / whom'), whom: T('Questions : who / whom', 'Questions: who / whom'),
  what: T('Questions : what', 'Questions: what'), which: T('Questions : which', 'Questions: which'), whose: T('Questions : whose', 'Questions: whose'),
  when: T('Questions : when', 'Questions: when'), where: T('Questions : where', 'Questions: where'), why: T('Questions : why', 'Questions: why'),
  'how many': T('Questions : how many / how much', 'Questions: how many / how much'), 'how much': T('Questions : how many / how much', 'Questions: how many / how much'),
  how: T('Questions : how', 'Questions: how'),
  other: T('Questions : autres formes', 'Questions: other forms')
};
for (const w of ['how long', 'how often', 'how far', 'how old', 'how fast', 'how tall', 'how deep', 'how big', 'how high']) WH_SKILL[w] = T('Questions : how + adjectif / adverbe', 'Questions: how + adjective / adverb');

// Renvoie { key, fr, en } pour une phrase.
export function skillOf(set, it) {
  let t;
  if (set.chapter === 'G22' || set.chapter === 'WH') t = WH_SKILL[whWord(it)] || WH_SKILL.other;
  else t = SET_SKILL[set.id] || CH_MIXED[set.chapter] || T(set.chapter, set.chapter);
  return { key: t.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), fr: t.fr, en: t.en };
}

// Index de toutes les phrases : id -> { set, skill }
let INDEX = null;
export function itemIndex() {
  if (INDEX) return INDEX;
  INDEX = new Map();
  for (const s of SETS) for (const it of s.items) INDEX.set(it.id, { set: s, item: it, skill: skillOf(s, it) });
  return INDEX;
}

// Dernier résultat connu de chaque phrase (la tentative la plus récente l'emporte).
// ok : true / false, ou absent si la phrase n'a jamais été traitée ou n'est pas notée.
export function latestByItem(attempts) {
  const m = new Map();
  const sorted = attempts.slice().sort((a, b) => a.created_at.localeCompare(b.created_at));
  for (const a of sorted) for (const x of a.items || []) {
    if (x.done && (x.ok === true || x.ok === false)) m.set(x.id, { ok: x.ok, at: a.created_at, set_id: a.set_id });
  }
  return m;
}

// Statistiques par compétence : [{ key, fr, en, ok, n, pct, wrong: [itemId] }] triées de la plus faible à la plus forte.
export function skillStats(latest) {
  const idx = itemIndex();
  const by = new Map();
  for (const [id, r] of latest) {
    const e = idx.get(id);
    if (!e) continue;
    const s = by.get(e.skill.key) || { ...e.skill, ok: 0, n: 0, wrong: [] };
    s.n++;
    if (r.ok) s.ok++; else s.wrong.push(id);
    by.set(e.skill.key, s);
  }
  return [...by.values()].map(s => ({ ...s, pct: Math.round((100 * s.ok) / s.n) })).sort((a, b) => a.pct - b.pct || b.n - a.n);
}
