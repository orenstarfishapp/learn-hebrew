#!/bin/bash
echo "💫 Checking TypeScript with gentle attention..."
npm run build

if [ $? -eq 0 ]; then
    echo "✨ TypeScript is feeling harmonious now. Would you like to proceed with deployment?"
    read -p "Press Enter when you're ready to push to Heroku (or Ctrl+C to pause and reflect) " 
    git push heroku main
else
    echo "🌱 I notice we still have some areas that need nurturing. Let's look at them together with care."
fi
