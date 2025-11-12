#!/bin/bash

# Update all deliverable pipeline agents to use PTRR

set -e

echo "Updating deliverable pipeline agents to PTRR..."

agents_dir="/Users/g/Developer/engi/engi/packages/pipelines/deliverable/src/agents"

for file in "$agents_dir"/*.ts; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    echo "Processing $filename..."
    
    # Replace imports
    sed -i '' 's/factoryAgent[[:space:]]*,//' "$file"
    sed -i '' 's/factoryVariationWithPTRR/factoryAgentWithPTRR/g' "$file"
    sed -i '' 's/factoryVariationWithSingleStep/factoryAgentWithSingleStep/g' "$file"
    
    echo "  ✅ Updated imports in $filename"
  fi
done

echo ""
echo "All deliverable pipeline agents updated!"
echo "Note: Manual review required to remove variations arrays and selectVariation"