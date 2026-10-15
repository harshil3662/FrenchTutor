import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  BrainCircuit,
  Languages,
  Volume2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playChime, speakFrench } from '../utils/audioUtils.js';
import { useModalTracker } from '../utils/modalState.js';

export const AiQuizModal = ({ topic, level, unit, onClose, onAwardXp }) => {
  useModalTracker(true);
  const [isLoading, setIsLoading] = useState(true);
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);
  const [isQuestionTranslated, setIsQuestionTranslated] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationMap, setTranslationMap] = useState({});

  // Lock background scroll when the practice quiz modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const normalizeAnswerValue = (value) =>
    String(value ?? '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,!?;:]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  const normalizeGeneratedQuestion = (question, idx) => {
    const rawType = question?.type || 'multiple-choice';
    const type = rawType === 'fill-in-the-blank' || rawType === 'complete-the-sentence' || rawType === 'translate-english-to-french' || rawType === 'multiple-choice'
      ? rawType
      : 'multiple-choice';
    const rawAnswer = question?.correctAnswer ?? question?.answer ?? '';
    const acceptableAnswers = Array.isArray(question?.acceptableAnswers)
      ? question.acceptableAnswers.filter((answer) => typeof answer === 'string' && answer.trim())
      : [];

    return {
      id: question?.id || `quiz-q-${idx + 1}`,
      type,
      prompt: typeof question?.prompt === 'string' ? question.prompt : '',
      promptEnglish: typeof question?.promptEnglish === 'string' ? question.promptEnglish : '',
      options: Array.isArray(question?.options) ? question.options.filter((opt) => typeof opt === 'string') : [],
      correctAnswer: typeof rawAnswer === 'string' ? rawAnswer : '',
      acceptableAnswers,
      explanation: question?.explanation || '',
    };
  };

  useEffect(() => {
    const controller = new AbortController();

    async function fetchQuiz() {
      setIsLoading(true);
      setQuizTitle('');
      setQuestions([]);
      setCurrentIndex(0);
      setSelectedOption(null);
      setHasChecked(false);
      setScore(0);
      setIsFinished(false);
      try {
        const res = await fetch('/api/ai/generate-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            topic,
            level,
            questionCount: 4,
            lessonId: unit?.id,
            unitContext: {
              unitNumber: unit?.unitNumber || unit?.unit,
              category: unit?.category,
              frenchTitle: unit?.frenchTitle,
              subtitle: unit?.subtitle,
              formula: unit?.formula,
              goldenRule: unit?.goldenRule,
              rules: unit?.rules,
              commonTraps: unit?.commonTraps,
              vocabulary: unit?.vocabulary,
              topics: unit?.topics,
            },
          }),
        });

        const data = await res.json();
        const validQuestions = Array.isArray(data.questions)
          ? data.questions
              .map((question, idx) => normalizeGeneratedQuestion(question, idx))
              .filter((question) => {
                if (!question.prompt.trim() || !question.correctAnswer.trim()) return false;
                if (question.type === 'multiple-choice') {
                  return question.options.length >= 2 && question.options.every((option) => typeof option === 'string') && question.options.includes(question.correctAnswer);
                }
                return true;
              })
          : [];
        if (!validQuestions.length) {
          throw new Error('Quiz response did not contain valid questions.');
        }
        setQuizTitle(data.title || `Practice Quiz: ${topic}`);
        setQuestions(validQuestions);
      } catch (e) {
        if (controller.signal.aborted) return;
        console.error('Failed to generate quiz:', e);
        // fallback
        setQuizTitle(`Review Quiz (${level})`);
        setQuestions([
          {
            id: 'q1',
            type: 'multiple-choice',
            prompt: "Comment dit-on « Je voudrais un croissant s'il vous plaît » en français ?",
            promptEnglish: "How do you say 'I would like a croissant please' in French?",
            options: [
              "Je voudrais un croissant s'il vous plaît",
              "Je veux un croissant merci",
              "J'ai un croissant s'il te plaît",
              "Je prends croissant s'il vous plaît"
            ],
            correctAnswer: "Je voudrais un croissant s'il vous plaît",
            explanation: "The polite conditional 'Je voudrais' is the standard polite phrasing.",
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            prompt: "Quelle est la forme correcte : « Hier soir, nous ___ au restaurant. » ?",
            promptEnglish: "Which is the correct form: 'Yesterday evening, we ___ at the restaurant.'?",
            options: ["avons mangé", "mangions", "mangeons", "mangerons"],
            correctAnswer: "avons mangé",
            explanation: "Passé composé with auxiliary 'avoir' for a completed past action.",
          },
        ]);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    fetchQuiz();
    return () => controller.abort();
  }, [topic, level, reloadToken]);

  const currentQ = questions[currentIndex];

  const handleToggleTranslation = async () => {
    if (!currentQ) return;
    if (isQuestionTranslated) {
      setIsQuestionTranslated(false);
      return;
    }

    if (currentQ.promptEnglish) {
      setIsQuestionTranslated(true);
      return;
    }

    const cached = translationMap[currentQ.prompt];
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
          text: currentQ.prompt,
          targetLang: 'en',
        }),
      });
      const data = await res.json();
      if (data?.translatedText) {
        setTranslationMap((prev) => ({
          ...prev,
          [currentQ.prompt]: data.translatedText,
        }));
        setIsQuestionTranslated(true);
      }
    } catch (e) {
      console.warn('Failed to translate question:', e);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCheck = () => {
    if (!selectedOption || !currentQ) return;

    const acceptableAnswers = [
      currentQ.correctAnswer,
      ...(Array.isArray(currentQ.acceptableAnswers) ? currentQ.acceptableAnswers : []),
    ].filter((value) => typeof value === 'string' && value.trim());

    const normalizedAnswers = acceptableAnswers.map((value) => normalizeAnswerValue(value));
    const userAnswer = normalizeAnswerValue(selectedOption);
    const isCorrect = currentQ.type === 'multiple-choice'
      ? selectedOption.trim() === currentQ.correctAnswer.trim()
      : normalizedAnswers.includes(userAnswer);

    setHasChecked(true);

    if (isCorrect) {
      playChime('correct');
      setScore((s) => s + 1);
    } else {
      playChime('incorrect');
    }
  };

  const handleNext = () => {
    if (!currentQ) return;
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setHasChecked(false);
      setIsQuestionTranslated(false);
    } else {
      setIsFinished(true);
      playChime('celebrate');
      try {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
      onAwardXp(score * 15 + 20);
    }
  };

  const modalContent = (
    <div id="ai-quiz-modal-overlay" className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-[#1B2433]/70 backdrop-blur-sm animate-in fade-in overscroll-contain">
      <div className="bg-white border border-[#E6DCC8] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col text-[#1B2433]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DCC8] bg-[#FBF7EE] shrink-0">
          <div className="flex items-center space-x-2.5">
            <BrainCircuit className="w-5 h-5 text-[#C23B3B]" />
            <h3 className="font-bold text-[#1B2433] text-base font-serif">
              {isLoading ? 'Generating Quiz...' : quizTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close quiz modal"
            className="p-1.5 text-[#5F6B7A] hover:text-[#1B2433] hover:bg-[#F2EBDC] rounded-xl cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto overscroll-contain flex-1">
          {isLoading ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 border-4 border-[#1F3A5F] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-[#1F3A5F] font-medium">
                Generating tailored questions for your {level} level...
              </p>
            </div>
          ) : isFinished ? (
            <div className="text-center py-8 space-y-6 animate-in zoom-in-95">
              <div className="text-5xl">🏆</div>
              <div className="space-y-1">
                <h4 className="text-2xl font-bold text-[#1B2433] font-serif">Quiz Completed!</h4>
                <p className="text-sm text-[#5F6B7A]">
                  Your score: <strong className="text-[#2F6F57] font-serif">{score} / {questions.length}</strong>
                </p>
              </div>

              <div className="p-4 bg-[#FBF7EE] rounded-2xl border border-[#E6DCC8] max-w-xs mx-auto text-xs text-[#1F3A5F] font-bold">
                +{score * 15 + 20} XP added to your profile!
              </div>

              <button
                onClick={onClose}
                className="px-6 py-3 bg-[#1F3A5F] hover:bg-[#1F3A5F] text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
              >
                Close & Continue
              </button>
            </div>
          ) : !currentQ ? (
            <div className="text-center py-10 space-y-4">
              <p className="text-sm text-[#7A4A3A]">This quiz question could not be displayed.</p>
              <button
                onClick={() => setReloadToken((value) => value + 1)}
                className="px-5 py-2.5 bg-[#1F3A5F] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 mx-auto cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload Quiz</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Progress */}
              <div className="flex items-center justify-between text-xs text-[#5F6B7A]">
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span className="text-[#1F3A5F] font-bold">Score: {score}</span>
              </div>

              <div className="p-5 bg-[#FBF7EE] rounded-2xl border border-[#E6DCC8] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-[#1F3A5F] bg-[#F2EBDC] px-2.5 py-0.5 rounded-md border border-[#1F3A5F]/15">
                      Question {currentIndex + 1}
                    </span>
                    {isQuestionTranslated && (
                      <span className="text-[10px] uppercase font-semibold text-[#C23B3B] bg-[#FCF0EE] px-2 py-0.5 rounded border border-[#D9CFBA]">
                        English Translation
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      id="toggle-ai-quiz-modal-translation-btn"
                      onClick={handleToggleTranslation}
                      disabled={isTranslating}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                        isQuestionTranslated
                          ? 'bg-[#1F3A5F] text-white border-[#1F3A5F] shadow-2xs'
                          : 'bg-white hover:bg-[#FBF7EE] text-[#1F3A5F] border-[#D9CFBA]'
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
                      onClick={() => speakFrench(currentQ.prompt)}
                      className="p-1.5 text-[#5F6B7A] hover:text-[#1B2433] rounded-lg transition-colors cursor-pointer"
                      title="Listen to French prompt"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-[#1B2433] leading-snug font-serif">
                  {isQuestionTranslated
                    ? (currentQ.promptEnglish || translationMap[currentQ.prompt] || currentQ.prompt)
                    : currentQ.prompt}
                </h4>
              </div>

              {currentQ.type === 'multiple-choice' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedOption === opt;
                    let style = 'bg-white border-[#D9CFBA] text-[#1B2433] hover:bg-[#FBF7EE]';

                    if (hasChecked) {
                      if (opt === currentQ.correctAnswer) {
                        style = 'bg-[#E9F3EE] border-[#2F6F57] text-[#2F6F57] font-bold';
                      } else if (isSelected && opt !== currentQ.correctAnswer) {
                        style = 'bg-[#FCF0EE] border-[#C23B3B] text-[#C23B3B] font-bold';
                      }
                    } else if (isSelected) {
                      style = 'bg-[#F2EBDC] border-[#1F3A5F] text-[#1B2433] font-semibold shadow-xs';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={hasChecked}
                        onClick={() => setSelectedOption(opt)}
                        className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${style}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#5F6B7A]">
                    {currentQ.type === 'translate-english-to-french'
                      ? 'Your French translation'
                      : currentQ.type === 'fill-in-the-blank'
                        ? 'Type the missing phrase'
                        : 'Complete the sentence'}
                  </label>
                  <textarea
                    value={selectedOption || ''}
                    onChange={(event) => setSelectedOption(event.target.value)}
                    disabled={hasChecked}
                    rows={3}
                    placeholder={
                      currentQ.type === 'translate-english-to-french'
                        ? 'Écrivez la traduction en français...'
                        : 'Répondez en français...'
                    }
                    className="w-full rounded-xl border border-[#D9CFBA] bg-white px-3.5 py-3 text-xs text-[#1B2433] shadow-2xs outline-none focus:border-[#1F3A5F] focus:ring-2 focus:ring-[#1F3A5F]/10 resize-none disabled:opacity-60"
                  />
                </div>
              )}

              {/* Explanation */}
              {hasChecked && (
                <div className="p-4 bg-[#FBF7EE] rounded-xl border border-[#E6DCC8] text-xs text-[#1F3A5F] animate-in fade-in">
                  <strong className="text-[#1F3A5F] block mb-0.5 font-serif">Explanation:</strong>
                  {currentQ.explanation}
                </div>
              )}

              {/* Action */}
              <div className="pt-2">
                {!hasChecked ? (
                  <button
                    disabled={!selectedOption}
                    onClick={handleCheck}
                    className="w-full py-3 bg-[#1F3A5F] hover:bg-[#1F3A5F] disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="w-full py-3 bg-[#1F3A5F] hover:bg-[#1F3A5F] text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};
