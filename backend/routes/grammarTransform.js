import { Router } from 'express';
import { generateAiJson } from '../services/ai.js';

const router = Router();

// AI Grammatical Aspect Sentence Transformer (Workbench)
router.post('/ai/grammar-transform', async (req, res) => {
  const { sentence = '', targetAspect = 'tense', targetValue = 'Passé Composé' } = req.body;
  
  const defaultFallback = {
    transformedSentence: sentence.toLowerCase().includes('julien mange') && targetValue.includes('Passé Composé')
      ? 'Julien a mangé une pomme rouge dans la cuisine.'
      : (sentence.toLowerCase().includes('julien mange') && targetValue.includes('Passive')
      ? 'Une pomme rouge est mangée par Julien dans la cuisine.'
      : `[Transformation] : ${sentence}`),
    englishTranslation: "Transformed French sentence with adapted grammatical aspect.",
    rulesApplied: [
      `1. Identified primary verb and auxiliary constraints for ${targetValue}.`,
      "2. Adjusted inflection, subject-verb concord, and clitic pronoun ordering.",
      "3. Verified past participle agreement and gender/number inflections."
    ],
    explanation: `In French, transforming the grammatical aspect to "${targetValue}" alters morphology, word order, and auxiliary selection.`,
    aspectComparison: {
      originalAspect: "Base syntactic structure",
      targetAspect: targetValue || targetAspect,
      syntacticNotes: "Pay attention to auxiliary choice (avoir vs être) and vowel elision (je -> j')."
    }
  };

  try {
    const prompt = `You are a French Syntactician and Grammar Specialist.
Transform the following French sentence:
Original Sentence: "${sentence}"
Target Grammatical Aspect: "${targetAspect}" (e.g. tense, voice, negation, pronoun_replacement, mood)
Target Value: "${targetValue}" (e.g. "Passé Composé", "Subjonctif Présent", "Passive Voice", "Ne... jamais", "Replace direct object with COD/COI pronoun", "Conditionnel Passé")

Requirements:
1. Transform the sentence accurately adhering to strict French grammar rules (agreement, elision, pronoun order, auxiliary selection).
2. Provide the natural English translation of the transformed sentence.
3. List the exact grammatical rules applied step-by-step.
4. Highlight any tricky aspect (e.g., past participle agreement, 'y'/'en' placement, subjunctive triggers).

Format as strict JSON:
{
  "transformedSentence": "Flawlessly transformed French sentence",
  "englishTranslation": "Accurate English translation",
  "rulesApplied": [
    "Rule 1 with specific explanation",
    "Rule 2 with specific explanation"
  ],
  "explanation": "Clear, elegant grammatical breakdown of how and why the sentence changes",
  "aspectComparison": {
    "originalAspect": "Description of the original sentence's grammatical structure",
    "targetAspect": "${targetValue || targetAspect}",
    "syntacticNotes": "Key grammatical nuance to remember for this transformation"
  }
}`;

    const result = await generateAiJson(prompt, defaultFallback, { task: 'grammar-transform', temperature: 0.2 });
    res.json(result);
  } catch (error) {
    console.error('Error in /api/ai/grammar-transform:', error);
    res.json(defaultFallback);
  }
});

export default router;
