import React, { useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Cpu, Stethoscope, Layers, BookCheck, MessageSquare, Trophy } from 'lucide-react';

export const NAV_TABS = [
  { id: 'grammar-lessons', label: 'Grammar Lessons', icon: BookOpen, tag: '8 Aspects' },
  { id: 'workbench', label: 'Workbench', icon: Cpu, tag: 'Transformer' },
  { id: 'grammar-doctor', label: 'Grammar Doctor', icon: Stethoscope, tag: 'Diagnostics' },
  { id: 'flashcards', label: 'Vocabulary', icon: Layers, tag: 'Decks' },
  { id: 'stories', label: 'Reading', icon: BookCheck, tag: 'Contextual' },
  { id: 'tutor', label: 'Grammar Tutor', icon: MessageSquare, tag: 'Live AI' },
  { id: 'progress', label: 'Stats', icon: Trophy, tag: 'Badges' },
];

export const Navigation = ({
  activeTab,
  onTabChange,
  isScrolled = false,
  isMenuOpen = false,
  onCloseMenu,
}) => {
  const scrollContainerRef = useRef(null);
  const scrollAnimationRef = useRef(null);

  // Smoothly center the selected/clicked tab with a gentle, relaxed transition (~500ms)
  const centerTab = useCallback((tabId, smooth = true) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const tabElement = container.querySelector(`[data-tab-id="${tabId}"]`);
    if (!tabElement) return;

    const containerWidth = container.offsetWidth;
    const tabLeft = tabElement.offsetLeft;
    const tabWidth = tabElement.offsetWidth;

    // Calculate exact scroll offset to center the tab in the container
    const targetScrollLeft = Math.max(0, tabLeft - containerWidth / 2 + tabWidth / 2);

    if (!smooth) {
      if (scrollAnimationRef.current) cancelAnimationFrame(scrollAnimationRef.current);
      container.scrollLeft = targetScrollLeft;
      return;
    }

    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
    }

    const startScrollLeft = container.scrollLeft;
    const distance = targetScrollLeft - startScrollLeft;
    if (Math.abs(distance) < 2) return;

    const duration = 520;
    let startTime = null;

    const animateScroll = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      container.scrollLeft = startScrollLeft + distance * easeProgress;

      if (progress < 1) {
        scrollAnimationRef.current = requestAnimationFrame(animateScroll);
      } else {
        scrollAnimationRef.current = null;
      }
    };

    scrollAnimationRef.current = requestAnimationFrame(animateScroll);
  }, []);

  // Center active tab whenever activeTab changes
  useEffect(() => {
    if (!isScrolled) {
      centerTab(activeTab, false);
    }
  }, [activeTab, isScrolled, centerTab]);

  // Recenter on window resize
  useEffect(() => {
    const handleResize = () => {
      centerTab(activeTab, false);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (scrollAnimationRef.current) cancelAnimationFrame(scrollAnimationRef.current);
    };
  }, [activeTab, centerTab]);

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    centerTab(tabId, true);
    if (isScrolled && onCloseMenu) {
      onCloseMenu();
    }
  };

  return (
    <>
      {/* 1. Normal State (At Top): Horizontal Segmented Dock Track */}
      {!isScrolled && (
        <nav
          id="main-navigation"
          className="overflow-hidden select-none"
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5">
            {/* Segmented Glass Dock Track with Horizontal Scroll */}
            <div
              ref={scrollContainerRef}
              className="relative p-1.5 bg-white/50 backdrop-blur-md rounded-2xl border border-[#C8DAC3]/70 shadow-xs flex items-center overflow-x-auto no-scrollbar"
            >
              <div className="flex space-x-1 sm:space-x-1.5 min-w-max mx-auto px-1">
                {NAV_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      id={`nav-tab-${tab.id}`}
                      data-tab-id={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`relative flex items-center space-x-2 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors duration-300 cursor-pointer whitespace-nowrap z-10 group select-none ${
                        isActive
                          ? 'text-white'
                          : 'text-[#6A6A5A] hover:text-[#2A2A22] hover:bg-white/60'
                      }`}
                    >
                      {/* Active Smooth Relaxed Sliding Background Pill */}
                      {isActive && (
                        <motion.div
                          layoutId="active-nav-pill"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#4A663F] via-[#525E3E] to-[#5A5A40] shadow-md shadow-[#4A663F]/25 -z-10"
                          transition={{
                            type: 'spring',
                            stiffness: 150,
                            damping: 20,
                            mass: 1.1,
                          }}
                        />
                      )}

                      {/* Icon */}
                      <Icon
                        className={`w-4 h-4 transition-transform duration-300 shrink-0 ${
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
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors duration-300 shrink-0 ${
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
        </nav>
      )}

      {/* 2. Scrolled State Menu Panel: Opens smoothly with transitional effect when clicking 3 little lines */}
      {isScrolled && isMenuOpen && (
        <motion.nav
          id="scrolled-dropdown-navigation"
          initial={{ height: 0, opacity: 0, y: -10 }}
          animate={{ height: 'auto', opacity: 1, y: 0 }}
          exit={{ height: 0, opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#E7F2E4]/90 via-[#FAF7EE]/85 to-[#F5ECE6]/90 backdrop-blur-xl border border-[#C8DAC3]/80 shadow-xl shadow-[#34342E]/8 px-3 sm:px-6 py-3.5"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {NAV_TABS.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  id={`scrolled-menu-tab-${tab.id}`}
                  onClick={() => handleTabClick(tab.id)}
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: idx * 0.035, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center gap-1.5 transition-all cursor-pointer select-none group shadow-xs ${
                    isActive
                      ? 'bg-gradient-to-br from-[#4A663F] via-[#525E3E] to-[#5A5A40] text-white border-[#4A663F] shadow-md shadow-[#4A663F]/25 ring-1 ring-white/20'
                      : 'bg-white/70 hover:bg-white text-[#34342E] border-[#C8DAC3]/70 hover:border-[#5A5A40]/40'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#5A5A40]/10 text-[#5A5A40] group-hover:bg-[#5A5A40]/15'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight tracking-tight">
                      {tab.label}
                    </div>
                    {tab.tag && (
                      <span
                        className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white/95'
                            : 'bg-[#5A5A40]/10 text-[#5A5A40]'
                        }`}
                      >
                        {tab.tag}
                      </span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </>
  );
};
