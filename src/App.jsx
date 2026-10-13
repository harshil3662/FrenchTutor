import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Pause, Play, X } from 'lucide-react';
import { Header, HeaderControls } from './components/Header.jsx';
import { Navigation } from './components/Navigation.jsx';
import { HomeView } from './components/HomeView.jsx';
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
import { resumeFrench } from './utils/audioUtils.js';
import { getUnlockedLevels } from './utils/progressionUtils.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeLevel, setActiveLevel] = useState('A1');
  const [audioSpeed, setAudioSpeed] = useState(0.9);
  const [progress, setProgress] = useState(loadUserProgress());
  const [units, setUnits] = useState(getStoredUnits());
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isNarrationPaused, setIsNarrationPaused] = useState(false);
  const [isNarrationPanelDismissed, setIsNarrationPanelDismissed] = useState(false);

  // Unlocked levels based on bottom-to-top unit progression
  const unlockedLevels = getUnlockedLevels(progress.completedLessons);

  // Ensure activeLevel is always an unlocked level
  useEffect(() => {
    if (!unlockedLevels.includes(activeLevel)) {
      setActiveLevel('A1');
    }
  }, [unlockedLevels, activeLevel]);

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

  useEffect(() => {
    const handleSpeechState = (event) => {
      const isPaused = event.detail?.status === 'paused';
      setIsNarrationPaused(isPaused);
      if (isPaused) setIsNarrationPanelDismissed(false);
    };
    window.addEventListener('french-speech-state', handleSpeechState);
    return () => window.removeEventListener('french-speech-state', handleSpeechState);
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

  const handleLessonCompleted = (lessonId, xpEarned, isMastered = false, percent = null) => {
    const updated = markLessonCompleted(lessonId, xpEarned, isMastered, percent);
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

  const handleHeaderLevelChange = (lvl) => {
    if (unlockedLevels.includes(lvl)) {
      setActiveLevel(lvl);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F7F2E7] text-[#1B2433] flex flex-col font-sans selection:bg-[#1F3A5F] selection:text-white">
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
                className={`relative flex-1 min-w-0 flex items-center transition-[border-radius,background-color,border-color,box-shadow] duration-250 ease-out ${
                  isScrolled
                    ? 'rounded-2xl sm:rounded-3xl bg-transparent border border-transparent shadow-none ring-0'
                    : 'w-full bg-[#EFE6D2]/90 backdrop-blur-md border-b-2 border-[#1F3A5F] shadow-none rounded-none'
                }`}
              >
                {!isScrolled && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[-2px] inset-x-0 h-[3px] flex pointer-events-none"
                  >
                    <span className="flex-1 bg-[#1F3A5F]" />
                    <span className="flex-1 bg-[#FBF8F1]" />
                    <span className="flex-1 bg-[#C8102E]" />
                  </span>
                )}
                <div className="w-full">
                  <Header
                    progress={progress}
                    activeLevel={activeLevel}
                    unlockedLevels={unlockedLevels}
                    onLevelChange={handleHeaderLevelChange}
                    audioSpeed={audioSpeed}
                    onSpeedChange={setAudioSpeed}
                    isScrolled={isScrolled}
                  />
                </div>
              </div>

              {/* Scrolled menu toggle: labeled pill that swaps between grid and close icons */}
              <AnimatePresence>
                {isScrolled && (
                  <motion.button
                    id="header-side-menu-btn"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setIsNavMenuOpen((prev) => !prev)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    className={`self-center shrink-0 h-10 w-10 sm:w-auto justify-center sm:justify-start px-0 sm:pl-1.5 sm:pr-4 rounded-full flex items-center gap-2 border shadow-md cursor-pointer select-none text-sm font-bold transition-colors duration-200 ${
                      isNavMenuOpen
                        ? 'bg-[#1F3A5F] text-white border-[#1F3A5F] shadow-[#1F3A5F]/25'
                        : 'bg-[#FBF8F1]/95 text-[#1F3A5F] border-[#D9CFBA]/85 hover:bg-white hover:border-[#1F3A5F]/50'
                    }`}
                    title={isNavMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-label={isNavMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                    aria-expanded={isNavMenuOpen}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
                        isNavMenuOpen ? 'bg-white/20' : 'bg-[#1F3A5F]/10'
                      }`}
                    >
                      {isNavMenuOpen ? <X className="w-3.5 h-3.5" /> : <LayoutGrid className="w-3.5 h-3.5" />}
                    </span>
                    <span className="hidden sm:inline pointer-events-none">{isNavMenuOpen ? 'Close' : 'Menu'}</span>
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
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
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
                    controls={
                      <HeaderControls
                        progress={progress}
                        activeLevel={activeLevel}
                        unlockedLevels={unlockedLevels}
                        onLevelChange={handleHeaderLevelChange}
                        audioSpeed={audioSpeed}
                        onSpeedChange={setAudioSpeed}
                      />
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>
      )}

      {/* Main Viewport Content */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'home' && (
          <HomeView
            progress={progress}
            unlockedLevels={unlockedLevels}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'grammar-lessons' && (
          <GrammarLessonsCatalogView
            activeLevel={activeLevel}
            unlockedLevels={unlockedLevels}
            completedLessons={progress.completedLessons}
            masteredLessons={progress.masteredLessons || []}
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
            activeLevel={activeLevel}
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
          onComplete={(lessonId, xp, isMastered, percent) => {
            handleLessonCompleted(lessonId, xp, isMastered, percent);
          }}
        />
      )}

      {/* Practice Quiz Generator Modal */}
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

      <AnimatePresence>
        {isNarrationPaused && !isNarrationPanelDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18 }}
            role="status"
            aria-live="polite"
            className="fixed inset-x-3 bottom-3 z-[110] flex items-center gap-3 rounded-xl border border-[#D9CFBA] bg-[#1B2433] px-4 py-3 text-white shadow-lg sm:inset-x-auto sm:bottom-4 sm:right-4"
          >
            <Pause className="h-4 w-4 text-[#E3C66B]" aria-hidden="true" />
            <span className="text-sm font-medium">Narration paused</span>
            <button
              type="button"
              onClick={resumeFrench}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-semibold hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
              Resume
            </button>
            <button
              type="button"
              onClick={() => setIsNarrationPanelDismissed(true)}
              aria-label="Close narration panel"
              title="Close narration panel"
              className="rounded-md p-1 text-white/70 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
