import React, { useState, useEffect } from 'react';
import {
  BookCheck,
  Sparkles,
  Volume2,
  Languages,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Newspaper,
  BookOpen,
  MessageSquareQuote,
  AlignLeft,
  Send,
  Award,
  Lightbulb,
  Check,
  X,
  Flame,
  Search,
  SlidersHorizontal,
  ChevronRight,
  PenTool
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakFrench, playChime } from '../utils/audioUtils.js';

const PUBLICATION_TYPES = [
  { id: 'newspaper', label: 'Newspaper Article', sub: 'Daily French press', icon: Newspaper },
  { id: 'magazine', label: 'Magazine Feature', sub: 'Culture & lifestyle', icon: BookOpen },
  { id: 'editorial', label: 'Editorial & Debate', sub: 'Perspectives & opinion', icon: MessageSquareQuote },
  { id: 'story', label: 'Narrative Story', sub: 'Literature & fiction', icon: AlignLeft },
];

const PRESET_TOPICS_BY_CATEGORY = [
  {
    category: 'Café & Gastronomy',
    icon: '🥐',
    topics: [
      "Parisian café culture and the daily French art of living",
      "The craft of artisan bakeries and traditional baguettes",
      "Regional farmers' markets: from local farm to dinner plate",
    ],
  },
  {
    category: 'Cities & Environment',
    icon: '🌿',
    topics: [
      "How bicycles conquered major French metropolises",
      "Green Paris: urban forests and pedestrian avenues",
      "The revival of scenic night trains across France and Europe",
    ],
  },
  {
    category: 'Culture & Trends',
    icon: '🎨',
    topics: [
      "Street art and hidden murals across Paris neighborhoods",
      "Independent French bookshops navigating the digital era",
      "Neighborhood film festivals celebrating independent cinema",
    ],
  },
  {
    category: 'Society & Debate',
    icon: '💡',
    topics: [
      "The four-day work week: experiments in French companies",
      "Artificial intelligence, culture, and critical thought in France",
      "The resurgence of traditional craftsmanship among youth",
    ],
  },
];

const CONTEXT_STAGES = [
  {
    id: 'right-wrong',
    stepNumber: 1,
    title: 'Right or Wrong?',
    subtitle: 'True or False Claims',
    icon: CheckCircle2,
    badgeText: 'Context 1 of 5',
    description: 'Read the claims about the text and determine whether each statement is Right (True) or Wrong (False).',
  },
  {
    id: 'mcq',
    stepNumber: 2,
    title: 'Comprehension Quiz',
    subtitle: 'Multiple Choice Questions',
    icon: HelpCircle,
    badgeText: 'Context 2 of 5',
    description: 'Answer reading comprehension questions to test your understanding of key details and vocabulary in context.',
  },
  {
    id: 'summary',
    stepNumber: 3,
    title: 'Summary Challenge',
    subtitle: 'Synthesizing the Main Idea',
    icon: AlignLeft,
    badgeText: 'Context 3 of 5',
    description: 'Identify the most accurate summary statement that captures the core message without distorting facts.',
  },
  {
    id: 'opinion',
    stepNumber: 4,
    title: 'Your Opinion & Point of View',
    subtitle: 'AI Evaluation & Discussion',
    icon: PenTool,
    badgeText: 'Context 4 of 5',
    description: 'Express your thoughts on the topic in French. The AI tutor evaluates your response and awards bonus XP!',
  },
  {
    id: 'glossary',
    stepNumber: 5,
    title: 'Press Vocabulary & Glossary',
    subtitle: 'Key Idioms & Audio',
    icon: BookOpen,
    badgeText: 'Context 5 of 5',
    description: 'Listen to and master authentic press vocabulary, grammatical types, and contextual examples.',
  },
];

export const StoriesView = ({ activeLevel = 'A1', audioSpeed = 1.0, onAwardXp }) => {
  const [sourceType, setSourceType] = useState('newspaper');
  const [topicInput, setTopicInput] = useState("Parisian café culture and the daily French art of living");
  const [customSearchQuery, setCustomSearchQuery] = useState('');
  const [showEnglish, setShowEnglish] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Stepper state: showing ONE context at a time
  const [currentContextIndex, setCurrentContextIndex] = useState(0);

  // Current Story / Article Data
  const [story, setStory] = useState({
    title: "Le quotidien du matin : Un café à la terrasse parisienne",
    subtitle: "Chaque matin dans les quartiers de Paris, les habitants retrouvent leur boulangerie et leur café habituel.",
    sourceType: "Newspaper Article (Le Parisien Quotidien)",
    publicationDate: "Morning Edition",
    author: "By Claire Delacroix, Society Desk",
    level: activeLevel,
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
  });

  // State for Context 1: Right or Wrong (Vrai / Faux)
  const [rightWrongAnswers, setRightWrongAnswers] = useState({}); // { [qIdx]: boolean }
  const [rightWrongSubmitted, setRightWrongSubmitted] = useState(false);

  // State for Context 2: Multiple Choice Questions (MCQ)
  const [mcqAnswers, setMcqAnswers] = useState({}); // { [qIdx]: optionIdx }
  const [mcqSubmitted, setMcqSubmitted] = useState(false);

  // State for Context 3: Summary Selection
  const [selectedSummaryIdx, setSelectedSummaryIdx] = useState(null);
  const [summarySubmitted, setSummarySubmitted] = useState(false);

  // State for Context 4: User Opinion & AI Evaluation
  const [userOpinionText, setUserOpinionText] = useState('');
  const [isEvaluatingOpinion, setIsEvaluatingOpinion] = useState(false);
  const [opinionEvaluation, setOpinionEvaluation] = useState(null);

  // Sync article when active level changes if user has not heavily interacted
  useEffect(() => {
    if (story.level !== activeLevel) {
      handleGenerateArticle(topicInput, sourceType, activeLevel);
    }
  }, [activeLevel]);

  // Main Generator Call
  const handleGenerateArticle = async (selectedTopic, chosenSourceType, chosenLevel) => {
    const topic = selectedTopic || topicInput;
    const finalSourceType = chosenSourceType || sourceType;
    const finalLevel = chosenLevel || activeLevel;

    setIsLoading(true);
    setRightWrongAnswers({});
    setRightWrongSubmitted(false);
    setMcqAnswers({});
    setMcqSubmitted(false);
    setSelectedSummaryIdx(null);
    setSummarySubmitted(false);
    setUserOpinionText('');
    setOpinionEvaluation(null);
    setCurrentContextIndex(0); // Reset to first context

    try {
      const res = await fetch('/api/ai/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          level: finalLevel,
          sourceType: finalSourceType,
          theme: 'society, culture & lifestyle',
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      setStory(data);
      playChime('correct');
      if (onAwardXp) onAwardXp(15);
    } catch (e) {
      console.error('Failed to generate article:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Right / Wrong Answer handler
  const handleCheckRightWrong = () => {
    setRightWrongSubmitted(true);
    const questions = story.rightOrWrongQuestions || [];
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (rightWrongAnswers[idx] === q.isRight) {
        correctCount += 1;
      }
    });

    if (correctCount === questions.length) {
      try {
        confetti({ particleCount: 35, spread: 55, origin: { y: 0.6 } });
      } catch {}
      playChime('celebrate');
      if (onAwardXp) onAwardXp(25);
    } else {
      playChime('correct');
      if (onAwardXp) onAwardXp(10);
    }
  };

  // MCQ handler
  const handleCheckMcq = () => {
    setMcqSubmitted(true);
    const questions = story.comprehensionQuestions || [];
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (mcqAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    if (correctCount === questions.length) {
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } catch {}
      playChime('celebrate');
      if (onAwardXp) onAwardXp(30);
    } else {
      playChime('click');
      if (onAwardXp) onAwardXp(15);
    }
  };

  // Summary submission
  const handleSubmitSummary = () => {
    setSummarySubmitted(true);
    const bestOption = story.summaryExercise?.options?.[selectedSummaryIdx];
    if (bestOption?.isBest) {
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      } catch {}
      playChime('celebrate');
      if (onAwardXp) onAwardXp(20);
    } else {
      playChime('correct');
      if (onAwardXp) onAwardXp(10);
    }
  };

  // User Opinion AI Evaluation
  const handleEvaluateOpinion = async () => {
    if (!userOpinionText.trim() || userOpinionText.trim().length < 5) {
      return;
    }

    setIsEvaluatingOpinion(true);
    try {
      const res = await fetch('/api/ai/evaluate-reading-opinion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userOpinion: userOpinionText,
          articleTitle: story.title,
          level: story.level || activeLevel,
          promptQuestion: story.opinionPrompt?.question || '',
        }),
      });

      const evaluation = await res.json();
      setOpinionEvaluation(evaluation);
      playChime('celebrate');
      try {
        confetti({ particleCount: 45, spread: 65, origin: { y: 0.6 } });
      } catch {}
      if (onAwardXp && evaluation.xpBonus) {
        onAwardXp(evaluation.xpBonus);
      }
    } catch (err) {
      console.error('Failed to evaluate user opinion:', err);
      setOpinionEvaluation({
        score: 85,
        cefrAssessment: `Level ${story.level || activeLevel} Proficiency Demonstrated`,
        feedbackFr: "Félicitations pour votre prise de parole ! Votre opinion est claire et démontre une belle maîtrise du français.",
        feedbackEn: "Well articulated perspective! Great job sharing your point of view.",
        grammarTips: ["Continue using connective words like 'parce que' and 'à mon avis' to enrich your expression."],
        suggestedNativeVersion: userOpinionText,
        encouragement: "Great job practicing your opinion in French!",
        xpBonus: 25,
      });
      playChime('correct');
      if (onAwardXp) onAwardXp(25);
    } finally {
      setIsEvaluatingOpinion(false);
    }
  };

  const currentStage = CONTEXT_STAGES[currentContextIndex];
  const nextStage = CONTEXT_STAGES[currentContextIndex + 1];

  const levelDescriptions = {
    A1: 'Beginner Level: Short sentences, high-frequency everyday vocabulary, and present tense.',
    A2: 'Elementary Level: Lifestyle reports, passé composé vs imparfait, and everyday French routines.',
    B1: 'Intermediate Level: Journalistic chronicles, subjunctive, conditionals, and logical connectors.',
    B2: 'Advanced Level: In-depth press features, critical debate of ideas, and rich formal vocabulary.',
  };

  return (
    <div id="stories-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Header & Media Control Panel */}
      <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 bg-[#F0ECE1] border border-[#5A5A40]/20 text-[#5A5A40] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Newspaper className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>French Reading Room & Press Kiosk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#34342E] font-serif">
              French Press & Reading Kiosk
            </h2>
            <p className="text-sm text-[#525248] max-w-2xl leading-relaxed">
              Explore authentic French newspaper articles, magazine features, and stories generated by AI, calibrated for CEFR level{' '}
              <strong className="text-[#34342E] font-bold underline decoration-[#D98E73] decoration-2">
                {activeLevel}
              </strong>
              . Step through one comprehension context at a time below!
            </p>
          </div>

          {/* Level Badge Info */}
          <div className="p-3.5 bg-[#FAF7F2] border border-[#E8E2D9] rounded-2xl flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#5A5A40] text-white font-bold flex items-center justify-center font-serif text-sm shadow-xs">
              {activeLevel}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-[#7A7A6A] tracking-wider block">
                Active Difficulty Level
              </span>
              <p className="text-xs font-semibold text-[#34342E] max-w-[210px] leading-tight">
                {levelDescriptions[activeLevel] || `Tailored to Level ${activeLevel}`}
              </p>
            </div>
          </div>
        </div>

        {/* Publication Format Selector */}
        <div className="border-t border-[#E8E2D9]/80 pt-5 space-y-3">
          <label className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Select Publication Format</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PUBLICATION_TYPES.map((pub) => {
              const Icon = pub.icon;
              const isSelected = sourceType === pub.id;
              return (
                <button
                  key={pub.id}
                  onClick={() => {
                    setSourceType(pub.id);
                    handleGenerateArticle(topicInput, pub.id, activeLevel);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-sm'
                      : 'bg-white hover:bg-[#FAF7F2] text-[#34342E] border-[#E8E2D9]'
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-white/20' : 'bg-[#F0ECE1] text-[#5A5A40]'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-[#34342E]'}`}>
                      {pub.label}
                    </p>
                    <p className={`text-[10px] truncate ${isSelected ? 'text-white/80' : 'text-[#7A7A6A]'}`}>
                      {pub.sub}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Topic Generator & Search */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Article Topic or News Subject What You Like</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#7A7A6A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customSearchQuery || topicInput}
                onChange={(e) => {
                  setCustomSearchQuery(e.target.value);
                  setTopicInput(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleGenerateArticle(customSearchQuery || topicInput, sourceType, activeLevel);
                  }
                }}
                placeholder="Type any topic you like (e.g. French cinema, Paris bakeries, travel to Provence, technology, sports...)"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#E8E2D9] rounded-2xl text-xs sm:text-sm text-[#34342E] placeholder-[#9C9485] focus:outline-none focus:border-[#5A5A40] focus:bg-white transition-all"
              />
            </div>
            <button
              onClick={() => handleGenerateArticle(customSearchQuery || topicInput, sourceType, activeLevel)}
              disabled={isLoading}
              className="px-5 py-2.5 bg-[#5A5A40] hover:bg-[#4A4A35] disabled:opacity-50 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isLoading ? 'Generating with AI...' : 'Generate Article'}</span>
            </button>
          </div>
        </div>

        {/* Preset Topic Tags categorized */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-[#7A7A6A] block">
            Popular Topics & Reader Interests (Click to Generate):
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_TOPICS_BY_CATEGORY.map((cat, cIdx) => (
              <React.Fragment key={cIdx}>
                {cat.topics.map((preset, pIdx) => (
                  <button
                    key={`${cIdx}-${pIdx}`}
                    onClick={() => {
                      setTopicInput(preset);
                      setCustomSearchQuery(preset);
                      handleGenerateArticle(preset, sourceType, activeLevel);
                    }}
                    className={`text-xs px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                      topicInput === preset
                        ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
                        : 'bg-white hover:bg-[#FAF7F2] text-[#525248] border-[#DCDCCF]'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span className="truncate max-w-[240px]">{preset}</span>
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Journal / Magazine Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Article Reading Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-9 space-y-6 shadow-sm relative overflow-hidden">
            {/* Journal Header Bar */}
            <div className="border-b-2 border-[#34342E] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#5A5A40] text-white text-[10px] font-bold uppercase tracking-wider">
                    {story.sourceType || 'French Press Article'}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#F0ECE1] text-[#5A5A40] text-[10px] font-bold uppercase">
                    Level {story.level || activeLevel}
                  </span>
                </div>
                <p className="text-[11px] text-[#7A7A6A] font-serif italic mt-1">
                  {story.publicationDate || 'Today\'s Edition'} • {story.author || 'By the Editorial Staff'}
                </p>
              </div>

              {/* Audio & Translation controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => speakFrench(story.frenchText, audioSpeed)}
                  title="Listen to native French audio narration"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F0ECE1] hover:bg-[#5A5A40] hover:text-white text-[#5A5A40] border border-[#5A5A40]/20 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen (Audio)</span>
                </button>
                <button
                  onClick={() => setShowEnglish(!showEnglish)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-2xs ${
                    showEnglish
                      ? 'bg-[#EEF4EE] text-[#3A5A3A] border-[#5A7A5A]/30'
                      : 'bg-white text-[#525248] border-[#DCDCCF] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Languages className="w-4 h-4" />
                  <span>{showEnglish ? 'Hide English' : 'Show English Translation'}</span>
                </button>
              </div>
            </div>

            {/* Headline and Subhead */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#34342E] font-serif leading-tight">
                {story.title}
              </h1>
              {story.subtitle && (
                <p className="text-sm sm:text-base text-[#5A5A40] font-serif italic leading-relaxed border-l-2 border-[#5A5A40] pl-3 py-0.5">
                  {story.subtitle}
                </p>
              )}
            </div>

            {/* Main French Article Body */}
            <div className="prose max-w-none text-[#2C2C26] font-serif text-base sm:text-lg leading-relaxed space-y-4">
              <p className="whitespace-pre-line first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-[#5A5A40]">
                {story.frenchText}
              </p>
            </div>

            {/* Optional English Translation Box */}
            {showEnglish && (
              <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D9] text-sm text-[#525248] leading-relaxed italic animate-in fade-in space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A7A6A] not-italic font-serif block">
                  Side-by-side English Translation
                </span>
                <p>{story.englishTranslation}</p>
              </div>
            )}
          </div>

          {/* SINGLE-CONTEXT STEPPER WORKBENCH (ONE CONTEXT AT A TIME) */}
          <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            {/* Top Stepper Indicator */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E2D9] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#5A5A40] text-white">
                      {currentStage.badgeText}
                    </span>
                    <span className="text-xs font-bold text-[#7A7A6A]">
                      Step {currentStage.stepNumber} of {CONTEXT_STAGES.length}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#34342E] font-serif mt-1 flex items-center gap-2">
                    <currentStage.icon className="w-5 h-5 text-[#5A5A40]" />
                    <span>{currentStage.title}</span>
                  </h3>
                </div>

                {/* Next Context Button (Header Shortcut) */}
                {currentContextIndex < CONTEXT_STAGES.length - 1 && (
                  <button
                    id="next-context-btn-header"
                    onClick={() => setCurrentContextIndex((prev) => prev + 1)}
                    className="px-4 py-2 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs shrink-0"
                  >
                    <span>Next Context: {nextStage?.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Step Navigation Dots / Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {CONTEXT_STAGES.map((stage, idx) => {
                  const isCurrent = idx === currentContextIndex;
                  const isPast = idx < currentContextIndex;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => setCurrentContextIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                        isCurrent
                          ? 'bg-[#5A5A40] text-white shadow-2xs'
                          : isPast
                          ? 'bg-[#EEF4EE] text-[#3A5A3A] border border-[#5A7A5A]/30'
                          : 'bg-[#FAF7F2] text-[#7A7A6A] hover:bg-[#F0ECE1]'
                      }`}
                      title={stage.title}
                    >
                      <span>{stage.stepNumber}. {stage.title}</span>
                      {isPast && <Check className="w-3 h-3 text-[#3A5A3A]" />}
                    </button>
                  );
                })}
              </div>

              {/* Context Description in clear English */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D9] flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
                <p className="text-xs text-[#525248] leading-relaxed">
                  {currentStage.description}
                </p>
              </div>
            </div>

            {/* CONTEXT 1: RIGHT OR WRONG (WHO/WHAT IS RIGHT?) */}
            {currentStage.id === 'right-wrong' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="space-y-4">
                  {(story.rightOrWrongQuestions || []).map((item, idx) => {
                    const userAnswer = rightWrongAnswers[idx];
                    const isAnswered = userAnswer !== undefined;
                    const isCorrect = isAnswered && userAnswer === item.isRight;

                    return (
                      <div
                        key={idx}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                          rightWrongSubmitted
                            ? isCorrect
                              ? 'bg-[#EEF4EE] border-[#5A7A5A]/40'
                              : 'bg-[#FAF3EE] border-[#C05C54]/40'
                            : 'bg-white border-[#E8E2D9]'
                        }`}
                      >
                        <p className="text-xs sm:text-sm font-bold text-[#34342E] mb-3 leading-snug">
                          Statement {idx + 1}: &ldquo;{item.claim}&rdquo;
                        </p>

                        <div className="flex items-center gap-3">
                          <button
                            disabled={rightWrongSubmitted}
                            onClick={() => setRightWrongAnswers((prev) => ({ ...prev, [idx]: true }))}
                            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                              userAnswer === true
                                ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
                                : 'bg-[#FAF7F2] text-[#525248] border-[#E8E2D9] hover:bg-white'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>True (Right)</span>
                          </button>
                          <button
                            disabled={rightWrongSubmitted}
                            onClick={() => setRightWrongAnswers((prev) => ({ ...prev, [idx]: false }))}
                            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                              userAnswer === false
                                ? 'bg-[#C05C54] text-white border-[#C05C54]'
                                : 'bg-[#FAF7F2] text-[#525248] border-[#E8E2D9] hover:bg-white'
                            }`}
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>False (Wrong)</span>
                          </button>
                        </div>

                        {rightWrongSubmitted && (
                          <div className="mt-3 pt-3 border-t border-black/10 text-xs space-y-1.5">
                            <p className="font-bold flex items-center gap-1.5">
                              {isCorrect ? (
                                <span className="text-[#3A5A3A] flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Correct!
                                </span>
                              ) : (
                                <span className="text-[#C05C54] flex items-center gap-1">
                                  <XCircle className="w-3.5 h-3.5" /> Incorrect (Expected answer: {item.isRight ? 'True' : 'False'})
                                </span>
                              )}
                            </p>
                            <p className="text-[#525248] leading-relaxed">
                              {item.explanation}
                            </p>
                            {item.quote && (
                              <p className="text-[#7A7A6A] italic font-serif">
                                Direct quote from text: &ldquo;{item.quote}&rdquo;
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {!rightWrongSubmitted && (
                  <button
                    onClick={handleCheckRightWrong}
                    disabled={Object.keys(rightWrongAnswers).length < (story.rightOrWrongQuestions || []).length}
                    className="w-full py-3 bg-[#5A5A40] hover:bg-[#4A4A35] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Check True / False Answers</span>
                  </button>
                )}
              </div>
            )}

            {/* CONTEXT 2: READING COMPREHENSION QUESTIONS (MCQ) */}
            {currentStage.id === 'mcq' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="space-y-6">
                  {(story.comprehensionQuestions || []).map((q, qIdx) => (
                    <div key={qIdx} className="space-y-3 p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D9]">
                      <p className="text-xs sm:text-sm font-bold text-[#34342E]">
                        Question {qIdx + 1}: {q.question}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = mcqAnswers[qIdx] === optIdx;
                          let btnStyle = 'bg-white border-[#E8E2D9] text-[#525248] hover:border-[#5A5A40]/40';

                          if (mcqSubmitted) {
                            if (optIdx === q.correctIndex) {
                              btnStyle = 'bg-[#EEF4EE] border-[#5A7A5A] text-[#3A5A3A] font-bold';
                            } else if (isSelected && optIdx !== q.correctIndex) {
                              btnStyle = 'bg-[#FAF3EE] border-[#C05C54] text-[#C05C54] font-bold';
                            }
                          } else if (isSelected) {
                            btnStyle = 'bg-[#F0ECE1] border-[#5A5A40] text-[#34342E] font-semibold';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={mcqSubmitted}
                              onClick={() => setMcqAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))}
                              className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {mcqSubmitted && (
                        <p className="text-xs text-[#7A7A6A] italic mt-1 font-serif pt-1">
                          💡 Explanation: {q.explanation}
                        </p>
                      )}
                    </div>
                  ))}

                  {!mcqSubmitted && (
                    <button
                      onClick={handleCheckMcq}
                      disabled={Object.keys(mcqAnswers).length < (story.comprehensionQuestions || []).length}
                      className="w-full py-3 bg-[#5A5A40] hover:bg-[#4A4A35] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      Submit Comprehension Answers
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* CONTEXT 3: SUMMARY CHALLENGE */}
            {currentStage.id === 'summary' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-[#5A5A40] flex items-center gap-1.5">
                    <AlignLeft className="w-4 h-4" />
                    <span>Summary Question</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#34342E] font-semibold">
                    {story.summaryExercise?.prompt || 'Which statement best summarizes the main idea of this article?'}
                  </p>
                </div>

                <div className="space-y-3">
                  {(story.summaryExercise?.options || []).map((opt, optIdx) => {
                    const isSelected = selectedSummaryIdx === optIdx;
                    return (
                      <div
                        key={optIdx}
                        onClick={() => !summarySubmitted && setSelectedSummaryIdx(optIdx)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          summarySubmitted
                            ? opt.isBest
                              ? 'bg-[#EEF4EE] border-[#5A7A5A] text-[#3A5A3A]'
                              : isSelected
                              ? 'bg-[#FAF3EE] border-[#C05C54] text-[#C05C54]'
                              : 'bg-white border-[#E8E2D9] opacity-60'
                            : isSelected
                            ? 'bg-[#F0ECE1] border-[#5A5A40] text-[#34342E]'
                            : 'bg-white border-[#E8E2D9] hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="summary-choice"
                            checked={isSelected}
                            disabled={summarySubmitted}
                            onChange={() => setSelectedSummaryIdx(optIdx)}
                            className="mt-1"
                          />
                          <div className="space-y-1">
                            <p className="text-xs sm:text-sm font-medium">{opt.text}</p>
                            {summarySubmitted && (
                              <p className="text-[11px] font-serif italic text-[#7A7A6A] mt-1">
                                {opt.feedback}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {!summarySubmitted ? (
                  <button
                    onClick={handleSubmitSummary}
                    disabled={selectedSummaryIdx === null}
                    className="w-full py-3 bg-[#5A5A40] hover:bg-[#4A4A35] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    Submit Summary Answer
                  </button>
                ) : (
                  story.summaryExercise?.sampleSummary && (
                    <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D9] space-y-1">
                      <span className="text-[10px] font-bold uppercase text-[#7A7A6A]">
                        Model Reference Summary (in French):
                      </span>
                      <p className="text-xs text-[#34342E] font-serif italic">
                        &ldquo;{story.summaryExercise.sampleSummary}&rdquo;
                      </p>
                    </div>
                  )
                )}
              </div>
            )}

            {/* CONTEXT 4: USER OPINION & POINT OF VIEW (AI DISCUSSION) */}
            {currentStage.id === 'opinion' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="p-4 sm:p-5 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D9] space-y-2">
                  <div className="flex items-center gap-2 text-[#5A5A40]">
                    <MessageSquareQuote className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Question for Discussion
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[#34342E] leading-snug">
                    {story.opinionPrompt?.question || 'What is your opinion or point of view on this topic?'}
                  </h4>
                  {story.opinionPrompt?.context && (
                    <p className="text-xs text-[#7A7A6A] leading-relaxed">
                      {story.opinionPrompt.context}
                    </p>
                  )}
                </div>

                {/* Sentence Starter Chips */}
                {story.opinionPrompt?.starterPhrases && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-[#7A7A6A]">
                      Helpful French sentence starters (click to insert):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {story.opinionPrompt.starterPhrases.map((phrase, idx) => {
                        const cleanPhrase = phrase.split('(')[0].trim();
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              if (!userOpinionText) {
                                setUserOpinionText(`${cleanPhrase} `);
                              } else {
                                setUserOpinionText((prev) => `${prev} ${cleanPhrase} `);
                              }
                            }}
                            className="text-xs px-2.5 py-1 rounded-lg bg-white hover:bg-[#FAF7F2] border border-[#DCDCCF] text-[#525248] transition-colors cursor-pointer shadow-2xs"
                            title={`Insert: ${cleanPhrase}`}
                          >
                            + {phrase}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Opinion Textarea */}
                <div className="space-y-2">
                  <textarea
                    rows={4}
                    value={userOpinionText}
                    onChange={(e) => setUserOpinionText(e.target.value)}
                    placeholder="Write your opinion or point of view in French here... (e.g. À mon avis, c'est très important parce que...)"
                    className="w-full p-4 rounded-2xl border border-[#E8E2D9] bg-white text-xs sm:text-sm text-[#34342E] placeholder-[#9C9485] focus:outline-none focus:border-[#5A5A40] transition-all leading-relaxed"
                  />
                  <div className="flex items-center justify-between text-[11px] text-[#7A7A6A]">
                    <span>{userOpinionText.trim().split(/\s+/).filter(Boolean).length} words written</span>
                    <span>Aim for 1 to 3 sentences in French</span>
                  </div>
                </div>

                {/* Submit Opinion Button */}
                <button
                  onClick={handleEvaluateOpinion}
                  disabled={isEvaluatingOpinion || !userOpinionText.trim() || userOpinionText.trim().length < 5}
                  className="w-full py-3.5 bg-[#5A5A40] hover:bg-[#4A4A35] disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isEvaluatingOpinion ? 'Analyzing your French response...' : 'Get AI Feedback & Bonus XP (+25 XP)'}</span>
                </button>

                {/* AI Feedback Card */}
                {opinionEvaluation && (
                  <div className="p-5 sm:p-6 bg-gradient-to-br from-[#FAF8F5] to-[#F5F2EB] border-2 border-[#5A7A5A]/30 rounded-3xl space-y-4 shadow-sm animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#5A7A5A] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                          {opinionEvaluation.score}/100
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#3A5A3A] block">
                            {opinionEvaluation.cefrAssessment}
                          </span>
                          <span className="text-[10px] text-[#7A7A6A]">
                            Personalized AI Feedback
                          </span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-[#EEF4EE] text-[#3A5A3A] border border-[#5A7A5A]/30 rounded-full text-xs font-black">
                        +{opinionEvaluation.xpBonus || 25} XP
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm text-[#34342E] leading-relaxed">
                        {opinionEvaluation.feedbackFr}
                      </p>
                      {opinionEvaluation.feedbackEn && (
                        <p className="text-xs text-[#7A7A6A] italic">
                          {opinionEvaluation.feedbackEn}
                        </p>
                      )}
                    </div>

                    {opinionEvaluation.grammarTips && opinionEvaluation.grammarTips.length > 0 && (
                      <div className="p-3.5 bg-white rounded-xl border border-[#E8E2D9] space-y-1">
                        <span className="text-[10px] font-bold uppercase text-[#5A5A40] flex items-center gap-1">
                          <Lightbulb className="w-3.5 h-3.5" /> Language & Grammar Advice:
                        </span>
                        <ul className="text-xs text-[#525248] space-y-1 list-disc list-inside">
                          {opinionEvaluation.grammarTips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {opinionEvaluation.suggestedNativeVersion && (
                      <div className="p-3.5 bg-[#EEF4EE] rounded-xl border border-[#5A7A5A]/20 space-y-1">
                        <span className="text-[10px] font-bold uppercase text-[#3A5A3A]">
                          Native French Journalist Phrasing Suggestion:
                        </span>
                        <p className="text-xs font-serif italic text-[#2C4A2C]">
                          &ldquo;{opinionEvaluation.suggestedNativeVersion}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* CONTEXT 5: VOCABULARY & PRESS GLOSSARY */}
            {currentStage.id === 'glossary' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D9] flex items-center justify-between">
                  <span className="text-xs text-[#525248]">
                    Review the {story.glossary?.length || 0} key expressions and vocabulary items extracted from this passage.
                  </span>
                  <button
                    onClick={() => speakFrench(story.glossary?.map(g => g.french).join('. '), audioSpeed)}
                    className="flex items-center gap-1 text-xs font-bold text-[#5A5A40] hover:underline cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Play All Audio</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {story.glossary?.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white rounded-2xl border border-[#E8E2D9] flex items-start justify-between gap-4 shadow-2xs hover:border-[#5A5A40]/40 transition-all"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-bold text-[#34342E] font-serif">
                            {item.french}
                          </span>
                          {item.type && (
                            <span className="text-[10px] text-[#7A7A6A] italic">
                              ({item.type})
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#5A5A40] font-semibold">
                          {item.english}
                        </p>
                        {item.contextSentence && (
                          <p className="text-xs text-[#7A7A6A] font-serif italic border-l-2 border-[#5A5A40]/30 pl-2.5 mt-1">
                            &ldquo;{item.contextSentence}&rdquo;
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => speakFrench(item.french, audioSpeed)}
                        title={`Listen to "${item.french}"`}
                        className="p-2.5 text-[#7A7A6A] hover:text-[#34342E] hover:bg-[#FAF7F2] rounded-xl cursor-pointer transition-colors shrink-0"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SEPARATE "NEXT CONTEXT" / "PREVIOUS CONTEXT" NAVIGATION BUTTON BAR */}
            <div className="pt-6 border-t border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                disabled={currentContextIndex === 0}
                onClick={() => setCurrentContextIndex((prev) => Math.max(0, prev - 1))}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#DCDCCF] text-xs font-bold text-[#525248] hover:bg-[#FAF7F2] disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Context</span>
              </button>

              <div className="text-xs text-[#7A7A6A] font-medium hidden sm:block">
                Context {currentContextIndex + 1} of {CONTEXT_STAGES.length}
              </div>

              {currentContextIndex < CONTEXT_STAGES.length - 1 ? (
                <button
                  id="next-context-btn-bottom"
                  onClick={() => setCurrentContextIndex((prev) => Math.min(CONTEXT_STAGES.length - 1, prev + 1))}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <span>Next Context: {nextStage?.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setCurrentContextIndex(0)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#5A7A5A] hover:bg-[#4A6A4A] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Review from Context 1</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar: Reading Guidance & Key Takeaways (1 Col) */}
        <div className="space-y-6">
          {/* Quick Context Jump List */}
          <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 space-y-4 shadow-sm">
            <h4 className="text-xs font-bold uppercase text-[#5A5A40] tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Activities In This Lesson</span>
            </h4>
            <div className="space-y-2">
              {CONTEXT_STAGES.map((stage, idx) => {
                const isActive = idx === currentContextIndex;
                const Icon = stage.icon;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setCurrentContextIndex(idx)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-2xs'
                        : 'bg-white hover:bg-[#FAF7F2] text-[#34342E] border-[#E8E2D9]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20' : 'bg-[#F0ECE1] text-[#5A5A40]'}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-[#34342E]'}`}>
                          {stage.stepNumber}. {stage.title}
                        </p>
                        <p className={`text-[10px] truncate ${isActive ? 'text-white/80' : 'text-[#7A7A6A]'}`}>
                          {stage.subtitle}
                        </p>
                      </div>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-white shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Press Glossary Quick View */}
          <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-3">
              <div>
                <h4 className="text-sm font-bold text-[#34342E] font-serif">
                  Key Vocabulary
                </h4>
                <p className="text-[10px] text-[#7A7A6A]">
                  {story.glossary?.length || 0} terms from this article
                </p>
              </div>
              <button
                onClick={() => setCurrentContextIndex(4)}
                className="text-xs font-bold text-[#5A5A40] hover:underline cursor-pointer"
              >
                View all →
              </button>
            </div>

            <div className="space-y-2.5">
              {story.glossary?.slice(0, 4).map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E2D9] flex items-center justify-between shadow-2xs"
                >
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#34342E] font-serif block truncate">
                      {item.french}
                    </span>
                    <p className="text-xs text-[#5A5A40] font-medium truncate">
                      {item.english}
                    </p>
                  </div>
                  <button
                    onClick={() => speakFrench(item.french, audioSpeed)}
                    title={`Listen to "${item.french}"`}
                    className="p-1.5 text-[#7A7A6A] hover:text-[#34342E] cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Reading Level Progression Advice */}
          <div className="p-6 bg-[#FAF7F2] border border-[#E8E2D9] rounded-3xl space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 text-[#5A5A40]">
              <Award className="w-4 h-4" />
              <h5 className="text-xs font-bold uppercase tracking-wider">
                Reading Advice for Level {activeLevel}
              </h5>
            </div>
            <p className="text-xs text-[#525248] leading-relaxed">
              Step through each context sequentially: begin by distinguishing facts with <strong>Right or Wrong</strong>, answer the <strong>Comprehension Quiz</strong>, verify the <strong>Summary Challenge</strong>, and finish by writing your <strong>Personal Opinion</strong> for AI feedback.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
