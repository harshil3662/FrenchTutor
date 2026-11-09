import { Router } from 'express';
import { generateAiJson } from '../services/ai.js';
import { GRAMMAR_ASPECT_LESSONS } from '../../src/data/grammar/index.js';

const router = Router();

// Dynamic AI Practice Quiz Generator

router.post('/ai/generate-quiz', async (req, res) => {
  const {
    topic = 'Passé Composé vs Imparfait',
    level: requestedLevel = 'B1',
    questionCount = 4,
    lessonId,
    previousQuestions: requestedPreviousQuestions = [],
    unitContext: requestedUnitContext = {},
  } = req.body;

  const previousQuestions = Array.isArray(requestedPreviousQuestions)
    ? requestedPreviousQuestions
        .filter((item) => typeof item === 'string' && item.trim())
        .slice(0, 16)
        .map((item) => item.slice(0, 220))
    : [];

  const lesson = GRAMMAR_ASPECT_LESSONS.find((item) => item.id === lessonId);
  // The lesson's own level wins, so a quiz never uses another level's difficulty
  const level = lesson?.level || requestedLevel;
  const unitContext = lesson
    ? {
        ...requestedUnitContext,
        unitNumber: lesson.unitNumber,
        category: lesson.category,
        title: lesson.title,
        frenchTitle: lesson.frenchTitle,
        subtitle: lesson.subtitle,
        formula: lesson.formula,
        goldenRule: lesson.goldenRule,
        rules: lesson.rules,
        commonTraps: lesson.commonTraps,
        topics: lesson.topics,
        practiceExercises: lesson.practiceExercises,
      }
    : requestedUnitContext;

  // Offline quiz content is not curated per unit, so never serve generic questions that may fall outside the lesson
  const defaultFallback = {
    title: `Quiz IA : ${lesson?.frenchTitle || topic}`,
    level,
    questions: [],
    usedFallback: true,
  };

  try {
    const shuffle = (items) => {
      const copy = [...items];
      for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    const variationCues = [
      'a train journey with a missed connection',
      'a market visit to buy ingredients for dinner',
      'a weekend trip with an unexpected change of plans',
      'a conversation between colleagues preparing an event',
      'a museum visit with a surprising discovery',
      'a family gathering where people share memories',
      'a neighborhood problem that needs to be solved',
      "a traveler's conversation at a small hotel",
      'a school day with a forgotten homework',
      'a doctor appointment and a pharmacy visit',
      'a football match watched at a friend\'s place',
      'moving into a new apartment',
      'a rainy day at a café with an old friend',
      'planning a birthday surprise',
      'a job interview and the first day at work',
      'a lost phone and the search for it',
      'a hike in the mountains with changing weather',
      'a restaurant order that goes wrong',
      'a village festival in summer',
      'a phone call with a grandparent',
    ];
    const verbPool = [
      'acheter', 'aider', 'apprendre', 'attendre', 'chanter', 'chercher', 'choisir', 'commencer', 'comprendre',
      'conduire', 'connaître', 'courir', 'croire', 'danser', 'décider', 'devoir', 'dormir', 'écrire', 'envoyer',
      'finir', 'jouer', 'laver', 'lire', 'mettre', 'monter', 'nager', 'ouvrir', 'partir', 'payer', 'penser',
      'perdre', 'porter', 'pouvoir', 'prendre', 'raconter', 'recevoir', 'regarder', 'rencontrer', 'rendre',
      'répondre', 'réussir', 'rester', 'revenir', 'savoir', 'sortir', 'téléphoner', 'tomber', 'travailler',
      'trouver', 'venir', 'vivre', 'voir', 'vouloir', 'voyager',
    ];
    const nounPool = [
      'le livre', 'la clé', 'le chien', 'la fenêtre', 'le gâteau', 'la valise', 'le médecin', 'la voiture',
      'le jardin', 'la bibliothèque', 'le vélo', 'la montagne', 'le boulanger', 'la lettre', 'le film',
      'la cuisine', 'le billet', 'la chanson', 'le voisin', 'la plage', 'le musée', 'la pharmacie', 'le cadeau',
      'la rivière', 'le téléphone', 'la maison', 'le pull', 'la salade', 'le concert', 'la place',
    ];
    const nameTokens = shuffle([
      'Camille', 'Mehdi', 'Inès', 'Théo', 'Amina', 'Lucas', 'Sofia', 'Karim', 'Chloé', 'Noah', 'Yasmine', 'Hugo',
    ]);

    const typeMix = {
      A1: ['fill-in-the-blank', 'multiple-choice', 'complete-the-sentence'],
      A2: ['fill-in-the-blank', 'multiple-choice', 'complete-the-sentence', 'translate-english-to-french'],
      B1: ['fill-in-the-blank', 'multiple-choice', 'complete-the-sentence', 'translate-english-to-french'],
      B2: ['fill-in-the-blank', 'multiple-choice', 'complete-the-sentence', 'translate-english-to-french'],
      C1: ['fill-in-the-blank', 'multiple-choice', 'complete-the-sentence', 'translate-english-to-french'],
      C2: ['fill-in-the-blank', 'multiple-choice', 'complete-the-sentence', 'translate-english-to-french'],
    };
    const allowedTypes = typeMix[level] || typeMix.A2;

    // Per-question assignments are chosen here, not left to the model, so retakes cannot converge on the same content
    const focusPoints = shuffle([
      ...(Array.isArray(unitContext.rules) ? unitContext.rules : []),
      ...(Array.isArray(unitContext.commonTraps) ? unitContext.commonTraps : []),
      ...(Array.isArray(unitContext.topics) ? unitContext.topics : []),
    ].map((item) => (typeof item === 'string' ? item : JSON.stringify(item)).slice(0, 240)));
    const shuffledTypes = shuffle(allowedTypes);
    const shuffledCues = shuffle(variationCues);
    const shuffledVerbs = shuffle(verbPool);
    const shuffledNouns = shuffle(nounPool);
    const questionPlan = Array.from({ length: Number(questionCount) || 4 }, (_, i) => {
      const focus = focusPoints.length ? `; lesson focus: ${focusPoints[i % focusPoints.length]}` : '';
      return `q${i + 1}: type ${shuffledTypes[i % shuffledTypes.length]}; scenario "${shuffledCues[i % shuffledCues.length]}"; character ${nameTokens[i % nameTokens.length]}; preferred verb "${shuffledVerbs[i]}"; preferred noun "${shuffledNouns[i]}"${focus}`;
    }).join('\n  ');
    const previousBlock = previousQuestions.length
      ? `\n  PREVIOUS QUESTIONS (the learner has already seen these): ${JSON.stringify(previousQuestions)}. Do NOT reuse their verbs, nouns, names, scenarios or sentence frames, and do not merely reorder or rephrase them. Test the grammar with clearly different vocabulary.\n`
      : '';

    // Units are ordered by unitNumber, which is the order the learner works through them
    const scopeTaught = lesson
      ? GRAMMAR_ASPECT_LESSONS.filter((unit) => unit.unitNumber <= lesson.unitNumber).map((unit) => unit.title)
      : [];
    const scopeNotYetTaught = lesson
      ? GRAMMAR_ASPECT_LESSONS.filter((unit) => unit.unitNumber > lesson.unitNumber).map((unit) => unit.title)
      : [];

    const prompt = `Generate a fresh ${questionCount}-question French interactive grammar quiz strictly focused on grammatical aspects for topic: "${topic}" and level ${level}.

  Use this unit-specific curriculum context as the source of truth. Test its rules and terminology, not a generic grammar topic:
  ${JSON.stringify(unitContext)}

  STRICT GROUNDING: The curriculum context above is the lesson's knowledge base. Every question must test a rule, pattern, table, trap, or contrast that appears in that lesson. Do not introduce grammar points, vocabulary patterns, or exceptions that are not covered in the lesson content. The lesson's practiceExercises show the expected style and difficulty only; do not copy them.

  CURRICULUM SCOPE: The learner has been taught these units so far, including this one: ${JSON.stringify(scopeTaught)}. Test only grammar from these units. The learner has NOT been taught these later units yet, so do not test or mention their grammar: ${JSON.stringify(scopeNotYetTaught)}.

  QUESTION PLAN: build exactly one question per line below, in order. Use the assigned type, scenario and character. Use the preferred verb and noun only when they fit the lesson's grammar naturally; if they do not, pick a different verb or noun that is not in the previous questions. Where a focus is given, that question must test that point, and each question must test a different rule or trap where the lesson allows.
  ${questionPlan}
  ${previousBlock}
  Use existing drills only to understand the unit content; do not copy their questions or answers verbatim. Every question needs a distinct sentence, subject, verb and test case. Do not copy the wording of the JSON example below.

Important: every explanation must be written in English, even though the question text is in French. Keep the explanation clear, concise, and focused on the grammar rule being tested.

Follow the question types in the plan. Allowed types for this level: ${allowedTypes.join(', ')}.

Rules:
- For multiple-choice: exactly 4 string options and every correctAnswer must exactly match one option.
- For fill-in-the-blank and complete-the-sentence: write a plain French sentence containing a blank marker like ___ and nothing else. NO HINTS: do not name the grammar item, word class, tense, verb infinitive, or rule, and do not put anything in parentheses (no "(verbe prendre, passé composé)", "(article défini)", "(pronom COD)", "(préférence générale)"). The prompt must not tell the learner what kind of word to use; deciding that is the test. EXACTLY ONE ANSWER: design the sentence so that only one answer is grammatically and semantically possible. Build that certainty into the sentence itself with context (a time expression, a clear subject, a distinguishing detail, a preceding or following clause), never with a hint. Before finalizing each question, silently test it: if a different article, tense, pronoun, preposition or word order could also fit, rewrite the sentence until it cannot. Avoid blanks where a gender or number alternative, a contraction, or a synonym would also be valid. acceptableAnswers should contain only the correct answer and its pure spelling variants (e.g. apostrophe or capitalization), never a different grammatical choice. correctAnswer must be the exact missing fragment or phrase.
- For multiple-choice: the prompt is the sentence with a blank or a plain question such as "Quelle phrase est correcte ?", with no mention of the rule being tested. Exactly one option must be correct: the three distractors must each be clearly wrong for the sentence, not a second acceptable answer.
- For translate-english-to-french: use an English sentence with one natural French rendering for the tested grammar (no ambiguous "you", "it", or tense). The correctAnswer must be the rendering that uses the lesson's grammar. The prompt must ask the learner to translate an English sentence into French and the correctAnswer must be the French translation.
- Every question must include promptEnglish, which is a natural English translation or explanation of the prompt.
- Never reveal the tested rule, tense or grammar term in a prompt or in the options' labels. The plan's "lesson focus" is for you only and must not appear in the learner-facing text. Explanations may name the rule.
- Keep questions realistic, level-appropriate, and varied in structure.

Format as JSON:
{
  "title": "Grammar Quiz Title",
  "level": "${level}",
  "questions": [
    {
      "id": "q1",
      "type": "fill-in-the-blank",
      "prompt": "Hier soir, vous ___ la lettre avant de dormir.",
      "promptEnglish": "Last night, you ___ the letter before sleeping.",
      "correctAnswer": "example answer",
      "acceptableAnswers": ["example answer"],
      "explanation": "Clear grammatical explanation in English of why this is correct"
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "prompt": "Quelle est la forme correcte ?",
      "promptEnglish": "Which is the correct form?",
      "options": ["option 1", "option 2", "option 3", "option 4"],
      "correctAnswer": "option 1",
      "explanation": "Clear grammatical explanation in English of why this is correct"
    },
    {
      "id": "q3",
      "type": "translate-english-to-french",
      "prompt": "Traduisez en français : 'The neighbors sold their bike last week.'",
      "promptEnglish": "Translate into French: 'The neighbors sold their bike last week.'",
      "correctAnswer": "Les voisins ont vendu leur vélo la semaine dernière.",
      "acceptableAnswers": ["Les voisins ont vendu leur vélo la semaine dernière."],
      "explanation": "Clear grammatical explanation in English of why this is correct"
    }
  ]
}`;

    const result = await generateAiJson(prompt, defaultFallback, {
      task: 'generate-quiz',
      temperature: 1,
      preferOpenRouter: true,
      openRouterTimeoutMs: 60000,
    });
    res.json(result === defaultFallback ? { ...defaultFallback, usedFallback: true } : result);
  } catch (error) {
    console.error('Error in /api/ai/generate-quiz:', error);
    res.json({ ...defaultFallback, usedFallback: true });
  }
});

export default router;
