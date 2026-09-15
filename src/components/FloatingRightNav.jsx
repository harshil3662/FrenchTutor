import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { NAV_TABS } from './Navigation.jsx';

// Cascading staggered container animation
const railContainerVariants = {
  hidden: {
    transition: {
      staggerChildren: 0.04, // Disappear from top one after another with gap of time
      staggerDirection: 1,   // 1 = top-to-bottom order (index 0 to N)
      when: 'afterChildren',
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.055, // Falling down one after another smoothly
      delayChildren: 0.01,
    },
  },
};

// Physics for individual floating buttons: falling from top on enter, retreating up on exit
const navItemVariants = {
  hidden: {
    opacity: 0,
    y: -20,                  // Gentle drop distance without jarring jumps
    scale: 0.88,
    transition: {
      duration: 0.18,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
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
          className="fixed right-3 sm:right-6 top-24 md:top-28 z-40 flex flex-col items-center gap-2.5"
        >
          {/* Circular Navigation Tab Icons cascading top to bottom */}
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
                <div className="pointer-events-none absolute right-[calc(100%+12px)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 flex items-center">
                  <div className="bg-[#34342E] text-white text-xs font-semibold py-1.5 px-3 rounded-xl shadow-lg whitespace-nowrap flex items-center gap-2 border border-[#4A4A40]">
                    <span>{tab.label}</span>
                    {tab.tag && (
                      <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-md font-normal text-white/90">
                        {tab.tag}
                      </span>
                    )}
                  </div>
                  {/* Tooltip arrow */}
                  <div className="w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-[#34342E] ml-[-1px]" />
                </div>

                {/* Circular Button */}
                <motion.button
                  id={`floating-nav-btn-${tab.id}`}
                  onClick={() => onTabChange(tab.id)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.92 }}
                  className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-150 cursor-pointer shadow-lg backdrop-blur-md ${
                    isActive
                      ? 'bg-[#5A5A40] text-white ring-2 ring-[#5A5A40] ring-offset-2 ring-offset-[#F5F5F0]'
                      : 'bg-white/90 text-[#6B6B5B] hover:text-[#34342E] hover:bg-white border border-[#DCDCCF]/90 shadow-sm'
                  }`}
                  title={tab.label}
                  aria-label={tab.label}
                >
                  <Icon className="w-5 h-5" />
                  
                  {/* Active Pulsing Indicator Dot */}
                  {isActive && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E5E5D8] ring-1 ring-[#5A5A40]" />
                  )}
                </motion.button>
              </motion.div>
            );
          })}

          {/* Quick Scroll To Top Button (Final element in the cascade) */}
          <motion.div
            key="scroll-to-top"
            variants={navItemVariants}
            className="relative group flex items-center mt-1"
          >
            <div className="pointer-events-none absolute right-[calc(100%+12px)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 flex items-center">
              <div className="bg-[#34342E] text-white text-[11px] font-medium py-1 px-2.5 rounded-lg shadow-md whitespace-nowrap">
                Top of Page
              </div>
              <div className="w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-[#34342E] ml-[-1px]" />
            </div>
            <motion.button
              id="floating-scroll-top-btn"
              onClick={scrollToTop}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              className="w-9 h-9 rounded-full bg-[#EAE6DF]/90 hover:bg-[#DCD8C8] text-[#5A5A40] flex items-center justify-center transition-colors duration-150 cursor-pointer border border-[#DCDCCF] shadow-md"
              title="Scroll to Top"
              aria-label="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
