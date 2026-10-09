import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  Volume2,
  RotateCcw,
  Check,
  Sparkles,
  Plus,
  Search,
  Star,
  Layers,
  ArrowLeft,
  ArrowRight,
  Shuffle,
  Calendar,
  Compass,
  BookmarkPlus,
  BookOpen,
  RefreshCw,
  Quote,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { VOCABULARY_FLASHCARDS } from '../data/vocabData.js';
import { speakFrench, playChime } from '../utils/audioUtils.js';
import { useModalTracker } from '../utils/modalState.js';

const VOCABULARY_CATEGORIES = [...new Set(VOCABULARY_FLASHCARDS.map((card) => card.category))];

export const VOCABULARY_AREAS = [
  { id: 'Gastronomy & Culinary Arts', label: 'Gastronomy & Cuisine', icon: '🍷', french: 'Gastronomie & Vins' },
  { id: 'Art & Architecture', label: 'Art & Architecture', icon: '🎨', french: 'Art & Patrimoine' },
  { id: 'Technology & Innovation', label: 'Tech & Digital Culture', icon: '💻', french: 'Numérique & IA' },
  { id: 'Travel & City Life', label: 'Travel & Urban Flânerie', icon: '✈️', french: 'Voyages & Découvertes' },
  { id: 'Business & Career', label: 'Business & Economy', icon: '💼', french: 'Affaires & Startups' },
  { id: 'Nature & Ecology', label: 'Nature & Ecology', icon: '🌿', french: 'Écologie & Climat' },
  { id: 'Literature & Cinema', label: 'Literature & Cinema', icon: '📚', french: 'Lettres & Septième Art' },
  { id: 'Fashion & Haute Couture', label: 'Fashion & Luxury', icon: '👗', french: 'Mode & Élégance' },
  { id: 'Daily Life & Social Etiquette', label: 'Daily Life & Slang', icon: '🥐', french: 'Vie Quotidienne & Argot' },
  { id: 'Health & Wellness', label: 'Health & Science', icon: '🩺', french: 'Santé & Bien-Être' },
  { id: 'Sports & Adventure', label: 'Sports & Outdoors', icon: '🏃', french: 'Sport & Grand Air' },
];

const DAILY_VOCAB_STORAGE_KEY = 'french_daily_ai_vocab_v1';

export const FlashcardsView = ({
  progress,
  audioSpeed,
  activeLevel = 'A1',
  onToggleMastery,
  onAwardXp,
}) => {
  const [cards, setCards] = useState(VOCABULARY_FLASHCARDS);
  const [selectedCategories, setSelectedCategories] = useState(VOCABULARY_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('daily-ai'); // 'daily-ai' | 'srs' | 'grid'
  const [suggestionOffset, setSuggestionOffset] = useState(0);

  // Daily AI Vocabulary State
  const [selectedArea, setSelectedArea] = useState('Gastronomy & Culinary Arts');
  const [customAreaInput, setCustomAreaInput] = useState('');
  const [isCustomAreaActive, setIsCustomAreaActive] = useState(false);
  const [dailyLevel, setDailyLevel] = useState(activeLevel || 'A1');
  const [dailyData, setDailyData] = useState(null);
  const [isLoadingDaily, setIsLoadingDaily] = useState(false);
  const [addedDailyIds, setAddedDailyIds] = useState(new Set());
  const [activeAudioPlayingId, setActiveAudioPlayingId] = useState(null);

  // Sync dailyLevel with activeLevel when user changes level in header
  useEffect(() => {
    if (activeLevel) {
      setDailyLevel(activeLevel);
    }
  }, [activeLevel]);

  // SRS Review mode state
  const [srsIndex, setSrsIndex] = useState(0);
  const [srsDeck, setSrsDeck] = useState(null); // null = use filteredCards; array = custom set (like daily words)
  const [isFlipped, setIsFlipped] = useState(false);

  // New Custom Card Modal state
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newFrench, setNewFrench] = useState('');
  const [newEnglish, setNewEnglish] = useState('');
  const [newExample, setNewExample] = useState('');

  useModalTracker(isAddingCard);

  // Get formatted dates
  const todayIso = useMemo(() => new Date().toISOString().split('T')[0], []);
  const formattedTodayDate = useMemo(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('en-US', options);
  }, []);
  const formattedTodayFrenchDate = useMemo(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('fr-FR', options);
  }, []);

  // Fetch or generate daily vocabulary from AI
  const fetchDailyVocabulary = async (targetArea, targetLevel, forceRefresh = false) => {
    const areaToFetch = targetArea || selectedArea;
    const levelToFetch = targetLevel || dailyLevel;

    // Check localStorage cache if not forcing refresh
    if (!forceRefresh) {
      try {
        const cached = localStorage.getItem(DAILY_VOCAB_STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (
            parsed.date === todayIso &&
            parsed.area === areaToFetch &&
            parsed.level === levelToFetch &&
            Array.isArray(parsed.vocabulary) &&
            parsed.vocabulary.length > 0
          ) {
            setDailyData(parsed);
            return;
          }
        }
      } catch (err) {
        console.warn('Error reading daily vocab cache:', err);
      }
    }

    setIsLoadingDaily(true);
    try {
      const response = await fetch('/api/ai/generate-daily-vocabulary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          area: areaToFetch,
          level: levelToFetch,
          date: todayIso,
          count: 6,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      if (data && Array.isArray(data.vocabulary)) {
        setDailyData(data);
        try {
          localStorage.setItem(DAILY_VOCAB_STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
          // ignore cache error
        }
      }
    } catch (error) {
      console.error('Error generating daily vocabulary:', error);
    } finally {
      setIsLoadingDaily(false);
    }
  };

  // Initial load of today's vocabulary
  useEffect(() => {
    fetchDailyVocabulary(selectedArea, dailyLevel, false);
  }, [selectedArea, dailyLevel]);

  const handleSelectArea = (areaId) => {
    setIsCustomAreaActive(false);
    setSelectedArea(areaId);
  };

  const handleApplyCustomArea = (e) => {
    e.preventDefault();
    if (!customAreaInput.trim()) return;
    const customAreaName = customAreaInput.trim();
    setIsCustomAreaActive(true);
    setSelectedArea(customAreaName);
    fetchDailyVocabulary(customAreaName, dailyLevel, true);
  };

  const handleAddWordToDeck = (wordItem) => {
    const newCard = {
      id: wordItem.id || `vocab-ai-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      french: wordItem.french,
      english: wordItem.english,
      gender: wordItem.gender || null,
      partOfSpeech: wordItem.partOfSpeech || 'noun',
      ipa: wordItem.ipa || '',
      exampleFrench: wordItem.exampleFrench || '',
      exampleEnglish: wordItem.exampleEnglish || '',
      category: wordItem.category || selectedArea,
      level: wordItem.level || dailyLevel,
    };

    setCards((prev) => {
      if (prev.some((c) => c.french.toLowerCase() === newCard.french.toLowerCase())) {
        return prev;
      }
      return [newCard, ...prev];
    });

    setAddedDailyIds((prev) => new Set([...prev, wordItem.id]));
    playChime('celebrate');
    onAwardXp(10);
  };

  const handleAddAllDailyToDeck = () => {
    if (!dailyData?.vocabulary) return;
    const newCards = dailyData.vocabulary.map((v, i) => ({
      id: v.id || `daily-${i}-${Date.now()}`,
      french: v.french,
      english: v.english,
      gender: v.gender || null,
      partOfSpeech: v.partOfSpeech || 'noun',
      ipa: v.ipa || '',
      exampleFrench: v.exampleFrench || '',
      exampleEnglish: v.exampleEnglish || '',
      category: v.category || selectedArea,
      level: v.level || dailyLevel,
    }));

    setCards((prev) => {
      const existingFrench = new Set(prev.map((c) => c.french.toLowerCase()));
      const toAdd = newCards.filter((c) => !existingFrench.has(c.french.toLowerCase()));
      return [...toAdd, ...prev];
    });

    setAddedDailyIds(new Set(dailyData.vocabulary.map((v) => v.id)));
    playChime('celebrate');
    onAwardXp(25);
  };

  const handlePracticeDailyInSrs = () => {
    if (!dailyData?.vocabulary || dailyData.vocabulary.length === 0) return;
    const dailyAsCards = dailyData.vocabulary.map((v, i) => ({
      id: v.id || `daily-srs-${i}`,
      french: v.french,
      english: v.english,
      gender: v.gender || null,
      partOfSpeech: v.partOfSpeech || 'noun',
      ipa: v.ipa || '',
      exampleFrench: v.exampleFrench || '',
      exampleEnglish: v.exampleEnglish || '',
      category: v.category || selectedArea,
      level: v.level || dailyLevel,
    }));

    setSrsDeck(dailyAsCards);
    setSrsIndex(0);
    setIsFlipped(false);
    setViewMode('srs');
  };

  const handlePlayWordAudio = (text, id) => {
    setActiveAudioPlayingId(id);
    speakFrench(text, audioSpeed);
    setTimeout(() => setActiveAudioPlayingId(null), 1200);
  };

  const categoryCards = cards.filter((card) => selectedCategories.includes(card.category));
  const filteredCards = categoryCards.filter((c) => {
    const matchesSearch =
      c.french.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.english.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const activeSrsCards = srsDeck || filteredCards;
  const currentSrsCard = activeSrsCards[srsIndex % (activeSrsCards.length || 1)];

  const suggestionPool = categoryCards.filter((card) => !progress.masteredCards.includes(card.id));
  const availableSuggestions = suggestionPool.length > 0 ? suggestionPool : categoryCards;
  const suggestedCards = availableSuggestions.length > 0
    ? Array.from({ length: Math.min(8, availableSuggestions.length) }, (_, index) =>
      availableSuggestions[(suggestionOffset + index) % availableSuggestions.length])
    : [];

  const handleFlip = () => {
    playChime('click');
    setIsFlipped(!isFlipped);
  };

  const handleSrsResponse = (quality) => {
    if (quality === 'good' || quality === 'easy') {
      playChime('correct');
      onAwardXp(quality === 'easy' ? 10 : 5);
    } else {
      playChime('click');
    }

    setIsFlipped(false);
    setSrsIndex((prev) => (prev + 1) % activeSrsCards.length);
  };

  const handleAddCustomCard = (e) => {
    e.preventDefault();
    if (!newFrench.trim() || !newEnglish.trim()) return;

    const newCard = {
      id: `custom-${Date.now()}`,
      french: newFrench.trim(),
      english: newEnglish.trim(),
      partOfSpeech: 'noun',
      ipa: '/.../',
      exampleFrench: newExample.trim() || newFrench.trim(),
      exampleEnglish: newEnglish.trim(),
      category: 'Basics',
      level: 'A1',
    };

    setCards((prev) => [newCard, ...prev]);
    setNewFrench('');
    setNewEnglish('');
    setNewExample('');
    setIsAddingCard(false);
    playChime('celebrate');
    onAwardXp(15);
  };

  return (
    <div id="flashcards-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Header & Stats Banner */}
      <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-[#F0ECE1] border border-[#5A5A40]/20 text-[#5A5A40] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>Atelier Lexical & Vocabulaire IA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#34342E] font-serif">French Vocabulary Studio</h2>
          <p className="text-sm text-[#525248] max-w-xl leading-relaxed">
            Expand your French lexicon with AI-generated daily vocabulary across diverse cultural domains, reinforced by spaced repetition (SRS).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-[#FAF7F2] px-4 py-3 rounded-2xl border border-[#E8E2D9] text-center shadow-xs">
            <span className="text-xs text-[#7A7A6A] block font-medium">Deck Size</span>
            <span className="text-lg font-bold text-[#34342E] font-serif">{cards.length} words</span>
          </div>
          <div className="bg-[#FAF7F2] px-4 py-3 rounded-2xl border border-[#E8E2D9] text-center shadow-xs">
            <span className="text-xs text-[#7A7A6A] block font-medium">Mastered</span>
            <span className="text-lg font-bold text-[#5A5A40] font-serif">{progress.masteredCards.length} cards</span>
          </div>
          <button
            onClick={() => setIsAddingCard(true)}
            className="flex items-center gap-2 px-4 py-3 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-2xl font-bold text-xs shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Card</span>
          </button>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#DCDCCF] pb-4">
        {/* Main View Mode Selector */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-white/70 backdrop-blur-sm rounded-2xl border border-[#DCDCCF] shadow-xs">
          <button
            onClick={() => {
              setViewMode('daily-ai');
              setSrsDeck(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'daily-ai'
                ? 'bg-[#5A5A40] text-white shadow-xs'
                : 'text-[#6A6A5A] hover:text-[#34342E] hover:bg-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Daily AI Vocabulary</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-white/20 text-white font-medium">
              Today
            </span>
          </button>

          <button
            onClick={() => {
              setViewMode('srs');
              setSrsDeck(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'srs' && !srsDeck
                ? 'bg-[#5A5A40] text-white shadow-xs'
                : 'text-[#6A6A5A] hover:text-[#34342E] hover:bg-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>SRS Flashcards</span>
          </button>

          <button
            onClick={() => {
              setViewMode('grid');
              setSrsDeck(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-[#5A5A40] text-white shadow-xs'
                : 'text-[#6A6A5A] hover:text-[#34342E] hover:bg-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>All Cards Grid ({filteredCards.length})</span>
          </button>
        </div>

        {/* Search Input for Deck Modes */}
        {viewMode !== 'daily-ai' && (
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-[#7A7A6A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search word (FR or EN)..."
              className="w-full bg-white border border-[#DCDCCF] rounded-xl pl-10 pr-4 py-2 text-xs text-[#34342E] placeholder-[#7A7A6A] focus:outline-none focus:border-[#5A5A40] shadow-xs"
            />
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 1. DAILY AI VOCABULARY MODE                                              */}
      {/* ========================================================================= */}
      {viewMode === 'daily-ai' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Daily Date & Domain Control Deck */}
          <div className="bg-gradient-to-br from-white via-[#FAF8F5] to-[#F5F2EB] border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            {/* Top Bar: Today's date + Level + Quick Regenerate */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D9] pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#5A5A40] text-white flex items-center justify-center shadow-xs">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#5A5A40]">
                      Vocabulaire du Jour
                    </span>
                    <span className="text-xs text-[#7A7A6A]">·</span>
                    <span className="text-xs font-medium text-[#7A7A6A]">{formattedTodayDate}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#34342E] font-serif capitalize">
                    {dailyData?.areaTitle || selectedArea}
                  </h3>
                </div>
              </div>

              {/* CEFR Level Selector & Refresh Button */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center bg-white p-1 rounded-xl border border-[#DCDCCF] shadow-xs">
                  {['A1', 'A2', 'B1', 'B2'].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => {
                        setDailyLevel(lvl);
                        fetchDailyVocabulary(selectedArea, lvl, true);
                      }}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        dailyLevel === lvl
                          ? 'bg-[#5A5A40] text-white shadow-2xs'
                          : 'text-[#7A7A6A] hover:text-[#34342E]'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => fetchDailyVocabulary(selectedArea, dailyLevel, true)}
                  disabled={isLoadingDaily}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#F5F2EB] text-[#34342E] border border-[#DCDCCF] rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-60"
                  title="Generate a fresh daily vocabulary set for this area"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#5A5A40] ${isLoadingDaily ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh Set</span>
                </button>
              </div>
            </div>

            {/* Thematic Area Carousel / Pill Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#525248] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>Choose Domain / Area of Interest</span>
                </label>
                <span className="text-xs text-[#7A7A6A]">11 cultural areas + custom topic</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {VOCABULARY_AREAS.map((area) => {
                  const isSelected = selectedArea === area.id && !isCustomAreaActive;
                  return (
                    <button
                      key={area.id}
                      onClick={() => handleSelectArea(area.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-sm'
                          : 'bg-white text-[#525248] border-[#DCDCCF] hover:border-[#5A5A40]/40 hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <span>{area.icon}</span>
                      <span>{area.label}</span>
                    </button>
                  );
                })}

                {/* Custom Topic Pill */}
                <button
                  onClick={() => setIsCustomAreaActive(true)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    isCustomAreaActive
                      ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-sm'
                      : 'bg-white text-[#525248] border-[#DCDCCF] hover:border-[#5A5A40]/40 hover:bg-[#FAF8F5]'
                  }`}
                >
                  <span>✏️</span>
                  <span>Custom Area...</span>
                </button>
              </div>

              {/* Custom Area Input Field (when active) */}
              {isCustomAreaActive && (
                <form
                  onSubmit={handleApplyCustomArea}
                  className="flex items-center gap-2 pt-2 animate-in fade-in max-w-lg"
                >
                  <input
                    type="text"
                    value={customAreaInput}
                    onChange={(e) => setCustomAreaInput(e.target.value)}
                    placeholder="Enter any domain (e.g. Space exploration, French Wine Tasting, Law & Justice)..."
                    className="flex-1 bg-white border border-[#DCDCCF] rounded-xl px-3.5 py-2 text-xs text-[#34342E] placeholder-[#7A7A6A] focus:outline-none focus:border-[#5A5A40] shadow-xs"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!customAreaInput.trim() || isLoadingDaily}
                    className="px-4 py-2 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-xl text-xs font-bold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    Generate
                  </button>
                </form>
              )}
            </div>

            {/* Cultural Proverb or Quote of the Day */}
            {dailyData?.dailyQuote && (
              <div className="p-4 sm:p-5 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D9] flex items-start gap-3.5 shadow-2xs">
                <Quote className="w-5 h-5 text-[#5A5A40] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm sm:text-base font-serif italic text-[#34342E] font-medium">
                    "{dailyData.dailyQuote.french}"
                  </p>
                  <p className="text-xs text-[#7A7A6A]">
                    {dailyData.dailyQuote.english} — <span className="font-semibold text-[#5A5A40]">{dailyData.dailyQuote.author}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Loading Skeleton during AI Generation */}
          {isLoadingDaily && (
            <div className="text-center py-16 space-y-4 bg-white border border-[#E8E2D9] rounded-3xl p-8">
              <div className="w-10 h-10 border-3 border-[#5A5A40] border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="space-y-1">
                <p className="text-base font-bold text-[#34342E] font-serif">
                  Generating Daily Vocabulary with AI...
                </p>
                <p className="text-xs text-[#7A7A6A]">
                  Consulting authentic French lexicographical usage in <span className="font-semibold text-[#5A5A40]">{selectedArea}</span> for level {dailyLevel}
                </p>
              </div>
            </div>
          )}

          {/* Daily Vocabulary Cards Grid */}
          {!isLoadingDaily && dailyData?.vocabulary && dailyData.vocabulary.length > 0 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
                <div>
                  <h4 className="text-base font-bold text-[#34342E] font-serif">
                    Today's Curated Vocabulary ({dailyData.vocabulary.length} Words)
                  </h4>
                  <p className="text-xs text-[#7A7A6A]">
                    Click the speaker icon to listen, add to your personal review deck, or practice in SRS mode.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddAllDailyToDeck}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#FAF7F2] text-[#34342E] border border-[#DCDCCF] rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <BookmarkPlus className="w-3.5 h-3.5 text-[#5A5A40]" />
                    <span>Add All to Deck</span>
                  </button>

                  <button
                    onClick={handlePracticeDailyInSrs}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Practice in SRS</span>
                  </button>
                </div>
              </div>

              {/* Grid of 6 Vocabulary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {dailyData.vocabulary.map((item, idx) => {
                  const isAdded = addedDailyIds.has(item.id);
                  const isMastered = progress.masteredCards.includes(item.id);
                  const isAudioPlaying = activeAudioPlayingId === item.id;

                  return (
                    <div
                      key={item.id || idx}
                      className="bg-white border border-[#E8E2D9] rounded-3xl p-5 sm:p-6 space-y-4 hover:border-[#5A5A40]/40 transition-all shadow-xs hover:shadow-sm flex flex-col justify-between"
                    >
                      {/* Top Header: Word + IPA + Gender / Part of Speech */}
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h5 className="text-xl font-bold text-[#34342E] font-serif tracking-tight">
                                {item.french}
                              </h5>
                              {item.gender ? (
                                <span
                                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${
                                    item.gender === 'm'
                                      ? 'bg-[#F0ECE1] text-[#5A5A40] border border-[#5A5A40]/20'
                                      : 'bg-[#FAF3EE] text-[#9C4B2E] border border-[#D98E73]/30'
                                  }`}
                                >
                                  {item.gender === 'm' ? 'Masculin' : 'Féminin'}
                                </span>
                              ) : (
                                item.partOfSpeech && (
                                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#7A7A6A] border border-[#E8E2D9]">
                                    {item.partOfSpeech}
                                  </span>
                                )
                              )}
                            </div>

                            {item.ipa && (
                              <p className="text-xs font-mono text-[#5A5A40] pt-0.5">{item.ipa}</p>
                            )}
                          </div>

                          {/* Audio pronunciation button */}
                          <button
                            onClick={() => handlePlayWordAudio(item.french, item.id)}
                            title="Listen to French pronunciation"
                            className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                              isAudioPlaying
                                ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
                                : 'bg-[#FAF7F2] text-[#5A5A40] border-[#E8E2D9] hover:bg-[#5A5A40] hover:text-white'
                            }`}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* English Meaning */}
                        <div className="pt-1">
                          <span className="text-[11px] uppercase font-bold text-[#7A7A6A] block">Meaning</span>
                          <p className="text-sm font-semibold text-[#34342E]">{item.english}</p>
                        </div>

                        {/* Contextual French Example Sentence */}
                        {item.exampleFrench && (
                          <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D9] space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] uppercase font-bold text-[#7A7A6A]">Context in {dailyData.area}</span>
                              <button
                                onClick={() => handlePlayWordAudio(item.exampleFrench, `${item.id}-ex`)}
                                className="text-[#7A7A6A] hover:text-[#34342E] p-0.5"
                                title="Listen to example"
                              >
                                <Volume2 className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="text-xs text-[#34342E] italic font-serif">"{item.exampleFrench}"</p>
                            <p className="text-[11px] text-[#7A7A6A]">{item.exampleEnglish}</p>
                          </div>
                        )}

                        {/* Usage Note / Cultural Tip */}
                        {item.usageNote && (
                          <div className="text-[11px] text-[#5A5A40] bg-[#F5F2EB]/60 border border-[#5A5A40]/15 rounded-xl p-2.5 space-y-0.5">
                            <span className="font-bold block text-[10px] uppercase tracking-wider text-[#5A5A40]">
                              💡 Usage Note
                            </span>
                            <p className="text-[#525248] leading-relaxed">{item.usageNote}</p>
                          </div>
                        )}
                      </div>

                      {/* Card Action Footer */}
                      <div className="pt-3 border-t border-[#E8E2D9] flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleAddWordToDeck(item)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-[#EEF4EE] text-[#3A5A3A] border border-[#5A7A5A]/30'
                              : 'bg-white hover:bg-[#FAF7F2] text-[#34342E] border border-[#DCDCCF]'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#5A7A5A]" />
                              <span>In Deck</span>
                            </>
                          ) : (
                            <>
                              <BookmarkPlus className="w-3.5 h-3.5 text-[#5A5A40]" />
                              <span>Add to Deck</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => onToggleMastery(item.id)}
                          className={`p-2 rounded-xl border transition-all cursor-pointer ${
                            isMastered
                              ? 'bg-[#FAF3EE] text-[#D98E73] border-[#D98E73]/40'
                              : 'bg-white text-[#DCDCCF] border-[#DCDCCF] hover:text-[#D98E73]'
                          }`}
                          title={isMastered ? 'Mastered' : 'Mark as mastered'}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SRS FLASHCARD MODE                                                    */}
      {/* ========================================================================= */}
      {viewMode === 'srs' && activeSrsCards.length > 0 && currentSrsCard && (
        <div className="max-w-xl mx-auto space-y-6">
          {/* Deck mode indicator if practicing custom daily set */}
          {srsDeck && (
            <div className="bg-[#FAF7F2] border border-[#5A5A40]/20 rounded-2xl p-3.5 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#5A5A40] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#5A5A40]" />
                Practicing Today's AI Vocabulary ({selectedArea})
              </span>
              <button
                onClick={() => setSrsDeck(null)}
                className="text-[#7A7A6A] hover:text-[#34342E] font-bold underline"
              >
                Switch to Full Deck
              </button>
            </div>
          )}

          {/* Card counter */}
          <div className="flex items-center justify-between text-xs text-[#7A7A6A] px-2">
            <span>Card {srsIndex + 1} of {activeSrsCards.length}</span>
            <span className="font-semibold text-[#5A5A40]">{currentSrsCard.category} • {currentSrsCard.level}</span>
          </div>

          {/* 3D Flip Card Container */}
          <div
            id="srs-card"
            onClick={handleFlip}
            className="min-h-[300px] bg-white border-2 border-[#E8E2D9] hover:border-[#5A5A40]/40 rounded-3xl p-8 flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-md transition-all relative select-none"
          >
            {/* Top actions inside card */}
            <div className="flex items-center justify-between">
              {currentSrsCard.gender ? (
                <span
                  className={`text-xs font-bold uppercase px-2.5 py-1 rounded-lg ${
                    currentSrsCard.gender === 'm'
                      ? 'bg-[#F0ECE1] text-[#5A5A40] border border-[#5A5A40]/20'
                      : 'bg-[#FAF3EE] text-[#9C4B2E] border border-[#D98E73]/30'
                  }`}
                >
                  {currentSrsCard.gender === 'm' ? 'Masculine (Le / Un)' : 'Feminine (La / Une)'}
                </span>
              ) : (
                <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-lg bg-[#FAF7F2] text-[#7A7A6A] border border-[#E8E2D9]">
                  {currentSrsCard.partOfSpeech}
                </span>
              )}

              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakFrench(currentSrsCard.french, audioSpeed);
                  }}
                  className="p-2.5 rounded-xl bg-[#FAF7F2] text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white border border-[#E8E2D9] transition-all shadow-xs cursor-pointer"
                  title="Listen to French pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleMastery(currentSrsCard.id);
                  }}
                  className={`p-2.5 rounded-xl transition-all border cursor-pointer ${
                    progress.masteredCards.includes(currentSrsCard.id)
                      ? 'bg-[#FAF3EE] text-[#D98E73] border-[#D98E73]/40'
                      : 'bg-[#FAF7F2] text-[#7A7A6A] border-[#E8E2D9] hover:text-[#D98E73]'
                  }`}
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>

            {/* Main Center Content */}
            <div className="text-center py-6 space-y-3">
              {!isFlipped ? (
                /* Front side */
                <>
                  <h3 className="text-3xl sm:text-4xl font-bold text-[#34342E] tracking-tight font-serif">
                    {currentSrsCard.french}
                  </h3>
                  {currentSrsCard.ipa && (
                    <p className="text-sm font-mono text-[#5A5A40] font-semibold">{currentSrsCard.ipa}</p>
                  )}
                  <p className="text-xs text-[#7A7A6A] pt-3">
                    Tap the card to reveal translation & example...
                  </p>
                </>
              ) : (
                /* Back side */
                <div className="space-y-4 animate-in zoom-in-95">
                  <div>
                    <span className="text-xs uppercase font-bold text-[#7A7A6A] block mb-1">
                      Translation
                    </span>
                    <h3 className="text-2xl font-bold text-[#5A5A40] font-serif">
                      {currentSrsCard.english}
                    </h3>
                  </div>

                  {currentSrsCard.exampleFrench && (
                    <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8E2D9] text-left text-xs space-y-1">
                      <p className="text-[#34342E] italic font-medium font-serif">"{currentSrsCard.exampleFrench}"</p>
                      <p className="text-[#7A7A6A]">{currentSrsCard.exampleEnglish}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom hint */}
            <div className="flex items-center justify-between text-xs text-[#7A7A6A]">
              <span>{isFlipped ? 'Back of card' : 'Front'}</span>
              <span className="flex items-center gap-1 text-[#5A5A40] font-semibold">
                <RotateCcw className="w-3.5 h-3.5" />
                Click to flip
              </span>
            </div>
          </div>

          {/* SRS Grading Buttons (When flipped) */}
          {isFlipped && (
            <div className="grid grid-cols-4 gap-2 pt-2 animate-in fade-in">
              <button
                onClick={() => handleSrsResponse('again')}
                className="py-3 px-2 rounded-xl bg-[#FAF3EE] border border-[#C05C54]/30 text-[#C05C54] font-bold text-xs hover:bg-[#FBEAE8] transition-all text-center cursor-pointer shadow-xs"
              >
                <span>Again</span>
                <span className="block text-[10px] font-normal opacity-80">&lt; 1 min</span>
              </button>
              <button
                onClick={() => handleSrsResponse('hard')}
                className="py-3 px-2 rounded-xl bg-[#FAF7F2] border border-[#C98A4B]/30 text-[#A26425] font-bold text-xs hover:bg-[#FAF3E8] transition-all text-center cursor-pointer shadow-xs"
              >
                <span>Hard</span>
                <span className="block text-[10px] font-normal opacity-80">1 day</span>
              </button>
              <button
                onClick={() => handleSrsResponse('good')}
                className="py-3 px-2 rounded-xl bg-[#F0ECE1] border border-[#5A5A40]/30 text-[#5A5A40] font-bold text-xs hover:bg-[#EAE6DF] transition-all text-center cursor-pointer shadow-xs"
              >
                <span>Good</span>
                <span className="block text-[10px] font-normal opacity-80">3 days</span>
              </button>
              <button
                onClick={() => handleSrsResponse('easy')}
                className="py-3 px-2 rounded-xl bg-[#EEF4EE] border border-[#5A7A5A]/30 text-[#3A5A3A] font-bold text-xs hover:bg-[#E2ECE2] transition-all text-center cursor-pointer shadow-xs"
              >
                <span>Easy</span>
                <span className="block text-[10px] font-normal opacity-80">7 days</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. GRID BROWSE MODE (ALL CARDS)                                          */}
      {/* ========================================================================= */}
      {viewMode === 'grid' && (
        <div className="space-y-6">
          {/* Category preferences */}
          <fieldset className="space-y-3">
            <legend className="text-sm font-bold text-[#34342E]">Filter by category</legend>
            <div className="flex flex-wrap gap-2">
              <label className="inline-flex items-center gap-2 rounded-xl border border-[#5A5A40]/30 bg-[#F0ECE1] px-3 py-2 text-xs font-semibold text-[#34342E] cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.length === VOCABULARY_CATEGORIES.length}
                  onChange={(event) => {
                    setSelectedCategories(event.target.checked ? VOCABULARY_CATEGORIES : []);
                    setSuggestionOffset(0);
                    setSrsIndex(0);
                    setIsFlipped(false);
                  }}
                  className="accent-[#5A5A40]"
                />
                All categories
              </label>
              {VOCABULARY_CATEGORIES.map((category) => (
                <label key={category} className="inline-flex items-center gap-2 rounded-xl border border-[#DCDCCF] bg-white px-3 py-2 text-xs font-medium text-[#525248] hover:border-[#5A5A40]/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={(event) => {
                      setSelectedCategories((previous) => event.target.checked
                        ? [...previous, category]
                        : previous.filter((item) => item !== category));
                      setSuggestionOffset(0);
                      setSrsIndex(0);
                      setIsFlipped(false);
                    }}
                    className="accent-[#5A5A40]"
                  />
                  {category}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Suggested words from selected categories */}
          <section aria-labelledby="suggested-words-heading" className="space-y-3">
            <div className="flex items-center justify-between gap-3 border-b border-[#DCDCCF] pb-2">
              <div>
                <h3 id="suggested-words-heading" className="text-sm font-bold text-[#34342E]">Suggested words</h3>
                <p className="text-xs text-[#7A7A6A]">Based on your selected categories</p>
              </div>
              {availableSuggestions.length > 4 && (
                <button
                  type="button"
                  onClick={() => setSuggestionOffset((current) => (current + 8) % availableSuggestions.length)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#5A5A40] hover:bg-white cursor-pointer"
                >
                  <Shuffle className="h-3.5 w-3.5" />
                  More words
                </button>
              )}
            </div>
            {suggestedCards.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {suggestedCards.map((card) => (
                  <div key={card.id} className="flex items-center justify-between gap-3 border-l-2 border-[#5A7A5A] bg-white px-3.5 py-3 rounded-r-xl shadow-2xs">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#34342E] font-serif">{card.french}</p>
                      <p className="truncate text-xs text-[#5A5A40]">{card.english}</p>
                      <p className="mt-1 text-[10px] text-[#7A7A6A]">{card.category} · {card.level}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => speakFrench(card.french, audioSpeed)}
                      aria-label={`Listen to ${card.french}`}
                      className="shrink-0 rounded-lg p-2 text-[#7A7A6A] hover:bg-[#F0ECE1] hover:text-[#34342E] cursor-pointer"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#7A7A6A]">Select at least one category to get word suggestions.</p>
            )}
          </section>

          {filteredCards.length === 0 && (
            <p role="status" className="border-l-2 border-[#D98E73] bg-[#FAF3EE] px-4 py-3 text-xs text-[#5C382A]">
              No words match your selected categories or search.
            </p>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCards.map((card) => {
              const isMastered = progress.masteredCards.includes(card.id);
              return (
                <div
                  key={card.id}
                  className="bg-white border border-[#E8E2D9] rounded-3xl p-5 space-y-3 flex flex-col justify-between hover:border-[#5A5A40]/40 transition-all shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-base font-bold text-[#34342E] font-serif">{card.french}</h4>
                          {card.gender && (
                            <span className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded ${
                              card.gender === 'm' ? 'bg-[#F0ECE1] text-[#5A5A40]' : 'bg-[#FAF3EE] text-[#9C4B2E]'
                            }`}>
                              {card.gender === 'm' ? 'm' : 'f'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#5A5A40] font-semibold mt-0.5">{card.english}</p>
                      </div>

                      <div className="flex space-x-1">
                        <button
                          onClick={() => speakFrench(card.french, audioSpeed)}
                          className="p-1.5 text-[#7A7A6A] hover:text-[#34342E] cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onToggleMastery(card.id)}
                          className={`p-1.5 cursor-pointer ${isMastered ? 'text-[#D98E73]' : 'text-[#DCDCCF] hover:text-[#D98E73]'}`}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-[#525248] italic font-serif pt-1">"{card.exampleFrench}"</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#7A7A6A] pt-2 border-t border-[#E8E2D9]">
                    <span>{card.category}</span>
                    <span className="font-mono text-[#5A5A40]">{card.ipa}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal to add custom card */}
      {isAddingCard && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#34342E]/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-[#E8E2D9] rounded-3xl w-full max-w-md p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-[#34342E] font-serif">Add Custom Flashcard</h3>
            <form onSubmit={handleAddCustomCard} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#34342E] block mb-1">French Word or Expression</label>
                <input
                  type="text"
                  required
                  value={newFrench}
                  onChange={(e) => setNewFrench(e.target.value)}
                  placeholder="e.g. Le coucher de soleil"
                  className="w-full bg-[#FAF7F2] border border-[#DCDCCF] rounded-xl px-3 py-2 text-sm text-[#34342E] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#34342E] block mb-1">English Meaning</label>
                <input
                  type="text"
                  required
                  value={newEnglish}
                  onChange={(e) => setNewEnglish(e.target.value)}
                  placeholder="e.g. The sunset"
                  className="w-full bg-[#FAF7F2] border border-[#DCDCCF] rounded-xl px-3 py-2 text-sm text-[#34342E] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#34342E] block mb-1">Example Sentence (Optional)</label>
                <input
                  type="text"
                  value={newExample}
                  onChange={(e) => setNewExample(e.target.value)}
                  placeholder="e.g. Nous admirons le coucher de soleil."
                  className="w-full bg-[#FAF7F2] border border-[#DCDCCF] rounded-xl px-3 py-2 text-sm text-[#34342E] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingCard(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#7A7A6A] hover:text-[#34342E] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5A5A40] hover:bg-[#4A4A35] text-white font-bold text-xs rounded-xl shadow cursor-pointer"
                >
                  Save Flashcard
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

