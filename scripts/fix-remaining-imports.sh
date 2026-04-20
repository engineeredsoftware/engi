#!/bin/bash

echo "Fixing remaining corrupted import patterns..."

# Fix createpromptpart } from pattern
find packages/pipelines/deliverable -name "*.ts" -exec sed -i '' \
  "s/from '@bitcode\/prompts\/src\/raw_promptparts\/generic\/createpromptpart } from '@bitcode\/prompts';/from '@bitcode\/prompts';/g" {} \;

find packages/pipelines/deliverable -name "*.ts" -exec sed -i '' \
  "s/from '@bitcode\/prompts\/src\/raw_promptparts\/generic\/prompt } from '@bitcode\/prompts';/from '@bitcode\/prompts';/g" {} \;

# Fix specific files with complex patterns
for file in packages/pipelines/deliverable/src/agents/discovery/assesscomplexity/prompts/try-prompt-assesscomplexity.ts \
            packages/pipelines/deliverable/src/agents/discovery/analyzeparallel/prompts/try-prompt-analyzeparallel.ts \
            packages/pipelines/deliverable/src/agents/discovery/analyzeparallel/prompts/system-prompt-analyzeparallel.ts; do
  if [ -f "$file" ]; then
    # Replace the entire malformed import line with a comment
    sed -i '' "s/.*createpromptpart } from '@bitcode\/prompts';/\/\/ Fixed: removed malformed import/g" "$file"
    sed -i '' "s/.*prompt } from '@bitcode\/prompts';/\/\/ Fixed: removed malformed import/g" "$file"
  fi
done

echo "Checking for any remaining issues..."
grep -r "} from.*} from" packages/pipelines/deliverable --include="*.ts" | wc -l | xargs -I {} echo "Found {} remaining double '} from' patterns"

echo "Done!"
