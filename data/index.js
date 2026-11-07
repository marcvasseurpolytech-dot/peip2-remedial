import { G01 } from './g01.js';

export const CHAPTERS = [G01];

// Attribue des identifiants stables à chaque item : <set>.<n>
for (const ch of CHAPTERS) {
  for (const set of ch.sets) {
    set.chapter = ch.id;
    set.items.forEach((it, i) => { it.id = set.id + '.' + (i + 1); });
  }
}

export const SETS = CHAPTERS.flatMap(c => c.sets);
export const findSet = id => SETS.find(s => s.id === id);
export const findChapter = id => CHAPTERS.find(c => c.id === id);
