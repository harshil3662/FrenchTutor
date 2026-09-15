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
} from 'lucide-react';
import { useModalTracker } from '../utils/modalState.js';
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
  const [builtWords, setBuiltWords] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isLessonFinished, setIsLessonFinished] = useState(false);

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
    setActiveTopicIndex(0);
    setActiveTab('guide');
    setCurrentExIdx(0);
    setSelectedAnswer('');
    setBuiltWords([]);
    setShowHint(false);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setScore(0);
    setIsLessonFinished(false);
  }, [lesson?.id]);

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

  // Resolve exercises: support root exercises or aggregated topic exercises
  const topicExercises = Array.isArray(lesson?.topics)
    ? lesson.topics.flatMap((t) => t.practiceExercises || t.exercises || [])
    : [];
  const exercises = (lesson?.practiceExercises?.length || lesson?.exercises?.length)
    ? (lesson.practiceExercises || lesson.exercises)
    : topicExercises;
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
  const rawExamples = activeTopic?.contrastExamples || activeTopic?.examples || activeTopic?.grammarTip?.examples || (!hasMultipleTopics ? (lesson.contrastExamples || lesson.examples || lesson.grammarTip?.examples) : null);
  const examplesList = Array.isArray(rawExamples) && rawExamples.length > 0
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

  const handleWordClick = (word) => {
    if (isAnswerChecked) return;
    setBuiltWords((prev) => [...prev, word]);
  };

  const handleRemoveWord = (index) => {
    if (isAnswerChecked) return;
    setBuiltWords((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckAnswer = () => {
    if (!currentExercise) return;
    let answerToEvaluate = selectedAnswer;
    if (currentExercise.type === 'sentence-builder') {
      answerToEvaluate = builtWords.join(' ');
    }

    const cleanUser = answerToEvaluate.trim().toLowerCase().replace(/[.,!?;:]/g, '');
    const cleanCorrect = currentExercise.correctAnswer.trim().toLowerCase().replace(/[.,!?;:]/g, '');

    const correct = cleanUser === cleanCorrect;
    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextExercise = () => {
    setIsAnswerChecked(false);
    setSelectedAnswer('');
    setBuiltWords([]);
    setShowHint(false);

    if (currentExIdx < exercises.length - 1) {
      setCurrentExIdx((prev) => prev + 1);
    } else {
      setIsLessonFinished(true);
      const earnedXp = Math.max(15, (score + (isCorrect ? 1 : 0)) * 10);
      onComplete(lesson.id, earnedXp);
    }
  };

  const handleResetExercises = () => {
    setCurrentExIdx(0);
    setSelectedAnswer('');
    setBuiltWords([]);
    setShowHint(false);
    setIsAnswerChecked(false);
    setScore(0);
    setIsLessonFinished(false);
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
            onClick={() => setActiveTab('drills')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'drills'
                ? 'border-[#5A5A40] text-[#5A5A40] bg-white'
                : 'border-transparent text-[#7A7A6A] hover:text-[#34342E]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Practice Drills ({exercises.length})</span>
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

              {/* Formula Blueprint */}
              {formulaText && (
                <div className="p-5 bg-[#FAF7F2] border border-[#5A5A40]/30 rounded-2xl space-y-2 shadow-xs">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#5A5A40] flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    Syntactic Formula Blueprint
                  </span>
                  <div className="text-base sm:text-lg font-bold text-[#34342E] font-mono tracking-tight bg-white p-3.5 rounded-xl border border-[#E8E2D9]">
                    {formulaText}
                  </div>
                </div>
              )}

              {/* The Golden Rule */}
              {goldenRuleText && (
                <div className="p-5 bg-[#EEF4EE] border border-[#5A7A5A]/30 rounded-2xl flex items-start space-x-3.5 shadow-xs">
                  <Lightbulb className="w-5 h-5 text-[#3A5A3A] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#3A5A3A]">
                      The Golden Rule
                    </h4>
                    <p className="text-sm sm:text-base text-[#34342E] leading-relaxed font-medium">
                      {formatBoldText(goldenRuleText)}
                    </p>
                  </div>
                </div>
              )}

              {/* 1. Description */}
              {detailedParagraphs.length > 0 && (
                <div id="grammar-tab-description" className="space-y-3">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7A7A6A] flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#5A5A40]" />
                    Description
                  </h3>
                  <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 sm:p-6 space-y-3.5 text-sm sm:text-base text-[#404038] leading-relaxed shadow-xs">
                    {detailedParagraphs.map((paragraph, idx) => (
                      <p key={idx} className="leading-relaxed">
                        {formatBoldText(paragraph)}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Tabular Information (if available) */}
              {tableList.length > 0 && (
                <div id="grammar-tab-tabular" className="space-y-5">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7A7A6A] flex items-center gap-1.5">
                    <TableIcon className="w-4 h-4 text-[#5A5A40]" />
                    Tabular Information
                  </h3>
                  {tableList.map((tbl, tIdx) => (
                    <div key={tIdx} className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A5A40] flex items-center gap-1.5">
                          {tbl.title || `Reference Table ${tIdx + 1}`}
                        </h4>
                        {tbl.subtitle && (
                          <span className="text-[11px] text-[#7A7A6A] italic">
                            {tbl.subtitle}
                          </span>
                        )}
                      </div>

                      {tbl.description && (
                        <p className="text-xs text-[#7A7A6A]">
                          {tbl.description}
                        </p>
                      )}

                      <div className="overflow-x-auto rounded-2xl border border-[#E8E2D9] bg-white shadow-xs">
                        <table className="w-full text-left text-sm sm:text-base border-collapse">
                          {tbl.headers && tbl.headers.length > 0 && (
                            <thead className="bg-[#FAF7F2] border-b border-[#E8E2D9] text-[#5A5A40]">
                              <tr>
                                {tbl.headers.map((header, hIdx) => (
                                  <th
                                    key={hIdx}
                                    className="px-4.5 py-3.5 font-bold uppercase text-xs tracking-wider whitespace-nowrap"
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                          )}
                          <tbody className="divide-y divide-[#E8E2D9]">
                            {tbl.rows?.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className="hover:bg-[#FAF8F5]/80 transition-colors"
                              >
                                {Array.isArray(row) ? (
                                  row.map((cell, cIdx) => {
                                    const cellText = typeof cell === 'object' && cell !== null ? cell.text : String(cell ?? '');
                                    const cellSub = typeof cell === 'object' && cell !== null ? cell.subtext : null;
                                    const isFrench = typeof cell === 'object' && cell !== null ? cell.french : (cIdx > 0 && /^[a-zA-ZÀ-ÿ' -]+$/.test(cellText) && cellText.length < 30);

                                    return (
                                      <td
                                        key={cIdx}
                                        className={`px-4.5 py-3.5 align-top ${
                                          cIdx === 0
                                            ? 'font-bold text-[#34342E] bg-[#FAF8F5]/40'
                                            : 'text-[#404038]'
                                        }`}
                                      >
                                        <div className="flex items-center justify-between gap-2">
                                          <div>
                                            <span className={cIdx === 0 ? 'font-bold font-serif text-sm sm:text-base' : 'font-medium text-sm sm:text-base'}>
                                              {cellText}
                                            </span>
                                            {cellSub && (
                                              <span className="block text-xs text-[#7A7A6A] italic mt-0.5">
                                                {cellSub}
                                              </span>
                                            )}
                                          </div>
                                          {isFrench && cellText.trim() && (
                                            <button
                                              onClick={() => handleAudioPlay(cellText)}
                                              title={`Listen to "${cellText}"`}
                                              className="p-1.5 rounded-md text-[#A0A090] hover:text-[#5A5A40] hover:bg-[#EAE6DF] transition-all shrink-0 cursor-pointer"
                                            >
                                              <Volume2 className="w-4 h-4" />
                                            </button>
                                          )}
                                        </div>
                                      </td>
                                    );
                                  })
                                ) : (
                                  <td className="px-4.5 py-3.5 text-[#404038] text-sm sm:text-base">
                                    {String(row)}
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Conjugation Highlight Table (if available) */}
              {lesson.conjugationHighlight && (
                <div className="p-5 bg-white border border-[#E8E2D9] rounded-2xl space-y-3 shadow-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A5A40] flex items-center gap-1.5">
                    <TableIcon className="w-3.5 h-3.5" />
                    Conjugation Table • {lesson.conjugationHighlight.verb} ({lesson.conjugationHighlight.tense})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {Object.entries(lesson.conjugationHighlight.table).map(([pronoun, conj]) => (
                      <div key={pronoun} className="p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8E2D9] flex items-center justify-between text-xs">
                        <span className="text-[#7A7A6A] font-medium">{pronoun}</span>
                        <span className="font-bold text-[#34342E] font-serif">{conj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Examples (at last) */}
              {examplesList.length > 0 && (
                <div id="grammar-tab-examples" className="space-y-3">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7A7A6A] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#5A5A40]" />
                    Examples
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {examplesList.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-4.5 bg-[#FAF7F2] border border-[#E8E2D9] rounded-2xl space-y-2.5 transition-all hover:border-[#DCDCCF]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-base sm:text-lg font-bold text-[#34342E] font-serif">
                            {ex.french}
                          </span>
                          <button
                            onClick={() => handleAudioPlay(ex.french)}
                            aria-label={`Listen to "${ex.french}"`}
                            className="p-1.5 rounded-lg text-[#7A7A6A] hover:text-[#34342E] hover:bg-[#EAE6DF] transition-all cursor-pointer shrink-0"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs sm:text-sm text-[#7A7A6A] italic font-serif">
                          « {ex.english} »
                        </div>
                        {ex.aspectNote && (
                          <div className="text-xs text-[#5A5A40] bg-[#F0ECE1] px-2.5 py-1 rounded-lg inline-block font-medium">
                            {formatBoldText(ex.aspectNote)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[#E8E2D9]">
                {hasMultipleTopics && activeTopicIndex > 0 ? (
                  <button
                    onClick={() => {
                      setActiveTopicIndex((prev) => Math.max(0, prev - 1));
                      scrollToTop();
                    }}
                    className="px-4 py-2.5 rounded-xl border border-[#E8E2D9] text-[#7A7A6A] hover:text-[#34342E] hover:bg-[#FAF7F2] font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    ← Previous Topic
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2.5 self-end sm:self-auto">
                  {exercises.length > 0 && hasMultipleTopics && activeTopicIndex < topicsList.length - 1 && (
                    <button
                      onClick={() => {
                        setActiveTab('drills');
                        scrollToTop();
                      }}
                      className="px-4 py-2 text-xs font-semibold text-[#7A7A6A] hover:text-[#34342E] cursor-pointer"
                    >
                      Skip to Practice Drills →
                    </button>
                  )}

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
                      onClick={() => {
                        setActiveTab('drills');
                        scrollToTop();
                      }}
                      className="px-6 py-2.5 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-xl font-bold text-xs shadow-xs flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Start Practice Drills ({exercises.length})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in">
              {isLessonFinished ? (
                /* Lesson Finished Screen */
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-[#EEF4EE] text-[#3A5A3A] rounded-full flex items-center justify-center mx-auto border-2 border-[#5A7A5A]">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#34342E] font-serif">
                    Grammar Aspect Mastered!
                  </h3>
                  <p className="text-sm text-[#7A7A6A] max-w-md mx-auto">
                    You scored {score} / {exercises.length} on this module and earned{' '}
                    <strong className="text-[#5A5A40]">+{Math.max(15, score * 10)} XP</strong>.
                  </p>
                  <div className="flex justify-center gap-3 pt-4">
                    <button
                      onClick={handleResetExercises}
                      className="px-5 py-2.5 bg-white border border-[#DCDCCF] text-[#34342E] rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#FAF7F2] transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Retake Drills</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-[#5A5A40] text-white rounded-xl text-xs font-bold hover:bg-[#4A4A35] transition-all cursor-pointer shadow-xs"
                    >
                      <span>Close Module</span>
                    </button>
                  </div>
                </div>
              ) : currentExercise ? (
                /* Active Exercise Interface */
                <div className="space-y-6">
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between text-xs text-[#7A7A6A]">
                    <span>
                      Exercise {currentExIdx + 1} of {exercises.length}
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
                  <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D9] space-y-3">
                    <span className="text-xs uppercase font-bold tracking-wider text-[#5A5A40]">
                      {currentExercise.type.replace('-', ' ')}
                    </span>
                    <div className="text-lg sm:text-xl font-bold text-[#34342E] font-serif leading-snug">
                      {currentExercise.prompt}
                    </div>
                  </div>

                  {/* Sentence Builder UI */}
                  {currentExercise.type === 'sentence-builder' ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-white border border-[#E8E2D9] rounded-2xl min-h-[60px] flex flex-wrap gap-2.5 items-center">
                        {builtWords.length === 0 ? (
                          <span className="text-sm text-[#7A7A6A] italic">Click the words below in order...</span>
                        ) : (
                          builtWords.map((word, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleRemoveWord(idx)}
                              className="px-3.5 py-2 rounded-xl bg-[#5A5A40] text-white text-sm font-bold hover:bg-[#D98E73] transition-all cursor-pointer shadow-xs"
                            >
                              {word}
                            </button>
                          ))
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2.5">
                        {currentExercise.words?.map((word, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleWordClick(word)}
                            className="px-4 py-2.5 rounded-xl bg-[#F0ECE1] border border-[#E8E2D9] text-sm font-semibold text-[#34342E] hover:bg-[#EAE6DF] transition-all cursor-pointer shadow-xs"
                          >
                            {word}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Multiple Choice & Fill in the blank */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {currentExercise.options?.map((opt, idx) => {
                        const isSelected = selectedAnswer === opt;
                        return (
                          <button
                            key={idx}
                            disabled={isAnswerChecked}
                            onClick={() => setSelectedAnswer(opt)}
                            className={`p-4.5 rounded-2xl border text-left text-sm sm:text-base font-semibold transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-xs'
                                : 'bg-white text-[#34342E] border-[#E8E2D9] hover:bg-[#FAF7F2]'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && <CheckCircle2 className="w-5 h-5 shrink-0 text-white" />}
                          </button>
                        );
                      })}
                    </div>
                  )}

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
                            <AlertTriangle className="w-5 h-5 text-[#D98E73]" />
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
                        onClick={handleCheckAnswer}
                        disabled={
                          currentExercise.type === 'sentence-builder'
                            ? builtWords.length === 0
                            : !selectedAnswer
                        }
                        className="px-6 py-3 bg-[#5A5A40] text-white rounded-2xl font-bold text-xs shadow-sm hover:bg-[#4A4A35] transition-all cursor-pointer disabled:opacity-50"
                      >
                        Check Answer
                      </button>
                    ) : (
                      <button
                        onClick={handleNextExercise}
                        className="px-6 py-3 bg-[#5A5A40] text-white rounded-2xl font-bold text-xs shadow-sm hover:bg-[#4A4A35] transition-all cursor-pointer flex items-center gap-2"
                      >
                        <span>{currentExIdx < exercises.length - 1 ? 'Next Question' : 'Complete Module'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};
