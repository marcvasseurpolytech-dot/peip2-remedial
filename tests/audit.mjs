import { SETS } from '../data/index.js';
import { fillGaps, expectedText, gradeItem, norm, isScored } from '../js/check.js';
let n = 0, err = 0;
const seen = new Map();
for (const set of SETS) {
  if (set.chapter !== 'G01' && (!set.en || !set.en.title || !set.en.desc || !set.en.group)) { console.log('!! set sans texte anglais ' + set.id); err++; }
  console.log('\n## ' + set.id + ' | ' + set.title + ' (' + set.items.length + ' items)');
  for (const it of set.items) {
    n++;
    const exp = expectedText(it).replace(/\n/g, ' / ');
    const prompt = (it.t === 'free' || it.t === 'essay') ? it.s : it.t === 'text' ? it.s : it.s;
    console.log(it.id + '  [' + it.t + '] ' + exp + '   ||FR: ' + (it.fr || (it.m ? it.m[0].slice(0,80) : '')));
    // unicité des phrases anglaises
    const short = it.t === 'text' && !it.ok && exp.split(/\s+/).length <= 5;
    const key = norm(it.ok ? it.s : (it.u || short) ? it.s + ' ' + exp : exp);
    if (key && seen.has(key)) { console.log('  !! DOUBLON avec ' + seen.get(key)); err++; }
    seen.set(key, it.id);
    // auto-test : la réponse attendue doit être acceptée
    if (it.t === 'cloze') {
      it.a.forEach((alts, gi) => alts.forEach(a => { if (!gradeItem(it, it.a.map((x, j) => j === gi ? a : x[0])).ok) { console.log('  !! alt refusée ' + a); err++; } }));
      if (gradeItem(it, it.a.map(() => 'zzz')).ok) { console.log('  !! accepte n\'importe quoi'); err++; }
      if (it.hint) {
        for (const alts of it.a) for (const a of alts) if (norm(it.hint).split(' ').includes(norm(a))) { console.log('  !! indice contient la réponse : ' + a); err++; }
      }
      if ((it.s.match(/___/g) || []).length !== it.a.length) { console.log('  !! nb de trous incohérent'); err++; }
    }
    if (it.t === 'choice' && !(it.s.includes('___') && it.o.length === 2)) { console.log('  !! choice mal formé'); err++; }
    if (it.t === 'text') {
      if (it.ok) { if (!gradeItem(it, 'Correct').ok || gradeItem(it, it.s).ok) { console.log('  !! ok mal géré'); err++; } }
      else { it.a.forEach(a => { if (!gradeItem(it, a).ok) { console.log('  !! refuse ' + a); err++; } }); if (gradeItem(it, it.s).ok) { console.log('  !! accepte la phrase fautive'); err++; } }
    }
    if (!/[—–]/.test(JSON.stringify(it)) === false) { console.log('  !! tiret cadratin/demi-cadratin'); err++; }
    if (it.t !== 'free' && it.t !== 'essay' && !it.fr) { console.log('  !! traduction FR manquante'); err++; }
    // texte anglais : présent partout où le français existe, et sans accents français
    if (set.chapter !== 'G01') {
      const en = it.en || {};
      if (it.why && !en.why) { console.log('  !! EN why manquant'); err++; }
      if (it.hint && !en.hint) { console.log('  !! EN hint manquant'); err++; }
      if (it.instr && !it.fix && !it.isTr && !en.instr) { console.log('  !! EN instr manquant'); err++; }
      if (it.t === 'free' && !it.isTr) { if (!en.m) { console.log('  !! EN modèle manquant'); err++; } }
      for (const k of ['why', 'hint', 'instr', 's']) if (en[k] && /[éèàçêôùâîûœ]/i.test(en[k])) { console.log('  !! français dans EN.' + k + ' : ' + en[k]); err++; }
      if (en.m) for (const m of en.m) if (/[éèàçêôùâîûœ]/i.test(m)) { console.log('  !! français dans EN.m : ' + m); err++; }
    }
    if (it.t !== 'free' && it.t !== 'essay' && !it.why) { console.log('  !! explication manquante'); err++; }
  }
}
console.log('\nTOTAL ' + n + ' items, ' + err + ' problème(s)');
process.exit(err ? 1 : 0);
