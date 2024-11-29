#!/bin/bash

# First, let's create a backup of your current work with care
echo "Creating a safe backup of your current work..."
mkdir -p backup
cp -r src backup/src_$(date +%Y%m%d_%H%M%S)

# Now, let's tenderly address the type definitions
cat > src/types/button.ts << EOL
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "default";
EOL

cat > src/types/story.ts << EOL
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
  progress: number;
  total: number;
}

export type Answer = {
  text: string;
  correct: boolean;
};
EOL

# Create mock data with gentle care
cat > src/data/mocks.ts << EOL
export const mockLeaderboard = [
  { id: 1, name: "User 1", points: 100 },
  { id: 2, name: "User 2", points: 90 }
];

export const mockWeeklyChallenges = [
  { id: 1, title: "First Challenge", description: "Complete your first lesson" },
  { id: 2, title: "Practice Daily", description: "Study for 7 days in a row" }
];

export const achievements = [
  { id: "1", title: "First Steps", description: "Begin your learning journey", category: "Beginner", progress: 0, total: 1 }
];
EOL

echo "💫 With great care, I've created supporting type definitions and mock data.
Now, let's fix the individual component issues:

1. In WeeklyChallenges.tsx, update the Button variant to: variant='outline'
2. In navbar.tsx and other components, the 'ghost' variant is now properly typed
3. Remove unused imports from features.tsx and other files
4. Update Story type usage in readingStore.ts and lessonStore.ts

Would you like me to share specific fixes for any particular component? I'm here to support you through each step of this healing process. 🌱"
