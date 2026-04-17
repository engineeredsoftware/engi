#!/bin/bash

echo "Comprehensive fix for all malformed imports in deliverable pipeline..."

# Remove all lines with malformed lowercase promptpart imports ending with apostrophe
find packages/pipelines/deliverable -name "*.ts" -exec sed -i '' \
  "/import { promptpart_.*';/d" {} \;

# Fix Prompt imports from wrong paths
find packages/pipelines/deliverable -name "*.ts" -exec sed -i '' \
  "s|import { Prompt } from '@bitcode/prompts';|import { Prompt } from '@bitcode/prompts';|g" {} \;

find packages/pipelines/deliverable -name "*.ts" -exec sed -i '' \
  "s|import { Prompt } from '@bitcode/prompts';|import { Prompt } from '@bitcode/prompts';|g" {} \;

# Fix createPromptPart imports
find packages/pipelines/deliverable -name "*.ts" -exec sed -i '' \
  "s|import { createPromptPart } from '@bitcode/prompts';|import { createPromptPart } from '@bitcode/prompts';|g" {} \;

find packages/pipelines/deliverable -name "*.ts" -exec sed -i '' \
  "s|import { createPromptPart } from '@bitcode/prompts';|import { createPromptPart } from '@bitcode/prompts';|g" {} \;

# Clean up duplicate zod imports
find packages/pipelines/deliverable -name "*.ts" -exec awk '
  /^import .* from .zod.;/ { 
    if (!seen_zod) { 
      print; 
      seen_zod = 1 
    } 
  } 
  !/^import .* from .zod.;/ { print }
' {} > {}.tmp && mv {}.tmp {} \;

# Clean up duplicate getToolsForAgent imports
find packages/pipelines/deliverable -name "*.ts" -exec awk '
  /^import .* getToolsForAgent .* from .*tools.;/ { 
    if (!seen_tools) { 
      print; 
      seen_tools = 1 
    } 
  } 
  !/^import .* getToolsForAgent .* from .*tools.;/ { print }
' {} > {}.tmp && mv {}.tmp {} \;

echo "Verification..."
echo ""

# Check for remaining issues
echo "Checking for malformed imports..."
MALFORMED=$(grep -r "promptpart_.*';" packages/pipelines/deliverable --include="*.ts" | wc -l)
echo "Found $MALFORMED malformed promptpart imports"

WRONG_PROMPT=$(grep -r "import { Prompt } from '@bitcode/prompts' packages/pipelines/deliverable --include="*.ts" | wc -l)
echo "Found $WRONG_PROMPT wrong Prompt import paths"

WRONG_CREATE=$(grep -r "import { createPromptPart } from '@bitcode/prompts' packages/pipelines/deliverable --include="*.ts" | wc -l)
echo "Found $WRONG_CREATE wrong createPromptPart import paths"

echo ""
echo "Fix complete!"