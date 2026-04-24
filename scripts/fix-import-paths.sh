#!/bin/bash

# Fix import paths from @bitcode/prompts/src/raw to @bitcode/prompts/raw
# This is a surgical fix for V26 readiness

echo "Fixing import paths from @bitcode/prompts/src/raw to @bitcode/prompts/raw..."

# Count files before fix
FILES_TO_FIX=$(grep -r "@bitcode/prompts/src/raw" packages/ --include="*.ts" --include="*.tsx" -l 2>/dev/null | wc -l)
echo "Found $FILES_TO_FIX files with incorrect import paths"

# Fix all TypeScript files
find packages/ -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "@bitcode/prompts/src/raw" {} \; 2>/dev/null | while read file; do
  echo "Fixing: $file"
  # Use sed to replace the pattern
  sed -i '' 's|@bitcode/prompts/src/raw|@bitcode/prompts/raw|g' "$file"
done

# Count files after fix
FILES_REMAINING=$(grep -r "@bitcode/prompts/src/raw" packages/ --include="*.ts" --include="*.tsx" -l 2>/dev/null | wc -l)
echo "Files remaining with incorrect paths: $FILES_REMAINING"

echo "Import path fix complete!"