# L'Atelier Grammaire — FrenchTutor

A French learning web app that teaches grammar the way a good teacher does: one structured unit at a time, from A1 to B2, with every unit gated by a quiz, and AI used to explain mistakes, transform sentences, and generate authentic reading material.

---

## Table of Contents

- [What Makes It Different](#what-makes-it-different)
- [Features](#features)
- [The Learning Path](#the-learning-path)
- [Knowledge Base](#knowledge-base)
- [Tech Stack](#tech-stack)
- [AI Models and Providers](#ai-models-and-providers)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deploying to Vercel](#deploying-to-vercel)
- [Data and Privacy](#data-and-privacy)

---

## What Makes It Different

Most language apps reward you for tapping through vocabulary and rarely explain *why* a sentence is wrong. FrenchTutor is built around grammar as a system:

1. **Rules before practice.** Each unit opens with a guide that explains the rule, shows conjugation or agreement tables, and points out common traps.
2. **Mastery gates.** You must score **70% or more** on a unit's quiz to unlock the next one. There is no placement test. Beginners and advanced learners start at A1 and move forward on evidence.
3. **Mistakes are analysed, not just marked wrong.** The Grammar Doctor and the Tutor name the error type (gender, conjugation, agreement, spelling, syntax, preposition), give the correction, and state the rule behind it.
4. **Transformation shows structure.** The Workbench rewrites a sentence into another tense, mood, or voice and explains each step, so you see how the forms change.
5. **Learning happens in context.** Reading articles are written at your CEFR level and cover the grammar you are studying. You then write an opinion on the article, and the AI professor grades it.
6. **Works with or without AI.** Core analysis (sentence transformation, dissection, and grammar checks) has a local rule engine, `frenchGrammarEngine.js`, that runs in the browser when no AI provider is available.

---

## Features

| Area | Tag | What it does |
|---|---|---|
| **Home** | Start Here | Shows your current level, next unit, and a short guide to the path. |
| **Grammar Lessons** | 28 Units | Structured guides with rules, tables, examples, and a quiz for each unit. Organised into 8 aspect categories. |
| **Workbench** | Transformer | Rewrites sentences across tenses, moods, and voices, with an explanation of each change. |
| **Grammar Doctor** | Diagnostics | Paste a French text. It finds errors, classifies them, and explains each rule. |
| **Vocabulary** | Decks | Flashcards with spaced repetition (SRS), mastery toggling, and AI-generated daily decks for any domain you type. |
| **Reading** | Contextual | AI-generated articles in four publication formats (newspaper, magazine, editorial/debate, narrative story), with comprehension quizzes and opinion writing that gets professor-style feedback. |
| **Grammar Tutor** | Live | Chat with **Émile**, a native-style French tutor. Émile replies in French, corrects your mistakes, and adjusts to your level. |
| **Pronunciation** | Coach | Practice drills with browser speech recognition. The AI coach gives feedback on your attempt. |
| **Scenarios** | Roleplay | Practise real situations (café, hotel, bakery, job interview, museum guided tour) with named characters. |
| **Stats** | Badges | XP, completed lessons, mastery counts, and badges. Progress is saved in your browser. |

---

## The Learning Path

Four CEFR levels, 28 units in total. Units are numbered in the order they are taught, and each has its own quiz.

| Level | Units | Focus |
|---|---|---|
| **A1** (11 units) | 1–7, 9, 10, 11, 27 | Articles, gender, numbers, sentence building, questions, imperative, present tense of -ER / -IR / -RE verbs, être / avoir / aller / faire, adjectives |
| **A2** (10 units) | 8, 12, 13, 14, 15, 20, 21, 22, 25, 28 | Clauses, near future and past, pronominal verbs, passé composé, imparfait and plus-que-parfait, prepositions, infinitive, imperative with pronouns, object pronouns, adverbs |
| **B1** (6 units) | 16, 17, 18, 19, 23, 26 | Futur simple and antérieur, conditional, modal nuances (pouvoir / devoir / vouloir), subjunctive, present participle and gérondif, relative pronouns |
| **B2** (1 unit) | 24 | Passé simple, passive voice, indirect speech |

Each level unlocks when you pass the units before it. You can always review earlier units.

---

## Knowledge Base

All content lives in `src/data/` and is plain JavaScript, so it is easy to edit.

| File | Contents |
|---|---|
| `src/data/grammar/a1Units.js`, `a2Units.js`, `b1Units.js`, `b2Units.js` | The 28 grammar units. Each unit has an `id`, `unitNumber`, `level`, `title`, topics (each with a title, explanation, and reference tables), and a quiz. |
| `src/data/grammar/categories.js` | The 8 aspect categories used on the Grammar Lessons page. Each groups related units (for example, *Past Tenses & Pronominal Verbs* covers Units 13–16). |
| `src/data/grammar/index.js` | Combines all units and sorts them by unit number. |
| `src/data/curriculumData.js` | Lesson-based curriculum (for example *Salutations & Présentations*, *Le Passé Composé avec Avoir et Être*, *Le Subjonctif Présent*) with exercises and answers. |
| `src/data/vocabData.js` | Starter flashcard deck across areas such as Basics, Daily Life, Food & Wine, Travel & Metro, Business, and Slang & Argot, with levels A1–B2. |
| `src/data/pronunciationData.js` | Pronunciation drills: nasal vowels, the guttural French R, U vs OU, and liaisons with silent letters. |
| `src/data/scenariosData.js` | Five roleplay scenarios with characters, setting, and goals. |
| `src/utils/progressionUtils.js` | Unlock rules: level order, 70% pass threshold, and lesson lock status. |
| `src/utils/frenchGrammarEngine.js` | Offline rule engine for transformation, sentence dissection, and grammar analysis. |

**Adding a unit:** Add an object to the relevant `*Units.js` file with a unique `id`, the level, a `unitNumber`, topics, and a quiz. It appears in the Grammar Lessons page and the unlock path automatically.

---

## Tech Stack

**Frontend**
- **React 19** with **Vite 6** for the build and dev server
- **Tailwind CSS 4** (via `@tailwindcss/vite`) for styling, with responsive layouts for phones through desktop
- **Motion** (`motion`) for animations
- **Phosphor Icons** (`@phosphor-icons/react`) for the icon set
- **canvas-confetti** for celebration effects on completed lessons
- Browser **Web Speech API** for speech recognition and text-to-speech

**Backend**
- **Express 4** API in `server.js`, with one route per AI feature under `/api/ai/*`
- `api/router.js` wraps the same Express app as a Vercel serverless function
- `local-server.js` runs Express with Vite middleware during development

**Language and tooling**
- JavaScript (JSX) with TypeScript used for type checking (`npm run lint`)
- `dotenv` for local environment variables

---

## AI Models and Providers

The app uses a two-step provider chain, with a built-in fallback for every feature.

1. **OpenRouter (primary).** Requests go to `https://openrouter.ai/api/v1/chat/completions`. The model is set with `OPEN_ROUTER_MODEL`, and you can override it per feature (see [Environment Variables](#environment-variables)). If no model is set, the default is `openai/gpt-4o`. Any model on OpenRouter works, so you can choose one based on cost or quality.
2. **Google Gemini (fallback).** If OpenRouter is not configured or a request fails, the server calls the Gemini API (`@google/genai`) with `GEMINI_API_KEY`. It tries `gemini-3.8-flash`, then `gemini-flash-latest`, then `gemini-3.1-flash-lite`.
3. **Local fallback.** If both providers fail, each feature returns a built-in response, and the offline grammar engine handles transformation and analysis.

AI features and their prompts:

| Feature | Endpoint | What the model does |
|---|---|---|
| Tutor (Émile) | `/api/ai/chat` | Replies in French at your level, then gives an English translation, 2–3 key vocabulary items, a short grammar or culture tip, and a correction if your French had a mistake. |
| Grammar Doctor | `/api/ai/grammar-check` | Acts as a Sorbonne-style linguist. Returns errors with type, correction, and rule. |
| Pronunciation coach | `/api/ai/pronunciation-feedback` | Scores a spoken attempt and gives diction advice. |
| Reading articles | `/api/ai/generate-story` | Writes a CEFR-level article in the chosen publication format, with comprehension questions. |
| Opinion feedback | `/api/ai/evaluate-reading-opinion` | Grades a student's written opinion on an article as a French professor. |
| Daily vocabulary | `/api/ai/generate-daily-vocabulary` | Builds a flashcard deck for any domain the learner enters. |
| Quizzes | `/api/ai/generate-quiz` | Creates multiple-choice quizzes at a chosen level. |
| Translation | `/api/ai/translate` | Translates with pedagogical notes. |
| Workbench | `/api/ai/grammar-transform` | Rewrites a sentence in the target tense, mood, or voice. |
| Sentence dissection | `/api/ai/dissect-sentence` | Labels each word by part of speech and function. |
| Grammar lesson generator | `/api/ai/generate-grammar-lesson` | Drafts lesson content for a grammar aspect. |

---

## Project Structure

```
FrenchTutor/
├── server.js               # Express API: all /api/ai/* routes and provider logic
├── local-server.js         # Dev server (Express + Vite middleware) and production static server
├── api/router.js           # Vercel serverless entry point for the Express app
├── vercel.json             # Build settings and /api rewrite
├── index.html
├── src/
│   ├── App.jsx             # App shell and view routing
│   ├── main.jsx
│   ├── components/         # One file per view (HomeView, StoriesView, TutorChatView, ...)
│   ├── data/               # Knowledge base: units, curriculum, vocabulary, drills, scenarios
│   │   └── grammar/        # A1–B2 unit files and aspect categories
│   └── utils/              # Progress storage, unlock logic, audio, offline grammar engine
└── package.json
```

---

## Getting Started

**Prerequisites:** Node.js (current LTS recommended), and an OpenRouter API key (recommended) or a Gemini API key.

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/harshil3662/FrenchTutor.git
   cd FrenchTutor
   npm install
   ```
2. Create a `.env.local` file in the project root (see [Environment Variables](#environment-variables)).
3. Start the app:
   ```bash
   npm run dev
   ```
4. Open **http://localhost:3000**.

Other scripts:

| Command | Purpose |
|---|---|
| `npm run build` | Build the frontend into `dist/` |
| `npm run preview` | Preview the production build with Vite |
| `npm run lint` | Type-check with TypeScript (`tsc --noEmit`) |
| `npm start` | Run the production server from `local-server.js` |

The app runs without AI keys. The grammar units, quizzes, flashcards, and drills all work. AI features then use their built-in fallback responses.

---

## Environment Variables

Put these in `.env.local` for local development, or in the Vercel project settings for deployment.

**Required for full AI features**

| Variable | Description |
|---|---|
| `OPEN_ROUTER_KEY` | OpenRouter API key. Used first for all AI features. |
| `OPEN_ROUTER_MODEL` | Default OpenRouter model ID, for example `openai/gpt-4o`. |

**Optional**

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Gemini key. Used as the fallback when OpenRouter is not set or fails. |
| `PORT` | Port for the local server. Defaults to `3000`. |

**Per-feature model overrides** (each falls back to `OPEN_ROUTER_MODEL`)

- `OPEN_ROUTER_MODEL_CHAT`
- `OPEN_ROUTER_MODEL_GENERATE_GRAMMAR_LESSON`
- `OPEN_ROUTER_MODEL_GRAMMAR_TRANSFORM`
- `OPEN_ROUTER_MODEL_DISSECT_SENTENCE`
- `OPEN_ROUTER_MODEL_GRAMMAR_CHECK`
- `OPEN_ROUTER_MODEL_GENERATE_STORY`
- `OPEN_ROUTER_MODEL_PRONUNCIATION_FEEDBACK`
- `OPEN_ROUTER_MODEL_GENERATE_QUIZ`

Never commit `.env.local` or any key to the repository.

---

## Deploying to Vercel

1. Import this repository into Vercel, with the repository root as the Root Directory.
2. `vercel.json` sets the build command to `npm run build` and the output directory to `dist`. It routes `/api/...` requests to the shared function in `api/router.js`.
3. Add `OPEN_ROUTER_KEY` and `OPEN_ROUTER_MODEL` under **Settings → Environment Variables**. Add `GEMINI_API_KEY` and any per-feature model variables you use. Apply them to Production and Preview as needed.

The build does not need AI keys. Vercel serves the frontend from `dist` and runs the Express API as a function, so `server.js` does not need its own host.

---

## Data and Privacy

- **Progress is stored in your browser** (`localStorage`): completed lessons, XP, mastery, and flashcard state. There are no user accounts and no database.
- **AI requests** send the text you submit (tutor messages, sentences, articles, opinions) to the configured provider, OpenRouter or Gemini, to generate a response. Use your own API keys and review each provider's data policy.
- **Speech recognition** uses your browser's Web Speech API, so audio handling depends on your browser.

---

## Credits

Built with React, Vite, Tailwind CSS, Express, OpenRouter, and Google Gemini. Originally scaffolded from Google AI Studio.
