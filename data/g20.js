// G20 : Accord et désaccord (so / neither / nor)
import { S, FICHE, MURPHY, T, R, W, P, SK } from './dsl2.js';

const AG = T("Réponds à A en exprimant l'accord (so / neither).", 'Reply to A by agreeing (so / neither).');
const DG = T('Réponds à A en exprimant le désaccord.', 'Reply to A by disagreeing.');
const so = (aux, subs = ['I']) => subs.map((s) => `So ${aux} ${s}.`);
const ne = (aux, subs = ['I']) => subs.flatMap((s) => [`Neither ${aux} ${s}.`, `Nor ${aux} ${s}.`]);
const POS = "Phrase affirmative : so + même auxiliaire + sujet.";
const POSE = 'Affirmative sentence: so + same auxiliary + subject.';
const NEG = 'Phrase négative : neither / nor + même auxiliaire + sujet (auxiliaire affirmatif).';
const NEGE = 'Negative sentence: neither / nor + same auxiliary + subject (affirmative auxiliary).';
const DIS = "Désaccord : sujet + auxiliaire de sens contraire (négatif si A est affirmatif, affirmatif si A est négatif).";
const DISE = 'Disagreement: subject + auxiliary of the opposite polarity (negative if A is affirmative, affirmative if A is negative).';

const guideeA = [
  AG('A: I enjoy working in a multidisciplinary team.', so('do'), "A : J'aime travailler dans une équipe pluridisciplinaire. B : Moi aussi.", POS + ' Présent simple : do.', POSE + ' Present simple: do.'),
  AG("A: She can't drive.", ne('can'), "A : Elle ne sait pas conduire. B : Moi non plus.", NEG + ' Modal can.', NEGE + ' Modal can.'),
  AG('A: He has been promoted.', so('have', ['I']).concat(so('has', ['she', 'he'])), "A : Il a été promu. B : Moi aussi (ou : elle aussi).", POS + ' Present perfect : has / have.', POSE + ' Present perfect: has / have.'),
  AG("A: I don't understand this formula.", ne('do'), "A : Je ne comprends pas cette formule. B : Moi non plus.", NEG + ' Présent simple : do.', NEGE + ' Present simple: do.'),
  AG('A: We will present tomorrow.', so('will', ['we', 'I']), "A : Nous présenterons demain. B : Nous aussi.", POS + ' Futur : will.', POSE + ' Future: will.'),
  AG('A: She had already finished when I arrived.', so('had', ['I', 'he']), "A : Elle avait déjà fini quand je suis arrivé. B : Moi aussi (j'avais déjà fini).", POS + ' Plus-que-parfait : had.', POSE + ' Past perfect: had.'),
  AG("A: I couldn't follow the lecture.", ne('could'), "A : Je n'ai pas pu suivre le cours. B : Moi non plus.", NEG + ' Modal could.', NEGE + ' Modal could.'),
  AG('A: He would prefer to work remotely.', so('would', ['I', 'she']), "A : Il préférerait travailler à distance. B : Moi aussi.", POS + ' Conditionnel : would.', POSE + ' Conditional: would.'),
  AG('A: She loves coding challenges.', so('do', ['I']).concat(so('does', ['he', 'she'])), "A : Elle adore les défis de programmation. B : Moi aussi.", POS + ' Présent simple : do ou does selon le sujet de B.', POSE + ' Present simple: do or does depending on B\'s subject.'),
  AG("A: I haven't seen the new system yet.", ne('have'), "A : Je n'ai pas encore vu le nouveau système. B : Moi non plus.", NEG + ' Present perfect : have.', NEGE + ' Present perfect: have.')
];
const guideeB = [
  DG('A: I hate writing technical reports. B: (you like it)', ['I do.', 'I love them.', 'I like them.', 'I do, I love them.', 'Actually, I do.', 'Actually, I love them.'], "A : Je déteste rédiger des rapports techniques. B : Pas moi, j'aime ça.", 'A est affirmatif (hate) : B répond avec un auxiliaire affirmatif (I do) ou par une phrase positive.', 'A is affirmative (hate): B answers with an affirmative auxiliary (I do) or a positive sentence.'),
  DG('A: She is very efficient. B: (she is not)', ["She isn't.", 'She is not.', "Actually, she isn't.", "No, she isn't.", "I don't think she is."], "A : Elle est très efficace. B : Pas du tout, elle ne l'est pas.", DIS, DISE),
  DG("A: They can't come to the meeting. B: (they can)", ['They can.', 'Actually, they can.', 'Yes, they can.'], "A : Ils ne peuvent pas venir à la réunion. B : Si, ils peuvent.", DIS, DISE),
  DG("A: I didn't enjoy the lecture. B: (you found it very good)", ['I did.', 'I loved it.', 'I enjoyed it.', 'Actually, I did.', 'I really enjoyed it.', 'I thought it was great.', 'I found it very good.'], "A : Je n'ai pas aimé le cours. B : Moi si, je l'ai trouvé très bien.", DIS, DISE),
  DG('A: The project was successful. B: (it was not)', ["It wasn't.", 'It was not.', "Actually, it wasn't.", "No, it wasn't.", "I don't think it was."], "A : Le projet a été un succès. B : Non, pas du tout.", DIS, DISE),
  DG("A: She hasn't submitted yet. B: (she already has)", ['She has.', 'Actually, she has.', 'Yes, she has.', "She's already submitted it.", 'She has already submitted it.', 'She has submitted it already.'], "A : Elle n'a pas encore rendu son travail. B : Si, elle l'a déjà fait.", DIS, DISE),
  DG('A: I would rather stay. B: (you would rather leave)', ["I wouldn't.", 'I would not.', "I'd rather leave.", 'I would rather leave.', "Actually, I wouldn't.", "I wouldn't, I'd rather leave."], "A : Je préférerais rester. B : Pas moi, je préfère partir.", DIS, DISE),
  DG('A: He could solve it. B: (he could not)', ["He couldn't.", 'He could not.', "Actually, he couldn't.", "No, he couldn't."], "A : Il pouvait le résoudre. B : Non, il n'y arrivait pas.", DIS, DISE),
  DG('A: We had finished by then. B: (not yet)', ["We hadn't.", 'We had not.', "Actually, we hadn't.", "No, we hadn't."], "A : Nous avions fini à ce moment-là. B : Non, pas encore.", DIS, DISE),
  DG("A: I'm not going to attend. B: (you are going)", ['I am.', 'Actually, I am.', "I'm going to attend.", 'I am going to attend.', "I'm going.", 'I am going.'], "A : Je ne vais pas y assister. B : Moi si, j'y vais.", DIS, DISE)
];
const nivA = [
  AG('A: I work late every day.', so('do'), "A : Je travaille tard tous les jours. B : Moi aussi.", POS, POSE),
  AG("A: She doesn't enjoy public speaking.", ne('does', ['he']).concat(ne('do', ['I'])), "A : Elle n'aime pas parler en public. B : Lui non plus (ou : moi non plus).", NEG + ' Présent simple : does / do selon le sujet de B.', NEGE + ' Present simple: does / do depending on B\'s subject.'),
  AG('A: He has submitted his report.', so('have', ['I']).concat(so('has', ['she'])), "A : Il a remis son rapport. B : Moi aussi.", POS, POSE),
  AG('A: We will be presenting next Monday.', so('will', ['we', 'I']), "A : Nous présenterons lundi prochain. B : Nous aussi.", POS, POSE),
  AG("A: I can't stand long meetings.", ne('can'), "A : Je ne supporte pas les longues réunions. B : Moi non plus.", NEG, NEGE)
];
const nivB = [
  DG('A: She is very organised. B: (disagree)', ["She isn't.", 'She is not.', "Actually, she isn't.", "No, she isn't.", "I don't think she is.", "I don't think so."], "A : Elle est très organisée. B : (désaccord).", DIS, DISE),
  DG("A: I don't use social media for professional purposes. B: (disagree)", ['I do.', 'Actually, I do.', 'Well, I do.', 'I do use it.'], "A : Je n'utilise pas les réseaux sociaux à des fins professionnelles. B : (désaccord).", DIS, DISE),
  AG('A: He worked on the project all night.', so('did', ['I', 'she', 'they']), "A : Il a travaillé sur le projet toute la nuit. B : Moi aussi.", POS + ' Prétérit : did.', POSE + ' Past simple: did.'),
  DG("A: They haven't arrived yet. B: (they have arrived)", ['They have.', 'Actually, they have.', 'Yes, they have.', "They've arrived.", 'They have arrived.', "They've already arrived.", 'They have already arrived.'], "A : Ils ne sont pas encore arrivés. B : Si, ils sont arrivés.", DIS, DISE),
  AG('A: I would rather work from home.', so('would', ['I']), "A : Je préférerais travailler à domicile. B : Moi aussi.", POS + ' would.', POSE + ' would.'),
  AG('A: She loves solving complex data problems.', so('do', ['I']).concat(so('does', ['he', 'she'])), "A : Elle adore résoudre des problèmes de données complexes. B : Moi aussi.", POS, POSE),
  AG("A: We didn't finish on time.", ne('did', ['we', 'I']), "A : Nous n'avons pas fini à temps. B : Nous non plus.", NEG + ' Prétérit : did.', NEGE + ' Past simple: did.'),
  AG('A: He can speak three languages fluently.', so('can', ['I', 'she']), "A : Il parle couramment trois langues. B : Moi aussi.", POS + ' Modal can.', POSE + ' Modal can.'),
  DG("A: I'm not attending the seminar. B: (you are going)", ['I am.', 'Actually, I am.', "I'm attending.", 'I am attending.', "I'm going.", 'I am going.'], "A : Je n'assiste pas au séminaire. B : Moi si, j'y vais.", DIS, DISE),
  AG('A: They should review the data.', so('should', ['we', 'I']), "A : Ils devraient revoir les données. B : Nous aussi (nous le devrions).", POS + ' Modal should.', POSE + ' Modal should.')
];
const nivC = [
  R("A : J'aime beaucoup travailler en équipe. B : Moi aussi.", ['A: I really enjoy working in a team. B: So do I.', 'A: I really like working in a team. B: So do I.', 'A: I enjoy working in a team a lot. B: So do I.', 'A: I like working in a team a lot. B: So do I.', 'A: I love working in a team. B: So do I.', 'A: I enjoy working in a team very much. B: So do I.', 'A: I like working in a team very much. B: So do I.'], 'Présent simple : So do I.', 'Present simple: So do I.'),
  R("A : Elle ne comprend pas ce concept. B : Moi non plus.", ["A: She doesn't understand this concept. B: Neither do I.", 'A: She does not understand this concept. B: Neither do I.', "A: She doesn't understand this concept. B: Nor do I.", 'A: She does not understand this concept. B: Nor do I.', "A: She doesn't understand this idea. B: Neither do I.", "A: She doesn't understand this idea. B: Nor do I."], 'Phrase négative : Neither do I.', 'Negative sentence: Neither do I.'),
  R("A : Il a déjà rendu son rapport. B : Moi aussi.", ['A: He has already submitted his report. B: So have I.', "A: He's already submitted his report. B: So have I.", 'A: He has already handed in his report. B: So have I.', "A: He's already handed in his report. B: So have I.", 'A: He has submitted his report already. B: So have I.'], 'Present perfect : So have I.', 'Present perfect: So have I.'),
  R("A : Tu n'as pas assisté à la conférence. B : Si, j'y étais !", ["A: You didn't attend the conference. B: I did!", "A: You didn't attend the conference. B: Yes, I did!", "A: You didn't attend the conference. B: Actually, I was there!", "A: You didn't attend the conference. B: I was there!", "A: You didn't attend the conference. B: Actually, I did.", "A: You didn't go to the conference. B: I did!", "A: You didn't go to the conference. B: Actually, I was there!", "A: You did not attend the conference. B: I did!", "A: You did not attend the conference. B: I was there!", "A: You weren't at the conference. B: I was!", "A: You weren't at the conference. B: Yes, I was!"], 'Désaccord : I did / I was.', 'Disagreement: I did / I was.'),
  R("A : Nous préférerions rester ici. B : Nous aussi.", ['A: We would rather stay here. B: So would we.', "A: We'd rather stay here. B: So would we.", 'A: We would prefer to stay here. B: So would we.', 'A: We would sooner stay here. B: So would we.', "A: We'd prefer to stay here. B: So would we.", "A: We'd sooner stay here. B: So would we."], 'would : So would we.', 'would: So would we.')
];
const bonus = [
  P("Réponds de plusieurs façons (accord, puis désaccord) : 'I think AI will transform every industry.'", "A: 'I think AI will transform every industry.' Agree and disagree.", ['So do I. / I think so too. / Absolutely. / I don\'t think so. / Do you really? / I\'m not so sure.'], 'Utilise so + auxiliaire pour l\'accord.', "Agree and disagree.", 'Use so + auxiliary to agree.'),
  P("Réponds de plusieurs façons (au moins deux) : 'Engineering is more demanding than other disciplines.'", "A: 'Engineering is more demanding than other disciplines.' Give at least two responses.", ["So I believe. / You're right. / I don't think that's necessarily true. / That depends on the discipline."], 'Accord ou désaccord nuancé.', "Give at least two responses.", 'Agreement or nuanced disagreement.'),
  P("Exprime l'accord de trois façons : 'English is essential for any science career.'", "A: 'English is essential for any science career.' Agree in three ways.", ["So it is. / I agree. / Definitely. / I couldn't agree more."], 'Trois formules différentes.', "Agree in three ways.", 'Three different expressions.')
];
const devoir = [
  AG('A: I enjoy working in international teams.', so('do'), "A : J'aime travailler dans des équipes internationales. B : Moi aussi.", POS, POSE),
  AG("A: She can't write well in English.", ne('can'), "A : Elle n'écrit pas bien en anglais. B : Moi non plus.", NEG, NEGE),
  AG('A: He has already submitted his thesis.', so('have', ['I']).concat(so('has', ['she'])), "A : Il a déjà remis sa thèse. B : Moi aussi.", POS, POSE),
  DG("A: I didn't study engineering as my first degree. B: (you did)", ['I did.', 'Actually, I did.', 'Well, I did.', 'I studied engineering as my first degree.'], "A : Je n'ai pas fait d'ingénierie comme premier diplôme. B : Moi si.", DIS, DISE),
  AG('A: We will be working late tonight.', so('will', ['we', 'I']), "A : Nous travaillerons tard ce soir. B : Nous aussi.", POS, POSE),
  DG("A: I'm not happy with the current results. B: (you are)", ['I am.', 'Actually, I am.', "I'm happy with them.", 'I am happy with them.', 'Well, I am.', "I'm happy with the current results.", 'I am happy with the current results.'], "A : Je ne suis pas satisfait des résultats actuels. B : Moi si.", DIS, DISE),
  AG('A: She was promoted last month.', so('was', ['he', 'I']), "A : Elle a été promue le mois dernier. B : Lui aussi.", POS + ' was.', POSE + ' was.'),
  AG('A: I have never missed a professional deadline.', ne('have'), "A : Je n'ai jamais manqué une échéance professionnelle. B : Moi non plus.", 'never est déjà une négation : neither / nor + have + sujet.', 'never is already a negative: neither / nor + have + subject.'),
  DG("A: They couldn't solve the technical problem. B: (they could)", ['They could.', 'Actually, they could.', 'Yes, they could.', 'They solved it.', 'They did solve it.', 'They did.'], "A : Ils n'ont pas pu résoudre le problème technique. B : Si, ils ont réussi.", DIS, DISE),
  AG("A: I'd rather take the train than fly.", so('would', ['I']), "A : Je préfère prendre le train plutôt que l'avion. B : Moi aussi.", POS + ' would.', POSE + ' would.'),
  AG("A: He hadn't seen the error before the submission.", ne('had'), "A : Il n'avait pas vu l'erreur avant la remise. B : Moi non plus.", NEG + ' had.', NEGE + ' had.'),
  AG("A: She wouldn't accept that kind of offer.", ne('would'), "A : Elle n'accepterait pas ce genre d'offre. B : Moi non plus.", NEG + ' would.', NEGE + ' would.'),
  DG("A: I don't have much experience with this software. B: (you do)", ['I do.', 'Actually, I do.', 'Well, I do.', 'I have a lot of experience with it.', 'I have quite a lot of experience with it.'], "A : Je n'ai pas beaucoup d'expérience avec ce logiciel. B : Moi si.", DIS, DISE),
  AG('A: We should revise our methodology.', so('should', ['we']), "A : Nous devrions réviser notre méthodologie. B : Oui, nous aussi.", POS + ' should.', POSE + ' should.'),
  DG('A: The project will be finished on time. B: (you think not)', ["It won't.", 'It will not.', "I don't think it will.", "No, it won't.", "Actually, it won't."], "A : Le projet sera fini à temps. B : Je ne pense pas.", DIS, DISE)
];
const m20a = [
  AG('A: I love this prototype.', so('do'), "A : J'adore ce prototype. B : Moi aussi.", POS, POSE),
  AG("A: He can't swim.", ne('can'), "A : Il ne sait pas nager. B : Moi non plus.", NEG, NEGE),
  AG('A: She has been transferred.', so('have', ['I']).concat(so('has', ['he'])), "A : Elle a été mutée. B : Moi aussi.", POS, POSE),
  DG('A: I hate long emails. B: (you like them)', ['I don\'t.', 'I like them.', 'I love them.', 'Actually, I like them.'], "A : Je déteste les longs courriels. B : Pas moi, je les aime.", DIS, DISE),
  AG('A: We will launch next week.', so('will', ['we', 'I']), "A : Nous lancerons la semaine prochaine. B : Nous aussi.", POS, POSE)
];
const m20b = [
  W('is / so / she', ['So is she.'], "Elle aussi.", 'so + be + sujet.', 'so + be + subject.'),
  W('can / neither / we', ['Neither can we.', 'Nor can we.'], "Nous non plus.", 'neither + can + sujet.', 'neither + can + subject.'),
  W('did / so / they', ['So did they.'], "Eux aussi.", 'so + did + sujet.', 'so + did + subject.'),
  W('am / neither / I', ['Neither am I.', 'Nor am I.'], "Moi non plus.", 'neither + am + I.', 'neither + am + I.'),
  W('would / so / I', ['So would I.'], "Moi aussi.", 'so + would + sujet.', 'so + would + subject.'),
  W('had / neither / he', ['Neither had he.', 'Nor had he.'], "Lui non plus.", 'neither + had + sujet.', 'neither + had + subject.'),
  W('do / so / they', ['So do they.'], "Eux aussi.", 'so + do + sujet.', 'so + do + subject.'),
  W('does / neither / she', ['Neither does she.', 'Nor does she.'], "Elle non plus.", 'neither + does + sujet.', 'neither + does + subject.')
];
const th = [
  R("Lui aussi, il aime son travail.", ['So does he.'], 'Présent simple : so does he.', 'Present simple: so does he.'),
  R("Moi non plus, je n'ai pas terminé.", ['Neither have I.', 'Nor have I.'], 'Present perfect négatif : neither have I.', 'Negative present perfect: neither have I.'),
  R("Eux aussi, ils étaient présents.", ['So were they.'], 'Prétérit de be : so were they.', 'Past of be: so were they.'),
  R("Elle non plus, elle n'a pas répondu.", ['Neither did she.', 'Nor did she.'], 'Prétérit négatif : neither did she.', 'Negative past simple: neither did she.'),
  R("Nous aussi, nous devrions vérifier.", ['So should we.'], 'Modal should : so should we.', 'Modal should: so should we.'),
  R("Lui non plus, il n'accepterait pas.", ['Neither would he.', 'Nor would he.'], 'would négatif : neither would he.', 'Negative would: neither would he.'),
  R("Moi aussi, je dois y aller.", ['So must I.', 'So do I.', 'So have I.'], 'Modal must : so must I (so do I avec have to).', 'Modal must: so must I (so do I with have to).'),
  R("Moi non plus, je n'y étais pas.", ['Neither was I.', 'Nor was I.'], 'Prétérit de be négatif : neither was I.', 'Negative past of be: neither was I.')
];
const MT = ['Me too.'];
const MN = ['Me neither.'];
const INF = ' (Me too / Me neither, plus familiers, restent corrects.)';
const INFE = ' (Me too / Me neither, more informal, are also correct.)';
const synA = [
  AG("A: I'm learning German this semester.", [...so('am'), ...MT], "A : J'apprends l'allemand ce semestre. B : Moi aussi.", POS + ' Présent continu : am.' + INF, POSE + ' Present continuous: am.' + INFE),
  AG("A: She doesn't like early meetings.", [...ne('do'), ...MN], "A : Elle n'aime pas les réunions matinales. B : Moi non plus.", NEG + ' Présent simple : do.' + INF, NEGE + ' Present simple: do.' + INFE),
  AG("A: They've finished the prototype.", [...so('have', ['we', 'I'])], "A : Ils ont terminé le prototype. B : Nous aussi.", POS + ' Present perfect : have.', POSE + ' Present perfect: have.'),
  AG("A: He wasn't aware of the problem.", [...ne('was', ['I', 'she', 'he']), ...MN], "A : Il n'était pas au courant du problème. B : Moi non plus.", NEG + ' Prétérit de be : was.' + INF, NEGE + ' Past of be: was.' + INFE),
  AG('A: We must submit it by Friday.', [...so('must', ['I', 'we']), ...MT], "A : Nous devons le rendre avant vendredi. B : Moi aussi.", POS + ' Modal must.' + INF, POSE + ' Modal must.' + INFE),
  AG("A: I'd love to visit Tokyo.", [...so('would'), ...MT], "A : J'aimerais beaucoup visiter Tokyo. B : Moi aussi.", POS + " I'd = I would : would." + INF, POSE + " I'd = I would: would." + INFE),
  AG("A: She isn't coming to the party.", [...ne('am'), ...ne('is', ['he']), ...MN], "A : Elle ne vient pas à la fête. B : Moi non plus.", NEG + ' Présent continu : am (pour I) ou is (pour he).' + INF, NEGE + ' Present continuous: am (for I) or is (for he).' + INFE),
  AG('A: I went to the conference last year.', [...so('did'), ...MT], "A : Je suis allé à la conférence l'an dernier. B : Moi aussi.", POS + ' Prétérit : did.' + INF, POSE + ' Past simple: did.' + INFE),
  AG("A: I haven't answered my emails.", [...ne('have'), ...MN], "A : Je n'ai pas répondu à mes courriels. B : Moi non plus.", NEG + ' Present perfect : have.' + INF, NEGE + ' Present perfect: have.' + INFE),
  AG('A: I should apply for that job.', [...so('should'), ...MT], "A : Je devrais postuler à ce poste. B : Moi aussi.", POS + ' Modal should.' + INF, POSE + ' Modal should.' + INFE),
  AG("A: We didn't expect such a result.", [...ne('did', ['we', 'I']), ...MN], "A : Nous ne nous attendions pas à un tel résultat. B : Nous non plus.", NEG + ' Prétérit : did.' + INF, NEGE + ' Past simple: did.' + INFE),
  AG('A: I can speak Spanish.', [...so('can'), ...MT], "A : Je sais parler espagnol. B : Moi aussi.", POS + ' Modal can.' + INF, POSE + ' Modal can.' + INFE),
  DG('A: I love early mornings. B: (you do not)', ["I don't.", 'I do not.', "Actually, I don't.", "No, I don't.", "Not me, I don't."], "A : J'adore les petits matins. B : Pas moi.", DIS, DISE),
  DG("A: She can't swim. B: (she can)", ['She can.', 'Actually, she can.', 'Yes, she can.', 'She can, actually.'], "A : Elle ne sait pas nager. B : Si, elle sait.", DIS, DISE),
  DG("A: We didn't win. B: (we did)", ['We did.', 'Actually, we did.', 'Yes, we did.', 'We did, actually.'], "A : Nous n'avons pas gagné. B : Si, nous avons gagné.", DIS, DISE)
];
const synB = [
  R("A : J'adore cette série. B : Moi aussi.", ['A: I love this series. B: So do I.', "A: I love this series. B: Me too."], 'Phrase affirmative : so do I.', 'Affirmative sentence: so do I.'),
  R("A : Je n'ai pas compris l'exercice. B : Moi non plus.", ["A: I didn't understand the exercise. B: Neither did I.", "A: I didn't understand the exercise. B: Nor did I.", "A: I didn't understand the exercise. B: Me neither."], 'Phrase négative : neither did I.', 'Negative sentence: neither did I.'),
  R("A : Elle a déjà postulé. B : Lui aussi.", ['A: She has already applied. B: So has he.', "A: She's already applied. B: So has he."], 'Present perfect : so has he.', 'Present perfect: so has he.'),
  R("A : Je ne peux pas venir demain. B : Moi non plus.", ["A: I can't come tomorrow. B: Neither can I.", "A: I can't come tomorrow. B: Nor can I.", "A: I cannot come tomorrow. B: Neither can I.", "A: I can't come tomorrow. B: Me neither."], 'Modal négatif : neither can I.', 'Negative modal: neither can I.'),
  R("A : Nous étions en retard. B : Eux aussi.", ['A: We were late. B: So were they.', 'A: We were late. B: They were too.'], 'Prétérit de be : so were they.', 'Past of be: so were they.'),
  R("A : Il n'a jamais voyagé en avion. B : Elle non plus.", ['A: He has never travelled by plane. B: Neither has she.', 'A: He has never travelled by plane. B: Nor has she.', 'A: He has never flown. B: Neither has she.', 'A: He has never traveled by plane. B: Neither has she.'], 'Never est déjà négatif : neither has she.', 'Never is already negative: neither has she.'),
  R("A : Je travaillerai à la maison demain. B : Moi aussi.", ["A: I'll work at home tomorrow. B: So will I.", "A: I will work at home tomorrow. B: So will I.", "A: I'll work from home tomorrow. B: So will I."], 'Futur : so will I.', 'Future: so will I.'),
  R("A : Je déteste les réunions du lundi. B : Moi, je les aime.", ['A: I hate Monday meetings. B: I don\'t, I like them.', 'A: I hate Monday meetings. B: Actually, I like them.', 'A: I hate Monday meetings. B: Well, I like them.'], 'Désaccord : auxiliaire de sens contraire, ou reformulation.', 'Disagreement: auxiliary of opposite polarity, or a rephrasing.'),
  R("A : Elle n'est pas contente. B : Si, elle l'est.", ["A: She isn't happy. B: Yes, she is.", "A: She is not happy. B: Yes, she is.", "A: She isn't happy. B: Actually, she is."], 'A négatif : B répond avec un auxiliaire affirmatif.', 'A is negative: B answers with an affirmative auxiliary.'),
  R("A : Ils ont gagné. B : Non, ils n'ont pas gagné.", ["A: They won. B: No, they didn't.", "A: They won. B: No, they did not.", "A: They won. B: Actually, they didn't."], 'A affirmatif : B répond avec un auxiliaire négatif.', 'A is affirmative: B answers with a negative auxiliary.'),
  R("A : Je ne suis pas d'accord. B : Moi non plus.", ["A: I don't agree. B: Neither do I.", "A: I do not agree. B: Neither do I.", "A: I don't agree. B: Nor do I.", "A: I don't agree. B: Me neither."], 'Présent simple négatif : neither do I.', 'Negative present simple: neither do I.'),
  R("A : Mon frère adore le jazz. B : Le mien aussi.", ['A: My brother loves jazz. B: So does mine.', 'A: My brother loves jazz. B: Mine does too.', 'A: My brother loves jazz. B: So does my brother.'], 'Sujet différent : so does mine.', 'Different subject: so does mine.'),
  R("A : Je préférerais partir tôt. B : Moi aussi.", ["A: I'd rather leave early. B: So would I.", "A: I would rather leave early. B: So would I.", "A: I'd prefer to leave early. B: So would I."], 'Would rather / would prefer : so would I.', 'Would rather / would prefer: so would I.')
];
const synC = [
  P("Corrige la réponse de B.", 'A: I love chocolate. B: So I do.', ['A: I love chocolate. B: So do I.'], "Place l'auxiliaire avant le sujet.", 'Correct the reply of B.', 'Put the auxiliary before the subject.'),
  P("Corrige la réponse de B.", "A: I can't swim. B: Neither I can.", ["A: I can't swim. B: Neither can I.", "A: I can't swim. B: Nor can I."], "Après neither, l'ordre est inversé.", 'Correct the reply of B.', 'After neither, the order is inverted.'),
  P("Corrige la réponse de B.", 'A: She works hard. B: So does I.', ['A: She works hard. B: So do I.'], "L'auxiliaire s'accorde avec le sujet de B.", 'Correct the reply of B.', 'The auxiliary agrees with the subject of B.'),
  P("Corrige la réponse de B.", "A: I don't like fish. B: Neither don't I.", ["A: I don't like fish. B: Neither do I.", "A: I don't like fish. B: Nor do I."], "Neither contient déjà la négation.", 'Correct the reply of B.', 'Neither already contains the negative.'),
  P("Corrige la réponse de B.", 'A: He is tired. B: So is I.', ['A: He is tired. B: So am I.'], "Quelle forme de be avec I ?", 'Correct the reply of B.', 'Which form of be goes with I?'),
  P("Corrige la réponse de B.", "A: They didn't come. B: Nor they did.", ["A: They didn't come. B: Nor did we.", "A: They didn't come. B: Neither did we.", "A: They didn't come. B: Nor did I.", "A: They didn't come. B: Neither did I."], "Inverse l'auxiliaire et le sujet.", 'Correct the reply of B.', 'Invert the auxiliary and the subject.'),
  P("Corrige la réponse de B.", 'A: I will go. B: So will me.', ['A: I will go. B: So will I.'], "Après l'auxiliaire, quelle forme du pronom ?", 'Correct the reply of B.', 'After the auxiliary, which pronoun form?'),
  P("Corrige la réponse de B.", "A: She doesn't smoke. B: Neither am I.", ["A: She doesn't smoke. B: Neither do I.", "A: She doesn't smoke. B: Nor do I."], "Reprends l'auxiliaire de la phrase de A.", 'Correct the reply of B.', "Repeat the auxiliary of A's sentence."),
  P("Corrige la réponse de B.", 'A: I like jazz. B: Neither do I.', ['A: I like jazz. B: So do I.'], "A est affirmatif : quel mot d'accord ?", 'Correct the reply of B.', 'A is affirmative: which word of agreement?'),
  P("Corrige la réponse de B.", "A: I'm not tired. B: Me too.", ["A: I'm not tired. B: Me neither.", "A: I'm not tired. B: Neither am I.", "A: I'm not tired. B: Nor am I."], "Me too ne convient pas à une phrase négative.", 'Correct the reply of B.', 'Me too does not suit a negative sentence.'),
  P("Corrige la réponse de B.", 'A: We were late. B: So did we.', ['A: We were late. B: So were we.'], "Reprends le verbe de A, pas un auxiliaire différent.", 'Correct the reply of B.', "Repeat the verb of A, not a different auxiliary."),
  P("Corrige la réponse de B.", "A: I haven't finished. B: Neither I have.", ["A: I haven't finished. B: Neither have I.", "A: I haven't finished. B: Nor have I."], "Inverse l'auxiliaire et le sujet.", 'Correct the reply of B.', 'Invert the auxiliary and the subject.')
];

const A = SK('Accord avec so et neither', 'Agreeing with so and neither');
const B = SK('Désaccord : répondre par un auxiliaire', 'Disagreeing with an auxiliary');
export const G20 = {
  id: 'G20',
  title: 'Accord et désaccord (So / Neither / Nor)',
  coursUrl: '',
  skills: {
    '*': A,
    'g20-guidee-b': B, 'g20-niv-b': B,
    'g20-niv-c': SK('Accord et désaccord : thème', 'Agreement and disagreement: translation'),
    'g20-th': SK('Accord et désaccord : thème', 'Agreement and disagreement: translation'),
    'g20-bonus': SK('Réponses courtes variées', 'Varied short answers'),
    'g20-m20b': SK('Ordre des mots', 'Word order'),
    'g20-synth-a': SK('Synthèse : construire la réponse', 'Review: building the reply'),
    'g20-synth-b': SK('Synthèse : thème', 'Review: translation'),
    'g20-synth-c': SK('Synthèse : repérer et corriger', 'Review: spotting and correcting')
  },
  sets: [
    S('g20-guidee-a', FICHE, ['Série guidée A : so et neither', 'Guided set A: so and neither'], 'B1', ['Exprime l\'accord avec so ou neither.', 'Express agreement with so or neither.'], guideeA),
    S('g20-guidee-b', FICHE, ['Série guidée B : désaccord', 'Guided set B: disagreement'], 'B1+', ['Exprime le désaccord.', 'Express disagreement.'], guideeB),
    S('g20-niv-a', FICHE, ['Niveau A : accord', 'Level A: agreement'], 'B1', ['Exprime l\'accord.', 'Express agreement.'], nivA),
    S('g20-niv-b', FICHE, ['Niveau B : désaccord et nuances', 'Level B: disagreement and nuances'], 'B1+', ['Exprime l\'accord ou le désaccord demandé.', 'Express the agreement or disagreement required.'], nivB),
    S('g20-niv-c', FICHE, ['Niveau C : traduction', 'Level C: translation'], 'B1+', ['Traduis le dialogue en anglais.', 'Translate the dialogue into English.'], nivC),
    S('g20-bonus', FICHE, ['Bonus : réponses courtes variées', 'Bonus: varied short answers'], 'B2', ['Réponds de plusieurs façons, puis compare avec le modèle.', 'Answer in several ways, then compare with the model.'], bonus),
    S('g20-devoir', FICHE, ['Devoir maison', 'Homework'], 'B1+', ['Quinze réponses à écrire.', 'Fifteen replies to write.'], devoir),
    S('g20-synth-a', FICHE, ['Synthèse A : construis la réponse', 'Review A: build the reply'], 'B1+', ['Réponds à A en exprimant l\'accord ou le désaccord demandé.', 'Reply to A expressing the agreement or disagreement asked for.'], synA),
    S('g20-synth-b', FICHE, ['Synthèse B : thème', 'Review B: translation'], 'B2', ['Traduis le dialogue en anglais, puis compare avec le modèle et évalue-toi.', 'Translate the dialogue into English, then compare with the model and assess yourself.'], synB),
    S('g20-synth-c', FICHE, ['Synthèse C : repère et corrige l\'erreur', 'Review C: spot and correct the error'], 'B2', ['Réécris le dialogue avec la réponse de B corrigée, puis compare avec le modèle et évalue-toi.', 'Rewrite the dialogue with B\'s reply corrected, then compare with the model and assess yourself.'], synC),
    S('g20-m20a', MURPHY, ['Unité 20A : accord et désaccord', 'Unit 20A: agreement and disagreement'], 'B1', ['Réponds à A.', 'Reply to A.'], m20a),
    S('g20-m20b', MURPHY, ['Unité 20B : remettre les mots dans l\'ordre', 'Unit 20B: sentence building'], 'B1', ['Écris la réponse avec les mots dans le bon ordre.', 'Write the reply with the words in the right order.'], m20b),
    S('g20-th', MURPHY, ['Unité TH : thème grammatical', 'Unit TH: translation'], 'B1', ['Traduis en anglais avec so ou neither.', 'Translate into English with so or neither.'], th)
  ],
  recap: {
    blocks: [
      {
        title: 'So, neither, nor',
        forms: [
          ['accord avec une phrase affirmative', 'So + AUX + sujet : A: I like this project. B: So do I.'],
          ['accord avec une phrase négative', 'Neither / Nor + AUX + sujet : A: I don\'t like it. B: Neither do I.'],
          ['désaccord avec une affirmation', 'Sujet + AUX + not : A: I enjoy meetings. B: I don\'t.'],
          ['désaccord avec une négation', 'Sujet + AUX affirmatif : A: I hate reports. B: I do.']
        ],
        uses: ['L\'auxiliaire est le même que dans la phrase de départ.']
      },
      {
        title: 'Quel auxiliaire ?',
        forms: [
          ['présent simple', 'So do I. / Neither do I.'],
          ['be', 'So am I. / So is he. / Neither am I.'],
          ['present perfect', 'So have I. / Neither have I.'],
          ['modal', 'So can I. / Neither can I.'],
          ['prétérit', 'So did I. / Neither did I.'],
          ['will, would, had', 'So will I. / So would I. / So had I.']
        ],
        uses: []
      }
    ],
    tables: [],
    notes: ['Pas de verbe plein après so / neither : seulement l\'auxiliaire et le sujet.'],
    rule: 'So + aux + sujet = moi aussi. Neither + aux + sujet = moi non plus.'
  },
  enMeta: {
    title: 'Agreement: So / Neither / Nor',
    recap: {
      blocks: [
        {
          title: 'So, neither, nor',
          forms: [
            ['agreeing with an affirmative sentence', 'So + AUX + subject: A: I like this project. B: So do I.'],
            ['agreeing with a negative sentence', "Neither / Nor + AUX + subject: A: I don't like it. B: Neither do I."],
            ['disagreeing with a statement', "Subject + AUX + not: A: I enjoy meetings. B: I don't."],
            ['disagreeing with a negative', 'Subject + affirmative AUX: A: I hate reports. B: I do.']
          ],
          uses: ['The auxiliary is the same as in the original sentence.']
        },
        {
          title: 'Which auxiliary?',
          forms: [
            ['present simple', 'So do I. / Neither do I.'],
            ['be', 'So am I. / So is he. / Neither am I.'],
            ['present perfect', 'So have I. / Neither have I.'],
            ['modal', 'So can I. / Neither can I.'],
            ['past simple', 'So did I. / Neither did I.'],
            ['will, would, had', 'So will I. / So would I. / So had I.']
          ],
          uses: []
        }
      ],
      tables: [],
      notes: ['No main verb after so / neither: only the auxiliary and the subject.'],
      rule: 'So + aux + subject = me too. Neither + aux + subject = me neither.'
    }
  }
};
