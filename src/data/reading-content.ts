import { Story } from '@/types/reading';

export const readingContent: Story[] = [
  {
    id: "basic-1",
    title: "Basic Greetings",
    hebrew: "שלום",
    transliteration: "Shalom",
    english: "Hello",
    xpReward: 100,
    translation: "Hello/Peace",
    vocabulary: [],
    difficulty: "beginner",
    questions: [
      {
        id: "q1",
        hebrew: "מה המשמעות של 'שלום'?",
        transliteration: "Ma hamashma'ut shel 'Shalom'?",
        english: "What is the meaning of 'Shalom'?",
        text: "What is the meaning of 'Shalom'?",
        correctAnswer: "Hello/Peace",
        options: [
          {
            hebrew: "שלום",
            transliteration: "Shalom",
            english: "Hello/Peace",
            isCorrect: true
          },
          {
            hebrew: "תודה",
            transliteration: "Toda",
            english: "Thank you",
            isCorrect: false
          },
          {
            hebrew: "בבקשה",
            transliteration: "Bevakasha",
            english: "Please",
            isCorrect: false
          }
        ]
      }
    ]
  },
  // ... other stories follow the same pattern
];

export const stories = readingContent;
export const readingLevels = Array.from(new Set(readingContent.map(story => story.difficulty)));