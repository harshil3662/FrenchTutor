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

## Deploy to Vercel

Import this repository into Vercel with the repository root as the Root Directory. The included `vercel.json` configures the production build and the `dist` output directory. Vercel serves the Vite frontend from `dist` and runs the existing Express API through `api/[...path].js`; `server.js` does not need to be deployed to a separate host.

Add `OPEN_ROUTER_KEY` and `OPEN_ROUTER_MODEL` under the Vercel project's Environment Variables. Add `GEMINI_API_KEY` if you want Gemini as a fallback, and add any feature-specific `OPEN_ROUTER_MODEL_*` variables you use. Apply variables to the Production and Preview environments as needed. The build itself does not require AI keys.

For local development, run `npm run dev`. The local server wrapper is in `local-server.js`; the API app in `server.js` is also imported directly by Vercel's function.
