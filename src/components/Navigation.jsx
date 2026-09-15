import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Cpu, Stethoscope, Layers, BookCheck, MessageSquare, Trophy } from 'lucide-react';

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
          transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar">
            <div className="flex space-x-1.5 py-2.5 min-w-max">
              {NAV_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`nav-tab-${tab.id}`}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#5A5A40] text-white shadow-xs'
                        : 'text-[#7A7A6A] hover:text-[#34342E] hover:bg-[#EAE6DF]/70 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#7A7A6A]'}`} />
                    <span>{tab.label}</span>
                    {tab.tag && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[#EAE6DF] text-[#7A7A6A]'
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
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
