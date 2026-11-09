import { Router } from 'express';
import { generateAiJson } from '../services/ai.js';

const router = Router();

// AI French Tutor Chat Endpoint
router.post('/ai/chat', async (req, res) => {
  const defaultFallback = {
    reply: "Bonjour ! Je suis ravi de pratiquer le français avec vous. Comment allez-vous aujourd'hui ?",
    translation: "Hello! I am delighted to practice French with you. How are you today?",
    feedback: {
      correction: null,
      betterAlternative: "Essayez de varier le vocabulaire : 'Comment allez-vous ?' ou 'Comment vas-tu ?'",
      vocabularyHighlight: ["Bonjour (Hello)", "ravi (delighted)", "pratiquer (to practice)"],
      grammarTip: "Always remember to use 'vous' for formal/polite conversations or 'tu' for casual friends."
    }
  };

  try {
    const { messages, scenario, level = 'A2', userGoal } = req.body;

    const systemPrompt = `You are "Émile", an encouraging, highly articulate, and culturally authentic native French language tutor and conversation partner.
You are helping a student at CEFR level ${level} who is learning French.
Current Scenario / Context: ${scenario || 'General daily conversation in Paris'}.
Student's Goal: ${userGoal || 'Improve conversational fluency and grammar'}.

RULES:
1. Always respond primarily in natural French suited for ${level} level learners.
2. Provide a clear, natural English translation of your reply.
3. Analyze the user's latest message. If there are grammatical, vocabulary, conjugation, gender (le/la), or phonetic/spelling errors, provide a constructive, gentle correction.
4. Suggest a more native/natural phrasing ("Comment un Français le dirait").
5. Extract 2-3 useful French vocabulary words or idiomatic expressions from the exchange.
6. Provide one short, actionable French grammar or cultural tip.

You MUST format your response as strict JSON matching this structure:
{
  "reply": "Your French response to the user here...",
  "translation": "English translation of your reply...",
  "feedback": {
    "correction": "Correction of user mistake if any, or null if their French was correct",
    "betterAlternative": "A more natural/idiomatic way a native speaker would say what user tried to express",
    "vocabularyHighlight": ["mot (meaning)", "expression (meaning)"],
    "grammarTip": "Quick bite-sized grammar or culture tip relevant to the message"
  }
}`;

    const formattedHistory = (messages || []).map((m) => 
      `${m.role === 'user' ? 'Student' : 'Tutor Émile'}: ${m.content}`
    ).join('\n');

    const result = await generateAiJson(
      `${systemPrompt}\n\nCONVERSATION HISTORY:\n${formattedHistory}\n\nGenerate your JSON response now:`,
      defaultFallback,
      { task: 'chat', temperature: 0.7 }
    );
    res.json(result);
  } catch (error) {
    console.error('Error in /api/ai/chat:', error);
    res.json(defaultFallback);
  }
});

export default router;
