#!/bin/bash

# Script to update all agents to remove variations
# This script replaces factoryVariation* with factoryAgent* and removes variations pattern

agents=(
  "audio-processor"
  "code-searcher"
  "danger-wall"
  "digester"
  "document-processor"
  "figma-processor"
  "file-pick"
  "image-processor"
  "jira-processor"
  "language"
  "mcps-initializer"
  "ready-to-short-circuit"
  "tech-types-identifier"
  "text-searcher"
  "video-processor"
  "web-search"
)

for agent in "${agents[@]}"; do
  echo "Updating $agent..."
  
  file="/Users/g/Developer/engi/engi/packages/generic-agents/$agent/src/index.ts"
  
  if [ -f "$file" ]; then
    # Replace factoryVariationWithPTRR with factoryAgentWithPTRR
    sed -i '' 's/factoryVariationWithPTRR/factoryAgentWithPTRR/g' "$file"
    
    # Replace factoryVariationWithSingleStep with factoryAgentWithSingleStep
    sed -i '' 's/factoryVariationWithSingleStep/factoryAgentWithSingleStep/g' "$file"
    
    # Remove factoryAgent import if it exists along with variations
    sed -i '' '/factoryAgent.*,/d' "$file"
    
    echo "  - Updated factory imports for $agent"
  else
    echo "  - File not found: $file"
  fi
done

echo "Done updating agents!"