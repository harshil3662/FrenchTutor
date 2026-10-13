import React from 'react';
import { Sparkles, Flame, Award, Volume2, Globe, Lock } from 'lucide-react';

const LEVELS = ['A1', 'A2', 'B1', 'B2'];

const LevelSwitcher = ({ activeLevel, unlockedLevels, onLevelChange, idPrefix = '' }) => (
  <div className="flex items-center h-9 sm:h-8 w-full sm:w-auto min-w-0 bg-white/60 backdrop-blur-sm rounded-full p-0.5 pl-2 border border-[#D9CFBA]/80 shadow-2xs">
    <Globe className="w-3.5 h-3.5 shrink-0 text-[#5F6B7A] mr-1" />
    <div className="flex flex-1 sm:flex-none min-w-0 h-full items-center space-x-0.5">
      {LEVELS.map((lvl) => {
        const isUnlocked = unlockedLevels.includes(lvl);
        return (
          <button
            key={lvl}
            id={`${idPrefix}header-level-btn-${lvl}`}
            disabled={!isUnlocked}
            onClick={() => {
              if (isUnlocked) onLevelChange(lvl);
            }}
            title={isUnlocked ? `Switch to Level ${lvl}` : `Level ${lvl} is locked. Complete earlier units first.`}
            className={`h-full min-w-0 flex-1 sm:flex-none px-1.5 sm:px-2.5 text-xs font-bold rounded-full transition-all flex items-center justify-center gap-1 ${
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
);

const StatChips = ({ progress, idPrefix = '' }) => (
  <div className="grid grid-cols-3 gap-2 w-full sm:flex sm:w-auto sm:gap-2.5">
    <div
      id={`${idPrefix}streak-counter`}
      className="flex items-center justify-center gap-1.5 h-9 sm:h-8 min-w-0 px-1.5 sm:px-3 bg-[#FCF0EE]/70 backdrop-blur-sm border border-[#C23B3B]/40 text-[#8A2430] rounded-full text-xs font-bold shadow-2xs"
      title="Consecutive daily learning streak"
    >
      <Flame className="w-3.5 h-3.5 shrink-0 text-[#C23B3B] fill-[#C23B3B]" />
      <span className="truncate">{progress.streakDays} {progress.streakDays === 1 ? 'day' : 'days'}</span>
    </div>
    <div
      id={`${idPrefix}xp-counter`}
      className="flex items-center justify-center gap-1.5 h-9 sm:h-8 min-w-0 px-1.5 sm:px-3 bg-[#F0F0E8]/70 backdrop-blur-sm border border-[#1F3A5F]/30 text-[#223F66] rounded-full text-xs font-bold shadow-2xs"
      title="Total accumulated experience points"
    >
      <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#1F3A5F]" />
      <span className="truncate">{progress.xp} XP</span>
    </div>
    <div
      id={`${idPrefix}user-badge`}
      className="flex items-center justify-center gap-1.5 h-9 sm:h-8 min-w-0 px-1.5 sm:px-3 bg-[#E9F3EE]/70 backdrop-blur-sm border border-[#2F6F57]/30 text-[#245243] rounded-full text-xs font-bold shadow-2xs"
    >
      <Award className="w-3.5 h-3.5 shrink-0 text-[#2F6F57]" />
      <span className="truncate">Level {progress.level}</span>
    </div>
  </div>
);

const SpeedSelector = ({ audioSpeed, onSpeedChange, idPrefix = '' }) => (
  <div className="flex items-center gap-1.5 h-9 sm:h-8 w-full sm:w-auto pl-3 pr-1 bg-white/60 backdrop-blur-sm border border-[#D9CFBA]/80 text-[#1B2433] rounded-full text-xs shadow-2xs">
    <Volume2 className="w-3.5 h-3.5 shrink-0 text-[#5F6B7A]" />
    <select
      id={`${idPrefix}audio-speed-select`}
      aria-label="Audio pronunciation playback speed"
      value={String(audioSpeed)}
      onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
      className="flex-1 min-w-0 bg-transparent text-[#1B2433] text-xs font-medium focus:outline-none cursor-pointer"
    >
      <option value="0.75" className="bg-[#F7F2E7] text-[#1B2433]">0.75x (Slow)</option>
      <option value="0.9" className="bg-[#F7F2E7] text-[#1B2433]">0.9x (Ideal)</option>
      <option value="1" className="bg-[#F7F2E7] text-[#1B2433]">1x (Normal)</option>
      <option value="1.15" className="bg-[#F7F2E7] text-[#1B2433]">1.15x (Native)</option>
    </select>
  </div>
);

// Same controls as the header, shown in the scrolled navigation menu below 1370px.
export const HeaderControls = ({
  progress,
  activeLevel,
  unlockedLevels = ['A1'],
  onLevelChange,
  audioSpeed,
  onSpeedChange,
}) => (
  <div className="flex flex-wrap items-center gap-2 sm:justify-between">
    <div className="flex-1 min-w-0 sm:flex-none max-[359px]:w-full">
      <LevelSwitcher
        idPrefix="menu-"
        activeLevel={activeLevel}
        unlockedLevels={unlockedLevels}
        onLevelChange={onLevelChange}
      />
    </div>
    <div className="w-full order-3 sm:order-2 sm:w-auto">
      <StatChips progress={progress} idPrefix="menu-" />
    </div>
    <div className="shrink-0 order-2 sm:order-3 max-[359px]:w-full">
      <SpeedSelector idPrefix="menu-" audioSpeed={audioSpeed} onSpeedChange={onSpeedChange} />
    </div>
  </div>
);

export const Header = ({
  progress,
  activeLevel,
  unlockedLevels = ['A1'],
  onLevelChange,
  audioSpeed,
  onSpeedChange,
  isScrolled = false,
}) => {
  // The scrolled header keeps only the brand below 1370px; the controls live in the menu there.
  const controlVisibility = isScrolled ? 'hidden min-[1370px]:block' : '';
  const controlGroupLayout = isScrolled
    ? 'hidden min-[1370px]:contents'
    : 'flex flex-wrap items-center gap-2 w-full xl:contents';

  return (
    <div
      id="app-header"
      className={`text-[#1B2433] transition-colors duration-200 ${
        isScrolled ? 'border-b-0' : 'border-b border-[#D9CFBA]/30'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-3 gap-y-2.5 sm:gap-x-4 px-3.5 sm:px-6 py-2.5 sm:py-3 xl:flex-nowrap xl:justify-between">
        {/* Brand identity */}
        <div
          className={`order-1 flex items-center gap-2.5 sm:gap-3.5 min-w-0 sm:w-auto sm:mr-auto transition-[padding,border-color,border-radius] duration-250 ease-out ${
            isScrolled
              ? 'w-auto rounded-full border border-[#D9CFBA]/80 bg-white/60 backdrop-blur-sm shadow-2xs py-1.5 pl-1.5 pr-4 sm:pr-5'
              : 'w-full border border-transparent py-0 pl-0 pr-0'
          }`}
        >
          <div className="relative flex shrink-0 items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#1F3A5F] to-[#152A47] shadow-sm shadow-[#1F3A5F]/20">
            <span className="font-bold tracking-wider text-white font-serif text-base sm:text-lg -mt-1">
              FR
            </span>
            <span className="absolute bottom-0 inset-x-0 h-1 flex">
              <span className="flex-1 bg-[#1F3A5F]" />
              <span className="flex-1 bg-white" />
              <span className="flex-1 bg-[#C23B3B]" />
            </span>
          </div>
          <div className="min-w-0">
            <h1
              className={`font-bold tracking-tight text-[#1B2433] font-serif leading-tight truncate ${
                isScrolled ? 'text-base sm:text-xl' : 'text-lg sm:text-xl'
              }`}
            >
              L'Atelier Grammaire
            </h1>
            <p className="hidden sm:block text-[10px] font-bold uppercase tracking-[0.18em] text-[#5F6B7A] leading-tight">
              Grammaire française
            </p>
          </div>
        </div>

        {/* Status counters */}
        <div className={`order-3 w-full sm:order-2 sm:w-auto xl:order-3 ${controlVisibility}`}>
          <StatChips progress={progress} />
        </div>

        {/* Level switcher and audio speed selector: a row of their own on tablets, inline on xl+ */}
        <div className={`order-2 sm:order-3 sm:justify-between ${controlGroupLayout}`}>
          <div className="flex-1 min-w-0 sm:flex-none xl:order-2 max-[359px]:w-full">
            <LevelSwitcher
              activeLevel={activeLevel}
              unlockedLevels={unlockedLevels}
              onLevelChange={onLevelChange}
            />
          </div>
          <div className="shrink-0 xl:order-4 max-[359px]:w-full">
            <SpeedSelector audioSpeed={audioSpeed} onSpeedChange={onSpeedChange} />
          </div>
        </div>
      </div>
    </div>
  );
};
