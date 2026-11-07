// G07 : Conditionals, If Clauses (les phrases conditionnelles)
// Contenu reconstruit à partir de la fiche élève, du supplément Murphy et du corrigé enseignant du hub.
import { S, FICHE, MURPHY, C, T, F, R, W, P } from './dsl2.js';

const CF = 'Complète avec la bonne forme conditionnelle.';
const CFE = 'Complete with the correct conditional form.';
const hint = (fr, en) => [fr, en];
// Cloze avec indice : K(phrase, trous, français, règle FR, règle EN, [indice FR, indice EN])
const K = (s, a, fr, why, whyEn, h) => C(s, a, fr, why, whyEn, h ? h[0] : null, h ? h[1] : null);

const guideeA = [
  K("If you ___ (heat) metal, it ___ (expand).", [['heat'], ['expands']], "Si on chauffe un métal, il se dilate.", "Type 0 (loi physique) : If + présent, présent. it est singulier : expands.", 'Type 0 (physical law): If + present, present. it is singular: expands.', hint('loi physique : Type 0', 'physical law: type 0')),
  K("If she ___ (not / study), she ___ (fail) the exam.", [["doesn't study"], ['will fail']], "Si elle ne révise pas, elle échouera à l'examen.", "Type 1 (résultat futur probable) : If + présent, will + verbe. La négation se fait avec doesn't.", 'Type 1 (probable future result): If + present, will + verb. The negative uses doesn\'t.', hint('résultat futur : Type 1', 'future result: type 1')),
  K("If it ___ (rain) tomorrow, we ___ (cancel) the visit.", [['rains'], ['will cancel']], "S'il pleut demain, nous annulerons la visite.", "Type 1 : après if, on emploie le présent même pour le futur (rains, pas will rain).", 'Type 1: after if, use the present even for the future (rains, not will rain).', hint('Type 1', 'type 1')),
  K("Plants ___ (die) if they ___ (not / receive) water.", [['die'], ["don't receive"]], "Les plantes meurent si elles ne reçoivent pas d'eau.", "Vérité générale : Type 0, présent dans les deux propositions.", 'General truth: type 0, present in both clauses.', hint('vérité générale : Type 0', 'general truth: type 0')),
  K("If you ___ (press) this button, the machine ___ (start).", [['press'], ['starts']], "Si vous appuyez sur ce bouton, la machine démarre.", "Résultat systématique : Type 0, présent dans les deux propositions.", 'Systematic result: type 0, present in both clauses.', hint('résultat systématique : Type 0', 'systematic result: type 0')),
  K("Unless he ___ (sign) the form, we ___ (not / process) the application.", [['signs'], ["won't process"]], "À moins qu'il ne signe le formulaire, nous ne traiterons pas la demande.", "unless signifie if not : le verbe qui suit unless n'est donc pas négatif. Type 1 : signs, won't process.", 'unless means if not: the verb after unless is therefore not negative. Type 1: signs, won\'t process.', hint('unless = if not', 'unless = if not')),
  K("Provided the data ___ (be) accurate, the model ___ (work).", [['is', 'are'], ['will work']], "À condition que les données soient exactes, le modèle fonctionnera.", "provided that signifie if : présent après provided, will dans la principale. data s'emploie au singulier (is) ou au pluriel (are).", 'provided that means if: present after provided, will in the main clause. data is used as singular (is) or plural (are).', hint('provided = if', 'provided = if')),
  K("If the deadline ___ (change), she ___ (notify) us immediately.", [['changes'], ['will notify']], "Si la date limite change, elle nous préviendra tout de suite.", "Type 1 : If + présent, will + verbe. deadline est singulier : changes.", 'Type 1: If + present, will + verb. deadline is singular: changes.', hint('Type 1', 'type 1')),
  K("Water ___ (not / boil) if the temperature ___ (not / reach) 100°C.", [["doesn't boil", "won't boil"], ["doesn't reach"]], "L'eau ne bout pas si la température n'atteint pas 100 °C.", "Vérité générale : Type 0, doesn't boil. La forme won't boil (Type 1) est aussi acceptée. Après if, on emploie le présent : doesn't reach.", 'General truth: type 0, doesn\'t boil. The form won\'t boil (type 1) is also accepted. After if, use the present: doesn\'t reach.', hint('vérité générale : Type 0', 'general truth: type 0')),
  K("If the software ___ (crash), we ___ (lose) all the unsaved data.", [['crashes'], ['will lose']], "Si le logiciel plante, nous perdrons toutes les données non enregistrées.", "Type 1 : crashes (singulier), will lose.", 'Type 1: crashes (singular), will lose.', hint('Type 1', 'type 1'))
];

const guideeB = [
  K("If I ___ (be) the manager, I ___ (change) the strategy.", [['were'], ['would change']], "Si j'étais le directeur, je changerais la stratégie.", "Type 2 (imaginaire au présent) : If + Past, would + verbe. Après if, on emploie were pour tous les sujets en style soutenu.", 'Type 2 (imaginary present): If + past, would + verb. After if, were is used for all subjects in careful English.', hint('imaginaire au présent : Type 2', 'imaginary present: type 2')),
  K("If she ___ (study) harder, she ___ (pass) the test.", [['had studied'], ['would have passed']], "Si elle avait travaillé plus dur, elle aurait réussi le test.", "Type 3 (regret sur le passé) : If + Past Perfect, would have + participe passé.", 'Type 3 (regret about the past): If + past perfect, would have + past participle.', hint('regret passé : Type 3', 'regret about the past: type 3')),
  K("We ___ (hire) more staff if we ___ (have) a bigger budget.", [['would hire'], ['had']], "Nous embaucherions plus de personnel si nous avions un budget plus important.", "Type 2 : would + verbe dans la principale, Past Simple après if (had).", 'Type 2: would + verb in the main clause, past simple after if (had).', hint('Type 2', 'type 2')),
  K("If they ___ (arrive) earlier, they ___ (not / miss) the presentation.", [['had arrived'], ["wouldn't have missed"]], "S'ils étaient arrivés plus tôt, ils n'auraient pas manqué la présentation.", "Type 3 : had arrived, wouldn't have missed.", 'Type 3: had arrived, wouldn\'t have missed.', hint('Type 3', 'type 3')),
  K("What ___ you ___ (do) if you ___ (win) the lottery?", [['would'], ['do'], ['won']], "Que ferais-tu si tu gagnais au loto ?", "Type 2 en question : What would you do if you won ? Past Simple après if.", 'Type 2 as a question: What would you do if you won? Past simple after if.', hint('Type 2', 'type 2')),
  K("If I ___ (study) computer science, I ___ (be) a developer now.", [['had studied'], ['would be']], "Si j'avais étudié l'informatique, je serais développeur maintenant.", "Conditionnel mixte (passé puis présent) : If + Past Perfect, would + verbe de base. now indique la conséquence présente.", 'Mixed conditional (past then present): If + past perfect, would + base verb. now shows the present result.', hint('mixte : passé puis conséquence présente', 'mixed: past then present result')),
  K("If the team ___ (be) more experienced, they ___ (solve) the problem yesterday.", [['were', 'had been'], ['would have solved']], "Si l'équipe était plus expérimentée, elle aurait résolu le problème hier.", "Conditionnel mixte (condition présente, conséquence passée) : were + would have solved. had been est aussi possible.", 'Mixed conditional (present condition, past result): were + would have solved. had been is also possible.', hint('mixte : condition présente, conséquence passée', 'mixed: present condition, past result')),
  K("She ___ (not / be) so stressed now if she ___ (plan) better last month.", [["wouldn't be"], ['had planned']], "Elle ne serait pas si stressée maintenant si elle avait mieux planifié le mois dernier.", "Conditionnel mixte : had planned (last month), wouldn't be (now).", 'Mixed conditional: had planned (last month), wouldn\'t be (now).', hint('mixte : passé puis présent', 'mixed: past then present')),
  K("If I ___ (know) about this earlier, I ___ (warn) you.", [['had known'], ['would have warned']], "Si j'avais su cela plus tôt, je t'aurais prévenu.", "Type 3 : had known, would have warned.", 'Type 3: had known, would have warned.', hint('Type 3', 'type 3')),
  K("Unless they ___ (find) a solution by Friday, the project ___ (be cancelled).", [['find'], ['will be cancelled', 'will be canceled']], "À moins qu'ils ne trouvent une solution d'ici vendredi, le projet sera annulé.", "Type 1 avec unless : présent après unless (find), will be cancelled dans la principale.", 'Type 1 with unless: present after unless (find), will be cancelled in the main clause.', hint('Type 1 avec unless', 'type 1 with unless'))
];

const nivA = [
  K("If the temperature ___ (drop) below 0°C, water ___ (freeze).", [['drops'], ['freezes']], "Si la température descend sous 0 °C, l'eau gèle.", 'Type 0 : présent dans les deux propositions. Sujets singuliers : drops, freezes.', 'Type 0: present in both clauses. Singular subjects: drops, freezes.'),
  K("If you ___ (not / hurry), you ___ (miss) the train.", [["don't hurry"], ['will miss']], "Si tu ne te dépêches pas, tu rateras le train.", "Type 1 : If + présent négatif, will + verbe.", 'Type 1: If + negative present, will + verb.'),
  K("Unless you ___ (sign) the form, we ___ (not / process) your application.", [['sign'], ["won't process"]], "À moins que vous ne signiez le formulaire, nous ne traiterons pas votre demande.", "unless = if not : pas de négation après unless.", 'unless = if not: no negative after unless.'),
  K("The experiment ___ (succeed) if the conditions ___ (be) correct.", [['will succeed'], ['are']], "L'expérience réussira si les conditions sont correctes.", "Type 1 : will + verbe dans la principale, présent après if. conditions est pluriel : are.", 'Type 1: will + verb in the main clause, present after if. conditions is plural: are.'),
  K("If I ___ (need) help, I ___ (call) you.", [['need'], ['will call']], "Si j'ai besoin d'aide, je t'appellerai.", 'Type 1 : need, will call.', 'Type 1: need, will call.')
];

const nivB = [
  K("If I ___ (know) the answer, I ___ (tell) you.", [['knew'], ['would tell']], "Si je connaissais la réponse, je te la dirais.", 'Type 2 : If + Past Simple, would + verbe.', 'Type 2: If + past simple, would + verb.'),
  K("If she ___ (read) the instructions, she ___ (not / make) that mistake.", [['had read'], ["wouldn't have made"]], "Si elle avait lu les instructions, elle n'aurait pas fait cette erreur.", 'Type 3 : had read, wouldn\'t have made.', 'Type 3: had read, wouldn\'t have made.'),
  K("He ___ (not / be) so tired now if he ___ (sleep) properly last night.", [["wouldn't be"], ['had slept']], "Il ne serait pas si fatigué maintenant s'il avait bien dormi la nuit dernière.", 'Conditionnel mixte : had slept (hier soir), wouldn\'t be (maintenant).', 'Mixed conditional: had slept (last night), wouldn\'t be (now).'),
  K("If I ___ (be) you, I ___ (accept) the proposal.", [['were'], ['would accept']], "Si j'étais toi, j'accepterais la proposition.", 'If I were you : were pour tous les sujets, avec would + verbe.', 'If I were you: were for all subjects, with would + verb.'),
  K("What ___ you ___ (do) if the machine ___ (break) during the experiment?", [['would'], ['do'], ['broke']], "Que ferais-tu si la machine tombait en panne pendant l'expérience ?", 'Type 2 en question : What would you do if ... broke ?', 'Type 2 as a question: What would you do if ... broke?'),
  K("If they ___ (not / make) that decision, the company ___ (survive).", [["hadn't made"], ['would have survived']], "S'ils n'avaient pas pris cette décision, l'entreprise aurait survécu.", 'Type 3 : hadn\'t made, would have survived.', 'Type 3: hadn\'t made, would have survived.'),
  K("She ___ (earn) more if she ___ (negotiate) her salary better.", [['would earn'], ['negotiated']], "Elle gagnerait plus si elle négociait mieux son salaire.", 'Type 2 : would earn, negotiated.', 'Type 2: would earn, negotiated.'),
  K("If we ___ (start) earlier, we ___ (finish) on time.", [['had started'], ['would have finished']], "Si nous avions commencé plus tôt, nous aurions fini à temps.", 'Type 3 : had started, would have finished.', 'Type 3: had started, would have finished.'),
  K("He ___ (not / leave) if the meeting ___ (not / be) so tedious.", [["wouldn't have left"], ["hadn't been"]], "Il ne serait pas parti si la réunion n'avait pas été aussi fastidieuse.", 'Type 3 : wouldn\'t have left, hadn\'t been.', 'Type 3: wouldn\'t have left, hadn\'t been.'),
  K("If I ___ (be) taller, I ___ (play) basketball professionally.", [['were'], ['would play']], "Si j'étais plus grand, je jouerais au basket de façon professionnelle.", 'Type 2 : were, would play.', 'Type 2: were, would play.')
];

const nivC = [
  F('If I would have a car, I would drive to work.', ['If I had a car, I would drive to work.', "If I had a car, I'd drive to work."], "Si j'avais une voiture, j'irais travailler en voiture.", "Après if, jamais de would : on emploie le Past Simple (had).", 'After if, never would: use the past simple (had).'),
  F('If she studied harder yesterday, she would pass.', ['If she had studied harder yesterday, she would have passed.', "If she had studied harder yesterday, she'd have passed."], "Si elle avait travaillé plus dur hier, elle aurait réussi.", "yesterday renvoie au passé : Type 3, had studied et would have passed.", 'yesterday points to the past: type 3, had studied and would have passed.'),
  F("Unless he won't call back, I'll go myself.", ["Unless he calls back, I'll go myself.", 'Unless he calls back, I will go myself.', "If he doesn't call back, I'll go myself.", "If he doesn't call back, I will go myself."], "À moins qu'il ne rappelle, j'irai moi-même.", "unless contient déjà la négation : pas de won't après unless. On dit Unless he calls back, ou If he doesn't call back.", 'unless already contains the negative: no won\'t after unless. Say Unless he calls back, or If he doesn\'t call back.'),
  F("If I was you, I wouldn't worry.", ["If I were you, I wouldn't worry.", 'If I were you, I would not worry.'], "Si j'étais vous, je ne m'inquiéterais pas.", "À l'écrit soutenu, on emploie were pour tous les sujets : If I were you.", 'In formal writing, use were for all subjects: If I were you.'),
  F('If they will arrive late, we will start without them.', ['If they arrive late, we will start without them.', "If they arrive late, we'll start without them."], "S'ils arrivent en retard, nous commencerons sans eux.", "Après if, on emploie le présent, jamais will : If they arrive.", 'After if, use the present, never will: If they arrive.'),
  R("Si j'avais su, j'aurais agi différemment.", ['If I had known, I would have acted differently.', 'Had I known, I would have acted differently.', 'If I had known, I would have done things differently.', "If I'd known, I would have acted differently."], 'Type 3 : If + Past Perfect, would have + participe passé. Style soutenu : Had I known.', 'Type 3: If + past perfect, would have + past participle. Formal style: Had I known.'),
  R("À moins que le budget ne soit approuvé, nous ne pourrons pas continuer.", ["Unless the budget is approved, we won't be able to continue.", 'Unless the budget is approved, we will not be able to continue.', "Unless the budget is approved, we can't continue.", 'Unless the budget is approved, we cannot continue.', "Unless the budget gets approved, we won't be able to continue."], "unless + présent, sans négation. nous ne pourrons pas se traduit par we won't be able to ou we can't.", 'unless + present, with no negative. The translation is we won\'t be able to or we can\'t.'),
  R("Si tu avais eu plus d'expérience, tu serais directeur maintenant.", ['If you had had more experience, you would be a director now.', 'If you had had more experience, you would be a manager now.', 'If you had had more experience, you would be director now.', "If you'd had more experience, you would be a director now."], "Conditionnel mixte : had had (Past Perfect de have) puis would be, car now indique le présent.", 'Mixed conditional: had had (past perfect of have) then would be, because now points to the present.'),
  R("Pourvu que les données soient exactes, le modèle fonctionnera.", ['As long as the data is accurate, the model will work.', 'Provided the data is accurate, the model will work.', 'Provided that the data is accurate, the model will work.', 'Provided the data are accurate, the model will work.', 'Provided that the data are accurate, the model will work.', 'As long as the data are accurate, the model will work.', 'Providing the data is accurate, the model will work.'], "pourvu que se traduit par provided (that) ou as long as, suivi du présent.", 'Provided (that) or as long as, followed by the present.'),
  R("Si les ingénieurs travaillaient plus vite, nous aurions déjà terminé.", ['If the engineers worked faster, we would have finished already.', 'If the engineers worked faster, we would already have finished.', 'If the engineers were working faster, we would have finished already.', 'If the engineers were working faster, we would already have finished.', 'If the engineers worked more quickly, we would have finished already.'], "Conditionnel mixte (condition présente, conséquence passée) : If + Past Simple, would have + participe passé.", 'Mixed conditional (present condition, past result): If + past simple, would have + past participle.')
];

const nivD = [
  P('Complète librement cette phrase conditionnelle dans un contexte professionnel.', 'If the project had been better managed, ...', ['If the project had been better managed, it would have been delivered on time and within budget.'], 'Type 3 : termine avec would have + participe passé.', 'Complete this conditional sentence freely in a professional context.', 'Type 3: finish with would have + past participle.'),
  P('Complète librement cette phrase conditionnelle dans un contexte professionnel.', 'Unless we invest in training now, ...', ['Unless we invest in training now, our engineers will not be able to use the new equipment safely next year.'], "unless + présent, puis will. Pas de négation après unless.", 'Complete this conditional sentence freely in a professional context.', 'unless + present, then will. No negative after unless.'),
  P('Complète librement cette phrase conditionnelle dans un contexte professionnel.', 'Provided the team meets the deadline, ...', ['Provided the team meets the deadline, we will be able to launch the product in January.'], 'provided + présent, puis will.', 'Complete this conditional sentence freely in a professional context.', 'provided + present, then will.'),
  P('Complète librement cette phrase conditionnelle dans un contexte professionnel.', 'If I were in charge of recruitment, ...', ['If I were in charge of recruitment, I would hire more junior engineers and train them in-house.'], 'Type 2 : termine avec would + verbe.', 'Complete this conditional sentence freely in a professional context.', 'Type 2: finish with would + verb.'),
  P('Complète librement cette phrase conditionnelle dans un contexte professionnel.', 'Had we known about the technical constraints earlier, ...', ['Had we known about the technical constraints earlier, we would have chosen a different design.'], "Inversion de type 3 (Had we known = If we had known) : termine avec would have + participe passé.", 'Complete this conditional sentence freely in a professional context.', 'Type 3 inversion (Had we known = If we had known): finish with would have + past participle.')
];

const bonus = [
  K("___ the system is updated, it will keep crashing.", [['Unless']], "À moins que le système ne soit mis à jour, il continuera à planter.", "unless signifie if not : If the system is not updated, it will keep crashing.", 'unless means if not: If the system is not updated, it will keep crashing.', hint('une exception, une condition négative', 'an exception, a negative condition')),
  K("You can work from home ___ you meet your targets.", [['as long as', 'provided that', 'provided', 'so long as', 'providing', 'providing that']], "Vous pouvez travailler à domicile à condition d'atteindre vos objectifs.", "Condition stricte : as long as ou provided (that), suivi du présent.", 'Strict condition: as long as or provided (that), followed by the present.', hint('condition stricte', 'strict condition')),
  K("Bring an umbrella ___ it rains.", [['in case']], "Prenez un parapluie au cas où il pleuvrait.", "in case exprime une précaution : on se prépare avant que cela arrive. If it rains voudrait dire que l'on prend le parapluie une fois la pluie arrivée.", 'in case expresses a precaution: you prepare before it happens. If it rains would mean you bring the umbrella only once the rain has come.', hint('précaution', 'precaution')),
  K("___ the data is accurate, the results will be reliable.", [['Provided', 'Provided that', 'As long as', 'So long as', 'Providing', 'Providing that']], "À condition que les données soient exactes, les résultats seront fiables.", "Condition : provided (that) ou as long as.", 'Condition: provided (that) or as long as.', hint('condition', 'condition')),
  K("I won't attend ___ you give me a reason to.", [['unless']], "Je n'y assisterai pas à moins que tu ne me donnes une raison de le faire.", "unless = if not : I won't attend if you don't give me a reason. La négation est déjà dans unless.", 'unless = if not: I won\'t attend if you don\'t give me a reason. The negative is already in unless.', hint('exception', 'exception'))
];

const devoir = [
  K("If you ___ (mix) blue and yellow, you ___ (get) green.", [['mix'], ['get']], "Si tu mélanges du bleu et du jaune, tu obtiens du vert.", 'Type 0 : vérité générale, présent dans les deux propositions.', 'Type 0: general truth, present in both clauses.'),
  K("If she ___ (study) medicine, she ___ (be) a doctor now.", [['had studied'], ['would be']], "Si elle avait étudié la médecine, elle serait médecin maintenant.", 'Conditionnel mixte : had studied (passé), would be (présent).', 'Mixed conditional: had studied (past), would be (present).'),
  K("If they ___ (test) the system properly, the bug ___ (not / appear).", [['had tested'], ["wouldn't have appeared"]], "S'ils avaient testé correctement le système, le bogue ne serait pas apparu.", 'Type 3 : had tested, wouldn\'t have appeared.', 'Type 3: had tested, wouldn\'t have appeared.'),
  K("I ___ (help) you if I ___ (have) more time right now.", [['would help'], ['had']], "Je t'aiderais si j'avais plus de temps en ce moment.", 'Type 2 : would help, had. right now indique le présent.', 'Type 2: would help, had. right now points to the present.'),
  K("Unless he ___ (apologise), she ___ (not / forgive) him.", [['apologises', 'apologizes'], ["won't forgive"]], "À moins qu'il ne s'excuse, elle ne lui pardonnera pas.", 'unless + présent (apologises), puis will not.', 'unless + present (apologises), then will not.'),
  K("If the data ___ (show) a clear trend, we ___ (report) it immediately.", [['shows', 'show'], ['will report']], "Si les données montrent une tendance nette, nous la signalerons immédiatement.", "Type 1 : présent après if, will dans la principale. data s'emploie au singulier (shows) ou au pluriel (show).", 'Type 1: present after if, will in the main clause. data is used as singular (shows) or plural (show).'),
  K("She ___ (get) the job if she ___ (prepare) better for the interview.", [['would have got', 'would have gotten'], ['had prepared']], "Elle aurait obtenu le poste si elle s'était mieux préparée pour l'entretien.", 'Type 3 : had prepared, would have got (got en anglais britannique, gotten en américain).', 'Type 3: had prepared, would have got (got in British English, gotten in American English).'),
  K("What ___ you ___ (do) if the power ___ (go) out during your presentation?", [['would'], ['do'], ['went']], "Que ferais-tu si le courant était coupé pendant ta présentation ?", 'Type 2 en question : would you do, went. go out : went out au passé.', 'Type 2 as a question: would you do, went. go out: went out in the past.'),
  K("If I ___ (be) in your position, I ___ (ask) for more resources.", [['were'], ['would ask']], "Si j'étais à ta place, je demanderais plus de ressources.", 'Type 2 : were, would ask.', 'Type 2: were, would ask.'),
  K("If they ___ (not / delay) the launch, the product ___ (be) a success.", [["hadn't delayed"], ['would have been']], "S'ils n'avaient pas retardé le lancement, le produit aurait été un succès.", 'Type 3 : hadn\'t delayed, would have been.', 'Type 3: hadn\'t delayed, would have been.'),
  K("Had she ___ (know) about the risk, she ___ (take) more precautions.", [['known'], ['would have taken']], "Si elle avait connu le risque, elle aurait pris plus de précautions.", "Inversion de type 3 : Had she known = If she had known. known (participe passé), puis would have taken.", 'Type 3 inversion: Had she known = If she had known. known (past participle), then would have taken.'),
  K("Provided the funding ___ (be) approved, we ___ (start) next month.", [['is'], ['will start']], "À condition que le financement soit approuvé, nous commencerons le mois prochain.", 'provided + présent (is), puis will start. is approved : le passif se construit avec be.', 'provided + present (is), then will start. is approved: the passive uses be.'),
  K("If more engineers ___ (be) hired, the project ___ (be) completed already.", [['had been'], ['would have been']], "Si plus d'ingénieurs avaient été embauchés, le projet serait déjà terminé.", 'Type 3 au passif : had been hired, would have been completed.', 'Type 3 in the passive: had been hired, would have been completed.'),
  K("Unless they ___ (improve) communication, mistakes ___ (keep) happening.", [['improve'], ['will keep']], "À moins qu'ils n'améliorent la communication, les erreurs continueront de se produire.", 'unless + présent (improve), will keep + -ing.', 'unless + present (improve), will keep + -ing.'),
  K("If I ___ (be) more tech-savvy when I was a student, I ___ (choose) a different career.", [['had been'], ['would have chosen']], "Si j'avais été plus à l'aise avec la technologie quand j'étais étudiant, j'aurais choisi une autre carrière.", 'Type 3 : had been, would have chosen. when I was a student situe le passé.', 'Type 3: had been, would have chosen. when I was a student sets the past.')
];

const m7a1 = [
  K("If you heat iron to 1538°C, it ___ (melt).", [['melts']], "Si on chauffe le fer à 1 538 °C, il fond.", 'Type 0 : vérité scientifique, présent. it est singulier : melts.', 'Type 0: scientific truth, present. it is singular: melts.'),
  K("If she ___ (study) harder, she will pass.", [['studies']], "Si elle travaille plus dur, elle réussira.", 'Type 1 : If + présent, will + verbe. she demande le -s : studies.', 'Type 1: If + present, will + verb. she takes the -s: studies.'),
  K("If I ___ (be) you, I would accept the offer.", [['were']], "Si j'étais toi, j'accepterais l'offre.", 'Type 2 : were après if.', 'Type 2: were after if.'),
  K("If they ___ (test) it properly, the bug wouldn't have appeared.", [['had tested']], "S'ils l'avaient testé correctement, le bogue ne serait pas apparu.", "Type 3 : wouldn't have appeared dans la principale, donc had tested après if.", 'Type 3: wouldn\'t have appeared in the main clause, so had tested after if.'),
  K("Unless you ___ (sign) the NDA, we cannot proceed.", [['sign']], "À moins que vous ne signiez l'accord de confidentialité, nous ne pouvons pas continuer.", 'unless + présent, sans négation.', 'unless + present, with no negative.')
];
const m7a2 = [
  F('If I would have a laptop, I would work remotely.', ['If I had a laptop, I would work remotely.', "If I had a laptop, I'd work remotely."], "Si j'avais un ordinateur portable, je travaillerais à distance.", "Après if, on n'emploie pas would : If I had.", 'After if, do not use would: If I had.'),
  F("If she would study, she'd pass.", ["If she studied, she'd pass.", 'If she studied, she would pass.', "If she studies, she'll pass.", 'If she studies, she will pass.'], "Si elle travaillait, elle réussirait.", "Pas de would après if. Type 2 : If she studied, she'd pass. Type 1 : If she studies, she'll pass.", 'No would after if. Type 2: If she studied, she\'d pass. Type 1: If she studies, she\'ll pass.'),
  F("Unless he won't reply, I'll contact him.", ["Unless he replies, I'll contact him.", 'Unless he replies, I will contact him.', "If he doesn't reply, I'll contact him.", "If he doesn't reply, I will contact him."], "À moins qu'il ne réponde, je le contacterai.", "unless contient déjà la négation : Unless he replies.", 'unless already contains the negative: Unless he replies.'),
  F("If I was you, I'd reconsider.", ["If I were you, I'd reconsider.", 'If I were you, I would reconsider.'], "Si j'étais vous, je reconsidérerais.", "À l'écrit soutenu : If I were you.", 'In formal writing: If I were you.')
];
const m7b = [
  K("If I ___ (study) CS, I would be a developer now.", [['had studied']], "Si j'avais étudié l'informatique, je serais développeur maintenant.", 'Conditionnel mixte : had studied (passé), would be (présent).', 'Mixed conditional: had studied (past), would be (present).'),
  K("If she ___ (be) more careful, she would have avoided the error.", [['were', 'had been']], "Si elle était plus prudente, elle aurait évité l'erreur.", "Conditionnel mixte : were (état présent) et would have avoided. had been est aussi accepté.", 'Mixed conditional: were (present state) and would have avoided. had been is also accepted.'),
  K("Provided the dataset ___ (be) accurate, the model will work.", [['is']], "À condition que le jeu de données soit exact, le modèle fonctionnera.", 'provided + présent : is.', 'provided + present: is.'),
  K("Unless the budget ___ (approve), we cannot start.", [['is approved']], "À moins que le budget ne soit approuvé, nous ne pouvons pas commencer.", "unless + présent, ici au passif : is approved.", 'unless + present, here in the passive: is approved.'),
  K("Had we ___ (know) earlier, we would have acted differently.", [['known']], "Si nous l'avions su plus tôt, nous aurions agi différemment.", "Inversion de type 3 : Had we known = If we had known.", 'Type 3 inversion: Had we known = If we had known.')
];
const INV = T("Reformule avec une inversion, sans utiliser if.", 'Rewrite with an inversion, without using if.');
const m7c = [
  INV('If I had seen the email, I would have replied sooner.', ['Had I seen the email, I would have replied sooner.'], "Si j'avais vu le courriel, j'aurais répondu plus tôt.", 'Type 3 : If I had seen devient Had I seen.', 'Type 3: If I had seen becomes Had I seen.'),
  INV('If the company were to relocate, many employees would resign.', ['Were the company to relocate, many employees would resign.'], "Si l'entreprise devait déménager, beaucoup d'employés démissionneraient.", 'Type 2 formel : If ... were to devient Were ... to.', 'Formal type 2: If ... were to becomes Were ... to.'),
  INV("If you should have any questions, don't hesitate to ask.", ["Should you have any questions, don't hesitate to ask.", 'Should you have any questions, do not hesitate to ask.'], "Si vous avez des questions, n'hésitez pas à les poser.", 'Type 1 formel : If you should have devient Should you have.', 'Formal type 1: If you should have becomes Should you have.'),
  INV('If we had tested it earlier, we would have caught the bug.', ['Had we tested it earlier, we would have caught the bug.'], "Si nous l'avions testé plus tôt, nous aurions repéré le bogue.", 'Type 3 : If we had tested devient Had we tested.', 'Type 3: If we had tested becomes Had we tested.')
];
const m7d = [
  W('if / overheats / the / sensor / it / will / shut / down / automatically', ['If the sensor overheats, it will shut down automatically.'], "Si le capteur surchauffe, il s'arrête automatiquement.", 'Type 1 : If + présent, will + verbe.', 'Type 1: If + present, will + verb.'),
  W('were / the / deadline / moved / we / would / finish / on / time', ['Were the deadline moved, we would finish on time.', 'If the deadline were moved, we would finish on time.'], "Si la date limite était repoussée, nous finirions à temps.", 'Type 2 avec inversion : Were the deadline moved = If the deadline were moved.', 'Type 2 with inversion: Were the deadline moved = If the deadline were moved.'),
  W('had / they / backed / up / the / data / they / wouldn\'t / have / lost / it', ["Had they backed up the data, they wouldn't have lost it."], "S'ils avaient sauvegardé les données, ils ne les auraient pas perdues.", 'Type 3 avec inversion : Had they backed up.', 'Type 3 with inversion: Had they backed up.'),
  W('unless / the / client / confirms / we / cannot / order / the / parts', ['Unless the client confirms, we cannot order the parts.', "Unless the client confirms, we can't order the parts."], "À moins que le client ne confirme, nous ne pouvons pas commander les pièces.", 'unless + présent, puis la conséquence.', 'unless + present, then the result.'),
  W('were / if / the / price / lower / more / customers / would / buy / it', ['If the price were lower, more customers would buy it.'], "Si le prix était plus bas, plus de clients l'achèteraient.", 'Type 2 : If + were, would + verbe.', 'Type 2: If + were, would + verb.'),
  W('provided / the / connection / is / stable / the / upload / will / finish', ['Provided the connection is stable, the upload will finish.', 'Provided that the connection is stable, the upload will finish.'], "À condition que la connexion soit stable, le téléversement se terminera.", 'provided + présent, puis will.', 'provided + present, then will.'),
  W('had / if / you / asked / earlier / I / could / have / booked / the / room', ['If you had asked earlier, I could have booked the room.'], "Si tu avais demandé plus tôt, j'aurais pu réserver la salle.", 'Type 3 : If + had asked, could have booked.', 'Type 3: If + had asked, could have booked.'),
  W('should / the / system / fail / contact / the / support / team / immediately', ['Should the system fail, contact the support team immediately.'], "Si le système tombe en panne, contactez immédiatement l'équipe d'assistance.", 'Type 1 formel avec inversion : Should the system fail = If the system should fail.', 'Formal type 1 with inversion: Should the system fail = If the system should fail.')
];
const th = [
  R("Si le capteur surchauffe, il s'arrêtera automatiquement.", ['If the sensor overheats, it will switch off automatically.', 'If the sensor overheats, it will shut down automatically.', 'If the sensor overheats, it will stop automatically.', 'If the sensor overheats, it will turn itself off automatically.'], "Type 1 : If + présent, will + verbe. s'arrêtera se dit shut down, switch off ou stop.", 'Type 1: If + present, will + verb. shut down, switch off and stop are all accepted.'),
  R("Si la date limite était repoussée, nous finirions à temps.", ['If the deadline were moved, we would finish on time.', 'If the deadline were postponed, we would finish on time.', 'Were the deadline moved, we would finish on time.', 'If the deadline was moved, we would finish on time.', 'Were the deadline postponed, we would finish on time.'], "Type 2 : If + were, would + verbe. repousser se dit move ou postpone.", 'Type 2: If + were, would + verb. Both move and postpone are accepted.'),
  R("S'ils avaient sauvegardé les données, ils ne les auraient pas perdues.", ["If they had backed up the data, they wouldn't have lost it.", "If they had saved the data, they wouldn't have lost it.", "Had they backed up the data, they wouldn't have lost it.", "If they had backed up the data, they would not have lost it.", "If they had backed up the data, they wouldn't have lost them."], "Type 3 : If + had backed up, wouldn't have lost. Style soutenu : Had they backed up.", 'Type 3: If + had backed up, wouldn\'t have lost. Formal style: Had they backed up.'),
  R("À moins que le client ne confirme, nous ne pouvons pas commander les pièces.", ['Unless the client confirms, we are not able to order the parts.', 'Unless the client confirms, we cannot order the parts.', "Unless the client confirms, we can't order the parts.", "If the client doesn't confirm, we cannot order the parts.", "If the client doesn't confirm, we can't order the parts."], "unless + présent, sans négation. On peut aussi employer If ... doesn't confirm.", 'unless + present, with no negative. You can also use If ... doesn\'t confirm.'),
  R("Si le prix était plus bas, plus de clients l'achèteraient.", ['If the price were lower, more customers would purchase it.', 'If the price were lower, more customers would buy it.', 'If the price was lower, more customers would buy it.', 'If it were cheaper, more customers would buy it.', 'If the price were lower, more people would buy it.'], "Type 2 : If + were, would + verbe.", 'Type 2: If + were, would + verb.'),
  R("À condition que la connexion soit stable, le téléchargement se terminera.", ['Provided that the connection is stable, the download will finish.', 'Provided the connection is stable, the download will finish.', 'As long as the connection is stable, the download will finish.', 'Provided that the connection is stable, the download will be completed.', 'Provided the connection is stable, the download will be completed.'], "à condition que se traduit par provided (that) ou as long as, suivi du présent.", 'Strict condition: provided (that) or as long as, followed by the present.'),
  R("Si tu avais demandé plus tôt, j'aurais pu réserver la salle.", ['If you had asked sooner, I could have booked the room.', 'If you had asked earlier, I could have booked the room.', 'If you had asked earlier, I could have reserved the room.', 'Had you asked earlier, I could have booked the room.', 'If you had asked sooner, I could have reserved the room.'], "Type 3 : If + had asked, could have booked. j'aurais pu = could have.", 'Type 3: If + had asked, could have booked. could have expresses the lost possibility.')
];

const SK = (fr, en) => [fr, en];
export const G07 = {
  id: 'G07',
  title: 'Les phrases conditionnelles (Conditionals)',
  coursUrl: '',
  skills: {
    '*': SK('Conditionnels (mélange)', 'Conditionals (mixed)'),
    'g07-guidee-a': SK('Conditionnels : types 0 et 1', 'Conditionals: types 0 and 1'),
    'g07-niv-a': SK('Conditionnels : types 0 et 1', 'Conditionals: types 0 and 1'),
    'g07-guidee-b': SK('Conditionnels : types 2, 3 et mixtes', 'Conditionals: types 2, 3 and mixed'),
    'g07-niv-b': SK('Conditionnels : types 2, 3 et mixtes', 'Conditionals: types 2, 3 and mixed'),
    'g07-m7a-1': SK('Conditionnels : types 0, 1, 2 et 3', 'Conditionals: types 0, 1, 2 and 3'),
    'g07-m7b': SK('Conditionnels : mixtes, unless, provided', 'Conditionals: mixed, unless, provided'),
    'g07-bonus': SK('Unless, provided, as long as, in case', 'Unless, provided, as long as, in case'),
    'g07-m7c': SK('Conditionnels : inversion formelle', 'Conditionals: formal inversion'),
    'g07-m7d': SK('Ordre des mots', 'Word order'),
    'g07-niv-c': SK('Conditionnels : corrections et thème', 'Conditionals: corrections and translation'),
    'g07-m7a-2': SK('Conditionnels : corrections et thème', 'Conditionals: corrections and translation')
  },
  sets: [
    S('g07-guidee-a', FICHE, ['Série guidée A : types 0 et 1', 'Guided set A: types 0 and 1'], 'B1', ['Complète avec la bonne forme. Chaque phrase propose un indice.', 'Complete with the correct form. Each sentence comes with a hint.'], guideeA),
    S('g07-guidee-b', FICHE, ['Série guidée B : types 2 et 3, mixtes', 'Guided set B: types 2 and 3, mixed'], 'B1+', ['Types 2 et 3 et conditionnels mixtes.', 'Types 2 and 3 and mixed conditionals.'], guideeB),
    S('g07-niv-a', FICHE, ['Niveau A : types 0 et 1', 'Level A: types 0 and 1'], 'B1', [CF, CFE], nivA),
    S('g07-niv-b', FICHE, ['Niveau B : types 2 et 3', 'Level B: types 2 and 3'], 'B1+', [CF, CFE], nivB),
    S('g07-niv-c', FICHE, ['Niveau C : corrections et thème', 'Level C: corrections and translation'], 'B2', ['Corrige cinq phrases fautives, puis traduis cinq phrases.', 'Correct five faulty sentences, then translate five sentences.'], nivC),
    S('g07-niv-d', FICHE, ['Niveau D : production libre', 'Level D: free production'], 'B2+', ['Complète librement, puis compare avec le modèle.', 'Complete freely, then compare with the model.'], nivD),
    S('g07-bonus', FICHE, ['Bonus : unless, provided, as long as, in case', 'Bonus: unless, provided, as long as, in case'], 'B2+', ['Complète avec unless, provided (that), as long as ou in case.', 'Complete with unless, provided (that), as long as or in case.'], bonus),
    S('g07-devoir', FICHE, ['Devoir maison', 'Homework'], 'B1+', ['Quinze phrases à compléter avec le bon type conditionnel.', 'Fifteen sentences to complete with the right conditional type.'], devoir),
    S('g07-m7a-1', MURPHY, ['Unité 7A : types 0, 1, 2, 3 (1/2)', 'Unit 7A: types 0, 1, 2, 3 (1/2)'], 'B1', ['Complète avec la bonne forme.', 'Complete with the correct form.'], m7a1),
    S('g07-m7a-2', MURPHY, ['Unité 7A : corriger les phrases (2/2)', 'Unit 7A: correcting sentences (2/2)'], 'B1+', ['Corrige les erreurs.', 'Correct the mistakes.'], m7a2),
    S('g07-m7b', MURPHY, ['Unité 7B : mixtes, unless, provided', 'Unit 7B: mixed, unless, provided'], 'B1+', ['Complète.', 'Complete.'], m7b),
    S('g07-m7c', MURPHY, ['Unité 7C : inversion formelle', 'Unit 7C: formal inversion'], 'B2', ['Had I known, Were I to, Should you : reformule sans if.', 'Had I known, Were I to, Should you: rewrite without if.'], m7c),
    S('g07-m7d', MURPHY, ['Unité 7D : remettre les mots dans l\'ordre', 'Unit 7D: sentence building'], 'B1+', ['Écris la phrase complète avec les mots dans le bon ordre.', 'Write the complete sentence with the words in the right order.'], m7d),
    S('g07-th', MURPHY, ['Unité TH : thème grammatical', 'Unit TH: translation'], 'B1+', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], th)
  ],
  recap: {
    blocks: [
      {
        title: 'Les types de conditionnelles',
        forms: [
          ['Type 0', 'If + présent, présent : If you heat water, it evaporates. (toujours vrai)'],
          ['Type 1', 'If + présent, will + verbe : If I study hard, I will pass. (probable)'],
          ['Type 2', 'If + Past Simple, would + verbe : If I had a lab, I would test this. (peu probable ou irréel au présent)'],
          ['Type 3', 'If + Past Perfect, would have + participe passé : If I had studied, I would have passed. (regret sur le passé)'],
          ['Mixte (passé puis présent)', 'If + Past Perfect, would + verbe : If I had studied, I would be an expert now.'],
          ['Mixte (présent puis passé)', 'If + Past Simple, would have + participe passé : If I were smarter, I would have solved it.']
        ],
        uses: ["Moyen mnémotechnique : 0 donne présent, 1 donne will, 2 donne would, 3 donne would have."]
      },
      {
        title: 'Points de vigilance',
        forms: [
          ['If I were', 'Type 2 : were pour tous les sujets en style soutenu (If I were you).'],
          ['Unless', 'unless = if not : pas de double négation (Unless you study, you will fail).'],
          ['Virgule', "If en tête de phrase : virgule. If en seconde position : pas de virgule."],
          ['Provided / As long as', 'provided (that) et as long as = if, avec une condition stricte.'],
          ['In case', "in case exprime une précaution : Bring an umbrella in case it rains."],
          ['Inversion', 'Had I known... / Were I to... / Should you... remplacent if en style soutenu.']
        ]
      }
    ],
    tables: [],
    notes: ["Jamais will ni would après if dans la subordonnée : If I had, pas If I would have."],
    rule: "0 donne présent, 1 donne will, 2 donne would, 3 donne would have."
  },
  enMeta: {
    title: 'Conditionals',
    recap: {
      blocks: [
        {
          title: 'The types of conditionals',
          forms: [
            ['Type 0', 'If + present, present: If you heat water, it evaporates. (always true)'],
            ['Type 1', 'If + present, will + verb: If I study hard, I will pass. (probable)'],
            ['Type 2', 'If + past simple, would + verb: If I had a lab, I would test this. (unlikely or unreal in the present)'],
            ['Type 3', 'If + past perfect, would have + past participle: If I had studied, I would have passed. (regret about the past)'],
            ['Mixed (past then present)', 'If + past perfect, would + verb: If I had studied, I would be an expert now.'],
            ['Mixed (present then past)', 'If + past simple, would have + past participle: If I were smarter, I would have solved it.']
          ],
          uses: ['Memory aid: 0 gives present, 1 gives will, 2 gives would, 3 gives would have.']
        },
        {
          title: 'Points to watch',
          forms: [
            ['If I were', 'Type 2: were for all subjects in careful English (If I were you).'],
            ['Unless', 'unless = if not: no double negative (Unless you study, you will fail).'],
            ['Comma', 'If at the start of the sentence: comma. If in second position: no comma.'],
            ['Provided / As long as', 'provided (that) and as long as = if, with a strict condition.'],
            ['In case', 'in case expresses a precaution: Bring an umbrella in case it rains.'],
            ['Inversion', 'Had I known... / Were I to... / Should you... replace if in formal English.']
          ]
        }
      ],
      tables: [],
      notes: ['Never will or would after if in the subordinate clause: If I had, not If I would have.'],
      rule: '0 gives present, 1 gives will, 2 gives would, 3 gives would have.'
    }
  }
};
