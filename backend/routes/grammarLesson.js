import { Router } from 'express';
import { generateAiJson } from '../services/ai.js';

const router = Router();

// Dynamic AI Custom Grammar Lesson Generator
router.post('/ai/generate-grammar-lesson', async (req, res) => {
  const { aspectTitle = "Le Subjonctif Présent", level = 'B1', focusRule } = req.body;

  const defaultFallback = {
    title: aspectTitle || "Le Subjonctif Présent",
    aspectCategory: "Subjunctive & Non-Finite Moods",
    level,
    description: "Comprehensive lesson on using the subjunctive mood in French with trigger verbs and expressions.",
    formula: "[Sujet] + [Verbe déclencheur] + QUE + [Sujet 2] + [Verbe au subjonctif]",
    goldenRule: "The subjunctive expresses subjectivity, uncertainty, will, emotion, or necessity, triggered after 'que'.",
    rules: [
      "Regular verb endings: -e, -es, -e, -ions, -iez, -ent based on 'ils' present tense stem.",
      "Verbs of certainty (penser, croire, être sûr) take the indicative in affirmative statements, but subjunctive in negative/question forms.",
      "Always check if both clauses share the same subject; if so, use the infinitive with 'de' instead of 'que + subjonctif'."
    ],
    contrastExamples: [
      { french: "Je veux que tu viennes.", english: "I want you to come.", aspectNote: "Subjunctive of will/obligation (venir -> viennes)" },
      { french: "Je sais qu'il vient.", english: "I know he is coming.", aspectNote: "Indicative of certainty (savoir + indicatif)" },
      { french: "Je doute qu'il soit prêt.", english: "I doubt he is ready.", aspectNote: "Subjunctive of doubt (douter + soit)" }
    ],
    commonTraps: [
      "Forgetting irregular stems: être (sois/soit), avoir (aie/ait), faire (fasse), pouvoir (puisse), aller (aille/aillons).",
      "Using subjunctive after 'espérer que' (espérer always takes the indicative/future, unlike vouloir)."
    ],
    practiceExercises: [
      {
        id: "ex1",
        type: "multiple-choice",
        prompt: "Il faut que nous ___ (partir) tout de suite.",
        options: ["partons", "partions", "partirions", "partirons"],
        correctAnswer: "partions",
        hint: "1st person plural subjunctive ending for regular verbs is -ions.",
        explanation: "'Il faut que' is an impersonal necessity trigger demanding the subjunctive. Nous + partir -> partions."
      },
      {
        id: "ex2",
        type: "fill-blank",
        prompt: "Bien que Marie ___ (être) fatiguée, elle continue de travailler.",
        options: ["est", "soit", "sera", "serait"],
        correctAnswer: "soit",
        hint: "Conjunction 'bien que' (although) requires the subjunctive of être.",
        explanation: "'Bien que' is a concessive conjunction that systematically requires the subjunctive."
      }
    ]
  };

  try {
    const prompt = `You are a Master Professor of French Grammar and Linguistics.
Generate an in-depth, pedagogically structured French Grammar Lesson on the topic / aspect: "${aspectTitle}".
Target CEFR Level: ${level}.
Focus Rule or Specific Aspect: ${focusRule || 'Comprehensive rule breakdown with formulas and exercises'}.

Requirements:
1. "title": Crisp, formal grammar title (e.g. "L'Accord du Participe Passé avec Avoir et le COD Précédent")
2. "aspectCategory": One of ("Subjunctive & Non-Finite Moods", "Past Temporal Boundaries", "Future & Conditional Systems", "Direct & Indirect Pronominal Clitics", "Prepositional Regimes & Geography", "Determiners, Partitives & Quantifiers", "Passive Voice & Pronominal Reflexives", "Complex Multi-Tier Negation", "Hypothetical 'Si' Clause Systems", "Nominal Gender & Endings Morpho-Syntax")
3. "level": "${level}"
4. "description": Pedagogical summary of when and why this grammatical aspect exists.
5. "formula": Visual syntax formula / blueprint (e.g. "[Sujet] + [COD placé avant] + [Auxiliaire Avoir] + [Participe Passé accordé en genre et nombre avec le COD]")
6. "goldenRule": The single most important rule principle students must memorize.
7. "rules": Array of 3-5 structured, concrete syntactic rules with step-by-step logic.
8. "contrastExamples": Array of 3-4 side-by-side contrasting French sentences showing correct vs incorrect or contrast pairs with English translations and grammatical aspect notes.
9. "commonTraps": Array of 2-3 traps/exceptions that confuse intermediate and advanced students (e.g. invariable past participles with 'en' or measurement verbs).
10. "practiceExercises": Array of 3-4 interactive exercises (mix of multiple-choice, fill-in-the-blank, or sentence-builder) each with prompt, options, correctAnswer, hint, and detailed grammatical explanation.

Format as JSON strictly adhering to this structure.`;

    const result = await generateAiJson(prompt, defaultFallback, { task: 'generate-grammar-lesson' });
    res.json(result);
  } catch (error) {
    console.error('Error in /api/ai/generate-grammar-lesson:', error);
    res.json(defaultFallback);
  }
});

export default router;
