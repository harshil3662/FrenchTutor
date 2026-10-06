export const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2'];

export const LEVEL_UNIT_ORDER = {
  A1: [
    { id: 'unit-1-articles', unitNumber: 1, title: 'Unit 1: Articles' },
    { id: 'unit-2-basic-gender', unitNumber: 2, title: 'Unit 2: Basic Gender' },
    { id: 'unit-3-more-nouns-gender', unitNumber: 3, title: 'Unit 3: More French Nouns' },
    { id: 'unit-4-numbers', unitNumber: 4, title: 'Unit 4: Numbers' },
    { id: 'unit-6-building-sentences', unitNumber: 6, title: 'Unit 6: Building Sentences' },
    { id: 'unit-7-asking-questions', unitNumber: 7, title: 'Unit 7: Asking Questions' },
    { id: 'unit-8-exclamations-commands', unitNumber: 8, title: 'Unit 8: Exclamations & Commands' },
    { id: 'unit-10-present-er-verbs', unitNumber: 10, title: 'Unit 10: -ER Verbs' },
    { id: 'unit-11-present-ir-re-verbs', unitNumber: 11, title: 'Unit 11: -IR & -RE Verbs' },
    { id: 'unit-12-etre-avoir-irregulars', unitNumber: 12, title: 'Unit 12: Irregular Verbs' },
    { id: 'unit-28-adjectives', unitNumber: 28, title: 'Unit 28: Adjectives' },
  ],
  A2: [
    { id: 'unit-9-independent-subordinate-clauses', unitNumber: 9, title: 'Unit 9: Clauses' },
    { id: 'unit-13-immediate-future-past-causative', unitNumber: 13, title: 'Unit 13: Immediate Future & Past' },
    { id: 'unit-14-pronominal-verbs', unitNumber: 14, title: 'Unit 14: Pronominal Verbs' },
    { id: 'unit-15-passe-compose', unitNumber: 15, title: 'Unit 15: Passé Composé' },
    { id: 'unit-16-imparfait-plus-que-parfait', unitNumber: 16, title: 'Unit 16: Imparfait' },
    { id: 'unit-21-prepositions', unitNumber: 21, title: 'Unit 21: Prepositions' },
    { id: 'unit-22-infinitive-mood', unitNumber: 22, title: 'Unit 22: Infinitive Mood' },
    { id: 'unit-23-imperative-mood', unitNumber: 23, title: 'Unit 23: Imperative Mood' },
    { id: 'unit-26-pronouns', unitNumber: 26, title: 'Unit 26: Pronouns' },
    { id: 'unit-29-adverbs', unitNumber: 29, title: 'Unit 29: Adverbs' },
  ],
  B1: [
    { id: 'unit-17-simple-future-past-future', unitNumber: 17, title: 'Unit 17: Simple Future' },
    { id: 'unit-18-present-past-conditional', unitNumber: 18, title: 'Unit 18: Conditionals' },
    { id: 'unit-19-could-should-would', unitNumber: 19, title: 'Unit 19: Could, Should, Would' },
    { id: 'unit-20-present-past-subjunctive', unitNumber: 20, title: 'Unit 20: Subjunctive' },
    { id: 'unit-24-present-participle-gerund', unitNumber: 24, title: 'Unit 24: Participle & Gerund' },
    { id: 'unit-27-relative-pronouns', unitNumber: 27, title: 'Unit 27: Relative Pronouns' },
  ],
  B2: [
    { id: 'unit-25-simple-past-passive-indirect-speech', unitNumber: 25, title: 'Unit 25: Simple Past & Passive' },
  ],
};

/**
 * Returns the list of unlocked levels (e.g. ['A1'] or ['A1', 'A2'])
 * Always starts from 'A1'. Higher levels unlock sequentially from bottom to top.
 */
export function getUnlockedLevels(completedLessons = []) {
  const completed = Array.isArray(completedLessons) ? completedLessons : [];
  const unlocked = ['A1'];

  // All A1 units must be completed to unlock A2
  const a1Completed = LEVEL_UNIT_ORDER.A1.every((u) => completed.includes(u.id));
  if (a1Completed) {
    unlocked.push('A2');
  }

  // All A2 units must be completed to unlock B1
  const a2Completed = a1Completed && LEVEL_UNIT_ORDER.A2.every((u) => completed.includes(u.id));
  if (a2Completed) {
    unlocked.push('B1');
  }

  // All B1 units must be completed to unlock B2
  const b1Completed = a2Completed && LEVEL_UNIT_ORDER.B1.every((u) => completed.includes(u.id));
  if (b1Completed) {
    unlocked.push('B2');
  }

  return unlocked;
}

/**
 * Returns the current active level the user is on (highest unlocked level)
 */
export function getCurrentUserLevel(completedLessons = []) {
  const unlocked = getUnlockedLevels(completedLessons);
  return unlocked[unlocked.length - 1];
}

/**
 * Determines whether a specific lesson unit is unlocked for the user.
 * Lessons unlock from bottom to top within the user's current level.
 */
export function getLessonLockStatus(lesson, completedLessons = [], unlockedLevels = null) {
  const completed = Array.isArray(completedLessons) ? completedLessons : [];
  const activeUnlockedLevels = unlockedLevels || getUnlockedLevels(completed);

  // If already completed or mastered, it is always unlocked
  if (completed.includes(lesson.id)) {
    return { isUnlocked: true, lockReason: '' };
  }

  const lessonLevel = lesson.level || 'A1';

  // If the level itself is locked
  if (!activeUnlockedLevels.includes(lessonLevel)) {
    const levelIndex = LEVEL_ORDER.indexOf(lessonLevel);
    const prevLevel = levelIndex > 0 ? LEVEL_ORDER[levelIndex - 1] : 'A1';
    return {
      isUnlocked: false,
      lockReason: `Complete Level ${prevLevel} first`,
      levelLocked: true,
      requiredLevel: lessonLevel,
    };
  }

  // Within an unlocked level, verify sequential progression
  const levelUnits = LEVEL_UNIT_ORDER[lessonLevel];
  if (!levelUnits) {
    return { isUnlocked: true, lockReason: '' };
  }

  const unitIdx = levelUnits.findIndex((u) => u.id === lesson.id || u.unitNumber === lesson.unitNumber);

  // Custom or non-standard lessons are unlocked once level is unlocked
  if (unitIdx === -1) {
    return { isUnlocked: true, lockReason: '' };
  }

  // First unit in any unlocked level is immediately unlocked
  if (unitIdx === 0) {
    return { isUnlocked: true, lockReason: '' };
  }

  // Subsequent units unlock after previous unit is completed
  const prevUnit = levelUnits[unitIdx - 1];
  const isPrevCompleted = completed.includes(prevUnit.id);

  if (isPrevCompleted) {
    return { isUnlocked: true, lockReason: '' };
  }

  return {
    isUnlocked: false,
    lockReason: `Complete Unit ${prevUnit.unitNumber} first`,
    levelLocked: false,
    requiredUnit: prevUnit,
  };
}
