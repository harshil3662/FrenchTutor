// Helper to safely parse JSON from LLM responses
export function cleanAndParseJson(rawText, fallback) {
  if (!rawText) return fallback;
  let text = rawText.trim();
  // Strip markdown code blocks if present
  if (text.startsWith('```json')) {
    text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (text.startsWith('```')) {
    text = text.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  // Try direct parse
  try {
    return JSON.parse(text);
  } catch {
    // Try to extract outermost JSON object { ... }
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      try {
        return JSON.parse(text.substring(firstBrace, lastBrace + 1));
      } catch {}
    }
    // Try to extract outermost JSON array [ ... ]
    const firstBracket = text.indexOf('[');
    const lastBracket = text.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
      try {
        return JSON.parse(text.substring(firstBracket, lastBracket + 1));
      } catch {}
    }
    return fallback;
  }
}
