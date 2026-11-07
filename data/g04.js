// G04 : All Tenses (révision de tous les temps)
// Contenu reconstruit à partir de la fiche élève, du supplément Murphy et du devoir maison.
// Le texte anglais (règles, indices, consignes) est écrit à côté du texte français avec E(...).
import { E, c, tx, okc, tr, op, FIX, set } from './dsl.js';

const guideeA = [
  c('At 3 PM yesterday, she ___ (work) on her project.', ['was working'], 'Hier à 15 h, elle travaillait sur son projet.',
    "Une heure précise dans le passé + une action en cours à ce moment : Past Continuous (was working).", "heure précise + action en cours",
    E('A precise time in the past + an action in progress at that moment: past continuous (was working).', 'precise time + action in progress')),
  c('By the time we arrived, he ___ (already / leave).', ['had already left'], 'Quand nous sommes arrivés, il était déjà parti.',
    "By the time + passé : l'action est antérieure à un autre moment du passé. Past Perfect : had already left.", 'avant un autre moment du passé',
    E('By the time + past: the action happened before another moment in the past. Past perfect: had already left.', 'before another moment in the past')),
  c('I ___ (call) you when I get home.', [['will call', 'am going to call']], "Je t'appellerai quand je rentrerai.",
    "Après when, on emploie le présent pour parler du futur (when I get home). La proposition principale exprime une promesse : will call.", 'when + présent, donc futur dans la principale',
    E('After when, the present is used to talk about the future (when I get home). The main clause expresses a promise: will call.', 'when + present, so future in the main clause')),
  c('Look at those clouds, it ___ (rain).', ['is going to rain'], 'Regarde ces nuages, il va pleuvoir.',
    'Une preuve visible dans le présent (les nuages) : be going to.', 'preuve visible',
    E('Visible evidence in the present (the clouds): be going to.', 'visible evidence')),
  c('She ___ (study) here since she was 18.', [['has studied', 'has been studying']], 'Elle étudie ici depuis ses 18 ans.',
    "since + point de départ, situation qui continue jusqu'à maintenant : Present Perfect.", 'since = depuis',
    E('since + starting point, situation that continues until now: present perfect.', 'since means depuis')),
  c('While I ___ (read), the alarm ___ (go off).', ['was reading', 'went off'], "Pendant que je lisais, l'alarme s'est déclenchée.",
    "While introduit l'action longue (Past Continuous), l'action brève qui l'interrompt est au Past Simple.", 'action longue puis action brève',
    E('While introduces the long action (past continuous); the short action that interrupts it is in the past simple.', 'long action, then short action')),
  c('He ___ (not / finish) the report by next Friday, because he is so slow.', ["won't have finished"], 'Il n\'aura pas terminé le rapport d\'ici vendredi prochain, car il est trop lent.',
    "by + moment futur : action terminée avant ce moment, c'est le Future Perfect. Négatif : won't have finished.", 'terminé avant un moment futur',
    E("by + future time: an action completed before that moment is the future perfect. Negative: won't have finished.", 'finished before a future moment')),
  c('By 2030, renewable energy ___ (replace) most fossil fuels.', ['will have replaced'], "D'ici 2030, les énergies renouvelables auront remplacé la plupart des combustibles fossiles.",
    "By + date future : Future Perfect (will have + participe passé).", 'terminé avant une date future',
    E('By + future date: future perfect (will have + past participle).', 'finished before a future date')),
  c('At noon tomorrow, she ___ (work) in the lab, so call her later.', ['will be working'], 'Demain à midi, elle travaillera au laboratoire, donc rappelle plus tard.',
    "Une action en cours à un moment précis du futur : Future Continuous (will be working).", 'en cours à un moment futur',
    E('An action in progress at a precise moment in the future: future continuous (will be working).', 'in progress at a future moment')),
  c("I ___ (never / be) to Japan, but it's on my list!", ['have never been'], "Je ne suis jamais allé au Japon, mais c'est sur ma liste !",
    "Expérience de vie jusqu'à maintenant : Present Perfect. be devient been.", 'expérience de vie',
    E('Life experience up to now: present perfect. be becomes been.', 'life experience'))
];

const guideeB = [
  c('She was exhausted because she ___ (work) for 12 hours straight.', ['had been working'], 'Elle était épuisée parce qu\'elle travaillait depuis douze heures d\'affilée.',
    "Une durée qui précède un moment du passé (was exhausted) : Past Perfect Continuous, had been + -ing.", 'durée avant un moment passé',
    E('A duration that comes before a moment in the past (was exhausted): past perfect continuous, had been + -ing.', 'duration before a past moment')),
  c('By the time the results come, we ___ (wait) for six months.', ['will have been waiting'], 'Quand les résultats arriveront, nous attendrons depuis six mois.',
    "Une durée qui aura été atteinte à un moment futur : Future Perfect Continuous, will have been + -ing.", 'durée jusqu\'à un moment futur',
    E('A duration that will have been reached at a future moment: future perfect continuous, will have been + -ing.', 'duration up to a future moment')),
  c('When I arrived at the lab, he ___ (just / leave).', ['had just left'], 'Quand je suis arrivé au laboratoire, il venait de partir.',
    "Une action juste avant un moment du passé : Past Perfect, had just left.", 'juste avant un moment passé',
    E('An action just before a moment in the past: past perfect, had just left.', 'just before a past moment')),
  c('The engineer ___ (test) the prototype at the moment, so call back later.', ['is testing'], "L'ingénieur teste le prototype en ce moment, donc rappelez plus tard.",
    'at the moment : action en cours maintenant, Present Continuous.', 'en ce moment',
    E('at the moment: action in progress now, present continuous.', 'right now')),
  c('She ___ (present) her thesis this time next week.', ['will be presenting'], 'Elle présentera sa thèse à cette heure-ci la semaine prochaine.',
    'this time next week : action en cours à un moment précis du futur, Future Continuous.', 'en cours à un moment futur',
    E('this time next week: action in progress at a precise future moment, future continuous.', 'in progress at a future moment')),
  c('I ___ (study) all evening, so I need a break.', ['have been studying'], "Je révise depuis ce soir, donc j'ai besoin d'une pause.",
    "Durée jusqu'à maintenant avec un résultat présent (la fatigue) : Present Perfect Continuous.", 'durée jusqu\'à maintenant',
    E('Duration up to now with a present result (tiredness): present perfect continuous.', 'duration up to now')),
  c('He ___ (live) in Lyon before he moved to Lille in 2020.', [['had lived', 'had been living', 'lived']], 'Il vivait à Lyon avant de déménager à Lille en 2020.',
    "Le Past Perfect (had lived) montre clairement que cette période précède le déménagement. Le Past Simple est aussi possible, car before indique déjà l'ordre.", 'avant un autre moment du passé',
    E('The past perfect (had lived) clearly shows that this period came before the move. The past simple is also possible, because before already shows the order.', 'before another past moment')),
  c('The company ___ (launch) the product next spring. (plan décidé)', [['is going to launch', 'is launching']], "L'entreprise lancera le produit au printemps prochain.",
    "Un plan déjà décidé : be going to ou le Present Continuous.", 'plan décidé',
    E('A plan that has already been decided: be going to or the present continuous.', 'decided plan',
      { s: 'The company ___ (launch) the product next spring. (decided plan)' })),
  c('Every time I ___ (see) him, he ___ (complain) about the same things.', ['see', 'complains'], 'Chaque fois que je le vois, il se plaint des mêmes choses.',
    'every time décrit une habitude : Present Simple dans les deux propositions. À la 3e personne, complain prend -s.', 'habitude',
    E('every time describes a habit: present simple in both clauses. In the third person, complain takes -s.', 'habit')),
  c('By the end of this course, you ___ (master) all the key grammar points.', ['will have mastered'], "À la fin de ce cours, vous maîtriserez tous les points de grammaire essentiels.",
    "By the end of + période future : Future Perfect, will have mastered.", 'terminé avant la fin de la période',
    E('By the end of + future period: future perfect, will have mastered.', 'finished before the end of the period'))
];

const nivA = [
  c('She ___ (just / arrive) at the office.', ['has just arrived'], 'Elle vient d\'arriver au bureau.', 'just : Present Perfect. has + just + participe passé.', null, E('just: present perfect. has + just + past participle.')),
  c('He ___ (work) here since 2018.', [['has worked', 'has been working']], 'Il travaille ici depuis 2018.', "since + point de départ : Present Perfect.", null, E('since + starting point: present perfect.')),
  c('I ___ (call) you back in an hour.', [['will call', 'am going to call']], "Je te rappellerai dans une heure.", "Promesse faite au moment de parler : will.", null, E('A promise made at the moment of speaking: will.')),
  c('They ___ (finish) the project when we arrived.', ['had finished'], 'Ils avaient terminé le projet quand nous sommes arrivés.', "Action antérieure à un autre moment du passé (we arrived) : Past Perfect.", null, E('Action before another moment in the past (we arrived): past perfect.')),
  c('What ___ you ___ (do) at 8 PM yesterday?', ['were', 'doing'], 'Que faisiez-vous hier à 20 h ?', 'Heure précise dans le passé, action en cours : Past Continuous.', null, E('Precise time in the past, action in progress: past continuous.')),
  c('By the time she graduated, she ___ (study) for five years.', [['had studied', 'had been studying']], "Quand elle a obtenu son diplôme, elle étudiait depuis cinq ans.", "By the time + passé et une durée : Past Perfect (ou Past Perfect Continuous).", null, E('By the time + past and a length of time: past perfect (or past perfect continuous).')),
  c('Look, he ___ (run) to catch the bus!', ['is running'], 'Regarde, il court pour attraper le bus !', 'Look! signale une action en cours : Present Continuous.', null, E('Look! signals an action in progress: present continuous.')),
  c('The factory ___ (produce) 10,000 units every week.', ['produces'], "L'usine produit 10 000 unités chaque semaine.", 'every week : habitude, Present Simple.', null, E('every week: habit, present simple.')),
  c('I ___ (not / see) that film yet.', ["haven't seen"], "Je n'ai pas encore vu ce film.", 'yet : Present Perfect négatif.', null, E('yet: negative present perfect.')),
  c('She ___ (probably / win) the competition.', ['will probably win'], 'Elle va probablement gagner le concours.', 'Prédiction avec probably : will. probably se place entre will et le verbe.', null, E('Prediction with probably: will. probably goes between will and the verb.'))
];

const nivB = [
  c('While they ___ (present) the findings, the director ___ (leave) the room.', ['were presenting', 'left'], 'Pendant qu\'ils présentaient les résultats, le directeur a quitté la salle.', "While + action longue (Past Continuous), puis action brève (Past Simple).", null, E('While + long action (past continuous), then short action (past simple).')),
  c('He ___ (not / know) the answer when the professor asked him last week.', ["didn't know"], "Il ne connaissait pas la réponse quand le professeur le lui a demandé la semaine dernière.", "last week : passé révolu, Past Simple. know est un verbe d'état.", null, E('last week: finished past, past simple. know is a stative verb.')),
  c('By next month, we ___ (complete) the environmental impact analysis.', ['will have completed'], "D'ici le mois prochain, nous aurons terminé l'analyse d'impact environnemental.", 'By + moment futur : Future Perfect.', null, E('By + future moment: future perfect.')),
  c('She ___ (already / submit) three technical reports this week.', ['has already submitted'], 'Elle a déjà remis trois rapports techniques cette semaine.', "this week (période non terminée) et already : Present Perfect. submit double son t.", null, E('this week (period not finished) and already: present perfect. submit doubles its t.')),
  c('I ___ (study) engineering for ten years, so I consider myself experienced.', [['have studied', 'have been studying']], "J'étudie l'ingénierie depuis dix ans, donc je me considère comme expérimenté.", "for + durée, situation qui continue : Present Perfect.", null, E('for + a length of time, situation that continues: present perfect.')),
  c('She ___ (meet) the board of directors tomorrow at 9 AM. (plan)', [['is meeting', 'is going to meet']], 'Elle rencontre le conseil d\'administration demain à 9 h.', 'Rendez-vous arrangé avec une heure précise : Present Continuous (ou be going to).', null, E('Arranged meeting with a precise time: present continuous (or be going to).', null, { s: 'She ___ (meet) the board of directors tomorrow at 9 AM. (arrangement)' })),
  c('He ___ (travel) to five different countries for work so far this year.', [['has travelled', 'has traveled']], "Il s'est rendu dans cinq pays différents pour son travail depuis le début de l'année.", "so far this year : période non terminée, Present Perfect. travelled (britannique) et traveled (américain) sont acceptés.", null, E('so far this year: period not finished, present perfect. travelled (British) and traveled (American) are both accepted.')),
  c('The machine ___ (break) down while we ___ (use) it for the demo.', ['broke', 'were using'], 'La machine est tombée en panne pendant que nous l\'utilisions pour la démonstration.', "Action brève (broke) pendant une action longue (were using).", null, E('Short action (broke) during a long action (were using).')),
  c('I ___ (not / receive) the email you mentioned, so can you resend it?', ["haven't received"], "Je n'ai pas reçu l'e-mail dont vous parliez, pouvez-vous le renvoyer ?", "Pas de moment précis et un résultat présent (je ne l'ai pas) : Present Perfect.", null, E('No precise time and a present result (I do not have it): present perfect.')),
  c('What time ___ the international conference ___ (start) next Tuesday?', ['does', 'start'], 'À quelle heure commence la conférence internationale mardi prochain ?', "Un horaire officiel se met au Present Simple : What time does it start ?", null, E('An official timetable takes the present simple: What time does it start?'))
];

const nivC = [
  tx(FIX, 'She has been living here since three years.', ['She has been living here for three years.', 'She has lived here for three years.'], 'Elle vit ici depuis trois ans.', 'Trois ans est une durée : for, pas since.', E('Three years is a length of time: for, not since.')),
  tx(FIX, 'By the time he arrived, she already left.', ['By the time he arrived, she had already left.'], 'Quand il est arrivé, elle était déjà partie.', 'Avant un autre moment du passé : Past Perfect (had already left).', E('Before another moment in the past: past perfect (had already left).')),
  tx(FIX, 'I will call you when I will arrive.', ['I will call you when I arrive.'], 'Je t\'appellerai quand j\'arriverai.', 'Après when, on emploie le présent pour le futur : when I arrive, pas when I will arrive.', E('After when, the present is used for the future: when I arrive, not when I will arrive.')),
  tx(FIX, 'He is working here since 2015.', ['He has been working here since 2015.', 'He has worked here since 2015.'], 'Il travaille ici depuis 2015.', 'since impose le Present Perfect, pas le présent continu.', E('since requires the present perfect, not the present continuous.')),
  tx(FIX, 'She will has finished the report by Friday.', ['She will have finished the report by Friday.'], 'Elle aura terminé le rapport d\'ici vendredi.', "Après will, le verbe est à la base verbale : will have + participe passé.", E('After will, the verb is in the base form: will have + past participle.')),
  tr("Il travaillait dans le laboratoire quand l'alarme a sonné.", ['He was working in the lab when the alarm went off.', 'He was working in the laboratory when the alarm went off.'], "Action longue (Past Continuous) interrompue par une action brève (Past Simple).", E('Long action (past continuous) interrupted by a short action (past simple).')),
  tr('Nous venons de recevoir les résultats des tests : ils sont excellents.', ['We have just received the test results: they are excellent.', "We've just received the test results. They are excellent."], 'venir de se traduit par have just + participe passé.', E('venir de is translated by have just + past participle.')),
  tr('Elle aura terminé son rapport avant la fin de la semaine.', ['She will have finished her report before the end of the week.', 'She will have finished her report by the end of the week.'], 'Terminé avant un moment futur : Future Perfect.', E('Finished before a future moment: future perfect.')),
  tr('À cette heure-ci demain, je serai en train de présenter devant le jury.', ['This time tomorrow, I will be presenting to the jury.', 'This time tomorrow, I will be presenting in front of the jury.', 'At this time tomorrow, I will be presenting to the jury.'], "Action en cours à un moment précis du futur : Future Continuous.", E('Action in progress at a precise future moment: future continuous.')),
  tr("Ça fait trois heures qu'il cherche une solution.", ['He has been looking for a solution for three hours.', 'He has been searching for a solution for three hours.'], "Durée d'une action qui continue : Present Perfect Continuous, avec for + durée.", E('Duration of an action that continues: present perfect continuous, with for + duration.'))
];

const nivD = [
  c('Last year, our team ___ (face) an unexpected challenge. The main algorithm ___ (not / function) correctly, and we ___ (spend) weeks trying to fix it.',
    ['faced', ["wasn't functioning", "didn't function"], 'spent'], "L'an dernier, notre équipe a fait face à un défi inattendu. L'algorithme principal ne fonctionnait pas correctement, et nous avons passé des semaines à essayer de le réparer.",
    "Récit au passé : faced et spent au Past Simple. Pour décrire la situation de fond, wasn't functioning (Past Continuous) est le plus naturel, didn't function est aussi accepté.", null,
    E("A story in the past: faced and spent in the past simple. To describe the background situation, wasn't functioning (past continuous) is the most natural; didn't function is also accepted.")),
  c('By the time we ___ (realise) the problem, we ___ (lose) three months of work.', [['realised', 'realized'], 'had lost'], "Quand nous avons compris le problème, nous avions déjà perdu trois mois de travail.",
    "By the time + Past Simple, et la perte est antérieure : Past Perfect (had lost). realise (britannique) et realize (américain) sont acceptés.", null,
    E('By the time + past simple, and the loss came earlier: past perfect (had lost). realise (British) and realize (American) are both accepted.')),
  c('Fortunately, a junior engineer ___ (find) the bug. She ___ (work) on the problem for 48 hours when she ___ (spot) a critical error in the base code.',
    ['found', 'had been working', 'spotted'], "Heureusement, une ingénieure débutante a trouvé le bogue. Elle travaillait sur le problème depuis 48 heures quand elle a repéré une erreur critique dans le code de base.",
    "found et spotted sont des actions terminées (Past Simple). La durée de 48 heures avant ce moment du passé demande le Past Perfect Continuous : had been working.", null,
    E('found and spotted are finished actions (past simple). The 48 hours before that past moment call for the past perfect continuous: had been working.')),
  c('Since then, we ___ (implement) stricter code review protocols. By the end of this year, we ___ (test) all existing systems using the new process.',
    [['have implemented', 'have been implementing'], 'will have tested'], "Depuis, nous avons mis en place des protocoles de revue de code plus stricts. D'ici la fin de l'année, nous aurons testé tous les systèmes existants avec le nouveau processus.",
    "Since then : Present Perfect. By the end of this year : Future Perfect (will have tested).", null,
    E('Since then: present perfect. By the end of this year: future perfect (will have tested).')),
  c('Looking ahead, the company ___ (invest) in automated testing tools next quarter, and it ___ (be) a significant improvement.',
    [['will invest', 'is going to invest', 'is investing'], 'will be'], "Pour l'avenir, l'entreprise investira dans des outils de test automatisés le trimestre prochain, et ce sera une amélioration importante.",
    "Un projet pour le trimestre prochain : will, be going to ou le Present Continuous conviennent. La prédiction it will be (une opinion sur l'avenir) prend will.", null,
    E('A plan for next quarter: will, be going to or the present continuous all work. The prediction it will be (an opinion about the future) takes will.'))
];

const bonus = [
  op('Correct ou faux ? Corrige si nécessaire.', 'She has gone to Paris in 2019.',
    ["Faux. 2019 est une date précise : on emploie le Past Simple. She went to Paris in 2019."],
    'Cherche une date précise.',
    E(null, 'Look for a precise date.', { instr: 'Right or wrong? Correct it if necessary.', m: ['Wrong. 2019 is a precise date, so the past simple is needed: She went to Paris in 2019.'] })),
  op('Le Past Simple est-il possible ici ? Quelle différence ?', 'I was living in Lyon when I was a student.',
    ["Oui : I lived in Lyon when I was a student. Le Past Simple présente un fait passé. Le Past Continuous (I was living) insiste sur la durée et le contexte de la situation."],
    'Fait ou contexte ?',
    E(null, 'Fact or background?', { instr: 'Could the past simple be used here? What is the difference?', m: ['Yes: I lived in Lyon when I was a student. The past simple presents a fact in the past. The past continuous (I was living) stresses the duration and the background of the situation.'] })),
  op('Quelle formulation plus précise proposes-tu ?', 'By next Friday, she will finish the project.',
    ["By next Friday, she will have finished the project. Le Future Perfect marque l'action comme terminée avant ce moment."],
    'Terminé avant quel moment ?',
    E(null, 'Finished before which moment?', { instr: 'What more precise wording would you suggest?', m: ['By next Friday, she will have finished the project. The future perfect shows the action as completed before that moment.'] })),
  op('Y a-t-il une erreur ? Donne la version correcte.', 'He has been working here since five years.',
    ["Faux. since s'emploie avec un point de départ, pas avec une durée : He has been working here for five years."],
    'Cinq ans : durée ou point de départ ?',
    E(null, 'Five years: a length of time or a starting point?', { instr: 'Is there an error? Give the correct version.', m: ['Wrong. since is used with a starting point, not with a length of time: He has been working here for five years.'] }))
];

const devoir = [
  c('By 9 AM tomorrow, she ___ (already / send) all the reports.', ['will have already sent'], 'D\'ici 9 h demain, elle aura déjà envoyé tous les rapports.', 'By + moment futur : Future Perfect.', null, E('By + future moment: future perfect.')),
  c('He ___ (work) on the prototype when the lights went out.', ['was working'], "Il travaillait sur le prototype quand la lumière s'est éteinte.", "Action longue interrompue par une action brève (went out) : Past Continuous.", null, E('Long action interrupted by a short action (went out): past continuous.')),
  c('I ___ (not / see) him since last Monday.', ["haven't seen"], "Je ne l'ai pas vu depuis lundi dernier.", "since + point de départ : Present Perfect.", null, E('since + starting point: present perfect.')),
  c('Look at that sky, it ___ (snow) later today.', ['is going to snow'], 'Regarde ce ciel, il va neiger plus tard aujourd\'hui.', 'Preuve visible : be going to.', null, E('Visible evidence: be going to.')),
  c('I promise that we ___ (submit) the final report before the deadline tomorrow.', [['will submit', 'will have submitted']], "Je promets que nous remettrons le rapport final avant la date limite demain.", "Promesse : will. Le Future Perfect (will have submitted) est aussi possible avec before.", null, E('Promise: will. The future perfect (will have submitted) is also possible with before.')),
  c('She ___ (study) engineering since she enrolled three years ago.', [['has studied', 'has been studying']], "Elle étudie l'ingénierie depuis son inscription il y a trois ans.", "since + point de départ : Present Perfect.", null, E('since + starting point: present perfect.')),
  c('He ___ (meet) the investors yesterday afternoon.', ['met'], "Il a rencontré les investisseurs hier après-midi.", "yesterday : Past Simple. meet est irrégulier : met.", null, E('yesterday: past simple. meet is irregular: met.')),
  c('By the end of next year, they ___ (complete) the entire project.', ['will have completed'], "D'ici la fin de l'année prochaine, ils auront terminé le projet entier.", "By the end of + période future : Future Perfect.", null, E('By the end of + future period: future perfect.')),
  c("While I ___ (cook), she ___ (call) to say she'd be late.", ['was cooking', 'called'], "Pendant que je cuisinais, elle a appelé pour dire qu'elle serait en retard.", "Action longue (was cooking) et action brève (called).", null, E('Long action (was cooking) and short action (called).')),
  c('She ___ (never / miss) a deadline in her entire career.', ['has never missed'], "Elle n'a jamais manqué une date limite de toute sa carrière.", "Expérience de vie : Present Perfect.", null, E('Life experience: present perfect.')),
  c('He ___ (live) in Lyon for two years before he was transferred to Lille.', ['had lived'], "Il avait vécu deux ans à Lyon avant d'être muté à Lille.", "Période antérieure à un autre moment du passé : Past Perfect.", null, E('Period before another moment in the past: past perfect.')),
  c('I ___ (try) to reach him all morning, and he does not pick up.', ['have been trying'], "J'essaie de le joindre depuis ce matin, et il ne répond pas.", "Durée jusqu'à maintenant : Present Perfect Continuous.", null, E('Duration up to now: present perfect continuous.')),
  c('The team ___ (analyse) the data at this time next Tuesday.', [['will be analysing', 'will be analyzing']], "L'équipe analysera les données à cette heure-ci mardi prochain.", "this time next Tuesday : action en cours à un moment futur, Future Continuous.", null, E('this time next Tuesday: action in progress at a future moment, future continuous.')),
  c('They ___ (not / finalise) the agreement before we left the meeting.', [["hadn't finalised", "hadn't finalized"]], "Ils n'avaient pas finalisé l'accord avant que nous quittions la réunion.", "Action (non) réalisée avant un autre moment du passé (we left) : Past Perfect négatif.", null, E('Action (not) done before another moment in the past (we left): negative past perfect.')),
  c('She ___ (publish) four research articles since joining the lab.', ['has published'], "Elle a publié quatre articles de recherche depuis son arrivée au laboratoire.", "since + point de départ : Present Perfect.", null, E('since + starting point: present perfect.'))
];

const m4a = [
  c('When she arrived at the office, the meeting ___ (already / start).', ['had already started'], 'Quand elle est arrivée au bureau, la réunion avait déjà commencé.', 'Avant un autre moment du passé : Past Perfect.', null, E('Before another moment in the past: past perfect.')),
  c('He was exhausted because he ___ (work) for ten hours straight.', ['had been working'], 'Il était épuisé parce qu\'il travaillait depuis dix heures d\'affilée.', 'Durée avant un moment du passé : Past Perfect Continuous.', null, E('Duration before a moment in the past: past perfect continuous.')),
  c('By the time we checked the results, the system ___ (crash) twice.', ['had crashed'], 'Quand nous avons vérifié les résultats, le système avait déjà planté deux fois.', 'Nombre d\'occurrences avant un moment passé : Past Perfect.', null, E('Number of occasions before a moment in the past: past perfect.')),
  c('I ___ (never / see) such a complex diagram before that project.', ['had never seen'], "Je n'avais jamais vu un schéma aussi complexe avant ce projet.", 'before that project : antériorité par rapport au passé, Past Perfect.', null, E('before that project: earlier than a past moment, past perfect.')),
  c('They ___ (discuss) the issue for an hour before I joined the call.', ['had been discussing'], "Ils discutaient du problème depuis une heure avant que je rejoigne l'appel.", 'Durée avant un moment passé : Past Perfect Continuous.', null, E('Duration before a past moment: past perfect continuous.')),
  c('The technician fixed the machine after it ___ (break down) three times.', ['had broken down'], "Le technicien a réparé la machine après qu'elle était tombée en panne trois fois.", 'after : la panne précède la réparation, Past Perfect. break est irrégulier : broken.', null, E('after: the breakdowns came before the repair, past perfect. break is irregular: broken.'))
];

const m4bEx1 = [
  tx('Reformule avec have got.', 'She has a new laptop.', ['She has got a new laptop.', "She's got a new laptop."], 'Elle a un nouvel ordinateur portable.', 'have got a le même sens que have pour la possession. À la 3e personne : has got.', E('have got has the same meaning as have for possession. In the third person: has got.', null, { instr: 'Rewrite with have got.' })),
  tx('Reformule avec have got.', 'Do you have any questions?', ['Have you got any questions?'], 'As-tu des questions ?', 'Avec have got, la question se forme par inversion : Have you got...?', E('With have got, the question is formed by inversion: Have you got...?', null, { instr: 'Rewrite with have got.' })),
  tx('Reformule avec have got.', "They don't have much time.", ["They haven't got much time.", 'They have not got much time.'], 'Ils n\'ont pas beaucoup de temps.', "Avec have got, la négation se forme avec haven't got.", E("With have got, the negative is haven't got.", null, { instr: 'Rewrite with have got.' }))
];

const m4bEx2 = [
  c("He ___ (work) in a factory, but now he's an engineer.", ['used to work'], "Il travaillait dans une usine, mais il est maintenant ingénieur.", "Habitude ou état passé qui n'existe plus : used to + base verbale.", null, E('Past habit or state that no longer exists: used to + base form.')),
  c('___ you ___ (live) abroad?', ['Did', 'use to live'], 'Vivais-tu à l\'étranger auparavant ?', "Dans la question, c'est did qui porte le passé : Did + sujet + use to + base verbale (sans d).", null, E('In the question, did carries the past: Did + subject + use to + base form (no d).')),
  c('She ___ (not / like) her job, but now she loves it.', ["didn't use to like"], "Elle n'aimait pas son travail, mais maintenant elle l'adore.", "Dans la négation, didn't porte le passé : didn't use to + base verbale (sans d).", null, E("In the negative, didn't carries the past: didn't use to + base form (no d).")),
  c('We ___ (have) a smaller office before we moved.', ['used to have'], 'Nous avions un bureau plus petit avant de déménager.', "État passé révolu : used to + base verbale.", null, E('Finished past state: used to + base form.'))
];

const m4cEx1 = [
  c('A: The photocopier is broken again. B: OK, I ___ (call) the technician. (décision spontanée)', ["will call"], "A : La photocopieuse est encore en panne. B : D'accord, j'appelle le technicien.", "Décision prise au moment de parler : will ('ll call).", null, E("Decision made at the moment of speaking: will ('ll call).", null, { s: 'A: The photocopier is broken again. B: OK, I ___ (call) the technician. (spontaneous decision)' })),
  c("We ___ (present) our results at 10 AM tomorrow, as it is already on the agenda.", ['are presenting'], "Nous présentons nos résultats demain à 10 h, c'est déjà à l'ordre du jour.", "Projet organisé avec une heure précise : Present Continuous.", null, E('Organised plan with a precise time: present continuous.')),
  c('Look at the sky: it ___ (definitely / rain) this afternoon.', ['is definitely going to rain'], "Regarde le ciel : il va sûrement pleuvoir cet après-midi.", "Preuve visible : be going to. definitely se place entre be et going to.", null, E('Visible evidence: be going to. definitely goes between be and going to.')),
  c('I think the new policy ___ (improve) productivity. (prédiction, opinion)', ['will improve'], "Je pense que la nouvelle politique améliorera la productivité.", "Prédiction fondée sur une opinion (I think) : will.", null, E('Prediction based on an opinion (I think): will.', null, { s: 'I think the new policy ___ (improve) productivity. (prediction, opinion)' })),
  c('She ___ (start) her new job on Monday, as she signed the contract yesterday.', ['is starting'], "Elle commence son nouveau travail lundi, puisqu'elle a signé le contrat hier.", "Projet organisé : Present Continuous.", null, E('Organised plan: present continuous.')),
  c("Don't worry, I ___ (help) you with the report. (offre spontanée)", ['will help'], "Ne t'inquiète pas, je t'aiderai pour le rapport.", "Offre spontanée : will ('ll help).", null, E("Spontaneous offer: will ('ll help).", null, { s: "Don't worry, I ___ (help) you with the report. (spontaneous offer)" }))
];

const m4cEx2 = [
  tx(FIX, 'I will see the supplier at 4 PM tomorrow; it is already in my calendar.', ['I am seeing the supplier at 4 PM tomorrow; it is already in my calendar.', 'I am going to see the supplier at 4 PM tomorrow; it is already in my calendar.'], "Je vois le fournisseur demain à 16 h ; c'est déjà dans mon agenda.", "Rendez-vous déjà arrangé : Present Continuous (ou be going to), pas will.", E('An appointment that is already arranged: present continuous (or be going to), not will.')),
  okc(FIX, 'Look! The crane is going to fall!', 'Regarde ! La grue va tomber !', "Correct : il y a une preuve visible dans le présent, donc be going to.", E('Correct: there is visible evidence in the present, so be going to.')),
  tx(FIX, 'I think we start a new project next year.', ['I think we will start a new project next year.', "I think we'll start a new project next year."], "Je pense que nous commencerons un nouveau projet l'année prochaine.", "Après I think, une prédiction s'exprime avec will, pas avec le présent simple.", E('After I think, a prediction is expressed with will, not the present simple.'))
];

const sb = (words, a, fr, why, en) => tx('Remets les mots dans l\'ordre pour former une phrase correcte.', words, a, fr, why, E(en, null, { instr: 'Put the words in the right order to make a correct sentence.' }));
const m4d = [
  sb('shipped / will have / the product / by next year / we', ['By next year, we will have shipped the product.', 'We will have shipped the product by next year.'], 'D\'ici l\'année prochaine, nous aurons expédié le produit.', 'Future Perfect : will have + participe passé.', 'Future perfect: will have + past participle.'),
  sb('had already / when / she / the alarm / left / went off', ['She had already left when the alarm went off.', 'When the alarm went off, she had already left.'], "Elle était déjà partie quand l'alarme s'est déclenchée.", 'Past Perfect (had already left) avant le Past Simple (went off).', 'Past perfect (had already left) before the past simple (went off).'),
  sb('going to / is / present / he / his findings / tomorrow', ['He is going to present his findings tomorrow.', 'Tomorrow he is going to present his findings.'], 'Il va présenter ses résultats demain.', 'Plan : be going to + base verbale.', 'Plan: be going to + base form.'),
  sb('have been / they / this prototype / testing / for weeks', ['They have been testing this prototype for weeks.'], 'Ils testent ce prototype depuis des semaines.', 'Present Perfect Continuous : have been + -ing, avec for + durée.', 'Present perfect continuous: have been + -ing, with for + duration.'),
  sb('used to / I / by train / every day / commute', ['I used to commute by train every day.', 'Every day I used to commute by train.'], 'Je faisais la navette en train tous les jours.', 'used to + base verbale pour une habitude passée.', 'used to + base form for a past habit.'),
  sb('currently / the engineers / are / the blueprint / reviewing', ['The engineers are currently reviewing the blueprint.', 'Currently, the engineers are reviewing the blueprint.'], 'Les ingénieurs sont en train de revoir le plan.', 'Present Continuous. currently se place entre are et le verbe en -ing.', 'Present continuous. currently goes between are and the -ing verb.'),
  sb('the demo / by the time / had already ended / we arrived', ['By the time we arrived, the demo had already ended.', 'The demo had already ended by the time we arrived.'], 'Quand nous sommes arrivés, la démo était déjà terminée.', 'By the time + Past Simple, puis Past Perfect pour ce qui précède.', 'By the time + past simple, then past perfect for what came before.'),
  sb('will be / her thesis / she / finishing / in June', ['She will be finishing her thesis in June.', 'In June she will be finishing her thesis.'], 'Elle sera en train de finir sa thèse en juin.', 'Future Continuous : will be + -ing.', 'Future continuous: will be + -ing.')
];

const m4eEx1 = [
  c('At this time tomorrow, she ___ (present) her findings.', ['will be presenting'], 'Demain à cette heure-ci, elle présentera ses résultats.', 'Action en cours à un moment précis du futur : Future Continuous.', null, E('Action in progress at a precise future moment: future continuous.')),
  c('By the time he arrived, we ___ (already / start).', ['had already started'], 'Quand il est arrivé, nous avions déjà commencé.', 'Antérieur à un autre moment du passé : Past Perfect.', null, E('Earlier than another past moment: past perfect.')),
  c('I ___ (look for) a solution for hours, and I give up.', ['have been looking for'], "Je cherche une solution depuis des heures et j'abandonne.", "Durée jusqu'à maintenant : Present Perfect Continuous. look for garde sa préposition.", null, E('Duration up to now: present perfect continuous. look for keeps its preposition.')),
  c('The machine ___ (break) while we ___ (use) it.', ['broke', 'were using'], 'La machine est tombée en panne pendant que nous l\'utilisions.', 'Action brève (broke) pendant une action longue (were using).', null, E('Short action (broke) during a long action (were using).')),
  c('By 2030, AI ___ (transform) most industries.', ['will have transformed'], "D'ici 2030, l'IA aura transformé la plupart des industries.", 'By + date future : Future Perfect.', null, E('By + future date: future perfect.'))
];

const m4eEx2 = [
  tx(FIX, 'She has been working here since three weeks.', ['She has been working here for three weeks.', 'She has worked here for three weeks.'], 'Elle travaille ici depuis trois semaines.', 'Trois semaines est une durée : for, pas since.', E('Three weeks is a length of time: for, not since.')),
  tx(FIX, 'By the time I arrived, they already started.', ['By the time I arrived, they had already started.'], 'Quand je suis arrivé, ils avaient déjà commencé.', 'Antérieur à un autre moment du passé : Past Perfect.', E('Earlier than another past moment: past perfect.')),
  tx(FIX, 'I will text you when I will get there.', ['I will text you when I get there.'], 'Je t\'enverrai un message quand j\'y serai.', 'Après when, on emploie le présent pour le futur.', E('After when, the present is used for the future.')),
  tx(FIX, 'They are testing the prototype since March.', ['They have been testing the prototype since March.', 'They have tested the prototype since March.'], 'Ils testent le prototype depuis mars.', 'since impose le Present Perfect, pas le présent continu.', E('since requires the present perfect, not the present continuous.'))
];

const th = [
  tr("L'année prochaine, nous aurons livré les premières unités.", ['By next year, we will have delivered the first units.', 'Next year, we will have delivered the first units.'], 'Terminé avant un moment futur : Future Perfect.', E('Finished before a future moment: future perfect.')),
  tr('Il était déjà parti quand le responsable est arrivé.', ['He had already left when the manager arrived.', 'When the manager arrived, he had already left.'], 'Antérieur à un autre moment du passé : Past Perfect.', E('Earlier than another past moment: past perfect.')),
  tr('Elle va présenter son projet demain matin.', ['She is going to present her project tomorrow morning.'], 'Plan : be going to + base verbale.', E('Plan: be going to + base form.')),
  tr('Nous testons ce logiciel depuis des mois.', ['We have been testing this software for months.'], 'Durée qui continue : Present Perfect Continuous, avec for + durée.', E('Duration that continues: present perfect continuous, with for + duration.')),
  tr("J'avais l'habitude d'aller au laboratoire à vélo.", ['I used to cycle to the lab.', 'I used to go to the lab by bike.', 'I used to go to the lab by bicycle.'], 'Habitude passée révolue : used to + base verbale.', E('Finished past habit: used to + base form.')),
  tr('Les techniciens sont en train de réparer la pompe.', ['The technicians are repairing the pump.', 'The technicians are currently repairing the pump.', 'The technicians are repairing the pump at the moment.'], 'Action en cours : Present Continuous.', E('Action in progress: present continuous.')),
  tr('Quand nous sommes arrivés, la réunion avait déjà commencé.', ['When we arrived, the meeting had already started.', 'The meeting had already started when we arrived.'], 'Antérieur à un autre moment du passé : Past Perfect.', E('Earlier than another past moment: past perfect.'))
];

export const G04 = {
  id: 'G04',
  title: 'Tous les temps (récapitulatif)',
  coursUrl: 'https://peip2-hub.vercel.app/cours/G04_cours.html',
  sets: [
    set('g04-guidee-a', 'Fiche', 'Série guidée A : temps fondamentaux', 'B1', 'Repère le marqueur de temps. Chaque phrase propose un indice.', guideeA,
      { group: 'Worksheet', title: 'Guided set A: core tenses', desc: 'Spot the time marker. Each sentence comes with a hint.' }),
    set('g04-guidee-b', 'Fiche', 'Série guidée B : temps avancés et nuances', 'B2', 'Past Perfect Continuous, Future Perfect et leurs nuances.', guideeB,
      { group: 'Worksheet', title: 'Guided set B: advanced tenses and nuances', desc: 'Past perfect continuous, future perfect and their nuances.' }),
    set('g04-niv-a', 'Fiche', 'Niveau A : temps de base', 'B1', 'Choisis le bon temps.', nivA,
      { group: 'Worksheet', title: 'Level A: basic tenses', desc: 'Choose the right tense.' }),
    set('g04-niv-b', 'Fiche', 'Niveau B : contexte professionnel', 'B1+', 'Les mêmes choix dans des phrases d\'ingénieur.', nivB,
      { group: 'Worksheet', title: 'Level B: professional context', desc: 'The same choices in engineering sentences.' }),
    set('g04-niv-c', 'Fiche', 'Niveau C : corrections et thème', 'B1+', 'Corriger cinq phrases fautives, puis traduire cinq phrases.', nivC,
      { group: 'Worksheet', title: 'Level C: corrections and translation', desc: 'Correct five faulty sentences, then translate five sentences.' }),
    set('g04-niv-d', 'Fiche', 'Niveau D : texte narratif', 'B2+', 'Complète le récit avec les verbes aux temps corrects.', nivD,
      { group: 'Worksheet', title: 'Level D: narrative text', desc: 'Complete the story with the verbs in the right tenses.' }),
    set('g04-bonus', 'Fiche', 'Bonus : analyse de temps en contexte', 'B2+', 'Explique pourquoi le temps est correct ou non, puis compare avec le modèle.', bonus,
      { group: 'Worksheet', title: 'Bonus: analysing tenses in context', desc: 'Explain why the tense is right or wrong, then compare with the model.' }),
    set('g04-devoir', 'Fiche', 'Devoir maison', 'B1+', 'Quinze phrases à conjuguer.', devoir,
      { group: 'Worksheet', title: 'Homework', desc: 'Fifteen sentences to complete.' }),
    set('g04-m4a', 'Supplément Murphy', 'Unité 4A : Past Perfect', 'B1+', 'Past Perfect ou Past Perfect Continuous.', m4a,
      { group: 'Murphy supplement', title: 'Unit 4A: past perfect', desc: 'Past perfect or past perfect continuous.' }),
    set('g04-m4b-1', 'Supplément Murphy', 'Unité 4B : have got (1/2)', 'B1', 'Reformule avec have got.', m4bEx1,
      { group: 'Murphy supplement', title: 'Unit 4B: have got (1/2)', desc: 'Rewrite with have got.' }),
    set('g04-m4b-2', 'Supplément Murphy', 'Unité 4B : used to (2/2)', 'B1', 'Mets le verbe à la forme correcte avec used to.', m4bEx2,
      { group: 'Murphy supplement', title: 'Unit 4B: used to (2/2)', desc: 'Put the verb in the correct form with used to.' }),
    set('g04-m4c-1', 'Supplément Murphy', 'Unité 4C : les formes du futur (1/2)', 'B1+', 'Going to, will ou Present Continuous ?', m4cEx1,
      { group: 'Murphy supplement', title: 'Unit 4C: future forms (1/2)', desc: 'Going to, will or present continuous?' }),
    set('g04-m4c-2', 'Supplément Murphy', 'Unité 4C : corriger les phrases (2/2)', 'B1+', 'Corrige les phrases fautives ou écris Correct.', m4cEx2,
      { group: 'Murphy supplement', title: 'Unit 4C: correct the sentences (2/2)', desc: 'Correct the faulty sentences or write Correct.' }),
    set('g04-m4d', 'Supplément Murphy', 'Unité 4D : remettre les mots dans l\'ordre', 'B1+', 'Écris la phrase complète avec les mots dans le bon ordre.', m4d,
      { group: 'Murphy supplement', title: 'Unit 4D: sentence building', desc: 'Write the complete sentence with the words in the right order.' }),
    set('g04-m4e-1', 'Supplément Murphy', 'Unité 4E : synthèse (1/2)', 'B2', 'Choisis le bon temps.', m4eEx1,
      { group: 'Murphy supplement', title: 'Unit 4E: review (1/2)', desc: 'Choose the right tense.' }),
    set('g04-m4e-2', 'Supplément Murphy', 'Unité 4E : corriger les phrases (2/2)', 'B2', 'Corrige les phrases fautives.', m4eEx2,
      { group: 'Murphy supplement', title: 'Unit 4E: correct the sentences (2/2)', desc: 'Correct the faulty sentences.' }),
    set('g04-th', 'Supplément Murphy', 'Unité TH : thème grammatical', 'B1+', 'Traduis en anglais, puis compare avec le modèle.', th,
      { group: 'Murphy supplement', title: 'Unit TH: translation', desc: 'Translate into English, then compare with the model.' })
  ],
  recap: {
    blocks: [
      {
        title: 'Présent et passé',
        forms: [
          ['Present Simple', 'I work. Habitude, vérité générale (always, every day, never).'],
          ['Present Continuous', 'I am working. En cours, temporaire, plan (now, at the moment, this week).'],
          ['Past Simple', 'I worked, I went. Action terminée à un moment précis (yesterday, ago, in 2020).'],
          ['Past Continuous', 'I was working. Action en cours dans le passé (while, when, at 5 PM yesterday).'],
          ['Present Perfect', 'I have worked. Passé avec lien au présent (already, yet, just, ever, for, since).'],
          ['Present Perfect Continuous', 'I have been working. Durée jusqu\'à maintenant (for hours, since morning).'],
          ['Past Perfect', 'I had worked. Avant un autre moment passé (before, after, when, by the time).'],
          ['Past Perfect Continuous', 'I had been working. Durée avant un moment passé (for hours, all day).']
        ]
      },
      {
        title: 'Futur',
        forms: [
          ['Future Simple', 'I will work. Décision spontanée, prédiction (tomorrow, soon, I think, probably).'],
          ['be going to', 'I am going to work. Plan concret, preuve visible (tonight, next week, Look!).'],
          ['Present Continuous', 'I am working tomorrow. Projet organisé avec heure ou lieu.'],
          ['Present Simple', 'The train leaves at 8. Horaire fixe.'],
          ['Future Continuous', 'I will be working. Action en cours à un moment futur (at 3 PM tomorrow).'],
          ['Future Perfect', 'I will have worked. Terminé avant un moment futur (by next Monday, by 2030).']
        ]
      }
    ],
    tables: [{
      title: 'Quel temps choisir ?',
      rows: [
        ['Passé', 'date précise : Simple / résultat présent : Perfect / avant un autre passé : Past Perfect / en cours : Continuous'],
        ['Présent', 'en cours : Continuous / habituel ou général : Simple / durée depuis le passé : Perfect'],
        ['Futur', 'décision instantanée : will / plan : going to / horaire : Present Simple / en cours : will be doing / terminé avant : will have done']
      ]
    }],
    notes: ['En cas de doute entre prétérit et Present Perfect, cherche une date précise (hier, en 2020, il y a) : prétérit. Sans précision de temps : souvent Present Perfect.', "Après when, if, as soon as, by the time, on emploie le présent pour parler du futur (I will call you when I arrive)."],
    rule: 'Lis toujours les marqueurs de temps en premier : ils indiquent presque toujours le bon temps.'
  },
  enMeta: {
    title: 'All Tenses (complete review)',
    recap: {
      blocks: [
        {
          title: 'Present and past',
          forms: [
            ['Present Simple', 'I work. Habit, general truth (always, every day, never).'],
            ['Present Continuous', 'I am working. In progress, temporary, plan (now, at the moment, this week).'],
            ['Past Simple', 'I worked, I went. Finished action at a precise time (yesterday, ago, in 2020).'],
            ['Past Continuous', 'I was working. Action in progress in the past (while, when, at 5 PM yesterday).'],
            ['Present Perfect', 'I have worked. Past with a link to the present (already, yet, just, ever, for, since).'],
            ['Present Perfect Continuous', 'I have been working. Duration up to now (for hours, since morning).'],
            ['Past Perfect', 'I had worked. Before another past moment (before, after, when, by the time).'],
            ['Past Perfect Continuous', 'I had been working. Duration before a past moment (for hours, all day).']
          ]
        },
        {
          title: 'Future',
          forms: [
            ['Future Simple', 'I will work. Spontaneous decision, prediction (tomorrow, soon, I think, probably).'],
            ['be going to', 'I am going to work. Concrete plan, visible evidence (tonight, next week, Look!).'],
            ['Present Continuous', 'I am working tomorrow. Arranged plan with a time or a place.'],
            ['Present Simple', 'The train leaves at 8. Fixed timetable.'],
            ['Future Continuous', 'I will be working. Action in progress at a future moment (at 3 PM tomorrow).'],
            ['Future Perfect', 'I will have worked. Finished before a future moment (by next Monday, by 2030).']
          ]
        }
      ],
      tables: [{
        title: 'Which tense should I choose?',
        rows: [
          ['Past', 'precise date: Simple / present result: Perfect / before another past moment: Past Perfect / in progress: Continuous'],
          ['Present', 'in progress: Continuous / habitual or general: Simple / duration since the past: Perfect'],
          ['Future', 'instant decision: will / plan: going to / timetable: Present Simple / in progress: will be doing / finished before: will have done']
        ]
      }],
      notes: ['If you hesitate between the past simple and the present perfect, look for a precise date (yesterday, in 2020, ago): past simple. With no time given: often present perfect.', 'After when, if, as soon as and by the time, the present is used to talk about the future (I will call you when I arrive).'],
      rule: 'Always read the time markers first: they almost always show the right tense.'
    }
  }
};
