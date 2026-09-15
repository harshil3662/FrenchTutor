import { GRAMMAR_ASPECT_CATEGORIES } from './categories.js';
import { A1_GRAMMAR_LESSONS } from './a1Units.js';
import { A2_GRAMMAR_LESSONS } from './a2Units.js';
import { B1_GRAMMAR_LESSONS } from './b1Units.js';
import { B2_GRAMMAR_LESSONS } from './b2Units.js';

export {
  GRAMMAR_ASPECT_CATEGORIES,
  A1_GRAMMAR_LESSONS,
  A2_GRAMMAR_LESSONS,
  B1_GRAMMAR_LESSONS,
  B2_GRAMMAR_LESSONS,
};

export const GRAMMAR_ASPECT_LESSONS = [
  ...A1_GRAMMAR_LESSONS,
  ...A2_GRAMMAR_LESSONS,
  ...B1_GRAMMAR_LESSONS,
  ...B2_GRAMMAR_LESSONS,
].sort((a, b) => (a.unitNumber ?? 999) - (b.unitNumber ?? 999));
