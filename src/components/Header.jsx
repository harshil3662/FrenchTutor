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
    <header
      id="app-header"
      className="text-[#34342E] border-b border-[#DCDCCF]/30 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center space-x-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#5A5A40] to-[#3E3E2C] border border-[#DCDCCF] shadow-sm shadow-[#5A5A40]/15">
            <span className="text-xl font-bold tracking-wider text-white font-serif">FR</span>
            <span className="absolute -bottom-1 -right-1 text-xs">🇫🇷</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight text-[#34342E] flex items-center gap-1.5 font-serif">
                L'Atelier Grammaire
              </h1>
              <span className="bg-[#5A5A40]/10 text-[#5A5A40] border border-[#5A5A40]/20 text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full tracking-wider">
                Grammar Aspects & AI
              </span>
            </div>
            <p className="text-xs text-[#7A7A6A]">
              French Grammar Lessons, Aspects & Syntactic Laboratory
            </p>
          </div>
        </div>

        {/* Status Counters & Tools */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Level Switcher */}
          <div className="flex items-center bg-white/85 backdrop-blur-sm rounded-xl p-1 border border-[#DCDCCF] shadow-2xs">
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
            className="flex items-center space-x-1.5 bg-[#FAF3EE]/90 backdrop-blur-sm border border-[#D98E73]/40 text-[#9C4B2E] px-3 py-1.5 rounded-xl text-xs font-bold shadow-2xs"
            title="Consecutive daily learning streak"
          >
            <Flame className="w-4 h-4 text-[#D98E73] fill-[#D98E73]" />
            <span>{progress.streakDays} days</span>
          </div>

          {/* XP Counter */}
          <div 
            id="xp-counter"
            className="flex items-center space-x-1.5 bg-[#F0F0E8]/90 backdrop-blur-sm border border-[#5A5A40]/30 text-[#4A4A35] px-3 py-1.5 rounded-xl text-xs font-bold shadow-2xs"
            title="Total accumulated experience points"
          >
            <Sparkles className="w-4 h-4 text-[#5A5A40]" />
            <span>{progress.xp} XP</span>
          </div>

          {/* Level Badge */}
          <div 
            id="user-badge"
            className="flex items-center space-x-1.5 bg-[#EEF4EE]/90 backdrop-blur-sm border border-[#5A7A5A]/30 text-[#3A5A3A] px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-2xs"
          >
            <Award className="w-4 h-4 text-[#5A7A5A]" />
            <span>Level {progress.level}</span>
          </div>

          {/* Audio Speed Selector */}
          <div className="flex items-center space-x-1.5 bg-white/85 backdrop-blur-sm border border-[#DCDCCF] text-[#34342E] px-2.5 py-1 rounded-xl text-xs shadow-2xs">
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
    </header>
  );
};
