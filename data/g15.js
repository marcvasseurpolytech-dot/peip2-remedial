// G15 : Phrasal verbs en contexte professionnel
import { S, FICHE, MURPHY, F, OK, T, R, W, P, K, hint, SK } from './dsl2.js';
import { ch, E } from './dsl.js';

const RP = T('Remplace le groupe nominal par un pronom (it, them...).', 'Replace the noun phrase with a pronoun (it, them...).');
const PL = T("Place l'objet entre parenthèses et réécris la phrase (plusieurs places possibles).", 'Place the object in brackets and rewrite the sentence (several positions may be possible).');
const SEP = 'Verbe séparable : un pronom se place TOUJOURS entre le verbe et la particule.';
const SEPE = 'Separable verb: a pronoun ALWAYS goes between the verb and the particle.';

const guideeA = [
  K('The engineer ___ a new method to reduce production costs. (proposed)', [['came up with', 'put forward']], "L'ingénieur a proposé une nouvelle méthode pour réduire les coûts de production.", 'come up with / put forward = proposer.', 'come up with / put forward = suggest.'),
  K('We need to ___ this critical problem immediately. (handle)', [['deal with']], "Nous devons traiter ce problème critique immédiatement.", 'deal with = gérer, traiter.', 'deal with = handle, manage.'),
  K('The meeting was ___ due to the severe weather. (postponed)', [['put off']], "La réunion a été reportée à cause du mauvais temps.", 'put off = reporter.', 'put off = postpone.'),
  K('She ___ the logical error in the report. (mentioned)', [['pointed out']], "Elle a signalé l'erreur logique dans le rapport.", 'point out = signaler, souligner.', 'point out = draw attention to.'),
  K('The machine ___ in the middle of the live demonstration. (failed)', [['broke down']], "La machine est tombée en panne au milieu de la démonstration.", 'break down = tomber en panne.', 'break down = stop working.'),
  K('We ___ several experiments to test the hypothesis. (conducted)', [['carried out']], "Nous avons mené plusieurs expériences pour tester l'hypothèse.", 'carry out = effectuer.', 'carry out = perform.'),
  K('He ___ the possibility of a software bug. (excluded)', [['ruled out']], "Il a exclu la possibilité d'un bogue logiciel.", 'rule out = exclure.', 'rule out = exclude.'),
  K('She really ___ among the other candidates. (was distinctive)', [['stood out']], "Elle s'est vraiment distinguée parmi les autres candidats.", 'stand out = se distinguer.', 'stand out = be noticeable.'),
  K("Let's ___ the key findings before writing the conclusion. (review)", [['go over']], "Passons en revue les résultats clés avant de rédiger la conclusion.", 'go over = revoir.', 'go over = review.'),
  K('He ___ the new research group last year. (established)', [['set up']], "Il a créé le nouveau groupe de recherche l'an dernier.", 'set up = créer, établir.', 'set up = establish.')
];
const guideeB = [
  RP('She handed in her report.', ['She handed it in.'], "Elle l'a remis.", SEP, SEPE),
  RP('Please turn off the projector.', ['Please turn it off.'], "Éteignez-le, s'il vous plaît.", SEP, SEPE),
  RP('He put off the meeting.', ['He put it off.'], "Il l'a reporté.", SEP, SEPE),
  RP('She pointed out the error.', ['She pointed it out.'], "Elle l'a signalée.", SEP, SEPE),
  RP('They set up the new system.', ['They set it up.'], "Ils l'ont installé.", SEP, SEPE),
  RP('Back up your files!', ['Back them up!'], "Sauvegardez-les !", SEP, SEPE),
  RP('Can you look into the problem?', ['Can you look into it?'], "Peux-tu l'examiner ?", 'look into est inséparable : la particule reste collée au verbe, le pronom vient après.', 'look into is inseparable: the particle stays with the verb and the pronoun comes after.'),
  RP('We carried out the tests.', ['We carried them out.'], "Nous les avons effectués.", SEP, SEPE),
  RP('He ruled out a manufacturing defect.', ['He ruled it out.'], "Il l'a exclu.", SEP, SEPE),
  RP('She went over the figures.', ['She went over them.'], "Elle les a passés en revue.", 'go over est inséparable ici : le pronom vient après la particule.', 'go over is inseparable here: the pronoun comes after the particle.')
];
const nivA = [
  K('She ___ that the data had been corrupted. (discovered)', [['found out']], "Elle a découvert que les données avaient été corrompues.", 'find out = découvrir.', 'find out = discover.'),
  K('They ___ a new protocol for data management. (established)', [['set up']], "Ils ont mis en place un nouveau protocole de gestion des données.", 'set up = établir.', 'set up = establish.'),
  K("Don't ___ the project, it's almost complete! (abandon)", [['give up']], "N'abandonne pas le projet, il est presque terminé !", 'give up = abandonner.', 'give up = abandon.'),
  K('Please ___ your assignments by the end of the week. (submit)', [['hand in']], "Merci de rendre vos devoirs avant la fin de la semaine.", 'hand in = remettre.', 'hand in = submit.'),
  K('We ___ three separate experiments this month. (conducted)', [['carried out']], "Nous avons mené trois expériences distinctes ce mois-ci.", 'carry out = effectuer.', 'carry out = perform.'),
  K("Let's ___ the results one final time before submitting. (review)", [['go over']], "Repassons les résultats une dernière fois avant de les soumettre.", 'go over = revoir.', 'go over = review.'),
  K('He ___ the system using his new credentials. (accessed)', [['logged into', 'logged in to', 'logged on to', 'logged onto']], "Il s'est connecté au système avec ses nouveaux identifiants.", 'log into = se connecter à.', 'log into = connect to.'),
  K('Save your files before you close the application: ___ them ___. (save)', [['back'], ['up']], "Sauvegardez vos fichiers avant de fermer l'application.", 'back up = sauvegarder (pronom entre les deux).', 'back up = save a copy (pronoun in between).'),
  K('Can you ___ this unusual reading from the sensor? (investigate)', [['look into']], "Peux-tu examiner cette mesure inhabituelle du capteur ?", 'look into = examiner.', 'look into = investigate.'),
  K('She ___ a brilliant solution during the brainstorming session. (proposed)', [['came up with', 'put forward']], "Elle a proposé une solution brillante pendant la séance de remue-méninges.", 'come up with = proposer.', 'come up with = suggest.')
];
const nivB = [
  K('The server broke ___ during the critical backup process.', [['down']], "Le serveur est tombé en panne pendant la sauvegarde critique.", 'break down.', 'break down.'),
  K('She pointed ___ several inconsistencies in the data.', [['out']], "Elle a relevé plusieurs incohérences dans les données.", 'point out.', 'point out.'),
  K("He put ___ a new proposal at yesterday's meeting.", [['forward']], "Il a présenté une nouvelle proposition à la réunion d'hier.", 'put forward = proposer formellement.', 'put forward = propose formally.'),
  K('Turn ___ your microphone before the online presentation.', [['off']], "Éteignez votre micro avant la présentation en ligne.", 'turn off.', 'turn off.'),
  K('We need to look ___ this anomaly before the audit.', [['into']], "Il faut examiner cette anomalie avant l'audit.", 'look into.', 'look into.'),
  K('She came ___ with an innovative solution to the bottleneck.', [['up']], "Elle a trouvé une solution innovante au goulot d'étranglement.", 'come up with.', 'come up with.'),
  K("Don't give ___, the problem can be solved.", [['up']], "N'abandonne pas, le problème peut être résolu.", 'give up.', 'give up.'),
  K('They carried ___ a full review of the codebase.', [['out']], "Ils ont effectué une revue complète du code.", 'carry out.', 'carry out.'),
  K('Make sure to back ___ your data before the system update.', [['up']], "Pensez à sauvegarder vos données avant la mise à jour du système.", 'back up.', 'back up.'),
  K('She stood ___ at the interview thanks to her technical knowledge.', [['out']], "Elle s'est démarquée à l'entretien grâce à ses connaissances techniques.", 'stand out.', 'stand out.')
];
const nivC = [
  R("Nous allons examiner ce problème dès demain matin.", ['We will look into this problem first thing tomorrow morning.', "We'll look into this problem first thing tomorrow morning.", 'We are going to look into this problem first thing tomorrow morning.', 'We will look into this problem tomorrow morning.', "We're going to look into this problem first thing tomorrow."], 'look into = examiner (inséparable).', 'look into = investigate (inseparable).'),
  R("Elle a proposé une toute nouvelle approche à l'équipe.", ['She came up with a brand new approach for the team.', 'She put forward a brand new approach to the team.', 'She came up with a brand new approach to the team.', 'She put forward a brand-new approach to the team.', 'She came up with a brand-new approach for the team.'], 'come up with / put forward = proposer.', 'come up with / put forward = suggest.'),
  R("Il a fallu reporter la présentation d'une semaine.", ['The presentation had to be put off by one week.', 'The presentation had to be put off for a week.', 'We had to put off the presentation by a week.', 'We had to put the presentation off by one week.', 'The presentation had to be put off for one week.', 'We had to put off the presentation for a week.', 'We had to put off the presentation by one week.', 'We had to put the presentation off for a week.'], 'put off = reporter ; passif possible.', 'put off = postpone; a passive is possible.'),
  R("L'équipe a effectué plus de trente tests de sécurité.", ['The team carried out more than thirty security tests.', 'The team carried out over thirty security tests.', 'The team has carried out more than thirty security tests.', 'The team carried out more than 30 security tests.'], 'carry out = effectuer.', 'carry out = perform.'),
  R("Ne renonce pas, tu es presque arrivé au bout.", ["Don't give up, you are almost there.", "Don't give up, you're almost there.", 'Do not give up, you are almost there.', "Don't give up, you have almost made it.", "Don't give up, you've almost made it.", "Don't give up, you are nearly there.", "Don't give up, you're nearly there."], 'give up = renoncer.', 'give up = quit.')
];
const nivD = [
  P("Écris un courriel professionnel (5 à 7 phrases) qui informe ton équipe d'un problème technique et propose des solutions, avec au moins 5 phrasal verbs.", "Context: you are informing your team about a technical problem and proposing solutions. Write a professional email (5 to 7 sentences) using at least 5 different phrasal verbs: look into, come up with, put off, carry out, rule out, stand out, go over.", ['Dear team, the test server broke down this morning. I will look into the cause today and I have already ruled out a network failure. We should put off the demonstration until Friday. I would also like to carry out a full check of the backups. Let us go over the options at 3 pm, and please come up with any ideas before then. Best regards.'], 'Un pronom objet se place entre le verbe et la particule.', 'Context: you are informing your team about a technical problem and proposing solutions. Write a professional email (5 to 7 sentences) using at least 5 different phrasal verbs.', 'A pronoun object goes between the verb and the particle.')
];
const bonus = [
  P("Devine le sens : 'The merger fell through at the last minute.'", "'The merger fell through at the last minute.' What happened?", ['The merger did not happen; it was cancelled.'], 'fall through = échouer.', "What happened?", 'fall through = fail to happen.'),
  P("Devine le sens : 'She took over the department when the director left.'", "'She took over the department when the director left.' What does 'take over' mean?", ['She took control of the department.'], 'take over = prendre le relais.', "What does 'take over' mean?", 'take over = take control.'),
  P("Bonne ou mauvaise nouvelle ? 'The new product line is taking off.'", "'The new product line is taking off.' Is this good or bad news?", ['Good news: it is becoming successful quickly.'], 'take off = décoller.', 'Is this good or bad news?', 'take off = become successful quickly.'),
  P("Devine le sens : 'He turned down a lucrative offer from a competitor.'", "'He turned down a lucrative offer from a competitor.' What did he do?", ['He refused the offer.', 'He rejected the offer.'], 'turn down = refuser.', 'What did he do?', 'turn down = refuse.'),
  P("Devine le sens : 'The company is winding down its operations in the region.'", "'The company is winding down its operations in the region.' What is happening?", ['The company is gradually closing its activities in the region.'], 'wind down = réduire progressivement.', 'What is happening?', 'wind down = reduce gradually.')
];
const devoir = [
  K('She ___ an innovative solution to the energy efficiency problem.', [['came up with']], "Elle a trouvé une solution innovante au problème d'efficacité énergétique.", 'come up with.', 'come up with.'),
  K('The team ___ extensive performance tests on the new material.', [['carried out']], "L'équipe a mené de nombreux tests de performance sur le nouveau matériau.", 'carry out.', 'carry out.'),
  K("Don't ___, the solution is within reach if you persist.", [['give up']], "N'abandonne pas, la solution est à portée de main si tu persévères.", 'give up.', 'give up.'),
  K('We need to ___ why the server keeps restarting unexpectedly.', [['find out']], "Nous devons découvrir pourquoi le serveur redémarre sans arrêt.", 'find out.', 'find out.'),
  K('Please ___ your projects by the end of the academic week.', [['hand in']], "Merci de rendre vos projets avant la fin de la semaine universitaire.", 'hand in.', 'hand in.'),
  K('The manager ___ the presentation until the following Monday.', [['put off']], "Le responsable a reporté la présentation au lundi suivant.", 'put off.', 'put off.'),
  K("Let's ___ the main results together before the board meeting.", [['go over']], "Passons ensemble en revue les principaux résultats avant le conseil.", 'go over.', 'go over.'),
  K('The cooling system ___ during the experiment, causing delays.', [['broke down']], "Le système de refroidissement est tombé en panne pendant l'expérience, ce qui a causé des retards.", 'break down.', 'break down.'),
  K('They ___ a new workflow to improve team efficiency.', [['set up']], "Ils ont mis en place un nouveau flux de travail pour améliorer l'efficacité de l'équipe.", 'set up.', 'set up.'),
  K('The senior engineer will ___ the issue with the faulty sensor.', [['look into']], "L'ingénieur senior examinera le problème du capteur défectueux.", 'look into.', 'look into.'),
  K('Her original approach really ___ during the selection process.', [['stood out']], "Son approche originale s'est vraiment démarquée pendant la sélection.", 'stand out.', 'stand out.'),
  K('We cannot ___ a manufacturing defect at this stage.', [['rule out']], "Nous ne pouvons pas exclure un défaut de fabrication à ce stade.", 'rule out.', 'rule out.'),
  K('Always ___ your data before any system update.', [['back up']], "Sauvegardez toujours vos données avant toute mise à jour du système.", 'back up.', 'back up.'),
  K('It is increasingly difficult to ___ the rapid advances in AI.', [['keep up with']], "Il est de plus en plus difficile de suivre les avancées rapides de l'IA.", 'keep up with = suivre le rythme de.', 'keep up with = follow the pace of.'),
  K('She ___ several errors in the preliminary draft.', [['pointed out']], "Elle a relevé plusieurs erreurs dans la version préliminaire.", 'point out.', 'point out.')
];
const m15a1 = [
  PL('Turn (the machine) off.', ['Turn the machine off.', 'Turn off the machine.', 'Turn it off.'], "Éteins la machine.", 'Séparable : nom avant ou après la particule ; pronom entre les deux.', 'Separable: a noun goes before or after the particle; a pronoun goes in between.'),
  PL('Can you look (the problem) into?', ['Can you look into the problem?', 'Can you look into it?'], "Peux-tu examiner le problème ?", 'look into est inséparable.', 'look into is inseparable.'),
  PL('He handed (the form) in.', ['He handed the form in.', 'He handed in the form.', 'He handed it in.'], "Il a rendu le formulaire.", 'Séparable.', 'Separable.'),
  PL('They set (a new server) up.', ['They set a new server up.', 'They set up a new server.', 'They set it up.'], "Ils ont installé un nouveau serveur.", 'Séparable.', 'Separable.'),
  PL('She pointed (the fault) out.', ['She pointed the fault out.', 'She pointed out the fault.', 'She pointed it out.'], "Elle a signalé le défaut.", 'Séparable.', 'Separable.')
];
const m15a2 = [
  K('The pump broke ___ during the stress test.', [['down']], "La pompe est tombée en panne pendant le test de résistance.", 'break down.', 'break down.'),
  K('He came ___ with a smart workaround.', [['up']], "Il a trouvé une astuce intelligente.", 'come up with.', 'come up with.'),
  K("Don't give ___ now, keep going!", [['up']], "N'abandonne pas maintenant, continue !", 'give up.', 'give up.'),
  K('We should look ___ this error log.', [['into']], "Nous devrions examiner ce journal d'erreurs.", 'look into.', 'look into.'),
  K('He stood ___ among all the trainees.', [['out']], "Il s'est démarqué parmi tous les stagiaires.", 'stand out.', 'stand out.')
];
const m15b = [
  K('We are looking ___ ___ meeting you.', [['forward'], ['to']], "Nous sommes impatients de vous rencontrer.", 'look forward to.', 'look forward to.'),
  K("I can't put ___ ___ this delay any longer.", [['up'], ['with']], "Je ne peux plus supporter ce retard.", 'put up with.', 'put up with.'),
  K('How did he come ___ ___ that solution?', [['up'], ['with']], "Comment a-t-il trouvé cette solution ?", 'come up with.', 'come up with.'),
  K('She got ___ ___ missing the deadline.', [['away'], ['with']], "Elle s'en est tirée sans conséquence malgré l'échéance manquée.", 'get away with.', 'get away with.'),
  K('We need to cut ___ ___ paper waste.', [['down'], ['on']], "Nous devons réduire le gaspillage de papier.", 'cut down on.', 'cut down on.')
];
const m15c = [
  K('The start-up was taken ___ by a multinational group. (acquired)', [['over']], "La jeune pousse a été rachetée par un groupe multinational.", 'take over.', 'take over.'),
  K('He recently took ___ cycling to stay fit. (began)', [['up']], "Il s'est mis récemment au vélo pour rester en forme.", 'take up = se mettre à.', 'take up = start a hobby.'),
  K('We ran ___ of toner before the end of the print job. (exhausted our supply)', [['out']], "Nous avons manqué de toner avant la fin de l'impression.", 'run out of.', 'run out of.'),
  K('She ran ___ a former classmate at the trade fair. (met by chance)', [['into']], "Elle est tombée sur une ancienne camarade au salon professionnel.", 'run into = rencontrer par hasard.', 'run into = meet by chance.'),
  K("Let's quickly run ___ the slides before the call. (skim)", [['through']], "Parcourons rapidement les diapositives avant l'appel.", 'run through = parcourir.', 'run through = go through quickly.')
];
const m15d = [
  W("I / look / forward / to / hear / from / you / soon", ['I look forward to hearing from you soon.'], "J'ai hâte d'avoir de vos nouvelles bientôt.", 'look forward to + -ing.', 'look forward to + -ing.'),
  W('up / with / the / noise / put / he / cannot', ['He cannot put up with the noise.'], "Il ne supporte pas le bruit.", 'put up with.', 'put up with.'),
  W('up / came / they / with / plan / a / clever', ['They came up with a clever plan.'], "Ils ont trouvé un plan astucieux.", 'come up with.', 'come up with.'),
  W('over / the / was / taken / startup / by / a / bigger / group', ['The startup was taken over by a bigger group.'], "La jeune pousse a été rachetée par un groupe plus important.", 'take over au passif.', 'take over in the passive.'),
  W('of / ran / paper / out / we / printing / before / finished / was', ['We ran out of paper before printing was finished.', 'We ran out of paper before the printing was finished.'], "Nous avons manqué de papier avant la fin de l'impression.", 'run out of.', 'run out of.'),
  W('lights / the / off / turn / leaving / before', ['Turn the lights off before leaving.', 'Turn off the lights before leaving.'], "Éteins les lumières avant de partir.", 'turn off.', 'turn off.'),
  W('into / issue / look / the / you / will', ['Will you look into the issue?'], "Peux-tu examiner la question ?", 'look into est inséparable.', 'look into is inseparable.'),
  W('out / stood / among / she / the / speakers', ['She stood out among the speakers.'], "Elle s'est démarquée parmi les intervenants.", 'stand out.', 'stand out.')
];
const th = [
  R("Dans l'attente de vous lire.", ['I look forward to hearing from you.', 'We look forward to hearing from you.', 'I am looking forward to hearing from you.', 'We are looking forward to hearing from you.'], 'look forward to + -ing.', 'look forward to + -ing.'),
  R("Il a supporté ce bruit pendant des mois.", ['He put up with the noise for months.', 'He put up with this noise for months.', 'He has put up with the noise for months.', 'He has put up with this noise for months.'], 'put up with = supporter.', 'put up with = tolerate.'),
  R("Comment as-tu trouvé cette solution ?", ['How did you come up with that solution?', 'How did you come up with this solution?', 'How did you think of that solution?'], 'come up with = trouver (une idée).', 'come up with = think of.'),
  R("Le laboratoire a été racheté par un groupe plus grand.", ['The laboratory was taken over by a larger group.', 'The lab was taken over by a larger group.', 'The laboratory was taken over by a bigger group.', 'The lab was taken over by a bigger group.'], 'take over au passif.', 'take over in the passive.'),
  R("Nous avons manqué de temps avant la fin de l'essai.", ['We ran out of time before the end of the trial.', 'We ran out of time before the trial ended.', 'We ran out of time before the end of the test.', 'We ran out of time before the test ended.'], 'run out of.', 'run out of.'),
  R("Éteignez l'imprimante avant de la déplacer.", ['Turn the printer off before moving it.', 'Turn off the printer before moving it.', 'Switch the printer off before moving it.', 'Turn the printer off before you move it.', 'Turn off the printer before you move it.'], 'turn off ; moving it : pronom après le verbe.', 'turn off.'),
  R("Elle a été la meilleure de tous les candidats.", ['She stood out from all the candidates.', 'She stood out among all the candidates.', 'She stood out among all the applicants.', 'She stood out from all the applicants.'], 'stand out = se démarquer.', 'stand out = be distinctive.')
];

const XX = (...arrs) => arrs.reduce((a, b) => a.flatMap(x => b.map(y => x + y)), ['']);
const CHP = (s, o, k, fr, why, whyEn) => ch(s, o, k, fr, why, E(whyEn, null, { s, o }));
const vieA = [
  K('I usually ___ at seven every morning. (se lever)', [['get up']], "Je me lève en général à sept heures chaque matin.", 'get up = se lever.', 'get up = leave your bed.'),
  K('Please ___ your shoes before you come in. (retirer)', [['take off']], "Retirez vos chaussures avant d'entrer, s'il vous plaît.", 'take off = retirer (un vêtement).', 'take off = remove (clothing).'),
  K('She ___ her old car for a newer model. (l\'a échangée contre)', [['traded in', 'part-exchanged']], "Elle a échangé sa vieille voiture contre un modèle plus récent.", 'trade in = reprendre en échange d\'un achat.', 'trade in = give an old item as part payment for a new one.'),
  K('We ___ milk, so I went to the shop. (n\'avions plus de)', [['ran out of']], "Nous n'avions plus de lait, alors je suis allé au magasin.", 'run out of = être à court de.', 'run out of = have none left.'),
  K('He ___ his father: they have the same laugh. (ressemble à)', [['takes after']], "Il tient de son père : ils ont le même rire.", 'take after = tenir de, ressembler à (un parent).', 'take after = resemble an older relative.'),
  K('Can you ___ my cat while I am away? (garder)', [['look after']], "Peux-tu garder mon chat pendant mon absence ?", 'look after = s\'occuper de.', 'look after = take care of.'),
  K('The children ___ their toys after dinner. (ont rangé)', [['tidied up', 'put away', 'cleared up']], "Les enfants ont rangé leurs jouets après le dîner.", 'tidy up / put away = ranger.', 'tidy up / put away = put things in order.'),
  K("I'll ___ you at the station at six. (venir chercher)", [['pick up']], "Je viendrai te chercher à la gare à dix-huit heures.", 'pick up = aller chercher quelqu\'un.', 'pick up = collect someone.'),
  K('She ___ smoking last year. (a arrêté)', [['gave up']], "Elle a arrêté de fumer l'an dernier.", 'give up = abandonner, arrêter.', 'give up = stop doing something.'),
  K('Remember to ___ the lights when you leave. (éteindre)', [['turn off', 'switch off', 'put out']], "N'oublie pas d'éteindre les lumières en partant.", 'turn off / switch off = éteindre.', 'turn off / switch off = stop a light or machine.'),
  K('My flight ___ at six in the morning. (décolle)', [['takes off']], "Mon vol décolle à six heures du matin.", 'take off = décoller.', 'take off = leave the ground.'),
  K('We ___ a lovely little café on holiday. (sommes tombés par hasard sur)', [['came across', 'ran across', 'stumbled across', 'stumbled upon']], "Nous sommes tombés par hasard sur un charmant petit café pendant les vacances.", 'come across = trouver par hasard.', 'come across = find by chance.')
];
const vieB = [
  CHP('The car broke ___ on the motorway.', ['up', 'down'], 1, "La voiture est tombée en panne sur l'autoroute.", 'break down = tomber en panne.', 'break down = stop working.'),
  CHP("I'm looking ___ to the weekend.", ['forward', 'ahead'], 0, "J'ai hâte d'être au week-end.", 'look forward to = avoir hâte de.', 'look forward to = wait with pleasure for.'),
  CHP('She turned ___ the invitation to the party.', ['down', 'over'], 0, "Elle a décliné l'invitation à la fête.", 'turn down = refuser.', 'turn down = refuse.'),
  CHP("Hurry ___, we'll miss the bus!", ['on', 'up'], 1, "Dépêche-toi, nous allons rater le bus !", 'hurry up = se dépêcher.', 'hurry up = go faster.'),
  CHP('He grew ___ in a small village near the sea.', ['up', 'out'], 0, "Il a grandi dans un petit village près de la mer.", 'grow up = grandir.', 'grow up = become an adult.'),
  CHP('They split ___ after five years together.', ['up', 'off'], 0, "Ils se sont séparés après cinq ans de vie commune.", 'split up = se séparer.', 'split up = end a relationship.'),
  CHP('Please fill ___ this form in capital letters.', ['over', 'in'], 1, "Remplissez ce formulaire en majuscules, s'il vous plaît.", 'fill in = remplir (un formulaire).', 'fill in = complete a form.'),
  CHP("I can't put ___ with this noise any longer.", ['up', 'on'], 0, "Je ne supporte plus ce bruit.", 'put up with = supporter (trois éléments).', 'put up with = tolerate (three-part verb).'),
  CHP('The alarm went ___ at six.', ['away', 'off'], 1, "Le réveil a sonné à six heures.", 'go off = sonner.', 'go off = start ringing.'),
  CHP('She dropped her son ___ at school on her way to work.', ['off', 'out'], 0, "Elle a déposé son fils à l'école en allant travailler.", 'drop off = déposer quelqu\'un.', 'drop off = leave someone somewhere.'),
  CHP('Try ___ the jacket before you buy it.', ['up', 'on'], 1, "Essaie la veste avant de l'acheter.", 'try on = essayer (un vêtement).', 'try on = wear something to check the fit.'),
  CHP('He ran ___ his old teacher in the town centre.', ['into', 'off'], 0, "Il est tombé sur son ancien professeur au centre-ville.", 'run into = rencontrer par hasard.', 'run into = meet by chance.')
];
const vieC = [
  RP('She tried on the dress.', ['She tried it on.'], "Elle l'a essayée.", SEP, SEPE),
  RP('He picked up his daughter at school.', ['He picked her up at school.'], "Il est allé la chercher à l'école.", SEP, SEPE),
  RP('They threw away the old magazines.', ['They threw them away.'], "Ils les ont jetés.", SEP, SEPE),
  RP("I'll write down the address.", ["I'll write it down.", 'I will write it down.'], "Je la noterai.", SEP, SEPE),
  RP('Please switch on the heating.', ['Please switch it on.'], "Allumez-le, s'il vous plaît.", SEP, SEPE),
  RP('He gave back the keys.', ['He gave them back.'], "Il les a rendues.", SEP, SEPE),
  RP('She looked after her grandmother.', ['She looked after her.'], "Elle s'est occupée d'elle.", 'look after est inséparable : le pronom vient après la particule.', 'look after is inseparable: the pronoun comes after the particle.'),
  RP('We put away the groceries.', ['We put them away.'], "Nous les avons rangées.", SEP, SEPE)
];
const vieD = [
  F('He picked up it from the floor.', ['He picked it up from the floor.'], "Il l'a ramassé par terre.", SEP, SEPE),
  F("I'm looking forward to see you.", ["I'm looking forward to seeing you.", 'I am looking forward to seeing you.'], "J'ai hâte de te voir.", 'look forward to : to est une préposition, donc le verbe suivant prend -ing.', 'look forward to: to is a preposition, so the next verb takes -ing.'),
  OK('They called off the match because of the rain.', "Ils ont annulé le match à cause de la pluie.", 'call off = annuler : phrase correcte.', 'call off = cancel: the sentence is correct.'),
  F('We ran out the sugar.', ['We ran out of sugar.', 'We ran out of the sugar.'], "Nous n'avions plus de sucre.", 'run out of : il faut of devant le nom.', 'run out of: of is required before the noun.'),
  F('She gets on very good with her neighbours.', ['She gets on very well with her neighbours.', 'She gets along very well with her neighbours.', 'She gets on really well with her neighbours.'], "Elle s'entend très bien avec ses voisins.", 'Après un verbe, on emploie l\'adverbe well, pas l\'adjectif good.', 'After a verb, use the adverb well, not the adjective good.'),
  OK('Turn the lights off, please.', "Éteignez les lumières, s'il vous plaît.", 'turn off est séparable : phrase correcte.', 'turn off is separable: the sentence is correct.'),
  F('He gave up to smoke last year.', ['He gave up smoking last year.'], "Il a arrêté de fumer l'an dernier.", 'give up est suivi de -ing.', 'give up is followed by -ing.'),
  F("I can't put up it any longer.", ["I can't put up with it any longer.", 'I cannot put up with it any longer.'], "Je ne le supporte plus.", 'put up with est un verbe à trois éléments : with est obligatoire.', 'put up with is a three-part verb: with is required.'),
  F('The plane took of at noon.', ['The plane took off at noon.'], "L'avion a décollé à midi.", 'take off : off prend deux f.', 'take off: off has two f.'),
  F("I'll pick up you at eight.", ["I'll pick you up at eight.", 'I will pick you up at eight.'], "Je viendrai te chercher à huit heures.", SEP, SEPE)
];
const vieE = [
  R("Je m'entends très bien avec mes voisins.", XX(['I get on ', 'I get along '], ['very well ', 'really well ', 'well '], ['with my neighbours.', 'with my neighbors.'])),
  R("Il a fini par abandonner le piano.", XX(['He eventually gave up ', 'He finally gave up ', 'In the end he gave up ', 'In the end, he gave up '], ['the piano.', 'playing the piano.'])),
  R("Peux-tu t'occuper de mon chien ce week-end ?", XX(['Can you ', 'Could you ', 'Would you '], ['look after ', 'take care of '], ['my dog '], ['this weekend?', 'at the weekend?', 'over the weekend?', 'this weekend, please?']), 'look after = s\'occuper de.', 'look after = take care of.'),
  R("L'avion décolle à six heures.", ['The plane takes off at six.', 'The plane takes off at 6.', "The plane's taking off at six.", 'The plane is taking off at six.', 'The flight takes off at six.', 'The flight takes off at 6.'], 'take off = décoller.', 'take off = leave the ground.'),
  R("J'ai croisé un vieil ami en ville.", XX(['I ran into ', 'I bumped into ', 'I came across ', 'I ran across '], ['an old friend '], ['in town.', 'in the town centre.', 'in the town center.', 'in the city centre.', 'in the city center.', 'downtown.'])),
  R("Remplis ce formulaire et rends-le demain.", XX(['Fill in ', 'Fill out ', 'Complete '], ['this form and '], ['hand it in ', 'give it back ', 'return it ', 'turn it in ', 'bring it back '], ['tomorrow.'])),
  R("On a fini par manquer de lait.", XX(['We ran out of ', 'We have run out of ', 'We ran short of '], ['milk.'])),
  R("Elle a grandi à la campagne.", XX(['She grew up in the '], ['countryside.', 'country.']))
];
const A = SK('Sens des phrasal verbs professionnels', 'Meaning of workplace phrasal verbs');
const B = SK('Position de l\'objet : séparable ou inséparable', 'Object position: separable or inseparable');
export const G15 = {
  id: 'G15',
  title: 'Verbes à particule (Phrasal Verbs)',
  coursUrl: '',
  skills: {
    '*': A,
    'g15-guidee-b': B, 'g15-m15a-1': B, 'g15-m15d': B,
    'g15-niv-b': SK('Choix de la particule', 'Choosing the particle'), 'g15-m15a-2': SK('Choix de la particule', 'Choosing the particle'), 'g15-m15c': SK('Un même verbe, plusieurs particules', 'One verb, several particles'),
    'g15-m15b': SK('Phrasal verbs à trois éléments', 'Three-part phrasal verbs'),
    'g15-niv-c': SK('Phrasal verbs : thème', 'Phrasal verbs: translation'), 'g15-th': SK('Phrasal verbs : thème', 'Phrasal verbs: translation'),
    'g15-niv-d': SK('Phrasal verbs : production écrite', 'Phrasal verbs: written production'),
    'g15-bonus': SK('Phrasal verbs idiomatiques', 'Idiomatic phrasal verbs'),
    'g15-vie-a': SK('Phrasal verbs de la vie quotidienne', 'Everyday phrasal verbs'),
    'g15-vie-b': SK('Phrasal verbs du quotidien : choix de la particule', 'Everyday phrasal verbs: choosing the particle'),
    'g15-vie-c': B,
    'g15-vie-d': SK('Phrasal verbs du quotidien : repérer et corriger', 'Everyday phrasal verbs: spotting and correcting'),
    'g15-vie-e': SK('Phrasal verbs du quotidien : thème', 'Everyday phrasal verbs: translation')
  },
  sets: [
    S('g15-guidee-a', FICHE, ['Série guidée A : sens', 'Guided set A: meaning'], 'B1', ['Complète avec le phrasal verb au bon temps.', 'Complete with the phrasal verb in the right tense.'], guideeA),
    S('g15-guidee-b', FICHE, ['Série guidée B : position du pronom', 'Guided set B: position of the pronoun'], 'B1+', ['Remplace le groupe nominal par un pronom.', 'Replace the noun phrase with a pronoun.'], guideeB),
    S('g15-niv-a', FICHE, ['Niveau A : sens des phrasal verbs', 'Level A: meaning of phrasal verbs'], 'B1', ['Complète avec le phrasal verb équivalent au verbe entre parenthèses.', 'Complete with the phrasal verb that matches the verb in brackets.'], nivA),
    S('g15-niv-b', FICHE, ['Niveau B : particule correcte', 'Level B: the right particle'], 'B1+', ['Complète avec la bonne particule.', 'Complete with the right particle.'], nivB),
    S('g15-niv-c', FICHE, ['Niveau C : traduction', 'Level C: translation'], 'B1+', ['Traduis en anglais avec un phrasal verb.', 'Translate into English using a phrasal verb.'], nivC),
    S('g15-niv-d', FICHE, ['Niveau D : courriel professionnel', 'Level D: professional email'], 'B2', ['Rédige, puis compare avec le modèle.', 'Write, then compare with the model.'], nivD),
    S('g15-bonus', FICHE, ['Bonus : phrasal verbs idiomatiques', 'Bonus: idiomatic phrasal verbs'], 'B2', ['Devine le sens, puis compare avec le modèle.', 'Guess the meaning, then compare with the model.'], bonus),
    S('g15-devoir', FICHE, ['Devoir maison', 'Homework'], 'B1+', ['Quinze phrases à compléter avec le bon phrasal verb.', 'Fifteen sentences to complete with the right phrasal verb.'], devoir),
    S('g15-vie-a', FICHE, ['Vie quotidienne A : sens', 'Everyday life A: meaning'], 'B1', ['Complète avec le phrasal verb qui correspond à la traduction.', 'Complete with the phrasal verb that matches the translation.'], vieA),
    S('g15-vie-b', FICHE, ['Vie quotidienne B : la bonne particule', 'Everyday life B: the right particle'], 'B1', ['Choisis la particule qui convient.', 'Choose the particle that fits.'], vieB),
    S('g15-vie-c', FICHE, ['Vie quotidienne C : remplacer par un pronom', 'Everyday life C: replacing with a pronoun'], 'B1+', ['Remplace le groupe nominal par un pronom.', 'Replace the noun phrase with a pronoun.'], vieC),
    S('g15-vie-d', FICHE, ['Vie quotidienne D : repérer l\'erreur', 'Everyday life D: spot the error'], 'B1+', ['Corrige la phrase si elle est fausse, recopie-la si elle est correcte.', 'Correct the sentence if it is wrong, copy it if it is correct.'], vieD),
    S('g15-vie-e', FICHE, ['Vie quotidienne E : thème', 'Everyday life E: translation'], 'B1+', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], vieE),
    S('g15-m15a-1', MURPHY, ['Unité 15A : position de l\'objet (1/2)', 'Unit 15A: position of the object (1/2)'], 'B1+', ['Place l\'objet et réécris la phrase.', 'Place the object and rewrite the sentence.'], m15a1),
    S('g15-m15a-2', MURPHY, ['Unité 15A : particule (2/2)', 'Unit 15A: particle (2/2)'], 'B1', ['Complète avec la bonne particule.', 'Complete with the right particle.'], m15a2),
    S('g15-m15b', MURPHY, ['Unité 15B : phrasal verbs à trois éléments', 'Unit 15B: three-part phrasal verbs'], 'B1+', ['Complète avec les deux particules.', 'Complete with the two particles.'], m15b),
    S('g15-m15c', MURPHY, ['Unité 15C : une particule, un sens', 'Unit 15C: one particle, one meaning'], 'B2', ['Choisis la bonne particule.', 'Choose the right particle.'], m15c),
    S('g15-m15d', MURPHY, ['Unité 15D : remettre les mots dans l\'ordre', 'Unit 15D: sentence building'], 'B1+', ['Écris la phrase complète avec les mots dans le bon ordre.', 'Write the complete sentence with the words in the right order.'], m15d),
    S('g15-th', MURPHY, ['Unité TH : thème grammatical', 'Unit TH: translation'], 'B1+', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], th)
  ],
  recap: {
    blocks: [
      {
        title: 'Types de phrasal verbs',
        forms: [
          ['séparable', 'turn off the light / turn the light off / turn it off'],
          ['inséparable', 'look after someone, look into a problem (objet toujours après)'],
          ['intransitif', 'The plane took off. She gave up.'],
          ['trois éléments', 'look forward to, put up with, come up with, get away with, cut down on']
        ],
        uses: ['Pronom objet : TOUJOURS entre le verbe et la particule (turn it off), sauf verbe inséparable (look into it).']
      },
      {
        title: 'Phrasal verbs essentiels',
        forms: [
          ['carry out / set up / find out', 'effectuer / mettre en place / découvrir'],
          ['come up with / put forward', 'proposer'],
          ['deal with / look into / go over', 'gérer / examiner / revoir'],
          ['put off / give up / break down', 'reporter / abandonner / tomber en panne'],
          ['hand in / back up / keep up with', 'remettre / sauvegarder / suivre le rythme'],
          ['point out / rule out / stand out', 'signaler / exclure / se démarquer']
        ],
        uses: []
      }
    ],
    tables: [],
    notes: ['Le sens dépend de la particule : take off, take over et take up n\'ont rien à voir.'],
    rule: 'Pronom objet entre le verbe et la particule : turn it off, jamais turn off it.'
  },
  enMeta: {
    title: 'Phrasal Verbs',
    recap: {
      blocks: [
        {
          title: 'Types of phrasal verbs',
          forms: [
            ['separable', 'turn off the light / turn the light off / turn it off'],
            ['inseparable', 'look after someone, look into a problem (object always after)'],
            ['intransitive', 'The plane took off. She gave up.'],
            ['three-part', 'look forward to, put up with, come up with, get away with, cut down on']
          ],
          uses: ['Pronoun object: ALWAYS between the verb and the particle (turn it off), except with inseparable verbs (look into it).']
        },
        {
          title: 'Essential phrasal verbs',
          forms: [
            ['carry out / set up / find out', 'perform / establish / discover'],
            ['come up with / put forward', 'propose'],
            ['deal with / look into / go over', 'handle / investigate / review'],
            ['put off / give up / break down', 'postpone / abandon / stop working'],
            ['hand in / back up / keep up with', 'submit / save a copy / follow the pace'],
            ['point out / rule out / stand out', 'draw attention to / exclude / be distinctive']
          ],
          uses: []
        }
      ],
      tables: [],
      notes: ['The particle changes the meaning: take off, take over and take up are unrelated.'],
      rule: 'Pronoun object between the verb and the particle: turn it off, never turn off it.'
    }
  }
};
