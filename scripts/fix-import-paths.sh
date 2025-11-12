#!/bin/bash

# Fix import paths from @engi/prompts/src/raw to @engi/prompts/raw
# This is a surgical fix for GA-1 readiness

echo "Fixing import paths from @engi/prompts/src/raw to @engi/prompts/raw..."

# Count files before fix
FILES_TO_FIX=$(grep -r "@engi/prompts/src/raw" packages/ --include="*.ts" --include="*.tsx" -l 2>/dev/null | wc -l)
echo "Found $FILES_TO_FIX files with incorrect import paths"

# Fix all TypeScript files
find packages/ -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "@engi/prompts/src/raw" {} \; 2>/dev/null | while read file; do
  echo "Fixing: $file"
  # Use sed to replace the pattern
  sed -i '' 's|@engi/prompts/src/raw|@engi/prompts/raw|g' "$file"
done

# Count files after fix
FILES_REMAINING=$(grep -r "@engi/prompts/src/raw" packages/ --include="*.ts" --include="*.tsx" -l 2>/dev/null | wc -l)
echo "Files remaining with incorrect paths: $FILES_REMAINING"

echo "Import path fix complete!"