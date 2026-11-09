import { Router } from 'express';
import { generateAiJson } from '../services/ai.js';

const router = Router();

// AI Evaluation of User Opinion / Point of View on Reading Passages
router.post('/ai/evaluate-reading-opinion', async (req, res) => {
  const {
    userOpinion = '',
    articleTitle = '',
    level = 'A2',
    promptQuestion = '',
  } = req.body;

  const defaultEvaluation = {
    score: 85,
    cefrAssessment: `Bonne expression pour le niveau ${level}`,
    feedbackFr: "Bravo pour votre contribution ! Votre point de vue est bien exprimé et pertinent par rapport au sujet de l'article.",
    feedbackEn: "Well done! Your perspective is clearly articulated and relevant to the article's theme.",
    grammarTips: [
      "Veillez à bien accorder les adjectifs avec les noms qu'ils qualifient.",
      "L'emploi de connecteurs logiques enrichit la fluidité de votre pensée."
    ],
    suggestedNativeVersion: userOpinion ? `« ${userOpinion.trim()} » est compréhensible et naturel.` : "Exprimez-vous librement en français !",
    encouragement: "Continuez à partager votre opinion en français, c'est le meilleur moyen de progresser !",
    xpBonus: 25,
  };

  if (!userOpinion || userOpinion.trim().length < 5) {
    return res.json({
      score: 50,
      cefrAssessment: "Réponse trop courte",
      feedbackFr: "N'hésitez pas à écrire une phrase complète pour développer votre point de vue.",
      feedbackEn: "Try writing at least one full sentence to express your perspective.",
      grammarTips: ["Utilisez les amorces suggérées comme « À mon avis... » pour démarrer."],
      suggestedNativeVersion: "À mon avis, c'est un sujet très intéressant.",
      encouragement: "Essayez à nouveau avec une ou deux phrases !",
      xpBonus: 10,
    });
  }

  try {
    const prompt = `You are a French professor evaluating a student's opinion / point of view written in response to a French article.
Article Title: "${articleTitle}"
Question asked: "${promptQuestion}"
Target CEFR Level: "${level}"
Student's response in French:
"""
${userOpinion}
"""

Evaluate the student's response kindly, constructively, and pedagogically according to CEFR level ${level}.
Provide:
1. score: integer between 60 and 100 based on effort, clarity, vocabulary, and grammar relative to CEFR ${level}.
2. cefrAssessment: short assessment title (e.g., "Niveau A2 validé avec brio" or "Bonne tentative, vocabulaire encourageant").
3. feedbackFr: 2-3 sentences in French praising what they did well and explaining how to improve.
4. feedbackEn: 1-2 sentence English summary of feedback.
5. grammarTips: array of 1-3 specific grammar or vocabulary improvements or observations.
6. suggestedNativeVersion: how a native French speaker would write this exact thought cleanly and naturally.
7. encouragement: brief warm encouraging closing message in French.
8. xpBonus: integer 20-30.

Format strictly as JSON:
{
  "score": 90,
  "cefrAssessment": "Niveau A2 bien maîtrisé",
  "feedbackFr": "Votre phrase est claire...",
  "feedbackEn": "Your thought is well expressed...",
  "grammarTips": ["Pensez à...", "Attention à..."],
  "suggestedNativeVersion": "Version naturelle...",
  "encouragement": "Bravo !",
  "xpBonus": 25
}`;

    const result = await generateAiJson(prompt, defaultEvaluation, {
      task: 'evaluate-opinion',
      temperature: 0.4,
      preferOpenRouter: true,
      openRouterTimeoutMs: 15000,
      maxTokens: 1500,
    });

    res.json({ ...defaultEvaluation, ...result });
  } catch (error) {
    console.error('Error in /api/ai/evaluate-reading-opinion:', error);
    res.json(defaultEvaluation);
  }
});

export default router;
