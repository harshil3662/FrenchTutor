export function getOpenRouterApiKey() {
  return process.env.OPEN_ROUTER_KEY || null;
}

export function getOpenRouterModel(task) {
  const taskKey = task
    ? `OPEN_ROUTER_MODEL_${task.replace(/[^a-z0-9]/gi, '_').toUpperCase()}`
    : null;
  return (taskKey && process.env[taskKey]) || process.env.OPEN_ROUTER_MODEL || 'openai/gpt-4o';
}

export async function generateOpenRouterJson(prompt, { task, temperature = 0.9, timeoutMs = 4000, maxTokens } = {}) {
  const apiKey = getOpenRouterApiKey();
  if (!apiKey) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'FrenchTutor',
      },
      body: JSON.stringify({
        model: getOpenRouterModel(task),
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature,
        ...(maxTokens ? { max_tokens: maxTokens } : {}),
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '');
      throw new Error(`OpenRouter returned status ${response.status} for model ${getOpenRouterModel(task)}: ${errorBody.slice(0, 500)}`);
    }

    const payload = await response.json();
    return payload.choices?.[0]?.message?.content || null;
  } finally {
    clearTimeout(timeout);
  }
}
