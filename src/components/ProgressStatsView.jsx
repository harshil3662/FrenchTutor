import React from 'react';
import { Trophy, Flame, Sparkles, Award, CheckCircle2, Star, Target, BookOpen, Layers } from 'lucide-react';

export const ProgressStatsView = ({ progress, activeLevel }) => {
  const allBadges = [
    {
      id: 'first_step',
      name: 'First Step',
      icon: '🌱',
      description: 'Complete your very first French lesson',
      unlocked: progress.completedLessons.length >= 1,
    },
    {
      id: 'bonjour_paris',
      name: 'Bonjour Paris!',
      icon: '🥐',
      description: 'Master greetings and ordering at a Parisian café',
      unlocked: progress.completedLessons.includes('a1-unit1-l1') || progress.xp >= 30,
    },
    {
      id: 'streak_3',
      name: '3-Day Streak',
      icon: '🔥',
      description: 'Maintain a 3-day daily learning streak',
      unlocked: progress.streakDays >= 3,
    },
    {
      id: 'vocab_master',
      name: 'Vocabulary Master',
      icon: '🗂️',
      description: 'Master at least 5 vocabulary cards in SRS',
      unlocked: progress.masteredCards.length >= 5,
    },
    {
      id: 'subjonctif_conqueror',
      name: 'Subjunctive Conqueror',
      icon: '⚡',
      description: 'Reach B1 level and explore the subjunctive mood',
      unlocked: progress.level === 'B1' || progress.level === 'B2' || progress.xp >= 800,
    },
    {
      id: 'polyglotte_fr',
      name: 'Polyglot Laureate',
      icon: '👑',
      description: 'Accumulate over 1,000 XP in French learning',
      unlocked: progress.xp >= 1000,
    },
  ];

  const levelBenchmarks = [
    { level: 'A1', name: 'Discovery', minXp: 0, maxXp: 300 },
    { level: 'A2', name: 'Waystage', minXp: 300, maxXp: 800 },
    { level: 'B1', name: 'Threshold', minXp: 800, maxXp: 1500 },
    { level: 'B2', name: 'Vantage', minXp: 1500, maxXp: 3000 },
  ];

  const currentBenchmark = levelBenchmarks.find((b) => b.level === progress.level) || levelBenchmarks[0];
  const levelProgressPercent = Math.min(
    100,
    Math.max(
      0,
      ((progress.xp - currentBenchmark.minXp) / (currentBenchmark.maxXp - currentBenchmark.minXp)) * 100
    )
  );

  return (
    <div id="progress-stats-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Hero Stats Banner */}
      <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 shadow-sm text-[#34342E]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-[#F0ECE1] border border-[#5A5A40]/20 flex items-center justify-center text-3xl shadow-xs">
              🇫🇷
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold font-serif">Your Learning Profile</h2>
                <span className="bg-[#EEF4EE] text-[#3A5A3A] border border-[#5A7A5A]/30 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Level {progress.level}
                </span>
              </div>
              <p className="text-xs text-[#7A7A6A] mt-0.5">On your path to French fluency</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
            <div className="bg-[#FAF7F2] border border-[#E8E2D9] p-3 rounded-2xl text-center shadow-xs">
              <Flame className="w-4 h-4 text-[#D98E73] mx-auto fill-[#D98E73]" />
              <span className="text-lg font-bold text-[#34342E] block mt-0.5 font-serif">{progress.streakDays}</span>
              <span className="text-[10px] text-[#7A7A6A] font-medium">Day Streak</span>
            </div>
            <div className="bg-[#FAF7F2] border border-[#E8E2D9] p-3 rounded-2xl text-center shadow-xs">
              <Sparkles className="w-4 h-4 text-[#5A5A40] mx-auto" />
              <span className="text-lg font-bold text-[#34342E] block mt-0.5 font-serif">{progress.xp}</span>
              <span className="text-[10px] text-[#7A7A6A] font-medium">Total XP</span>
            </div>
            <div className="bg-[#FAF7F2] border border-[#E8E2D9] p-3 rounded-2xl text-center shadow-xs">
              <BookOpen className="w-4 h-4 text-[#5A7A5A] mx-auto" />
              <span className="text-lg font-bold text-[#34342E] block mt-0.5 font-serif">{progress.completedLessons.length}</span>
              <span className="text-[10px] text-[#7A7A6A] font-medium">Lessons</span>
            </div>
          </div>
        </div>

        {/* CEFR Progression Track */}
        <div className="mt-8 pt-6 border-t border-[#E8E2D9] space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-[#525248]">
            <span>Level {progress.level} Progress ({currentBenchmark.name})</span>
            <span className="font-mono text-[#5A5A40]">{progress.xp} / {currentBenchmark.maxXp} XP</span>
          </div>

          <div className="w-full bg-[#FAF7F2] h-3 rounded-full overflow-hidden p-0.5 border border-[#E8E2D9]">
            <div
              className="bg-[#5A5A40] h-full rounded-full transition-all duration-500"
              style={{ width: `${levelProgressPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-4 text-center text-[11px] font-medium text-[#7A7A6A] pt-1">
            {levelBenchmarks.map((b) => (
              <span key={b.level} className={progress.level === b.level ? 'text-[#5A5A40] font-bold' : 'opacity-60'}>
                {b.level}: {b.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Badges & Achievements Grid */}
      <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-[#D98E73]" />
            <h3 className="text-lg font-bold text-[#34342E] font-serif">Badges & Achievements ({allBadges.filter(b => b.unlocked).length}/{allBadges.length})</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allBadges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border transition-all flex items-start space-x-3.5 ${
                badge.unlocked
                  ? 'bg-[#FAF7F2] border-[#E8E2D9] shadow-xs'
                  : 'bg-white/50 border-[#E8E2D9]/60 opacity-40 grayscale'
              }`}
            >
              <div className="text-3xl flex-shrink-0">{badge.icon}</div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-[#34342E] font-serif">{badge.name}</h4>
                  {badge.unlocked && (
                    <CheckCircle2 className="w-4 h-4 text-[#5A7A5A]" />
                  )}
                </div>
                <p className="text-xs text-[#7A7A6A] leading-relaxed">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
