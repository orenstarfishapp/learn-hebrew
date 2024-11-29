import { Story } from '@/types/reading';

export const stories: Story[] = [
  {
    id: "story-1",
    title: "Cities of Israel",
    hebrew: "ערי ישראל",
    transliteration: "Arei Israel",
    english: "Cities of Israel",
    xpReward: 100,
    translation: "Cities of Israel",
    vocabulary: [],
    difficulty: "beginner",
    questions: [
      {
        id: "q1",
        hebrew: "מה היא בירת ישראל?",
        transliteration: "Ma hi birat Israel?",
        english: "What is the capital of Israel?",
        text: "What is the capital of Israel?",
        correctAnswer: "Jerusalem",
        options: [
          {
            hebrew: "ירושלים",
            transliteration: "Yerushalayim",
            english: "Jerusalem",
            isCorrect: true
          },
          {
            hebrew: "תל אביב",
            transliteration: "Tel Aviv",
            english: "Tel Aviv",
            isCorrect: false
          },
          {
            hebrew: "חיפה",
            transliteration: "Haifa",
            english: "Haifa",
            isCorrect: false
          },
          {
            hebrew: "אילת",
            transliteration: "Eilat",
            english: "Eilat",
            isCorrect: false
          }
        ]
      }
    ],
    bonusChallenge: false
  }
];

export const readingLevels = [
  {
    level: 1,
    name: 'Beginner Reader',
    xpRequired: 0,
    benefits: ['Access to beginner stories', 'Basic vocabulary tools']
  },
  {
    level: 2,
    name: 'Developing Reader',
    xpRequired: 100,
    benefits: ['Access to longer stories', 'Audio playback']
  },
  {
    level: 3,
    name: 'Intermediate Reader',
    xpRequired: 300,
    benefits: ['Access to intermediate stories', 'Speed reading challenges']
  },
  {
    level: 4,
    name: 'Advanced Reader',
    xpRequired: 600,
    benefits: ['Access to advanced stories', 'Special achievements']
  },
  {
    level: 5,
    name: 'Expert Reader',
    xpRequired: 1000,
    benefits: ['Access to all content', 'Bonus challenges', 'Community recognition']
  }
];

export const readingAchievements = [
  {
    id: 'first-story',
    name: 'First Steps',
    description: 'Complete your first story',
    xpReward: 50,
    icon: 'award'
  },
  {
    id: 'perfect-score',
    name: 'Perfect Reader',
    description: 'Get 100% on any story',
    xpReward: 100,
    icon: 'star'
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Complete a story in under 3 minutes with at least 80% accuracy',
    xpReward: 150,
    icon: 'zap'
  },
  {
    id: 'no-translation',
    name: 'Hebrew Master',
    description: 'Complete a story without using translation',
    xpReward: 200,
    icon: 'award'
  },
  {
    id: 'streak-7',
    name: 'Weekly Warrior',
    description: 'Read stories for 7 days in a row',
    xpReward: 300,
    icon: 'flame'
  }
];

export const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;

export type DifficultyLevel = typeof difficultyLevels[number];