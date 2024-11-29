import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Story, ReadingProgress, UserReadingStats, Achievement, Answer } from '@/types/reading';
import { stories, readingLevels, readingAchievements } from '@/data/stories';

interface ReadingState {
  progress: ReadingProgress[];
  stats: UserReadingStats;
  currentStory: Story | null;
  // Actions
  startStory: (storyId: string) => void;
  submitAnswer: (questionId: string, answer: string) => void;
  completeStory: (storyId: string, data: {
    score: number;
    timeSpent: number;
    withoutTranslation: boolean;
    mistakes: string[]
  }) => void;
  checkAchievements: () => void;
  getUserLevel: () => number;
  getAvailableStories: () => Story[];
}

type ReadingStoreWithPersist = ReadingState & {
  _hasHydrated: boolean;
};

export const useReadingStore = create<ReadingStoreWithPersist>()(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      progress: [],
      stats: {
        totalStoriesRead: 0,
        averageScore: 0,
        totalXPEarned: 0,
        readingStreak: 0,
        lastReadDate: new Date(),
        favoriteCategories: [],
        achievements: [],
        level: 1,
        progress: {
          currentXP: 0,
          nextLevelXP: 100,
          percentage: 0
        }
      },
      currentStory: null,

      startStory: (storyId) => {
        const story = stories.find(s => s.id === storyId);
        if (story) {
          set({ currentStory: story });
        }
      },

      submitAnswer: (questionId, answer) => {
        const { currentStory } = get();
        if (!currentStory) return;

        const question = currentStory.questions.find(q => q.id === questionId);
        if (!question) return;

        const selectedAnswer = question.options.find(
          (opt: Answer) => opt.english === answer
        );
        
        if (selectedAnswer?.isCorrect) {
          set(() => ({
            // Update state for correct answer
            stats: {
              ...get().stats,
              // Add your correct answer logic here
            }
          }));
        } else {
          set(() => ({
            // Update state for incorrect answer
            stats: {
              ...get().stats,
              // Add your incorrect answer logic here
            }
          }));
        }
      },

      checkAchievements: () => {
        const { stats, progress } = get();
        const newAchievements: Achievement[] = [];

        if (progress.length === 1) {
          const firstStory = readingAchievements.find(a => a.id === 'first-story');
          if (firstStory) {
            newAchievements.push({
              id: firstStory.id,
              title: firstStory.name || '',
              description: firstStory.description,
              xpReward: firstStory.xpReward,
              dateEarned: new Date(),
              category: 'milestone'
            });
          }
        }

        if (progress.some(p => p.score === 100)) {
          const perfectScore = readingAchievements.find(a => a.id === 'perfect-score');
          if (perfectScore) {
            newAchievements.push({
              id: perfectScore.id,
              title: perfectScore.name || '',
              description: perfectScore.description,
              xpReward: perfectScore.xpReward,
              dateEarned: new Date(),
              category: 'score'
            });
          }
        }

        if (newAchievements.length > 0) {
          set({
            stats: {
              ...stats,
              achievements: [...stats.achievements, ...newAchievements],
              totalXPEarned: stats.totalXPEarned + newAchievements.reduce((sum, a) => sum + a.xpReward, 0)
            }
          });
        }
      },

      completeStory: (storyId, data) => {
        const { progress, stats } = get();
        const story = stories.find(s => s.id === storyId);
        if (!story) return;

        // Update progress
        const newProgress: ReadingProgress = {
          userId: 'current-user', // Replace with actual user ID
          storyId,
          completed: true,
          score: data.score,
          timeSpent: data.timeSpent,
          attemptsCount: 1,
          lastAttemptDate: new Date(),
          bonusCompleted: data.score === 100,
          mistakesMade: data.mistakes,
          readWithoutTranslation: data.withoutTranslation
        };

        // Calculate XP earned
        let xpEarned = story.xpReward;
        if (data.score === 100) xpEarned += 50;
        if (data.withoutTranslation) xpEarned += 100;

        // Update stats
        const newStats: UserReadingStats = {
          ...stats,
          totalStoriesRead: stats.totalStoriesRead + 1,
          totalXPEarned: stats.totalXPEarned + xpEarned,
          lastReadDate: new Date()
        };

        set({
          progress: [...progress, newProgress],
          stats: newStats
        });

        // Check for new achievements
        get().checkAchievements();
      },
      getUserLevel: () => {
        const { stats } = get();
        return readingLevels.findIndex(level => 
          stats.totalXPEarned < level.xpRequired
        );
      },
      getAvailableStories: () => {
        const { progress, stats } = get();
        const userLevel = get().getUserLevel();

        return stories.filter(story => {
          // Check level requirements
          if (story.unlockRequirements?.level && userLevel < story.unlockRequirements.level) {
            return false;
          }

          // Check XP requirements
          if (story.unlockRequirements?.minXP && stats.totalXPEarned < story.unlockRequirements.minXP) {
            return false;
          }

          // Check previous stories requirement
          if (story.unlockRequirements?.previousStories) {
            const completedRequired = story.unlockRequirements.previousStories.every(
              reqStory => progress.some(p => p.storyId === reqStory && p.completed)
            );
            if (!completedRequired) return false;
          }

          return true;
        });
      }
    }),
    {
      name: 'reading-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._hasHydrated = true;
        }
      },
    }
  )
);