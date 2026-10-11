import { GRAMMAR_ASPECT_LESSONS } from '../data/grammarAspectsData.js';

export const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2'];

export const PASS_THRESHOLD_PERCENT = 70;

// Units per level, in the order they appear in the lesson data (by unitNumber).
export const LEVEL_UNIT_ORDER = Object.fromEntries(
  LEVEL_ORDER.map((level) => [
    level,
    GRAMMAR_ASPECT_LESSONS
      .filter((lesson) => lesson.level === level)
      .sort((a, b) => (a.unitNumber ?? 999) - (b.unitNumber ?? 999)),
  ])
);

function isUnitIdCompleted(unit, completed) {
  if (!unit) return false;
  return completed.includes(unit.id) || (unit.legacyId && completed.includes(unit.legacyId));
}

/**
 * Returns the list of unlocked levels (e.g. ['A1'] or ['A1', 'A2'])
 * Always starts from 'A1'. Higher levels unlock sequentially from bottom to top.
 */
export function getUnlockedLevels(completedLessons = []) {
  const completed = Array.isArray(completedLessons) ? completedLessons : [];
  const unlocked = ['A1'];

  // All A1 units must be completed to unlock A2
  const a1Completed = LEVEL_UNIT_ORDER.A1.every((u) => isUnitIdCompleted(u, completed));
  if (a1Completed) {
    unlocked.push('A2');
  }

  // All A2 units must be completed to unlock B1
  const a2Completed = a1Completed && LEVEL_UNIT_ORDER.A2.every((u) => isUnitIdCompleted(u, completed));
  if (a2Completed) {
    unlocked.push('B1');
  }

  // All B1 units must be completed to unlock B2
  const b1Completed = a2Completed && LEVEL_UNIT_ORDER.B1.every((u) => isUnitIdCompleted(u, completed));
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
  if (completed.includes(lesson.id) || (lesson.legacyId && completed.includes(lesson.legacyId))) {
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

  const unitIdx = levelUnits.findIndex((u) =>
    u.id === lesson.id ||
    (lesson.legacyId && u.legacyId === lesson.legacyId) ||
    u.unitNumber === lesson.unitNumber
  );

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
  const isPrevCompleted = isUnitIdCompleted(prevUnit, completed);

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
