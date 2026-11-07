// Moteur de correction : normalisation et comparaison des réponses.
// Utilisable dans le navigateur (module ES) et dans Node (tests).

export function norm(s) {
  let x = String(s == null ? '' : s).normalize('NFC').toLowerCase().replace(/[‘’`´]/g, "'");
  x = x.replace(/[“”"]/g, '');
  x = x.replace(/\bcan't\b/g, 'cannot').replace(/\bwon't\b/g, 'will not');
  x = x.replace(/n't\b/g, ' not');
  x = x.replace(/\b(he|she|it|that|there|what|who|where|how|here)'s\b/g, '$1 is');
  x = x.replace(/'m\b/g, ' am').replace(/'re\b/g, ' are');
  x = x.replace(/[.,;:!?]/g, ' ');
  return x.replace(/\s+/g, ' ').trim();
}

const CORRECT_WORDS = ['correct', 'c est correct', 'ok', 'juste', 'correcte'];

export function isScored(item) {
  return item.scored !== false;
}

// Remplit les trous avec la première réponse acceptée.
export function fillGaps(s, a) {
  let i = 0;
  // Le verbe entre parenthèses qui suit le trou disparaît de la phrase complétée.
  return s.replace(/___( \([^)]*\))?/g, () => (a[i] ? a[i++][0] : (i++, '___')));
}

export function expectedText(item) {
  switch (item.t) {
    case 'cloze': return fillGaps(item.s, item.a);
    case 'choice': return item.s.replace('___', item.o[item.c]);
    case 'text': return item.ok ? 'Correct' : item.a[0];
    case 'free': return item.m[0];
    default: return '';
  }
}

export function hasAnswer(item, given) {
  if (item.t === 'cloze') return Array.isArray(given) && given.length === item.a.length && given.every(g => String(g || '').trim() !== '');
  if (item.t === 'choice') return given !== null && given !== undefined && given !== '';
  return String(given || '').trim() !== '';
}

// Renvoie { ok, gaps? } pour les items corrigés automatiquement.
export function gradeItem(item, given) {
  if (item.t === 'cloze') {
    const gaps = item.a.map((alts, i) => alts.some(a => norm(a) === norm((given || [])[i])));
    return { ok: gaps.every(Boolean), gaps };
  }
  if (item.t === 'choice') return { ok: Number(given) === item.c };
  if (item.t === 'text') {
    const g = norm(given);
    if (item.ok) return { ok: CORRECT_WORDS.includes(g) };
    return { ok: item.a.some(a => norm(a) === g) };
  }
  throw new Error('Item non corrigeable automatiquement : ' + item.t);
}
