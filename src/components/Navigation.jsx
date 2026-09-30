import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Cpu, Stethoscope, Layers, BookCheck, MessageSquare, Trophy, Sparkles } from 'lucide-react';

export const NAV_TABS = [
  { id: 'grammar-lessons', label: 'Grammar Lessons', icon: BookOpen, tag: '8 Aspects' },
  { id: 'workbench', label: 'Aspect Workbench', icon: Cpu, tag: 'Transformer' },
  { id: 'grammar-doctor', label: 'Grammar Doctor', icon: Stethoscope, tag: 'Diagnostics' },
  { id: 'flashcards', label: 'Grammar Rules SRS', icon: Layers, tag: 'Decks' },
  { id: 'stories', label: 'Grammar in Context', icon: BookCheck, tag: 'Bilingual' },
  { id: 'tutor', label: 'Grammar Tutor', icon: MessageSquare, tag: 'Live AI' },
  { id: 'progress', label: 'Mastery & Stats', icon: Trophy, tag: 'XP & Badges' },
];

export const Navigation = ({ activeTab, onTabChange, isScrolled = false }) => {
  return (
    <AnimatePresence initial={false}>
      {!isScrolled && (
        <motion.nav
          id="main-navigation"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5">
            {/* Segmented Glass Dock Track */}
            <div className="relative p-1.5 bg-white/50 backdrop-blur-md rounded-2xl border border-[#C8DAC3]/70 shadow-xs flex items-center overflow-x-auto no-scrollbar">
              <div className="flex space-x-1 sm:space-x-1.5 min-w-max w-full">
                {NAV_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      id={`nav-tab-${tab.id}`}
                      onClick={() => onTabChange(tab.id)}
                      className={`relative flex items-center space-x-2 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap z-10 group select-none ${
                        isActive
                          ? 'text-white'
                          : 'text-[#6A6A5A] hover:text-[#2A2A22] hover:bg-white/60'
                      }`}
                    >
                      {/* Active Smooth Sliding Background Pill */}
                      {isActive && (
                        <motion.div
                          layoutId="active-nav-pill"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#4A663F] via-[#525E3E] to-[#5A5A40] shadow-md shadow-[#4A663F]/25 -z-10"
                          transition={{
                            type: 'spring',
                            stiffness: 420,
                            damping: 32,
                            mass: 0.8,
                          }}
                        />
                      )}

                      {/* Icon */}
                      <Icon
                        className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
                          isActive
                            ? 'text-white scale-110 drop-shadow-xs'
                            : 'text-[#7A7A6A] group-hover:text-[#34342E] group-hover:scale-105'
                        }`}
                      />

                      {/* Label */}
                      <span className="tracking-tight">{tab.label}</span>

                      {/* Tag Chip */}
                      {tab.tag && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all duration-200 shrink-0 ${
                            isActive
                              ? 'bg-white/20 text-white/95 shadow-2xs border border-white/20'
                              : 'bg-[#5A5A40]/10 text-[#5A5A40] border border-[#5A5A40]/15 group-hover:bg-[#5A5A40]/15'
                          }`}
                        >
                          {tab.tag}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
