#!/bin/bash

# Script to update GitHub repository with deployment fixes

echo "📋 Updating repository with GitHub Pages fixes..."

# Add all changes
git add .

# Commit changes
git commit -m "Fix GitHub Pages deployment structure and CNAME location"

# Push changes
git push origin main

echo "✅ Repository updated successfully!"
echo "📋 GitHub Actions will now rebuild your site"
echo "📋 Check https://github.com/KabirBediCareer/Kabir-Bedi/actions for build status"