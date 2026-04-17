#!/bin/bash

# Update all imports from /raw/ to /raw_promptparts/
echo "=== Updating imports from /raw/ to /raw_promptparts/ ==="
echo ""

# 1. Update package imports @bitcode/prompts/raw/
echo "Updating package imports (@bitcode/prompts/raw/ -> @bitcode/prompts/raw_promptparts/)..."
find packages/ -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|@bitcode/prompts/raw/|@bitcode/prompts/raw_promptparts/|g' {} \;

# 2. Update relative imports from ../raw/ or ../../raw/
echo "Updating relative imports (../raw/ -> ../raw_promptparts/)..."
find packages/ -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|/raw/|/raw_promptparts/|g' {} \;

# 3. Count how many files were updated
UPDATED_COUNT=$(git diff --name-only | wc -l)
echo ""
echo "Updated $UPDATED_COUNT files"

# 4. Show sample of changes
echo ""
echo "Sample of changes:"
git diff --name-only | head -10

echo ""
echo "Import updates complete!"