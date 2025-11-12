#!/bin/bash

echo "=== DELIVERABLES PIPELINE PROMPT AUDIT ==="
echo ""

# List of all agents we expect
agents=(
  # Setup Phase
  "comprehendtask"
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
  "try_execution"  # THIS IS THE PROBLEM NAME!
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
  count=$(ls ../../prompts/src/raw/specific/ 2>/dev/null | grep -i "$agent" | wc -l | tr -d ' ')
  
  if [ "$count" -gt 0 ]; then
    echo "  ✅ $count PromptParts found"
    
    # Check which specific prompts exist
    for prompt_type in "${prompt_types[@]}"; do
      exists=$(ls ../../prompts/src/raw/specific/ 2>/dev/null | grep -i "${agent}_${prompt_type}" | head -1)
      if [ -n "$exists" ]; then
        echo "    ✓ $prompt_type: $exists"
      else
        echo "    ✗ $prompt_type: MISSING"
      fi
    done
  else
    echo "  ❌ NO PromptParts found"
  fi
  echo ""
done

echo ""
echo "=== SUMMARY ==="
total_agents=${#agents[@]}
agents_with_prompts=$(
  for agent in "${agents[@]}"; do
    count=$(ls ../../prompts/src/raw/specific/ 2>/dev/null | grep -i "$agent" | wc -l | tr -d ' ')
    if [ "$count" -gt 0 ]; then echo "1"; fi
  done | wc -l | tr -d ' '
)

echo "Total agents: $total_agents"
echo "Agents with prompts: $agents_with_prompts"
echo "Agents missing prompts: $((total_agents - agents_with_prompts))"