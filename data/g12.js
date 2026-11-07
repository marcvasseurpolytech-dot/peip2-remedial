// G12 : Comparatives & Superlatives
// Contenu reconstruit à partir de la fiche élève, du supplément Murphy et du corrigé enseignant du hub.
import { S, FICHE, MURPHY, T, F, R, W, P, K, hint, SK } from './dsl2.js';

const FARTH = ['the farthest', 'the furthest'];
const EXT = ['faster', 'much faster', 'far faster', 'a lot faster', 'even faster', 'significantly faster', 'slightly faster'];
const CMP = 'Comparatif : adjectif court + -er, adjectif long avec more, puis than.';
const CMPE = 'Comparative: short adjective + -er, long adjective with more, then than.';

const guideeA = [
  K('This engine is ___ (fast) than the previous model.', [['faster']], "Ce moteur est plus rapide que le modèle précédent.", 'fast a une syllabe : faster. ' + CMP, 'fast has one syllable: faster. ' + CMPE, hint('1 syllabe', '1 syllable')),
  K('She is ___ (efficient) than her colleague.', [['more efficient']], "Elle est plus efficace que sa collègue.", 'efficient a trois syllabes : more efficient.', 'efficient has three syllables: more efficient.', hint('3 syllabes', '3 syllables')),
  K('The results were ___ (good) than expected.', [['better']], "Les résultats étaient meilleurs que prévu.", 'good est irrégulier : better.', 'good is irregular: better.', hint('irrégulier', 'irregular')),
  K('This method is not ___ (effective) as the first one.', [['as effective']], "Cette méthode n'est pas aussi efficace que la première.", "Égalité (ici négative) : not as + adjectif + as. L'adjectif reste à la forme de base.", 'Equality (here negative): not as + adjective + as. The adjective stays in its base form.', hint('not as ... as', 'not as ... as')),
  K('The situation is getting ___ and ___ (complex).', [['more'], ['more complex']], "La situation devient de plus en plus complexe.", "Progression : more and more + adjectif long.", 'Gradual change: more and more + long adjective.', hint('de plus en plus', 'more and more')),
  K('He works ___ (hard) than anyone else in the team.', [['harder']], "Il travaille plus dur que quiconque dans l'équipe.", 'hard a une syllabe, y compris comme adverbe : harder.', 'hard has one syllable, also as an adverb: harder.', hint('1 syllabe', '1 syllable')),
  K('This project is ___ (challenging) than we initially thought.', [['more challenging']], "Ce projet est plus exigeant que nous le pensions au départ.", 'challenging a trois syllabes : more challenging.', 'challenging has three syllables: more challenging.', hint('3 syllabes', '3 syllables')),
  K('She is ___ (much / experienced) than her predecessor.', [['much more experienced']], "Elle est bien plus expérimentée que sa prédécesseure.", 'Renforcement : much + more + adjectif long.', 'Intensifier: much + more + long adjective.', hint('much + comparatif', 'much + comparative')),
  K('The new lab is ___ (big) than the old one.', [['bigger']], "Le nouveau laboratoire est plus grand que l'ancien.", 'big : consonne finale doublée (CVC) : bigger.', 'big: the final consonant is doubled (CVC): bigger.', hint('doublement de la consonne', 'doubled consonant')),
  K("This data is ___ (reliable) than last year's figures.", [['more reliable']], "Ces données sont plus fiables que les chiffres de l'an dernier.", 'reliable a quatre syllabes : more reliable.', 'reliable has four syllables: more reliable.', hint('4 syllabes', '4 syllables'))
];
const guideeB = [
  K('This is ___ (interesting) course I have ever taken.', [['the most interesting']], "C'est le cours le plus intéressant que j'aie jamais suivi.", 'Adjectif long : the most + adjectif. Le superlatif est souvent suivi du Present Perfect (I have ever taken).', 'Long adjective: the most + adjective. The superlative is often followed by the present perfect (I have ever taken).'),
  K('He is ___ (tall) student in the cohort.', [['the tallest']], "C'est l'étudiant le plus grand de la promotion.", 'Adjectif court : the + adjectif + -est.', 'Short adjective: the + adjective + -est.'),
  K('This was ___ (bad) result we have ever recorded.', [['the worst']], "C'est le pire résultat que nous ayons jamais enregistré.", 'bad est irrégulier : worse, the worst.', 'bad is irregular: worse, the worst.'),
  K('The ___ (hard) you study, the ___ (good) your results.', [['harder'], ['better']], "Plus tu étudies dur, meilleurs sont tes résultats.", 'Progression parallèle : the + comparatif, the + comparatif.', 'Parallel progression: the + comparative, the + comparative.'),
  K('It is ___ (far) we have ever travelled for a conference.', [FARTH], "C'est le plus loin que nous soyons jamais allés pour une conférence.", 'far est irrégulier : farther / further, the farthest / the furthest.', 'far is irregular: farther / further, the farthest / the furthest.'),
  K('She has ___ (little) patience for inefficiency.', [['less']], "Elle a moins de patience pour l'inefficacité.", 'little (nom non dénombrable) donne less.', 'little (uncountable) gives less.'),
  K('This is ___ (significant) discovery in the last decade.', [['the most significant']], "C'est la découverte la plus significative de la dernière décennie.", 'Adjectif long : the most significant.', 'Long adjective: the most significant.'),
  K('The ___ (soon) we start, the ___ (early) we finish.', [['sooner'], ['earlier']], "Plus tôt nous commençons, plus tôt nous finissons.", 'Progression parallèle : the sooner, the earlier.', 'Parallel progression: the sooner, the earlier.'),
  K('He is getting ___ and ___ (confident) as he gains experience.', [['more'], ['more confident']], "Il prend de plus en plus confiance en lui à mesure qu'il gagne en expérience.", 'Progression : more and more + adjectif long.', 'Gradual change: more and more + long adjective.'),
  K('This algorithm is ___ (fast) than anything previously developed.', [EXT], "Cet algorithme est (bien) plus rapide que tout ce qui a été développé jusqu'ici.", "Le comparatif peut être renforcé par much, far ou a lot : much faster.", 'The comparative can be strengthened by much, far or a lot: much faster.', hint('renforcement possible', 'intensifier possible'))
];
const nivA = [
  K('This algorithm is ___ (accurate) than the previous version.', [['more accurate']], "Cet algorithme est plus précis que la version précédente.", 'accurate : more accurate.', 'accurate: more accurate.'),
  K('She is ___ (good) engineer we have ever hired.', [['the best']], "C'est la meilleure ingénieure que nous ayons jamais recrutée.", 'good : better, the best.', 'good: better, the best.'),
  K('This project is ___ (complex) than we initially anticipated.', [['more complex']], "Ce projet est plus complexe que nous l'avions anticipé.", 'complex a deux syllabes mais ne finit pas en -y : more complex.', 'complex has two syllables but does not end in -y: more complex.'),
  K('The new laboratory is ___ (big) than the old one.', [['bigger']], "Le nouveau laboratoire est plus grand que l'ancien.", 'big : bigger.', 'big: bigger.'),
  K('He works ___ (hard) than anyone else in the department.', [['harder']], "Il travaille plus dur que quiconque dans le service.", 'hard : harder.', 'hard: harder.'),
  K('This is ___ (efficient) method currently available.', [['the most efficient']], "C'est la méthode la plus efficace actuellement disponible.", 'Superlatif long : the most efficient.', 'Long superlative: the most efficient.'),
  K('Her results are not ___ (impressive) as his.', [['as impressive']], "Ses résultats ne sont pas aussi impressionnants que les siens.", 'not as ... as : as impressive.', 'not as ... as: as impressive.'),
  K('The ___ (early) we start, the ___ (soon) we finish.', [['earlier'], ['sooner']], "Plus tôt nous commençons, plus vite nous finissons.", 'The + comparatif, the + comparatif.', 'The + comparative, the + comparative.'),
  K('This machine is ___ (reliable) than the previous model.', [['more reliable']], "Cette machine est plus fiable que le modèle précédent.", 'reliable : more reliable.', 'reliable: more reliable.'),
  K('She is becoming ___ and ___ (confident) each week.', [['more'], ['more confident']], "Elle gagne en assurance chaque semaine.", 'more and more + adjectif long.', 'more and more + long adjective.')
];
const nivB = [
  K('The new procedure is far ___ (easy) to follow than the old one.', [['easier']], "La nouvelle procédure est bien plus facile à suivre que l'ancienne.", 'easy finit en -y : easier. far renforce le comparatif.', 'easy ends in -y: easier. far strengthens the comparative.'),
  K('These are ___ (important) findings in the entire study.', [['the most important']], "Ce sont les résultats les plus importants de toute l'étude.", 'Superlatif long : the most important.', 'Long superlative: the most important.'),
  K('He is ___ (experienced) member of the research team.', [['the most experienced']], "C'est le membre le plus expérimenté de l'équipe de recherche.", 'Superlatif long : the most experienced.', 'Long superlative: the most experienced.'),
  K('The ___ (much) data we collect, the ___ (accurate) our model.', [['more'], ['more accurate']], "Plus nous collectons de données, plus notre modèle est précis.", 'much donne more ; accurate donne more accurate.', 'much gives more; accurate gives more accurate.'),
  K('She performed ___ (well) than expected in the technical interview.', [['better']], "Elle a mieux réussi que prévu à l'entretien technique.", 'well (adverbe) donne better.', 'well (adverb) gives better.')
];
const nivC = [
  F('She is more smart than her colleague.', ['She is smarter than her colleague.'], "Elle est plus intelligente que sa collègue.", 'smart a une syllabe : smarter, et non more smart.', 'smart has one syllable: smarter, not more smart.'),
  F('This is the most good solution we have.', ['This is the best solution we have.'], "C'est la meilleure solution dont nous disposons.", 'good est irrégulier : the best.', 'good is irregular: the best.'),
  F('The more you practise, the more you become better.', ['The more you practise, the better you become.', 'The more you practice, the better you become.'], "Plus tu t'entraînes, meilleur tu deviens.", 'Après the, on place directement le comparatif : the better you become.', 'After the, put the comparative directly: the better you become.'),
  F('He works more harder than before.', ['He works harder than before.'], "Il travaille plus dur qu'avant.", 'Pas de double comparatif : harder, sans more.', 'No double comparative: harder, without more.'),
  F('This is the more efficient method I know.', ['This is the most efficient method I know.'], "C'est la méthode la plus efficace que je connaisse.", 'Plus de deux éléments comparés : superlatif, the most efficient.', 'More than two items compared: superlative, the most efficient.'),
  R("Les voitures électriques sont bien plus efficaces en ville que les voitures à essence.", ['Electric cars are much more efficient in cities than petrol cars.', 'Electric cars are much more efficient in cities than gasoline cars.', 'Electric cars are far more efficient in cities than petrol cars.', 'Electric cars are much more efficient than petrol cars in cities.', 'Electric cars are much more efficient in towns than petrol cars.'], 'bien plus : much / far + more + adjectif.', 'bien plus: much / far + more + adjective.'),
  R("C'est le projet le plus difficile que j'aie jamais géré.", ['It is the most difficult project I have ever managed.', "It's the most difficult project I have ever managed.", 'This is the most difficult project I have ever managed.', 'It is the hardest project I have ever managed.', "It's the hardest project I have ever managed."], 'Superlatif suivi du Present Perfect : the most difficult ... I have ever managed.', 'Superlative followed by the present perfect: the most difficult ... I have ever managed.'),
  R("Plus on automatise les tâches, plus les ingénieurs peuvent se concentrer sur l'innovation.", ['The more tasks we automate, the more engineers can focus on innovation.', 'The more we automate tasks, the more engineers can focus on innovation.', 'The more tasks are automated, the more engineers can focus on innovation.', 'The more we automate, the more engineers can focus on innovation.', 'The more tasks we automate, the more the engineers can focus on innovation.'], 'Plus ... plus ... : the more ..., the more ...', 'The more ..., the more ...'),
  R("Elle est légèrement plus expérimentée que son collègue.", ['She is slightly more experienced than her colleague.', 'She is a little more experienced than her colleague.', 'She is slightly more experienced than her coworker.'], 'slightly renforce atténuant le comparatif : slightly more experienced.', 'slightly softens the comparative: slightly more experienced.'),
  R("La qualité de l'air s'améliore de plus en plus grâce aux nouvelles politiques.", ['Air quality is improving more and more thanks to new policies.', 'Air quality is getting better and better thanks to new policies.', 'The air quality is improving more and more thanks to the new policies.', 'Air quality is improving more and more because of new policies.', 'The air quality is getting better and better thanks to the new policies.'], 'de plus en plus : more and more (ou better and better).', 'de plus en plus: more and more (or better and better).')
];
const nivD = [
  P('Complète librement avec une comparaison logique.', 'The new renewable energy sources are ___ than traditional fossil fuels because ___.', ['The new renewable energy sources are cleaner than traditional fossil fuels because they do not release carbon dioxide.', 'The new renewable energy sources are more sustainable than traditional fossil fuels because they never run out.'], 'Un comparatif (-er ou more) puis une cause.', 'Complete freely with a logical comparison.', 'A comparative (-er or more) then a reason.'),
  P('Complète librement avec un superlatif.', 'Of all the solutions proposed, ___ is the most ___ because ___.', ['Of all the solutions proposed, the third one is the most realistic because it fits within our budget.'], 'the most + adjectif long.', 'Complete freely with a superlative.', 'the most + long adjective.'),
  P('Complète librement avec la structure the ..., the ...', 'The ___ the team is, the ___ the project will be.', ['The more motivated the team is, the more successful the project will be.', 'The bigger the team is, the harder the project will be to manage.'], 'The + comparatif, the + comparatif.', 'Complete freely with the structure the ..., the ...', 'The + comparative, the + comparative.'),
  P('Complète librement avec as ... as et un comparatif.', 'Automated systems are not always ___ as ___ , sometimes human judgment is ___.', ['Automated systems are not always as reliable as people think, sometimes human judgment is better.'], 'not always as ... as, puis un comparatif.', 'Complete freely with as ... as and a comparative.', 'not always as ... as, then a comparative.'),
  P('Rédige un court paragraphe comparant deux approches d\'ingénierie, avec au moins 3 structures comparatives.', 'Write a short paragraph comparing two engineering approaches using at least 3 comparative structures.', ['Additive manufacturing is more flexible than traditional machining, and it wastes less material. However, machining is still faster for large series, and the finish is smoother. The more complex the part is, the more attractive 3D printing becomes.'], 'more ... than, as ... as, the more ..., the more ..., superlatif.', 'Write a short paragraph comparing two engineering approaches using at least 3 comparative structures.', 'more ... than, as ... as, the more ..., the more ..., superlative.')
];
const QT = (s, a, fr, w, we) => K(s, [a], fr, w, we);
const bonus = [
  QT('We have ___ time than we expected, we need to hurry.', ['less'], "Nous avons moins de temps que prévu, il faut se dépêcher.", 'time est non dénombrable : less.', 'time is uncountable: less.'),
  QT('There are ___ engineers than needed on this project.', ['fewer'], "Il y a moins d'ingénieurs que nécessaire sur ce projet.", 'engineers est dénombrable : fewer.', 'engineers is countable: fewer.'),
  QT('She spends ___ money on equipment than last year because the budget has doubled.', ['more'], "Elle dépense plus d'argent en équipement que l'an dernier car le budget a doublé.", 'Le budget a doublé : more.', 'The budget has doubled: more.'),
  QT('The new model is more efficient, so it uses ___ energy than the old one.', ['less'], "Le nouveau modèle est plus efficace, donc il consomme moins d'énergie que l'ancien.", 'energy est non dénombrable : less.', 'energy is uncountable: less.'),
  QT('We received ___ applications than in previous years, interest is growing.', ['more'], "Nous avons reçu plus de candidatures que les années précédentes, l'intérêt grandit.", 'Intérêt croissant : more.', 'Growing interest: more.')
];
const devoir = [
  K('Electric cars are ___ (efficient) than petrol cars in urban areas.', [['more efficient']], "Les voitures électriques sont plus efficaces que les voitures à essence en zone urbaine.", 'more efficient.', 'more efficient.'),
  K('She is ___ (hardworking) student in the cohort.', [['the most hardworking']], "C'est l'étudiante la plus travailleuse de la promotion.", 'the most hardworking.', 'the most hardworking.'),
  K('This model is not ___ (heavy) as the previous version.', [['as heavy']], "Ce modèle n'est pas aussi lourd que la version précédente.", 'not as ... as : as heavy.', 'not as ... as: as heavy.'),
  K('The ___ (much) you practise, the ___ (fluent) you become.', [['more'], ['more fluent']], "Plus tu t'entraînes, plus tu deviens fluide.", 'The more ..., the more fluent.', 'The more ..., the more fluent.'),
  K('His presentation was ___ (clear) than mine.', [['clearer']], "Sa présentation était plus claire que la mienne.", 'clear : clearer.', 'clear: clearer.'),
  K('This is ___ (far) we have ever run a field trial.', [FARTH], "C'est le plus loin que nous ayons jamais mené un essai sur le terrain.", 'far : the farthest ou the furthest.', 'far: the farthest or the furthest.'),
  K('The new regulations are ___ (strict) than the previous ones.', [['stricter']], "Les nouvelles réglementations sont plus strictes que les précédentes.", 'strict : stricter.', 'strict: stricter.'),
  K('She is getting ___ and ___ (good) at data analysis.', [['better'], ['better']], "Elle devient de meilleure en meilleure en analyse de données.", 'good est irrégulier : better and better.', 'good is irregular: better and better.'),
  K('This result is ___ (bad) we have ever recorded in the experiment.', [['the worst']], "C'est le pire résultat que nous ayons jamais enregistré dans l'expérience.", 'the worst.', 'the worst.'),
  K('The product is ___ (expensive) than we budgeted for.', [['more expensive']], "Le produit est plus cher que ce que nous avions prévu.", 'more expensive.', 'more expensive.'),
  K('The ___ (early) we identify the problem, the ___ (easy) it is to fix.', [['earlier'], ['easier']], "Plus tôt nous repérons le problème, plus il est facile à corriger.", 'The earlier ..., the easier ...', 'The earlier ..., the easier ...'),
  K("His approach is ___ (innovative) than anyone else's on the team.", [['more innovative']], "Son approche est plus innovante que celle de n'importe qui d'autre dans l'équipe.", 'more innovative.', 'more innovative.'),
  K('She speaks English ___ (well) than she did at the start of the year.', [['better']], "Elle parle mieux anglais qu'au début de l'année.", 'well : better.', 'well: better.'),
  K('This is ___ (challenging) project I have ever worked on.', [['the most challenging']], "C'est le projet le plus exigeant sur lequel j'aie jamais travaillé.", 'the most challenging.', 'the most challenging.'),
  K('Automation is making certain jobs ___ and ___ (rare).', [['rarer'], ['rarer']], "L'automatisation rend certains métiers de plus en plus rares.", 'rare finit par -e : rarer. Progression : rarer and rarer.', 'rare ends in -e: rarer. Gradual change: rarer and rarer.')
];
const m12a1 = [
  K('This engine is ___ (fast) than the old model.', [['faster']], "Ce moteur est plus rapide que l'ancien modèle.", 'faster.', 'faster.'),
  K('She is ___ (efficient) engineer in the team.', [['the most efficient']], "C'est l'ingénieure la plus efficace de l'équipe.", 'the most efficient.', 'the most efficient.'),
  K('The results were ___ (bad) than expected.', [['worse']], "Les résultats étaient pires que prévu.", 'bad : worse.', 'bad: worse.'),
  K('This is ___ (challenging) project I have ever managed.', [['the most challenging']], "C'est le projet le plus exigeant que j'aie jamais dirigé.", 'the most challenging.', 'the most challenging.'),
  K('The queue is getting ___ and ___ (long).', [['longer'], ['longer']], "La file d'attente s'allonge de plus en plus.", 'long : longer and longer.', 'long: longer and longer.')
];
const m12a2 = [
  K('The ___ (hard) you work, the ___ (good) the results.', [['harder'], ['better']], "Plus tu travailles dur, meilleurs sont les résultats.", 'The harder ..., the better ...', 'The harder ..., the better ...'),
  K('This method is far ___ (easy) to implement.', [['easier']], "Cette méthode est bien plus facile à mettre en œuvre.", 'far easier.', 'far easier.'),
  K('It is ___ (far) we have ever travelled for work.', [FARTH], "C'est le plus loin que nous soyons jamais allés pour le travail.", 'the farthest / the furthest.', 'the farthest / the furthest.'),
  K('She is not ___ (experienced) as her colleague.', [['as experienced']], "Elle n'est pas aussi expérimentée que son collègue.", 'not as experienced as.', 'not as experienced as.'),
  K('Renewable energy is becoming ___ and ___ (affordable).', [['more'], ['more affordable']], "L'énergie renouvelable devient de plus en plus abordable.", 'more and more affordable.', 'more and more affordable.')
];
const m12b = [
  W('laptop / is / lighter / this / than / my / old / one', ['This laptop is lighter than my old one.'], "Cet ordinateur portable est plus léger que mon ancien.", 'adjectif court + -er + than.', 'short adjective + -er + than.'),
  W('is / most / reliable / she / the / technician / on / team / the', ['She is the most reliable technician on the team.'], "C'est la technicienne la plus fiable de l'équipe.", 'the most + adjectif long.', 'the most + long adjective.'),
  W('lasts / longer / the / new / battery / than / the / previous / one', ['The new battery lasts longer than the previous one.'], "La nouvelle batterie dure plus longtemps que la précédente.", 'longer than.', 'longer than.'),
  W('easiest / is / this / the / solution / we / have / found / so / far', ['This is the easiest solution we have found so far.'], "C'est la solution la plus simple que nous ayons trouvée jusqu'ici.", 'the easiest + Present Perfect.', 'the easiest + present perfect.'),
  W('getting / is / traffic / worse / and / worse / in / this / city', ['Traffic is getting worse and worse in this city.'], "La circulation empire de plus en plus dans cette ville.", 'worse and worse.', 'worse and worse.'),
  W('bigger / the / team / the / harder / it / is / to / coordinate', ['The bigger the team, the harder it is to coordinate.'], "Plus l'équipe est grande, plus il est difficile de la coordonner.", 'The + comparatif, the + comparatif.', 'The + comparative, the + comparative.'),
  W("far / is / this / by / the / best / result / we've / achieved", ["This is by far the best result we've achieved.", 'This is by far the best result we have achieved.'], "C'est de loin le meilleur résultat que nous ayons obtenu.", 'by far the best.', 'by far the best.'),
  W('is / less / confident / he / than / his / teammate', ['He is less confident than his teammate.'], "Il est moins sûr de lui que son coéquipier.", 'less + adjectif + than.', 'less + adjective + than.')
];
const th = [
  R("Ce téléphone est plus léger que le mien.", ['This phone is lighter than mine.', 'This phone is lighter than my phone.', 'This mobile is lighter than mine.', 'This cell phone is lighter than mine.'], 'léger a une syllabe : lighter. Le mien : mine.', 'light has one syllable: lighter. Le mien: mine.'),
  R("Il est l'ingénieur le plus compétent du service.", ['He is the most competent engineer in the department.', "He's the most competent engineer in the department.", 'He is the most skilled engineer in the department.', 'He is the most competent engineer in the team.'], 'Superlatif long : the most competent, suivi de in the department.', 'Long superlative: the most competent, followed by in the department.'),
  R("Le nouveau moteur consomme moins que le précédent.", ['The new engine uses less fuel than the previous one.', 'The new engine consumes less fuel than the previous one.', 'The new engine uses less than the previous one.', 'The new engine uses less energy than the previous one.', 'The new engine consumes less than the previous one.'], 'moins de + nom non dénombrable : less.', 'moins de + uncountable noun: less.'),
  R("C'est la méthode la plus fiable que nous ayons testée jusqu'ici.", ['This is the most reliable method we have tested so far.', 'It is the most reliable method we have tested so far.', "It's the most reliable method we have tested so far.", 'This is the most reliable method we have tested to date.', "This is the most reliable method we've tested so far."], 'Superlatif + Present Perfect : the most reliable ... we have tested.', 'Superlative + present perfect: the most reliable ... we have tested.'),
  R("Les prix augmentent de plus en plus vite.", ['Prices are rising faster and faster.', 'Prices are increasing faster and faster.', 'The prices are rising faster and faster.', 'Prices are going up faster and faster.'], 'de plus en plus vite : faster and faster.', 'de plus en plus vite: faster and faster.'),
  R("Plus on teste, plus on trouve d'erreurs.", ['The more we test, the more errors we find.', 'The more you test, the more errors you find.', 'The more we test, the more mistakes we find.', 'The more one tests, the more errors one finds.', 'The more we test, the more bugs we find.'], 'The more ..., the more ...', 'The more ..., the more ...'),
  R("C'est de loin la pire panne que nous ayons connue.", ['This is by far the worst failure we have had.', 'This is by far the worst breakdown we have had.', "It's by far the worst failure we have had.", 'It is by far the worst failure we have ever had.', 'This is by far the worst failure we have ever had.', 'This is by far the worst breakdown we have ever had.', 'This is by far the worst failure we have experienced.'], 'by far + the worst : superlatif irrégulier.', 'by far + the worst: irregular superlative.')
];

const FORM = SK('Comparatifs et superlatifs : formation', 'Comparatives and superlatives: formation');
const ADV = SK('Comparatifs : the more..., de plus en plus, renforcement', 'Comparatives: the more..., more and more, intensifiers');
export const G12 = {
  id: 'G12',
  title: 'Comparatifs et superlatifs (Comparatives & Superlatives)',
  coursUrl: '',
  skills: {
    '*': FORM,
    'g12-guidee-b': ADV, 'g12-niv-b': ADV, 'g12-m12a-2': ADV,
    'g12-niv-d': SK('Comparatifs : production libre', 'Comparatives: free production'),
    'g12-bonus': SK('Quantité : more, fewer, less', 'Quantity: more, fewer, less'),
    'g12-niv-c': SK('Comparatifs : corrections et thème', 'Comparatives: corrections and translation'),
    'g12-th': SK('Comparatifs : corrections et thème', 'Comparatives: corrections and translation'),
    'g12-m12b': SK('Ordre des mots', 'Word order')
  },
  sets: [
    S('g12-guidee-a', FICHE, ['Série guidée A : comparatif', 'Guided set A: comparative'], 'B1', ['Complète avec la forme comparative correcte.', 'Complete with the correct comparative form.'], guideeA),
    S('g12-guidee-b', FICHE, ['Série guidée B : superlatif et structures avancées', 'Guided set B: superlative and advanced structures'], 'B1+', ['Complète avec la forme superlative ou la structure demandée.', 'Complete with the superlative form or the structure required.'], guideeB),
    S('g12-niv-a', FICHE, ['Niveau A : fondamentaux', 'Level A: basics'], 'B1', ['Complète avec la forme correcte.', 'Complete with the correct form.'], nivA),
    S('g12-niv-b', FICHE, ['Niveau B : double comparatif et structures', 'Level B: double comparative and structures'], 'B1+', ['Complète avec la forme correcte.', 'Complete with the correct form.'], nivB),
    S('g12-niv-c', FICHE, ['Niveau C : erreurs et traduction', 'Level C: errors and translation'], 'B1+', ['Corrige cinq phrases, puis traduis cinq phrases.', 'Correct five sentences, then translate five sentences.'], nivC),
    S('g12-niv-d', FICHE, ['Niveau D : production et analyse', 'Level D: production and analysis'], 'B2', ['Complète librement, puis compare avec le modèle.', 'Complete freely, then compare with the model.'], nivD),
    S('g12-bonus', FICHE, ['Bonus : comparatif de quantité', 'Bonus: comparing quantity'], 'B1+', ['Complète avec more, fewer ou less.', 'Complete with more, fewer or less.'], bonus),
    S('g12-devoir', FICHE, ['Devoir maison', 'Homework'], 'B1+', ['Quinze phrases à compléter avec la forme correcte.', 'Fifteen sentences to complete with the correct form.'], devoir),
    S('g12-m12a-1', MURPHY, ['Unité 12A : formation (1/2)', 'Unit 12A: formation (1/2)'], 'B1', ['Forme le comparatif ou le superlatif.', 'Form the comparative or superlative.'], m12a1),
    S('g12-m12a-2', MURPHY, ['Unité 12A : structures avancées (2/2)', 'Unit 12A: advanced structures (2/2)'], 'B1+', ['Complète avec la bonne structure.', 'Complete with the right structure.'], m12a2),
    S('g12-m12b', MURPHY, ['Unité 12B : remettre les mots dans l\'ordre', 'Unit 12B: sentence building'], 'B1+', ['Écris la phrase complète avec les mots dans le bon ordre.', 'Write the complete sentence with the words in the right order.'], m12b),
    S('g12-th', MURPHY, ['Unité TH : thème grammatical', 'Unit TH: translation'], 'B1+', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], th)
  ],
  recap: {
    blocks: [
      {
        title: 'Comparatif',
        forms: [
          ['court (fast, big, happy)', 'as fast as / faster than / less fast than'],
          ['long (efficient, important)', 'as efficient as / more efficient than / less efficient than'],
          ['irrégulier', 'good, better ; bad, worse ; far, farther / further']
        ],
        uses: ['Orthographe : big, bigger (doublement) ; happy, happier (y devient ier) ; nice, nicer.']
      },
      {
        title: 'Superlatif et structures avancées',
        forms: [
          ['adjectif court', 'the fastest'],
          ['adjectif long', 'the most efficient / the least efficient'],
          ['irrégulier', 'the best, the worst, the farthest'],
          ['the ..., the ...', 'The harder you work, the better the results.'],
          ['de plus en plus', 'harder and harder / more and more complex'],
          ['renforcer', 'far / much / a lot / slightly better than']
        ],
        uses: ['Superlatif souvent suivi du Present Perfect : the best project I have ever seen.']
      }
    ],
    tables: [],
    notes: ['Pas de double comparatif : harder, jamais more harder.', 'fewer avec un nom dénombrable, less avec un nom non dénombrable.'],
    rule: '1 syllabe : -er / -est ; 2 syllabes en -y : -ier / -iest ; 3 syllabes et plus : more / most.'
  },
  enMeta: {
    title: 'Comparatives & Superlatives',
    recap: {
      blocks: [
        {
          title: 'Comparative',
          forms: [
            ['short (fast, big, happy)', 'as fast as / faster than / less fast than'],
            ['long (efficient, important)', 'as efficient as / more efficient than / less efficient than'],
            ['irregular', 'good, better; bad, worse; far, farther / further']
          ],
          uses: ['Spelling: big, bigger (doubling); happy, happier (y becomes ier); nice, nicer.']
        },
        {
          title: 'Superlative and advanced structures',
          forms: [
            ['short adjective', 'the fastest'],
            ['long adjective', 'the most efficient / the least efficient'],
            ['irregular', 'the best, the worst, the farthest'],
            ['the ..., the ...', 'The harder you work, the better the results.'],
            ['more and more', 'harder and harder / more and more complex'],
            ['intensifying', 'far / much / a lot / slightly better than']
          ],
          uses: ['The superlative is often followed by the present perfect: the best project I have ever seen.']
        }
      ],
      tables: [],
      notes: ['No double comparative: harder, never more harder.', 'fewer with a countable noun, less with an uncountable noun.'],
      rule: '1 syllable: -er / -est; 2 syllables ending in -y: -ier / -iest; 3 syllables and more: more / most.'
    }
  }
};
