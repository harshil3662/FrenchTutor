import { Router } from 'express';
import { generateAiJson } from '../services/ai.js';

const router = Router();

// AI Pronunciation Assessment & Phonetic Coach
router.post('/ai/pronunciation-feedback', async (req, res) => {
  const { targetPhrase = '', spokenTranscript = '' } = req.body;
  const matchScore = (targetPhrase && spokenTranscript && targetPhrase.toLowerCase().trim() === spokenTranscript.toLowerCase().trim()) ? 96 : 84;
  
  const defaultFallback = {
    score: matchScore,
    phoneticTarget: "/bɔ̃.ʒuʁ/",
    phoneticSpoken: "/bɔ̃.ʒuʁ/",
    strengths: ["Bonne clarté générale des voyelles", "Rythme et cadence naturels"],
    areasToImprove: ["Travaillez la vibration douce du R uvulaire", "Assurez une liaison fluide"],
    exercises: ["Répétez : 'Un bon vin blanc'", "Articulez distinctement les syllabes"],
    audioGuideTip: "Arrondissez légèrement les lèvres vers l'avant pour les voyelles françaises."
  };

  try {
    const prompt = `You are a French Phonetics and Diction coach.
Target phrase the student was supposed to say: "${targetPhrase}"
What speech-to-text recognized from the student's voice: "${spokenTranscript}"

Evaluate their pronunciation accuracy and phonetic nuances.
Output JSON strictly with:
{
  "score": number between 0 and 100,
  "phoneticTarget": "IPA transcription of target phrase",
  "phoneticSpoken": "IPA transcription or estimation of what was heard",
  "strengths": ["string", "string"],
  "areasToImprove": ["specific sound guidance, e.g., nasal vowels, guttural R, silent letters, liaisons"],
  "exercises": ["2 short targeted tongue twisters or drills to improve this specific sound"],
  "audioGuideTip": "Mouth shape and tongue placement tip in English"
}`;

    const result = await generateAiJson(prompt, defaultFallback, { task: 'pronunciation-feedback' });
    res.json(result);
  } catch (error) {
    console.error('Error in /api/ai/pronunciation-feedback:', error);
    res.json(defaultFallback);
  }
});

export default router;
