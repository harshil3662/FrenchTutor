import React, { useState } from 'react';
import { Stethoscope, Sparkles, CheckCircle2, AlertCircle, Volume2, BookOpen, ArrowRight, Table } from 'lucide-react';
import { speakFrench, playChime } from '../utils/audioUtils.js';
import { analyzeFrenchGrammarLocally } from '../utils/frenchGrammarEngine.js';

export const GrammarDoctorView = ({ audioSpeed, onAwardXp }) => {
  const [inputText, setInputText] = useState('Hier, elle a allé au marché et elle a acheté du pain.');
  const [targetTense, setTargetTense] = useState('General');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const sampleQueries = [
    { text: 'Hier, elle a allé au supermarché.', desc: 'Past participle agreement with Être' },
    { text: 'Il faut que tu viens à la fête ce soir.', desc: 'Subjunctive mood trigger' },
    { text: 'Si j\'avais le temps, je voyagerai en France.', desc: 'Hypothetical & Conditional' },
    { text: 'Je mange beaucoup des croissants le matin.', desc: 'Partitive articles & Quantities' },
  ];

  const handleAnalyze = async (overrideText) => {
    const textToAnalyze = (overrideText || inputText).trim();
    if (!textToAnalyze || isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/grammar-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToAnalyze,
          targetTense,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.correctedText && !data.error) {
          setResult(data);
          playChime('correct');
          onAwardXp(15);
          return;
        }
      }
      throw new Error('API returned invalid result');
    } catch (e) {
      console.warn('Using local grammar doctor engine fallback:', e);
      const localResult = analyzeFrenchGrammarLocally(textToAnalyze, targetTense);
      setResult(localResult);
      playChime('correct');
      onAwardXp(15);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="grammar-doctor-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-[#F0ECE1] border border-[#5A5A40]/20 text-[#5A5A40] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Grammar & Linguistics Clinic</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#34342E] font-serif">AI Diagnostics & Conjugator</h2>
          <p className="text-sm text-[#525248] max-w-2xl leading-relaxed">
            Enter any French sentence to get a full grammatical checkup, agreement corrections, conjugation tables, and register analysis.
          </p>
        </div>
      </div>

      {/* Input Analysis Card */}
      <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#7A7A6A] block">
            Your French sentence to diagnose
          </label>
          <textarea
            id="grammar-text-input"
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Write or paste a French sentence..."
            className="w-full bg-[#FAF7F2] border border-[#DCDCCF] focus:border-[#5A5A40] rounded-2xl p-4 text-[#34342E] text-sm focus:outline-none placeholder-[#7A7A6A] shadow-xs"
          />
        </div>

        {/* Quick sample chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-[#7A7A6A]">Quick test examples:</span>
          {sampleQueries.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(sample.text);
                handleAnalyze(sample.text);
              }}
              className="text-xs bg-[#F0ECE1] hover:bg-[#EAE6DF] text-[#5A5A40] px-3 py-1 rounded-xl border border-[#5A5A40]/20 transition-colors cursor-pointer font-medium"
            >
              {sample.desc}
            </button>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button
            id="run-grammar-check-btn"
            disabled={!inputText.trim() || isLoading}
            onClick={() => handleAnalyze()}
            className="px-6 py-3 bg-[#5A5A40] hover:bg-[#4A4A35] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? 'Analyzing grammar...' : 'Diagnose Sentence'}</span>
          </button>
        </div>
      </div>

      {/* Diagnostic Results Report */}
      {result && (
        <div className="space-y-6 animate-in fade-in">
          {/* Main Verdict Card */}
          <div className={`rounded-3xl p-6 sm:p-8 border shadow-sm ${
            result.isCorrect
              ? 'bg-[#EEF4EE] border-[#5A7A5A]/30 text-[#34342E]'
              : 'bg-white border-[#E8E2D9] text-[#34342E]'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2.5">
                {result.isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-[#5A7A5A]" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-[#D98E73]" />
                )}
                <h3 className="text-lg font-bold text-[#34342E] font-serif">
                  {result.isCorrect ? 'Sentence is Fully Correct!' : 'Recommended Corrections'}
                </h3>
              </div>

              {result.registerAnalysis && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F0ECE1] text-[#5A5A40] border border-[#5A5A40]/20">
                  Register: {result.registerAnalysis}
                </span>
              )}
            </div>

            {/* Corrected Text Box */}
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D9] space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A6A] block">
                Recommended Model Version
              </span>
              <div className="flex items-center justify-between">
                <p className="text-base sm:text-lg font-bold text-[#5A7A5A] font-serif">
                  {result.correctedText}
                </p>
                <button
                  onClick={() => speakFrench(result.correctedText, audioSpeed)}
                  className="p-2 rounded-xl bg-[#F0ECE1] text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white transition-colors border border-[#5A5A40]/20 shadow-xs"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Errors List */}
            {result.errors && result.errors.length > 0 && (
              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7A6A]">
                  Grammar Rules & Explanations ({result.errors.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.errors.map((err, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8E2D9] space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#C05C54] line-through">{err.mistake}</span>
                        <span className="text-[#5A7A5A] font-bold">→ {err.correction}</span>
                      </div>
                      <p className="text-xs text-[#525248] leading-relaxed">{err.rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Conjugation Tables (if verbs identified) */}
          {result.conjugations && result.conjugations.length > 0 && (
            <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center space-x-2 text-[#34342E] font-bold text-base">
                <Table className="w-5 h-5 text-[#5A5A40]" />
                <h3 className="font-serif">Conjugation Table: Verb "{result.conjugations[0].verb}" ({result.conjugations[0].tense})</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {Object.entries(result.conjugations[0].table).map(([pronoun, conj], idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E2D9] text-center space-y-1 shadow-xs"
                  >
                    <span className="text-xs text-[#7A7A6A] font-semibold block">{pronoun}</span>
                    <span className="text-sm font-bold text-[#5A5A40] font-serif">{conj}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
