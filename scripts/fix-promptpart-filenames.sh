#!/bin/bash

# Fix PromptPart filenames to be all lowercase while keeping export names uppercase
echo "=== Fixing PromptPart filename casing ==="
echo "Pattern: filenames should be all lowercase, exports should be uppercase"
echo ""

# Count files before
UPPERCASE_COUNT=$(find packages/prompts/src/raw -name "*[A-Z]*" -type f | wc -l)
echo "Files with uppercase in names: $UPPERCASE_COUNT"

if [ $UPPERCASE_COUNT -eq 0 ]; then
  echo "No files need renaming!"
  exit 0
fi

# Create a temporary file to store rename operations
RENAME_SCRIPT="/tmp/rename_operations.sh"
echo "#!/bin/bash" > $RENAME_SCRIPT

# Find all files and generate rename commands
find packages/prompts/src/raw -name "*[A-Z]*" -type f | while read file; do
  dir=$(dirname "$file")
  basename=$(basename "$file")
  lowercase_name=$(echo "$basename" | tr '[:upper:]' '[:lower:]')
  
  if [ "$basename" != "$lowercase_name" ]; then
    echo "mv \"$file\" \"$dir/$lowercase_name\"" >> $RENAME_SCRIPT
    echo "Queued: $basename -> $lowercase_name"
  fi
done

echo ""
echo "Executing renames..."
bash $RENAME_SCRIPT

# Now update all imports
echo ""
echo "Updating imports..."

# For each renamed file, update imports
find packages/ -type f \( -name "*.ts" -o -name "*.tsx" \) | while read file; do
  # Check if file has any uppercase imports from prompts/raw
  if grep -q "from '@bitcode/prompts/raw/[^']*[A-Z]" "$file" 2>/dev/null; then
    echo "Updating imports in: $file"
    # Use perl for more complex regex replacement
    perl -i -pe "s|(from\s+['\"]\@bitcode/prompts/raw/[^'\"]+)|
      my \$match = \$1;
      \$match =~ s|/raw/(.+)|'/raw/' . lc(\$1)|e;
      \$match
    |ge" "$file"
  fi
done

# Verify results
echo ""
echo "=== Verification ==="
REMAINING=$(find packages/prompts/src/raw -name "*[A-Z]*" -type f | wc -l)
echo "Files with uppercase remaining: $REMAINING"

if [ $REMAINING -eq 0 ]; then
  echo "✓ All filenames are now lowercase!"
else
  echo "✗ Some files still have uppercase - manual intervention needed"
fi

rm -f $RENAME_SCRIPT