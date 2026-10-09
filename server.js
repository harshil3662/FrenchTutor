import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config({ path: ['.env.local', '.env'] });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to safely parse JSON from LLM responses
function cleanAndParseJson(rawText, fallback) {
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

// Lazy initialization of Gemini client
let aiClient = null;

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

function getOpenRouterApiKey() {
  return process.env.OPEN_ROUTER_KEY || null;
}

function getOpenRouterModel(task) {
  const taskKey = task
    ? `OPEN_ROUTER_MODEL_${task.replace(/[^a-z0-9]/gi, '_').toUpperCase()}`
    : null;
  return (taskKey && process.env[taskKey]) || process.env.OPEN_ROUTER_MODEL || 'openai/gpt-4o';
}

async function generateOpenRouterJson(prompt, { task, temperature = 0.9, timeoutMs = 4000, maxTokens } = {}) {
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
      throw new Error(`OpenRouter returned status ${response.status}`);
    }

    const payload = await response.json();
    return payload.choices?.[0]?.message?.content || null;
  } finally {
    clearTimeout(timeout);
  }
}

async function generateAiJson(prompt, fallback, {
  task,
  temperature = 0.3,
  preferOpenRouter = false,
  openRouterTimeoutMs,
  maxTokens,
} = {}) {
  if (preferOpenRouter) {
    try {
      const openRouterResult = await generateOpenRouterJson(prompt, {
        task,
        temperature,
        timeoutMs: openRouterTimeoutMs,
        maxTokens,
      });
      const parsed = cleanAndParseJson(openRouterResult, null);
      if (parsed) return parsed;
    } catch (error) {
      console.warn(`OpenRouter ${task || 'AI'} request failed:`, error);
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

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    hasOpenRouterKey: Boolean(getOpenRouterApiKey()),
    timestamp: new Date().toISOString(),
  });
});

// AI French Tutor Chat Endpoint
app.post('/api/ai/chat', async (req, res) => {
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

// AI Grammar Doctor & Sentence Breakdown
app.post('/api/ai/grammar-check', async (req, res) => {
  const { text = '', targetTense } = req.body;
  const isAllerError = text.toLowerCase().includes('a allé') || text.toLowerCase().includes('a aller');
  
  const defaultFallback = {
    original: text,
    isCorrect: !isAllerError,
    correctedText: isAllerError ? text.replace(/a allé/gi, 'est allée').replace(/a aller/gi, 'est allée') : text,
    errors: isAllerError ? [
      {
        mistake: 'a allé',
        correction: 'est allée',
        rule: 'The verb "aller" is a verb of motion requiring auxiliary ÊTRE in the passé composé, agreeing in gender/number with "elle".',
        type: 'conjugation'
      }
    ] : [],
    grammarBreakdown: [
      { segment: text, explanation: "Analyse grammaticale détaillée effectuée avec succès." }
    ],
    conjugations: [
      {
        verb: isAllerError ? "aller" : "parler",
        infinitive: isAllerError ? "aller" : "parler",
        tense: targetTense || (isAllerError ? "Passé Composé" : "Présent"),
        table: isAllerError ? {
          "je": "suis allé(e)",
          "tu": "es allé(e)",
          "il/elle/on": "est allé(e)",
          "nous": "sommes allé(e)s",
          "vous": "êtes allé(e)(s)",
          "ils/elles": "sont allé(e)s"
        } : {
          "je": "parle",
          "tu": "parles",
          "il/elle/on": "parle",
          "nous": "parlons",
          "vous": "parlez",
          "ils/elles": "parlent"
        }
      }
    ],
    registerAnalysis: "Courant (Standard French)",
    culturalNuance: "Structure naturelle en français contemporain."
  };

  try {
    const prompt = `You are an expert French Linguist and Teacher at the Sorbonne.
Analyze the following French text: "${text}".

Target tense or specific inquiry: ${targetTense || 'General analysis'}.

Provide a comprehensive, pedagogical diagnostic in JSON format with:
1. "isCorrect": boolean
2. "correctedText": string with the flawless corrected version
3. "errors": array of { "mistake": string, "correction": string, "rule": string, "type": "gender" | "conjugation" | "agreement" | "spelling" | "syntax" | "preposition" }
4. "grammarBreakdown": array of { "segment": string, "explanation": string, "phoneticIPA": string }
5. "conjugations": array of { "verb": string, "infinitive": string, "tense": string, "table": { "je": string, "tu": string, "il/elle/on": string, "nous": string, "vous": string, "ils/elles": string } } for any key verbs used in the text
6. "registerAnalysis": "Familier (Informal/Slang)", "Courant (Standard)", or "Soutenu (Formal/Literary)" with explanation
7. "culturalNuance": string explaining when and how native French speakers would phrase this.`;

    const result = await generateAiJson(prompt, defaultFallback, { task: 'grammar-check' });
    res.json(result);
  } catch (error) {
    console.error('Error in /api/ai/grammar-check:', error);
    res.json(defaultFallback);
  }
});

// AI Pronunciation Assessment & Phonetic Coach
app.post('/api/ai/pronunciation-feedback', async (req, res) => {
  const { targetPhrase = '', spokenTranscript = '' } = req.body;
  const matchScore = (targetPhrase && spokenTranscript && targetPhrase.toLowerCase().trim() === spokenTranscript.toLowerCase().trim()) ? 96 : 84;
  
  const defaultFallback = {
    score: matchScore,
    phoneticTarget: "/bɔ̃.ʒuʁ/",
    phoneticSpoken: "/bɔ̃.ʒuʁ/",
    strengths: ["Bonne clarté générale des voyelles", "Rythme et cadence naturels"],
    areasToImprove: ["Travaillez la vibration douce du R uvulaire", "Assurez une liaison fluide"],
    exercises: ["Répétez : 'Un bon vin blanc'", "Articulez distinctement les syllabes"],
    audioGuideTip: "Arrondissez légèrement les lèvres vers l'avant pour les voyelles françaises."
  };

  try {
    const prompt = `You are a French Phonetics and Diction coach.
Target phrase the student was supposed to say: "${targetPhrase}"
What speech-to-text recognized from the student's voice: "${spokenTranscript}"

Evaluate their pronunciation accuracy and phonetic nuances.
Output JSON strictly with:
{
  "score": number between 0 and 100,
  "phoneticTarget": "IPA transcription of target phrase",
  "phoneticSpoken": "IPA transcription or estimation of what was heard",
  "strengths": ["string", "string"],
  "areasToImprove": ["specific sound guidance, e.g., nasal vowels, guttural R, silent letters, liaisons"],
  "exercises": ["2 short targeted tongue twisters or drills to improve this specific sound"],
  "audioGuideTip": "Mouth shape and tongue placement tip in English"
}`;

    const result = await generateAiJson(prompt, defaultFallback, { task: 'pronunciation-feedback' });
    res.json(result);
  } catch (error) {
    console.error('Error in /api/ai/pronunciation-feedback:', error);
    res.json(defaultFallback);
  }
});

// Dynamic AI Story, Newspaper Article & Multi-modal Reading Generator
app.post('/api/ai/generate-story', async (req, res) => {
  const {
    level = 'A1',
    topic = 'Le café parisien et l\'art de vivre au quotidien',
    theme = 'culture & society',
    sourceType = 'newspaper', // 'newspaper' | 'magazine' | 'editorial' | 'story'
  } = req.body;

  const levelFallbacks = {
    A1: {
      title: "Le quotidien du matin : Un café à la terrasse parisienne",
      subtitle: "Chaque matin dans les quartiers de Paris, les habitants retrouvent leur boulangerie et leur café habituel.",
      sourceType: "Newspaper Article (Le Parisien Quotidien)",
      publicationDate: "Morning Edition",
      author: "By Claire Delacroix, Society Desk",
      level: "A1",
      frenchText: "Chaque matin, Thomas se réveille à sept heures. Il habite dans un petit appartement près du jardin du Luxembourg. À huit heures, il marche jusqu'à la boulangerie de son quartier. La boulangère est toujours souriante. Thomas achète un croissant au beurre et une baguette bien dorée. Ensuite, il va au Café des Arts. Le serveur s'appelle Lucas. Lucas lui apporte un café noir avec un peu de sucre. Beaucoup de personnes lisent le journal ou parlent de la météo. Aujourd'hui, il fait beau et le ciel est bleu. Thomas aime observer les passants dans la rue. Pour lui, ce moment calme est le meilleur moment de la journée avant de commencer le travail.",
      englishTranslation: "Every morning, Thomas wakes up at seven o'clock. He lives in a small apartment near the Luxembourg Garden. At eight o'clock, he walks to the bakery in his neighborhood. The baker is always smiling. Thomas buys a butter croissant and a golden baguette. Then, he goes to the Café des Arts. The waiter's name is Lucas. Lucas brings him a black coffee with a little sugar. Many people read the newspaper or talk about the weather. Today, the weather is nice and the sky is blue. Thomas likes watching passersby in the street. For him, this calm moment is the best moment of the day before starting work.",
      glossary: [
        { french: "se réveille", english: "wakes up", type: "pronominal verb", contextSentence: "Thomas se réveille à sept heures." },
        { french: "boulangerie", english: "bakery", type: "feminine noun", contextSentence: "Il marche jusqu'à la boulangerie." },
        { french: "croissant au beurre", english: "butter croissant", type: "masculine noun", contextSentence: "Thomas achète un croissant au beurre." },
        { french: "serveur", english: "waiter", type: "masculine noun", contextSentence: "Le serveur s'appelle Lucas." },
        { french: "passants", english: "passersby / pedestrians", type: "plural noun", contextSentence: "Thomas aime observer les passants." },
      ],
      rightOrWrongQuestions: [
        {
          claim: "According to the article: Thomas buys his croissant at 10:00 AM.",
          isRight: false,
          explanation: "False: The text states that Thomas walks to the bakery at 8:00 AM, not at 10:00 AM.",
          quote: "À huit heures, il marche jusqu'à la boulangerie de son quartier."
        },
        {
          claim: "According to the article: Lucas the waiter serves Thomas a black coffee.",
          isRight: true,
          explanation: "True: The article explicitly states that Lucas brings him a black coffee with a little sugar.",
          quote: "Lucas lui apporte un café noir avec un peu de sucre."
        },
        {
          claim: "According to the article: The weather is cold and rainy that morning.",
          isRight: false,
          explanation: "False: The article says the weather is beautiful and the sky is blue.",
          quote: "Aujourd'hui, il fait beau et le ciel est bleu."
        }
      ],
      comprehensionQuestions: [
        {
          question: "Where does Thomas live in Paris?",
          options: ["Near the Eiffel Tower", "Near the Luxembourg Garden", "Near Gare de Lyon", "In the northern suburbs"],
          correctIndex: 1,
          explanation: "Thomas lives in a small apartment near the Luxembourg Garden (près du jardin du Luxembourg)."
        },
        {
          question: "What are people doing while sitting at the café?",
          options: ["Jogging around the park", "Sleeping at their tables", "Reading the newspaper or discussing the weather", "Watching a live football match"],
          correctIndex: 2,
          explanation: "The text says: 'Beaucoup de personnes lisent le journal ou parlent de la météo.'"
        },
        {
          question: "Which part of the day does Thomas prefer most?",
          options: ["The quiet morning moment before work starts", "The noisy lunch rush", "The evening subway commute", "Late night hours"],
          correctIndex: 0,
          explanation: "Thomas loves this calm morning moment best before beginning work."
        }
      ],
      summaryExercise: {
        prompt: "Which statement best summarizes the main idea of this article?",
        options: [
          { text: "Thomas enjoys a peaceful morning routine buying a croissant and drinking coffee at his neighborhood café before work.", isBest: true, feedback: "Excellent! This perfectly captures the essence and tone of the passage." },
          { text: "Lucas the waiter arrives late to open the café because of heavy rain.", isBest: false, feedback: "Incorrect: Lucas is already working and serving coffee on a sunny day." },
          { text: "The local bakery is closed for renovations in the morning.", isBest: false, feedback: "Incorrect: the bakery is open and welcoming customers." }
        ],
        sampleSummary: "In the morning, Thomas savors a quiet pause at his local bakery and café before his work day begins."
      },
      opinionPrompt: {
        question: "How do you prefer to start your ideal day? Share your morning routine or point of view in French.",
        context: "Write 1 to 3 simple sentences in French (e.g., your breakfast, coffee, walking, or reading habits). Use the starter phrases below to help you write!",
        starterPhrases: [
          "Le matin, je préfère boire... (In the morning, I prefer drinking...)",
          "Mon rituel du matin est très simple : d'abord... (My morning routine is very simple: first...)",
          "À mon avis, le meilleur moment de la journée est... (In my opinion, the best moment of the day is...)",
          "J'aime commencer ma journée par... (I like starting my day with...)"
        ]
      }
    },
    A2: {
      title: "Chronique Magazine : Le renouveau des marchés de producteurs locaux",
      subtitle: "De Lyon à Bordeaux, les Français se tournent vers les circuits courts pour cuisiner de saison.",
      sourceType: "Magazine Feature (Terroirs & Saveurs)",
      publicationDate: "Weekly Feature",
      author: "By Antoine Mercier, Food & Culture Journalist",
      level: "A2",
      frenchText: "Chaque samedi matin, la place du marché s'anime dès huit heures. De nombreux habitants viennent faire leurs courses avec de grands paniers en osier. Madame Dupont, maraîchère depuis vingt ans, vend des carottes fraîches, des poireaux et des pommes de terre biologiques. « Les clients posent beaucoup plus de questions qu'avant sur l'origine des légumes », explique-t-elle avec enthousiasme. Plus loin, un jeune fromager propose du comté affiné et du chèvre frais. Les prix sont parfois un peu plus élevés qu'au supermarché, mais la fraîcheur et le goût sont incomparables. Pour beaucoup de citadins, venir au marché n'est pas seulement une nécessité alimentaire, c'est aussi un rendez-vous convivial où l'on prend le temps de discuter et de partager des recettes.",
      englishTranslation: "Every Saturday morning, the market square comes alive starting at eight o'clock. Many locals come to do their shopping with large wicker baskets. Mrs. Dupont, a market gardener for twenty years, sells fresh carrots, leeks, and organic potatoes. 'Customers ask many more questions than before about the origin of vegetables,' she explains enthusiastically. Further along, a young cheesemaker offers aged Comté and fresh goat cheese. Prices are sometimes slightly higher than at the supermarket, but freshness and taste are incomparable. For many city dwellers, coming to the market is not only a food necessity, it is also a friendly gathering where people take time to chat and share recipes.",
      glossary: [
        { french: "s'anime", english: "comes alive / buzzes", type: "pronominal verb", contextSentence: "La place du marché s'anime dès huit heures." },
        { french: "maraîchère", english: "market gardener / vegetable grower", type: "feminine noun", contextSentence: "Madame Dupont est maraîchère depuis vingt ans." },
        { french: "paniers en osier", english: "wicker baskets", type: "masculine plural noun", contextSentence: "Les clients viennent avec de grands paniers en osier." },
        { french: "affiné", english: "aged / matured (cheese)", type: "adjective", contextSentence: "Le fromager propose du comté affiné." },
        { french: "convivial", english: "friendly / welcoming / warm", type: "adjective", contextSentence: "C'est un rendez-vous convivial." }
      ],
      rightOrWrongQuestions: [
        {
          claim: "According to the article: Customers care less about vegetable origins than they did in the past.",
          isRight: false,
          explanation: "False: Mrs. Dupont explains that customers ask far more questions now about where produce comes from.",
          quote: "Les clients posent beaucoup plus de questions qu'avant sur l'origine des légumes."
        },
        {
          claim: "According to the article: Prices at the local farmers' market can be slightly higher than at the supermarket.",
          isRight: true,
          explanation: "True: The article acknowledges that market prices are sometimes slightly higher than supermarkets.",
          quote: "Les prix sont parfois un peu plus élevés qu'au supermarché."
        },
        {
          claim: "According to the article: City dwellers visit the market solely for quick grocery shopping without talking.",
          isRight: false,
          explanation: "False: The article highlights that it is also a warm social gathering to chat and share recipes.",
          quote: "Ce n'est pas seulement une nécessité alimentaire, c'est aussi un rendez-vous convivial."
        }
      ],
      comprehensionQuestions: [
        {
          question: "How long has Mrs. Dupont worked as a vegetable grower?",
          options: ["Two years", "Ten years", "Twenty years", "Fifty years"],
          correctIndex: 2,
          explanation: "The text explicitly states: 'Madame Dupont, maraîchère depuis vingt ans' (twenty years)."
        },
        {
          question: "What main advantage justifies the higher market prices according to the author?",
          options: ["Automated self-checkout speed", "Incomparable freshness and flavor of the produce", "Free unlimited parking", "Daily clearance discounts"],
          correctIndex: 1,
          explanation: "The text specifies that 'la fraîcheur et le goût sont incomparables' (freshness and taste are incomparable)."
        },
        {
          question: "What do visitors do at the market in addition to buying food?",
          options: ["Work silently on laptops", "Chat with growers and exchange recipes", "Protest in the streets", "Attend choir rehearsals"],
          correctIndex: 1,
          explanation: "The market is a warm gathering place where people take time to chat and share recipes."
        }
      ],
      summaryExercise: {
        prompt: "Which statement best summarizes the journalist's perspective?",
        options: [
          { text: "Local farmers' markets are flourishing because city dwellers value fresh seasonal food and warm community connections.", isBest: true, feedback: "Spot on! This captures both the culinary quality and the social bond highlighted in the article." },
          { text: "Supermarkets have completely driven traditional French open-air markets out of business.", isBest: false, feedback: "Incorrect: the article illustrates the strong resurgence of local markets." },
          { text: "Organic vegetables are too expensive for the vast majority of consumers.", isBest: false, feedback: "Incomplete and misleading: the focus is on the appreciation of freshness and taste." }
        ],
        sampleSummary: "Despite somewhat higher prices, local farmers' markets thrive thanks to superior taste and friendly community atmosphere."
      },
      opinionPrompt: {
        question: "In your opinion, is it important to support local farmers and open-air markets? Share your view in French.",
        context: "Express your point of view in 1 to 3 sentences in French. You can mention price, health, taste, or community feeling.",
        starterPhrases: [
          "À mon avis, faire ses courses au marché... (In my opinion, shopping at the market...)",
          "Personnellement, je trouve que les produits locaux... (Personally, I find that local products...)",
          "D'un côté c'est un peu plus cher, mais de l'autre... (On one hand it is slightly pricier, but on the other...)",
          "Je préfère acheter des légumes frais parce que... (I prefer buying fresh vegetables because...)"
        ]
      }
    },
    B1: {
      title: "Enquête : Comment le vélo a conquis le cœur des métropoles françaises",
      subtitle: "Autrefois marginal, le vélo s'impose comme le symbole d'une transition urbaine accélérée.",
      sourceType: "Special Investigation (Le Monde Mobility & Cities)",
      publicationDate: "Weekly Report",
      author: "By Maxime Vasseur, Senior Reporter",
      level: "B1",
      frenchText: "Il y a dix ans, traverser Paris ou Strasbourg à vélo relevait presque du défi pour les cyclistes téméraires. Aujourd'hui, la donne a radicalement changé. Grâce à l'aménagement de pistes cyclables protégées et à la création de zones à trafic limité, des centaines de milliers de citoyens ont troqué la voiture ou le métro contre le vélo. Pour Sarah, trentenaire lyonnaise, ce changement a transformé son rapport à la ville : « Non seulement j'économise du temps et de l'argent, mais je me sens aussi beaucoup plus connectée à mon environnement. Je ne subis plus le stress des embouteillages. » Cependant, cette transformation suscite encore des débats houleux. Certains commerçants s'inquiètent de la suppression des places de stationnement, tandis que la cohabitation entre piétons, trottinettes et cyclistes exige une vigilance constante. Il n'en reste pas moins que la bicyclette semble désormais incontournable dans le paysage urbain.",
      englishTranslation: "Ten years ago, crossing Paris or Strasbourg by bicycle was almost a dare for bold cyclists. Today, the situation has radically changed. Thanks to the development of protected bike lanes and the creation of limited-traffic zones, hundreds of thousands of citizens have traded car or metro for bicycles. For Sarah, a thirty-something from Lyon, this change has transformed her relationship with the city: 'Not only do I save time and money, but I also feel much more connected to my environment. I no longer endure traffic stress.' However, this transformation still sparks heated debates. Some shopkeepers worry about the removal of parking spots, while coexistence between pedestrians, scooters, and cyclists demands constant vigilance. Nevertheless, the bicycle now seems indispensable in the urban landscape.",
      glossary: [
        { french: "relevait du défi", english: "was quite a challenge / feat", type: "verbal idiom", contextSentence: "Traverser la ville relevait presque du défi." },
        { french: "la donne a changé", english: "the situation changed completely", type: "idiom", contextSentence: "Aujourd'hui, la donne a radicalement changé." },
        { french: "troqué", english: "traded / swapped", type: "past participle", contextSentence: "Ils ont troqué la voiture contre le vélo." },
        { french: "débats houleux", english: "heated debates", type: "masculine plural noun", contextSentence: "Cette transformation suscite des débats houleux." },
        { french: "incontournable", english: "indispensable / essential", type: "adjective", contextSentence: "La bicyclette semble désormais incontournable." }
      ],
      rightOrWrongQuestions: [
        {
          claim: "According to the article: Sarah claims that commuting by bike wasted her time compared to traffic jams.",
          isRight: false,
          explanation: "False: Sarah emphasizes that she saves both time and money while avoiding the stress of traffic.",
          quote: "Non seulement j'économise du temps et de l'argent, mais je ne subis plus le stress des embouteillages."
        },
        {
          claim: "According to the article: The cycling transition still raises concerns among certain local shop owners.",
          isRight: true,
          explanation: "True: Shopkeepers worry specifically about the removal of customer parking spaces.",
          quote: "Certains commerçants s'inquiètent de la suppression des places de stationnement."
        },
        {
          claim: "According to the article: Ten years ago, bike paths in Paris and Strasbourg were as widespread as they are now.",
          isRight: false,
          explanation: "False: The article recalls that a decade ago, cycling across the city was an intimidating feat for bold riders.",
          quote: "Il y a dix ans, traverser Paris ou Strasbourg à vélo relevait presque du défi."
        }
      ],
      comprehensionQuestions: [
        {
          question: "What primarily fostered the dramatic boom in urban cycling across French cities?",
          options: ["The permanent shutdown of metro networks", "Protected bike lanes and low-traffic calm zones", "A total ban on walking", "Drastic price cuts on luxury bicycles"],
          correctIndex: 1,
          explanation: "The author credits protected cycling infrastructure and limited-traffic pedestrian-friendly zones."
        },
        {
          question: "What ongoing public space challenge is cited in the report?",
          options: ["Sharing streets safely among pedestrians, e-scooters, and cyclists", "Total lack of street trees", "Severe cold weather in July", "The complete absence of traffic signs"],
          correctIndex: 0,
          explanation: "Coexistence among pedestrians, scooters, and cyclists requires constant vigilance."
        },
        {
          question: "How has cycling transformed Sarah's daily experience in Lyon?",
          options: ["She feels lost and disoriented", "She is completely indifferent", "She feels freer, less stressed, and more connected to her surroundings", "She wants to buy a bigger car"],
          correctIndex: 2,
          explanation: "Sarah feels much more connected to her environment and free from traffic stress."
        }
      ],
      summaryExercise: {
        prompt: "Which statement provides the most balanced summary of this investigation?",
        options: [
          { text: "The rapid expansion of cycling is revitalizing urban mobility, though it brings real challenges in sharing street space.", isBest: true, feedback: "Brilliant! This reflects both the environmental enthusiasm and the practical urban coexistence issues." },
          { text: "Bicycles are a temporary fad that will disappear with the first winter frost.", isBest: false, feedback: "Incorrect: the author concludes that the bicycle has become an indispensable urban fixture." },
          { text: "French shopkeepers successfully forced city councils to dismantle all protected bike lanes.", isBest: false, feedback: "False: the article demonstrates ongoing expansion despite debates." }
        ],
        sampleSummary: "Backed by protected infrastructure, cycling has become a permanent pillar of French city life while sparking lively discussions about urban space sharing."
      },
      opinionPrompt: {
        question: "Do you believe modern cities should reduce car space to prioritize cycling and pedestrians? What is your point of view?",
        context: "State your opinion in 2 to 3 sentences in French. Try using contrast words like 'cependant' (however) or 'à mon avis' (in my view).",
        starterPhrases: [
          "À mon avis, la transition vers les mobilités douces est... (In my opinion, the transition to active travel is...)",
          "Bien que certains automobilistes soient réticents, je pense que... (Although some drivers are reluctant, I think that...)",
          "D'un point de vue environnemental, il me semble évident que... (From an environmental standpoint, it seems clear that...)",
          "Il faut néanmoins veiller à ce que... (One must nevertheless ensure that...)"
        ]
      }
    },
    B2: {
      title: "Éditorial & Analyse : L'intelligence artificielle et l'héritage intellectuel français",
      subtitle: "Entre effervescence technologique et exigence critique, la France tente d'imprimer sa marque singulière.",
      sourceType: "Editorial & Analysis (Le Figaro Perspectives)",
      publicationDate: "Ideas & Society Section",
      author: "By Hélène de Montalembert, Essayist",
      level: "B2",
      frenchText: "Dans le concert international des révolutions algorithmiques, la France cultive une posture singulière faite d'audace entrepreneuriale et de circonspection cartésienne. D'un côté, le dynamisme des start-up hexagonales et l'excellence des centres de recherche témoignent d'une réelle volonté de souveraineté numérique. De l'autre, persiste une tradition critique profondément enracinée dans l'humanisme des Lumières, qui refuse de subordonner la liberté de l'esprit aux seuls impératifs mercantiles. Les détracteurs d'une régulation stricte arguent qu'un excès de prudence risquerait d'étouffer l'innovation dans l'œuf face aux géants américains et asiatiques. À l'inverse, les partisans d'un encadrement éthique vigoureux rappellent qu'aucun progrès technique ne saurait être émancipateur s'il bafoue le discernement critique et la créativité humaine. Ce dilemme n'est pas qu'économique ; il interroge notre conception même de la culture et de la transmission du savoir.",
      englishTranslation: "In the international chorus of algorithmic revolutions, France cultivates a singular posture made of entrepreneurial boldness and Cartesian circumspection. On the one hand, the vitality of French start-ups and the excellence of research centers reflect a genuine determination for digital sovereignty. On the other hand, there persists a critical tradition deeply rooted in Enlightenment humanism, refusing to subordinate freedom of thought solely to commercial imperatives. Critics of strict regulation argue that excessive caution risks nipping innovation in the bud when facing American and Asian giants. Conversely, proponents of vigorous ethical oversight argue that no technological progress can be liberating if it tramples critical discernment and human creativity. This dilemma is not merely economic; it questions our very conception of culture and the transmission of knowledge.",
      glossary: [
        { french: "circonspection", english: "wariness / prudent reserve", type: "feminine noun", contextSentence: "Une circonspection cartésienne face au changement." },
        { french: "étouffer dans l'œuf", english: "to nip in the bud", type: "idiom", contextSentence: "Risquer d'étouffer l'innovation dans l'œuf." },
        { french: "bafoue", english: "flouts / disregards / tramples", type: "verb", contextSentence: "S'il bafoue le discernement critique." },
        { french: "souveraineté numérique", english: "digital sovereignty", type: "noun phrase", contextSentence: "Une volonté affirmée de souveraineté numérique." },
        { french: "humanisme des Lumières", english: "Enlightenment humanism", type: "philosophical concept", contextSentence: "Enracinée dans l'humanisme des Lumières." }
      ],
      rightOrWrongQuestions: [
        {
          claim: "According to the author: France wholly rejects technological innovation out of sheer conservatism.",
          isRight: false,
          explanation: "False: The author emphasizes entrepreneurial boldness and the excellence of French research labs.",
          quote: "Le dynamisme des start-up hexagonales témoigne d'une réelle volonté de souveraineté numérique."
        },
        {
          claim: "According to the author: Opponents of strict regulation fear European companies will fall behind global rivals.",
          isRight: true,
          explanation: "True: They argue that excessive caution risks nipping European innovation in the bud.",
          quote: "Les détracteurs d'une régulation stricte arguent qu'un excès de prudence risquerait d'étouffer l'innovation."
        },
        {
          claim: "According to the author: The debate surrounding AI is exclusively a financial and balance-sheet concern.",
          isRight: false,
          explanation: "False: The author insists this dilemma questions our very conception of culture and learning.",
          quote: "Ce dilemme n'est pas qu'économique ; il interroge notre conception même de la culture."
        }
      ],
      comprehensionQuestions: [
        {
          question: "What dual posture characterizes the French approach according to the editorial?",
          options: ["Total denial and resignation", "Entrepreneurial boldness paired with Cartesian critical vigilance", "Blind imitation of foreign models", "Nostalgic isolationism"],
          correctIndex: 1,
          explanation: "The author describes a posture combining entrepreneurial boldness and Cartesian circumspection."
        },
        {
          question: "To which philosophical heritage does the author tie the demand for ethical oversight?",
          options: ["19th-century romanticism", "Enlightenment humanism (les Lumières)", "Industrial positivism", "Ancient stoicism"],
          correctIndex: 1,
          explanation: "The author refers to a critical tradition deeply rooted in Enlightenment humanism."
        },
        {
          question: "What condition is deemed essential for technical progress to be truly liberating?",
          options: ["It must safeguard critical discernment and human creativity", "It must maximize quarterly profits", "It must replace all human teachers", "It must ban printed books"],
          correctIndex: 0,
          explanation: "Progress is only liberating if it upholds critical discernment and human creativity."
        }
      ],
      summaryExercise: {
        prompt: "Which analysis most faithfully captures the essayist's thesis?",
        options: [
          { text: "France seeks a humanistic equilibrium between tech ambition and ethics, ensuring progress serves critical human discernment.", isBest: true, feedback: "Remarkable! This accurately captures the dialectical nuance of the essay." },
          { text: "Artificial intelligence has no future in Europe because regulations have already crushed it.", isBest: false, feedback: "Inaccurate: the author celebrates the dynamism of French startups and research." },
          { text: "Foreign tech giants have eliminated all resistance without any domestic debate.", isBest: false, feedback: "False: France is actively seeking its own distinct path and sovereignty." }
        ],
        sampleSummary: "Balancing innovation and humanism, France seeks to reconcile digital sovereignty with the protection of critical thought."
      },
      opinionPrompt: {
        question: "Does artificial intelligence represent an opportunity for human liberation or a threat to critical thinking? Take a stance.",
        context: "Draft a reasoned paragraph in French taking a clear position with supporting arguments.",
        starterPhrases: [
          "Il convient de distinguer d'une part..., et d'autre part... (It is worth distinguishing on one hand..., and on the other...)",
          "Loin de constituer une menace absolue, l'IA pourrait... (Far from constituting an absolute threat, AI could...)",
          "À mon sens, le véritable écueil réside dans... (In my view, the real pitfall lies in...)",
          "La pensée critique demeure irremplaçable parce que... (Critical thinking remains irreplaceable because...)"
        ]
      }
    }
  };

  const defaultFallback = levelFallbacks[level] || levelFallbacks.A1;

  try {
    const genreDescription = {
      newspaper: "an authentic French newspaper article (article de presse / dépêche d'actualité)",
      magazine: "a cultural magazine feature (chronique de magazine culturel / grand format de société)",
      editorial: "a thought-provoking journalistic editorial / opinion column (éditorial d'opinion et débat)",
      story: "an authentic literary narrative or personal story (récit ou nouvelle contemporaine)"
    }[sourceType] || "an authentic French magazine article";

    const prompt = `You are a distinguished French journalist and CEFR pedagogical expert.
Generate an engaging, culturally authentic French reading piece in the style of ${genreDescription} tailored specifically to CEFR level ${level}.

Target Topic / Interest: "${topic}"
Theme: "${theme}"
Target CEFR Level: "${level}"
Publication Format: "${sourceType}"

CEFR Level Specifications:
- If A1: Simple short sentences, present tense, high-frequency everyday vocabulary, clear cognates, approachable tone.
- If A2: Everyday and lifestyle French, passé composé and imparfait, basic relative clauses, friendly informative journalistic tone.
- If B1: Subjunctive and conditional uses, opinions, cause/consequence connectors (cependant, par conséquent, bien que), analytical French press style.
- If B2: Nuanced journalistic prose, formal discourse markers, rich vocabulary, debate and critical perspectives (Le Monde / Le Figaro style).

Required output content:
1. Title: Catchy French headline.
2. Subtitle: Journalistic subhead / chapeau in French (1-2 sentences).
3. SourceType: Realistic French media publication name (e.g., "Le Quotidien", "Revue Culture & Société", "L'Écho de Paris", etc.).
4. Author: Journalist byline with specialty.
5. FrenchText: 220-320 words of cohesive, immersive French text.
6. EnglishTranslation: Accurate side-by-side English translation.
7. Glossary: 4-6 key journalistic terms/idioms with French, English, grammatical type, and context sentence.
8. RightOrWrongQuestions: Exactly 3 statements testing who, what, or which claim is right or wrong, with:
   - claim: statement written in clear English stating what is claimed about the text (e.g. "According to the article: ...")
   - isRight: boolean (true if claim is true / accurate according to text, false if wrong)
   - explanation: clear explanation in English citing the passage
   - quote: direct short quote in French from the text
9. ComprehensionQuestions: Exactly 3 multiple-choice questions written in English testing reading comprehension, with 4 English options each, correctIndex (0-3), and clear English explanation.
10. SummaryExercise:
   - prompt: "Which statement best summarizes this article?"
   - options: 3 summary statements in English (exactly 1 with isBest: true and encouraging English feedback, 2 with isBest: false and pedagogical English feedback explaining why it's incomplete or misleading)
   - sampleSummary: a model 1-2 sentence French summary with English translation.
11. OpinionPrompt:
   - question: an engaging question in English asking for the reader's opinion or point of view on the topic
   - context: brief guidance in English on how to respond in French
   - starterPhrases: 4 helpful French sentence starters with English translations in parentheses (e.g., "À mon avis... (In my opinion...)", "Je pense que... (I think that...)")

IMPORTANT: Keep all comprehension questions, statements/claims, answer options, summary options, explanations, and prompts in ENGLISH so the student understands exactly what is being asked of them.

Format strictly as JSON with this exact structure:
{
  "title": "Titre en français",
  "subtitle": "Chapeau journalistique...",
  "sourceType": "Nom du média et format",
  "publicationDate": "Date ou édition",
  "author": "Par Prénom Nom, fonction",
  "level": "${level}",
  "frenchText": "Texte complet en français...",
  "englishTranslation": "Full English translation...",
  "glossary": [
    { "french": "mot", "english": "meaning", "type": "noun/verb/adj", "contextSentence": "Exemple..." }
  ],
  "rightOrWrongQuestions": [
    { "claim": "Statement in English...", "isRight": true, "explanation": "Explanation in English...", "quote": "Citation en français..." }
  ],
  "comprehensionQuestions": [
    { "question": "Question in English?", "options": ["Option A", "Option B", "Option C", "Option D"], "correctIndex": 0, "explanation": "Explanation in English..." }
  ],
  "summaryExercise": {
    "prompt": "Which statement best summarizes this article?",
    "options": [
      { "text": "Summary option in English...", "isBest": true, "feedback": "Feedback in English..." }
    ],
    "sampleSummary": "Model summary..."
  },
  "opinionPrompt": {
    "question": "Question in English asking for opinion...",
    "context": "Guidance in English...",
    "starterPhrases": ["À mon avis... (In my opinion...)", "Je pense que... (I think that...)"]
  }
}`;

    const result = await generateAiJson(prompt, defaultFallback, {
      task: 'generate-story',
      temperature: 0.6,
      preferOpenRouter: true,
      openRouterTimeoutMs: 25000,
      maxTokens: 3500,
    });

    // Ensure all critical fields exist
    const finalData = {
      ...defaultFallback,
      ...result,
      level,
      rightOrWrongQuestions: Array.isArray(result?.rightOrWrongQuestions) && result.rightOrWrongQuestions.length > 0
        ? result.rightOrWrongQuestions
        : defaultFallback.rightOrWrongQuestions,
      comprehensionQuestions: Array.isArray(result?.comprehensionQuestions) && result.comprehensionQuestions.length > 0
        ? result.comprehensionQuestions
        : defaultFallback.comprehensionQuestions,
      summaryExercise: result?.summaryExercise || defaultFallback.summaryExercise,
      opinionPrompt: result?.opinionPrompt || defaultFallback.opinionPrompt,
    };

    res.json(finalData);
  } catch (error) {
    console.error('Error in /api/ai/generate-story:', error);
    res.json(defaultFallback);
  }
});

// AI Evaluation of User Opinion / Point of View on Reading Passages
app.post('/api/ai/evaluate-reading-opinion', async (req, res) => {
  const {
    userOpinion = '',
    articleTitle = '',
    level = 'A2',
    promptQuestion = '',
  } = req.body;

  const defaultEvaluation = {
    score: 85,
    cefrAssessment: `Bonne expression pour le niveau ${level}`,
    feedbackFr: "Bravo pour votre contribution ! Votre point de vue est bien exprimé et pertinent par rapport au sujet de l'article.",
    feedbackEn: "Well done! Your perspective is clearly articulated and relevant to the article's theme.",
    grammarTips: [
      "Veillez à bien accorder les adjectifs avec les noms qu'ils qualifient.",
      "L'emploi de connecteurs logiques enrichit la fluidité de votre pensée."
    ],
    suggestedNativeVersion: userOpinion ? `« ${userOpinion.trim()} » est compréhensible et naturel.` : "Exprimez-vous librement en français !",
    encouragement: "Continuez à partager votre opinion en français, c'est le meilleur moyen de progresser !",
    xpBonus: 25,
  };

  if (!userOpinion || userOpinion.trim().length < 5) {
    return res.json({
      score: 50,
      cefrAssessment: "Réponse trop courte",
      feedbackFr: "N'hésitez pas à écrire une phrase complète pour développer votre point de vue.",
      feedbackEn: "Try writing at least one full sentence to express your perspective.",
      grammarTips: ["Utilisez les amorces suggérées comme « À mon avis... » pour démarrer."],
      suggestedNativeVersion: "À mon avis, c'est un sujet très intéressant.",
      encouragement: "Essayez à nouveau avec une ou deux phrases !",
      xpBonus: 10,
    });
  }

  try {
    const prompt = `You are a French professor evaluating a student's opinion / point of view written in response to a French article.
Article Title: "${articleTitle}"
Question asked: "${promptQuestion}"
Target CEFR Level: "${level}"
Student's response in French:
"""
${userOpinion}
"""

Evaluate the student's response kindly, constructively, and pedagogically according to CEFR level ${level}.
Provide:
1. score: integer between 60 and 100 based on effort, clarity, vocabulary, and grammar relative to CEFR ${level}.
2. cefrAssessment: short assessment title (e.g., "Niveau A2 validé avec brio" or "Bonne tentative, vocabulaire encourageant").
3. feedbackFr: 2-3 sentences in French praising what they did well and explaining how to improve.
4. feedbackEn: 1-2 sentence English summary of feedback.
5. grammarTips: array of 1-3 specific grammar or vocabulary improvements or observations.
6. suggestedNativeVersion: how a native French speaker would write this exact thought cleanly and naturally.
7. encouragement: brief warm encouraging closing message in French.
8. xpBonus: integer 20-30.

Format strictly as JSON:
{
  "score": 90,
  "cefrAssessment": "Niveau A2 bien maîtrisé",
  "feedbackFr": "Votre phrase est claire...",
  "feedbackEn": "Your thought is well expressed...",
  "grammarTips": ["Pensez à...", "Attention à..."],
  "suggestedNativeVersion": "Version naturelle...",
  "encouragement": "Bravo !",
  "xpBonus": 25
}`;

    const result = await generateAiJson(prompt, defaultEvaluation, {
      task: 'evaluate-opinion',
      temperature: 0.4,
      preferOpenRouter: true,
      openRouterTimeoutMs: 15000,
      maxTokens: 1500,
    });

    res.json({ ...defaultEvaluation, ...result });
  } catch (error) {
    console.error('Error in /api/ai/evaluate-reading-opinion:', error);
    res.json(defaultEvaluation);
  }
});

// Daily AI Vocabulary Generator from Different Areas
app.post('/api/ai/generate-daily-vocabulary', async (req, res) => {
  const {
    area = 'Gastronomy & Culinary Arts',
    level = 'A1',
    date = new Date().toISOString().split('T')[0],
    count = 6,
  } = req.body;

  const areaFallbacks = {
    'Gastronomy & Culinary Arts': {
      area: 'Gastronomy & Culinary Arts',
      areaTitle: 'La Gastronomie & Les Arts Culinaires',
      level,
      date,
      dailyQuote: {
        french: "La gastronomie est l'art d'utiliser la nourriture pour créer le bonheur.",
        english: "Gastronomy is the art of using food to create happiness.",
        author: "Théodore Zeldin"
      },
      areaOverview: "French cuisine is designated by UNESCO as intangible cultural heritage. Mastering culinary terms connects you directly with the French art de vivre.",
      vocabulary: [
        {
          id: `daily-gastronomy-1-${date}`,
          french: "le terroir",
          english: "local soil / regional culinary heritage",
          category: "Gastronomy & Culinary Arts",
          level,
          gender: "m",
          partOfSpeech: "noun",
          ipa: "/tɛʁ.waʁ/",
          exampleFrench: "Ce fromage tire toute sa saveur du terroir normand.",
          exampleEnglish: "This cheese draws all its flavor from the Normandy terroir.",
          usageNote: "Essential French concept describing how soil, climate, and local artisan tradition shape food or wine flavor."
        },
        {
          id: `daily-gastronomy-2-${date}`,
          french: "déguster",
          english: "to savor / to taste mindfully",
          category: "Gastronomy & Culinary Arts",
          level,
          gender: null,
          partOfSpeech: "verb",
          ipa: "/de.ɡys.te/",
          exampleFrench: "Nous dégustons une tarte aux pommes faite maison.",
          exampleEnglish: "We are savoring a homemade apple tart.",
          usageNote: "Goes beyond simply 'manger' (to eat); implies taking your time to appreciate culinary subtleties."
        },
        {
          id: `daily-gastronomy-3-${date}`,
          french: "le croustillant",
          english: "crispiness / crunchiness",
          category: "Gastronomy & Culinary Arts",
          level,
          gender: "m",
          partOfSpeech: "noun",
          ipa: "/kʁus.ti.jɑ̃/",
          exampleFrench: "Cette baguette dorée a un croustillant parfait.",
          exampleEnglish: "This golden baguette has a perfect crunchiness.",
          usageNote: "Frequently praised by French bakers and food critics to describe bread crust or pastry flakiness."
        },
        {
          id: `daily-gastronomy-4-${date}`,
          french: "mijoter",
          english: "to simmer gently / to slow-cook",
          category: "Gastronomy & Culinary Arts",
          level,
          gender: null,
          partOfSpeech: "verb",
          ipa: "/mi.ʒɔ.te/",
          exampleFrench: "Le bœuf bourguignon doit mijoter pendant trois heures.",
          exampleEnglish: "The beef bourguignon needs to simmer for three hours.",
          usageNote: "Also used figuratively in French: 'Qu'est-ce que tu mijotes ?' means 'What are you cooking up / plotting?'."
        },
        {
          id: `daily-gastronomy-5-${date}`,
          french: "l'amuse-bouche",
          english: "appetizer / palate pleaser",
          category: "Gastronomy & Culinary Arts",
          level,
          gender: "m",
          partOfSpeech: "noun",
          ipa: "/a.myz.buʃ/",
          exampleFrench: "Le chef nous offre un délicieux amuse-bouche à la truffe.",
          exampleEnglish: "The chef offers us a delicious truffle appetizer.",
          usageNote: "A complimentary bite-sized savory treat served before the appetizer in French bistros and restaurants."
        },
        {
          id: `daily-gastronomy-6-${date}`,
          french: "savoureux / savoureuse",
          english: "flavorful / tasty / delectable",
          category: "Gastronomy & Culinary Arts",
          level,
          gender: null,
          partOfSpeech: "adjective",
          ipa: "/sa.vu.ʁø/",
          exampleFrench: "Cette sauce aux morilles est particulièrement savoureuse.",
          exampleEnglish: "This morel mushroom sauce is particularly flavorful.",
          usageNote: "An elegant alternative to everyday 'bon' (good) when reviewing a meal."
        }
      ]
    },
    'Art & Architecture': {
      area: 'Art & Architecture',
      areaTitle: "L'Art, le Patrimoine & l'Architecture",
      level,
      date,
      dailyQuote: {
        french: "L'art lave notre âme de la poussière du quotidien.",
        english: "Art washes away from the soul the dust of everyday life.",
        author: "Pablo Picasso"
      },
      areaOverview: "From Gothic cathedrals and Haussmannian boulevards to avant-garde galleries, artistic vocabulary is woven into the fabric of French society.",
      vocabulary: [
        {
          id: `daily-art-1-${date}`,
          french: "le chef-d'œuvre",
          english: "masterpiece",
          category: "Art & Architecture",
          level,
          gender: "m",
          partOfSpeech: "noun",
          ipa: "/ʃɛf.d‿œvʁ/",
          exampleFrench: "La Joconde est le chef-d'œuvre le plus célèbre du musée du Louvre.",
          exampleEnglish: "The Mona Lisa is the most famous masterpiece of the Louvre museum.",
          usageNote: "Plural form is 'des chefs-d'œuvre'. Refers to an artist's crowning achievement."
        },
        {
          id: `daily-art-2-${date}`,
          french: "l'édifice",
          english: "historic building / edifice / monument",
          category: "Art & Architecture",
          level,
          gender: "m",
          partOfSpeech: "noun",
          ipa: "/e.di.fis/",
          exampleFrench: "Cet édifice médiéval a été restauré avec soin.",
          exampleEnglish: "This medieval building was restored with care.",
          usageNote: "More noble and monumental than the standard word 'bâtiment' (building)."
        },
        {
          id: `daily-art-3-${date}`,
          french: "la fresque",
          english: "fresco / large mural painting",
          category: "Art & Architecture",
          level,
          gender: "f",
          partOfSpeech: "noun",
          ipa: "/fʁɛsk/",
          exampleFrench: "L'artiste a peint une fresque monumentale sur la façade.",
          exampleEnglish: "The artist painted a monumental fresco on the facade.",
          usageNote: "Can also describe a grand historical novel or narrative (une fresque historique)."
        },
        {
          id: `daily-art-4-${date}`,
          french: "la verrière",
          english: "glass roof / skylight / glass canopy",
          category: "Art & Architecture",
          level,
          gender: "f",
          partOfSpeech: "noun",
          ipa: "/vɛ.ʁjɛʁ/",
          exampleFrench: "La lumière pénètre à travers la grande verrière de l'atelier.",
          exampleEnglish: "Light enters through the large glass canopy of the atelier.",
          usageNote: "Iconic architectural feature of classic Parisian artist studios and 19th-century railway stations."
        },
        {
          id: `daily-art-5-${date}`,
          french: "harmonieux / harmonieuse",
          english: "harmonious / well-balanced",
          category: "Art & Architecture",
          level,
          gender: null,
          partOfSpeech: "adjective",
          ipa: "/aʁ.mɔ.njø/",
          exampleFrench: "Les proportions de cette place royale sont très harmonieuses.",
          exampleEnglish: "The proportions of this royal square are very harmonious.",
          usageNote: "Standard praise used in French architectural critique when balance and symmetry align."
        },
        {
          id: `daily-art-6-${date}`,
          french: "le vernissage",
          english: "exhibition opening reception",
          category: "Art & Architecture",
          level,
          gender: "m",
          partOfSpeech: "noun",
          ipa: "/vɛʁ.ni.saʒ/",
          exampleFrench: "Nous sommes invités au vernissage de la nouvelle galerie ce soir.",
          exampleEnglish: "We are invited to the exhibition opening reception of the new gallery tonight.",
          usageNote: "Originally the day artists applied varnish to dry oil paintings before public unveiling; now means the opening cocktail party."
        }
      ]
    },
    'Technology & Innovation': {
      area: 'Technology & Innovation',
      areaTitle: 'La Technologie & Les Innovations Numériques',
      level,
      date,
      dailyQuote: {
        french: "Le progrès ne vaut que s'il est partagé par tous.",
        english: "Progress is only worthy if it is shared by all.",
        author: "Aristote (devise technologique)"
      },
      areaOverview: "The Francophone tech ecosystem (la French Tech) combines engineering precision with philosophical questions about digital ethics.",
      vocabulary: [
        {
          id: `daily-tech-1-${date}`,
          french: "l'algorithme",
          english: "algorithm",
          category: "Technology & Innovation",
          level,
          gender: "m",
          partOfSpeech: "noun",
          ipa: "/al.ɡɔ.ʁitm/",
          exampleFrench: "Cet algorithme d'apprentissage optimise le traitement des données.",
          exampleEnglish: "This machine learning algorithm optimizes data processing.",
          usageNote: "Masculine noun, often paired with 'de recommandation' (recommendation algorithm)."
        },
        {
          id: `daily-tech-2-${date}`,
          french: "le logiciel",
          english: "software program",
          category: "Technology & Innovation",
          level,
          gender: "m",
          partOfSpeech: "noun",
          ipa: "/lɔ.ʒi.sjɛl/",
          exampleFrench: "L'équipe développe un logiciel libre et sécurisé.",
          exampleEnglish: "The team is developing free open-source and secure software.",
          usageNote: "Coined by French linguists to avoid English loanwords; ubiquitous across French tech."
        },
        {
          id: `daily-tech-3-${date}`,
          french: "télécharger",
          english: "to download / to upload",
          category: "Technology & Innovation",
          level,
          gender: null,
          partOfSpeech: "verb",
          ipa: "/te.le.ʃaʁ.ʒe/",
          exampleFrench: "Vous pouvez télécharger la mise à jour dès maintenant.",
          exampleEnglish: "You can download the update right now.",
          usageNote: "Used for both downloading and uploading; 'téléverser' specifically denotes uploading."
        },
        {
          id: `daily-tech-4-${date}`,
          french: "l'infonuagique",
          english: "cloud computing",
          category: "Technology & Innovation",
          level,
          gender: "f",
          partOfSpeech: "noun",
          ipa: "/ɛ̃.fɔ.nɥa.ʒik/",
          exampleFrench: "Nos serveurs sont hébergés dans l'infonuagique.",
          exampleEnglish: "Our servers are hosted in cloud computing.",
          usageNote: "Official French term ('le cloud' is also commonly heard in colloquial European French)."
        },
        {
          id: `daily-tech-5-${date}`,
          french: "sécurisé / sécurisée",
          english: "secure / encrypted / protected",
          category: "Technology & Innovation",
          level,
          gender: null,
          partOfSpeech: "adjective",
          ipa: "/se.ky.ʁi.ze/",
          exampleFrench: "Toutes les transactions bancaires se font sur un réseau sécurisé.",
          exampleEnglish: "All banking transactions take place on a secure network.",
          usageNote: "High-frequency term seen on every French checkout and login screen."
        },
        {
          id: `daily-tech-6-${date}`,
          french: "l'intelligence artificielle",
          english: "artificial intelligence (AI)",
          category: "Technology & Innovation",
          level,
          gender: "f",
          partOfSpeech: "noun",
          ipa: "/ɛ̃.tɛ.li.ʒɑ̃s aʁ.ti.fi.sjɛl/",
          exampleFrench: "L'intelligence artificielle transforme l'apprentissage des langues.",
          exampleEnglish: "Artificial intelligence transforms language learning.",
          usageNote: "Abbreviated as 'l'IA' (pronounced 'ee-ah') in French media and discourse."
        }
      ]
    }
  };

  const selectedFallback = areaFallbacks[area] || areaFallbacks['Gastronomy & Culinary Arts'];

  try {
    const prompt = `You are a distinguished French lexicographer and CEFR pedagogical expert at the Académie de Français.
Generate a rich, authentic Daily French Vocabulary collection from the specific thematic area: "${area}".
Target CEFR Level: "${level}"
Today's Date: "${date}"
Number of words: exactly ${count}

Specifications:
- Target Area / Domain: "${area}"
- Level ${level} adjustments:
  - If A1: Everyday accessible terms from this field, clear cognates, present tense examples, simple sentence syntax.
  - If A2: Practical, conversational vocabulary from this domain with useful verb collocations and descriptive adjectives.
  - If B1: Nuanced professional and cultural terminology with expressive examples using conjunctions and past tenses.
  - If B2: Specialized, sophisticated lexical items, idioms, and stylistic nuances typical of French broadsheets and debates.
- Ensure words are strictly relevant to the chosen field "${area}".
- Provide authentic IPA phonetic transcription for each word.
- For each noun, explicitly specify gender ("m" or "f"). For verbs, adjectives, expressions, set gender to null.
- For each word, provide:
  1. french: exact French term (with accurate accents: é, è, ê, ç, à, etc.)
  2. english: precise English translation and nuance
  3. category: "${area}"
  4. level: "${level}"
  5. gender: "m" | "f" | null
  6. partOfSpeech: "noun" | "verb" | "adjective" | "expression" | "adverb"
  7. ipa: phonetic transcription enclosed in slashes e.g. "/tɛʁ.waʁ/"
  8. exampleFrench: a natural, authentic sentence in French contextualizing this word in this field
  9. exampleEnglish: accurate English translation of the example sentence
  10. usageNote: practical cultural or grammatical insight in English (1 sentence) explaining how native French speakers employ this term in this domain.
- Also include:
  - areaTitle: poetic or formal French title for this domain
  - dailyQuote: an authentic French proverb or quote from a notable thinker/figure regarding this domain, with french, english, and author.
  - areaOverview: 1-2 sentence English introduction on why this vocabulary domain matters in French culture.

Format STRICTLY as valid JSON matching this schema:
{
  "area": "${area}",
  "areaTitle": "Titre en français de ce domaine",
  "level": "${level}",
  "date": "${date}",
  "areaOverview": "Overview in English...",
  "dailyQuote": {
    "french": "Citation en français...",
    "english": "English translation...",
    "author": "Nom de l'auteur"
  },
  "vocabulary": [
    {
      "id": "daily-${area.toLowerCase().replace(/[^a-z0-9]/g, '-')}-1-${date}",
      "french": "mot en français",
      "english": "English translation",
      "category": "${area}",
      "level": "${level}",
      "gender": "m",
      "partOfSpeech": "noun",
      "ipa": "/.../",
      "exampleFrench": "Phrase d'exemple...",
      "exampleEnglish": "Example sentence translation...",
      "usageNote": "Usage tip in English..."
    }
  ]
}`;

    const result = await generateAiJson(prompt, selectedFallback, {
      task: 'generate-daily-vocabulary',
      temperature: 0.7,
      preferOpenRouter: true,
      openRouterTimeoutMs: 16000,
      maxTokens: 2500,
    });

    const finalVocab = Array.isArray(result?.vocabulary) && result.vocabulary.length > 0
      ? result.vocabulary.map((item, idx) => ({
          ...item,
          id: item.id || `daily-${idx + 1}-${date}-${Date.now()}`,
          category: area,
          level: level,
        }))
      : selectedFallback.vocabulary;

    res.json({
      area,
      areaTitle: result?.areaTitle || selectedFallback.areaTitle,
      level,
      date,
      areaOverview: result?.areaOverview || selectedFallback.areaOverview,
      dailyQuote: result?.dailyQuote || selectedFallback.dailyQuote,
      vocabulary: finalVocab,
    });
  } catch (error) {
    console.error('Error in /api/ai/generate-daily-vocabulary:', error);
    res.json(selectedFallback);
  }
});

// Dynamic AI Practice Quiz Generator
app.post('/api/ai/generate-quiz', async (req, res) => {
  const {
    topic = 'Passé Composé vs Imparfait',
    level = 'B1',
    questionCount = 4,
    unitContext = {},
  } = req.body;

  const genericFallback = {
    title: `Quiz de Révision: ${topic}`,
    level,
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        prompt: "Hier soir, nous ___ (manger) dans un formidable restaurant parisien.",
        promptEnglish: "Last night, we ___ (ate) at a wonderful Parisian restaurant.",
        options: ["avons mangé", "mangions", "mangeons", "avions mangé"],
        correctAnswer: "avons mangé",
        explanation: "Passé Composé is used for a completed punctual action in the past with a specific time indicator ('Hier soir')."
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        prompt: "Quand j'étais enfant, je ___ (jouer) toujours dans le jardin l'été.",
        promptEnglish: "When I was a child, I always ___ (played) in the garden in the summer.",
        options: ["jouais", "ai joué", "joue", "jouerai"],
        correctAnswer: "jouais",
        explanation: "Imparfait expresses habitual past actions or repeated descriptions ('Quand j'étais enfant, toujours')."
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        prompt: "Il faut absolument que vous ___ (venir) à l'heure.",
        promptEnglish: "It is absolutely necessary that you ___ (come) on time.",
        options: ["veniez", "venez", "viendrez", "êtes venus"],
        correctAnswer: "veniez",
        explanation: "'Il faut que' demands the subjunctive mood (vous + venir -> veniez)."
      },
      {
        id: 'q4',
        type: 'multiple-choice',
        prompt: "Les fleurs que Marie a ___ (acheter) sont magnifiques.",
        promptEnglish: "The flowers that Marie ___ (bought) are magnificent.",
        options: ["achetées", "acheté", "achetés", "achete"],
        correctAnswer: "achetées",
        explanation: "Agreement with preceding direct object (COD) 'les fleurs' (feminine plural) placed before auxiliary avoir."
      }
    ]
  };

  const unitFallbackQuestions = Array.isArray(unitContext.practiceExercises) && unitContext.practiceExercises.length
    ? unitContext.practiceExercises
        .filter((exercise) =>
          typeof exercise?.prompt === 'string' &&
          Array.isArray(exercise.options) &&
          exercise.options.length >= 2 &&
          typeof exercise.correctAnswer === 'string'
        )
        .slice(0, questionCount)
        .map((exercise, index) => ({
          id: exercise.id || `q${index + 1}`,
          type: exercise.type || 'multiple-choice',
          prompt: exercise.prompt,
          promptEnglish: exercise.promptEnglish || exercise.english || exercise.translation || `In the context of ${topic}, choose the correct form.`,
          options: exercise.options,
          correctAnswer: exercise.correctAnswer,
          explanation: exercise.explanation || exercise.hint || `Apply the grammatical rule for ${topic}.`,
        }))
    : [
        {
          id: 'q1',
          type: 'multiple-choice',
          prompt: `Dans le contexte de « ${unitContext.frenchTitle || topic} », quelle proposition est grammaticalement correcte ?`,
          promptEnglish: `In the context of "${unitContext.frenchTitle || topic}", which statement is grammatically correct?`,
          options: [
            unitContext.goldenRule ? unitContext.goldenRule.slice(0, 60) + '...' : `Application exacte de la règle de ${topic}`,
            `Forme incorrecte avec accord erroné`,
            `Structure syntaxique inadaptée`,
            `Emploi d'un temps ou mode inapproprié`
          ],
          correctAnswer: unitContext.goldenRule ? unitContext.goldenRule.slice(0, 60) + '...' : `Application exacte de la règle de ${topic}`,
          explanation: `According to the unit rule: ${unitContext.goldenRule || 'Review the core formula and apply agreement constraints accurately.'}`
        },
        ...genericFallback.questions.slice(1, questionCount)
      ];

  const defaultFallback = {
    title: `Quiz IA : ${unitContext.frenchTitle || topic}`,
    level,
    questions: unitFallbackQuestions.length ? unitFallbackQuestions : genericFallback.questions,
  };

  try {
    const variationCues = [
      'a train journey with a missed connection',
      'a market visit to buy ingredients for dinner',
      'a weekend trip with an unexpected change of plans',
      'a conversation between colleagues preparing an event',
      'a museum visit with a surprising discovery',
      'a family gathering where people share memories',
      'a neighborhood problem that needs to be solved',
      "a traveler's conversation at a small hotel",
    ];
    const variationCue = variationCues[Math.floor(Math.random() * variationCues.length)];
    const variationToken = Math.random().toString(36).slice(2, 10);
    const prompt = `Generate a fresh ${questionCount}-question French interactive grammar quiz strictly focused on grammatical aspects for topic: "${topic}" and level ${level}.

  Use this unit-specific curriculum context as the source of truth. Test its rules and terminology, not a generic grammar topic:
  ${JSON.stringify(unitContext)}

  Make this quiz substantially different from a standard or previously generated quiz. Use the scenario cue "${variationCue}" as inspiration, vary names, verbs, sentence structures, and contexts, and avoid stock examples. Use existing drills only to understand the unit content; do not copy their questions or answers verbatim. Give every question in this quiz a distinct sentence and test case. Variation token: ${variationToken}.

Important: every explanation must be written in English, even though the question text is in French. Keep the explanation clear, concise, and focused on the grammar rule being tested.

Use multiple-choice questions only, with exactly 4 string options per question. Every correctAnswer must exactly match one of its options.

Format as JSON:
{
  "title": "Grammar Quiz Title",
  "level": "${level}",
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "prompt": "The question prompt in French with blank or verb to conjugate",
      "promptEnglish": "Accurate, fluent English translation of the prompt so the user can toggle between French and English",
      "options": ["option 1", "option 2", "option 3", "option 4"],
      "correctAnswer": "The exact correct string",
      "explanation": "Clear grammatical explanation in English of why this is correct"
    }
  ]
}`;

    const result = await generateAiJson(prompt, defaultFallback, { task: 'generate-quiz', temperature: 0.9 });
    res.json(result);
  } catch (error) {
    console.error('Error in /api/ai/generate-quiz:', error);
    res.json(defaultFallback);
  }
});

// Quick AI Question Prompt Translation Endpoint
app.post('/api/ai/translate', async (req, res) => {
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

// AI Grammatical Aspect Sentence Transformer (Workbench)
app.post('/api/ai/grammar-transform', async (req, res) => {
  const { sentence = '', targetAspect = 'tense', targetValue = 'Passé Composé' } = req.body;
  
  const defaultFallback = {
    transformedSentence: sentence.toLowerCase().includes('julien mange') && targetValue.includes('Passé Composé')
      ? 'Julien a mangé une pomme rouge dans la cuisine.'
      : (sentence.toLowerCase().includes('julien mange') && targetValue.includes('Passive')
      ? 'Une pomme rouge est mangée par Julien dans la cuisine.'
      : `[Transformation] : ${sentence}`),
    englishTranslation: "Transformed French sentence with adapted grammatical aspect.",
    rulesApplied: [
      `1. Identified primary verb and auxiliary constraints for ${targetValue}.`,
      "2. Adjusted inflection, subject-verb concord, and clitic pronoun ordering.",
      "3. Verified past participle agreement and gender/number inflections."
    ],
    explanation: `In French, transforming the grammatical aspect to "${targetValue}" alters morphology, word order, and auxiliary selection.`,
    aspectComparison: {
      originalAspect: "Base syntactic structure",
      targetAspect: targetValue || targetAspect,
      syntacticNotes: "Pay attention to auxiliary choice (avoir vs être) and vowel elision (je -> j')."
    }
  };

  try {
    const prompt = `You are a French Syntactician and Grammar Specialist.
Transform the following French sentence:
Original Sentence: "${sentence}"
Target Grammatical Aspect: "${targetAspect}" (e.g. tense, voice, negation, pronoun_replacement, mood)
Target Value: "${targetValue}" (e.g. "Passé Composé", "Subjonctif Présent", "Passive Voice", "Ne... jamais", "Replace direct object with COD/COI pronoun", "Conditionnel Passé")

Requirements:
1. Transform the sentence accurately adhering to strict French grammar rules (agreement, elision, pronoun order, auxiliary selection).
2. Provide the natural English translation of the transformed sentence.
3. List the exact grammatical rules applied step-by-step.
4. Highlight any tricky aspect (e.g., past participle agreement, 'y'/'en' placement, subjunctive triggers).

Format as strict JSON:
{
  "transformedSentence": "Flawlessly transformed French sentence",
  "englishTranslation": "Accurate English translation",
  "rulesApplied": [
    "Rule 1 with specific explanation",
    "Rule 2 with specific explanation"
  ],
  "explanation": "Clear, elegant grammatical breakdown of how and why the sentence changes",
  "aspectComparison": {
    "originalAspect": "Description of the original sentence's grammatical structure",
    "targetAspect": "${targetValue || targetAspect}",
    "syntacticNotes": "Key grammatical nuance to remember for this transformation"
  }
}`;

    const result = await generateAiJson(prompt, defaultFallback, { task: 'grammar-transform', temperature: 0.2 });
    res.json(result);
  } catch (error) {
    console.error('Error in /api/ai/grammar-transform:', error);
    res.json(defaultFallback);
  }
});

// AI Linguistic Sentence Dissector (Grammar Autopsy)
app.post('/api/ai/dissect-sentence', async (req, res) => {
  const { sentence = '' } = req.body;
  const isJulien = sentence.toLowerCase().includes('julien mange');

  const defaultFallback = {
    sentence,
    aspects: {
      tense: isJulien ? "Présent de l'indicatif" : "Présent",
      mood: "Indicatif",
      voice: "Active",
      polarity: sentence.includes('ne ') || sentence.includes("n'") ? "Negative" : "Affirmative",
      clauseType: "Proposition indépendante"
    },
    syntacticTokens: isJulien ? [
      { token: "Julien", role: "Sujet (Subject)", type: "Nom propre", details: "Masculin singulier, 3e personne" },
      { token: "mange", role: "Verbe conjugué (Main Verb)", type: "Verbe du 1er groupe", details: "Présent de l'indicatif, 3e pers. singulier" },
      { token: "une", role: "Déterminant (Article indéfini)", type: "Article", details: "Féminin singulier" },
      { token: "pomme", role: "Noyau du COD (Direct Object)", type: "Nom commun", details: "Féminin singulier" },
      { token: "rouge", role: "Adjectif épithète", type: "Adjectif", details: "Accorde avec 'pomme' (fém. sing.)" },
      { token: "dans la cuisine", role: "Complément de Lieu (CCL)", type: "Groupe Prépositionnel", details: "Préposition + GN" }
    ] : [
      { token: sentence.split(' ')[0] || 'Je', role: 'Sujet (Subject)', type: 'Pronom / Nom', details: 'Sujet grammatical' },
      { token: sentence.split(' ')[1] || 'mange', role: 'Verbe (Verb)', type: 'Verbe conjugué', details: 'Verbe principal' },
    ],
    agreementChecks: [
      {
        element: "Sujet-Verbe",
        agreesWith: "Sujet de la phrase",
        rule: "Le verbe s'accorde en nombre et en personne avec son sujet.",
        status: "Correct"
      }
    ],
    commonPitfalls: [
      "Toujours vérifier si le verbe prend l'auxiliaire avoir ou être au passé composé."
    ],
    grammaticalSummary: "Sentence parsed and analyzed linguistically."
  };

  try {
    const prompt = `You are a French Computational Linguist and Grammar Professor.
Conduct a deep grammatical aspect dissection of the French sentence: "${sentence}".

Analyze:
1. Overall Grammatical Aspects: Main Tense, Mood, Voice (Active/Passive), Polarity (Affirmative/Negative), Register.
2. Syntactic Tokens / Parse Tree breakdown: Break every word or meaningful phrase into its exact grammatical role (Subject, Auxiliary, Main Verb, COD Direct Object, COI Indirect Object, Adverbial Complement, Relative Pronoun, Preposition, Determiner, Adjective).
3. Agreement Rules in play: Check subject-verb agreement, past participle agreement (accord du participe passé avec être/avoir/COD), adjective agreement (masc/fem/sing/plur).
4. Pronoun and Particle Analysis: Explain any pronouns (COD, COI, y, en, réfléchis) and their positions relative to verbs and imperatives.

Format as JSON:
{
  "sentence": "${sentence}",
  "aspects": {
    "tense": "e.g. Passé Composé / Imparfait / Subjonctif Présent",
    "mood": "e.g. Indicatif / Subjonctif / Conditionnel / Impératif",
    "voice": "Active / Passive / Pronominale",
    "polarity": "Affirmative / Negative",
    "clauseType": "Independent / Subordinate / Relative / Conditional"
  },
  "syntacticTokens": [
    {
      "token": "word or phrase",
      "role": "e.g. Subject / COD / Auxiliary / Main Verb / Prepositional Object",
      "type": "e.g. Noun / Verb / Personal Pronoun / Definite Article",
      "details": "Linguistic notes e.g., 3rd person singular, feminine plural, past participle agreement"
    }
  ],
  "agreementChecks": [
    {
      "element": "e.g. Participe passé 'mangées'",
      "agreesWith": "COD 'les pommes' placé avant l'auxiliaire avoir",
      "rule": "Exact French grammar rule text and justification",
      "status": "Correct"
    }
  ],
  "commonPitfalls": [
    "Common mistake learners make with this grammatical pattern and how to avoid it"
  ],
  "grammaticalSummary": "A concise, pedagogical linguistic overview of the sentence."
}`;

    const result = await generateAiJson(prompt, defaultFallback, { task: 'dissect-sentence', temperature: 0.2 });
    res.json(result);
  } catch (error) {
    console.error('Error in /api/ai/dissect-sentence:', error);
    res.json(defaultFallback);
  }
});

// Dynamic AI Custom Grammar Lesson Generator
app.post('/api/ai/generate-grammar-lesson', async (req, res) => {
  const { aspectTitle = "Le Subjonctif Présent", level = 'B1', focusRule } = req.body;

  const defaultFallback = {
    title: aspectTitle || "Le Subjonctif Présent",
    aspectCategory: "Subjunctive & Non-Finite Moods",
    level,
    description: "Comprehensive lesson on using the subjunctive mood in French with trigger verbs and expressions.",
    formula: "[Sujet] + [Verbe déclencheur] + QUE + [Sujet 2] + [Verbe au subjonctif]",
    goldenRule: "The subjunctive expresses subjectivity, uncertainty, will, emotion, or necessity, triggered after 'que'.",
    rules: [
      "Regular verb endings: -e, -es, -e, -ions, -iez, -ent based on 'ils' present tense stem.",
      "Verbs of certainty (penser, croire, être sûr) take the indicative in affirmative statements, but subjunctive in negative/question forms.",
      "Always check if both clauses share the same subject; if so, use the infinitive with 'de' instead of 'que + subjonctif'."
    ],
    contrastExamples: [
      { french: "Je veux que tu viennes.", english: "I want you to come.", aspectNote: "Subjunctive of will/obligation (venir -> viennes)" },
      { french: "Je sais qu'il vient.", english: "I know he is coming.", aspectNote: "Indicative of certainty (savoir + indicatif)" },
      { french: "Je doute qu'il soit prêt.", english: "I doubt he is ready.", aspectNote: "Subjunctive of doubt (douter + soit)" }
    ],
    commonTraps: [
      "Forgetting irregular stems: être (sois/soit), avoir (aie/ait), faire (fasse), pouvoir (puisse), aller (aille/aillons).",
      "Using subjunctive after 'espérer que' (espérer always takes the indicative/future, unlike vouloir)."
    ],
    practiceExercises: [
      {
        id: "ex1",
        type: "multiple-choice",
        prompt: "Il faut que nous ___ (partir) tout de suite.",
        options: ["partons", "partions", "partirions", "partirons"],
        correctAnswer: "partions",
        hint: "1st person plural subjunctive ending for regular verbs is -ions.",
        explanation: "'Il faut que' is an impersonal necessity trigger demanding the subjunctive. Nous + partir -> partions."
      },
      {
        id: "ex2",
        type: "fill-blank",
        prompt: "Bien que Marie ___ (être) fatiguée, elle continue de travailler.",
        options: ["est", "soit", "sera", "serait"],
        correctAnswer: "soit",
        hint: "Conjunction 'bien que' (although) requires the subjunctive of être.",
        explanation: "'Bien que' is a concessive conjunction that systematically requires the subjunctive."
      }
    ]
  };

  try {
    const prompt = `You are a Master Professor of French Grammar and Linguistics.
Generate an in-depth, pedagogically structured French Grammar Lesson on the topic / aspect: "${aspectTitle}".
Target CEFR Level: ${level}.
Focus Rule or Specific Aspect: ${focusRule || 'Comprehensive rule breakdown with formulas and exercises'}.

Requirements:
1. "title": Crisp, formal grammar title (e.g. "L'Accord du Participe Passé avec Avoir et le COD Précédent")
2. "aspectCategory": One of ("Subjunctive & Non-Finite Moods", "Past Temporal Boundaries", "Future & Conditional Systems", "Direct & Indirect Pronominal Clitics", "Prepositional Regimes & Geography", "Determiners, Partitives & Quantifiers", "Passive Voice & Pronominal Reflexives", "Complex Multi-Tier Negation", "Hypothetical 'Si' Clause Systems", "Nominal Gender & Endings Morpho-Syntax")
3. "level": "${level}"
4. "description": Pedagogical summary of when and why this grammatical aspect exists.
5. "formula": Visual syntax formula / blueprint (e.g. "[Sujet] + [COD placé avant] + [Auxiliaire Avoir] + [Participe Passé accordé en genre et nombre avec le COD]")
6. "goldenRule": The single most important rule principle students must memorize.
7. "rules": Array of 3-5 structured, concrete syntactic rules with step-by-step logic.
8. "contrastExamples": Array of 3-4 side-by-side contrasting French sentences showing correct vs incorrect or contrast pairs with English translations and grammatical aspect notes.
9. "commonTraps": Array of 2-3 traps/exceptions that confuse intermediate and advanced students (e.g. invariable past participles with 'en' or measurement verbs).
10. "practiceExercises": Array of 3-4 interactive exercises (mix of multiple-choice, fill-in-the-blank, or sentence-builder) each with prompt, options, correctAnswer, hint, and detailed grammatical explanation.

Format as JSON strictly adhering to this structure.`;

    const result = await generateAiJson(prompt, defaultFallback, { task: 'generate-grammar-lesson' });
    res.json(result);
  } catch (error) {
    console.error('Error in /api/ai/generate-grammar-lesson:', error);
    res.json(defaultFallback);
  }
});

// Vite Middleware / Static File Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🇫🇷 French Learning Platform server running on http://localhost:${PORT}`);
  });
}

startServer();
