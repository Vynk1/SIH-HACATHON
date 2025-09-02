
#!/bin/bash

echo "🔄 Fetching all branches from GitHub..."
git fetch --all

echo "✅ Checking out frontend-dev branch..."
git branch -D frontend-dev 2>/dev/null
git checkout -b frontend-dev origin/frontend-dev

echo "✅ Checking out BACKEND-DEV branch..."
git branch -D BACKEND-DEV 2>/dev/null
git checkout -b BACKEND-DEV origin/BACKEND-DEV

echo "⬅️ Switching back to main branch..."
git checkout main

echo ""
echo "🎉 Setup complete!"
echo "Available branches now:"
git branch
echo ""
echo "👉 Use 'git checkout frontend-dev' to work on frontend."
echo "👉 Use 'git checkout BACKEND-DEV' to work on backend."
