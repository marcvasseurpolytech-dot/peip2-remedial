// G24 : Conjonctions et mots de liaison
import { S, FICHE, MURPHY, F, R, W, P, K, SK } from './dsl2.js';
import { ch, E } from './dsl.js';

const X = (...arrs) => arrs.reduce((a, b) => a.flatMap(x => b.map(y => x + y)), ['']);

const WHY = {
  'although': ['although = bien que : introduit un contraste.', 'although introduces a contrast.'],
  'unless': ['unless = à moins que : condition négative.', 'unless means if not: a negative condition.'],
  'while': ['while = pendant que : deux actions simultanées.', 'while links two simultaneous actions.'],
  'in case': ['in case = au cas où : précaution.', 'in case expresses a precaution.'],
  'as': ['as ... as : égalité de degré.', 'as ... as expresses an equal degree.'],
  'like': ['like + nom : comparaison avec un nom ou un groupe nominal.', 'like is followed by a noun phrase in a comparison.'],
  'neither': ['neither ... nor : ni ... ni.', 'neither ... nor links two negative items.'],
  'whereas': ['whereas = alors que : oppose deux faits.', 'whereas contrasts two facts.'],
  'so that': ['so that = afin que : exprime le but.', 'so that expresses purpose.'],
  'provided that': ['provided that = à condition que.', 'provided that sets a condition.'],
  'as soon as': ['as soon as = dès que : immédiatement après.', 'as soon as means immediately after.'],
  'even though': ['even though = même si : contraste fort.', 'even though is a stronger form of although.'],
  'once': ['once = une fois que : après un événement.', 'once means after something has happened.'],
  'both': ['both ... and : les deux éléments à la fois.', 'both ... and joins two items together.'],
  'though': ['though = bien que, plus familier.', 'though means although, in a more informal way.'],
  'in order that': ['in order that = afin que, plus formel que so that.', 'in order that is a formal way of saying so that.'],
  'not only': ['not only ... but also : ajoute une seconde qualité.', 'not only ... but also adds a second quality.'],
  'because': ['because = parce que : donne la cause.', 'because gives the reason.'],
  'as(time)': ['as = au moment où, à mesure que : événements simultanés.', 'as links events happening at the same time.']
};
const SO_RESULT = ['so (conséquence) : relie une cause et son résultat, avec une virgule.', 'so (result) links a cause and its result, after a comma.'];
const SO_THAT = ['so + adjectif + that : conséquence.', 'so + adjective + that expresses a result.'];
const SUCH = ['such + a + adjectif + nom + that : conséquence.', 'such + a + adjective + noun + that expresses a result.'];
const CHX = (s, o, k, fr, w) => {
  const pair = w || WHY[o[k].toLowerCase()];
  if (!pair) throw new Error('no why for ' + o[k]);
  return ch(s, o, k, fr, pair[0], E(pair[1], null, { s, o }));
};
const AS_T = WHY['as(time)'];

const guideeA = [
  CHX('___ the report was late, the client accepted it.', ['Although', 'Unless'], 0, "Bien que le rapport ait été en retard, le client l'a accepté."),
  CHX('The system will crash ___ you increase the memory.', ['since', 'unless'], 1, "Le système plantera à moins que vous n'augmentiez la mémoire."),
  CHX("___ the servers were down, customers couldn't log in.", ['So that', 'While'], 1, "Pendant que les serveurs étaient en panne, les clients ne pouvaient pas se connecter."),
  CHX('Save your progress ___ the power goes out.', ['in case', 'because'], 0, "Enregistre ta progression au cas où le courant serait coupé."),
  CHX('This chip performs ___ well as the premium version.', ['like', 'as'], 1, "Cette puce fonctionne aussi bien que la version haut de gamme."),
  CHX('The interface behaves ___ a native app.', ['like', 'as'], 0, "L'interface se comporte comme une application native."),
  CHX('The prototype was ___ tested nor documented.', ['both', 'neither'], 1, "Le prototype n'était ni testé ni documenté."),
  CHX('___ the first version was buggy, the second is stable.', ['If', 'Whereas'], 1, "Alors que la première version était boguée, la seconde est stable."),
  CHX('We ran the simulation twice ___ we could confirm the results.', ['unless', 'so that'], 1, "Nous avons lancé la simulation deux fois afin de pouvoir confirmer les résultats."),
  CHX('The heat was ___ intense that the sensor failed.', ['so', 'such'], 0, "La chaleur était si intense que le capteur est tombé en panne.", SO_THAT),
  CHX('You may work remotely ___ you attend the daily standup.', ['in case', 'provided that'], 1, "Vous pouvez travailler à distance à condition d'assister à la réunion quotidienne."),
  CHX('___ the invoice is approved, payment will be processed.', ['As soon as', 'Before'], 0, "Dès que la facture est approuvée, le paiement sera traité.")
];
const guideeB = [
  CHX('The download stalled, ___ we restarted the router.', ['so', 'because'], 0, "Le téléchargement s'est bloqué, alors nous avons redémarré le routeur.", SO_RESULT),
  CHX('___ the team worked overtime, the deadline slipped.', ['Once', 'Even though'], 1, "Même si l'équipe a fait des heures supplémentaires, l'échéance a glissé."),
  CHX('This process is ___ slow that users are complaining.', ['such', 'so'], 1, "Ce processus est si lent que les utilisateurs se plaignent.", SO_THAT),
  CHX("We'll deploy the patch ___ the tests are green.", ['once', 'unless'], 0, "Nous déploierons le correctif une fois que les tests seront au vert."),
  CHX('___ the firmware and the driver needed updating.', ['Both', 'Either'], 0, "Le micrologiciel et le pilote nécessitaient tous deux une mise à jour."),
  CHX("The documentation is outdated, ___ it's still useful.", ['because', 'though'], 1, "La documentation est obsolète, bien qu'elle reste utile."),
  CHX('___ the budget is confirmed, hiring can start.', ['In case', 'Provided that'], 1, "À condition que le budget soit confirmé, le recrutement peut commencer."),
  CHX("We label every cable ___ technicians don't get confused.", ['in order that', 'as'], 0, "Nous étiquetons chaque câble afin que les techniciens ne s'embrouillent pas."),
  CHX('This laptop is ___ powerful as a workstation.', ['like', 'as'], 1, "Cet ordinateur est aussi puissant qu'une station de travail."),
  CHX('He is ___ a good manager but also a skilled coder.', ['neither', 'not only'], 1, "Il est non seulement un bon manager mais aussi un codeur doué.")
];
const nivA = [
  K('Wait here ___ (= jusqu\'à ce que) I come back.', [['until', 'till']], "Attends ici jusqu'à ce que je revienne.", 'until / till = jusqu\'à ce que, suivi du présent.', 'until / till introduce the end point of a wait, followed by the present.'),
  K('Check the settings ___ (= avant de) you launch the program.', [['before']], "Vérifie les paramètres avant de lancer le programme.", 'before = avant que : le verbe qui suit reste au présent.', 'before introduces the later action and takes the present.'),
  K('___ (= Dès que) the printer stops, remove the paper.', [['as soon as']], "Dès que l'imprimante s'arrête, retire le papier.", WHY['as soon as'][0], WHY['as soon as'][1]),
  K('___ (= Pendant que) the machine was warming up, she checked the logs.', [['while', 'as']], "Pendant que la machine chauffait, elle a vérifié les journaux.", AS_T[0], AS_T[1]),
  K('He has led the project ___ (= depuis que) the previous manager left.', [['since']], "Il dirige le projet depuis que le responsable précédent est parti.", 'since = depuis que : point de départ, avec le present perfect dans la principale.', 'since gives the starting point, with the present perfect in the main clause.')
];
const nivB = [
  K('We cancelled the trial ___ (= parce que) the sample was contaminated.', [['because']], "Nous avons annulé l'essai parce que l'échantillon était contaminé.", WHY.because[0], WHY.because[1]),
  K('___ (= Bien que) the results were promising, the board refused to fund it.', [['although', 'though']], "Bien que les résultats aient été prometteurs, le conseil a refusé de le financer.", WHY.although[0], WHY.although[1]),
  K('___ (= Puisque) you have the access code, could you open the door?', [['since', 'as']], "Puisque tu as le code d'accès, pourrais-tu ouvrir la porte ?", 'since / as = puisque : cause connue de tous.', 'since / as give a reason that is already known.'),
  K('The old pump is cheap, ___ (= alors que) the new one is expensive.', [['whereas', 'while']], "L'ancienne pompe est bon marché, alors que la nouvelle est chère.", WHY.whereas[0], WHY.whereas[1]),
  K('Bring a coat ___ (= au cas où) it gets cold.', [['in case']], "Prends un manteau au cas où il ferait froid.", WHY['in case'][0], WHY['in case'][1])
];
const nivC = [
  R("Il a continué à travailler bien qu'il soit fatigué.", X(['He kept working ', 'He kept on working ', 'He continued to work ', 'He carried on working ', 'He went on working '], ['although ', 'though ', 'even though '], ['he was tired.', 'he was exhausted.', 'he was tired', 'he was feeling tired.'])),
  R("Nous partirons dès que le camion arrivera.", X(['We will leave ', "We'll leave ", 'We are going to leave '], ['as soon as ', 'once ', 'when '], ['the truck arrives.', 'the truck gets here.', 'the lorry arrives.', 'the lorry gets here.', 'the truck comes.'])),
  R("Le test est valide à condition que l'échantillon soit propre.", X(['The test is valid ', 'The test is only valid '], ['provided that ', 'provided ', 'providing that ', 'providing ', 'as long as '], ['the sample is clean.', 'the sample is uncontaminated.', 'the sample is pure.'])),
  R("Elle est à la fois ingénieure et formatrice.", ['She is both an engineer and a trainer.', "She's both an engineer and a trainer.", 'She is both an engineer and an instructor.', "She's both an engineer and an instructor.", 'She is both engineer and trainer.', "She's both engineer and trainer.", 'She is both an engineer and a teacher.', "She's both an engineer and a teacher."]),
  R("Le bruit était si fort que personne n'entendait.", X(['The noise was so loud that ', 'The noise was so loud ', 'The noise was so strong that '], ['nobody could hear.', 'no one could hear.', 'nobody could hear anything.', 'no one could hear anything.', 'nobody could hear a thing.', 'nobody heard anything.', 'no one heard anything.', 'nobody could be heard.', 'no one could be heard.']).filter(x => !x.endsWith('loud nobody could hear.')))
];
const nivD = [
  F('Despite the weather was bad, we went out.', ['Although the weather was bad, we went out.', 'Though the weather was bad, we went out.', 'Even though the weather was bad, we went out.', 'Despite the bad weather, we went out.', 'In spite of the bad weather, we went out.', 'Despite the fact that the weather was bad, we went out.', 'In spite of the fact that the weather was bad, we went out.'], "Bien que le temps fût mauvais, nous sommes sortis.", 'Despite est suivi d\'un nom, pas d\'une proposition : utiliser although, ou despite + groupe nominal.', 'Despite is followed by a noun phrase, not a clause: use although, or despite + noun phrase.'),
  F('I will text you when I will land.', ['I will text you when I land.', "I'll text you when I land.", 'I will text you as soon as I land.', "I'll text you as soon as I land.", 'I will text you once I land.', "I'll text you once I land."], "Je t'enverrai un message quand j'atterrirai.", 'Après when, as soon as, once : présent, jamais will.', 'After when, as soon as and once, use the present, never will.'),
  F('It was so a long meeting that everyone left.', ['It was such a long meeting that everyone left.', 'It was such a long meeting that everybody left.', 'The meeting was so long that everyone left.', 'The meeting was so long that everybody left.'], "C'était une réunion si longue que tout le monde est parti.", 'such + a + adjectif + nom ; so + adjectif seul.', 'such + a + adjective + noun; so + adjective alone.'),
  F('He is neither polite or helpful.', ['He is neither polite nor helpful.', "He's neither polite nor helpful."], "Il n'est ni poli ni serviable.", 'neither se construit avec nor, pas avec or.', 'neither is paired with nor, not with or.'),
  F('Unless you do not hurry, you will miss the train.', ['Unless you hurry, you will miss the train.', "Unless you hurry, you'll miss the train.", 'If you do not hurry, you will miss the train.', "If you don't hurry, you will miss the train.", "If you don't hurry, you'll miss the train.", 'If you do not hurry, you’ll miss the train.'], "À moins que tu ne te dépêches, tu rateras le train.", 'unless contient déjà la négation (= if not) : pas de second not.', 'unless already contains the negative (= if not): no second not.')
];
const bonus = [
  P("Relie les deux phrases avec although : 'The test was expensive. It gave useful results.'", "Join the two sentences with although: 'The test was expensive. It gave useful results.'", ['Although the test was expensive, it gave useful results.'], 'Although + proposition, proposition.', "Join the two sentences with although.", 'Although + clause, clause.'),
  P("Relie les deux phrases avec so that : 'She saved the file. She could resume work later.'", "Join the two sentences with so that: 'She saved the file. She could resume work later.'", ['She saved the file so that she could resume work later.'], 'so that + sujet + could.', "Join the two sentences with so that.", 'so that + subject + could.'),
  P("Relie les deux phrases avec either ... or : 'We can postpone the launch. We can add two developers.'", "Join the two options with either ... or: 'We can postpone the launch. We can add two developers.'", ['We can either postpone the launch or add two developers.'], 'either placé devant le verbe.', "Join the two options with either ... or.", 'Put either before the verb.'),
  P("Donne une phrase avec since au sens de temps, puis une avec since au sens de cause.", "Write one sentence with since meaning time, then one with since meaning cause.", ['Time: We have used this tool since March. Cause: Since the tool is free, we can try it on every project.'], 'depuis que / puisque.', "Write one sentence with since meaning time, then one with since meaning cause.", 'time / reason.')
];
const devoir = [
  CHX("___ the invoice is paid, the shipment won't be released.", ['Unless', 'While'], 0, "À moins que la facture soit payée, l'expédition ne sera pas libérée."),
  CHX('The audit was thorough, ___ it took longer than expected.', ['because', 'though'], 1, "L'audit était minutieux, bien qu'il ait pris plus de temps que prévu."),
  CHX('___ the migration progressed, more issues surfaced.', ['As', 'Unless'], 0, "À mesure que la migration avançait, d'autres problèmes sont apparus.", AS_T),
  CHX('Keep the old server running ___ the new one fails.', ['so that', 'in case'], 1, "Garde l'ancien serveur en marche au cas où le nouveau tomberait en panne."),
  CHX('This dataset is ___ complete as the previous one.', ['as', 'like'], 0, "Ce jeu de données est aussi complet que le précédent."),
  CHX('The vendor behaves ___ a reliable partner.', ['as', 'like'], 1, "Le fournisseur se comporte comme un partenaire fiable."),
  CHX('The proposal was ___ detailed nor realistic.', ['neither', 'both'], 0, "La proposition n'était ni détaillée ni réaliste."),
  CHX('___ the pilot ran smoothly, the rollout hit delays.', ['If', 'Whereas'], 1, "Alors que le pilote s'est bien passé, le déploiement a pris du retard."),
  CHX('We archived the logs ___ we could audit them later.', ['so that', 'unless'], 0, "Nous avons archivé les journaux afin de pouvoir les auditer plus tard."),
  CHX('The backlog was ___ large that the team fell behind.', ['such', 'so'], 1, "L'arriéré était si important que l'équipe a pris du retard.", SO_THAT),
  CHX('You can access the staging server ___ you have credentials.', ['provided that', 'in case'], 0, "Vous pouvez accéder au serveur de préproduction à condition d'avoir des identifiants."),
  CHX("___ the incident is resolved, we'll send a report.", ['Before', 'As soon as'], 1, "Dès que l'incident sera résolu, nous enverrons un rapport."),
  CHX('___ the onboarding is complete, the account is activated.', ['Once', 'Unless'], 0, "Une fois l'intégration terminée, le compte est activé."),
  CHX('___ the latency and the error rate improved after the fix.', ['Either', 'Both'], 1, "La latence et le taux d'erreur se sont tous deux améliorés après le correctif."),
  CHX('She is ___ thorough but also fast.', ['not only', 'neither'], 0, "Elle est non seulement minutieuse mais aussi rapide.")
];
const m24a1 = [
  CHX('The build failed ___ a dependency was missing.', ['although', 'because'], 1, "La build a échoué parce qu'une dépendance manquait."),
  CHX("___ you restart the service, the fix won't apply.", ['Unless', 'Since'], 0, "À moins que vous ne redémarriez le service, le correctif ne s'appliquera pas."),
  CHX('___ the CI pipeline ran, developers reviewed the code.', ['So that', 'While'], 1, "Pendant que le pipeline d'intégration tournait, les développeurs relisaient le code."),
  CHX('Keep the rollback script ready ___ the deployment breaks.', ['in case', 'as'], 0, "Garde le script de retour arrière prêt au cas où le déploiement échouerait."),
  CHX('This API responds ___ fast as the old one.', ['like', 'as'], 1, "Cette API répond aussi vite que l'ancienne.")
];
const m24a2 = [
  CHX('The changelog is ___ a diary for the codebase.', ['as', 'like'], 1, "Le journal des modifications est comme un journal intime du code."),
  CHX('The ticket was ___ triaged nor assigned.', ['neither', 'both'], 0, "Le ticket n'était ni trié ni assigné."),
  CHX('___ staging is stable, production is flaky.', ['Because', 'Whereas'], 1, "Alors que la préproduction est stable, la production est instable."),
  CHX("We wrote tests ___ future changes wouldn't break this.", ['so that', 'unless'], 0, "Nous avons écrit des tests afin que les changements futurs ne cassent pas ceci."),
  CHX('The queue was ___ backed up that requests timed out.', ['such', 'so'], 1, "La file était tellement engorgée que les requêtes ont expiré.", SO_THAT)
];
const m24b = [
  W('stopped / test / because / the / battery / the / died', ['The test stopped because the battery died.'], "Le test s'est arrêté parce que la batterie était morte.", WHY.because[0], WHY.because[1]),
  W('unless / you / save / the / file / the / changes / will / be / lost', ['Unless you save the file, the changes will be lost.'], "À moins que tu n'enregistres le fichier, les modifications seront perdues.", WHY.unless[0], WHY.unless[1]),
  W('take / a / spare / cable / in / case / the / first / one / breaks', ['Take a spare cable in case the first one breaks.'], "Prends un câble de rechange au cas où le premier casserait.", WHY['in case'][0], WHY['in case'][1]),
  W('menu / is / the / like / a / maze', ['The menu is like a maze.'], "Le menu est comme un labyrinthe.", WHY.like[0], WHY.like[1]),
  W('cable / was / the / neither / labelled / nor / insulated', ['The cable was neither labelled nor insulated.', 'The cable was neither labeled nor insulated.'], "Le câble n'était ni étiqueté ni isolé.", WHY.neither[0], WHY.neither[1]),
  W('added / we / a / cache / so / that / pages / would / load / faster', ['We added a cache so that pages would load faster.'], "Nous avons ajouté un cache afin que les pages se chargent plus vite.", WHY['so that'][0], WHY['so that'][1]),
  W('room / was / the / so / hot / that / the / servers / shut / down', ['The room was so hot that the servers shut down.'], "La salle était si chaude que les serveurs se sont arrêtés.", SO_THAT[0], SO_THAT[1]),
  W('whereas / the / old / model / was / noisy / the / new / one / is / silent', ['Whereas the old model was noisy, the new one is silent.', 'Whereas the old model was noisy, the new one is quiet.'], "Alors que l'ancien modèle était bruyant, le nouveau est silencieux.", WHY.whereas[0], WHY.whereas[1])
];
const th = [
  R("Le déploiement a échoué parce qu'un certificat avait expiré.", X(['The deployment failed because a certificate '], ['had expired.', 'expired.', 'had run out.', 'was out of date.'])),
  R("À moins que tu ne vérifies les droits d'accès, la commande échouera.", X(['Unless you check ', 'Unless you verify '], ['the access rights, ', 'the access permissions, ', 'the permissions, '], ['the command will fail.', 'the command is going to fail.', "the command won't work.", 'the command will not work.'])),
  R("Garde une sauvegarde récente au cas où la mise à jour échouerait.", X(['Keep a recent backup ', 'Keep an up-to-date backup ', 'Keep a recent copy '], ['in case the update fails.', 'in case the update goes wrong.', 'in case the upgrade fails.', 'in case the update failed.'])),
  R("Ce tableau de bord ressemble à un cockpit.", ['This dashboard looks like a cockpit.', 'This dashboard is like a cockpit.', 'The dashboard looks like a cockpit.', 'The dashboard is like a cockpit.', 'This dashboard looks like an aircraft cockpit.', 'This dashboard resembles a cockpit.']),
  R("Le serveur n'était ni sécurisé ni surveillé.", X(['The server was neither '], ['secured ', 'secure ', 'protected '], ['nor '], ['monitored.', 'supervised.', 'watched.'])),
  R("Nous avons documenté l'API afin que les nouveaux venus la comprennent vite.", X(['We documented the API ', 'We have documented the API ', 'We wrote documentation for the API '], ['so that ', 'in order that '], ['newcomers ', 'new joiners ', 'new team members ', 'new arrivals '], ['would understand it quickly.', 'can understand it quickly.', 'could understand it quickly.', 'would understand it fast.', 'can understand it fast.'])),
  R("Le cache était tellement saturé que le site a ralenti.", X(['The cache was so '], ['full ', 'saturated ', 'overloaded ', 'congested '], ['that the site slowed down.', 'that the website slowed down.', 'that the site became slow.', 'that the site got slower.']))
];
const theme1 = [
  R("Bien que la présentation ait été courte, elle a convaincu les investisseurs.", X(['Although ', 'Though ', 'Even though '], ['the presentation was short, '], ['it convinced the investors.', 'it persuaded the investors.', 'it won over the investors.'])),
  R("Le projet prendra du retard à moins que nous n'ajoutions des ressources.", X(['The project will be delayed ', 'The project will fall behind ', 'The project will run late ', 'The project will be late '], ['unless we add resources.', 'unless we add more resources.', 'unless we provide more resources.'])),
  R("Pendant que les développeurs corrigeaient le bug, les testeurs préparaient la nouvelle version.", X(['While ', 'As '], ['the developers were fixing the bug, '], ['the testers were preparing the new ', 'the testers were getting the new '], ['version.', 'release.', 'build.'])),
  R("Garde une copie du fichier au cas où le disque tomberait en panne.", X(['Keep a copy of the file ', 'Keep a copy of the document '], ['in case the '], ['drive ', 'disk ', 'disc ', 'hard drive '], ['fails.', 'crashes.', 'breaks down.', 'dies.', 'failed.', 'goes down.']), 'au cas où = in case, suivi du présent.', 'in case is followed by the present.'),
  R("Ce robot est aussi précis que le modèle industriel.", X(['This robot is as '], ['precise ', 'accurate '], ['as the industrial model.', 'as the industrial one.'])),
  R("Il travaille dans cette entreprise depuis qu'il a obtenu son diplôme.", X(['He has worked ', 'He has been working '], ['at ', 'for ', 'in '], ['this company since he '], ['graduated.', 'got his degree.', 'obtained his degree.', 'earned his degree.'])),
  R("La batterie était tellement déchargée que l'appareil s'est éteint.", X(['The battery was so '], ['low ', 'flat ', 'drained ', 'discharged ', 'dead '], ['that the device '], ['shut down.', 'switched off.', 'turned off.', 'shut itself down.']), 'tellement ... que = so ... that.', 'tellement ... que = so ... that.'),
  R("Nous devrions soit revoir le calendrier, soit embaucher un stagiaire.", X(['We should either '], ['revise ', 'review ', 'rework '], ['the schedule ', 'the timetable ', 'the calendar '], ['or hire an intern.', 'or hire a trainee.', 'or take on an intern.'])),
  R("Le capteur n'était ni calibré ni testé avant l'installation.", X(['The sensor was neither calibrated nor tested before '], ['installation.', 'the installation.', 'being installed.', 'it was installed.'])),
  R("Ce framework est non seulement rapide mais aussi facile à apprendre.", [...X(['This framework is '], ['not only ', 'not just '], ['fast but also ', 'fast but '], ['easy to learn.', 'simple to learn.', 'easy to pick up.']), 'Not only is this framework fast, but it is also easy to learn.', "Not only is this framework fast, it's also easy to learn."])
];
const theme2 = [
  R("Puisque le fournisseur a augmenté ses prix, nous cherchons une alternative.", X(['Since ', 'As ', 'Because '], ['the supplier ', 'the vendor ', 'our supplier '], ['raised ', 'has raised ', 'increased ', 'has increased '], ['its prices, ', 'his prices, ', 'their prices, '], ['we are looking for an alternative.', "we're looking for an alternative.", 'we are looking for another option.', "we're looking for another option."])),
  R("Même si le code est bien commenté, il reste difficile à maintenir.", X(['Even though ', 'Even if ', 'Although ', 'Though '], ['the code is well commented, ', 'the code is well documented, ', 'the code is well annotated, '], ['it remains ', 'it is still ', "it's still "], ['hard to maintain.', 'difficult to maintain.'])),
  R("Nous avons ajouté des tests unitaires afin que les régressions soient détectées tôt.", X(['We added ', 'We have added '], ['unit tests '], ['so that ', 'in order that '], ['regressions ', 'regression bugs '], ['would be ', 'can be ', 'will be '], ['caught ', 'detected ', 'spotted '], ['early.', 'early on.', 'at an early stage.'])),
  R("Tant que la licence est valide, le logiciel continuera de fonctionner.", X(['As long as ', 'So long as '], ['the licence ', 'the license '], ['is valid, '], ['the software will keep working.', 'the software will continue to work.', 'the software will continue working.', 'the software will keep on working.'])),
  R("Une fois que le contrat est signé, la livraison peut commencer.", X(['Once ', 'When ', 'As soon as ', 'After '], ['the contract is signed, ', 'the contract has been signed, '], ['delivery can begin.', 'delivery can start.', 'the delivery can begin.', 'the delivery can start.'])),
  R("Sauvegarde tes données avant de fermer l'application.", X(['Save ', 'Back up '], ['your data '], ['before you close ', 'before closing '], ['the application.', 'the app.'])),
  R("Ce circuit est tellement complexe qu'il faudra deux ingénieurs pour le réparer.", [...X(['This circuit is so complex that '], ['it will take two engineers to '], ['repair it.', 'fix it.']), ...X(['This circuit is so complex that '], ['two engineers will be needed to ', 'you will need two engineers to ', 'we will need two engineers to '], ['repair it.', 'fix it.'])]),
  R("Après que le rapport a été validé, il a été transmis au client.", X(['After the report '], ['was ', 'had been '], ['validated, ', 'approved, '], ['it was '], ['sent ', 'forwarded ', 'passed on ', 'submitted '], ['to the client.', 'to the customer.'])),
  R("À condition que le test de charge réussisse, le site sera mis en production vendredi.", X(['Provided that ', 'Provided ', 'Providing that ', 'Providing ', 'As long as '], ['the load test '], ['succeeds, ', 'passes, ', 'is successful, '], ['the site will go live ', 'the site will go into production ', 'the site will be put into production ', 'the website will go live '], ['on Friday.', 'on Friday'])),
  R("Fais la mesure comme indiqué dans le protocole.", X(['Take ', 'Do ', 'Make '], ['the measurement '], ['as indicated ', 'as described ', 'as specified ', 'as stated '], ['in the protocol.', 'in the procedure.']))
];
const skA = SK('Choisir le bon connecteur', 'Choosing the right connector');
const skS = SK('Connecteurs : thème', 'Connectors: translation');
export const G24 = {
  id: 'G24',
  title: 'Conjonctions et mots de liaison',
  coursUrl: '',
  skills: {
    '*': skA,
    'g24-niv-a': SK('Connecteurs de temps', 'Time connectors'),
    'g24-niv-b': SK('Connecteurs de cause, contraste et condition', 'Connectors of cause, contrast and condition'),
    'g24-niv-c': skS, 'g24-th': skS, 'g24-theme-1': skS, 'g24-theme-2': skS,
    'g24-niv-d': SK('Connecteurs : repérer et corriger', 'Connectors: spotting and correcting'),
    'g24-bonus': SK('Relier des phrases', 'Joining sentences'),
    'g24-m24b': SK('Ordre des mots', 'Word order')
  },
  sets: [
    S('g24-guidee-a', FICHE, ['Série guidée A : choisis le bon mot', 'Guided set A: choose the right word'], 'B1', ['Choisis le connecteur qui convient.', 'Choose the connector that fits.'], guideeA),
    S('g24-guidee-b', FICHE, ['Série guidée B : choisis le bon mot', 'Guided set B: choose the right word'], 'B1+', ['Choisis le connecteur qui convient.', 'Choose the connector that fits.'], guideeB),
    S('g24-niv-a', FICHE, ['Niveau A : le temps', 'Level A: time'], 'B1', ['Complète avec le connecteur de temps.', 'Complete with the time connector.'], nivA),
    S('g24-niv-b', FICHE, ['Niveau B : cause, contraste, condition', 'Level B: cause, contrast, condition'], 'B1+', ['Complète avec le connecteur qui convient.', 'Complete with the connector that fits.'], nivB),
    S('g24-niv-c', FICHE, ['Niveau C : thème', 'Level C: translation'], 'B1+', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], nivC),
    S('g24-niv-d', FICHE, ['Niveau D : erreurs à corriger', 'Level D: errors to correct'], 'B2', ['Corrige chaque phrase.', 'Correct each sentence.'], nivD),
    S('g24-bonus', FICHE, ['Bonus : relier des phrases', 'Bonus: joining sentences'], 'B2', ['Écris ta phrase, puis compare avec le modèle.', 'Write your sentence, then compare with the model.'], bonus),
    S('g24-devoir', FICHE, ['Devoir maison', 'Homework'], 'B1+', ['Quinze phrases : choisis le bon mot.', 'Fifteen sentences: choose the right word.'], devoir),
    S('g24-theme-1', FICHE, ['Thème 1 : traduis en anglais', 'Translation 1: into English'], 'B1+', ['Traduis, puis compare avec le modèle.', 'Translate, then compare with the model.'], theme1),
    S('g24-theme-2', FICHE, ['Thème 2 : traduis en anglais', 'Translation 2: into English'], 'B2', ['Traduis, puis compare avec le modèle.', 'Translate, then compare with the model.'], theme2),
    S('g24-m24a-1', MURPHY, ['Unité 24A : révision des connecteurs (1/2)', 'Unit 24A: connector review (1/2)'], 'B1', ['Choisis le bon mot.', 'Choose the right word.'], m24a1),
    S('g24-m24a-2', MURPHY, ['Unité 24A : révision des connecteurs (2/2)', 'Unit 24A: connector review (2/2)'], 'B1+', ['Choisis le bon mot.', 'Choose the right word.'], m24a2),
    S('g24-m24b', MURPHY, ['Unité 24B : remettre les mots dans l\'ordre', 'Unit 24B: sentence building'], 'B1+', ['Écris la phrase complète avec les mots dans le bon ordre.', 'Write the complete sentence with the words in the right order.'], m24b),
    S('g24-th', MURPHY, ['Unité TH : thème grammatical', 'Unit TH: translation'], 'B1+', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], th)
  ],
  recap: {
    blocks: [
      {
        title: 'Temps, cause, contraste',
        forms: [
          ['when / while / as', 'quand / pendant que / au moment où'],
          ['until / since / as soon as / once', "jusqu'à ce que / depuis que / dès que / une fois que"],
          ['because / as / since', 'parce que / comme / puisque'],
          ['although / though / even though', 'bien que / bien que (familier) / même si'],
          ['whereas / while', 'alors que / tandis que']
        ],
        uses: ['Après un connecteur de temps, on emploie le présent pour le futur.']
      },
      {
        title: 'Condition, but, conséquence, comparaison',
        forms: [
          ['if / unless / in case', 'si / à moins que / au cas où'],
          ['provided that / as long as', 'à condition que / tant que'],
          ['so that / in order that', 'afin que / afin que (formel)'],
          ['so / so ... that / such ... that', 'donc / si ... que / tel ... que'],
          ['as ... as / like / as', 'aussi ... que / comme + nom / comme + proposition'],
          ['both ... and / either ... or / neither ... nor / not only ... but also', 'à la fois ... et / soit ... soit / ni ... ni / non seulement ... mais aussi']
        ],
        uses: ['such + a + adjectif + nom ; so + adjectif seul.']
      }
    ],
    tables: [],
    notes: ['unless contient déjà la négation : pas de second not.', 'despite est suivi d\'un nom, pas d\'une proposition.'],
    rule: 'Repère la fonction (temps, cause, contraste, condition, but, conséquence) avant de choisir le connecteur.'
  },
  enMeta: {
    title: 'Conjunctions & Linking Words',
    recap: {
      blocks: [
        {
          title: 'Time, cause, contrast',
          forms: [
            ['when / while / as', 'at the time that / during / as it happens'],
            ['until / since / as soon as / once', 'up to the moment / from that moment / immediately after / after'],
            ['because / as / since', 'reason connectors'],
            ['although / though / even though', 'contrast connectors, the last one stronger'],
            ['whereas / while', 'opposition between two facts']
          ],
          uses: ['After a time connector, use the present for the future.']
        },
        {
          title: 'Condition, purpose, result, comparison',
          forms: [
            ['if / unless / in case', 'condition / if not / precaution'],
            ['provided that / as long as', 'condition that must be met'],
            ['so that / in order that', 'purpose, the second more formal'],
            ['so / so ... that / such ... that', 'result connectors'],
            ['as ... as / like / as', 'equal degree / like + noun / as + clause'],
            ['both ... and / either ... or / neither ... nor / not only ... but also', 'paired connectors']
          ],
          uses: ['such + a + adjective + noun; so + adjective alone.']
        }
      ],
      tables: [],
      notes: ['unless already contains the negative: no second not.', 'despite is followed by a noun phrase, not a clause.'],
      rule: 'Identify the function (time, cause, contrast, condition, purpose, result) before choosing the connector.'
    }
  }
};
