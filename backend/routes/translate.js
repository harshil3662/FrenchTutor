import { Router } from 'express';
import { generateAiJson } from '../services/ai.js';

const router = Router();

// Quick AI Question Prompt Translation Endpoint
router.post('/ai/translate', async (req, res) => {
  const { text = '', targetLang = 'en' } = req.body;
  if (!text || !text.trim()) {
    return res.json({ translatedText: '' });
  }

  const defaultFallback = {
    translatedText: text
  };

  try {
    const prompt = `You are a professional French-English pedagogical translator.
Translate the following sentence accurately into ${targetLang === 'en' ? 'English' : 'French'}.
Preserve any blanks like "___" or brackets like "(aller)".

Source text: "${text}"

Format as JSON:
{
  "translatedText": "the translation"
}`;

    const result = await generateAiJson(prompt, defaultFallback, { task: 'translate', temperature: 0.1 });
    res.json(result);
  } catch (error) {
    console.error('Error in /api/ai/translate:', error);
    res.json(defaultFallback);
  }
});

export default router;
