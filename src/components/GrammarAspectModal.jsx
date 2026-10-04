import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Volume2,
  Sparkles,
  HelpCircle,
  Trophy,
  ArrowRight,
  RotateCcw,
  Layers,
  Table as TableIcon,
  FileText,
  BrainCircuit,
  AlertTriangle,
  Languages,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useModalTracker } from '../utils/modalState.js';
import {
  getStoredAiPracticeExercises,
  saveStoredAiPracticeExercises,
  clearStoredAiPracticeExercises,
} from '../utils/curriculumStore.js';
import { formatBoldText } from '../utils/textFormatter.jsx';

export const GrammarAspectModal = ({
  lesson,
  isOpen,
  audioSpeed,
  onClose,
  onComplete,
}) => {
  useModalTracker(Boolean(isOpen && lesson));
  const scrollContainerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('guide');
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [currentExIdx, setCurrentExIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isLessonFinished, setIsLessonFinished] = useState(false);
  const [isQuestionTranslated, setIsQuestionTranslated] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationMap, setTranslationMap] = useState({});
  const [aiExercises, setAiExercises] = useState(null);
  const [aiExercisesLessonId, setAiExercisesLessonId] = useState(null);
  const [isGeneratingExercises, setIsGeneratingExercises] = useState(false);
  const [exerciseGenerationError, setExerciseGenerationError] = useState('');
  const exerciseRequestRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Reset state when lesson changes
  useEffect(() => {
    exerciseRequestRef.current?.abort();
    const savedExercises = getStoredAiPracticeExercises(lesson?.id);
    setActiveTopicIndex(0);
    setActiveTab('guide');
    setCurrentExIdx(0);
    setSelectedAnswer('');
    setShowHint(false);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setScore(0);
    setIsLessonFinished(false);
    setIsQuestionTranslated(false);
    setAiExercises(savedExercises);
    setAiExercisesLessonId(savedExercises ? lesson?.id : null);
    setIsGeneratingExercises(false);
    setExerciseGenerationError('');
  }, [lesson?.id]);

  useEffect(() => () => exerciseRequestRef.current?.abort(), []);

  // Scroll to top whenever topic or tab changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeTopicIndex, activeTab]);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  if (!isOpen || !lesson) return null;

  // Support multi-topic units
  const topicsList = Array.isArray(lesson?.topics) && lesson.topics.length > 0 ? lesson.topics : null;
  const hasMultipleTopics = Boolean(topicsList && topicsList.length > 1);
  const activeTopic = hasMultipleTopics ? (topicsList[activeTopicIndex] || topicsList[0]) : lesson;

  // Exercises are ALWAYS dynamic AI Quiz questions
  const exercises = (aiExercisesLessonId === lesson.id && aiExercises?.length)
    ? aiExercises
    : [];
  const currentExercise = exercises[currentExIdx];

  // Normalize formula for active topic
  const formulaText = activeTopic?.formula || activeTopic?.syntaxFormula || (!hasMultipleTopics ? (lesson.formula || lesson.syntaxFormula) : null);

  // Normalize golden rule for active topic
  const goldenRuleText = activeTopic?.goldenRule || activeTopic?.golden_rule || (!hasMultipleTopics ? (lesson.goldenRule || lesson.golden_rule) : null);

  // Normalize detailed description from active topic
  const rawDetailed = activeTopic?.detailedDescription || activeTopic?.description || activeTopic?.explanation || activeTopic?.subtitle || (!hasMultipleTopics ? (lesson.detailedDescription || lesson.description || lesson.explanation || lesson.subtitle) : null);
  const detailedParagraphs = Array.isArray(rawDetailed) && rawDetailed.length > 0
    ? rawDetailed
    : typeof rawDetailed === 'string' && rawDetailed.trim()
    ? rawDetailed.split('\n\n').filter(Boolean)
    : [];

  // Normalize tables from active topic
  const rawTables = activeTopic?.tables || activeTopic?.table || (!hasMultipleTopics ? (lesson.tables || lesson.table) : null);
  const tableList = Array.isArray(rawTables)
    ? rawTables
    : rawTables
    ? [rawTables]
    : [];

  // Normalize examples from active topic (displayed at last)
  const rawExamples = activeTopic?.contrastExamples || activeTopic?.examples || (!hasMultipleTopics ? (lesson.contrastExamples || lesson.examples) : null);
  const lessonExamples = Array.isArray(rawExamples) && rawExamples.length > 0
    ? rawExamples
    : [];

  const handleAudioPlay = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = audioSpeed || 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const handleGenerateAiExercises = async (forceFresh = false) => {
    if (isGeneratingExercises) return;

    if (!forceFresh) {
      const savedExercises = getStoredAiPracticeExercises(lesson.id);
      if (savedExercises && savedExercises.length) {
        setAiExercises(savedExercises);
        setAiExercisesLessonId(lesson.id);
        setCurrentExIdx(0);
        setSelectedAnswer('');
        setIsAnswerChecked(false);
        setIsCorrect(false);
        setScore(0);
        setIsLessonFinished(false);
        setExerciseGenerationError('');
        return;
      }
    } else {
      clearStoredAiPracticeExercises(lesson.id);
    }

    const controller = new AbortController();
    exerciseRequestRef.current = controller;
    setIsGeneratingExercises(true);
    setExerciseGenerationError('');
    setCurrentExIdx(0);
    setSelectedAnswer('');
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setScore(0);
    setIsLessonFinished(false);

    try {
      const res = await fetch('/api/ai/generate-quiz', {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: lesson.title || lesson.frenchTitle,
          level: lesson.level || 'A2',
          questionCount: 4,
          unitContext: {
            unitNumber: lesson.unitNumber,
            category: lesson.category,
            frenchTitle: lesson.frenchTitle,
            subtitle: lesson.subtitle,
            formula: lesson.formula,
            goldenRule: lesson.goldenRule,
            commonTraps: lesson.commonTraps,
            rules: lesson.rules,
            topics: lesson.topics,
          },
        }),
      });
      const data = await res.json();
      const questions = Array.isArray(data.questions)
        ? data.questions.filter((question) =>
            typeof question?.prompt === 'string' &&
            question.prompt.trim() &&
            Array.isArray(question.options) &&
            question.options.length >= 2 &&
            question.options.every((option) => typeof option === 'string') &&
            typeof question.correctAnswer === 'string' &&
            question.options.includes(question.correctAnswer)
          )
        : [];
      if (!res.ok || !questions.length) {
        throw new Error(data.error || 'Could not generate AI quiz questions.');
      }

      const generatedExercises = questions.map((question, index) => ({
        id: question.id || `ai-${index + 1}`,
        type: 'multiple-choice',
        prompt: question.prompt,
        promptEnglish: question.promptEnglish || '',
        options: question.options,
        correctAnswer: question.correctAnswer,
        hint: question.hint || question.explanation || '',
        explanation: question.explanation || 'Review the grammar rule and apply it to the sentence.',
      }));
      saveStoredAiPracticeExercises(lesson.id, generatedExercises);
      setAiExercises(generatedExercises);
      setAiExercisesLessonId(lesson.id);
      setCurrentExIdx(0);
      setIsQuestionTranslated(false);
      setExerciseGenerationError('');
    } catch (error) {
      if (controller.signal.aborted) return;
      setExerciseGenerationError(error.message || 'Could not generate AI quiz questions.');
    } finally {
      if (!controller.signal.aborted) setIsGeneratingExercises(false);
    }
  };

  const handleToggleTranslation = async () => {
    if (!currentExercise) return;
    if (isQuestionTranslated) {
      setIsQuestionTranslated(false);
      return;
    }

    if (currentExercise.promptEnglish) {
      setIsQuestionTranslated(true);
      return;
    }

    const cached = translationMap[currentExercise.prompt];
    if (cached) {
      setIsQuestionTranslated(true);
      return;
    }

    setIsTranslating(true);
    try {
      const res = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: currentExercise.prompt,
          targetLang: 'en',
        }),
      });
      const data = await res.json();
      if (data?.translatedText) {
        setTranslationMap((prev) => ({
          ...prev,
          [currentExercise.prompt]: data.translatedText,
        }));
        setIsQuestionTranslated(true);
      }
    } catch (e) {
      console.warn('Failed to translate question:', e);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleOpenAiQuiz = () => {
    setActiveTab('quiz');
    scrollToTop();
    setIsQuestionTranslated(false);
    if (aiExercisesLessonId !== lesson.id || !aiExercises?.length) {
      handleGenerateAiExercises();
    }
  };

  const handleCheckAnswer = () => {
    if (!currentExercise || !selectedAnswer) return;

    const cleanUser = selectedAnswer.trim().toLowerCase().replace(/[.,!?;:]/g, '');
    const cleanCorrect = currentExercise.correctAnswer.trim().toLowerCase().replace(/[.,!?;:]/g, '');

    const correct = cleanUser === cleanCorrect;
    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextExercise = () => {
    if (!currentExercise) {
      setCurrentExIdx(0);
      setSelectedAnswer('');
      setShowHint(false);
      setIsAnswerChecked(false);
      setIsCorrect(false);
      setScore(0);
      setIsLessonFinished(false);
      return;
    }

    setIsAnswerChecked(false);
    setSelectedAnswer('');
    setShowHint(false);
    setIsQuestionTranslated(false);

    if (currentExIdx < exercises.length - 1) {
      setCurrentExIdx((prev) => prev + 1);
    } else {
      setIsLessonFinished(true);
      const earnedXp = Math.max(15, (score + (isCorrect ? 1 : 0)) * 10);
      try {
        confetti({ particleCount: 65, spread: 60, origin: { y: 0.6 } });
      } catch {}
      onComplete(lesson.id, earnedXp);
    }
  };

  const handleResetExercises = () => {
    setCurrentExIdx(0);
    setSelectedAnswer('');
    setShowHint(false);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setScore(0);
    setIsLessonFinished(false);
    setIsQuestionTranslated(false);
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 overscroll-contain">
      <div
        id="grammar-aspect-modal"
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-[#DCDCCF] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-[#FAF7F2] border-b border-[#E8E2D9] flex items-start justify-between shrink-0">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#5A5A40] text-white">
                {lesson.level}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#F0ECE1] text-[#5A5A40] border border-[#5A5A40]/20">
                {lesson.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#FAF3EE] text-[#9C4B2E] border border-[#D98E73]/20 flex items-center gap-1">
                <BrainCircuit className="w-3 h-3" />
                <span>AI Quiz Enabled</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#34342E] font-serif">
              {lesson.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7A6A] font-serif italic">
              {lesson.frenchTitle}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close grammar modal"
            className="p-2 rounded-full hover:bg-[#EAE6DF] text-[#7A7A6A] hover:text-[#34342E] transition-all cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8E2D9] bg-[#F5F5F0] px-6">
          <button
            id="tab-grammar-guide"
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'guide'
                ? 'border-[#5A5A40] text-[#5A5A40] bg-white'
                : 'border-transparent text-[#7A7A6A] hover:text-[#34342E]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Grammar Rules & Blueprint</span>
            {hasMultipleTopics && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] text-[10px] font-bold">
                {topicsList.length} topics
              </span>
            )}
          </button>
          <button
            id="tab-unit-ai-quiz"
            onClick={handleOpenAiQuiz}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'quiz'
                ? 'border-[#5A5A40] text-[#5A5A40] bg-white'
                : 'border-transparent text-[#7A7A6A] hover:text-[#34342E]'
            }`}
          >
            <BrainCircuit className="w-4 h-4 text-[#5A5A40]" />
            <span>Unit AI Quiz {exercises.length ? `(${exercises.length})` : ''}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div ref={scrollContainerRef} className="p-6 sm:p-8 overflow-y-auto overscroll-contain flex-1 space-y-6">
          {activeTab === 'guide' ? (
            <div className="space-y-6 animate-in fade-in">
              {/* Sub-Topics Segmented Selector (When Unit Has Multiple Topics) */}
              {hasMultipleTopics && (
                <div className="bg-[#FAF7F2] border border-[#E8E2D9] p-3 rounded-2xl space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#7A7A6A] px-1">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#5A5A40]" />
                      Unit Topics ({topicsList.length})
                    </span>
                    <span className="text-[11px] font-medium text-[#5A5A40]">
                      Topic {activeTopicIndex + 1} of {topicsList.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                    {topicsList.map((top, idx) => (
                      <button
                        key={top.id || idx}
                        onClick={() => {
                          setActiveTopicIndex(idx);
                          scrollToTop();
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                          activeTopicIndex === idx
                            ? 'bg-[#5A5A40] text-white shadow-xs'
                            : 'bg-white text-[#5A5A40] hover:bg-[#F0ECE1] border border-[#E8E2D9]'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          activeTopicIndex === idx ? 'bg-white/20 text-white' : 'bg-[#5A5A40]/10 text-[#5A5A40]'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="whitespace-nowrap">{top.title || `Topic ${idx + 1}`}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Topic Header & Jump to AI Quiz CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E8E2D9]">
                <div>
                  <h3 className="text-lg font-bold text-[#34342E] font-serif">
                    {activeTopic?.title || lesson.title}
                  </h3>
                  {activeTopic?.subtitle && (
                    <p className="text-xs text-[#7A7A6A] mt-0.5">
                      {activeTopic.subtitle}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleOpenAiQuiz}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#5A5A40] border border-[#5A5A40]/25 text-xs font-bold transition-all shadow-2xs hover:shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  <BrainCircuit className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>Take AI Quiz →</span>
                </button>
              </div>

              {/* 1. Structural Formula Blueprint */}
              {formulaText && (
                <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D9] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#5A5A40] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      Syntax Formula Blueprint
                    </span>
                    <button
                      onClick={() => handleAudioPlay(formulaText)}
                      className="p-1 text-[#7A7A6A] hover:text-[#34342E] rounded-md transition-colors cursor-pointer"
                      title="Listen"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm sm:text-base font-mono font-semibold text-[#34342E] bg-white p-3 rounded-xl border border-[#DCDCCF]/80">
                    {formulaText}
                  </div>
                </div>
              )}

              {/* 2. Golden Rule */}
              {goldenRuleText && (
                <div className="p-5 bg-[#EEF4EE] rounded-2xl border border-[#5A7A5A]/30 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-[#3A5A3A] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#3A5A3A]">
                      Golden Grammar Rule
                    </h4>
                    <p className="text-sm text-[#34342E] font-medium leading-relaxed">
                      {formatBoldText(goldenRuleText)}
                    </p>
                  </div>
                </div>
              )}

              {/* 3. Detailed Pedagogical Descriptions */}
              {detailedParagraphs.length > 0 && (
                <div className="space-y-3 bg-[#FAF9F5] p-5 rounded-2xl border border-[#E8E2D9]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7A6A] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#5A5A40]" />
                    Pedagogical Explanation
                  </h4>
                  <div className="space-y-3 text-sm text-[#404038] leading-relaxed">
                    {detailedParagraphs.map((para, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {formatBoldText(para)}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Structured Rules List */}
              {activeTopic?.rules && activeTopic.rules.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7A6A]">
                    Key Morphosyntactic Principles
                  </h4>
                  <div className="grid gap-2.5">
                    {activeTopic.rules.map((rule, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white border border-[#E8E2D9] flex items-start gap-3 shadow-2xs"
                      >
                        <span className="w-6 h-6 rounded-full bg-[#F0ECE1] text-[#5A5A40] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-[#34342E] leading-relaxed">
                          {formatBoldText(rule)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Conjugation / Aspect Tables */}
              {tableList.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7A6A] flex items-center gap-1.5">
                    <TableIcon className="w-3.5 h-3.5 text-[#5A5A40]" />
                    Conjugation & Syntactic Breakdown Tables
                  </h4>
                  <div className="grid gap-4">
                    {tableList.map((tbl, tIdx) => (
                      <div
                        key={tIdx}
                        className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-2xs"
                      >
                        {tbl.title && (
                          <div className="px-4 py-2.5 bg-[#F0ECE1] border-b border-[#E8E2D9] font-bold text-xs text-[#5A5A40]">
                            {tbl.title}
                          </div>
                        )}
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs sm:text-sm">
                            {tbl.headers && (
                              <thead className="bg-[#FAF7F2] border-b border-[#E8E2D9] text-[#7A7A6A]">
                                <tr>
                                  {tbl.headers.map((h, hIdx) => (
                                    <th key={hIdx} className="px-4 py-2 font-semibold">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                            )}
                            <tbody className="divide-y divide-[#E8E2D9]">
                              {tbl.rows?.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-[#FAF9F5] transition-colors">
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="px-4 py-2.5 text-[#34342E] font-medium">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Contrast Examples */}
              {lessonExamples.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7A6A]">
                    Contrasting Exemplars & Usage in Context
                  </h4>
                  <div className="grid gap-3">
                    {lessonExamples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white border border-[#E8E2D9] space-y-1.5 shadow-2xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm sm:text-base font-bold text-[#34342E] font-serif">
                            {ex.french}
                          </span>
                          <button
                            onClick={() => handleAudioPlay(ex.french)}
                            className="p-1 text-[#7A7A6A] hover:text-[#34342E] rounded transition-colors cursor-pointer"
                            title="Listen"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-[#7A7A6A] italic">
                          "{ex.english}"
                        </p>
                        {ex.aspectNote && (
                          <div className="pt-1.5 border-t border-[#E8E2D9]/60 text-xs text-[#5A5A40] font-medium">
                            💡 {ex.aspectNote}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. Common Traps & Pitfalls */}
              {activeTopic?.commonTraps && activeTopic.commonTraps.length > 0 && (
                <div className="p-5 bg-[#FAF3EE] rounded-2xl border border-[#D98E73]/30 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C05C54]">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Watch Out: Frequent Learner Traps</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#525248] list-disc list-inside">
                    {activeTopic.commonTraps.map((trap, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {formatBoldText(trap)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bottom Actions: Next Topic or Start AI Quiz */}
              <div className="pt-4 border-t border-[#E8E2D9] flex justify-between items-center">
                {hasMultipleTopics && activeTopicIndex > 0 ? (
                  <button
                    onClick={() => {
                      setActiveTopicIndex((prev) => prev - 1);
                      scrollToTop();
                    }}
                    className="px-4 py-2 text-xs font-semibold text-[#7A7A6A] hover:text-[#34342E] cursor-pointer"
                  >
                    ← Previous Topic
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-3">
                  {hasMultipleTopics && activeTopicIndex < topicsList.length - 1 ? (
                    <button
                      onClick={() => {
                        setActiveTopicIndex((prev) => prev + 1);
                        scrollToTop();
                      }}
                      className="px-5 py-2.5 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-xl font-bold text-xs shadow-xs flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Next Topic: {topicsList[activeTopicIndex + 1]?.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      id="start-unit-ai-quiz-btn"
                      onClick={handleOpenAiQuiz}
                      className="px-6 py-2.5 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-xl font-bold text-xs shadow-xs flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <BrainCircuit className="w-4 h-4 text-white" />
                      <span>Start Unit AI Quiz</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* ACTIVE TAB: UNIT AI QUIZ */
            <div className="space-y-6 animate-in fade-in">
              {/* Header inside AI Quiz */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E2D9]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#F0ECE1] text-[#5A5A40] rounded-xl border border-[#5A5A40]/15">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#34342E] font-serif">
                      Unit AI Quiz: {lesson.title}
                    </h4>
                    <p className="text-xs text-[#7A7A6A]">
                      Interactive quiz testing this unit's exact grammar rules & formula
                    </p>
                  </div>
                </div>

                <button
                  id="regenerate-ai-quiz-btn"
                  onClick={() => handleGenerateAiExercises(true)}
                  disabled={isGeneratingExercises}
                  className="px-3.5 py-1.5 bg-white hover:bg-[#FAF7F2] text-[#5A5A40] border border-[#DCDCCF] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs disabled:opacity-50 self-start sm:self-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D98E73]" />
                  <span>Generate New AI Questions</span>
                </button>
              </div>

              {isGeneratingExercises ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-12 h-12 border-4 border-[#5A5A40] border-t-transparent rounded-full animate-spin mx-auto" />
                  <div className="space-y-1">
                    <p className="text-base font-bold text-[#34342E] font-serif">
                      Generating your Quiz questions...
                    </p>
                    <p className="text-xs text-[#7A7A6A] max-w-sm mx-auto">
                      Formulating questions tailored to {lesson.frenchTitle || lesson.title} ({lesson.level})
                    </p>
                  </div>
                </div>
              ) : exerciseGenerationError ? (
                <div className="text-center py-12 space-y-4 bg-[#FAF3EE] rounded-3xl p-8 border border-[#D98E73]/30">
                  <AlertTriangle className="w-10 h-10 text-[#C05C54] mx-auto" />
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-[#34342E] font-serif">
                      Could not generate AI quiz
                    </h4>
                    <p className="text-xs text-[#7A4A3A]">{exerciseGenerationError}</p>
                  </div>
                  <button
                    onClick={() => handleGenerateAiExercises(true)}
                    className="px-5 py-2.5 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-xl text-xs font-bold flex items-center gap-2 mx-auto cursor-pointer shadow-xs"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Try Generating Again</span>
                  </button>
                </div>
              ) : isLessonFinished ? (
                /* Quiz Finished Screen */
                <div className="text-center py-10 space-y-5">
                  <div className="w-20 h-20 bg-[#EEF4EE] text-[#3A5A3A] rounded-full flex items-center justify-center mx-auto border-2 border-[#5A7A5A] shadow-xs">
                    <Trophy className="w-10 h-10" />
                  </div>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 bg-[#F0ECE1] text-[#5A5A40] px-3 py-1 rounded-full text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-[#D98E73]" />
                      <span>Unit AI Quiz Completed</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#34342E] font-serif">
                      Félicitations ! Grammar Aspect Mastered
                    </h3>
                    <p className="text-sm text-[#7A7A6A] max-w-md mx-auto">
                      You scored <strong>{score} / {exercises.length}</strong> on this unit's AI quiz and earned{' '}
                      <strong className="text-[#5A5A40]">+{Math.max(15, score * 10)} XP</strong>.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 pt-3">
                    <button
                      onClick={() => handleGenerateAiExercises(true)}
                      className="px-5 py-2.5 bg-white border border-[#DCDCCF] hover:bg-[#FAF7F2] text-[#5A5A40] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    >
                      <Sparkles className="w-4 h-4 text-[#D98E73]" />
                      <span>Generate New AI Quiz</span>
                    </button>
                    <button
                      onClick={handleResetExercises}
                      className="px-5 py-2.5 bg-white border border-[#DCDCCF] text-[#34342E] rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#FAF7F2] transition-all cursor-pointer shadow-xs"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Retake Current Quiz</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-[#5A5A40] text-white rounded-xl text-xs font-bold hover:bg-[#4A4A35] transition-all cursor-pointer shadow-xs"
                    >
                      <span>Finish & Close</span>
                    </button>
                  </div>
                </div>
              ) : currentExercise ? (
                /* Active Exercise Interface */
                <div className="space-y-6">
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between text-xs text-[#7A7A6A]">
                    <span className="font-semibold text-[#5A5A40] flex items-center gap-1.5">
                      <BrainCircuit className="w-3.5 h-3.5" />
                      Question {currentExIdx + 1} of {exercises.length}
                    </span>
                    <span>Score: {score}</span>
                  </div>
                  <div className="w-full bg-[#EAE6DF] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#5A5A40] h-full transition-all duration-300"
                      style={{ width: `${((currentExIdx + 1) / exercises.length) * 100}%` }}
                    />
                  </div>

                  {/* Question Prompt */}
                  <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D9] space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase font-bold tracking-wider text-[#5A5A40] bg-[#F0ECE1] px-2.5 py-0.5 rounded-md border border-[#5A5A40]/15">
                          {isQuestionTranslated ? 'English Translation' : 'French Grammar Challenge'}
                        </span>
                        {isQuestionTranslated && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9C4B2E] bg-[#FAF3EE] px-2 py-0.5 rounded-md border border-[#D98E73]/20">
                            EN
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          id="toggle-quiz-translation-btn"
                          onClick={handleToggleTranslation}
                          disabled={isTranslating}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                            isQuestionTranslated
                              ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-2xs'
                              : 'bg-white hover:bg-[#FAF7F2] text-[#5A5A40] border-[#DCDCCF]'
                          }`}
                          title={isQuestionTranslated ? 'Translate back to French' : 'Translate question into English'}
                          aria-label={isQuestionTranslated ? 'Translate back to French' : 'Translate question into English'}
                        >
                          <Languages className="w-3.5 h-3.5" />
                          <span className="text-[11px]">{isTranslating ? '...' : isQuestionTranslated ? 'French' : 'Translate'}</span>
                        </button>

                        <button
                          onClick={() => handleAudioPlay(currentExercise.prompt)}
                          className="p-1.5 text-[#7A7A6A] hover:text-[#34342E] rounded-lg transition-colors cursor-pointer"
                          title="Listen to French prompt"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-[#34342E] font-serif leading-snug">
                      {isQuestionTranslated
                        ? (currentExercise.promptEnglish || translationMap[currentExercise.prompt] || currentExercise.prompt)
                        : currentExercise.prompt}
                    </div>
                  </div>

                  {/* Multiple Choice Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {currentExercise.options?.map((opt, idx) => {
                      const isSelected = selectedAnswer === opt;
                      const letter = String.fromCharCode(65 + idx);
                      return (
                        <button
                          key={idx}
                          id={`quiz-option-${idx}`}
                          disabled={isAnswerChecked}
                          onClick={() => setSelectedAnswer(opt)}
                          className={`p-4 rounded-2xl border text-left text-sm sm:text-base font-semibold transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-xs'
                              : 'bg-white text-[#34342E] border-[#E8E2D9] hover:bg-[#FAF7F2]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-[#F0ECE1] text-[#5A5A40]'
                            }`}>
                              {letter}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-5 h-5 shrink-0 text-white" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Hint Toggle */}
                  {currentExercise.hint && (
                    <div>
                      <button
                        onClick={() => setShowHint(!showHint)}
                        className="text-xs sm:text-sm font-bold text-[#D98E73] flex items-center gap-1.5 hover:underline cursor-pointer"
                      >
                        <HelpCircle className="w-4 h-4" />
                        {showHint ? 'Hide Grammar Hint' : 'Need a Grammar Hint?'}
                      </button>
                      {showHint && (
                        <div className="p-3.5 mt-2 bg-[#FAF3EE] border border-[#D98E73]/30 rounded-xl text-xs sm:text-sm text-[#525248]">
                          💡 {currentExercise.hint}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Feedback Explanation */}
                  {isAnswerChecked && (
                    <div
                      className={`p-5 rounded-2xl border text-sm sm:text-base space-y-2 animate-in fade-in ${
                        isCorrect
                          ? 'bg-[#EEF4EE] border-[#5A7A5A]/40 text-[#3A5A3A]'
                          : 'bg-[#FAF3EE] border-[#D98E73]/40 text-[#525248]'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-base">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-[#5A7A5A]" />
                            <span>Correct! Excellent grammatical precision.</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-5 h-5 text-[#C05C54]" />
                            <span>Incorrect. Correct Answer: {currentExercise.correctAnswer}</span>
                          </>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed">{currentExercise.explanation}</p>
                    </div>
                  )}

                  {/* Exercise Action Buttons */}
                  <div className="flex justify-end gap-3 pt-2">
                    {!isAnswerChecked ? (
                      <button
                        id="quiz-check-answer-btn"
                        onClick={handleCheckAnswer}
                        disabled={!selectedAnswer}
                        className="px-6 py-3 bg-[#5A5A40] text-white rounded-2xl font-bold text-xs shadow-sm hover:bg-[#4A4A35] transition-all cursor-pointer disabled:opacity-50"
                      >
                        Check Answer
                      </button>
                    ) : (
                      <button
                        id="quiz-next-question-btn"
                        onClick={handleNextExercise}
                        className="px-6 py-3 bg-[#5A5A40] text-white rounded-2xl font-bold text-xs shadow-sm hover:bg-[#4A4A35] transition-all cursor-pointer flex items-center gap-2"
                      >
                        <span>{currentExIdx < exercises.length - 1 ? 'Next Question' : 'Complete Quiz & View Score'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-4 bg-white rounded-3xl border border-[#E8E2D9] p-8">
                  <BrainCircuit className="w-10 h-10 text-[#5A5A40] mx-auto" />
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-[#34342E] font-serif">
                      Ready for the Unit AI Quiz?
                    </h4>
                    <p className="text-xs text-[#7A7A6A] max-w-sm mx-auto">
                      Test your understanding of {lesson.title} with an AI-generated quiz customized to this unit.
                    </p>
                  </div>
                  <button
                    onClick={() => handleGenerateAiExercises(false)}
                    className="px-6 py-2.5 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-xl text-xs font-bold flex items-center gap-2 mx-auto cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-4 h-4 text-[#D98E73]" />
                    <span>Launch Unit AI Quiz</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};
