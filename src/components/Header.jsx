import React from 'react';
import { Award, Volume2, Globe, Lock } from 'lucide-react';

const LEVELS = ['A1', 'A2', 'B1', 'B2'];

// Matches the brand block: transparent at the top, a white capsule once scrolled.
const controlSurface = (isScrolled) =>
  isScrolled
    ? 'bg-white/60 border-[#D9CFBA]/80 backdrop-blur-sm shadow-2xs'
    : 'bg-transparent border-transparent';

const LevelSwitcher = ({ activeLevel, unlockedLevels, onLevelChange, idPrefix = '', isScrolled = false }) => (
  <div className={`flex items-center h-9 sm:h-8 w-full sm:w-auto min-w-0 rounded-full p-0.5 pl-2 border ${controlSurface(isScrolled)}`}>
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
                ? 'text-[#1F3A5F] hover:text-[#14284A] hover:bg-white/60 cursor-pointer'
                : 'text-[#1F3A5F]/70 cursor-not-allowed'
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

const LevelBadge = ({ progress, idPrefix = '', isScrolled = false }) => (
  <div
    id={`${idPrefix}user-badge`}
    className={`flex items-center justify-center gap-1.5 h-9 sm:h-8 shrink-0 px-3 border ${controlSurface(isScrolled)} text-[#245243] rounded-full text-xs font-bold whitespace-nowrap`}
  >
    <Award className="w-3.5 h-3.5 shrink-0 text-[#2F6F57]" />
    <span>Level {progress.level}</span>
  </div>
);

const SpeedSelector = ({ audioSpeed, onSpeedChange, idPrefix = '', isScrolled = false }) => (
  <div className={`flex items-center gap-1.5 h-9 sm:h-8 w-full sm:w-auto pl-3 pr-1 border ${controlSurface(isScrolled)} text-[#1B2433] rounded-full text-xs`}>
    <Volume2 className="w-3.5 h-3.5 shrink-0 text-[#5F6B7A]" />
    <select
      id={`${idPrefix}audio-speed-select`}
      aria-label="Audio pronunciation playback speed"
      value={String(audioSpeed)}
      onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
      className="flex-1 min-w-0 bg-transparent text-[#1B2433] text-xs font-medium focus:outline-none cursor-pointer"
    >
      <option value="0.75" className="bg-[#EDEEF0] text-[#1B2433]">0.75x (Slow)</option>
      <option value="0.9" className="bg-[#EDEEF0] text-[#1B2433]">0.9x (Ideal)</option>
      <option value="1" className="bg-[#EDEEF0] text-[#1B2433]">1x (Normal)</option>
      <option value="1.15" className="bg-[#EDEEF0] text-[#1B2433]">1.15x (Native)</option>
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
    <div className="order-1">
      <LevelBadge progress={progress} idPrefix="menu-" />
    </div>
    <div className="order-2 ml-auto sm:ml-0">
      <SpeedSelector idPrefix="menu-" audioSpeed={audioSpeed} onSpeedChange={onSpeedChange} />
    </div>
    <div className="order-3 w-full sm:order-2 sm:w-auto">
      <LevelSwitcher
        idPrefix="menu-"
        activeLevel={activeLevel}
        unlockedLevels={unlockedLevels}
        onLevelChange={onLevelChange}
      />
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
  const controlGroupVisibility = isScrolled ? 'hidden min-[1370px]:flex' : 'flex';

  return (
    <div
      id="app-header"
      className="text-[#1B2433] transition-colors duration-200"
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

        {/* Level badge, level switcher and audio speed selector: a row of their own on mobile, inline on sm+ */}
        <div
          className={`order-2 w-full sm:w-auto sm:ml-auto flex-wrap items-center gap-2 ${controlGroupVisibility}`}
        >
          <div className="order-1">
            <LevelBadge progress={progress} isScrolled={isScrolled} />
          </div>
          <div className="order-2 ml-auto sm:ml-0">
            <SpeedSelector audioSpeed={audioSpeed} onSpeedChange={onSpeedChange} isScrolled={isScrolled} />
          </div>
          <div className="order-3 w-full sm:order-2 sm:w-auto">
            <LevelSwitcher
              activeLevel={activeLevel}
              unlockedLevels={unlockedLevels}
              onLevelChange={onLevelChange}
              isScrolled={isScrolled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
