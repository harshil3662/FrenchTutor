import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Volume2, CheckCircle2, XCircle, ArrowRight, Sparkles, BookOpen, Layers, Lightbulb, RotateCcw, Table as TableIcon, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakFrench, playChime } from '../utils/audioUtils.js';
import { useModalTracker } from '../utils/modalState.js';
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
  const [sentenceWords, setSentenceWords] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

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
    setActiveTopicIndex(0);
    setPhase('grammar');
    setCurrentExIndex(0);
    setSelectedAnswer(null);
    setHasChecked(false);
    setIsCorrect(false);
    setScore(0);
  }, [lesson?.id]);

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

  // Support multi-topic units
  const topicsList = Array.isArray(lesson?.topics) && lesson.topics.length > 0 ? lesson.topics : null;
  const hasMultipleTopics = Boolean(topicsList && topicsList.length > 1);
  const activeTopic = hasMultipleTopics ? (topicsList[activeTopicIndex] || topicsList[0]) : lesson;

  // Resolve exercises: support root exercises or aggregated topic exercises
  const topicExercises = Array.isArray(lesson?.topics)
    ? lesson.topics.flatMap((t) => t.exercises || t.practiceExercises || [])
    : [];
  const exercisesList = (lesson?.exercises?.length || lesson?.practiceExercises?.length)
    ? (lesson?.exercises || lesson?.practiceExercises)
    : topicExercises;
  const currentExercise = exercisesList?.[currentExIndex];

  // Resolve vocabulary
  const vocabList = Array.isArray(lesson?.vocabulary) && lesson.vocabulary.length > 0
    ? lesson.vocabulary
    : Array.isArray(lesson?.topics)
    ? lesson.topics.flatMap((t) => t.vocabulary || [])
    : [];

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

  // Normalize examples from active topic (displayed at last)
  const rawExamples = activeTopic?.contrastExamples || activeTopic?.examples || activeTopic?.grammarTip?.examples || (!hasMultipleTopics ? (lesson?.contrastExamples || lesson?.examples || lesson?.grammarTip?.examples) : null);
  const lessonExamples = Array.isArray(rawExamples) && rawExamples.length > 0
    ? rawExamples
    : [];

  // Initialize sentence builder words when exercise changes
  React.useEffect(() => {
    if (currentExercise?.type === 'sentence-builder' && currentExercise.words) {
      // Shuffle words for challenge
      const shuffled = [...currentExercise.words].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setSentenceWords([]);
    }
    setSelectedAnswer(null);
    setHasChecked(false);
    setIsCorrect(false);
  }, [currentExIndex, currentExercise]);

  const handleWordTileClick = (word, fromAvailable) => {
    playChime('click');
    if (fromAvailable) {
      setAvailableWords((prev) => {
        const idx = prev.indexOf(word);
        if (idx > -1) {
          const next = [...prev];
          next.splice(idx, 1);
          return next;
        }
        return prev;
      });
      setSentenceWords((prev) => [...prev, word]);
    } else {
      setSentenceWords((prev) => {
        const idx = prev.indexOf(word);
        if (idx > -1) {
          const next = [...prev];
          next.splice(idx, 1);
          return next;
        }
        return prev;
      });
      setAvailableWords((prev) => [...prev, word]);
    }
  };

  const handleCheckAnswer = () => {
    if (!currentExercise) return;

    let correct = false;
    if (currentExercise.type === 'sentence-builder') {
      const assembled = sentenceWords.join(' ');
      correct = assembled.trim() === currentExercise.correctAnswer.trim();
    } else {
      correct = selectedAnswer?.trim() === currentExercise.correctAnswer.trim();
    }

    setIsCorrect(correct);
    setHasChecked(true);

    if (correct) {
      playChime('correct');
      setScore((s) => s + 1);
    } else {
      playChime('incorrect');
    }
  };

  const handleNextExercise = () => {
    if (currentExIndex < exercisesList.length - 1) {
      setCurrentExIndex((i) => i + 1);
    } else {
      // Completed all exercises
      setPhase('completed');
      playChime('celebrate');
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
      onComplete(lesson.id, lesson.xpReward || (exercisesList.length * 10));
    }
  };

  const handleAudioPlay = (text) => {
    speakFrench(text, audioSpeed);
  };

  if (!lesson) return null;

  const modalContent = (
    <div id="lesson-modal-overlay" className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-[#34342E]/70 backdrop-blur-sm animate-in fade-in duration-200 overscroll-contain">
      <div 
        id="lesson-modal-container" 
        className="bg-white border border-[#E8E2D9] rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-[#34342E]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E2D9] bg-[#FAF7F2] shrink-0">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F0ECE1] text-[#5A5A40] border border-[#5A5A40]/20">
              {lesson.level} • Unit {lesson.unit}
            </span>
            <h2 className="text-lg font-bold text-[#34342E] tracking-tight font-serif">{lesson.title}</h2>
          </div>
          <button
            id="close-lesson-btn"
            onClick={onClose}
            aria-label="Close lesson modal"
            className="p-1.5 text-[#7A7A6A] hover:text-[#34342E] hover:bg-[#F0ECE1] rounded-xl transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Phase Stepper Tab Bar */}
        <div className="flex border-b border-[#E8E2D9] bg-[#FAF7F2] px-6 py-2 gap-4 text-xs font-semibold text-[#7A7A6A] overflow-x-auto">
          <button
            onClick={() => setPhase('grammar')}
            className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer shrink-0 ${
              phase === 'grammar' ? 'text-[#5A5A40] font-bold border-b-2 border-[#5A5A40]' : 'hover:text-[#34342E]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Grammar Rules & Blueprint</span>
            {hasMultipleTopics && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] text-[10px] font-bold">
                {topicsList.length} topics
              </span>
            )}
          </button>
          {vocabList.length > 0 && (
            <button
              onClick={() => setPhase('vocab')}
              className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer shrink-0 ${
                phase === 'vocab' ? 'text-[#5A5A40] font-bold border-b-2 border-[#5A5A40]' : 'hover:text-[#34342E]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>2. Key Vocabulary ({vocabList.length})</span>
            </button>
          )}
          {exercisesList.length > 0 && (
            <button
              onClick={() => setPhase('exercises')}
              className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer shrink-0 ${
                phase === 'exercises' || phase === 'completed' ? 'text-[#5A5A40] font-bold border-b-2 border-[#5A5A40]' : 'hover:text-[#34342E]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{vocabList.length > 0 ? '3' : '2'}. Practice Exercises ({exercisesList.length})</span>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overscroll-contain p-6 space-y-6">
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
              {goldenRuleText ? (
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
              ) : lesson?.grammarTip?.rules?.length > 0 ? (
                <div className="p-5 bg-[#EEF4EE] border border-[#5A7A5A]/30 rounded-2xl flex items-start space-x-3.5 shadow-xs">
                  <Lightbulb className="w-5 h-5 text-[#3A5A3A] shrink-0 mt-0.5" />
                  <div className="space-y-1.5 w-full">
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#3A5A3A]">
                      {lesson.grammarTip.title || 'The Golden Rule & Key Takeaways'}
                    </h4>
                    <ul className="space-y-1.5 text-sm sm:text-base text-[#34342E] list-disc list-inside font-medium leading-relaxed">
                      {lesson.grammarTip.rules.map((rule, idx) => (
                        <li key={idx}>{formatBoldText(rule)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}

              {/* 1. Description */}
              {detailedParagraphs.length > 0 && (
                <div id="grammar-modal-description" className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7A7A6A] flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#5A5A40]" />
                    Description
                  </h4>
                  <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 sm:p-6 space-y-3.5 text-sm sm:text-base text-[#404038] leading-relaxed shadow-xs">
                    {detailedParagraphs.map((paragraph, idx) => (
                      <p key={idx} className="leading-relaxed">{formatBoldText(paragraph)}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Tabular Information (if available) */}
              {tableList.length > 0 && (
                <div id="grammar-modal-tabular" className="space-y-4">
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7A7A6A] flex items-center gap-1.5">
                    <TableIcon className="w-4 h-4 text-[#5A5A40]" />
                    Tabular Information
                  </h4>
                  {tableList.map((tbl, tIdx) => (
                    <div key={tIdx} className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#5A5A40] flex items-center gap-1.5">
                          {tbl.title || `Reference Table ${tIdx + 1}`}
                        </h5>
                        {tbl.subtitle && (
                          <span className="text-[11px] text-[#7A7A6A] italic">{tbl.subtitle}</span>
                        )}
                      </div>
                      {tbl.description && (
                        <p className="text-xs sm:text-sm text-[#7A7A6A]">{tbl.description}</p>
                      )}
                      <div className="overflow-x-auto rounded-2xl border border-[#E8E2D9] bg-white shadow-xs">
                        <table className="w-full text-left text-sm sm:text-base border-collapse">
                          {tbl.headers && (
                            <thead className="bg-[#FAF7F2] border-b border-[#E8E2D9] text-[#5A5A40]">
                              <tr>
                                {tbl.headers.map((header, hIdx) => (
                                  <th key={hIdx} className="px-4.5 py-3.5 font-bold uppercase text-xs tracking-wider whitespace-nowrap">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                          )}
                          <tbody className="divide-y divide-[#E8E2D9]">
                            {tbl.rows?.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-[#FAF8F5]/80 transition-colors">
                                {Array.isArray(row) ? (
                                  row.map((cell, cIdx) => (
                                    <td key={cIdx} className={`px-4.5 py-3.5 ${cIdx === 0 ? 'font-bold text-[#34342E]' : 'text-[#404038]'}`}>
                                      {typeof cell === 'object' && cell !== null ? cell.text : String(cell ?? '')}
                                    </td>
                                  ))
                                ) : (
                                  <td className="px-4.5 py-3.5 text-[#404038]">{String(row)}</td>
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

              {/* 3. Examples (at last) */}
              {lessonExamples.length > 0 && (
                <div id="grammar-modal-examples" className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7A7A6A] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#5A5A40]" />
                    Examples
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {lessonExamples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 rounded-xl bg-white border border-[#E8E2D9] hover:border-[#DCDCCF] transition-all shadow-xs"
                      >
                        <div className="space-y-1">
                          <p className="text-base sm:text-lg font-semibold text-[#34342E] font-serif">{ex.french}</p>
                          <p className="text-xs sm:text-sm text-[#7A7A6A] italic">« {ex.english} »</p>
                          {ex.aspectNote && (
                            <div className="text-xs text-[#5A5A40] bg-[#F0ECE1] px-2 py-0.5 rounded-md inline-block font-medium mt-1">
                              {ex.aspectNote}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleAudioPlay(ex.french)}
                          className="p-2.5 rounded-xl bg-[#F0ECE1] text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white transition-all shadow-xs border border-[#5A5A40]/20 cursor-pointer shrink-0 ml-3"
                          title="Listen to pronunciation"
                          aria-label={`Listen to "${ex.french}"`}
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#E8E2D9]">
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
                  {exercisesList.length > 0 && hasMultipleTopics && activeTopicIndex < topicsList.length - 1 && (
                    <button
                      onClick={() => {
                        setPhase('exercises');
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
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5A5A40] hover:bg-[#4A4A35] text-white font-semibold text-xs transition-all shadow-xs cursor-pointer"
                    >
                      <span>Next Topic: {topicsList[activeTopicIndex + 1]?.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : vocabList.length > 0 ? (
                    <button
                      id="to-vocab-btn"
                      onClick={() => {
                        setPhase('vocab');
                        scrollToTop();
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5A5A40] hover:bg-[#4A4A35] text-white font-semibold text-sm transition-all shadow-sm cursor-pointer"
                    >
                      <span>Continue to Vocabulary</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      id="to-exercises-btn"
                      onClick={() => {
                        setPhase('exercises');
                        scrollToTop();
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5A5A40] hover:bg-[#4A4A35] text-white font-semibold text-sm transition-all shadow-sm cursor-pointer"
                    >
                      <span>Start Practice Exercises ({exercisesList.length})</span>
                      <ArrowRight className="w-4 h-4" />
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
                  id="to-exercises-btn"
                  onClick={() => setPhase('exercises')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5A5A40] hover:bg-[#4A4A35] text-white font-semibold text-sm transition-all shadow-sm cursor-pointer"
                >
                  <span>Start Practice Exercises ({exercisesList.length})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PHASE 3: EXERCISES */}
          {phase === 'exercises' && currentExercise && (
            <div className="space-y-6 animate-in fade-in">
              {/* Progress bar within exercises */}
              <div className="flex items-center justify-between text-xs text-[#7A7A6A]">
                <span>Exercise {currentExIndex + 1} of {exercisesList.length}</span>
                <span className="font-semibold text-[#5A5A40]">Current Score: {score} / {currentExIndex}</span>
              </div>
              <div className="w-full bg-[#E8E2D9] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#5A5A40] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentExIndex + 1) / exercisesList.length) * 100}%` }}
                />
              </div>

              {/* Prompt Card */}
              <div className="bg-[#FAF7F2] border border-[#E8E2D9] rounded-2xl p-5 sm:p-6 space-y-3.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#7A7A6A]">
                    {currentExercise.type === 'sentence-builder' ? '🧩 Sentence Builder' : '❓ Question'}
                  </span>
                  {currentExercise.audioText && (
                    <button
                      onClick={() => handleAudioPlay(currentExercise.audioText)}
                      className="flex items-center gap-1.5 text-xs sm:text-sm text-[#5A5A40] hover:text-[#34342E] font-bold cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                      Listen
                    </button>
                  )}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#34342E] leading-snug font-serif">
                  {currentExercise.prompt}
                </h3>
                {currentExercise.hint && (
                  <p className="text-xs sm:text-sm text-[#D98E73] italic">💡 Hint: {currentExercise.hint}</p>
                )}
              </div>

              {/* INTERACTIVE INPUT: Multiple Choice / Fill blank / Translation */}
              {currentExercise.type !== 'sentence-builder' && currentExercise.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {currentExercise.options.map((option, idx) => {
                    const isSelected = selectedAnswer === option;
                    let btnStyle = 'bg-white border-[#DCDCCF] text-[#34342E] hover:border-[#5A5A40]/40 hover:bg-[#FAF7F2]';

                    if (hasChecked) {
                      if (option === currentExercise.correctAnswer) {
                        btnStyle = 'bg-[#EEF4EE] border-[#5A7A5A] text-[#3A5A3A] font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-[#FAF3EE] border-[#C05C54] text-[#C05C54] font-bold';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-[#F0ECE1] border-[#5A5A40] text-[#34342E] font-semibold shadow-xs';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={hasChecked}
                        onClick={() => {
                          playChime('click');
                          setSelectedAnswer(option);
                        }}
                        className={`p-4.5 rounded-2xl border text-left font-medium text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {hasChecked && option === currentExercise.correctAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-[#5A7A5A] flex-shrink-0 ml-2" />
                        )}
                        {hasChecked && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-[#C05C54] flex-shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* INTERACTIVE INPUT: Sentence Builder */}
              {currentExercise.type === 'sentence-builder' && (
                <div className="space-y-4">
                  {/* Assembled Sentence Drop Area */}
                  <div className="min-h-[64px] p-3.5 rounded-2xl bg-[#FAF7F2] border-2 border-dashed border-[#DCDCCF] flex flex-wrap gap-2.5 items-center">
                    {sentenceWords.length === 0 ? (
                      <span className="text-sm text-[#7A7A6A] italic pl-2">
                        Tap words below to arrange the sentence in correct order...
                      </span>
                    ) : (
                      sentenceWords.map((w, idx) => (
                        <button
                          key={idx}
                          disabled={hasChecked}
                          onClick={() => handleWordTileClick(w, false)}
                          className="px-4 py-2 rounded-xl bg-[#5A5A40] text-white text-sm sm:text-base font-semibold shadow-xs hover:bg-[#4A4A35] transition-transform active:scale-95 cursor-pointer"
                        >
                          {w}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Available word tiles */}
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {availableWords.map((w, idx) => (
                      <button
                        key={idx}
                        disabled={hasChecked}
                        onClick={() => handleWordTileClick(w, true)}
                        className="px-4 py-2.5 rounded-xl bg-white border border-[#DCDCCF] text-[#34342E] text-sm sm:text-base font-medium hover:border-[#5A5A40] hover:bg-[#FAF7F2] transition-all cursor-pointer shadow-xs"
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Explanation Box when checked */}
              {hasChecked && (
                <div className={`p-5 rounded-2xl border animate-in fade-in ${
                  isCorrect
                    ? 'bg-[#EEF4EE] border-[#5A7A5A]/30 text-[#3A5A3A]'
                    : 'bg-[#FAF3EE] border-[#C05C54]/30 text-[#C05C54]'
                }`}>
                  <div className="flex items-center space-x-2 font-bold mb-1.5 text-sm sm:text-base">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-[#5A7A5A]" />
                        <span className="font-serif">Excellent! Correct answer.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-[#C05C54]" />
                        <span className="font-serif">Not quite. Answer: {currentExercise.correctAnswer}</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-[#525248] mt-1 leading-relaxed">{currentExercise.explanation}</p>
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex justify-between items-center pt-3 border-t border-[#E8E2D9]">
                {!hasChecked ? (
                  <button
                    id="check-exercise-btn"
                    disabled={
                      currentExercise.type === 'sentence-builder'
                        ? sentenceWords.length === 0
                        : !selectedAnswer
                    }
                    onClick={handleCheckAnswer}
                    className="w-full py-3 rounded-xl bg-[#5A5A40] hover:bg-[#4A4A35] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all shadow-xs cursor-pointer"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    id="next-exercise-btn"
                    onClick={handleNextExercise}
                    className="w-full py-3 rounded-xl bg-[#5A5A40] hover:bg-[#4A4A35] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* PHASE 4: COMPLETED CELEBRATION */}
          {phase === 'completed' && (
            <div className="text-center py-8 space-y-6 animate-in zoom-in-95">
              <div className="w-20 h-20 rounded-full bg-[#F0ECE1] border border-[#5A5A40]/20 flex items-center justify-center mx-auto text-4xl shadow-sm animate-bounce">
                🎉
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#34342E] font-serif">Congratulations!</h3>
                <p className="text-sm text-[#525248]">
                  You have completed the lesson: <strong className="text-[#5A5A40] font-serif">{lesson.title}</strong>
                </p>
              </div>

              <div className="max-w-xs mx-auto grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D9]">
                  <span className="text-xs text-[#7A7A6A] block">Score</span>
                  <span className="text-lg font-bold text-[#5A7A5A] font-serif">{score} / {exercisesList.length}</span>
                </div>
                <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D9]">
                  <span className="text-xs text-[#7A7A6A] block">XP Earned</span>
                  <span className="text-lg font-bold text-[#5A5A40] font-serif">+{lesson.xpReward || (exercisesList.length * 10)} XP</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <button
                  onClick={() => {
                    setCurrentExIndex(0);
                    setScore(0);
                    setPhase('exercises');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#DCDCCF] text-[#34342E] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retry Lesson
                </button>
                <button
                  id="finish-lesson-modal-btn"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#5A5A40] hover:bg-[#4A4A35] text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
                >
                  Finish & Continue
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
