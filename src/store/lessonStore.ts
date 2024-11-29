import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Story as ReadingStory } from '@/types/reading';
import { Story as LessonStory, HebrewLetter } from '@/types/lesson';
import { stories } from '@/data/reading-content';
import { hebrewAlphabet } from '@/data/alphabet';

interface LessonState {
  currentLetterIndex: number;
  completedLetters: string[];
  completedStories: string[];
  userProgress: {
    [key: string]: {
      completed: boolean;
      score: number;
      attempts: number;
    };
  };
  // Actions
  setCurrentLetter: (index: number) => void;
  markLetterComplete: (letter: string) => void;
  markStoryComplete: (storyId: string, score: number) => void;
  getCurrentLetter: () => HebrewLetter | null;
  getNextLetter: () => HebrewLetter | null;
  getStoryById: (id: string) => LessonStory | null;
  getAvailableStories: () => LessonStory[];
}

export const useLessonStore = create<LessonState>()(
  persist(
    (set, get) => ({
      currentLetterIndex: 0,
      completedLetters: [],
      completedStories: [],
      userProgress: {},

      setCurrentLetter: (index) => set({ currentLetterIndex: index }),
      
      markLetterComplete: (letter) => set((state) => ({
        completedLetters: [...state.completedLetters, letter]
      })),

      markStoryComplete: (storyId, score) => set((state) => ({
        completedStories: [...state.completedStories, storyId],
        userProgress: {
          ...state.userProgress,
          [storyId]: {
            completed: true,
            score,
            attempts: (state.userProgress[storyId]?.attempts || 0) + 1
          }
        }
      })),

      getCurrentLetter: () => {
        const { currentLetterIndex } = get();
        return hebrewAlphabet[currentLetterIndex] || null;
      },

      getNextLetter: () => {
        const { currentLetterIndex } = get();
        return hebrewAlphabet[currentLetterIndex + 1] || null;
      },

      getStoryById: (id) => {
        const story = stories.find((s: ReadingStory) => s.id === id) || null;
        if (story) {
          return {
            id: story.id,
            title: story.title,
            content: story.hebrew,
            translation: story.english,
            vocabulary: story.vocabulary.map(word => ({
              word,
              translation: word,
              transliteration: word
            })),
            questions: story.questions.map(q => ({
              id: q.id,
              type: 'multiple-choice',
              question: q.english,
              correctAnswer: q.correctAnswer,
              options: q.options.map(o => o.english)
            })),
            difficulty: story.difficulty || "beginner"
          } as LessonStory;
        }
        return null;
      },

      getAvailableStories: () => {
        return stories.map((story: ReadingStory) => ({
          id: story.id,
          title: story.title,
          content: story.hebrew,
          translation: story.english,
          vocabulary: story.vocabulary.map(word => ({
            word,
            translation: word,
            transliteration: word
          })),
          questions: story.questions.map(q => ({
            id: q.id,
            type: 'multiple-choice',
            question: q.english,
            correctAnswer: q.correctAnswer,
            options: q.options.map(o => o.english)
          })),
          difficulty: story.difficulty || "beginner"
        })) as LessonStory[];
      }
    }),
    {
      name: 'hebrew-lessons'
    }
  )
);