#!/bin/bash

# 1. Update Story type implementation
cat > src/types/interfaces.ts << 'TYPES'
export interface Story {
  id?: string;
  title: string;
  content: string;
  translation?: string;
  vocabulary?: string[];
  difficulty?: string;
  level?: string;
  estimatedTime?: number;
  points?: number;
  bonusChallenge?: boolean;
  category?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
}

export type Answer = {
  text: string;
  correct: boolean;
};

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
TYPES

# 2. Add mock data
cat > src/data/mocks.ts << 'MOCKS'
export const mockLeaderboard = [
  { id: 1, name: "User 1", points: 100 }
];

export const mockWeeklyChallenges = [
  { id: 1, title: "Challenge", description: "First challenge" }
];

export const achievements = [
  { id: "1", title: "Achievement", description: "First achievement", category: "basic" }
];
MOCKS

# 3. Clean up imports and fix type issues
find src -type f -name "*.tsx" -exec sed -i '/import.*{.*MessageCircle.*Trophy.*Award.*Book.*Globe.*Volume2.*TrendingUp.*Star.*/d' {} +

