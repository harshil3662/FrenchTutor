# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies (`bun.lock` and `package-lock.json` both exist; npm is the documented path).
- `npm run dev` — runs `local-server.js`: Express API plus Vite middleware for the frontend, on http://localhost:3000 (override with `PORT`). HMR is disabled when `DISABLE_HMR=true`.
- `npm run build` — `vite build` into `dist/`.
- `npm start` — production mode of `local-server.js`: serves `dist/` statically and falls back to `index.html`. Run `npm run build` first.
- `npm run lint` — `tsc --noEmit`. This is the only check; there is no test runner or test script in the repo.

There are no tests, so there is no "run a single test" command. Verify changes by running `npm run lint` and `npm run build`, and by exercising the view in the dev server.

## Architecture

**One Express app, two entry points.** The backend lives in `backend/`. `backend/app.js` builds the Express app and mounts all routes under `/api`; it exports the `app`. Nothing else defines routes.
- `local-server.js` imports `app`, attaches Vite middleware (dev) or static `dist/` serving (`NODE_ENV=production`), and listens.
- `api/router.js` imports the same `app` for Vercel. `vercel.json` rewrites `/api/:path*` to `/api/router`, which restores the path from the `vercelApiPath` query param before handing the request to Express. If you add a route, create `backend/routes/<name>.js` (an Express `Router` with paths like `/ai/<name>`), register it in `backend/routes/index.js`, and it works in both environments.

**Backend layout.**
- `backend/config/env.js` loads `.env.local` then `.env` via dotenv; `app.js` imports it first.
- `backend/services/` holds provider code: `openrouter.js`, `gemini.js`, `json.js` (`cleanAndParseJson`), and `ai.js` (`generateAiJson`, the provider chain).
- `backend/routes/` has one file per endpoint; `index.js` combines them.

**Shared data between server and client.** `backend/routes/quiz.js` and `story.js` import `GRAMMAR_ASPECT_LESSONS` from `src/data/grammar/index.js`, the same module the React app uses. Changes to grammar content affect the prompts the server builds, not only the UI.

**AI provider chain (in `backend/services/ai.js`).** Each `/api/ai/*` route tries, in order:
1. OpenRouter (`OPEN_ROUTER_KEY`), model chosen per task by `getOpenRouterModel(task)`, which checks `OPEN_ROUTER_MODEL_<TASK>` before `OPEN_ROUTER_MODEL`.
2. Gemini (`GEMINI_API_KEY`) via `@google/genai`, lazily initialized.
3. A built-in fallback response for that feature.

Model output goes through `cleanAndParseJson`, which strips code fences and extracts the first JSON object or array, then falls back to a default value. Keep new AI routes on this pattern so the app still works with no keys set.

**Frontend.** `src/App.jsx` is the shell and switches between views. Each view is a component in `src/components/` (one file per view, e.g. `GrammarWorkbenchView.jsx`, `StoriesView.jsx`, `TutorChatView.jsx`). Shared state and logic sit in `src/utils/`:
- `progressionUtils.js` decides unlocks (level order, 70% quiz pass threshold).
- `storageUtils.js` and `curriculumStore.js` persist progress in `localStorage`. There is no backend database.
- `frenchGrammarEngine.js` is the offline rule engine used for transformation and sentence analysis when AI is unavailable.
- `modalState.js` coordinates modals.

**Grammar content.** Units are plain JS objects in `src/data/grammar/{a1,a2,b1,b2}Units.js`, combined by `index.js`, and grouped into aspect categories in `categories.js`. `src/data/grammarAspectsData.js` and `scenariosData.js` / `vocabData.js` are the other content modules.

**Build chunking.** `vite.config.js` splits `src/data/grammar/`, `@phosphor-icons/react`, and `motion` into separate chunks via `manualChunks`. Keep that in mind when adding large dependencies or data.

**Environment.** `backend/config/env.js` loads `.env.local` then `.env` through dotenv. Both are gitignored. Required for full AI behavior: `OPEN_ROUTER_KEY`, `OPEN_ROUTER_MODEL`; optional: `GEMINI_API_KEY`, per-task model overrides.

## Notes

- `README.md` lists `src/data/curriculumData.js` and `src/data/pronunciationData.js`, but neither exists in the repository. Check before relying on them.
- `backend/routes/story.js` and `dailyVocabulary.js` are large because they hold inline fallback content. Find a route by its `router.post('/ai/...')` line.
