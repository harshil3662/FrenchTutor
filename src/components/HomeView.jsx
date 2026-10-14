import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Lock, Target, Unlock } from 'lucide-react';
import { LEVEL_ORDER, LEVEL_UNIT_ORDER, PASS_THRESHOLD_PERCENT } from '../utils/progressionUtils.js';
import { NAV_TABS } from './Navigation.jsx';

const TAB_GUIDE = {
  'grammar-lessons': 'Work through the 28 units from A1 to B2. Read each guide, then take its quiz. Score 70% or more to unlock the next unit.',
  workbench: 'Rewrite sentences and see how tense, aspect, gender, and agreement change the meaning.',
  'grammar-doctor': 'Paste French text to check for grammar mistakes, with clear explanations and a conjugator.',
  flashcards: 'Study vocabulary decks with flashcards, add your own cards, and mark the ones you know.',
  stories: 'Read short articles on topics you choose, with audio, to see grammar used in context.',
  tutor: 'Chat with Émile, an AI tutor, in immersion scenarios and get feedback on your French.',
  progress: 'Track your XP, daily streak, mastered lessons, and badges as you move forward.',
};

const STEPS = [
  { title: 'Start at A1', text: 'Every learner begins with A1 units. There is no placement test, so beginners and advanced learners follow the same path.' },
  { title: 'Study the guide', text: 'Each unit explains the rule, the formula, and examples. Listen to the audio to hear the pronunciation.' },
  { title: `Score ${PASS_THRESHOLD_PERCENT}% or more`, text: `Take the unit quiz. A score of ${PASS_THRESHOLD_PERCENT}% or higher marks the unit as complete.` },
  { title: 'Unlock the next unit', text: 'The next unit opens as soon as you pass. Finish every unit in a level to unlock the next level.' },
];

export const HomeView = ({ progress, unlockedLevels = ['A1'], onNavigate }) => {
  const completed = progress?.completedLessons || [];
  const isDone = (unit) => completed.includes(unit.id) || (unit.legacyId && completed.includes(unit.legacyId));

  const currentLevel = unlockedLevels[unlockedLevels.length - 1] || 'A1';
  const levelUnits = LEVEL_UNIT_ORDER[currentLevel] || [];
  const doneInLevel = levelUnits.filter(isDone).length;
  const nextUnit = levelUnits.find((unit) => !isDone(unit));
  const percent = levelUnits.length ? Math.round((doneInLevel / levelUnits.length) * 100) : 0;

  return (
    <div className="space-y-8 sm:space-y-10 pb-10">
      {/* Hero */}
      <section className="rounded-3xl border border-[#D9CFBA]/80 bg-white/90 p-6 sm:p-10 shadow-sm">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C23B3B]">Bienvenue</p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#1B2433] leading-tight">
          Welcome to L'Atelier Grammaire
        </h1>
        <p className="mt-3 max-w-2xl text-[#3A4656] leading-relaxed">
          Learn French grammar step by step. Everyone starts at A1, whether you are a complete beginner or
          already know some French. Pass each unit to open the next one.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate('grammar-lessons')}
            className="inline-flex items-center gap-2 rounded-full bg-[#1F3A5F] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#1F3A5F]/20 hover:bg-[#152A47] transition-colors cursor-pointer"
          >
            Start learning <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Your path */}
      <section className="rounded-3xl border border-[#D9CFBA]/80 bg-white/90 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5F6B7A]">Your path</p>
            <h2 className="mt-1 font-serif text-2xl font-bold text-[#1B2433]">Level {currentLevel}</h2>
          </div>
          <p className="text-sm font-semibold text-[#1F3A5F]">
            {doneInLevel} of {levelUnits.length} units complete
          </p>
        </div>
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-[#E9E1CF]">
          <div className="h-full rounded-full bg-[#1F3A5F] transition-all duration-500" style={{ width: `${percent}%` }} />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#D9CFBA]/70 bg-[#FBF8F1]/80 p-4">
          {nextUnit ? (
            <>
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#1F3A5F]/10 text-[#1F3A5F] flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#5F6B7A]">Next up</p>
                  <p className="font-semibold text-[#1B2433] truncate">{nextUnit.title}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('grammar-lessons')}
                className="inline-flex items-center gap-2 rounded-full border border-[#1F3A5F] px-4 py-2 text-sm font-bold text-[#1F3A5F] hover:bg-[#1F3A5F] hover:text-white transition-colors cursor-pointer"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <p className="font-semibold text-[#1B2433]">Every unit in {currentLevel} is complete. The next level is open.</p>
          )}
        </div>

        {/* Level ladder */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {LEVEL_ORDER.map((level) => {
            const unlocked = unlockedLevels.includes(level);
            const total = LEVEL_UNIT_ORDER[level]?.length || 0;
            const done = (LEVEL_UNIT_ORDER[level] || []).filter(isDone).length;
            return (
              <div
                key={level}
                className={`rounded-2xl border p-4 ${
                  unlocked ? 'border-[#D9CFBA]/80 bg-white/80' : 'border-[#D9CFBA]/50 bg-[#F1EBDD]/70 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-xl font-bold text-[#1B2433]">{level}</span>
                  {unlocked ? (
                    <Unlock className="w-4 h-4 text-[#1F3A5F]" />
                  ) : (
                    <Lock className="w-4 h-4 text-[#5F6B7A]" />
                  )}
                </div>
                <p className="mt-1 text-xs text-[#5F6B7A]">
                  {unlocked ? `${done} / ${total} units` : 'Locked'}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section>
        <h2 className="font-serif text-2xl font-bold text-[#1B2433]">How it works</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step, idx) => (
            <div key={step.title} className="rounded-2xl border border-[#D9CFBA]/80 bg-white/70 p-5 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#C23B3B] text-white text-sm font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <h3 className="font-bold text-[#1B2433]">{step.title}</h3>
              </div>
              <p className="mt-3 text-sm text-[#3A4656] leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 flex items-start gap-2 text-sm text-[#3A4656]">
          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#1F3A5F]" />
          Your progress is saved in this browser. Units unlock in order, and you can go back to any finished unit to review it.
        </p>
      </section>

      {/* Tab tour */}
      <section>
        <h2 className="font-serif text-2xl font-bold text-[#1B2433]">Explore the tabs</h2>
        <p className="mt-1 text-sm text-[#5F6B7A]">Click any tab to open it.</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {NAV_TABS.filter((tab) => tab.id !== 'home').map((tab) => {
            const Icon = tab.icon || BookOpen;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onNavigate(tab.id)}
                className="text-left rounded-2xl border border-[#D9CFBA]/80 bg-white/70 p-5 shadow-xs hover:bg-white hover:border-[#1F3A5F]/40 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#1F3A5F]/10 text-[#1F3A5F] flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="font-bold text-[#1B2433] leading-tight">{tab.label}</h3>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5F6B7A]">{tab.tag}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-[#3A4656] leading-relaxed">{TAB_GUIDE[tab.id]}</p>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
