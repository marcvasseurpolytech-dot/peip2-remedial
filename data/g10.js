// G10 : Question Tags
// Contenu reconstruit à partir de la fiche élève, du supplément Murphy et du corrigé enseignant du hub.
import { S, FICHE, MURPHY, C, T, F, R, W, P } from './dsl2.js';
import { ch, E } from './dsl.js';

const hint = (fr, en) => [fr, en];
const K = (s, a, fr, why, whyEn, h) => C(s, a, fr, why, whyEn, h ? h[0] : null, h ? h[1] : null);
// Forme négative développée : "doesn't she" donne aussi "does she not".
const full = t => {
  const m = /^(\w+?)n't (\w+)$/.exec(t);
  if (!m) return null;
  const base = m[1] === 'ca' ? 'can' : m[1] === 'wo' ? 'will' : m[1] === 'sha' ? 'shall' : m[1];
  return `${base} ${m[2]} not`;
};
// TG("doesn't she") renvoie ["doesn't she", "does she not"]
const TG = (...alts) => alts.flatMap(a => (full(a) ? [a, full(a)] : [a]));
const IMP = ['will you', "won't you", 'would you', 'can you', 'could you'];
const RULE = "La phrase et le tag sont de polarité opposée (+ puis −, ou − puis +) et reprennent le même auxiliaire.";
const RULE_EN = 'The sentence and the tag have opposite polarity (+ then −, or − then +) and use the same auxiliary.';
const tg = (s, a, fr, why, whyEn, h) => K(s, [TG(...a)], fr, why || RULE, whyEn || RULE_EN, h);

const guideeA = [
  tg('She works at Polytech, ___?', ["doesn't she"], "Elle travaille à Polytech, n'est-ce pas ?", "works est au Present Simple : l'auxiliaire est does. Phrase affirmative, tag négatif : doesn't she.", 'works is present simple: the auxiliary is does. Affirmative sentence, negative tag: doesn\'t she.', hint('Present Simple : quel auxiliaire ?', 'Present simple: which auxiliary?')),
  tg('They were tired after the experiment, ___?', ["weren't they"], "Ils étaient fatigués après l'expérience, n'est-ce pas ?", "be au prétérit se répète tel quel : were, puis tag négatif.", 'be in the past is repeated as it is: were, then a negative tag.', hint('be au prétérit', 'be in the past')),
  tg("He can't solve this problem, ___?", ['can he'], "Il ne peut pas résoudre ce problème, n'est-ce pas ?", "Phrase négative, tag affirmatif : can he.", 'Negative sentence, affirmative tag: can he.', hint('négatif devient affirmatif', 'negative becomes affirmative')),
  tg("You haven't submitted the report yet, ___?", ['have you'], "Vous n'avez pas encore remis le rapport, n'est-ce pas ?", "Phrase négative, tag affirmatif : have you.", 'Negative sentence, affirmative tag: have you.', hint('négatif devient affirmatif', 'negative becomes affirmative')),
  tg('The results will be ready tomorrow, ___?', ["won't they"], "Les résultats seront prêts demain, n'est-ce pas ?", "Sujet pluriel The results devient they ; will devient won't.", 'The plural subject The results becomes they; will becomes won\'t.', hint('quel pronom pour The results ?', 'which pronoun for The results?')),
  tg('She has been promoted, ___?', ["hasn't she"], "Elle a été promue, n'est-ce pas ?", "Le premier auxiliaire (has) est repris : hasn't she.", 'The first auxiliary (has) is repeated: hasn\'t she.', hint('premier auxiliaire', 'first auxiliary')),
  tg("They weren't satisfied with the outcome, ___?", ['were they'], "Ils n'étaient pas satisfaits du résultat, n'est-ce pas ?", "Phrase négative, tag affirmatif : were they.", 'Negative sentence, affirmative tag: were they.', hint('négatif devient affirmatif', 'negative becomes affirmative')),
  tg('The machine had already been repaired, ___?', ["hadn't it"], "La machine avait déjà été réparée, n'est-ce pas ?", "Premier auxiliaire : had. Sujet The machine devient it.", 'First auxiliary: had. The subject The machine becomes it.', hint('The machine devient ?', 'The machine becomes?')),
  tg('We should have left earlier, ___?', ["shouldn't we"], "Nous aurions dû partir plus tôt, n'est-ce pas ?", "Le premier auxiliaire est le modal should : shouldn't we.", 'The first auxiliary is the modal should: shouldn\'t we.', hint('premier auxiliaire', 'first auxiliary')),
  tg('She will have finished by then, ___?', ["won't she"], "Elle aura fini d'ici là, n'est-ce pas ?", "Premier auxiliaire : will. Tag négatif : won't she.", 'First auxiliary: will. Negative tag: won\'t she.', hint('premier auxiliaire', 'first auxiliary'))
];

const guideeB = [
  K('I am the last one to leave, ___?', [["aren't I", 'am I not']], "Je suis le dernier à partir, n'est-ce pas ?", "Cas particulier : I am donne aren't I ? (jamais amn't I).", 'Special case: I am gives aren\'t I? (never amn\'t I).', hint('cas particulier de I am', 'special case of I am')),
  K("Let's take a break, ___?", [['shall we']], "Prenons une pause, d'accord ?", "Let's donne shall we ?", 'Let\'s gives shall we?', hint("cas particulier de Let's", "special case of Let's")),
  tg('He should call back, ___?', ["shouldn't he"], "Il devrait rappeler, n'est-ce pas ?", null, null, hint('premier auxiliaire', 'first auxiliary')),
  K('Nobody told you about the change, ___?', [['did they']], "Personne ne vous a parlé du changement, n'est-ce pas ?", "nobody est de sens négatif : le tag reste affirmatif, avec le pronom they : did they.", 'nobody is negative in meaning: the tag stays affirmative, with the pronoun they: did they.', hint('sujet de sens négatif', 'negative-meaning subject')),
  K('Open the window, ___?', [IMP], "Ouvre la fenêtre, tu veux bien ?", "Impératif : will you ? (won't you, would you, can you ou could you sont aussi possibles).", 'Imperative: will you? (won\'t you, would you, can you or could you are also possible).', hint('impératif', 'imperative')),
  tg('Someone left this bag here, ___?', ["didn't they"], "Quelqu'un a laissé ce sac ici, n'est-ce pas ?", "someone est affirmatif, repris par they : didn't they.", 'someone is affirmative, taken up by they: didn\'t they.', hint('someone est repris par ?', 'someone is taken up by?')),
  K('Nothing went wrong, ___?', [['did it']], "Rien n'a mal tourné, n'est-ce pas ?", "nothing est de sens négatif et se reprend par it : le tag est affirmatif, did it.", 'nothing is negative in meaning and is taken up by it: the tag is affirmative, did it.', hint('sujet de sens négatif', 'negative-meaning subject')),
  tg('Everything has been arranged, ___?', ["hasn't it"], "Tout a été organisé, n'est-ce pas ?", "everything se reprend par it : hasn't it.", 'everything is taken up by it: hasn\'t it.', hint('everything est repris par ?', 'everything is taken up by?')),
  tg('Everybody was informed, ___?', ["weren't they"], "Tout le monde a été informé, n'est-ce pas ?", "everybody se reprend par they : weren't they.", 'everybody is taken up by they: weren\'t they.', hint('everybody est repris par ?', 'everybody is taken up by?')),
  K("Don't be late, ___?", [['will you', 'would you', 'can you', 'could you']], "Ne sois pas en retard, d'accord ?", "Impératif négatif : will you ? (le tag reste affirmatif).", 'Negative imperative: will you? (the tag stays affirmative).', hint('impératif négatif', 'negative imperative'))
];

const nivA = [
  tg('She has already finished, ___?', ["hasn't she"], "Elle a déjà fini, n'est-ce pas ?", null, null),
  tg("They aren't coming today, ___?", ['are they'], "Ils ne viennent pas aujourd'hui, n'est-ce pas ?", null, null),
  tg('He passed his driving test, ___?', ["didn't he"], "Il a réussi son permis de conduire, n'est-ce pas ?", "Pas d'auxiliaire dans la phrase au Past Simple : on emploie did, donc didn't he.", 'There is no auxiliary in a past simple sentence: use did, so didn\'t he.'),
  tg('You will send the report, ___?', ["won't you"], "Vous enverrez le rapport, n'est-ce pas ?", null, null),
  tg('This machine works perfectly, ___?', ["doesn't it"], "Cette machine fonctionne parfaitement, n'est-ce pas ?", "Present Simple à la 3e personne : does, donc doesn't it.", 'Present simple, third person: does, so doesn\'t it.'),
  tg("We haven't made a mistake, ___?", ['have we'], "Nous n'avons pas fait d'erreur, n'est-ce pas ?", null, null),
  tg('She was at the conference, ___?', ["wasn't she"], "Elle était à la conférence, n'est-ce pas ?", null, null),
  tg("He can't speak Japanese, ___?", ['can he'], "Il ne parle pas japonais, n'est-ce pas ?", null, null),
  K('I am next on the list, ___?', [["aren't I", 'am I not']], "Je suis le suivant sur la liste, n'est-ce pas ?", "I am donne aren't I ?", 'I am gives aren\'t I?'),
  tg('They had already left, ___?', ["hadn't they"], "Ils étaient déjà partis, n'est-ce pas ?", null, null)
];
const nivB = [
  K("Let's start the meeting, ___?", [['shall we']], "Commençons la réunion, d'accord ?", "Let's donne shall we ?", 'Let\'s gives shall we?'),
  tg('You should review your notes, ___?', ["shouldn't you"], "Vous devriez relire vos notes, n'est-ce pas ?", null, null),
  K('Nobody called while I was out, ___?', [['did they']], "Personne n'a appelé pendant mon absence, n'est-ce pas ?", "nobody est négatif, repris par they : le tag est affirmatif.", 'nobody is negative, taken up by they: the tag is affirmative.'),
  tg('The engineer designed this bridge, ___?', ["didn't he", "didn't she"], "L'ingénieur a conçu ce pont, n'est-ce pas ?", "Past Simple : did ; le pronom suit le sexe de l'ingénieur (he ou she).", 'Past simple: did; the pronoun follows the engineer\'s sex (he or she).'),
  K('Close the door, ___?', [IMP], "Ferme la porte, tu veux bien ?", "Impératif : will you ?", 'Imperative: will you?'),
  tg("She wouldn't accept that offer, ___?", ['would she'], "Elle n'accepterait pas cette offre, n'est-ce pas ?", null, null),
  tg('They have been working for hours, ___?', ["haven't they"], "Ils travaillent depuis des heures, n'est-ce pas ?", "Premier auxiliaire : have.", 'First auxiliary: have.'),
  tg("He didn't understand the instructions, ___?", ['did he'], "Il n'a pas compris les consignes, n'est-ce pas ?", null, null),
  tg("We're going to present tomorrow, ___?", ["aren't we"], "Nous allons présenter demain, n'est-ce pas ?", "We're = we are : le tag reprend are, donc aren't we.", 'We\'re = we are: the tag repeats are, so aren\'t we.'),
  K('It must be a mistake, ___?', [["isn't it", 'is it not']], "Ce doit être une erreur, n'est-ce pas ?", "must exprime ici une déduction : le tag reprend le verbe be (isn't it), et non must. (Avec must = obligation, on dirait mustn't it ? mais ce tag est rare.)", 'must expresses a deduction here: the tag repeats the verb be (isn\'t it), not must. (With must = obligation, mustn\'t it? is possible but rare.)', hint('déduction : quel verbe reprendre ?', 'deduction: which verb to repeat?'))
];
const nivC = [
  F("She has submitted her project, isn't she?", ["She has submitted her project, hasn't she?", 'She has submitted her project, has she not?'], "Elle a remis son projet, n'est-ce pas ?", "Le tag reprend l'auxiliaire de la phrase : has, donc hasn't she.", 'The tag repeats the auxiliary of the sentence: has, so hasn\'t she.'),
  F("They worked all night, hadn't they?", ["They worked all night, didn't they?", 'They worked all night, did they not?'], "Ils ont travaillé toute la nuit, n'est-ce pas ?", "worked est un Past Simple sans auxiliaire : did, donc didn't they.", 'worked is a past simple with no auxiliary: did, so didn\'t they.'),
  F("I am right, am I?", ["I am right, aren't I?", 'I am right, am I not?'], "J'ai raison, n'est-ce pas ?", "Phrase affirmative : le tag doit être négatif, et I am donne aren't I.", 'Affirmative sentence: the tag must be negative, and I am gives aren\'t I.'),
  F("Nobody was informed, weren't they?", ['Nobody was informed, were they?'], "Personne n'a été informé, n'est-ce pas ?", "nobody est négatif : le tag est affirmatif, were they.", 'nobody is negative: the tag is affirmative, were they.'),
  ch("Let's go, ___?", ['shall we', 'will we'], 0, "Allons-y, d'accord ?", "Let's donne shall we ? (Vrai : le tag du cours est correct.)", E("Let's gives shall we? (True: the tag taught in the course is correct.)", null, { s: "Let's go, ___?", o: ['shall we', 'will we'] })),
  P("Explique en français ou en anglais la différence entre intonation montante et descendante.", "'She passed, didn't she?' What changes between a rising and a falling intonation?", ["Falling intonation: the speaker is fairly sure she passed and expects the listener to confirm. Rising intonation: a real question, the speaker is not sure."], "descendante = confirmation, montante = vraie question", 'Explain the difference between a rising and a falling intonation.', 'falling = confirmation, rising = real question'),
  P("Explique le sens de cette phrase selon l'intonation.", "'You're not going to quit, are you?' What does it mean?", ["Falling intonation: the speaker hopes or fears you will not leave, almost a plea or a reproach. Rising intonation: a genuine question about your plans."], "descendante = espoir ou crainte, montante = vraie question", 'Explain what this sentence means according to the intonation.', 'falling = hope or fear, rising = real question'),
  P("Explique la différence de ton entre les deux versions.", "'You forgot the report, didn't you.' (falling tone) versus '...didn't you?' (rising tone)", ["Falling tone with a full stop: a direct accusation, the speaker already knows. Rising tone with a question mark: a real question, the speaker is checking."], "ton descendant = accusation, ton montant = vraie question", 'Explain the difference in tone between the two versions.', 'falling = accusation, rising = real question')
];
const bonus = [
  R("Il n'a pas envoyé le rapport, n'est-ce pas ?", ["He didn't send the report, did he?", 'He did not send the report, did he?', "He hasn't sent the report, has he?"], "Phrase négative, tag affirmatif : did he.", 'Negative sentence, affirmative tag: did he.'),
  R("Vous avez bien reçu notre offre, non ?", ["You received our offer, didn't you?", "You have received our offer, haven't you?", "You did receive our offer, didn't you?", "You got our offer, didn't you?"], "Phrase affirmative, tag négatif : didn't you (ou haven't you).", 'Affirmative sentence, negative tag: didn\'t you (or haven\'t you).'),
  R("Ce n'est pas si compliqué, n'est-ce pas ?", ["It's not that complicated, is it?", "It isn't that complicated, is it?", "It's not so complicated, is it?", "It isn't so complicated, is it?", 'It is not that complicated, is it?'], "Phrase négative, tag affirmatif : is it.", 'Negative sentence, affirmative tag: is it.'),
  R("Elle sera là demain, non ?", ["She'll be there tomorrow, won't she?", 'She will be there tomorrow, won\'t she?', "She'll be here tomorrow, won't she?", 'She will be here tomorrow, won\'t she?'], "Phrase affirmative, tag négatif : won't she.", 'Affirmative sentence, negative tag: won\'t she.'),
  R("On aurait dû partir plus tôt, non ?", ["We should have left sooner, shouldn't we?", "We should have left earlier, shouldn't we?", "We ought to have left earlier, oughtn't we?", "We should've left earlier, shouldn't we?"], "Premier auxiliaire : should, donc shouldn't we.", 'First auxiliary: should, so shouldn\'t we.')
];
const devoir = [
  tg('He has submitted his project, ___?', ["hasn't he"], "Il a remis son projet, n'est-ce pas ?", null, null),
  tg("They weren't at the meeting, ___?", ['were they'], "Ils n'étaient pas à la réunion, n'est-ce pas ?", null, null),
  tg('He can solve this equation, ___?', ["can't he"], "Il peut résoudre cette équation, n'est-ce pas ?", null, null),
  K("Let's review the results, ___?", [['shall we']], "Examinons les résultats, d'accord ?", "Let's donne shall we ?", 'Let\'s gives shall we?'),
  K('Nobody noticed the error, ___?', [['did they']], "Personne n'a remarqué l'erreur, n'est-ce pas ?", "nobody est négatif, repris par they : tag affirmatif.", 'nobody is negative, taken up by they: affirmative tag.'),
  tg('You should prepare more carefully, ___?', ["shouldn't you"], "Vous devriez vous préparer plus soigneusement, n'est-ce pas ?", null, null),
  K('I am on the right track, ___?', [["aren't I", 'am I not']], "Je suis sur la bonne voie, n'est-ce pas ?", "I am donne aren't I ?", 'I am gives aren\'t I?'),
  tg('The prototype was tested successfully, ___?', ["wasn't it"], "Le prototype a été testé avec succès, n'est-ce pas ?", null, null),
  tg('They will announce the results tomorrow, ___?', ["won't they"], "Ils annonceront les résultats demain, n'est-ce pas ?", null, null),
  K('Sit down, ___?', [IMP], "Assieds-toi, tu veux bien ?", "Impératif : will you ?", 'Imperative: will you?'),
  tg("She'd never done this before, ___?", ['had she'], "Elle n'avait jamais fait cela auparavant, n'est-ce pas ?", "She'd = She had (suivi de done) : le tag reprend had. Phrase négative (never), tag affirmatif : had she.", 'She\'d = She had (followed by done): the tag repeats had. Negative sentence (never), affirmative tag: had she.'),
  tg('Everything went smoothly, ___?', ["didn't it"], "Tout s'est bien passé, n'est-ce pas ?", null, null),
  tg('We could have prepared better, ___?', ["couldn't we"], "Nous aurions pu mieux nous préparer, n'est-ce pas ?", null, null),
  K('Nothing has been confirmed yet, ___?', [['has it']], "Rien n'a encore été confirmé, n'est-ce pas ?", "nothing est négatif : tag affirmatif, has it.", 'nothing is negative: affirmative tag, has it.'),
  tg('Someone will take responsibility, ___?', ["won't they"], "Quelqu'un prendra ses responsabilités, n'est-ce pas ?", null, null)
];
const m10a1 = [
  tg('He has already left, ___?', ["hasn't he"], "Il est déjà parti, n'est-ce pas ?", null, null),
  tg("They weren't at the seminar, ___?", ['were they'], "Ils n'étaient pas au séminaire, n'est-ce pas ?", null, null),
  tg('He can solve the equation, ___?', ["can't he"], "Il peut résoudre l'équation, n'est-ce pas ?", null, null),
  K('I am on the guest list, ___?', [["aren't I", 'am I not']], "Je suis sur la liste des invités, n'est-ce pas ?", "I am donne aren't I ?", 'I am gives aren\'t I?'),
  K("Let's review the figures, ___?", [['shall we']], "Revoyons les chiffres, d'accord ?", "Let's donne shall we ?", 'Let\'s gives shall we?'),
  K('Nothing changed overnight, ___?', [['did it']], "Rien n'a changé pendant la nuit, n'est-ce pas ?", "nothing est négatif, repris par it : tag affirmatif.", 'nothing is negative, taken up by it: affirmative tag.'),
  K('Switch off the projector, ___?', [IMP], "Éteins le projecteur, tu veux bien ?", "Impératif : will you ?", 'Imperative: will you?'),
  tg('She should have told me, ___?', ["shouldn't she"], "Elle aurait dû me le dire, n'est-ce pas ?", null, null)
];
const m10a2 = [
  F("He has finished the survey, isn't he?", ["He has finished the survey, hasn't he?", 'He has finished the survey, has he not?'], "Il a terminé l'enquête, n'est-ce pas ?", "Le tag reprend l'auxiliaire has : hasn't he.", 'The tag repeats the auxiliary has: hasn\'t he.'),
  F("We closed early, hadn't we?", ["We closed early, didn't we?", 'We closed early, did we not?'], "Nous avons fermé tôt, n'est-ce pas ?", "closed est un Past Simple : did, donc didn't we.", 'closed is a past simple: did, so didn\'t we.'),
  F("I am on time, am I?", ["I am on time, aren't I?", 'I am on time, am I not?'], "Je suis à l'heure, n'est-ce pas ?", "Phrase affirmative : tag négatif, et I am donne aren't I.", 'Affirmative sentence: negative tag, and I am gives aren\'t I.'),
  F("Nobody answered the call, didn't they?", ['Nobody answered the call, did they?'], "Personne n'a répondu à l'appel, n'est-ce pas ?", "nobody est négatif : le tag est affirmatif, did they.", 'nobody is negative: the tag is affirmative, did they.')
];
const m10b = [
  W("you've / finished / haven't / the / report / you", ["You've finished the report, haven't you?", "You have finished the report, haven't you?"], "Vous avez fini le rapport, n'est-ce pas ?", "Phrase affirmative, tag négatif : haven't you.", 'Affirmative sentence, negative tag: haven\'t you.'),
  W("can't / he / fix / can / this / alone / he", ["He can't fix this alone, can he?", 'He cannot fix this alone, can he?'], "Il ne peut pas réparer ça seul, n'est-ce pas ?", "Phrase négative, tag affirmatif : can he.", 'Negative sentence, affirmative tag: can he.'),
  W("let's / take / shall / a / short / break / we", ["Let's take a short break, shall we?"], "Prenons une courte pause, d'accord ?", "Let's donne shall we ?", 'Let\'s gives shall we?'),
  W("wasn't / she / at / was / the / meeting / she", ["She wasn't at the meeting, was she?"], "Elle n'était pas à la réunion, n'est-ce pas ?", "Phrase négative, tag affirmatif : was she.", 'Negative sentence, affirmative tag: was she.'),
  W("they'll / arrive / won't / on / time / they", ["They'll arrive on time, won't they?", "They will arrive on time, won't they?"], "Ils arriveront à l'heure, n'est-ce pas ?", "Phrase affirmative, tag négatif : won't they.", 'Affirmative sentence, negative tag: won\'t they.'),
  W("nobody / called / did / this / morning / they", ["Nobody called this morning, did they?"], "Personne n'a appelé ce matin, n'est-ce pas ?", "nobody est négatif : tag affirmatif, did they.", 'nobody is negative: affirmative tag, did they.'),
  W("close / will / the / window / you", ["Close the window, will you?"], "Ferme la fenêtre, tu veux bien ?", "Impératif : will you ?", 'Imperative: will you?'),
  W("this / isn't / is / working / properly / it", ["This isn't working properly, is it?", 'This is not working properly, is it?'], "Ça ne fonctionne pas correctement, n'est-ce pas ?", "Phrase négative, tag affirmatif : is it.", 'Negative sentence, affirmative tag: is it.')
];
const th = [
  R("Vous avez terminé l'analyse, n'est-ce pas ?", ["You've finished the analysis, haven't you?", "You have finished the analysis, haven't you?", "You finished the analysis, didn't you?", "You've completed the analysis, haven't you?"], "Phrase affirmative, tag négatif : haven't you.", 'Affirmative sentence, negative tag: haven\'t you.'),
  R("Il ne peut pas résoudre ce problème tout seul, n'est-ce pas ?", ["He can't solve this problem alone, can he?", "He can't solve this problem on his own, can he?", "He can't solve this problem by himself, can he?", "He cannot solve this problem alone, can he?"], "Phrase négative, tag affirmatif : can he.", 'Negative sentence, affirmative tag: can he.'),
  R("Faisons un bilan rapide, d'accord ?", ["Let's do a quick review, shall we?", "Let's have a quick review, shall we?", "Let's do a quick recap, shall we?", "Let's have a quick recap, shall we?", "Let's take a quick look, shall we?"], "Let's donne shall we ?", 'Let\'s gives shall we?'),
  R("Elle n'était pas au séminaire, n'est-ce pas ?", ["She wasn't at the seminar, was she?", 'She was not at the seminar, was she?', "She wasn't at the workshop, was she?"], "Phrase négative, tag affirmatif : was she.", 'Negative sentence, affirmative tag: was she.'),
  R("Ils arriveront demain matin, n'est-ce pas ?", ["They'll arrive tomorrow morning, won't they?", "They will arrive tomorrow morning, won't they?"], "Phrase affirmative, tag négatif : won't they.", 'Affirmative sentence, negative tag: won\'t they.'),
  R("Personne n'a répondu à l'e-mail, n'est-ce pas ?", ["Nobody replied to the email, did they?", "Nobody answered the email, did they?", "Nobody replied to the e-mail, did they?", "Nobody responded to the email, did they?"], "nobody est négatif : tag affirmatif, did they.", 'nobody is negative: affirmative tag, did they.'),
  R("Ce n'est pas encore terminé, n'est-ce pas ?", ["It isn't finished yet, is it?", "It's not finished yet, is it?", "It isn't done yet, is it?", "It is not finished yet, is it?"], "Phrase négative, tag affirmatif : is it.", 'Negative sentence, affirmative tag: is it.')
];

const SK = (fr, en) => [fr, en];
const BAS = SK('Question tags : formation de base', 'Question tags: basic formation');
const SPE = SK('Question tags : cas particuliers', 'Question tags: special cases');
const MIX = SK('Question tags (mélange)', 'Question tags (mixed)');
export const G10 = {
  id: 'G10',
  title: 'Les question tags (Question Tags)',
  coursUrl: '',
  skills: {
    '*': MIX,
    'g10-guidee-a': BAS, 'g10-niv-a': BAS, 'g10-m10a-1': BAS,
    'g10-guidee-b': SPE, 'g10-niv-b': MIX, 'g10-devoir': MIX,
    'g10-niv-c': SK('Question tags : corrections et intonation', 'Question tags: corrections and intonation'),
    'g10-m10a-2': SK('Question tags : corrections et intonation', 'Question tags: corrections and intonation'),
    'g10-bonus': SK('Question tags : thème', 'Question tags: translation'),
    'g10-th': SK('Question tags : thème', 'Question tags: translation'),
    'g10-m10b': SK('Ordre des mots', 'Word order')
  },
  sets: [
    S('g10-guidee-a', FICHE, ['Série guidée A : tags de base', 'Guided set A: basic tags'], 'B1', ['Ajoute le bon question tag. Chaque phrase propose un indice.', 'Add the right question tag. Each sentence comes with a hint.'], guideeA),
    S('g10-guidee-b', FICHE, ['Série guidée B : cas particuliers', 'Guided set B: special cases'], 'B1+', ['I am, Let\'s, impératif, nobody, nothing, everybody.', 'I am, Let\'s, imperatives, nobody, nothing, everybody.'], guideeB),
    S('g10-niv-a', FICHE, ['Niveau A : fondamentaux', 'Level A: basics'], 'B1', ['Ajoute le question tag correct.', 'Add the correct question tag.'], nivA),
    S('g10-niv-b', FICHE, ['Niveau B : contexte professionnel', 'Level B: professional context'], 'B1+', ['Ajoute le question tag correct.', 'Add the correct question tag.'], nivB),
    S('g10-niv-c', FICHE, ['Niveau C : ambiguïtés et intonation', 'Level C: ambiguities and intonation'], 'B2', ['Corrige, vérifie, puis explique le rôle de l\'intonation.', 'Correct, check, then explain the role of intonation.'], nivC),
    S('g10-bonus', FICHE, ['Bonus : tags et registre', 'Bonus: tags and register'], 'B2', ['Traduis ces phrases avec un question tag.', 'Translate these sentences with a question tag.'], bonus),
    S('g10-devoir', FICHE, ['Devoir maison', 'Homework'], 'B1+', ['Quinze phrases : ajoute le question tag correct.', 'Fifteen sentences: add the correct question tag.'], devoir),
    S('g10-m10a-1', MURPHY, ['Unité 10A : formation des question tags (1/2)', 'Unit 10A: forming question tags (1/2)'], 'B1', ['Ajoute le bon question tag.', 'Add the right question tag.'], m10a1),
    S('g10-m10a-2', MURPHY, ['Unité 10A : corriger les tags (2/2)', 'Unit 10A: correcting tags (2/2)'], 'B1+', ['Corrige les erreurs de question tags.', 'Correct the question tag mistakes.'], m10a2),
    S('g10-m10b', MURPHY, ['Unité 10B : remettre les mots dans l\'ordre', 'Unit 10B: sentence building'], 'B1+', ['Écris la phrase complète, tag compris.', 'Write the complete sentence, tag included.'], m10b),
    S('g10-th', MURPHY, ['Unité TH : thème grammatical', 'Unit TH: translation'], 'B1+', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], th)
  ],
  recap: {
    blocks: [
      {
        title: 'Formation',
        forms: [
          ['She works here, ...', "doesn't she?"],
          ['They were late, ...', "weren't they?"],
          ['He can swim, ...', "can't he?"],
          ['We will finish soon, ...', "won't we?"],
          ["She doesn't know, ...", 'does she?'],
          ['They didn\'t come, ...', 'did they?']
        ],
        uses: ["Phrase affirmative : tag négatif. Phrase négative : tag affirmatif. Même auxiliaire (do / does / did si la phrase n'en a pas)."]
      },
      {
        title: 'Cas particuliers',
        forms: [
          ['I am late, ...', "aren't I? (jamais amn't I)"],
          ["Let's take a break, ...", 'shall we?'],
          ['Open the door, ...', 'will you? (demande)'],
          ['Nobody called, ...', 'did they? (sens négatif, tag affirmatif)'],
          ['Someone left, ...', "didn't they?"],
          ['Nothing went wrong, ...', 'did it?']
        ],
        uses: ["Intonation descendante : on attend une confirmation. Intonation montante : vraie question."]
      }
    ],
    tables: [],
    notes: ["Avec nobody, nothing, no one, never, hardly, la phrase est négative par le sens : le tag est affirmatif.", "It must be a mistake appelle isn't it ? : must de déduction ne se reprend pas dans le tag."],
    rule: "+ donne tag −, − donne tag +, même auxiliaire que la phrase principale."
  },
  enMeta: {
    title: 'Question Tags',
    recap: {
      blocks: [
        {
          title: 'Formation',
          forms: [
            ['She works here, ...', "doesn't she?"],
            ['They were late, ...', "weren't they?"],
            ['He can swim, ...', "can't he?"],
            ['We will finish soon, ...', "won't we?"],
            ["She doesn't know, ...", 'does she?'],
            ['They didn\'t come, ...', 'did they?']
          ],
          uses: ['Affirmative sentence: negative tag. Negative sentence: affirmative tag. Same auxiliary (do / does / did if the sentence has none).']
        },
        {
          title: 'Special cases',
          forms: [
            ['I am late, ...', "aren't I? (never amn't I)"],
            ["Let's take a break, ...", 'shall we?'],
            ['Open the door, ...', 'will you? (request)'],
            ['Nobody called, ...', 'did they? (negative meaning, affirmative tag)'],
            ['Someone left, ...', "didn't they?"],
            ['Nothing went wrong, ...', 'did it?']
          ],
          uses: ['Falling intonation: you expect confirmation. Rising intonation: a real question.']
        }
      ],
      tables: [],
      notes: ['With nobody, nothing, no one, never, hardly, the sentence is negative in meaning: the tag is affirmative.', 'It must be a mistake takes isn\'t it?: a must of deduction is not repeated in the tag.'],
      rule: '+ gives a negative tag, − gives an affirmative tag, same auxiliary as the main clause.'
    }
  }
};
