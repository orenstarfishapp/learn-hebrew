export interface Answer {
  hebrew: string;
  transliteration: string;
  english: string;
  isCorrect: boolean;
}

export interface Story {
  id: string;
  title: string;
  hebrew: string;
  transliteration: string;
  english: string;
  xpReward: number;
  points?: number;
  level?: number | string;
  estimatedTime?: number | string;
  translation: string;
  vocabulary: string[];
  difficulty: string;
  bonusChallenge?: boolean;
  unlockRequirements?: {
    level?: number;
    minXP?: number;
    previousStories?: string[];
  };
  questions: {
    id: string;
    hebrew: string;
    transliteration: string;
    english: string;
    text: string;
    correctAnswer: string;
    options: Answer[];
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  name?: string;
  description: string;
  xpReward: number;
  dateEarned?: Date;
  icon?: string;
  category?: string;
}

export interface ReadingProgress {
  userId: string;
  storyId: string;
  completed: boolean;
  score: number;
  timeSpent: number;
  attemptsCount: number;
  lastAttemptDate: Date;
  bonusCompleted: boolean;
  mistakesMade: string[];
  readWithoutTranslation: boolean;
}

export interface UserReadingStats {
  totalStoriesRead: number;
  averageScore: number;
  totalXPEarned: number;
  readingStreak: number;
  lastReadDate: Date;
  favoriteCategories: string[];
  achievements: Achievement[];
  level: number;
  progress: {
    currentXP: number;
    nextLevelXP: number;
    percentage: number;
  };
}