import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { NAV_TABS } from './Navigation.jsx';

// Cascading staggered container animation
const railContainerVariants = {
  hidden: {
    opacity: 0,
    x: 24,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.05,
      duration: 0.28,
      ease: [0.2, 0.8, 0.2, 1],
    },
  },
};

// Physics for individual floating buttons
const navItemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    y: -8,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 420,
      damping: 24,
      mass: 0.7,
    },
  },
};

export const FloatingRightNav = ({ activeTab, onTabChange, isVisible }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.aside
          id="floating-right-navigation"
          variants={railContainerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed right-3 sm:right-5 top-20 sm:top-24 z-40 flex flex-col items-center"
        >
          {/* Frosted Glass Floating Dock Capsule */}
          <div className="flex flex-col items-center gap-2 p-1.5 sm:p-2 rounded-full bg-gradient-to-b from-[#FAF8F2]/92 via-[#F3F7EE]/88 to-[#F6EDE8]/92 backdrop-blur-xl border border-[#C8DAC3]/85 shadow-xl shadow-[#34342E]/10 ring-1 ring-[#5A7A5A]/15">
            {/* Circular Navigation Tab Icons */}
            {NAV_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.div
                  key={tab.id}
                  variants={navItemVariants}
                  className="relative group flex items-center"
                >
                  {/* Tooltip on Hover to the left */}
                  <div className="pointer-events-none absolute right-[calc(100%+14px)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 flex items-center">
                    <div className="bg-[#2A2A22]/95 backdrop-blur-md text-white text-xs font-semibold py-1.5 px-3 rounded-xl shadow-xl whitespace-nowrap flex items-center gap-2 border border-[#48483B]">
                      <span className="font-serif">{tab.label}</span>
                      {tab.tag && (
                        <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-md font-sans font-bold text-white/95">
                          {tab.tag}
                        </span>
                      )}
                    </div>
                    {/* Tooltip arrow */}
                    <div className="w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-[#2A2A22]/95 ml-[-1px]" />
                  </div>

                  {/* Circular Button */}
                  <motion.button
                    id={`floating-nav-btn-${tab.id}`}
                    onClick={() => onTabChange(tab.id)}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.94 }}
                    className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs ${
                      isActive
                        ? 'bg-gradient-to-br from-[#4A663F] via-[#525E3E] to-[#5A5A40] text-white shadow-md shadow-[#4A663F]/35 ring-2 ring-[#4A663F]/40 ring-offset-2 ring-offset-[#F5F5F0]'
                        : 'bg-white/70 hover:bg-white text-[#6B6B5B] hover:text-[#34342E] border border-transparent hover:border-[#DCDCCF]/80'
                    }`}
                    title={tab.label}
                    aria-label={tab.label}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200" />

                    {/* Active Pulsing Indicator Dot */}
                    {isActive && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E5F2DC] ring-1 ring-[#4A663F] shadow-xs" />
                    )}
                  </motion.button>
                </motion.div>
              );
            })}

            {/* Delicate Dock Divider */}
            <div className="w-5 h-[1px] bg-[#C8DAC3]/80 my-0.5" />

            {/* Quick Scroll To Top Button */}
            <motion.div
              key="scroll-to-top"
              variants={navItemVariants}
              className="relative group flex items-center"
            >
              <div className="pointer-events-none absolute right-[calc(100%+14px)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 flex items-center">
                <div className="bg-[#2A2A22]/95 backdrop-blur-md text-white text-[11px] font-medium py-1 px-2.5 rounded-xl shadow-xl whitespace-nowrap border border-[#48483B]">
                  Top of Page
                </div>
                <div className="w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-[#2A2A22]/95 ml-[-1px]" />
              </div>
              <motion.button
                id="floating-scroll-top-btn"
                onClick={scrollToTop}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#5A5A40]/10 hover:bg-[#5A5A40] text-[#5A5A40] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer border border-[#C8DAC3]/70 hover:border-[#5A5A40] shadow-xs"
                title="Scroll to Top"
                aria-label="Scroll to Top"
              >
                <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </motion.button>
            </motion.div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
