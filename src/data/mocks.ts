import { HebrewLetter } from '@/types/lesson';
import { LeaderboardEntry, WeeklyChallenge } from '@/types/leaderboard';

export const hebrewAlphabet: HebrewLetter[] = [
  {
    id: "alef",
    letter: "א",
    name: "Alef",
    pronunciation: "Silent or /a/",
    examples: [
      { word: "אבא", translation: "father", transliteration: "abba" },
      { word: "אמא", translation: "mother", transliteration: "ima" }
    ]
  },
  // Add more letters
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { 
    userId: "user1",
    name: "User 1", 
    score: 1000,
    streak: 5,
    level: 1,
    weeklyXP: 500,
    totalXP: 1000,
    achievements: []
  }
];

export const mockWeeklyChallenges: WeeklyChallenge[] = [
  {
    id: "1",
    title: "Daily Practice",
    description: "Complete 3 lessons",
    xpReward: 100,
    endDate: new Date(),
    type: "reading",
    requirement: {
      count: 3,
      criteria: "lessons"
    },
    completed: false
  }
];
