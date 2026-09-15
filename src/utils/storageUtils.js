const STORAGE_KEY = 'french_learning_progress_v1';

const INITIAL_PROGRESS = {
  xp: 140,
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: ['a1-unit1-l1'],
  masteredCards: ['v1', 'v2', 'v4'],
  level: 'A1',
  dailyGoalXp: 50,
  todayXp: 20,
  badges: [
    {
      id: 'first_step',
      name: 'Premier Pas',
      icon: '🌱',
      description: 'Completed your very first French lesson',
      unlockedAt: '2026-08-14'
    },
    {
      id: 'bonjour_paris',
      name: 'Bonjour Paris !',
      icon: '🥐',
      description: 'Mastered French Greetings and Café ordering',
      unlockedAt: '2026-08-15'
    },
    {
      id: 'streak_3',
      name: 'Flambeau 3 Jours',
      icon: '🔥',
      description: 'Maintained a 3-day French learning streak',
      unlockedAt: '2026-08-16'
    }
  ]
};

export function loadUserProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw);
    
    // Check and update streak logic
    const today = new Date().toISOString().split('T')[0];
    if (parsed.lastActiveDate !== today) {
      const lastDate = new Date(parsed.lastActiveDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // consecutive day
        parsed.streakDays += 1;
      } else if (diffDays > 1) {
        // missed days
        parsed.streakDays = 1;
      }
      parsed.todayXp = 0;
      parsed.lastActiveDate = today;
    }

    return { ...INITIAL_PROGRESS, ...parsed };
  } catch (e) {
    return INITIAL_PROGRESS;
  }
}

export function saveUserProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

export function addXp(amount) {
  const current = loadUserProgress();
  const newXp = current.xp + amount;
  const newTodayXp = current.todayXp + amount;
  
  // Calculate level based on XP
  let calculatedLevel = 'A1';
  if (newXp >= 1500) calculatedLevel = 'B2';
  else if (newXp >= 800) calculatedLevel = 'B1';
  else if (newXp >= 300) calculatedLevel = 'A2';
  else calculatedLevel = 'A1';

  const updated = {
    ...current,
    xp: newXp,
    todayXp: newTodayXp,
    level: calculatedLevel,
    lastActiveDate: new Date().toISOString().split('T')[0],
  };

  saveUserProgress(updated);
  return updated;
}

export function markLessonCompleted(lessonId, xpEarned) {
  const current = loadUserProgress();
  const completed = new Set(current.completedLessons);
  const isFirstTime = !completed.has(lessonId);
  completed.add(lessonId);

  const updated = {
    ...current,
    completedLessons: Array.from(completed),
    xp: current.xp + (isFirstTime ? xpEarned : Math.floor(xpEarned / 2)),
    todayXp: current.todayXp + (isFirstTime ? xpEarned : Math.floor(xpEarned / 2)),
    lastActiveDate: new Date().toISOString().split('T')[0]
  };

  saveUserProgress(updated);
  return updated;
}

export function toggleCardMastery(cardId) {
  const current = loadUserProgress();
  const mastered = new Set(current.masteredCards);
  if (mastered.has(cardId)) {
    mastered.delete(cardId);
  } else {
    mastered.add(cardId);
  }

  const updated = {
    ...current,
    masteredCards: Array.from(mastered)
  };

  saveUserProgress(updated);
  return updated;
}
