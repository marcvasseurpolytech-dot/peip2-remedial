// G06 : Reported Speech (le discours indirect)
// Contenu reconstruit à partir de la fiche élève, du supplément Murphy et du corrigé enseignant du hub.
import { S, FICHE, MURPHY, C, T, F, R, W, P, ex, cl, who } from './dsl2.js';

const RS = T('Transforme au discours indirect.', 'Put the sentence into reported speech.');
const ASK = ['if', 'whether'];
const q = (pre, rest) => ASK.map(w => `${pre} ${w} ${rest}`);

const guideeA = [
  C("'I am very tired,' she said. She said ___.", [cl(['she was very tired'])], "Elle a dit qu'elle était très fatiguée.",
    "Present Simple devient Past Simple : am devient was. Le pronom I devient she (c'est elle qui parle).",
    'Present simple becomes past simple: am becomes was. The pronoun I becomes she (she is the speaker).', 'am devient ?', 'what does am become?'),
  C("'We will finish tomorrow,' he told me. He told me ___.", [cl(['they would finish the next day', 'we would finish the next day'])], "Il m'a dit qu'ils finiraient le lendemain.",
    "will devient would. tomorrow devient the next day (ou the following day). we devient they, ou reste we si celui qui rapporte fait partie du groupe.",
    'will becomes would. tomorrow becomes the next day (or the following day). we becomes they, or stays we if the reporter is part of the group.', 'will → ?  /  tomorrow → ?', 'will → ?  /  tomorrow → ?'),
  C("'I have already sent the report,' she said. She said ___.", [cl(['she had already sent the report'])], "Elle a dit qu'elle avait déjà envoyé le rapport.",
    'Present Perfect devient Past Perfect : have sent devient had sent.', 'Present perfect becomes past perfect: have sent becomes had sent.', 'le Present Perfect recule', 'the present perfect shifts back'),
  C("'I don't understand the question,' he said. He said ___.", [cl(['he didn\'t understand the question'])], "Il a dit qu'il ne comprenait pas la question.",
    "Le présent devient passé : don't understand devient didn't understand.", "The present becomes the past: don't understand becomes didn't understand.", 'présent → passé', 'present → past'),
  C("'The meeting is starting now,' she told us. She told us ___.", [cl(['the meeting was starting then', 'the meeting was starting at that moment'])], "Elle nous a dit que la réunion commençait à ce moment-là.",
    'Present Continuous devient Past Continuous : is starting devient was starting. now devient then.', 'Present continuous becomes past continuous: is starting becomes was starting. now becomes then.', 'continu → continu au passé', 'continuous → past continuous'),
  C("'I can help you with this,' he said. He said ___.", [cl(['he could help me with that'])], "Il a dit qu'il pouvait m'aider avec ça.",
    'can devient could. you devient me, this devient that.', 'can becomes could. you becomes me, this becomes that.', 'can → ?', 'can → ?'),
  C("'We must submit the form today,' the manager said. The manager said ___.", [cl(['they had to submit the form that day', 'we had to submit the form that day'])], "Le responsable a dit qu'ils devaient remettre le formulaire ce jour-là.",
    'must devient had to. today devient that day.', 'must becomes had to. today becomes that day.', 'must → ?  /  today → ?', 'must → ?  /  today → ?'),
  C("'I worked here for ten years,' she told them. She told them ___.", [cl(['she had worked there for ten years'])], "Elle leur a dit qu'elle avait travaillé là pendant dix ans.",
    'Past Simple devient Past Perfect : worked devient had worked. here devient there.', 'Past simple becomes past perfect: worked becomes had worked. here becomes there.', 'le passé recule d\'un cran', 'the past shifts one step back'),
  C("'The company may relocate next year,' he said. He said ___.", [cl(['the company might relocate the following year'])], "Il a dit que l'entreprise pourrait déménager l'année suivante.",
    'may devient might. next year devient the following year.', 'may becomes might. next year becomes the following year.', 'may → ?  /  next year → ?', 'may → ?  /  next year → ?'),
  C("'I have been working on this since January,' he said. He said ___.", [cl(['he had been working on it since January', 'he had been working on that since January'])], "Il a dit qu'il travaillait dessus depuis janvier.",
    'Present Perfect Continuous devient Past Perfect Continuous : have been working devient had been working.', 'Present perfect continuous becomes past perfect continuous: have been working becomes had been working.', 'have been → ?', 'have been → ?')
];

const guideeB = [
  C("'Are you coming to the meeting?' she asked. She asked ___.", [q('', 'I was coming to the meeting').map(x => x.trim()).concat(q('', 'I were coming to the meeting').map(x => x.trim()))], "Elle a demandé si je venais à la réunion.",
    "Question oui / non : if ou whether + sujet + verbe, sans inversion et sans point d'interrogation. are you coming devient I was coming.",
    'Yes/no question: if or whether + subject + verb, with no inversion and no question mark. are you coming becomes I was coming.', 'oui / non → if', 'yes/no → if'),
  C("'Where do you live?' he asked me. He asked me ___.", [['where I lived']], "Il m'a demandé où j'habitais.",
    "Question en wh- : wh- + sujet + verbe. L'auxiliaire do disparaît : do you live devient I lived.", 'Wh- question: wh- word + subject + verb. The auxiliary do disappears: do you live becomes I lived.', 'where + sujet + verbe', 'where + subject + verb'),
  C("'What time does the conference start?' she asked. She asked ___.", [['what time the conference started']], "Elle a demandé à quelle heure la conférence commençait.",
    "wh- + sujet + verbe au passé. does start devient started : plus d'auxiliaire.", 'wh- word + subject + verb in the past. does start becomes started: no more auxiliary.', 'what time + sujet + verbe', 'what time + subject + verb'),
  C("'Have you finished the project?' he asked. He asked ___.", [q('', 'I had finished the project').map(x => x.trim())], "Il a demandé si j'avais terminé le projet.",
    'Question oui / non : if ou whether. have finished devient had finished (Past Perfect).', 'Yes/no question: if or whether. have finished becomes had finished (past perfect).', 'if + Past Perfect', 'if + past perfect'),
  C("'Why didn't you attend the lecture?' she asked. She asked ___.", [["why I hadn't attended the lecture"]], "Elle a demandé pourquoi je n'avais pas assisté au cours.",
    "Question en wh- : why + sujet + verbe. didn't attend devient hadn't attended (Past Perfect), sans do.", "Wh- question: why + subject + verb. didn't attend becomes hadn't attended (past perfect), with no do.", 'why + Past Perfect', 'why + past perfect'),
  C("'How long have you worked here?' he asked. He asked ___.", [['how long I had worked there']], "Il a demandé depuis combien de temps je travaillais là.",
    'how long + sujet + verbe. have worked devient had worked, here devient there.', 'how long + subject + verb. have worked becomes had worked, here becomes there.', 'how long + Past Perfect', 'how long + past perfect'),
  C("'Can you speak Japanese?' she asked. She asked ___.", [q('', 'I could speak Japanese').map(x => x.trim())], "Elle a demandé si je parlais japonais.",
    'Question oui / non : if ou whether. can devient could.', 'Yes/no question: if or whether. can becomes could.', 'if + could', 'if + could'),
  C("'Who sent the email?' the director asked. The director asked ___.", [['who had sent the email']], "Le directeur a demandé qui avait envoyé le courriel.",
    "who est le sujet : il reste en tête, suivi du verbe. sent devient had sent (Past Perfect). Pas de do.", 'who is the subject: it stays first, followed by the verb. sent becomes had sent (past perfect). No do.', 'who (sujet) + Past Perfect', 'who (subject) + past perfect'),
  C("'What will you do if the system fails?' she asked. She asked ___.", [['what I would do if the system failed']], "Elle a demandé ce que je ferais si le système tombait en panne.",
    'will devient would, et la proposition en if passe au passé : fails devient failed.', 'will becomes would, and the if clause shifts to the past: fails becomes failed.', 'what + would + sujet + do', 'what + would + subject + do'),
  C("'Did anyone notice the error?' he asked. He asked ___.", [q('', 'anyone had noticed the error').map(x => x.trim())], "Il a demandé si quelqu'un avait remarqué l'erreur.",
    'Question oui / non : if ou whether. Did notice devient had noticed (Past Perfect).', 'Yes/no question: if or whether. Did notice becomes had noticed (past perfect).', 'if + anyone + had noticed', 'if + anyone + had noticed')
];

const nivA = [
  RS("'I work here every day,' he said.", ex(['He said he worked there every day.']), "Il a dit qu'il travaillait là tous les jours.", 'Present Simple devient Past Simple : work devient worked. here devient there.', 'Present simple becomes past simple: work becomes worked. here becomes there.'),
  RS("'We are building a new factory,' she told us.", ex(['She told us they were building a new factory.', 'She told us we were building a new factory.']), "Elle nous a dit qu'ils construisaient une nouvelle usine.", 'Present Continuous devient Past Continuous : are building devient were building. we devient they (ou reste we si nous sommes concernés).', 'Present continuous becomes past continuous: are building becomes were building. we becomes they (or stays we if the listeners are included).'),
  RS("'I can help you with the project,' he said.", ex(['He said he could help me with the project.']), "Il a dit qu'il pouvait m'aider pour le projet.", 'can devient could. you devient me.', 'can becomes could. you becomes me.'),
  RS("'I passed the exam,' she said.", ex(['She said she had passed the exam.']), "Elle a dit qu'elle avait réussi l'examen.", 'Past Simple devient Past Perfect : passed devient had passed.', 'Past simple becomes past perfect: passed becomes had passed.'),
  RS("'The results will be ready tomorrow,' he told me.", ex(['He told me the results would be ready the next day.']), "Il m'a dit que les résultats seraient prêts le lendemain.", 'will devient would. tomorrow devient the next day (ou the following day).', 'will becomes would. tomorrow becomes the next day (or the following day).'),
  RS("'I had already finished when you called,' she said.", ex(['She said she had already finished when I had called.', 'She said she had already finished when I called.']), "Elle a dit qu'elle avait déjà fini quand j'avais appelé.", "Le Past Perfect ne recule pas davantage : had finished reste had finished. you called devient I called (ou I had called).", 'The past perfect does not shift further: had finished stays had finished. you called becomes I called (or I had called).'),
  RS("'We must submit the report by Friday,' the manager said.", ex(['The manager said they had to submit the report by Friday.', 'The manager said we had to submit the report by Friday.']), "Le responsable a dit qu'ils devaient remettre le rapport avant vendredi.", 'must devient had to. we devient they (ou reste we).', 'must becomes had to. we becomes they (or stays we).'),
  RS("'I don't know the answer,' he admitted.", ex(["He admitted he didn't know the answer."]), "Il a admis qu'il ne connaissait pas la réponse.", "Le verbe introducteur admitted remplace said. don't know devient didn't know.", 'The reporting verb admitted replaces said. don\'t know becomes didn\'t know.'),
  RS("'She will be promoted next month,' the director told us.", ex(['The director told us she would be promoted the following month.']), "Le directeur nous a dit qu'elle serait promue le mois suivant.", 'will be promoted devient would be promoted. next month devient the following month.', 'will be promoted becomes would be promoted. next month becomes the following month.'),
  RS("'I have been working on this for three weeks,' he said.", ex(['He said he had been working on it for three weeks.', 'He said he had been working on that for three weeks.']), "Il a dit qu'il travaillait dessus depuis trois semaines.", 'Present Perfect Continuous devient Past Perfect Continuous : had been working. this devient it ou that.', 'Present perfect continuous becomes past perfect continuous: had been working. this becomes it or that.')
];

const nivB = [
  RS("'Are you studying for the test?' she asked me.", q('She asked me', 'I was studying for the test.'), "Elle m'a demandé si j'étudiais pour le test.", "Question oui / non : if ou whether + sujet + verbe, sans inversion.", 'Yes/no question: if or whether + subject + verb, with no inversion.'),
  RS("'Where does he work?' I asked.", ['I asked where he worked.'], "J'ai demandé où il travaillait.", "Question en wh- : where + sujet + verbe. does disparaît : he worked.", 'Wh- question: where + subject + verb. does disappears: he worked.'),
  RS("'What time did the meeting start?' she asked.", ['She asked what time the meeting had started.'], "Elle a demandé à quelle heure la réunion avait commencé.", 'did start devient had started. Pas de did dans la question indirecte.', 'did start becomes had started. No did in the indirect question.'),
  RS("'Have you ever been to Japan?' he asked me.", q('He asked me', 'I had ever been to Japan.'), "Il m'a demandé si j'étais déjà allé au Japon.", 'have been devient had been (Past Perfect). Question oui / non : if ou whether.', 'have been becomes had been (past perfect). Yes/no question: if or whether.'),
  RS("'Why aren't you attending the class?' she asked.", ["She asked why I wasn't attending the class."], "Elle a demandé pourquoi je n'assistais pas au cours.", "aren't attending devient wasn't attending. Pas d'inversion.", "aren't attending becomes wasn't attending. No inversion."),
  RS("'Don't forget your badge,' she told me.", ['She told me not to forget my badge.'], "Elle m'a dit de ne pas oublier mon badge.", "Ordre négatif : told + personne + not to + verbe de base. your devient my.", 'Negative command: told + person + not to + base verb. your becomes my.'),
  RS("'Can you explain the results?' he asked.", [...q('He asked', 'I could explain the results.'), ...q('He asked me', 'I could explain the results.')], "Il a demandé si je pouvais expliquer les résultats.", 'can devient could. Question oui / non : if ou whether.', 'can becomes could. Yes/no question: if or whether.'),
  RS("'We were testing the equipment when it broke,' they said.", ex(['They said they had been testing the equipment when it broke.', 'They said they had been testing the equipment when it had broken.']), "Ils ont dit qu'ils testaient le matériel quand il est tombé en panne.", 'Past Continuous devient Past Perfect Continuous : had been testing. when it broke peut rester au Past Simple.', 'Past continuous becomes past perfect continuous: had been testing. when it broke can stay in the past simple.'),
  RS("'I'll call you back later,' she promised.", ex(['She promised she would call me back later.', 'She promised to call me back later.']), "Elle a promis de me rappeler plus tard.", "will devient would, ou on emploie promise + to + verbe. you devient me.", 'will becomes would, or use promise + to + verb. you becomes me.'),
  RS("'The company has just announced its new policy,' the CEO said.", ex(['The CEO said the company had just announced its new policy.']), "Le PDG a dit que l'entreprise venait d'annoncer sa nouvelle politique.", 'has announced devient had announced. its ne change pas.', 'has announced becomes had announced. its does not change.')
];

const nivC = [
  F('She said me she was tired.', ex(['She said she was tired.', 'She told me she was tired.']), "Elle m'a dit qu'elle était fatiguée.", "say n'est jamais suivi d'un objet personnel. Il faut told me ou said sans me.", 'say is never followed by a personal object. Use told me, or said without me.'),
  F('He told that he had finished.', ex(['He said he had finished.', ...who(['me', 'us', 'them', 'her', 'him', 'you'], 'He told {} he had finished.')]), "Il a dit qu'il avait terminé.", "tell exige un objet personnel : told me, told us... Sans personne, on emploie said.", 'tell requires a personal object: told me, told us... With no person, use said.'),
  F('She asked where did I work.', ['She asked where I worked.'], "Elle a demandé où je travaillais.", "Dans une question indirecte, pas d'inversion ni de did : where I worked.", 'In an indirect question there is no inversion and no did: where I worked.'),
  F('He said he will call back.', ex(['He said he would call back.']), "Il a dit qu'il rappellerait.", 'Le verbe introducteur est au passé : will devient would.', 'The reporting verb is in the past: will becomes would.'),
  F('They asked if have we submitted the report.', q('They asked', 'we had submitted the report.'), "Ils ont demandé si nous avions remis le rapport.", "Dans une question indirecte, l'ordre redevient sujet + verbe : we had submitted. have devient had.", 'In an indirect question the order is subject + verb again: we had submitted. have becomes had.')
];

const nivD = [
  P('Rapporte ce dialogue au discours indirect en un paragraphe cohérent.', "Manager: 'Have you finished the quarterly report?' / Employee: 'Not yet. I need two more hours.'",
    ["The manager asked if the employee had finished the quarterly report. The employee replied that he/she hadn't yet and needed two more hours."],
    'Question oui / non avec if, puis replied that + backshift.', 'Report this dialogue in reported speech in one coherent paragraph.', 'Yes/no question with if, then replied that + backshift.'),
  P('Rapporte ce dialogue au discours indirect en un paragraphe cohérent.', "Manager: 'Can you make sure it's ready by 5 PM?' / Employee: 'I'll try my best. I've been working on the data all morning.'",
    ["The manager asked if he/she could make sure it was ready by 5 PM. The employee said he/she would try his/her best and added that he/she had been working on the data all morning."],
    'can devient could, will devient would, have been working devient had been working.', 'Report this dialogue in reported speech in one coherent paragraph.', 'can becomes could, will becomes would, have been working becomes had been working.'),
  P('Rapporte ce dialogue au discours indirect en un paragraphe cohérent.', "Manager: 'Why didn't you start it earlier this week?' / Employee: 'I had other urgent priorities.'",
    ["The manager asked why he/she hadn't started it earlier that week. The employee explained that he/she had had other urgent priorities."],
    "this week devient that week. Le Past Perfect ne recule pas : had reste had (had had).", 'Report this dialogue in reported speech in one coherent paragraph.', 'this week becomes that week. The past perfect does not shift: had stays had (had had).')
];

const VB = 'Utilise un verbe introducteur varié (admit, warn, suggest, promise, explain, deny, claim, complain, remind) pour rapporter cette phrase.';
const bonusT = T(VB, 'Report this sentence with a varied reporting verb (admit, warn, suggest, promise, explain, deny, claim, complain, remind).');
const bonus = [
  bonusT("'I didn't take the file,' he said.", ['He denied taking the file.', 'He denied having taken the file.', 'He denied that he had taken the file.', 'He denied that he took the file.'], "Il a nié avoir pris le fichier.", 'deny + forme en -ing (ou that + proposition).', 'deny + -ing form (or that + clause).'),
  bonusT("'You should back up your data,' she said.",
    [...who(['me', 'us'], 'She advised {} to back up '), ''].filter(Boolean).flatMap(x => [x + (x.includes(' me ') ? 'my data.' : 'our data.')]).concat(
      ['She suggested backing up our data.', 'She suggested backing up my data.', 'She suggested that we back up our data.', 'She suggested that we should back up our data.', 'She suggested that I back up my data.', 'She suggested that I should back up my data.',
        'She recommended backing up our data.', 'She recommended backing up my data.', 'She recommended that we back up our data.', 'She recommended that I back up my data.']),
    "Elle a suggéré de sauvegarder nos données.", 'suggest + forme en -ing, ou suggest that + sujet + verbe de base. advise / recommend sont aussi possibles.', 'suggest + -ing form, or suggest that + subject + base verb. advise / recommend are also possible.'),
  bonusT("'I'll deliver the project on time,' he said.", ex(['He promised to deliver the project on time.', 'He promised he would deliver the project on time.']), "Il a promis de livrer le projet à temps.", 'promise + to + verbe, ou promise + proposition avec would.', 'promise + to + verb, or promise + clause with would.'),
  bonusT("'This process is too slow,' she said.", ['She complained that the process was too slow.', 'She complained the process was too slow.', 'She complained about the process being too slow.'], "Elle s'est plainte que le processus était trop lent.", 'complain + that + proposition au passé : is devient was.', 'complain + that + clause in the past: is becomes was.'),
  bonusT("'Don't touch that button!' she said.", ['me', 'us', 'him', 'her', 'them'].flatMap(p => [`She warned ${p} not to touch that button.`, `She told ${p} not to touch that button.`, `She ordered ${p} not to touch that button.`]), "Elle nous a prévenus de ne pas toucher à ce bouton.", 'warn + personne + not to + verbe de base.', 'warn + person + not to + base verb.')
];

const devoir = [
  RS("'I am preparing my presentation,' she said.", ex(['She said she was preparing her presentation.']), "Elle a dit qu'elle préparait sa présentation.", 'Present Continuous devient Past Continuous : was preparing. my devient her.', 'Present continuous becomes past continuous: was preparing. my becomes her.'),
  RS("'We finished the analysis yesterday,' he told me.", ex(['He told me they had finished the analysis the day before.', 'He told me we had finished the analysis the day before.']), "Il m'a dit qu'ils avaient terminé l'analyse la veille.", 'Past Simple devient Past Perfect. yesterday devient the day before (ou the previous day).', 'Past simple becomes past perfect. yesterday becomes the day before (or the previous day).'),
  RS("'Will you attend the conference?' she asked me.", q('She asked me', 'I would attend the conference.'), "Elle m'a demandé si j'assisterais à la conférence.", 'will devient would. Question oui / non : if ou whether.', 'will becomes would. Yes/no question: if or whether.'),
  RS("'I have never failed to meet a deadline,' he said.", ex(['He said he had never failed to meet a deadline.']), "Il a dit qu'il n'avait jamais manqué une échéance.", 'Present Perfect devient Past Perfect : had never failed.', 'Present perfect becomes past perfect: had never failed.'),
  RS("'Where did you study engineering?' she asked.", ['She asked where I had studied engineering.'], "Elle a demandé où j'avais fait mes études d'ingénieur.", 'did study devient had studied. Pas de did.', 'did study becomes had studied. No did.'),
  RS("'The deadline is next Monday,' the manager told us.", ex(['The manager told us the deadline was the following Monday.', 'The manager told us the deadline was on the following Monday.']), "Le responsable nous a dit que la date limite était le lundi suivant.", 'is devient was. next Monday devient the following Monday.', 'is becomes was. next Monday becomes the following Monday.'),
  RS("'I can't find the relevant file,' he said.", ex(["He said he couldn't find the relevant file."]), "Il a dit qu'il ne trouvait pas le fichier concerné.", "can't devient couldn't.", "can't becomes couldn't."),
  RS("'Are you happy with the current results?' she asked.", [...q('She asked', 'I was happy with the current results.'), ...q('She asked', 'I were happy with the current results.')], "Elle a demandé si j'étais satisfait des résultats actuels.", 'Question oui / non : if ou whether. are devient was.', 'Yes/no question: if or whether. are becomes was.'),
  RS("'We had already solved the problem before you arrived,' they said.", ex(['They said they had already solved the problem before I arrived.', 'They said they had already solved the problem before I had arrived.', 'They said we had already solved the problem before I arrived.']), "Ils ont dit qu'ils avaient déjà résolu le problème avant mon arrivée.", 'Le Past Perfect reste had solved. you arrived devient I arrived.', 'The past perfect stays had solved. you arrived becomes I arrived.'),
  RS("'Don't submit the report without checking it first,' he told me.", ['He told me not to submit the report without checking it first.'], "Il m'a dit de ne pas remettre le rapport sans l'avoir vérifié d'abord.", 'Ordre négatif : told me + not to + verbe de base.', 'Negative command: told me + not to + base verb.'),
  RS("'Why have you changed the methodology?' the supervisor asked.", ['The supervisor asked why I had changed the methodology.'], "Le directeur de recherche a demandé pourquoi j'avais changé la méthodologie.", 'have changed devient had changed. Pas d\'inversion.', 'have changed becomes had changed. No inversion.'),
  RS("'I'll send you the data as soon as I can,' she promised.", ex(['She promised she would send me the data as soon as she could.', 'She promised to send me the data as soon as she could.']), "Elle a promis de m'envoyer les données dès qu'elle le pourrait.", 'will devient would, can devient could. you devient me.', 'will becomes would, can becomes could. you becomes me.'),
  RS("'We may need to postpone the launch,' the CEO admitted.", ex(['The CEO admitted they might need to postpone the launch.', 'The CEO admitted we might need to postpone the launch.']), "Le PDG a admis qu'ils pourraient devoir reporter le lancement.", 'may devient might.', 'may becomes might.'),
  RS("'How many experiments have you run so far?' he asked.", ['He asked how many experiments I had run so far.', 'He asked how many experiments I had run until then.'], "Il a demandé combien d'expériences j'avais menées jusque-là.", 'have run devient had run. how many + sujet + verbe.', 'have run becomes had run. how many + subject + verb.'),
  RS("'I was working on the prototype when the fire alarm went off,' she said.", ex(['She said she had been working on the prototype when the fire alarm had gone off.', 'She said she had been working on the prototype when the fire alarm went off.']), "Elle a dit qu'elle travaillait sur le prototype quand l'alarme incendie s'était déclenchée.", 'was working devient had been working. went off devient had gone off (ou reste went off).', 'was working becomes had been working. went off becomes had gone off (or stays went off).')
];

const m6a = [
  RS("'I work here.' (he said)", ex(['He said he worked there.']), "Il a dit qu'il travaillait là.", 'work devient worked. here devient there.', 'work becomes worked. here becomes there.'),
  RS("'We have finished.' (she told me)", ex(['She told me they had finished.', 'She told me we had finished.']), "Elle m'a dit qu'ils avaient fini.", 'have finished devient had finished. we devient they (ou reste we).', 'have finished becomes had finished. we becomes they (or stays we).'),
  RS("'I will call you.' (he promised)", ex(['He promised he would call me.', 'He promised to call me.']), "Il a promis de m'appeler.", 'will devient would, ou promise + to + verbe.', 'will becomes would, or promise + to + verb.'),
  RS("'I can help.' (she said)", ex(['She said she could help.']), "Elle a dit qu'elle pouvait aider.", 'can devient could.', 'can becomes could.'),
  RS("'The results will be ready tomorrow.' (he told us)", ex(['He told us the results would be ready the next day.']), "Il nous a dit que les résultats seraient prêts le lendemain.", 'will devient would. tomorrow devient the next day.', 'will becomes would. tomorrow becomes the next day.')
];

const m6b1 = [
  RS("'Are you coming?' (she asked me)", q('She asked me', 'I was coming.'), "Elle m'a demandé si je venais.", 'Question oui / non : if ou whether + sujet + verbe.', 'Yes/no question: if or whether + subject + verb.'),
  RS("'Where do you work?' (he asked)", ['He asked where I worked.'], "Il a demandé où je travaillais.", 'where + sujet + verbe. do disparaît.', 'where + subject + verb. do disappears.'),
  RS("'Have you finished?' (she asked)", q('She asked', 'I had finished.'), "Elle a demandé si j'avais fini.", 'have finished devient had finished.', 'have finished becomes had finished.'),
  RS("'Why didn't you attend?' (he asked)", ["He asked why I hadn't attended."], "Il a demandé pourquoi je n'avais pas assisté.", "didn't attend devient hadn't attended.", "didn't attend becomes hadn't attended."),
  RS("'What time does it start?' (she asked)", ['She asked what time it started.'], "Elle a demandé à quelle heure ça commençait.", 'what time + sujet + verbe au passé.', 'what time + subject + verb in the past.')
];

const m6b2 = [
  F("'She said me she was tired.'", ex(['She told me she was tired.', 'She said she was tired.']), "Elle m'a dit qu'elle était fatiguée.", "say ne prend pas d'objet personnel : told me ou said.", 'say takes no personal object: told me or said.'),
  F("'She asked where did he work.'", ['She asked where he worked.'], "Elle a demandé où il travaillait.", "Pas d'inversion dans une question indirecte : where he worked.", 'No inversion in an indirect question: where he worked.'),
  F("'She told that she had finished.'", ex(['She said that she had finished.', 'She said she had finished.', ...who(['me', 'us', 'them', 'him'], 'She told {} that she had finished.')]), "Elle a dit qu'elle avait fini.", 'tell exige un objet personnel. Sans personne : said.', 'tell requires a personal object. With no person: said.'),
  F("'He said he will call back soon.'", ex(['He said he would call back soon.']), "Il a dit qu'il rappellerait bientôt.", 'will devient would après un verbe introducteur au passé.', 'will becomes would after a reporting verb in the past.')
];

const m6c = [
  RS("'Send me the report.' (she told him)", ['She told him to send her the report.'], "Elle lui a dit de lui envoyer le rapport.", 'told + personne + to + verbe. me devient her.', 'told + person + to + verb. me becomes her.'),
  RS("'Don't touch the machine.' (he told the intern)", ['He told the intern not to touch the machine.'], "Il a dit au stagiaire de ne pas toucher la machine.", 'told + personne + not to + verbe.', 'told + person + not to + verb.'),
  RS("'Please wait a moment.' (she asked us)", ['She asked us to wait a moment.'], "Elle nous a demandé d'attendre un instant.", 'Une demande polie : asked + personne + to + verbe.', 'A polite request: asked + person + to + verb.'),
  RS("'Turn off your phones.' (the teacher told the students)", ['The teacher told the students to turn off their phones.'], "Le professeur a dit aux étudiants d'éteindre leurs téléphones.", 'your devient their.', 'your becomes their.'),
  RS("'Don't forget your badge.' (he reminded me)", ['He reminded me not to forget my badge.'], "Il m'a rappelé de ne pas oublier mon badge.", 'remind + personne + not to + verbe. your devient my.', 'remind + person + not to + verb. your becomes my.')
];

const m6d = [
  W('admitted / he / had / he / missed / the / deadline', ['He admitted he had missed the deadline.', 'He admitted that he had missed the deadline.'], "Il a admis qu'il avait raté la date limite.", 'Verbe introducteur, puis proposition au Past Perfect.', 'Reporting verb, then a clause in the past perfect.'),
  W('wondered / she / if / the / client / had / replied', ['She wondered if the client had replied.', 'She wondered whether the client had replied.'], "Elle s'est demandé si le client avait répondu.", 'wonder + if + sujet + verbe, sans inversion.', 'wonder + if + subject + verb, with no inversion.'),
  W('asked / they / why / the / server / kept / crashing', ['They asked why the server kept crashing.'], "Ils ont demandé pourquoi le serveur plantait sans arrêt.", 'why + sujet + verbe. keep + forme en -ing.', 'why + subject + verb. keep + -ing form.'),
  W('explained / he / that / the / update / was / ready', ['He explained that the update was ready.'], "Il a expliqué que la mise à jour était prête.", 'explain + that + proposition.', 'explain + that + clause.'),
  W('suggested / she / checking / the / logs / first', ['She suggested checking the logs first.'], "Elle a suggéré de vérifier les journaux d'abord.", 'suggest + forme en -ing.', 'suggest + -ing form.'),
  W('warned / he / us / not / to / skip / the / tests', ['He warned us not to skip the tests.'], "Il nous a prévenus de ne pas sauter les tests.", 'warn + personne + not to + verbe.', 'warn + person + not to + verb.'),
  W('announced / they / that / the / merger / was / confirmed', ['They announced that the merger was confirmed.'], "Ils ont annoncé que la fusion était confirmée.", 'announce + that + proposition.', 'announce + that + clause.'),
  W('reminded / she / him / to / lock / the / lab', ['She reminded him to lock the lab.'], "Elle lui a rappelé de fermer le labo à clé.", 'remind + personne + to + verbe.', 'remind + person + to + verb.')
];

const th = [
  R("Il a avoué qu'il avait raté la date limite.", ['He admitted that he had missed the deadline.', 'He admitted he had missed the deadline.', 'He confessed that he had missed the deadline.', 'He confessed he had missed the deadline.'], 'avouer se dit admit. Past Perfect pour une action antérieure : had missed.', 'avouer is admit. Past perfect for an earlier action: had missed.'),
  R("Elle s'est demandé si le client avait répondu.", ['She wondered whether the client had replied.', 'She wondered if the client had replied.', 'She wondered whether the client had answered.', 'She wondered if the client had answered.'], "se demander se dit wonder, suivi de if ou whether, sans inversion.", 'se demander is wonder, followed by if or whether, with no inversion.'),
  R("Ils ont demandé pourquoi le serveur plantait sans arrêt.", ['They asked why the server was always crashing.', 'They asked why the server kept crashing.', 'They asked why the server kept on crashing.', 'They asked why the server was constantly crashing.'], 'sans arrêt se rend par keep + -ing ou par always / constantly + forme en -ing.', 'The idea of non-stop is rendered by keep + -ing or by always / constantly + -ing.'),
  R("Il a expliqué que la mise à jour était prête.", ['He explained the update was ready.', 'He explained that the update was ready.'], 'explain + that + proposition. Pas de backshift visible ici : was est déjà au passé.', 'explain + that + clause. No visible backshift here: was is already past.'),
  R("Elle a suggéré de vérifier les journaux d'abord.", ['She suggested that we check the logs first.', 'She suggested checking the logs first.', 'She suggested that they check the logs first.', 'She suggested that we should check the logs first.', 'She suggested checking the log files first.'], 'suggest + forme en -ing, ou suggest that + sujet + verbe de base. On ne dit pas suggest to check.', 'suggest + -ing form, or suggest that + subject + base verb. You cannot say suggest to check.'),
  R("Il nous a prévenus de ne pas sauter les tests.", ['He warned us against skipping the tests.', 'He warned us not to skip the tests.', 'He warned us not to skip tests.'], 'warn + personne + not to + verbe de base.', 'warn + person + not to + base verb.'),
  R("Ils ont annoncé que la fusion était confirmée.", ['They announced that the merger had been confirmed.', 'They announced that the merger was confirmed.', 'They announced the merger had been confirmed.', 'They announced the merger was confirmed.'], 'announce + that + proposition. Le passif était confirmée donne was confirmed ou had been confirmed.', 'announce + that + clause. The French passive can be rendered as was confirmed or had been confirmed.')
];

export const G06 = {
  id: 'G06',
  title: 'Le discours indirect (Reported Speech)',
  coursUrl: '',
  skills: {
    '*': ['Discours indirect (mélange)', 'Reported speech (mixed)'],
    'g06-guidee-a': ['Discours indirect : concordance des temps', 'Reported speech: backshift'],
    'g06-niv-a': ['Discours indirect : concordance des temps', 'Reported speech: backshift'],
    'g06-m6a': ['Discours indirect : concordance des temps', 'Reported speech: backshift'],
    'g06-guidee-b': ['Discours indirect : questions', 'Reported speech: questions'],
    'g06-niv-b': ['Discours indirect : questions et ordres', 'Reported speech: questions and commands'],
    'g06-m6b-1': ['Discours indirect : questions', 'Reported speech: questions'],
    'g06-m6c': ['Discours indirect : ordres et demandes', 'Reported speech: commands and requests'],
    'g06-m6d': ['Ordre des mots', 'Word order'],
    'g06-bonus': ['Verbes introducteurs', 'Reporting verbs'],
    'g06-niv-c': ['Discours indirect : corrections', 'Reported speech: corrections'],
    'g06-m6b-2': ['Discours indirect : corrections', 'Reported speech: corrections']
  },
  sets: [
    S('g06-guidee-a', FICHE, ['Série guidée A : phrases affirmatives', 'Guided set A: statements'], 'B1', ['Complète le discours indirect. Chaque phrase propose un indice.', 'Complete the reported speech. Each sentence comes with a hint.'], guideeA),
    S('g06-guidee-b', FICHE, ['Série guidée B : questions indirectes', 'Guided set B: indirect questions'], 'B1+', ['Questions oui / non et questions en wh-.', 'Yes/no questions and wh- questions.'], guideeB),
    S('g06-niv-a', FICHE, ['Niveau A : phrases affirmatives de base', 'Level A: basic statements'], 'B1', ['Mets chaque phrase au discours indirect.', 'Put each sentence into reported speech.'], nivA),
    S('g06-niv-b', FICHE, ['Niveau B : questions et ordres', 'Level B: questions and commands'], 'B1+', ['Questions indirectes, ordres et nuances.', 'Indirect questions, commands and nuances.'], nivB),
    S('g06-niv-c', FICHE, ['Niveau C : erreurs et nuances', 'Level C: errors and nuances'], 'B1+', ['Corrige cinq phrases fautives.', 'Correct five faulty sentences.'], nivC),
    S('g06-niv-d', FICHE, ['Niveau D : production complexe', 'Level D: complex production'], 'B2+', ['Rapporte un dialogue en un paragraphe, puis compare avec le modèle.', 'Report a dialogue in one paragraph, then compare with the model.'], nivD),
    S('g06-bonus', FICHE, ['Bonus : verbes introducteurs variés', 'Bonus: varied reporting verbs'], 'B2+', ['Remplace say par un verbe introducteur plus précis.', 'Replace say with a more precise reporting verb.'], bonus),
    S('g06-devoir', FICHE, ['Devoir maison', 'Homework'], 'B1+', ['Quinze phrases à mettre au discours indirect.', 'Fifteen sentences to put into reported speech.'], devoir),
    S('g06-m6a', MURPHY, ['Unité 6A : concordance des temps', 'Unit 6A: backshift'], 'B1', ['Le temps recule d\'un cran.', 'The tense moves one step back.'], m6a),
    S('g06-m6b-1', MURPHY, ['Unité 6B : questions indirectes (1/2)', 'Unit 6B: indirect questions (1/2)'], 'B1+', ['Transforme en question indirecte.', 'Put into an indirect question.'], m6b1),
    S('g06-m6b-2', MURPHY, ['Unité 6B : corriger les phrases (2/2)', 'Unit 6B: correcting sentences (2/2)'], 'B1+', ['Corrige les erreurs.', 'Correct the mistakes.'], m6b2),
    S('g06-m6c', MURPHY, ['Unité 6C : ordres et demandes rapportés', 'Unit 6C: reported commands and requests'], 'B1+', ['tell / ask + personne + to + verbe.', 'tell / ask + person + to + verb.'], m6c),
    S('g06-m6d', MURPHY, ['Unité 6D : remettre les mots dans l\'ordre', 'Unit 6D: sentence building'], 'B1+', ['Écris la phrase complète avec les mots dans le bon ordre.', 'Write the complete sentence with the words in the right order.'], m6d),
    S('g06-th', MURPHY, ['Unité TH : thème grammatical', 'Unit TH: translation'], 'B1+', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], th)
  ],
  recap: {
    blocks: [
      {
        title: 'Concordance des temps (backshift)',
        forms: [
          ['Present Simple', "'I work' devient he said he worked"],
          ['Present Continuous', "'I am working' devient he was working"],
          ['Past Simple', "'I worked' devient he had worked"],
          ['Present Perfect', "'I have worked' devient he had worked"],
          ['will', "'I will come' devient he would come"],
          ['can', "'I can help' devient he could help"],
          ['must', "'I must go' devient he had to go"],
          ['may', "'I may be late' devient he might be late"]
        ],
        uses: ["Quand le verbe introducteur est au passé, le temps recule d'un cran.", "Les pronoms changent aussi : I devient he ou she, you devient I ou he, my devient his ou her."]
      },
      {
        title: 'Questions et ordres rapportés',
        forms: [
          ['Oui / non', 'She asked if / whether he was coming. Ni inversion, ni point d\'interrogation.'],
          ['Wh-', 'He asked where she lived. Pas de do / does / did.'],
          ['Ordre', 'She told him to send the report.'],
          ['Ordre négatif', 'He told the intern not to touch the machine.']
        ],
        uses: ["say ne prend pas d'objet personnel : She said that... ; tell en exige un : She told me that...", "Verbes introducteurs variés : admit, deny, promise, warn, suggest, complain, explain, remind."]
      }
    ],
    tables: [
      {
        title: 'Changements de repères temporels et spatiaux',
        rows: [['today', 'that day'], ['yesterday', 'the day before / the previous day'], ['tomorrow', 'the next day / the following day'], ['now', 'then / at that moment'], ['here', 'there'], ['this / these', 'that / those'], ['last week', 'the week before'], ['next week', 'the following week'], ['ago', 'before / previously']]
      }
    ],
    notes: ["Jamais de point d'interrogation dans une question indirecte, et pas d'auxiliaire do / does / did.", "'She said me...' est faux. 'She told that...' est faux. 'She told me...' est correct."],
    rule: "Le temps recule d'un cran : présent devient passé, passé devient Past Perfect, will devient would, can devient could, must devient had to."
  },
  enMeta: {
    title: 'Reported Speech',
    recap: {
      blocks: [
        {
          title: 'Backshift (sequence of tenses)',
          forms: [
            ['Present Simple', "'I work' becomes he said he worked"],
            ['Present Continuous', "'I am working' becomes he was working"],
            ['Past Simple', "'I worked' becomes he had worked"],
            ['Present Perfect', "'I have worked' becomes he had worked"],
            ['will', "'I will come' becomes he would come"],
            ['can', "'I can help' becomes he could help"],
            ['must', "'I must go' becomes he had to go"],
            ['may', "'I may be late' becomes he might be late"]
          ],
          uses: ['When the reporting verb is in the past, the tense moves one step back.', 'Pronouns change too: I becomes he or she, you becomes I or he, my becomes his or her.']
        },
        {
          title: 'Reported questions and commands',
          forms: [
            ['Yes / no', 'She asked if / whether he was coming. No inversion, no question mark.'],
            ['Wh-', 'He asked where she lived. No do / does / did.'],
            ['Command', 'She told him to send the report.'],
            ['Negative command', 'He told the intern not to touch the machine.']
          ],
          uses: ['say takes no personal object: She said that... ; tell requires one: She told me that...', 'Varied reporting verbs: admit, deny, promise, warn, suggest, complain, explain, remind.']
        }
      ],
      tables: [
        {
          title: 'Changes of time and place markers',
          rows: [['today', 'that day'], ['yesterday', 'the day before / the previous day'], ['tomorrow', 'the next day / the following day'], ['now', 'then / at that moment'], ['here', 'there'], ['this / these', 'that / those'], ['last week', 'the week before'], ['next week', 'the following week'], ['ago', 'before / previously']]
        }
      ],
      notes: ['Never a question mark in an indirect question, and no auxiliary do / does / did.', "'She said me...' is wrong. 'She told that...' is wrong. 'She told me...' is correct."],
      rule: 'The tense moves one step back: present becomes past, past becomes past perfect, will becomes would, can becomes could, must becomes had to.'
    }
  }
};
