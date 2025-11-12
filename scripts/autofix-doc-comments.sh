#!/usr/bin/env bash
set -u

outdir="reports/patches"
mkdir -p "$outdir"
outfile="$outdir/doc-comments.suggestions.md"

echo "# Doc-Comment Suggestions (Prompts + PromptParts)" > "$outfile"
echo >> "$outfile"
echo "Generated: $(date -u +"%Y-%m-%dT%H:%M:%SZ")" >> "$outfile"
echo >> "$outfile"

prompt_csv="reports/prompts-by-prompt.csv"
if [ ! -f "$prompt_csv" ]; then
  bash scripts/generate-prompts-report.sh >/dev/null 2>&1 || true
fi

# Helper: check for tag in file
has_tag() { rg -n --hidden -S "$2" "$1" -g '!**/node_modules/**' >/dev/null 2>&1; }

echo "## Prompts Missing @doc-comment-developing-promptdevelopment" >> "$outfile"
echo >> "$outfile"
awk -F, 'NR>1 {print $2}' "$prompt_csv" | sort -u | while read -r f; do
  case "$f" in
    *.ts) :;;
    *) continue;;
  esac
  if ! has_tag "$f" "@doc-comment-developing-promptdevelopment"; then
    # Heuristics for domain
    domain="agent"; case "$f" in
      *generic-tools* ) domain="tool";;
      *pipelines/* ) domain="pipeline";;
    esac
    intent="Auto-generated placeholder for prompt doc-comment"
    echo "### $f" >> "$outfile"
    echo '```ts' >> "$outfile"
    cat <<EOF >> "$outfile"
/**
 * @doc-comment-developing-promptdevelopment
 * domain: $domain
 * intent: "$intent"
 * current_version: "GA1.00.0"
 * dependencies: { }
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.46 }
 * ]
 */
EOF
    echo '```' >> "$outfile"
    echo >> "$outfile"
  fi
done

echo >> "$outfile"
echo "## PromptParts Missing @doc-comment-developing-promptpartdevelopment" >> "$outfile"
echo >> "$outfile"
rg --files packages/prompts/src/raw_promptparts -g '!**/node_modules/**' | rg "\.ts$" | while read -r part; do
  if ! has_tag "$part" "@doc-comment-developing-promptpartdevelopment"; then
    # Domain heuristic based on path
    domain="system"
    case "$part" in
      */generic/*) case "$part" in
        *formatting* ) domain="formatting";;
        *agent* ) domain="agent";;
        *tool* ) domain="tool";;
        *ptrr* ) domain="agent";;
        * ) domain="system";;
      esac;;
      */specific/*) case "$part" in
        *agent* ) domain="agent";;
        *tool* ) domain="tool";;
        * ) domain="system";;
      esac;;
    esac
    intent="Auto-generated placeholder for PromptPart doc-comment"
    echo "### $part" >> "$outfile"
    echo '```ts' >> "$outfile"
    cat <<EOF >> "$outfile"
/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: $domain
 * intent: "$intent"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "semantic_clarity", "test": "Is it a precise semantic unit?", "score": 0.46 },
 *   { "name": "reusability", "test": "Reusable across contexts", "score": 0.46 }
 * ]
 */
EOF
    echo '```' >> "$outfile"
    echo >> "$outfile"
  fi
done

echo "Wrote $outfile" >&2

