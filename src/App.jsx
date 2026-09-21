import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.jsx';
import { Navigation } from './components/Navigation.jsx';
import { FloatingRightNav } from './components/FloatingRightNav.jsx';
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

  // Track window scroll position to trigger dynamic nav transition
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Threshold of 65px for collapsing horizontal nav and displaying floating vertical right rail
          setIsScrolled(scrollY > 65);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

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

  const handleOpenAiQuiz = (topic, level) => {
    setQuizModalData({ topic, level });
  };

  return (
    <div className="relative min-h-screen bg-[#F5F5F0] text-[#34342E] flex flex-col font-sans selection:bg-[#5A5A40] selection:text-white">
      {/* Animated Moving Background Canvas */}
      <AnimatedBackground />

      {/* Floating Vertical Circular Navigation Rail (Active on Scroll, hidden when modal is open) */}
      <FloatingRightNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isVisible={isScrolled && !isModalOpen}
      />

      {/* Sticky Top Header & Navigation Container (hidden when modal is open) */}
      {!isModalOpen && (
        <div
          className={`sticky top-0 z-30 transition-all duration-300 bg-[#F5F5F0]/50 backdrop-blur-md ${
            isScrolled
              ? 'border-b border-[#DCDCCF]/70 shadow-xs'
              : 'border-b border-[#DCDCCF]/40 shadow-none'
          }`}
        >
          {/* Top App Header */}
          <Header
            progress={progress}
            activeLevel={activeLevel}
            onLevelChange={setActiveLevel}
            audioSpeed={audioSpeed}
            onSpeedChange={setAudioSpeed}
            isScrolled={isScrolled}
          />

          {/* Dynamic Horizontal Tab Navigation (Smoothly collapses when scrolling down) */}
          <Navigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isScrolled={isScrolled}
          />
        </div>
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
          onClose={() => setQuizModalData(null)}
          onAwardXp={handleAwardXp}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
