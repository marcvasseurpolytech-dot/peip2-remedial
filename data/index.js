import { G01 } from './g01.js';
import { G01_EN } from './g01.en.js';

export const CHAPTERS = [G01];

// Textes anglais par chapitre (même ordre d'items que le chapitre français).
const EN = { G01: G01_EN };

// Attribue des identifiants stables à chaque item : <set>.<n>
// et rattache à chaque objet sa version anglaise (champ en).
for (const ch of CHAPTERS) {
  const en = EN[ch.id];
  if (en) ch.en = { title: en.title, recap: en.recap };
  for (const set of ch.sets) {
    set.chapter = ch.id;
    const es = en && en.sets[set.id];
    if (es) set.en = es;
    set.items.forEach((it, i) => {
      it.id = set.id + '.' + (i + 1);
      it.fix = typeof it.instr === 'string' && it.instr.startsWith('Corrige la phrase');
      it.isTr = it.instr === 'Traduis en anglais.';
      const ei = en && en.items[set.id] && en.items[set.id][i];
      if (ei) it.en = ei;
    });
  }
}

export const SETS = CHAPTERS.flatMap(c => c.sets);
export const findSet = id => SETS.find(s => s.id === id);
export const findChapter = id => CHAPTERS.find(c => c.id === id);
