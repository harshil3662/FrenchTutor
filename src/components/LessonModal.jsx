import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Layers,
  Lightbulb,
  RotateCcw,
  Table as TableIcon,
  FileText,
  BrainCircuit,
  AlertTriangle,
  Languages,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakFrench, playChime } from '../utils/audioUtils.js';
import { useModalTracker } from '../utils/modalState.js';
import {
  getStoredAiPracticeExercises,
  saveStoredAiPracticeExercises,
  clearStoredAiPracticeExercises,
} from '../utils/curriculumStore.js';
import { formatBoldText } from '../utils/textFormatter.jsx';

export const LessonModal = ({
  lesson,
  onClose,
  onComplete,
  audioSpeed,
}) => {
  useModalTracker(Boolean(lesson));
  const scrollContainerRef = useRef(null);
  const [phase, setPhase] = useState('grammar');
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isQuestionTranslated, setIsQuestionTranslated] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationMap, setTranslationMap] = useState({});

  // AI Quiz generation state
  const [aiExercises, setAiExercises] = useState(null);
  const [aiExercisesLessonId, setAiExercisesLessonId] = useState(null);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [quizError, setQuizError] = useState('');
  const quizRequestRef = useRef(null);

  // Lock background scroll when lesson modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Reset state when lesson changes
  useEffect(() => {
    quizRequestRef.current?.abort();
    const saved = getStoredAiPracticeExercises(lesson?.id);
    setActiveTopicIndex(0);
    setPhase('grammar');
    setCurrentExIndex(0);
    setSelectedAnswer(null);
    setHasChecked(false);
    setIsCorrect(false);
    setScore(0);
    setShowHint(false);
    setIsQuestionTranslated(false);
    setAiExercises(saved);
    setAiExercisesLessonId(saved ? lesson?.id : null);
    setIsGeneratingQuiz(false);
    setQuizError('');
  }, [lesson?.id]);

  useEffect(() => () => quizRequestRef.current?.abort(), []);

  // Scroll to top whenever topic or phase changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeTopicIndex, phase]);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  if (!lesson) return null;

  // Support multi-topic units
  const topicsList = Array.isArray(lesson?.topics) && lesson.topics.length > 0 ? lesson.topics : null;
  const hasMultipleTopics = Boolean(topicsList && topicsList.length > 1);
  const activeTopic = hasMultipleTopics ? (topicsList[activeTopicIndex] || topicsList[0]) : lesson;

  // Resolve vocabulary
  const vocabList = Array.isArray(lesson?.vocabulary) && lesson.vocabulary.length > 0
    ? lesson.vocabulary
    : Array.isArray(lesson?.topics)
    ? lesson.topics.flatMap((t) => t.vocabulary || [])
    : [];

  // Exercises are ALWAYS dynamic AI Quiz questions
  const exercises = (aiExercisesLessonId === lesson?.id && aiExercises?.length)
    ? aiExercises
    : [];
  const currentExercise = exercises[currentExIndex];

  // Normalize formula for active topic
  const formulaText = activeTopic?.formula || activeTopic?.syntaxFormula || activeTopic?.grammarTip?.formula || (!hasMultipleTopics ? (lesson?.formula || lesson?.syntaxFormula || lesson?.grammarTip?.formula) : null);

  // Normalize golden rule for active topic
  const goldenRuleText = activeTopic?.goldenRule || activeTopic?.golden_rule || activeTopic?.grammarTip?.goldenRule || (!hasMultipleTopics ? (lesson?.goldenRule || lesson?.golden_rule || lesson?.grammarTip?.goldenRule) : null);

  // Normalize detailed description from active topic
  const rawDetailed = activeTopic?.detailedDescription || activeTopic?.description || activeTopic?.explanation || activeTopic?.subtitle || (!hasMultipleTopics ? (lesson?.detailedDescription || lesson?.description || lesson?.explanation || lesson?.subtitle) : null);
  const detailedParagraphs = Array.isArray(rawDetailed) && rawDetailed.length > 0
    ? rawDetailed
    : typeof rawDetailed === 'string' && rawDetailed.trim()
    ? rawDetailed.split('\n\n').filter(Boolean)
    : [];

  // Normalize tables from active topic
  const rawTables = activeTopic?.tables || activeTopic?.table || (!hasMultipleTopics ? (lesson?.tables || lesson?.table) : null);
  const tableList = Array.isArray(rawTables)
    ? rawTables
    : rawTables
    ? [rawTables]
    : [];

  // Normalize examples from active topic
  const rawExamples = activeTopic?.contrastExamples || activeTopic?.examples || activeTopic?.grammarTip?.examples || (!hasMultipleTopics ? (lesson?.contrastExamples || lesson?.examples || lesson?.grammarTip?.examples) : null);
  const lessonExamples = Array.isArray(rawExamples) && rawExamples.length > 0
    ? rawExamples
    : [];

  const handleAudioPlay = (text) => {
    speakFrench(text, audioSpeed || 0.95);
  };

  const handleGenerateAiQuiz = async (forceFresh = false) => {
    if (isGeneratingQuiz) return;

    if (!forceFresh) {
      const saved = getStoredAiPracticeExercises(lesson.id);
      if (saved && saved.length) {
        setAiExercises(saved);
        setAiExercisesLessonId(lesson.id);
        setCurrentExIndex(0);
        setSelectedAnswer(null);
        setHasChecked(false);
        setIsCorrect(false);
        setScore(0);
        setQuizError('');
        return;
      }
    } else {
      clearStoredAiPracticeExercises(lesson.id);
    }

    const controller = new AbortController();
    quizRequestRef.current = controller;
    setIsGeneratingQuiz(true);
    setQuizError('');
    setCurrentExIndex(0);
    setSelectedAnswer(null);
    setHasChecked(false);
    setIsCorrect(false);
    setScore(0);

    try {
      const res = await fetch('/api/ai/generate-quiz', {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: lesson.title,
          level: lesson.level || 'A1',
          questionCount: 4,
          unitContext: {
            unitNumber: lesson.unit,
            category: lesson.category,
            subtitle: lesson.subtitle,
            formula: formulaText,
            goldenRule: goldenRuleText,
            vocabulary: vocabList.slice(0, 10),
            topics: lesson.topics,
          },
        }),
      });
      const data = await res.json();
      const validQuestions = Array.isArray(data.questions)
        ? data.questions.filter((q) =>
            typeof q?.prompt === 'string' &&
            q.prompt.trim() &&
            Array.isArray(q.options) &&
            q.options.length >= 2 &&
            typeof q.correctAnswer === 'string' &&
            q.options.includes(q.correctAnswer)
          )
        : [];

      if (!res.ok || !validQuestions.length) {
        throw new Error(data.error || 'Could not generate AI quiz questions.');
      }

      const formatted = validQuestions.map((q, idx) => ({
        id: q.id || `lesson-q-${idx + 1}`,
        type: 'multiple-choice',
        prompt: q.prompt,
        promptEnglish: q.promptEnglish || '',
        options: q.options,
        correctAnswer: q.correctAnswer,
        hint: q.hint || q.explanation || '',
        explanation: q.explanation || 'Review the unit rule and apply it to the sentence.',
      }));

      saveStoredAiPracticeExercises(lesson.id, formatted);
      setAiExercises(formatted);
      setAiExercisesLessonId(lesson.id);
      setCurrentExIndex(0);
      setQuizError('');
    } catch (e) {
      if (controller.signal.aborted) return;
      setQuizError(e.message || 'Could not generate AI quiz.');
    } finally {
      if (!controller.signal.aborted) setIsGeneratingQuiz(false);
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

  const handleOpenQuizPhase = () => {
    setPhase('quiz');
    scrollToTop();
    setIsQuestionTranslated(false);
    if (aiExercisesLessonId !== lesson.id || !aiExercises?.length) {
      handleGenerateAiQuiz();
    }
  };

  const handleCheckAnswer = () => {
    if (!currentExercise || !selectedAnswer) return;

    const cleanUser = selectedAnswer.trim().toLowerCase().replace(/[.,!?;:]/g, '');
    const cleanCorrect = currentExercise.correctAnswer.trim().toLowerCase().replace(/[.,!?;:]/g, '');

    const correct = cleanUser === cleanCorrect;
    setIsCorrect(correct);
    setHasChecked(true);

    if (correct) {
      setScore((prev) => prev + 1);
      playChime('correct');
    } else {
      playChime('incorrect');
    }
  };

  const handleNextExercise = () => {
    if (currentExIndex < exercises.length - 1) {
      setCurrentExIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setHasChecked(false);
      setIsCorrect(false);
      setShowHint(false);
      setIsQuestionTranslated(false);
    } else {
      // Completed!
      const totalEarnedXp = Math.max(15, (score + (isCorrect ? 1 : 0)) * 10);
      setPhase('completed');
      try {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      } catch {}
      onComplete?.(lesson.id, totalEarnedXp);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 overscroll-contain">
      <div
        id="lesson-modal-container"
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-[#DCDCCF] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-[#FAF7F2] border-b border-[#E8E2D9] flex items-start justify-between shrink-0">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#5A5A40] text-white">
                Unit {lesson.unit || 1} • {lesson.level}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#F0ECE1] text-[#5A5A40] border border-[#5A5A40]/20">
                {lesson.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#FAF3EE] text-[#9C4B2E] border border-[#D98E73]/20 flex items-center gap-1">
                <BrainCircuit className="w-3 h-3" />
                <span>AI Quiz</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#34342E] font-serif">
              {lesson.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7A6A] font-serif italic">
              {lesson.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close lesson modal"
            className="p-2 rounded-full hover:bg-[#EAE6DF] text-[#7A7A6A] hover:text-[#34342E] transition-all cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center space-x-6 px-6 border-b border-[#E8E2D9] text-xs font-semibold text-[#7A7A6A] bg-[#FAF7F2] overflow-x-auto scrollbar-none">
          <button
            onClick={() => setPhase('grammar')}
            className={`flex items-center gap-1.5 py-3 transition-colors cursor-pointer shrink-0 ${
              phase === 'grammar' ? 'text-[#5A5A40] font-bold border-b-2 border-[#5A5A40]' : 'hover:text-[#34342E]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Lesson Guide & Rules</span>
          </button>
          {vocabList.length > 0 && (
            <button
              onClick={() => setPhase('vocab')}
              className={`flex items-center gap-1.5 py-3 transition-colors cursor-pointer shrink-0 ${
                phase === 'vocab' ? 'text-[#5A5A40] font-bold border-b-2 border-[#5A5A40]' : 'hover:text-[#34342E]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>2. Key Vocabulary ({vocabList.length})</span>
            </button>
          )}
          <button
            id="tab-lesson-ai-quiz"
            onClick={handleOpenQuizPhase}
            className={`flex items-center gap-1.5 py-3 transition-colors cursor-pointer shrink-0 ${
              phase === 'quiz' || phase === 'completed' ? 'text-[#5A5A40] font-bold border-b-2 border-[#5A5A40]' : 'hover:text-[#34342E]'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>{vocabList.length > 0 ? '3' : '2'}. Unit AI Quiz {exercises.length ? `(${exercises.length})` : ''}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-6">
          {/* PHASE 1: GRAMMAR RULES & BLUEPRINT */}
          {phase === 'grammar' && (
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
                  onClick={handleOpenQuizPhase}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#5A5A40] border border-[#5A5A40]/25 text-xs font-bold transition-all shadow-2xs hover:shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  <BrainCircuit className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>Skip to AI Quiz →</span>
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

              {/* 3. Detailed Explanations */}
              {detailedParagraphs.length > 0 && (
                <div className="space-y-3 bg-[#FAF9F5] p-5 rounded-2xl border border-[#E8E2D9]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7A6A] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#5A5A40]" />
                    Pedagogical Breakdown
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

              {/* 6. Examples in Context */}
              {lessonExamples.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7A6A]">
                    Exemplars & Sentence Usage
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
                  {vocabList.length > 0 ? (
                    <button
                      onClick={() => setPhase('vocab')}
                      className="px-5 py-2.5 bg-white border border-[#DCDCCF] hover:bg-[#FAF7F2] text-[#34342E] rounded-xl font-bold text-xs shadow-2xs flex items-center gap-2 cursor-pointer"
                    >
                      <span>Key Vocabulary ({vocabList.length}) →</span>
                    </button>
                  ) : null}

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
                      id="start-lesson-ai-quiz-btn"
                      onClick={handleOpenQuizPhase}
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
          )}

          {/* PHASE 2: VOCABULARY PREVIEW */}
          {phase === 'vocab' && vocabList.length > 0 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {vocabList.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-4.5 rounded-2xl bg-white border border-[#E8E2D9] flex flex-col justify-between space-y-3.5 shadow-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-[#34342E] font-serif">{v.french}</span>
                          {v.gender && (
                            <span className={`text-xs uppercase font-bold px-2 py-0.5 rounded-md ${
                              v.gender === 'masculine' ? 'bg-[#F0ECE1] text-[#5A5A40]' : 'bg-[#FAF3EE] text-[#C05C54]'
                            }`}>
                              {v.gender === 'masculine' ? 'Masc' : 'Fem'}
                            </span>
                          )}
                        </div>
                        {v.ipa && <p className="text-xs sm:text-sm text-[#7A7A6A] font-mono mt-0.5">{v.ipa}</p>}
                        <p className="text-sm font-medium text-[#5A5A40] mt-1">{v.english}</p>
                      </div>
                      <button
                        onClick={() => handleAudioPlay(v.french)}
                        className="p-2.5 rounded-xl bg-[#F0ECE1] text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white transition-colors border border-[#5A5A40]/20 cursor-pointer shadow-xs"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="pt-2.5 border-t border-[#E8E2D9] text-sm">
                      <p className="text-[#404038] italic font-serif">"{v.sampleSentence}"</p>
                      <p className="text-[#7A7A6A] text-xs mt-0.5">« {v.sampleTranslation} »</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setPhase('grammar')}
                  className="px-4 py-2 text-xs font-semibold text-[#7A7A6A] hover:text-[#34342E] cursor-pointer"
                >
                  ← Back to Guide
                </button>
                <button
                  id="vocab-to-quiz-btn"
                  onClick={handleOpenQuizPhase}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#5A5A40] hover:bg-[#4A4A35] text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                >
                  <BrainCircuit className="w-4 h-4 text-white" />
                  <span>Start Unit AI Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* PHASE 3: UNIT AI QUIZ */}
          {phase === 'quiz' && (
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
                      Dynamic interactive quiz generated by Gemini testing this lesson's concepts
                    </p>
                  </div>
                </div>

                <button
                  id="lesson-regenerate-ai-quiz-btn"
                  onClick={() => handleGenerateAiQuiz(true)}
                  disabled={isGeneratingQuiz}
                  className="px-3.5 py-1.5 bg-white hover:bg-[#FAF7F2] text-[#5A5A40] border border-[#DCDCCF] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs disabled:opacity-50 self-start sm:self-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D98E73]" />
                  <span>Generate New AI Questions</span>
                </button>
              </div>

              {isGeneratingQuiz ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-12 h-12 border-4 border-[#5A5A40] border-t-transparent rounded-full animate-spin mx-auto" />
                  <div className="space-y-1">
                    <p className="text-base font-bold text-[#34342E] font-serif">
                      Generating your Quiz questions...
                    </p>
                    <p className="text-xs text-[#7A7A6A] max-w-sm mx-auto">
                      Formulating questions tailored to {lesson.title} ({lesson.level})
                    </p>
                  </div>
                </div>
              ) : quizError ? (
                <div className="text-center py-12 space-y-4 bg-[#FAF3EE] rounded-3xl p-8 border border-[#D98E73]/30">
                  <AlertTriangle className="w-10 h-10 text-[#C05C54] mx-auto" />
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-[#34342E] font-serif">
                      Could not generate AI quiz
                    </h4>
                    <p className="text-xs text-[#7A4A3A]">{quizError}</p>
                  </div>
                  <button
                    onClick={() => handleGenerateAiQuiz(true)}
                    className="px-5 py-2.5 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-xl text-xs font-bold flex items-center gap-2 mx-auto cursor-pointer shadow-xs"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Try Generating Again</span>
                  </button>
                </div>
              ) : currentExercise ? (
                <div className="space-y-6">
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between text-xs text-[#7A7A6A]">
                    <span className="font-semibold text-[#5A5A40] flex items-center gap-1.5">
                      <BrainCircuit className="w-3.5 h-3.5" />
                      Question {currentExIndex + 1} of {exercises.length}
                    </span>
                    <span>Score: {score}</span>
                  </div>
                  <div className="w-full bg-[#EAE6DF] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#5A5A40] h-full transition-all duration-300"
                      style={{ width: `${((currentExIndex + 1) / exercises.length) * 100}%` }}
                    />
                  </div>

                  {/* Prompt Card */}
                  <div className="bg-[#FAF7F2] border border-[#E8E2D9] rounded-2xl p-5 sm:p-6 space-y-3.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase font-bold tracking-wider text-[#5A5A40] bg-[#F0ECE1] px-2.5 py-0.5 rounded-md border border-[#5A5A40]/15">
                          French Grammar Challenge
                        </span>
                        {isQuestionTranslated && (
                          <span className="text-[10px] uppercase font-semibold text-[#8C6D23] bg-[#FEF9ED] px-2 py-0.5 rounded border border-[#E0D0A5]">
                            English Translation
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          id="toggle-lesson-quiz-translation-btn"
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
                          <span className="text-[11px]">
                            {isTranslating ? '...' : isQuestionTranslated ? 'French' : 'Translate'}
                          </span>
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
                    <h3 className="text-lg sm:text-xl font-bold text-[#34342E] font-serif leading-snug">
                      {isQuestionTranslated
                        ? (currentExercise.promptEnglish || translationMap[currentExercise.prompt] || currentExercise.prompt)
                        : currentExercise.prompt}
                    </h3>
                  </div>

                  {/* Multiple Choice Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {currentExercise.options?.map((option, idx) => {
                      const isSelected = selectedAnswer === option;
                      const letter = String.fromCharCode(65 + idx);
                      return (
                        <button
                          key={idx}
                          disabled={hasChecked}
                          onClick={() => {
                            playChime('click');
                            setSelectedAnswer(option);
                          }}
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
                            <span>{option}</span>
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
                        <Lightbulb className="w-4 h-4" />
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
                  {hasChecked && (
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

                  {/* Actions Footer */}
                  <div className="flex justify-end gap-3 pt-2">
                    {!hasChecked ? (
                      <button
                        id="lesson-quiz-check-btn"
                        disabled={!selectedAnswer}
                        onClick={handleCheckAnswer}
                        className="px-6 py-3 bg-[#5A5A40] text-white rounded-2xl font-bold text-xs shadow-sm hover:bg-[#4A4A35] transition-all cursor-pointer disabled:opacity-50"
                      >
                        Check Answer
                      </button>
                    ) : (
                      <button
                        id="lesson-quiz-next-btn"
                        onClick={handleNextExercise}
                        className="px-6 py-3 bg-[#5A5A40] text-white rounded-2xl font-bold text-xs shadow-sm hover:bg-[#4A4A35] transition-all cursor-pointer flex items-center gap-2"
                      >
                        <span>{currentExIndex < exercises.length - 1 ? 'Next Question' : 'Complete Quiz & View Score'}</span>
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
                    onClick={() => handleGenerateAiQuiz(false)}
                    className="px-6 py-2.5 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-xl text-xs font-bold flex items-center gap-2 mx-auto cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-4 h-4 text-[#D98E73]" />
                    <span>Launch Unit AI Quiz</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* PHASE 4: COMPLETED CELEBRATION */}
          {phase === 'completed' && (
            <div className="text-center py-8 space-y-6 animate-in zoom-in-95">
              <div className="w-20 h-20 bg-[#EEF4EE] text-[#3A5A3A] rounded-full flex items-center justify-center mx-auto border-2 border-[#5A7A5A] shadow-xs">
                <Trophy className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 bg-[#F0ECE1] text-[#5A5A40] px-3 py-1 rounded-full text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#D98E73]" />
                  <span>Unit AI Quiz Mastered</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#34342E] font-serif">
                  Félicitations ! Lesson Completed
                </h3>
                <p className="text-sm text-[#7A7A6A] max-w-md mx-auto">
                  You scored <strong>{score} / {exercises.length}</strong> on this unit's AI quiz and earned{' '}
                  <strong className="text-[#5A5A40]">+{lesson.xpReward || 25} XP</strong>.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-3">
                <button
                  onClick={() => handleGenerateAiQuiz(true)}
                  className="px-5 py-2.5 bg-white border border-[#DCDCCF] hover:bg-[#FAF7F2] text-[#5A5A40] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-[#D98E73]" />
                  <span>Generate New AI Quiz</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentExIndex(0);
                    setSelectedAnswer(null);
                    setHasChecked(false);
                    setIsCorrect(false);
                    setScore(0);
                    setPhase('quiz');
                  }}
                  className="px-5 py-2.5 bg-white border border-[#DCDCCF] text-[#34342E] rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#FAF7F2] transition-all cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Current Quiz</span>
                </button>
                <button
                  id="finish-lesson-modal-btn"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#5A5A40] text-white rounded-xl text-xs font-bold hover:bg-[#4A4A35] transition-all cursor-pointer shadow-xs"
                >
                  <span>Finish & Continue</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};
