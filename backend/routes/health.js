import { Router } from 'express';
import { getOpenRouterApiKey } from '../services/openrouter.js';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    hasOpenRouterKey: Boolean(getOpenRouterApiKey()),
    timestamp: new Date().toISOString(),
  });
});

export default router;
