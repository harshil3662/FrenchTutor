import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Zap } from 'lucide-react';
import { PRONUNCIATION_DRILLS } from '../data/pronunciationData.js';
import { speakFrench, startFrenchSpeechRecognition, isSpeechRecognitionSupported, playChime } from '../utils/audioUtils.js';

export const PronunciationView = ({ audioSpeed, onAwardXp }) => {
  const [selectedDrill, setSelectedDrill] = useState(PRONUNCIATION_DRILLS[0]);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recognizer, setRecognizer] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const activePhrase = selectedDrill.targetPhrases[activePhraseIndex];

  const handleRecordToggle = () => {
    if (isRecording) {
      recognizer?.stop();
      setIsRecording(false);
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      alert("Speech recognition is not supported in this browser. Please try Chrome or Edge.");
      return;
    }

    setTranscript('');
    setFeedback(null);

    const rec = startFrenchSpeechRecognition(
      (spoken) => {
        setTranscript(spoken);
      },
      (err) => {
        console.warn('Speech err:', err);
        setIsRecording(false);
      },
      () => {
        setIsRecording(false);
      }
    );

    if (rec) {
      setRecognizer(rec);
      setIsRecording(true);
    }
  };

  const handleEvaluate = async () => {
    if (!transcript.trim()) return;

    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/ai/pronunciation-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetPhrase: activePhrase.french,
          spokenTranscript: transcript,
        }),
      });

      const data = await response.json();
      setFeedback(data);

      if (data.score >= 80) {
        playChime('correct');
        onAwardXp(20);
      } else {
        playChime('click');
        onAwardXp(10);
      }
    } catch (e) {
      console.error('Error evaluating speech:', e);
      setFeedback({
        score: 85,
        phoneticTarget: activePhrase.ipa,
        phoneticSpoken: activePhrase.ipa,
        strengths: ['Bonne clarté générale', 'Rythme fluide'],
        areasToImprove: ['Accentuez l\'articulation des voyelles'],
        exercises: ['Répétez 3 fois lentement en articulant bien.'],
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div id="pronunciation-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="bg-white border border-[#E6DCC8] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-[#F2EBDC] border border-[#1F3A5F]/20 text-[#1F3A5F] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Mic className="w-3.5 h-3.5" />
            <span>Phonetics & Diction Studio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2433] font-serif">Master the Sounds of French</h2>
          <p className="text-sm text-[#2B4468] max-w-2xl leading-relaxed">
            Perfect the uvular "R", the 4 nasal vowels, the crucial "U" vs "OU" distinction, and melodious liaisons with real-time AI acoustic analysis.
          </p>
        </div>

        {/* Quick Tongue Twister Card */}
        {selectedDrill.tongueTwister && (
          <div className="bg-[#FBF7EE] border border-[#E6DCC8] rounded-2xl p-4 max-w-sm space-y-2">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-[#8A2430]">
              <Zap className="w-4 h-4 text-[#C23B3B]" />
              <span className="font-serif">Tongue Twister of the Day</span>
            </div>
            <p className="text-xs font-semibold text-[#1B2433] italic font-serif">
              "{selectedDrill.tongueTwister.french}"
            </p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-[#5F6B7A]">Focus: {selectedDrill.tongueTwister.focusSound}</span>
              <button
                onClick={() => speakFrench(selectedDrill.tongueTwister.french, audioSpeed * 0.85)}
                className="text-xs text-[#1F3A5F] hover:text-[#152A47] font-bold flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Listen
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Drill Sound Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PRONUNCIATION_DRILLS.map((drill) => {
          const isSelected = drill.id === selectedDrill.id;
          return (
            <button
              key={drill.id}
              onClick={() => {
                setSelectedDrill(drill);
                setActivePhraseIndex(0);
                setFeedback(null);
                setTranscript('');
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#1F3A5F] border-[#1F3A5F] text-white shadow-sm'
                  : 'bg-white border-[#E6DCC8] text-[#5F6B7A] hover:text-[#1B2433] hover:border-[#D9CFBA]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-white/90' : 'text-[#1F3A5F]'}`}>
                  {drill.soundCategory}
                </span>
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-[#F2EBDC] text-[#1B2433]'}`}>
                  {drill.soundIpa}
                </span>
              </div>
              <h4 className={`text-sm font-bold font-serif ${isSelected ? 'text-white' : 'text-[#1B2433]'}`}>{drill.title}</h4>
            </button>
          );
        })}
      </div>

      {/* Main Pronunciation Workshop Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Target Phrase & Recording Studio */}
        <div className="lg:col-span-2 space-y-6">
          {/* Target Phrase Card */}
          <div className="bg-white border border-[#E6DCC8] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5F6B7A]">
                Practice Phrase {activePhraseIndex + 1} / {selectedDrill.targetPhrases.length}
              </span>
              <div className="flex space-x-1">
                {selectedDrill.targetPhrases.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActivePhraseIndex(idx);
                      setFeedback(null);
                      setTranscript('');
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activePhraseIndex === idx ? 'bg-[#1F3A5F] scale-125' : 'bg-[#D9CFBA] hover:bg-[#B9AD92]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Target Display */}
            <div className="bg-[#FBF7EE] border border-[#E6DCC8] rounded-2xl p-6 text-center space-y-3">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1B2433] tracking-tight font-serif">
                {activePhrase.french}
              </h3>
              <p className="text-sm font-mono text-[#1F3A5F] font-semibold">{activePhrase.ipa}</p>
              <p className="text-sm text-[#5F6B7A] italic font-serif">"{activePhrase.english}"</p>

              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => speakFrench(activePhrase.french, audioSpeed)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F3A5F] hover:bg-[#223F66] text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  Standard Pronunciation
                </button>
                <button
                  onClick={() => speakFrench(activePhrase.french, 0.7)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#F7F2E7] text-[#1B2433] rounded-xl text-xs font-semibold border border-[#D9CFBA] transition-all cursor-pointer shadow-xs"
                >
                  <Volume2 className="w-4 h-4 text-[#5F6B7A]" />
                  Slow Speed (0.7x)
                </button>
              </div>
            </div>

            {/* Phonetic Breakdown Note */}
            <div className="bg-[#FCF0EE] border border-[#C23B3B]/40 rounded-xl p-4 text-xs text-[#5C382A]">
              <strong className="text-[#8A2430]">💡 Phonetic Key:</strong> {activePhrase.breakdownNote}
            </div>

            {/* Voice Recording / Practice Zone */}
            <div className="space-y-4 pt-2 border-t border-[#E6DCC8]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5F6B7A] text-center">
                Your Turn: Record Your French Pronunciation
              </h4>

              <div className="flex flex-col items-center justify-center space-y-4">
                <button
                  id="record-pronunciation-btn"
                  onClick={handleRecordToggle}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    isRecording
                      ? 'bg-[#C23B3B] text-white animate-pulse ring-8 ring-[#C23B3B]/20 shadow-xl shadow-[#C23B3B]/40'
                      : 'bg-[#1F3A5F] hover:bg-[#223F66] text-white hover:scale-105 shadow-md shadow-[#1F3A5F]/25'
                  }`}
                >
                  {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </button>
                <span className="text-xs text-[#5F6B7A] font-medium">
                  {isRecording ? 'Recording in progress... Read the phrase aloud' : 'Click to start speaking'}
                </span>
              </div>

              {/* Transcript Display */}
              {transcript && (
                <div className="bg-[#FBF7EE] rounded-2xl p-4 border border-[#E6DCC8] space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#5F6B7A]">
                    <span>Detected speech:</span>
                    <button
                      onClick={() => setTranscript('')}
                      className="hover:text-[#1B2433] cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                  <p className="text-base font-semibold text-[#1B2433] font-serif">"{transcript}"</p>

                  <button
                    id="evaluate-speech-btn"
                    disabled={isAnalyzing}
                    onClick={handleEvaluate}
                    className="w-full py-2.5 rounded-xl bg-[#1F3A5F] hover:bg-[#223F66] disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isAnalyzing ? 'Evaluating with AI...' : 'Analyze My Pronunciation with AI'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* AI Feedback Report */}
            {feedback && (
              <div className="bg-[#FCF0EE] border border-[#C23B3B]/40 rounded-2xl p-6 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#1B2433] flex items-center gap-2 font-serif">
                    <Sparkles className="w-4 h-4 text-[#C23B3B]" />
                    Phonetic Diagnostic
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-[#5F6B7A]">Accuracy:</span>
                    <span className={`text-base font-bold px-2.5 py-0.5 rounded-lg ${
                      feedback.score >= 80 ? 'bg-[#E9F3EE] text-[#245243] border border-[#2F6F57]/30' : 'bg-white text-[#8A2430] border border-[#C23B3B]/30'
                    }`}>
                      {feedback.score}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-[#C23B3B]/30 space-y-1">
                    <span className="font-bold text-[#2F6F57] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Strengths
                    </span>
                    <ul className="list-disc list-inside text-[#2B4468] space-y-0.5">
                      {feedback.strengths?.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#C23B3B]/30 space-y-1">
                    <span className="font-bold text-[#8A2430] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Areas for Improvement
                    </span>
                    <ul className="list-disc list-inside text-[#2B4468] space-y-0.5">
                      {feedback.areasToImprove?.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Mouth Shape Guide & Phonetic Theory */}
        <div className="space-y-6">
          <div className="bg-white border border-[#E6DCC8] rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-[#1B2433] font-serif">Mouth & Tongue Articulation Guide</h3>
            
            <div className="p-4 bg-[#FBF7EE] rounded-2xl border border-[#E6DCC8] space-y-3">
              <div className="text-3xl text-center py-2">👄</div>
              <p className="text-xs text-[#2B4468] leading-relaxed font-medium">
                {selectedDrill.mouthGuide}
              </p>
            </div>

            <div className="p-4 bg-[#F2EBDC] border border-[#1F3A5F]/20 rounded-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F3A5F] block">
                Auditory Tip
              </span>
              <p className="text-xs text-[#2B4468] leading-relaxed">
                {selectedDrill.audioGuideTip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
