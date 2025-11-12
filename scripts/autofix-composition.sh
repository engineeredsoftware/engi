#!/usr/bin/env bash
set -u

outdir="reports/patches"
mkdir -p "$outdir"
outfile="$outdir/composition.suggestions.md"
csv="reports/prompts-by-prompt.csv"

echo "# Composition Suggestions (Add Generic + Specific PromptParts)" > "$outfile"
echo >> "$outfile"
echo "Generated: $(date -u +"%Y-%m-%dT%H:%M:%SZ")" >> "$outfile"
echo >> "$outfile"

if [ ! -f "$csv" ]; then
  bash scripts/generate-prompts-report.sh >/dev/null 2>&1 || true
fi

echo "Prompts below should combine generic + specific PromptParts. Suggested generic imports provided." >> "$outfile"
echo >> "$outfile"

awk -F, 'NR>1 {print $1 "," $2 "," $3 "," $4 "," $5 "," $6}' "$csv" | while IFS=, read -r prompt file cls cat g s; do
  case "$cat" in
    GenericAgent|Pipeline) :;;
    *) continue;;
  esac
  # Require both generic and specific
  if [ "$g" -eq 0 ] || [ "$s" -eq 0 ]; then
    echo "### $file" >> "$outfile"
    echo "- Prompt: \`$prompt\` (category: $cat)" >> "$outfile"
    echo "- Current parts: generic=$g specific=$s" >> "$outfile"
    echo "- Suggested generic imports:" >> "$outfile"
    echo '```ts' >> "$outfile"
    cat <<'EOF' >> "$outfile"
import {
  PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT,
  PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER,
  PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_SINGLE_OBJECT,
  PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA,
  PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY,
  PROMPTPART_GENERIC_AGENT_GENERATION_REASON,
  PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE,
  PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT
} from '@engi/prompts';
EOF
    echo '```' >> "$outfile"
    echo "- Suggested usage (example keys):" >> "$outfile"
    echo '```ts' >> "$outfile"
    cat <<'EOF' >> "$outfile"
prompt
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:structure_hint', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT)
EOF
    echo '```' >> "$outfile"
    echo >> "$outfile"
  fi
done

echo "Wrote $outfile" >&2

