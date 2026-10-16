import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const FloatingRightNav = ({
  isVisible,
  isMenuOpen = false,
  onToggleMenu,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.aside
          id="floating-right-navigation"
          initial={{ opacity: 0, x: 20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.9 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-3 sm:right-5 top-20 sm:top-24 z-40 flex flex-col items-center gap-2"
        >
          {/* Floating Menu Button with Three Little Lines */}
          <div className="relative group">
            <motion.button
              id="floating-menu-toggle-btn"
              onClick={onToggleMenu}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-xl ${
                isMenuOpen
                  ? 'bg-[#1F3A5F] text-white ring-2 ring-[#1F3A5F]/50 shadow-md shadow-[#1F3A5F]/30'
                  : 'bg-gradient-to-br from-[#FFFFFF]/95 to-[#F5F7FA]/90 text-[#1B2433] border border-[#D0D7E2]/90 hover:border-[#1F3A5F]/50'
              }`}
              title={isMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-label={isMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={isMenuOpen}
            >
              {/* Three Little Lines with Morphing Transitional Effect */}
              <div className="flex flex-col justify-center items-center w-5 h-5 space-y-1">
                <motion.span
                  animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-4.5 h-[2px] rounded-full block transform origin-center transition-colors ${
                    isMenuOpen ? 'bg-white' : 'bg-[#1B2433]'
                  }`}
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0, scale: 0.2 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.15 }}
                  className={`w-4.5 h-[2px] rounded-full block transition-colors ${
                    isMenuOpen ? 'bg-white' : 'bg-[#1B2433]'
                  }`}
                />
                <motion.span
                  animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-4.5 h-[2px] rounded-full block transform origin-center transition-colors ${
                    isMenuOpen ? 'bg-white' : 'bg-[#1B2433]'
                  }`}
                />
              </div>
            </motion.button>

            {/* Tooltip on Hover */}
            <div className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 flex items-center">
              <div className="bg-[#1B2433]/95 backdrop-blur-md text-white text-xs font-semibold py-1.5 px-3 rounded-xl shadow-xl whitespace-nowrap border border-[#1B2433]">
                {isMenuOpen ? 'Close Menu' : 'Navigation Menu'}
              </div>
              <div className="w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-[#1B2433]/95 ml-[-1px]" />
            </div>
          </div>

          {/* Quick Scroll To Top Button */}
          <div className="relative group">
            <motion.button
              id="floating-scroll-top-btn"
              onClick={scrollToTop}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              className="w-9 h-9 rounded-full bg-white/80 hover:bg-[#1F3A5F] text-[#1F3A5F] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer border border-[#D0D7E2]/90 shadow-md backdrop-blur-md"
              title="Scroll to Top"
              aria-label="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
            <div className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 flex items-center">
              <div className="bg-[#1B2433]/95 backdrop-blur-md text-white text-[11px] font-medium py-1 px-2.5 rounded-xl shadow-xl whitespace-nowrap border border-[#1B2433]">
                Top of Page
              </div>
              <div className="w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-[#1B2433]/95 ml-[-1px]" />
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
