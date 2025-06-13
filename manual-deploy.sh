#!/bin/bash

set -e  # Exit immediately if a command fails

echo "🔨 Building the project..."
npm run build

echo "🚀 Switching to gh-pages branch..."
git checkout gh-pages

echo "🧹 Removing tracked files..."
git ls-files -z | xargs -0 git rm --cached

echo "📦 Copying build content..."
cp -r build/. ./

echo "➕ Staging changes..."
git add .

echo "✅ Committing..."
git commit -m "Manual deploy"

echo "📡 Pushing to origin gh-pages..."
git push origin gh-pages --force

echo "🔙 Switching back to main..."
git checkout main

echo "✅ Deploy complete!"
