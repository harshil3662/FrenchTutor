import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, BrainCircuit } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playChime } from '../utils/audioUtils.js';
import { useModalTracker } from '../utils/modalState.js';

export const AiQuizModal = ({ topic, level, onClose, onAwardXp }) => {
  useModalTracker(true);
  const [isLoading, setIsLoading] = useState(true);
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Lock background scroll when AI Quiz modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    async function fetchQuiz() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/ai/generate-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic,
            level,
            questionCount: 4,
          }),
        });

        const data = await res.json();
        setQuizTitle(data.title || `AI Quiz: ${topic}`);
        setQuestions(data.questions || []);
      } catch (e) {
        console.error('Failed to generate quiz:', e);
        // fallback
        setQuizTitle(`Review Quiz (${level})`);
        setQuestions([
          {
            id: 'q1',
            type: 'multiple-choice',
            prompt: "How do you say 'I would like a croissant please' in French?",
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
            prompt: "Which is the correct form: 'Hier soir, nous ___ au restaurant.'",
            options: ["avons mangé", "mangions", "mangeons", "mangerons"],
            correctAnswer: "avons mangé",
            explanation: "Passé composé with auxiliary 'avoir' for a completed past action.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuiz();
  }, [topic, level]);

  const currentQ = questions[currentIndex];

  const handleCheck = () => {
    if (!selectedOption || !currentQ) return;
    const isCorrect = selectedOption.trim() === currentQ.correctAnswer.trim();
    setHasChecked(true);

    if (isCorrect) {
      playChime('correct');
      setScore((s) => s + 1);
    } else {
      playChime('incorrect');
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setHasChecked(false);
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
    <div id="ai-quiz-modal-overlay" className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-[#34342E]/70 backdrop-blur-sm animate-in fade-in overscroll-contain">
      <div className="bg-white border border-[#E8E2D9] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col text-[#34342E]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E2D9] bg-[#FAF7F2] shrink-0">
          <div className="flex items-center space-x-2.5">
            <BrainCircuit className="w-5 h-5 text-[#5A5A40]" />
            <h3 className="font-bold text-[#34342E] text-base font-serif">
              {isLoading ? 'Generating Quiz...' : quizTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close quiz modal"
            className="p-1.5 text-[#7A7A6A] hover:text-[#34342E] hover:bg-[#F0ECE1] rounded-xl cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto overscroll-contain flex-1">
          {isLoading ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 border-4 border-[#5A5A40] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-[#525248] font-medium">
                Gemini is generating tailored questions for your {level} level...
              </p>
            </div>
          ) : isFinished ? (
            <div className="text-center py-8 space-y-6 animate-in zoom-in-95">
              <div className="text-5xl">🏆</div>
              <div className="space-y-1">
                <h4 className="text-2xl font-bold text-[#34342E] font-serif">Quiz Completed!</h4>
                <p className="text-sm text-[#7A7A6A]">
                  Your score: <strong className="text-[#5A7A5A] font-serif">{score} / {questions.length}</strong>
                </p>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D9] max-w-xs mx-auto text-xs text-[#5A5A40] font-bold">
                +{score * 15 + 20} XP added to your profile!
              </div>

              <button
                onClick={onClose}
                className="px-6 py-3 bg-[#5A5A40] hover:bg-[#4A4A35] text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
              >
                Close & Continue
              </button>
            </div>
          ) : currentQ ? (
            <div className="space-y-6">
              {/* Progress */}
              <div className="flex items-center justify-between text-xs text-[#7A7A6A]">
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span className="text-[#5A5A40] font-bold">Score: {score}</span>
              </div>

              <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D9] space-y-2">
                <h4 className="text-base font-bold text-[#34342E] leading-snug font-serif">
                  {currentQ.prompt}
                </h4>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  let style = 'bg-white border-[#DCDCCF] text-[#34342E] hover:bg-[#FAF7F2]';

                  if (hasChecked) {
                    if (opt === currentQ.correctAnswer) {
                      style = 'bg-[#EEF4EE] border-[#5A7A5A] text-[#3A5A3A] font-bold';
                    } else if (isSelected && opt !== currentQ.correctAnswer) {
                      style = 'bg-[#FAF3EE] border-[#C05C54] text-[#C05C54] font-bold';
                    }
                  } else if (isSelected) {
                    style = 'bg-[#F0ECE1] border-[#5A5A40] text-[#34342E] font-semibold shadow-xs';
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

              {/* Explanation */}
              {hasChecked && (
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8E2D9] text-xs text-[#525248] animate-in fade-in">
                  <strong className="text-[#5A5A40] block mb-0.5 font-serif">Explanation:</strong>
                  {currentQ.explanation}
                </div>
              )}

              {/* Action */}
              <div className="pt-2">
                {!hasChecked ? (
                  <button
                    disabled={!selectedOption}
                    onClick={handleCheck}
                    className="w-full py-3 bg-[#5A5A40] hover:bg-[#4A4A35] disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="w-full py-3 bg-[#5A5A40] hover:bg-[#4A4A35] text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};
