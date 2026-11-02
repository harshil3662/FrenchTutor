import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { House, BookOpen, Cpu, Stethoscope, Layers, BookCheck, MessageSquare, Trophy } from './icons';

// Each tab carries one of the three brand colors; chips, icons and cards pick it up from here.
export const ACCENT_STYLES = {
  navy: { chip: 'bg-[#1F3A5F]/10 text-[#1F3A5F]', icon: 'text-[#1F3A5F]', hoverBorder: 'hover:border-[#1F3A5F]/50' },
  blue: { chip: 'bg-[#4A7AB8]/15 text-[#2F5F9E]', icon: 'text-[#2F5F9E]', hoverBorder: 'hover:border-[#4A7AB8]/60' },
  red: { chip: 'bg-[#E5565F]/12 text-[#B93A44]', icon: 'text-[#B93A44]', hoverBorder: 'hover:border-[#E5565F]/55' },
};

export const NAV_TABS = [
  { id: 'home', label: 'Home', icon: House, accent: 'navy' },
  { id: 'grammar-lessons', label: 'Grammar Lessons', icon: BookOpen, accent: 'blue' },
  { id: 'workbench', label: 'Workbench', icon: Cpu, accent: 'red' },
  { id: 'grammar-doctor', label: 'Grammar Doctor', icon: Stethoscope, accent: 'navy' },
  { id: 'flashcards', label: 'Vocabulary', icon: Layers, accent: 'blue' },
  { id: 'stories', label: 'Reading', icon: BookCheck, accent: 'red' },
  { id: 'tutor', label: 'Grammar Tutor', icon: MessageSquare, accent: 'navy' },
  { id: 'progress', label: 'Stats', icon: Trophy, accent: 'blue' },
];

export const Navigation = ({
  activeTab,
  onTabChange,
  isScrolled = false,
  isMenuOpen = false,
  onCloseMenu,
  controls = null,
}) => {
  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    if (isScrolled && onCloseMenu) {
      onCloseMenu();
    }
  };

  const activeSpring = { type: 'spring', stiffness: 150, damping: 20, mass: 1.1 };

  return (
    <>
      {/* 1. Normal State (At Top): thin full-width dock, one equal column per tab, with a rounded navy pill on the active tab */}
      {!isScrolled && (
        <nav id="main-navigation" className="select-none">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5">
            <div className="rounded-3xl xl:rounded-full border border-[#8DB1E3]/45 bg-white/80 backdrop-blur-md shadow-xs shadow-[#4A7AB8]/10 p-1.5">
              <div className="grid grid-cols-2 min-[540px]:grid-cols-3 md:grid-cols-4 xl:flex gap-1">
                {NAV_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <motion.button
                      key={tab.id}
                      id={`nav-tab-${tab.id}`}
                      data-tab-id={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      whileHover="hover"
                      whileTap={{ scale: 0.97 }}
                      className={`relative z-10 group flex min-w-0 xl:flex-auto items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 py-3 text-center cursor-pointer select-none transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-[#5F6B7A] hover:text-[#1B2433] hover:bg-[#4A7AB8]/10'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-[#1F3A5F] shadow-md shadow-[#1F3A5F]/25"
                          transition={activeSpring}
                        />
                      )}

                      <motion.span
                        className="flex shrink-0"
                        variants={{ hover: { rotate: -10, scale: 1.15 } }}
                        transition={{ type: 'spring', stiffness: 320, damping: 16 }}
                      >
                        <Icon
                          className={`w-5 h-5 transition-colors duration-300 ${
                            isActive ? 'text-[#E5565F]' : ACCENT_STYLES[tab.accent].icon
                          }`}
                        />
                      </motion.span>
                      <span className="text-[14px] font-bold leading-tight tracking-tight">
                        {tab.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* 2. Scrolled State Menu Panel: numbered cards */}
      {isScrolled && isMenuOpen && (
        <motion.nav
          id="scrolled-dropdown-navigation"
          className="overflow-y-auto overflow-x-hidden max-h-[calc(100dvh-7.5rem)] rounded-3xl border border-transparent shadow-lg shadow-[#1B2433]/5 px-3 sm:px-5 py-3.5"
        >
          {controls && <div className="min-[1370px]:hidden pb-3 mb-3 border-b border-white/20">{controls}</div>}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {NAV_TABS.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  id={`scrolled-menu-tab-${tab.id}`}
                  onClick={() => handleTabClick(tab.id)}
                  whileHover="hover"
                  variants={{ hover: { y: -2 } }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative isolate overflow-hidden p-2.5 sm:p-3 rounded-2xl border flex flex-row sm:flex-col items-center sm:items-start gap-2.5 sm:gap-2 text-left transition-colors cursor-pointer select-none group shadow-xs ${
                    isActive
                      ? 'text-white border-transparent'
                      : 'bg-white text-[#1B2433] border-[#D0D7E2]/70 hover:border-[#4A7AB8]/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="scrolled-nav-pill"
                      className="absolute inset-0 -z-10 rounded-2xl bg-[#1F3A5F]/90 shadow-md shadow-[#1F3A5F]/25"
                      transition={activeSpring}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={`absolute right-2.5 top-1.5 font-serif text-lg font-bold leading-none ${
                      isActive ? 'text-white/25' : 'text-[#1F3A5F]/15'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {isActive && (
                    <span aria-hidden="true" className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-[#E5565F]" />
                  )}
                  <motion.div
                    className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? 'bg-white/15 text-white' : ACCENT_STYLES[tab.accent].chip
                    }`}
                    variants={{ hover: { rotate: -8, scale: 1.1 } }}
                    transition={{ type: 'spring', stiffness: 320, damping: 16 }}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </motion.div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold leading-tight tracking-tight">{tab.label}</div>
                    {tab.tag && (
                      <div
                        className={`hidden sm:block mt-0.5 max-w-full truncate whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.12em] ${
                          isActive ? 'text-white/70' : 'text-[#5F6B7A]'
                        }`}
                      >
                        {tab.tag}
                      </div>
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
