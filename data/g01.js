// G01 : Present Simple et Present Continuous
// Contenu reconstruit à partir de la fiche élève, du supplément Murphy et du devoir maison.
// Types d'items :
//   cloze  : phrase à trous (___), réponses acceptées par trou
//   choice : choix entre deux formes
//   text   : l'élève tape une phrase entière (correction, transformation, question)
//   free   : production libre ou thème, avec modèle et auto-évaluation
//   essay  : rédaction libre, non notée

const c = (s, a, fr, why, hint) => ({ t: 'cloze', s, a: a.map(x => (Array.isArray(x) ? x : [x])), fr, why, hint });
const ch = (s, o, k, fr, why) => ({ t: 'choice', s, o, c: k, fr, why });
const tx = (instr, s, a, fr, why) => ({ t: 'text', instr, s, a, fr, why });
const okc = (instr, s, fr, why) => ({ t: 'text', instr, s, ok: true, fr, why });
const tr = (s, m, why) => ({ t: 'free', instr: 'Traduis en anglais.', s, m, why });
const op = (instr, s, m, hint) => ({ t: 'free', instr, s, m, hint });
const es = (instr, s, m, hint) => ({ t: 'essay', scored: false, instr, s, m, hint });

const FIX = 'Corrige la phrase. Écris la phrase entière, ou écris Correct si elle est juste.';

const serieA = [
  c('She always ___ (drink) coffee in the morning.', ['drinks'], 'Elle boit toujours du café le matin.',
    'always indique une habitude : Present Simple. À la 3e personne du singulier, on ajoute -s : drinks.', 'always = habitude'),
  c('Listen! The baby ___ (cry) again.', ['is crying'], 'Écoute ! Le bébé pleure encore.',
    "Listen! renvoie à ce qui se passe à l'instant : Present Continuous (be + verbe en -ing).", 'Listen! = en ce moment'),
  c('I ___ (not / understand) this formula.', [["don't understand", 'do not understand']], 'Je ne comprends pas cette formule.',
    "understand est un verbe d'état (stative verb) : on ne l'emploie pas au continu, même pour une situation présente. Négation du Present Simple : do not + base verbale.", "understand : verbe d'état"),
  c('They ___ (build) a new lab this month.', ['are building'], 'Ils construisent un nouveau laboratoire ce mois-ci.',
    'this month marque un projet en cours sur une période limitée : Present Continuous.', 'this month = période limitée'),
  c('Water ___ (boil) at 100°C.', ['boils'], "L'eau bout à 100 °C.",
    'Vérité générale, loi scientifique : Present Simple.', 'vérité générale'),
  c('He ___ (not / like) working alone.', [["doesn't like", 'does not like']], "Il n'aime pas travailler seul.",
    "like est un verbe d'état : Present Simple. À la 3e personne, la négation est does not + base verbale (pas de -s sur like).", "like : verbe d'état"),
  c('Right now, she ___ (analyse) the data.', [['is analysing', 'is analyzing']], 'En ce moment, elle analyse les données.',
    "Right now annonce une action en cours : Present Continuous. L'orthographe analysing (britannique) comme analyzing (américaine) est acceptée.", 'right now = en cours'),
  c('The lab ___ (open) at 8 every day.', ['opens'], 'Le laboratoire ouvre à 8 heures tous les jours.',
    'every day et un horaire fixe : Present Simple.', 'horaire fixe'),
  c("We ___ (meet) the director tomorrow; it's confirmed.", ['are meeting'], 'Nous voyons le directeur demain ; c\'est confirmé.',
    'Rendez-vous déjà arrangé pour un futur proche : Present Continuous (futur planifié).', 'plan arrangé'),
  c('The average temperature of the planet ___ (rise) slowly but steadily these days.', ['is rising'],
    'La température moyenne de la planète augmente lentement mais régulièrement ces temps-ci.',
    'these days signale une évolution en cours : Present Continuous (changement progressif).', 'évolution en cours')
];

const serieB = [
  c('I ___ (think) this plan is excellent. (opinion)', ['think'], 'Je pense que ce plan est excellent.',
    "Au sens « avoir une opinion », think est un verbe d'état : Present Simple.", 'sens : avoir une opinion'),
  c('She ___ (think) about changing jobs. (réflexion en cours)', ['is thinking'], 'Elle réfléchit à changer de travail.',
    "Au sens « réfléchir », think est un verbe d'action : le continu est possible.", 'sens : réfléchir'),
  c('He ___ (have) a company car. (possession)', ['has'], 'Il a une voiture de fonction.',
    "have au sens de posséder est un verbe d'état : Present Simple, 3e personne : has.", 'sens : posséder'),
  c('They ___ (have) a meeting right now.', ['are having'], 'Ils sont en réunion en ce moment.',
    "Dans have a meeting, have est un verbe d'action (tenir une réunion) : Present Continuous.", 'have a meeting = action'),
  c('The soup ___ (taste) delicious!', ['tastes'], 'La soupe a un goût délicieux !',
    "taste au sens « avoir un goût » est un verbe d'état : Present Simple.", 'sens : avoir un goût'),
  c('The chef ___ (taste) the soup right now.', ['is tasting'], 'Le chef goûte la soupe en ce moment.',
    "taste au sens « goûter » est une action volontaire : le continu est possible.", 'sens : goûter'),
  c('She ___ (look) like her mother.', ['looks'], 'Elle ressemble à sa mère.',
    "look like exprime une ressemblance : verbe d'état, donc Present Simple.", 'sens : ressembler'),
  c('He ___ (look) at the results carefully right now.', ['is looking'], 'Il regarde attentivement les résultats en ce moment.',
    'look at (regarder) est une action volontaire en cours : Present Continuous.', 'sens : regarder'),
  c('The company ___ (belong) to a French group.', ['belongs'], "L'entreprise appartient à un groupe français.",
    "belong est un verbe d'état : jamais au continu.", "belong : verbe d'état"),
  c('Renewable energies ___ (become) increasingly affordable.', ['are becoming'], 'Les énergies renouvelables deviennent de plus en plus abordables.',
    'increasingly décrit un changement progressif : Present Continuous.', 'changement progressif')
];

const nivA = [
  c('He ___ (work) late every Friday.', ['works'], 'Il travaille tard tous les vendredis.', 'every Friday indique une habitude : Present Simple, avec -s à la 3e personne.'),
  c('I ___ (not / like) horror films.', [["don't like", 'do not like']], "Je n'aime pas les films d'horreur.", "like est un verbe d'état : Present Simple, négation avec do not."),
  c('What ___ you ___ (do) right now?', ['are', 'doing'], 'Que fais-tu en ce moment ?', 'right now : action en cours. Question au Present Continuous : What + be + sujet + verbe en -ing.'),
  c('The Earth ___ (revolve) around the Sun.', ['revolves'], 'La Terre tourne autour du Soleil.', 'Vérité scientifique permanente : Present Simple.'),
  c('She ___ (prepare) her presentation at the moment.', ['is preparing'], 'Elle prépare son exposé en ce moment.', 'at the moment : action en cours. Attention : prepare perd son e devant -ing (preparing).'),
  c('We ___ (go) to Lyon next weekend. (déjà organisé)', ['are going'], 'Nous allons à Lyon le week-end prochain.', 'Projet déjà arrangé pour un futur proche : Present Continuous.'),
  c('My cat ___ (sleep) on the sofa right now.', ['is sleeping'], 'Mon chat dort sur le canapé en ce moment.', 'right now : action en cours.'),
  c('The factory ___ (produce) 500 units per day.', ['produces'], "L'usine produit 500 unités par jour.", 'per day : fait habituel et régulier, Present Simple.'),
  c('I ___ (not / remember) her name.', [["don't remember", 'do not remember']], 'Je ne me souviens pas de son nom.', "remember est un verbe d'état : pas de continu."),
  c('He ___ (become) a better engineer month after month.', ['is becoming'], 'Il devient un meilleur ingénieur de mois en mois.', 'Évolution progressive : Present Continuous.')
];

const nivB = [
  c('They ___ (hold) a conference call every Monday at 10.', ['hold'], 'Ils tiennent une conférence téléphonique tous les lundis à 10 heures.', 'every Monday : habitude, Present Simple. Sujet pluriel : pas de -s.'),
  c('Look! It ___ (snow) outside, so the roads will be dangerous.', ['is snowing'], 'Regarde ! Il neige dehors, donc les routes vont être dangereuses.', 'Look! annonce une action en cours : Present Continuous.'),
  c('This type of engine ___ (not / run) on diesel.', [["doesn't run", 'does not run']], 'Ce type de moteur ne fonctionne pas au diesel.', "Fait général sur un type de moteur : Present Simple. Négation à la 3e personne : does not + base verbale."),
  c('The professor ___ (currently / explain) the theory; please do not interrupt.', ['is currently explaining'], "Le professeur est en train d'expliquer la théorie ; merci de ne pas l'interrompre.", 'currently et le contexte indiquent une action en cours. L\'adverbe se place entre is et explaining.'),
  c('I ___ (usually / take) the train but today I ___ (drive).', ['usually take', ['am driving', "'m driving"]], "D'habitude je prends le train mais aujourd'hui je conduis.", 'usually : habitude (Present Simple). today : exception temporaire (Present Continuous).'),
  c('This laptop ___ (contain) confidential files.', ['contains'], 'Cet ordinateur portable contient des fichiers confidentiels.', "contain est un verbe d'état : Present Simple."),
  c('The students ___ (revise) for their finals this week.', ['are revising'], 'Les étudiants révisent pour leurs examens finaux cette semaine.', 'this week : période limitée, Present Continuous.'),
  c('He ___ (not / drive) to work; he cycles.', [["doesn't drive", 'does not drive']], 'Il ne va pas au travail en voiture ; il y va à vélo.', 'Habitude de déplacement : Present Simple. Négation à la 3e personne : does not + base verbale.'),
  c('What ___ this abbreviation ___ (mean)?', ['does', 'mean'], 'Que signifie cette abréviation ?', "mean est un verbe d'état : Present Simple. Question : What + does + sujet + base verbale."),
  c('The company ___ (expand) its operations in Southeast Asia this year.', ['is expanding'], "L'entreprise développe ses activités en Asie du Sud-Est cette année.", 'this year : développement en cours, Present Continuous.')
];

const nivC = [
  tx(FIX, 'She is knowing the answer.', ['She knows the answer.'], 'Elle connaît la réponse.', "know est un verbe d'état : pas de continu."),
  tx(FIX, 'He work for a multinational company.', ['He works for a multinational company.'], 'Il travaille pour une multinationale.', 'À la 3e personne du singulier, le Present Simple prend -s : works.'),
  tx(FIX, 'Are you understand what I mean?', ['Do you understand what I mean?'], 'Comprends-tu ce que je veux dire ?', "understand est un verbe d'état et se conjugue au Present Simple. La question se forme avec do + sujet + base verbale, pas avec be."),
  tx(FIX, 'They are usually arriving at 8.', ['They usually arrive at 8.'], 'Ils arrivent généralement à 8 heures.', 'usually exprime une habitude : Present Simple.'),
  tx(FIX, "I'm not agree with your conclusion.", ["I don't agree with your conclusion.", 'I do not agree with your conclusion.'], "Je ne suis pas d'accord avec votre conclusion.", "En anglais, agree est un verbe (I agree), pas une construction avec be. C'est de plus un verbe d'état : Present Simple, négation avec do not."),
  tr("Il ne boit jamais de café l'après-midi.", ['He never drinks coffee in the afternoon.'], 'Habitude : Present Simple. never se place avant le verbe, et le verbe garde son -s : never drinks.'),
  tr("Qu'est-ce que tu fais en ce moment ? Je corrige des copies.", ["What are you doing at the moment? I'm marking papers.", "What are you doing right now? I'm grading papers."], 'Deux actions en cours : Present Continuous. marking (britannique) et grading (américain) sont tous deux corrects.'),
  tr("Il ne comprend jamais ce que je lui explique.", ['He never understands what I explain to him.'], "understand est un verbe d'état : Present Simple. explain, au sens habituel, reste aussi au Simple."),
  tr('La pollution augmente de plus en plus dans nos villes.', ['Pollution is increasing more and more in our cities.', 'Pollution is getting worse and worse in our cities.'], 'Évolution en cours : Present Continuous. « de plus en plus » se traduit par more and more.'),
  tr('Est-ce que tu vas souvent au laboratoire le vendredi ?', ['Do you often go to the lab on Fridays?'], 'Habitude : Present Simple. often se place entre le sujet et le verbe, et on dit on Fridays.')
];

const nivD = [
  c("A: Why ___ you ___ (look) at me like that?\nB: Sorry, I ___ (think) about what you just said.", ['are', 'looking', ['am thinking', "'m thinking"]],
    "A : Pourquoi me regardes-tu comme ça ? B : Désolé, je réfléchissais à ce que tu viens de dire.",
    "Deux actions en cours : Present Continuous. Ici think signifie réfléchir, c'est donc un verbe d'action."),
  c("A: ___ you ___ (know) when the new policy starts?\nB: I ___ (think) it starts in March, but we ___ (still / wait) for the official email.", ['Do', 'know', 'think', 'are still waiting'],
    "A : Sais-tu quand la nouvelle politique entre en vigueur ? B : Je pense que c'est en mars, mais nous attendons encore le courriel officiel.",
    "know est un verbe d'état : question avec do. think au sens d'opinion reste au Simple. still waiting : situation en cours, Present Continuous."),
  c('I ___ (not / understand) why the server ___ (not / respond) right now.', [["don't understand", 'do not understand'], ["isn't responding", 'is not responding']],
    'Je ne comprends pas pourquoi le serveur ne répond pas en ce moment.',
    "understand est un verbe d'état. right now indique que le serveur est en panne à cet instant : Present Continuous."),
  c('The new AI assistant ___ (gradually / replace) some administrative tasks.', ['is gradually replacing'],
    'Le nouvel assistant IA remplace progressivement certaines tâches administratives.', 'gradually souligne un changement en cours : Present Continuous.'),
  c('Most engineers ___ (use) Python, but our team ___ (prefer) Julia for simulations.', ['use', 'prefers'],
    'La plupart des ingénieurs utilisent Python, mais notre équipe préfère Julia pour les simulations.',
    "Constat général : Present Simple. prefer est de plus un verbe d'état."),
  tx('Mets la phrase à la forme négative.', 'Our supplier delivers on Sundays.', ['Our supplier does not deliver on Sundays.', "Our supplier doesn't deliver on Sundays."],
    'Notre fournisseur ne livre pas le dimanche.', 'Present Simple : does not + base verbale, le -s disparaît de delivers.'),
  tx('Transforme la phrase en question (réponse oui ou non).', 'The students are taking the exam now.', ['Are the students taking the exam now?'],
    "Les étudiants passent-ils l'examen en ce moment ?", 'Present Continuous : on inverse be et le sujet.'),
  tx('Pose la question avec What sur « a report about solar panels ».', 'He is writing a report about solar panels.', ['What is he writing?'],
    'Que rédige-t-il ?', 'Present Continuous : What + be + sujet + verbe en -ing.'),
  tx('Réécris la phrase en commençant par « According to the data, ».', 'The data suggests that usage is increasing.', ['According to the data, usage is increasing.'],
    "D'après les données, l'utilisation augmente.", "increasing garde le Present Continuous : c'est une tendance en cours."),
  tx('Réécris la phrase en commençant par « He says ».', 'He tells me he does not want to be disturbed.',
    ["He says he doesn't want to be disturbed.", 'He says he does not want to be disturbed.', "He says that he doesn't want to be disturbed.", 'He says that he does not want to be disturbed.'],
    "Il dit qu'il ne veut pas être dérangé.", "want est un verbe d'état : Present Simple. that est facultatif après says.")
];

const bonus = [
  op('Correct ou incorrect ? Pourquoi ?', "I'm loving this project!",
    ["Du point de vue de la grammaire standard, love est un verbe d'état et se met au Present Simple : I love this project. Le continu s'entend à l'oral, de façon informelle, pour souligner qu'on savoure une expérience en cours (c'est le principe d'un slogan publicitaire connu). À éviter à l'écrit et au TOEIC."],
    "Pense à la catégorie du verbe (sentiment) avant de répondre."),
  op('Quel sens particulier ce continu donne-t-il ?', "He's always losing his badge.",
    ["always + continuous exprime une répétition perçue comme agaçante : le locuteur critique. Comparer avec He always loses his badge, simple constat d'habitude."],
    'Compare avec la version au Present Simple.'),
  op('Dans quel contexte cette phrase est-elle correcte ?', 'Water is boiling at 100°C.',
    ["Comme loi générale, il faut le Present Simple : Water boils at 100°C. Le continu n'est possible que pour décrire un phénomène observé en cours, par exemple dans un compte rendu d'expérience : The water in the flask is boiling at 100°C."],
    'Distingue la loi générale du phénomène observé.'),
  op("Compare les deux phrases : pourquoi le continu n'est-il possible que dans la seconde ?", "I think the sensor is faulty. / I'm thinking of replacing the sensor.",
    ["Dans la première, think exprime une opinion (verbe d'état) : pas de continu. Dans la seconde, think of signifie réfléchir à un projet : c'est un processus mental en cours (verbe d'action), donc le continu est possible."],
    'Le sens du verbe décide de la forme.'),
  op('Quel emploi du continu reconnais-tu ?', 'The number of remote workers is growing.',
    ["Continu de tendance : on décrit un changement en cours, sans date précise. Mots typiques : more and more, increasingly, this year."],
    'Pense aux verbes de changement : grow, rise, get, become.'),
  es('Rédige environ 50 mots : décris ta journée type ET ce que tu fais en ce moment. Utilise au moins 3 verbes au Present Simple et 2 au Present Continuous.',
    'Début possible : On weekdays, I usually... / Right now, I am...',
    ["On weekdays, I usually get up at seven and take the tram to campus. I have lectures until noon, then I eat at the canteen. Right now, I am sitting in the library and I am writing this paragraph. This week, I am also preparing a presentation for my project group."],
    'Vérifie : verbes d\'état au Simple, actions en cours au Continu, -s à la 3e personne.')
];

const devoir = [
  c('She ___ (not / work) on weekends.', [["doesn't work", 'does not work']], 'Elle ne travaille pas le week-end.', 'Habitude : Present Simple, négation à la 3e personne : does not + base verbale.'),
  c('The technician ___ (calibrate) the spectrometer right now.', ['is calibrating'], 'Le technicien étalonne le spectromètre en ce moment.', 'right now : action en cours. calibrate perd son e devant -ing.'),
  c('Plastic ___ (not / conduct) electricity.', [["doesn't conduct", 'does not conduct']], "Le plastique ne conduit pas l'électricité.", 'Propriété générale d\'un matériau : Present Simple.'),
  c('I ___ (think) we need to change our approach. (opinion)', ['think'], "Je pense que nous devons changer d'approche.", "think au sens d'opinion est un verbe d'état : Present Simple."),
  c('They ___ (currently / develop) a new mobile app.', ['are currently developing'], 'Ils développent actuellement une nouvelle application mobile.', 'currently : projet en cours. Present Continuous, avec l\'adverbe entre are et developing.'),
  c('He ___ (hate) getting up early.', ['hates'], 'Il déteste se lever tôt.', "hate exprime un sentiment : verbe d'état, Present Simple."),
  c('The company ___ (lose) market share this quarter.', ['is losing'], "L'entreprise perd des parts de marché ce trimestre.", 'this quarter : évolution en cours sur une période limitée.'),
  c('She ___ (see) her tutor this afternoon. (rendez-vous prévu)', ['is seeing'], 'Elle voit son tuteur cet après-midi.', 'Rendez-vous arrangé : Present Continuous à sens futur. Ici see signifie rencontrer.'),
  c('The apprentices ___ (practise) welding these days.', [['are practising', 'are practicing']], "Les apprentis s'exercent au soudage ces temps-ci.", 'these days : période en cours. practise (britannique) et practice (américain) sont acceptés.'),
  c('It ___ (usually / rain) a lot in northern France in autumn.', ['usually rains'], 'Il pleut généralement beaucoup dans le nord de la France en automne.', 'usually et une généralité climatique : Present Simple. L\'adverbe se place avant le verbe.'),
  c('The corridor ___ (smell) of gas.', ['smells'], 'Le couloir sent le gaz.', "smell of (sentir) est un verbe d'état : Present Simple."),
  c('Why ___ you ___ (smell) the milk? Is it off?', ['are', 'smelling'], 'Pourquoi sens-tu le lait ? Est-il tourné ?', "Ici smell est une action volontaire (renifler) : Present Continuous."),
  c('More and more companies ___ (adopt) remote working policies.', ['are adopting'], "De plus en plus d'entreprises adoptent des politiques de télétravail.", 'more and more : tendance en cours.'),
  c('I ___ (not / believe) that figure; please check your source.', [["don't believe", 'do not believe']], 'Je ne crois pas ce chiffre ; vérifie ta source, s\'il te plaît.', "believe est un verbe d'état : Present Simple."),
  c('She ___ (always / double-check) her calculations before submitting. (habitude)', ['always double-checks'], 'Elle revérifie toujours ses calculs avant de les rendre.', 'always sans reproche : habitude neutre, Present Simple. L\'adverbe se place avant le verbe.')
];

const m1aEx1 = [
  c('She ___ (work) in the engineering department.', ['works'], "Elle travaille au département d'ingénierie.", 'Situation permanente : Present Simple.'),
  c('Listen, he ___ (play) the guitar!', ['is playing'], 'Écoute, il joue de la guitare !', 'Listen annonce une action en cours : Present Continuous.'),
  c('Jupiter ___ (take) about twelve years to orbit the Sun.', ['takes'], 'Jupiter met environ douze ans à faire le tour du Soleil.', 'Fait scientifique permanent : Present Simple.'),
  c('We ___ (currently / implement) a new protocol.', ['are currently implementing'], 'Nous mettons actuellement en place un nouveau protocole.', 'currently : action en cours.'),
  c('I ___ (not / recognise) this logo.', [["don't recognise", 'do not recognise', "don't recognize", 'do not recognize']], 'Je ne reconnais pas ce logo.', "recognise (ou recognize) est un verbe d'état : Present Simple.")
];
const m1aEx2 = [
  tx(FIX, 'She is not liking the new software.', ["She doesn't like the new software.", 'She does not like the new software.'], "Elle n'aime pas le nouveau logiciel.", "like est un verbe d'état : jamais au continu."),
  tx(FIX, 'He works in Lyon at the moment.', ['He is working in Lyon at the moment.', "He's working in Lyon at the moment."], 'Il travaille à Lyon en ce moment.', 'at the moment indique une situation temporaire : Present Continuous.'),
  tx(FIX, 'They are holding a meeting every Monday.', ['They hold a meeting every Monday.'], 'Ils tiennent une réunion tous les lundis.', 'every Monday : habitude, Present Simple.'),
  tx(FIX, 'They are owning three flats in Lille.', ['They own three flats in Lille.'], 'Ils possèdent trois appartements à Lille.', "own est un verbe d'état : pas de continu."),
  okc(FIX, 'The population is growing rapidly.', 'La population augmente rapidement.', 'Changement en cours : le Present Continuous est correct.')
];

const m1b = [
  ch('I ___ the new schedule is unrealistic.', ['think', 'am thinking'], 0, 'Je pense que le nouvel emploi du temps est irréaliste.', "Opinion : think est un verbe d'état."),
  ch('He ___ about moving to Grenoble next year. (réflexion en cours)', ['thinks', 'is thinking'], 1, "Il réfléchit à déménager à Grenoble l'année prochaine.", 'Réfléchir : verbe d\'action, le continu est possible.'),
  ch('These grapes ___ too sweet.', ['taste', 'are tasting'], 0, 'Ces raisins ont un goût trop sucré.', "taste au sens « avoir un goût » : verbe d'état."),
  ch('At the moment, the inspector ___ a sample of each batch.', ['tastes', 'is tasting'], 1, "En ce moment, l'inspecteur goûte un échantillon de chaque lot.", 'Goûter volontairement, at the moment : Present Continuous.'),
  ch('My brother ___ two daughters.', ['has', 'is having'], 0, 'Mon frère a deux filles.', "have au sens de posséder : verbe d'état."),
  ch('Sorry, she cannot answer the phone: she ___ lunch.', ['has', 'is having'], 1, 'Désolé, elle ne peut pas répondre au téléphone : elle déjeune.', "have lunch (déjeuner) est une action : Present Continuous."),
  ch('The report ___ three appendices.', ['contains', 'is containing'], 0, 'Le rapport contient trois annexes.', "contain est un verbe d'état."),
  ch('Sales figures ___ faster than predicted this quarter.', ['rise', 'are rising'], 1, 'Les chiffres de vente augmentent plus vite que prévu ce trimestre.', 'this quarter : évolution en cours.')
];

const m1cEx1 = [
  c('The company ___ (grow) rapidly this year.', ['is growing'], "L'entreprise connaît une croissance rapide cette année.", 'this year : changement en cours, Present Continuous.'),
  c('We ___ (currently / test) the new sensor.', ['are currently testing'], 'Nous testons actuellement le nouveau capteur.', 'currently : situation temporaire.'),
  c('He ___ (stay) with his cousin while his flat is being renovated.', ['is staying'], 'Il loge chez son cousin pendant la rénovation de son appartement.', 'Situation temporaire : Present Continuous.'),
  c('The results ___ (improve) week after week.', ['are improving'], "Les résultats s'améliorent de semaine en semaine.", 'Changement progressif : Present Continuous.'),
  c('I ___ (work) from home this month.', ['am working'], 'Je travaille depuis chez moi ce mois-ci.', 'this month : situation temporaire.'),
  c('The situation ___ (get) more complicated day by day.', ['is getting'], 'La situation devient plus compliquée de jour en jour.', 'get + comparatif exprime un changement en cours.'),
  c('More and more students ___ (choose) this specialisation.', ['are choosing'], 'De plus en plus d\'étudiants choisissent cette spécialisation.', 'more and more : tendance en cours.'),
  c('The exchange rate ___ (change) constantly at the moment.', ['is changing'], 'Le taux de change change constamment en ce moment.', 'at the moment : situation en cours.')
];
const m1cEx2 = [
  tx(FIX, "I stay at my sister's this week.", ["I'm staying at my sister's this week.", "I am staying at my sister's this week."], "Je loge chez ma sœur cette semaine.", 'this week : situation temporaire, Present Continuous.'),
  okc(FIX, 'The market is shrinking fast this year.', 'Le marché se contracte rapidement cette année.', 'Changement en cours : le Present Continuous est correct.'),
  tx(FIX, 'He works from the Lyon office this month.', ["He's working from the Lyon office this month.", 'He is working from the Lyon office this month.'], 'Il travaille depuis le bureau de Lyon ce mois-ci.', 'this month : situation temporaire, Present Continuous.'),
  okc(FIX, 'Our costs are rising at the moment.', 'Nos coûts augmentent en ce moment.', 'at the moment et un changement : le Present Continuous est correct.'),
  tx(FIX, 'She learns Japanese at the moment.', ["She's learning Japanese at the moment.", 'She is learning Japanese at the moment.'], 'Elle apprend le japonais en ce moment.', 'at the moment : situation en cours, Present Continuous.')
];

const m1dEx1 = [
  c('This plant ___ (manufacture) car batteries.', ['manufactures'], 'Cette usine fabrique des batteries de voiture.', 'Activité permanente : Present Simple.'),
  c('Right now, the engineers ___ (test) the new prototype.', ['are testing'], 'En ce moment, les ingénieurs testent le nouveau prototype.', 'right now : action en cours.'),
  c('She usually ___ (start) work at 8 AM, but this week she ___ (start) at 10 because of the training.', ['starts', 'is starting'],
    "Elle commence habituellement à 8 heures, mais cette semaine elle commence à 10 heures à cause de la formation.", 'usually : habitude. this week : exception temporaire.'),
  c('Lead ___ (melt) at 327°C.', ['melts'], 'Le plomb fond à 327 °C.', 'Fait scientifique : Present Simple.'),
  c('Look! The machine ___ (leak) again.', ['is leaking'], 'Regarde ! La machine fuit encore.', 'Look! annonce une action en cours.'),
  c('He ___ (not / usually / travel) for work, but he ___ (attend) a conference in Berlin this week.', ["doesn't usually travel", 'is attending'],
    "Il ne voyage généralement pas pour le travail, mais il assiste à une conférence à Berlin cette semaine.", 'usually : habitude (Simple). this week : exception (Continuous).'),
  c("The university ___ (offer) a wide range of master's programmes.", ['offers'], "L'université propose un large choix de masters.", 'Description permanente : Present Simple.'),
  c('My contract ___ (end) in December.', ['ends'], 'Mon contrat se termine en décembre.', 'Date fixée par un contrat, comme un horaire : Present Simple.')
];
const m1dEx2 = [
  tx("Pose la question au bon temps. Contexte : son métier habituel. Mots : what / he / do", 'what / he / do', ['What does he do?', 'What does he do for a living?'], "Que fait-il dans la vie ?", 'Métier habituel : Present Simple, What + does + sujet + base verbale.'),
  tx("Pose la question au bon temps. Contexte : en ce moment, au laboratoire. Mots : what / she / do", 'what / she / do', ['What is she doing?', 'What is she doing right now?', 'What is she doing at the moment?'], "Que fait-elle en ce moment ?", 'Action en cours : Present Continuous.'),
  tx("Pose la question au bon temps. Contexte : fait général. Mots : where / this river / flow", 'where / this river / flow', ['Where does this river flow?', 'Where does this river flow to?'], "Où coule ce fleuve ?", 'Fait général : Present Simple, Where + does + sujet + base verbale.'),
  tx("Pose la question au bon temps. Contexte : projet actuel. Mots : what / they / work on / this semester", 'what / they / work on / this semester', ['What are they working on this semester?'], "Sur quoi travaillent-ils ce semestre ?", 'this semester : projet en cours, Present Continuous.')
];

const th = [
  tr('Mon frère travaille dans une banque.', ['My brother works in a bank.'], 'Situation permanente : Present Simple, avec -s.'),
  tr('Chut ! Les élèves passent un examen.', ['Be quiet! The students are taking an exam.', 'Shh! The students are taking an exam.'], 'Action en cours : Present Continuous. « passer un examen » se dit take an exam.'),
  tr("Le soleil se lève à l'est.", ['The sun rises in the east.'], 'Vérité générale : Present Simple. On dit in the east.'),
  tr('Je ne connais pas cet ingénieur.', ["I don't know this engineer.", 'I do not know this engineer.'], "know est un verbe d'état : Present Simple."),
  tr('Ces jours-ci, nous testons un nouveau logiciel.', ['We are testing a new software package these days.', 'We are testing new software these days.'], 'these days : période en cours, Present Continuous. software est indénombrable : pas de « a software ».'),
  tr('Le prix du pétrole baisse en ce moment.', ['The price of oil is falling at the moment.', 'The price of oil is dropping at the moment.'], 'Changement en cours : Present Continuous.'),
  tr('Cette semaine, elle loge chez des amis.', ['This week she is staying with friends.', 'This week, she is staying with friends.'], 'Situation temporaire : Present Continuous. stay with = loger chez.'),
  tr('Il pense que ce projet est trop cher.', ['He thinks this project is too expensive.', 'He thinks that this project is too expensive.'], "Opinion : think est un verbe d'état, donc Present Simple.")
];

export const G01 = {
  id: 'G01',
  title: 'Present Simple et Present Continuous',
  coursUrl: 'https://peip2-hub.vercel.app/cours/G01_cours.html',
  sets: [
    { id: 'g01-guidee-a', group: 'Fiche', title: 'Série guidée A', level: 'A2', desc: 'Repérer les marqueurs de temps. Chaque phrase propose un indice.', items: serieA },
    { id: 'g01-guidee-b', group: 'Fiche', title: 'Série guidée B : verbes d\'état et nuances', level: 'B1', desc: 'Certains verbes changent de comportement selon leur sens.', items: serieB },
    { id: 'g01-niv-a', group: 'Fiche', title: 'Niveau A : révision fondamentale', level: 'A2', desc: 'Present Simple ou Present Continuous ?', items: nivA },
    { id: 'g01-niv-b', group: 'Fiche', title: 'Niveau B : contexte professionnel', level: 'B1', desc: 'Les mêmes choix dans des phrases d\'ingénieur.', items: nivB },
    { id: 'g01-niv-c', group: 'Fiche', title: 'Niveau C : corrections et thème', level: 'B1+', desc: 'Corriger cinq phrases fautives, puis traduire cinq phrases.', items: nivC },
    { id: 'g01-niv-d', group: 'Fiche', title: 'Niveau D : complexité', level: 'B2+', desc: 'Dialogues, transformations et reformulations.', items: nivD },
    { id: 'g01-bonus', group: 'Fiche', title: 'Bonus : pour aller plus loin', level: 'B2+', desc: 'Cas particuliers et mini-rédaction. Les réponses sont à écrire, puis à comparer avec le modèle.', items: bonus },
    { id: 'g01-devoir', group: 'Fiche', title: 'Devoir maison', level: 'B1', desc: 'Quinze phrases à conjuguer.', items: devoir },
    { id: 'g01-m1a-1', group: 'Supplément Murphy', title: 'Unité 1A : Present Simple (1/2)', level: 'B1', desc: 'Present Simple ou Present Continuous ?', items: m1aEx1 },
    { id: 'g01-m1a-2', group: 'Supplément Murphy', title: 'Unité 1A : corriger les phrases (2/2)', level: 'B1', desc: 'Corrige les phrases fautives ou écris Correct.', items: m1aEx2 },
    { id: 'g01-m1b', group: 'Supplément Murphy', title: 'Unité 1B : verbes d\'état et nuances', level: 'B1+', desc: 'Choisis la forme correcte.', items: m1b },
    { id: 'g01-m1c-1', group: 'Supplément Murphy', title: 'Unité 1C : changement en cours (1/2)', level: 'B1+', desc: 'Present Continuous : changements et situations temporaires.', items: m1cEx1 },
    { id: 'g01-m1c-2', group: 'Supplément Murphy', title: 'Unité 1C : corriger les phrases (2/2)', level: 'B1+', desc: 'Corrige les phrases fautives ou écris Correct.', items: m1cEx2 },
    { id: 'g01-m1d-1', group: 'Supplément Murphy', title: 'Unité 1D : Simple ou Continuous (1/2)', level: 'B2', desc: 'Contextes professionnels.', items: m1dEx1 },
    { id: 'g01-m1d-2', group: 'Supplément Murphy', title: 'Unité 1D : poser des questions (2/2)', level: 'B2', desc: 'Écris la question complète au bon temps.', items: m1dEx2 },
    { id: 'g01-th', group: 'Supplément Murphy', title: 'Unité TH : thème grammatical', level: 'B1+', desc: 'Traduis en anglais, puis compare avec le modèle.', items: th }
  ],
  recap: {
    simple: {
      title: 'Present Simple',
      forms: [
        ['Affirmatif', "I / you / we / they work. He / she / it works."],
        ['Négatif', "I don't work. He doesn't work (pas de -s sur le verbe)."],
        ['Question', 'Do you work? Does he work? (do ou does + base verbale)']
      ],
      uses: ['Habitude, routine : She works every day.', 'Vérité générale : Water boils at 100°C.', 'Horaire fixe : The train leaves at 8 AM.'],
      marks: 'always, usually, often, sometimes, never, every day, on Mondays, rarely'
    },
    cont: {
      title: 'Present Continuous',
      forms: [
        ['Affirmatif', 'I am working. He is working. We are working.'],
        ['Négatif', "I'm not working. He isn't working. They aren't working."],
        ['Question', 'Are you working? Is he working? (inversion de be et du sujet)']
      ],
      uses: ['Action en cours : Listen! The phone is ringing.', "Situation temporaire : I'm living with my parents this month.", "Futur arrangé : We are meeting tomorrow at 9.", 'Changement progressif : The climate is getting warmer.'],
      marks: 'now, right now, at the moment, currently, today, this week, Look!, Listen!'
    },
    stative: [
      ['Sentiment', 'love, like, hate, prefer, want, wish, need'],
      ['Perception', 'see, hear, smell, taste, feel, seem, appear'],
      ['Pensée', 'think (opinion), believe, know, understand, forget, remember, mean'],
      ['Possession', 'have (posséder), own, belong, contain']
    ],
    trap: "Piège : certains verbes sont d'état ou d'action selon le sens. I think it is good (opinion) mais I'm thinking about it (je réfléchis). He has a car (possession) mais He is having lunch (action).",
    rule: 'Simple = permanent ou habituel. Continuous = temporaire ou en cours. Demande-toi : est-ce que cela change ?'
  }
};
