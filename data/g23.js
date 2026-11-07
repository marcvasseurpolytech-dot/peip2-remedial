// G23 : Le futur (will, going to, future continuous, future perfect)
import { S, FICHE, MURPHY, F, R, W, P, K, SK } from './dsl2.js';

const J = (...l) => [l.flat()];
const X = (...arrs) => arrs.reduce((a, b) => a.flatMap(x => b.map(y => x + y)), ['']);
const wl = v => ['will ' + v, "'ll " + v, 'll ' + v];
const wn = v => ["won't " + v, 'will not ' + v, 'wont ' + v];
const CT = { is: "'s", are: "'re", am: "'m" };
const gt = (b, v) => [b + ' going to ' + v, CT[b] + ' going to ' + v, CT[b].slice(1) + ' going to ' + v];
const pc = (b, v) => [b + ' ' + v, CT[b] + ' ' + v, CT[b].slice(1) + ' ' + v];

const WI = 'will : prédiction sans preuve ou décision prise sur le moment (promesse).';
const WIE = 'will: prediction without evidence, or a decision made on the spot (promise).';
const GT = 'be going to : plan déjà décidé, ou prédiction fondée sur une preuve visible.';
const GTE = 'be going to: a plan already decided, or a prediction based on visible evidence.';
const PCF = 'Present Continuous : arrangement personnel déjà fixé, aussi possible ici.';
const PCE = 'Present Continuous: a personal arrangement already fixed, also possible here.';
const FC = 'will be + V-ing : action en cours à un moment précis du futur.';
const FCE = 'will be + V-ing: an action in progress at a precise future moment.';
const FP = 'will have + V3 : action terminée avant un moment futur.';
const FPE = 'will have + past participle: an action completed before a future moment.';

const guideeA = [
  K('Listen to that thunder! The storm ___ (hit) us soon.', [gt('is', 'hit')], "Écoute ce tonnerre ! L'orage va bientôt nous frapper.", GT, GTE),
  K('I promise I ___ (call) you back tonight.', [wl('call')], "Je promets de te rappeler ce soir.", WI, WIE),
  K('We ___ (launch) the new app in September. It is already planned.', J(gt('are', 'launch'), pc('are', 'launching')), "Nous allons lancer la nouvelle application en septembre.", GT + ' ' + PCF, GTE + ' ' + PCE),
  K('I think the meeting ___ (run) late.', [wl('run')], "Je pense que la réunion va se prolonger.", WI, WIE),
  K("She's five months pregnant, so she ___ (have) a baby in spring.", [gt('is', 'have')], "Elle est enceinte de cinq mois, donc elle va avoir un bébé au printemps.", GT, GTE),
  K("Don't worry, I ___ (help) you with the report.", [wl('help')], "Ne t'inquiète pas, je t'aiderai pour le rapport.", WI, WIE),
  K('They ___ (present) their results next month. It is on the programme.', J(gt('are', 'present'), pc('are', 'presenting')), "Ils présenteront leurs résultats le mois prochain.", GT + ' ' + PCF, GTE + ' ' + PCE),
  K("I'm sure the client ___ (understand).", [wl('understand')], "Je suis sûr que le client comprendra.", WI, WIE),
  K('Look at the traffic! We ___ (be) late.', [gt('are', 'be')], "Regarde la circulation ! Nous allons être en retard.", GT, GTE),
  K("I ___ (not / finish) this by Friday, I'm afraid.", [wn('finish')], "Je ne finirai pas cela d'ici vendredi, j'en ai peur.", WI, WIE)
];
const guideeB = [
  K('This time next week, I ___ (present) the prototype to the board.', [wl('be presenting')], "À cette heure la semaine prochaine, je présenterai le prototype au conseil.", FC, FCE),
  K('By the end of the year, we ___ (complete) the migration.', [wl('have completed')], "D'ici la fin de l'année, nous aurons terminé la migration.", FP, FPE),
  K('At 9am tomorrow, she ___ (fly) to the conference.', [wl('be flying')], "Demain à 9 h, elle sera en train de voler vers la conférence.", FC, FCE),
  K('By 2030, the company ___ (double) its revenue.', [wl('have doubled')], "D'ici 2030, l'entreprise aura doublé son chiffre d'affaires.", FP, FPE),
  K("Don't call at 8, I ___ (have) dinner.", [wl('be having')], "N'appelle pas à 20 h, je serai en train de dîner.", FC, FCE),
  K('He ___ (finish) the report by the time you arrive.', [wl('have finished')], "Il aura fini le rapport quand tu arriveras.", FP, FPE),
  K('This time tomorrow, we ___ (discuss) the budget.', [wl('be discussing')], "Demain à cette heure, nous serons en train de discuter du budget.", FC, FCE),
  K('By next month, they ___ (sign) the contract.', [wl('have signed')], "D'ici le mois prochain, ils auront signé le contrat.", FP, FPE),
  K('In an hour, I ___ (still / work) on this bug.', J(wl('still be working'), wl('be still working')), "Dans une heure, je travaillerai encore sur ce bug.", FC + ' still se place après will.', FCE + ' Still goes after will.'),
  K('By Friday, the team ___ (test) the whole system.', [wl('have tested')], "D'ici vendredi, l'équipe aura testé tout le système.", FP, FPE)
];
const nivA = [
  K('I think it ___ (rain) tomorrow.', J(wl('rain'), gt('is', 'rain')), "Je pense qu'il pleuvra demain.", WI + ' Going to est aussi possible si tu vois un indice.', WIE + ' Going to is also possible if you see a sign.'),
  K("We ___ (visit) the factory next Tuesday. It's on the schedule.", J(gt('are', 'visit'), pc('are', 'visiting')), "Nous visiterons l'usine mardi prochain, c'est au programme.", GT + ' ' + PCF, GTE + ' ' + PCE),
  K('Careful, that shelf ___ (fall)!', [gt('is', 'fall')], "Attention, cette étagère va tomber !", GT, GTE),
  K('I ___ (send) you the file as soon as I get back to my desk.', [wl('send')], "Je t'enverrai le fichier dès que je serai à mon bureau.", WI, WIE),
  K('She ___ (graduate) in June.', J(gt('is', 'graduate'), pc('is', 'graduating')), "Elle sera diplômée en juin.", GT + ' ' + PCF, GTE + ' ' + PCE)
];
const nivB = [
  K('This time next year, I ___ (work) abroad.', [wl('be working')], "À cette heure l'an prochain, je travaillerai à l'étranger.", FC, FCE),
  K('By the time you read this, I ___ (leave).', [wl('have left')], "Quand tu liras ceci, je serai parti.", FP, FPE),
  K('At noon, the team ___ (test) the prototype.', [wl('be testing')], "À midi, l'équipe sera en train de tester le prototype.", FC, FCE),
  K('By 2028, we ___ (reduce) our emissions by 30%.', [wl('have reduced')], "D'ici 2028, nous aurons réduit nos émissions de 30 %.", FP, FPE),
  K('He ___ (defend) his thesis this time next week.', [wl('be defending')], "Il soutiendra sa thèse à cette heure la semaine prochaine.", FC, FCE)
];
const nivC = [
  R("Je pense qu'il va pleuvoir.", ["I think it's going to rain.", 'I think it is going to rain.', 'I think it will rain.', "I think it'll rain."], "going to : prédiction d'après ce qu'on voit ; will reste possible.", 'going to: a prediction from what one sees; will is also possible.'),
  R("Nous allons lancer le produit en juin.", X(['We are going to launch ', "We're going to launch ", 'We will launch ', 'We are launching ', "We're launching "], ['the product ', 'our product ', 'the new product '], ['in June.', 'in June']), "Plan décidé : going to.", 'A decided plan: going to.'),
  R("À cette heure demain, je serai en train de présenter le prototype.", X(['This time tomorrow, '], ['I will be ', "I'll be "], ['presenting '], ['the prototype.', 'our prototype.', 'the prototype']), 'Future Continuous : will be + V-ing.', 'Future Continuous: will be + V-ing.'),
  R("D'ici 2030, nous aurons doublé notre chiffre d'affaires.", X(['By 2030, ', 'By the year 2030, '], ['we will have ', "we'll have "], ['doubled '], ['our revenue.', 'our turnover.', 'our sales.', 'our revenue', 'our turnover', 'our sales']), 'Future Perfect : will have + participe passé.', 'Future Perfect: will have + past participle.'),
  R("Ne m'appelle pas à 20 h, je serai en train de dîner.", X(["Don't call me ", "Do not call me ", "Don't phone me ", "Don't ring me "], ['at 8pm, ', 'at 8 pm, ', 'at 8 p.m., ', "at 8 o'clock, ", 'at eight, ', "at eight o'clock, ", 'at 8, '], ['I will be ', "I'll be "], ['having dinner.', 'eating dinner.', 'having supper.', 'having my dinner.']), 'Future Continuous : action en cours à 20 h.', 'Future Continuous: an action in progress at 8.')
];
const nivD = [
  F('I will go to finish it tomorrow.', ['I will finish it tomorrow.', "I'll finish it tomorrow.", 'I am going to finish it tomorrow.', "I'm going to finish it tomorrow.", 'I will go and finish it tomorrow.'], "Je le finirai demain.", 'will est suivi directement de la base verbale, sans go to.', 'will is followed directly by the base form, without go to.'),
  F('She is go to present the results.', ['She is going to present the results.', "She's going to present the results."], "Elle va présenter les résultats.", 'be going to : going est obligatoire.', 'be going to: going is required.'),
  F('By next year we will finished the project.', ['By next year we will have finished the project.', "By next year we'll have finished the project.", 'By next year, we will have finished the project.', "By next year, we'll have finished the project."], "D'ici l'an prochain, nous aurons terminé le projet.", FP, FPE),
  F('This time tomorrow I working on the report.', ['This time tomorrow I will be working on the report.', "This time tomorrow I'll be working on the report.", 'This time tomorrow, I will be working on the report.', "This time tomorrow, I'll be working on the report."], "Demain à cette heure, je travaillerai sur le rapport.", FC, FCE),
  F('They going to sign the contract next week.', ['They are going to sign the contract next week.', "They're going to sign the contract next week."], "Ils vont signer le contrat la semaine prochaine.", 'be going to : il manque are.', 'be going to: the verb are is missing.')
];
const bonus = [
  P("Donne plusieurs réponses (accord et désaccord) à : 'AI will replace many jobs.'", "Give several short replies (agreeing and disagreeing) to: 'AI will replace many jobs.'", ["Agree: I think so too. / Yes, it probably will. / I'm afraid you're right. Disagree: I doubt it. / I don't think so. / It will create new jobs too."], "Réponses courtes, sans reprendre toute la phrase.", "Short replies, without repeating the whole sentence.", "Use short answers."),
  P("Donne au moins deux réponses à : 'Remote work will become the norm.'", "Give at least two replies to: 'Remote work will become the norm.'", ["I'm not so sure. / I suppose it might. / Probably, for some sectors. / I can't see that happening."], "Nuance ton accord.", "Nuance your agreement.", "Use modal-like softeners."),
  P("Donne trois façons d'être d'accord avec : 'This company will double in size by 2030.'", "Give three ways of agreeing with: 'This company will double in size by 2030.'", ["I'm sure it will. / No doubt about it. / It certainly looks that way. / I wouldn't be surprised."], "Trois formules différentes.", "Three different expressions.", "Vary the expressions.")
];
const devoir = [
  K("I'm sure the team ___ (finish) the prototype on time.", [wl('finish')], "Je suis sûr que l'équipe finira le prototype à temps.", WI, WIE),
  K('Look at the sky! It ___ (snow) tonight.', [gt('is', 'snow')], "Regarde le ciel ! Il va neiger cette nuit.", GT, GTE),
  K("We ___ (meet) the investors next Thursday. It's already in the calendar.", J(gt('are', 'meet'), pc('are', 'meeting')), "Nous rencontrons les investisseurs jeudi prochain, c'est déjà dans l'agenda.", GT + ' ' + PCF, GTE + ' ' + PCE),
  K('This time next month, I ___ (work) in the new office.', [wl('be working')], "À cette heure le mois prochain, je travaillerai dans le nouveau bureau.", FC, FCE),
  K('By 2029, the company ___ (open) three new plants.', [wl('have opened')], "D'ici 2029, l'entreprise aura ouvert trois nouvelles usines.", FP, FPE),
  K('I promise I ___ (reply) to your email today.', [wl('reply')], "Je promets de répondre à ton courriel aujourd'hui.", WI, WIE),
  K('She ___ (not / attend) the seminar. She has a scheduling conflict.', [["is not going to attend", "isn't going to attend", "'s not going to attend", "s not going to attend", 'is not attending', "isn't attending", "'s not attending", "will not be attending", "won't be attending", "will not attend", "won't attend"]], "Elle n'assistera pas au séminaire, elle a un conflit d'agenda.", GT + ' ' + PCF, GTE + ' ' + PCE),
  K('By the time we arrive, the meeting ___ (already / start).', J(wl('already have started'), wl('have already started')), "Quand nous arriverons, la réunion aura déjà commencé.", FP + ' already se place après will ou après have.', FPE + ' Already goes after will or after have.'),
  K('At 6pm tomorrow, we ___ (still / test) the servers.', J(wl('still be testing'), wl('be still testing')), "Demain à 18 h, nous serons encore en train de tester les serveurs.", FC, FCE),
  K('I think interest rates ___ (rise) next quarter.', [wl('rise')], "Je pense que les taux d'intérêt augmenteront le trimestre prochain.", WI, WIE),
  K("They ___ (release) the update in October. It's confirmed.", J(gt('are', 'release'), pc('are', 'releasing')), "Ils sortiront la mise à jour en octobre, c'est confirmé.", GT + ' ' + PCF, GTE + ' ' + PCE),
  K("Don't worry, I ___ (not / forget) to send the report.", [wn('forget')], "Ne t'inquiète pas, je n'oublierai pas d'envoyer le rapport.", WI, WIE),
  K('By December, we ___ (finish) the whole migration.', [wl('have finished')], "D'ici décembre, nous aurons terminé toute la migration.", FP, FPE),
  K('This time next year, she ___ (manage) her own team.', [wl('be managing')], "À cette heure l'an prochain, elle dirigera sa propre équipe.", FC, FCE),
  K('I ___ (call) the supplier as soon as the meeting ends.', J(wl('call'), gt('am', 'call')), "J'appellerai le fournisseur dès que la réunion sera finie.", WI, WIE)
];
const m23a1 = [
  K('I bet the flight ___ (be) delayed again.', [wl('be')], "Je parie que le vol sera encore retardé.", WI, WIE),
  K("We ___ (move) offices in March. It's confirmed.", J(gt('are', 'move'), pc('are', 'moving')), "Nous déménageons les bureaux en mars, c'est confirmé.", GT + ' ' + PCF, GTE + ' ' + PCE),
  K('Watch out, that ladder ___ (fall)!', [gt('is', 'fall')], "Attention, cette échelle va tomber !", GT, GTE),
  K("I'm sure she ___ (enjoy) the new role.", [wl('enjoy')], "Je suis sûr qu'elle appréciera son nouveau poste.", WI, WIE),
  K("He's saved enough, so he ___ (buy) a new laptop.", [gt('is', 'buy')], "Il a assez économisé, donc il va s'acheter un nouvel ordinateur.", GT, GTE)
];
const m23a2 = [
  K('This time tomorrow, we ___ (cross) the border.', [wl('be crossing')], "Demain à cette heure, nous serons en train de passer la frontière.", FC, FCE),
  K('By next spring, they ___ (open) two new offices.', [wl('have opened')], "D'ici le printemps prochain, ils auront ouvert deux nouveaux bureaux.", FP, FPE),
  K('At noon, I ___ (interview) the new candidate.', [wl('be interviewing')], "À midi, je serai en train de recevoir le nouveau candidat.", FC, FCE),
  K('By the time she calls, we ___ (leave) the building.', [wl('have left')], "Quand elle appellera, nous serons déjà partis.", FP, FPE),
  K('By 6pm, we ___ (load) all the trucks.', [wl('have loaded')], "D'ici 18 h, nous aurons chargé tous les camions.", FP, FPE)
];
const m23b = [
  W('will / delayed / the / flight / be', ['The flight will be delayed.', 'The flight will be delayed'], "Le vol sera retardé.", WI, WIE),
  W('moving / are / offices / we / in / March', ['We are moving offices in March.', "We're moving offices in March."], "Nous déménageons les bureaux en mars.", PCF, PCE),
  W('going / fall / is / that / to / ladder', ['That ladder is going to fall.', "That ladder's going to fall."], "Cette échelle va tomber.", GT, GTE),
  W('enjoy / will / the / she / new / role', ['She will enjoy the new role.', "She'll enjoy the new role."], "Elle appréciera son nouveau poste.", WI, WIE),
  W('going / buy / is / he / to / a / laptop', ['He is going to buy a laptop.', "He's going to buy a laptop."], "Il va acheter un ordinateur portable.", GT, GTE),
  W('be / will / crossing / we / the / border', ['We will be crossing the border.', "We'll be crossing the border."], "Nous serons en train de passer la frontière.", FC, FCE),
  W('opened / will / have / they / two / offices', ['They will have opened two offices.', "They'll have opened two offices."], "Ils auront ouvert deux bureaux.", FP, FPE),
  W('loaded / will / have / we / all / the / trucks', ['We will have loaded all the trucks.', "We'll have loaded all the trucks."], "Nous aurons chargé tous les camions.", FP, FPE)
];
const th = [
  R("Je parie que le train sera encore en retard.", X(['I bet the train ', "I bet that the train "], ['will be late again.', 'will be delayed again.', "will be late once more.", 'will be late again']), WI, WIE),
  R("Nous allons déménager les laboratoires en avril.", X(['We are going to move the ', "We're going to move the ", 'We are moving the ', "We're moving the ", 'We will move the '], ['labs ', 'laboratories '], ['in April.', 'in April']), GT, GTE),
  R("Attention, ce rayonnage va s'effondrer.", X(['Watch out, ', 'Careful, ', 'Be careful, ', 'Look out, '], ['that rack ', 'that shelving ', 'that shelving unit ', 'those shelves ', 'this rack '], ['is going to collapse.', 'is going to fall.', 'are going to collapse.', 'are going to fall.']), GT, GTE),
  R("Je suis sûr qu'il appréciera son nouveau collègue.", X(["I'm sure ", 'I am sure ', "I'm certain ", 'I am certain '], ['he will like ', "he'll like ", 'he will enjoy working with ', "he'll enjoy working with ", 'he is going to like ', "he's going to like "], ['his new colleague.', 'his new co-worker.', 'his new coworker.']), WI, WIE),
  R("Elle va s'acheter une nouvelle voiture.", X(['She is going to buy ', "She's going to buy ", 'She is going to get ', "She's going to get "], ['herself a new car.', 'a new car.', 'a new car for herself.']), GT, GTE),
  R("Demain à cette heure, nous serons en train de survoler l'océan.", X(['This time tomorrow, ', 'Tomorrow at this time, '], ['we will be ', "we'll be "], ['flying over the ocean.', 'flying across the ocean.', 'flying over the Atlantic.']), FC, FCE),
  R("D'ici l'été prochain, elle aura terminé sa thèse.", X(['By next summer, ', 'By the next summer, '], ['she will have ', "she'll have "], ['finished her thesis.', 'completed her thesis.', 'finished her dissertation.', 'completed her dissertation.']), FP, FPE)
];
const sk1 = SK('Choisir entre will et going to', 'Choosing between will and going to');
const sk2 = SK('Future continuous et future perfect', 'Future continuous and future perfect');
export const G23 = {
  id: 'G23',
  title: 'Le futur : will, going to, future continuous et perfect',
  coursUrl: '',
  skills: {
    '*': sk1,
    'g23-guidee-b': sk2, 'g23-niv-b': sk2, 'g23-m23a-2': sk2,
    'g23-niv-c': SK('Futur : thème', 'Future forms: translation'), 'g23-th': SK('Futur : thème', 'Future forms: translation'),
    'g23-niv-d': SK('Futur : repérer et corriger', 'Future forms: spotting and correcting'),
    'g23-bonus': SK('Réponses courtes sur l\'avenir', 'Short replies about the future'),
    'g23-m23b': SK('Ordre des mots', 'Word order')
  },
  sets: [
    S('g23-guidee-a', FICHE, ['Série guidée A : will ou going to ?', 'Guided set A: will or going to?'], 'B1', ['Complète avec la forme correcte du futur.', 'Complete with the correct future form.'], guideeA),
    S('g23-guidee-b', FICHE, ['Série guidée B : future continuous et future perfect', 'Guided set B: future continuous and future perfect'], 'B1+', ['Complète avec will be + V-ing ou will have + participe passé.', 'Complete with will be + V-ing or will have + past participle.'], guideeB),
    S('g23-niv-a', FICHE, ['Niveau A : will et going to', 'Level A: will and going to'], 'B1', ['Complète avec la forme correcte.', 'Complete with the correct form.'], nivA),
    S('g23-niv-b', FICHE, ['Niveau B : future continuous et perfect', 'Level B: future continuous and perfect'], 'B1+', ['Complète avec la forme correcte.', 'Complete with the correct form.'], nivB),
    S('g23-niv-c', FICHE, ['Niveau C : thème', 'Level C: translation'], 'B1+', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], nivC),
    S('g23-niv-d', FICHE, ['Niveau D : erreurs à corriger', 'Level D: errors to correct'], 'B2', ['Corrige chaque phrase.', 'Correct each sentence.'], nivD),
    S('g23-bonus', FICHE, ['Bonus : réponses courtes variées', 'Bonus: varied short replies'], 'B2', ['Réponds librement, puis compare avec le modèle.', 'Answer freely, then compare with the model.'], bonus),
    S('g23-devoir', FICHE, ['Devoir maison', 'Homework'], 'B1+', ['Quinze phrases à compléter.', 'Fifteen sentences to complete.'], devoir),
    S('g23-m23a-1', MURPHY, ['Unité 23A : will ou going to (1/2)', 'Unit 23A: will or going to (1/2)'], 'B1', ['Complète avec la forme correcte.', 'Complete with the correct form.'], m23a1),
    S('g23-m23a-2', MURPHY, ['Unité 23A : future continuous ou perfect (2/2)', 'Unit 23A: future continuous or perfect (2/2)'], 'B1+', ['Complète avec la forme correcte.', 'Complete with the correct form.'], m23a2),
    S('g23-m23b', MURPHY, ['Unité 23B : remettre les mots dans l\'ordre', 'Unit 23B: sentence building'], 'B1+', ['Écris la phrase complète avec les mots dans le bon ordre.', 'Write the complete sentence with the words in the right order.'], m23b),
    S('g23-th', MURPHY, ['Unité TH : thème grammatical', 'Unit TH: translation'], 'B1+', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], th)
  ],
  recap: {
    blocks: [
      {
        title: 'Quatre façons d\'exprimer le futur',
        forms: [
          ['will + base', 'prédiction sans preuve, décision spontanée, promesse'],
          ['be going to + base', 'plan déjà décidé, prédiction avec preuve visible'],
          ['Present Continuous', 'programme personnel déjà fixé'],
          ['Present Simple', 'horaire fixe (transports, programme officiel)']
        ],
        uses: ['Compare le degré de certitude et de préparation avant de choisir.']
      },
      {
        title: 'Future Continuous et Future Perfect',
        forms: [
          ['will be + V-ing', 'action en cours à un moment précis du futur'],
          ['will have + V3', 'action terminée avant un moment futur'],
          ['won\'t + base', 'négation de will'],
          ['Will + sujet + base ... ?', 'question']
        ],
        uses: ['By + date ou by the time annonce souvent un future perfect.', 'This time tomorrow annonce un future continuous.']
      }
    ],
    tables: [],
    notes: ['Après will, on n\'emploie jamais go to : I will finish it, pas I will go to finish it.'],
    rule: 'going to = déjà décidé ou preuve visible ; will = décision sur le moment ou prédiction.'
  },
  enMeta: {
    title: 'The Future: will, going to, future continuous and perfect',
    recap: {
      blocks: [
        {
          title: 'Four ways to express the future',
          forms: [
            ['will + base', 'prediction without evidence, spontaneous decision, promise'],
            ['be going to + base', 'plan already decided, prediction with visible evidence'],
            ['Present Continuous', 'personal arrangement already fixed'],
            ['Present Simple', 'fixed timetable (transport, official programme)']
          ],
          uses: ['Compare how certain and how prepared the action is before choosing.']
        },
        {
          title: 'Future Continuous and Future Perfect',
          forms: [
            ['will be + V-ing', 'action in progress at a precise future moment'],
            ['will have + past participle', 'action completed before a future moment'],
            ["won't + base", 'negative of will'],
            ['Will + subject + base ... ?', 'question']
          ],
          uses: ['By + date or by the time often signals a future perfect.', 'This time tomorrow signals a future continuous.']
        }
      ],
      tables: [],
      notes: ['After will, never use go to: I will finish it, not I will go to finish it.'],
      rule: 'going to = already decided or visible evidence; will = on-the-spot decision or prediction.'
    }
  }
};
