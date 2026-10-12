import React, { useState } from 'react';
import {
  Wand2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Volume2,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  BookOpen,
  Info,
  Flame,
  Binary,
} from 'lucide-react';
import { speakFrench, playChime } from '../utils/audioUtils.js';
import { transformFrenchAspectLocally, dissectFrenchSentenceLocally } from '../utils/frenchGrammarEngine.js';

const PRESET_SENTENCES = [
  {
    text: "Julien mange une pomme rouge dans la cuisine.",
    label: "Simple Transitive (COD + Lieu)",
    aspectHints: ["Passé Composé", "Subjonctif Présent", "Passive Voice", "Ne... plus", "Replace COD with pronoun"],
  },
  {
    text: "Marie donne le cadeau à son amie.",
    label: "Double Object (COD + COI)",
    aspectHints: ["Replace with double pronouns (le lui)", "Passé Composé (agreement check)", "Ne... jamais", "Conditionnel Présent"],
  },
  {
    text: "Nous partons en vacances en Italie.",
    label: "Motion & Preposition (Y / En)",
    aspectHints: ["Replace location with 'Y'", "Futur Simple", "Plus-que-parfait", "Subjonctif Présent"],
  },
  {
    text: "L'architecte construit une maison moderne.",
    label: "Active Voice Construction",
    aspectHints: ["Passive Voice", "Passé Composé (accord COD)", "Conditionnel Passé", "Ne... rien"],
  },
  {
    text: "Tu as acheté trois croissants chauds.",
    label: "Quantity & Partitive (En)",
    aspectHints: ["Replace quantity with 'En'", "Imparfait", "Ne... aucun", "Subjonctif"],
  },
];

const TRANSFORMATION_OPERATIONS = [
  {
    category: 'Tenses & Moods',
    aspect: 'tense',
    options: [
      { id: 'Présent de l\'indicatif', label: 'Présent' },
      { id: 'Passé Composé', label: 'Passé Composé (Aspect Accompli)' },
      { id: 'Imparfait', label: 'Imparfait (Aspect Inachevé / Habitude)' },
      { id: 'Plus-que-parfait', label: 'Plus-que-parfait (Antériorité)' },
      { id: 'Futur Simple', label: 'Futur Simple' },
      { id: 'Futur Proche', label: 'Futur Proche (Aller + Infinitif)' },
      { id: 'Conditionnel Présent', label: 'Conditionnel Présent' },
      { id: 'Conditionnel Passé', label: 'Conditionnel Passé' },
      { id: 'Subjonctif Présent', label: 'Subjonctif Présent (Il faut que...)' },
    ],
  },
  {
    category: 'Voice & Diathesis',
    aspect: 'voice',
    options: [
      { id: 'Passive Voice', label: 'Voix Passive (Être + Participe + Par)' },
      { id: 'Active Voice', label: 'Voix Active' },
      { id: 'Passif Pronominal', label: 'Passif Pronominal (Se + Verbe)' },
    ],
  },
  {
    category: 'Polarity & Negation',
    aspect: 'negation',
    options: [
      { id: 'Ne... pas (Standard)', label: 'Ne... pas (Standard)' },
      { id: 'Ne... plus (Cessation)', label: 'Ne... plus (No longer)' },
      { id: 'Ne... jamais (Frequency)', label: 'Ne... jamais (Never)' },
      { id: 'Ne... rien (Object Total)', label: 'Ne... rien (Nothing)' },
      { id: 'Ne... personne (Human Total)', label: 'Ne... personne (Nobody)' },
      { id: 'Ne... aucun (Determiner)', label: 'Ne... aucun(e) (Not a single)' },
    ],
  },
  {
    category: 'Pronominalization',
    aspect: 'pronoun_replacement',
    options: [
      { id: 'Replace direct object with COD (le/la/les)', label: 'Pronoms COD (le, la, les)' },
      { id: 'Replace indirect object with COI (lui/leur)', label: 'Pronoms COI (lui, leur)' },
      { id: 'Replace prepositional place/thing with Y', label: 'Pronom Adverbial « Y »' },
      { id: 'Replace partitive/quantity with En', label: 'Pronom « En »' },
      { id: 'Replace with double pronouns (COD + COI)', label: 'Double Pronominalisation' },
    ],
  },
  {
    category: 'Hypothetical "Si" Clauses',
    aspect: 'hypothetical',
    options: [
      { id: 'Type 1: Si + Présent -> Futur Simple', label: 'Type 1 : Hypothèse réelle (Si + Présent)' },
      { id: 'Type 2: Si + Imparfait -> Conditionnel Présent', label: 'Type 2 : Hypothèse imaginaire (Si + Imparfait)' },
      { id: 'Type 3: Si + Plus-que-parfait -> Conditionnel Passé', label: 'Type 3 : Regret irréel passé (Si + PQP)' },
    ],
  },
];

export const GrammarWorkbenchView = ({
  audioSpeed,
  activeLevel,
  onAwardXp,
}) => {
  const [sourceSentence, setSourceSentence] = useState('Julien mange une pomme rouge dans la cuisine.');
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [selectedOperation, setSelectedOperation] = useState('Passé Composé');
  const [isTransforming, setIsTransforming] = useState(false);
  const [isDissecting, setIsDissecting] = useState(false);
  const [transformationResult, setTransformationResult] = useState(null);
  const [dissectionResult, setDissectionResult] = useState(null);

  const activeCategory = TRANSFORMATION_OPERATIONS[selectedCategoryIdx];

  const handleAudioPlay = (text) => {
    try {
      speakFrench(text, audioSpeed || 0.95);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  };

  const handleTransform = async () => {
    if (!sourceSentence.trim()) return;
    setIsTransforming(true);
    try {
      const res = await fetch('/api/ai/grammar-transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sentence: sourceSentence,
          targetAspect: activeCategory.aspect,
          targetValue: selectedOperation,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.transformedSentence && !data.error) {
          setTransformationResult(data);
          playChime('correct');
          onAwardXp(15);
          return;
        }
      }
      throw new Error('API returned non-optimal result');
    } catch (e) {
      console.warn('Using local linguistic transformation engine fallback:', e);
      const localResult = transformFrenchAspectLocally(sourceSentence, activeCategory.aspect, selectedOperation);
      setTransformationResult(localResult);
      playChime('correct');
      onAwardXp(15);
    } finally {
      setIsTransforming(false);
    }
  };

  const handleDissect = async () => {
    if (!sourceSentence.trim()) return;
    setIsDissecting(true);
    try {
      const res = await fetch('/api/ai/dissect-sentence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sentence: sourceSentence,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && (data.syntacticTokens || data.aspects) && !data.error) {
          setDissectionResult(data);
          playChime('correct');
          onAwardXp(15);
          return;
        }
      }
      throw new Error('API returned non-optimal result');
    } catch (e) {
      console.warn('Using local sentence dissection engine fallback:', e);
      const localDissection = dissectFrenchSentenceLocally(sourceSentence);
      setDissectionResult(localDissection);
      playChime('correct');
      onAwardXp(15);
    } finally {
      setIsDissecting(false);
    }
  };

  return (
    <div id="grammar-workbench-view" className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-[#F2EBDC] border border-[#1F3A5F]/20 text-[#1F3A5F] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Grammatical Aspect Transformation Laboratory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2433] font-serif">
            Grammar Aspect Workbench & Transformer
          </h2>
          <p className="text-sm text-[#2B4468] max-w-2xl leading-relaxed">
            Shift grammatical aspects, tenses, negation polarity, and voice in real-time. Witness how French syntax, agreement rules, and pronouns mathematically adapt.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDissect}
            disabled={isDissecting || !sourceSentence.trim()}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FBF7EE] border border-[#D9CFBA] text-[#1B2433] font-bold text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Binary className="w-4 h-4 text-[#1F3A5F]" />
            <span>{isDissecting ? 'Parsing Syntax...' : 'Dissect Sentence'}</span>
          </button>
        </div>
      </div>

      {/* Preset Suggestions */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#5F6B7A] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#C23B3B]" />
          Select a sample French sentence or type your own:
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_SENTENCES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSourceSentence(preset.text);
                setTransformationResult(null);
                setDissectionResult(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all text-left cursor-pointer ${
                sourceSentence === preset.text
                  ? 'bg-[#1F3A5F] text-white border-[#1F3A5F] shadow-xs'
                  : 'bg-white text-[#2B4468] border-[#E6DCC8] hover:bg-[#FBF7EE]'
              }`}
            >
              <span className="font-semibold">{preset.label}: </span>
              <span className="italic">« {preset.text} »</span>
            </button>
          ))}
        </div>
      </div>

      {/* Source Input Box */}
      <div className="bg-white border border-[#E6DCC8] rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-[#1F3A5F] font-serif flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            Input French Sentence
          </label>
          <button
            onClick={() => handleAudioPlay(sourceSentence)}
            className="flex items-center gap-1 text-xs text-[#5F6B7A] hover:text-[#1B2433] font-semibold cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5" />
            Listen
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            value={sourceSentence}
            onChange={(e) => setSourceSentence(e.target.value)}
            placeholder="Type any French sentence to transform or dissect..."
            className="w-full px-4 py-3.5 rounded-2xl bg-[#FBF7EE] border border-[#E6DCC8] text-[#1B2433] text-base font-serif focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] transition-all"
          />
        </div>

        {/* Aspect Transformation Controls */}
        <div className="pt-4 border-t border-[#E6DCC8] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5F6B7A]">
              Choose Target Grammatical Aspect:
            </span>
          </div>

          {/* Aspect Category Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-[#FBF7EE] p-1.5 rounded-2xl border border-[#E6DCC8]">
            {TRANSFORMATION_OPERATIONS.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedCategoryIdx(idx);
                  setSelectedOperation(cat.options[0].id);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategoryIdx === idx
                    ? 'bg-[#1F3A5F] text-white shadow-xs'
                    : 'text-[#5F6B7A] hover:text-[#1B2433] hover:bg-white/70'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* Operation Sub-buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {activeCategory.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedOperation(opt.id)}
                className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                  selectedOperation === opt.id
                    ? 'bg-[#F2EBDC] border-[#1F3A5F] text-[#1B2433] shadow-xs ring-1 ring-[#1F3A5F]'
                    : 'bg-white border-[#E6DCC8] text-[#2B4468] hover:bg-[#FBF7EE]'
                }`}
              >
                <span>{opt.label}</span>
                {selectedOperation === opt.id && <CheckCircle2 className="w-4 h-4 text-[#1F3A5F] shrink-0" />}
              </button>
            ))}
          </div>

          {/* Action Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleTransform}
              disabled={isTransforming || !sourceSentence.trim()}
              className="px-6 py-3 bg-[#1F3A5F] hover:bg-[#223F66] text-white rounded-2xl font-bold text-xs shadow-sm flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <Wand2 className="w-4 h-4" />
              <span>{isTransforming ? 'Transforming Aspect...' : `Apply ${selectedOperation}`}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Transformation Result Card */}
      {transformationResult && (
        <div className="bg-white border border-[#1F3A5F]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E6DCC8] pb-4">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E9F3EE] text-[#245243] border border-[#2F6F57]/30">
                Transformed Result • {transformationResult.aspectComparison?.targetAspect || selectedOperation}
              </span>
            </div>
            <button
              onClick={() => handleAudioPlay(transformationResult.transformedSentence)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F2EBDC] text-[#1F3A5F] hover:bg-[#1F3A5F] hover:text-white transition-all text-xs font-bold cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen Narration</span>
            </button>
          </div>

          {/* Transformed Output Display */}
          <div className="p-6 bg-[#FBF7EE] rounded-2xl border border-[#E6DCC8] space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#5F6B7A] font-serif">
              Transformed French Sentence:
            </span>
            <div className="text-xl sm:text-2xl font-bold text-[#1B2433] font-serif">
              {transformationResult.transformedSentence}
            </div>
            <div className="text-sm text-[#2B4468] italic pt-1">
              « {transformationResult.englishTranslation} »
            </div>
          </div>

          {/* Rules Applied Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F3A5F] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2F6F57]" />
                Grammatical Rules Applied Step-by-Step
              </h4>
              <ul className="space-y-2">
                {transformationResult.rulesApplied?.map((rule, idx) => (
                  <li key={idx} className="text-xs text-[#2B4468] flex items-start gap-2 bg-[#FBF7EE] p-3 rounded-xl border border-[#E6DCC8]">
                    <span className="w-5 h-5 rounded-full bg-[#1F3A5F] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C23B3B] flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#C23B3B]" />
                Linguistic Nuance & Syntactic Notes
              </h4>
              <div className="p-4 bg-[#FCF0EE] rounded-2xl border border-[#C23B3B]/30 text-xs text-[#2B4468] space-y-2">
                <p className="leading-relaxed font-medium">
                  {transformationResult.explanation}
                </p>
                {transformationResult.aspectComparison?.syntacticNotes && (
                  <div className="pt-2 border-t border-[#C23B3B]/20 font-serif italic text-[#1B2433]">
                    💡 {transformationResult.aspectComparison.syntacticNotes}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dissection Result Card */}
      {dissectionResult && (
        <div className="bg-white border border-[#E6DCC8] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in">
          <div className="flex items-center justify-between border-b border-[#E6DCC8] pb-4">
            <div className="flex items-center space-x-2">
              <Binary className="w-5 h-5 text-[#1F3A5F]" />
              <h3 className="text-lg font-bold text-[#1B2433] font-serif">
                Linguistic Sentence Autopsy & Grammatical Roles
              </h3>
            </div>
            <span className="text-xs font-bold text-[#5F6B7A] uppercase">
              CEFR {activeLevel}
            </span>
          </div>

          {/* Aspect Matrix Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#FBF7EE] rounded-xl border border-[#E6DCC8] text-center">
              <span className="text-[10px] uppercase font-bold text-[#5F6B7A] block">Tense</span>
              <span className="text-xs font-bold text-[#1B2433] font-serif mt-0.5 block">{dissectionResult.aspects?.tense || 'Présent'}</span>
            </div>
            <div className="p-3 bg-[#FBF7EE] rounded-xl border border-[#E6DCC8] text-center">
              <span className="text-[10px] uppercase font-bold text-[#5F6B7A] block">Mood</span>
              <span className="text-xs font-bold text-[#1B2433] font-serif mt-0.5 block">{dissectionResult.aspects?.mood || 'Indicatif'}</span>
            </div>
            <div className="p-3 bg-[#FBF7EE] rounded-xl border border-[#E6DCC8] text-center">
              <span className="text-[10px] uppercase font-bold text-[#5F6B7A] block">Voice</span>
              <span className="text-xs font-bold text-[#1B2433] font-serif mt-0.5 block">{dissectionResult.aspects?.voice || 'Active'}</span>
            </div>
            <div className="p-3 bg-[#FBF7EE] rounded-xl border border-[#E6DCC8] text-center">
              <span className="text-[10px] uppercase font-bold text-[#5F6B7A] block">Polarity</span>
              <span className="text-xs font-bold text-[#1B2433] font-serif mt-0.5 block">{dissectionResult.aspects?.polarity || 'Affirmative'}</span>
            </div>
          </div>

          {/* Syntactic Tokens Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5F6B7A]">
              Syntactic Element Breakdown:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {dissectionResult.syntacticTokens?.map((tok, idx) => (
                <div key={idx} className="p-3.5 bg-[#FBF7EE] rounded-2xl border border-[#E6DCC8] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#1B2433] font-serif">« {tok.token} »</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-[#F2EBDC] text-[#1F3A5F]">
                      {tok.role}
                    </span>
                  </div>
                  <div className="text-xs text-[#5F6B7A]">{tok.type}</div>
                  {tok.details && (
                    <div className="text-[11px] text-[#2B4468] italic pt-1 border-t border-[#E6DCC8]/70">
                      {tok.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Agreement Checks */}
          {dissectionResult.agreementChecks && dissectionResult.agreementChecks.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2F6F57] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Agreement Verification Checklist
              </h4>
              <div className="space-y-2">
                {dissectionResult.agreementChecks.map((chk, idx) => (
                  <div key={idx} className="p-3 bg-[#E9F3EE] rounded-xl border border-[#2F6F57]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <strong className="text-[#245243] font-serif block">{chk.element}:</strong>
                      <span className="text-[#2B4468]">{chk.rule}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-[#245243] font-bold text-[10px] uppercase border border-[#2F6F57]/20 self-start sm:self-auto">
                      {chk.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="p-4 bg-[#F2EBDC] rounded-2xl border border-[#1F3A5F]/20 text-xs text-[#2B4468] leading-relaxed">
            <strong className="text-[#1F3A5F] block mb-1 font-serif">Syntactic Summary:</strong>
            {dissectionResult.grammaticalSummary}
          </div>
        </div>
      )}
    </div>
  );
};
