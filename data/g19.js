// G19 : I wish / If only / It's (high) time / Would rather
import { S, FICHE, MURPHY, F, R, W, K, hint, SK } from './dsl2.js';

const WP = 'wish / if only + prétérit : souhait irréel présent.';
const WPE = 'wish / if only + past simple: unreal present wish.';
const WPP = 'wish / if only + past perfect : regret sur le passé.';
const WPPE = 'wish / if only + past perfect: regret about the past.';
const WW = 'wish + would : irritation ou souhait de changement chez autrui.';
const WWE = 'wish + would: irritation or a wish for someone else to change.';
const TIME = "It's (high / about) time + sujet + prétérit, même pour parler du présent ou du futur.";
const TIMEE = "It's (high / about) time + subject + past simple, even when talking about now or the future.";
const RATH = "I'd rather + sujet + prétérit : préférence concernant autrui.";
const RATHE = "I'd rather + subject + past simple: preference about someone else.";

const guideeA = [
  K('I wish I ___ (know) the answer right now.', [['knew']], "Je voudrais connaître la réponse maintenant.", WP, WPE),
  K('She wishes she ___ (study) harder before the exam.', [['had studied']], "Elle regrette de ne pas avoir étudié davantage avant l'examen.", WPP, WPPE),
  K('If only it ___ (not / rain) every single day!', [["didn't rain", 'did not rain']], "Si seulement il ne pleuvait pas tous les jours !", WP, WPE),
  K('I wish you ___ (stop) making so much noise.', [['would stop']], "J'aimerais que tu arrêtes de faire autant de bruit.", WW, WWE),
  K('He wishes he ___ (be) more confident in presentations.', [['were', 'was']], "Il voudrait être plus sûr de lui dans les exposés.", WP + ' Après wish, were est la forme correcte (was est informel).', WPE + ' After wish, were is the correct form (was is informal).'),
  K('If only they ___ (inform) us earlier about the change.', [['had informed']], "Si seulement ils nous avaient prévenus plus tôt du changement.", WPP, WPPE),
  K('She wishes she ___ (have) more time to dedicate to research.', [['had']], "Elle voudrait avoir plus de temps à consacrer à la recherche.", WP, WPE),
  K('I wish the director ___ (be) more open to innovative ideas.', [['would be', 'were', 'was']], "J'aimerais que le directeur soit plus ouvert aux idées innovantes.", WW + ' Were reste possible pour un souhait irréel présent.', WWE + ' Were is also possible for an unreal present wish.'),
  K('If only I ___ (choose) a different career path.', [['had chosen']], "Si seulement j'avais choisi une autre voie professionnelle.", WPP, WPPE),
  K('He wishes he ___ (speak) better English at the conference.', [['spoke', 'had spoken']], "Il voudrait mieux parler anglais (ou : regrette de ne pas avoir mieux parlé) à la conférence.", WP + ' Avec at the conference passé, had spoken est aussi correct.', WPE + ' With a past conference, had spoken is also correct.')
];
const guideeB = [
  K("It's time we ___ (leave), the meeting starts in ten minutes.", [['left']], "Il est temps de partir, la réunion commence dans dix minutes.", TIME, TIMEE),
  K("It's high time he ___ (stop) procrastinating and start acting.", [['stopped']], "Il est grand temps qu'il cesse de tergiverser et agisse.", TIME + ' High time : reproche fort.', TIMEE + ' High time: strong reproach.'),
  K("I'd rather ___ (work) independently on this particular task.", [['work']], "Je préférerais travailler seul sur cette tâche.", "I'd rather + base verbale (sans to).", "I'd rather + base verb (no to)."),
  K("I'd rather you ___ (not / mention) this to anyone else.", [["didn't mention", 'did not mention']], "Je préférerais que tu n'en parles à personne d'autre.", RATH, RATHE),
  K("It's time ___ (start) taking the language requirement seriously.", [['to start']], "Il est temps de prendre l'exigence de langue au sérieux.", "It's time + to + infinitif quand il n'y a pas de sujet nouveau.", "It's time + to + infinitive when there is no new subject."),
  K('She would rather ___ (stay) in France than ___ (move) abroad.', [['stay'], ['move']], "Elle préférerait rester en France plutôt que de s'installer à l'étranger.", 'would rather + base + than + base.', 'would rather + base + than + base.'),
  K("It's high time the company ___ (invest) in modern equipment.", [['invested']], "Il est grand temps que l'entreprise investisse dans du matériel moderne.", TIME, TIMEE),
  K("I'd rather he ___ (present) the data himself at the board meeting.", [['presented']], "Je préférerais qu'il présente lui-même les données au conseil.", RATH, RATHE),
  K('It is about time we ___ (address) this recurring problem.', [['addressed']], "Il est grand temps que nous traitions ce problème récurrent.", TIME, TIMEE),
  K('She would sooner ___ (resign) than compromise her professional ethics.', [['resign']], "Elle préférerait démissionner plutôt que de transiger avec son éthique professionnelle.", 'would sooner = would rather : + base verbale.', 'would sooner = would rather: + base verb.')
];
const nivA = [
  K('I wish I ___ (be) better at mathematical modelling.', [['were', 'was']], "Je voudrais être meilleur en modélisation mathématique.", WP + ' Were de préférence.', WPE + ' Were is preferred.'),
  K('She wishes she ___ (not / miss) the key conference.', [["hadn't missed", 'had not missed']], "Elle regrette d'avoir manqué la conférence principale.", WPP, WPPE),
  K('If only he ___ (arrive) on time for once!', [['arrived', 'would arrive']], "Si seulement il arrivait à l'heure pour une fois !", WP + ' Would est possible pour exprimer l\'agacement.', WPE + ' Would is possible to express annoyance.'),
  K('I wish the weather ___ (change), this rain is affecting productivity.', [['would change']], "J'aimerais que le temps change, cette pluie nuit à la productivité.", WW, WWE),
  K('She wishes she ___ (have) more relevant professional experience.', [['had']], "Elle voudrait avoir une expérience professionnelle plus pertinente.", WP, WPE)
];
const nivB = [
  K("It's time we ___ (address) this problem seriously.", [['addressed']], "Il est temps que nous traitions ce problème sérieusement.", TIME, TIMEE),
  K('He wishes his team ___ (be) more self-motivated.', [['were', 'was']], "Il voudrait que son équipe soit plus autonome dans sa motivation.", WP, WPE),
  K("I'd rather ___ (not / work) overtime this particular week.", [['not work']], "Je préférerais ne pas faire d'heures supplémentaires cette semaine.", "I'd rather + not + base verbale.", "I'd rather + not + base verb."),
  K("It's high time they ___ (update) the outdated software.", [['updated']], "Il est grand temps qu'ils mettent à jour le logiciel obsolète.", TIME, TIMEE),
  K('If only I ___ (know) about this issue earlier!', [['had known']], "Si seulement j'avais eu connaissance de ce problème plus tôt !", WPP, WPPE),
  K('I wish he ___ (listen) when I give professional advice.', [['would listen']], "J'aimerais qu'il écoute quand je donne un conseil professionnel.", WW, WWE),
  K('She wishes she ___ (choose) a different research specialisation.', [['had chosen']], "Elle regrette de ne pas avoir choisi une autre spécialité de recherche.", WPP, WPPE),
  K("It's time you ___ (take) full responsibility for your actions.", [['took']], "Il est temps que tu assumes pleinement la responsabilité de tes actes.", TIME, TIMEE),
  K("I'd rather he ___ (present) the results himself at the conference.", [['presented']], "Je préférerais qu'il présente lui-même les résultats à la conférence.", RATH, RATHE),
  K('If only we ___ (have) more time to prepare thoroughly.', [['had had', 'had']], "Si seulement nous avions eu plus de temps pour nous préparer à fond.", WPP + ' Le prétérit had est possible pour un souhait présent.', WPPE + ' The simple past had is possible for a present wish.')
];
const nivC = [
  F('I wish I know the answer.', ['I wish I knew the answer.'], "Je voudrais connaître la réponse.", WP, WPE),
  F('If only she would have told me earlier!', ['If only she had told me earlier!', 'If only she had told me earlier.'], "Si seulement elle me l'avait dit plus tôt !", 'Jamais would have après wish / if only : past perfect.', 'Never would have after wish / if only: past perfect.'),
  F("It's time we leave, the taxi is waiting.", ["It's time we left, the taxi is waiting.", 'It is time we left, the taxi is waiting.', "It's time to leave, the taxi is waiting.", 'It is time to leave, the taxi is waiting.'], "Il est temps que nous partions, le taxi attend.", TIME, TIMEE),
  F("I'd rather to work alone on this task.", ["I'd rather work alone on this task.", 'I would rather work alone on this task.'], "Je préférerais travailler seul sur cette tâche.", "I'd rather + base verbale, sans to.", "I'd rather + base verb, no to."),
  F("She wishes she didn't accepted that position.", ["She wishes she hadn't accepted that position.", 'She wishes she had not accepted that position.'], "Elle regrette d'avoir accepté ce poste.", WPP, WPPE),
  R("Je regrette de ne pas avoir appris le japonais quand j'en avais l'occasion.", ['I wish I had learned Japanese when I had the opportunity.', 'I wish I had learnt Japanese when I had the opportunity.', 'I wish I had learned Japanese when I had the chance.', 'I wish I had learnt Japanese when I had the chance.', 'If only I had learned Japanese when I had the opportunity.', 'If only I had learnt Japanese when I had the chance.', 'If only I had learned Japanese when I had the chance.', 'If only I had learnt Japanese when I had the opportunity.', 'I wish I had learned Japanese.', 'If only I had learned Japanese.'], WPP, WPPE),
  R("Il serait grand temps qu'ils investissent dans de nouveaux équipements.", ["It's high time they invested in new equipment.", 'It is high time they invested in new equipment.', "It's high time they invested in new machines.", "It's about time they invested in new equipment.", 'It is about time they invested in new equipment.'], TIME, TIMEE),
  R("Elle préférerait travailler à Lyon plutôt que de déménager à Paris.", ['She would rather work in Lyon than move to Paris.', "She'd rather work in Lyon than move to Paris.", 'She would sooner work in Lyon than move to Paris.', "She'd sooner work in Lyon than move to Paris.", 'She would rather work in Lyon than relocate to Paris.'], 'would rather + base + than + base.', 'would rather + base + than + base.'),
  R("Si seulement il avait vérifié ses calculs avant de soumettre le rapport !", ['If only he had checked his calculations before submitting the report!', 'If only he had checked his calculations before submitting the report.', 'If only he had checked his calculations before he submitted the report!', 'If only he had checked his calculations before he submitted the report.', 'If only he had checked his calculations before handing in the report!'], WPP, WPPE),
  R("Il est temps de reconsidérer sérieusement notre approche.", ["It's time to reconsider our approach seriously.", "It's time to seriously reconsider our approach.", "It's time we reconsidered our approach seriously.", "It's time we seriously reconsidered our approach.", 'It is time to reconsider our approach seriously.', 'It is time to seriously reconsider our approach.', 'It is time we reconsidered our approach seriously.', 'It is time we seriously reconsidered our approach.', "It's time to reconsider our approach thoroughly.", "It's time we reconsidered our approach."], TIME, TIMEE)
];
const bonus = [
  K('I ___ the results will be positive. (realistic expectation)', [['hope']], "J'espère que les résultats seront positifs.", 'hope : attente réaliste, suivi du temps normal.', 'hope: realistic expectation, followed by the normal tense.'),
  K('I ___ the results were different. (unreal present)', [['wish']], "J'aimerais que les résultats soient différents.", 'wish : irréel présent.', 'wish: unreal present.'),
  K('She ___ she could attend. (she cannot)', [['wishes']], "Elle voudrait pouvoir venir (mais elle ne peut pas).", 'wish + could : irréel.', 'wish + could: unreal.'),
  K('She ___ she can attend. (a real possibility)', [['hopes']], "Elle espère pouvoir venir.", 'hope + can : possibilité réelle.', 'hope + can: real possibility.'),
  K("We ___ the project succeeds, we've worked so hard.", [['hope']], "Nous espérons que le projet réussira, nous avons tant travaillé.", 'hope : possibilité réelle.', 'hope: real possibility.')
];
const devoir = [
  K('I wish I ___ (speak) perfect English, it would open so many doors.', [['spoke']], "Je voudrais parler un anglais parfait, cela ouvrirait tant de portes.", WP, WPE),
  K('She wishes she ___ (not / accept) that position, it was a mistake.', [["hadn't accepted", 'had not accepted']], "Elle regrette d'avoir accepté ce poste, c'était une erreur.", WPP, WPPE),
  K('If only he ___ (call) me before making that decision!', [['had called']], "Si seulement il m'avait appelé avant de prendre cette décision !", WPP, WPPE),
  K("It's high time you ___ (improve) your academic writing skills.", [['improved']], "Il est grand temps que tu améliores ta rédaction universitaire.", TIME, TIMEE),
  K("I'd rather ___ (stay) here than travel to the conference tomorrow.", [['stay']], "Je préférerais rester ici plutôt que d'aller à la conférence demain.", "I'd rather + base verbale.", "I'd rather + base verb."),
  K('I wish the director ___ (be) more open-minded about new proposals.', [['would be', 'were', 'was']], "J'aimerais que le directeur soit plus ouvert aux nouvelles propositions.", WW, WWE),
  K("It's time we ___ (have) a serious conversation about the project timeline.", [['had']], "Il est temps que nous ayons une vraie discussion sur le calendrier du projet.", TIME, TIMEE),
  K('She wishes she ___ (study) abroad when she had the opportunity.', [['had studied']], "Elle regrette de ne pas avoir étudié à l'étranger quand elle en avait l'occasion.", WPP, WPPE),
  K("I'd rather he ___ (not / share) confidential data with external partners.", [["didn't share", 'did not share']], "Je préférerais qu'il ne partage pas de données confidentielles avec des partenaires externes.", RATH, RATHE),
  K('If only I ___ (know) about this technical problem earlier!', [['had known']], "Si seulement j'avais connu ce problème technique plus tôt !", WPP, WPPE),
  K("It's high time the team ___ (adopt) more efficient working practices.", [['adopted']], "Il est grand temps que l'équipe adopte des méthodes de travail plus efficaces.", TIME, TIMEE),
  K('She would sooner ___ (resign) than be asked to falsify data.', [['resign']], "Elle préférerait démissionner plutôt que de devoir falsifier des données.", 'would sooner + base verbale.', 'would sooner + base verb.'),
  K('I wish you ___ (stop) interrupting me during presentations.', [['would stop']], "J'aimerais que vous cessiez de m'interrompre pendant les exposés.", WW, WWE),
  K('If only we ___ (prepare) more thoroughly for the demonstration.', [['had prepared']], "Si seulement nous nous étions préparés plus sérieusement à la démonstration.", WPP, WPPE),
  K('It is about time the institution ___ (recognise) his exceptional contribution.', [['recognised', 'recognized']], "Il est grand temps que l'institution reconnaisse son apport exceptionnel.", TIME, TIMEE)
];
const m19a1 = [
  K('I wish I ___ (have) a larger budget for this experiment.', [['had']], "Je voudrais disposer d'un budget plus important pour cette expérience.", WP, WPE),
  K('She wishes she ___ (revise) harder before the viva.', [['had revised']], "Elle regrette de ne pas avoir plus révisé avant la soutenance.", WPP, WPPE),
  K('I wish you ___ (turn) that music down!', [['would turn']], "J'aimerais que tu baisses cette musique !", WW, WWE),
  K("It's high time he ___ (update) his CV.", [['updated']], "Il est grand temps qu'il mette à jour son CV.", TIME, TIMEE),
  K("I'd rather ___ (not / work) late this Friday.", [['not work']], "Je préférerais ne pas travailler tard ce vendredi.", "I'd rather + not + base.", "I'd rather + not + base."),
];
const m19a2 = [
  F('I wish she calls me back.', ['I wish she would call me back.', 'I wish she called me back.'], "J'aimerais qu'elle me rappelle.", 'wish + would (agacement) ou prétérit : jamais le présent.', 'wish + would (annoyance) or past simple: never the present.'),
  F("It's time we go, the bus is here.", ["It's time we went, the bus is here.", 'It is time we went, the bus is here.', "It's time to go, the bus is here.", 'It is time to go, the bus is here.'], "Il est temps de partir, le bus est là.", TIME, TIMEE),
  F("I'd rather to stay home.", ["I'd rather stay home.", 'I would rather stay home.'], "Je préférerais rester à la maison.", "I'd rather + base, sans to.", "I'd rather + base, no to."),
  F('If only they would have warned us!', ['If only they had warned us!', 'If only they had warned us.'], "Si seulement ils nous avaient prévenus !", 'Jamais would have après if only.', 'Never would have after if only.')
];
const m19b = [
  W('had / I / more / wish / reliable / I / equipment', ['I wish I had more reliable equipment.'], "J'aimerais avoir un équipement plus fiable.", WP, WPE),
  W('had / she / wishes / the / accepted / offer / she', ['She wishes she had accepted the offer.'], "Elle regrette de ne pas avoir accepté l'offre.", WPP, WPPE),
  W('would / wish / reply / they / I / sooner', ['I wish they would reply sooner.'], "J'aimerais qu'ils répondent plus tôt.", WW, WWE),
  W('time / it\'s / high / learned / she / to / delegate', ["It's high time she learned to delegate."], "Il est grand temps qu'elle apprenne à déléguer.", TIME, TIMEE),
  W('stay / rather / I\'d / home / tonight', ["I'd rather stay home tonight."], "Je préférerais rester chez moi ce soir.", "I'd rather + base.", "I'd rather + base."),
  W('not / rather / I\'d / attend / the / meeting', ["I'd rather not attend the meeting."], "Je préférerais ne pas assister à la réunion.", "I'd rather + not + base.", "I'd rather + not + base."),
  W('checked / only / had / if / we / this / sooner', ['If only we had checked this sooner.'], "Si seulement nous avions vérifié cela plus tôt.", WPP, WPPE),
  W('time / emailed / it\'s / you / the / client', ["It's time you emailed the client."], "Il est temps que tu écrives au client.", TIME, TIMEE)
];
const th = [
  R("J'aimerais disposer de plus de temps libre.", ['I wish I had more free time.', 'I wish I had more spare time.', 'I wish I had some more free time.', 'I wish I had more time off.'], WP, WPE),
  R("Elle regrette de ne pas avoir pris ce poste.", ['She wishes she had taken that job.', 'She wishes she had taken that position.', 'She wishes she had accepted that job.', 'She wishes she had accepted that position.', 'She wishes she had taken the job.', 'She wishes she had taken the position.', 'She wishes she had accepted the job.', 'She wishes she had accepted the position.'], WPP, WPPE),
  R("J'aimerais qu'ils réagissent plus vite.", ['I wish they would react faster.', 'I wish they would react more quickly.', 'I wish they would respond faster.', 'I wish they would respond more quickly.', 'I wish they would act faster.', 'I wish they would act more quickly.'], WW, WWE),
  R("Il est grand temps qu'il apprenne à écouter.", ["It's high time he learned to listen.", 'It is high time he learned to listen.', "It's high time he learnt to listen.", 'It is high time he learnt to listen.'], TIME, TIMEE),
  R("Je préférerais rester chez moi ce week-end.", ["I'd rather stay home this weekend.", 'I would rather stay home this weekend.', "I'd rather stay at home this weekend.", 'I would rather stay at home this weekend.', "I'd sooner stay home this weekend.", "I'd sooner stay at home this weekend."], "I'd rather + base.", "I'd rather + base."),
  R("Je préférerais ne pas partir cette semaine.", ["I'd rather not leave this week.", 'I would rather not leave this week.', "I'd sooner not leave this week.", 'I would sooner not leave this week.', "I'd rather not go this week.", 'I would rather not go this week.'], "I'd rather + not + base.", "I'd rather + not + base."),
  R("Si seulement nous avions vérifié cela avant.", ['If only we had checked this earlier.', 'If only we had checked this before.', 'If only we had checked it earlier.', 'If only we had checked this beforehand.', 'If only we had checked that earlier.', 'If only we had checked it before.'], WPP, WPPE)
];
const A = SK('I wish et if only', 'I wish and if only');
const B = SK("It's time et would rather", "It's time and would rather");
export const G19 = {
  id: 'G19',
  title: "Souhait, regret, préférence (I wish, If only, It's time, Would rather)",
  coursUrl: '',
  skills: {
    '*': A,
    'g19-guidee-b': B, 'g19-niv-b': B,
    'g19-niv-c': SK('Souhait et regret : corrections et thème', 'Wishes and regrets: corrections and translation'),
    'g19-th': SK('Souhait et regret : corrections et thème', 'Wishes and regrets: corrections and translation'),
    'g19-m19a-2': SK('Souhait et regret : corrections et thème', 'Wishes and regrets: corrections and translation'),
    'g19-bonus': SK('Wish ou hope', 'Wish or hope'),
    'g19-m19b': B
  },
  sets: [
    S('g19-guidee-a', FICHE, ['Série guidée A : I wish, if only', 'Guided set A: I wish, if only'], 'B2', ['Mets le verbe à la forme correcte.', 'Put the verb in the correct form.'], guideeA),
    S('g19-guidee-b', FICHE, ["Série guidée B : it's time, would rather", "Guided set B: it's time, would rather"], 'B2', ['Mets le verbe à la forme correcte.', 'Put the verb in the correct form.'], guideeB),
    S('g19-niv-a', FICHE, ['Niveau A : I wish, if only', 'Level A: I wish, if only'], 'B1+', ['Mets le verbe à la forme correcte.', 'Put the verb in the correct form.'], nivA),
    S('g19-niv-b', FICHE, ['Niveau B : toutes structures', 'Level B: all structures'], 'B2', ['Mets le verbe à la forme correcte.', 'Put the verb in the correct form.'], nivB),
    S('g19-niv-c', FICHE, ['Niveau C : erreurs et traduction', 'Level C: errors and translation'], 'B2', ['Corrige cinq phrases, puis traduis cinq phrases.', 'Correct five sentences, then translate five sentences.'], nivC),
    S('g19-bonus', FICHE, ['Bonus : wish ou hope', 'Bonus: wish or hope'], 'B2', ['Complète avec wish ou hope.', 'Complete with wish or hope.'], bonus),
    S('g19-devoir', FICHE, ['Devoir maison', 'Homework'], 'B2', ['Quinze phrases à compléter.', 'Fifteen sentences to complete.'], devoir),
    S('g19-m19a-1', MURPHY, ['Unité 19A : souhait, regret, préférence (1/2)', 'Unit 19A: wishes, regrets, preferences (1/2)'], 'B2', ['Mets le verbe à la forme correcte.', 'Put the verb in the correct form.'], m19a1),
    S('g19-m19a-2', MURPHY, ['Unité 19A : corriger les erreurs (2/2)', 'Unit 19A: correcting errors (2/2)'], 'B2', ['Corrige la phrase.', 'Correct the sentence.'], m19a2),
    S('g19-m19b', MURPHY, ['Unité 19B : remettre les mots dans l\'ordre', 'Unit 19B: sentence building'], 'B2', ['Écris la phrase complète avec les mots dans le bon ordre.', 'Write the complete sentence with the words in the right order.'], m19b),
    S('g19-th', MURPHY, ['Unité TH : thème grammatical', 'Unit TH: translation'], 'B2', ['Traduis en anglais, puis compare avec le modèle.', 'Translate into English, then compare with the model.'], th)
  ],
  recap: {
    blocks: [
      {
        title: 'I wish / If only',
        forms: [
          ['souhait présent irréel', 'wish / if only + prétérit : I wish I knew the answer.'],
          ['regret passé', 'wish / if only + past perfect : I wish I had studied harder.'],
          ['irritation, souhait de changement', 'wish / if only + would + base : I wish you would listen!'],
          ['wish + were', 'I wish I were taller (was informel)']
        ],
        uses: ['hope s\'emploie pour une possibilité réelle : I hope the results are positive.']
      },
      {
        title: "It's time et would rather",
        forms: [
          ["It's time + to + base", "It's time to leave."],
          ["It's (high / about) time + sujet + prétérit", "It's time we left. It's high time you improved (reproche)."],
          ["I'd rather + base", "I'd rather stay home."],
          ["I'd rather + sujet + prétérit", "I'd rather you stayed at home."],
          ["I'd rather + base + than + base", "I'd rather work here than travel abroad."]
        ],
        uses: []
      }
    ],
    tables: [],
    notes: ['Après wish et if only, jamais would have : on emploie le past perfect.'],
    rule: 'Le temps recule d\'un cran : prétérit pour le présent irréel, past perfect pour le passé.'
  },
  enMeta: {
    title: "I wish / If only / It's time / Would rather",
    recap: {
      blocks: [
        {
          title: 'I wish / If only',
          forms: [
            ['unreal present wish', 'wish / if only + past simple: I wish I knew the answer.'],
            ['regret about the past', 'wish / if only + past perfect: I wish I had studied harder.'],
            ['irritation, wish for change', 'wish / if only + would + base: I wish you would listen!'],
            ['wish + were', 'I wish I were taller (was is informal)']
          ],
          uses: ['hope is used for a real possibility: I hope the results are positive.']
        },
        {
          title: "It's time and would rather",
          forms: [
            ["It's time + to + base", "It's time to leave."],
            ["It's (high / about) time + subject + past simple", "It's time we left. It's high time you improved (reproach)."],
            ["I'd rather + base", "I'd rather stay home."],
            ["I'd rather + subject + past simple", "I'd rather you stayed at home."],
            ["I'd rather + base + than + base", "I'd rather work here than travel abroad."]
          ],
          uses: []
        }
      ],
      tables: [],
      notes: ['After wish and if only, never would have: use the past perfect.'],
      rule: 'The tense steps back one notch: past simple for the unreal present, past perfect for the past.'
    }
  }
};
