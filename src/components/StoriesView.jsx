import React, { useState } from 'react';
import { BookCheck, Sparkles, Volume2, Languages, CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { speakFrench, playChime } from '../utils/audioUtils.js';

export const StoriesView = ({ activeLevel, audioSpeed, onAwardXp }) => {
  const [topicInput, setTopicInput] = useState('A sunny afternoon in Montmartre');
  const [showEnglish, setShowEnglish] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [story, setStory] = useState({
    title: 'Une après-midi à Montmartre',
    level: activeLevel,
    frenchText: "Julien et Sarah se promènent dans les ruelles pavées de Montmartre. Le soleil brille sur la basilique du Sacré-Cœur. Sur la place du Tertre, des artistes peignent des portraits colorés. Ils s'arrêtent dans un petit café pour déguster une tartelette aux framboises et un chocolat chaud. « Regarde la vue sur tout Paris ! » s'exclame Sarah avec un grand sourire.",
    englishTranslation: "Julien and Sarah stroll along the cobblestone alleys of Montmartre. The sun shines on the Sacré-Cœur basilica. In the Place du Tertre, artists paint colorful portraits. They stop at a small café to savor a raspberry tartlet and a hot chocolate. 'Look at the view over all of Paris!' exclaims Sarah with a big smile.",
    glossary: [
      { french: 'ruelles pavées', english: 'cobblestone alleys', type: 'noun (f pl)' },
      { french: 's\'arrêtent', english: 'stop / pause', type: 'verb' },
      { french: 'déguster', english: 'to savor / taste', type: 'verb' },
      { french: 's\'exclame', english: 'exclaims', type: 'verb' },
    ],
    comprehensionQuestions: [
      {
        question: 'Où se promènent Julien et Sarah ?',
        options: ['À la tour Eiffel', 'À Montmartre', 'Au bord de la mer à Nice', 'Au musée du Louvre'],
        correctIndex: 1,
        explanation: 'The text states: "Julien et Sarah se promènent dans les ruelles pavées de Montmartre."',
      },
      {
        question: 'Qu\'est-ce qu\'ils dégustent au café ?',
        options: ['Du fromage et du vin', 'Une baguette et du beurre', 'Une tartelette aux framboises et un chocolat chaud', 'Une glace à la vanille'],
        correctIndex: 2,
        explanation: 'They order a raspberry tartlet and a hot chocolate.',
      },
    ],
  });

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const handleGenerateStory = async (presetTopic) => {
    const topic = presetTopic || topicInput;
    setIsLoading(true);
    setSubmittedQuiz(false);
    setSelectedAnswers({});

    try {
      const res = await fetch('/api/ai/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          level: activeLevel,
          theme: 'culture & daily life',
        }),
      });

      const data = await res.json();
      setStory(data);
      playChime('correct');
      onAwardXp(15);
    } catch (e) {
      console.error('Story generation error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizSubmit = () => {
    setSubmittedQuiz(true);
    let correctCount = 0;
    story.comprehensionQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    if (correctCount === story.comprehensionQuestions.length) {
      playChime('celebrate');
      onAwardXp(30);
    } else {
      playChime('click');
    }
  };

  return (
    <div id="stories-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-[#F0ECE1] border border-[#5A5A40]/20 text-[#5A5A40] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <BookCheck className="w-3.5 h-3.5" />
            <span>Reading Comprehension & Bilingual Stories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#34342E] font-serif">French Stories & Cultural Tales</h2>
          <p className="text-sm text-[#525248] max-w-2xl leading-relaxed">
            Build your intuition and vocabulary with engaging short stories tailored to your CEFR {activeLevel} level.
          </p>
        </div>

        <button
          id="generate-new-story-btn"
          disabled={isLoading}
          onClick={() => handleGenerateStory()}
          className="px-5 py-3 bg-[#5A5A40] hover:bg-[#4A4A35] disabled:opacity-50 text-white rounded-2xl font-bold text-xs shadow-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isLoading ? 'Generating story...' : 'Generate New Story with AI'}</span>
        </button>
      </div>

      {/* Story Topic Prompts */}
      <div className="flex flex-wrap gap-2">
        {[
          'An evening at a French cinema',
          'The crêpe festival in Brittany',
          'Behind the scenes of a gourmet bistro in Lyon',
          'A boat ride along the Seine',
        ].map((preset, idx) => (
          <button
            key={idx}
            onClick={() => {
              setTopicInput(preset);
              handleGenerateStory(preset);
            }}
            className="text-xs bg-white hover:bg-[#FAF7F2] text-[#525248] border border-[#DCDCCF] px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            📖 {preset}
          </button>
        ))}
      </div>

      {/* Main Story Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Story Reading Pane */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            {/* Title & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E8E2D9] pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-[#5A5A40]">Level {story.level}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#34342E] font-serif">{story.title}</h3>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => speakFrench(story.frenchText, audioSpeed)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F0ECE1] text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white border border-[#5A5A40]/20 text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Audio Narration</span>
                </button>
                <button
                  onClick={() => setShowEnglish(!showEnglish)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    showEnglish
                      ? 'bg-[#EEF4EE] text-[#3A5A3A] border-[#5A7A5A]/30'
                      : 'bg-white text-[#7A7A6A] border-[#DCDCCF] hover:text-[#34342E]'
                  }`}
                >
                  <Languages className="w-4 h-4" />
                  <span>{showEnglish ? 'Hide English' : 'Show Translation'}</span>
                </button>
              </div>
            </div>

            {/* French Text */}
            <div className="prose max-w-none">
              <p className="text-base sm:text-lg leading-relaxed text-[#34342E] font-serif">
                {story.frenchText}
              </p>
            </div>

            {/* English Translation Side Box */}
            {showEnglish && (
              <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D9] text-sm text-[#525248] leading-relaxed italic animate-in fade-in">
                <span className="text-xs font-bold uppercase text-[#7A7A6A] block mb-1 font-serif not-italic">
                  English Translation
                </span>
                {story.englishTranslation}
              </div>
            )}
          </div>

          {/* Comprehension Quiz */}
          {story.comprehensionQuestions && story.comprehensionQuestions.length > 0 && (
            <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h4 className="text-base font-bold text-[#34342E] flex items-center gap-2 font-serif">
                <CheckCircle2 className="w-5 h-5 text-[#5A7A5A]" />
                Comprehension Questions
              </h4>

              <div className="space-y-6">
                {story.comprehensionQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="space-y-3">
                    <p className="text-sm font-bold text-[#34342E]">
                      {qIdx + 1}. {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedAnswers[qIdx] === optIdx;
                        let btnStyle = 'bg-[#FAF7F2] border-[#E8E2D9] text-[#525248] hover:border-[#5A5A40]/40';

                        if (submittedQuiz) {
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
                            disabled={submittedQuiz}
                            onClick={() => setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))}
                            className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {submittedQuiz && (
                      <p className="text-xs text-[#7A7A6A] italic mt-1 font-serif">
                        💡 {q.explanation}
                      </p>
                    )}
                  </div>
                ))}

                {!submittedQuiz ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(selectedAnswers).length < story.comprehensionQuestions.length}
                    className="w-full py-3 bg-[#5A5A40] hover:bg-[#4A4A35] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    Submit Answers
                  </button>
                ) : (
                  <div className="p-3 bg-[#EEF4EE] border border-[#5A7A5A]/30 rounded-xl text-center text-xs font-bold text-[#3A5A3A]">
                    Quiz completed! You have earned XP for reading this story.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Glossary Sidebar */}
        <div className="space-y-6">
          <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 space-y-4 shadow-sm">
            <h4 className="text-sm font-bold text-[#34342E] font-serif">Story Vocabulary & Glossary</h4>
            <div className="space-y-2.5">
              {story.glossary?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E2D9] flex items-center justify-between shadow-xs"
                >
                  <div>
                    <span className="text-xs font-bold text-[#34342E] font-serif">{item.french}</span>
                    <span className="text-[10px] text-[#7A7A6A] block">{item.type}</span>
                    <p className="text-xs text-[#5A5A40] font-medium">{item.english}</p>
                  </div>
                  <button
                    onClick={() => speakFrench(item.french, audioSpeed)}
                    className="p-2 text-[#7A7A6A] hover:text-[#34342E] cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
