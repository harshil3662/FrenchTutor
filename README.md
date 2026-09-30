<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/8880688d-408f-4296-94ae-0ae995f539d3

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set `OPEN_ROUTER_KEY` and `OPEN_ROUTER_MODEL` in `.env.local` to use OpenRouter for the AI-powered views. Set `GEMINI_API_KEY` as an optional fallback provider key.
3. Run the app:
   `npm run dev`

OpenRouter is used first for the tutor, grammar lessons, workbench, grammar doctor, stories, pronunciation coach, and AI quizzes. If the OpenRouter request fails or `OPEN_ROUTER_KEY` is not set, the server falls back to Gemini when `GEMINI_API_KEY` is available, then to each feature's built-in response fallback.

To use different OpenRouter models for individual features, set any of these optional variables; each falls back to `OPEN_ROUTER_MODEL`:

- `OPEN_ROUTER_MODEL_CHAT`
- `OPEN_ROUTER_MODEL_GENERATE_GRAMMAR_LESSON`
- `OPEN_ROUTER_MODEL_GRAMMAR_TRANSFORM`
- `OPEN_ROUTER_MODEL_DISSECT_SENTENCE`
- `OPEN_ROUTER_MODEL_GRAMMAR_CHECK`
- `OPEN_ROUTER_MODEL_GENERATE_STORY`
- `OPEN_ROUTER_MODEL_PRONUNCIATION_FEEDBACK`
- `OPEN_ROUTER_MODEL_GENERATE_QUIZ`
