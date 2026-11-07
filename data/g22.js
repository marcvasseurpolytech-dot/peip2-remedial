// G22 : Poser des questions sur les mots soulignés (WH questions)
// Contenu repris des 10 fiches du hub (100 phrases) ; les questions attendues sont réécrites et vérifiées.
// Chaque phrase propose un groupe de mots souligné : l'élève écrit la question dont c'est la réponse.
import { E, tx, set } from './dsl.js';

const INSTR = 'Pose la question portant sur le groupe de mots souligné.';
const INSTR_EN = 'Ask the question about the underlined words.';
// wq(phrase, segment souligné, questions acceptées, traduction FR, explication FR, indice FR, E(explication EN, indice EN))
const wq = (s, u, a, fr, why, hint, en) => ({ ...tx(INSTR, s, a, fr, why, { ...en, instr: INSTR_EN }), u, hint });

const f1 = [
  wq("The AI model processes new data every hour.", "every hour", ["How often does the AI model process new data?"], "À quelle fréquence le modèle d'IA traite-t-il de nouvelles données ?", "La fréquence se demande avec How often. Present Simple : do/does + sujet + base verbale.", "Temps de la phrase : Present Simple.", E("Frequency is asked with How often. Present Simple: do/does + subject + base verb.", "Tense of the sentence: Present Simple.")),
  wq("The engineers are training a new neural network this week.", "a new neural network", ["What are the engineers training this week?"], "Qu'est-ce que les ingénieurs entraînent cette semaine ?", "Une chose (complément d'objet) se demande avec What. Present Continuous : am/is/are + sujet + verbe en -ing.", "Temps de la phrase : Present Continuous.", E("A thing (the object) is asked with What. Present Continuous: am/is/are + subject + -ing verb.", "Tense of the sentence: Present Continuous.")),
  wq("The startup has hired twelve data scientists this year.", "twelve data scientists", ["How many data scientists has the startup hired this year?"], "Combien de data scientists la start-up a-t-elle embauchés cette année ?", "How many + nom pluriel dénombrable : le nom suit directement How many. Present Perfect Simple : have/has + sujet + participe passé.", "Temps de la phrase : Present Perfect Simple.", E("How many + plural countable noun: the noun comes straight after How many. Present Perfect Simple: have/has + subject + past participle.", "Tense of the sentence: Present Perfect Simple.")),
  wq("The company released its first chatbot in 2021.", "in 2021", ["When did the company release its first chatbot?", "In which year did the company release its first chatbot?", "In what year did the company release its first chatbot?", "What year did the company release its first chatbot?"], "Quand l'entreprise a-t-elle lancé son premier chatbot ?", "Une année se demande avec When (ou In which year). Past Simple : did + sujet + base verbale.", "Temps de la phrase : Past Simple.", E("A year is asked with When (or In which year). Past Simple: did + subject + base verb.", "Tense of the sentence: Past Simple.")),
  wq("Two researchers were reviewing the algorithm when they found the bug.", "Two researchers", ["Who was reviewing the algorithm when they found the bug?", "Who were reviewing the algorithm when they found the bug?"], "Qui examinait l'algorithme quand ils ont trouvé le bug ?", "Le groupe souligné est le sujet (des personnes) : Who prend la place du sujet. Pas d'auxiliaire do/does/did en plus : le verbe garde sa forme, au même temps que dans la phrase. Who prend normalement un verbe au singulier (was) ; were est aussi accepté ici puisque la réponse est pluriel.", "Temps de la phrase : Past Continuous.", E("The underlined words are the subject (people): Who takes the place of the subject. No extra do/does/did: the verb keeps its form, in the same tense as in the sentence. Who normally takes a singular verb (was); were is also accepted here because the answer is plural.", "Tense of the sentence: Past Continuous.")),
  wq("The team will present their findings in Geneva.", "in Geneva", ["Where will the team present their findings?"], "Où l'équipe présentera-t-elle ses résultats ?", "Un lieu se demande avec Where. Futur : will + sujet + base verbale.", "Temps de la phrase : Future Simple.", E("A place is asked with Where. Future: will + subject + base verb.", "Tense of the sentence: Future Simple.")),
  wq("The company is going to launch a new AI assistant.", "a new AI assistant", ["What is the company going to launch?"], "Qu'est-ce que l'entreprise va lancer ?", "Une chose (complément d'objet) se demande avec What. Be going to : am/is/are + sujet + going to + base verbale.", "Temps de la phrase : Be going to.", E("A thing (the object) is asked with What. Be going to: am/is/are + subject + going to + base verb.", "Tense of the sentence: Be going to.")),
  wq("She has been coding this application for three months.", "for three months", ["How long has she been coding this application?", "For how long has she been coding this application?"], "Depuis combien de temps code-t-elle cette application ?", "Une durée se demande avec How long. Present Perfect Continuous : have/has + sujet + been + verbe en -ing.", "Temps de la phrase : Present Perfect Continuous.", E("A duration is asked with How long. Present Perfect Continuous: have/has + subject + been + -ing verb.", "Tense of the sentence: Present Perfect Continuous.")),
  wq("By the time the update was released, the bug had already affected thousands of users.", "the bug", ["What had already affected thousands of users by the time the update was released?", "By the time the update was released, what had already affected thousands of users?"], "Qu'est-ce qui avait déjà touché des milliers d'utilisateurs quand la mise à jour a été publiée ?", "Le groupe souligné est le sujet (une chose) : What prend la place du sujet. Pas d'auxiliaire do/does/did en plus : le verbe garde sa forme, au même temps que dans la phrase.", "Temps de la phrase : Past Perfect Simple.", E("The underlined words are the subject (a thing): What takes the place of the subject. No extra do/does/did: the verb keeps its form, in the same tense as in the sentence.", "Tense of the sentence: Past Perfect Simple.")),
  wq("By 2030, the lab will have trained over a hundred AI models.", "over a hundred AI models", ["How many AI models will the lab have trained by 2030?", "By 2030, how many AI models will the lab have trained?"], "Combien de modèles d'IA le laboratoire aura-t-il entraînés d'ici 2030 ?", "How many + nom pluriel dénombrable : le nom suit directement How many. Future Perfect : will + sujet + have + participe passé.", "Temps de la phrase : Future Perfect.", E("How many + plural countable noun: the noun comes straight after How many. Future Perfect: will + subject + have + past participle.", "Tense of the sentence: Future Perfect."))
];

const f2 = [
  wq("Engineers prefer solar panels because they reduce carbon emissions.", "because they reduce carbon emissions", ["Why do engineers prefer solar panels?"], "Pourquoi les ingénieurs préfèrent-ils les panneaux solaires ?", "La cause (because...) se demande avec Why. Present Simple : do/does + sujet + base verbale.", "Temps de la phrase : Present Simple.", E("A reason (because...) is asked with Why. Present Simple: do/does + subject + base verb.", "Tense of the sentence: Present Simple.")),
  wq("New wind turbines are transforming the region's energy supply.", "New wind turbines", ["What is transforming the region's energy supply?"], "Qu'est-ce qui transforme l'approvisionnement énergétique de la région ?", "Le groupe souligné est le sujet (une chose) : What prend la place du sujet. Pas d'auxiliaire do/does/did en plus : le verbe garde sa forme, au même temps que dans la phrase. Avec What sujet, on utilise le verbe au singulier (is), même si la réponse est pluriel.", "Temps de la phrase : Present Continuous.", E("The underlined words are the subject (a thing): What takes the place of the subject. No extra do/does/did: the verb keeps its form, in the same tense as in the sentence. With What as the subject, use a singular verb (is), even if the answer is plural.", "Tense of the sentence: Present Continuous.")),
  wq("The plant has reduced its emissions by thirty per cent.", "by thirty per cent", ["By how much has the plant reduced its emissions?", "By what percentage has the plant reduced its emissions?", "How much has the plant reduced its emissions by?"], "De combien l'usine a-t-elle réduit ses émissions ?", "by + écart ou différence : By how much? (By how long? pour une durée de retard) Present Perfect Simple : have/has + sujet + participe passé.", "Temps de la phrase : Present Perfect Simple.", E("by + difference: By how much? / By how long? Present Perfect Simple: have/has + subject + past participle.", "Tense of the sentence: Present Perfect Simple.")),
  wq("The engineers travelled two hundred kilometres to inspect the wind farm.", "two hundred kilometres", ["How far did the engineers travel to inspect the wind farm?", "How many kilometres did the engineers travel to inspect the wind farm?", "How many kilometers did the engineers travel to inspect the wind farm?"], "Quelle distance les ingénieurs ont-ils parcourue pour inspecter le parc éolien ?", "Une distance se demande avec How far. Past Simple : did + sujet + base verbale.", "Temps de la phrase : Past Simple.", E("A distance is asked with How far. Past Simple: did + subject + base verb.", "Tense of the sentence: Past Simple.")),
  wq("The team was monitoring emission levels at 6 AM yesterday.", "at 6 AM yesterday", ["When was the team monitoring emission levels?"], "Quand l'équipe surveillait-elle les niveaux d'émission ?", "Un moment se demande avec When. Past Continuous : was/were + sujet + verbe en -ing.", "Temps de la phrase : Past Continuous.", E("A point in time is asked with When. Past Continuous: was/were + subject + -ing verb.", "Tense of the sentence: Past Continuous.")),
  wq("The new regulations will affect every manufacturer in the country.", "The new regulations", ["What will affect every manufacturer in the country?"], "Qu'est-ce qui touchera tous les fabricants du pays ?", "Le groupe souligné est le sujet (une chose) : What prend la place du sujet. Pas d'auxiliaire do/does/did en plus : le verbe garde sa forme, au même temps que dans la phrase.", "Temps de la phrase : Future Simple.", E("The underlined words are the subject (a thing): What takes the place of the subject. No extra do/does/did: the verb keeps its form, in the same tense as in the sentence.", "Tense of the sentence: Future Simple.")),
  wq("The city is going to choose a new supplier for green electricity.", "a new supplier for green electricity", ["What is the city going to choose?"], "Qu'est-ce que la ville va choisir ?", "Une chose (complément d'objet) se demande avec What. Be going to : am/is/are + sujet + going to + base verbale.", "Temps de la phrase : Be going to.", E("A thing (the object) is asked with What. Be going to: am/is/are + subject + going to + base verb.", "Tense of the sentence: Be going to.")),
  wq("The committee had already rejected two proposals before approving this one.", "two proposals", ["How many proposals had the committee already rejected before approving this one?"], "Combien de propositions le comité avait-il déjà rejetées avant d'approuver celle-ci ?", "How many + nom pluriel dénombrable : le nom suit directement How many. Past Perfect Simple : had + sujet + participe passé.", "Temps de la phrase : Past Perfect Simple.", E("How many + plural countable noun: the noun comes straight after How many. Past Perfect Simple: had + subject + past participle.", "Tense of the sentence: Past Perfect Simple.")),
  wq("Scientists have been measuring sea levels since 1990.", "since 1990", ["Since when have scientists been measuring sea levels?"], "Depuis quand les scientifiques mesurent-ils le niveau des mers ?", "Since when interroge sur le point de départ introduit par since. Present Perfect Continuous : have/has + sujet + been + verbe en -ing.", "Temps de la phrase : Present Perfect Continuous.", E("Since when asks about the starting point introduced by since. Present Perfect Continuous: have/has + subject + been + -ing verb.", "Tense of the sentence: Present Perfect Continuous.")),
  wq("If the price of batteries keeps falling, electric heating will become standard.", "electric heating", ["What will become standard if the price of batteries keeps falling?", "If the price of batteries keeps falling, what will become standard?"], "Qu'est-ce qui deviendra la norme si le prix des batteries continue de baisser ?", "Le groupe souligné est le sujet (une chose) : What prend la place du sujet. Pas d'auxiliaire do/does/did en plus : le verbe garde sa forme, au même temps que dans la phrase.", "Temps de la phrase : First conditional.", E("The underlined words are the subject (a thing): What takes the place of the subject. No extra do/does/did: the verb keeps its form, in the same tense as in the sentence.", "Tense of the sentence: First conditional."))
];

const f3 = [
  wq("The agency launches a new satellite roughly twice a year.", "twice a year", ["How often does the agency launch a new satellite?", "How many times a year does the agency launch a new satellite?"], "À quelle fréquence l'agence lance-t-elle un nouveau satellite ?", "La fréquence se demande avec How often. Present Simple : do/does + sujet + base verbale.", "Temps de la phrase : Present Simple.", E("Frequency is asked with How often. Present Simple: do/does + subject + base verb.", "Tense of the sentence: Present Simple.")),
  wq("The probe is currently approaching the outer edge of the solar system.", "the outer edge of the solar system", ["What is the probe currently approaching?"], "De quoi la sonde s'approche-t-elle actuellement ?", "Une chose (complément d'objet) se demande avec What. Present Continuous : am/is/are + sujet + verbe en -ing.", "Temps de la phrase : Present Continuous.", E("A thing (the object) is asked with What. Present Continuous: am/is/are + subject + -ing verb.", "Tense of the sentence: Present Continuous.")),
  wq("The mission has cost the agency almost two billion euros.", "almost two billion euros", ["How much has the mission cost the agency?", "How much money has the mission cost the agency?"], "Combien la mission a-t-elle coûté à l'agence ?", "How much interroge sur une quantité non dénombrable ou un montant. Present Perfect Simple : have/has + sujet + participe passé.", "Temps de la phrase : Present Perfect Simple.", E("How much asks about an uncountable quantity or an amount. Present Perfect Simple: have/has + subject + past participle.", "Tense of the sentence: Present Perfect Simple.")),
  wq("The rover discovered traces of frozen water beneath the surface.", "traces of frozen water", ["What did the rover discover beneath the surface?"], "Qu'est-ce que le rover a découvert sous la surface ?", "Une chose (complément d'objet) se demande avec What. Past Simple : did + sujet + base verbale.", "Temps de la phrase : Past Simple.", E("A thing (the object) is asked with What. Past Simple: did + subject + base verb.", "Tense of the sentence: Past Simple.")),
  wq("The crew were repairing the solar panel when the alarm went off.", "when the alarm went off", ["When were the crew repairing the solar panel?", "When was the crew repairing the solar panel?"], "Quand l'équipage réparait-il le panneau solaire ?", "Un moment se demande avec When. Past Continuous : was/were + sujet + verbe en -ing.", "Temps de la phrase : Past Continuous.", E("A point in time is asked with When. Past Continuous: was/were + subject + -ing verb.", "Tense of the sentence: Past Continuous.")),
  wq("The next spacecraft will carry four astronauts to the station.", "four astronauts", ["How many astronauts will the next spacecraft carry to the station?"], "Combien d'astronautes le prochain vaisseau transportera-t-il jusqu'à la station ?", "How many + nom pluriel dénombrable : le nom suit directement How many. Futur : will + sujet + base verbale.", "Temps de la phrase : Future Simple.", E("How many + plural countable noun: the noun comes straight after How many. Future: will + subject + base verb.", "Tense of the sentence: Future Simple.")),
  wq("The agency is going to send a robotic lander to the moon's south pole.", "the moon's south pole", ["Where is the agency going to send a robotic lander?", "Where is the agency going to send a robotic lander to?"], "Où l'agence va-t-elle envoyer un atterrisseur robotisé ?", "Un lieu se demande avec Where. Be going to : am/is/are + sujet + going to + base verbale.", "Temps de la phrase : Be going to.", E("A place is asked with Where. Be going to: am/is/are + subject + going to + base verb.", "Tense of the sentence: Be going to.")),
  wq("The engineers will have finished testing the new engine by next spring.", "by next spring", ["By when will the engineers have finished testing the new engine?", "When will the engineers have finished testing the new engine?"], "Pour quand les ingénieurs auront-ils fini de tester le nouveau moteur ?", "by + moment (date limite) : By when? ou simplement When? Future Perfect : will + sujet + have + participe passé.", "Temps de la phrase : Future Perfect.", E("by + time (a deadline): By when?, or simply When? Future Perfect: will + subject + have + past participle.", "Tense of the sentence: Future Perfect.")),
  wq("The satellite had already left orbit before the ground team noticed the fault.", "The satellite", ["What had already left orbit before the ground team noticed the fault?"], "Qu'est-ce qui avait déjà quitté son orbite avant que l'équipe au sol ne remarque la panne ?", "Le groupe souligné est le sujet (une chose) : What prend la place du sujet. Pas d'auxiliaire do/does/did en plus : le verbe garde sa forme, au même temps que dans la phrase.", "Temps de la phrase : Past Perfect Simple.", E("The underlined words are the subject (a thing): What takes the place of the subject. No extra do/does/did: the verb keeps its form, in the same tense as in the sentence.", "Tense of the sentence: Past Perfect Simple.")),
  wq("If the launch window closes, the mission will be delayed by a month.", "by a month", ["By how long will the mission be delayed if the launch window closes?", "By how much will the mission be delayed if the launch window closes?", "How long will the mission be delayed if the launch window closes?", "If the launch window closes, by how long will the mission be delayed?", "If the launch window closes, by how much will the mission be delayed?", "If the launch window closes, how long will the mission be delayed?"], "De combien la mission sera-t-elle retardée si la fenêtre de lancement se referme ?", "by + écart ou différence : By how much? (By how long? pour une durée de retard) Première conditionnelle : will + base verbale, et la proposition en if reste au présent.", "Temps de la phrase : First conditional.", E("by + difference: By how much? / By how long? First conditional: will + base verb, and the if clause stays in the present.", "Tense of the sentence: First conditional."))
];

const f4 = [
  wq("The laboratory tests new compounds several times a week.", "several times a week", ["How often does the laboratory test new compounds?", "How many times a week does the laboratory test new compounds?"], "À quelle fréquence le laboratoire teste-t-il de nouveaux composés ?", "La fréquence se demande avec How often. Present Simple : do/does + sujet + base verbale.", "Temps de la phrase : Present Simple.", E("Frequency is asked with How often. Present Simple: do/does + subject + base verb.", "Tense of the sentence: Present Simple.")),
  wq("The team is currently trialling the vaccine on volunteers.", "on volunteers", ["Who is the team currently trialling the vaccine on?", "On whom is the team currently trialling the vaccine?", "Who is the team currently trialing the vaccine on?", "On whom is the team currently trialing the vaccine?"], "Sur qui l'équipe teste-t-elle actuellement le vaccin ?", "Un groupe de personnes introduit par une préposition : Who + ... + préposition à la fin (ou préposition + whom). Present Continuous : am/is/are + sujet + verbe en -ing.", "Temps de la phrase : Present Continuous.", E("A person after a preposition: Who + ... + preposition at the end (or preposition + whom). Present Continuous: am/is/are + subject + -ing verb.", "Tense of the sentence: Present Continuous.")),
  wq("Researchers have identified a gene linked to the disease.", "a gene linked to the disease", ["What have researchers identified?"], "Qu'est-ce que les chercheurs ont identifié ?", "Une chose (complément d'objet) se demande avec What. Present Perfect Simple : have/has + sujet + participe passé.", "Temps de la phrase : Present Perfect Simple.", E("A thing (the object) is asked with What. Present Perfect Simple: have/has + subject + past participle.", "Tense of the sentence: Present Perfect Simple.")),
  wq("The hospital treated more than three thousand patients last winter.", "more than three thousand patients", ["How many patients did the hospital treat last winter?"], "Combien de patients l'hôpital a-t-il soignés l'hiver dernier ?", "How many + nom pluriel dénombrable : le nom suit directement How many. Past Simple : did + sujet + base verbale.", "Temps de la phrase : Past Simple.", E("How many + plural countable noun: the noun comes straight after How many. Past Simple: did + subject + base verb.", "Tense of the sentence: Past Simple.")),
  wq("She was analysing the samples when she noticed the contamination.", "when she noticed the contamination", ["When was she analysing the samples?", "When was she analyzing the samples?"], "Quand analysait-elle les échantillons ?", "Un moment se demande avec When. Past Continuous : was/were + sujet + verbe en -ing.", "Temps de la phrase : Past Continuous.", E("A point in time is asked with When. Past Continuous: was/were + subject + -ing verb.", "Tense of the sentence: Past Continuous.")),
  wq("The clinic will open a new research wing next autumn.", "next autumn", ["When will the clinic open a new research wing?"], "Quand la clinique ouvrira-t-elle une nouvelle aile de recherche ?", "Un moment se demande avec When. Futur : will + sujet + base verbale.", "Temps de la phrase : Future Simple.", E("A point in time is asked with When. Future: will + subject + base verb.", "Tense of the sentence: Future Simple.")),
  wq("The institute is going to recruit fifty volunteers for the trial.", "fifty volunteers", ["How many volunteers is the institute going to recruit for the trial?"], "Combien de volontaires l'institut va-t-il recruter pour l'essai ?", "How many + nom pluriel dénombrable : le nom suit directement How many. Be going to : am/is/are + sujet + going to + base verbale.", "Temps de la phrase : Be going to.", E("How many + plural countable noun: the noun comes straight after How many. Be going to: am/is/are + subject + going to + base verb.", "Tense of the sentence: Be going to.")),
  wq("They have been developing this treatment since 2018.", "since 2018", ["Since when have they been developing this treatment?"], "Depuis quand développent-ils ce traitement ?", "Since when interroge sur le point de départ introduit par since. Present Perfect Continuous : have/has + sujet + been + verbe en -ing.", "Temps de la phrase : Present Perfect Continuous.", E("Since when asks about the starting point introduced by since. Present Perfect Continuous: have/has + subject + been + -ing verb.", "Tense of the sentence: Present Perfect Continuous.")),
  wq("By the time the results came in, the patient had already recovered.", "the patient", ["Who had already recovered by the time the results came in?", "By the time the results came in, who had already recovered?"], "Qui s'était déjà rétabli quand les résultats sont arrivés ?", "Le groupe souligné est le sujet (des personnes) : Who prend la place du sujet. Pas d'auxiliaire do/does/did en plus : le verbe garde sa forme, au même temps que dans la phrase.", "Temps de la phrase : Past Perfect Simple.", E("The underlined words are the subject (people): Who takes the place of the subject. No extra do/does/did: the verb keeps its form, in the same tense as in the sentence.", "Tense of the sentence: Past Perfect Simple.")),
  wq("If researchers had found the mutation earlier, the clinical trial would have started in spring.", "in spring", ["When would the clinical trial have started if researchers had found the mutation earlier?", "If researchers had found the mutation earlier, when would the clinical trial have started?"], "Quand l'essai clinique aurait-il commencé si les chercheurs avaient trouvé la mutation plus tôt ?", "Un moment se demande avec When. Troisième conditionnelle : would + have + participe passé, et la proposition en if reste au past perfect.", "Temps de la phrase : Third conditional.", E("A point in time is asked with When. Third conditional: would + have + past participle, and the if clause stays in the past perfect.", "Tense of the sentence: Third conditional."))
];

const f5 = [
  wq("The system scans the network for threats every few minutes.", "every few minutes", ["How often does the system scan the network for threats?"], "À quelle fréquence le système analyse-t-il le réseau à la recherche de menaces ?", "La fréquence se demande avec How often. Present Simple : do/does + sujet + base verbale.", "Temps de la phrase : Present Simple.", E("Frequency is asked with How often. Present Simple: do/does + subject + base verb.", "Tense of the sentence: Present Simple.")),
  wq("The security team is currently investigating a data breach.", "a data breach", ["What is the security team currently investigating?"], "Qu'est-ce que l'équipe de sécurité est en train d'examiner ?", "Une chose (complément d'objet) se demande avec What. Present Continuous : am/is/are + sujet + verbe en -ing.", "Temps de la phrase : Present Continuous.", E("A thing (the object) is asked with What. Present Continuous: am/is/are + subject + -ing verb.", "Tense of the sentence: Present Continuous.")),
  wq("The company has suffered three cyberattacks this year.", "three cyberattacks", ["How many cyberattacks has the company suffered this year?"], "Combien de cyberattaques l'entreprise a-t-elle subies cette année ?", "How many + nom pluriel dénombrable : le nom suit directement How many. Present Perfect Simple : have/has + sujet + participe passé.", "Temps de la phrase : Present Perfect Simple.", E("How many + plural countable noun: the noun comes straight after How many. Present Perfect Simple: have/has + subject + past participle.", "Tense of the sentence: Present Perfect Simple.")),
  wq("A hacker accessed the database through an outdated plugin.", "through an outdated plugin", ["How did a hacker access the database?", "How did the hacker access the database?"], "Comment un pirate a-t-il accédé à la base de données ?", "Le moyen ou la manière se demande avec How. Past Simple : did + sujet + base verbale.", "Temps de la phrase : Past Simple.", E("A means or a manner is asked with How. Past Simple: did + subject + base verb.", "Tense of the sentence: Past Simple.")),
  wq("The analysts were tracing the attack when the server went offline.", "when the server went offline", ["When were the analysts tracing the attack?"], "Quand les analystes retraçaient-ils l'attaque ?", "Un moment se demande avec When. Past Continuous : was/were + sujet + verbe en -ing.", "Temps de la phrase : Past Continuous.", E("A point in time is asked with When. Past Continuous: was/were + subject + -ing verb.", "Tense of the sentence: Past Continuous.")),
  wq("The firm will update its firewall next week.", "next week", ["When will the firm update its firewall?"], "Quand l'entreprise mettra-t-elle à jour son pare-feu ?", "Un moment se demande avec When. Futur : will + sujet + base verbale.", "Temps de la phrase : Future Simple.", E("A point in time is asked with When. Future: will + subject + base verb.", "Tense of the sentence: Future Simple.")),
  wq("The bank is going to introduce two-factor authentication for all accounts.", "two-factor authentication", ["What is the bank going to introduce for all accounts?"], "Qu'est-ce que la banque va introduire pour tous les comptes ?", "Une chose (complément d'objet) se demande avec What. Be going to : am/is/are + sujet + going to + base verbale.", "Temps de la phrase : Be going to.", E("A thing (the object) is asked with What. Be going to: am/is/are + subject + going to + base verb.", "Tense of the sentence: Be going to.")),
  wq("The team will have patched every vulnerability by Friday.", "by Friday", ["By when will the team have patched every vulnerability?", "When will the team have patched every vulnerability?"], "Pour quand l'équipe aura-t-elle corrigé toutes les vulnérabilités ?", "by + moment (date limite) : By when? ou simplement When? Future Perfect : will + sujet + have + participe passé.", "Temps de la phrase : Future Perfect.", E("by + time (a deadline): By when?, or simply When? Future Perfect: will + subject + have + past participle.", "Tense of the sentence: Future Perfect.")),
  wq("The attackers had already stolen the data before anyone noticed.", "The attackers", ["Who had already stolen the data before anyone noticed?"], "Qui avait déjà volé les données avant que quiconque s'en aperçoive ?", "Le groupe souligné est le sujet (des personnes) : Who prend la place du sujet. Pas d'auxiliaire do/does/did en plus : le verbe garde sa forme, au même temps que dans la phrase.", "Temps de la phrase : Past Perfect Simple.", E("The underlined words are the subject (people): Who takes the place of the subject. No extra do/does/did: the verb keeps its form, in the same tense as in the sentence.", "Tense of the sentence: Past Perfect Simple.")),
  wq("If the company doesn't train its staff, breaches will keep happening.", "breaches", ["What will keep happening if the company doesn't train its staff?", "If the company doesn't train its staff, what will keep happening?"], "Qu'est-ce qui continuera à se produire si l'entreprise ne forme pas son personnel ?", "Le groupe souligné est le sujet (une chose) : What prend la place du sujet. Pas d'auxiliaire do/does/did en plus : le verbe garde sa forme, au même temps que dans la phrase.", "Temps de la phrase : First conditional.", E("The underlined words are the subject (a thing): What takes the place of the subject. No extra do/does/did: the verb keeps its form, in the same tense as in the sentence.", "Tense of the sentence: First conditional."))
];

const f6 = [
  wq("The factory uses robots for most of its assembly lines.", "for most of its assembly lines", ["What does the factory use robots for?", "For what does the factory use robots?", "Which of its assembly lines does the factory use robots for?", "For which of its assembly lines does the factory use robots?"], "Pour quoi l'usine utilise-t-elle des robots ?", "Une chose après une préposition : la préposition reste à la fin de la question (ou passe devant What). Present Simple : do/does + sujet + base verbale.", "Temps de la phrase : Present Simple.", E("A thing after a preposition: the preposition stays at the end of the question (or moves before What). Present Simple: do/does + subject + base verb.", "Tense of the sentence: Present Simple.")),
  wq("The engineers are currently calibrating the robotic arm.", "the robotic arm", ["What are the engineers currently calibrating?"], "Qu'est-ce que les ingénieurs sont en train d'étalonner ?", "Une chose (complément d'objet) se demande avec What. Present Continuous : am/is/are + sujet + verbe en -ing.", "Temps de la phrase : Present Continuous.", E("A thing (the object) is asked with What. Present Continuous: am/is/are + subject + -ing verb.", "Tense of the sentence: Present Continuous.")),
  wq("The plant has automated nearly sixty per cent of its production.", "nearly sixty per cent", ["How much of its production has the plant automated?", "What percentage of its production has the plant automated?", "What proportion of its production has the plant automated?"], "Quelle part de sa production l'usine a-t-elle automatisée ?", "How much interroge sur une quantité non dénombrable ou un montant. Present Perfect Simple : have/has + sujet + participe passé.", "Temps de la phrase : Present Perfect Simple.", E("How much asks about an uncountable quantity or an amount. Present Perfect Simple: have/has + subject + past participle.", "Tense of the sentence: Present Perfect Simple.")),
  wq("The team built the first prototype in only six weeks.", "in only six weeks", ["How long did it take the team to build the first prototype?", "How long did the team take to build the first prototype?", "In how many weeks did the team build the first prototype?"], "Combien de temps l'équipe a-t-elle mis pour construire le premier prototype ?", "Une durée se demande avec How long. Past Simple : did + sujet + base verbale.", "Temps de la phrase : Past Simple.", E("A duration is asked with How long. Past Simple: did + subject + base verb.", "Tense of the sentence: Past Simple.")),
  wq("A technician was adjusting the sensor when it suddenly stopped working.", "A technician", ["Who was adjusting the sensor when it suddenly stopped working?"], "Qui réglait le capteur quand il s'est soudain arrêté de fonctionner ?", "Le groupe souligné est le sujet (des personnes) : Who prend la place du sujet. Pas d'auxiliaire do/does/did en plus : le verbe garde sa forme, au même temps que dans la phrase.", "Temps de la phrase : Past Continuous.", E("The underlined words are the subject (people): Who takes the place of the subject. No extra do/does/did: the verb keeps its form, in the same tense as in the sentence.", "Tense of the sentence: Past Continuous.")),
  wq("The new robots will replace some of the manual tasks.", "some of the manual tasks", ["What will the new robots replace?", "Which of the manual tasks will the new robots replace?"], "Qu'est-ce que les nouveaux robots remplaceront ?", "Une chose (complément d'objet) se demande avec What. Futur : will + sujet + base verbale.", "Temps de la phrase : Future Simple.", E("A thing (the object) is asked with What. Future: will + subject + base verb.", "Tense of the sentence: Future Simple.")),
  wq("The company is going to double its robotic workforce next year.", "next year", ["When is the company going to double its robotic workforce?"], "Quand l'entreprise va-t-elle doubler sa main-d'œuvre robotique ?", "Un moment se demande avec When. Be going to : am/is/are + sujet + going to + base verbale.", "Temps de la phrase : Be going to.", E("A point in time is asked with When. Be going to: am/is/are + subject + going to + base verb.", "Tense of the sentence: Be going to.")),
  wq("The engineers have been improving the robot's balance since January.", "since January", ["Since when have the engineers been improving the robot's balance?"], "Depuis quand les ingénieurs améliorent-ils l'équilibre du robot ?", "Since when interroge sur le point de départ introduit par since. Present Perfect Continuous : have/has + sujet + been + verbe en -ing.", "Temps de la phrase : Present Perfect Continuous.", E("Since when asks about the starting point introduced by since. Present Perfect Continuous: have/has + subject + been + -ing verb.", "Tense of the sentence: Present Perfect Continuous.")),
  wq("By the time the inspector arrived, the robot had already completed the task.", "the robot", ["What had already completed the task by the time the inspector arrived?", "By the time the inspector arrived, what had already completed the task?"], "Qu'est-ce qui avait déjà terminé la tâche quand l'inspecteur est arrivé ?", "Le groupe souligné est le sujet (une chose) : What prend la place du sujet. Pas d'auxiliaire do/does/did en plus : le verbe garde sa forme, au même temps que dans la phrase.", "Temps de la phrase : Past Perfect Simple.", E("The underlined words are the subject (a thing): What takes the place of the subject. No extra do/does/did: the verb keeps its form, in the same tense as in the sentence.", "Tense of the sentence: Past Perfect Simple.")),
  wq("If the sensors had been more accurate, the robot wouldn't have collided with the shelf.", "the shelf", ["What wouldn't the robot have collided with if the sensors had been more accurate?", "If the sensors had been more accurate, what wouldn't the robot have collided with?", "What would the robot not have collided with if the sensors had been more accurate?", "If the sensors had been more accurate, what would the robot not have collided with?"], "Avec quoi le robot ne serait-il pas entré en collision si les capteurs avaient été plus précis ?", "Une chose (complément d'objet) se demande avec What. Troisième conditionnelle : would + have + participe passé, et la proposition en if reste au past perfect. La préposition with reste à la fin de la question.", "Temps de la phrase : Third conditional.", E("A thing (the object) is asked with What. Third conditional: would + have + past participle, and the if clause stays in the past perfect. The preposition with stays at the end of the question.", "Tense of the sentence: Third conditional."))
];

const f7 = [
  wq("Many engineers now work from home twice a week.", "twice a week", ["How often do many engineers now work from home?", "How many times a week do many engineers now work from home?"], "À quelle fréquence beaucoup d'ingénieurs travaillent-ils désormais depuis chez eux ?", "La fréquence se demande avec How often. Present Simple : do/does + sujet + base verbale.", "Temps de la phrase : Present Simple.", E("Frequency is asked with How often. Present Simple: do/does + subject + base verb.", "Tense of the sentence: Present Simple.")),
  wq("Her team is currently trialling a four-day week.", "a four-day week", ["What is her team currently trialling?", "What is her team currently trialing?"], "Qu'est-ce que son équipe est en train de tester ?", "Une chose (complément d'objet) se demande avec What. Present Continuous : am/is/are + sujet + verbe en -ing.", "Temps de la phrase : Present Continuous.", E("A thing (the object) is asked with What. Present Continuous: am/is/are + subject + -ing verb.", "Tense of the sentence: Present Continuous.")),
  wq("The company has hired remote employees from twelve different countries.", "twelve different countries", ["How many different countries has the company hired remote employees from?", "From how many different countries has the company hired remote employees?"], "Dans combien de pays différents l'entreprise a-t-elle recruté des employés à distance ?", "How many + nom pluriel dénombrable : le nom suit directement How many. Present Perfect Simple : have/has + sujet + participe passé.", "Temps de la phrase : Present Perfect Simple.", E("How many + plural countable noun: the noun comes straight after How many. Present Perfect Simple: have/has + subject + past participle.", "Tense of the sentence: Present Perfect Simple.")),
  wq("She moved to Lisbon because her company allowed remote work.", "because her company allowed remote work", ["Why did she move to Lisbon?"], "Pourquoi a-t-elle déménagé à Lisbonne ?", "La cause (because...) se demande avec Why. Past Simple : did + sujet + base verbale.", "Temps de la phrase : Past Simple.", E("A reason (because...) is asked with Why. Past Simple: did + subject + base verb.", "Tense of the sentence: Past Simple.")),
  wq("He was attending a video call when the connection failed.", "when the connection failed", ["When was he attending a video call?"], "Quand participait-il à un appel vidéo ?", "Un moment se demande avec When. Past Continuous : was/were + sujet + verbe en -ing.", "Temps de la phrase : Past Continuous.", E("A point in time is asked with When. Past Continuous: was/were + subject + -ing verb.", "Tense of the sentence: Past Continuous.")),
  wq("The firm will introduce flexible hours next quarter.", "next quarter", ["When will the firm introduce flexible hours?"], "Quand l'entreprise introduira-t-elle des horaires flexibles ?", "Un moment se demande avec When. Futur : will + sujet + base verbale.", "Temps de la phrase : Future Simple.", E("A point in time is asked with When. Future: will + subject + base verb.", "Tense of the sentence: Future Simple.")),
  wq("The manager is going to reorganise the whole team.", "the whole team", ["What is the manager going to reorganise?", "What is the manager going to reorganize?"], "Qu'est-ce que le responsable va réorganiser ?", "Une chose (complément d'objet) se demande avec What. Be going to : am/is/are + sujet + going to + base verbale.", "Temps de la phrase : Be going to.", E("A thing (the object) is asked with What. Be going to: am/is/are + subject + going to + base verb.", "Tense of the sentence: Be going to.")),
  wq("She will have finished her onboarding by the end of the week.", "by the end of the week", ["By when will she have finished her onboarding?", "When will she have finished her onboarding?"], "Pour quand aura-t-elle terminé son intégration ?", "by + moment (date limite) : By when? ou simplement When? Future Perfect : will + sujet + have + participe passé.", "Temps de la phrase : Future Perfect.", E("by + time (a deadline): By when?, or simply When? Future Perfect: will + subject + have + past participle.", "Tense of the sentence: Future Perfect.")),
  wq("He had already changed jobs three times before turning thirty.", "three times", ["How many times had he already changed jobs before turning thirty?"], "Combien de fois avait-il déjà changé d'emploi avant ses trente ans ?", "How many times interroge sur le nombre de fois. Past Perfect Simple : had + sujet + participe passé.", "Temps de la phrase : Past Perfect Simple.", E("How many times asks about the number of occasions. Past Perfect Simple: had + subject + past participle.", "Tense of the sentence: Past Perfect Simple.")),
  wq("If the company paid better salaries, more engineers would stay.", "more engineers", ["Who would stay if the company paid better salaries?", "If the company paid better salaries, who would stay?"], "Qui resterait si l'entreprise payait de meilleurs salaires ?", "Le groupe souligné est le sujet (des personnes) : Who prend la place du sujet. Pas d'auxiliaire do/does/did en plus : le verbe garde sa forme, au même temps que dans la phrase.", "Temps de la phrase : Second conditional.", E("The underlined words are the subject (people): Who takes the place of the subject. No extra do/does/did: the verb keeps its form, in the same tense as in the sentence.", "Tense of the sentence: Second conditional."))
];

const f8 = [
  wq("The city charges electric buses overnight at the depot.", "at the depot", ["Where does the city charge electric buses overnight?"], "Où la ville recharge-t-elle les bus électriques la nuit ?", "Un lieu se demande avec Where. Present Simple : do/does + sujet + base verbale.", "Temps de la phrase : Present Simple.", E("A place is asked with Where. Present Simple: do/does + subject + base verb.", "Tense of the sentence: Present Simple.")),
  wq("The manufacturer is currently testing a new battery design.", "a new battery design", ["What is the manufacturer currently testing?"], "Qu'est-ce que le constructeur est en train de tester ?", "Une chose (complément d'objet) se demande avec What. Present Continuous : am/is/are + sujet + verbe en -ing.", "Temps de la phrase : Present Continuous.", E("A thing (the object) is asked with What. Present Continuous: am/is/are + subject + -ing verb.", "Tense of the sentence: Present Continuous.")),
  wq("Sales of electric vehicles have doubled in the last two years.", "in the last two years", ["Over what period have sales of electric vehicles doubled?", "In what period have sales of electric vehicles doubled?", "During what period have sales of electric vehicles doubled?", "Over how many years have sales of electric vehicles doubled?", "In how many years have sales of electric vehicles doubled?"], "Sur quelle période les ventes de véhicules électriques ont-elles doublé ?", "Present Perfect Simple : have/has + sujet + participe passé. When ne s'emploie pas avec le present perfect pour interroger sur une période : on demande plutôt Over what period / In how many years.", "Temps de la phrase : Present Perfect Simple.", E("Present Perfect Simple: have/has + subject + past participle. When is not used with the present perfect to ask about a period: ask Over what period / In how many years instead.", "Tense of the sentence: Present Perfect Simple.")),
  wq("The company opened its first charging station in Lille.", "in Lille", ["Where did the company open its first charging station?"], "Où l'entreprise a-t-elle ouvert sa première borne de recharge ?", "Un lieu se demande avec Where. Past Simple : did + sujet + base verbale.", "Temps de la phrase : Past Simple.", E("A place is asked with Where. Past Simple: did + subject + base verb.", "Tense of the sentence: Past Simple.")),
  wq("The engineers were road-testing the prototype when it broke down.", "when it broke down", ["When were the engineers road-testing the prototype?"], "Quand les ingénieurs testaient-ils le prototype sur route ?", "Un moment se demande avec When. Past Continuous : was/were + sujet + verbe en -ing.", "Temps de la phrase : Past Continuous.", E("A point in time is asked with When. Past Continuous: was/were + subject + -ing verb.", "Tense of the sentence: Past Continuous.")),
  wq("The new model will travel four hundred kilometres on a single charge.", "four hundred kilometres", ["How far will the new model travel on a single charge?", "How many kilometres will the new model travel on a single charge?", "How many kilometers will the new model travel on a single charge?"], "Quelle distance le nouveau modèle parcourra-t-il avec une seule charge ?", "Une distance se demande avec How far. Futur : will + sujet + base verbale.", "Temps de la phrase : Future Simple.", E("A distance is asked with How far. Future: will + subject + base verb.", "Tense of the sentence: Future Simple.")),
  wq("The government is going to ban new petrol cars from 2035.", "from 2035", ["From when is the government going to ban new petrol cars?", "When is the government going to ban new petrol cars?"], "À partir de quand le gouvernement va-t-il interdire les voitures neuves à essence ?", "Un moment se demande avec When. Be going to : am/is/are + sujet + going to + base verbale.", "Temps de la phrase : Be going to.", E("A point in time is asked with When. Be going to: am/is/are + subject + going to + base verb.", "Tense of the sentence: Be going to.")),
  wq("They have been developing this battery technology for almost a decade.", "for almost a decade", ["How long have they been developing this battery technology?", "For how long have they been developing this battery technology?"], "Depuis combien de temps développent-ils cette technologie de batterie ?", "Une durée se demande avec How long. Present Perfect Continuous : have/has + sujet + been + verbe en -ing.", "Temps de la phrase : Present Perfect Continuous.", E("A duration is asked with How long. Present Perfect Continuous: have/has + subject + been + -ing verb.", "Tense of the sentence: Present Perfect Continuous.")),
  wq("By the time the subsidy ended, the factory had already sold ten thousand cars.", "ten thousand cars", ["How many cars had the factory already sold by the time the subsidy ended?", "By the time the subsidy ended, how many cars had the factory already sold?"], "Combien de voitures l'usine avait-elle déjà vendues quand la subvention a pris fin ?", "How many + nom pluriel dénombrable : le nom suit directement How many. Past Perfect Simple : had + sujet + participe passé.", "Temps de la phrase : Past Perfect Simple.", E("How many + plural countable noun: the noun comes straight after How many. Past Perfect Simple: had + subject + past participle.", "Tense of the sentence: Past Perfect Simple.")),
  wq("If the battery had been lighter, the car would have gone further.", "further", ["How far would the car have gone if the battery had been lighter?", "If the battery had been lighter, how far would the car have gone?"], "Jusqu'où la voiture serait-elle allée si la batterie avait été plus légère ?", "Une distance se demande avec How far. Troisième conditionnelle : would + have + participe passé, et la proposition en if reste au past perfect.", "Temps de la phrase : Third conditional.", E("A distance is asked with How far. Third conditional: would + have + past participle, and the if clause stays in the past perfect.", "Tense of the sentence: Third conditional."))
];

const f9 = [
  wq("The lab runs quantum experiments almost every day.", "almost every day", ["How often does the lab run quantum experiments?"], "À quelle fréquence le laboratoire mène-t-il des expériences quantiques ?", "La fréquence se demande avec How often. Present Simple : do/does + sujet + base verbale.", "Temps de la phrase : Present Simple.", E("Frequency is asked with How often. Present Simple: do/does + subject + base verb.", "Tense of the sentence: Present Simple.")),
  wq("The team is currently building a more stable qubit.", "a more stable qubit", ["What is the team currently building?"], "Qu'est-ce que l'équipe construit actuellement ?", "Une chose (complément d'objet) se demande avec What. Present Continuous : am/is/are + sujet + verbe en -ing.", "Temps de la phrase : Present Continuous.", E("A thing (the object) is asked with What. Present Continuous: am/is/are + subject + -ing verb.", "Tense of the sentence: Present Continuous.")),
  wq("The university has published several papers on quantum encryption.", "several papers on quantum encryption", ["What has the university published?"], "Qu'est-ce que l'université a publié ?", "Une chose (complément d'objet) se demande avec What. Present Perfect Simple : have/has + sujet + participe passé.", "Temps de la phrase : Present Perfect Simple.", E("A thing (the object) is asked with What. Present Perfect Simple: have/has + subject + past participle.", "Tense of the sentence: Present Perfect Simple.")),
  wq("The researchers achieved a major breakthrough last spring.", "last spring", ["When did the researchers achieve a major breakthrough?"], "Quand les chercheurs ont-ils réalisé une percée majeure ?", "Un moment se demande avec When. Past Simple : did + sujet + base verbale.", "Temps de la phrase : Past Simple.", E("A point in time is asked with When. Past Simple: did + subject + base verb.", "Tense of the sentence: Past Simple.")),
  wq("She was presenting her research when a journalist interrupted.", "when a journalist interrupted", ["When was she presenting her research?"], "Quand présentait-elle ses recherches ?", "Un moment se demande avec When. Past Continuous : was/were + sujet + verbe en -ing.", "Temps de la phrase : Past Continuous.", E("A point in time is asked with When. Past Continuous: was/were + subject + -ing verb.", "Tense of the sentence: Past Continuous.")),
  wq("This technology will transform the entire computing industry.", "the entire computing industry", ["What will this technology transform?"], "Qu'est-ce que cette technologie va transformer ?", "Une chose (complément d'objet) se demande avec What. Futur : will + sujet + base verbale.", "Temps de la phrase : Future Simple.", E("A thing (the object) is asked with What. Future: will + subject + base verb.", "Tense of the sentence: Future Simple.")),
  wq("The startup is going to raise funds for its quantum chip.", "for its quantum chip", ["What is the startup going to raise funds for?", "For what is the startup going to raise funds?"], "Pour quoi la start-up va-t-elle lever des fonds ?", "Une chose après une préposition : la préposition reste à la fin de la question (ou passe devant What). Be going to : am/is/are + sujet + going to + base verbale.", "Temps de la phrase : Be going to.", E("A thing after a preposition: the preposition stays at the end of the question (or moves before What). Be going to: am/is/are + subject + going to + base verb.", "Tense of the sentence: Be going to.")),
  wq("By 2035, engineers will have built far more powerful quantum computers.", "far more powerful quantum computers", ["What will engineers have built by 2035?", "By 2035, what will engineers have built?"], "Qu'est-ce que les ingénieurs auront construit d'ici 2035 ?", "Une chose (complément d'objet) se demande avec What. Future Perfect : will + sujet + have + participe passé.", "Temps de la phrase : Future Perfect.", E("A thing (the object) is asked with What. Future Perfect: will + subject + have + past participle.", "Tense of the sentence: Future Perfect.")),
  wq("The prototype had already failed twice before the team fixed the cooling system.", "twice", ["How many times had the prototype already failed before the team fixed the cooling system?"], "Combien de fois le prototype avait-il déjà échoué avant que l'équipe ne répare le système de refroidissement ?", "How many times interroge sur le nombre de fois. Past Perfect Simple : had + sujet + participe passé.", "Temps de la phrase : Past Perfect Simple.", E("How many times asks about the number of occasions. Past Perfect Simple: had + subject + past participle.", "Tense of the sentence: Past Perfect Simple.")),
  wq("If the funding hadn't been approved, the project would have been cancelled.", "the project", ["What would have been cancelled if the funding hadn't been approved?", "If the funding hadn't been approved, what would have been cancelled?"], "Qu'est-ce qui aurait été annulé si le financement n'avait pas été approuvé ?", "Le groupe souligné est le sujet (une chose) : What prend la place du sujet. Pas d'auxiliaire do/does/did en plus : le verbe garde sa forme, au même temps que dans la phrase.", "Temps de la phrase : Third conditional.", E("The underlined words are the subject (a thing): What takes the place of the subject. No extra do/does/did: the verb keeps its form, in the same tense as in the sentence.", "Tense of the sentence: Third conditional."))
];

const f10 = [
  wq("The city monitors air quality in real time.", "in real time", ["How does the city monitor air quality?"], "Comment la ville surveille-t-elle la qualité de l'air ?", "Le moyen ou la manière se demande avec How. Present Simple : do/does + sujet + base verbale.", "Temps de la phrase : Present Simple.", E("A means or a manner is asked with How. Present Simple: do/does + subject + base verb.", "Tense of the sentence: Present Simple.")),
  wq("Engineers are currently redesigning the water treatment plant.", "the water treatment plant", ["What are engineers currently redesigning?"], "Qu'est-ce que les ingénieurs sont en train de repenser ?", "Une chose (complément d'objet) se demande avec What. Present Continuous : am/is/are + sujet + verbe en -ing.", "Temps de la phrase : Present Continuous.", E("A thing (the object) is asked with What. Present Continuous: am/is/are + subject + -ing verb.", "Tense of the sentence: Present Continuous.")),
  wq("The council has planted over five thousand trees this decade.", "over five thousand trees", ["How many trees has the council planted this decade?"], "Combien d'arbres la municipalité a-t-elle plantés cette décennie ?", "How many + nom pluriel dénombrable : le nom suit directement How many. Present Perfect Simple : have/has + sujet + participe passé.", "Temps de la phrase : Present Perfect Simple.", E("How many + plural countable noun: the noun comes straight after How many. Present Perfect Simple: have/has + subject + past participle.", "Tense of the sentence: Present Perfect Simple.")),
  wq("The city built its first smart grid in 2017.", "in 2017", ["When did the city build its first smart grid?", "In which year did the city build its first smart grid?", "In what year did the city build its first smart grid?", "What year did the city build its first smart grid?"], "Quand la ville a-t-elle construit son premier réseau intelligent ?", "Une année se demande avec When (ou In which year). Past Simple : did + sujet + base verbale.", "Temps de la phrase : Past Simple.", E("A year is asked with When (or In which year). Past Simple: did + subject + base verb.", "Tense of the sentence: Past Simple.")),
  wq("The team was installing new sensors when the storm hit.", "when the storm hit", ["When was the team installing new sensors?"], "Quand l'équipe installait-elle de nouveaux capteurs ?", "Un moment se demande avec When. Past Continuous : was/were + sujet + verbe en -ing.", "Temps de la phrase : Past Continuous.", E("A point in time is asked with When. Past Continuous: was/were + subject + -ing verb.", "Tense of the sentence: Past Continuous.")),
  wq("The new district will reduce energy consumption by forty per cent.", "by forty per cent", ["By how much will the new district reduce energy consumption?", "By what percentage will the new district reduce energy consumption?", "How much will the new district reduce energy consumption by?"], "De combien le nouveau quartier réduira-t-il la consommation d'énergie ?", "by + écart ou différence : By how much? (By how long? pour une durée de retard) Futur : will + sujet + base verbale.", "Temps de la phrase : Future Simple.", E("by + difference: By how much? / By how long? Future: will + subject + base verb.", "Tense of the sentence: Future Simple.")),
  wq("The municipality is going to convert the old factory into a research hub.", "a research hub", ["What is the municipality going to convert the old factory into?", "Into what is the municipality going to convert the old factory?"], "En quoi la municipalité va-t-elle transformer l'ancienne usine ?", "Une chose après une préposition : la préposition reste à la fin de la question (ou passe devant What). Be going to : am/is/are + sujet + going to + base verbale.", "Temps de la phrase : Be going to.", E("A thing after a preposition: the preposition stays at the end of the question (or moves before What). Be going to: am/is/are + subject + going to + base verb.", "Tense of the sentence: Be going to.")),
  wq("Residents have been recycling almost all their waste since the new policy.", "almost all their waste", ["What have residents been recycling since the new policy?", "How much of their waste have residents been recycling since the new policy?"], "Qu'est-ce que les habitants recyclent depuis la nouvelle politique ?", "Une chose (complément d'objet) se demande avec What. Present Perfect Continuous : have/has + sujet + been + verbe en -ing.", "Temps de la phrase : Present Perfect Continuous.", E("A thing (the object) is asked with What. Present Perfect Continuous: have/has + subject + been + -ing verb.", "Tense of the sentence: Present Perfect Continuous.")),
  wq("By the time the report was published, the city had already reduced its emissions.", "its emissions", ["What had the city already reduced by the time the report was published?", "By the time the report was published, what had the city already reduced?"], "Qu'est-ce que la ville avait déjà réduit quand le rapport a été publié ?", "Une chose (complément d'objet) se demande avec What. Past Perfect Simple : had + sujet + participe passé.", "Temps de la phrase : Past Perfect Simple.", E("A thing (the object) is asked with What. Past Perfect Simple: had + subject + past participle.", "Tense of the sentence: Past Perfect Simple.")),
  wq("If the city invested more in public transport, traffic would decrease significantly.", "traffic", ["What would decrease significantly if the city invested more in public transport?", "If the city invested more in public transport, what would decrease significantly?"], "Qu'est-ce qui diminuerait nettement si la ville investissait davantage dans les transports publics ?", "Le groupe souligné est le sujet (une chose) : What prend la place du sujet. Pas d'auxiliaire do/does/did en plus : le verbe garde sa forme, au même temps que dans la phrase.", "Temps de la phrase : Second conditional.", E("The underlined words are the subject (a thing): What takes the place of the subject. No extra do/does/did: the verb keeps its form, in the same tense as in the sentence.", "Tense of the sentence: Second conditional."))
];

export const G22 = {
  id: 'G22',
  title: 'Poser des questions sur les mots soulignés (WH questions)',
  coursUrl: 'https://peip2-hub.vercel.app/wh-questions/WH_cours.html',
  sets: [
    set('g22-f01', 'Fiche', "Fiche 1 : Intelligence artificielle et données", 'B1+', 'Pose la question portant sur le groupe de mots souligné.', f1,
      { group: 'Worksheet', title: "Worksheet 1: Artificial intelligence and data", desc: 'Ask the question about the underlined words.' }),
    set('g22-f02', 'Fiche', "Fiche 2 : Énergie renouvelable et climat", 'B1+', 'Pose la question portant sur le groupe de mots souligné.', f2,
      { group: 'Worksheet', title: "Worksheet 2: Renewable energy and climate", desc: 'Ask the question about the underlined words.' }),
    set('g22-f03', 'Fiche', "Fiche 3 : Exploration spatiale", 'B1+', 'Pose la question portant sur le groupe de mots souligné.', f3,
      { group: 'Worksheet', title: "Worksheet 3: Space exploration", desc: 'Ask the question about the underlined words.' }),
    set('g22-f04', 'Fiche', "Fiche 4 : Biotechnologie et santé", 'B1+', 'Pose la question portant sur le groupe de mots souligné.', f4,
      { group: 'Worksheet', title: "Worksheet 4: Biotechnology and health", desc: 'Ask the question about the underlined words.' }),
    set('g22-f05', 'Fiche', "Fiche 5 : Cybersécurité et réseaux", 'B1+', 'Pose la question portant sur le groupe de mots souligné.', f5,
      { group: 'Worksheet', title: "Worksheet 5: Cybersecurity and networks", desc: 'Ask the question about the underlined words.' }),
    set('g22-f06', 'Fiche', "Fiche 6 : Robotique et automatisation", 'B1+', 'Pose la question portant sur le groupe de mots souligné.', f6,
      { group: 'Worksheet', title: "Worksheet 6: Robotics and automation", desc: 'Ask the question about the underlined words.' }),
    set('g22-f07', 'Fiche', "Fiche 7 : Télétravail et carrières modernes", 'B1+', 'Pose la question portant sur le groupe de mots souligné.', f7,
      { group: 'Worksheet', title: "Worksheet 7: Remote work and modern careers", desc: 'Ask the question about the underlined words.' }),
    set('g22-f08', 'Fiche', "Fiche 8 : Véhicules électriques et transport", 'B1+', 'Pose la question portant sur le groupe de mots souligné.', f8,
      { group: 'Worksheet', title: "Worksheet 8: Electric vehicles and transport", desc: 'Ask the question about the underlined words.' }),
    set('g22-f09', 'Fiche', "Fiche 9 : Informatique quantique et innovation", 'B1+', 'Pose la question portant sur le groupe de mots souligné.', f9,
      { group: 'Worksheet', title: "Worksheet 9: Quantum computing and innovation", desc: 'Ask the question about the underlined words.' }),
    set('g22-f10', 'Fiche', "Fiche 10 : Ingénierie durable et villes intelligentes", 'B1+', 'Pose la question portant sur le groupe de mots souligné.', f10,
      { group: 'Worksheet', title: "Worksheet 10: Sustainable engineering and smart cities", desc: 'Ask the question about the underlined words.' })
  ],
  recap: {
    "blocks": [
      {
        "title": "La méthode en 4 étapes",
        "forms": [
          [
            "1",
            "Repère le groupe souligné et choisis le mot interrogatif qui convient (Who, What, When, Where, Why, How...)."
          ],
          [
            "2",
            "Mets le mot interrogatif en tête, puis l'auxiliaire qui correspond au temps de la phrase."
          ],
          [
            "3",
            "Ajoute le sujet, puis le verbe, sans recopier le groupe souligné."
          ],
          [
            "4",
            "Si le groupe souligné est le sujet, Who ou What le remplace : pas d'auxiliaire en plus."
          ]
        ]
      },
      {
        "title": "Choisir le mot interrogatif",
        "forms": [
          [
            "Who",
            "une personne : Who was adjusting the sensor?"
          ],
          [
            "What",
            "une chose : What are the engineers training?"
          ],
          [
            "When",
            "un moment : When will the firm update its firewall?"
          ],
          [
            "Where",
            "un lieu : Where did the company open its first station?"
          ],
          [
            "Why",
            "une cause (because...) : Why do engineers prefer solar panels?"
          ],
          [
            "How",
            "un moyen, une manière : How did a hacker access the database?"
          ],
          [
            "How often",
            "une fréquence : How often does the system scan the network?"
          ],
          [
            "How long / Since when",
            "une durée / un point de départ : How long has she been coding? Since when have they been developing it?"
          ],
          [
            "How many + nom pluriel",
            "un nombre : How many patients did the hospital treat?"
          ],
          [
            "How much",
            "une quantité non dénombrable ou un montant : How much has the mission cost?"
          ],
          [
            "How far",
            "une distance : How far will the model travel?"
          ],
          [
            "By how much / By when",
            "un écart / une date limite : By how much has the plant reduced its emissions?"
          ]
        ]
      },
      {
        "title": "Question sur le complément ou sur le sujet",
        "forms": [
          [
            "Complément",
            "WH + auxiliaire + sujet + verbe : What is the city going to choose?"
          ],
          [
            "Sujet",
            "WH + verbe conjugué : What will affect every manufacturer? (ni do, ni did)"
          ]
        ]
      }
    ],
    "tables": [
      {
        "title": "L'auxiliaire selon le temps (question sur le complément)",
        "rows": [
          [
            "Present Simple",
            "do / does + sujet + base verbale"
          ],
          [
            "Past Simple",
            "did + sujet + base verbale"
          ],
          [
            "Present Continuous",
            "am / is / are + sujet + verbe en -ing"
          ],
          [
            "Past Continuous",
            "was / were + sujet + verbe en -ing"
          ],
          [
            "Present Perfect",
            "have / has + sujet + participe passé"
          ],
          [
            "Present Perfect Continuous",
            "have / has + sujet + been + verbe en -ing"
          ],
          [
            "Past Perfect",
            "had + sujet + participe passé"
          ],
          [
            "Futur (will)",
            "will + sujet + base verbale"
          ],
          [
            "Be going to",
            "am / is / are + sujet + going to + base verbale"
          ],
          [
            "Future Perfect",
            "will + sujet + have + participe passé"
          ],
          [
            "Conditionnelles",
            "would / will + sujet + ... : la proposition en if ne change pas"
          ]
        ]
      }
    ],
    "notes": [
      "Piège : après do, does ou did, le verbe reste à la base verbale (Did she finish? et non Did she finished?).",
      "La préposition reste en fin de question : Who is the team trialling the vaccine on? La forme soutenue est On whom is the team trialling the vaccine?",
      "When ne s'emploie pas avec le present perfect : pour une période, demande Over what period ou In how many years."
    ],
    "rule": "Mot interrogatif + auxiliaire + sujet + verbe. Quand le mot interrogatif est le sujet, il n'y a pas d'auxiliaire en plus."
  },
  enMeta: {
    title: 'Asking questions about underlined words (WH questions)',
    recap: {
      "blocks": [
        {
          "title": "The method in 4 steps",
          "forms": [
            [
              "1",
              "Spot the underlined words and pick the question word that fits (Who, What, When, Where, Why, How...)."
            ],
            [
              "2",
              "Put the question word first, then the auxiliary that matches the tense of the sentence."
            ],
            [
              "3",
              "Add the subject, then the verb, without copying the underlined words."
            ],
            [
              "4",
              "If the underlined words are the subject, Who or What replaces it: no extra auxiliary."
            ]
          ]
        },
        {
          "title": "Choosing the question word",
          "forms": [
            [
              "Who",
              "a person: Who was adjusting the sensor?"
            ],
            [
              "What",
              "a thing: What are the engineers training?"
            ],
            [
              "When",
              "a point in time: When will the firm update its firewall?"
            ],
            [
              "Where",
              "a place: Where did the company open its first station?"
            ],
            [
              "Why",
              "a reason (because...): Why do engineers prefer solar panels?"
            ],
            [
              "How",
              "a means, a manner: How did a hacker access the database?"
            ],
            [
              "How often",
              "a frequency: How often does the system scan the network?"
            ],
            [
              "How long / Since when",
              "a duration / a starting point: How long has she been coding? Since when have they been developing it?"
            ],
            [
              "How many + plural noun",
              "a number: How many patients did the hospital treat?"
            ],
            [
              "How much",
              "an uncountable quantity or an amount: How much has the mission cost?"
            ],
            [
              "How far",
              "a distance: How far will the model travel?"
            ],
            [
              "By how much / By when",
              "a difference / a deadline: By how much has the plant reduced its emissions?"
            ]
          ]
        },
        {
          "title": "Question about the object or about the subject",
          "forms": [
            [
              "Object",
              "WH + auxiliary + subject + verb: What is the city going to choose?"
            ],
            [
              "Subject",
              "WH + conjugated verb: What will affect every manufacturer? (no do, no did)"
            ]
          ]
        }
      ],
      "tables": [
        {
          "title": "The auxiliary by tense (question about the object)",
          "rows": [
            [
              "Present Simple",
              "do / does + subject + base verb"
            ],
            [
              "Past Simple",
              "did + subject + base verb"
            ],
            [
              "Present Continuous",
              "am / is / are + subject + -ing verb"
            ],
            [
              "Past Continuous",
              "was / were + subject + -ing verb"
            ],
            [
              "Present Perfect",
              "have / has + subject + past participle"
            ],
            [
              "Present Perfect Continuous",
              "have / has + subject + been + -ing verb"
            ],
            [
              "Past Perfect",
              "had + subject + past participle"
            ],
            [
              "Future (will)",
              "will + subject + base verb"
            ],
            [
              "Be going to",
              "am / is / are + subject + going to + base verb"
            ],
            [
              "Future Perfect",
              "will + subject + have + past participle"
            ],
            [
              "Conditionals",
              "would / will + subject + ...: the if clause does not change"
            ]
          ]
        }
      ],
      "notes": [
        "Trap: after do, does or did, the verb stays in the base form (Did she finish? not Did she finished?).",
        "The preposition stays at the end of the question: Who is the team trialling the vaccine on? The formal version is On whom is the team trialling the vaccine?",
        "When is not used with the present perfect: for a period, ask Over what period or In how many years."
      ],
      "rule": "Question word + auxiliary + subject + verb. When the question word is the subject, there is no extra auxiliary."
    }
  }
};
