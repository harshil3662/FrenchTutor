import React from 'react';
import { Sparkles, Flame, Award, Volume2, Globe } from 'lucide-react';

export const Header = ({
  progress,
  activeLevel,
  onLevelChange,
  audioSpeed,
  onSpeedChange,
  isScrolled = false,
}) => {
  const levels = ['A1', 'A2', 'B1', 'B2'];

  return (
    <div
      id="app-header"
      className={`text-[#34342E] transition-all duration-300 ${
        isScrolled ? 'border-b-0' : 'border-b border-[#DCDCCF]/30'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between transition-all duration-300 ${
          isScrolled
            ? 'px-3 sm:px-5 py-2 sm:py-2.5 gap-2.5 md:gap-4'
            : 'px-4 sm:px-6 lg:px-8 py-3.5 gap-4'
        }`}
      >
        {/* Brand identity */}
        <div className="flex items-center space-x-3 sm:space-x-3.5">
          <div
            className={`relative flex items-center justify-center bg-gradient-to-br from-[#5A5A40] to-[#3E3E2C] border border-[#DCDCCF] shadow-sm shadow-[#5A5A40]/15 transition-all duration-300 ${
              isScrolled ? 'w-9 h-9 rounded-xl' : 'w-11 h-11 rounded-2xl'
            }`}
          >
            <span
              className={`font-bold tracking-wider text-white font-serif transition-all duration-300 ${
                isScrolled ? 'text-base' : 'text-xl'
              }`}
            >
              FR
            </span>
            <span className="absolute -bottom-1 -right-1 text-xs">🇫🇷</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1
                className={`font-bold tracking-tight text-[#34342E] flex items-center gap-1.5 font-serif transition-all duration-300 ${
                  isScrolled ? 'text-lg sm:text-xl' : 'text-xl'
                }`}
              >
                L'Atelier Grammaire
              </h1>
              <span
                className={`bg-[#5A5A40]/10 text-[#5A5A40] border border-[#5A5A40]/20 text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full tracking-wider transition-all duration-300 ${
                  isScrolled ? 'hidden sm:inline-block' : 'inline-block'
                }`}
              >
                Grammar Aspects & AI
              </span>
            </div>
            <p
              className={`text-xs text-[#7A7A6A] transition-all duration-300 ${
                isScrolled ? 'hidden md:block text-[11px]' : 'block'
              }`}
            >
              French Grammar Lessons, Aspects & Syntactic Laboratory
            </p>
          </div>
        </div>

        {/* Status Counters & Tools */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Level Switcher */}
          <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-xl p-1 border border-[#DCDCCF]/80 shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-[#7A7A6A] ml-1.5 mr-1" />
            <div className="flex space-x-1">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  id={`header-level-btn-${lvl}`}
                  onClick={() => onLevelChange(lvl)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeLevel === lvl
                      ? 'bg-[#5A5A40] text-white shadow-xs'
                      : 'text-[#7A7A6A] hover:text-[#34342E] hover:bg-[#F5F5F0]/70'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Streak */}
          <div 
            id="streak-counter"
            className="flex items-center space-x-1.5 bg-[#FAF3EE]/70 backdrop-blur-sm border border-[#D98E73]/40 text-[#9C4B2E] px-3 py-1.5 rounded-xl text-xs font-bold shadow-2xs"
            title="Consecutive daily learning streak"
          >
            <Flame className="w-4 h-4 text-[#D98E73] fill-[#D98E73]" />
            <span>{progress.streakDays} days</span>
          </div>

          {/* XP Counter */}
          <div 
            id="xp-counter"
            className="flex items-center space-x-1.5 bg-[#F0F0E8]/70 backdrop-blur-sm border border-[#5A5A40]/30 text-[#4A4A35] px-3 py-1.5 rounded-xl text-xs font-bold shadow-2xs"
            title="Total accumulated experience points"
          >
            <Sparkles className="w-4 h-4 text-[#5A5A40]" />
            <span>{progress.xp} XP</span>
          </div>

          {/* Level Badge */}
          <div 
            id="user-badge"
            className="flex items-center space-x-1.5 bg-[#EEF4EE]/70 backdrop-blur-sm border border-[#5A7A5A]/30 text-[#3A5A3A] px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-2xs"
          >
            <Award className="w-4 h-4 text-[#5A7A5A]" />
            <span>Level {progress.level}</span>
          </div>

          {/* Audio Speed Selector */}
          <div className="flex items-center space-x-1.5 bg-white/60 backdrop-blur-sm border border-[#DCDCCF]/80 text-[#34342E] px-2.5 py-1 rounded-xl text-xs shadow-2xs">
            <Volume2 className="w-3.5 h-3.5 text-[#7A7A6A]" />
            <select
              id="audio-speed-select"
              aria-label="Audio pronunciation playback speed"
              value={audioSpeed}
              onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
              className="bg-transparent text-[#34342E] text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="0.75" className="bg-[#F5F5F0] text-[#34342E]">0.75x (Slow)</option>
              <option value="0.9" className="bg-[#F5F5F0] text-[#34342E]">0.9x (Ideal)</option>
              <option value="1.0" className="bg-[#F5F5F0] text-[#34342E]">1.0x (Normal)</option>
              <option value="1.15" className="bg-[#F5F5F0] text-[#34342E]">1.15x (Native)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
