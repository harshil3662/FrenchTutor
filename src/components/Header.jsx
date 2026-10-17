import React from 'react';
import { Award, Volume2, Globe, Lock } from './icons';

const LEVELS = ['A1', 'A2', 'B1', 'B2'];

const controlSurface = (isScrolled) => (isScrolled ? 'bg-white border-[#D0D7E2]/70' : 'bg-white/95 border-transparent');

const LevelSwitcher = ({ activeLevel, unlockedLevels, onLevelChange, idPrefix = '', isScrolled = false }) => (
  <div className={`flex items-center ${isScrolled ? 'h-9 sm:h-10' : 'h-9 sm:h-8'} w-full sm:w-auto min-w-0 rounded-full p-0.5 pl-2 border ${controlSurface(isScrolled)}`}>
    <Globe className="w-3.5 h-3.5 shrink-0 mr-1 text-[#5F6B7A]" />
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
            className={`${activeLevel === lvl && isScrolled ? 'my-1 h-[calc(100%-0.5rem)]' : 'h-full'} min-w-0 flex-1 sm:flex-none ${activeLevel === lvl && isScrolled ? 'px-2 sm:px-2.5' : 'px-1.5 sm:px-2.5'} text-xs font-bold rounded-full transition-all flex items-center justify-center gap-1 ${
              activeLevel === lvl
                ? isScrolled
                  ? 'bg-[#1F3A5F]/90 text-white border border-[#1F3A5F]/80 shadow-xs'
                  : 'bg-[#1F3A5F]/10 text-[#1F3A5F] border border-[#1F3A5F]/20 shadow-xs'
                : isUnlocked
                ? isScrolled
                  ? 'text-[#5F6B7A] hover:bg-[#5F6B7A]/10 cursor-pointer'
                  : 'text-[#1F3A5F] hover:text-[#14284A] hover:bg-white/60 cursor-pointer'
                : isScrolled
                ? 'text-[#5F6B7A] cursor-not-allowed'
                : 'text-[#1F3A5F]/70 cursor-not-allowed'
            }`}
          >
            <span>{lvl}</span>
            {!isUnlocked && <Lock className="w-2.5 h-2.5 shrink-0 text-[#5F6B7A]" />}
          </button>
        );
      })}
    </div>
  </div>
);

const LevelBadge = ({ progress, idPrefix = '', isScrolled = false }) => (
  <div
    id={`${idPrefix}user-badge`}
    className={`flex items-center justify-center gap-1.5 ${isScrolled ? 'h-9 sm:h-10' : 'h-9 sm:h-8'} shrink-0 px-3 border ${controlSurface(isScrolled)} ${isScrolled ? 'text-[#5F6B7A]' : 'text-[#1F3A5F]'} rounded-full text-xs font-bold whitespace-nowrap`}
  >
    <Award className={`w-3.5 h-3.5 shrink-0 ${isScrolled ? 'text-[#5F6B7A]' : 'text-[#1F3A5F]'}`} />
    <span>Level {progress.level}</span>
  </div>
);

const SpeedSelector = ({ audioSpeed, onSpeedChange, idPrefix = '', isScrolled = false }) => (
  <div className={`flex items-center gap-1.5 ${isScrolled ? 'h-9 sm:h-10' : 'h-9 sm:h-8'} w-full sm:w-auto pl-3 pr-1 border ${controlSurface(isScrolled)} ${isScrolled ? 'text-[#5F6B7A]' : 'text-[#1F3A5F]'} rounded-full text-xs`}>
    <Volume2 className={`w-3.5 h-3.5 shrink-0 ${isScrolled ? 'text-[#5F6B7A]' : 'text-[#1F3A5F]'}`} />
    <select
      id={`${idPrefix}audio-speed-select`}
      aria-label="Audio pronunciation playback speed"
      value={String(audioSpeed)}
      onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
      className={`flex-1 min-w-0 bg-transparent ${isScrolled ? 'text-[#5F6B7A]' : 'text-[#1B2433]'} text-xs font-medium focus:outline-none cursor-pointer`}
    >
      <option value="0.75" className={`bg-[#EDEEF0] ${isScrolled ? 'text-[#5F6B7A]' : 'text-[#1F3A5F]'}`}>0.75x (Slow)</option>
      <option value="0.9" className={`bg-[#EDEEF0] ${isScrolled ? 'text-[#5F6B7A]' : 'text-[#1F3A5F]'}`}>0.9x (Ideal)</option>
      <option value="1" className={`bg-[#EDEEF0] ${isScrolled ? 'text-[#5F6B7A]' : 'text-[#1F3A5F]'}`}>1x (Normal)</option>
      <option value="1.15" className={`bg-[#EDEEF0] ${isScrolled ? 'text-[#5F6B7A]' : 'text-[#1F3A5F]'}`}>1.15x (Native)</option>
    </select>
  </div>
);

// Same controls as the header, shown in the scrolled navigation menu below 1370px.
export const HeaderControls = ({
  inMenu = false,
  progress,
  activeLevel,
  unlockedLevels = ['A1'],
  onLevelChange,
  audioSpeed,
  onSpeedChange,
}) => (
  <div className="flex flex-wrap items-center gap-2 sm:justify-between">
    <div className="order-1">
      <LevelBadge progress={progress} idPrefix="menu-" isScrolled={inMenu} />
    </div>
    <div className="order-2 ml-auto sm:ml-0">
      <SpeedSelector idPrefix="menu-" audioSpeed={audioSpeed} onSpeedChange={onSpeedChange} isScrolled={inMenu} />
    </div>
    <div className="order-3 w-full sm:order-2 sm:w-auto">
      <LevelSwitcher
        idPrefix="menu-"
        activeLevel={activeLevel}
        unlockedLevels={unlockedLevels}
        onLevelChange={onLevelChange}
        isScrolled={inMenu}
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
  inMenu = false,
}) => {
  // The scrolled header keeps only the brand below 1370px; the controls live in the menu there.
  const useScrolledTone = isScrolled || inMenu;
  const controlGroupVisibility = isScrolled ? 'hidden min-[1370px]:flex' : 'flex';

  return (
    <div
      id="app-header"
      className="text-[#1B2433] transition-colors duration-200"
    >
      <div className={`max-w-7xl mx-auto flex flex-wrap items-center gap-x-3 gap-y-2.5 sm:gap-x-4 ${isScrolled ? 'px-2 sm:px-2.5' : 'px-3.5 sm:px-6'} xl:flex-nowrap xl:justify-between ${isScrolled ? 'py-1.5' : 'py-2.5 sm:py-3'}`}>
        {/* Brand identity */}
        <div
          className={`order-1 flex items-center gap-2.5 sm:gap-3.5 min-w-0 sm:w-auto sm:mr-auto transition-[padding,border-radius,background-color] duration-250 ease-out ${
            isScrolled
              ? 'w-auto rounded-full border border-transparent py-0 pl-0 pr-3 sm:pr-4'
              : 'w-full border border-transparent py-0 pl-0 pr-0'
          }`}
        >
          <div className={`relative flex shrink-0 items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-[#1F3A5F] to-[#152A47] shadow-sm shadow-[#1F3A5F]/20 w-9 h-9 sm:w-10 sm:h-10`}>
            <span className="font-bold tracking-wider text-white font-serif text-base sm:text-lg -mt-1">
              FR
            </span>
            <span className="absolute bottom-0 inset-x-0 h-1 flex">
              <span className="flex-1 bg-[#1F3A5F]" />
              <span className="flex-1 bg-white" />
              <span className="flex-1 bg-[#1F3A5F]" />
            </span>
          </div>
          <div className="min-w-0">
            <h1
              className={`font-bold tracking-tight ${isScrolled ? 'text-[#1F3A5F]' : 'text-[#1B2433]'} font-serif leading-tight truncate ${
                'text-lg sm:text-xl'
              }`}
            >
              L'Atelier Grammaire
            </h1>
            <p className={`hidden sm:block text-[10px] font-bold uppercase tracking-[0.18em] leading-tight ${isScrolled ? 'text-[#1F3A5F]/70' : 'text-[#5F6B7A]'}`}>
              Grammaire française
            </p>
          </div>
        </div>

        {/* Level badge, level switcher and audio speed selector: a row of their own on mobile, inline on sm+ */}
        <div
          className={`order-2 w-full sm:w-auto sm:ml-auto flex-wrap items-center gap-2 ${controlGroupVisibility}`}
        >
          <div className="order-1">
            <LevelBadge progress={progress} isScrolled={useScrolledTone} />
          </div>
          <div className="order-2">
            <SpeedSelector audioSpeed={audioSpeed} onSpeedChange={onSpeedChange} isScrolled={useScrolledTone} />
          </div>
          <div className="order-3 sm:order-2 sm:w-auto">
            <LevelSwitcher
              activeLevel={activeLevel}
              unlockedLevels={unlockedLevels}
              onLevelChange={onLevelChange}
              isScrolled={useScrolledTone}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
