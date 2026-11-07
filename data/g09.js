// G09 : Causatives (have / get / make / let)
// Contenu reconstruit à partir de la fiche élève, du supplément Murphy et du corrigé enseignant du hub.
import { S, FICHE, MURPHY, C, T, F, R, W, P } from './dsl2.js';

const CF = 'Complète avec la structure causative qui convient.';
const CFE = 'Complete with the causative structure that fits.';
const hint = (fr, en) => [fr, en];
const K = (s, a, fr, why, whyEn, h) => C(s, a, fr, why, whyEn, h ? h[0] : null, h ? h[1] : null);

// have <-> get : le même sens, un registre un peu plus familier pour get.
const swap = x => x.replace(/\bhad\b/, 'got').replace(/\bhas\b/, 'gets').replace(/\bhaving\b/, 'getting').replace(/\bhave\b/, 'get');
// HG(formes, { by: complément d'agent facultatif, at: précision facultative })
const HG = (cores, o = {}) => {
  const out = new Set();
  for (const c of cores) {
    const bases = [c];
    if (!/\bhave had\b|\bhas had\b/.test(c) && /\b(had|has|have|having)\b/.test(c)) bases.push(swap(c));
    for (const b of bases) {
      const ends = ['', ...(o.by ? [' ' + o.by] : []), ...(o.at ? [' ' + o.at] : []), ...(o.by && o.at ? [` ${o.by} ${o.at}`, ` ${o.at} ${o.by}`] : [])];
      for (const e of ends) out.add(b + e);
    }
  }
  return [...out];
};
const WHY_HAVE = "have / get + objet + participe passé : l'action est faite par quelqu'un d'autre. Le temps se marque sur have (ou get).";
const WHY_HAVE_EN = 'have / get + object + past participle: someone else does the action. The tense is shown on have (or get).';

const guideeA = [
  K("A technician repaired the machine. The manager ___.", [HG(['had the machine repaired'], { by: 'by a technician' })], "Le responsable a fait réparer la machine.", WHY_HAVE, WHY_HAVE_EN, hint('HAVE + objet + participe passé', 'HAVE + object + past participle')),
  K("A designer created our logo. We ___.", [HG(['had our logo created'], { by: 'by a designer' })], "Nous avons fait créer notre logo.", WHY_HAVE, WHY_HAVE_EN, hint('HAVE + objet + participe passé', 'HAVE + object + past participle')),
  K("A printer is printing the reports. We ___.", [HG(['are getting the reports printed', 'are having the reports printed'], { by: 'by a printer' })], "Nous faisons imprimer les rapports.", "Présent continu : are getting (ou are having) + objet + participe passé.", 'Present continuous: are getting (or are having) + object + past participle.', hint('BE GETTING + objet + participe passé', 'BE GETTING + object + past participle')),
  K("A lawyer will review the contract. She ___.", [HG(['will have the contract reviewed'], { by: 'by a lawyer' })], "Elle fera relire le contrat par un juriste.", "Futur : will have (ou will get) + objet + participe passé.", 'Future: will have (or will get) + object + past participle.', hint('WILL HAVE + objet + participe passé', 'WILL HAVE + object + past participle')),
  K("Someone stole his laptop. He ___.", [HG(['had his laptop stolen'])], "Il s'est fait voler son ordinateur portable.", "Sens involontaire : had + objet + participe passé. Il subit l'action, il ne la commande pas.", 'Involuntary meaning: had + object + past participle. He suffers the action, he does not order it.', hint('sens involontaire', 'involuntary meaning')),
  K("A cleaner cleans the office every week. They ___.", [HG(['have the office cleaned'], { by: 'by a cleaner', at: 'every week' })], "Ils font nettoyer le bureau chaque semaine.", WHY_HAVE, WHY_HAVE_EN, hint('HAVE + objet + participe passé', 'HAVE + object + past participle')),
  K("A photographer took professional photos. She ___.", [HG(['had professional photos taken'], { by: 'by a photographer' })], "Elle a fait faire des photos professionnelles.", WHY_HAVE, WHY_HAVE_EN, hint('HAVE + objet + participe passé', 'HAVE + object + past participle')),
  K("A doctor examined him. He ___.", [HG(['had himself examined'], { by: 'by a doctor' }).concat(['had a doctor examine him', 'got a doctor to examine him'])], "Il s'est fait examiner par un médecin.", "had + objet réfléchi + participe passé : had himself examined. Dans had a doctor examine him, c'est have + personne + verbe.", 'had + reflexive object + past participle: had himself examined. In had a doctor examine him, it is have + person + verb.', hint('HAVE + objet réfléchi + participe passé', 'HAVE + reflexive object + past participle')),
  K("They are installing solar panels. The company ___.", [HG(['is having solar panels installed', 'is getting solar panels installed'])], "L'entreprise fait installer des panneaux solaires.", "Présent continu : is having (ou is getting) + objet + participe passé.", 'Present continuous: is having (or is getting) + object + past participle.', hint('BE HAVING + objet + participe passé', 'BE HAVING + object + past participle')),
  K("A plumber has repaired the pipes. I ___.", [HG(['have had the pipes repaired'], { by: 'by a plumber' })], "J'ai fait réparer les canalisations.", "Present perfect : have had + objet + participe passé.", 'Present perfect: have had + object + past participle.', hint('HAVE HAD + objet + participe passé', 'HAVE HAD + object + past participle'))
];

const guideeB = [
  K("The professor forced us to rewrite the report. The professor ___.", [['made us rewrite the report']], "Le professeur nous a obligés à réécrire le rapport.", "Forcer : make + personne + base verbale, sans to.", 'To force: make + person + base verb, no to.', hint('forcer', 'force')),
  K("She convinced her colleague to help her. She ___.", [['got her colleague to help her']], "Elle a convaincu sa collègue de l'aider.", "Persuader : get + personne + to + verbe.", 'To persuade: get + person + to + verb.', hint('convaincre', 'convince')),
  K("The manager allows us to work flexibly. The manager ___.", [['lets us work flexibly', 'lets us work flexible hours']], "Le responsable nous laisse travailler de façon flexible.", "Permettre : let + personne + base verbale, sans to.", 'To allow: let + person + base verb, no to.', hint('permettre', 'allow')),
  K("The noise stopped me from concentrating. The noise ___.", [['made me lose concentration', 'made me lose my concentration', 'made me lose focus', 'made me lose my focus']], "Le bruit m'a fait perdre ma concentration.", "Cause involontaire : make + personne + base verbale (lose).", 'Involuntary cause: make + person + base verb (lose).', hint('cause involontaire', 'involuntary cause')),
  K("Can you persuade him to join the team? Can you ___?", [['get him to join the team']], "Peux-tu le convaincre de rejoindre l'équipe ?", "Persuader : get + personne + to + verbe.", 'To persuade: get + person + to + verb.', hint('persuader', 'persuade')),
  K("She forced her team to stay late. She ___.", [['made her team stay late']], "Elle a obligé son équipe à rester tard.", "Forcer : made + personne + base verbale.", 'To force: made + person + base verb.', hint('forcer', 'force')),
  K("He allowed me to use his lab. He ___.", [['let me use his lab']], "Il m'a laissé utiliser son laboratoire.", "Permettre : let + personne + base verbale. Le passé de let est let.", 'To allow: let + person + base verb. The past of let is let.', hint('permettre', 'allow')),
  K("She persuaded the board to approve the budget. She ___.", [['got the board to approve the budget']], "Elle a convaincu le conseil d'approuver le budget.", "Persuader : got + personne + to + verbe.", 'To persuade: got + person + to + verb.', hint('persuader', 'persuade')),
  K("My parents allowed me to work abroad. My parents ___.", [['let me work abroad']], "Mes parents m'ont laissé travailler à l'étranger.", "Permettre : let + personne + base verbale.", 'To allow: let + person + base verb.', hint('permettre', 'allow')),
  K("The coach forced us to train every day. The coach ___.", [['made us train every day']], "L'entraîneur nous a obligés à nous entraîner tous les jours.", "Forcer : made + personne + base verbale.", 'To force: made + person + base verb.', hint('forcer', 'force'))
];

const nivA = [
  K("A professional translated the document. We ___.", [HG(['had the document translated'], { by: 'by a professional' })], "Nous avons fait traduire le document.", WHY_HAVE, WHY_HAVE_EN),
  K("A hairdresser cuts her hair every month. She ___.", [HG(['has her hair cut'], { by: 'by a hairdresser', at: 'every month' })], "Elle se fait couper les cheveux tous les mois.", WHY_HAVE, WHY_HAVE_EN),
  K("A technician repaired the system last week. They ___.", [HG(['had the system repaired'], { by: 'by a technician', at: 'last week' })], "Ils ont fait réparer le système la semaine dernière.", WHY_HAVE, WHY_HAVE_EN),
  K("A surveyor will inspect the building. She ___.", [HG(['will have the building inspected'], { by: 'by a surveyor' })], "Elle fera inspecter le bâtiment par un expert.", "Futur : will have + objet + participe passé.", 'Future: will have + object + past participle.'),
  K("Someone hacked my account. I ___.", [HG(['had my account hacked'])], "Je me suis fait pirater mon compte.", "Sens involontaire : had + objet + participe passé.", 'Involuntary meaning: had + object + past participle.', hint('involontaire', 'involuntary'))
];
const nivB = [
  K("She convinced him to change his approach. She ___.", [['got him to change his approach']], "Elle l'a convaincu de changer d'approche.", "Persuader : got + personne + to + verbe.", 'To persuade: got + person + to + verb.'),
  K("The alarm stopped us from working. The alarm ___.", [['made us stop working']], "L'alarme nous a fait arrêter de travailler.", "Cause involontaire : made + personne + base verbale.", 'Involuntary cause: made + person + base verb.'),
  K("He allowed his staff to work flexible hours. He ___.", [['let his staff work flexible hours', 'let his staff work flexibly', 'let them work flexible hours']], "Il a laissé son personnel travailler à horaires flexibles.", "Permettre : let + personne + base verbale, sans to.", 'To allow: let + person + base verb, no to.'),
  K("They forced all staff to attend the training. They ___.", [['made all staff attend the training', 'made all the staff attend the training']], "Ils ont obligé tout le personnel à suivre la formation.", "Forcer : made + personne + base verbale.", 'To force: made + person + base verb.'),
  K("Can you persuade the client to extend the deadline? Can you ___?", [['get the client to extend the deadline']], "Peux-tu convaincre le client de prolonger le délai ?", "Persuader : get + personne + to + verbe.", 'To persuade: get + person + to + verb.')
];
const nivBtr = [
  R("Le directeur nous a forcés à rédiger un rapport complet.", ['The director made us write a full report.', 'The director made us write a complete report.', 'The manager made us write a full report.', 'The director made us write a detailed report.'], "forcer quelqu'un à faire : made + personne + base verbale.", 'to force someone to do: made + person + base verb.'),
  R("Je me suis fait voler mon ordinateur dans le train.", ['I had my laptop stolen on the train.', 'I had my computer stolen on the train.', 'I got my laptop stolen on the train.', 'I had my laptop stolen in the train.', 'I had my laptop stolen on a train.'], "se faire voler : had + objet + participe passé (sens involontaire).", 'se faire voler: had + object + past participle (involuntary meaning).'),
  R("Elle fait repeindre son bureau tous les deux ans.", ['She has her office repainted every two years.', 'She gets her office repainted every two years.', 'She has her office painted every two years.', 'She has her office repainted every other year.'], "faire repeindre : has + objet + participe passé.", 'faire repeindre: has + object + past participle.'),
  R("Il a convaincu son équipe d'adopter le nouveau logiciel.", ['He got his team to adopt the new software.', 'He got his team to adopt the new program.', 'He got his team to use the new software.'], "convaincre quelqu'un de : got + personne + to + verbe.", 'convaincre quelqu\'un de: got + person + to + verb.'),
  R("Pouvez-vous convaincre le client d'accepter notre offre ?", ['Can you get the client to accept our offer?', 'Could you get the client to accept our offer?', 'Can you get the customer to accept our offer?', 'Could you get the customer to accept our offer?'], "convaincre : get + personne + to + verbe.", 'to persuade: get + person + to + verb.')
];
const nivC = [
  F('She made him to rewrite the code.', ['She made him rewrite the code.'], "Elle lui a fait réécrire le code.", "Après make + personne, la base verbale s'emploie sans to.", 'After make + person, use the base verb with no to.'),
  F('I had fixed my car yesterday.', ['I had my car fixed yesterday.', 'I got my car fixed yesterday.'], "J'ai fait réparer ma voiture hier.", "had fixed est un Past Perfect (j'avais réparé). Pour faire faire : had + objet + participe passé.", 'had fixed is a past perfect (I had repaired). To have something done: had + object + past participle.'),
  F('He got her help with the project.', ['He got her to help with the project.', 'He got her to help him with the project.'], "Il l'a convaincue de contribuer au projet.", "get + personne + to + verbe : got her to help.", 'get + person + to + verb: got her to help.'),
  F('They let her to leave early.', ['They let her leave early.'], "Ils l'ont laissée partir plus tôt.", "Après let + personne, la base verbale s'emploie sans to.", 'After let + person, use the base verb with no to.'),
  F('She had stolen her phone on the train.', ['She had her phone stolen on the train.', 'She got her phone stolen on the train.'], "Elle s'est fait voler son téléphone dans le train.", "had stolen signifie qu'elle a volé (Past Perfect). Se faire voler : had + objet + participe passé.", 'had stolen means she stole it (past perfect). To have something stolen: had + object + past participle.')
];
const bonus = [
  K("'We will arrange for a lawyer to review the contract before signing.' We will ___.", [HG(['have the contract reviewed by a lawyer before signing', 'have a lawyer review the contract before signing', 'get a lawyer to review the contract before signing', 'have the contract reviewed before signing'])], "Nous ferons relire le contrat par un juriste avant de signer.", "will have + objet + participe passé, ou have / get + personne + verbe.", 'will have + object + past participle, or have / get + person + verb.'),
  K("'Could you convince the team to accept the new timeline?' Could you ___?", [['get the team to accept the new timeline']], "Pourriez-vous convaincre l'équipe d'accepter le nouveau calendrier ?", "Convaincre : get + personne + to + verbe.", 'To convince: get + person + to + verb.'),
  K("'The CEO required everyone to attend the company day.' The CEO ___.", [['made everyone attend the company day']], "Le PDG a obligé tout le monde à assister à la journée de l'entreprise.", "Obliger : made + personne + base verbale.", 'To require: made + person + base verb.'),
  K("'We arranged for an external firm to conduct the audit.' We ___.", [['had an external firm conduct the audit', 'had the audit conducted by an external firm', 'got an external firm to conduct the audit', 'got the audit conducted by an external firm']], "Nous avons confié l'audit à un cabinet externe.", "arranged for → had / got : had + personne + base verbale, ou had + objet + participe passé.", 'arranged for → had / got: had + person + base verb, or had + object + past participle.'),
  K("'She allowed her interns to present their findings.' She ___.", [['let her interns present their findings']], "Elle a laissé ses stagiaires présenter leurs résultats.", "Permettre : let + personne + base verbale.", 'To allow: let + person + base verb.')
];
const devoir = [
  K("A technician checks the equipment every month. The team ___.", [HG(['has the equipment checked'], { by: 'by a technician', at: 'every month' })], "L'équipe fait vérifier le matériel chaque mois.", WHY_HAVE, WHY_HAVE_EN),
  K("Someone broke into his car. He ___.", [HG(['had his car broken into'])], "Il s'est fait cambrioler sa voiture.", "Sens involontaire : had + objet + participe passé (broken into).", 'Involuntary meaning: had + object + past participle (broken into).', hint('involontaire', 'involuntary')),
  K("She convinced her manager to approve the budget. She ___.", [['got her manager to approve the budget']], "Elle a convaincu son responsable d'approuver le budget.", "Persuader : got + personne + to + verbe.", 'To persuade: got + person + to + verb.'),
  K("The noise stopped me from sleeping. The noise ___.", [['made me lose sleep']], "Le bruit m'a fait perdre le sommeil.", "Cause involontaire : made + personne + base verbale (lose sleep).", 'Involuntary cause: made + person + base verb (lose sleep).'),
  K("He allowed the intern to lead the meeting. He ___.", [['let the intern lead the meeting']], "Il a laissé le stagiaire diriger la réunion.", "Permettre : let + personne + base verbale.", 'To allow: let + person + base verb.'),
  K("Ils font livrer leurs courses à domicile. They ___.", [HG(['have their groceries delivered', 'have their shopping delivered'], { at: 'to their home' }).concat(HG(['have their groceries delivered', 'have their shopping delivered'], { at: 'at home' })).concat(HG(['have their groceries delivered', 'have their shopping delivered'], { at: 'to their door' }))], "Ils font livrer leurs courses à domicile.", WHY_HAVE, WHY_HAVE_EN),
  K("L'entreprise nous a forcés à suivre une formation en ligne. The company ___.", [['made us complete an online training course', 'made us take an online training course', 'made us follow an online training course', 'made us do an online training course', 'made us complete an online course', 'made us take an online course', 'made us follow an online course']], "L'entreprise nous a forcés à suivre une formation en ligne.", "Forcer : made + personne + base verbale.", 'To force: made + person + base verb.'),
  K("Le professeur a fait refaire l'expérience aux étudiants. The professor ___.", [['made the students redo the experiment', 'made the students repeat the experiment', 'made the students do the experiment again', 'made the students do the experiment over']], "Le professeur a fait refaire l'expérience aux étudiants.", "Faire faire à quelqu'un (contrainte) : made + personne + base verbale.", 'To make someone do (compulsion): made + person + base verb.'),
  K("Je vais faire réviser ma voiture avant le long trajet. I ___.", [HG(['am going to have my car serviced', 'will have my car serviced', 'am going to have my car checked'], { at: 'before the long trip' }).concat(HG(['am going to have my car serviced', 'will have my car serviced'], { at: 'before the long journey' }), HG(['am going to have my car serviced', 'will have my car serviced'], { at: 'before the long drive' }))], "Je vais faire réviser ma voiture avant le long trajet.", "Futur proche : am going to have + objet + participe passé.", 'Near future: am going to have + object + past participle.'),
  K("Elle a convaincu le directeur d'approuver le projet. She ___.", [['got the director to approve the project']], "Elle a convaincu le directeur d'approuver le projet.", "Convaincre : got + personne + to + verbe.", 'To convince: got + person + to + verb.'),
  K("A photographer is taking product photos. The marketing team ___.", [HG(['is having product photos taken', 'is getting product photos taken'], { by: 'by a photographer' })], "L'équipe marketing fait prendre des photos de produits.", "Présent continu : is having (ou is getting) + objet + participe passé.", 'Present continuous: is having (or is getting) + object + past participle.'),
  K("They will arrange for a consultant to review the strategy. They ___.", [HG(['will have the strategy reviewed'], { by: 'by a consultant' }).concat(['will have a consultant review the strategy', 'will get a consultant to review the strategy'])], "Ils feront examiner la stratégie par un consultant.", "arrange for → will have : will have + objet + participe passé.", 'arrange for → will have: will have + object + past participle.'),
  K("The manager required the team to work overtime last Friday. The manager ___.", [['made the team work overtime last Friday']], "Le responsable a obligé l'équipe à faire des heures supplémentaires vendredi dernier.", "Obliger : made + personne + base verbale.", 'To require: made + person + base verb.'),
  K("My parents allowed me to study abroad. My parents ___.", [['let me study abroad']], "Mes parents m'ont laissé étudier à l'étranger.", "Permettre : let + personne + base verbale.", 'To allow: let + person + base verb.'),
  K("She arranged for the system to be updated overnight. She ___.", [HG(['had the system updated overnight', 'had the system updated during the night'])], "Elle a fait mettre à jour le système pendant la nuit.", "arranged for ... to be updated → had + objet + participe passé.", 'arranged for ... to be updated → had + object + past participle.')
];
const m9a = [
  K("A plumber repaired the pipes. I ___.", [HG(['had the pipes repaired'], { by: 'by a plumber' })], "J'ai fait réparer les canalisations.", WHY_HAVE, WHY_HAVE_EN),
  K("A designer is creating the logo. They ___.", [HG(['are having the logo created', 'are getting the logo created'], { by: 'by a designer' })], "Ils font créer le logo.", "Présent continu : are having (ou are getting) + objet + participe passé.", 'Present continuous: are having (or are getting) + object + past participle.'),
  K("An expert will review the patent. She ___.", [HG(['will have the patent reviewed'], { by: 'by an expert' })], "Elle fera examiner le brevet par un expert.", "Futur : will have + objet + participe passé.", 'Future: will have + object + past participle.'),
  K("A hacker accessed his account. He ___.", [HG(['had his account hacked'])], "Il s'est fait pirater son compte.", "Sens involontaire : had + objet + participe passé.", 'Involuntary meaning: had + object + past participle.', hint('involontaire', 'involuntary')),
  K("A mechanic checked her car. She ___.", [['got her car checked', 'got her car checked by a mechanic']], "Elle a fait vérifier sa voiture.", "Avec get : got + objet + participe passé.", 'With get: got + object + past participle.', hint('avec get', 'with get'))
];
const m9b = [
  K("The manager ___ the team ___ (work) overtime.", [['made'], ['work']], "Le responsable a obligé l'équipe à faire des heures supplémentaires.", "Forcer : made + personne + base verbale.", 'To force: made + person + base verb.', hint('obliger', 'force')),
  K("She ___ her colleague ___ (help) her with the analysis.", [['got'], ['to help']], "Elle a convaincu sa collègue de l'aider pour l'analyse.", "Persuader : got + personne + to + verbe.", 'To persuade: got + person + to + verb.', hint('persuader', 'persuade')),
  K("He ___ his intern ___ (lead) the meeting.", [['let'], ['lead']], "Il a laissé son stagiaire diriger la réunion.", "Permettre : let + personne + base verbale.", 'To allow: let + person + base verb.', hint('permettre', 'allow')),
  K("The noise ___ me ___ (lose) my concentration.", [['made'], ['lose']], "Le bruit m'a fait perdre ma concentration.", "Cause involontaire : made + personne + base verbale.", 'Involuntary cause: made + person + base verb.', hint('cause involontaire', 'involuntary cause')),
  K("Can you ___ him ___ (agree) to the new terms?", [['get'], ['to agree']], "Peux-tu le convaincre d'accepter les nouvelles conditions ?", "Persuader : get + personne + to + verbe.", 'To persuade: get + person + to + verb.', hint('persuader', 'persuade'))
];
const m9c = [
  W('car / had / I / repaired / my', ['I had my car repaired.'], "J'ai fait réparer ma voiture.", 'had + objet + participe passé.', 'had + object + past participle.'),
  W('stolen / had / wallet / he / his', ['He had his wallet stolen.'], "Il s'est fait voler son portefeuille.", 'Sens involontaire : had + objet + participe passé.', 'Involuntary meaning: had + object + past participle.'),
  W('engineers / made / redo / test / the / director / the', ['The director made the engineers redo the test.'], "Le directeur a obligé les ingénieurs à refaire le test.", 'made + personne + base verbale.', 'made + person + base verb.'),
  W('let / book / room / assistant / she / her / the', ['She let her assistant book the room.'], "Elle a laissé son assistant réserver la salle.", 'let + personne + base verbale.', 'let + person + base verb.'),
  W('checked / got / car / she / her', ['She got her car checked.'], "Elle a fait vérifier sa voiture.", 'got + objet + participe passé.', 'got + object + past participle.'),
  W('sign / her / can / to / the / contract / you / get', ['Can you get her to sign the contract?'], "Peux-tu la convaincre de signer le contrat ?", 'get + personne + to + verbe.', 'get + person + to + verb.'),
  W('logo / creating / the / having / are / they', ['They are having the logo created.'], "Ils font créer le logo.", 'are having + objet + participe passé.', 'are having + object + past participle.'),
  W('heat / made / stop / experiment / the / us / the', ['The heat made us stop the experiment.'], "La chaleur nous a fait arrêter l'expérience.", 'made + personne + base verbale.', 'made + person + base verb.')
];
const th = [
  R("J'ai fait réparer ma voiture.", ['I got my car repaired.', 'I had my car repaired.', 'I had my car fixed.', 'I got my car fixed.', 'I have had my car repaired.', 'I have had my car fixed.'], "faire réparer : had + objet + participe passé.", 'To have a car repaired: had + object + past participle.'),
  R("On lui a volé son ordinateur portable.", ['He had his laptop stolen.', 'She had her laptop stolen.', 'He got his laptop stolen.', 'She got her laptop stolen.', 'His laptop was stolen.', 'Her laptop was stolen.'], "Sens involontaire : had + objet + participe passé. Le passif simple convient aussi.", 'Involuntary meaning: had + object + past participle. The simple passive also works.'),
  R("Le manager a forcé l'équipe à travailler tard.", ['The manager made the team work late.', 'The manager made the team stay late.'], "forcer : made + personne + base verbale.", 'to force: made + person + base verb.'),
  R("Elle a persuadé son collègue de l'aider.", ['She got her colleague to help her.', 'She got her colleague to help.', 'She got her coworker to help her.'], "persuader : got + personne + to + verbe.", 'to persuade: got + person + to + verb.'),
  R("Il a laissé son stagiaire diriger la réunion.", ['He let his trainee lead the meeting.', 'He let his intern lead the meeting.', 'He let his intern run the meeting.'], "laisser : let + personne + base verbale.", 'to let: let + person + base verb.'),
  R("Vous devriez faire vérifier ce contrat.", ['You should have this contract checked.', 'You should get this contract checked.', 'You should have the contract checked.', 'You ought to have this contract checked.', 'You should have this contract reviewed.', 'You should get this contract reviewed.'], "should have + objet + participe passé : le conseil se met sur le modal, have reste à l'infinitif.", 'should have + object + past participle: the advice is carried by the modal, have stays in the infinitive.'),
  R("Le bruit m'a fait perdre ma concentration.", ['The noise made me lose focus.', 'The noise made me lose my concentration.', 'The noise made me lose concentration.', 'The noise made me lose my focus.'], "cause involontaire : made + personne + base verbale.", 'involuntary cause: made + person + base verb.')
];

const SK = (fr, en) => [fr, en];
const HD = SK('Causatives : have / get something done', 'Causatives: have / get something done');
const MGL = SK('Causatives : make, get, let someone do', 'Causatives: make, get, let someone do');
const MIX = SK('Causatives (mélange)', 'Causatives (mixed)');
export const G09 = {
  id: 'G09',
  title: 'Les causatives (Have / Get / Make / Let)',
  coursUrl: '',
  skills: {
    '*': MIX,
    'g09-guidee-a': HD, 'g09-niv-a': HD, 'g09-m9a': HD,
    'g09-guidee-b': MGL, 'g09-niv-b': MGL, 'g09-m9b': MGL,
    'g09-niv-c': SK('Causatives : corrections et thème', 'Causatives: corrections and translation'),
    'g09-th': SK('Causatives : corrections et thème', 'Causatives: corrections and translation'),
    'g09-m9c': SK('Ordre des mots', 'Word order')
  },
  sets: [
    S('g09-guidee-a', FICHE, ['Série guidée A : have / get something done', 'Guided set A: have / get something done'], 'B1+', ['Reformule avec have ou get + objet + participe passé.', 'Rewrite with have or get + object + past participle.'], guideeA),
    S('g09-guidee-b', FICHE, ['Série guidée B : make / get / let', 'Guided set B: make / get / let'], 'B2', ['Choisis make, get ou let selon le sens.', 'Choose make, get or let according to the meaning.'], guideeB),
    S('g09-niv-a', FICHE, ['Niveau A : have / get something done', 'Level A: have / get something done'], 'B1+', [CF, CFE], nivA),
    S('g09-niv-b', FICHE, ['Niveau B : make / get / let et thème', 'Level B: make / get / let and translation'], 'B2', ['Complète cinq phrases, puis traduis cinq phrases.', 'Complete five sentences, then translate five sentences.'], [...nivB, ...nivBtr]),
    S('g09-niv-c', FICHE, ['Niveau C : corrections et nuances', 'Level C: corrections and nuances'], 'B2+', ['Corrige les erreurs.', 'Correct the mistakes.'], nivC),
    S('g09-bonus', FICHE, ['Bonus : registre professionnel', 'Bonus: professional register'], 'B2+', ['Reformule la phrase d\'e-mail avec une structure causative.', 'Rewrite the email sentence with a causative structure.'], bonus),
    S('g09-devoir', FICHE, ['Devoir maison', 'Homework'], 'B2', ['Quinze phrases à reformuler ou à traduire avec une structure causative.', 'Fifteen sentences to rewrite or translate with a causative structure.'], devoir),
    S('g09-m9a', MURPHY, ['Unité 9A : have / get something done', 'Unit 9A: have / get something done'], 'B1+', ['Reformule avec have ou get.', 'Rewrite with have or get.'], m9a),
    S('g09-m9b', MURPHY, ['Unité 9B : make / get / let someone do', 'Unit 9B: make / get / let someone do'], 'B2', ['Complète avec make, get ou let et la bonne forme du verbe.', 'Complete with make, get or let and the right verb form.'], m9b),
    S('g09-m9c', MURPHY, ['Unité 9C : remettre les mots dans l\'ordre', 'Unit 9C: sentence building'], 'B1+', ['Écris la phrase complète avec les mots dans le bon ordre.', 'Write the complete sentence with the words in the right order.'], m9c),
    S('g09-th', MURPHY, ['Unité TH : thème grammatical', 'Unit TH: translation'], 'B2', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], th)
  ],
  recap: {
    blocks: [
      {
        title: 'Faire faire : have / get',
        forms: [
          ['have + objet + participe passé', "I had my car repaired. (quelqu'un l'a réparée pour moi)"],
          ['get + objet + participe passé', "I need to get my phone fixed. (plus familier, plus d'effort)"],
          ['have + personne + base verbale', 'She had the technician check the system.'],
          ['get + personne + to + verbe', 'He got his colleague to write it. (convaincre)'],
          ['have + objet + participe passé (subi)', 'I had my wallet stolen. (involontaire)']
        ],
        uses: ["Le temps se marque sur have ou get : had, has, will have, is having, has had."]
      },
      {
        title: 'Forcer, permettre',
        forms: [
          ['make + personne + base verbale', 'The boss made him work late. (forcer, sans to)'],
          ['let + personne + base verbale', 'She let me leave early. (permettre, sans to)'],
          ['get + personne + to + verbe', 'She got him to stay. (persuader, avec to)']
        ],
        uses: ["make et let : base verbale sans to. get : avec to."]
      }
    ],
    tables: [],
    notes: ["She had her phone stolen est involontaire (elle s'est fait voler) ; She had stolen her phone signifie qu'elle a volé le téléphone.", "make = contrainte, get = persuasion, let = permission, have = demande neutre."],
    rule: "have sth done = par quelqu'un d'autre, make sb do = force, get sb to do = convainc, let sb do = permet."
  },
  enMeta: {
    title: 'Causatives',
    recap: {
      blocks: [
        {
          title: 'Having things done: have / get',
          forms: [
            ['have + object + past participle', 'I had my car repaired. (someone repaired it for me)'],
            ['get + object + past participle', 'I need to get my phone fixed. (more informal, more effort)'],
            ['have + person + base verb', 'She had the technician check the system.'],
            ['get + person + to + verb', 'He got his colleague to write it. (persuade)'],
            ['have + object + past participle (suffered)', 'I had my wallet stolen. (involuntary)']
          ],
          uses: ['The tense is shown on have or get: had, has, will have, is having, has had.']
        },
        {
          title: 'Forcing, allowing',
          forms: [
            ['make + person + base verb', 'The boss made him work late. (force, no to)'],
            ['let + person + base verb', 'She let me leave early. (allow, no to)'],
            ['get + person + to + verb', 'She got him to stay. (persuade, with to)']
          ],
          uses: ['make and let: base verb without to. get: with to.']
        }
      ],
      tables: [],
      notes: ['She had her phone stolen is involuntary (it was stolen from her); She had stolen her phone means she stole the phone.', 'make = compulsion, get = persuasion, let = permission, have = neutral request.'],
      rule: 'have sth done = by someone else, make sb do = force, get sb to do = persuade, let sb do = allow.'
    }
  }
};
