// G17 : Verb + ING or TO infinitive
import { S, FICHE, MURPHY, F, R, W, P, K, hint, SK } from './dsl2.js';

const TO = (v) => 'Ce verbe est suivi de to + infinitif.';
const ING = 'Ce verbe est suivi du gérondif (-ing).';
const TOE = 'This verb is followed by to + infinitive.';
const INGE = 'This verb is followed by the gerund (-ing).';

const guideeA = [
  K('She decided ___ (apply) for the research position.', [['to apply']], "Elle a décidé de postuler au poste de recherche.", 'decide + to.', 'decide + to.'),
  K('He enjoys ___ (work) on complex engineering problems.', [['working']], "Il aime travailler sur des problèmes d'ingénierie complexes.", 'enjoy + -ing.', 'enjoy + -ing.'),
  K('They managed ___ (finish) the analysis before the deadline.', [['to finish']], "Ils ont réussi à terminer l'analyse avant l'échéance.", 'manage + to.', 'manage + to.'),
  K('She avoided ___ (make) the same mistake twice.', [['making']], "Elle a évité de faire deux fois la même erreur.", 'avoid + -ing.', 'avoid + -ing.'),
  K('He refused ___ (sign) the contract without legal advice.', [['to sign']], "Il a refusé de signer le contrat sans conseil juridique.", 'refuse + to.', 'refuse + to.'),
  K('She suggested ___ (use) a different analytical approach.', [['using']], "Elle a suggéré d'utiliser une autre approche analytique.", 'suggest + -ing.', 'suggest + -ing.'),
  K('He keeps ___ (make) the same recurring error.', [['making']], "Il continue de commettre la même erreur récurrente.", 'keep + -ing.', 'keep + -ing.'),
  K('They hope ___ (present) their findings at the conference.', [['to present']], "Ils espèrent présenter leurs résultats à la conférence.", 'hope + to.', 'hope + to.'),
  K('Without ___ (check) your data first, you risk errors.', [['checking']], "Sans vérifier d'abord vos données, vous risquez des erreurs.", 'Après une préposition : -ing.', 'After a preposition: -ing.'),
  K('She admitted ___ (not / understand) the new protocol.', [['not understanding', 'not having understood']], "Elle a admis ne pas comprendre le nouveau protocole.", 'admit + -ing ; la négation précède le gérondif.', 'admit + -ing; the negation comes before the gerund.')
];
const guideeB = [
  K('She stopped ___ (check) her emails before bed. (she gave up that habit)', [['checking']], "Elle a cessé de consulter ses courriels avant de dormir.", 'stop + -ing = cesser de.', 'stop + -ing = give up.'),
  K('He stopped ___ (read) the report on the way. (in order to)', [['to read']], "Il s'est arrêté pour lire le rapport en chemin.", 'stop + to = s\'arrêter pour.', 'stop + to = pause in order to.'),
  K('Remember ___ (submit) your report by Friday. (do not forget)', [['to submit']], "N'oubliez pas de remettre votre rapport avant vendredi.", 'remember + to = ne pas oublier de (futur).', 'remember + to = not forget to (future).'),
  K('I remember ___ (meet) her at the international symposium.', [['meeting']], "Je me souviens de l'avoir rencontrée au colloque international.", 'remember + -ing = se souvenir d\'avoir fait.', 'remember + -ing = recall having done.'),
  K('Try ___ (practise) speaking English every single day. (experiment)', [['practising', 'practicing']], "Essaie de t'exercer à parler anglais chaque jour, pour voir.", 'try + -ing = essayer pour voir.', 'try + -ing = experiment.'),
  K('Try ___ (speak) more slowly, nobody can follow you. (make an effort)', [['to speak']], "Essaie de parler plus lentement, personne ne peut te suivre.", 'try + to = tenter de.', 'try + to = make an effort.'),
  K('I regret ___ (inform) you that your application was unsuccessful.', [['to inform']], "J'ai le regret de vous informer que votre candidature n'a pas été retenue.", 'regret + to = annoncer à regret.', 'regret + to = announce with regret.'),
  K('She regrets ___ (say) that in the meeting, it caused a lot of tension.', [['saying', 'having said']], "Elle regrette d'avoir dit cela en réunion, cela a créé beaucoup de tension.", 'regret + -ing = regretter d\'avoir fait.', 'regret + -ing = be sorry about having done.'),
  K('He went on ___ (talk) for another 30 minutes after the break. (continued)', [['talking']], "Il a continué de parler pendant 30 minutes après la pause.", 'go on + -ing = continuer la même action.', 'go on + -ing = continue the same action.'),
  K('She finished the introduction and went on ___ (explain) the methodology. (next)', [['to explain']], "Elle a terminé l'introduction, puis a expliqué la méthodologie.", 'go on + to = passer à autre chose.', 'go on + to = move on to something else.')
];
const nivA = [
  K('She agreed ___ (present) the results to the board of directors.', [['to present']], "Elle a accepté de présenter les résultats au conseil d'administration.", 'agree + to.', 'agree + to.'),
  K('He keeps ___ (make) the same computational error.', [['making']], "Il fait toujours la même erreur de calcul.", 'keep + -ing.', 'keep + -ing.'),
  K('They planned ___ (launch) the product in the first quarter.', [['to launch']], "Ils prévoyaient de lancer le produit au premier trimestre.", 'plan + to.', 'plan + to.'),
  K("She can't stand ___ (wait) for answers to urgent queries.", [['waiting']], "Elle ne supporte pas d'attendre les réponses à des demandes urgentes.", "can't stand + -ing.", "can't stand + -ing."),
  K('He attempted ___ (solve) the differential equation alone.', [['to solve']], "Il a tenté de résoudre seul l'équation différentielle.", 'attempt + to.', 'attempt + to.'),
  K('She suggested ___ (use) a different statistical model.', [['using']], "Elle a suggéré d'utiliser un autre modèle statistique.", 'suggest + -ing.', 'suggest + -ing.'),
  K("I forgot ___ (send) the email this morning, I'll do it now.", [['to send']], "J'ai oublié d'envoyer le courriel ce matin, je le fais maintenant.", 'forget + to = oublier de faire.', 'forget + to = fail to do.'),
  K('He promised ___ (deliver) the prototype on schedule.', [['to deliver']], "Il a promis de livrer le prototype dans les temps.", 'promise + to.', 'promise + to.'),
  K('They considered ___ (outsource) part of the project.', [['outsourcing']], "Ils ont envisagé de sous-traiter une partie du projet.", 'consider + -ing.', 'consider + -ing.'),
  K('She hoped ___ (get) the research grant this year.', [['to get']], "Elle espérait obtenir la bourse de recherche cette année.", 'hope + to.', 'hope + to.')
];
const nivB = [
  K('He gave up ___ (try) to fix the legacy system.', [['trying']], "Il a renoncé à essayer de réparer le système hérité.", 'give up + -ing.', 'give up + -ing.'),
  K('She remembered ___ (lock) her office before leaving for the weekend.', [['to lock']], "Elle n'a pas oublié de fermer son bureau à clé avant de partir pour le week-end.", 'remember + to = penser à.', 'remember + to = not forget.'),
  K('They intend ___ (expand) operations into the Asian market.', [['to expand']], "Ils comptent étendre leurs activités au marché asiatique.", 'intend + to.', 'intend + to.'),
  K('She regrets ___ (not / study) a second language when she had the chance.', [['not studying', 'not having studied']], "Elle regrette de ne pas avoir étudié une seconde langue quand elle en avait l'occasion.", 'regret + -ing ; négation avant le gérondif.', 'regret + -ing; negation before the gerund.'),
  K('He continued ___ (develop) the prototype despite repeated setbacks.', [['developing', 'to develop']], "Il a continué de développer le prototype malgré les revers répétés.", 'continue accepte les deux formes.', 'continue accepts both forms.')
];
const nivC = [
  F('She enjoys to work on complex problems.', ['She enjoys working on complex problems.'], "Elle aime travailler sur des problèmes complexes.", 'enjoy + -ing.', 'enjoy + -ing.'),
  F('He refused working overtime without extra pay.', ['He refused to work overtime without extra pay.'], "Il a refusé de faire des heures supplémentaires sans paie supplémentaire.", 'refuse + to.', 'refuse + to.'),
  F('They suggested to use a different approach.', ['They suggested using a different approach.'], "Ils ont suggéré d'utiliser une approche différente.", 'suggest + -ing.', 'suggest + -ing.'),
  F('She avoided to make any strong claims.', ['She avoided making any strong claims.'], "Elle a évité de faire des affirmations trop fortes.", 'avoid + -ing.', 'avoid + -ing.'),
  F('I forgot sending the report, I will do it now.', ['I forgot to send the report, I will do it now.', "I forgot to send the report, I'll do it now."], "J'ai oublié d'envoyer le rapport, je le fais maintenant.", 'forget + to = oublier de faire.', 'forget + to = fail to do.'),
  R("Elle a décidé de changer de méthodologie pour la deuxième phase.", ['She decided to change the methodology for the second phase.', 'She decided to change methodology for the second phase.', 'She decided to change her methodology for the second phase.', 'She decided to change the methodology for phase two.', 'She decided to change methodology for phase two.', 'She has decided to change the methodology for the second phase.'], 'decide + to.', 'decide + to.'),
  R("Il évite de faire des généralisations sans données suffisantes.", ['He avoids making generalisations without sufficient data.', 'He avoids making generalizations without sufficient data.', 'He avoids making generalisations without enough data.', 'He avoids making generalizations without enough data.', 'He avoids generalising without sufficient data.', 'He avoids generalizing without sufficient data.'], 'avoid + -ing ; without + -ing ou nom.', 'avoid + -ing.'),
  R("Cela vaut la peine d'explorer cette hypothèse plus en détail.", ['It is worth exploring this hypothesis in more detail.', "It's worth exploring this hypothesis in more detail.", 'It is worth exploring this hypothesis further.', "It's worth exploring this hypothesis further.", 'This hypothesis is worth exploring in more detail.', 'This hypothesis is worth exploring further.', 'It is worth exploring this hypothesis in greater detail.', "It's worth exploring this hypothesis in greater detail."], 'be worth + -ing.', 'be worth + -ing.'),
  R("Ils ont suggéré d'utiliser l'apprentissage automatique pour traiter les données.", ['They suggested using machine learning to process the data.', 'They suggested using machine learning to process data.', 'They suggested using machine learning to handle the data.', 'They suggested using machine learning for processing the data.', 'They suggested using machine learning to analyse the data.', 'They suggested using machine learning to analyze the data.'], 'suggest + -ing.', 'suggest + -ing.'),
  R("Elle n'a pas réussi à convaincre le comité d'approuver le budget.", ['She failed to convince the committee to approve the budget.', 'She did not manage to convince the committee to approve the budget.', "She didn't manage to convince the committee to approve the budget.", 'She was unable to convince the committee to approve the budget.', 'She failed to persuade the committee to approve the budget.', "She didn't succeed in convincing the committee to approve the budget.", 'She did not succeed in convincing the committee to approve the budget.'], 'fail + to ; convince somebody + to.', 'fail + to; convince somebody + to.')
];
const nivD = [
  K('She succeeded ___ (win) the research grant on her third attempt.', [['in winning']], "Elle a réussi à obtenir la bourse de recherche à sa troisième tentative.", 'succeed in + -ing.', 'succeed in + -ing.'),
  K('He apologised ___ (not / attend) the mandatory briefing.', [['for not attending', 'for not having attended']], "Il s'est excusé de ne pas avoir assisté à la réunion obligatoire.", 'apologise for + -ing.', 'apologise for + -ing.'),
  K('Instead ___ (give up), she found a creative workaround.', [['of giving up']], "Au lieu d'abandonner, elle a trouvé une astuce créative.", 'instead of + -ing.', 'instead of + -ing.'),
  K('After ___ (review) the data carefully, they changed their hypothesis.', [['reviewing']], "Après avoir examiné attentivement les données, ils ont changé d'hypothèse.", 'after + -ing.', 'after + -ing.'),
  K('By ___ (automate) the process, the team saved over 20 hours per week.', [['automating']], "En automatisant le processus, l'équipe a économisé plus de 20 heures par semaine.", 'by + -ing.', 'by + -ing.')
];
const bonus = [
  P("Explique la différence : 'I like working late.' et 'I would like to work late today.'", "'I like working late.' vs 'I would like to work late today.' What is the difference?", ["'I like working late' is a general liking; 'I would like to work late today' is a specific wish for a particular occasion."], 'like + -ing : goût général ; would like + to : souhait précis.', 'What is the difference?', 'like + -ing: general taste; would like + to: specific wish.'),
  P("Explique la différence : 'She hates being interrupted.' et 'She would hate to be interrupted.'", "'She hates being interrupted.' vs 'She would hate to be interrupted.' What is the difference?", ["'She hates being interrupted' is a general aversion; 'She would hate to be interrupted' is a hypothetical reaction."], 'hate + -ing : aversion générale ; would hate + to : réaction hypothétique.', 'What is the difference?', 'hate + -ing: general aversion; would hate + to: hypothetical reaction.'),
  K('Would you like ___ (join) us for the seminar?', [['to join']], "Voulez-vous vous joindre à nous pour le séminaire ?", 'would like + to.', 'would like + to.'),
  K('Do you like ___ (work) in a team?', [['working']], "Aimez-vous travailler en équipe ?", 'like + -ing : goût général.', 'like + -ing: general taste.')
];
const devoir = [
  K('She decided ___ (change) her overall research approach.', [['to change']], "Elle a décidé de changer toute son approche de recherche.", 'decide + to.', 'decide + to.'),
  K("He can't stand ___ (present) in front of large audiences.", [['presenting']], "Il ne supporte pas de présenter devant un large public.", "can't stand + -ing.", "can't stand + -ing."),
  K('They managed ___ (reduce) production costs by 15%.', [['to reduce']], "Ils ont réussi à réduire les coûts de production de 15 %.", 'manage + to.', 'manage + to.'),
  K('She enjoys ___ (analyse) complex experimental data.', [['analysing', 'analyzing']], "Elle aime analyser des données expérimentales complexes.", 'enjoy + -ing.', 'enjoy + -ing.'),
  K('He forgot ___ (attach) the file to the email, it was embarrassing.', [['to attach']], "Il a oublié de joindre le fichier au courriel, c'était gênant.", 'forget + to.', 'forget + to.'),
  K('They avoided ___ (make) any premature commitments.', [['making']], "Ils ont évité de prendre des engagements prématurés.", 'avoid + -ing.', 'avoid + -ing.'),
  K('She recommended ___ (use) open-source software for the project.', [['using']], "Elle a recommandé d'utiliser un logiciel libre pour le projet.", 'recommend + -ing.', 'recommend + -ing.'),
  K('He refused ___ (accept) the conditions of the contract.', [['to accept']], "Il a refusé d'accepter les conditions du contrat.", 'refuse + to.', 'refuse + to.'),
  K('Remember ___ (back up) your files every single day.', [['to back up']], "N'oubliez pas de sauvegarder vos fichiers chaque jour.", 'remember + to.', 'remember + to.'),
  K('She stopped ___ (check) her phone during important meetings.', [['checking']], "Elle a cessé de regarder son téléphone pendant les réunions importantes.", 'stop + -ing.', 'stop + -ing.'),
  K('He admitted ___ (make) an error in the initial calculations.', [['making', 'having made']], "Il a admis avoir fait une erreur dans les calculs initiaux.", 'admit + -ing.', 'admit + -ing.'),
  K("They risk ___ (miss) the deadline if they don't speed up.", [['missing']], "Ils risquent de manquer l'échéance s'ils n'accélèrent pas.", 'risk + -ing.', 'risk + -ing.'),
  K('She is considering ___ (apply) for a research fellowship.', [['applying']], "Elle envisage de postuler à une bourse de recherche.", 'consider + -ing.', 'consider + -ing.'),
  K('After ___ (analyse) the results, the team changed their hypothesis.', [['analysing', 'analyzing']], "Après avoir analysé les résultats, l'équipe a changé d'hypothèse.", 'after + -ing.', 'after + -ing.'),
  K('He went on ___ (become) one of the most cited researchers in the field.', [['to become']], "Il est ensuite devenu l'un des chercheurs les plus cités du domaine.", 'go on + to = passer à, ensuite.', 'go on + to = move on to.')
];
const m17a1 = [
  K('She enjoys ___ (work) on challenging problems.', [['working']], "Elle aime travailler sur des problèmes difficiles.", 'enjoy + -ing.', 'enjoy + -ing.'),
  K('He refused ___ (sign) without a lawyer.', [['to sign']], "Il a refusé de signer sans avocat.", 'refuse + to.', 'refuse + to.'),
  K('They avoided ___ (make) any promises.', [['making']], "Ils ont évité de faire des promesses.", 'avoid + -ing.', 'avoid + -ing.'),
  K('She managed ___ (finish) before the deadline.', [['to finish']], "Elle a réussi à finir avant l'échéance.", 'manage + to.', 'manage + to.'),
  K('Before ___ (send) the file, you should compress it.', [['sending']], "Avant d'envoyer le fichier, vous devriez le compresser.", 'before + -ing.', 'before + -ing.')
];
const m17a2 = [
  K('He stopped ___ (check) the gauge every hour. (gave up)', [['checking']], "Il a cessé de vérifier la jauge toutes les heures.", 'stop + -ing.', 'stop + -ing.'),
  K('He stopped ___ (buy) a coffee on his way in. (in order to)', [['to buy']], "Il s'est arrêté pour acheter un café en arrivant.", 'stop + to.', 'stop + to.'),
  K('Remember ___ (submit) the form by Friday. (do not forget)', [['to submit']], "N'oubliez pas de remettre le formulaire avant vendredi.", 'remember + to.', 'remember + to.'),
  K('I remember ___ (meet) him at the 2022 conference.', [['meeting']], "Je me souviens de l'avoir rencontré à la conférence de 2022.", 'remember + -ing.', 'remember + -ing.'),
  K('Try ___ (restart) the server, that might fix it. (experiment)', [['restarting']], "Essaie de redémarrer le serveur, cela réglera peut-être le problème.", 'try + -ing = essayer pour voir.', 'try + -ing = experiment.')
];
const m17b = [
  K('The client wants ___ (we / deliver) the project early.', [['us to deliver']], "Le client veut que nous livrions le projet plus tôt.", 'want + objet + to.', 'want + object + to.'),
  K('She told ___ (he / wait) outside.', [['him to wait']], "Elle lui a dit d'attendre dehors.", 'tell + objet + to.', 'tell + object + to.'),
  K('They expect ___ (the team / meet) the target.', [['the team to meet']], "Ils attendent de l'équipe qu'elle atteigne l'objectif.", 'expect + objet + to.', 'expect + object + to.'),
  K('He asked ___ (I / help) with the presentation.', [['me to help']], "Il m'a demandé de l'aider pour la présentation.", 'ask + objet + to.', 'ask + object + to.'),
  K('The professor encouraged ___ (they / apply) for the internship.', [['them to apply']], "Le professeur les a encouragés à postuler au stage.", 'encourage + objet + to.', 'encourage + object + to.')
];
const m17c = [
  K("She ___ (used to / work) remotely, she's done it for years.", [['is used to working']], "Elle est habituée à travailler à distance, elle le fait depuis des années.", 'be used to + -ing = état.', 'be used to + -ing = state.'),
  K('It took him months to ___ (get used to / drive) on the other side of the road.', [['get used to driving']], "Il lui a fallu des mois pour s'habituer à conduire de l'autre côté de la route.", 'get used to + -ing = processus.', 'get used to + -ing = process.'),
  K("I'm not ___ (used to / wake) up this early.", [['used to waking']], "Je n'ai pas l'habitude de me réveiller aussi tôt.", 'be used to + -ing.', 'be used to + -ing.'),
  K('They quickly ___ (get used to / use) the new software.', [['got used to using']], "Ils se sont vite habitués au nouveau logiciel.", 'get used to + -ing, au prétérit.', 'get used to + -ing, in the past.'),
  K("He ___ (used to / travel) for work, it's part of his routine.", [['is used to travelling', 'is used to traveling']], "Il a l'habitude de voyager pour le travail, cela fait partie de sa routine.", 'be used to + -ing.', 'be used to + -ing.')
];
const m17d = [
  K('He was afraid ___ (make) a mistake in front of the board.', [['to make']], "Il n'osait pas faire d'erreur devant le conseil.", 'afraid + to = ne pas oser.', 'afraid + to = be too scared to.'),
  K("She's afraid ___ (lose) her data if the system crashes.", [['of losing']], "Elle craint de perdre ses données si le système plante.", 'afraid of + -ing = craindre.', 'afraid of + -ing = fear.'),
  K("We're interested ___ (collaborate) with your team.", [['in collaborating']], "Nous sommes intéressés par une collaboration avec votre équipe.", 'interested in + -ing.', 'interested in + -ing.'),
  K("He's quite good ___ (solve) technical problems.", [['at solving']], "Il est plutôt bon pour résoudre des problèmes techniques.", 'good at + -ing.', 'good at + -ing.'),
  K("They're worried ___ (miss) the deadline.", [['about missing']], "Ils s'inquiètent de manquer l'échéance.", 'worried about + -ing.', 'worried about + -ing.')
];
const m17e = [
  W('avoided / she / answering / the / email / immediately', ['She avoided answering the email immediately.'], "Elle a évité de répondre tout de suite au courriel.", 'avoid + -ing.', 'avoid + -ing.'),
  W('agreed / they / to / bring / the / meeting / forward', ['They agreed to bring the meeting forward.'], "Ils ont accepté d'avancer la réunion.", 'agree + to.', 'agree + to.'),
  W('not / we / used / are / to / working / weekends', ['We are not used to working weekends.', "We're not used to working weekends.", "We aren't used to working weekends."], "Nous n'avons pas l'habitude de travailler le week-end.", 'be used to + -ing.', 'be used to + -ing.'),
  W('offered / she / to / help / the / with / installation', ['She offered to help with the installation.'], "Elle a proposé d'aider pour l'installation.", 'offer + to.', 'offer + to.'),
  W('regret / we / not / testing / it / earlier', ['We regret not testing it earlier.'], "Nous regrettons de ne pas l'avoir testé plus tôt.", 'regret + not + -ing.', 'regret + not + -ing.'),
  W('managed / finally / to / she / the / repair / pump', ['She finally managed to repair the pump.'], "Elle a fini par réussir à réparer la pompe.", 'manage + to.', 'manage + to.'),
  W('in / she / is / interested / testing / new / materials', ['She is interested in testing new materials.', "She's interested in testing new materials."], "Elle s'intéresse à tester de nouveaux matériaux.", 'interested in + -ing.', 'interested in + -ing.'),
  W('denied / she / deleting / the / records', ['She denied deleting the records.'], "Elle a nié avoir supprimé les enregistrements.", 'deny + -ing.', 'deny + -ing.')
];
const th = [
  R("Elle a évité de répondre franchement à la question.", ['She avoided answering the question frankly.', 'She avoided answering the question honestly.', 'She avoided answering the question openly.', 'She avoided giving a straight answer to the question.', 'She avoided answering the question directly.'], 'avoid + -ing.', 'avoid + -ing.'),
  R("Ils ont accepté d'avancer le lancement.", ['They agreed to bring the launch forward.', 'They agreed to move the launch forward.', 'They agreed to bring forward the launch.', 'They agreed to move up the launch.', 'They agreed to advance the launch.', 'They agreed to move the launch up.'], 'agree + to.', 'agree + to.'),
  R("Nous n'avons pas l'habitude de travailler le dimanche.", ["We are not used to working on Sundays.", "We're not used to working on Sundays.", "We aren't used to working on Sundays.", "We are not used to working on Sunday.", "We're not used to working on Sunday."], 'be used to + -ing.', 'be used to + -ing.'),
  R("Elle a proposé de nous aider pour la mise à jour.", ['She offered to help us with the update.', 'She offered to help us with the upgrade.', 'She offered to help with the update.', 'She offered to help us update it.', 'She offered to help us with the updating.'], 'offer + to.', 'offer + to.'),
  R("Je regrette de ne pas avoir relu le contrat plus attentivement.", ['I regret not reading the contract more carefully.', 'I regret not having read the contract more carefully.', 'I regret not rereading the contract more carefully.', 'I regret not reviewing the contract more carefully.', 'I regret not checking the contract more carefully.'], 'regret + not + -ing.', 'regret + not + -ing.'),
  R("Elles ont enfin réussi à réparer la panne.", ['They finally managed to fix the fault.', 'They finally managed to fix the breakdown.', 'They finally managed to repair the fault.', 'They finally managed to fix the failure.', 'They finally managed to repair the breakdown.', 'They finally managed to fix the problem.'], 'manage + to.', 'manage + to.'),
  R("Il s'intéresse à tester de nouveaux matériaux.", ['He is interested in testing new materials.', "He's interested in testing new materials.", 'He is interested in trying out new materials.', "He's interested in trying out new materials."], 'interested in + -ing.', 'interested in + -ing.')
];
const A = SK('Verbes suivis de -ing ou de to + infinitif', 'Verbs followed by -ing or to + infinitive');
const M = SK('Changements de sens : stop, remember, forget, try, regret, go on', 'Change of meaning: stop, remember, forget, try, regret, go on');
export const G17 = {
  id: 'G17',
  title: 'Verbe + ING ou TO (Verb + ING or TO)',
  coursUrl: '',
  skills: {
    '*': A,
    'g17-guidee-b': M, 'g17-m17a-2': M, 'g17-bonus': SK('Like et would like', 'Like and would like'),
    'g17-niv-c': SK('Gérondif et infinitif : corrections et thème', 'Gerund and infinitive: corrections and translation'),
    'g17-th': SK('Gérondif et infinitif : corrections et thème', 'Gerund and infinitive: corrections and translation'),
    'g17-niv-d': SK('Prépositions suivies de -ing', 'Prepositions followed by -ing'),
    'g17-m17b': SK('Verbe + objet + to', 'Verb + object + to'),
    'g17-m17c': SK('Be used to, get used to', 'Be used to, get used to'),
    'g17-m17d': SK('Adjectif + to ou préposition + -ing', 'Adjective + to or preposition + -ing')
  },
  sets: [
    S('g17-guidee-a', FICHE, ['Série guidée A : -ing ou to ?', 'Guided set A: -ing or to?'], 'B1', ['Complète avec to + verbe ou le gérondif.', 'Complete with to + verb or the gerund.'], guideeA),
    S('g17-guidee-b', FICHE, ['Série guidée B : changements de sens', 'Guided set B: changes of meaning'], 'B1+', ['Choisis la forme qui correspond au sens indiqué.', 'Choose the form that matches the meaning given.'], guideeB),
    S('g17-niv-a', FICHE, ['Niveau A : fondamentaux', 'Level A: basics'], 'B1', ['Complète avec to + verbe ou le gérondif.', 'Complete with to + verb or the gerund.'], nivA),
    S('g17-niv-b', FICHE, ['Niveau B : cas complexes', 'Level B: complex cases'], 'B1+', ['Complète avec la forme correcte.', 'Complete with the correct form.'], nivB),
    S('g17-niv-c', FICHE, ['Niveau C : erreurs et traduction', 'Level C: errors and translation'], 'B1+', ['Corrige cinq phrases, puis traduis cinq phrases.', 'Correct five sentences, then translate five sentences.'], nivC),
    S('g17-niv-d', FICHE, ['Niveau D : prépositions + -ing', 'Level D: prepositions + -ing'], 'B2', ['Complète avec la préposition et le gérondif.', 'Complete with the preposition and the gerund.'], nivD),
    S('g17-bonus', FICHE, ['Bonus : like et would like', 'Bonus: like and would like'], 'B2', ['Explique, puis complète.', 'Explain, then complete.'], bonus),
    S('g17-devoir', FICHE, ['Devoir maison', 'Homework'], 'B1+', ['Quinze phrases à compléter.', 'Fifteen sentences to complete.'], devoir),
    S('g17-m17a-1', MURPHY, ['Unité 17A : listes essentielles (1/2)', 'Unit 17A: essential lists (1/2)'], 'B1', ['Complète avec la bonne forme.', 'Complete with the right form.'], m17a1),
    S('g17-m17a-2', MURPHY, ['Unité 17A : changements de sens (2/2)', 'Unit 17A: changes of meaning (2/2)'], 'B1+', ['Choisis la forme qui correspond au sens indiqué.', 'Choose the form that matches the meaning given.'], m17a2),
    S('g17-m17b', MURPHY, ['Unité 17B : verbe + objet + to', 'Unit 17B: verb + object + to'], 'B1+', ['Complète avec objet + to + verbe.', 'Complete with object + to + verb.'], m17b),
    S('g17-m17c', MURPHY, ['Unité 17C : be used to, get used to', 'Unit 17C: be used to, get used to'], 'B1+', ['Complète avec be used to ou get used to + -ing.', 'Complete with be used to or get used to + -ing.'], m17c),
    S('g17-m17d', MURPHY, ['Unité 17D : adjectif + to ou préposition + -ing', 'Unit 17D: adjective + to or preposition + -ing'], 'B1+', ['Complète avec la préposition + -ing ou to + base.', 'Complete with preposition + -ing or to + base.'], m17d),
    S('g17-m17e', MURPHY, ['Unité 17E : remettre les mots dans l\'ordre', 'Unit 17E: sentence building'], 'B1+', ['Écris la phrase complète avec les mots dans le bon ordre.', 'Write the complete sentence with the words in the right order.'], m17e),
    S('g17-th', MURPHY, ['Unité TH : thème grammatical', 'Unit TH: translation'], 'B1+', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], th)
  ],
  recap: {
    blocks: [
      {
        title: 'Verbes + to + infinitif',
        forms: [
          ['décision, intention', 'decide, plan, intend, choose, want, hope, expect, agree, refuse, offer'],
          ['effort, résultat', 'try (tenter), attempt, fail, manage'],
          ['promesse', 'promise, threaten, swear'],
          ['adjectif + to', 'happy, glad, sorry, ready, willing, able + to'],
          ['verbe + objet + to', 'want, ask, tell, expect, encourage, allow + objet + to + base']
        ],
        uses: ['She decided to leave early. He refused to sign. We managed to finish on time.']
      },
      {
        title: 'Verbes + -ing',
        forms: [
          ['goût, aversion', 'enjoy, mind, can\'t stand, adore'],
          ['fin, arrêt', 'stop (cesser), finish, give up, avoid'],
          ['continuer', 'keep, carry on, go on'],
          ['pensée', 'imagine, consider, involve, risk, admit, deny'],
          ['suggestion', 'suggest, recommend'],
          ['après préposition', 'without, instead of, after, before, by, succeed in, apologise for'],
          ['habitude', 'be used to / get used to + -ing']
        ],
        uses: []
      },
      {
        title: 'Changement de sens',
        forms: [
          ['stop', 'to + base = s\'arrêter pour ; -ing = cesser de'],
          ['remember, forget', 'to + base = penser à / oublier de ; -ing = se souvenir d\'avoir fait'],
          ['try', 'to + base = tenter ; -ing = essayer pour voir'],
          ['regret', 'to + base = regretter d\'annoncer ; -ing = regretter d\'avoir fait'],
          ['go on', 'to + base = passer à ; -ing = continuer'],
          ['like / would like', '-ing = goût général ; would like + to = souhait précis']
        ],
        uses: []
      }
    ],
    tables: [],
    notes: ['start, begin et continue acceptent les deux formes.'],
    rule: 'Après une préposition, toujours le gérondif : without checking, instead of giving up.'
  },
  enMeta: {
    title: 'Verb + ING or TO',
    recap: {
      blocks: [
        {
          title: 'Verbs + to + infinitive',
          forms: [
            ['decision, intention', 'decide, plan, intend, choose, want, hope, expect, agree, refuse, offer'],
            ['effort, result', 'try (attempt), attempt, fail, manage'],
            ['promise', 'promise, threaten, swear'],
            ['adjective + to', 'happy, glad, sorry, ready, willing, able + to'],
            ['verb + object + to', 'want, ask, tell, expect, encourage, allow + object + to + base']
          ],
          uses: ['She decided to leave early. He refused to sign. We managed to finish on time.']
        },
        {
          title: 'Verbs + -ing',
          forms: [
            ['liking, dislike', "enjoy, mind, can't stand, adore"],
            ['ending', 'stop (cease), finish, give up, avoid'],
            ['continuing', 'keep, carry on, go on'],
            ['thinking', 'imagine, consider, involve, risk, admit, deny'],
            ['suggestion', 'suggest, recommend'],
            ['after a preposition', 'without, instead of, after, before, by, succeed in, apologise for'],
            ['habit', 'be used to / get used to + -ing']
          ],
          uses: []
        },
        {
          title: 'Change of meaning',
          forms: [
            ['stop', 'to + base = pause in order to; -ing = cease'],
            ['remember, forget', 'to + base = not forget / fail to; -ing = recall having done'],
            ['try', 'to + base = make an effort; -ing = experiment'],
            ['regret', 'to + base = regret to announce; -ing = regret having done'],
            ['go on', 'to + base = move on to; -ing = continue'],
            ['like / would like', '-ing = general taste; would like + to = specific wish']
          ],
          uses: []
        }
      ],
      tables: [],
      notes: ['start, begin and continue accept both forms.'],
      rule: 'After a preposition, always the gerund: without checking, instead of giving up.'
    }
  }
};
