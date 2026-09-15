import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Clock, Sparkles, ArrowRight, Play, BrainCircuit } from 'lucide-react';
import { CURRICULUM_LESSONS } from '../data/curriculumData.js';
import { formatBoldText } from '../utils/textFormatter.jsx';

export const CurriculumView = ({
  activeLevel,
  onLevelChange,
  progress,
  onStartLesson,
  onGenerateAiQuiz,
}) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredLessons = CURRICULUM_LESSONS.filter(
    (l) => l.level === activeLevel && (activeCategory === 'All' || l.category === activeCategory)
  );

  const levelInfo = {
    A1: {
      title: 'Discovery (Beginner)',
      tagline: 'Foundations of French: Pronunciation, greetings, basic needs, café ordering & essential verbs.',
      color: 'from-[#5A5A40] via-[#68684D] to-[#767655]',
    },
    A2: {
      title: 'Survival (Elementary)',
      tagline: 'Real-world situations: Past tenses (Passé composé vs Imparfait), shopping, travel, directions.',
      color: 'from-[#8C6D58] via-[#9B7B64] to-[#AA8B74]',
    },
    B1: {
      title: 'Autonomy (Intermediate)',
      tagline: 'Fluid expression: Subjunctive mood, expressing opinions, cinema, culture & French debates.',
      color: 'from-[#5E725A] via-[#6D8269] to-[#7E947A]',
    },
    B2: {
      title: 'Mastery (Upper Intermediate)',
      tagline: 'Native nuance: Complex idioms, French literature, professional interviews & subtle registers.',
      color: 'from-[#A25F50] via-[#B27060] to-[#C07E6E]',
    },
  }[activeLevel];

  const categories = ['All', 'Conversation', 'Grammar', 'Vocabulary', 'Culture'];

  return (
    <div id="curriculum-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Level Hero Header */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${levelInfo.color} text-white shadow-md relative overflow-hidden`}>
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-white/20">
            <span>CEFR Level {activeLevel}</span>
            <span>•</span>
            <span>{levelInfo.title}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif">{levelInfo.title}</h2>
          <p className="text-sm sm:text-base text-white/95 leading-relaxed">{levelInfo.tagline}</p>

          {/* Dynamic AI Custom Quiz Generator for this level */}
          <div className="pt-2">
            <button
              id="generate-level-quiz-btn"
              onClick={() => onGenerateAiQuiz(`French ${activeLevel} Comprehensive Practice`, activeLevel)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-[#34342E] rounded-xl font-bold text-xs shadow-sm hover:bg-[#F5F5F0] transition-all cursor-pointer"
            >
              <BrainCircuit className="w-4 h-4 text-[#5A5A40]" />
              Generate Instant AI Quiz for Level {activeLevel}
            </button>
          </div>
        </div>

        {/* Decorative subtle visual */}
        <div className="absolute -right-6 -bottom-10 opacity-15 text-9xl font-black font-serif select-none pointer-events-none">
          {activeLevel}
        </div>
      </div>

      {/* Level Switcher & Category Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#DCDCCF] pb-4">
        {/* CEFR Level buttons */}
        <div className="flex space-x-2">
          {['A1', 'A2', 'B1', 'B2'].map((lvl) => (
            <button
              key={lvl}
              id={`curriculum-lvl-${lvl}`}
              onClick={() => onLevelChange(lvl)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeLevel === lvl
                  ? 'bg-[#5A5A40] text-white shadow-xs'
                  : 'bg-white border border-[#DCDCCF] text-[#7A7A6A] hover:text-[#34342E] hover:bg-[#F5F5F0]'
              }`}
            >
              Level {lvl}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#5A5A40] text-white'
                  : 'bg-white border border-[#DCDCCF] text-[#7A7A6A] hover:text-[#34342E] hover:bg-[#F5F5F0]'
              }`}
            >
              {cat === 'All' ? 'All modules' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lesson Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => {
          const isCompleted = progress.completedLessons.includes(lesson.id);

          return (
            <div
              key={lesson.id}
              id={`lesson-card-${lesson.id}`}
              className="bg-white border border-[#E8E2D9] hover:border-[#5A5A40]/40 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                {/* Badges row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#F0ECE1] text-[#5A5A40] border border-[#5A5A40]/15">
                      Unit {lesson.unit}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#FAF3EE] text-[#9C4B2E] border border-[#D98E73]/20">
                      {lesson.category}
                    </span>
                  </div>

                  {isCompleted ? (
                    <div className="flex items-center space-x-1 text-[#5A7A5A] text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Completed</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-[#5A5A40] text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>+{lesson.xpReward} XP</span>
                    </div>
                  )}
                </div>

                {/* Lesson Titles */}
                <div>
                  <h3 className="text-base font-bold text-[#34342E] font-serif group-hover:text-[#5A5A40] transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-[#7A7A6A] font-medium mt-0.5">{lesson.subtitle}</p>
                </div>

                <p className="text-xs text-[#525248] leading-relaxed line-clamp-2">
                  {formatBoldText(lesson.description)}
                </p>

                {/* Stats row */}
                <div className="flex items-center space-x-4 text-xs text-[#7A7A6A] pt-2 border-t border-[#E8E2D9]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#7A7A6A]" />
                    {lesson.durationMinutes} min
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#7A7A6A]" />
                    {lesson.vocabulary.length} key words
                  </span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#7A7A6A]" />
                    {lesson.exercises.length} exercises
                  </span>
                </div>
              </div>

              {/* Start Action */}
              <button
                id={`start-lesson-btn-${lesson.id}`}
                onClick={() => onStartLesson(lesson)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isCompleted
                    ? 'bg-[#EAE6DF] hover:bg-[#DCDCCF] text-[#34342E] border border-[#DCDCCF]'
                    : 'bg-[#5A5A40] hover:bg-[#4A4A35] text-white shadow-sm'
                }`}
              >
                {isCompleted ? (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Review Lesson</span>
                  </>
                ) : (
                  <>
                    <span>Start Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
