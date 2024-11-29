#!/bin/bash
sed -i "s/variant=\"default\"/variant=\"outline\"/g" src/components/game/WeeklyChallenges.tsx && sed -i "s/variant=\"ghost\"/variant=\"outline\"/g" $(find src -type f -name "*.tsx") && sed -i "/import { MessageCircle, Trophy } from/d" src/components/home/features.tsx
