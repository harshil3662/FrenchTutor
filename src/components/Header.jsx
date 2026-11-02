import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Award, Volume2, Globe, Lock } from './icons';

const LEVELS = ['A1', 'A2', 'B1', 'B2'];

const controlSurface = (isScrolled) => (isScrolled ? 'bg-[#1F3A5F] border border-transparent' : 'bg-[#1F3A5F] border border-transparent');

// The switcher always sits on a navy surface, so the button states don't depend on the scroll position.
const LEVEL_BUTTON = {
  active: 'bg-[#E5565F] text-white shadow-xs',
  unlocked: 'text-white/70 hover:bg-white/10 hover:text-white cursor-pointer',
  locked: 'text-white/40 cursor-not-allowed',
};

const LevelSwitcher = ({ activeLevel, unlockedLevels, onLevelChange, idPrefix = '', isScrolled = false }) => (
  <div className={`flex items-center ${isScrolled ? 'h-9 sm:h-10' : 'h-9 sm:h-8'} w-full sm:w-auto min-w-0 rounded-full p-0.5 pl-2 border ${controlSurface(isScrolled)}`}>
    <Globe className="w-3.5 h-3.5 shrink-0 mr-1 text-white" />
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
            className={`h-full min-w-0 flex-1 sm:flex-none px-1.5 sm:px-2.5 text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-1 ${
              activeLevel === lvl ? LEVEL_BUTTON.active : isUnlocked ? LEVEL_BUTTON.unlocked : LEVEL_BUTTON.locked
            }`}
          >
            <span>{lvl}</span>
            {!isUnlocked && <Lock className="w-2.5 h-2.5 shrink-0 text-[#BBBBBB]" />}
          </button>
        );
      })}
    </div>
  </div>
);

const LevelBadge = ({ progress, idPrefix = '', isScrolled = false }) => (
  <div
    id={`${idPrefix}user-badge`}
    className={`flex items-center justify-center gap-1.5 ${isScrolled ? 'h-9 sm:h-10' : 'h-9 sm:h-8'} shrink-0 px-3 border ${controlSurface(isScrolled)} text-white rounded-full text-xs font-bold whitespace-nowrap`}
  >
    <Award className={`w-3.5 h-3.5 shrink-0 text-[#E5565F]`} />
    <span>Level {progress.level}</span>
  </div>
);

const SpeedSelector = ({ audioSpeed, onSpeedChange, idPrefix = '', isScrolled = false }) => (
  <div className={`flex items-center gap-1.5 ${isScrolled ? 'h-9 sm:h-10' : 'h-9 sm:h-8'} w-full sm:w-auto pl-3 pr-1 border ${controlSurface(isScrolled)} ${isScrolled ? 'text-[#5F6B7A]' : 'text-[#1F3A5F]'} rounded-full text-xs`}>
    <Volume2 className={`w-3.5 h-3.5 shrink-0 text-[#E5565F]`} />
    <select
      id={`${idPrefix}audio-speed-select`}
      aria-label="Audio pronunciation playback speed"
      value={String(audioSpeed)}
      onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
      className={`flex-1 min-w-0 bg-transparent text-white text-xs font-medium focus:outline-none cursor-pointer`}
    >
      <option value="0.75" className={`bg-[#EDEEF0] text-white`}>0.75x (Slow)</option>
      <option value="0.9" className={`bg-[#EDEEF0] text-white`}>0.9x (Ideal)</option>
      <option value="1" className={`bg-[#EDEEF0] text-white`}>1x (Normal)</option>
      <option value="1.15" className={`bg-[#EDEEF0] text-white`}>1.15x (Native)</option>
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

const LOCKUP_TITLE = 'French Tutor';
const BUBBLE_NAVY = '#1F3A5F';

// Everything that morphs between the wordmark and the F logo shares one transition.
const MORPH =
  'transition-[width,height,top,margin,min-width,max-width,opacity,padding,background-color,letter-spacing] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none';

// The brand name is typeset inside a big "F": a stem on the left, a blue arm over the name and a shorter red arm under it.
// Scrolling down squeezes the letters away and the same three bars shrink into the compact F inside a chat bubble;
// scrolling back to the top unfolds the F back into the name.
const BrandLockup = ({ isScrolled, reduceMotion }) => {
  const logo = isScrolled;
  const barEntrance = (delay, axis) => ({
    initial: reduceMotion ? false : { [axis]: 0 },
    animate: { [axis]: 1 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <div
      className={`relative inline-flex h-9 sm:h-10 min-w-0 items-center whitespace-nowrap rounded-[14px] ${MORPH} ${
        logo ? 'bg-[#1F3A5F] px-[11px]' : 'bg-[#1F3A5F]/0 px-0'
      }`}
    >
      {/* Bubble tail, only once the F has formed */}
      <svg
        aria-hidden="true"
        viewBox="0 0 12 7"
        className={`pointer-events-none absolute -bottom-[5px] left-3 h-[7px] w-3 ${MORPH} ${logo ? 'opacity-100' : 'opacity-0'}`}
      >
        <path d="M0 0H12L2 7Z" fill={BUBBLE_NAVY} />
      </svg>

      {/* Stem of the F */}
      <motion.span
        aria-hidden="true"
        className={`origin-top shrink-0 rounded-full ${MORPH} ${
          logo ? 'h-[18px] w-[4.2px] mr-0 bg-white' : 'h-full w-1 mr-2.5 bg-[#1F3A5F]'
        }`}
        {...barEntrance(0, 'scaleY')}
      />

      {/* Column holding the name between the two arms */}
      <span className={`relative flex self-stretch items-center ${MORPH} ${logo ? 'min-w-[10px]' : 'min-w-0'}`}>
        <motion.span
          aria-hidden="true"
          className={`absolute left-0 origin-left rounded-full ${MORPH} ${
            logo ? 'top-[calc(50%_-_9px)] h-[4.2px] w-[10px] bg-[#8DB1E3]' : 'top-0 h-[3px] w-full bg-[#4A7AB8]'
          }`}
          {...barEntrance(0.15, 'scaleX')}
        />
        <motion.span
          aria-hidden="true"
          className={`absolute left-0 origin-left rounded-full ${MORPH} ${
            logo
              ? 'top-[calc(50%_-_1.6px)] h-[4.2px] w-[7px] bg-[#E5565F]'
              : 'top-[calc(100%_-_7px)] h-[3px] w-[55%] bg-[#E5565F]'
          }`}
          {...barEntrance(0.3, 'scaleX')}
        />
        <span className={`block overflow-hidden ${MORPH} ${logo ? 'max-w-0 opacity-0' : 'max-w-[10rem] opacity-100'}`}>
          <motion.h1
            className={`font-bold font-serif leading-tight whitespace-nowrap text-lg sm:text-xl text-[#1B2433] ${MORPH} ${
              logo ? 'tracking-[-0.35em]' : 'tracking-tight'
            }`}
            initial={reduceMotion ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          >
            {LOCKUP_TITLE}
          </motion.h1>
        </span>
      </span>
    </div>
  );
};

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
  const reduceMotion = useReducedMotion();
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
          <BrandLockup isScrolled={isScrolled} reduceMotion={reduceMotion} />
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
