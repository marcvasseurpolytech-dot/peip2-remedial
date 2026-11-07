// G02 : The Past Simple (le prétérit simple)
// Contenu reconstruit à partir de la fiche élève, du supplément Murphy et du devoir maison.
// Le texte anglais (règles, indices, consignes) est écrit à côté du texte français avec E(...).
import { E, c, ch, tx, tr, op, es, FIX, set } from './dsl.js';

const FRW = 'Réécris la phrase au prétérit.';
const ENW = 'Rewrite the sentence in the past simple.';

const guideeA = [
  c('She ___ (go) to the library yesterday.', ['went'], 'Elle est allée à la bibliothèque hier.',
    "yesterday date l'action : prétérit. go est irrégulier, sa forme de prétérit est à connaître : went.", 'verbe irrégulier',
    E('yesterday places the action in the past: past simple. go is irregular, its past form must be learnt: went.', 'irregular verb')),
  c('He ___ (finish) his report at midnight.', ['finished'], 'Il a terminé son rapport à minuit.',
    'Verbe régulier : on ajoute -ed à la base verbale. finish devient finished.', 'verbe régulier',
    E('Regular verb: add -ed to the base form. finish becomes finished.', 'regular verb')),
  c('They ___ (be) very tired after the meeting.', ['were'], 'Ils étaient très fatigués après la réunion.',
    'be a deux formes au prétérit : was (I, he, she, it) et were (you, we, they). Sujet they : were.', 'sujet pluriel',
    E('be has two past forms: was (I, he, she, it) and were (you, we, they). With they: were.', 'plural subject')),
  c('I ___ (write) an email to the client.', ['wrote'], 'J\'ai écrit un e-mail au client.',
    'write est irrégulier : write, wrote, written.', 'verbe irrégulier',
    E('write is irregular: write, wrote, written.', 'irregular verb')),
  c('The company ___ (hire) fifty engineers last year.', ['hired'], "L'entreprise a embauché cinquante ingénieurs l'an dernier.",
    "hire se termine déjà par -e : on n'ajoute que -d. hire devient hired.", 'finit déjà par un -e',
    E('hire already ends in -e: just add -d. hire becomes hired.', 'already ends in -e')),
  c('She ___ (study) all night before the exam.', ['studied'], "Elle a étudié toute la nuit avant l'examen.",
    'Consonne + y : le y devient -ied. study devient studied.', 'consonne + y',
    E('Consonant + y: the y changes to -ied. study becomes studied.', 'consonant + y')),
  c('He ___ (stop) the experiment when the alarms went off.', ['stopped'], "Il a arrêté l'expérience quand les alarmes se sont déclenchées.",
    'Verbe court qui finit par consonne + voyelle + consonne (CVC) : on double la dernière consonne. stop devient stopped.', 'on double la consonne finale',
    E('Short verb ending in consonant + vowel + consonant (CVC): double the last consonant. stop becomes stopped.', 'double the final consonant')),
  c('The team ___ (have) a breakthrough in March.', ['had'], "L'équipe a fait une percée en mars.",
    'have est irrégulier : have, had, had. have a breakthrough = faire une percée.', 'verbe irrégulier',
    E('have is irregular: have, had, had. A breakthrough is a major discovery.', 'irregular verb')),
  c('I ___ (find) the solution after hours of work.', ['found'], "J'ai trouvé la solution après des heures de travail.",
    'find est irrégulier : find, found, found.', 'verbe irrégulier',
    E('find is irregular: find, found, found.', 'irregular verb')),
  c('We ___ (spend) six months on this analysis.', ['spent'], 'Nous avons passé six mois sur cette analyse.',
    'spend est irrégulier : spend, spent, spent. Le d final devient t.', 'verbe irrégulier',
    E('spend is irregular: spend, spent, spent. The final d becomes t.', 'irregular verb'))
];

const guideeB = [
  c('She ___ (not / receive) the email.', ["didn't receive"], "Elle n'a pas reçu l'e-mail.",
    'Négation du prétérit : did not (didn\'t) + base verbale. receive reste à la base, sans -ed.', 'didn\'t + base verbale',
    E("Negative of the past simple: did not (didn't) + base form. receive stays in the base form, with no -ed.", "didn't + base form")),
  c('___ he ___ (understand) the instructions?', ['Did', 'understand'], 'A-t-il compris les instructions ?',
    'Question au prétérit : Did + sujet + base verbale. Le verbe ne prend ni -ed ni forme irrégulière.', 'auxiliaire du passé + sujet + base',
    E('Question in the past simple: Did + subject + base form. The verb takes neither -ed nor an irregular form.', 'past auxiliary + subject + base')),
  c('They ___ (not / be) present at the meeting.', ["weren't"], "Ils n'étaient pas présents à la réunion.",
    "be ne prend jamais did : on met be lui-même à la forme négative. Avec they : were not (weren't).", 'be : pas de did',
    E("be never takes did: put be itself in the negative. With they: were not (weren't).", 'be: no did')),
  c('___ you ___ (study) engineering in Lille?', ['Did', 'study'], 'As-tu étudié l\'ingénierie à Lille ?',
    'Question au prétérit : Did + sujet + base verbale. study revient à la base : study.', 'auxiliaire du passé + sujet + base',
    E('Question in the past simple: Did + subject + base form. study goes back to the base form.', 'past auxiliary + subject + base')),
  c('He ___ (not / have) enough time to review.', ["didn't have"], "Il n'a pas eu assez de temps pour réviser.",
    "didn't + base verbale : have reste à la base, il ne devient pas had.", "didn't + base",
    E("didn't + base form: have stays as it is, it does not become had.", "didn't + base")),
  c('___ (be) she satisfied with the outcome?', ['Was'], 'Était-elle satisfaite du résultat ?',
    'Avec be, la question se forme par inversion directe : Was she...? On n\'emploie pas did.', 'be : inversion directe',
    E('With be, the question is formed by direct inversion: Was she...? Do not use did.', 'be: direct inversion')),
  c('We ___ (not / meet) the deadline.', ["didn't meet"], "Nous n'avons pas respecté l'échéance.",
    "didn't + base verbale : meet reste à la base. meet the deadline = respecter l'échéance.", "didn't + base",
    E("didn't + base form: meet stays as it is. To meet a deadline means to finish on time.", "didn't + base")),
  c('Why ___ the experiment ___ (fail)?', ['did', 'fail'], "Pourquoi l'expérience a-t-elle échoué ?",
    'Mot interrogatif + did + sujet + base verbale : Why did the experiment fail?', 'Why + auxiliaire + sujet + base',
    E('Question word + did + subject + base form: Why did the experiment fail?', 'Why + auxiliary + subject + base')),
  c('He ___ (not / know) about the change.', ["didn't know"], 'Il ne savait pas que cela avait changé.',
    "didn't + base verbale : know reste à la base (pas de knew après didn't).", "didn't + base",
    E("didn't + base form: know stays as it is (no knew after didn't).", "didn't + base")),
  c('___ they ___ (manage) to solve the problem?', ['Did', 'manage'], 'Ont-ils réussi à résoudre le problème ?',
    'Did + sujet + base verbale. manage to + verbe = réussir à.', 'auxiliaire du passé + sujet + base',
    E('Did + subject + base form. manage to + verb means to succeed in doing something.', 'past auxiliary + subject + base'))
];

const nivA = [
  c('The engineer ___ (design) a new bridge in 2020.', ['designed'], 'L\'ingénieur a conçu un nouveau pont en 2020.',
    'in 2020 est une date précise : prétérit. design est régulier : designed.', null,
    E('in 2020 is a precise date: past simple. design is regular: designed.')),
  c('I ___ (not / sleep) well last night.', ["didn't sleep"], "Je n'ai pas bien dormi la nuit dernière.",
    "last night marque un passé révolu. Négation : didn't + base verbale, donc sleep (et non slept).", null,
    E("last night is finished past time. Negative: didn't + base form, so sleep (not slept).")),
  c('___ she ___ (pass) her exam?', ['Did', 'pass'], 'A-t-elle réussi son examen ?',
    "Question au prétérit : Did + sujet + base verbale. En anglais, on dit pass an exam (réussir), pas succeed.", null,
    E('Question in the past simple: Did + subject + base form. To pass an exam means to succeed in it.')),
  c('They ___ (meet) the manager yesterday.', ['met'], 'Ils ont rencontré le responsable hier.',
    'meet est irrégulier : meet, met, met.', null,
    E('meet is irregular: meet, met, met.')),
  c('The machine ___ (stop) working suddenly.', ['stopped'], 'La machine a soudain cessé de fonctionner.',
    'stop est un verbe CVC : on double le p. stopped.', null,
    E('stop is a CVC verb: double the p. stopped.')),
  c('He ___ (not / know) the answer to the question.', ["didn't know"], 'Il ne connaissait pas la réponse à la question.',
    "didn't + base verbale : know reste à la base.", null,
    E("didn't + base form: know stays in the base form.")),
  c('We ___ (visit) the factory last Monday.', ['visited'], "Nous avons visité l'usine lundi dernier.",
    'last Monday : passé révolu. visit est régulier : visited.', null,
    E('last Monday is finished past time. visit is regular: visited.')),
  c('___ (be) it cold yesterday?', ['Was'], 'Faisait-il froid hier ?',
    'be se met à la forme interrogative par inversion : Was it...? Pas de did avec be.', null,
    E('With be, invert the subject and the verb: Was it...? Do not use did with be.')),
  c('She ___ (become) the team leader two years ago.', ['became'], "Elle est devenue chef d'équipe il y a deux ans.",
    'ago indique un passé révolu. become est irrégulier : become, became, become.', null,
    E('ago marks finished past time. become is irregular: become, became, become.')),
  c('I ___ (lose) my security badge this morning.', ['lost'], "J'ai perdu mon badge de sécurité ce matin.",
    'lose est irrégulier : lose, lost, lost. Le prétérit est possible avec this morning si la matinée est terminée.', null,
    E('lose is irregular: lose, lost, lost. The past simple is possible with this morning if the morning is over.'))
];

const nivB = [
  c('The students ___ (submit) their projects on time.', ['submitted'], 'Les étudiants ont rendu leurs projets à temps.',
    'submit est un verbe CVC dont l\'accent tombe sur la dernière syllabe : on double le t. submitted.', null,
    E('submit is a CVC verb stressed on the last syllable: double the t. submitted.')),
  c('He ___ (not / agree) with the new policy.', ["didn't agree"], "Il n'était pas d'accord avec la nouvelle politique.",
    "didn't + base verbale : agree reste à la base. agree with se construit sans be.", null,
    E("didn't + base form: agree stays as it is. agree with takes no be.")),
  c('___ they ___ (arrive) before the presentation started?', ['Did', 'arrive'], 'Sont-ils arrivés avant le début de la présentation ?',
    'Did + sujet + base verbale. Le second verbe (started) est déjà au prétérit, arrive reste à la base.', null,
    E('Did + subject + base form. The second verb (started) is already in the past; arrive stays in the base form.')),
  c('The experiment ___ (confirm) our initial hypothesis.', ['confirmed'], "L'expérience a confirmé notre hypothèse initiale.",
    'confirm est régulier : confirmed. Pas de doublement, car le verbe ne se termine pas par consonne + voyelle + consonne.', null,
    E('confirm is regular: confirmed. No doubling, because the verb does not end in consonant + vowel + consonant.')),
  c('She ___ (not / study) for the certification test.', ["didn't study"], "Elle n'a pas révisé pour le test de certification.",
    "didn't + base verbale : study garde son y à la base (le y devient i seulement à l'affirmatif).", null,
    E("didn't + base form: study keeps its y (it changes to -ied only in affirmative sentences).")),
  c('We ___ (spend) three hours reviewing the report.', ['spent'], 'Nous avons passé trois heures à relire le rapport.',
    'spend est irrégulier : spent. Après spend + durée, on met le verbe en -ing.', null,
    E('spend is irregular: spent. After spend + a length of time, the verb takes -ing.')),
  c('___ the system ___ (work) correctly during the demo?', ['Did', 'work'], 'Le système a-t-il fonctionné correctement pendant la démonstration ?',
    'Did + sujet + base verbale : Did the system work...?', null,
    E('Did + subject + base form: Did the system work...?')),
  c('He ___ (have) a one-to-one with the director.', ['had'], 'Il a eu un entretien en tête à tête avec le directeur.',
    'have est irrégulier : had. Ici have signifie « avoir (un rendez-vous) », verbe d\'action.', null,
    E('have is irregular: had. Here it means to hold (a meeting).')),
  c('I ___ (not / see) the error in the code.', ["didn't see"], "Je n'ai pas vu l'erreur dans le code.",
    "didn't + base verbale : see reste à la base (pas de saw après didn't).", null,
    E("didn't + base form: see stays as it is (no saw after didn't).")),
  c('The project ___ (take) eight months to complete.', ['took'], 'Le projet a pris huit mois pour être terminé.',
    'take est irrégulier : take, took, taken.', null,
    E('take is irregular: take, took, taken.'))
];

const nivC = [
  tx(FIX, "She didn't went to the conference.", ["She didn't go to the conference.", 'She did not go to the conference.'], "Elle n'est pas allée à la conférence.",
    "Après didn't, le verbe reste à la base : go. La marque du passé est déjà portée par didn't.",
    E("After didn't, the verb stays in the base form: go. The past is already marked by didn't.")),
  tx(FIX, 'Did he finished the analysis?', ['Did he finish the analysis?'], "A-t-il terminé l'analyse ?",
    'Après Did, le verbe reste à la base : finish. Le passé est déjà porté par Did.',
    E('After Did, the verb stays in the base form: finish. The past is already marked by Did.')),
  tx(FIX, 'They was late for the seminar.', ['They were late for the seminar.'], 'Ils étaient en retard au séminaire.',
    'Avec they, be prend la forme were. Jamais they was.',
    E('With they, be takes the form were. Never they was.')),
  tx(FIX, 'I writed three reports last week.', ['I wrote three reports last week.'], "J'ai écrit trois rapports la semaine dernière.",
    'write est irrégulier : le prétérit est wrote, pas writed.',
    E('write is irregular: the past form is wrote, not writed.')),
  tx(FIX, "He didn't showed up at the meeting.", ["He didn't show up at the meeting.", 'He did not show up at the meeting.'], "Il ne s'est pas présenté à la réunion.",
    "Après didn't, le verbe reste à la base : show up. Pas de -ed.",
    E("After didn't, the verb stays in the base form: show up. No -ed.")),
  tr("Elle a quitté l'entreprise il y a six mois.", ['She left the company six months ago.'],
    'Passé révolu avec ago : prétérit. leave est irrégulier : left. ago se place après la durée.',
    E('Finished past with ago: past simple. leave is irregular: left. ago comes after the length of time.')),
  tr("Pourquoi n'as-tu pas envoyé le rapport ?", ["Why didn't you send the report?", 'Why did you not send the report?'],
    "Mot interrogatif + didn't + sujet + base verbale. send reste à la base.",
    E("Question word + didn't + subject + base form. send stays in the base form.")),
  tr('Le directeur a pris une décision difficile hier.', ['The director made a difficult decision yesterday.'],
    'En anglais, on make a decision (et non take). make est irrégulier : made.',
    E('In English you make a decision (not take). make is irregular: made.')),
  tr("Nous n'avons pas compris les consignes.", ["We didn't understand the guidelines.", 'We did not understand the guidelines.', "We didn't understand the instructions."],
    "didn't + base verbale : understand reste à la base.",
    E("didn't + base form: understand stays in the base form.")),
  tr("À quelle heure la panne s'est-elle produite ?", ['What time did the breakdown occur?', 'What time did the breakdown happen?', 'What time did the failure occur?'],
    'What time + did + sujet + base verbale. occur et happen sont tous deux corrects.',
    E('What time + did + subject + base form. Both occur and happen are correct.'))
];

const nivD = [
  c('Last year, the company ___ (face) serious challenges. The CEO ___ (decide) to restructure the team and ___ (hire) twenty new engineers.',
    ['faced', 'decided', 'hired'], "L'an dernier, l'entreprise a affronté de sérieuses difficultés. Le PDG a décidé de restructurer l'équipe et d'embaucher vingt nouveaux ingénieurs.",
    'Trois actions terminées dans un récit passé : trois verbes réguliers au prétérit, faced, decided, hired.', null,
    E('Three finished actions in a story about the past: three regular verbs in the past simple, faced, decided, hired.')),
  c('Two of them ___ (come) from MIT and ___ (bring) innovative ideas that ___ (transform) our approach to product development.',
    ['came', 'brought', 'transformed'], "Deux d'entre eux venaient du MIT et ont apporté des idées innovantes qui ont transformé notre approche du développement produit.",
    'come (came) et bring (brought) sont irréguliers ; transform est régulier : transformed.', null,
    E('come (came) and bring (brought) are irregular; transform is regular: transformed.')),
  c('We ___ (not / achieve) all our targets, but overall the project ___ (be) a success.',
    [["didn't achieve", 'did not achieve'], 'was'], "Nous n'avons pas atteint tous nos objectifs, mais dans l'ensemble le projet a été une réussite.",
    "Négation : didn't + base verbale. be n'utilise pas did : sujet the project (singulier), donc was.", null,
    E("Negative: didn't + base form. be does not use did: the project is singular, so was.")),
  c('The new system ___ (cut) energy consumption by 30%, which ___ (impress) our investors.',
    ['cut', 'impressed'], "Le nouveau système a réduit la consommation d'énergie de 30 %, ce qui a impressionné nos investisseurs.",
    "cut est irrégulier et ne change pas au prétérit : cut, cut, cut. impress est régulier : impressed.", null,
    E('cut is irregular and does not change in the past: cut, cut, cut. impress is regular: impressed.')),
  c('They ___ (give) us a second round of funding and ___ (allow) us to continue our research.',
    ['gave', 'allowed'], 'Ils nous ont accordé un deuxième tour de financement et nous ont permis de poursuivre nos recherches.',
    'give est irrégulier : gave. allow est régulier : allowed.', null,
    E('give is irregular: gave. allow is regular: allowed.')),
  tx('Réécris la phrase au prétérit en la commençant par Last week.', 'She usually submits her report on Friday.', ['Last week, she submitted her report on Friday.'],
    'La semaine dernière, elle a rendu son rapport vendredi.',
    "Last week place l'action dans un passé révolu : submits devient submitted (avec doublement du t).",
    E('Last week puts the action in finished past time: submits becomes submitted (with the t doubled).', null, { instr: 'Rewrite the sentence in the past simple, starting with Last week.' })),
  tx('Réécris la phrase au prétérit en la commençant par Yesterday.', "He doesn't understand the process.", ["Yesterday, he didn't understand the process.", 'Yesterday, he did not understand the process.'],
    "Hier, il n'a pas compris le processus.",
    "doesn't devient didn't : la négation du prétérit est la même pour toutes les personnes. understand reste à la base.",
    E("doesn't becomes didn't: the negative of the past simple is the same for every person. understand stays in the base form.", null, { instr: 'Rewrite the sentence in the past simple, starting with Yesterday.' })),
  tx('Réécris la phrase au prétérit en la commençant par Six months ago.', 'They are developing a new algorithm.', ['Six months ago, they developed a new algorithm.'],
    'Il y a six mois, ils ont développé un nouvel algorithme.',
    'are developing (présent continu) devient developed, prétérit régulier. Six months ago marque un passé révolu.',
    E('are developing (present continuous) becomes the past simple: developed. Six months ago is finished past time.', null, { instr: 'Rewrite the sentence in the past simple, starting with Six months ago.' })),
  tx('Réécris la phrase au prétérit. Début imposé : The last time we updated it,', 'The software crashes every time we update it.', ['The last time we updated it, the software crashed.'],
    'La dernière fois que nous l\'avons mis à jour, le logiciel a planté.',
    'crashes devient crashed. Le début imposé contient déjà updated, au prétérit.',
    E('crashes becomes crashed. The given beginning already contains updated, in the past.', null, { instr: 'Rewrite the sentence in the past simple. Required beginning: The last time we updated it,' })),
  tx(FRW, "I can't find the relevant data.", ["I couldn't find the relevant data.", 'I could not find the relevant data.'],
    "Je n'ai pas pu trouver les données pertinentes.",
    "can't (négatif de can) devient couldn't au prétérit. can n'a pas de forme en -ed.",
    E("can't (negative of can) becomes couldn't in the past. can has no -ed form.", null, { instr: ENW }))
];

const bonus = [
  op('Correct ou incorrect ? Pourquoi ?', 'Did she was happy with the result?',
    ["Incorrect. Avec be, on n'emploie pas did : la question se forme par inversion. Was she happy with the result?"],
    "Pense à la règle de be : pas de did.",
    E(null, 'Think about the rule for be: no did.', { instr: 'Correct or incorrect? Why?', m: ['Incorrect. With be, do not use did: the question is formed by inversion. Was she happy with the result?'] })),
  op('Quelle question se forme sans did ?', 'Who wrote the report? / What did she write?',
    ["Who wrote the report? se forme sans did, car who est le sujet de la phrase. What did she write? porte sur l'objet : on utilise did et la base verbale."],
    'Demande-toi si le mot interrogatif est le sujet ou le complément.',
    E(null, 'Ask yourself whether the question word is the subject or the object.', { instr: 'Which question is formed without did?', m: ['Who wrote the report? has no did, because who is the subject of the sentence. What did she write? asks about the object: it uses did and the base form.'] })),
  op('Comment distingue-t-on read (base verbale) et read (prétérit) ?', 'I read the manual yesterday.',
    ["À l'écrit, les deux formes sont identiques : seul le contexte (ici yesterday) indique le temps. À l'oral, la base verbale se prononce /riːd/ et le prétérit /red/."],
    "L'orthographe ne change pas, mais la prononciation, si.",
    E(null, 'The spelling does not change, but the pronunciation does.', { instr: 'How do you tell read (base form) and read (past) apart?', m: ['In writing the two forms are identical: only the context (here yesterday) shows the tense. In speech, the base form is pronounced /riːd/ and the past form /red/.'] })),
  es('Raconte en cinq phrases minimum un projet ou un événement passé. Utilise au moins 3 verbes irréguliers et 1 négation.',
    "Début possible : Last semester, we had to present our final project. We spent three weeks...",
    ["Last semester, we had to present our final project. We spent three weeks building a small solar charger. On the first day, we did not know how to start, so we asked our tutor for advice. We wrote a plan, we bought the components and we tested the prototype twice. In the end, we got a good mark and we felt proud."],
    "Vérifie : verbes irréguliers corrects, didn't + base verbale, was et were bien choisis.",
    E(null, "Check: irregular verbs are correct, didn't + base form, was and were chosen properly.", {
      instr: 'Write at least five sentences about a past project or event. Use at least 3 irregular verbs and 1 negative sentence.',
      s: 'A possible start: Last semester, we had to present our final project. We spent three weeks...' }))
];

const devoir = [
  c('She ___ (not / come) to the lab session last Thursday.', ["didn't come"], "Elle n'est pas venue à la séance de laboratoire jeudi dernier.",
    "last Thursday : passé révolu. Négation : didn't + base verbale, donc come.", null,
    E("last Thursday is finished past time. Negative: didn't + base form, so come.")),
  c('He ___ (find) the solution after three failed attempts.', ['found'], 'Il a trouvé la solution après trois tentatives infructueuses.',
    'find est irrégulier : found.', null, E('find is irregular: found.')),
  c('___ they ___ (understand) the safety instructions?', ['Did', 'understand'], 'Ont-ils compris les consignes de sécurité ?',
    'Did + sujet + base verbale.', null, E('Did + subject + base form.')),
  c('The team ___ (work) late every evening last week.', ['worked'], "L'équipe a travaillé tard chaque soir la semaine dernière.",
    'last week : passé révolu, même avec every evening. Habitude passée limitée : prétérit. work est régulier.', null,
    E('last week is finished past time, even with every evening. Limited past habit: past simple. work is regular.')),
  c('I ___ (not / have) time to proofread the report.', ["didn't have"], "Je n'ai pas eu le temps de relire le rapport.",
    "didn't + base verbale : have reste à la base.", null, E("didn't + base form: have stays as it is.")),
  c('The professor ___ (explain) the theory twice.', ['explained'], 'Le professeur a expliqué la théorie deux fois.',
    'explain est régulier : explained.', null, E('explain is regular: explained.')),
  c('We ___ (not / see) any obvious errors in the code.', ["didn't see"], "Nous n'avons vu aucune erreur évidente dans le code.",
    "didn't + base verbale : see reste à la base.", null, E("didn't + base form: see stays as it is.")),
  c('___ (be) she satisfied with the final results?', ['Was'], 'Était-elle satisfaite des résultats finaux ?',
    'Avec be, la question se forme par inversion : Was she...?', null, E('With be, the question is formed by inversion: Was she...?')),
  c('He ___ (run) several diagnostic tests on the prototype.', ['ran'], 'Il a effectué plusieurs tests de diagnostic sur le prototype.',
    'run est irrégulier : run, ran, run.', null, E('run is irregular: run, ran, run.')),
  c('The machine ___ (break) down during the live demonstration.', ['broke'], 'La machine est tombée en panne pendant la démonstration en direct.',
    'break est irrégulier : break, broke, broken. break down = tomber en panne.', null,
    E('break is irregular: break, broke, broken. To break down means to stop working.')),
  c('She ___ (write) a detailed account of the experiment.', ['wrote'], "Elle a rédigé un compte rendu détaillé de l'expérience.",
    'write est irrégulier : wrote.', null, E('write is irregular: wrote.')),
  c('Why ___ the project ___ (take) so long?', ['did', 'take'], 'Pourquoi le projet a-t-il pris autant de temps ?',
    'Why + did + sujet + base verbale.', null, E('Why + did + subject + base form.')),
  c('I ___ (not / expect) the results to be so accurate.', ["didn't expect"], "Je ne m'attendais pas à des résultats aussi précis.",
    "didn't + base verbale : expect reste à la base.", null, E("didn't + base form: expect stays as it is.")),
  c('They ___ (decide) to use a different approach.', ['decided'], 'Ils ont décidé d\'utiliser une approche différente.',
    'decide se termine par -e : on ajoute -d. decided.', null, E('decide ends in -e: just add -d. decided.')),
  c('The CEO ___ (give) a presentation to the board last Tuesday.', ['gave'], 'Le PDG a fait une présentation au conseil d\'administration mardi dernier.',
    'give est irrégulier : give, gave, given.', null, E('give is irregular: give, gave, given.'))
];

const m2aEx1 = [
  c('The team ___ (meet) the client last Monday.', ['met'], 'L\'équipe a rencontré le client lundi dernier.', 'meet est irrégulier : met.', null, E('meet is irregular: met.')),
  c('She ___ (not / receive) the notification in time.', ["didn't receive"], "Elle n'a pas reçu la notification à temps.", "didn't + base verbale.", null, E("didn't + base form.")),
  c('___ the experiment ___ (succeed)?', ['Did', 'succeed'], "L'expérience a-t-elle réussi ?", 'Did + sujet + base verbale.', null, E('Did + subject + base form.')),
  c('He ___ (spend) six hours reviewing the data.', ['spent'], 'Il a passé six heures à examiner les données.', 'spend est irrégulier : spent.', null, E('spend is irregular: spent.')),
  c('They ___ (build) the prototype before the deadline.', ['built'], 'Ils ont construit le prototype avant la date limite.', 'build est irrégulier : build, built, built.', null, E('build is irregular: build, built, built.'))
];

const m2aEx2 = [
  tx('Mets la phrase à la forme négative.', 'She wrote the report.', ["She didn't write the report.", 'She did not write the report.'], "Elle n'a pas écrit le rapport.",
    "didn't + base verbale : wrote redevient write.", E("didn't + base form: wrote goes back to write.", null, { instr: 'Make the sentence negative.' })),
  tx('Mets la phrase à la forme interrogative.', 'He understood the concept.', ['Did he understand the concept?'], 'A-t-il compris le concept ?',
    'Did + sujet + base verbale : understood redevient understand.', E('Did + subject + base form: understood goes back to understand.', null, { instr: 'Turn the sentence into a question.' })),
  tx('Mets la phrase à la forme négative.', 'They finished on time.', ["They didn't finish on time.", 'They did not finish on time.'], "Ils n'ont pas fini à temps.",
    "didn't + base verbale : finished redevient finish.", E("didn't + base form: finished goes back to finish.", null, { instr: 'Make the sentence negative.' })),
  tx('Mets la phrase à la forme interrogative.', 'The machine broke.', ['Did the machine break?'], 'La machine est-elle tombée en panne ?',
    'Did + sujet + base verbale : broke redevient break.', E('Did + subject + base form: broke goes back to break.', null, { instr: 'Turn the sentence into a question.' })),
  tx('Mets la phrase à la forme négative.', 'I made a mistake.', ["I didn't make a mistake.", 'I did not make a mistake.'], "Je n'ai pas fait d'erreur.",
    "didn't + base verbale : made redevient make.", E("didn't + base form: made goes back to make.", null, { instr: 'Make the sentence negative.' }))
];

const m2b = [
  ch('The results ___ surprising.', ['was', 'were'], 1, 'Les résultats étaient surprenants.', 'results est pluriel : were.', E('results is plural: were.')),
  ch('She ___ not present at the briefing.', ['was', 'were'], 0, "Elle n'était pas présente à la réunion d'information.", 'she est singulier : was.', E('she is singular: was.')),
  ch('___ you satisfied with the outcome?', ['Was', 'Were'], 1, 'Étiez-vous satisfait du résultat ?', 'you prend toujours were, au singulier comme au pluriel.', E('you always takes were, singular or plural.')),
  ch('The equipment ___ already broken when we arrived.', ['was', 'were'], 0, "L'équipement était déjà cassé quand nous sommes arrivés.", 'equipment est indénombrable : singulier, donc was.', E('equipment is uncountable: singular, so was.')),
  ch('Both proposals ___ rejected by the committee.', ['was', 'were'], 1, 'Les deux propositions ont été rejetées par le comité.', 'Both proposals est pluriel : were.', E('Both proposals is plural: were.'))
];

const m2cEx1 = [
  c('While she ___ (present) her results, her laptop ___ (freeze).', ['was presenting', 'froze'], 'Pendant qu\'elle présentait ses résultats, son ordinateur s\'est figé.',
    "While introduit l'action longue : Past Continuous (was presenting). L'action courte qui l'interrompt est au Past Simple : froze.", null,
    E('While introduces the long action: past continuous (was presenting). The short action that interrupts it is in the past simple: froze.')),
  c('The fire alarm ___ (go off) while we ___ (have) lunch.', ['went off', 'were having'], "L'alarme incendie s'est déclenchée pendant que nous déjeunions.",
    "L'alarme est une action brève : Past Simple (went off). Le déjeuner est l'action longue : were having.", null,
    E('The alarm is a short action: past simple (went off). Lunch is the long action: were having.')),
  c('What ___ you ___ (do) at 6 PM yesterday?', ['were', 'doing'], 'Que faisiez-vous hier à 18 h ?',
    'Action en cours à un moment précis du passé : Past Continuous, were + doing.', null,
    E('Action in progress at a precise moment in the past: past continuous, were + doing.')),
  c('He ___ (not / listen) when the manager announced the news.', ["wasn't listening"], "Il n'écoutait pas quand le responsable a annoncé la nouvelle.",
    "announced est l'action brève au prétérit. Le Past Continuous négatif se forme avec wasn't + -ing.", null,
    E("announced is the short action in the past simple. The negative past continuous is wasn't + -ing.")),
  c('While the team ___ (debug) the software, they ___ (find) a second issue.', [['was debugging', 'were debugging'], 'found'], 'Pendant que l\'équipe déboguait le logiciel, elle a trouvé un deuxième problème.',
    "L'action longue est au Past Continuous : was debugging (team vu comme un tout) ou were debugging (team vu comme des personnes). L'action brève est found, au Past Simple.", null,
    E('The long action is in the past continuous: was debugging (team seen as a unit) or were debugging (team seen as people). The short action is found, in the past simple.')),
  c('I ___ (drive) to the office when I ___ (hear) the news on the radio.', ['was driving', 'heard'], 'Je conduisais vers le bureau quand j\'ai entendu la nouvelle à la radio.',
    "when introduit l'action brève (heard, Past Simple). L'action longue est was driving.", null,
    E('when introduces the short action (heard, past simple). The long action is was driving.'))
];

const m2cEx2 = [
  tx('Relie les deux phrases avec while ou when.', 'The technicians were checking the pressure. The tank suddenly leaked.',
    ['While the technicians were checking the pressure, the tank suddenly leaked.', 'The tank suddenly leaked while the technicians were checking the pressure.'],
    'Pendant que les techniciens vérifiaient la pression, le réservoir a soudain fui.',
    'While + action longue (Past Continuous), puis l\'action brève au Past Simple.',
    E('While + the long action (past continuous), then the short action in the past simple.', null, { instr: 'Join the two sentences with while or when.' })),
  tx('Relie les deux phrases avec while ou when.', 'She was reading her emails. Her phone rang.',
    ['She was reading her emails when her phone rang.', 'When her phone rang, she was reading her emails.'],
    'Elle lisait ses e-mails quand son téléphone a sonné.',
    "when introduit l'action brève (rang), l'action longue reste au Past Continuous.",
    E('when introduces the short action (rang); the long action stays in the past continuous.', null, { instr: 'Join the two sentences with while or when.' })),
  tx('Relie les deux phrases avec while ou when.', 'We were setting up the conference room. The speaker arrived early.',
    ['While we were setting up the conference room, the speaker arrived early.', 'The speaker arrived early while we were setting up the conference room.'],
    "Pendant que nous installions la salle de conférence, l'intervenant est arrivé en avance.",
    "While + action longue (were setting up), puis l'action brève (arrived).",
    E('While + the long action (were setting up), then the short action (arrived).', null, { instr: 'Join the two sentences with while or when.' }))
];

const th = [
  tr("L'équipe a rencontré le fournisseur mardi dernier.", ['The team met the supplier last Tuesday.'],
    'Passé révolu : prétérit. meet est irrégulier : met.', E('Finished past: past simple. meet is irregular: met.')),
  tr("Elle n'a pas reçu le colis à temps.", ["She didn't receive the parcel in time.", 'She did not receive the parcel in time.', "She didn't get the parcel in time."],
    "didn't + base verbale. À temps se dit in time.", E("didn't + base form. In time means early enough.")),
  tr('Les conclusions étaient décevantes.', ['The conclusions were disappointing.'],
    'conclusions est pluriel : were. disappointing (décevant) décrit la chose, disappointed la personne.', E('conclusions is plural: were. disappointing describes the thing, disappointed describes the person.')),
  tr('Étiez-vous satisfaits de la réunion ?', ['Were you satisfied with the meeting?', 'Were you happy with the meeting?'],
    'Avec be, la question se forme par inversion : Were you...? satisfied with se construit avec with.', E('With be, the question is formed by inversion: Were you...? satisfied is followed by with.')),
  tr("Pendant qu'elle présentait son projet, le projecteur est tombé en panne.", ['While she was presenting her project, the projector broke down.', 'While she was presenting her project, the projector stopped working.'],
    "While + Past Continuous pour l'action longue, Past Simple pour l'action brève qui l'interrompt.", E('While + past continuous for the long action, past simple for the short action that interrupts it.')),
  tr('Que faisiez-vous à 20 h hier soir ?', ['What were you doing at 8 PM last night?', 'What were you doing at 8 pm yesterday evening?'],
    'Action en cours à un moment précis du passé : Past Continuous, were you doing.', E('Action in progress at a precise moment in the past: past continuous, were you doing.')),
  tr("Je rentrais à la maison quand j'ai vu l'accident.", ['I was driving home when I saw the accident.', 'I was going home when I saw the accident.', 'I was walking home when I saw the accident.'],
    "Action longue (was going home), puis action brève (saw) introduite par when. home s'emploie sans to : go home, drive home.", E('Long action (was going home), then short action (saw) introduced by when. Home takes no to: go home, drive home.'))
];

export const G02 = {
  id: 'G02',
  title: 'Le prétérit simple (Past Simple)',
  coursUrl: 'https://peip2-hub.vercel.app/cours/G02_cours.html',
  sets: [
    set('g02-guidee-a', 'Fiche', 'Série guidée A : affirmatif', 'A2', 'Réguliers et irréguliers. Chaque phrase propose un indice.', guideeA,
      { group: 'Worksheet', title: 'Guided set A: affirmative', desc: 'Regular and irregular verbs. Each sentence comes with a hint.' }),
    set('g02-guidee-b', 'Fiche', 'Série guidée B : négatif et interrogatif', 'A2', 'Didn\'t, did et le cas particulier de be.', guideeB,
      { group: 'Worksheet', title: 'Guided set B: negative and questions', desc: "Didn't, did and the special case of be." }),
    set('g02-niv-a', 'Fiche', 'Niveau A : fondamentaux', 'A2', 'Les formes de base du prétérit.', nivA,
      { group: 'Worksheet', title: 'Level A: the basics', desc: 'The basic forms of the past simple.' }),
    set('g02-niv-b', 'Fiche', 'Niveau B : contexte professionnel', 'B1', 'Les mêmes choix dans des phrases d\'ingénieur.', nivB,
      { group: 'Worksheet', title: 'Level B: professional context', desc: 'The same choices in engineering sentences.' }),
    set('g02-niv-c', 'Fiche', 'Niveau C : corrections et thème', 'B1+', 'Corriger cinq phrases fautives, puis traduire cinq phrases.', nivC,
      { group: 'Worksheet', title: 'Level C: corrections and translation', desc: 'Correct five faulty sentences, then translate five sentences.' }),
    set('g02-niv-d', 'Fiche', 'Niveau D : production complexe', 'B2+', 'Textes à compléter et réécritures.', nivD,
      { group: 'Worksheet', title: 'Level D: longer production', desc: 'Texts to complete and rewrites.' }),
    set('g02-bonus', 'Fiche', 'Bonus : pour aller plus loin', 'B2+', 'Cas particuliers et mini-narration. Écris ta réponse, puis compare-la avec le modèle.', bonus,
      { group: 'Worksheet', title: 'Bonus: going further', desc: 'Special cases and a short narrative. Write your answer, then compare it with the model.' }),
    set('g02-devoir', 'Fiche', 'Devoir maison', 'B1', 'Quinze phrases à conjuguer.', devoir,
      { group: 'Worksheet', title: 'Homework', desc: 'Fifteen sentences to complete.' }),
    set('g02-m2a-1', 'Supplément Murphy', 'Unité 2A : réguliers et irréguliers (1/2)', 'B1', 'Conjugue au Past Simple.', m2aEx1,
      { group: 'Murphy supplement', title: 'Unit 2A: regular and irregular verbs (1/2)', desc: 'Put the verbs in the past simple.' }),
    set('g02-m2a-2', 'Supplément Murphy', 'Unité 2A : transformer les phrases (2/2)', 'B1', 'Passe à la forme indiquée.', m2aEx2,
      { group: 'Murphy supplement', title: 'Unit 2A: transform the sentences (2/2)', desc: 'Change the sentences to the form asked.' }),
    set('g02-m2b', 'Supplément Murphy', 'Unité 2B : was ou were', 'B1', 'Choisis la forme correcte de be.', m2b,
      { group: 'Murphy supplement', title: 'Unit 2B: was or were', desc: 'Choose the correct form of be.' }),
    set('g02-m2c-1', 'Supplément Murphy', 'Unité 2C : Past Continuous (1/2)', 'B1+', 'Past Simple ou Past Continuous ?', m2cEx1,
      { group: 'Murphy supplement', title: 'Unit 2C: past continuous (1/2)', desc: 'Past simple or past continuous?' }),
    set('g02-m2c-2', 'Supplément Murphy', 'Unité 2C : relier avec while ou when (2/2)', 'B1+', 'Combine les deux phrases.', m2cEx2,
      { group: 'Murphy supplement', title: 'Unit 2C: joining with while or when (2/2)', desc: 'Combine the two sentences.' }),
    set('g02-th', 'Supplément Murphy', 'Unité TH : thème grammatical', 'B1+', 'Traduis en anglais, puis compare avec le modèle.', th,
      { group: 'Murphy supplement', title: 'Unit TH: translation', desc: 'Translate into English, then compare with the model.' })
  ],
  recap: {
    blocks: [
      {
        title: 'Past Simple',
        forms: [
          ['Réguliers', 'work, worked / stop, stopped / study, studied'],
          ['Irréguliers', 'go, went / have, had / write, wrote (à apprendre)'],
          ['Négatif', "I didn't work. He didn't work. (didn't + base verbale)"],
          ['Question', 'Did you work? Did he work? (Did + sujet + base verbale)']
        ],
        uses: ['Action ponctuelle passée : She left the office at 5 PM.', 'Succession d\'actions : He woke up, had breakfast and left.', 'Habitude passée révolue : We visited France every summer as children.', 'État passé : The factory was very small in 1950.'],
        marks: 'yesterday, last week, last year, in 2010, ago, when I was young, once, at that time'
      },
      {
        title: 'Be au prétérit',
        forms: [
          ['Affirmatif', 'I / he / she / it was. You / we / they were.'],
          ['Négatif', "I wasn't. You weren't."],
          ['Question', 'Was he? Were they? (inversion directe, pas de did)']
        ],
        uses: ['Past Continuous (supplément Murphy) : was ou were + verbe en -ing.', 'Action longue interrompue par une action brève : While she was working, the phone rang.']
      }
    ],
    tables: [{
      title: 'Orthographe des verbes réguliers',
      rows: [['Règle générale', 'work, worked'], ['Verbe en -e', 'like, liked'], ['Consonne + y', 'study, studied'], ['Consonne, voyelle, consonne (CVC) court', 'stop, stopped'], ['Fin en -w, -x, -y : pas de doublement', 'play, played / fix, fixed']]
    }],
    notes: ["Piège : après did ou didn't, le verbe reste à la base verbale (Did he finish ? et non Did he finished ?)."],
    rule: 'Si tu peux dire hier ou donner une date ou une heure précise, utilise le prétérit. Le passé, c\'est révolu.'
  },
  enMeta: {
    title: 'The Past Simple',
    recap: {
      blocks: [
        {
          title: 'Past Simple',
          forms: [
            ['Regular verbs', 'work, worked / stop, stopped / study, studied'],
            ['Irregular verbs', 'go, went / have, had / write, wrote (to be learnt)'],
            ['Negative', "I didn't work. He didn't work. (didn't + base form)"],
            ['Question', 'Did you work? Did he work? (Did + subject + base form)']
          ],
          uses: ['A single finished action: She left the office at 5 PM.', 'A series of actions: He woke up, had breakfast and left.', 'A finished past habit: We visited France every summer as children.', 'A past state: The factory was very small in 1950.'],
          marks: 'yesterday, last week, last year, in 2010, ago, when I was young, once, at that time'
        },
        {
          title: 'Be in the past',
          forms: [
            ['Affirmative', 'I / he / she / it was. You / we / they were.'],
            ['Negative', "I wasn't. You weren't."],
            ['Question', 'Was he? Were they? (direct inversion, no did)']
          ],
          uses: ['Past continuous (Murphy supplement): was or were + verb in -ing.', 'A long action interrupted by a short one: While she was working, the phone rang.']
        }
      ],
      tables: [{
        title: 'Spelling of regular verbs',
        rows: [['General rule', 'work, worked'], ['Verb ending in -e', 'like, liked'], ['Consonant + y', 'study, studied'], ['Short consonant, vowel, consonant (CVC)', 'stop, stopped'], ['Ending in -w, -x, -y: no doubling', 'play, played / fix, fixed']]
      }],
      notes: ['Trap: after did or didn\'t, the verb stays in the base form (Did he finish? not Did he finished?).'],
      rule: 'If you can say yesterday or give a precise date or time, use the past simple. The past is finished.'
    }
  }
};
