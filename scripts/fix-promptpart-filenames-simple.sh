#!/bin/bash

# Fix PromptPart filenames to be all lowercase (simple version)
echo "=== Fixing PromptPart filename casing (Simple Version) ==="
echo ""

# Count files before
UPPERCASE_COUNT=$(find packages/prompts/src/raw -name "*[A-Z]*" -type f | wc -l)
echo "Files with uppercase in names: $UPPERCASE_COUNT"

if [ $UPPERCASE_COUNT -eq 0 ]; then
  echo "No files need renaming!"
  exit 0
fi

# Process each file one by one
RENAMED=0
FAILED=0

find packages/prompts/src/raw -name "*[A-Z]*" -type f | while read file; do
  dir=$(dirname "$file")
  basename=$(basename "$file")
  lowercase_name=$(echo "$basename" | tr '[:upper:]' '[:lower:]')
  
  if [ "$basename" != "$lowercase_name" ]; then
    if mv "$file" "$dir/$lowercase_name" 2>/dev/null; then
      echo "✓ Renamed: $basename -> $lowercase_name"
      ((RENAMED++))
    else
      echo "✗ Failed: $basename"
      ((FAILED++))
    fi
  fi
done

# Verify results
echo ""
echo "=== Final Status ==="
REMAINING=$(find packages/prompts/src/raw -name "*[A-Z]*" -type f | wc -l)
echo "Files with uppercase remaining: $REMAINING"

if [ $REMAINING -eq 0 ]; then
  echo "✓ All filenames are now lowercase!"
else
  echo "✗ $REMAINING files still have uppercase"
fi