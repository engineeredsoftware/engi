#!/bin/bash

# Fix barrel imports from @bitcode/prompts/raw_promptparts/generic

echo "Fixing barrel imports in prompts package..."

# Find all TypeScript files with barrel imports
FILES=$(grep -r "from '@bitcode/prompts'" --include="*.ts" --include="*.tsx" packages/ | cut -d: -f1 | sort -u)

for FILE in $FILES; do
  echo "Processing: $FILE"
  
  # Extract the imported names
  IMPORTS=$(grep "from '@bitcode/prompts'" "$FILE" | sed -E "s/.*\{([^}]+)\}.*/\1/" | tr ',' '\n' | sed 's/^ *//;s/ *$//')
  
  # Build replacement imports
  REPLACEMENT=""
  while IFS= read -r IMPORT; do
    if [ -n "$IMPORT" ]; then
      # Clean up the import name
      CLEAN_IMPORT=$(echo "$IMPORT" | xargs)
      
      # Convert to lowercase filename with underscores
      FILENAME=$(echo "$CLEAN_IMPORT" | sed 's/PROMPTPART_/promptpart_/g' | tr '[:upper:]' '[:lower:]')
      
      # Add the import line
      if [ -n "$REPLACEMENT" ]; then
        REPLACEMENT="$REPLACEMENT\n"
      fi
      REPLACEMENT="${REPLACEMENT}import { $CLEAN_IMPORT } from '@bitcode/prompts';"
    fi
  done <<< "$IMPORTS"
  
  # Replace the barrel import with individual imports
  if [ -n "$REPLACEMENT" ]; then
    # Use a temporary file for sed operations
    TEMP_FILE="${FILE}.tmp"
    
    # Remove the barrel import line and add individual imports
    awk -v replacement="$REPLACEMENT" '
      /from '\''@engi\/prompts\/raw_promptparts\/generic'\''/ {
        if (!replaced) {
          print replacement
          replaced = 1
        }
        next
      }
      {print}
    ' "$FILE" > "$TEMP_FILE"
    
    mv "$TEMP_FILE" "$FILE"
  fi
done

echo "Done fixing barrel imports!"