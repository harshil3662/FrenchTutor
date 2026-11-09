import { cleanAndParseJson } from './json.js';
import { getGeminiClient } from './gemini.js';
import { generateOpenRouterJson } from './openrouter.js';

export async function generateAiJson(prompt, fallback, {
  task,
  temperature = 0.3,
  preferOpenRouter = false,
  openRouterTimeoutMs,
  maxTokens,
  parseRetries = 0,
} = {}) {
  if (preferOpenRouter) {
    // Long JSON replies occasionally come back malformed; retry before using the fallback
    for (let attempt = 0; attempt <= parseRetries; attempt += 1) {
      try {
        const openRouterResult = await generateOpenRouterJson(prompt, {
          task,
          temperature,
          timeoutMs: openRouterTimeoutMs,
          maxTokens,
        });
        const parsed = cleanAndParseJson(openRouterResult, null);
        if (parsed) return parsed;
        console.warn(`OpenRouter ${task || 'AI'} returned no usable JSON (attempt ${attempt + 1}, ${openRouterResult?.length ?? 0} chars):`, openRouterResult?.slice(0, 300) ?? 'no content');
      } catch (error) {
        console.warn(`OpenRouter ${task || 'AI'} request failed:`, error);
        break;
      }
    }
  }

  const ai = getGeminiClient();
  if (ai) {
    const candidateModels = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature,
          },
        });
        const parsed = cleanAndParseJson(response.text, null);
        if (parsed) return parsed;
      } catch (geminiError) {
        console.warn(`Gemini model ${model} for ${task || 'AI'} failed:`, geminiError.message || geminiError);
      }
    }
  }

  if (!preferOpenRouter) {
    try {
      const openRouterResult = await generateOpenRouterJson(prompt, { task, temperature });
      if (openRouterResult) return cleanAndParseJson(openRouterResult, fallback);
    } catch (error) {
      console.warn(`OpenRouter ${task || 'AI'} request failed:`, error);
    }
  }

  return fallback;
}
