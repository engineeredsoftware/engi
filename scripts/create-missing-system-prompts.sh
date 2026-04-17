#!/bin/bash

# Create missing system prompts for generic agents

AGENTS=(
  "jira-processor:jiraprocessor"
  "language:language"
  "mcps-initializer:mcpsinitializer"
  "ready-to-short-circuit:readytoshortcircuit"
  "tech-types-identifier:techtypesidentifier"
  "text-searcher:textsearcher"
  "video-processor:videoprocessor"
  "web-researcher:webresearcher"
  "web-search:websearch"
)

for agent_pair in "${AGENTS[@]}"; do
  IFS=':' read -r agent_dir promptpart_name <<< "$agent_pair"
  
  echo "Creating system prompt for $agent_dir..."
  
  # Convert agent name for display
  display_name=$(echo "$agent_dir" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1')
  const_name=$(echo "$agent_dir" | tr '[:lower:]-' '[:upper:]_')
  
  cat > "/Users/g/Developer/engi/engi/packages/generic-agents/$agent_dir/src/prompts/system-prompt-$agent_dir.ts" << EOF
/**
 * $display_name Agent - System Prompt
 * 
 * System-level configuration for $agent_dir operations.
 * 
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "System prompt for $display_name agent"
 * current_version: "GA1.45.0"
 * versions: [
 *   { "version": "1.0.0", "score": 0.45, "reason": "Initial implementation with industrial language" }
 * ]
 * benchmarks: [
 *   { "name": "system_coherence", "test": "Does the system prompt provide coherent instructions?", "score": 0.45 },
 *   { "name": "completeness", "test": "Does it cover all requirements?", "score": 0.45 },
 *   { "name": "operational_clarity", "test": "Are operational boundaries and capabilities clearly defined?", "score": 0.45 }
 * ]
 */

import { Prompt } from '@bitcode/prompts';
import { PROMPTPART_SPECIFIC_AGENT_${const_name}_SYSTEM_IDENTITY } from '@bitcode/prompts';
import { PROMPTPART_SPECIFIC_AGENT_${const_name}_SYSTEM_ROLE } from '@bitcode/prompts';
import { PROMPTPART_SPECIFIC_AGENT_${const_name}_SYSTEM_INSTRUCTIONS } from '@bitcode/prompts';

export const ${const_name}_SYSTEM_PROMPT = new Prompt()
  .set('identity', PROMPTPART_SPECIFIC_AGENT_${const_name}_SYSTEM_IDENTITY)
  .set('role', PROMPTPART_SPECIFIC_AGENT_${const_name}_SYSTEM_ROLE)
  .set('instructions', PROMPTPART_SPECIFIC_AGENT_${const_name}_SYSTEM_INSTRUCTIONS);
EOF

  echo "Created system-prompt-$agent_dir.ts"
done

echo "All system prompts created!"