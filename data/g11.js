// G11 : Irregular Verbs, the 3 forms
// Contenu reconstruit à partir de la fiche élève, du supplément Murphy et du corrigé enseignant du hub.
import { S, FICHE, MURPHY, C, T, F, R, W, P } from './dsl2.js';

const hint = (fr, en) => [fr, en];
const K = (s, a, fr, why, whyEn, h) => C(s, a, fr, why, whyEn, h ? h[0] : null, h ? h[1] : null);
const V2 = "V2 (prétérit) : forme employée seule, sans auxiliaire, pour une action passée terminée.";
const V2E = 'V2 (past simple): the form used on its own, with no auxiliary, for a finished past action.';
const V3 = "V3 (participe passé) : après have / has / had (temps composés) ou be (passif).";
const V3E = 'V3 (past participle): after have / has / had (perfect tenses) or be (passive).';
// Trois formes : 3(s, [ [v2], [v3] ]) etc. Les formes données restent dans la phrase.
const tri = (s, a, fr, why, whyEn, h) => K(s, a, fr, why, whyEn, h);

const guideeA = [
  K('She ___ (go) to the lab early this morning.', [['went']], "Elle est allée au labo tôt ce matin.", V2 + ' go donne went.', V2E + ' go gives went.', hint('prétérit', 'past simple')),
  K('I have ___ (see) this documentary before.', [['seen']], "J'ai déjà vu ce documentaire.", V3 + ' see donne seen.', V3E + ' see gives seen.', hint('have + V3', 'have + V3')),
  K('The report was ___ (write) by the team.', [['written']], "Le rapport a été écrit par l'équipe.", V3 + ' write donne written.', V3E + ' write gives written.', hint('passif : be + V3', 'passive: be + V3')),
  K('He ___ (know) the answer immediately.', [['knew']], "Il a su la réponse immédiatement.", V2 + ' know donne knew.', V2E + ' know gives knew.', hint('prétérit', 'past simple')),
  K('We had ___ (do) the analysis before she arrived.', [['done']], "Nous avions fait l'analyse avant son arrivée.", V3 + ' do donne done.', V3E + ' do gives done.', hint('Past Perfect : had + V3', 'past perfect: had + V3')),
  K('She ___ (speak) at the international conference last year.', [['spoke']], "Elle a pris la parole à la conférence internationale l'an dernier.", V2 + ' speak donne spoke.', V2E + ' speak gives spoke.', hint('prétérit', 'past simple')),
  K('The bridge had ___ (build) before the war.', [['been built']], "Le pont avait été construit avant la guerre.", "Past Perfect passif : had been + V3. build donne built.", 'Past perfect passive: had been + V3. build gives built.', hint('had been + V3', 'had been + V3')),
  K('He ___ (lose) his key card again this morning.', [['lost']], "Il a encore perdu son badge ce matin.", V2 + ' lose donne lost.', V2E + ' lose gives lost.', hint('prétérit', 'past simple')),
  K('Have you ever ___ (ride) a horse?', [['ridden']], "As-tu déjà monté à cheval ?", V3 + ' ride donne ridden.', V3E + ' ride gives ridden.', hint('have + V3', 'have + V3')),
  K('The data has been ___ (collect) over six months.', [['collected']], "Les données ont été collectées pendant six mois.", "Attention : collect est un verbe régulier, donc collected (V2 = V3 = collected).", 'Watch out: collect is a regular verb, so collected (V2 = V3 = collected).', hint('attention, verbe régulier', 'careful, regular verb'))
];

const guideeB = [
  K('break → ___ → ___', [['broke'], ['broken']], "briser : broke, broken.", "Famille speak, steal (-eak, -eal) : V2 en -oke, V3 en -oken.", 'Family of speak, steal (-eak, -eal): V2 in -oke, V3 in -oken.'),
  K('choose → ___ → ___', [['chose'], ['chosen']], "choisir : chose, chosen.", "Famille freeze (-oose) : chose, chosen.", 'Family of freeze (-oose): chose, chosen.'),
  K('___ → kept → kept', [['keep']], "garder : keep, kept, kept.", "Famille sleep, sweep (-eep) : V2 = V3 = kept.", 'Family of sleep, sweep (-eep): V2 = V3 = kept.'),
  K('ride → ___ → ___', [['rode'], ['ridden']], "monter : rode, ridden.", "Famille write, drive (-ide) : rode, ridden.", 'Family of write, drive (-ide): rode, ridden.'),
  K('___ → ___ → spoken', [['speak'], ['spoke']], "parler : speak, spoke, spoken.", "Famille break, steal : speak, spoke, spoken.", 'Family of break, steal: speak, spoke, spoken.'),
  K('fly → ___ → ___', [['flew'], ['flown']], "voler (dans les airs) : flew, flown.", "Verbe isolé à mémoriser : fly, flew, flown.", 'An isolated verb to memorise: fly, flew, flown.'),
  K('steal → ___ → ___', [['stole'], ['stolen']], "voler (dérober) : stole, stolen.", "Famille speak, break : stole, stolen.", 'Family of speak, break: stole, stolen.'),
  K('___ → drove → ___', [['drive'], ['driven']], "conduire : drive, drove, driven.", "Famille ride, write : drive, drove, driven.", 'Family of ride, write: drive, drove, driven.'),
  K('___ → ___ → frozen', [['freeze'], ['froze']], "geler : freeze, froze, frozen.", "Famille choose : freeze, froze, frozen.", 'Family of choose: freeze, froze, frozen.'),
  K('grow → ___ → ___', [['grew'], ['grown']], "grandir, croître : grew, grown.", "Famille know, throw : grew, grown.", 'Family of know, throw: grew, grown.')
];

const nivA = [
  K('He ___ (give) a technical presentation last Thursday.', [['gave']], "Il a fait une présentation technique jeudi dernier.", V2 + ' give donne gave.', V2E + ' give gives gave.'),
  K('She has ___ (take) a new position in the R&D department.', [['taken']], "Elle a pris un nouveau poste au service R&D.", V3 + ' take donne taken.', V3E + ' take gives taken.'),
  K('The report was ___ (write) in English for an international audience.', [['written']], "Le rapport a été rédigé en anglais pour un public international.", V3 + ' write donne written.', V3E + ' write gives written.'),
  K('I ___ (find) the solution after hours of careful analysis.', [['found']], "J'ai trouvé la solution après des heures d'analyse minutieuse.", V2 + ' find donne found.', V2E + ' find gives found.'),
  K('They have ___ (spend) three weeks on this particular problem.', [['spent']], "Ils ont passé trois semaines sur ce problème précis.", V3 + ' spend donne spent.', V3E + ' spend gives spent.'),
  K('We had ___ (build) the prototype before the deadline.', [['built']], "Nous avions construit le prototype avant la date limite.", V3 + ' build donne built.', V3E + ' build gives built.'),
  K('The decision was ___ (make) by the board of directors.', [['made']], "La décision a été prise par le conseil d'administration.", V3 + ' make donne made.', V3E + ' make gives made.'),
  K('He ___ (sell) his start-up for €10 million last year.', [['sold']], "Il a vendu sa start-up 10 millions d'euros l'an dernier.", V2 + ' sell donne sold.', V2E + ' sell gives sold.'),
  K('I have ___ (fall) behind on my thesis, I must catch up.', [['fallen']], "J'ai pris du retard sur ma thèse, je dois rattraper.", V3 + ' fall donne fallen.', V3E + ' fall gives fallen.'),
  K('She ___ (become) the head of department three years ago.', [['became']], "Elle est devenue chef de département il y a trois ans.", V2 + ' become donne became (V3 = become).', V2E + ' become gives became (V3 = become).')
];
const nivB = [
  K('teach → ___ → ___', [['taught'], ['taught']], "enseigner : taught, taught.", "V2 = V3 = taught.", 'V2 = V3 = taught.'),
  K('think → ___ → ___', [['thought'], ['thought']], "penser : thought, thought.", "V2 = V3 = thought.", 'V2 = V3 = thought.'),
  K('tell → ___ → ___', [['told'], ['told']], "dire : told, told.", "V2 = V3 = told.", 'V2 = V3 = told.'),
  K('win → ___ → ___', [['won'], ['won']], "gagner : won, won.", "V2 = V3 = won.", 'V2 = V3 = won.'),
  K('sit → ___ → ___', [['sat'], ['sat']], "s'asseoir : sat, sat.", "V2 = V3 = sat.", 'V2 = V3 = sat.'),
  K('ring → ___ → ___', [['rang'], ['rung']], "sonner : rang, rung.", "Triade en i, a, u : ring, rang, rung.", 'The i, a, u pattern: ring, rang, rung.'),
  K('sing → ___ → ___', [['sang'], ['sung']], "chanter : sang, sung.", "Triade en i, a, u : sing, sang, sung.", 'The i, a, u pattern: sing, sang, sung.'),
  K('swim → ___ → ___', [['swam'], ['swum']], "nager : swam, swum.", "Triade en i, a, u : swim, swam, swum.", 'The i, a, u pattern: swim, swam, swum.'),
  K('drink → ___ → ___', [['drank'], ['drunk']], "boire : drank, drunk.", "Triade en i, a, u : drink, drank, drunk.", 'The i, a, u pattern: drink, drank, drunk.'),
  K('begin → ___ → ___', [['began'], ['begun']], "commencer : began, begun.", "Triade en i, a, u : begin, began, begun.", 'The i, a, u pattern: begin, began, begun.')
];
const nivC = [
  F('She has went to Paris twice this year.', ['She has gone to Paris twice this year.'], "Elle est allée à Paris deux fois cette année.", "Après has, il faut le participe passé : gone (go, went, gone).", 'After has, the past participle is needed: gone (go, went, gone).'),
  F('He teached us the basics of thermodynamics.', ['He taught us the basics of thermodynamics.'], "Il nous a enseigné les bases de la thermodynamique.", "teach est irrégulier : taught (teach, taught, taught).", 'teach is irregular: taught (teach, taught, taught).'),
  F('The bridge was builded in the 19th century.', ['The bridge was built in the 19th century.'], "Le pont a été construit au XIXe siècle.", "build est irrégulier : built (build, built, built).", 'build is irregular: built (build, built, built).'),
  F('They have catched the error in the algorithm.', ['They have caught the error in the algorithm.'], "Ils ont repéré l'erreur dans l'algorithme.", "catch est irrégulier : caught (catch, caught, caught).", 'catch is irregular: caught (catch, caught, caught).'),
  F('I have never drove a hybrid vehicle before.', ['I have never driven a hybrid vehicle before.'], "Je n'ai jamais conduit de véhicule hybride.", "Après have, il faut le participe passé : driven (drive, drove, driven).", 'After have, the past participle is needed: driven (drive, drove, driven).'),
  R("Elle a écrit trois rapports cette semaine.", ['This week, she has written three reports.', 'She has written three reports this week.', "She's written three reports this week."], "cette semaine (non terminée) appelle le Present Perfect : has written.", 'this week (not over) calls for the present perfect: has written.'),
  R("Le système a planté pendant que nous le testions.", ['The system crashed while we were testing it.', 'The system crashed as we were testing it.', 'The system crashed while we were testing.'], "Action brève (crashed, Past Simple) pendant une action en cours (were testing, Past Continuous).", 'A short action (crashed, past simple) during an ongoing action (were testing, past continuous).'),
  R("Nous avions déjà terminé quand il est arrivé.", ['We had already finished when he arrived.', "We'd already finished when he arrived.", 'We had finished already when he arrived.'], "Action antérieure à une autre action passée : Past Perfect (had finished), puis arrived.", 'An action before another past action: past perfect (had finished), then arrived.'),
  R("Il a vendu sa part de l'entreprise l'année dernière.", ['He sold his share of the company last year.', 'He sold his stake in the company last year.', 'He sold his share in the company last year.'], "Passé daté (l'année dernière) : Past Simple, V2 de sell = sold.", 'A dated past (last year): past simple, V2 of sell = sold.'),
  R("Cette erreur a été faite plusieurs fois auparavant.", ['This mistake has been made several times before.', 'This error has been made several times before.', 'This mistake has been made many times before.'], "Present Perfect passif : has been made (make, made, made).", 'Present perfect passive: has been made (make, made, made).')
];
const nivD = [
  K('Last month, our team ___ (undertake) a full review of the system. We ___ (find) several critical bugs that ___ (lead) to data loss.', [['undertook'], ['found'], ['led']], "Le mois dernier, notre équipe a mené un examen complet du système. Nous avons trouvé plusieurs bogues critiques qui entraînaient des pertes de données.", "Récit au passé : V2 de undertake = undertook, find = found, lead = led.", 'Narrative in the past: V2 of undertake = undertook, find = found, lead = led.'),
  K('The previous team ___ (build) the architecture without proper documentation, which ___ (make) the review much harder.', [['had built', 'built'], ['made']], "L'équipe précédente avait construit l'architecture sans documentation correcte, ce qui avait rendu l'examen beaucoup plus difficile.", "had built (antérieur) ou built ; made, V2 de make.", 'had built (earlier action) or built; made, V2 of make.'),
  K('Once we ___ (understand) the problem, we ___ (write) a full report and ___ (send) it to all stakeholders.', [['understood'], ['wrote'], ['sent']], "Une fois le problème compris, nous avons rédigé un rapport complet et l'avons envoyé à toutes les parties prenantes.", "Trois actions successives au passé : understood, wrote, sent.", 'Three successive past actions: understood, wrote, sent.'),
  K('Since then, we have ___ (implement) stricter coding standards. The new protocol has ___ (begin) to show results.', [['implemented'], ['begun']], "Depuis, nous avons mis en place des normes de codage plus strictes. Le nouveau protocole a commencé à donner des résultats.", "implement est régulier : implemented. begin est irrégulier : begun (V3).", 'implement is regular: implemented. begin is irregular: begun (V3).'),
  K('By next quarter, all legacy code will have ___ (rewrite) and ___ (test).', [['been rewritten'], ['been tested', 'tested']], "D'ici le prochain trimestre, tout le code hérité aura été réécrit et testé.", "Futur antérieur passif : will have been rewritten (rewrite, rewrote, rewritten). test est régulier : tested.", 'Future perfect passive: will have been rewritten (rewrite, rewrote, rewritten). test is regular: tested.')
];
const bonus = [
  K('Past simple: be → ___ / have → ___ / do → ___ / go → ___ / get → ___', [['was', 'were'], ['had'], ['did'], ['went'], ['got']], "be : was ou were ; have : had ; do : did ; go : went ; get : got.", "V2 : was / were, had, did, went, got.", 'V2: was / were, had, did, went, got.'),
  K('Past simple: come → ___ / give → ___ / take → ___ / make → ___ / say → ___', [['came'], ['gave'], ['took'], ['made'], ['said']], "come : came ; give : gave ; take : took ; make : made ; say : said.", "V2 : came, gave, took, made, said.", 'V2: came, gave, took, made, said.'),
  K('Past simple: see → ___ / know → ___ / think → ___ / find → ___ / tell → ___', [['saw'], ['knew'], ['thought'], ['found'], ['told']], "see : saw ; know : knew ; think : thought ; find : found ; tell : told.", "V2 : saw, knew, thought, found, told.", 'V2: saw, knew, thought, found, told.'),
  K('Past simple: leave → ___ / feel → ___ / keep → ___ / meet → ___ / lose → ___', [['left'], ['felt'], ['kept'], ['met'], ['lost']], "leave : left ; feel : felt ; keep : kept ; meet : met ; lose : lost.", "V2 : left, felt, kept, met, lost.", 'V2: left, felt, kept, met, lost.'),
  K('Past simple: write → ___ / speak → ___ / break → ___ / choose → ___ / grow → ___', [['wrote'], ['spoke'], ['broke'], ['chose'], ['grew']], "write : wrote ; speak : spoke ; break : broke ; choose : chose ; grow : grew.", "V2 : wrote, spoke, broke, chose, grew.", 'V2: wrote, spoke, broke, chose, grew.')
];
const devoir = [
  K('She has ___ (know) this professor for three years.', [['known']], "Elle connaît ce professeur depuis trois ans.", V3 + ' know donne known.', V3E + ' know gives known.'),
  K('I ___ (forget) to send the attachment yesterday.', [['forgot']], "J'ai oublié d'envoyer la pièce jointe hier.", V2 + ' forget donne forgot.', V2E + ' forget gives forgot.'),
  K('The protocol has been ___ (write) and ___ (send) to all departments.', [['written'], ['sent']], "Le protocole a été rédigé et envoyé à tous les services.", "Present Perfect passif : has been written and sent.", 'Present perfect passive: has been written and sent.'),
  K('They ___ (buy) new laboratory equipment last month.', [['bought']], "Ils ont acheté du nouveau matériel de laboratoire le mois dernier.", V2 + ' buy donne bought.', V2E + ' buy gives bought.'),
  K('The engineer ___ (think) carefully before answering.', [['thought']], "L'ingénieur a réfléchi attentivement avant de répondre.", V2 + ' think donne thought.', V2E + ' think gives thought.'),
  K('He had ___ (drink) his coffee before the morning briefing started.', [['drunk']], "Il avait bu son café avant le début du briefing du matin.", V3 + ' drink donne drunk.', V3E + ' drink gives drunk.'),
  K('The start-up ___ (grow) significantly over the last financial year.', [['grew', 'has grown']], "La start-up a fortement grandi au cours du dernier exercice.", "grew (V2, exercice terminé) ou has grown (Present Perfect).", 'grew (V2, finished year) or has grown (present perfect).'),
  K('We have ___ (choose) a different research methodology.', [['chosen']], "Nous avons choisi une autre méthodologie de recherche.", V3 + ' choose donne chosen.', V3E + ' choose gives chosen.'),
  K('The professor ___ (teach) us this concept in September.', [['taught']], "Le professeur nous a enseigné ce concept en septembre.", V2 + ' teach donne taught.', V2E + ' teach gives taught.'),
  K('She ___ (win) three international awards in her career so far.', [['has won']], "Elle a remporté trois prix internationaux dans sa carrière jusqu'ici.", "so far (jusqu'à présent) appelle le Present Perfect : has won.", 'so far calls for the present perfect: has won.'),
  K('rise → ___ → ___', [['rose'], ['risen']], "s'élever : rose, risen.", "rise, rose, risen.", 'rise, rose, risen.'),
  K('blow → ___ → ___', [['blew'], ['blown']], "souffler : blew, blown.", "Famille know, grow, throw : blow, blew, blown.", 'Family of know, grow, throw: blow, blew, blown.'),
  K('bite → ___ → ___', [['bit'], ['bitten']], "mordre : bit, bitten.", "bite, bit, bitten.", 'bite, bit, bitten.'),
  K('___ → slept → ___', [['sleep'], ['slept']], "dormir : sleep, slept, slept.", "sleep, slept, slept.", 'sleep, slept, slept.'),
  K('___ → ___ → shown', [['show'], ['showed']], "montrer : show, showed, shown.", "show, showed, shown (showed est aussi accepté pour V2).", 'show, showed, shown (showed is also accepted for V2).')
];
const m11a1 = [
  K('He has ___ (write) five emails since nine o\'clock.', [['written']], "Il a écrit cinq courriels depuis neuf heures.", V3 + ' write donne written.', V3E + ' write gives written.'),
  K('He ___ (speak) at the conference last year.', [['spoke']], "Il a pris la parole à la conférence l'an dernier.", V2 + ' speak donne spoke.', V2E + ' speak gives spoke.'),
  K('The bridge was ___ (build) in 1895.', [['built']], "Le pont a été construit en 1895.", V3 + ' build donne built.', V3E + ' build gives built.'),
  K('Have you ever ___ (ride) a motorbike?', [['ridden']], "As-tu déjà fait de la moto ?", V3 + ' ride donne ridden.', V3E + ' ride gives ridden.'),
  K('I had ___ (forget) to save my work.', [['forgotten']], "J'avais oublié d'enregistrer mon travail.", V3 + ' forget donne forgotten.', V3E + ' forget gives forgotten.')
];
const m11a2 = [
  K('wear → ___ → ___', [['wore'], ['worn']], "porter : wore, worn.", "wear, wore, worn.", 'wear, wore, worn.'),
  K('shake → ___ → ___', [['shook'], ['shaken']], "secouer : shook, shaken.", "shake, shook, shaken.", 'shake, shook, shaken.'),
  K('throw → ___ → ___', [['threw'], ['thrown']], "lancer : threw, thrown.", "throw, threw, thrown.", 'throw, threw, thrown.'),
  K('hide → ___ → ___', [['hid'], ['hidden']], "cacher : hid, hidden.", "hide, hid, hidden.", 'hide, hid, hidden.'),
  K('draw → ___ → ___', [['drew'], ['drawn']], "dessiner : drew, drawn.", "draw, drew, drawn.", 'draw, drew, drawn.')
];
const m11b = [
  W('record / broke / year / she / the / last', ['She broke the record last year.', 'Last year she broke the record.'], "Elle a battu le record l'an dernier.", 'Past Simple : broke (V2 de break).', 'Past simple: broke (V2 of break).'),
  W('option / chosen / has / best / he / the', ['He has chosen the best option.'], "Il a choisi la meilleure option.", 'Present Perfect : has chosen (V3 de choose).', 'Present perfect: has chosen (V3 of choose).'),
  W('confidential / kept / they / data / the', ['They kept the data confidential.'], "Ils ont gardé les données confidentielles.", 'Past Simple : kept (V2 de keep).', 'Past simple: kept (V2 of keep).'),
  W('Alps / flew / the / plane / over / the', ['The plane flew over the Alps.'], "L'avion a survolé les Alpes.", 'Past Simple : flew (V2 de fly).', 'Past simple: flew (V2 of fly).'),
  W('files / thrown / old / away / have / the / we', ['We have thrown away the old files.', 'We have thrown the old files away.'], "Nous avons jeté les vieux fichiers.", 'Present Perfect : have thrown (V3 de throw).', 'Present perfect: have thrown (V3 of throw).'),
  W('train / caught / early / he / the', ['He caught the early train.'], "Il a pris le train du matin.", 'Past Simple : caught (V2 de catch).', 'Past simple: caught (V2 of catch).'),
  W('years / taught / ten / has / here / she / for', ['She has taught here for ten years.'], "Elle enseigne ici depuis dix ans.", 'Present Perfect : has taught (V3 de teach).', 'Present perfect: has taught (V3 of teach).'),
  W('budget / spent / whole / they / the', ['They spent the whole budget.'], "Ils ont dépensé tout le budget.", 'Past Simple : spent (V2 de spend).', 'Past simple: spent (V2 of spend).')
];
const th = [
  R("Il m'a prêté son ordinateur.", ['He lent me his laptop.', 'He lent me his computer.', 'He lent his laptop to me.', 'He lent his computer to me.'], "prêter : lend, lent, lent. Le prétérit est lent.", 'to lend: lend, lent, lent. The past simple is lent.'),
  R("Elle a porté ce badge toute la semaine.", ['She has worn this badge all week.', 'She has been wearing this badge all week.', 'She wore this badge all week.', 'She has worn that badge all week.'], "wear, wore, worn. Toute la semaine (non terminée) : has worn.", 'wear, wore, worn. All week (not over): has worn.'),
  R("Ils ont nagé dans le lac.", ['They swam in the lake.', 'They went swimming in the lake.', 'They have swum in the lake.'], "swim, swam, swum. Action passée terminée : swam.", 'swim, swam, swum. A finished past action: swam.'),
  R("Apporte ton rapport demain.", ['Bring your report tomorrow.', 'Bring your report with you tomorrow.', 'Bring in your report tomorrow.'], "Impératif : bring, la forme de base.", 'Imperative: bring, the base form.'),
  R("Nous avons vendu tous les billets.", ['We sold all the tickets.', 'We have sold all the tickets.', 'We sold every ticket.', "We've sold all the tickets."], "sell, sold, sold.", 'sell, sold, sold.'),
  R("J'ai perdu mes clés hier.", ['I lost my keys yesterday.', 'I lost my keys yesterday.'], "hier impose le Past Simple : lost (V2 de lose).", 'yesterday requires the past simple: lost (V2 of lose).'),
  R("Nous nous sommes rencontrés à la conférence.", ['We met at the conference.', 'We met at the conference.'], "meet, met, met. Passé daté : met.", 'meet, met, met. A dated past: met.')
];

const SK = (fr, en) => [fr, en];
const CTX = SK('Verbes irréguliers : prétérit ou participe passé', 'Irregular verbs: past simple or past participle');
const FORMS = SK('Verbes irréguliers : les 3 formes', 'Irregular verbs: the 3 forms');
export const G11 = {
  id: 'G11',
  title: 'Les verbes irréguliers (Irregular Verbs)',
  coursUrl: '',
  skills: {
    '*': CTX,
    'g11-guidee-a': CTX, 'g11-niv-a': CTX, 'g11-devoir': CTX, 'g11-m11a-1': CTX, 'g11-niv-d': CTX,
    'g11-guidee-b': FORMS, 'g11-niv-b': FORMS, 'g11-m11a-2': FORMS,
    'g11-bonus': SK('Verbes irréguliers : prétérit (test éclair)', 'Irregular verbs: past simple (quick test)'),
    'g11-niv-c': SK('Verbes irréguliers : corrections et thème', 'Irregular verbs: corrections and translation'),
    'g11-th': SK('Verbes irréguliers : corrections et thème', 'Irregular verbs: corrections and translation'),
    'g11-m11b': SK('Ordre des mots', 'Word order')
  },
  sets: [
    S('g11-guidee-a', FICHE, ['Série guidée A : V2 ou V3 ?', 'Guided set A: V2 or V3?'], 'A2', ['Complète avec le prétérit (V2) ou le participe passé (V3).', 'Complete with the past simple (V2) or the past participle (V3).'], guideeA),
    S('g11-guidee-b', FICHE, ['Série guidée B : donner les 3 formes', 'Guided set B: giving the 3 forms'], 'B1', ['Complète les trois formes du verbe.', 'Complete the three forms of the verb.'], guideeB),
    S('g11-niv-a', FICHE, ['Niveau A : usage en contexte', 'Level A: use in context'], 'A2', ['Complète avec la bonne forme du verbe irrégulier.', 'Complete with the correct form of the irregular verb.'], nivA),
    S('g11-niv-b', FICHE, ['Niveau B : les trois formes', 'Level B: the three forms'], 'B1', ['Donne les trois formes complètes.', 'Give the three complete forms.'], nivB),
    S('g11-niv-c', FICHE, ['Niveau C : erreurs à corriger et thème', 'Level C: errors to correct and translation'], 'B1+', ['Corrige cinq phrases, puis traduis cinq phrases.', 'Correct five sentences, then translate five sentences.'], nivC),
    S('g11-niv-d', FICHE, ['Niveau D : texte à compléter', 'Level D: gap-fill text'], 'B2', ['Complète avec les verbes aux temps corrects.', 'Complete with the verbs in the correct tenses.'], nivD),
    S('g11-bonus', FICHE, ['Bonus : test éclair des 50 irréguliers', 'Bonus: quick test on 50 irregulars'], 'B1', ['Donne le prétérit (V2) de chaque verbe.', 'Give the past simple (V2) of each verb.'], bonus),
    S('g11-devoir', FICHE, ['Devoir maison', 'Homework'], 'B1', ['Conjugue au temps indiqué ou complète les 3 formes.', 'Conjugate in the tense shown or complete the 3 forms.'], devoir),
    S('g11-m11a-1', MURPHY, ['Unité 11A : les 3 formes en phrase (1/2)', 'Unit 11A: the 3 forms in sentences (1/2)'], 'B1', ['Donne la bonne forme du verbe irrégulier.', 'Give the correct form of the irregular verb.'], m11a1),
    S('g11-m11a-2', MURPHY, ['Unité 11A : donner les 3 formes (2/2)', 'Unit 11A: giving the 3 forms (2/2)'], 'B1', ['Donne le prétérit et le participe passé.', 'Give the past simple and the past participle.'], m11a2),
    S('g11-m11b', MURPHY, ['Unité 11B : remettre les mots dans l\'ordre', 'Unit 11B: sentence building'], 'B1', ['Écris la phrase complète avec les mots dans le bon ordre.', 'Write the complete sentence with the words in the right order.'], m11b),
    S('g11-th', MURPHY, ['Unité TH : thème grammatical', 'Unit TH: translation'], 'B1', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], th)
  ],
  recap: {
    blocks: [
      {
        title: 'Les 3 formes et leurs rôles',
        forms: [
          ['V1 (base)', "go, have, write, see : infinitif, Present Simple, futur avec will"],
          ['V2 (prétérit)', "went, had, wrote, saw : uniquement pour le Past Simple"],
          ['V3 (participe passé)', "gone, had, written, seen : temps parfaits et passif (be + V3)"]
        ],
        uses: ["V2 et V3 diffèrent pour beaucoup de verbes : go, went, gone ; write, wrote, written."]
      },
      {
        title: 'Triades à retenir',
        forms: [
          ['i, a, u', 'sing, sang, sung / ring, rang, rung / drink, drank, drunk / swim, swam, swum / begin, began, begun'],
          ['-ide', 'ride, rode, ridden / drive, drove, driven / write, wrote, written'],
          ['-eak, -eal', 'break, broke, broken / speak, spoke, spoken / steal, stole, stolen']
        ]
      }
    ],
    tables: [
      {
        title: 'Les groupes à retenir',
        rows: [
          ['V1 = V2 = V3', 'put, cut, cost, let, hit, set, shut'],
          ['V2 = V3', 'buy, bring, catch, feel, keep, leave, lose, make, meet, pay, sell, send, sit, sleep, spend, stand, teach, tell, think, win, build, hold, lend, say'],
          ['V1 = V3', 'become (became), come (came), run (ran)'],
          ['trois formes différentes', 'be, break, choose, do, draw, drive, eat, fall, fly, forget, give, go, grow, hide, know, ride, ring, rise, see, shake, show, sing, speak, steal, swim, take, throw, wear, write']
        ]
      }
    ],
    notes: ["Attention aux verbes réguliers déguisés en irréguliers : collect, implement, test restent en -ed.", "get a deux participes passés : got (britannique) et gotten (américain)."],
    rule: "Apprends les verbes en triades : sing, sang, sung ; write, wrote, written."
  },
  enMeta: {
    title: 'Irregular Verbs',
    recap: {
      blocks: [
        {
          title: 'The 3 forms and their roles',
          forms: [
            ['V1 (base)', 'go, have, write, see: infinitive, present simple, future with will'],
            ['V2 (past simple)', 'went, had, wrote, saw: only for the past simple'],
            ['V3 (past participle)', 'gone, had, written, seen: perfect tenses and the passive (be + V3)']
          ],
          uses: ['V2 and V3 differ for many verbs: go, went, gone; write, wrote, written.']
        },
        {
          title: 'Patterns to remember',
          forms: [
            ['i, a, u', 'sing, sang, sung / ring, rang, rung / drink, drank, drunk / swim, swam, swum / begin, began, begun'],
            ['-ide', 'ride, rode, ridden / drive, drove, driven / write, wrote, written'],
            ['-eak, -eal', 'break, broke, broken / speak, spoke, spoken / steal, stole, stolen']
          ]
        }
      ],
      tables: [
        {
          title: 'The groups to remember',
          rows: [
            ['V1 = V2 = V3', 'put, cut, cost, let, hit, set, shut'],
            ['V2 = V3', 'buy, bring, catch, feel, keep, leave, lose, make, meet, pay, sell, send, sit, sleep, spend, stand, teach, tell, think, win, build, hold, lend, say'],
            ['V1 = V3', 'become (became), come (came), run (ran)'],
            ['three different forms', 'be, break, choose, do, draw, drive, eat, fall, fly, forget, give, go, grow, hide, know, ride, ring, rise, see, shake, show, sing, speak, steal, swim, take, throw, wear, write']
          ]
        }
      ],
      notes: ['Beware of regular verbs that look irregular: collect, implement, test keep -ed.', 'get has two past participles: got (British) and gotten (American).'],
      rule: 'Learn verbs in patterns: sing, sang, sung; write, wrote, written.'
    }
  }
};
