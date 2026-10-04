import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header.jsx';
import { Navigation } from './components/Navigation.jsx';
import { AnimatedBackground } from './components/AnimatedBackground.jsx';
import { GrammarLessonsCatalogView } from './components/GrammarLessonsCatalogView.jsx';
import { GrammarWorkbenchView } from './components/GrammarWorkbenchView.jsx';
import { LessonModal } from './components/LessonModal.jsx';
import { GrammarAspectModal } from './components/GrammarAspectModal.jsx';
import { TutorChatView } from './components/TutorChatView.jsx';
import { FlashcardsView } from './components/FlashcardsView.jsx';
import { GrammarDoctorView } from './components/GrammarDoctorView.jsx';
import { StoriesView } from './components/StoriesView.jsx';
import { ProgressStatsView } from './components/ProgressStatsView.jsx';
import { AiQuizModal } from './components/AiQuizModal.jsx';
import { Footer } from './components/Footer.jsx';
import { loadUserProgress, markLessonCompleted, toggleCardMastery, addXp } from './utils/storageUtils.js';
import { getStoredUnits } from './utils/curriculumStore.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('grammar-lessons');
  const [activeLevel, setActiveLevel] = useState('A2');
  const [audioSpeed, setAudioSpeed] = useState(0.9);
  const [progress, setProgress] = useState(loadUserProgress());
  const [units, setUnits] = useState(getStoredUnits());
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  // Modals state
  const [activeLesson, setActiveLesson] = useState(null);
  const [previewUnit, setPreviewUnit] = useState(null);
  const [quizModalData, setQuizModalData] = useState(null);
  const [modalActiveCount, setModalActiveCount] = useState(0);

  // Listen to global modal visibility changes from modal components
  useEffect(() => {
    const handleModalChange = (e) => {
      setModalActiveCount(e.detail?.count || 0);
    };
    window.addEventListener('app-modal-change', handleModalChange);
    return () => window.removeEventListener('app-modal-change', handleModalChange);
  }, []);

  const isModalOpen = Boolean(
    activeLesson ||
    previewUnit ||
    quizModalData ||
    modalActiveCount > 0
  );

  useEffect(() => {
    setProgress(loadUserProgress());
    setUnits(getStoredUnits());
  }, []);

  // Ensure window view always starts at top when switching tabs
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  // Track window scroll position to trigger dynamic nav transition smoothly
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Smooth hysteresis threshold: enter at 35px, exit at 15px
          setIsScrolled((prevScrolled) => {
            if (!prevScrolled && scrollY > 35) {
              return true;
            }
            if (prevScrolled && scrollY <= 15) {
              setIsNavMenuOpen(false);
              return false;
            }
            return prevScrolled;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    if (window.scrollY > 35) {
      setIsScrolled(true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLessonCompleted = (lessonId, xpEarned) => {
    const updated = markLessonCompleted(lessonId, xpEarned);
    setProgress(updated);
  };

  const handleToggleMastery = (cardId) => {
    const updated = toggleCardMastery(cardId);
    setProgress(updated);
  };

  const handleAwardXp = (amount) => {
    const updated = addXp(amount);
    setProgress(updated);
  };

  const handleOpenAiQuiz = (topic, level, unit = null) => {
    setQuizModalData({ topic, level, unit });
  };

  return (
    <div className="relative min-h-screen bg-[#F5F5F0] text-[#34342E] flex flex-col font-sans selection:bg-[#5A5A40] selection:text-white">
      {/* Animated Moving Background Canvas */}
      <AnimatedBackground isPaused={isModalOpen} />

      {/* Sticky Top Header & Navigation Container (hidden when modal is open) */}
      {!isModalOpen && (
        <header
          className={`sticky top-0 z-30 transition-[padding] duration-250 ease-out will-change-transform transform-gpu pointer-events-none ${
            isScrolled
              ? 'pt-2.5 sm:pt-3.5 px-3 sm:px-6 lg:px-8 pb-1'
              : 'pt-0 px-0 pb-0'
          }`}
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-2.5">
            {/* Top Bar Row: Header Capsule + Same-Height Companion Menu Button */}
            <div className="flex items-stretch gap-2.5 sm:gap-3 pointer-events-auto">
              {/* Main Header Capsule */}
              <div
                className={`flex-1 min-w-0 flex items-center transition-[border-radius,background-color,border-color,box-shadow] duration-250 ease-out ${
                  isScrolled
                    ? 'rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#E7F2E4]/85 via-[#FAF7EE]/80 to-[#F5ECE6]/85 backdrop-blur-md border border-[#C8DAC3]/85 shadow-md shadow-[#34342E]/5 ring-1 ring-[#5A7A5A]/10'
                    : 'w-full bg-gradient-to-r from-[#E7F2E4]/70 via-[#FAF7EE]/65 to-[#F5ECE6]/70 backdrop-blur-md border-b border-[#C8DAC3]/60 shadow-none rounded-none'
                }`}
              >
                <div className="w-full">
                  <Header
                    progress={progress}
                    activeLevel={activeLevel}
                    onLevelChange={setActiveLevel}
                    audioSpeed={audioSpeed}
                    onSpeedChange={setAudioSpeed}
                    isScrolled={isScrolled}
                  />
                </div>
              </div>

              {/* Menu Button with Three Little Lines - Same Height, Refined, Crisp & Gorgeous */}
              <AnimatePresence>
                {isScrolled && (
                  <motion.button
                    id="header-side-menu-btn"
                    initial={{ opacity: 0, scale: 0.9, width: 0 }}
                    animate={{ opacity: 1, scale: 1, width: 'auto' }}
                    exit={{ opacity: 0, scale: 0.9, width: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setIsNavMenuOpen((prev) => !prev)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    className={`self-stretch shrink-0 px-4 sm:px-5 rounded-2xl sm:rounded-3xl flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-md backdrop-blur-md select-none group ${
                      isNavMenuOpen
                        ? 'bg-[#5A5A40] text-white border border-[#5A5A40] shadow-md shadow-[#5A5A40]/25 ring-2 ring-[#5A5A40]/20'
                        : 'bg-gradient-to-r from-[#FAF7EE]/90 via-[#F5ECE6]/85 to-[#E7F2E4]/90 text-[#34342E] border border-[#C8DAC3]/85 hover:border-[#5A5A40]/50 hover:bg-white hover:shadow-lg ring-1 ring-[#5A7A5A]/10'
                    }`}
                    title={isNavMenuOpen ? 'Fermer le menu' : 'Menu de navigation'}
                    aria-label={isNavMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                    aria-expanded={isNavMenuOpen}
                  >
                    {/* Three Little Lines: Refined, Crisp & Perfectly Balanced */}
                    <div className="relative w-5 h-4 flex flex-col justify-between items-center pointer-events-none">
                      <motion.span
                        animate={isNavMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-5 h-[2px] rounded-full block transform origin-center transition-colors ${
                          isNavMenuOpen ? 'bg-white' : 'bg-[#34342E]'
                        }`}
                      />
                      <motion.span
                        animate={isNavMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.12 }}
                        className={`w-3.5 h-[2px] rounded-full block transition-colors ${
                          isNavMenuOpen ? 'bg-white' : 'bg-[#34342E]'
                        }`}
                      />
                      <motion.span
                        animate={isNavMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-5 h-[2px] rounded-full block transform origin-center transition-colors ${
                          isNavMenuOpen ? 'bg-white' : 'bg-[#34342E]'
                        }`}
                      />
                    </div>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Dynamic Horizontal Tab Navigation (Normal top view when not scrolled) */}
            <AnimatePresence initial={false}>
              {!isScrolled && (
                <motion.div
                  key="top-horizontal-nav"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden pointer-events-auto"
                >
                  <Navigation
                    activeTab={activeTab}
                    onTabChange={(tabId) => setActiveTab(tabId)}
                    isScrolled={false}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* When scrolled down and menu is open: Dropdown Navigation Panel with Butter-smooth transition */}
            <AnimatePresence>
              {isScrolled && isNavMenuOpen && (
                <motion.div
                  key="scrolled-dropdown-nav"
                  initial={{ height: 0, opacity: 0, y: -8 }}
                  animate={{ height: 'auto', opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden pointer-events-auto"
                >
                  <Navigation
                    activeTab={activeTab}
                    onTabChange={(tabId) => {
                      setActiveTab(tabId);
                      setIsNavMenuOpen(false);
                    }}
                    isScrolled={true}
                    isMenuOpen={true}
                    onCloseMenu={() => setIsNavMenuOpen(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>
      )}

      {/* Main Viewport Content */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'grammar-lessons' && (
          <GrammarLessonsCatalogView
            activeLevel={activeLevel}
            completedLessons={progress.completedLessons}
            audioSpeed={audioSpeed}
            units={units}
            onAwardXp={handleAwardXp}
            onLessonComplete={handleLessonCompleted}
            onSelectLesson={(lesson) => setPreviewUnit(lesson)}
            onOpenAiQuiz={handleOpenAiQuiz}
          />
        )}

        {activeTab === 'workbench' && (
          <GrammarWorkbenchView
            audioSpeed={audioSpeed}
            activeLevel={activeLevel}
            onAwardXp={handleAwardXp}
          />
        )}

        {activeTab === 'grammar-doctor' && (
          <GrammarDoctorView
            audioSpeed={audioSpeed}
            onAwardXp={handleAwardXp}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView
            progress={progress}
            audioSpeed={audioSpeed}
            onToggleMastery={handleToggleMastery}
            onAwardXp={handleAwardXp}
          />
        )}

        {activeTab === 'stories' && (
          <StoriesView
            activeLevel={activeLevel}
            audioSpeed={audioSpeed}
            onAwardXp={handleAwardXp}
          />
        )}

        {activeTab === 'tutor' && (
          <TutorChatView
            activeLevel={activeLevel}
            audioSpeed={audioSpeed}
            onAwardXp={handleAwardXp}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressStatsView
            progress={progress}
            activeLevel={activeLevel}
          />
        )}
      </main>

      {/* Interactive Lesson Runner Modal */}
      {activeLesson && (
        <LessonModal
          lesson={activeLesson}
          audioSpeed={audioSpeed}
          onClose={() => setActiveLesson(null)}
          onComplete={handleLessonCompleted}
        />
      )}

      {/* Interactive Unit Aspect Preview Modal */}
      {previewUnit && (
        <GrammarAspectModal
          lesson={previewUnit}
          isOpen={!!previewUnit}
          audioSpeed={audioSpeed}
          onClose={() => setPreviewUnit(null)}
          onComplete={(lessonId, xp) => {
            handleLessonCompleted(lessonId, xp);
            setPreviewUnit(null);
          }}
        />
      )}

      {/* AI Quiz Generator Modal */}
      {quizModalData && (
        <AiQuizModal
          topic={quizModalData.topic}
          level={quizModalData.level}
          unit={quizModalData.unit}
          onClose={() => setQuizModalData(null)}
          onAwardXp={handleAwardXp}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
