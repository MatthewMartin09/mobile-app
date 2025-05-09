#!/bin/bash

# Ask for feature name
read -p "Enter branch name (e.g., feature/my-change): " branch

# Ask for commit message
read -p "Enter commit message: " commit_msg

# Checkout new branch
git checkout -b "$branch"

# Stage all changes
git add .

# Commit
git commit -m "$commit_msg"

# Push to remote
git push -u origin "$branch"

# Create pull request using GitHub CLI
read -p "Do you want to create a pull request now? (y/n): " pr_confirm
if [[ "$pr_confirm" == "y" || "$pr_confirm" == "Y" ]]; then
  read -p "PR Title: " pr_title
  read -p "PR Description: " pr_body
  gh pr create --base main --head "$branch" --title "$pr_title" --body "$pr_body"
fi

echo "Done!"
