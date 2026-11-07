// G18 : Adjectifs dérivés et formation des mots
import { S, FICHE, MURPHY, T, F, R, W, P, K, hint, SK } from './dsl2.js';

const FORM = T("Forme l'adjectif demandé.", 'Form the adjective required.');
const GB = ['ground-breaking', 'groundbreaking', 'ground breaking'];
const ED = '-ed décrit ce que l\'on ressent ; -ing décrit ce qui provoque le sentiment.';
const EDE = '-ed describes what you feel; -ing describes what causes the feeling.';

const guideeA = [
  K('The new safety procedures are very ___ (use) for all staff.', [['useful']], "Les nouvelles procédures de sécurité sont très utiles pour tout le personnel.", 'use + -ful.', 'use + -ful.'),
  K('Working under constant pressure can be ___ (stress).', [['stressful']], "Travailler sous une pression constante peut être stressant.", 'stress + -ful.', 'stress + -ful.'),
  K('His ___ (care) approach led to a significant error in the calculation.', [['careless']], "Son approche négligente a provoqué une erreur importante dans le calcul.", 'care + -less = sans soin.', 'care + -less = without care.'),
  K('This is a very ___ (practice) solution to a complex problem.', [['practical']], "C'est une solution très pratique à un problème complexe.", 'practice donne practical (-al).', 'practice gives practical (-al).'),
  K('The new renewable energy source is ___ (effect) and relatively cheap.', [['effective']], "La nouvelle source d'énergie renouvelable est efficace et relativement bon marché.", 'effect + -ive.', 'effect + -ive.'),
  K('Her research produced some ___ (remark) results.', [['remarkable']], "Ses recherches ont produit des résultats remarquables.", 'remark + -able.', 'remark + -able.'),
  K('He is highly ___ (profession) in all his communications.', [['professional']], "Il est très professionnel dans toutes ses communications.", 'profession + -al.', 'profession + -al.'),
  K('This approach is not ___ (manage) without additional resources.', [['manageable']], "Cette approche n'est pas gérable sans ressources supplémentaires.", 'manage + -able.', 'manage + -able.'),
  K('The ___ (atom) structure of carbon is of fundamental importance.', [['atomic']], "La structure atomique du carbone est d'une importance fondamentale.", 'atom + -ic.', 'atom + -ic.'),
  K('Her research on AI has been truly ___ (ground / break).', [GB], "Ses recherches sur l'IA ont été vraiment novatrices.", 'Composé : nom + participe présent : ground-breaking.', 'Compound: noun + present participle: ground-breaking.')
];
const guideeB = [
  K('The lecture was very ___ (bore), nobody was paying attention.', [['boring']], "Le cours était très ennuyeux, personne ne suivait.", 'Le cours est la cause : -ing.', 'The lecture is the cause: -ing.'),
  K('I was completely ___ (exhaust) after the 12-hour shift.', [['exhausted']], "J'étais complètement épuisé après le poste de 12 heures.", 'Je ressens : -ed.', 'I feel it: -ed.'),
  K('The results are truly ___ (worry), we need to act.', [['worrying']], "Les résultats sont vraiment inquiétants, il faut agir.", 'Les résultats causent l\'inquiétude : -ing.', 'The results cause the worry: -ing.'),
  K('She was absolutely ___ (fascinate) by the new nanotechnology.', [['fascinated']], "Elle était absolument fascinée par la nouvelle nanotechnologie.", 'Elle ressent : -ed.', 'She feels it: -ed.'),
  K('He gave an ___ (inspire) speech to the entire research team.', [['inspiring']], "Il a prononcé un discours inspirant devant toute l'équipe de recherche.", 'Le discours provoque : -ing.', 'The speech causes it: -ing.'),
  K("I'm not at all ___ (surprise) by these results, I predicted them.", [['surprised']], "Je ne suis pas du tout surpris par ces résultats, je les avais prévus.", 'Je ressens : -ed.', 'I feel it: -ed.'),
  K('The prospect of a breakthrough discovery is ___ (excite) for the whole team.', [['exciting']], "La perspective d'une découverte majeure est exaltante pour toute l'équipe.", 'La perspective provoque : -ing.', 'The prospect causes it: -ing.'),
  K('She felt ___ (disappoint) when her paper was rejected.', [['disappointed']], "Elle s'est sentie déçue quand son article a été rejeté.", 'Elle ressent : -ed.', 'She feels it: -ed.'),
  K('It was ___ (embarrass) to make such a basic mistake in public.', [['embarrassing']], "C'était gênant de faire une erreur aussi élémentaire en public.", 'La situation provoque : -ing.', 'The situation causes it: -ing.'),
  K("The students were ___ (motivate) by the professor's feedback.", [['motivated']], "Les étudiants étaient motivés par les retours du professeur.", 'Ils ressentent : -ed.', 'They feel it: -ed.')
];
const nivA = [
  K('The experiment produced some truly ___ (amaze) results.', [['amazing']], "L'expérience a produit des résultats vraiment étonnants.", 'Les résultats provoquent : -ing.', 'The results cause it: -ing.'),
  K('She is completely ___ (exhaust) after three consecutive nights without sleep.', [['exhausted']], "Elle est complètement épuisée après trois nuits de suite sans dormir.", 'Elle ressent : -ed.', 'She feels it: -ed.'),
  K('The report contains several ___ (help) suggestions for improvement.', [['helpful']], "Le rapport contient plusieurs suggestions utiles d'amélioration.", 'help + -ful.', 'help + -ful.'),
  K('This engineering challenge is ___ (manage) with the right tools and expertise.', [['manageable']], "Ce défi d'ingénierie est gérable avec les bons outils et la bonne expertise.", 'manage + -able.', 'manage + -able.'),
  K('He is consistently ___ (profession) in all his written communications.', [['professional']], "Il est constamment professionnel dans toutes ses communications écrites.", 'profession + -al.', 'profession + -al.')
];
const nivB = [
  K('The noise from the construction site is extremely ___ (disturb).', [['disturbing']], "Le bruit du chantier est extrêmement dérangeant.", 'Le bruit provoque : -ing.', 'The noise causes it: -ing.'),
  K('She was genuinely ___ (impress) by the quality of the final output.', [['impressed']], "Elle a été sincèrement impressionnée par la qualité du résultat final.", 'Elle ressent : -ed.', 'She feels it: -ed.'),
  K('This is a highly ___ (practice) approach to the engineering challenge.', [['practical']], "C'est une approche très pratique du défi d'ingénierie.", 'practice donne practical.', 'practice gives practical.'),
  K('The ___ (atom) model proposed by Bohr was revolutionary.', [['atomic']], "Le modèle atomique proposé par Bohr était révolutionnaire.", 'atom + -ic.', 'atom + -ic.'),
  K('He gave a very ___ (motivate) talk to the new interns.', [['motivating']], "Il a donné aux nouveaux stagiaires un exposé très motivant.", 'L\'exposé provoque : -ing.', 'The talk causes it: -ing.'),
  K('Chemicals in this laboratory are ___ (danger) without proper protective equipment.', [['dangerous']], "Les produits chimiques de ce laboratoire sont dangereux sans équipement de protection adapté.", 'danger + -ous.', 'danger + -ous.'),
  K('She produced a ___ (care) and thorough analysis of all available data.', [['careful']], "Elle a produit une analyse soigneuse et approfondie de toutes les données disponibles.", 'care + -ful = soigneux.', 'care + -ful = careful.'),
  K('He is known throughout the department for his ___ (create) approach to problem-solving.', [['creative']], "Il est connu dans tout le service pour son approche créative de la résolution de problèmes.", 'create + -ive.', 'create + -ive.'),
  K('The situation is genuinely ___ (worry), we need a ___ (logic) response.', [['worrying'], ['logical']], "La situation est vraiment préoccupante, il nous faut une réponse logique.", 'worry : -ing ; logic + -al.', 'worry: -ing; logic + -al.'),
  K('The new policy has had some ___ (expect) consequences, nobody predicted this.', [['unexpected']], "La nouvelle politique a eu des conséquences inattendues, personne ne l'avait prévu.", 'Le préfixe un- donne le sens contraire : unexpected.', 'The prefix un- gives the opposite meaning: unexpected.')
];
const nivC = [
  F('I am very interesting in this research area.', ['I am very interested in this research area.', "I'm very interested in this research area."], "Je suis très intéressé par ce domaine de recherche.", ED, EDE),
  F('The lecture was completely bored.', ['The lecture was completely boring.'], "Le cours était complètement ennuyeux.", ED, EDE),
  F('She has a very use approach to data management.', ['She has a very useful approach to data management.'], "Elle a une approche très utile de la gestion des données.", 'Il faut un adjectif : use + -ful.', 'An adjective is needed: use + -ful.'),
  F('He is a profession engineer with 20 years of experience.', ['He is a professional engineer with 20 years of experience.'], "C'est un ingénieur professionnel avec 20 ans d'expérience.", 'Il faut un adjectif : profession + -al.', 'An adjective is needed: profession + -al.'),
  F('The results are quite surprise, nobody expected them.', ['The results are quite surprising, nobody expected them.'], "Les résultats sont assez surprenants, personne ne s'y attendait.", ED, EDE),
  R("Les nouvelles réglementations sont contraignantes mais nécessaires.", ['The new regulations are restrictive but necessary.', 'The new regulations are binding but necessary.', 'The new regulations are constraining but necessary.', 'The new rules are restrictive but necessary.', 'The new rules are binding but necessary.', 'The new regulations are strict but necessary.'], 'Adjectifs : restrictive, necessary.', 'Adjectives: restrictive, necessary.'),
  R("Il a une approche très créative de la résolution de problèmes.", ['He has a very creative approach to problem-solving.', 'He has a very creative approach to problem solving.', 'He has a very creative approach to solving problems.', 'He takes a very creative approach to problem-solving.', 'He takes a very creative approach to problem solving.'], 'create + -ive ; problem-solving.', 'create + -ive; problem-solving.'),
  R("Ce document est lisible même pour les non-spécialistes.", ['This document is readable even for non-specialists.', 'This document is readable even for non specialists.', 'This document is readable even to non-specialists.', 'This document is readable even for people who are not specialists.', 'This document is readable even for laypeople.', 'This document is readable even for non-experts.', 'This document is legible even for non-specialists.'], 'read + -able.', 'read + -able.'),
  R("Travailler avec des produits chimiques toxiques peut être dangereux.", ['Working with toxic chemicals can be dangerous.', 'Working with toxic chemicals may be dangerous.', 'Working with toxic substances can be dangerous.', 'Working with toxic products can be dangerous.', 'Working with toxic chemicals can be hazardous.'], 'danger + -ous.', 'danger + -ous.'),
  R("C'est la découverte la plus remarquable de la dernière décennie.", ['It is the most remarkable discovery of the last decade.', "It's the most remarkable discovery of the last decade.", 'This is the most remarkable discovery of the last decade.', 'It is the most remarkable discovery of the past decade.', "It's the most remarkable discovery of the past decade.", 'This is the most remarkable discovery of the past decade.'], 'remark + -able ; superlatif long.', 'remark + -able; long superlative.')
];
const nivD = [
  K('sustain → ___ (noun) / ___ (adj) / ___ (adv)', [['sustainability'], ['sustainable'], ['sustainably']], "sustain : nom, adjectif, adverbe.", 'sustainability / sustainable / sustainably.', 'sustainability / sustainable / sustainably.'),
  K('innovate → ___ (noun) / ___ (adj) / ___ (person)', [['innovation'], ['innovative'], ['innovator']], "innovate : nom, adjectif, personne.", 'innovation / innovative / innovator.', 'innovation / innovative / innovator.'),
  K('rely → ___ (adj -able) / ___ (adv) / ___ (noun)', [['reliable'], ['reliably'], ['reliability']], "rely : adjectif, adverbe, nom.", 'reliable / reliably / reliability.', 'reliable / reliably / reliability.'),
  K('effect → ___ (adj -ive) / ___ (adv) / ___ (adj -ual)', [['effective'], ['effectively'], ['effectual']], "effect : adjectif, adverbe, autre adjectif.", 'effective / effectively / effectual.', 'effective / effectively / effectual.'),
  K('critic → ___ (adj) / ___ (adv) / ___ (verb)', [['critical'], ['critically'], ['criticise', 'criticize']], "critic : adjectif, adverbe, verbe.", 'critical / critically / criticise.', 'critical / critically / criticise.')
];
const bonus = [
  K('She is a ___ engineer. (known throughout the world)', [['world-famous', 'world famous', 'world-renowned', 'world renowned']], "C'est une ingénieure de renommée mondiale.", 'nom + adjectif : world-famous.', 'noun + adjective: world-famous.'),
  K('He signed a ___ agreement. (lasting five years)', [['five-year', 'five year']], "Il a signé un accord de cinq ans.", 'nombre + nom au singulier : five-year.', 'number + singular noun: five-year.'),
  K('This was a ___ moment for the team. (changing the game)', [['game-changing', 'game changing']], "Ce fut un moment décisif pour l'équipe.", 'nom + participe présent : game-changing.', 'noun + present participle: game-changing.'),
  K('She has a ___ attitude. (open to new ideas)', [['open-minded', 'open minded']], "Elle a un état d'esprit ouvert.", 'adjectif + participe passé : open-minded.', 'adjective + past participle: open-minded.'),
  K('It was a ___ task. (taking a long time)', [['time-consuming', 'time consuming']], "C'était une tâche chronophage.", 'nom + participe présent : time-consuming.', 'noun + present participle: time-consuming.')
];
const devoir = [
  K('The new regulations are ___ (profession) and clearly written.', [['professional']], "Les nouvelles réglementations sont professionnelles et clairement rédigées.", 'profession + -al.', 'profession + -al.'),
  K('She was ___ (bore) by the three-hour technical presentation.', [['bored']], "Elle s'est ennuyée pendant l'exposé technique de trois heures.", 'Elle ressent : -ed.', 'She feels it: -ed.'),
  K('His ___ (care) attitude in the laboratory led to a serious accident.', [['careless']], "Son attitude négligente au laboratoire a causé un grave accident.", 'care + -less.', 'care + -less.'),
  K('The new process is ___ (manage) with proper planning and resources.', [['manageable']], "Le nouveau processus est gérable avec une planification et des ressources adaptées.", 'manage + -able.', 'manage + -able.'),
  K('The final report is ___ (read) even for non-specialists.', [['readable']], "Le rapport final est lisible même pour les non-spécialistes.", 'read + -able.', 'read + -able.'),
  K('Working with toxic materials can be extremely ___ (harm).', [['harmful']], "Travailler avec des matières toxiques peut être extrêmement nocif.", 'harm + -ful.', 'harm + -ful.'),
  K('She is very ___ (create) in finding solutions to complex problems.', [['creative']], "Elle est très créative pour trouver des solutions à des problèmes complexes.", 'create + -ive.', 'create + -ive.'),
  K('The presentation was genuinely ___ (bore), I struggled to stay awake.', [['boring']], "L'exposé était vraiment ennuyeux, j'ai eu du mal à rester éveillé.", 'L\'exposé provoque : -ing.', 'The presentation causes it: -ing.'),
  K('The company has a very ___ (profession) image in the sector.', [['professional']], "L'entreprise a une image très professionnelle dans le secteur.", 'profession + -al.', 'profession + -al.'),
  K("He felt genuinely ___ (motivate) after the team's positive feedback.", [['motivated']], "Il s'est senti vraiment motivé après les retours positifs de l'équipe.", 'Il ressent : -ed.', 'He feels it: -ed.'),
  K('The discovery was ___ (ground / break) and changed the entire field.', [GB], "La découverte a été révolutionnaire et a changé tout le domaine.", 'ground-breaking.', 'ground-breaking.'),
  K('She is ___ (satisfy) with the final outcome of the project.', [['satisfied']], "Elle est satisfaite du résultat final du projet.", 'Elle ressent : -ed.', 'She feels it: -ed.'),
  K('The results were ___ (disappoint), far below expectations.', [['disappointing']], "Les résultats étaient décevants, bien en dessous des attentes.", 'Les résultats provoquent : -ing.', 'The results cause it: -ing.'),
  K('This is a highly ___ (use) reference guide for all students.', [['useful']], "C'est un guide de référence très utile pour tous les étudiants.", 'use + -ful.', 'use + -ful.'),
  K('The working conditions are ___ (accept), some improvements are needed.', [['unacceptable']], "Les conditions de travail sont inacceptables, des améliorations sont nécessaires.", 'accept + -able, avec le préfixe un- : unacceptable.', 'accept + -able, with the prefix un-: unacceptable.')
];
const m18a1 = [
  K('The seminar was really ___ (bore), I almost fell asleep.', [['boring']], "Le séminaire était vraiment ennuyeux, j'ai failli m'endormir.", '-ing : cause.', '-ing: cause.'),
  K('I was completely ___ (exhaust) after the night shift.', [['exhausted']], "J'étais complètement épuisé après le poste de nuit.", '-ed : ressenti.', '-ed: feeling.'),
  K('The test results are ___ (worry), so we must investigate.', [['worrying']], "Les résultats des tests sont inquiétants, nous devons enquêter.", '-ing : cause.', '-ing: cause.'),
  K('She was ___ (fascinate) by the new technology.', [['fascinated']], "Elle était fascinée par la nouvelle technologie.", '-ed : ressenti.', '-ed: feeling.'),
  K('He gave an ___ (inspire) speech to the team.', [['inspiring']], "Il a fait un discours inspirant à l'équipe.", '-ing : cause.', '-ing: cause.')
];
const m18a2 = [
  FORM('use + -ful →', ['useful'], "use + -ful.", 'Suffixe -ful.', 'Suffix -ful.'),
  FORM('care + -less →', ['careless'], "care + -less.", 'Suffixe -less.', 'Suffix -less.'),
  FORM('effect + -ive →', ['effective'], "effect + -ive.", 'Suffixe -ive.', 'Suffix -ive.'),
  FORM('manage + -able →', ['manageable'], "manage + -able.", 'Suffixe -able ; le e est conservé après g.', 'Suffix -able; the e is kept after g.'),
  FORM('profession + -al →', ['professional'], "profession + -al.", 'Suffixe -al.', 'Suffix -al.')
];
const m18b = [
  W('surprising / was / the / outcome', ['The outcome was surprising.'], "Le résultat était surprenant.", 'Adjectif en -ing : cause.', '-ing adjective: cause.'),
  W('were / impressed / the / examiners', ['The examiners were impressed.'], "Les examinateurs étaient impressionnés.", 'Adjectif en -ed : ressenti.', '-ed adjective: feeling.'),
  W('seems / this / plan / realistic', ['This plan seems realistic.'], "Ce plan semble réaliste.", 'seem + adjectif.', 'seem + adjective.'),
  W('endless / the / felt / lecture', ['The lecture felt endless.'], "Le cours semblait interminable.", 'feel + adjectif.', 'feel + adjective.'),
  W('was / convincing / his / argument', ['His argument was convincing.'], "Son argument était convaincant.", '-ing : cause.', '-ing: cause.'),
  W('looked / the / satisfied / customer', ['The customer looked satisfied.'], "Le client avait l'air satisfait.", '-ed : ressenti.', '-ed: feeling.'),
  W('truly / a / is / this / remarkable / achievement', ['This is a truly remarkable achievement.'], "C'est une réussite vraiment remarquable.", 'adverbe + adjectif + nom.', 'adverb + adjective + noun.'),
  W('was / a / comment / careless / that', ['That was a careless comment.'], "C'était un commentaire négligent.", 'care + -less.', 'care + -less.')
];
const th = [
  R("L'exposé était surprenant.", ['The talk was surprising.', 'The presentation was surprising.', 'The lecture was surprising.', 'The speech was surprising.'], '-ing : cause du sentiment.', '-ing: cause of the feeling.'),
  R("Les techniciens étaient impressionnés.", ['The technicians were impressed.'], '-ed : ressenti.', '-ed: feeling.'),
  R("Ce plan semble raisonnable.", ['This plan seems reasonable.', 'This plan looks reasonable.'], 'seem + adjectif.', 'seem + adjective.'),
  R("La réunion paraissait interminable.", ['The meeting seemed endless.', 'The meeting seemed never-ending.', 'The meeting seemed interminable.', 'The meeting felt endless.', 'The meeting seemed to go on forever.'], 'seem + adjectif ; endless.', 'seem + adjective; endless.'),
  R("Son argumentation était convaincante.", ['Her argument was convincing.', 'His argument was convincing.', 'Her reasoning was convincing.', 'His reasoning was convincing.', 'Her argumentation was convincing.', 'His argumentation was convincing.'], '-ing : cause.', '-ing: cause.'),
  R("Le directeur avait l'air satisfait.", ['The director looked satisfied.', 'The manager looked satisfied.', 'The director seemed satisfied.', 'The manager seemed satisfied.', 'The director appeared satisfied.', 'The manager appeared satisfied.'], '-ed : ressenti.', '-ed: feeling.'),
  R("C'est un progrès vraiment remarquable.", ['This is a truly remarkable advance.', 'This is a really remarkable advance.', 'It is a truly remarkable advance.', "It's a truly remarkable advance.", 'This is truly remarkable progress.', 'This is a truly remarkable step forward.', 'This is a truly remarkable improvement.', 'This is a really remarkable improvement.'], 'adverbe + adjectif + nom.', 'adverb + adjective + noun.')
];
const S1 = SK('Suffixes d\'adjectifs', 'Adjective suffixes');
const S2 = SK('-ed ou -ing', '-ed or -ing');
export const G18 = {
  id: 'G18',
  title: 'Adjectifs dérivés (Adjectives: Derived Forms)',
  coursUrl: '',
  skills: {
    '*': S1,
    'g18-guidee-b': S2, 'g18-m18a-1': S2, 'g18-m18b': S2, 'g18-th': S2,
    'g18-niv-c': SK('Adjectifs dérivés : corrections et thème', 'Derived adjectives: corrections and translation'),
    'g18-niv-d': SK('Famille de mots', 'Word families'),
    'g18-bonus': SK('Adjectifs composés', 'Compound adjectives')
  },
  sets: [
    S('g18-guidee-a', FICHE, ['Série guidée A : suffixes', 'Guided set A: suffixes'], 'B1', ['Forme l\'adjectif dérivé du mot entre parenthèses.', 'Form the adjective derived from the word in brackets.'], guideeA),
    S('g18-guidee-b', FICHE, ['Série guidée B : -ed ou -ing', 'Guided set B: -ed or -ing'], 'B1', ['Choisis -ed ou -ing.', 'Choose -ed or -ing.'], guideeB),
    S('g18-niv-a', FICHE, ['Niveau A : suffixes de base', 'Level A: basic suffixes'], 'B1', ['Forme l\'adjectif correct.', 'Form the correct adjective.'], nivA),
    S('g18-niv-b', FICHE, ['Niveau B : -ed / -ing et composés', 'Level B: -ed / -ing and compounds'], 'B1+', ['Forme l\'adjectif correct.', 'Form the correct adjective.'], nivB),
    S('g18-niv-c', FICHE, ['Niveau C : erreurs et traduction', 'Level C: errors and translation'], 'B1+', ['Corrige cinq phrases, puis traduis cinq phrases.', 'Correct five sentences, then translate five sentences.'], nivC),
    S('g18-niv-d', FICHE, ['Niveau D : formation de mots', 'Level D: word building'], 'B2', ['Complète la famille de mots.', 'Complete the word family.'], nivD),
    S('g18-bonus', FICHE, ['Bonus : adjectifs composés', 'Bonus: compound adjectives'], 'B2', ['Forme un adjectif composé.', 'Form a compound adjective.'], bonus),
    S('g18-devoir', FICHE, ['Devoir maison', 'Homework'], 'B1+', ['Quinze phrases à compléter.', 'Fifteen sentences to complete.'], devoir),
    S('g18-m18a-1', MURPHY, ['Unité 18A : -ed ou -ing (1/2)', 'Unit 18A: -ed or -ing (1/2)'], 'B1', ['Choisis -ed ou -ing.', 'Choose -ed or -ing.'], m18a1),
    S('g18-m18a-2', MURPHY, ['Unité 18A : suffixes (2/2)', 'Unit 18A: suffixes (2/2)'], 'B1', ['Forme l\'adjectif avec le suffixe.', 'Form the adjective with the suffix.'], m18a2),
    S('g18-m18b', MURPHY, ['Unité 18B : remettre les mots dans l\'ordre', 'Unit 18B: sentence building'], 'B1+', ['Écris la phrase complète avec les mots dans le bon ordre.', 'Write the complete sentence with the words in the right order.'], m18b),
    S('g18-th', MURPHY, ['Unité TH : thème grammatical', 'Unit TH: translation'], 'B1+', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], th)
  ],
  recap: {
    blocks: [
      {
        title: 'Suffixes d\'adjectifs',
        forms: [
          ['-al', 'nation, national ; profession, professional ; practice, practical'],
          ['-ful / -less', 'help, helpful, helpless ; care, careful, careless'],
          ['-ous', 'danger, dangerous ; ambition, ambitious'],
          ['-ic / -ical', 'atom, atomic ; economy, economical'],
          ['-ive', 'create, creative ; effect, effective'],
          ['-able / -ible', 'manage, manageable ; read, readable'],
          ['-ary / -ory', 'element, elementary ; satisfy, satisfactory']
        ],
        uses: ['Préfixes contraires : unexpected, unacceptable.']
      },
      {
        title: '-ed ou -ing, adjectifs composés',
        forms: [
          ['-ed', 'ce que JE ressens : I am bored, exhausted, interested'],
          ['-ing', 'ce qui PROVOQUE le sentiment : The lecture is boring'],
          ['nombre + nom singulier', 'a three-year contract'],
          ['nom + participe', 'world-famous, time-consuming, game-changing'],
          ['adjectif + participe passé', 'open-minded, well-known, short-sighted']
        ],
        uses: ['I am boring = je suis ennuyeux. I am bored = je m\'ennuie.']
      }
    ],
    tables: [],
    notes: ['Avec un nombre, le nom reste au singulier : a five-year plan, jamais five-years.'],
    rule: '-ed = tu ressens ; -ing = ça provoque. -ful = plein de ; -less = sans.'
  },
  enMeta: {
    title: 'Adjectives: Derived Forms',
    recap: {
      blocks: [
        {
          title: 'Adjective suffixes',
          forms: [
            ['-al', 'nation, national; profession, professional; practice, practical'],
            ['-ful / -less', 'help, helpful, helpless; care, careful, careless'],
            ['-ous', 'danger, dangerous; ambition, ambitious'],
            ['-ic / -ical', 'atom, atomic; economy, economical'],
            ['-ive', 'create, creative; effect, effective'],
            ['-able / -ible', 'manage, manageable; read, readable'],
            ['-ary / -ory', 'element, elementary; satisfy, satisfactory']
          ],
          uses: ['Opposite prefixes: unexpected, unacceptable.']
        },
        {
          title: '-ed or -ing, compound adjectives',
          forms: [
            ['-ed', 'what I FEEL: I am bored, exhausted, interested'],
            ['-ing', 'what CAUSES the feeling: The lecture is boring'],
            ['number + singular noun', 'a three-year contract'],
            ['noun + participle', 'world-famous, time-consuming, game-changing'],
            ['adjective + past participle', 'open-minded, well-known, short-sighted']
          ],
          uses: ['I am boring = I make others bored. I am bored = I feel bored.']
        }
      ],
      tables: [],
      notes: ['With a number, the noun stays singular: a five-year plan, never five-years.'],
      rule: '-ed = you feel; -ing = it causes. -ful = full of; -less = without.'
    }
  }
};
