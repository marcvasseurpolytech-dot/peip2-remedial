// G03 : Present Perfect et for / since / ago
// Contenu reconstruit à partir de la fiche élève, du supplément Murphy et du devoir maison.
// Le texte anglais (règles, indices, consignes) est écrit à côté du texte français avec E(...).
import { E, c, tx, tr, op, FIX, set } from './dsl.js';

const guideeA = [
  c('She ___ just ___ (finish) her report.', ['has', 'finished'], 'Elle vient de terminer son rapport.',
    'just signale une action très récente liée au présent : Present Perfect. Avec she : has + participe passé. finish est régulier : finished.', 'action très récente',
    E('just signals a very recent action connected to now: present perfect. With she: has + past participle. finish is regular: finished.', 'very recent action')),
  c('I ___ never ___ (fail) an exam.', ['have', 'failed'], "Je n'ai jamais échoué à un examen.",
    "never exprime une expérience de vie jusqu'à maintenant : Present Perfect. have + participe passé : failed.", 'expérience de vie',
    E('never expresses a life experience up to now: present perfect. have + past participle: failed.', 'life experience')),
  c('He ___ (work) here for two years.', ['has worked'], 'Il travaille ici depuis deux ans.',
    "for + durée avec une situation qui continue : Present Perfect. Il y travaille encore, donc has worked (ou has been working).", 'durée, toujours en poste',
    E('for + a length of time with a situation that continues: present perfect. He still works here, so has worked (or has been working).', 'duration, still working there')),
  c('___ you ever ___ (use) a 3D printer?', ['Have', 'used'], 'As-tu déjà utilisé une imprimante 3D ?',
    "ever dans une question sur l'expérience : Present Perfect. Have + sujet + participe passé.", 'expérience de vie',
    E('ever in a question about experience: present perfect. Have + subject + past participle.', 'life experience')),
  c('She ___ (not / receive) the contract yet.', ["hasn't received"], "Elle n'a pas encore reçu le contrat.",
    'yet dans une phrase négative : Present Perfect. Négatif : hasn\'t + participe passé.', 'marqueur de fin de phrase',
    E("yet in a negative sentence: present perfect. Negative: hasn't + past participle.", 'marker at the end of the sentence')),
  c('The lab ___ just ___ (buy) new equipment.', ['has', 'bought'], 'Le laboratoire vient d\'acheter du nouveau matériel.',
    'just + action récente : Present Perfect. buy est irrégulier : buy, bought, bought.', 'action très récente',
    E('just + a recent action: present perfect. buy is irregular: buy, bought, bought.', 'very recent action')),
  c('They ___ (not / meet) the new director yet.', ["haven't met"], "Ils n'ont pas encore rencontré le nouveau directeur.",
    "yet : Present Perfect. Négatif : haven't + participe passé. meet est irrégulier : met.", 'marqueur de fin de phrase',
    E("yet: present perfect. Negative: haven't + past participle. meet is irregular: met.", 'marker at the end of the sentence')),
  c('How long ___ she ___ (work) here?', ['has', ['worked', 'been working']], 'Depuis combien de temps travaille-t-elle ici ?',
    "How long demande la durée d'une situation qui continue jusqu'à maintenant : Present Perfect. How long has she worked (ou been working) here ?", 'durée jusqu\'à maintenant',
    E('How long asks about the length of a situation that continues until now: present perfect. How long has she worked (or been working) here?', 'length of time up to now')),
  c('I ___ recently ___ (read) an article on AI.', ['have', 'read'], "J'ai récemment lu un article sur l'IA.",
    'recently : Present Perfect. read garde la même orthographe au participe passé, mais se prononce /red/.', 'période récente',
    E('recently: present perfect. read keeps the same spelling in the past participle, but it is pronounced /red/.', 'recent period')),
  c('___ you ever ___ (hear) of this company?', ['Have', 'heard'], 'As-tu déjà entendu parler de cette entreprise ?',
    "ever : expérience. Have + sujet + participe passé. hear est irrégulier : heard.", 'expérience de vie',
    E('ever: experience. Have + subject + past participle. hear is irregular: heard.', 'life experience'))
];

const guideeB = [
  c('I have studied English ___ ten years.', ['for'], "J'étudie l'anglais depuis dix ans.",
    'Dix ans est une durée : for + durée.', 'durée ou point de départ ?',
    E('Ten years is a length of time: for + duration.', 'length of time or starting point?')),
  c('She has been in Lille ___ September.', ['since'], 'Elle est à Lille depuis septembre.',
    'September est un point de départ : since + point de départ.', 'durée ou point de départ ?',
    E('September is a starting point: since + starting point.', 'length of time or starting point?')),
  c('He started this project three months ___.', ['ago'], 'Il a commencé ce projet il y a trois mois.',
    'il y a se dit ago, avec le prétérit (started).', 'le passé est révolu',
    E('il y a is ago, used with the past simple (started).', 'the time is finished')),
  c('I have lived in France ___ I was born.', ['since'], "Je vis en France depuis ma naissance.",
    'Ma naissance est le point de départ de la situation : since + point de départ (ici une proposition).', 'durée ou point de départ ?',
    E('My birth is the starting point of the situation: since + starting point (here a clause).', 'length of time or starting point?')),
  c('She ___ (call) me an hour ago.', ['called'], "Elle m'a appelé il y a une heure.",
    'ago impose le prétérit : called.', 'ago = prétérit',
    E('ago requires the past simple: called.', 'ago = past simple')),
  c('We ___ (not / see) him ___ last Monday.', ["haven't seen", 'since'], "Nous ne l'avons pas vu depuis lundi dernier.",
    "last Monday est un point de départ : since. La situation dure jusqu'à maintenant : Present Perfect (haven't seen).", 'point de départ',
    E("last Monday is a starting point: since. The situation lasts until now: present perfect (haven't seen).", 'starting point')),
  c('He ___ (graduate) in June 2022.', ['graduated'], 'Il a obtenu son diplôme en juin 2022.',
    'Date précise : prétérit. graduate est régulier : graduated.', 'date précise',
    E('Precise date: past simple. graduate is regular: graduated.', 'precise date')),
  c('The company ___ (grow) a lot ___ 2018.', ['has grown', 'since'], "L'entreprise a beaucoup grandi depuis 2018.",
    "2018 est un point de départ : since. L'évolution continue jusqu'à maintenant : Present Perfect. grow est irrégulier : grown.", 'point de départ',
    E('2018 is a starting point: since. The change continues until now: present perfect. grow is irregular: grown.', 'starting point')),
  c('She ___ (work) here ___ six months now.', [['has worked', 'has been working'], 'for'], 'Elle travaille ici depuis six mois maintenant.',
    "Six mois est une durée : for. Elle y travaille encore : Present Perfect.", 'durée',
    E('Six months is a length of time: for. She still works here: present perfect.', 'length of time')),
  c('They ___ (set up) the lab five years ___.', ['set up', 'ago'], 'Ils ont installé le laboratoire il y a cinq ans.',
    'ago impose le prétérit. set up est irrégulier et ne change pas : set, set, set.', 'le passé est révolu',
    E('ago requires the past simple. set up is irregular and does not change: set, set, set.', 'the time is finished'))
];

const nivA = [
  c('I ___ (already / send) the report.', ['have already sent'], 'J\'ai déjà envoyé le rapport.',
    "already : Present Perfect. have + already + participe passé. send est irrégulier : sent.", null,
    E('already: present perfect. have + already + past participle. send is irregular: sent.')),
  c('He ___ (call) me two days ago.', ['called'], 'Il m\'a appelé il y a deux jours.',
    'ago impose le prétérit : called.', null, E('ago requires the past simple: called.')),
  c('She ___ (live) in London since 2020.', [['has lived', 'has been living']], 'Elle vit à Londres depuis 2020.',
    "since + point de départ, situation qui continue : Present Perfect (has lived ou has been living).", null,
    E('since + starting point, situation that continues: present perfect (has lived or has been living).')),
  c('They ___ (finish) the project last month.', ['finished'], 'Ils ont terminé le projet le mois dernier.',
    'last month est une période terminée : prétérit.', null, E('last month is a finished period: past simple.')),
  c('___ you ___ (ever / work) abroad?', ['Have', ['ever worked', 'worked']], "As-tu déjà travaillé à l'étranger ?",
    "Question sur l'expérience de vie : Present Perfect. Have + sujet + ever + participe passé.", null,
    E('Question about life experience: present perfect. Have + subject + ever + past participle.')),
  c('The lab ___ (just / receive) new equipment.', ['has just received'], 'Le laboratoire vient de recevoir du nouveau matériel.',
    'just : Present Perfect. has + just + participe passé.', null, E('just: present perfect. has + just + past participle.')),
  c('We ___ (not / meet) the client yet.', ["haven't met"], "Nous n'avons pas encore rencontré le client.",
    "yet : Present Perfect. haven't + participe passé.", null, E("yet: present perfect. haven't + past participle.")),
  c('She ___ (graduate) in June 2022.', ['graduated'], 'Elle a obtenu son diplôme en juin 2022.',
    'Date précise : prétérit.', null, E('Precise date: past simple.')),
  c('He ___ (be) a student here for three years.', ['has been'], 'Il est étudiant ici depuis trois ans.',
    "for + durée, et il l'est encore : Present Perfect. be devient been.", null,
    E('for + a length of time, and he still is: present perfect. be becomes been.')),
  c('I ___ (not / see) that documentary last night.', ["didn't see"], "Je n'ai pas vu ce documentaire hier soir.",
    "last night est un moment précis et terminé : prétérit. Négation : didn't + base verbale.", null,
    E("last night is a precise, finished moment: past simple. Negative: didn't + base form."))
];

const nivB = [
  c('___ they ___ (ever / visit) the manufacturing plant?', ['Have', ['ever visited', 'visited']], 'Ont-ils déjà visité l\'usine de fabrication ?',
    "Expérience de vie : Present Perfect. Have + sujet + ever + participe passé.", null,
    E('Life experience: present perfect. Have + subject + ever + past participle.')),
  c('The engineer ___ (design) this system in 2019.', ['designed'], "L'ingénieur a conçu ce système en 2019.",
    'Date précise (2019) : prétérit.', null, E('Precise date (2019): past simple.')),
  c('I ___ (recently / read) a report on sustainable energy.', ['have recently read'], "J'ai récemment lu un rapport sur l'énergie durable.",
    'recently : Present Perfect. have + recently + participe passé.', null, E('recently: present perfect. have + recently + past participle.')),
  c('She ___ (not / finish) her analysis yet.', ["hasn't finished"], "Elle n'a pas encore terminé son analyse.",
    "yet : Present Perfect. hasn't + participe passé.", null, E("yet: present perfect. hasn't + past participle.")),
  c('He ___ (learn) Python five years ago, and now he is an expert.', [['learned', 'learnt']], 'Il a appris Python il y a cinq ans, et il est maintenant un expert.',
    'ago impose le prétérit. learn a deux formes régulières : learned (américain) et learnt (britannique).', null,
    E('ago requires the past simple. learn has two accepted forms: learned (American) and learnt (British).')),
  c('We ___ (work) on this problem for six weeks now.', [['have worked', 'have been working']], 'Nous travaillons sur ce problème depuis six semaines maintenant.',
    "for + durée, et le travail continue : Present Perfect (have worked ou have been working).", null,
    E('for + a length of time, and the work continues: present perfect (have worked or have been working).')),
  c('___ she ___ (already / leave) the office?', ['Has', ['already left', 'left']], 'Est-elle déjà partie du bureau ?',
    'already dans une question : Present Perfect. Has + sujet + already + participe passé. leave est irrégulier : left.', null,
    E('already in a question: present perfect. Has + subject + already + past participle. leave is irregular: left.')),
  c('The results ___ (come) back yesterday afternoon.', ['came'], "Les résultats sont revenus hier après-midi.",
    'yesterday afternoon est un moment précis et terminé : prétérit. come est irrégulier : came.', null,
    E('yesterday afternoon is a precise, finished moment: past simple. come is irregular: came.')),
  c('He ___ (never / make) that type of mistake before.', ['has never made'], "Il n'a jamais commis ce type d'erreur auparavant.",
    'never + before : expérience jusqu\'à maintenant, Present Perfect. make est irrégulier : made.', null,
    E('never + before: experience up to now, present perfect. make is irregular: made.')),
  c('I ___ (study) since six o\'clock, so I am exhausted.', [['have been studying', 'have studied']], "Je révise depuis six heures, donc je suis épuisé.",
    "since + point de départ, avec un résultat présent (la fatigue) : Present Perfect. La forme en -ing (have been studying) insiste sur la durée.", null,
    E('since + starting point, with a present result (tiredness): present perfect. The -ing form (have been studying) stresses the duration.'))
];

const nivC = [
  tx(FIX, 'I have seen him yesterday.', ['I saw him yesterday.'], 'Je l\'ai vu hier.',
    "yesterday est une date précise : prétérit, jamais Present Perfect.", null,
    E('yesterday is a precise time: past simple, never present perfect.')),
  tx(FIX, 'She lives here since three years.', ['She has lived here for three years.', 'She has been living here for three years.'], 'Elle vit ici depuis trois ans.',
    "Une situation qui dure depuis une période se met au Present Perfect, avec for + durée (et non since).", null,
    E('A situation that has lasted for some time takes the present perfect, with for + duration (not since).')),
  tx(FIX, 'He has called me an hour ago.', ['He called me an hour ago.'], "Il m'a appelé il y a une heure.",
    "ago impose toujours le prétérit : He called me an hour ago.", null,
    E('ago always requires the past simple: He called me an hour ago.')),
  tx(FIX, 'Have you finished the report last night?', ['Did you finish the report last night?'], 'As-tu terminé le rapport hier soir ?',
    "last night est un moment précis et terminé : prétérit, avec did.", null,
    E('last night is a precise, finished moment: past simple, with did.')),
  tx(FIX, "We didn't receive any feedback yet.", ["We haven't received any feedback yet."], "Nous n'avons encore reçu aucun retour.",
    "yet appelle le Present Perfect : haven't received.", null,
    E("yet calls for the present perfect: haven't received.")),
  tr("Je n'ai jamais assisté à une conférence internationale.", ['I have never attended an international conference.'],
    "Expérience de vie : Present Perfect avec never. attend se construit sans préposition.",
    E('Life experience: present perfect with never. attend takes no preposition.')),
  tr("Elle travaille ici depuis qu'elle a obtenu son diplôme.", ['She has worked here since she graduated.', 'She has been working here since she graduated.'],
    "since + proposition au prétérit (she graduated), et Present Perfect dans la principale.",
    E('since + a clause in the past simple (she graduated), and present perfect in the main clause.')),
  tr('Il y a deux heures, le système a planté.', ['Two hours ago, the system crashed.', 'The system crashed two hours ago.'],
    'il y a se traduit par ago, et impose le prétérit.',
    E('il y a is translated by ago, which requires the past simple.')),
  tr('Nous venons de recevoir les résultats.', ['We have just received the results.', "We've just received the results."],
    'venir de se traduit par have just + participe passé.',
    E('venir de is translated by have just + past participle.')),
  tr("Est-ce qu'il t'a déjà parlé de ce projet ?", ['Has he ever talked to you about this project?', 'Has he ever spoken to you about this project?', 'Has he already talked to you about this project?'],
    "Question sur l'expérience : Present Perfect, avec ever ou already.",
    E('Question about experience: present perfect, with ever or already.'))
];

const nivD = [
  op('Quelle différence de sens entre ces deux questions ?', 'Did you speak to the director? / Have you spoken to the director?',
    ["Did you speak to the director? porte sur un moment passé précis, connu ou sous-entendu (par exemple hier). Have you spoken to the director? s'intéresse au résultat présent : avez-vous parlé au directeur, et peut-il maintenant nous répondre ?"],
    'Pense au lien avec le présent.',
    E(null, 'Think about the link with the present.', { instr: 'What is the difference in meaning between these two questions?',
      m: ['Did you speak to the director? is about a precise past moment, known or implied (for example yesterday). Have you spoken to the director? is interested in the present result: have you spoken to the director, and can he now give us an answer?'] })),
  c('She ___ (live) in Paris, so she knows the city well. (lien avec le présent)', ['has lived'], 'Elle a vécu à Paris : elle connaît bien la ville.',
    "Le lien avec le présent est clair : elle connaît la ville aujourd'hui grâce à ce séjour. On emploie donc le Present Perfect.", 'pense au résultat actuel',
    E('The link with the present is clear: she knows the city today because of that stay. So the present perfect is used.', 'think of the present result',
      { s: 'She ___ (live) in Paris, so she knows the city well. (link with the present)' })),
  c('She ___ (live) in Paris for two years before moving to Lille. (période terminée)', ['lived'], 'Elle a vécu deux ans à Paris avant de déménager à Lille.',
    'La période est terminée et dépassée (avant de partir pour Lille) : prétérit.', 'la période est close',
    E('The period is over (before moving to Lille): past simple.', 'the period is closed',
      { s: 'She ___ (live) in Paris for two years before moving to Lille. (finished period)' })),
  c('The company ___ (invest) heavily in R&D since 2020. (toujours d\'actualité)', [['has invested', 'has been investing']], "L'entreprise investit massivement en R&D depuis 2020.",
    "since 2020, et la situation continue : Present Perfect.", 'la situation continue',
    E('since 2020, and the situation continues: present perfect.', 'the situation continues',
      { s: 'The company ___ (invest) heavily in R&D since 2020. (still true today)' })),
  c('The company ___ (invest) €50M in R&D between 2015 and 2019. (période terminée)', ['invested'], "L'entreprise a investi 50 millions d'euros en R&D entre 2015 et 2019.",
    'Période close (2015 à 2019) : prétérit.', 'la période est close',
    E('Closed period (2015 to 2019): past simple.', 'the period is closed',
      { s: 'The company ___ (invest) €50M in R&D between 2015 and 2019. (finished period)' }))
];

const bonus = [
  c('I ___ (start) this job three years ___.', ['started', 'ago'], "J'ai commencé ce poste il y a trois ans.",
    'ago impose le prétérit.', 'durée, point de départ ou passé révolu ?', E('ago requires the past simple.', 'length of time, starting point or finished past?')),
  c('She ___ (work) here ___ she joined in 2021.', ['has worked', 'since'], 'Elle travaille ici depuis son arrivée en 2021.',
    'since introduit le point de départ (son arrivée) : Present Perfect.', 'durée, point de départ ou passé révolu ?', E('since introduces the starting point (her arrival): present perfect.', 'length of time, starting point or finished past?')),
  c('He ___ (be) ill ___ two weeks, and he is still in hospital.', ['has been', 'for'], "Il est malade depuis deux semaines et il est toujours à l'hôpital.",
    'Deux semaines est une durée : for. Il est encore malade : Present Perfect.', 'durée, point de départ ou passé révolu ?', E('Two weeks is a length of time: for. He is still ill: present perfect.', 'length of time, starting point or finished past?')),
  c('They ___ (launch) the product six months ___, and it was a success.', ['launched', 'ago'], 'Ils ont lancé le produit il y a six mois, et ce fut un succès.',
    'ago impose le prétérit.', 'durée, point de départ ou passé révolu ?', E('ago requires the past simple.', 'length of time, starting point or finished past?')),
  c('We ___ (not / see) each other ___ the last conference.', ["haven't seen", 'since'], 'Nous ne nous sommes pas vus depuis la dernière conférence.',
    "La dernière conférence est un point de départ : since. Present Perfect négatif : haven't seen.", 'durée, point de départ ou passé révolu ?', E("The last conference is a starting point: since. Negative present perfect: haven't seen.", 'length of time, starting point or finished past?'))
];

const devoir = [
  c('I ___ (never / try) rock climbing.', ['have never tried'], "Je n'ai jamais essayé l'escalade.", 'never : expérience de vie, Present Perfect.', null, E('never: life experience, present perfect.')),
  c('She ___ (pass) her TOEIC certification last March.', ['passed'], 'Elle a réussi sa certification TOEIC en mars dernier.', 'last March est une date précise : prétérit.', null, E('last March is a precise time: past simple.')),
  c('He ___ (work) for this company since 2019.', [['has worked', 'has been working']], 'Il travaille pour cette entreprise depuis 2019.', 'since + point de départ, situation qui continue : Present Perfect.', null, E('since + starting point, situation that continues: present perfect.')),
  c('They ___ (not / receive) the package yet.', ["haven't received"], "Ils n'ont pas encore reçu le colis.", 'yet : Present Perfect négatif.', null, E('yet: negative present perfect.')),
  c('We ___ (meet) the professor two weeks ago.', ['met'], 'Nous avons rencontré le professeur il y a deux semaines.', 'ago impose le prétérit. meet est irrégulier : met.', null, E('ago requires the past simple. meet is irregular: met.')),
  c('___ you ___ (ever / give) a technical presentation in English?', ['Have', ['ever given', 'given']], 'As-tu déjà fait une présentation technique en anglais ?', "Question sur l'expérience : Present Perfect. give est irrégulier : given.", null, E('Question about experience: present perfect. give is irregular: given.')),
  c('The machine ___ (break) down on Monday morning.', ['broke'], 'La machine est tombée en panne lundi matin.', 'Moment précis : prétérit. break est irrégulier : broke.', null, E('Precise moment: past simple. break is irregular: broke.')),
  c('She ___ (already / submit) her assignment.', ['has already submitted'], 'Elle a déjà rendu son devoir.', 'already : Present Perfect. submit double son t : submitted.', null, E('already: present perfect. submit doubles its t: submitted.')),
  c('I ___ (live) in Lille for three years now.', [['have lived', 'have been living']], 'Je vis à Lille depuis trois ans maintenant.', 'for + durée, et je vis encore ici : Present Perfect.', null, E('for + a length of time, and I still live here: present perfect.')),
  c('He ___ (not / contact) us since last Monday.', ["hasn't contacted"], "Il ne nous a pas contactés depuis lundi dernier.", 'since + point de départ : Present Perfect négatif.', null, E('since + starting point: negative present perfect.')),
  c('The team ___ (just / solve) the critical bug.', ['has just solved'], "L'équipe vient de résoudre le bogue critique.", 'just : Present Perfect.', null, E('just: present perfect.')),
  c('I ___ (not / see) this error before in my career.', [["haven't seen", 'have never seen']], "Je n'avais jamais vu cette erreur auparavant dans ma carrière.", "before dans le sens « jusqu'à présent » : Present Perfect.", null, E('before meaning up to now: present perfect.')),
  c('She ___ (complete) her PhD three months ago.', ['completed'], 'Elle a terminé son doctorat il y a trois mois.', 'ago impose le prétérit.', null, E('ago requires the past simple.')),
  c('We ___ (not / finalize) the report yet, because we are still working on it.', [["haven't finalised", "haven't finalized"]], "Nous n'avons pas encore finalisé le rapport, car nous y travaillons toujours.", 'yet : Present Perfect négatif. finalise (britannique) et finalize (américain) sont acceptés.', null, E('yet: negative present perfect. finalise (British) and finalize (American) are both accepted.')),
  c('He ___ (publish) five papers since joining the lab.', ['has published'], "Il a publié cinq articles depuis son arrivée au laboratoire.", 'since + point de départ : Present Perfect.', null, E('since + starting point: present perfect.'))
];

const m3a = [
  c('I ___ (already / send) the invoice, so check your inbox.', ['have already sent'], "J'ai déjà envoyé la facture, vérifie donc ta boîte de réception.", 'already : Present Perfect.', null, E('already: present perfect.')),
  c('We ___ (finish) the prototype last Thursday.', ['finished'], 'Nous avons terminé le prototype jeudi dernier.', 'last Thursday est une date précise : prétérit.', null, E('last Thursday is a precise time: past simple.')),
  c('She ___ (live) here since 2019.', [['has lived', 'has been living']], 'Elle vit ici depuis 2019.', 'since + point de départ : Present Perfect.', null, E('since + starting point: present perfect.')),
  c('He ___ (email) me three days ago.', ['emailed'], "Il m'a envoyé un e-mail il y a trois jours.", 'ago impose le prétérit.', null, E('ago requires the past simple.')),
  c('___ you ever ___ (work) in a start-up?', ['Have', 'worked'], 'As-tu déjà travaillé dans une start-up ?', "Expérience de vie avec ever : Present Perfect.", null, E('Life experience with ever: present perfect.')),
  c('The system ___ (crash) during the demo yesterday.', ['crashed'], 'Le système a planté pendant la démonstration hier.', 'yesterday : prétérit.', null, E('yesterday: past simple.')),
  c('They ___ (not / release) the update yet.', ["haven't released"], "Ils n'ont pas encore publié la mise à jour.", 'yet : Present Perfect négatif.', null, E('yet: negative present perfect.')),
  c('I ___ (meet) him at the Paris conference in 2022.', ['met'], 'Je l\'ai rencontré à la conférence de Paris en 2022.', 'in 2022 est une date précise : prétérit.', null, E('in 2022 is a precise time: past simple.'))
];

const m3bEx1 = [
  c('I have studied German ___ eight years.', ['for'], "J'étudie l'allemand depuis huit ans.", 'Huit ans est une durée : for.', null, E('Eight years is a length of time: for.')),
  c('He has worked here ___ he graduated.', ['since'], 'Il travaille ici depuis qu\'il a obtenu son diplôme.', 'Le moment du diplôme est le point de départ : since.', null, E('The moment of graduation is the starting point: since.')),
  c('She started the project four months ___.', ['ago'], 'Elle a commencé le projet il y a quatre mois.', 'il y a se dit ago, avec le prétérit.', null, E('il y a is ago, with the past simple.')),
  c("We haven't spoken ___ last Wednesday.", ['since'], 'Nous ne nous sommes pas parlé depuis mercredi dernier.', 'last Wednesday est un point de départ : since.', null, E('last Wednesday is a starting point: since.')),
  c('I began this role two years ___.', ['ago'], "J'ai commencé ce poste il y a deux ans.", 'il y a se dit ago, avec le prétérit.', null, E('il y a is ago, with the past simple.'))
];

const m3bEx2 = [
  tx(FIX, 'I have seen her yesterday.', ['I saw her yesterday.'], 'Je l\'ai vue hier.', 'yesterday impose le prétérit.', null, E('yesterday requires the past simple.')),
  tx(FIX, 'He works here since four years.', ['He has worked here for four years.', 'He has been working here for four years.'], 'Il travaille ici depuis quatre ans.', 'Situation qui dure : Present Perfect, avec for + durée.', null, E('Situation that continues: present perfect, with for + duration.')),
  tx(FIX, 'She has emailed me a week ago.', ['She emailed me a week ago.'], "Elle m'a envoyé un e-mail il y a une semaine.", 'ago impose le prétérit.', null, E('ago requires the past simple.')),
  tx(FIX, "They didn't receive any answer yet.", ["They haven't received any answer yet."], "Ils n'ont encore reçu aucune réponse.", "yet appelle le Present Perfect.", null, E('yet calls for the present perfect.'))
];

const m3c = [
  c('I ___ (wait) for the technician for twenty minutes.', ['have been waiting'], "J'attends le technicien depuis vingt minutes.", "Le Present Perfect Continuous (have been + -ing) insiste sur la durée d'une action qui continue jusqu'à maintenant.", null, E('The present perfect continuous (have been + -ing) stresses the duration of an action that continues until now.')),
  c('How long ___ she ___ (work) on this project?', ['has', 'been working'], 'Depuis combien de temps travaille-t-elle sur ce projet ?', 'How long + has + sujet + been + -ing.', null, E('How long + has + subject + been + -ing.')),
  c('They ___ (negotiate) the contract since Monday.', ['have been negotiating'], 'Ils négocient le contrat depuis lundi.', 'since + point de départ, action en cours : have been negotiating.', null, E('since + starting point, action in progress: have been negotiating.')),
  c('He ___ (not / sleep) well recently.', ["hasn't been sleeping"], 'Il ne dort pas bien ces derniers temps.', "recently, avec une situation qui dure : négatif hasn't been + -ing.", null, E("recently, with a situation that lasts: negative hasn't been + -ing.")),
  c('We ___ (try) to fix this bug all afternoon.', ['have been trying'], "Nous essayons de corriger ce bogue depuis le début de l'après-midi.", "all afternoon : durée de l'action jusqu'à maintenant. try garde son y devant -ing : trying.", null, E('all afternoon: duration of the action until now. try keeps its y before -ing: trying.')),
  c('___ you ___ (learn) English for a long time?', ['Have', 'been learning'], "Apprends-tu l'anglais depuis longtemps ?", 'Have + sujet + been + -ing.', null, E('Have + subject + been + -ing.'))
];

const m3dEx1 = [
  c('She ___ (write) her thesis for six months, and she ___ (already / write) four chapters.', ['has been writing', 'has already written'], "Elle écrit sa thèse depuis six mois, et elle a déjà écrit quatre chapitres.",
    "La durée (for six months) appelle la forme continue. Le résultat (quatre chapitres) appelle la forme simple : has already written.", null,
    E('The duration (for six months) calls for the continuous form. The result (four chapters) calls for the simple form: has already written.')),
  c('How long ___ you ___ (learn) to code?', ['have', 'been learning'], 'Depuis combien de temps apprends-tu à programmer ?', 'How long + have + sujet + been + -ing.', null, E('How long + have + subject + been + -ing.')),
  c('He ___ (send) fifteen emails this morning.', ['has sent'], "Il a envoyé quinze e-mails ce matin.", 'Une quantité (fifteen) appelle la forme simple : has sent.', null, E('A quantity (fifteen) calls for the simple form: has sent.')),
  c('We ___ (discuss) the budget for two hours, but we ___ (not / decide) anything yet.', ['have been discussing', "haven't decided"], "Nous discutons du budget depuis deux heures, mais nous n'avons encore rien décidé.",
    "La durée appelle la forme continue ; le résultat (rien de décidé) appelle la forme simple.", null,
    E('The duration calls for the continuous form; the result (nothing decided) calls for the simple form.')),
  c('How many prototypes ___ they ___ (build) so far?', ['have', 'built'], 'Combien de prototypes ont-ils construits jusqu\'à présent ?', 'How many demande une quantité : forme simple. build est irrégulier : built.', null, E('How many asks about a quantity: simple form. build is irregular: built.'))
];

const m3dEx2 = [
  tx(FIX, 'I am living here since 2020.', ['I have been living here since 2020.', 'I have lived here since 2020.'], 'Je vis ici depuis 2020.', "since impose le Present Perfect, pas le présent continu.", null, E('since requires the present perfect, not the present continuous.')),
  tx(FIX, 'How long do you work on this project?', ['How long have you been working on this project?', 'How long have you worked on this project?'], 'Depuis combien de temps travailles-tu sur ce projet ?', 'How long, avec une action qui continue : Present Perfect, jamais le présent simple.', null, E('How long, with an action that continues: present perfect, never the present simple.')),
  tx(FIX, 'She has wrote three reports this week.', ['She has written three reports this week.'], 'Elle a écrit trois rapports cette semaine.', 'Après has, on emploie le participe passé : write, wrote, written.', null, E('After has, use the past participle: write, wrote, written.')),
  tx(FIX, 'They have been finish the tests.', ['They have finished the tests.'], "Ils ont terminé les tests.", "Après have been, il faut un verbe en -ing. Ici le résultat est atteint (tests terminés) : forme simple, have finished.", null, E('After have been, the verb needs -ing. Here the result is reached (tests finished): simple form, have finished.'))
];

const th = [
  tr("J'ai déjà envoyé le rapport mensuel.", ['I have already sent the monthly report.', "I've already sent the monthly report."], 'already : Present Perfect. send est irrégulier : sent.', E('already: present perfect. send is irregular: sent.')),
  tr('Elle vit à Lyon depuis 2017.', ['She has lived in Lyon since 2017.', 'She has been living in Lyon since 2017.'], 'since + point de départ : Present Perfect.', E('since + starting point: present perfect.')),
  tr("Il m'a téléphoné il y a trois jours.", ['He phoned me three days ago.', 'He called me three days ago.'], 'ago impose le prétérit.', E('ago requires the past simple.')),
  tr('Avez-vous déjà travaillé pour une grande entreprise ?', ['Have you ever worked for a large company?', 'Have you ever worked for a big company?'], "Expérience de vie : Present Perfect avec ever.", E('Life experience: present perfect with ever.')),
  tr("J'attends la livraison depuis une demi-heure.", ['I have been waiting for the delivery for half an hour.', "I've been waiting for the delivery for half an hour."], 'Action qui dure jusqu\'à maintenant : Present Perfect Continuous, avec for + durée.', E('Action that lasts until now: present perfect continuous, with for + duration.')),
  tr("Depuis combien de temps apprends-tu l'allemand ?", ['How long have you been learning German?'], 'How long + have + sujet + been + -ing.', E('How long + have + subject + been + -ing.')),
  tr("Nous avons discuté du planning pendant deux heures, mais nous n'avons encore rien décidé.", ["We have been discussing the schedule for two hours, but we haven't decided anything yet.", "We have been discussing the schedule for two hours, but we have not decided anything yet."],
    "Durée de l'activité : forme continue. Résultat (rien décidé) : forme simple, avec yet ou anything.", E('Duration of the activity: continuous form. Result (nothing decided): simple form, with yet or anything.'))
];

export const G03 = {
  id: 'G03',
  title: 'Le Present Perfect et for / since / ago',
  coursUrl: 'https://peip2-hub.vercel.app/cours/G03_cours.html',
  sets: [
    set('g03-guidee-a', 'Fiche', 'Série guidée A : Present Perfect', 'B1', 'Repérer already, just, ever, never, yet, for, since. Chaque phrase propose un indice.', guideeA,
      { group: 'Worksheet', title: 'Guided set A: present perfect', desc: 'Spot already, just, ever, never, yet, for, since. Each sentence comes with a hint.' }),
    set('g03-guidee-b', 'Fiche', 'Série guidée B : for, since, ago', 'B1', 'Choisir for, since ou ago, puis le bon temps.', guideeB,
      { group: 'Worksheet', title: 'Guided set B: for, since, ago', desc: 'Choose for, since or ago, then the right tense.' }),
    set('g03-niv-a', 'Fiche', 'Niveau A : fondamentaux', 'A2-B1', 'Present Perfect ou prétérit ?', nivA,
      { group: 'Worksheet', title: 'Level A: the basics', desc: 'Present perfect or past simple?' }),
    set('g03-niv-b', 'Fiche', 'Niveau B : contexte professionnel', 'B1', 'Les mêmes choix dans des phrases d\'ingénieur.', nivB,
      { group: 'Worksheet', title: 'Level B: professional context', desc: 'The same choices in engineering sentences.' }),
    set('g03-niv-c', 'Fiche', 'Niveau C : corrections et thème', 'B1+', 'Corriger cinq phrases fautives, puis traduire cinq phrases.', nivC,
      { group: 'Worksheet', title: 'Level C: corrections and translation', desc: 'Correct five faulty sentences, then translate five sentences.' }),
    set('g03-niv-d', 'Fiche', 'Niveau D : nuances', 'B2+', 'Le même verbe, deux temps possibles selon le contexte.', nivD,
      { group: 'Worksheet', title: 'Level D: nuances', desc: 'The same verb, two possible tenses depending on the context.' }),
    set('g03-bonus', 'Fiche', 'Bonus : for, since, ago', 'B1+', 'Complète avec for, since ou ago et le bon temps.', bonus,
      { group: 'Worksheet', title: 'Bonus: for, since, ago', desc: 'Complete with for, since or ago and the right tense.' }),
    set('g03-devoir', 'Fiche', 'Devoir maison', 'B1', 'Quinze phrases à conjuguer.', devoir,
      { group: 'Worksheet', title: 'Homework', desc: 'Fifteen sentences to complete.' }),
    set('g03-m3a', 'Supplément Murphy', 'Unité 3A : Present Perfect ou prétérit', 'B1', 'Date précise ou lien avec le présent ?', m3a,
      { group: 'Murphy supplement', title: 'Unit 3A: present perfect or past simple', desc: 'Precise date or link with the present?' }),
    set('g03-m3b-1', 'Supplément Murphy', 'Unité 3B : for, since ou ago (1/2)', 'B1', 'Choisis le bon mot.', m3bEx1,
      { group: 'Murphy supplement', title: 'Unit 3B: for, since or ago (1/2)', desc: 'Choose the right word.' }),
    set('g03-m3b-2', 'Supplément Murphy', 'Unité 3B : corriger les phrases (2/2)', 'B1', 'Corrige les phrases fautives.', m3bEx2,
      { group: 'Murphy supplement', title: 'Unit 3B: correct the sentences (2/2)', desc: 'Correct the faulty sentences.' }),
    set('g03-m3c', 'Supplément Murphy', 'Unité 3C : Present Perfect Continuous', 'B1+', 'have been + verbe en -ing.', m3c,
      { group: 'Murphy supplement', title: 'Unit 3C: present perfect continuous', desc: 'have been + verb in -ing.' }),
    set('g03-m3d-1', 'Supplément Murphy', 'Unité 3D : forme simple ou continue (1/2)', 'B2', 'Durée ou résultat ?', m3dEx1,
      { group: 'Murphy supplement', title: 'Unit 3D: simple or continuous (1/2)', desc: 'Duration or result?' }),
    set('g03-m3d-2', 'Supplément Murphy', 'Unité 3D : corriger les phrases (2/2)', 'B2', 'Corrige les phrases fautives.', m3dEx2,
      { group: 'Murphy supplement', title: 'Unit 3D: correct the sentences (2/2)', desc: 'Correct the faulty sentences.' }),
    set('g03-th', 'Supplément Murphy', 'Unité TH : thème grammatical', 'B1+', 'Traduis en anglais, puis compare avec le modèle.', th,
      { group: 'Murphy supplement', title: 'Unit TH: translation', desc: 'Translate into English, then compare with the model.' })
  ],
  recap: {
    blocks: [
      {
        title: 'Present Perfect',
        forms: [
          ['Affirmatif', 'I / you / we / they have + participe passé. He / she / it has + participe passé.'],
          ['Négatif', "I haven't worked. He hasn't worked."],
          ['Question', 'Have you worked? Has she worked?'],
          ['Contractions', "I've, you've, he's, she's, we've, they've (he's peut être he has ou he is)"]
        ],
        uses: ["Résultat présent d'une action passée : I've lost my keys.", 'Expérience de vie : Have you ever been to Japan?', 'Action récente avec just : She has just arrived.', 'Situation qui continue (durée) : I have lived here for 5 years.', 'Avec already et yet : He hasn\'t called yet.'],
        marks: 'already, yet, just, ever, never, recently, lately, so far, for, since'
      },
      {
        title: 'For, since, ago et durée',
        forms: [
          ['for + durée', 'I have worked here for 3 years. (Present Perfect)'],
          ['since + point de départ', 'She has been ill since Monday. (Present Perfect)'],
          ['ago (il y a)', 'He left two hours ago. (prétérit uniquement)'],
          ['Present Perfect Continuous', 'have / has been + -ing : I have been working here since 9 AM.']
        ],
        uses: ['La forme continue insiste sur la durée, la forme simple sur le résultat ou la quantité.', 'How long ...? s\'emploie avec le Present Perfect.']
      }
    ],
    tables: [{
      title: 'Present Perfect ou prétérit ?',
      rows: [['Lien avec le présent, pas de date précise', 'He has left.'], ['Date précise, passé révolu', 'He left yesterday.'], ['Expérience générale', "I've visited Paris."], ['Moment précis', 'I visited Paris in 2019.'], ['Résultat actuel', "I've broken my arm."], ['Description passée', 'I broke it last year.']]
    }],
    notes: ["Piège : ago impose toujours le prétérit. He has left an hour ago est faux."],
    rule: 'Present Perfect : le passé a une conséquence maintenant. Prétérit : c\'est fini, point.'
  },
  enMeta: {
    title: 'The Present Perfect and for / since / ago',
    recap: {
      blocks: [
        {
          title: 'Present Perfect',
          forms: [
            ['Affirmative', 'I / you / we / they have + past participle. He / she / it has + past participle.'],
            ['Negative', "I haven't worked. He hasn't worked."],
            ['Question', 'Have you worked? Has she worked?'],
            ['Contractions', "I've, you've, he's, she's, we've, they've (he's can be he has or he is)"]
          ],
          uses: ['Present result of a past action: I\'ve lost my keys.', 'Life experience: Have you ever been to Japan?', 'Recent action with just: She has just arrived.', 'Situation that continues (duration): I have lived here for 5 years.', "With already and yet: He hasn't called yet."],
          marks: 'already, yet, just, ever, never, recently, lately, so far, for, since'
        },
        {
          title: 'For, since, ago and duration',
          forms: [
            ['for + duration', 'I have worked here for 3 years. (present perfect)'],
            ['since + starting point', 'She has been ill since Monday. (present perfect)'],
            ['ago', 'He left two hours ago. (past simple only)'],
            ['Present perfect continuous', 'have / has been + -ing: I have been working here since 9 AM.']
          ],
          uses: ['The continuous form stresses the duration, the simple form the result or the quantity.', 'How long ...? is used with the present perfect.']
        }
      ],
      tables: [{
        title: 'Present perfect or past simple?',
        rows: [['Link with the present, no precise date', 'He has left.'], ['Precise date, finished past', 'He left yesterday.'], ['General experience', "I've visited Paris."], ['Precise moment', 'I visited Paris in 2019.'], ['Present result', "I've broken my arm."], ['Past description', 'I broke it last year.']]
      }],
      notes: ['Trap: ago always requires the past simple. He has left an hour ago is wrong.'],
      rule: 'Present perfect: the past has a consequence now. Past simple: it is over, full stop.'
    }
  }
};
