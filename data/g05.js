// G05 : The Passive Voice (la voix passive)
// Contenu reconstruit à partir de la fiche élève, du supplément Murphy et du devoir maison.
// Le texte anglais (règles, indices, consignes) est écrit à côté du texte français avec E(...).
import { E, c, tx, okc, tr, op, es, FIX, set } from './dsl.js';

// Variante avec complément d'agent : by(phrase, 'the technician') accepte aussi « ... by the technician. »
const BE = new Set(['is', 'are', 'was', 'were', 'be', 'been', 'being']);
const by = (base, agent) => {
  const words = base.replace(/\.$/, '').split(' ');
  const out = [base, words.join(' ') + ' by ' + agent + '.'];
  // variante avec l'agent juste après le participe passé : « is checked by the technician every day »
  for (let i = 0; i < words.length - 1; i++) {
    if (BE.has(words[i]) && !BE.has(words[i + 1]) && !['going', 'to', 'just', 'recently', 'currently', 'already'].includes(words[i + 1])) {
      const v = words.slice(0, i + 2).join(' ') + ' by ' + agent + (i + 2 < words.length ? ' ' + words.slice(i + 2).join(' ') : '') + '.';
      if (!out.includes(v)) out.push(v);
      break;
    }
  }
  return out;
};
// Deux orthographes (britannique et américaine) : sp(phrase) renvoie analysed et analyzed.
const sp = base => [base, base.replace('analysed', 'analyzed')];

const IP = 'Mets la phrase à la voix passive.';
const IA = 'Mets la phrase à la voix active.';
const PA = (s, a, fr, why, en) => tx(IP, s, a, fr, why, E(en, null, { instr: 'Put the sentence into the passive.' }));
const AC = (s, a, fr, why, en) => tx(IA, s, a, fr, why, E(en, null, { instr: 'Put the sentence into the active.' }));

const guideeA = [
  c('They repair the machines every month. The machines ___.', [['are repaired every month', 'are repaired monthly']], 'Ils réparent les machines tous les mois.',
    "Present Simple passif : am / is / are + participe passé. Le complément d'objet (the machines) devient le sujet.", 'Present Simple passif',
    E('Passive present simple: am / is / are + past participle. The object (the machines) becomes the subject.', 'passive present simple')),
  c('Someone stole her laptop. Her laptop ___.', ['was stolen'], "Quelqu'un a volé son ordinateur portable.",
    'Past Simple passif : was / were + participe passé. steal est irrégulier : stole, stolen.', 'Past Simple passif',
    E('Passive past simple: was / were + past participle. steal is irregular: stole, stolen.', 'passive past simple')),
  c('They are building a new highway. A new highway ___.', ['is being built'], 'Ils construisent une nouvelle autoroute.',
    'Present Continuous passif : am / is / are being + participe passé. build est irrégulier : built.', 'forme continue au passif',
    E('Passive present continuous: am / is / are being + past participle. build is irregular: built.', 'continuous form in the passive')),
  c('Scientists have discovered a new element. A new element ___.', ['has been discovered'], 'Des scientifiques ont découvert un nouvel élément.',
    'Present Perfect passif : have / has been + participe passé.', 'Present Perfect au passif',
    E('Passive present perfect: have / has been + past participle.', 'present perfect in the passive')),
  c('They will publish the results next week. The results ___.', ['will be published'], 'Ils publieront les résultats la semaine prochaine.',
    'Futur passif : will be + participe passé.', 'futur au passif',
    E('Passive future: will be + past participle.', 'future in the passive')),
  c('A technician was checking the equipment. The equipment ___.', ['was being checked'], 'Un technicien vérifiait le matériel.',
    'Past Continuous passif : was / were being + participe passé.', 'forme continue au passé',
    E('Passive past continuous: was / were being + past participle.', 'continuous form in the past')),
  c('They had submitted the form before the deadline. The form ___.', ['had been submitted'], "Ils avaient remis le formulaire avant la date limite.",
    'Past Perfect passif : had been + participe passé.', 'Past Perfect au passif',
    E('Passive past perfect: had been + past participle.', 'past perfect in the passive')),
  c('We are going to launch the product in January. The product ___.', ['is going to be launched'], 'Nous allons lancer le produit en janvier.',
    'be going to passif : am / is / are going to be + participe passé.', 'be going to au passif',
    E('Passive be going to: am / is / are going to be + past participle.', 'be going to in the passive')),
  c('Someone can solve this problem. This problem ___.', ['can be solved'], "Quelqu'un peut résoudre ce problème.",
    'Modal passif : modal + be + participe passé.', 'modal + be + participe passé',
    E('Passive with a modal: modal + be + past participle.', 'modal + be + past participle')),
  c('We must submit the report by Friday. The report ___.', ['must be submitted'], 'Nous devons remettre le rapport avant vendredi.',
    'Modal passif : must be + participe passé. submit double son t : submitted.', 'modal + be + participe passé',
    E('Passive with a modal: must be + past participle. submit doubles its t: submitted.', 'modal + be + past participle'))
];

const guideeB = [
  c('They should test the software before launch. The software ___.', ['should be tested before launch'], 'Ils devraient tester le logiciel avant le lancement.',
    'should + be + participe passé.', 'should + be + participe passé',
    E('should + be + past participle.', 'should + be + past participle')),
  c('The company might delay the project. The project ___.', ['might be delayed'], "L'entreprise pourrait retarder le projet.",
    'might + be + participe passé.', 'might + be + participe passé',
    E('might + be + past participle.', 'might + be + past participle')),
  c('They had to cancel the experiment. The experiment ___.', [['had to be cancelled', 'had to be canceled']], "Ils ont dû annuler l'expérience.",
    "had to + be + participe passé. cancelled (britannique) et canceled (américain) sont acceptés.", 'had to + be + participe passé',
    E('had to + be + past participle. cancelled (British) and canceled (American) are both accepted.', 'had to + be + past participle')),
  c('She gave me the results. (2 objets) I ___. / The results ___.', [['was given the results', 'was given the results by her'], ['were given to me', 'were given to me by her']], 'Elle m\'a donné les résultats.',
    "Avec give, les deux objets peuvent devenir sujet : I was given the results, ou The results were given to me.", '2 passifs possibles',
    E('With give, both objects can become the subject: I was given the results, or The results were given to me.', '2 passives are possible',
      { s: 'She gave me the results. (2 objects) I ___. / The results ___.' })),
  c('They sent her a new contract. She ___. / A new contract ___.', [['was sent a new contract', 'was sent a new contract by them'], ['was sent to her', 'was sent to her by them']], "Ils lui ont envoyé un nouveau contrat.",
    "Avec send, les deux objets peuvent devenir sujet : She was sent a new contract, ou A new contract was sent to her.", '2 passifs possibles',
    E('With send, both objects can become the subject: She was sent a new contract, or A new contract was sent to her.', '2 passives are possible')),
  c('The manager will give us the feedback. We ___. / The feedback ___.', ['will be given the feedback', 'will be given to us'], 'Le responsable nous donnera les retours.',
    "Les deux objets peuvent devenir sujet : We will be given the feedback, ou The feedback will be given to us.", '2 passifs possibles',
    E('Both objects can become the subject: We will be given the feedback, or The feedback will be given to us.', '2 passives are possible')),
  c('We need to verify all the data. All the data ___.', [['needs to be verified', 'need to be verified']], 'Nous devons vérifier toutes les données.',
    'need to + be + participe passé. data est accepté au singulier (needs) comme au pluriel (need).', 'need to be + participe passé',
    E('need to + be + past participle. data is accepted as singular (needs) or plural (need).', 'need to be + past participle')),
  c('They ought to redesign the interface. The interface ___.', ['ought to be redesigned'], "Ils devraient repenser l'interface.",
    'ought to + be + participe passé.', 'ought to be + participe passé',
    E('ought to + be + past participle.', 'ought to be + past participle')),
  c('Nobody has signed the document yet. The document ___.', ["hasn't been signed yet"], "Personne n'a encore signé le document.",
    "Present Perfect passif négatif : hasn't been + participe passé. Le sujet actif nobody disparaît, le sens négatif passe dans le verbe.", 'has + négation + been + participe passé',
    E("Negative passive present perfect: hasn't been + past participle. The active subject nobody disappears, the negative meaning goes into the verb.", 'has + negative + been + past participle')),
  c('Someone is going to assess the risks. The risks ___.', ['are going to be assessed'], "Quelqu'un va évaluer les risques.",
    'be going to passif : are going to be + participe passé. Le sujet the risks est pluriel.', 'sujet pluriel',
    E('Passive be going to: are going to be + past participle. The subject the risks is plural.', 'plural subject'))
];

const nivA = [
  PA('The technician checks the equipment every day.', by('The equipment is checked every day.', 'the technician'), 'Le technicien vérifie le matériel tous les jours.', 'Present Simple passif : is / are + participe passé.', 'Passive present simple: is / are + past participle.'),
  PA('Someone broke the window last night.', ['The window was broken last night.'], "Quelqu'un a cassé la fenêtre la nuit dernière.", 'Past Simple passif : was + participe passé. break est irrégulier : broken.', 'Passive past simple: was + past participle. break is irregular: broken.'),
  PA('They are testing the new software.', ['The new software is being tested.'], 'Ils testent le nouveau logiciel.', 'Present Continuous passif : is / are being + participe passé.', 'Passive present continuous: is / are being + past participle.'),
  PA('Scientists have confirmed the results.', by('The results have been confirmed.', 'scientists'), 'Des scientifiques ont confirmé les résultats.', 'Present Perfect passif : have / has been + participe passé.', 'Passive present perfect: have / has been + past participle.'),
  PA('The company will announce the merger tomorrow.', by('The merger will be announced tomorrow.', 'the company'), "L'entreprise annoncera la fusion demain.", 'Futur passif : will be + participe passé.', 'Passive future: will be + past participle.'),
  PA('They can solve this problem easily.', ['This problem can be solved easily.'], 'Ils peuvent résoudre ce problème facilement.', 'Modal passif : can be + participe passé.', 'Passive with a modal: can be + past participle.'),
  PA('The workers had built the bridge before 2010.', by('The bridge had been built before 2010.', 'the workers'), 'Les ouvriers avaient construit le pont avant 2010.', 'Past Perfect passif : had been + participe passé.', 'Passive past perfect: had been + past participle.'),
  PA('Someone is reading your email right now.', ['Your email is being read right now.'], "Quelqu'un est en train de lire ton e-mail en ce moment.", 'Present Continuous passif : is being + participe passé. read garde la même orthographe.', 'Passive present continuous: is being + past participle. read keeps the same spelling.'),
  PA('We must complete the analysis by Monday.', ['The analysis must be completed by Monday.'], "Nous devons terminer l'analyse avant lundi.", 'Modal passif : must be + participe passé.', 'Passive with a modal: must be + past participle.'),
  PA('They have just delivered the prototype.', ['The prototype has just been delivered.'], 'Ils viennent de livrer le prototype.', 'Present Perfect passif : has just been + participe passé. just se place après has.', 'Passive present perfect: has just been + past participle. just goes after has.')
];

const nivB = [
  PA('The professor explained the theory clearly.', by('The theory was explained clearly.', 'the professor'), 'Le professeur a expliqué clairement la théorie.', 'Past Simple passif : was + participe passé.', 'Passive past simple: was + past participle.'),
  PA('Engineers are developing new AI tools.', by('New AI tools are being developed.', 'engineers'), "Des ingénieurs développent de nouveaux outils d'IA.", 'Present Continuous passif : are being + participe passé.', 'Passive present continuous: are being + past participle.'),
  PA('They should update the software regularly.', ['The software should be updated regularly.'], 'Ils devraient mettre à jour le logiciel régulièrement.', 'Modal passif : should be + participe passé.', 'Passive with a modal: should be + past participle.'),
  PA('We had finished the report before the meeting.', ['The report had been finished before the meeting.'], 'Nous avions terminé le rapport avant la réunion.', 'Past Perfect passif : had been + participe passé.', 'Passive past perfect: had been + past participle.'),
  PA('The committee will review all applications.', by('All applications will be reviewed.', 'the committee'), 'Le comité examinera toutes les candidatures.', 'Futur passif : will be + participe passé.', 'Passive future: will be + past participle.'),
  PA('Someone has corrected all the mistakes.', ['All the mistakes have been corrected.'], "Quelqu'un a corrigé toutes les erreurs.", 'Present Perfect passif : have been + participe passé (mistakes est pluriel).', 'Passive present perfect: have been + past participle (mistakes is plural).'),
  PA('The manager signed the contract yesterday.', by('The contract was signed yesterday.', 'the manager'), 'Le responsable a signé le contrat hier.', 'Past Simple passif : was + participe passé.', 'Passive past simple: was + past participle.'),
  PA('They might postpone the deadline.', ['The deadline might be postponed.'], 'Ils pourraient repousser la date limite.', 'Modal passif : might be + participe passé.', 'Passive with a modal: might be + past participle.'),
  PA('The lab is running three simultaneous experiments.', ['Three simultaneous experiments are being run.'], 'Le laboratoire mène trois expériences simultanées.', 'Present Continuous passif : are being + participe passé. run est irrégulier et ne change pas.', 'Passive present continuous: are being + past participle. run is irregular and does not change.'),
  PA('We need to verify all the data before submission.', ['All the data needs to be verified before submission.', 'All the data need to be verified before submission.'], 'Nous devons vérifier toutes les données avant la soumission.', 'need to + be + participe passé.', 'need to + be + past participle.')
];

const nivC = [
  AC('The report was written by the senior engineer.', ['The senior engineer wrote the report.'], "Le rapport a été rédigé par l'ingénieur senior.", "Le by + agent devient le sujet. was written devient wrote (Past Simple actif).", 'The by + agent becomes the subject. was written becomes wrote (active past simple).'),
  AC('The samples have been analysed by the laboratory.', [...sp('The laboratory has analysed the samples.')], "Les échantillons ont été analysés par le laboratoire.", "Le laboratoire devient le sujet. have been analysed devient has analysed (Present Perfect actif, laboratory est singulier).", 'The laboratory becomes the subject. have been analysed becomes has analysed (active present perfect, laboratory is singular).'),
  AC('New regulations will be introduced by the government.', ['The government will introduce new regulations.'], 'De nouvelles réglementations seront introduites par le gouvernement.', "Le gouvernement devient le sujet. will be introduced devient will introduce.", 'The government becomes the subject. will be introduced becomes will introduce.'),
  AC('The machine is being repaired by a technician.', ['A technician is repairing the machine.'], 'La machine est en cours de réparation par un technicien.', "A technician devient le sujet. is being repaired devient is repairing.", 'A technician becomes the subject. is being repaired becomes is repairing.'),
  AC('The error had been detected by the system before we arrived.', ['The system had detected the error before we arrived.'], "L'erreur avait été détectée par le système avant notre arrivée.", "Le système devient le sujet. had been detected devient had detected (Past Perfect actif).", 'The system becomes the subject. had been detected becomes had detected (active past perfect).'),
  tx(FIX, 'The report is wrote by the team every month.', ['The report is written by the team every month.'], "Le rapport est rédigé par l'équipe tous les mois.", "Après is, on emploie le participe passé : written, pas wrote.", E('After is, use the past participle: written, not wrote.')),
  tx(FIX, 'The machine was been repaired last week.', ['The machine was repaired last week.'], 'La machine a été réparée la semaine dernière.', "Au Past Simple passif, un seul be suffit : was repaired. was been est impossible.", E('In the passive past simple, a single be is enough: was repaired. was been is impossible.')),
  tx(FIX, 'The results will published next week.', ['The results will be published next week.'], 'Les résultats seront publiés la semaine prochaine.', 'Il manque be : will be + participe passé.', E('be is missing: will be + past participle.')),
  tx(FIX, 'The system is being check by engineers.', ['The system is being checked by engineers.'], "Le système est en cours de vérification par des ingénieurs.", 'Après being, on emploie le participe passé : checked.', E('After being, use the past participle: checked.')),
  tx(FIX, 'It have been decided to postpone the launch.', ['It has been decided to postpone the launch.'], 'Il a été décidé de reporter le lancement.', 'Le sujet it est singulier : has been, pas have been.', E('The subject it is singular: has been, not have been.'))
];

const nivD = [
  PA('We collected the samples from three different sites.', ['The samples were collected from three different sites.'], 'Nous avons recueilli les échantillons sur trois sites différents.', 'En style scientifique, on évite we : Past Simple passif, were collected.', 'In scientific style we avoid we: passive past simple, were collected.'),
  PA('The team analysed them using spectroscopy.', [...sp('They were analysed using spectroscopy.')], "L'équipe les a analysés par spectroscopie.", "them (les échantillons) devient le sujet they. Past Simple passif : were analysed.", 'them (the samples) becomes the subject they. Passive past simple: were analysed.'),
  PA('Researchers have recently published the findings in Nature.', by('The findings have recently been published in Nature.', 'researchers'), 'Des chercheurs ont récemment publié les résultats dans Nature.', 'Present Perfect passif : have recently been published. recently se place après have.', 'Passive present perfect: have recently been published. recently goes after have.'),
  PA('They will conduct a second study to confirm the results.', ['A second study will be conducted to confirm the results.'], 'Ils mèneront une seconde étude pour confirmer les résultats.', "Futur passif : will be conducted. L'agent they est omis.", 'Passive future: will be conducted. The agent they is left out.'),
  PA('The peer review process validated the methodology.', ['The methodology was validated by the peer review process.'], "Le processus de relecture par les pairs a validé la méthodologie.", "L'agent est ici important, donc by est conservé : was validated by the peer review process.", 'The agent matters here, so by is kept: was validated by the peer review process.'),
  tr('Les données ont été recueillies sur une période de six mois.', ['The data were collected over a period of six months.', 'The data was collected over a period of six months.'],
    'Present Perfect ou Past Simple passif ? Ici une période terminée : were collected. data est accepté au pluriel (were) comme au singulier (was).',
    E('Present perfect or past simple passive? Here the period is finished: were collected. data is accepted as plural (were) or singular (was).')),
  tr('Le prototype est actuellement testé dans des conditions réelles.', ['The prototype is currently being tested under real conditions.', 'The prototype is currently being tested in real conditions.'],
    'Present Continuous passif : is being tested. under conditions est la préposition habituelle.',
    E('Passive present continuous: is being tested. under conditions is the usual preposition.')),
  tr("Cette technique a été mise au point par une équipe de l'INRIA.", ['This technique was developed by a team from INRIA.', 'This technique was developed by a team at INRIA.'],
    'Past Simple passif : was developed by + agent. mettre au point se traduit par develop.',
    E('Passive past simple: was developed by + agent. mettre au point is translated by develop.')),
  tr('Les résultats devront être vérifiés avant publication.', ['The results will have to be verified before publication.', 'The results will need to be verified before publication.'],
    'devront = will have to ou will need to, suivi de be + participe passé.',
    E('devront = will have to or will need to, followed by be + past participle.')),
  tr('Des mesures supplémentaires auraient dû être prises plus tôt.', ['Additional measures should have been taken earlier.', 'Further measures should have been taken earlier.', 'Additional measures should have been taken sooner.'],
    'Regret dans le passé : should have been + participe passé. take des mesures se dit take measures.',
    E('Regret about the past: should have been + past participle. To take measures is take measures.'))
];

const bonus = [
  op('Quel registre préférer dans un article scientifique ?', 'Researchers found a new treatment. / A new treatment was found.',
    ["La seconde phrase, au passif. Dans un article scientifique, on évite le pronom personnel et on met en avant le résultat plutôt que les chercheurs. La phrase active reste correcte, par exemple dans un communiqué de presse."],
    'Qui est important : les chercheurs ou le résultat ?',
    E(null, 'Who matters most: the researchers or the result?', { instr: 'Which register is better in a scientific article?', m: ['The second sentence, in the passive. In a scientific article the personal pronoun is avoided and the result is put forward rather than the researchers. The active sentence remains correct, for example in a press release.'] })),
  op('Peut-on mettre cette phrase au passif ? Pourquoi ?', 'We apologise for the delay.',
    ["Pas idéalement : une excuse personnelle sonne mal sans personne qui s'excuse. En registre très formel, on peut écrire Apologies are offered for the delay."],
    "Qui s'excuse ?",
    E(null, 'Who is apologising?', { instr: 'Can this sentence be put into the passive? Why?', m: ['Not ideally: a personal apology sounds odd with nobody apologising. In very formal register you can write Apologies are offered for the delay.'] })),
  es('Rédige trois phrases de compte rendu de travaux pratiques à la voix passive.',
    'Exemples de départ : The solution was prepared... / The temperature was recorded...',
    ['The solution was prepared by dissolving 5 g of salt in 100 mL of water. The temperature was recorded every two minutes. The results were tabulated and compared with the expected values.'],
    'Vérifie : be au bon temps + participe passé, et pas de « we » ni de « I ».',
    E(null, 'Check: be in the right tense + past participle, and no we or I.', {
      instr: 'Write three sentences of a lab report in the passive.',
      s: 'Starting examples: The solution was prepared... / The temperature was recorded...' }))
];

const devoir = [
  PA('They test the equipment every six months.', ['The equipment is tested every six months.'], "Ils testent le matériel tous les six mois.", 'Present Simple passif.', 'Passive present simple.'),
  PA('Someone had already fixed the problem when we arrived.', ['The problem had already been fixed when we arrived.'], "Quelqu'un avait déjà réglé le problème quand nous sommes arrivés.", 'Past Perfect passif : had already been fixed.', 'Passive past perfect: had already been fixed.'),
  PA('The team is analysing the data right now.', [...sp('The data is being analysed right now.'), ...sp('The data are being analysed right now.')], "L'équipe analyse les données en ce moment.", 'Present Continuous passif : is / are being analysed. data est accepté au singulier comme au pluriel.', 'Passive present continuous: is / are being analysed. data is accepted as singular or plural.'),
  PA('They should publish the findings as soon as possible.', ['The findings should be published as soon as possible.'], 'Ils devraient publier les résultats dès que possible.', 'Modal passif : should be published.', 'Passive with a modal: should be published.'),
  PA('She has written three full reports this month.', by('Three full reports have been written this month.', 'her'), 'Elle a rédigé trois rapports complets ce mois-ci.', 'Present Perfect passif : have been written (reports est pluriel).', 'Passive present perfect: have been written (reports is plural).'),
  PA('We will review the proposal next week.', ['The proposal will be reviewed next week.'], 'Nous examinerons la proposition la semaine prochaine.', 'Futur passif : will be reviewed.', 'Passive future: will be reviewed.'),
  PA('The manager approved the budget yesterday morning.', by('The budget was approved yesterday morning.', 'the manager'), 'Le responsable a approuvé le budget hier matin.', 'Past Simple passif : was approved.', 'Passive past simple: was approved.'),
  PA('They might cancel the project due to budget cuts.', [...['The project might be cancelled due to budget cuts.', 'The project might be canceled due to budget cuts.']], 'Ils pourraient annuler le projet à cause des coupes budgétaires.', 'Modal passif : might be cancelled.', 'Passive with a modal: might be cancelled.'),
  PA('Someone must check all the results before submission.', ['All the results must be checked before submission.'], "Quelqu'un doit vérifier tous les résultats avant la soumission.", 'Modal passif : must be checked.', 'Passive with a modal: must be checked.'),
  PA('They are currently building a new research laboratory.', ['A new research laboratory is currently being built.'], 'Ils construisent actuellement un nouveau laboratoire de recherche.', 'Present Continuous passif : is currently being built. currently se place après is.', 'Passive present continuous: is currently being built. currently goes after is.'),
  PA('The engineer had designed the system before the merger.', by('The system had been designed before the merger.', 'the engineer'), "L'ingénieur avait conçu le système avant la fusion.", 'Past Perfect passif : had been designed.', 'Passive past perfect: had been designed.'),
  PA('We ought to reconsider the approach.', ['The approach ought to be reconsidered.'], "Nous devrions reconsidérer l'approche.", 'ought to + be + participe passé.', 'ought to + be + past participle.'),
  PA('Chemists discovered this compound in the 1980s.', by('This compound was discovered in the 1980s.', 'chemists'), 'Des chimistes ont découvert ce composé dans les années 1980.', 'Past Simple passif : was discovered.', 'Passive past simple: was discovered.'),
  PA('The professor is going to explain the experiment tomorrow.', by('The experiment is going to be explained tomorrow.', 'the professor'), "Le professeur va expliquer l'expérience demain.", 'be going to passif : is going to be explained.', 'Passive be going to: is going to be explained.'),
  PA('The committee may approve new regulations next month.', by('New regulations may be approved next month.', 'the committee'), 'Le comité pourrait approuver de nouvelles réglementations le mois prochain.', 'Modal passif : may be approved.', 'Passive with a modal: may be approved.')
];

const m5aEx1 = [
  PA('A technician services the machines every month.', by('The machines are serviced every month.', 'a technician'), 'Un technicien entretient les machines tous les mois.', 'Present Simple passif : are serviced.', 'Passive present simple: are serviced.'),
  PA('They were testing the prototype when it failed.', ['The prototype was being tested when it failed.'], 'Ils testaient le prototype quand il est tombé en panne.', 'Past Continuous passif : was being tested.', 'Passive past continuous: was being tested.'),
  PA('Scientists have recently confirmed the theory.', by('The theory has recently been confirmed.', 'scientists'), 'Des scientifiques ont récemment confirmé la théorie.', 'Present Perfect passif : has recently been confirmed.', 'Passive present perfect: has recently been confirmed.'),
  PA('Someone must check all results before publication.', ['All results must be checked before publication.'], "Quelqu'un doit vérifier tous les résultats avant la publication.", 'Modal passif : must be checked.', 'Passive with a modal: must be checked.'),
  PA('They had completed the form before the deadline.', ['The form had been completed before the deadline.'], 'Ils avaient rempli le formulaire avant la date limite.', 'Past Perfect passif : had been completed.', 'Passive past perfect: had been completed.')
];

const m5aEx2 = [
  AC('The invoice was written by the senior accountant.', ['The senior accountant wrote the invoice.'], "La facture a été rédigée par le comptable principal.", 'Le by + agent devient le sujet. was written devient wrote.', 'The by + agent becomes the subject. was written becomes wrote.'),
  AC('New rules will be introduced by the board next year.', ['The board will introduce new rules next year.'], "De nouvelles règles seront introduites par le conseil l'année prochaine.", 'Le conseil devient le sujet. will be introduced devient will introduce.', 'The board becomes the subject. will be introduced becomes will introduce.'),
  AC('The measurements have been recorded by the lab.', ['The lab has recorded the measurements.'], 'Les mesures ont été enregistrées par le laboratoire.', 'Le laboratoire devient le sujet. have been recorded devient has recorded.', 'The lab becomes the subject. have been recorded becomes has recorded.'),
  AC('The pump is being replaced.', ['Someone is replacing the pump.', 'They are replacing the pump.', 'A technician is replacing the pump.', 'A team is replacing the pump.'], 'La pompe est en train d\'être remplacée.', "Sans agent, on choisit un sujet général (someone, they). is being replaced devient is replacing.", 'With no agent, choose a general subject (someone, they). is being replaced becomes is replacing.')
];

const m5b = [
  PA('We can solve this problem. (can)', ['This problem can be solved.'], 'Nous pouvons résoudre ce problème.', 'can be + participe passé.', 'can be + past participle.'),
  PA('We should back up the data regularly. (should)', ['The data should be backed up regularly.'], 'Nous devrions sauvegarder les données régulièrement.', 'should be + participe passé. back up devient backed up.', 'should be + past participle. back up becomes backed up.'),
  PA('They must verify all data before submission. (must)', ['All data must be verified before submission.'], 'Ils doivent vérifier toutes les données avant la soumission.', 'must be + participe passé.', 'must be + past participle.'),
  PA('We could interpret the results differently. (could)', ['The results could be interpreted differently.'], 'Nous pourrions interpréter les résultats différemment.', 'could be + participe passé.', 'could be + past participle.'),
  PA('They ought to redesign the interface. (ought to)', ['The interface ought to be redesigned.'], "Ils devraient repenser l'interface.", 'ought to be + participe passé.', 'ought to be + past participle.')
];

const SAID = 'Transforme avec It is said that, ou avec sujet + is said to.';
const ENSAID = 'Rewrite with It is said that..., or with subject + is said to...';
const rep = (s, a, fr, why, en, instrEn) => tx(SAID, s, a, fr, why, E(en, null, { instr: instrEn || ENSAID }));
const m5c = [
  rep('People say (that) the factory produces 10,000 units a day.', ['It is said that the factory produces 10,000 units a day.', 'The factory is said to produce 10,000 units a day.'], "On dit que l'usine produit 10 000 unités par jour.", "Deux constructions : It is said that + proposition, ou sujet + is said to + infinitif (action simultanée).", 'Two constructions: It is said that + clause, or subject + is said to + infinitive (simultaneous action).'),
  rep('People believe (that) the new CEO increased profits significantly.', ['It is believed that the new CEO increased profits significantly.', 'The new CEO is believed to have increased profits significantly.'], 'On pense que le nouveau PDG a fortement augmenté les bénéfices.', "Action antérieure : sujet + is believed to have + participe passé.", 'Earlier action: subject + is believed to have + past participle.'),
  rep('People think (that) the merger will fail.', ['It is thought that the merger will fail.'], "On pense que la fusion échouera.", "Pour un événement futur, on garde la construction It is thought that + will. La forme is thought to fail n'est pas utilisée pour le futur.", 'For a future event, keep It is thought that + will. The form is thought to fail is not used for the future.'),
  rep('People report (that) two employees resigned yesterday.', ['It is reported that two employees resigned yesterday.', 'Two employees are reported to have resigned yesterday.'], 'On rapporte que deux employés ont démissionné hier.', "Action antérieure : are reported to have + participe passé (resign devient resigned).", 'Earlier action: are reported to have + past participle (resign becomes resigned).'),
  rep('People say (that) the company is losing money.', ['It is said that the company is losing money.', 'The company is said to be losing money.'], "On dit que l'entreprise perd de l'argent.", "Action en cours : is said to be + verbe en -ing.", 'Action in progress: is said to be + verb in -ing.')
];

const HD = 'Reformule avec have ou get something done.';
const ENHD = 'Rewrite with have or get something done.';
const hv = (s, a, fr, why, en) => tx(HD, s, a, fr, why, E(en, null, { instr: ENHD }));
const m5d = [
  hv('A technician installs the software for us.', ['We have the software installed.', 'We get the software installed.'], 'Un technicien installe le logiciel pour nous.', "have + objet + participe passé : on fait faire l'action par quelqu'un d'autre.", 'have + object + past participle: someone else does the action for us.'),
  hv('Someone cleans the office every evening.', ['We have the office cleaned every evening.', 'We get the office cleaned every evening.'], "Quelqu'un nettoie le bureau chaque soir.", 'have + objet + participe passé, au Present Simple.', 'have + object + past participle, in the present simple.'),
  hv('A specialist checked the results.', ['We had the results checked.', 'We got the results checked.'], 'Un spécialiste a vérifié les résultats.', 'Au passé : had + objet + participe passé.', 'In the past: had + object + past participle.'),
  hv('Someone will repair the machine tomorrow.', ['We will have the machine repaired tomorrow.', 'We will get the machine repaired tomorrow.'], "Quelqu'un réparera la machine demain.", 'Au futur : will have + objet + participe passé.', 'In the future: will have + object + past participle.'),
  hv('You should ask a lawyer to check the contract.', ['You should get the contract checked by a lawyer.', 'You should have the contract checked by a lawyer.', 'You should get the contract checked.', 'You should have the contract checked.'], 'Tu devrais demander à un avocat de vérifier le contrat.', 'should get / have + objet + participe passé, avec by + agent facultatif.', 'should get / have + object + past participle, with an optional by + agent.')
];

const sb = (words, a, fr, why, en) => tx('Remets les mots dans l\'ordre pour former une phrase correcte.', words, a, fr, why, E(en, null, { instr: 'Put the words in the right order to make a correct sentence.' }));
const m5e = [
  sb('bridge / in / 2015 / built / the / was', ['The bridge was built in 2015.', 'In 2015 the bridge was built.'], 'Le pont a été construit en 2015.', 'Past Simple passif : was built.', 'Passive past simple: was built.'),
  sb('device / worldwide / used / this / is', ['This device is used worldwide.'], 'Cet appareil est utilisé dans le monde entier.', 'Present Simple passif : is used.', 'Passive present simple: is used.'),
  sb('data / tomorrow / analysed / will / be / the', ['The data will be analysed tomorrow.', 'The data will be analyzed tomorrow.'], 'Les données seront analysées demain.', 'Futur passif : will be analysed.', 'Passive future: will be analysed.'),
  sb('project / delayed / has / been / the', ['The project has been delayed.'], 'Le projet a été retardé.', 'Present Perfect passif : has been delayed.', 'Passive present perfect: has been delayed.'),
  sb('mistakes / avoided / should / be', ['Mistakes should be avoided.'], 'Les erreurs devraient être évitées.', 'Modal passif : should be avoided.', 'Passive with a modal: should be avoided.'),
  sb('car / repaired / being / is / the', ['The car is being repaired.'], 'La voiture est en cours de réparation.', 'Present Continuous passif : is being repaired.', 'Passive present continuous: is being repaired.'),
  sb('samples / already / tested / had / been / the', ['The samples had already been tested.'], 'Les échantillons avaient déjà été testés.', 'Past Perfect passif : had already been tested.', 'Passive past perfect: had already been tested.'),
  sb('required / submit / the / form / you / are / to', ['You are required to submit the form.'], 'Vous devez remettre le formulaire.', 'be required to + base verbale : obligation exprimée au passif.', 'be required to + base form: an obligation expressed in the passive.')
];

const th = [
  tr('Ce tunnel a été construit en 2012.', ['This tunnel was built in 2012.', 'The tunnel was built in 2012.'], 'Past Simple passif : was built.', E('Passive past simple: was built.')),
  tr("On dit que le laboratoire manque de personnel.", ['It is said that the laboratory is short of staff.', 'The laboratory is said to be short of staff.', 'It is said that the lab is short of staff.', 'The lab is said to be short of staff.', 'The laboratory is said to be understaffed.'], "It is said that + proposition, ou sujet + is said to be.", E('It is said that + clause, or subject + is said to be.')),
  tr('Je fais nettoyer mon bureau chaque semaine.', ['I have my office cleaned every week.', 'I get my office cleaned every week.'], "have + objet + participe passé : on fait faire l'action par quelqu'un d'autre.", E('have + object + past participle: someone else does the action.')),
  tr('Les règles de sécurité doivent être respectées.', ['The safety rules must be followed.', 'Safety rules must be followed.', 'The safety rules must be respected.', 'Safety rules must be respected.'], 'Modal passif : must be + participe passé. On dit follow rules ou respect rules.', E('Passive with a modal: must be + past participle. You can say follow rules or respect rules.')),
  tr('Le rapport a été envoyé hier.', ['The report was sent yesterday.'], 'Past Simple passif : was sent. send est irrégulier : sent.', E('Passive past simple: was sent. send is irregular: sent.')),
  tr("Le directeur financier aurait démissionné.", ['The finance director is said to have resigned.', 'The financial director is said to have resigned.', 'The finance director is believed to have resigned.', 'It is said that the finance director resigned.'], "Le conditionnel journalistique se traduit par is said to have + participe passé (action antérieure).", E('The French journalistic conditional is translated by is said to have + past participle (earlier action).')),
  tr('Vous devriez faire relire ce document par un collègue.', ['You should get this document checked by a colleague.', 'You should have this document checked by a colleague.', 'You should get this document proofread by a colleague.', 'You should have this document proofread by a colleague.'], 'should get / have + objet + participe passé, avec by + agent.', E('should get / have + object + past participle, with by + agent.'))
];


/* ---------- Exercices supplémentaires (inédits) ---------- */
// Supplément A : histoire et découvertes (actif vers passif, temps variés)
const extraA = [
  PA('Vincenzo Peruggia stole the Mona Lisa from the Louvre in 1911.',
    ['The Mona Lisa was stolen from the Louvre in 1911 by Vincenzo Peruggia.', 'The Mona Lisa was stolen by Vincenzo Peruggia from the Louvre in 1911.', 'The Mona Lisa was stolen from the Louvre by Vincenzo Peruggia in 1911.'],
    'Vincenzo Peruggia a volé la Joconde au Louvre en 1911.',
    "Past Simple passif : was stolen. L'agent est un nom propre, donc on garde by Vincenzo Peruggia. steal est irrégulier : stole, stolen.",
    'Passive past simple: was stolen. The agent is a proper name, so by Vincenzo Peruggia is kept. steal is irregular: stole, stolen.'),
  PA("Howard Carter's team discovered Tutankhamun's tomb in 1922.",
    by("Tutankhamun's tomb was discovered in 1922.", "Howard Carter's team"),
    "L'équipe de Howard Carter a découvert la tombe de Toutânkhamon en 1922.",
    "Past Simple passif : was discovered. Le by + agent est facultatif : on peut le garder pour dire qui a fait la découverte.",
    'Passive past simple: was discovered. The by + agent phrase is optional: keep it to say who made the discovery.'),
  PA('Archaeologists have uncovered a Roman bath house beneath a supermarket car park.',
    by('A Roman bath house has been uncovered beneath a supermarket car park.', 'archaeologists'),
    'Des archéologues ont mis au jour des thermes romains sous le parking d\'un supermarché.',
    "Present Perfect passif : has been uncovered. Le sujet est a Roman bath house (singulier), donc has been. L'agent archaeologists est évident : on l'omet le plus souvent.",
    'Passive present perfect: has been uncovered. The subject is a Roman bath house (singular), so has been. The agent archaeologists is obvious: it is usually left out.'),
  PA("While restorers were cleaning the fresco, someone discovered a hidden signature.",
    ['While the fresco was being cleaned, a hidden signature was discovered.', 'While the fresco was being cleaned by restorers, a hidden signature was discovered.',
      'A hidden signature was discovered while the fresco was being cleaned.', 'A hidden signature was discovered while the fresco was being cleaned by restorers.'],
    "Pendant que des restaurateurs nettoyaient la fresque, quelqu'un a découvert une signature cachée.",
    "Deux verbes à passer au passif. Past Continuous passif : was being cleaned. Past Simple passif : was discovered. L'agent someone est omis.",
    'Two verbs to put into the passive. Passive past continuous: was being cleaned. Passive past simple: was discovered. The agent someone is left out.'),
  PA("By the time rescuers arrived, the storm had destroyed the village's only bridge.",
    ["By the time rescuers arrived, the village's only bridge had been destroyed by the storm.", "The village's only bridge had been destroyed by the storm by the time rescuers arrived."],
    "Quand les secours sont arrivés, la tempête avait détruit l'unique pont du village.",
    "Past Perfect passif : had been destroyed. L'agent the storm est la cause : on garde by the storm. arrived est intransitif, il ne change pas.",
    'Passive past perfect: had been destroyed. The agent the storm is the cause: by the storm is kept. arrived is intransitive, so it does not change.'),
  PA('The jury will not announce the name of the winner until midnight.',
    ['The name of the winner will not be announced until midnight.', 'The name of the winner will not be announced by the jury until midnight.', 'The name of the winner will not be announced until midnight by the jury.',
      "The winner's name will not be announced until midnight.", "The winner's name will not be announced by the jury until midnight.", "The winner's name will not be announced until midnight by the jury."],
    "Le jury n'annoncera pas le nom du gagnant avant minuit.",
    'Futur passif négatif : will not be announced. La négation se place après will.',
    'Passive future, negative: will not be announced. The negation goes after will.'),
  PA('The council is going to demolish the old stadium and replace it with a park.',
    ['The old stadium is going to be demolished and replaced with a park.', 'The old stadium is going to be demolished and replaced by a park.',
      'The old stadium is going to be demolished and is going to be replaced with a park.', 'The old stadium is going to be demolished and is going to be replaced by a park.',
      'The old stadium is going to be demolished by the council and replaced with a park.', 'The old stadium is going to be demolished by the council and replaced by a park.'],
    "La municipalité va démolir le vieux stade et le remplacer par un parc.",
    "going to + be + participe passé. Deux verbes partagent le même sujet : is going to be demolished and replaced. it (le stade) a déjà servi de sujet, on ne le répète pas.",
    'going to + be + past participle. Two verbs share the same subject: is going to be demolished and replaced. it (the stadium) is already the subject, so it is not repeated.'),
  PA("You mustn't photograph the paintings with a flash.",
    ["The paintings mustn't be photographed with a flash.", 'The paintings must not be photographed with a flash.'],
    "Il est interdit de photographier les tableaux avec un flash.",
    "Modal passif : must not + be + participe passé. Le sujet général you disparaît.",
    'Passive with a modal: must not + be + past participle. The general subject you disappears.'),
  PA('The university awarded the young researcher a prestigious scholarship.',
    [...by('The young researcher was awarded a prestigious scholarship.', 'the university'), ...by('A prestigious scholarship was awarded to the young researcher.', 'the university')],
    "L'université a attribué une bourse prestigieuse au jeune chercheur.",
    "award a deux compléments. Deux passifs sont possibles : The young researcher was awarded a prestigious scholarship, ou A prestigious scholarship was awarded to the young researcher.",
    'award takes two objects. Two passives are possible: The young researcher was awarded a prestigious scholarship, or A prestigious scholarship was awarded to the young researcher.'),
  PA('People expect the new law to reduce plastic waste significantly.',
    ['The new law is expected to reduce plastic waste significantly.', 'The new law is expected to significantly reduce plastic waste.', 'It is expected that the new law will reduce plastic waste significantly.', 'It is expected that the new law will significantly reduce plastic waste.'],
    "On s'attend à ce que la nouvelle loi réduise nettement les déchets plastiques.",
    "Deux constructions : sujet + is expected to + infinitif, ou It is expected that + proposition (avec will pour le futur).",
    'Two constructions: subject + is expected to + infinitive, or It is expected that + clause (with will for the future).')
];

// Supplément B : formes difficiles (compléter)
const extraB = [
  c('This cathedral ___ (restore) several times since the Middle Ages.', [['has been restored']], 'Cette cathédrale a été restaurée plusieurs fois depuis le Moyen Âge.',
    "Present Perfect passif : has been + participe passé. since impose le Present Perfect.", 'since + une date de début',
    E('Passive present perfect: has been + past participle. since requires the present perfect.', 'since + a starting point')),
  c('The suspect ___ (question) when his lawyer finally arrived.', [['was being questioned']], "Le suspect était en train d'être interrogé quand son avocat est enfin arrivé.",
    "Past Continuous passif : was / were being + participe passé. L'action était en cours quand l'autre s'est produite.", 'action en cours dans le passé',
    E('Passive past continuous: was / were being + past participle. The action was in progress when the other one happened.', 'action in progress in the past')),
  c('The vase is in pieces. It ___ (must / break) while we were out.', [['must have been broken']], "Le vase est en morceaux. Il a dû être cassé pendant notre absence.",
    "Déduction sur le passé : must + have been + participe passé.", 'déduction certaine sur le passé',
    E('Deduction about the past: must + have been + past participle.', 'certain deduction about the past')),
  c('She hates ___ (tell) what to do.', [['being told', 'to be told']], "Elle déteste qu'on lui dise quoi faire.",
    "Après hate, on peut employer la forme en -ing ou l'infinitif. Au passif : being + participe passé, ou to be + participe passé.", 'verbe + forme en -ing au passif',
    E('After hate you can use the -ing form or the infinitive. In the passive: being + past participle, or to be + past participle.', '-ing form of the passive')),
  c('The survivors expect ___ (rescue) before nightfall.', [['to be rescued']], "Les survivants s'attendent à être secourus avant la nuit.",
    "expect + infinitif passif : to be + participe passé.", 'infinitif passif',
    E('expect + passive infinitive: to be + past participle.', 'passive infinitive')),
  c('Several tourists ___ (injure) when the cable car stopped suddenly, but nobody ___ (kill).', [['were injured', 'got injured'], ['was killed', 'got killed']], "Plusieurs touristes ont été blessés quand la télécabine s'est arrêtée brusquement, mais personne n'a été tué.",
    "Past Simple passif : were injured, was killed (nobody est singulier). On peut aussi employer get à la place de be : got injured, got killed.", 'singulier ou pluriel ?',
    E('Passive past simple: were injured, was killed (nobody is singular). You can also use get instead of be: got injured, got killed.', 'singular or plural?')),
  c('When ___ the first modern Olympic Games ___ (hold)? In Athens, in 1896.', [['were'], ['held']], 'Quand les premiers Jeux olympiques modernes ont-ils eu lieu ? À Athènes, en 1896.',
    "Question au Past Simple passif : was / were + sujet + participe passé. Games est pluriel : were. hold est irrégulier : held.", 'sujet pluriel, verbe irrégulier',
    E('Question in the passive past simple: was / were + subject + past participle. Games is plural: were. hold is irregular: held.', 'plural subject, irregular verb')),
  c('The old factory ___ (pull down) next year to make room for flats.', [['will be pulled down', 'is going to be pulled down', 'is to be pulled down']], "La vieille usine sera démolie l'an prochain pour faire place à des appartements.",
    "Futur passif : will be + participe passé (ou is going to be). pull down est un verbe à particule : la particule down reste après le participe passé.", 'futur + verbe à particule',
    E('Passive future: will be + past participle (or is going to be). pull down is a phrasal verb: the particle down stays after the past participle.', 'future + phrasal verb')),
  c("The patient ___ (operate on) right now, so you can't see him.", [['is being operated on']], "Le patient est en train d'être opéré, donc vous ne pouvez pas le voir.",
    "Present Continuous passif : is being + participe passé. operate on est suivi d'une préposition qui reste à la fin : is being operated on.", 'right now + préposition finale',
    E('Passive present continuous: is being + past participle. operate on takes a preposition that stays at the end: is being operated on.', 'right now + final preposition')),
  c('The thieves ___ (believe) to have escaped through the sewers.', [['are believed', 'were believed']], "On pense que les voleurs se sont échappés par les égouts.",
    "Sujet + be believed to have + participe passé : l'évasion est antérieure à la croyance. Le présent (are believed) et le passé (were believed) sont possibles.", 'to have escaped = antérieur',
    E('Subject + be believed to have + past participle: the escape came before the belief. The present (are believed) and the past (were believed) are both possible.', 'to have escaped = earlier')),
];

// Supplément C : actif, passif et corrections
const extraC = [
  AC('Pompeii was buried by the eruption of Vesuvius in AD 79.', ['The eruption of Vesuvius buried Pompeii in AD 79.', 'The eruption of Mount Vesuvius buried Pompeii in AD 79.'],
    "Pompéi a été ensevelie par l'éruption du Vésuve en 79 après J.-C.",
    "L'agent after by devient le sujet. was buried devient buried (Past Simple actif).",
    'The agent after by becomes the subject. was buried becomes buried (active past simple).'),
  AC('The first image of a black hole was released by the Event Horizon Telescope collaboration in 2019.', ['The Event Horizon Telescope collaboration released the first image of a black hole in 2019.'],
    "La première image d'un trou noir a été publiée par la collaboration Event Horizon Telescope en 2019.",
    "Le by + agent devient le sujet. was released devient released.",
    'The by + agent becomes the subject. was released becomes released.'),
  AC('Thousands of trees have been planted by volunteers along the river this year.', ['Volunteers have planted thousands of trees along the river this year.'],
    "Des milliers d'arbres ont été plantés par des bénévoles le long de la rivière cette année.",
    "volunteers devient le sujet. have been planted devient have planted (Present Perfect actif).",
    'volunteers becomes the subject. have been planted becomes have planted (active present perfect).'),
  AC('The error could have been avoided by a simple safety check.', ['A simple safety check could have avoided the error.'],
    "L'erreur aurait pu être évitée par un simple contrôle de sécurité.",
    "could have been avoided devient could have avoided. Le by + agent devient le sujet.",
    'could have been avoided becomes could have avoided. The by + agent becomes the subject.'),
  AC('The winners will be given a medal by the mayor.', ['The mayor will give the winners a medal.', 'The mayor will give a medal to the winners.'],
    'Les gagnants recevront une médaille des mains du maire.',
    "the mayor devient le sujet. will be given devient will give. Deux ordres sont possibles : give the winners a medal, give a medal to the winners.",
    'the mayor becomes the subject. will be given becomes will give. Two orders are possible: give the winners a medal, give a medal to the winners.'),
  tx(FIX, 'The accident was happened at six in the morning.', ['The accident happened at six in the morning.', 'The accident occurred at six in the morning.', 'The accident took place at six in the morning.'],
    "L'accident s'est produit à six heures du matin.",
    "happen est intransitif : il n'a pas de complément d'objet, donc pas de passif. On dit The accident happened.",
    E('happen is intransitive: it has no object, so there is no passive. Say The accident happened.')),
  tx(FIX, 'The new stadium is building by a Spanish company.', ['The new stadium is being built by a Spanish company.', 'The new stadium is being constructed by a Spanish company.'],
    "Le nouveau stade est en construction par une entreprise espagnole.",
    "Présent continu passif : is being + participe passé. build est irrégulier : built.",
    E('Passive present continuous: is being + past participle. build is irregular: built.')),
  tx(FIX, 'The bridge was designed from a famous Danish architect.', ['The bridge was designed by a famous Danish architect.'],
    "Le pont a été conçu par un célèbre architecte danois.",
    "L'agent du passif se construit avec by, pas avec from.",
    E('The agent of the passive is introduced by by, not from.')),
  okc(FIX, 'The suspect is said to have fled the country.', "Le suspect aurait fui le pays.",
    "Phrase correcte : is said to have + participe passé exprime une action antérieure à l'opinion rapportée.",
    E('The sentence is correct: is said to have + past participle expresses an action that came before the reported opinion.')),
  tr("Le viaduc de Millau a été inauguré en 2004 et il est considéré comme l'un des ponts les plus hauts du monde.",
    ['The Millau Viaduct was opened in 2004 and is considered one of the tallest bridges in the world.', 'The Millau Viaduct was inaugurated in 2004 and is considered one of the highest bridges in the world.', 'The Millau Viaduct was opened in 2004 and is regarded as one of the tallest bridges in the world.'],
    "Deux passifs à la suite avec un seul sujet : was opened and is considered. On dit one of the tallest bridges in the world (superlatif + one of).",
    E('Two passives in a row with one subject: was opened and is considered. Say one of the tallest bridges in the world (superlative + one of).'))
];

export const G05 = {
  id: 'G05',
  title: 'La voix passive (Passive Voice)',
  coursUrl: '',
  sets: [
    set('g05-guidee-a', 'Fiche', 'Série guidée A : passif aux temps de base', 'B1', 'Complète la phrase passive. Chaque phrase propose un indice.', guideeA,
      { group: 'Worksheet', title: 'Guided set A: passive in the basic tenses', desc: 'Complete the passive sentence. Each sentence comes with a hint.' }),
    set('g05-guidee-b', 'Fiche', 'Série guidée B : modaux et cas complexes', 'B1+', 'Modaux, verbes à deux objets, formes négatives.', guideeB,
      { group: 'Worksheet', title: 'Guided set B: modals and complex cases', desc: 'Modals, verbs with two objects, negative forms.' }),
    set('g05-niv-a', 'Fiche', 'Niveau A : transformations de base', 'B1', 'Mets chaque phrase à la voix passive.', nivA,
      { group: 'Worksheet', title: 'Level A: basic transformations', desc: 'Put each sentence into the passive.' }),
    set('g05-niv-b', 'Fiche', 'Niveau B : contexte professionnel', 'B1+', 'Les mêmes transformations dans des phrases d\'ingénieur.', nivB,
      { group: 'Worksheet', title: 'Level B: professional context', desc: 'The same transformations in engineering sentences.' }),
    set('g05-niv-c', 'Fiche', 'Niveau C : actif et corrections', 'B1+', 'Passer du passif à l\'actif, puis corriger cinq phrases fautives.', nivC,
      { group: 'Worksheet', title: 'Level C: active and corrections', desc: 'Go from passive to active, then correct five faulty sentences.' }),
    set('g05-niv-d', 'Fiche', 'Niveau D : style scientifique', 'B2+', 'Reformuler un texte scientifique au passif, puis traduire.', nivD,
      { group: 'Worksheet', title: 'Level D: scientific style', desc: 'Rewrite a scientific text in the passive, then translate.' }),
    set('g05-bonus', 'Fiche', 'Bonus : registre et style', 'B2+', 'Actif ou passif ? Écris ta réponse, puis compare-la avec le modèle.', bonus,
      { group: 'Worksheet', title: 'Bonus: register and style', desc: 'Active or passive? Write your answer, then compare it with the model.' }),
    set('g05-devoir', 'Fiche', 'Devoir maison', 'B1+', 'Quinze phrases à mettre à la voix passive.', devoir,
      { group: 'Worksheet', title: 'Homework', desc: 'Fifteen sentences to put into the passive.' }),
    set('g05-m5a-1', 'Supplément Murphy', 'Unité 5A : de l\'actif au passif (1/2)', 'B1', 'Tous les temps.', m5aEx1,
      { group: 'Murphy supplement', title: 'Unit 5A: active to passive (1/2)', desc: 'All tenses.' }),
    set('g05-m5a-2', 'Supplément Murphy', 'Unité 5A : du passif à l\'actif (2/2)', 'B1', 'Retrouve la phrase active.', m5aEx2,
      { group: 'Murphy supplement', title: 'Unit 5A: passive to active (2/2)', desc: 'Find the active sentence.' }),
    set('g05-m5b', 'Supplément Murphy', 'Unité 5B : modaux et style scientifique', 'B1+', 'Reformule avec le modal donné.', m5b,
      { group: 'Murphy supplement', title: 'Unit 5B: modals and scientific style', desc: 'Rewrite with the modal given.' }),
    set('g05-m5c', 'Supplément Murphy', 'Unité 5C : It is said that, he is said to', 'B2', 'Rapporter une opinion sans nommer la source.', m5c,
      { group: 'Murphy supplement', title: 'Unit 5C: It is said that, he is said to', desc: 'Report an opinion without naming the source.' }),
    set('g05-m5d', 'Supplément Murphy', 'Unité 5D : have something done', 'B2', 'La voix causative.', m5d,
      { group: 'Murphy supplement', title: 'Unit 5D: have something done', desc: 'The causative.' }),
    set('g05-m5e', 'Supplément Murphy', 'Unité 5E : remettre les mots dans l\'ordre', 'B1+', 'Écris la phrase complète avec les mots dans le bon ordre.', m5e,
      { group: 'Murphy supplement', title: 'Unit 5E: sentence building', desc: 'Write the complete sentence with the words in the right order.' }),
    set('g05-th', 'Supplément Murphy', 'Unité TH : thème grammatical', 'B1+', 'Traduis en anglais, puis compare avec le modèle.', th,
      { group: 'Murphy supplement', title: 'Unit TH: translation', desc: 'Translate into English, then compare with the model.' }),
    set('g05-x1', 'Exercices supplémentaires', 'Supplément A : histoire et découvertes', 'B1+', 'Mets chaque phrase à la voix passive.', extraA,
      { group: 'Extra exercises', title: 'Extra A: history and discoveries', desc: 'Put each sentence into the passive.' }),
    set('g05-x2', 'Exercices supplémentaires', 'Supplément B : formes difficiles', 'B2', 'Complète avec la forme passive qui convient. Le verbe est donné entre parenthèses.', extraB,
      { group: 'Extra exercises', title: 'Extra B: difficult forms', desc: 'Complete with the correct passive form. The verb is given in brackets.' }),
    set('g05-x3', 'Exercices supplémentaires', 'Supplément C : actif, passif et corrections', 'B2+', 'Passer du passif à l\'actif, corriger des phrases, puis traduire.', extraC,
      { group: 'Extra exercises', title: 'Extra C: active, passive and corrections', desc: 'Go from passive to active, correct sentences, then translate.' })
  ],
  recap: {
    blocks: [
      {
        title: 'Formation : be + participe passé',
        forms: [
          ['Present Simple', 'am / is / are + PP : The report is written every week.'],
          ['Past Simple', 'was / were + PP : The bridge was built in 1990.'],
          ['Present Continuous', 'am / is / are being + PP : The machine is being repaired.'],
          ['Past Continuous', 'was / were being + PP : The car was being tested when it failed.'],
          ['Present Perfect', 'have / has been + PP : The data has been collected.'],
          ['Past Perfect', 'had been + PP : The form had been submitted before the deadline.'],
          ['Futur (will)', 'will be + PP : The results will be published.'],
          ['Futur (going to)', 'am / is / are going to be + PP : It is going to be fixed tomorrow.'],
          ['Modaux', 'modal + be + PP : The problem can be solved.']
        ]
      },
      {
        title: 'Emplois et transformation',
        forms: [
          ['1', "L'objet de la phrase active devient le sujet du passif."],
          ['2', 'Le verbe devient be (au bon temps) + participe passé.'],
          ['3', "Le sujet de la phrase active devient by + agent (facultatif)."]
        ],
        uses: ["L'agent est inconnu : My bike was stolen.", "L'agent est évident ou sans intérêt : He was arrested.", 'Style scientifique et technique : The experiment was conducted under controlled conditions.', 'Pour valoriser le résultat : This molecule was discovered by Dr. Smith.', 'Verbes à deux objets (give, tell, send, show) : les deux objets peuvent devenir sujet.', 'Rapporter une opinion : It is said that... / He is said to...', 'Faire faire : have / get + objet + participe passé.']
      }
    ],
    tables: [],
    notes: ["Exemple : The engineers (S) designed (V) the bridge (O). Passif : The bridge was designed by the engineers."],
    rule: "Le passif met l'objet de l'action en avant. Il est très courant en anglais scientifique : The results were analysed."
  },
  enMeta: {
    title: 'The Passive Voice',
    recap: {
      blocks: [
        {
          title: 'Formation: be + past participle',
          forms: [
            ['Present Simple', 'am / is / are + PP: The report is written every week.'],
            ['Past Simple', 'was / were + PP: The bridge was built in 1990.'],
            ['Present Continuous', 'am / is / are being + PP: The machine is being repaired.'],
            ['Past Continuous', 'was / were being + PP: The car was being tested when it failed.'],
            ['Present Perfect', 'have / has been + PP: The data has been collected.'],
            ['Past Perfect', 'had been + PP: The form had been submitted before the deadline.'],
            ['Future (will)', 'will be + PP: The results will be published.'],
            ['Future (going to)', 'am / is / are going to be + PP: It is going to be fixed tomorrow.'],
            ['Modals', 'modal + be + PP: The problem can be solved.']
          ]
        },
        {
          title: 'Uses and transformation',
          forms: [
            ['1', 'The object of the active sentence becomes the subject of the passive.'],
            ['2', 'The verb becomes be (in the right tense) + past participle.'],
            ['3', 'The subject of the active sentence becomes by + agent (optional).']
          ],
          uses: ['The agent is unknown: My bike was stolen.', 'The agent is obvious or unimportant: He was arrested.', 'Scientific and technical style: The experiment was conducted under controlled conditions.', 'To put the result first: This molecule was discovered by Dr. Smith.', 'Verbs with two objects (give, tell, send, show): both objects can become the subject.', 'Reporting an opinion: It is said that... / He is said to...', 'Having something done: have / get + object + past participle.']
        }
      ],
      tables: [],
      notes: ['Example: The engineers (S) designed (V) the bridge (O). Passive: The bridge was designed by the engineers.'],
      rule: 'The passive puts the object of the action first. It is very common in scientific English: The results were analysed.'
    }
  }
};
