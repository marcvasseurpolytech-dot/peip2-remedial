// G13 : Quantifiers (some / any / no / every, each / other / another, little / few)
import { S, FICHE, MURPHY, F, R, W, P, K, hint, SK } from './dsl2.js';

const AB = ['anybody', 'anyone'];
const SB = ['somebody', 'someone'];
const EB = ['everybody', 'everyone'];
const NB = ['nobody', 'no one'];
const SAN = 'some dans les phrases affirmatives, any dans les négatives et les questions.';
const SANE = 'some in affirmative sentences, any in negatives and questions.';

const guideeA = [
  K('We need ___ data before we can conclude.', [['some']], "Il nous faut des données avant de pouvoir conclure.", 'Phrase affirmative : some.', 'Affirmative sentence: some.'),
  K('Is there ___ in the lab right now?', [AB], "Y a-t-il quelqu'un au laboratoire en ce moment ?", 'Question : anybody / anyone.', 'Question: anybody / anyone.', hint('quelqu\'un, question', 'someone, question')),
  K("I couldn't find ___ wrong with the circuit.", [['anything']], "Je n'ai rien trouvé d'anormal dans le circuit.", 'Négation avec couldn\'t : anything (pas de double négation).', "Negation with couldn't: anything (no double negative)."),
  K('___ answered when I called the supplier.', [NB], "Personne n'a répondu quand j'ai appelé le fournisseur.", 'Négation forte sans not : nobody / no one.', 'Strong negation without not: nobody / no one.'),
  K('___ on the team agreed with the new design.', [EB], "Tout le monde dans l'équipe a approuvé le nouveau design.", 'Totalité : everybody / everyone.', 'All of them: everybody / everyone.'),
  K("We don't have ___ spare parts left.", [['any']], "Il ne nous reste aucune pièce détachée.", 'Négation : any.', 'Negation: any.'),
  K('Is there ___ we can plug in the laptop?', [['somewhere', 'anywhere']], "Y a-t-il un endroit où brancher l'ordinateur ?", 'Question : anywhere est la forme neutre ; somewhere est possible si l\'on attend une réponse positive.', 'Question: anywhere is the neutral form; somewhere is possible when a positive answer is expected.'),
  K("There's ___ left to test, we're done.", [['nothing']], "Il ne reste rien à tester, nous avons fini.", 'There is + nothing : négation forte sans not.', 'There is + nothing: strong negation without not.'),
  K('Did ___ check the pressure valve?', [AB], "Quelqu'un a-t-il vérifié la soupape de pression ?", 'Question : anybody / anyone.', 'Question: anybody / anyone.'),
  K('___ about this prototype needs revising.', [['everything']], "Tout dans ce prototype est à revoir.", 'Totalité : everything.', 'The whole: everything.')
];
const guideeB = [
  K('___ engineer submitted a report before the deadline.', [['each']], "Chaque ingénieur a rendu un rapport avant la date limite.", 'Chacun pris individuellement : each + nom singulier.', 'Each one individually: each + singular noun.'),
  K('___ machine on the line needs a monthly check.', [['every', 'each']], "Chaque machine de la ligne nécessite un contrôle mensuel.", 'En général : every (each reste possible).', 'In general: every (each is also possible).'),
  K('We tested two samples: ___ passed, ___ failed.', [['one'], ['the other']], "Nous avons testé deux échantillons : l'un a réussi, l'autre a échoué.", 'Deux éléments : one ... the other.', 'Two items: one ... the other.'),
  K('Could I have ___ copy of the datasheet?', [['another']], "Puis-je avoir un autre exemplaire de la fiche technique ?", 'Un de plus : another.', 'One more: another.'),
  K('The ___ students already left the lab.', [['other']], "Les autres étudiants ont déjà quitté le laboratoire.", 'Le reste du groupe : the other + pluriel (ou the others sans nom).', 'The rest of the group: the other + plural (or the others without a noun).'),
  K('We have ___ time left before the deadline.', [['a little']], "Il nous reste un peu de temps avant la date limite.", 'Sens positif + indénombrable : a little.', 'Positive + uncountable: a little.'),
  K('We have ___ budget left, we must be careful.', [['little']], "Il nous reste très peu de budget, il faut être prudent.", 'Sens négatif + indénombrable : little.', 'Negative + uncountable: little.'),
  K('I found ___ bugs in the code.', [['a few']], "J'ai trouvé quelques bogues dans le code.", 'Positif + dénombrable : a few.', 'Positive + countable: a few.'),
  K('___ students fully understood the demonstration.', [['few']], "Presque aucun étudiant n'a bien compris la démonstration.", 'Négatif + dénombrable : few.', 'Negative + countable: few.'),
  K('There are ___ things to fix before we ship.', [['a few']], "Il y a quelques points à corriger avant l'expédition.", 'Positif + dénombrable : a few.', 'Positive + countable: a few.')
];
const nivA = [
  K('Is there ___ in the server room?', [AB], "Y a-t-il quelqu'un dans la salle des serveurs ?", SAN, SANE),
  K('We have ___ new data to analyse.', [['some']], "Nous avons de nouvelles données à analyser.", SAN, SANE),
  K('___ likes working overtime.', [NB], "Personne n'aime faire des heures supplémentaires.", 'Négation forte : nobody / no one.', 'Strong negation: nobody / no one.'),
  K('Did you find ___ useful in the report?', [['anything']], "As-tu trouvé quelque chose d'utile dans le rapport ?", 'Question : anything.', 'Question: anything.'),
  K('___ machine in this factory is monitored remotely.', [['every', 'each']], "Chaque machine de cette usine est surveillée à distance.", 'Totalité : every (each possible).', 'Totality: every (each possible).')
];
const nivB = [
  K('___ team member has a specific role.', [['each', 'every']], "Chaque membre de l'équipe a un rôle précis.", 'Individuellement : each.', 'Individually: each.'),
  K('We tested three prototypes: one worked, ___ two failed.', [['the other']], "Nous avons testé trois prototypes : un a fonctionné, les deux autres ont échoué.", 'Le reste du groupe : the other two.', 'The rest of the group: the other two.'),
  K('Could you send me ___ example?', [['another']], "Pourriez-vous m'envoyer un autre exemple ?", 'Un de plus : another.', 'One more: another.'),
  K("We have ___ time to finish, let's hurry.", [['little']], "Il nous reste peu de temps pour finir, dépêchons-nous.", 'Négatif : little.', 'Negative: little.'),
  K('There are ___ solutions worth exploring.', [['a few']], "Il y a quelques solutions qui valent la peine d'être explorées.", 'Positif : a few.', 'Positive: a few.')
];
const nivC = [
  R("Personne n'a répondu à l'email.", ['Nobody answered the email.', 'No one answered the email.', 'Nobody replied to the email.', 'No one replied to the email.', 'Nobody answered the e-mail.'], 'Nobody + verbe affirmatif.', 'Nobody + affirmative verb.'),
  R("Chaque candidat doit présenter une pièce d'identité.", ['Each candidate must show an ID.', 'Every candidate must show an ID.', 'Each candidate must present an ID.', 'Every candidate must present an ID.', 'Each candidate must show identification.', 'Every candidate must show identification.', 'Each candidate must show a piece of ID.', 'Each candidate must bring an ID.'], 'Each / every + nom singulier.', 'Each / every + singular noun.'),
  R("Nous avons très peu de temps.", ['We have very little time.', 'We have little time.', 'We have hardly any time.'], 'très peu de + indénombrable : very little.', 'Hardly any, with an uncountable noun: very little.'),
  R("J'ai trouvé quelques erreurs dans le code.", ['I found a few errors in the code.', 'I found a few mistakes in the code.', 'I have found a few errors in the code.', 'I found some errors in the code.', 'I found a few bugs in the code.'], 'quelques + dénombrable : a few.', 'quelques + countable: a few.'),
  R("Tout le monde était d'accord avec la solution.", ['Everybody agreed with the solution.', 'Everyone agreed with the solution.', 'Everybody was in agreement with the solution.', 'Everyone was in agreement with the solution.'], 'Everybody + verbe au singulier.', 'Everybody + singular verb.')
];
const nivD = [
  F("There isn't nothing left to check.", ['There is nothing left to check.', "There isn't anything left to check.", "There's nothing left to check."], "Il ne reste rien à vérifier.", 'Pas de double négation : nothing ou not ... anything.', 'No double negative: nothing or not ... anything.'),
  F('Each students must submit a report.', ['Each student must submit a report.'], "Chaque étudiant doit rendre un rapport.", 'each + nom singulier.', 'each + singular noun.'),
  F('We have a few time left.', ['We have a little time left.'], "Il nous reste un peu de temps.", 'time est indénombrable : a little.', 'time is uncountable: a little.'),
  F('Do you have some more information?', ['Do you have any more information?'], "Avez-vous d'autres informations ?", 'Question : any.', 'Question: any.'),
  F('Every students passed the exam.', ['Every student passed the exam.'], "Chaque étudiant a réussi l'examen.", 'every + nom singulier.', 'every + singular noun.')
];
const bonus = [
  P("Réagis à : 'Few companies are ready for this change.' (accord, puis désaccord)", "A: 'Few companies are ready for this change.'", ['I agree, very few of them have prepared. / I disagree, quite a few companies are already ready.'], 'Few = presque aucun ; a few = quelques-uns.', "React to: 'Few companies are ready for this change.' (agree, then disagree)", 'Few = hardly any; a few = some.'),
  P("Réagis à : 'Everybody should learn to code.' (au moins deux réponses)", "A: 'Everybody should learn to code.'", ['I agree, everyone benefits from understanding how software works. / I disagree, not everybody needs it.'], 'Everybody + verbe au singulier.', "React to: 'Everybody should learn to code.' (at least two responses)", 'Everybody + singular verb.'),
  P("Réagis à : 'Nobody can predict the future of AI.' (accord de trois façons)", "A: 'Nobody can predict the future of AI.'", ['Exactly, nobody knows. / True, no one can be sure. / I agree, nobody has the answer.'], 'Nobody / no one + verbe affirmatif.', "React to: 'Nobody can predict the future of AI.' (agree in three ways)", 'Nobody / no one + affirmative verb.')
];
const devoir = [
  K("We couldn't find ___ wrong with the sensor.", [['anything']], "Nous n'avons rien trouvé d'anormal avec le capteur.", 'couldn\'t + anything.', "couldn't + anything."),
  K('___ attended the safety briefing.', [EB], "Tout le monde a assisté à la réunion de sécurité.", 'Everybody / everyone.', 'Everybody / everyone.'),
  K('Is there ___ who can help with this bug?', [AB], "Y a-t-il quelqu'un qui puisse aider avec ce bogue ?", 'Question : anyone / anybody.', 'Question: anyone / anybody.'),
  K('We have ___ spare components left.', [['no']], "Il ne nous reste aucun composant de rechange.", 'no + nom (négation forte).', 'no + noun (strong negation).'),
  K('___ module must pass its own test suite.', [['each', 'every']], "Chaque module doit réussir sa propre batterie de tests.", 'each / every + singulier.', 'each / every + singular.'),
  K("We tried two approaches: ___ worked, ___ didn't.", [['one'], ['the other']], "Nous avons essayé deux approches : l'une a fonctionné, l'autre non.", 'one ... the other.', 'one ... the other.'),
  K('Could I get ___ set of measurements?', [['another']], "Puis-je obtenir une autre série de mesures ?", 'another.', 'another.'),
  K('The ___ engineers are still in the meeting.', [['other']], "Les autres ingénieurs sont encore en réunion.", 'the other + pluriel.', 'the other + plural.'),
  K('We have ___ budget left for this quarter.', [['a little']], "Il nous reste un peu de budget pour ce trimestre.", 'a little : positif.', 'a little: positive.'),
  K('There is ___ documentation on this old system.', [['little']], "Il y a très peu de documentation sur ce vieux système.", 'little : négatif.', 'little: negative.'),
  K('I found ___ inconsistencies in the dataset.', [['a few']], "J'ai trouvé quelques incohérences dans le jeu de données.", 'a few : positif.', 'a few: positive.'),
  K('___ companies test their code this thoroughly.', [['few']], "Peu d'entreprises testent leur code aussi minutieusement.", 'few : négatif.', 'few: negative.'),
  K('___ expected the deadline to move.', [NB], "Personne ne s'attendait à ce que l'échéance bouge.", 'Nobody / no one.', 'Nobody / no one.'),
  K('Is there ___ quiet we can review the results?', [['somewhere', 'anywhere']], "Y a-t-il un endroit calme pour revoir les résultats ?", 'somewhere / anywhere.', 'somewhere / anywhere.'),
  K('___ in this report needs double-checking.', [['everything']], "Tout dans ce rapport doit être revérifié.", 'everything.', 'everything.')
];
const m13a1 = [
  K('There must be ___ explanation for this bug.', [['some']], "Il doit y avoir une explication à ce bogue.", 'some : affirmatif.', 'some: affirmative.'),
  K('Has ___ seen the missing cable?', [AB], "Quelqu'un a-t-il vu le câble manquant ?", 'Question : anyone / anybody.', 'Question: anyone / anybody.'),
  K("I can't see ___ unusual in these logs.", [['anything']], "Je ne vois rien d'inhabituel dans ces journaux.", 'Négation : anything.', 'Negation: anything.'),
  K('___ complained about the new schedule.', [NB], "Personne ne s'est plaint du nouvel horaire.", 'Nobody / no one.', 'Nobody / no one.'),
  K('___ needs to sign the safety form before entering.', [EB], "Tout le monde doit signer la fiche de sécurité avant d'entrer.", 'Everybody / everyone.', 'Everybody / everyone.')
];
const m13a2 = [
  K('___ shift has its own supervisor.', [['each', 'every']], "Chaque équipe de quart a son propre superviseur.", 'each / every.', 'each / every.'),
  K('One machine is under repair, ___ is running fine.', [['the other']], "Une machine est en réparation, l'autre fonctionne bien.", 'Deux éléments : the other.', 'Two items: the other.'),
  K('Can you print ___ set of diagrams for the client?', [['another']], "Peux-tu imprimer un autre jeu de schémas pour le client ?", 'another.', 'another.'),
  K('We have ___ margin for error on this test.', [['little']], "Nous avons très peu de marge d'erreur sur ce test.", 'little : négatif.', 'little: negative.'),
  K('She raised ___ concerns during the review.', [['a few']], "Elle a soulevé quelques préoccupations pendant la revue.", 'a few : positif.', 'a few: positive.')
];
const m13b = [
  W('be / must / some / there / reason / a', ['There must be some reason.'], "Il doit y avoir une raison.", 'there must be some.', 'there must be some.'),
  W('nobody / the / complained / about / delay', ['Nobody complained about the delay.'], "Personne ne s'est plaint du retard.", 'Nobody + verbe affirmatif.', 'Nobody + affirmative verb.'),
  W('needs / everybody / to / the / sign / contract', ['Everybody needs to sign the contract.'], "Tout le monde doit signer le contrat.", 'Everybody + verbe au singulier.', 'Everybody + singular verb.'),
  W('has / each / own / its / department / budget', ['Each department has its own budget.'], "Chaque service a son propre budget.", 'each + singulier.', 'each + singular.'),
  W('print / you / can / another / of / copy / the / report', ['Can you print another copy of the report?'], "Peux-tu imprimer un autre exemplaire du rapport ?", 'another + singulier.', 'another + singular.'),
  W('have / we / little / for / room / improvement', ['We have little room for improvement.'], "Nous avons peu de marge d'amélioration.", 'little : négatif.', 'little: negative.'),
  W('raised / a / he / few / objections', ['He raised a few objections.'], "Il a soulevé quelques objections.", 'a few : positif.', 'a few: positive.'),
  W('few / for / volunteered / the / technicians / weekend / shift', ['Few technicians volunteered for the weekend shift.'], "Peu de techniciens se sont portés volontaires pour l'équipe du week-end.", 'few : négatif.', 'few: negative.')
];
const th = [
  R("Il doit y avoir une explication.", ['There must be some explanation.', 'There must be an explanation.', 'There has to be an explanation.', 'There has to be some explanation.'], 'There must be (some).', 'There must be (some).'),
  R("Personne ne s'est plaint du planning.", ['Nobody complained about the schedule.', 'No one complained about the schedule.', 'Nobody complained about the planning.', 'No one complained about the planning.', 'Nobody complained about the timetable.'], 'Nobody + verbe affirmatif.', 'Nobody + affirmative verb.'),
  R("Chaque équipe a son propre superviseur.", ['Each team has its own supervisor.', 'Every team has its own supervisor.', 'Each team has its own manager.', 'Every team has its own manager.'], 'Each / every + singulier ; its own.', 'Each / every + singular; its own.'),
  R("Peux-tu imprimer un exemplaire de plus ?", ['Can you print another copy?', 'Can you print one more copy?', 'Could you print another copy?', 'Can you print an extra copy?', 'Can you print another one?'], 'another = un de plus.', 'another = one more.'),
  R("Nous avons très peu de marge d'erreur.", ['We have very little margin for error.', 'We have very little room for error.', 'We have little margin for error.', 'We have very little margin of error.'], 'très peu : very little.', 'Hardly any: very little.'),
  R("Elle a soulevé quelques préoccupations.", ['She raised a few concerns.', 'She raised some concerns.', 'She has raised a few concerns.', 'She raised a few worries.'], 'quelques : a few.', 'quelques: a few.'),
  R("Peu d'ouvriers se sont portés volontaires.", ['Few workers volunteered.', 'Few workers came forward.', 'Few workers offered to help.', 'Few of the workers volunteered.', 'Few labourers volunteered.', 'Few laborers volunteered.'], 'Few = presque aucun.', 'Few = hardly any.')
];
const F1 = SK('Some, any, no, every et leurs composés', 'Some, any, no, every and compounds');
const F2 = SK('Each, other, another, little, few', 'Each, other, another, little, few');
export const G13 = {
  id: 'G13',
  title: 'Quantificateurs (Quantifiers)',
  coursUrl: '',
  skills: {
    '*': F1,
    'g13-guidee-b': F2, 'g13-niv-b': F2, 'g13-m13a-2': F2, 'g13-m13b': F2,
    'g13-niv-c': SK('Quantificateurs : thème', 'Quantifiers: translation'),
    'g13-th': SK('Quantificateurs : thème', 'Quantifiers: translation'),
    'g13-niv-d': SK('Quantificateurs : corrections', 'Quantifiers: corrections'),
    'g13-bonus': SK('Quantificateurs : réagir à une affirmation', 'Quantifiers: reacting to a statement')
  },
  sets: [
    S('g13-guidee-a', FICHE, ['Série guidée A : some, any, no, every', 'Guided set A: some, any, no, every'], 'B1', ['Complète avec le quantificateur qui convient.', 'Complete with the right quantifier.'], guideeA),
    S('g13-guidee-b', FICHE, ['Série guidée B : each, other, another, little, few', 'Guided set B: each, other, another, little, few'], 'B1+', ['Complète avec le quantificateur qui convient.', 'Complete with the right quantifier.'], guideeB),
    S('g13-niv-a', FICHE, ['Niveau A : some, any, no, every', 'Level A: some, any, no, every'], 'B1', ['Complète avec le quantificateur qui convient.', 'Complete with the right quantifier.'], nivA),
    S('g13-niv-b', FICHE, ['Niveau B : each, other, another, little, few', 'Level B: each, other, another, little, few'], 'B1+', ['Complète avec le quantificateur qui convient.', 'Complete with the right quantifier.'], nivB),
    S('g13-niv-c', FICHE, ['Niveau C : traduction', 'Level C: translation'], 'B1+', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], nivC),
    S('g13-niv-d', FICHE, ['Niveau D : erreurs à corriger', 'Level D: errors to correct'], 'B2', ['Réécris chaque phrase correctement.', 'Rewrite each sentence correctly.'], nivD),
    S('g13-bonus', FICHE, ['Bonus : réponses courtes variées', 'Bonus: varied short answers'], 'B2', ['Réponds de plusieurs façons, puis compare avec le modèle.', 'Answer in several ways, then compare with the model.'], bonus),
    S('g13-devoir', FICHE, ['Devoir maison', 'Homework'], 'B1+', ['Quinze phrases à compléter.', 'Fifteen sentences to complete.'], devoir),
    S('g13-m13a-1', MURPHY, ['Unité 13A : some, any, no, every (1/2)', 'Unit 13A: some, any, no, every (1/2)'], 'B1', ['Complète avec some, any, no ou every (et composés).', 'Complete with some, any, no or every (and compounds).'], m13a1),
    S('g13-m13a-2', MURPHY, ['Unité 13A : each, other, another, little, few (2/2)', 'Unit 13A: each, other, another, little, few (2/2)'], 'B1+', ['Complète avec each, other, another, little ou few.', 'Complete with each, other, another, little or few.'], m13a2),
    S('g13-m13b', MURPHY, ['Unité 13B : remettre les mots dans l\'ordre', 'Unit 13B: sentence building'], 'B1+', ['Écris la phrase complète avec les mots dans le bon ordre.', 'Write the complete sentence with the words in the right order.'], m13b),
    S('g13-th', MURPHY, ['Unité TH : thème grammatical', 'Unit TH: translation'], 'B1+', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], th)
  ],
  recap: {
    blocks: [
      {
        title: 'Some, any, no, every et composés',
        forms: [
          ['some / somebody / something / somewhere', 'phrase affirmative, offre, demande'],
          ['any / anybody / anything / anywhere', 'négation, question, n\'importe quel'],
          ['no / nobody / nothing / nowhere', 'négation forte, sans not'],
          ['every / everybody / everything / everywhere', 'totalité']
        ],
        uses: ['Jamais de double négation : I can\'t see anything, ou I see nothing.']
      },
      {
        title: 'Each, other, another, little, few',
        forms: [
          ['each + singulier', 'chaque élément individuellement'],
          ['one ... the other', 'deux éléments'],
          ['another / the other(s)', 'un de plus / le reste du groupe'],
          ['a little / little + indénombrable', 'un peu / très peu'],
          ['a few / few + dénombrable', 'quelques / très peu']
        ],
        uses: ['little et few ont un sens négatif ; a little et a few un sens positif.']
      }
    ],
    tables: [],
    notes: ['Everybody, nobody, each, every : verbe au singulier.'],
    rule: 'some = affirmatif ; any = négatif et question ; no = négation forte ; every = totalité.'
  },
  enMeta: {
    title: 'Quantifiers',
    recap: {
      blocks: [
        {
          title: 'Some, any, no, every and compounds',
          forms: [
            ['some / somebody / something / somewhere', 'affirmative sentence, offer, request'],
            ['any / anybody / anything / anywhere', 'negation, question, "it does not matter which"'],
            ['no / nobody / nothing / nowhere', 'strong negation, without not'],
            ['every / everybody / everything / everywhere', 'totality']
          ],
          uses: ['Never a double negative: I can\'t see anything, or I see nothing.']
        },
        {
          title: 'Each, other, another, little, few',
          forms: [
            ['each + singular', 'every item taken individually'],
            ['one ... the other', 'two items'],
            ['another / the other(s)', 'one more / the rest of the group'],
            ['a little / little + uncountable', 'a bit / hardly any'],
            ['a few / few + countable', 'some / hardly any']
          ],
          uses: ['little and few are negative; a little and a few are positive.']
        }
      ],
      tables: [],
      notes: ['Everybody, nobody, each, every: singular verb.'],
      rule: 'some = affirmative; any = negative and question; no = strong negation; every = totality.'
    }
  }
};
