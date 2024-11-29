import { Achievement } from '@/types/leaderboard';

export const achievements: Achievement[] = [
  {
    id: "first-story",
    title: "First Story",
    description: "Complete your first story",
    category: "milestone",
    xpReward: 100,
    icon: "star"
  },
  {
    id: "perfect-score",
    title: "Perfect Score",
    description: "Get 100% on a story",
    category: "score",
    xpReward: 200,
    icon: "trophy"
  }
]; 