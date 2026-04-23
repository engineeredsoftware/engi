#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
promptparts_dir="$repo_root/packages/prompts/src/raw_promptparts/specific"

echo "=== RETAINED ASSET-PACK PIPELINE PROMPT AUDIT ==="
echo ""

# List of active retained asset-pack pipeline agent PromptPart keys we expect.
# Compatibility filenames may still include deliverable*, but the setup
# comprehension owner is canonical comprehend-need.
agents=(
  # Setup Phase
  "comprehendneed"
  "determinedeliverabletype"
  "clonevcsrepository"
  "analyzecodebase"
  
  # Discovery Phase  
  "understandrequirements"
  "planimplementation"
  "assesscomplexity"
  "comprehendattachments"
  "analyzeparallel"
  "selectfilesparallel"
  
  # Implementation Phase
  "dividecodechange"
  "conquerfile"
  "correctcodechange"
  "reviewcodechange"
  "createdesigndocument"
  "reviewdesigndocument"
  
  # Validation Phase
  "validatecodechange"
  "validatecodereview"
  "validatedesigndocument"
  "validatedesigndocumentreview"
  "readytoshipcodechange"
  "readytoshipcodereview"
  "readytoshipdesigndocument"
  "readytoshipdesigndocumentreview"
  
  # Shipping Phase
  "createcodechange"
  "submitcodereview"
  "shipdesigndocument"
  "adddesigndocumentreview"
  "finalizeshipment"
)

prompt_types=(
  "system_identity"
  "system_role"
  "system_instructions"
  "plan_strategy"
  "plan_analysis"
  "try_directives"
  "refine_assessment"
  "refine_optimization"
  "retry_strategy"
  "retry_errorhandling"
)

echo "Agent Prompt Coverage Report:"
echo "=============================="
echo ""

for agent in "${agents[@]}"; do
  echo "### $agent"
  count=$(find "$promptparts_dir" -maxdepth 1 -type f -iname "*$agent*" | wc -l | tr -d ' ')
  
  if [ "$count" -gt 0 ]; then
    echo "  $count PromptParts found"
    
    # Check which specific prompts exist
    for prompt_type in "${prompt_types[@]}"; do
      exists=$(find "$promptparts_dir" -maxdepth 1 -type f -iname "*${agent}_${prompt_type}*" | head -1)
      if [ -n "$exists" ]; then
        echo "    ok $prompt_type: $(basename "$exists")"
      else
        echo "    missing $prompt_type"
      fi
    done
  else
    echo "  NO PromptParts found"
  fi
  echo ""
done

echo ""
echo "=== SUMMARY ==="
total_agents=${#agents[@]}
agents_with_prompts=$(
  for agent in "${agents[@]}"; do
    count=$(find "$promptparts_dir" -maxdepth 1 -type f -iname "*$agent*" | wc -l | tr -d ' ')
    if [ "$count" -gt 0 ]; then echo "1"; fi
  done | wc -l | tr -d ' '
)

echo "Total agents: $total_agents"
echo "Agents with prompts: $agents_with_prompts"
echo "Agents missing prompts: $((total_agents - agents_with_prompts))"
