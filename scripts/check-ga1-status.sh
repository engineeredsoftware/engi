#!/bin/bash

# Comprehensive GA-1 readiness check
echo "=== GA-1 READINESS STATUS CHECK ==="
echo "Date: $(date)"
echo ""

# 1. Import path check
echo "1. IMPORT PATHS CHECK:"
IMPORT_ERRORS=$(grep -r "@engi/prompts/src/raw" packages/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)
echo "   Files with incorrect import paths: $IMPORT_ERRORS"

# 2. EXECUTION naming check
echo ""
echo "2. EXECUTION -> DIRECTIVES CHECK:"
EXECUTION_FILES=$(find packages/prompts/src/raw -name "*_try_execution.ts" 2>/dev/null | wc -l)
DIRECTIVES_FILES=$(find packages/prompts/src/raw -name "*_try_directives.ts" 2>/dev/null | wc -l)
echo "   Files with _try_execution: $EXECUTION_FILES"
echo "   Files with _try_directives: $DIRECTIVES_FILES"

# 3. TypeScript compilation check for key packages
echo ""
echo "3. TYPESCRIPT COMPILATION:"
for pkg in "pipelines/deliverable" "agent-generics" "pipelines-generics" "prompts"; do
  if [ -d "packages/$pkg" ]; then
    ERROR_COUNT=$(cd "packages/$pkg" && npx tsc --noEmit 2>&1 | grep "error TS" | wc -l)
    echo "   $pkg: $ERROR_COUNT errors"
  fi
done

# 4. Missing PromptParts check
echo ""
echo "4. MISSING PROMPTPARTS:"
echo "   Checking for ReviewDesignDocument agent..."
if [ -f "packages/pipelines/deliverable/src/agents/implementation/review-design-document.ts" ]; then
  echo "   ✓ ReviewDesignDocument agent file exists"
  # Check if it has prompt parts
  grep -q "PROMPTPART_SPECIFIC_AGENT_.*REVIEWDESIGNDOCUMENT" packages/prompts/src/raw/specific/*.ts 2>/dev/null
  if [ $? -eq 0 ]; then
    echo "   ✓ ReviewDesignDocument PromptParts found"
  else
    echo "   ✗ ReviewDesignDocument PromptParts MISSING"
  fi
else
  echo "   ✗ ReviewDesignDocument agent file missing"
fi

# 5. Summary
echo ""
echo "=== SUMMARY ==="
if [ $IMPORT_ERRORS -eq 0 ] && [ $EXECUTION_FILES -eq 0 ] && [ $DIRECTIVES_FILES -gt 0 ]; then
  echo "✓ Import paths fixed"
  echo "✓ EXECUTION renamed to DIRECTIVES"
else
  echo "✗ Issues remain - see details above"
fi