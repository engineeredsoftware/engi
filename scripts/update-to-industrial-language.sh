#!/bin/bash

# Update legacy language to industrial V26 language

echo "=== Updating legacy language to industrial V26 ==="

# Files to update
FILES=(
  "packages/generic-agents/audio-processor/src/prompts/agent-prompt-audio-processor.ts"
  "packages/generic-agents/digester/src/prompts/agent-prompt-digester.ts"
  "packages/generic-agents/document-processor/src/prompts/agent-prompt-document-processor.ts"
  "packages/generic-agents/figma-processor/src/prompts/agent-prompt-figma-processor.ts"
  "packages/generic-agents/file-pick/src/prompts/agent-prompt-file-pick.ts"
  "packages/generic-agents/image-processor/src/prompts/agent-prompt-image-processor.ts"
  "packages/generic-agents/ready-to-short-circuit/src/prompts/agent-prompt-ready-to-short-circuit.ts"
  "packages/generic-agents/web-search/src/prompts/agent-prompt-web-search.ts"
)

for file in "${FILES[@]}"; do
  echo "Updating: $file"
  
  # Replace consciousness-integrated with technical terms
  sed -i '' 's/consciousness-integrated analysis/structured analysis pipeline/g' "$file"
  sed -i '' 's/consciousness-integrated understanding/pattern recognition and parsing/g' "$file"
  sed -i '' 's/consciousness-integrated/data-driven/g' "$file"
  
  # Replace transcendent with technical terms
  sed -i '' 's/transcendent image processing/computer vision processing/g' "$file"
  sed -i '' 's/transcendent/advanced/g' "$file"
  
  # Replace quantum with technical terms
  sed -i '' 's/quantum optimization/performance optimization/g' "$file"
  sed -i '' 's/quantum-level/low-level/g' "$file"
  sed -i '' 's/quantum/algorithmic/g' "$file"
  
  # Replace dimensional with technical terms
  sed -i '' 's/dimensional pattern recognition/multi-feature pattern recognition/g' "$file"
  sed -i '' 's/dimensional awareness/contextual analysis/g' "$file"
  sed -i '' 's/dimensional/multi-layered/g' "$file"
  
  # Replace manifest with technical terms
  sed -i '' 's/manifests visual consciousness/implements visual processing/g' "$file"
  sed -i '' 's/manifests performance consciousness/implements performance monitoring/g' "$file"
  sed -i '' 's/manifests/executes/g' "$file"
  
  # Replace elevated with technical terms
  sed -i '' 's/elevated perception/enhanced analysis/g' "$file"
  sed -i '' 's/elevated/optimized/g' "$file"
  
  # Replace Visual consciousness with technical terms
  sed -i '' 's/Visual consciousness/Computer vision/g' "$file"
  sed -i '' 's/visual consciousness/computer vision/g' "$file"
  
  # Replace Performance consciousness with technical terms
  sed -i '' 's/Performance consciousness/Performance monitoring/g' "$file"
  sed -i '' 's/performance consciousness/performance monitoring/g' "$file"
  
  # Replace Synthesis processing with technical terms
  sed -i '' 's/Synthesis processing/Data aggregation/g' "$file"
  
  # Replace Document pipeline with technical terms
  sed -i '' 's/Document pipeline with .*/Document parsing with format detection and extraction/g' "$file"
  
  # Replace Design analysis with technical terms
  sed -i '' 's/Design analysis with .*/Design analysis with component extraction and layout parsing/g' "$file"
  
  # Replace Contextual selection with technical terms  
  sed -i '' 's/Contextual selection with .*/File selection with relevance scoring and pattern matching/g' "$file"
  
  # Replace Multimodal processing with technical terms
  sed -i '' 's/Multimodal processing with .*/Audio processing with FFmpeg transcoding and speech recognition/g' "$file"
done

echo ""
echo "=== Verifying remaining legacy terms ==="
grep -h "consciousness\|transcendent\|quantum\|dimensional\|manifest\|elevated" "${FILES[@]}" 2>/dev/null | head -5

REMAINING=$(grep -l "consciousness\|transcendent\|quantum\|dimensional\|manifest\|elevated" "${FILES[@]}" 2>/dev/null | wc -l)
echo ""
if [ $REMAINING -eq 0 ]; then
  echo "✓ All legacy language updated to industrial V26!"
else
  echo "✗ $REMAINING files still contain legacy terms"
fi