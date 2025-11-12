#!/bin/bash

# Fix corrupted imports in deliverable pipeline files

echo "Fixing corrupted imports in deliverable pipeline..."

# Fix pattern 1: Malformed import lines ending with just apostrophe
find packages/pipelines/deliverable -name "*.ts" -exec sed -i '' \
  "s/import { agentprompt';/import { Prompt } from '@engi\/prompts';/g" {} \;

find packages/pipelines/deliverable -name "*.ts" -exec sed -i '' \
  "s/import { promptpart_specific_agent.*';/\/\/ Fixed: removed malformed import/g" {} \;

# Fix pattern 2: Double "} from" in imports
find packages/pipelines/deliverable -name "*.ts" -exec sed -i '' \
  "s/} from '@engi\/prompts\/src\/raw_promptparts\/specific\/.*} from '@engi.*';/} from '@engi\/prompts';/g" {} \;

# Fix pattern 3: Remove duplicate imports with lowercase names
find packages/pipelines/deliverable -name "*.ts" -exec sed -i '' \
  "/import { promptpart } from '@engi\/prompts';/d" {} \;

find packages/pipelines/deliverable -name "*.ts" -exec sed -i '' \
  "/import { gettoolsforagent } from/d" {} \;

# Fix pattern 4: Fix specific malformed patterns
find packages/pipelines/deliverable -name "*.ts" -exec sed -i '' \
  "s/import { AgentPrompt } from '@engi\/prompts\/src\/raw_promptparts\/specific\/factoryagentwithptrr } from '@engi\/agent-generics';/\/\/ Fixed: removed malformed AgentPrompt import/g" {} \;

find packages/pipelines/deliverable -name "*.ts" -exec sed -i '' \
  "s/import { PROMPTPART.*} from '@engi\/prompts\/src\/raw_promptparts\/specific\/agentstepprompt } from '@engi\/agent-generics';/\/\/ Fixed: removed malformed PROMPTPART import/g" {} \;

# Fix pattern 5: Fix Prompt imports from wrong paths
find packages/pipelines/deliverable -name "*.ts" -exec sed -i '' \
  "s/import { Prompt } from '@engi\/prompts\/src\/raw_promptparts\/specific\/prompt';/import { Prompt } from '@engi\/prompts';/g" {} \;

# Fix pattern 6: Fix createPromptPart imports  
find packages/pipelines/deliverable -name "*.ts" -exec sed -i '' \
  "s/} from '@engi\/prompts\/src\/raw_promptparts\/specific\/createpromptpart } from '@engi\/prompts';/} from '@engi\/prompts\/src\/raw_promptparts\/specific\/promptpart_specific_agent_comprehendtask_system_identity';/g" {} \;

echo "Import fixes applied. Running verification..."

# Check for remaining issues
echo ""
echo "Checking for remaining malformed imports..."
grep -r "agentprompt'" packages/pipelines/deliverable --include="*.ts" | head -5 || echo "✓ No 'agentprompt' issues found"
grep -r "} from.*} from" packages/pipelines/deliverable --include="*.ts" | head -5 || echo "✓ No double '} from' issues found"
grep -r "promptpart } from" packages/pipelines/deliverable --include="*.ts" | head -5 || echo "✓ No 'promptpart }' issues found"

echo ""
echo "Fix script completed!"