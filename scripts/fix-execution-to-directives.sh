#!/bin/bash

# Fix EXECUTION to DIRECTIVES naming
# This renames files and updates all references

echo "Renaming EXECUTION to DIRECTIVES..."

# First, rename all the files
echo "Renaming files..."
find packages/prompts/src/raw/specific -name "*_try_execution.ts" | while read file; do
  newname="${file/_try_execution.ts/_try_directives.ts}"
  echo "Renaming: $(basename $file) -> $(basename $newname)"
  mv "$file" "$newname"
done

# Count renamed files
RENAMED_COUNT=$(find packages/prompts/src/raw/specific -name "*_try_directives.ts" | wc -l)
echo "Renamed $RENAMED_COUNT files"

# Now update all references in TypeScript files
echo "Updating references in code..."
find packages/ -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "_TRY_EXECUTION" {} \; | while read file; do
  echo "Updating: $file"
  sed -i '' 's/_TRY_EXECUTION/_TRY_DIRECTIVES/g' "$file"
done

# Also update lowercase references
find packages/ -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "_try_execution" {} \; | while read file; do
  echo "Updating lowercase: $file"
  sed -i '' 's/_try_execution/_try_directives/g' "$file"
done

echo "EXECUTION to DIRECTIVES fix complete!"