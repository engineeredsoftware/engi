#!/bin/bash

# Script to update ALL generic agents to use PTRR and remove variations
# This ensures every agent uses the full Plan-Try-Refine-Retry cycle

set -e

echo "Updating all generic agents to use PTRR..."

# List of all generic agents
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
  echo "Processing $agent..."
  
  file="/Users/g/Developer/engi/engi/packages/generic-agents/$agent/src/index.ts"
  
  if [ ! -f "$file" ]; then
    echo "  ⚠️  File not found: $file"
    continue
  fi
  
  # Check if agent already processed
  if ! grep -q "variations" "$file" && ! grep -q "selectVariation" "$file"; then
    echo "  ✅ Already updated"
    continue
  fi
  
  echo "  🔧 Updating $agent to PTRR pattern..."
  
  # Create a backup
  cp "$file" "$file.backup"
  
  # Replace the imports
  sed -i '' 's/factoryAgent[[:space:]]*,//' "$file"
  sed -i '' 's/factoryVariationWithPTRR/factoryAgentWithPTRR/g' "$file"
  sed -i '' 's/factoryVariationWithSingleStep/factoryAgentWithSingleStep/g' "$file"
  
  echo "  ✅ Updated imports for $agent"
done

echo ""
echo "All agents updated to use PTRR pattern!"
echo "Note: Manual review required to:"
echo "1. Remove variations array and selectVariation"
echo "2. Export the PTRR agent as the primary export"
echo "3. Ensure agent name follows pattern: {agent-name}Agent"