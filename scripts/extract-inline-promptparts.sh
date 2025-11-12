#!/usr/bin/env bash
set -u

outdir="reports/patches"
mkdir -p "$outdir"
outfile="$outdir/extract-inline.suggestions.md"

echo "# Extract Inline PromptParts – Suggestions" > "$outfile"
echo >> "$outfile"
echo "Generated: $(date -u +"%Y-%m-%dT%H:%M:%SZ")" >> "$outfile"
echo >> "$outfile"

# Search scope: agent prompts, pipeline prompts, tool prompts
find_paths=(
  "packages/generic-agents"
  "packages/pipelines/deliverable/src/agents/prompts"
  "packages/generic-tools"
)

for p in "${find_paths[@]}"; do
  rg -n --hidden -S "'[^']+'\s+as\s+PromptPart" "$p" -g '!**/node_modules/**' -g '!**/*.md' || true
done | sort -u > "$outdir/.inline_hits.txt"

if [ ! -s "$outdir/.inline_hits.txt" ]; then
  echo "No inline PromptPart casts found." >> "$outfile"
  echo "Wrote $outfile" >&2
  exit 0
fi

while IFS= read -r line; do
  file=$(echo "$line" | awk -F: '{print $1}')
  lno=$(echo "$line" | awk -F: '{print $2}')
  text=$(echo "$line" | sed -E "s/^[^:]*:[0-9]+:[[:space:]]*//")
  content=$(echo "$text" | sed -E "s/.*'([^']+)'.*/\1/")
  # Build a slug
  slug=$(echo "$content" | tr '[:upper:]' '[:lower:]' | tr -cs 'a-z0-9' '_' | sed 's/^_\+//; s/_\+$//; s/__/_/g' | cut -c1-50)
  [ -z "$slug" ] && slug="unit"
  const="PROMPTPART_SPECIFIC_GENERATED_$(echo "$slug" | tr '[:lower:]' '[:upper:]')"
  partfile="packages/prompts/src/raw_promptparts/specific/promptpart_specific_generated_${slug}.ts"
  echo "### $file:$lno" >> "$outfile"
  echo "- Text: '$content'" >> "$outfile"
  echo "- Suggested name: \`$const\`" >> "$outfile"
  echo "- Suggested file: \`$partfile\`" >> "$outfile"
  echo '```ts' >> "$outfile"
  cat <<EOF >> "$outfile"
import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Extracted inline PromptPart"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "semantic_clarity", "test": "Is it a precise semantic unit?", "score": 0.46 },
 *   { "name": "reusability", "test": "Reusable across contexts", "score": 0.46 }
 * ]
 */
export const $const: PromptPart = '$content' as PromptPart;
EOF
  echo '```' >> "$outfile"
  echo >> "$outfile"
done < "$outdir/.inline_hits.txt"

echo "Wrote $outfile" >&2

