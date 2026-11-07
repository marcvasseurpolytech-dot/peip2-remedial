// Aides pour les chapitres G06 et suivants : écriture compacte des séries, avec textes FR et EN côte à côte.
import { E, c, tx, tr, op, okc, FIX, set } from './dsl.js';

// Une série : S(id, [groupeFR, groupeEN], [titreFR, titreEN], niveau, [consigneFR, consigneEN], items)
export const S = (id, grp, title, level, desc, items) =>
  set(id, grp[0], title[0], level, desc[0], items, { group: grp[1], title: title[1], desc: desc[1] });
export const FICHE = ['Fiche', 'Worksheet'];
export const MURPHY = ['Supplément Murphy', 'Murphy supplement'];

// Compléter : C(phrase à trous, réponses (un tableau par trou), français, règle FR, règle EN, indice FR, indice EN)
export const C = (s, a, fr, why, whyEn, hint, hintEn) => c(s, a, fr, why, hint, E(whyEn, hintEn));
// Consigne fixe : T(consigne FR, consigne EN) renvoie (phrase, réponses, français, règle FR, règle EN)
export const T = (instr, instrEn) => (s, a, fr, why, whyEn) => tx(instr, s, a, fr, why, E(whyEn, null, { instr: instrEn }));
// Corriger : F(phrase fautive, corrections, français, règle FR, règle EN)
export const F = (s, a, fr, why, whyEn) => tx(FIX, s, a, fr, why, E(whyEn));
// Phrase déjà correcte
export const OK = (s, fr, why, whyEn) => okc(FIX, s, fr, why, E(whyEn));
// Thème : R(phrase française, traductions acceptées, règle FR, règle EN)
export const R = (s, a, why, whyEn) => tr(s, a, why, E(whyEn));
// Remettre les mots dans l'ordre
export const W = T("Remets les mots dans l'ordre pour former une phrase correcte.", 'Put the words in the right order to make a correct sentence.');
// Réponse libre autoévaluée : P(consigne FR, énoncé, [modèles], indice FR, consigne EN, indice EN)
export const P = (instr, s, m, hint, instrEn, hintEn) => op(instr, s, m, hint, E(null, hintEn, { instr: instrEn, m }));

// Expansion des variantes : synonymes de repères temporels, « that » facultatif, personnes interchangeables.
const SYN = [
  ['the next day', 'the following day', 'the day after'],
  ['the day before', 'the previous day'],
  ['the following week', 'the week after'],
  ['the previous week', 'the week before'],
  ['the following month', 'the month after'],
  ['the following year', 'the year after'],
  ['the following Monday', 'the next Monday', 'the Monday after'],
  ['that day', 'the same day'],
  ['then', 'at that moment', 'at that time']
];
const THAT = /^(.*?\b(?:said|told (?:me|us|them|him|her|you|the \w+)|admitted|explained|announced|promised|added|replied|complained|claimed|warned (?:me|us|them|him|her)|reminded (?:me|us|them|him|her)|thought|wondered|answered|agreed|insisted|denied)) (?!that\b)([a-z].*)$/i;
export function ex(list, opts = {}) {
  const out = new Set();
  const add = s => { if (!out.has(s)) out.add(s); };
  for (const base of [].concat(list)) {
    let forms = [base];
    if (!opts.noSyn) for (const group of SYN) {
      const next = [];
      for (const f of forms) {
        const g = group.find(x => f.includes(x));
        if (!g) { next.push(f); continue; }
        for (const alt of group) next.push(f.split(g).join(alt));
      }
      forms = next;
    }
    for (const f of forms) {
      add(f);
      if (!opts.noThat) { const m = THAT.exec(f); if (m) add(m[1] + ' that ' + m[2]); }
    }
  }
  return [...out];
}
// Réponses à compléter après said / told me : variantes + « that » facultatif en tête.
export const cl = list => ex(list, { noThat: true }).flatMap(x => [x, 'that ' + x]);
// who(['me','us'], 'She told {} not to ...') remplace {} par chaque personne.
export const who = (people, tpl) => people.map(p => tpl.replace('{}', p));

// Raccourcis communs aux chapitres G07 et suivants.
export const hint = (fr, en) => [fr, en];
export const K = (s, a, fr, why, whyEn, h) => C(s, a, fr, why, whyEn, h ? h[0] : null, h ? h[1] : null);
export const SK = (fr, en) => [fr, en];
