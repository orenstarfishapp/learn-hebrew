#!/bin/bash

# Tenderly update WeeklyChallenges.tsx
echo "import { Button } from '@/components/ui/button'
import { type ButtonVariant } from '@/types/interfaces'" > src/components/game/WeeklyChallenges.tsx.tmp
cat src/components/game/WeeklyChallenges.tsx >> src/components/game/WeeklyChallenges.tsx.tmp
mv src/components/game/WeeklyChallenges.tsx.tmp src/components/game/WeeklyChallenges.tsx

# Update the button variant
sed -i 's/variant="default"/variant="outline"/g' src/components/game/WeeklyChallenges.tsx
