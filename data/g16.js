// G16 : Le schéma interrogatif
import { S, FICHE, MURPHY, T, F, R, W, P, K, hint, SK } from './dsl2.js';

const Q = T('Pose la question sur la partie entre crochets.', 'Ask a question about the part in brackets.');
const NEG = T('Transforme en question négative.', 'Turn it into a negative question.');
const SUJ = 'Question sur le sujet : mot interrogatif + verbe, pas d\'inversion ni d\'auxiliaire.';
const SUJE = 'Question about the subject: question word + verb, no inversion and no auxiliary.';
const OBJ = 'Question sur un complément : mot interrogatif + auxiliaire + sujet + verbe.';
const OBJE = 'Question about an object or adverbial: question word + auxiliary + subject + verb.';

const guideeA = [
  K('___ does she work? (where)', [['where']], "Où travaille-t-elle ?", 'Where + does (présent simple).', 'Where + does (present simple).'),
  K('___ did he finish the project? (when)', [['when']], "Quand a-t-il terminé le projet ?", 'When + did (prétérit).', 'When + did (past simple).'),
  K('___ has she been studying English? (since when / for how long)', [['how long']], "Depuis combien de temps étudie-t-elle l'anglais ?", 'Durée : how long + has (present perfect).', 'Duration: how long + has (present perfect).'),
  K('___ is she going to present? (at what hour)', [['what time']], "À quelle heure va-t-elle présenter ?", 'Heure : what time + is (be going to).', 'Clock time: what time + is (be going to).'),
  K('___ reports does she submit per month? (quantity)', [['how many']], "Combien de rapports remet-elle par mois ?", 'Dénombrable : how many.', 'Countable: how many.'),
  K('___ the machine break down? (reason)', [['why did']], "Pourquoi la machine est-elle tombée en panne ?", 'Why + did + sujet + base verbale.', 'Why + did + subject + base verb.'),
  K('___ people attended the conference? (quantity)', [['how many']], "Combien de personnes ont assisté à la conférence ?", 'people est le sujet : how many people attended, sans did.', 'people is the subject: how many people attended, without did.'),
  K('___ methodology did the team use? (choice)', [['which']], "Quelle méthodologie l'équipe a-t-elle utilisée ?", 'Choix parmi des options : which.', 'Choice among options: which.'),
  K('___ has the prototype been tested? (frequency)', [['how many times', 'how often']], "Combien de fois le prototype a-t-il été testé ?", 'how many times (ou how often).', 'how many times (or how often).'),
  K('___ department does this report belong to? (choice)', [['which']], "À quel service ce rapport appartient-il ?", 'which + nom ; la préposition to reste à la fin.', 'which + noun; the preposition to stays at the end.')
];
const guideeB = [
  Q('She works [at Polytech Lille].', ['Where does she work?'], "Où travaille-t-elle ?", OBJ, OBJE),
  Q('He visited [three laboratories] last week.', ['How many laboratories did he visit last week?', 'How many labs did he visit last week?'], "Combien de laboratoires a-t-il visités la semaine dernière ?", OBJ, OBJE),
  Q('[The manager] signed the contract.', ['Who signed the contract?'], "Qui a signé le contrat ?", SUJ, SUJE),
  Q('She is leaving [because of the budget cuts].', ['Why is she leaving?'], "Pourquoi part-elle ?", OBJ, OBJE),
  Q('They will announce the results [next Friday].', ['When will they announce the results?'], "Quand annonceront-ils les résultats ?", OBJ, OBJE),
  Q('He has been working here [for ten years].', ['How long has he been working here?'], "Depuis combien de temps travaille-t-il ici ?", OBJ, OBJE),
  Q('She prefers [Python] for data analysis.', ['Which language does she prefer for data analysis?', 'What language does she prefer for data analysis?', 'Which does she prefer for data analysis?', 'What does she prefer for data analysis?', 'Which programming language does she prefer for data analysis?'], "Quel langage préfère-t-elle pour l'analyse de données ?", OBJ, OBJE),
  Q('[She] recommended this approach.', ['Who recommended this approach?'], "Qui a recommandé cette approche ?", SUJ, SUJE),
  Q('The report is [thirty pages] long.', ['How long is the report?', 'How many pages does the report have?', 'How many pages is the report?', 'How long is the report in pages?'], "Quelle est la longueur du rapport ?", OBJ, OBJE),
  Q('He visits the lab [twice a week].', ['How often does he visit the lab?'], "À quelle fréquence visite-t-il le laboratoire ?", OBJ, OBJE)
];
const nivA = [
  Q('The technician works [in the quality laboratory].', ['Where does the technician work?'], "Où travaille le technicien ?", OBJ, OBJE),
  Q('[The professor] explained the theory.', ['Who explained the theory?'], "Qui a expliqué la théorie ?", SUJ, SUJE),
  Q('The auditor inspects the plant [three times a month].', ['How often does the auditor inspect the plant?', 'How many times a month does the auditor inspect the plant?'], "À quelle fréquence l'auditeur inspecte-t-il l'usine ?", OBJ, OBJE),
  Q('They left [because of the bad weather].', ['Why did they leave?'], "Pourquoi sont-ils partis ?", OBJ, OBJE),
  Q('She has been studying here [for two years].', ['How long has she been studying here?'], "Depuis combien de temps étudie-t-elle ici ?", OBJ, OBJE),
  K('___ does she live? (where)', [['where']], "Où habite-t-elle ?", 'Where + does.', 'Where + does.'),
  K('___ did he finish the analysis? (when)', [['when']], "Quand a-t-il terminé l'analyse ?", 'When + did.', 'When + did.'),
  K('___ languages can she speak? (how much / how many)', [['how many']], "Combien de langues sait-elle parler ?", 'Dénombrable : how many.', 'Countable: how many.'),
  K('___ are they going? (where)', [['where']], "Où vont-ils ?", 'Where + are.', 'Where + are.'),
  K('___ has the machine been repaired? (reason)', [['why']], "Pourquoi la machine a-t-elle été réparée ?", 'Why + has.', 'Why + has.')
];
const nivB = [
  Q('He was promoted [last month].', ['When was he promoted?'], "Quand a-t-il été promu ?", OBJ, OBJE),
  Q('She told [me] about the new project.', ['Who did she tell about the new project?', 'Who did she tell about the project?', 'Whom did she tell about the new project?', 'Whom did she tell about the project?'], "À qui a-t-elle parlé du nouveau projet ?", OBJ, OBJE),
  Q('They are meeting [the director of engineering].', ['Who are they meeting?', 'Whom are they meeting?'], "Qui rencontrent-ils ?", OBJ, OBJE),
  Q('She submitted [five reports] this week.', ['How many reports did she submit this week?', 'How many reports has she submitted this week?'], "Combien de rapports a-t-elle remis cette semaine ?", OBJ, OBJE),
  Q('[The results] surprised everyone in the department.', ['What surprised everyone in the department?', 'What surprised everyone?'], "Qu'est-ce qui a surpris tout le monde ?", SUJ, SUJE)
];
const nivC = [
  F('Where he studies?', ['Where does he study?'], "Où étudie-t-il ?", 'Il faut l\'auxiliaire does et l\'inversion.', 'You need the auxiliary does and inversion.'),
  F('What time does begins the class?', ['What time does the class begin?', 'What time does the class start?'], "À quelle heure commence la réunion ?", 'Après does, le verbe est à la base verbale, et le sujet vient avant.', 'After does, the verb is in the base form, and the subject comes before it.'),
  F("Why he didn't come yesterday?", ["Why didn't he come yesterday?"], "Pourquoi n'est-il pas venu hier ?", 'Inversion : auxiliaire + sujet.', 'Inversion: auxiliary + subject.'),
  F('How many time has she been here?', ['How many times has she been here?', 'How long has she been here?'], "Combien de fois est-elle venue ici ? / Depuis combien de temps est-elle ici ?", 'How many + pluriel : times ; ou how long pour la durée.', 'How many + plural: times; or how long for duration.'),
  F('Who did call during the meeting?', ['Who called during the meeting?'], "Qui a appelé pendant la réunion ?", SUJ, SUJE),
  R("Combien de temps faut-il pour terminer cette analyse ?", ['How long does it take to finish this analysis?', 'How long does it take to complete this analysis?', 'How long does it take to finish the analysis?', 'How long does it take to complete the analysis?'], 'How long does it take to ...', 'How long does it take to ...'),
  R("À quelle heure commence la réunion de demain ?", ["What time does tomorrow's meeting start?", "What time does tomorrow's meeting begin?", 'What time does the meeting start tomorrow?', 'What time does the meeting begin tomorrow?', "What time is tomorrow's meeting?"], 'What time + does + sujet + base.', 'What time + does + subject + base.'),
  R("Pourquoi le système n'a-t-il pas fonctionné correctement ?", ["Why didn't the system work correctly?", "Why didn't the system work properly?", 'Why did the system not work correctly?', 'Why did the system not work properly?'], 'Why + didn\'t + sujet + base.', "Why + didn't + subject + base."),
  R("Qui a signé le contrat en l'absence du directeur ?", ["Who signed the contract in the director's absence?", "Who signed the contract while the director was away?", "Who signed the contract when the director was absent?", "Who signed the contract in the manager's absence?"], 'Who est le sujet : pas d\'inversion.', 'Who is the subject: no inversion.'),
  R("De quel service vient ce courrier ?", ['Which department does this letter come from?', 'Which department does this mail come from?', 'Which department is this letter from?', 'Which department does this email come from?', 'Which department is this mail from?'], 'which + nom ; la préposition reste à la fin.', 'which + noun; the preposition stays at the end.')
];
const nivD = [
  K('Do you know ___? (Where does she work?)', [['where she works']], "Savez-vous où elle travaille ?", 'Question indirecte : ordre déclaratif, sans does.', 'Indirect question: statement word order, without does.'),
  K('Could you tell me ___? (What time did the meeting start?)', [['what time the meeting started']], "Pourriez-vous me dire à quelle heure la réunion a commencé ?", 'Ordre déclaratif ; le prétérit reste porté par le verbe.', 'Statement word order; the past tense is carried by the verb.'),
  K("I'd like to know ___. (How many reports has she submitted?)", [['how many reports she has submitted', 'how many reports she submitted']], "J'aimerais savoir combien de rapports elle a remis.", 'Ordre déclaratif : sujet + auxiliaire.', 'Statement order: subject + auxiliary.'),
  K("I wonder ___. (Why didn't they come?)", [["why they didn't come", 'why they did not come']], "Je me demande pourquoi ils ne sont pas venus.", 'Ordre déclaratif ; la négation reste avec le verbe.', 'Statement order; the negation stays with the verb.'),
  K('Can you explain ___? (Who is responsible for this error?)', [['who is responsible for this error']], "Pouvez-vous expliquer qui est responsable de cette erreur ?", 'Ici who est sujet : l\'ordre ne change pas.', 'Here who is the subject: the order does not change.')
];
const bonus = [
  P("Explique la différence : 'Who did she call?' et 'Who called her?'", "'Who did she call?' vs 'Who called her?' What is the grammatical difference?", ["In 'Who did she call?', who is the object, so we need did and inversion. In 'Who called her?', who is the subject, so there is no auxiliary and no inversion."], 'Sujet ou objet ?', "What is the grammatical difference?", 'Subject or object?'),
  P("Explique : 'What does this mean?' et 'What happened?'", "'What does this mean?' vs 'What happened?' Why does the form differ?", ["In 'What does this mean?', what is the object, so we use does. In 'What happened?', what is the subject, so the verb follows directly."], 'Sujet ou objet ?', "Why does the form differ?", 'Subject or object?'),
  P("Traduis : « Qu'est-ce qui a causé la panne ? » (quoi est sujet)", "Translate: « Qu'est-ce qui a causé la panne ? » (the question word is the subject)", ['What caused the breakdown?', 'What caused the failure?'], 'Sujet : pas d\'auxiliaire.', "Translate this question (the question word is the subject).", 'Subject: no auxiliary.'),
  P("Traduis : « Qu'est-ce qu'elle a causé ? » (quoi est objet)", "Translate: « Qu'est-ce qu'elle a causé ? » (the question word is the object)", ['What did she cause?'], 'Objet : auxiliaire did + inversion.', "Translate this question (the question word is the object).", 'Object: auxiliary did + inversion.')
];
const devoir = [
  Q("She studies [at Polytech Lille in Villeneuve d'Ascq].", ['Where does she study?'], "Où étudie-t-elle ?", OBJ, OBJE),
  Q('[Five engineers from different departments] attended the symposium.', ['How many engineers attended the symposium?', 'Who attended the symposium?'], "Combien d'ingénieurs ont assisté au colloque ?", SUJ, SUJE),
  Q('They worked [until midnight] to meet the deadline.', ['How long did they work?', 'Until when did they work?', 'How late did they work?', 'Until what time did they work?', 'What time did they work until?'], "Jusqu'à quand ont-ils travaillé ?", OBJ, OBJE),
  Q('He applied [because he wanted a significant career challenge].', ['Why did he apply?'], "Pourquoi a-t-il postulé ?", OBJ, OBJE),
  Q('She will present [her research on urban mobility] next week.', ['What will she present next week?'], "Que présentera-t-elle la semaine prochaine ?", OBJ, OBJE),
  Q('They have worked together [for three years].', ['How long have they worked together?'], "Depuis combien de temps travaillent-ils ensemble ?", OBJ, OBJE),
  Q('He met [the CEO of the company] yesterday afternoon.', ['Who did he meet yesterday afternoon?', 'Whom did he meet yesterday afternoon?'], "Qui a-t-il rencontré hier après-midi ?", OBJ, OBJE),
  Q('She can speak [four languages] fluently.', ['How many languages can she speak fluently?', 'How many languages can she speak?'], "Combien de langues parle-t-elle couramment ?", OBJ, OBJE),
  Q('[The professor of fluid mechanics] suggested a new approach.', ['Who suggested a new approach?'], "Qui a suggéré une nouvelle approche ?", SUJ, SUJE),
  Q('They are currently testing [the new prototype].', ['What are they currently testing?', 'What are they testing at the moment?', 'What are they testing?'], "Que testent-ils actuellement ?", OBJ, OBJE),
  K('___ long have you been working on this research project?', [['how']], "Depuis combien de temps travaillez-vous sur ce projet de recherche ?", 'how long.', 'how long.'),
  K('___ many participants attended the online seminar?', [['how']], "Combien de participants ont suivi le séminaire en ligne ?", 'how many.', 'how many.'),
  K('___ is the deadline for the final submission?', [['when', 'what']], "Quelle est la date limite de remise finale ?", 'when ou what is the deadline.', 'when or what is the deadline.'),
  K('___ will the results be officially published?', [['when']], "Quand les résultats seront-ils publiés officiellement ?", 'when + will.', 'when + will.'),
  K('___ is ultimately responsible for the quality of the output?', [['who']], "Qui est responsable en dernier ressort de la qualité du résultat ?", 'who est le sujet.', 'who is the subject.')
];
const m16a1 = [
  Q('He teaches [in the physics department].', ['Where does he teach?'], "Où enseigne-t-il ?", OBJ, OBJE),
  Q('[The director] approved the invoice.', ['Who approved the invoice?'], "Qui a approuvé la facture ?", SUJ, SUJE),
  Q('She has been teaching here [for six years].', ['How long has she been teaching here?'], "Depuis combien de temps enseigne-t-elle ici ?", OBJ, OBJE),
  Q('They cancelled the test [because of the storm].', ['Why did they cancel the test?'], "Pourquoi ont-ils annulé le test ?", OBJ, OBJE),
  Q('She visits the lab [three times a week].', ['How often does she visit the lab?', 'How many times a week does she visit the lab?'], "À quelle fréquence visite-t-elle le laboratoire ?", OBJ, OBJE)
];
const m16a2 = [
  F('Where they meet?', ['Where do they meet?'], "Où se retrouvent-ils ?", 'auxiliaire + inversion.', 'auxiliary + inversion.'),
  F('When does starts the course?', ['When does the course start?', 'When does the course begin?'], "Quand commence le cours ?", 'base verbale après does.', 'base verb after does.'),
  F("Why he didn't come?", ["Why didn't he come?"], "Pourquoi n'est-il pas venu ?", 'inversion.', 'inversion.'),
  F('Who did call?', ['Who called?'], "Qui a appelé ?", SUJ, SUJE)
];
const m16b = [
  NEG('Suggest scheduling a call. (Why don\'t ...)', ["Why don't we schedule a call?", "Why don't we set up a call?", "Why don't we arrange a call?", 'Why do we not schedule a call?', "Why don't we book a call?"], "Pourquoi ne pas programmer un appel ?", 'Why don\'t we + base = suggestion.', "Why don't we + base = suggestion."),
  NEG("Express surprise that she hasn't replied. (Hasn't ...)", ["Hasn't she replied yet?", "Hasn't she replied?", "Hasn't she answered yet?", "Hasn't she answered?"], "Elle n'a pas encore répondu ?", "Hasn't + sujet + participe = surprise.", "Hasn't + subject + participle = surprise."),
  NEG('Suggest trying a different approach. (Why don\'t ...)', ["Why don't you try a different approach?", "Why don't we try a different approach?", "Why don't you try another approach?", "Why don't we try another approach?"], "Pourquoi ne pas essayer une autre approche ?", "Why don't you/we + base = suggestion.", "Why don't you/we + base = suggestion."),
  NEG("Express surprise that the results aren't ready. (Aren't ...)", ["Aren't the results ready yet?", "Aren't the results ready?"], "Les résultats ne sont pas encore prêts ?", "Aren't + sujet + adjectif = surprise.", "Aren't + subject + adjective = surprise."),
  NEG('Confirm that the meeting is at 10. (Isn\'t ...)', ["Isn't the meeting at 10?", "Isn't the meeting at ten?", "Isn't the meeting at 10 o'clock?", "Isn't the meeting at 10 am?", "Isn't the meeting at 10 a.m.?"], "La réunion n'est-elle pas à 10 heures ?", "Isn't + sujet ... ? attend une confirmation.", "Isn't + subject ... ? expects a confirmation.")
];
const m16c = [
  W('what / time / does / the / lecture / start', ['What time does the lecture start?'], "À quelle heure commence le cours ?", 'what time + does + sujet + base.', 'what time + does + subject + base.'),
  W("why / hasn't / the / invoice / been / paid", ["Why hasn't the invoice been paid?"], "Pourquoi la facture n'a-t-elle pas été payée ?", "Why + hasn't + sujet + participe.", "Why + hasn't + subject + participle."),
  W('where / did / they / store / the / spare / parts', ['Where did they store the spare parts?'], "Où ont-ils rangé les pièces de rechange ?", 'where + did + sujet + base.', 'where + did + subject + base.'),
  W('how / long / has / he / been / managing / this / team', ['How long has he been managing this team?'], "Depuis combien de temps dirige-t-il cette équipe ?", 'how long + has + sujet + been + -ing.', 'how long + has + subject + been + -ing.'),
  W('who / signed / the / purchase / order', ['Who signed the purchase order?'], "Qui a signé le bon de commande ?", 'who sujet : pas d\'auxiliaire.', 'who subject: no auxiliary.'),
  W("isn't / the / workshop / planned / for / Monday", ["Isn't the workshop planned for Monday?"], "L'atelier n'est-il pas prévu lundi ?", "Isn't + sujet + participe.", "Isn't + subject + participle."),
  W('what / does / this / error / message / mean', ['What does this error message mean?'], "Que signifie ce message d'erreur ?", 'what + does + sujet + base.', 'what + does + subject + base.'),
  W("haven't / they / answered / my / call / yet", ["Haven't they answered my call yet?", "Haven't they returned my call yet?"], "N'ont-ils pas encore répondu à mon appel ?", "Haven't + sujet + participe.", "Haven't + subject + participle.")
];
const th = [
  R("À quelle heure commence le poste de nuit ?", ['What time does the night shift start?', 'What time does the night shift begin?', 'What time does the night shift start at?'], 'what time + does + sujet + base.', 'what time + does + subject + base.'),
  R("Pourquoi la facture n'a-t-elle pas été envoyée ?", ["Why hasn't the invoice been sent?", 'Why has the invoice not been sent?'], "Why + hasn't + sujet + been + participe.", "Why + hasn't + subject + been + participle."),
  R("Où ont-ils rangé les nouveaux outils ?", ['Where did they put the new tools?', 'Where did they store the new tools?', 'Where did they keep the new tools?'], 'where + did + sujet + base.', 'where + did + subject + base.'),
  R("Depuis combien de temps coordonne-t-il cette équipe ?", ['How long has he been coordinating this team?', 'How long has he been leading this team?', 'How long has he been managing this team?', 'How long has he coordinated this team?'], 'how long + has + sujet + been + -ing.', 'how long + has + subject + been + -ing.'),
  R("Qui a validé le changement de planning ?", ['Who approved the schedule change?', 'Who approved the change of schedule?', 'Who validated the schedule change?', 'Who approved the change in the schedule?', 'Who approved the change to the schedule?'], 'Who sujet : pas d\'auxiliaire.', 'Who subject: no auxiliary.'),
  R("Le colloque n'est-il pas prévu pour jeudi ?", ["Isn't the symposium scheduled for Thursday?", "Isn't the symposium planned for Thursday?", 'Is the symposium not scheduled for Thursday?', "Isn't the conference scheduled for Thursday?", "Isn't the conference planned for Thursday?"], "Isn't + sujet + participe.", "Isn't + subject + participle."),
  R("Que signifie ce symbole sur l'écran ?", ['What does this symbol on the screen mean?', 'What does this symbol mean on the screen?', 'What does this icon on the screen mean?', 'What does this symbol on the display mean?'], 'what + does + sujet + mean.', 'what + does + subject + mean.')
];
const A = SK('Questions : mot interrogatif et auxiliaire', 'Questions: question word and auxiliary');
export const G16 = {
  id: 'G16',
  title: 'Le schéma interrogatif (The Interrogative Pattern)',
  coursUrl: '',
  skills: {
    '*': A,
    'g16-niv-c': SK('Questions : corrections et thème', 'Questions: corrections and translation'),
    'g16-th': SK('Questions : corrections et thème', 'Questions: corrections and translation'),
    'g16-niv-d': SK('Questions indirectes', 'Indirect questions'),
    'g16-bonus': SK('Question sur le sujet ou sur l\'objet', 'Subject or object questions'),
    'g16-m16b': SK('Questions négatives', 'Negative questions'),
    'g16-m16a-2': SK('Questions : corrections et thème', 'Questions: corrections and translation')
  },
  sets: [
    S('g16-guidee-a', FICHE, ['Série guidée A : compléter la question', 'Guided set A: complete the question'], 'A2', ['Complète avec le mot interrogatif (et l\'auxiliaire si nécessaire).', 'Complete with the question word (and the auxiliary if needed).'], guideeA),
    S('g16-guidee-b', FICHE, ['Série guidée B : question sur la partie entre crochets', 'Guided set B: question about the bracketed part'], 'B1', ['Pose la question sur la partie entre crochets.', 'Ask a question about the part in brackets.'], guideeB),
    S('g16-niv-a', FICHE, ['Niveau A : questions directes', 'Level A: direct questions'], 'A2', ['Pose la question ou complète-la.', 'Ask the question or complete it.'], nivA),
    S('g16-niv-b', FICHE, ['Niveau B : questions complexes', 'Level B: more complex questions'], 'B1+', ['Pose la question sur la partie entre crochets.', 'Ask a question about the bracketed part.'], nivB),
    S('g16-niv-c', FICHE, ['Niveau C : erreurs et traduction', 'Level C: errors and translation'], 'B1+', ['Corrige cinq questions, puis traduis cinq questions.', 'Correct five questions, then translate five questions.'], nivC),
    S('g16-niv-d', FICHE, ['Niveau D : questions indirectes', 'Level D: indirect questions'], 'B2', ['Complète avec la question indirecte.', 'Complete with the indirect question.'], nivD),
    S('g16-bonus', FICHE, ['Bonus : sujet ou objet', 'Bonus: subject or object'], 'B2', ['Explique ou traduis, puis compare avec le modèle.', 'Explain or translate, then compare with the model.'], bonus),
    S('g16-devoir', FICHE, ['Devoir maison', 'Homework'], 'B1+', ['Quinze questions à poser ou à compléter.', 'Fifteen questions to ask or complete.'], devoir),
    S('g16-m16a-1', MURPHY, ['Unité 16A : poser la question (1/2)', 'Unit 16A: asking the question (1/2)'], 'B1', ['Pose la question sur la partie entre crochets.', 'Ask a question about the bracketed part.'], m16a1),
    S('g16-m16a-2', MURPHY, ['Unité 16A : corriger les erreurs (2/2)', 'Unit 16A: correcting errors (2/2)'], 'B1', ['Corrige la question.', 'Correct the question.'], m16a2),
    S('g16-m16b', MURPHY, ['Unité 16B : questions négatives', 'Unit 16B: negative questions'], 'B1+', ['Écris la question négative demandée.', 'Write the negative question required.'], m16b),
    S('g16-m16c', MURPHY, ['Unité 16C : remettre les mots dans l\'ordre', 'Unit 16C: sentence building'], 'B1+', ['Écris la question complète avec les mots dans le bon ordre.', 'Write the complete question with the words in the right order.'], m16c),
    S('g16-th', MURPHY, ['Unité TH : thème grammatical', 'Unit TH: translation'], 'B1+', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], th)
  ],
  recap: {
    blocks: [
      {
        title: 'Le schéma général',
        forms: [
          ['oui / non', 'AUXILIAIRE + SUJET + VERBE : Does she work here? Have they finished?'],
          ['wh- (objet, complément)', 'MOT INTERR. + AUX. + SUJET + VERBE : Where do you work?'],
          ['wh- (sujet)', 'MOT INTERR. + VERBE, sans inversion : Who called? What happened?'],
          ['be', 'be directement : Is she tired? Were they on time?'],
          ['question négative', 'Why don\'t we ...? (suggestion) ; Isn\'t it ...? (surprise, confirmation)'],
          ['question indirecte', 'ordre déclaratif : Do you know where she works?']
        ],
        uses: ['Auxiliaires : do / does (présent), did (prétérit), have / has (present perfect), will, be going to, modaux.']
      },
      {
        title: 'Mots interrogatifs',
        forms: [
          ['who / what / which / whose', 'personne / chose / choix / possession'],
          ['when / where / why / how', 'temps / lieu / raison / manière'],
          ['how much / how many', 'indénombrable / dénombrable'],
          ['how long / how often', 'durée / fréquence'],
          ['what time', 'heure']
        ],
        uses: ['La préposition reste à la fin : Which department does this report belong to?']
      }
    ],
    tables: [],
    notes: ['Après did / does, le verbe est à la base verbale.'],
    rule: 'Question = inversion auxiliaire / sujet, sauf quand le mot interrogatif est le sujet.'
  },
  enMeta: {
    title: 'The Interrogative Pattern',
    recap: {
      blocks: [
        {
          title: 'The general pattern',
          forms: [
            ['yes / no', 'AUXILIARY + SUBJECT + VERB: Does she work here? Have they finished?'],
            ['wh- (object, adverbial)', 'QUESTION WORD + AUX. + SUBJECT + VERB: Where do you work?'],
            ['wh- (subject)', 'QUESTION WORD + VERB, no inversion: Who called? What happened?'],
            ['be', 'be directly: Is she tired? Were they on time?'],
            ['negative question', "Why don't we ...? (suggestion); Isn't it ...? (surprise, confirmation)"],
            ['indirect question', 'statement order: Do you know where she works?']
          ],
          uses: ['Auxiliaries: do / does (present), did (past), have / has (present perfect), will, be going to, modals.']
        },
        {
          title: 'Question words',
          forms: [
            ['who / what / which / whose', 'person / thing / choice / possession'],
            ['when / where / why / how', 'time / place / reason / manner'],
            ['how much / how many', 'uncountable / countable'],
            ['how long / how often', 'duration / frequency'],
            ['what time', 'clock time']
          ],
          uses: ['The preposition stays at the end: Which department does this report belong to?']
        }
      ],
      tables: [],
      notes: ['After did / does, the verb is in the base form.'],
      rule: 'A question = inversion of auxiliary and subject, except when the question word is the subject.'
    }
  }
};
