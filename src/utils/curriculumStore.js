import { GRAMMAR_ASPECT_LESSONS } from '../data/grammarAspectsData.js';

const UNITS_STORAGE_KEY = 'french_grammar_units_v3';
const PRACTICE_STORAGE_KEY = 'french_ai_practice_exercises_v1';
const QUIZ_HISTORY_STORAGE_KEY = 'french_ai_quiz_history_v1';
const QUIZ_HISTORY_LIMIT = 16;
const QUIZ_LOCK_STORAGE_KEY = 'french_quiz_locked_lessons_v1';

// A lesson is locked from the moment its quiz is opened until it is mastered, so the notes cannot be used to look up answers
export function isLessonQuizLocked(lessonId) {
  if (!lessonId) return false;
  try {
    const stored = JSON.parse(localStorage.getItem(QUIZ_LOCK_STORAGE_KEY) || '{}');
    return stored[lessonId] === true;
  } catch (e) {
    return false;
  }
}

export function setLessonQuizLocked(lessonId, locked) {
  if (!lessonId) return;
  try {
    const stored = JSON.parse(localStorage.getItem(QUIZ_LOCK_STORAGE_KEY) || '{}');
    if (locked) stored[lessonId] = true;
    else delete stored[lessonId];
    localStorage.setItem(QUIZ_LOCK_STORAGE_KEY, JSON.stringify(stored));
  } catch (e) {
    console.error('Failed to update quiz lock:', e);
  }
}

// Prompts of recently generated quizzes, sent to the server so a retake avoids repeating them
export function getRecentQuizPrompts(lessonId) {
  if (!lessonId) return [];
  try {
    const stored = JSON.parse(localStorage.getItem(QUIZ_HISTORY_STORAGE_KEY) || '{}');
    return Array.isArray(stored[lessonId]) ? stored[lessonId] : [];
  } catch (e) {
    return [];
  }
}

export function recordQuizPrompts(lessonId, questions) {
  if (!lessonId || !Array.isArray(questions)) return;
  try {
    const stored = JSON.parse(localStorage.getItem(QUIZ_HISTORY_STORAGE_KEY) || '{}');
    const prompts = questions.map((question) => question?.prompt).filter((prompt) => typeof prompt === 'string' && prompt.trim());
    const history = [...prompts, ...(Array.isArray(stored[lessonId]) ? stored[lessonId] : [])].slice(0, QUIZ_HISTORY_LIMIT);
    localStorage.setItem(QUIZ_HISTORY_STORAGE_KEY, JSON.stringify({ ...stored, [lessonId]: history }));
  } catch (e) {
    console.error('Failed to record quiz history:', e);
  }
}

export function getStoredAiPracticeExercises(lessonId) {
  if (!lessonId) return null;

  try {
    const stored = JSON.parse(localStorage.getItem(PRACTICE_STORAGE_KEY) || '{}');
    const exercises = stored[lessonId];
    return Array.isArray(exercises) && exercises.length ? exercises : null;
  } catch (e) {
    console.warn('Failed to parse saved practice exercises:', e);
    return null;
  }
}

export function saveStoredAiPracticeExercises(lessonId, exercises) {
  if (!lessonId || !Array.isArray(exercises) || !exercises.length) return;

  recordQuizPrompts(lessonId, exercises);

  try {
    const stored = JSON.parse(localStorage.getItem(PRACTICE_STORAGE_KEY) || '{}');
    localStorage.setItem(
      PRACTICE_STORAGE_KEY,
      JSON.stringify({ ...stored, [lessonId]: exercises })
    );
  } catch (e) {
    console.error('Failed to save practice exercises:', e);
  }
}

export function clearStoredAiPracticeExercises(lessonId) {
  if (!lessonId) return;
  try {
    const stored = JSON.parse(localStorage.getItem(PRACTICE_STORAGE_KEY) || '{}');
    delete stored[lessonId];
    localStorage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify(stored));
  } catch (e) {
    console.error('Failed to clear stored practice exercises:', e);
  }
}

function sanitizeUnits(units) {
  return units.map((unit) => {
    if ('practiceExercises' in unit) {
      const { practiceExercises, ...rest } = unit;
      return rest;
    }
    return unit;
  });
}

/**
 * Loads the current units from localStorage or falls back to the default dataset.
 */
export function getStoredUnits() {
  try {
    // Clear legacy cache keys
    try {
      localStorage.removeItem('french_grammar_units_v1');
      localStorage.removeItem('french_grammar_units_v2');
    } catch {}

    const raw = localStorage.getItem(UNITS_STORAGE_KEY);
    if (!raw) {
      return GRAMMAR_ASPECT_LESSONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return sanitizeUnits(parsed);
    }
    return GRAMMAR_ASPECT_LESSONS;
  } catch (e) {
    console.warn('Failed to parse units from localStorage, using defaults:', e);
    return GRAMMAR_ASPECT_LESSONS;
  }
}

/**
 * Saves units to localStorage.
 */
export function saveStoredUnits(units) {
  try {
    localStorage.setItem(UNITS_STORAGE_KEY, JSON.stringify(units));
  } catch (e) {
    console.error('Failed to save units to localStorage:', e);
  }
}

/**
 * Resets the stored units to the original hardcoded curriculum.
 */
export function resetUnitsToDefault() {
  try {
    localStorage.removeItem(UNITS_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear stored units:', e);
  }
  return GRAMMAR_ASPECT_LESSONS;
}

/**
 * Exports all units as a JSON string.
 */
export function exportUnitsToJson(units) {
  return JSON.stringify(units, null, 2);
}

/**
 * Imports units from a JSON string.
 */
export function importUnitsFromJson(jsonString) {
  const parsed = JSON.parse(jsonString);
  if (!Array.isArray(parsed)) {
    throw new Error('Invalid JSON format: Expected an array of units.');
  }
  saveStoredUnits(parsed);
  return parsed;
}

/**
 * Generates formatted JavaScript code suitable for pasting into grammarAspectsData.js.
 */
export function exportUnitsToJavaScriptCode(units) {
  return `export const GRAMMAR_ASPECT_LESSONS = ${JSON.stringify(
    units,
    null,
    2
  )};\n`;
}

// Alias for backwards compatibility if referenced
export const exportUnitsToTypeScriptCode = exportUnitsToJavaScriptCode;
