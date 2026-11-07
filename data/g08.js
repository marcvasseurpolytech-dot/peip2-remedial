// G08 : Modal Verbs (les verbes modaux)
// Contenu reconstruit à partir de la fiche élève, du supplément Murphy et du corrigé enseignant du hub.
import { S, FICHE, MURPHY, C, T, F, R, W, P } from './dsl2.js';

const CF = 'Complète avec le modal le plus approprié.';
const CFE = 'Complete with the most appropriate modal.';
const hint = (fr, en) => [fr, en];
const K = (s, a, fr, why, whyEn, h) => C(s, a, fr, why, whyEn, h ? h[0] : null, h ? h[1] : null);

// Groupes d'équivalents acceptés
const PROHIB = ["mustn't", "can't", 'cannot', 'may not'];
const OBLIG = ['must', 'have to', 'has to'];
const NOTNEED = ["don't have to", "needn't", "don't need to", "doesn't have to", "doesn't need to"];

const guideeA = [
  K("You ___ wear a helmet in the lab, it's compulsory.", [['must', 'have to']], "Vous devez porter un casque dans le laboratoire, c'est obligatoire.", "Obligation imposée par une règle : must ou have to.", 'Obligation imposed by a rule: must or have to.', hint('règle imposée', 'imposed rule')),
  K("You ___ touch that wire, it's live!", [PROHIB], "Ne touchez pas ce fil, il est sous tension !", "Interdiction absolue : mustn't. You mustn't n'est pas You don't have to.", 'Absolute prohibition: mustn\'t. You mustn\'t is not You don\'t have to.', hint('interdiction absolue', 'absolute prohibition')),
  K("She ___ check her report again, there might be errors.", [['should', 'ought to']], "Elle devrait revérifier son rapport, il pourrait y avoir des erreurs.", "Conseil : should (ou ought to).", 'Advice: should (or ought to).', hint('conseil', 'advice')),
  K("You ___ come if you're busy, it's optional.", [NOTNEED], "Tu n'as pas besoin de venir si tu es occupé, c'est facultatif.", "Absence d'obligation : don't have to ou needn't. Ne pas confondre avec mustn't (interdit).", 'No obligation: don\'t have to or needn\'t. Not to be confused with mustn\'t (forbidden).', hint("pas d'obligation", 'no obligation')),
  K("He ___ be tired, he's worked 14 hours.", [['must']], "Il doit être fatigué, il a travaillé 14 heures.", "Déduction logique (quasi certaine) : must + base verbale. have to ne sert pas à déduire.", 'Logical deduction (almost certain): must + base verb. have to is not used to deduce.', hint('déduction logique', 'logical deduction')),
  K("___ I borrow your charger for a moment?", [['May', 'Could']], "Puis-je emprunter ton chargeur un instant ?", "Permission formelle : May I ...? ou Could I ...?", 'Formal permission: May I...? or Could I...?', hint('permission formelle', 'formal permission')),
  K("Students ___ use their phones during exams.", [PROHIB], "Les étudiants ne doivent pas utiliser leur téléphone pendant les examens.", "Interdiction fixée par un règlement : mustn't (ou can't, may not).", 'Prohibition set by a rule: mustn\'t (or can\'t, may not).', hint('interdiction par le règlement', 'prohibition by regulation')),
  K("She ___ speak four languages fluently.", [['can']], "Elle parle quatre langues couramment.", "Capacité au présent : can + base verbale.", 'Present ability: can + base verb.', hint('capacité', 'ability')),
  K("You ___ back up your data regularly.", [['should', 'must', 'ought to', 'need to']], "Tu devrais sauvegarder régulièrement tes données.", "Conseil fort : should, ought to ou must.", 'Strong advice: should, ought to or must.', hint('conseil fort', 'strong advice')),
  K("He ___ be the new director, I saw his name on the door.", [['must']], "Ce doit être le nouveau directeur, j'ai vu son nom sur la porte.", "Déduction logique appuyée sur un indice : must.", 'Logical deduction based on evidence: must.', hint('déduction logique', 'logical deduction'))
];

const guideeB = [
  K("She passed the exam without studying. She ___ (must / be) very smart.", [['must have been']], "Elle a réussi l'examen sans réviser. Elle doit être très intelligente.", "Déduction sur le passé : must have + participe passé (been).", 'Deduction about the past: must have + past participle (been).', hint('déduction passée', 'past deduction')),
  K("You ___ (should / tell) me about the problem earlier.", [['should have told', 'ought to have told']], "Tu aurais dû me parler du problème plus tôt.", "Reproche sur le passé : should have + participe passé (told).", 'Criticism about the past: should have + past participle (told).', hint('reproche sur le passé', 'criticism about the past')),
  K("He ___ (might / forget) the meeting, it's not like him.", [['might have forgotten', 'may have forgotten', 'could have forgotten']], "Il a peut-être oublié la réunion, ça ne lui ressemble pas.", "Possibilité passée : might have + participe passé (forgotten).", 'Past possibility: might have + past participle (forgotten).', hint('possibilité passée', 'past possibility')),
  K("She ___ (can't / do) that, she was abroad at the time.", [["can't have done", "couldn't have done", 'cannot have done']], "Elle n'a pas pu faire cela, elle était à l'étranger à ce moment-là.", "Impossibilité passée : can't have + participe passé (done).", 'Past impossibility: can\'t have + past participle (done).', hint('impossibilité passée', 'past impossibility')),
  K("I ___ (could / finish) earlier if I had started sooner.", [['could have finished']], "J'aurais pu finir plus tôt si j'avais commencé plus tôt.", "Possibilité non réalisée : could have + participe passé (finished).", 'Unrealised possibility: could have + past participle (finished).', hint('possibilité non réalisée', 'unrealised possibility')),
  K("You ___ (needn't / bring) food, we ordered catering.", [["needn't have brought", 'did not need to have brought']], "Tu n'avais pas besoin d'apporter à manger, nous avons commandé un traiteur.", "Effort inutile : needn't have + participe passé (brought). L'action a bien eu lieu.", 'Unnecessary effort: needn\'t have + past participle (brought). The action did happen.', hint("regret d'un effort inutile", 'regret about an unnecessary effort')),
  K("She ___ (must / leave) already, her bag is gone.", [['must have left']], "Elle a dû partir déjà, son sac a disparu.", "Déduction passée : must have left.", 'Past deduction: must have left.', hint('déduction passée', 'past deduction')),
  K("He ___ (should / apply) for that position, he'd have been perfect.", [['should have applied', 'ought to have applied']], "Il aurait dû postuler à ce poste, il aurait été parfait.", "Regret : should have applied.", 'Regret: should have applied.', hint('regret', 'regret')),
  K("They ___ (may / receive) the email, we're not sure.", [['may have received', 'might have received', 'could have received']], "Ils ont peut-être reçu le courriel, nous n'en sommes pas sûrs.", "Possibilité passée incertaine : may have received.", 'Uncertain past possibility: may have received.', hint('possibilité passée', 'past possibility')),
  K("I ___ (could / do) better if I ___ (have) more data.", [['could have done'], ['had had']], "J'aurais pu faire mieux si j'avais eu plus de données.", "Possibilité non réalisée : could have done. Type 3 : If I had had (Past Perfect de have).", 'Unrealised possibility: could have done. Type 3: If I had had (past perfect of have).', hint('possibilité non réalisée', 'unrealised possibility'))
];

const nivA = [
  K("Students ___ use their phones during exams, it's strictly forbidden.", [PROHIB], "Les étudiants ne doivent pas utiliser leur téléphone pendant les examens, c'est strictement interdit.", "Interdiction : mustn't.", 'Prohibition: mustn\'t.'),
  K("You ___ submit the report by Friday, it's a hard deadline.", [['must', 'have to']], "Vous devez rendre le rapport avant vendredi, c'est une date limite ferme.", "Obligation : must ou have to (règle externe).", 'Obligation: must or have to (external rule).'),
  K("She ___ speak English and German fluently.", [['can']], "Elle parle couramment l'anglais et l'allemand.", "Capacité : can.", 'Ability: can.'),
  K("You ___ come early tomorrow, the meeting starts at 10.", [NOTNEED], "Tu n'as pas besoin de venir tôt demain, la réunion commence à 10 h.", "Pas nécessaire : don't have to ou needn't.", 'Not necessary: don\'t have to or needn\'t.'),
  K("He ___ be the new director, I saw his name on the list.", [['must']], "Ce doit être le nouveau directeur, j'ai vu son nom sur la liste.", "Déduction : must.", 'Deduction: must.')
];
const nivB = [
  K("We ___ cancel the experiment, the equipment isn't working.", [['have to', 'must', 'will have to', 'need to']], "Nous devons annuler l'expérience, l'équipement ne fonctionne pas.", "Obligation imposée par les circonstances : have to (ou must).", 'Obligation imposed by circumstances: have to (or must).'),
  K("You ___ always back up your data, it's crucial.", [['should', 'must', 'ought to']], "Tu devrais toujours sauvegarder tes données, c'est essentiel.", "Conseil fort : should, ought to ou must.", 'Strong advice: should, ought to or must.'),
  K("I ___ help you if you need it, just ask.", [['can', 'could', 'will']], "Je peux t'aider si tu en as besoin, il suffit de demander.", "Offre d'aide : can (ou could, will).", 'Offer of help: can (or could, will).'),
  K("They ___ have arrived late, the traffic was terrible yesterday.", [['might', 'may', 'could', 'must']], "Ils sont peut-être arrivés en retard, la circulation était terrible hier.", "Possibilité passée : might (ou may, could) + have + participe passé. must est possible si on est sûr.", 'Past possibility: might (or may, could) + have + past participle. must is possible if you are sure.'),
  K("She ___ have forgotten to save her work, it's all gone.", [['must']], "Elle a dû oublier d'enregistrer son travail, tout a disparu.", "Déduction forte appuyée sur une preuve (tout a disparu) : must have.", 'Strong deduction backed by evidence (it is all gone): must have.'),
  K("You ___ eat in the lab, health regulations.", [PROHIB], "Il est interdit de manger au laboratoire, règlement sanitaire.", "Interdiction fixée par un règlement : mustn't.", 'Prohibition set by regulations: mustn\'t.'),
  K("I ___ study harder, I want to improve my TOEIC score.", [['should', 'must', 'ought to', 'need to', 'have to']], "Je devrais travailler plus, je veux améliorer mon score au TOEIC.", "Résolution personnelle : should ou must.", 'Personal resolution: should or must.'),
  K("He ___ have told me, I would have helped.", [['should', 'ought to']], "Il aurait dû me le dire, je l'aurais aidé.", "Reproche : should have told.", 'Criticism: should have told.'),
  K("She ___ have passed her exam, she looks so happy!", [['must']], "Elle a dû réussir son examen, elle a l'air si heureuse !", "Déduction : must have passed.", 'Deduction: must have passed.'),
  K("We ___ delay this decision any longer.", [["can't", 'cannot', "mustn't"]], "Nous ne pouvons plus retarder cette décision.", "Impossibilité pratique ou interdit : can't (ou mustn't).", 'Practical impossibility or ban: can\'t (or mustn\'t).')
];

const nivC = [
  F('She can to speak three languages.', ['She can speak three languages.'], "Elle parle trois langues.", "Pas de to après un modal : can + base verbale.", 'No to after a modal: can + base verb.'),
  F('You must to wear a badge.', ['You must wear a badge.'], "Vous devez porter un badge.", "Pas de to après must.", 'No to after must.'),
  F('He should have told to me.', ['He should have told me.'], "Il aurait dû me le dire.", "told est suivi directement du pronom : told me (pas told to me).", 'told is followed directly by the pronoun: told me (not told to me).'),
  F("She couldn't have be there, she was in Lyon.", ["She can't have been there, she was in Lyon.", "She couldn't have been there, she was in Lyon.", 'She cannot have been there, she was in Lyon.'], "Elle ne peut pas avoir été là, elle était à Lyon.", "Après modal + have, il faut le participe passé : been (pas be).", 'After modal + have, the past participle is needed: been (not be).'),
  F("You don't must enter without permission.", ["You mustn't enter without permission.", 'You must not enter without permission.', "You can't enter without permission.", 'You cannot enter without permission.', 'You may not enter without permission.'], "Vous ne devez pas entrer sans autorisation.", "must n'est pas un auxiliaire de do : la négation est mustn't.", 'must does not take do: the negative is mustn\'t.'),
  R("Tu n'es pas obligé de venir si tu es occupé.", ["You don't have to come if you're busy.", "You needn't come if you're busy.", "You don't need to come if you're busy.", "You do not have to come if you are busy."], "pas obligé de = don't have to ou needn't. Surtout pas mustn't.", 'The French idea of no obligation is don\'t have to or needn\'t. Never mustn\'t.'),
  R("Elle doit être très fatiguée, elle travaille depuis l'aube.", ["She must be very tired, she's been working since dawn.", 'She must be very tired, she has been working since dawn.', "She must be very tired as she's been working since dawn.", "She must be really tired, she's been working since dawn."], "Déduction : must be. depuis l'aube avec une action en cours : present perfect continuous.", 'Deduction: must be. depuis l\'aube with an ongoing action: present perfect continuous.'),
  R("Il aurait dû me prévenir plus tôt.", ['He should have warned me earlier.', 'He should have told me earlier.', 'He should have let me know earlier.', 'He ought to have warned me earlier.', 'He should have warned me sooner.', 'He should have told me sooner.', 'He ought to have told me earlier.'], "Reproche sur le passé : should have + participe passé.", 'Criticism about the past: should have + past participle.'),
  R("Vous ne devez pas photographier dans ce laboratoire.", ["You mustn't take photos in this laboratory.", 'You must not take photos in this laboratory.', "You mustn't take photographs in this laboratory.", 'You must not take photographs in this laboratory.', "You mustn't take pictures in this laboratory.", "You mustn't take photos in this lab.", "You mustn't take photographs in this lab.", 'You must not take photos in this lab.', "You are not allowed to take photos in this laboratory.", "You aren't allowed to take photos in this laboratory."], "Interdiction : mustn't.", 'Prohibition: mustn\'t.'),
  R("Ils ont peut-être reçu un courriel mais ils n'ont pas répondu.", ["They may have received an email but they didn't reply.", "They might have received an email but they didn't reply.", "They may have received an email, but they didn't reply.", "They might have received an email, but they didn't reply.", "They may have received an e-mail but they didn't reply.", "They might have received an e-mail but they didn't reply.", "They may have received an email but they didn't respond.", "They might have received an email but they didn't respond.", "They could have received an email but they didn't reply.", "They may have received an email but did not reply.", "They might have received an email but did not reply."], "Possibilité passée : may/might have + participe passé. Le second verbe est un fait certain : didn't reply.", 'Past possibility: may/might have + past participle. The second verb is a certain fact: didn\'t reply.')
];

const nivD = [
  P("Réécris avec un modal, dans un registre moins formel.", "You are required to submit the form.", ['You have to submit the form.', 'You must submit the form.'], "Obligation : have to (plus informel) ou must.", "Rewrite with a modal, in a less formal register.", 'Obligation: have to (more informal) or must.'),
  P("Réécris avec un modal.", "Perhaps she has misunderstood the brief.", ['She may have misunderstood the brief.', 'She might have misunderstood the brief.', 'She could have misunderstood the brief.'], "Possibilité passée : modal + have + participe passé.", "Rewrite with a modal.", 'Past possibility: modal + have + past participle.'),
  P("Réécris avec un modal.", "It is not permitted to enter the server room.", ["You mustn't enter the server room.", 'You must not enter the server room.', "You can't enter the server room.", 'You may not enter the server room.'], "Interdiction : mustn't (ou may not, plus formel).", "Rewrite with a modal.", 'Prohibition: mustn\'t (or may not, more formal).'),
  P("Réécris avec un modal.", "I recommend that you revise your figures.", ['You should revise your figures.', 'You ought to revise your figures.'], "Conseil : should ou ought to.", "Rewrite with a modal.", 'Advice: should or ought to.'),
  P("Réécris avec un modal.", "It is possible that the deadline will be extended.", ['The deadline may be extended.', 'The deadline might be extended.', 'The deadline could be extended.'], "Possibilité future : may, might ou could + be + participe passé.", "Rewrite with a modal.", 'Future possibility: may, might or could + be + past participle.')
];

const bonus = [
  K("The system ___ be updated before the next audit.", [['must', 'has to', 'needs to']], "Le système doit être mis à jour avant le prochain audit.", "Obligation : must (ou has to).", 'Obligation: must (or has to).', hint('obligation', 'obligation')),
  K("Several vulnerabilities ___ have been introduced during the last patch.", [['may', 'might', 'could']], "Plusieurs failles ont peut-être été introduites lors du dernier correctif.", "Possibilité passée : may/might/could + have been.", 'Past possibility: may/might/could + have been.', hint('possibilité passée', 'past possibility')),
  K("Engineers ___ review the code carefully.", [['should', 'ought to', 'must']], "Les ingénieurs devraient relire le code avec soin.", "Conseil : should (ou ought to).", 'Advice: should (or ought to).', hint('conseil', 'advice')),
  K("Under no circumstances ___ anyone modify the core database without authorisation.", [['must', 'should', 'may', 'can']], "En aucun cas personne ne doit modifier la base de données centrale sans autorisation.", "Interdiction : après Under no circumstances, l'inversion s'impose : must anyone modify (ou should, may).", 'Prohibition: after Under no circumstances, inversion is required: must anyone modify (or should, may).', hint('interdiction avec inversion', 'prohibition with inversion')),
  K("The new protocol ___ significantly reduce downtime.", [['could', 'can', 'will be able to', 'should', 'may', 'might']], "Le nouveau protocole pourrait réduire sensiblement les temps d'arrêt.", "Capacité ou potentiel : could (ou can, will be able to).", 'Capability or potential: could (or can, will be able to).', hint('capacité future', 'future ability')),
  K("This ___ take several months to implement fully.", [['may', 'might', 'could', 'will']], "Cela pourrait prendre plusieurs mois à mettre pleinement en œuvre.", "Possibilité : may (ou might, could).", 'Possibility: may (or might, could).', hint('possibilité', 'possibility'))
];

const devoir = [
  K("You ___ smoke in the building, it's absolutely forbidden.", [PROHIB], "Il est interdit de fumer dans le bâtiment.", "Interdiction : mustn't.", 'Prohibition: mustn\'t.'),
  K("She ___ speak four languages, she's trilingual.", [['can']], "Elle parle quatre langues, elle est trilingue.", "Capacité : can.", 'Ability: can.'),
  K("He ___ have left already, his coat is gone.", [['must']], "Il a dû partir déjà, son manteau a disparu.", "Déduction : must have left.", 'Deduction: must have left.'),
  K("You ___ revise your notes before the presentation.", [['should', 'ought to', 'must', 'need to']], "Tu devrais relire tes notes avant la présentation.", "Conseil : should.", 'Advice: should.'),
  K("I ___ attend the team dinner tomorrow, it's optional.", [NOTNEED], "Je ne suis pas obligé d'assister au dîner d'équipe demain, c'est facultatif.", "Pas d'obligation : don't have to ou needn't.", 'No obligation: don\'t have to or needn\'t.'),
  K("They ___ have made an error, the results don't add up.", [['must']], "Ils ont dû faire une erreur, les résultats ne concordent pas.", "Déduction : must have made.", 'Deduction: must have made.'),
  K("You ___ worry too much, everything will work out.", [["shouldn't", "needn't", "don't have to", "mustn't", "don't need to"]], "Tu ne devrais pas trop t'inquiéter, tout va s'arranger.", "Conseil négatif : shouldn't.", 'Negative advice: shouldn\'t.'),
  K("She ___ have passed the test, she's celebrating!", [['must']], "Elle a dû réussir le test, elle fait la fête !", "Déduction : must have passed.", 'Deduction: must have passed.'),
  K("We ___ submit the report now, the deadline is next week.", [NOTNEED], "Nous n'avons pas besoin de rendre le rapport maintenant, la date limite est la semaine prochaine.", "Pas nécessaire : don't have to ou needn't.", 'Not necessary: don\'t have to or needn\'t.'),
  K("He ___ have called me, I missed an important update.", [['should', 'ought to']], "Il aurait dû m'appeler, j'ai manqué une mise à jour importante.", "Reproche : should have called.", 'Criticism: should have called.'),
  K("Students ___ enter the clean room without protective gear.", [PROHIB], "Les étudiants ne doivent pas entrer en salle blanche sans équipement de protection.", "Interdiction : mustn't.", 'Prohibition: mustn\'t.'),
  K("She ___ (ability) solve complex differential equations.", [['can']], "Elle sait résoudre des équations différentielles complexes.", "Capacité : can.", 'Ability: can.'),
  K("The device ___ be connected before switching it on, safety requirement.", [['must', 'has to', 'needs to']], "L'appareil doit être branché avant d'être allumé, exigence de sécurité.", "Obligation de sécurité : must.", 'Safety obligation: must.'),
  K("You ___ have come so early, we weren't ready yet.", [["needn't", "shouldn't"]], "Tu n'avais pas besoin de venir si tôt, nous n'étions pas encore prêts.", "Effort inutile : needn't have come. shouldn't have come est possible comme reproche léger.", 'Unnecessary effort: needn\'t have come. shouldn\'t have come is possible as a mild criticism.'),
  K("He ___ be the engineer who designed this, look at the blueprint signature.", [['must']], "Ce doit être l'ingénieur qui a conçu ceci, regarde la signature sur le plan.", "Déduction appuyée sur un indice : must.", 'Deduction backed by evidence: must.')
];

const m8a = [
  K("You ___ come early, it's optional.", [NOTNEED], "Tu n'as pas besoin de venir tôt, c'est facultatif.", "Pas d'obligation : don't have to.", 'No obligation: don\'t have to.', hint('mustn\'t ou don\'t have to ?', 'mustn\'t or don\'t have to?')),
  K("You ___ use your phone during exams, it's strictly forbidden.", [PROHIB], "Vous ne devez pas utiliser votre téléphone pendant les examens, c'est strictement interdit.", "Interdiction : mustn't.", 'Prohibition: mustn\'t.', hint('mustn\'t ou don\'t have to ?', 'mustn\'t or don\'t have to?')),
  K("She ___ call her supervisor, she feels it's urgent.", [['must']], "Elle doit appeler son responsable, elle sent que c'est urgent.", "Obligation interne (son ressenti) : must.", 'Internal obligation (her own feeling): must.', hint('obligation interne ou externe ?', 'internal or external obligation?')),
  K("Employees ___ badge in every morning, company policy.", [['have to', 'must']], "Les employés doivent badger chaque matin, c'est la politique de l'entreprise.", "Obligation externe (règle de l'entreprise) : have to.", 'External obligation (company rule): have to.', hint('obligation interne ou externe ?', 'internal or external obligation?')),
  K("You ___ worry, everything is under control.", [NOTNEED], "Tu n'as pas besoin de t'inquiéter, tout est sous contrôle.", "Pas nécessaire : don't have to worry. Mustn't worry changerait le sens en interdiction.", 'Not necessary: don\'t have to worry. Mustn\'t worry would turn it into a prohibition.', hint('mustn\'t ou don\'t have to ?', 'mustn\'t or don\'t have to?'))
];
const m8b = [
  K("She passed without revising, she ___ (must / be) very well-prepared.", [['must have been']], "Elle a réussi sans réviser, elle devait être très bien préparée.", "Déduction passée : must have been.", 'Past deduction: must have been.'),
  K("You ___ (should / tell) me earlier, I would have helped.", [['should have told', 'ought to have told']], "Tu aurais dû me le dire plus tôt, je t'aurais aidé.", "Reproche : should have told.", 'Criticism: should have told.'),
  K("He ___ (can't / do) it, he was in a meeting all afternoon.", [["can't have done", "couldn't have done", 'cannot have done']], "Il ne peut pas l'avoir fait, il était en réunion tout l'après-midi.", "Impossibilité passée : can't have done.", 'Past impossibility: can\'t have done.'),
  K("They ___ (might / forget) to attach the file.", [['might have forgotten', 'may have forgotten', 'could have forgotten']], "Ils ont peut-être oublié de joindre le fichier.", "Possibilité passée : might have forgotten.", 'Past possibility: might have forgotten.'),
  K("We ___ (could / finish) earlier if we had started sooner.", [['could have finished']], "Nous aurions pu finir plus tôt si nous avions commencé plus tôt.", "Possibilité non réalisée : could have finished.", 'Unrealised possibility: could have finished.')
];
const m8c = [
  K("She ___ (not / attend) the meeting yesterday, she was ill.", [["wasn't able to attend", "couldn't attend", 'was not able to attend', 'could not attend']], "Elle n'a pas pu assister à la réunion hier, elle était malade.", "Passé négatif : couldn't ou wasn't able to sont tous deux corrects.", 'Negative past: couldn\'t and wasn\'t able to are both correct.'),
  K("After the update, the system ___ (process) twice as much data.", [['can process', 'is able to process']], "Après la mise à jour, le système peut traiter deux fois plus de données.", "Capacité présente : can process (ou is able to process).", 'Present ability: can process (or is able to process).'),
  K("Despite the storm, the pilot ___ (land) the plane safely.", [['was able to land', 'managed to land']], "Malgré la tempête, le pilote a réussi à poser l'avion en toute sécurité.", "Réussite ponctuelle au passé : was able to (ou managed to), jamais could.", 'One-off success in the past: was able to (or managed to), never could.'),
  K("I hope I ___ (finish) the project by Friday.", [['will be able to finish', 'can finish', 'am able to finish']], "J'espère pouvoir finir le projet d'ici vendredi.", "Futur : will be able to finish (can n'a pas de futur).", 'Future: will be able to finish (can has no future form).'),
  K("He ___ (already / speak) English when he moved to London.", [['could already speak', 'was already able to speak', 'could speak already', 'was able to speak already']], "Il parlait déjà anglais quand il a déménagé à Londres.", "Capacité générale au passé : could.", 'General ability in the past: could.'),
  K("We haven't ___ (fix) the bug yet.", [['been able to fix']], "Nous n'avons pas encore pu corriger le bogue.", "Temps composé : can n'existe pas au present perfect, on emploie been able to.", 'Compound tense: can does not exist in the present perfect, so use been able to.')
];
const m8d = [
  K("___ I use your computer for a minute?", [['May']], "Puis-je utiliser votre ordinateur une minute ?", "Permission formelle : May I...?", 'Formal permission: May I...?', hint('permission formelle', 'formal permission')),
  K("The meeting ___ be postponed, nothing is confirmed yet.", [['might', 'may', 'could']], "La réunion sera peut-être reportée, rien n'est encore confirmé.", "Possibilité : might ou may (might est moins sûr).", 'Possibility: might or may (might is less sure).'),
  K("Visitors ___ not enter the server room without a badge.", [['may', 'must']], "Les visiteurs ne peuvent pas entrer sans badge.", "Règlement formel : may not.", 'Formal regulation: may not.', hint('règlement formel', 'formal regulation')),
  K("She ___ be late, her train was delayed.", [['might', 'may', 'could']], "Elle sera peut-être en retard, son train a été retardé.", "Possibilité incertaine : might ou may.", 'Uncertain possibility: might or may.', hint('possibilité incertaine', 'uncertain possibility')),
  K("___ I remind you that the deadline is Friday?", [['May', 'Might']], "Puis-je vous rappeler que la date limite est vendredi ?", "Formule formelle : May I remind you...?", 'Formal phrase: May I remind you...?')
];
const m8e = [
  K("You ___ (update) your password every three months.", [['should update', 'ought to update']], "Tu devrais changer ton mot de passe tous les trois mois.", "Conseil : should + base verbale.", 'Advice: should + base verb.'),
  K("He ___ (not / ignore) the safety instructions.", [["shouldn't ignore", 'should not ignore', 'ought not to ignore']], "Il ne devrait pas ignorer les consignes de sécurité.", "Conseil négatif : shouldn't ignore.", 'Negative advice: shouldn\'t ignore.'),
  K("We really ___ (thank) the whole team for their effort.", [['ought to thank', 'should thank']], "Nous devrions vraiment remercier toute l'équipe pour son effort.", "Conseil : ought to thank (ou should thank).", 'Advice: ought to thank (or should thank).'),
  K("You ___ (not / worry) so much, it's under control.", [["shouldn't worry", 'should not worry', "needn't worry"]], "Tu ne devrais pas t'inquiéter autant, c'est sous contrôle.", "Conseil négatif : shouldn't worry.", 'Negative advice: shouldn\'t worry.'),
  K("They ___ (check) the results before submitting them.", [['should check', 'ought to check']], "Ils devraient vérifier les résultats avant de les soumettre.", "Conseil : should check.", 'Advice: should check.')
];
const REQ = T("Formule la question adaptée (utilise le modal indiqué).", 'Write the question that suits the situation (use the modal given).');
const m8f = [
  P("Formule la question adaptée à la situation, avec Shall.", "You want to offer to help a colleague carry boxes. (Shall)", ['Shall I help you with those boxes?', 'Shall I help you carry those boxes?', 'Shall I carry those boxes for you?', 'Shall I help you carry the boxes?'], "Shall I... ? sert à proposer de faire quelque chose.", "Write the question that suits the situation, with Shall.", 'Shall I...? is used to offer to do something.'),
  P("Formule la question adaptée à la situation, avec Could.", "You politely ask your manager to review your report. (Could)", ['Could you please review my report?', 'Could you review my report, please?', 'Could you please review my report for me?'], "Could you...? est une demande polie.", "Write the question that suits the situation, with Could.", 'Could you...? is a polite request.'),
  P("Formule la question adaptée à la situation, avec May.", "You ask permission to leave early, in a formal context. (May)", ['May I leave early today?', 'May I leave early?', 'May I leave early, please?'], "May I...? est la demande de permission formelle.", "Write the question that suits the situation, with May.", 'May I...? is the formal request for permission.'),
  P("Formule la question adaptée à la situation, avec Would... like.", "You offer coffee to a visitor. (Would... like)", ['Would you like some coffee?', 'Would you like a coffee?', 'Would you like a cup of coffee?'], "Would you like...? est l'offre polie.", "Write the question that suits the situation, with Would... like.", 'Would you like...? is the polite offer.'),
  P("Formule la question adaptée à la situation, avec Can.", "You ask a colleague, informally, to close the window. (Can)", ['Can you close the window?', 'Can you close the window, please?', 'Can you please close the window?'], "Can you...? est la demande informelle.", "Write the question that suits the situation, with Can.", 'Can you...? is the informal request.')
];
const m8g = [
  W('back up / should / files / your / you / regularly', ['You should back up your files regularly.'], "Tu devrais sauvegarder régulièrement tes fichiers.", 'Sujet + modal + verbe + complément + adverbe.', 'Subject + modal + verb + object + adverb.'),
  W('marathon / able / was / the / finish / she / to', ['She was able to finish the marathon.'], "Elle a réussi à terminer le marathon.", 'Réussite ponctuelle au passé : was able to + base verbale.', 'One-off success in the past: was able to + base verb.'),
  W('send / could / file / please / you / me / the', ['Could you send me the file, please?', 'Could you please send me the file?', 'Please could you send me the file?'], "Pourriez-vous m'envoyer le fichier, s'il vous plaît ?", 'Demande polie : Could you + verbe...?', 'Polite request: Could you + verb...?'),
  W('forgotten / file / have / might / the / he', ['He might have forgotten the file.'], "Il a peut-être oublié le fichier.", 'Possibilité passée : might have + participe passé.', 'Past possibility: might have + past participle.'),
  W('question / ask / I / may / a / you', ['May I ask you a question?'], "Puis-je vous poser une question ?", 'Permission formelle : May I + verbe...?', 'Formal permission: May I + verb...?'),
  W('morning / badge / must / every / employees / in', ['Employees must badge in every morning.'], "Les employés doivent badger chaque matin.", 'Obligation : must + base verbale.', 'Obligation: must + base verb.'),
  W('ignore / shouldn\'t / warning / you / the', ["You shouldn't ignore the warning."], "Tu ne devrais pas ignorer l'avertissement.", 'Conseil négatif : shouldn\'t + base verbale.', 'Negative advice: shouldn\'t + base verb.'),
  W('badge / a / enter / may / without / not / visitors', ['Visitors may not enter without a badge.'], "Les visiteurs ne peuvent pas entrer sans badge.", 'Règlement formel : may not + base verbale.', 'Formal regulation: may not + base verb.')
];
const th = [
  R("Tu ne devrais pas ignorer cet avertissement.", ["You shouldn't ignore this warning.", 'You should not ignore this warning.', "You shouldn't ignore that warning.", 'You ought not to ignore this warning.'], "Conseil négatif : shouldn't + base verbale.", 'Negative advice: shouldn\'t + base verb.'),
  R("Malgré la tempête, le pilote a réussi à atterrir en sécurité.", ['Despite the storm, the pilot was able to land safely.', 'Despite the storm, the pilot managed to land safely.', 'In spite of the storm, the pilot was able to land safely.', 'In spite of the storm, the pilot managed to land safely.'], "Réussite ponctuelle au passé : was able to ou managed to, jamais could.", 'One-off success in the past: was able to or managed to, never could.'),
  R("Pourriez-vous m'envoyer le fichier, s'il vous plaît ?", ['Would you send me the file, please?', 'Would you please send me the file?', 'Could you send me the file, please?', 'Could you please send me the file?', 'Please could you send me the file?'], "Demande polie : Could you...? ou Would you...?", 'Polite request: Could you...? or Would you...?'),
  R("Les visiteurs ne peuvent pas entrer sans badge.", ['Visitors cannot enter without a badge.', 'Visitors may not enter without a badge.', "Visitors can't enter without a badge.", 'Visitors must not enter without a badge.', "Visitors mustn't enter without a badge.", 'Visitors are not allowed to enter without a badge.', "Visitors aren't allowed to enter without a badge."], "Interdiction par règlement : may not (formel), cannot, mustn't.", 'Prohibition by regulation: may not (formal), cannot, mustn\'t.'),
  R("Il a dû oublier la pièce jointe.", ['He must have forgotten the attachment.', 'He must have forgotten the attached file.', 'He must have forgotten to attach the file.', 'He must have forgotten to attach it.'], "Déduction passée : must have + participe passé.", 'Past deduction: must have + past participle.'),
  R("Nous devrions vraiment remercier toute l'équipe.", ['We really ought to thank the whole team.', 'We really should thank the whole team.', 'We really ought to thank the entire team.', 'We really should thank the entire team.'], "Conseil : ought to ou should.", 'Advice: ought to or should.'),
  R("Puis-je vous poser une question ?", ['Could I ask you a question?', 'May I ask you a question?', 'Can I ask you a question?'], "Permission : May I...? (formel), Could I...? ou Can I...?", 'Permission: May I...? (formal), Could I...? or Can I...?')
];

const SK = (fr, en) => [fr, en];
const OB = SK('Modaux : obligation, interdiction, absence d\'obligation', 'Modals: obligation, prohibition, no obligation');
const DED = SK('Modaux : déduction et modaux du passé', 'Modals: deduction and past modals');
export const G08 = {
  id: 'G08',
  title: 'Les verbes modaux (Modal Verbs)',
  coursUrl: '',
  skills: {
    '*': SK('Modaux (mélange)', 'Modals (mixed)'),
    'g08-guidee-a': SK('Modaux (mélange)', 'Modals (mixed)'),
    'g08-niv-a': SK('Modaux (mélange)', 'Modals (mixed)'),
    'g08-devoir': SK('Modaux (mélange)', 'Modals (mixed)'),
    'g08-guidee-b': DED,
    'g08-niv-b': SK('Modaux (mélange)', 'Modals (mixed)'),
    'g08-m8b': DED,
    'g08-m8a': OB,
    'g08-m8c': SK('Modaux : capacité (can, could, be able to)', 'Modals: ability (can, could, be able to)'),
    'g08-m8d': SK('Modaux : may, might, permission', 'Modals: may, might, permission'),
    'g08-m8e': SK('Modaux : conseil (should, ought to)', 'Modals: advice (should, ought to)'),
    'g08-m8f': SK('Modaux : demandes et offres', 'Modals: requests and offers'),
    'g08-bonus': SK('Modaux (mélange)', 'Modals (mixed)'),
    'g08-m8g': SK('Ordre des mots', 'Word order'),
    'g08-niv-c': SK('Modaux : corrections et thème', 'Modals: corrections and translation'),
    'g08-niv-d': SK('Modaux : registre et reformulation', 'Modals: register and rewriting'),
    'g08-th': SK('Modaux : corrections et thème', 'Modals: corrections and translation')
  },
  sets: [
    S('g08-guidee-a', FICHE, ['Série guidée A : présent', 'Guided set A: present'], 'B1', ['Choisis le bon modal. Chaque phrase propose un indice.', 'Choose the right modal. Each sentence comes with a hint.'], guideeA),
    S('g08-guidee-b', FICHE, ['Série guidée B : modaux au passé', 'Guided set B: past modals'], 'B1+', ['Modal + have + participe passé.', 'Modal + have + past participle.'], guideeB),
    S('g08-niv-a', FICHE, ['Niveau A : modaux de base', 'Level A: basic modals'], 'B1', [CF, CFE], nivA),
    S('g08-niv-b', FICHE, ['Niveau B : nuances et modaux au passé', 'Level B: nuances and past modals'], 'B1+', [CF, CFE], nivB),
    S('g08-niv-c', FICHE, ['Niveau C : corrections et thème', 'Level C: corrections and translation'], 'B1+', ['Corrige cinq phrases fautives, puis traduis cinq phrases.', 'Correct five faulty sentences, then translate five sentences.'], nivC),
    S('g08-niv-d', FICHE, ['Niveau D : registre formel et nuances', 'Level D: formal register and nuances'], 'B2+', ['Réécris avec un modal, puis compare avec le modèle.', 'Rewrite with a modal, then compare with the model.'], nivD),
    S('g08-bonus', FICHE, ['Bonus : modaux dans un rapport professionnel', 'Bonus: modals in a professional report'], 'B2+', ['Complète le rapport avec les modaux appropriés.', 'Complete the report with the appropriate modals.'], bonus),
    S('g08-devoir', FICHE, ['Devoir maison', 'Homework'], 'B1+', ['Quinze phrases à compléter avec le modal le plus approprié.', 'Fifteen sentences to complete with the most appropriate modal.'], devoir),
    S('g08-m8a', MURPHY, ['Unité 8A : must, have to, mustn\'t, don\'t have to', 'Unit 8A: must, have to, mustn\'t, don\'t have to'], 'B1', ['Complète avec le bon modal.', 'Complete with the right modal.'], m8a),
    S('g08-m8b', MURPHY, ['Unité 8B : modaux au passé, déductions et regrets', 'Unit 8B: past modals, deductions and regrets'], 'B1+', ['Complète avec le modal au passé.', 'Complete with the past modal.'], m8b),
    S('g08-m8c', MURPHY, ['Unité 8C : can, could, be able to', 'Unit 8C: can, could, be able to'], 'B1+', ['Complète avec can, could ou be able to à la forme correcte.', 'Complete with can, could or be able to in the correct form.'], m8c),
    S('g08-m8d', MURPHY, ['Unité 8D : may, might', 'Unit 8D: may, might'], 'B1+', ['Complète avec may ou might.', 'Complete with may or might.'], m8d),
    S('g08-m8e', MURPHY, ['Unité 8E : should, ought to', 'Unit 8E: should, ought to'], 'B1', ['Complète avec should, shouldn\'t ou ought to.', 'Complete with should, shouldn\'t or ought to.'], m8e),
    S('g08-m8f', MURPHY, ['Unité 8F : demandes, offres et permission', 'Unit 8F: requests, offers and permission'], 'B1+', ['Écris la question adaptée à la situation.', 'Write the question that suits the situation.'], m8f),
    S('g08-m8g', MURPHY, ['Unité 8G : remettre les mots dans l\'ordre', 'Unit 8G: sentence building'], 'B1+', ['Écris la phrase complète avec les mots dans le bon ordre.', 'Write the complete sentence with the words in the right order.'], m8g),
    S('g08-th', MURPHY, ['Unité TH : thème grammatical', 'Unit TH: translation'], 'B1+', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], th)
  ],
  recap: {
    blocks: [
      {
        title: 'Les principaux modaux',
        forms: [
          ['can / could', "Capacité (can speak), capacité générale au passé (could swim), demande (Could you...?)."],
          ['may / might', "Possibilité (might = moins sûr), permission formelle (May I...?)."],
          ['must / have to', "must = obligation interne ou déduction ; have to = obligation externe (règle)."],
          ['should / ought to', "Conseil, recommandation."],
          ["mustn't", "Interdiction absolue."],
          ["needn't / don't have to", "Pas d'obligation. À ne pas confondre avec mustn't."],
          ['would / shall', "Politesse et offres (Would you like...? Shall I...?)."]
        ],
        uses: ["Pas de to après un modal (sauf ought to), pas de -s à la 3e personne."]
      },
      {
        title: 'Modaux au passé',
        forms: [
          ['must have + PP', "Déduction positive : She must have left."],
          ["can't have + PP", "Impossibilité : He can't have done that."],
          ['should have + PP', "Reproche ou regret : You should have told me."],
          ['could have + PP', "Possibilité non réalisée : She could have won."],
          ['might / may have + PP', "Possibilité incertaine : He might have forgotten."],
          ["needn't have + PP", "Effort inutile (réalisé) : You needn't have brought food."]
        ]
      }
    ],
    tables: [],
    notes: ["You mustn't n'est pas You don't have to. Mustn't = interdit ; don't have to = pas obligatoire.", "Réussite ponctuelle au passé : was able to (ou managed to), pas could."],
    rule: "must = ma décision, have to = règle externe, mustn't = interdit, needn't = pas obligé."
  },
  enMeta: {
    title: 'Modal Verbs',
    recap: {
      blocks: [
        {
          title: 'The main modals',
          forms: [
            ['can / could', 'Ability (can speak), general ability in the past (could swim), requests (Could you...?).'],
            ['may / might', 'Possibility (might = less sure), formal permission (May I...?).'],
            ['must / have to', 'must = internal obligation or deduction; have to = external obligation (rule).'],
            ['should / ought to', 'Advice, recommendation.'],
            ["mustn't", 'Absolute prohibition.'],
            ["needn't / don't have to", 'No obligation. Not to be confused with mustn\'t.'],
            ['would / shall', 'Politeness and offers (Would you like...? Shall I...?).']
          ],
          uses: ['No to after a modal (except ought to), no -s in the third person.']
        },
        {
          title: 'Past modals',
          forms: [
            ['must have + PP', 'Positive deduction: She must have left.'],
            ["can't have + PP", "Impossibility: He can't have done that."],
            ['should have + PP', 'Criticism or regret: You should have told me.'],
            ['could have + PP', 'Unrealised possibility: She could have won.'],
            ['might / may have + PP', 'Uncertain possibility: He might have forgotten.'],
            ["needn't have + PP", "Unnecessary effort (done): You needn't have brought food."]
          ]
        }
      ],
      tables: [],
      notes: ["You mustn't is not You don't have to. Mustn't = forbidden; don't have to = not obligatory.", 'One-off success in the past: was able to (or managed to), not could.'],
      rule: "must = my decision, have to = external rule, mustn't = forbidden, needn't = not obliged."
    }
  }
};
