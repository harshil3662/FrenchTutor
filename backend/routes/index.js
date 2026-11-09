import { Router } from 'express';
import healthRoutes from './health.js';
import chatRoutes from './chat.js';
import grammarCheckRoutes from './grammarCheck.js';
import pronunciationFeedbackRoutes from './pronunciationFeedback.js';
import storyRoutes from './story.js';
import readingOpinionRoutes from './readingOpinion.js';
import dailyVocabularyRoutes from './dailyVocabulary.js';
import quizRoutes from './quiz.js';
import translateRoutes from './translate.js';
import grammarTransformRoutes from './grammarTransform.js';
import dissectSentenceRoutes from './dissectSentence.js';
import grammarLessonRoutes from './grammarLesson.js';

const router = Router();

router.use(healthRoutes);
router.use(chatRoutes);
router.use(grammarCheckRoutes);
router.use(pronunciationFeedbackRoutes);
router.use(storyRoutes);
router.use(readingOpinionRoutes);
router.use(dailyVocabularyRoutes);
router.use(quizRoutes);
router.use(translateRoutes);
router.use(grammarTransformRoutes);
router.use(dissectSentenceRoutes);
router.use(grammarLessonRoutes);

export default router;
