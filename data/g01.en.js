// G01 : version anglaise des textes pédagogiques (règles, indices, consignes, rappel de cours).
// Les phrases d'exercice et les réponses acceptées restent celles de g01.js.
// Les tableaux d'items suivent exactement l'ordre de g01.js (l'audit vérifie l'alignement).
// Champs possibles par item : why, hint, instr, s (si la phrase contient une annotation en français), m (modèle, pour les items libres).

const FIX = 'Correct the sentence. Write the whole sentence, or write Correct if it is right.';
const TR = 'Translate into English.';
const w = (why, hint) => (hint ? { why, hint } : { why });

export const G01_EN = {
  title: 'Present Simple and Present Continuous',
  sets: {
    'g01-guidee-a': { group: 'Worksheet', title: 'Guided set A', desc: 'Spot the time markers. Each sentence comes with a hint.' },
    'g01-guidee-b': { group: 'Worksheet', title: 'Guided set B: stative verbs and nuances', desc: 'Some verbs behave differently depending on their meaning.' },
    'g01-niv-a': { group: 'Worksheet', title: 'Level A: core revision', desc: 'Present Simple or Present Continuous?' },
    'g01-niv-b': { group: 'Worksheet', title: 'Level B: professional context', desc: 'The same choices in engineering contexts.' },
    'g01-niv-c': { group: 'Worksheet', title: 'Level C: corrections and translation', desc: 'Correct five faulty sentences, then translate five sentences.' },
    'g01-niv-d': { group: 'Worksheet', title: 'Level D: complexity', desc: 'Dialogues, transformations and rephrasing.' },
    'g01-bonus': { group: 'Worksheet', title: 'Bonus: going further', desc: 'Special cases and a short writing task. Write your answers, then compare them with the model.' },
    'g01-devoir': { group: 'Worksheet', title: 'Homework', desc: 'Fifteen sentences to complete with the right verb form.' },
    'g01-m1a-1': { group: 'Murphy supplement', title: 'Unit 1A: Present Simple (1/2)', desc: 'Present Simple or Present Continuous?' },
    'g01-m1a-2': { group: 'Murphy supplement', title: 'Unit 1A: correct the sentences (2/2)', desc: 'Correct the faulty sentences or write Correct.' },
    'g01-m1b': { group: 'Murphy supplement', title: 'Unit 1B: stative verbs and nuances', desc: 'Choose the correct form.' },
    'g01-m1c-1': { group: 'Murphy supplement', title: 'Unit 1C: changes in progress (1/2)', desc: 'Present Continuous: changes and temporary situations.' },
    'g01-m1c-2': { group: 'Murphy supplement', title: 'Unit 1C: correct the sentences (2/2)', desc: 'Correct the faulty sentences or write Correct.' },
    'g01-m1d-1': { group: 'Murphy supplement', title: 'Unit 1D: Simple or Continuous (1/2)', desc: 'Professional contexts.' },
    'g01-m1d-2': { group: 'Murphy supplement', title: 'Unit 1D: asking questions (2/2)', desc: 'Write the full question in the correct tense.' },
    'g01-th': { group: 'Murphy supplement', title: 'Unit TH: grammar translation', desc: 'Translate into English, then compare with the model.' }
  },
  items: {
    'g01-guidee-a': [
      w('always indicates a habit: Present Simple. In the third person singular, add -s: drinks.', 'always = habit'),
      w('Listen! points to what is happening at this very moment: Present Continuous (be + -ing form).', 'Listen! = right now'),
      w('understand is a stative verb: it is not used in the continuous, even for a present situation. Negative of the Present Simple: do not + base form.', 'understand: stative verb'),
      w('this month marks an ongoing project over a limited period: Present Continuous.', 'this month = limited period'),
      w('General truth, scientific law: Present Simple.', 'general truth'),
      w('like is a stative verb: Present Simple. In the third person, the negative is does not + base form (no -s on like).', 'like: stative verb'),
      w('Right now signals an action in progress: Present Continuous. Both the British spelling analysing and the American analyzing are accepted.', 'right now = in progress'),
      w('every day and a fixed schedule: Present Simple.', 'fixed schedule'),
      w('An appointment already arranged for the near future: Present Continuous (planned future).', 'arranged plan'),
      w('these days signals a change in progress: Present Continuous (gradual change).', 'change in progress')
    ],
    'g01-guidee-b': [
      w('In the sense of "having an opinion", think is a stative verb: Present Simple.', 'meaning: having an opinion'),
      { why: 'In the sense of "to ponder", think is an action verb: the continuous is possible.', hint: 'meaning: to ponder', s: 'She ___ (think) about changing jobs. (thinking in progress)' },
      w('have meaning "to own" is a stative verb: Present Simple, third person: has.', 'meaning: to own'),
      w('In have a meeting, have is an action verb (to hold a meeting): Present Continuous.', 'have a meeting = action'),
      w('taste meaning "to have a flavour" is a stative verb: Present Simple.', 'meaning: to have a flavour'),
      w('taste meaning "to try" is a deliberate action: the continuous is possible.', 'meaning: to try'),
      w('look like expresses a resemblance: stative verb, so Present Simple.', 'meaning: to resemble'),
      w('look at (to watch, to examine) is a deliberate action in progress: Present Continuous.', 'meaning: to look at'),
      w('belong is a stative verb: never in the continuous.', 'belong: stative verb'),
      w('increasingly describes a gradual change: Present Continuous.', 'gradual change')
    ],
    'g01-niv-a': [
      w('every Friday indicates a habit: Present Simple, with -s in the third person.'),
      w('like is a stative verb: Present Simple, negative with do not.'),
      w('right now: action in progress. Present Continuous question: What + be + subject + -ing form.'),
      w('Permanent scientific truth: Present Simple.'),
      w('at the moment: action in progress. Note: prepare drops its e before -ing (preparing).'),
      { why: 'Plan already arranged for the near future: Present Continuous.', s: 'We ___ (go) to Lyon next weekend. (already arranged)' },
      w('right now: action in progress.'),
      w('per day: habitual, regular fact, Present Simple.'),
      w('remember is a stative verb: no continuous.'),
      w('Gradual change: Present Continuous.')
    ],
    'g01-niv-b': [
      w('every Monday: habit, Present Simple. Plural subject: no -s.'),
      w('Look! announces an action in progress: Present Continuous.'),
      w('General fact about a type of engine: Present Simple. Negative in the third person: does not + base form.'),
      w('currently and the context indicate an action in progress. The adverb goes between is and explaining.'),
      w('usually: habit (Present Simple). today: temporary exception (Present Continuous).'),
      w('contain is a stative verb: Present Simple.'),
      w('this week: limited period, Present Continuous.'),
      w('Travel habit: Present Simple. Negative in the third person: does not + base form.'),
      w('mean is a stative verb: Present Simple. Question: What + does + subject + base form.'),
      w('this year: development in progress, Present Continuous.')
    ],
    'g01-niv-c': [
      { instr: FIX, why: 'know is a stative verb: no continuous.' },
      { instr: FIX, why: 'In the third person singular, the Present Simple takes -s: works.' },
      { instr: FIX, why: 'understand is a stative verb and takes the Present Simple. The question is formed with do + subject + base form, not with be.' },
      { instr: FIX, why: 'usually expresses a habit: Present Simple.' },
      { instr: FIX, why: 'In English, agree is a verb (I agree), not a construction with be. It is also a stative verb: Present Simple, negative with do not.' },
      { instr: TR, why: 'Habit: Present Simple. never goes before the verb, and the verb keeps its -s: never drinks.' },
      { instr: TR, why: 'Two actions in progress: Present Continuous. marking (British) and grading (American) are both correct.' },
      { instr: TR, why: 'understand is a stative verb: Present Simple. explain, in its usual sense, also stays in the Simple.' },
      { instr: TR, why: 'Change in progress: Present Continuous. "De plus en plus" is translated as more and more.' },
      { instr: TR, why: 'Habit: Present Simple. often goes between the subject and the verb, and we say on Fridays.' }
    ],
    'g01-niv-d': [
      w('Two actions in progress: Present Continuous. Here think means "to ponder", so it is an action verb.'),
      w('know is a stative verb: question with do. think in the sense of an opinion stays in the Simple. still waiting: ongoing situation, Present Continuous.'),
      w('understand is a stative verb. right now shows that the server is down at this moment: Present Continuous.'),
      w('gradually stresses a change in progress: Present Continuous.'),
      w('General statement: Present Simple. prefer is also a stative verb.'),
      { instr: 'Put the sentence into the negative form.', why: 'Present Simple: does not + base form, the -s disappears from delivers.' },
      { instr: 'Turn the sentence into a question (yes/no answer).', why: 'Present Continuous: invert be and the subject.' },
      { instr: 'Ask the question with What about "a report about solar panels".', why: 'Present Continuous: What + be + subject + -ing form.' },
      { instr: 'Rewrite the sentence starting with "According to the data,".', why: 'increasing keeps the Present Continuous: it is a trend in progress.' },
      { instr: 'Rewrite the sentence starting with "He says".', why: 'want is a stative verb: Present Simple. that is optional after says.' }
    ],
    'g01-bonus': [
      {
        instr: 'Correct or incorrect? Why?',
        m: ['In standard grammar, love is a stative verb and takes the Present Simple: I love this project. The continuous is heard in informal speech to stress that someone is enjoying an experience in progress (this is the principle behind a well-known advertising slogan). Avoid it in writing and in the TOEIC.'],
        hint: 'Think about the verb category (feeling) before answering.'
      },
      {
        instr: 'What special meaning does this continuous give?',
        m: ['always + continuous expresses a repetition perceived as annoying: the speaker is criticising. Compare with He always loses his badge, a simple statement of habit.'],
        hint: 'Compare with the Present Simple version.'
      },
      {
        instr: 'In what context is this sentence correct?',
        m: ['As a general law, the Present Simple is needed: Water boils at 100°C. The continuous is only possible to describe a phenomenon observed in progress, for instance in an experiment report: The water in the flask is boiling at 100°C.'],
        hint: 'Distinguish the general law from the observed phenomenon.'
      },
      {
        instr: 'Compare the two sentences: why is the continuous only possible in the second?',
        m: ['In the first, think expresses an opinion (stative verb): no continuous. In the second, think of means to consider a plan: it is a mental process in progress (action verb), so the continuous is possible.'],
        hint: 'The meaning of the verb decides the form.'
      },
      {
        instr: 'Which use of the continuous do you recognise?',
        m: ['Trend continuous: it describes a change in progress, with no precise date. Typical words: more and more, increasingly, this year.'],
        hint: 'Think of verbs of change: grow, rise, get, become.'
      },
      {
        instr: 'Write about 50 words: describe your typical day AND what you are doing right now. Use at least 3 verbs in the Present Simple and 2 in the Present Continuous.',
        s: 'Possible start: On weekdays, I usually... / Right now, I am...',
        hint: 'Check: stative verbs in the Simple, actions in progress in the Continuous, -s in the third person.'
      }
    ],
    'g01-devoir': [
      w('Habit: Present Simple, negative in the third person: does not + base form.'),
      w('right now: action in progress. calibrate drops its e before -ing.'),
      w('General property of a material: Present Simple.'),
      w('think in the sense of an opinion is a stative verb: Present Simple.'),
      w('currently: project in progress. Present Continuous, with the adverb between are and developing.'),
      w('hate expresses a feeling: stative verb, Present Simple.'),
      w('this quarter: change in progress over a limited period.'),
      { why: 'Arranged appointment: Present Continuous with a future meaning. Here see means "to meet".', s: 'She ___ (see) her tutor this afternoon. (arranged meeting)' },
      w('these days: period in progress. practise (British) and practice (American) are both accepted.'),
      w('usually and a general fact about the climate: Present Simple. The adverb goes before the verb.'),
      w('smell of (to give off a smell) is a stative verb: Present Simple.'),
      w('Here smell is a deliberate action (to sniff): Present Continuous.'),
      w('more and more: trend in progress.'),
      w('believe is a stative verb: Present Simple.'),
      { why: 'always, with no criticism: neutral habit, Present Simple. The adverb goes before the verb.', s: 'She ___ (always / double-check) her calculations before submitting. (habit)' }
    ],
    'g01-m1a-1': [
      w('Permanent situation: Present Simple.'),
      w('Listen announces an action in progress: Present Continuous.'),
      w('Permanent scientific fact: Present Simple.'),
      w('currently: action in progress.'),
      w('recognise (or recognize) is a stative verb: Present Simple.')
    ],
    'g01-m1a-2': [
      { instr: FIX, why: 'like is a stative verb: never in the continuous.' },
      { instr: FIX, why: 'at the moment indicates a temporary situation: Present Continuous.' },
      { instr: FIX, why: 'every Monday: habit, Present Simple.' },
      { instr: FIX, why: 'own is a stative verb: no continuous.' },
      { instr: FIX, why: 'Change in progress: the Present Continuous is correct.' }
    ],
    'g01-m1b': [
      w('Opinion: think is a stative verb.'),
      { why: 'To ponder: action verb, the continuous is possible.', s: 'He ___ about moving to Grenoble next year. (thinking in progress)' },
      w('taste meaning "to have a flavour": stative verb.'),
      w('Deliberate tasting, at the moment: Present Continuous.'),
      w('have meaning "to own": stative verb.'),
      w('have lunch (to eat lunch) is an action: Present Continuous.'),
      w('contain is a stative verb.'),
      w('this quarter: change in progress.')
    ],
    'g01-m1c-1': [
      w('this year: change in progress, Present Continuous.'),
      w('currently: temporary situation.'),
      w('Temporary situation: Present Continuous.'),
      w('Gradual change: Present Continuous.'),
      w('this month: temporary situation.'),
      w('get + comparative expresses a change in progress.'),
      w('more and more: trend in progress.'),
      w('at the moment: situation in progress.')
    ],
    'g01-m1c-2': [
      { instr: FIX, why: 'this week: temporary situation, Present Continuous.' },
      { instr: FIX, why: 'Change in progress: the Present Continuous is correct.' },
      { instr: FIX, why: 'this month: temporary situation, Present Continuous.' },
      { instr: FIX, why: 'at the moment and a change: the Present Continuous is correct.' },
      { instr: FIX, why: 'at the moment: situation in progress, Present Continuous.' }
    ],
    'g01-m1d-1': [
      w('Permanent activity: Present Simple.'),
      w('right now: action in progress.'),
      w('usually: habit. this week: temporary exception.'),
      w('Scientific fact: Present Simple.'),
      w('Look! announces an action in progress.'),
      w('usually: habit (Simple). this week: exception (Continuous).'),
      w('Permanent description: Present Simple.'),
      w('Date set by a contract, like a timetable: Present Simple.')
    ],
    'g01-m1d-2': [
      { instr: 'Ask the question in the correct tense. Context: his usual job. Words: what / he / do', why: 'Usual job: Present Simple, What + does + subject + base form.' },
      { instr: 'Ask the question in the correct tense. Context: right now, in the laboratory. Words: what / she / do', why: 'Action in progress: Present Continuous.' },
      { instr: 'Ask the question in the correct tense. Context: general fact. Words: where / this river / flow', why: 'General fact: Present Simple, Where + does + subject + base form.' },
      { instr: 'Ask the question in the correct tense. Context: current project. Words: what / they / work on / this semester', why: 'this semester: project in progress, Present Continuous.' }
    ],
    'g01-th': [
      { instr: TR, why: 'Permanent situation: Present Simple, with -s.' },
      { instr: TR, why: 'Action in progress: Present Continuous. "Passer un examen" is said take an exam.' },
      { instr: TR, why: 'General truth: Present Simple. We say in the east.' },
      { instr: TR, why: 'know is a stative verb: Present Simple.' },
      { instr: TR, why: 'these days: period in progress, Present Continuous. software is uncountable: no "a software".' },
      { instr: TR, why: 'Change in progress: Present Continuous.' },
      { instr: TR, why: 'Temporary situation: Present Continuous. stay with = to be a guest at someone\'s home.' },
      { instr: TR, why: 'Opinion: think is a stative verb, so Present Simple.' }
    ]
  },
  recap: {
    simple: {
      title: 'Present Simple',
      forms: [
        ['Affirmative', 'I / you / we / they work. He / she / it works.'],
        ['Negative', "I don't work. He doesn't work (no -s on the verb)."],
        ['Question', 'Do you work? Does he work? (do or does + base form)']
      ],
      uses: ['Habit, routine: She works every day.', 'General truth: Water boils at 100°C.', 'Fixed timetable: The train leaves at 8 AM.'],
      marks: 'always, usually, often, sometimes, never, every day, on Mondays, rarely'
    },
    cont: {
      title: 'Present Continuous',
      forms: [
        ['Affirmative', 'I am working. He is working. We are working.'],
        ['Negative', "I'm not working. He isn't working. They aren't working."],
        ['Question', 'Are you working? Is he working? (be and the subject are inverted)']
      ],
      uses: ['Action in progress: Listen! The phone is ringing.', "Temporary situation: I'm living with my parents this month.", 'Arranged future: We are meeting tomorrow at 9.', 'Gradual change: The climate is getting warmer.'],
      marks: 'now, right now, at the moment, currently, today, this week, Look!, Listen!'
    },
    stative: [
      ['Feelings', 'love, like, hate, prefer, want, wish, need'],
      ['Perception', 'see, hear, smell, taste, feel, seem, appear'],
      ['Thinking', 'think (opinion), believe, know, understand, forget, remember, mean'],
      ['Possession', 'have (to own), own, belong, contain']
    ],
    trap: "Trap: some verbs are stative or action verbs depending on their meaning. I think it is good (opinion) but I'm thinking about it (I am considering it). He has a car (possession) but He is having lunch (action).",
    rule: 'Simple = permanent or habitual. Continuous = temporary or in progress. Ask yourself: is it changing?'
  }
};
