import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Volume2, RotateCcw, Check, Sparkles, Plus, Search, Star, Layers, ArrowLeft, ArrowRight } from 'lucide-react';
import { VOCABULARY_FLASHCARDS } from '../data/vocabData.js';
import { speakFrench, playChime } from '../utils/audioUtils.js';
import { useModalTracker } from '../utils/modalState.js';

export const FlashcardsView = ({
  progress,
  audioSpeed,
  onToggleMastery,
  onAwardXp,
}) => {
  const [cards, setCards] = useState(VOCABULARY_FLASHCARDS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('srs');
  
  // SRS Review mode state
  const [srsIndex, setSrsIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // New Custom Card Modal state
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newFrench, setNewFrench] = useState('');
  const [newEnglish, setNewEnglish] = useState('');
  const [newExample, setNewExample] = useState('');

  useModalTracker(isAddingCard);

  const categories = ['All', 'Basics', 'Food & Wine', 'Travel & Metro', 'Daily Life', 'Slang & Argot', 'Business'];

  const filteredCards = cards.filter((c) => {
    const matchesCat = activeCategory === 'All' || c.category === activeCategory;
    const matchesSearch =
      c.french.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.english.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const currentSrsCard = filteredCards[srsIndex % (filteredCards.length || 1)];

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
    setSrsIndex((prev) => (prev + 1) % filteredCards.length);
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
      {/* Header & Stats */}
      <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-[#F0ECE1] border border-[#5A5A40]/20 text-[#5A5A40] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Spaced Repetition System (SRS)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#34342E] font-serif">French Vocabulary Deck</h2>
          <p className="text-sm text-[#525248] max-w-xl leading-relaxed">
            Commit vocabulary to long-term memory with spaced repetition intervals and gender color-coding.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-[#FAF7F2] px-4 py-3 rounded-2xl border border-[#E8E2D9] text-center shadow-xs">
            <span className="text-xs text-[#7A7A6A] block font-medium">Mastered</span>
            <span className="text-lg font-bold text-[#5A7A5A] font-serif">{progress.masteredCards.length} cards</span>
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

      {/* Mode Switcher & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#7A7A6A] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search a word (French or English)..."
            className="w-full bg-white border border-[#DCDCCF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#34342E] placeholder-[#7A7A6A] focus:outline-none focus:border-[#5A5A40] shadow-xs"
          />
        </div>

        {/* View toggle */}
        <div className="flex bg-white p-1 rounded-xl border border-[#DCDCCF] shadow-xs">
          <button
            onClick={() => setViewMode('srs')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'srs' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#7A7A6A] hover:text-[#34342E]'
            }`}
          >
            SRS Review Mode
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'grid' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#7A7A6A] hover:text-[#34342E]'
            }`}
          >
            Grid ({filteredCards.length})
          </button>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setSrsIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#5A5A40] text-white shadow-xs'
                : 'bg-white border border-[#DCDCCF] text-[#7A7A6A] hover:text-[#34342E] hover:bg-[#F5F5F0]'
            }`}
          >
            {cat === 'All' ? 'All categories' : cat}
          </button>
        ))}
      </div>

      {/* SRS FLASHCARD INTERACTIVE 3D CAROUSEL */}
      {viewMode === 'srs' && filteredCards.length > 0 && currentSrsCard && (
        <div className="max-w-xl mx-auto space-y-6">
          {/* Card counter */}
          <div className="flex items-center justify-between text-xs text-[#7A7A6A] px-2">
            <span>Card {srsIndex + 1} of {filteredCards.length}</span>
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
                  className="p-2.5 rounded-xl bg-[#FAF7F2] text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white border border-[#E8E2D9] transition-all shadow-xs"
                  title="Listen to French pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleMastery(currentSrsCard.id);
                  }}
                  className={`p-2.5 rounded-xl transition-all border ${
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

                  <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8E2D9] text-left text-xs space-y-1">
                    <p className="text-[#34342E] italic font-medium font-serif">"{currentSrsCard.exampleFrench}"</p>
                    <p className="text-[#7A7A6A]">{currentSrsCard.exampleEnglish}</p>
                  </div>
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

      {/* GRID BROWSE MODE */}
      {viewMode === 'grid' && (
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
                        className="p-1.5 text-[#7A7A6A] hover:text-[#34342E]"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onToggleMastery(card.id)}
                        className={`p-1.5 ${isMastered ? 'text-[#D98E73]' : 'text-[#DCDCCF] hover:text-[#D98E73]'}`}
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
