// Aides communes aux chapitres G02 et suivants : le texte anglais (règles, indices, consignes)
// est écrit à côté du texte français, dans le dernier argument E(...).
// E(why, hint) ou E(why, hint, { instr, s, m }).
export const E = (why, hint, extra) => ({ ...(why ? { why } : {}), ...(hint ? { hint } : {}), ...(extra || {}) });

const EXP = [["n't", ' not'], ["'ll", ' will'], ["'ve", ' have'], ["'re", ' are'], ["'m", ' am'], ["'d", ' would']];
const SPECIAL = { "won't": 'will not', "can't": 'cannot', "shan't": 'shall not' };
// X("didn't write") donne ["didn't write", "did not write"] (formes contractée et complète acceptées).
export const X = str => {
  let full = str;
  for (const [k, v] of Object.entries(SPECIAL)) full = full.split(k).join(v);
  for (const [a, b] of EXP) full = full.split(a).join(b);
  return full === str ? [str] : [str, full];
};
// Plusieurs variantes de phrase : XS("He didn't go.") renvoie les deux formes de la phrase entière.
export const XS = X;

// Contractions acceptées pour le premier mot d'une réponse : will devient 'll, is devient 's, etc.
const CONTR = { will: "'ll", am: "'m", is: "'s", are: "'re", have: "'ve", has: "'s", had: "'d" };
const withContractions = alts => {
  const out = [...alts];
  for (const a of alts) {
    const m = /^(will|am|is|are|have|has|had)\b(.*)$/.exec(a);
    if (m) { const v = CONTR[m[1]] + m[2]; if (!out.includes(v)) out.push(v); }
  }
  return out;
};
export const c = (s, a, fr, why, hint, en) => ({ t: 'cloze', s, a: a.map(x => withContractions(Array.isArray(x) ? x : [x])), fr, why, hint, _en: en });
export const ch = (s, o, k, fr, why, en) => ({ t: 'choice', s, o, c: k, fr, why, _en: en });
// Le 6e argument est facultatif (null) : l'objet E(...) peut aussi être passé en 6e ou 7e position.
export const tx = (instr, s, a, fr, why, x, y) => ({ t: 'text', instr, s, a, fr, why, _en: y || x });
export const okc = (instr, s, fr, why, en) => ({ t: 'text', instr, s, ok: true, fr, why, _en: en });
export const tr = (s, m, why, en) => ({ t: 'free', instr: 'Traduis en anglais.', s, m, why, _en: en });
export const op = (instr, s, m, hint, en) => ({ t: 'free', instr, s, m, hint, _en: en });
export const es = (instr, s, m, hint, en) => ({ t: 'essay', scored: false, instr, s, m, hint, _en: en });
export const FIX = 'Corrige la phrase. Écris la phrase entière, ou écris Correct si elle est juste.';
// Un jeu d'exercices : métadonnées françaises + anglaises regroupées.
export const set = (id, group, title, level, desc, items, en) => ({ id, group, title, level, desc, items, en });
