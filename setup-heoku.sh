#!/bin/bash

# Create a supportive Procfile
echo "web: npm run start" > Procfile

# Update package.json with nurturing configurations
npm pkg set "engines.node"="18.x"
npm pkg set "engines.npm"="9.x"
npm pkg set "scripts.start"="node server/index.js"
npm pkg set "scripts.heroku-postbuild"="npm run build"

# Create a thoughtful .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
  echo "node_modules/
.env
.DS_Store
npm-debug.log
dist/
build/" > .gitignore
fi

# Initialize git if needed, with care
if [ ! -d .git ]; then
    git init
fi

# Create a simple but important .env file template
echo "PORT=3000
DATABASE_URL=your_database_url_here
JWT_SECRET=your_jwt_secret_here" > .env.example

# Lovingly prepare for deployment
git add .
git commit -m "Prepare for Heroku deployment with care and intention"

# Guide through Heroku CLI steps
echo "
With great care, please run these final steps:

1. heroku login
2. heroku create your-app-name
3. git push heroku main
4. heroku open

Remember, you're doing great! 💫
"
