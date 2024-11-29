import { HebrewLetter } from '@/types/lesson';

export const hebrewAlphabet: HebrewLetter[] = [
  {
    id: "alef",
    letter: "א",
    name: "Alef",
    pronunciation: "Silent or /a/",
    examples: [
      { word: "אבא", translation: "father" },
      { word: "אמא", translation: "mother" }
    ]
  },
  // Add more letters
];

export const mockLeaderboard = [
  { id: "1", name: "User 1", score: 1000 },
  { id: "2", name: "User 2", score: 900 }
];

export const mockWeeklyChallenges = [
  {
    id: "1",
    title: "Daily Practice",
    description: "Complete 3 lessons",
    reward: 100,
    completed: false
  }
];
