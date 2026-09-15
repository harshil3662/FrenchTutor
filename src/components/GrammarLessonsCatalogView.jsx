import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  BookOpen,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Layers,
  Wand2,
  Plus,
  Flame,
  Info,
} from 'lucide-react';
import { GRAMMAR_ASPECT_CATEGORIES, GRAMMAR_ASPECT_LESSONS } from '../data/grammarAspectsData.js';
import { GrammarAspectModal } from './GrammarAspectModal.jsx';
import { playChime } from '../utils/audioUtils.js';
import { useModalTracker } from '../utils/modalState.js';
import { formatBoldText } from '../utils/textFormatter.jsx';

export const GrammarLessonsCatalogView = ({
  activeLevel,
  completedLessons,
  audioSpeed,
  units,
  onAwardXp,
  onLessonComplete,
  onSelectLesson,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [customLessons, setCustomLessons] = useState([]);

  // AI Generator state
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [customCategory, setCustomCategory] = useState('Subjunctive & Non-Finite Moods');
  const [isGenerating, setIsGenerating] = useState(false);

  useModalTracker(isGeneratorOpen);

  const handleOpenLesson = (lesson) => {
    if (onSelectLesson) {
      onSelectLesson(lesson);
    } else {
      setSelectedLesson(lesson);
    }
  };

  const baseUnits = units && units.length > 0 ? units : GRAMMAR_ASPECT_LESSONS;

  const allLessons = [...baseUnits, ...customLessons].sort((a, b) => {
    const numA = a.unitNumber ?? 999;
    const numB = b.unitNumber ?? 999;
    return numA - numB;
  });

  const filteredLessons = allLessons.filter((lesson) => {
    const matchesCategory = selectedCategory === 'All' || lesson.category === selectedCategory;
    const matchesLevel = selectedLevelFilter === 'All' || lesson.level === selectedLevelFilter;
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !searchLower ||
      lesson.title.toLowerCase().includes(searchLower) ||
      lesson.frenchTitle.toLowerCase().includes(searchLower) ||
      lesson.formula.toLowerCase().includes(searchLower) ||
      lesson.goldenRule.toLowerCase().includes(searchLower) ||
      (lesson.unitNumber && `unit ${lesson.unitNumber}`.includes(searchLower)) ||
      (lesson.unitNumber && `${lesson.unitNumber}` === searchLower);
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const handleGenerateLesson = async () => {
    if (!customPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-grammar-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aspectTitle: customPrompt,
          level: activeLevel,
          focusRule: `Category: ${customCategory}. Comprehensive grammar rules, syntax blueprint, contrast examples, and exercises.`,
        }),
      });
      let data;
      if (res.ok) {
        data = await res.json();
      } else {
        throw new Error('Server returned non-ok status');
      }

      const newLesson = {
        ...data,
        id: `custom-${Date.now()}`,
        category: data.category || customCategory,
        level: data.level || activeLevel,
      };
      setCustomLessons((prev) => [newLesson, ...prev]);
      setIsGeneratorOpen(false);
      setCustomPrompt('');
      setSelectedLesson(newLesson);
      playChime('celebrate');
      onAwardXp(20);
    } catch (e) {
      console.warn('Using custom lesson local generator fallback:', e);
      const fallbackLesson = {
        id: `custom-${Date.now()}`,
        title: customPrompt,
        frenchTitle: customPrompt,
        subtitle: `Étude approfondie de l'aspect grammatical : ${customPrompt}. Structure syntaxique et règles d'accord.`,
        category: customCategory,
        level: activeLevel,
        formula: `[Sujet] + [Syntagme grammatical] + [Verbe conjugué] + [Complément]`,
        goldenRule: `Respectez l'accord en genre et en nombre ainsi que les règles de dépendance syntaxique pour ${customPrompt}.`,
        rules: [
          `1. Identifiez la fonction grammaticale des constituants de la proposition.`,
          `2. Appliquez les désinences de mode et de temps adaptées à la catégorie (${customCategory}).`,
          `3. Vérifiez la place des pronoms clitiques et la concordance des temps.`,
        ],
        contrastExamples: [
          {
            french: `Exemple correct avec ${customPrompt}.`,
            english: `Proper usage example for ${customPrompt}.`,
            aspectNote: `Structure standard respectant les règles syntaxiques de ${customCategory}.`,
          },
          {
            french: `Exemple en contexte contrasté.`,
            english: `Contrasting contextual example.`,
            aspectNote: `Notez l'accord morphologique et l'élision de voyelle si nécessaire.`,
          },
        ],
        commonTraps: [
          `Ne pas confondre les accords avec l'auxiliaire avoir et les accords avec être ou les pronoms précédents.`,
        ],
        practiceExercises: [
          {
            id: 'ex-fb-1',
            type: 'multiple-choice',
            prompt: `Choisissez la forme correcte relative à : ${customPrompt}`,
            options: ['Forme grammaticale A (correcte)', 'Forme B', 'Forme C', 'Forme D'],
            correctAnswer: 'Forme grammaticale A (correcte)',
            hint: `Appliquez la règle d'accord vue ci-dessus.`,
            explanation: `La forme A respecte parfaitement les contraintes syntaxiques et morphologiques du français.`,
          },
        ],
      };
      setCustomLessons((prev) => [fallbackLesson, ...prev]);
      setIsGeneratorOpen(false);
      setCustomPrompt('');
      setSelectedLesson(fallbackLesson);
      playChime('celebrate');
      onAwardXp(20);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div id="grammar-lessons-catalog-view" className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-[#F0ECE1] border border-[#5A5A40]/20 text-[#5A5A40] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>French Grammatical Aspects & Syntactic Modules</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#34342E] font-serif">
            Grammar Lessons & Aspects Curriculum
          </h2>
          <p className="text-sm text-[#525248] max-w-2xl leading-relaxed">
            Master the architecture of French grammar by aspect: tense boundaries, subjunctive triggers, preceding COD agreements, pronoun syntax, and hypothetical clauses.
          </p>
        </div>

        <button
          onClick={() => setIsGeneratorOpen(true)}
          className="px-5 py-3 bg-[#5A5A40] text-white hover:bg-[#4A4A35] rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer self-start lg:self-auto"
        >
          <Sparkles className="w-4 h-4 text-[#D98E73]" />
          <span>Generate Custom Grammar Lesson</span>
        </button>
      </div>

      {/* 8 Grammatical Aspects Cards Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {GRAMMAR_ASPECT_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = allLessons.filter((l) => l.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(isSelected ? 'All' : cat.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-xs'
                  : 'bg-white text-[#34342E] border-[#E8E2D9] hover:bg-[#FAF7F2]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{cat.icon}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#F0ECE1] text-[#5A5A40]'
                  }`}
                >
                  {count} modules
                </span>
              </div>
              <div>
                <h4 className="text-xs font-bold leading-snug">{cat.name}</h4>
                <p className={`text-[11px] mt-0.5 line-clamp-1 ${isSelected ? 'text-white/80' : 'text-[#7A7A6A]'}`}>
                  {cat.badge}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#E8E2D9] rounded-2xl p-3 sm:p-4 flex flex-col lg:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full lg:w-96">
          <Search className="w-4 h-4 text-[#7A7A6A] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by unit # (e.g. 15), title, formula, or grammar rule..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] text-xs text-[#34342E] focus:outline-none focus:ring-1 focus:ring-[#5A5A40]"
          />
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar">
          {/* Level Filter */}
          <div className="flex items-center bg-[#FAF7F2] p-1 rounded-xl border border-[#E8E2D9] space-x-1">
            {['All', 'A1', 'A2', 'B1', 'B2'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevelFilter(lvl)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  selectedLevelFilter === lvl
                    ? 'bg-[#5A5A40] text-white shadow-xs'
                    : 'text-[#7A7A6A] hover:text-[#34342E]'
                }`}
              >
                {lvl === 'All' ? 'All Levels' : lvl}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedLevelFilter('All');
              setSearchQuery('');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'All' && selectedLevelFilter === 'All' && !searchQuery
                ? 'bg-[#5A5A40] text-white'
                : 'bg-[#F0ECE1] text-[#7A7A6A] hover:text-[#34342E]'
            }`}
          >
            Reset Filters ({allLessons.length})
          </button>
        </div>
      </div>

      {/* Quick Unit Jump Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        <span className="text-[11px] font-bold text-[#7A7A6A] shrink-0 mr-1">Quick Jump:</span>
        {allLessons
          .filter((l) => l.unitNumber !== undefined)
          .map((l) => {
            const isCompleted = completedLessons.includes(l.id);
            return (
              <button
                key={l.id}
                onClick={() => {
                  setSearchQuery(`Unit ${l.unitNumber}`);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 border transition-all cursor-pointer ${
                  searchQuery.toLowerCase().includes(`unit ${l.unitNumber}`) || searchQuery === `${l.unitNumber}`
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
                    : isCompleted
                    ? 'bg-[#EEF4EE] text-[#3A5A3A] border-[#5A7A5A]/30'
                    : 'bg-white text-[#525248] border-[#E8E2D9] hover:bg-[#FAF7F2]'
                }`}
                title={l.title}
              >
                U{l.unitNumber} {isCompleted && '✓'}
              </button>
            );
          })}
      </div>

      {/* Grammar Lesson Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredLessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          return (
            <div
              key={lesson.id}
              className="bg-white border border-[#E8E2D9] rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-[#5A5A40]/40 transition-all shadow-xs"
            >
              <div className="space-y-3">
                {/* Badges row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {lesson.unitNumber && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#D98E73] text-white tracking-wider">
                        Unit {lesson.unitNumber}
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#5A5A40] text-white">
                      {lesson.level}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#F0ECE1] text-[#5A5A40] border border-[#5A5A40]/20 max-w-[160px] truncate">
                      {lesson.category}
                    </span>
                  </div>
                  {isCompleted && (
                    <span className="flex items-center gap-1 text-xs font-bold text-[#3A5A3A] bg-[#EEF4EE] px-2.5 py-0.5 rounded-full border border-[#5A7A5A]/30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Mastered
                    </span>
                  )}
                </div>

                {/* Title and Subtitle */}
                <div>
                  <h3 className="text-lg font-bold text-[#34342E] font-serif leading-snug">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-[#7A7A6A] font-serif italic mt-0.5">
                    {lesson.frenchTitle}
                  </p>
                </div>

                {/* Formula Highlight */}
                {lesson.formula && (
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E2D9] space-y-1">
                    <span className="text-[9px] uppercase font-bold text-[#5A5A40] flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      Formula
                    </span>
                    <p className="text-xs font-mono font-semibold text-[#34342E] line-clamp-2">
                      {lesson.formula}
                    </p>
                  </div>
                )}

                {/* Golden Rule Preview */}
                {lesson.goldenRule && (
                  <div className="p-3 bg-[#EEF4EE] rounded-xl border border-[#5A7A5A]/20 flex items-start gap-2">
                    <Lightbulb className="w-3.5 h-3.5 text-[#3A5A3A] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#34342E] font-medium leading-relaxed line-clamp-2">
                      {formatBoldText(lesson.goldenRule)}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-[#E8E2D9] flex items-center justify-between">
                <span className="text-xs text-[#7A7A6A] font-medium">
                  {lesson.practiceExercises?.length || 0} Drills • +20 XP
                </span>
                <button
                  onClick={() => handleOpenLesson(lesson)}
                  className="px-4 py-2 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <span>Study & Practice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-[#E8E2D9] p-8 space-y-3">
          <BookOpen className="w-10 h-10 text-[#7A7A6A] mx-auto" />
          <h3 className="text-base font-bold text-[#34342E] font-serif">
            No grammar lessons match your filter
          </h3>
          <p className="text-xs text-[#7A7A6A] max-w-sm mx-auto">
            Try adjusting your search query or click "Generate Custom Grammar Lesson" to have Gemini create one on this exact rule.
          </p>
        </div>
      )}

      {/* AI Custom Lesson Generator Modal */}
      {isGeneratorOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-xl p-6 sm:p-8 space-y-6 shadow-2xl border border-[#DCDCCF]">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1.5 bg-[#F0ECE1] text-[#5A5A40] px-3 py-1 rounded-full text-xs font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#D98E73]" />
                <span>AI Grammar Lesson Atelier</span>
              </div>
              <h3 className="text-xl font-bold text-[#34342E] font-serif">
                Generate Custom Grammar Aspect Module
              </h3>
              <p className="text-xs text-[#525248]">
                Enter any French grammar rule, tense comparison, or syntactic question. Gemini will generate a full lesson with formula blueprints, traps, and exercises.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#7A7A6A]">
                  Grammatical Aspect / Rule Topic:
                </label>
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g. L'accord du participe passé avec le pronom 'en' ou Les verbes pronominaux réciproques"
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D9] text-xs sm:text-sm text-[#34342E] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#7A7A6A]">
                  Grammatical Category:
                </label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D9] text-xs sm:text-sm text-[#34342E] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
                >
                  {GRAMMAR_ASPECT_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sample quick prompts */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-[#7A7A6A]">
                  Quick Suggestions:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Différence entre C'est et Il est",
                    "Le Subjonctif avec bien que vs parce que",
                    "L'accord du participe passé avec avoir et COD",
                    "Pronoms relatifs composés : lequel, auquel, duquel",
                    "La concordance des temps au discours indirect",
                  ].map((sugg, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCustomPrompt(sugg)}
                      className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] border border-[#E8E2D9] text-[11px] text-[#525248] hover:bg-[#EAE6DF] transition-all cursor-pointer"
                    >
                      {sugg}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsGeneratorOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-[#DCDCCF] text-xs font-bold text-[#7A7A6A] hover:text-[#34342E] transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateLesson}
                disabled={isGenerating || !customPrompt.trim()}
                className="px-6 py-2.5 rounded-xl bg-[#5A5A40] hover:bg-[#4A4A35] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-[#D98E73]" />
                <span>{isGenerating ? 'Synthesizing Lesson...' : 'Generate Lesson'}</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Lesson Modal & Drill Engine */}
      {selectedLesson && (
        <GrammarAspectModal
          lesson={selectedLesson}
          isOpen={Boolean(selectedLesson)}
          audioSpeed={audioSpeed}
          onClose={() => setSelectedLesson(null)}
          onComplete={(lessonId, earnedXp) => {
            onLessonComplete(lessonId, earnedXp);
          }}
        />
      )}
    </div>
  );
};
