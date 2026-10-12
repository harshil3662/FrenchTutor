import React from 'react';
import { Sparkles, Flame, Award, Volume2, Globe, Lock } from 'lucide-react';

export const Header = ({
  progress,
  activeLevel,
  unlockedLevels = ['A1'],
  onLevelChange,
  audioSpeed,
  onSpeedChange,
  isScrolled = false,
}) => {
  const levels = ['A1', 'A2', 'B1', 'B2'];
  const selectedAudioSpeed = String(audioSpeed);

  return (
    <div
      id="app-header"
      className={`text-[#1B2433] transition-colors duration-200 ${
        isScrolled ? 'border-b-0' : 'border-b border-[#D9CFBA]/30'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-row flex-wrap items-center justify-between gap-2.5 sm:gap-4 px-3.5 sm:px-6 py-2.5 sm:py-3">
        {/* Brand identity */}
        <div
          className={`flex items-center space-x-2.5 sm:space-x-3.5 shrink-0 transition-[padding,border-color,border-radius] duration-250 ease-out ${
            isScrolled
              ? 'rounded-full border border-[#D9CFBA]/80 bg-white/60 backdrop-blur-sm shadow-2xs py-1.5 pl-1.5 pr-4 sm:pr-5'
              : 'border border-transparent py-0 pl-0 pr-0'
          }`}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#1F3A5F] to-[#152A47] shadow-sm shadow-[#1F3A5F]/20">
            <span className="font-bold tracking-wider text-white font-serif text-lg -mt-1">
              FR
            </span>
            <span className="absolute bottom-0 inset-x-0 h-1 flex">
              <span className="flex-1 bg-[#1F3A5F]" />
              <span className="flex-1 bg-white" />
              <span className="flex-1 bg-[#C23B3B]" />
            </span>
          </div>
          <div className="min-w-0">
            <h1 className="font-bold tracking-tight text-[#1B2433] font-serif text-lg sm:text-xl leading-tight truncate">
              L'Atelier Grammaire
            </h1>
            <p className="hidden sm:block text-[10px] font-bold uppercase tracking-[0.18em] text-[#5F6B7A] leading-tight">
              Grammaire française
            </p>
          </div>
        </div>

        {/* Status Counters, Tools & Scrolled Menu Toggle */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Level Switcher */}
          <div className="flex items-center h-8 bg-white/60 backdrop-blur-sm rounded-full p-0.5 pl-2 border border-[#D9CFBA]/80 shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-[#5F6B7A] mr-1" />
            <div className="flex h-full items-center space-x-0.5">
              {levels.map((lvl) => {
                const isUnlocked = unlockedLevels.includes(lvl);
                return (
                  <button
                    key={lvl}
                    id={`header-level-btn-${lvl}`}
                    disabled={!isUnlocked}
                    onClick={() => {
                      if (isUnlocked) onLevelChange(lvl);
                    }}
                    title={isUnlocked ? `Switch to Level ${lvl}` : `Level ${lvl} is locked. Complete earlier units first.`}
                    className={`h-full px-2.5 text-xs font-bold rounded-full transition-all flex items-center gap-1 ${
                      activeLevel === lvl
                        ? 'bg-[#1F3A5F] text-white shadow-xs'
                        : isUnlocked
                        ? 'text-[#5F6B7A] hover:text-[#1B2433] hover:bg-[#F7F2E7] cursor-pointer'
                        : 'text-[#B0ABA0] opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <span>{lvl}</span>
                    {!isUnlocked && <Lock className="w-2.5 h-2.5 text-[#A09C90]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Streak */}
          <div 
            id="streak-counter"
            className="flex items-center h-8 gap-1.5 bg-[#FCF0EE]/70 backdrop-blur-sm border border-[#C23B3B]/40 text-[#8A2430] px-3 rounded-full text-xs font-bold shadow-2xs"
            title="Consecutive daily learning streak"
          >
            <Flame className="w-3.5 h-3.5 text-[#C23B3B] fill-[#C23B3B]" />
            <span>{progress.streakDays} {progress.streakDays === 1 ? 'day' : 'days'}</span>
          </div>

          {/* XP Counter */}
          <div 
            id="xp-counter"
            className="flex items-center h-8 gap-1.5 bg-[#F0F0E8]/70 backdrop-blur-sm border border-[#1F3A5F]/30 text-[#223F66] px-3 rounded-full text-xs font-bold shadow-2xs"
            title="Total accumulated experience points"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#1F3A5F]" />
            <span>{progress.xp} XP</span>
          </div>

          {/* Level Badge */}
          <div 
            id="user-badge"
            className="flex items-center h-8 gap-1.5 bg-[#E9F3EE]/70 backdrop-blur-sm border border-[#2F6F57]/30 text-[#245243] px-3 rounded-full text-xs font-bold shadow-2xs"
          >
            <Award className="w-3.5 h-3.5 text-[#2F6F57]" />
            <span>Level {progress.level}</span>
          </div>

          {/* Audio Speed Selector */}
          <div className="flex items-center h-8 gap-1.5 bg-white/60 backdrop-blur-sm border border-[#D9CFBA]/80 text-[#1B2433] pl-3 pr-1 rounded-full text-xs shadow-2xs">
            <Volume2 className="w-3.5 h-3.5 text-[#5F6B7A]" />
            <select
              id="audio-speed-select"
              aria-label="Audio pronunciation playback speed"
              value={selectedAudioSpeed}
              onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
              className="bg-transparent text-[#1B2433] text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="0.75" className="bg-[#F7F2E7] text-[#1B2433]">0.75x (Slow)</option>
              <option value="0.9" className="bg-[#F7F2E7] text-[#1B2433]">0.9x (Ideal)</option>
              <option value="1" className="bg-[#F7F2E7] text-[#1B2433]">1x (Normal)</option>
              <option value="1.15" className="bg-[#F7F2E7] text-[#1B2433]">1.15x (Native)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
