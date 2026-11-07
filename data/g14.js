// G14 : Adverbes (formation et position), so / such, enough / too, still / yet / already / any more
import { S, FICHE, MURPHY, F, OK, R, W, P, K, hint, SK } from './dsl2.js';

const guideeA = [
  K('She writes very ___ (clear) in all her technical reports.', [['clearly']], "Elle écrit très clairement dans tous ses rapports techniques.", 'Adjectif régulier : + -ly.', 'Regular adjective: + -ly.'),
  K('He works ___ (automatic) without requiring supervision.', [['automatically']], "Il travaille de façon automatique, sans supervision.", 'Adjectif en -ic : -ically.', 'Adjective ending in -ic: -ically.'),
  K('She ___ (easy) solved the differential equation.', [['easily']], "Elle a résolu facilement l'équation différentielle.", 'Adjectif en -y : -ily.', 'Adjective ending in -y: -ily.'),
  K('He ___ (hard) ever makes a grammatical error.', [['hardly']], "Il ne fait presque jamais d'erreur de grammaire.", 'hardly = à peine ; hardly ever = presque jamais.', 'hardly = barely; hardly ever = almost never.'),
  K('She performed ___ (good) in the oral presentation.', [['well']], "Elle s'est bien débrouillée à l'exposé oral.", 'Adverbe irrégulier de good : well.', 'Irregular adverb of good: well.'),
  K('The system ___ (quick) detected the anomaly.', [['quickly']], "Le système a rapidement détecté l'anomalie.", 'quick + -ly.', 'quick + -ly.'),
  K('He ___ (unfortunate) missed the submission deadline.', [['unfortunately']], "Malheureusement, il a manqué la date limite de remise.", 'Adverbe de commentaire : unfortunately.', 'Comment adverb: unfortunately.'),
  K('The results are ___ (probable) the best we have obtained.', [['probably']], "Ces résultats sont probablement les meilleurs que nous ayons obtenus.", 'Adjectif en -le : probable donne probably.', 'Adjective ending in -le: probable gives probably.'),
  K('She ___ (complete) forgot about the team meeting.', [['completely']], "Elle a complètement oublié la réunion d'équipe.", 'complete + -ly (le e final est conservé).', 'complete + -ly (the final e is kept).'),
  K('He works ___ (extreme / hard) to meet every deadline.', [['extremely hard']], "Il travaille extrêmement dur pour tenir chaque échéance.", 'extremely (régulier) + hard (adverbe irrégulier identique).', 'extremely (regular) + hard (irregular adverb, same form).')
];
const guideeB = [
  F('She arrives always before everyone else.', ['She always arrives before everyone else.'], "Elle arrive toujours avant tout le monde.", 'Fréquence : avant le verbe principal.', 'Frequency: before the main verb.'),
  F('He is late never for meetings.', ['He is never late for meetings.'], "Il n'est jamais en retard aux réunions.", 'Fréquence : après be.', 'Frequency: after be.'),
  F('This is important extremely for the project.', ['This is extremely important for the project.'], "C'est extrêmement important pour le projet.", 'Degré : avant l\'adjectif.', 'Degree: before the adjective.'),
  F('She works from home sometimes on Fridays.', ['She sometimes works from home on Fridays.'], "Elle travaille parfois à domicile le vendredi.", 'Fréquence : avant le verbe principal.', 'Frequency: before the main verb.'),
  F('He quickly completed the task.', ['He completed the task quickly.'], "Il a terminé la tâche rapidement.", 'Manière : plutôt après le verbe et son complément (l\'autre place est possible mais moins naturelle ici).', 'Manner: usually after the verb and its object.'),
  OK('Surprisingly, the experiment produced excellent results.', "Étonnamment, l'expérience a donné d'excellents résultats.", 'Adverbe de commentaire en début de phrase, suivi d\'une virgule : correct.', 'Comment adverb at the start of the sentence, followed by a comma: correct.'),
  F('She well presents her results.', ['She presents her results well.'], "Elle présente bien ses résultats.", 'Manière : après le verbe et son complément.', 'Manner: after the verb and its object.'),
  F('He has been rarely late.', ['He has rarely been late.'], "Il a rarement été en retard.", 'Fréquence : entre l\'auxiliaire et le participe.', 'Frequency: between the auxiliary and the participle.'),
  F('I agree completely with your analysis.', ['I completely agree with your analysis.'], "Je suis tout à fait d'accord avec votre analyse.", 'Degré : avant le verbe (la place finale est possible, mais le corrigé attendu est avant le verbe).', 'Degree: before the verb.'),
  OK('She explained the concept clearly to the students.', "Elle a expliqué clairement le concept aux étudiants.", 'Adverbe de manière placé après le verbe et son complément : correct.', 'Manner adverb after the verb and its object: correct.')
];
const nivA = [
  K('She explained the concept ___ (clear).', [['clearly']], "Elle a expliqué le concept clairement.", 'clear + -ly.', 'clear + -ly.'),
  K('He ___ (usual) checks his emails first thing in the morning.', [['usually']], "Il consulte d'ordinaire ses courriels dès le matin.", 'usual + -ly.', 'usual + -ly.'),
  K('The engineer solved the problem ___ (quick).', [['quickly']], "L'ingénieur a résolu le problème rapidement.", 'quick + -ly.', 'quick + -ly.'),
  K('She is ___ (rare) late for her scheduled appointments.', [['rarely']], "Elle est rarement en retard à ses rendez-vous.", 'rare + -ly.', 'rare + -ly.'),
  K("They ___ (probable) won't finish before the deadline.", [['probably']], "Ils ne finiront probablement pas avant l'échéance.", 'probable donne probably.', 'probable gives probably.'),
  K('He writes ___ (bad), his handwriting is almost illegible.', [['badly']], "Il écrit mal, son écriture est presque illisible.", 'bad + -ly.', 'bad + -ly.'),
  K('This machine ___ (automatic) shuts down after five minutes of inactivity.', [['automatically']], "Cette machine s'éteint automatiquement après cinq minutes d'inactivité.", '-ic donne -ically.', '-ic gives -ically.'),
  K('She ___ (hard) had time to prepare for the presentation.', [['hardly']], "Elle a à peine eu le temps de préparer l'exposé.", 'hardly = à peine.', 'hardly = barely.'),
  K('The new model is ___ (significant) faster than the previous one.', [['significantly']], "Le nouveau modèle est nettement plus rapide que le précédent.", 'significant + -ly.', 'significant + -ly.'),
  K('He ___ (careful) reviewed every single line of code.', [['carefully']], "Il a relu soigneusement chaque ligne de code.", 'careful + -ly.', 'careful + -ly.')
];
const nivB = [
  K('She ___ (often) works late to complete her projects.', [['often']], "Elle travaille souvent tard pour terminer ses projets.", 'Fréquence : avant le verbe principal.', 'Frequency: before the main verb.'),
  K('He answered the question ___ (confident).', [['confidently']], "Il a répondu à la question avec assurance.", 'confident + -ly.', 'confident + -ly.'),
  K('The project was ___ (near) complete when the error was discovered.', [['nearly']], "Le projet était presque terminé quand l'erreur a été découverte.", 'nearly = presque ; near = proche.', 'nearly = almost; near = close.'),
  K('She ___ (always) backs up her data before updating the system.', [['always']], "Elle sauvegarde toujours ses données avant de mettre le système à jour.", 'always, avant le verbe principal.', 'always, before the main verb.'),
  K('He ___ (unfortunate) missed the submission deadline by one hour.', [['unfortunately']], "Malheureusement, il a manqué la date limite d'une heure.", 'unfortunate + -ly.', 'unfortunate + -ly.')
];
const nivC = [
  F('She speaks English good.', ['She speaks English well.'], "Elle parle bien anglais.", 'Adverbe : well.', 'Adverb: well.'),
  F('He works hardly every day.', ['He works hard every day.'], "Il travaille dur tous les jours.", 'hard (énergiquement) et non hardly (à peine).', 'hard (with effort), not hardly (barely).'),
  F('She arrived lately for the meeting.', ['She arrived late for the meeting.'], "Elle est arrivée en retard à la réunion.", 'late (en retard) et non lately (récemment).', 'late (not on time), not lately (recently).'),
  F('He well explained the method.', ['He explained the method well.'], "Il a bien expliqué la méthode.", 'Manière : après le verbe et son complément.', 'Manner: after the verb and its object.'),
  F('They always are ready before the deadline.', ['They are always ready before the deadline.'], "Ils sont toujours prêts avant l'échéance.", 'Fréquence : après be.', 'Frequency: after be.'),
  R("Elle a brillamment défendu sa thèse devant le jury.", ['She brilliantly defended her thesis before the committee.', 'She defended her thesis brilliantly before the committee.', 'She brilliantly defended her thesis in front of the committee.', 'She defended her thesis brilliantly in front of the jury.', 'She brilliantly defended her thesis before the jury.', 'She defended her thesis brilliantly before the jury.'], 'brilliant + -ly.', 'brilliant + -ly.'),
  R("Il n'arrive presque jamais en retard.", ['He is hardly ever late.', 'He almost never arrives late.', 'He hardly ever arrives late.', 'He is almost never late.', 'He is rarely late.'], 'presque jamais : hardly ever / almost never.', 'presque jamais: hardly ever / almost never.'),
  R("Malheureusement, les résultats ne confirment pas l'hypothèse.", ['Unfortunately, the results do not confirm the hypothesis.', "Unfortunately, the results don't confirm the hypothesis.", 'Unfortunately the results do not confirm the hypothesis.', "Unfortunately the results don't confirm the hypothesis."], 'Adverbe de commentaire en début de phrase.', 'Comment adverb at the start of the sentence.'),
  R("Elle parle couramment anglais et allemand.", ['She speaks English and German fluently.', 'She speaks fluent English and German.', 'She speaks both English and German fluently.', 'She fluently speaks English and German.'], 'Manière : couramment = fluently, placé après le complément.', 'Manner: fluently, placed after the object.'),
  R("Le système détecte automatiquement les anomalies.", ['The system automatically detects anomalies.', 'The system detects anomalies automatically.', 'The system automatically detects the anomalies.', 'The system detects the anomalies automatically.', 'The system automatically detects irregularities.'], 'automatically : -ic donne -ically.', 'automatically: -ic gives -ically.')
];
const nivD = [
  P("Réécris avec 'hardly ever' et explique la nuance.", "'She rarely fails.' Rewrite it with 'hardly ever' and explain the nuance.", ["She hardly ever fails. Same meaning, but 'hardly ever' sounds more informal and spoken."], 'hardly ever = presque jamais.', "Rewrite it with 'hardly ever' and explain the nuance.", 'hardly ever = almost never.'),
  P("Réécris avec 'to our surprise'.", "'The results were surprisingly accurate.' Rewrite it with 'to our surprise'.", ['To our surprise, the results were accurate.', 'The results were accurate, to our surprise.'], 'to our surprise remplace surprisingly.', "Rewrite it with 'to our surprise'.", 'to our surprise replaces surprisingly.'),
  P("Renforce l'énoncé avec un adverbe de degré.", "'He works hard.' Strengthen it with a degree adverb.", ['He works incredibly hard.', 'He works remarkably hard.', 'He works extremely hard.'], 'Adverbe de degré avant hard.', "Strengthen it with a degree adverb.", 'A degree adverb before hard.'),
  P("Place l'adverbe en fin de phrase.", "'She quickly wrote the report.' Move the adverb to the end of the sentence.", ['She wrote the report quickly.'], 'Manière : en fin de phrase, c\'est naturel.', "Move the adverb to the end of the sentence.", 'Manner adverbs often come at the end.'),
  P("Mets l'adverbe après le verbe (style formel).", "'Unfortunately, the deadline was missed.' Put the adverb inside the verb group.", ['The deadline was unfortunately missed.'], 'Adverbe entre auxiliaire et participe, registre plus formel.', "Put the adverb inside the verb group.", 'Adverb between auxiliary and participle, more formal.')
];
const bonus = [
  K('He works ___ (hard / hardly), he puts in sixty hours a week.', [['hard']], "Il travaille dur, il fait soixante heures par semaine.", 'hard = avec énergie.', 'hard = with effort.'),
  K('She ___ (hard / hardly) spoke during the entire meeting.', [['hardly']], "Elle a à peine parlé pendant toute la réunion.", 'hardly = à peine.', 'hardly = barely.'),
  K('The results arrived ___ (late / lately), we missed the publication window.', [['late']], "Les résultats sont arrivés en retard, nous avons manqué la fenêtre de publication.", 'late = en retard.', 'late = after the expected time.'),
  K('___ (Late / Lately), the team has been producing excellent results.', [['lately']], "Récemment, l'équipe obtient d'excellents résultats.", 'lately = récemment.', 'lately = recently.'),
  K('The project is ___ (near / nearly) complete, just one more step.', [['nearly']], "Le projet est presque terminé, il reste une étape.", 'nearly = presque.', 'nearly = almost.')
];
const devoir = [
  K('She completed the analysis ___ (efficient).', [['efficiently']], "Elle a terminé l'analyse efficacement.", 'efficient + -ly.', 'efficient + -ly.'),
  K('He ___ (never) misses a project deadline.', [['never']], "Il ne manque jamais une échéance de projet.", 'Fréquence : avant le verbe.', 'Frequency: before the verb.'),
  K('The results were ___ (clear) surprising.', [['clearly']], "Les résultats étaient clairement surprenants.", 'clear + -ly, adverbe de degré.', 'clear + -ly, degree adverb.'),
  K('She ___ (hard) understood a word of the technical lecture.', [['hardly']], "Elle a à peine compris un mot du cours technique.", 'hardly.', 'hardly.'),
  K('He ___ (usual) sends a summary after each meeting.', [['usually']], "Il envoie généralement un résumé après chaque réunion.", 'usually.', 'usually.'),
  K('This software works ___ (remarkable) well in practice.', [['remarkably']], "Ce logiciel fonctionne remarquablement bien en pratique.", 'remarkable + -ly.', 'remarkable + -ly.'),
  K('She ___ (careful) proofread her report before submission.', [['carefully']], "Elle a soigneusement relu son rapport avant de le remettre.", 'careful + -ly.', 'careful + -ly.'),
  K('He arrived ___ (late) for the job interview.', [['late']], "Il est arrivé en retard à l'entretien d'embauche.", 'late reste late.', 'late stays late.'),
  K('The machine ___ (automatic) detects and corrects errors.', [['automatically']], "La machine détecte et corrige les erreurs automatiquement.", '-ically.', '-ically.'),
  K('She works ___ (extreme) hard when approaching a deadline.', [['extremely']], "Elle travaille extrêmement dur à l'approche d'une échéance.", 'extreme + -ly.', 'extreme + -ly.'),
  K('He ___ (complete) rewrote the algorithm from scratch.', [['completely']], "Il a complètement réécrit l'algorithme à partir de zéro.", 'complete + -ly.', 'complete + -ly.'),
  K('___ (Unfortunate), the prototype failed during the live demonstration.', [['unfortunately']], "Malheureusement, le prototype est tombé en panne pendant la démonstration en direct.", 'unfortunate + -ly.', 'unfortunate + -ly.'),
  K('She has ___ (recent) been promoted to senior engineer.', [['recently']], "Elle a récemment été promue ingénieure senior.", 'recent + -ly.', 'recent + -ly.'),
  K('He speaks ___ (fluent) in English during international meetings.', [['fluently']], "Il parle couramment anglais pendant les réunions internationales.", 'fluent + -ly.', 'fluent + -ly.'),
  K('The two results are ___ (significant) different from each other.', [['significantly']], "Les deux résultats diffèrent sensiblement l'un de l'autre.", 'significant + -ly.', 'significant + -ly.')
];
const m14a1 = [
  K('She ___ (usual) arrives at the lab before her colleagues.', [['usually']], "Elle arrive d'habitude au labo avant ses collègues.", 'usual + -ly.', 'usual + -ly.'),
  K('He works ___ (incredible / hard) to meet deadlines.', [['incredibly hard']], "Il travaille incroyablement dur pour tenir les échéances.", 'incredibly + hard.', 'incredibly + hard.'),
  K('The scanner ___ (automatic) detects faulty parts.', [['automatically']], "Le scanner détecte automatiquement les pièces défectueuses.", '-ically.', '-ically.'),
  K('She ___ (hard) had time to prepare, she was swamped.', [['hardly']], "Elle a à peine eu le temps de se préparer, elle était débordée.", 'hardly.', 'hardly.'),
  K('___ (Unfortunate), the results were inconclusive.', [['unfortunately']], "Malheureusement, les résultats n'étaient pas concluants.", 'unfortunate + -ly.', 'unfortunate + -ly.')
];
const m14a2 = [
  F('She speaks French good.', ['She speaks French well.'], "Elle parle bien français.", 'well.', 'well.'),
  F('He arrived lately, he was delayed.', ['He arrived late, he was delayed.', 'He arrived late.', 'He arrived late, he was delayed.'], "Il est arrivé en retard, il avait été retardé.", 'late et non lately.', 'late, not lately.'),
  F('She well explained the procedure.', ['She explained the procedure well.'], "Elle a bien expliqué la procédure.", 'Manière : après le verbe et son complément.', 'Manner: after the verb and its object.'),
  F('He works hardly, sixty hours a week!', ['He works hard, sixty hours a week!', 'He works hard, sixty hours a week.'], "Il travaille dur, soixante heures par semaine !", 'hard et non hardly.', 'hard, not hardly.')
];
const m14b = [
  K('The task was ___ complex that we needed a week.', [['so']], "La tâche était si complexe qu'il nous a fallu une semaine.", 'so + adjectif.', 'so + adjective.'),
  K('It was ___ a complex task that we needed a week.', [['such']], "C'était une tâche si complexe qu'il nous a fallu une semaine.", 'such + a + adjectif + nom.', 'such + a + adjective + noun.'),
  K('She presented it ___ clearly that everyone understood.', [['so']], "Elle l'a présenté si clairement que tout le monde a compris.", 'so + adverbe.', 'so + adverb.'),
  K('We got ___ positive feedback that we expanded the pilot.', [['such']], "Nous avons reçu des retours si positifs que nous avons étendu le pilote.", 'such + adjectif + nom indénombrable.', 'such + adjective + uncountable noun.'),
  K('The sample was ___ contaminated.', [['so']], "L'échantillon était tellement contaminé.", 'so + adjectif (sans nom).', 'so + adjective (no noun).')
];
const m14c = [
  K("This tablet isn't fast ___ for video editing.", [['enough']], "Cette tablette n'est pas assez rapide pour le montage vidéo.", 'adjectif + enough.', 'adjective + enough.'),
  K("We don't have ___ technicians to finish on time.", [['enough']], "Nous n'avons pas assez de techniciens pour finir à temps.", 'enough + nom.', 'enough + noun.'),
  K('The manual was ___ complicated to follow.', [['too']], "Le manuel était trop compliqué à suivre.", 'too + adjectif.', 'too + adjective.'),
  K('Is the battery strong ___ to last the whole trip?', [['enough']], "La batterie est-elle assez puissante pour durer tout le trajet ?", 'adjectif + enough.', 'adjective + enough.'),
  K('He is skilled ___ to supervise the installation.', [['enough']], "Il est assez qualifié pour superviser l'installation.", 'adjectif + enough.', 'adjective + enough.')
];
const m14d = [
  K('Has the committee published the ranking ___?', [['yet']], "Le comité a-t-il déjà publié le classement ?", 'Question : yet en fin de phrase.', 'Question: yet at the end.'),
  K('We are ___ calibrating the instrument.', [['still']], "Nous sommes toujours en train d\'étalonner l\'instrument.", 'still : continuité.', 'still: continuity.'),
  K('I have ___ forwarded the invoice.', [['already']], "J'ai déjà transmis la facture.", 'already : affirmatif.', 'already: affirmative.'),
  K("She doesn't use that interface ___.", [['any more', 'anymore']], "Elle n'utilise plus cette interface.", 'not ... any more = ne ... plus.', 'not ... any more = no longer.'),
  K('Is the workshop ___ planned for Monday?', [['still']], "L'atelier est-il toujours prévu pour lundi ?", 'still : toujours.', 'still: still.')
];
const m14e = [
  W('so / the / surprising / were / that / we / checked / results / again / it', ['The results were so surprising that we checked it again.', 'The results were so surprising that we checked again.'], "Les résultats étaient si surprenants que nous avons revérifié.", 'so + adjectif + that.', 'so + adjective + that.'),
  W('time / enough / to / the / have / don\'t / we / revise', ["We don't have enough time to revise."], "Nous n'avons pas assez de temps pour réviser.", 'enough + nom.', 'enough + noun.'),
  W('too / is / long / read / the / to / article / quickly', ['The article is too long to read quickly.'], "L'article est trop long pour être lu rapidement.", 'too + adjectif + to.', 'too + adjective + to.'),
  W('still / feedback / are / we / for / waiting / the', ['We are still waiting for the feedback.'], "Nous attendons toujours les retours.", 'still avant le verbe principal.', 'still before the main verb.'),
  W('already / she / paper / has / her / sent', ['She has already sent her paper.'], "Elle a déjà envoyé son article.", 'already entre auxiliaire et participe.', 'already between auxiliary and participle.'),
  W('here / any / works / more / he / not', ['He does not work here any more.', "He doesn't work here any more.", 'He does not work here anymore.', "He doesn't work here anymore."], "Il ne travaille plus ici.", 'not ... any more.', 'not ... any more.'),
  W('faults / the / automatically / detects / sensor', ['The sensor automatically detects faults.', 'The sensor detects faults automatically.'], "Le capteur détecte automatiquement les défauts.", 'Adverbe devant le verbe ou en fin de phrase.', 'Adverb before the verb or at the end.'),
  W('well / she / presented / project / the', ['She presented the project well.'], "Elle a bien présenté le projet.", 'well en fin de phrase.', 'well at the end.')
];
const th = [
  R("Les résultats étaient si décevants qu'on a abandonné l'essai.", ['The results were so disappointing that we abandoned the trial.', 'The results were so disappointing that we gave up the trial.', 'The results were so disappointing that we abandoned the test.', 'The results were so disappointing that we gave up the test.', 'The results were so disappointing that we stopped the trial.'], 'so + adjectif + that.', 'so + adjective + that.'),
  R("Nous n'avons pas assez d'espace pour tout stocker.", ['We do not have enough space to store everything.', "We don't have enough space to store everything.", "We don't have enough room to store everything.", 'We do not have enough room to store everything.', "We don't have enough space to store it all.", "We don't have enough storage to store everything."], 'enough + nom + to.', 'enough + noun + to.'),
  R("Ce rapport est trop dense pour être lu en une heure.", ['This report is too dense to read in an hour.', 'This report is too dense to be read in an hour.', 'This report is too dense to read in one hour.', 'This report is too dense to read within an hour.'], 'too + adjectif + to.', 'too + adjective + to.'),
  R("Nous attendons toujours la confirmation.", ['We are still waiting for the confirmation.', 'We are still waiting for confirmation.', "We're still waiting for confirmation.", "We're still waiting for the confirmation."], 'still avant le verbe principal.', 'still before the main verb.'),
  R("Elle a déjà présenté son projet.", ['She has already presented her project.', "She's already presented her project.", 'She has already given her presentation.'], 'already entre auxiliaire et participe.', 'already between auxiliary and participle.'),
  R("Il n'habite plus ici.", ['He does not live here any more.', "He doesn't live here any more.", "He doesn't live here anymore.", 'He does not live here anymore.', 'He no longer lives here.'], 'ne ... plus : not ... any more / no longer.', 'ne ... plus: not ... any more / no longer.'),
  R("L'appareil mesure précisément la température.", ['The device precisely measures the temperature.', 'The device measures the temperature precisely.', 'The device measures temperature precisely.', 'The device accurately measures the temperature.', 'The device measures the temperature accurately.'], 'precise + -ly.', 'precise + -ly.')
];
const F1 = SK('Adverbes : formation', 'Adverbs: formation');
const F2 = SK('Adverbes : position', 'Adverbs: position');
const F3 = SK('So, such, enough, too, still, yet, already', 'So, such, enough, too, still, yet, already');
export const G14 = {
  id: 'G14',
  title: 'Adverbes (Adverbs)',
  coursUrl: '',
  skills: {
    '*': F1,
    'g14-guidee-b': F2, 'g14-niv-b': F2, 'g14-niv-d': F2, 'g14-m14a-2': F2, 'g14-m14e': F2,
    'g14-bonus': SK('Hard / hardly, late / lately, near / nearly', 'Hard / hardly, late / lately, near / nearly'),
    'g14-niv-c': SK('Adverbes : corrections et thème', 'Adverbs: corrections and translation'),
    'g14-th': SK('Adverbes : corrections et thème', 'Adverbs: corrections and translation'),
    'g14-m14b': F3, 'g14-m14c': F3, 'g14-m14d': F3
  },
  sets: [
    S('g14-guidee-a', FICHE, ['Série guidée A : formation des adverbes', 'Guided set A: forming adverbs'], 'B1', ['Forme l\'adverbe à partir de l\'adjectif.', 'Form the adverb from the adjective.'], guideeA),
    S('g14-guidee-b', FICHE, ['Série guidée B : position des adverbes', 'Guided set B: position of adverbs'], 'B1+', ['Replace l\'adverbe correctement, ou valide la phrase.', 'Put the adverb in the right place, or confirm the sentence is correct.'], guideeB),
    S('g14-niv-a', FICHE, ['Niveau A : formation de base', 'Level A: basic formation'], 'B1', ['Forme l\'adverbe.', 'Form the adverb.'], nivA),
    S('g14-niv-b', FICHE, ['Niveau B : position et nuances', 'Level B: position and nuances'], 'B1+', ['Forme l\'adverbe ou place-le.', 'Form or place the adverb.'], nivB),
    S('g14-niv-c', FICHE, ['Niveau C : erreurs et traduction', 'Level C: errors and translation'], 'B1+', ['Corrige cinq phrases, puis traduis cinq phrases.', 'Correct five sentences, then translate five sentences.'], nivC),
    S('g14-niv-d', FICHE, ['Niveau D : adverbes en contexte', 'Level D: adverbs in context'], 'B2', ['Réécris la phrase, puis compare avec le modèle.', 'Rewrite the sentence, then compare with the model.'], nivD),
    S('g14-bonus', FICHE, ['Bonus : hard / hardly, late / lately, near / nearly', 'Bonus: hard / hardly, late / lately, near / nearly'], 'B1+', ['Choisis la bonne forme.', 'Choose the right form.'], bonus),
    S('g14-devoir', FICHE, ['Devoir maison', 'Homework'], 'B1+', ['Quinze phrases : forme l\'adverbe.', 'Fifteen sentences: form the adverb.'], devoir),
    S('g14-m14a-1', MURPHY, ['Unité 14A : formation (1/2)', 'Unit 14A: formation (1/2)'], 'B1', ['Forme l\'adverbe.', 'Form the adverb.'], m14a1),
    S('g14-m14a-2', MURPHY, ['Unité 14A : corriger les erreurs (2/2)', 'Unit 14A: correcting errors (2/2)'], 'B1+', ['Corrige la phrase.', 'Correct the sentence.'], m14a2),
    S('g14-m14b', MURPHY, ['Unité 14B : so / such', 'Unit 14B: so / such'], 'B1+', ['Complète avec so ou such.', 'Complete with so or such.'], m14b),
    S('g14-m14c', MURPHY, ['Unité 14C : enough / too', 'Unit 14C: enough / too'], 'B1+', ['Complète avec enough ou too.', 'Complete with enough or too.'], m14c),
    S('g14-m14d', MURPHY, ['Unité 14D : still / yet / already / any more', 'Unit 14D: still / yet / already / any more'], 'B1+', ['Complète avec le bon adverbe.', 'Complete with the right adverb.'], m14d),
    S('g14-m14e', MURPHY, ['Unité 14E : remettre les mots dans l\'ordre', 'Unit 14E: sentence building'], 'B1+', ['Écris la phrase complète avec les mots dans le bon ordre.', 'Write the complete sentence with the words in the right order.'], m14e),
    S('g14-th', MURPHY, ['Unité TH : thème grammatical', 'Unit TH: translation'], 'B1+', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], th)
  ],
  recap: {
    blocks: [
      {
        title: 'Formation des adverbes',
        forms: [
          ['adjectif + -ly', 'quick, quickly ; clear, clearly'],
          ['-le devient -ly', 'simple, simply ; probable, probably'],
          ['-y devient -ily', 'easy, easily ; heavy, heavily'],
          ['-ic devient -ically', 'automatic, automatically'],
          ['irréguliers', 'good, well ; fast, fast ; hard, hard ; late, late']
        ],
        uses: ['hard (avec énergie) ≠ hardly (à peine) ; late (en retard) ≠ lately (récemment) ; near ≠ nearly.']
      },
      {
        title: 'Position des adverbes',
        forms: [
          ['fréquence', 'avant le verbe principal, après be : She always arrives early. He is never late.'],
          ['manière', 'après le verbe (ou son complément) : She wrote the report clearly.'],
          ['degré', 'avant l\'adjectif ou l\'adverbe : extremely important'],
          ['commentaire', 'début de phrase + virgule : Unfortunately, ...'],
          ['so / such', 'so + adjectif ; such + (a) + adjectif + nom'],
          ['enough / too', 'adjectif + enough ; enough + nom ; too + adjectif'],
          ['still / yet / already / any more', 'toujours / déjà (question, négation) / déjà (affirmatif) / ne ... plus']
        ],
        uses: []
      }
    ],
    tables: [],
    notes: ['Entre l\'auxiliaire et le participe : She has rarely been late.'],
    rule: 'Fréquence collée au verbe, manière après l\'action, degré avant l\'adjectif.'
  },
  enMeta: {
    title: 'Adverbs',
    recap: {
      blocks: [
        {
          title: 'Forming adverbs',
          forms: [
            ['adjective + -ly', 'quick, quickly; clear, clearly'],
            ['-le becomes -ly', 'simple, simply; probable, probably'],
            ['-y becomes -ily', 'easy, easily; heavy, heavily'],
            ['-ic becomes -ically', 'automatic, automatically'],
            ['irregular', 'good, well; fast, fast; hard, hard; late, late']
          ],
          uses: ['hard (with effort) ≠ hardly (barely); late (not on time) ≠ lately (recently); near ≠ nearly.']
        },
        {
          title: 'Position of adverbs',
          forms: [
            ['frequency', 'before the main verb, after be: She always arrives early. He is never late.'],
            ['manner', 'after the verb (or its object): She wrote the report clearly.'],
            ['degree', 'before the adjective or adverb: extremely important'],
            ['comment', 'start of sentence + comma: Unfortunately, ...'],
            ['so / such', 'so + adjective; such + (a) + adjective + noun'],
            ['enough / too', 'adjective + enough; enough + noun; too + adjective'],
            ['still / yet / already / any more', 'still / already (questions, negatives) / already (affirmative) / no longer']
          ],
          uses: []
        }
      ],
      tables: [],
      notes: ['Between auxiliary and participle: She has rarely been late.'],
      rule: 'Frequency next to the verb, manner after the action, degree before the adjective.'
    }
  }
};
