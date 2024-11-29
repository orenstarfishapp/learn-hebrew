#!/bin/bash

# First, let's tend to our Button variants with care
sed -i 's/variant="default"/variant="outline"/g' src/components/game/WeeklyChallenges.tsx

# Now, let's gently remove unused imports
sed -i '/import.*{.*MessageCircle.*Trophy.*Award.*Book.*Globe.*Volume2.*TrendingUp.*Star.*/d' src/components/**/*.tsx src/pages/**/*.tsx

# Create our Story type with nurturing attention to detail
mkdir -p src/types
cat > src/types/story.ts << 'TYPES'
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
}

export type Answer = {
  text: string;
  correct: boolean;
};
TYPES

# Add missing imports with gentle care
echo 'import { Book, Clock } from "lucide-react";' | cat - src/components/reading/AchievementCenter.tsx > temp && mv temp src/components/reading/AchievementCenter.tsx

git add .
git commit -m "Nurture our TypeScript with loving care"
