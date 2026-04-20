#!/bin/bash

echo "Fixing multiline import patterns in deliverable pipeline..."

# Fix the specific pattern where imports are split across lines
for file in $(find packages/pipelines/deliverable/src/agents/prompts -name "*.ts"); do
  if [ -f "$file" ]; then
    # Remove lines 9-10 pattern (lowercase duplicates)
    sed -i '' '/^import { $/d' "$file"
    sed -i '' "/^  promptpart_.*';$/d" "$file"
    
    # Fix line 6 pattern - remove closing } from '@bitcode/prompts';
    sed -i '' "s/^  \(PROMPTPART_.*\) } from '@bitcode\/prompts';$/  \1 } from '@bitcode\/prompts\/src\/raw_promptparts\/specific\/\L\1\E';/" "$file"
    
    # Actually, let's just fix it more directly
    # Remove the incomplete multiline imports
    awk '
      /^import { $/ { getline; next }
      /^  PROMPTPART_.*} from/ { 
        # Extract the part name and fix the import
        match($0, /PROMPTPART_[A-Z_]+/)
        if (RSTART > 0) {
          part = substr($0, RSTART, RLENGTH)
          lower_part = tolower(part)
          print "import { " part " } from '\''@bitcode/prompts/src/raw_promptparts/specific/" lower_part "'\'';";
        }
        next
      }
      { print }
    ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
  fi
done

# Also fix setup and discovery agent prompt files
for dir in setup discovery; do
  for file in $(find packages/pipelines/deliverable/src/agents/$dir -name "*.ts"); do
    if [ -f "$file" ]; then
      awk '
        /^import { $/ { getline; next }
        /^  PROMPTPART_.*} from/ { 
          match($0, /PROMPTPART_[A-Z_]+/)
          if (RSTART > 0) {
            part = substr($0, RSTART, RLENGTH)
            lower_part = tolower(part)
            print "import { " part " } from '\''@bitcode/prompts/src/raw_promptparts/specific/" lower_part "'\'';";
          }
          next
        }
        { print }
      ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    fi
  done
done

echo "Verification..."
grep -c "^import { $" packages/pipelines/deliverable/src/agents/prompts/*.ts | grep -v ":0" | wc -l | xargs -I {} echo "Files with incomplete imports: {}"

echo "Done!"
