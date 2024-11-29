#!/bin/bash

find src -type f -name "*.ts" -name "*.tsx" -exec sed -i 's/String/string/g' {} +

echo 'import { Story, Answer, Achievement } from "@/types/interfaces";' | cat - src/store/gameStore.ts > temp && mv temp src/store/gameStore.ts

sed -i 's/type Story = {/import { Story } from "@/types\/interfaces";/g' src/store/readingStore.ts
