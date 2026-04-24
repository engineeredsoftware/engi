#!/usr/bin/env bash

# Update retained asset-pack pipeline agents to use PTRR.

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
agents_dir="$repo_root/packages/pipelines/asset-pack/src/agents"

echo "Updating retained asset-pack pipeline agents to PTRR under $agents_dir..."

find "$agents_dir" -maxdepth 1 -type f -name "*.ts" | while IFS= read -r file; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    echo "Processing $filename..."
    
    # Replace imports
    perl -0pi -e 's/factoryAgent[[:space:]]*,//g; s/factoryVariationWithPTRR/factoryAgentWithPTRR/g; s/factoryVariationWithSingleStep/factoryAgentWithSingleStep/g' "$file"
    
    echo "  Updated imports in $filename"
  fi
done

echo ""
echo "All retained asset-pack pipeline agents updated."
echo "Note: Manual review required to remove variations arrays and selectVariation"
