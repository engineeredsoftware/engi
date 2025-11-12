#!/usr/bin/env bash
set -u

outdir="reports"
mkdir -p "$outdir"
outfile="$outdir/prompts-gaps.md"
echo "# Prompts & PromptParts – Gaps Report" > "$outfile"
echo >> "$outfile"
echo "Generated: $(date -u +"%Y-%m-%dT%H:%M:%SZ")" >> "$outfile"
echo >> "$outfile"

# Ensure counts CSV exists (from main report)
if [ ! -f "$outdir/prompts-by-prompt.csv" ]; then
  bash scripts/generate-prompts-report.sh >/dev/null 2>&1 || true
fi

csv="$outdir/prompts-by-prompt.csv"
[ -f "$csv" ] || { echo "Main report CSV missing; aborting" >> "$outfile"; exit 0; }

# Helper: check doc-comment presence in a file for given tag
has_doc_tag() { # $1=file $2=pattern
  rg -n --hidden -S "$2" "$1" -g '!**/node_modules/**' >/dev/null 2>&1
}

# Helper: extract PBV version validity (GA1.XX.0)
is_valid_pbv() { # $1=file; returns 0 if valid
  rg -n --hidden -P "current_version\s*:\s*\"GA1\.[0-9]{2}\.0\"" "$1" -g '!**/node_modules/**' >/dev/null 2>&1
}

# Helper: compute average benchmark score in a file (0 if none)
avg_benchmark() { # $1=file
  local scores avg
  scores=$(rg -n --hidden -oP "score\s*:\s*([0-9]+\.[0-9]+)" -r '$1' "$1" -g '!**/node_modules/**' || true)
  if [ -n "$scores" ]; then
    avg=$(echo "$scores" | awk '{sum+=$1; n++} END{if(n>0) printf "%.2f", sum/n; else print "0.00"}')
    echo "$avg"
  else
    echo "0.00"
  fi
}

echo "## 1) Missing Doc-Comments" >> "$outfile"
echo >> "$outfile"
echo "### Prompts (missing @doc-comment-developing-promptdevelopment)" >> "$outfile"
echo >> "$outfile"
awk -F, 'NR>1 {print $2 "," $1 "," $4}' "$csv" | sort -u | while IFS=, read -r file sym cat; do
  # Prompts doc-comment tag
  if ! has_doc_tag "$file" "@doc-comment-developing-promptdevelopment"; then
    echo "- \`$sym\` — \`$file\` (category: $cat)" >> "$outfile"
  fi
done

echo >> "$outfile"
echo "### PromptParts (missing @doc-comment-developing-promptpartdevelopment)" >> "$outfile"
echo >> "$outfile"
rg --files packages/prompts/src/raw_promptparts -g '!**/node_modules/**' | rg "\.ts$" | while read -r part; do
  if ! has_doc_tag "$part" "@doc-comment-developing-promptpartdevelopment"; then
    echo "- \`$part\`" >> "$outfile"
  fi
done

echo >> "$outfile"
echo "## 2) PBV Version Validity (current_version must be GA1.XX.0)" >> "$outfile"
echo >> "$outfile"
echo "### Prompts with invalid PBV" >> "$outfile"
echo >> "$outfile"
awk -F, 'NR>1 {print $2 "," $1 "," $4}' "$csv" | sort -u | while IFS=, read -r file sym cat; do
  if ! is_valid_pbv "$file"; then
    echo "- \`$sym\` — \`$file\` (category: $cat)" >> "$outfile"
  fi
done

echo >> "$outfile"
echo "### PromptParts with invalid PBV" >> "$outfile"
echo >> "$outfile"
rg --files packages/prompts/src/raw_promptparts -g '!**/node_modules/**' | rg "\.ts$" | while read -r part; do
  if ! is_valid_pbv "$part"; then
    echo "- \`$part\`" >> "$outfile"
  fi
done

echo >> "$outfile"
echo "## 3) Benchmark Scores (avg < 0.45 is a GA-1 gap)" >> "$outfile"
echo >> "$outfile"
echo "### Prompts with low benchmark averages" >> "$outfile"
echo >> "$outfile"
awk -F, 'NR>1 {print $2 "," $1 "," $4}' "$csv" | sort -u | while IFS=, read -r file sym cat; do
  avg=$(avg_benchmark "$file")
  lt=$(awk -v a="$avg" 'BEGIN{ if (a+0 < 0.45) print 1; else print 0 }')
  if [ "$lt" -eq 1 ]; then
    echo "- \`$sym\` — \`$file\` (avg: $avg)" >> "$outfile"
  fi
done

echo >> "$outfile"
echo "### PromptParts with low benchmark averages" >> "$outfile"
echo >> "$outfile"
rg --files packages/prompts/src/raw_promptparts -g '!**/node_modules/**' | rg "\.ts$" | while read -r part; do
  avg=$(avg_benchmark "$part")
  lt=$(awk -v a="$avg" 'BEGIN{ if (a+0 < 0.45) print 1; else print 0 }')
  if [ "$lt" -eq 1 ]; then
    echo "- \`$part\` (avg: $avg)" >> "$outfile"
  fi
done

echo >> "$outfile"
echo "## 4) Composition Gaps (should combine generic + specific parts)" >> "$outfile"
echo >> "$outfile"
echo "Categories: DocCodeTool, GenericAgent, Pipeline" >> "$outfile"
echo >> "$outfile"
awk -F, 'NR>1 {print $1 "," $2 "," $3 "," $4 "," $5 "," $6}' "$csv" | while IFS=, read -r prompt file cls cat g s; do
  # Only check these categories
  case "$cat" in
    DocCodeTool|GenericAgent|Pipeline) :;;
    *) continue;;
  esac
  # Composition requires both >0
  if [ "$g" -eq 0 ] || [ "$s" -eq 0 ]; then
    echo "- \`$prompt\` — \`$file\` (cat: $cat) — generic:$g specific:$s" >> "$outfile"
  fi
done

echo >> "$outfile"
echo "## 5) Inline PromptParts (extraction candidates)" >> "$outfile"
echo >> "$outfile"
awk -F, 'NR>1 {print $1 "," $2 "," $7}' "$csv" | while IFS=, read -r prompt file inline; do
  if [ "$inline" -gt 0 ]; then
    echo "- \`$prompt\` — \`$file\` (inline: $inline)" >> "$outfile"
  fi
done

echo >> "$outfile"
echo "## 6) Missing Agent Prompt Files (system/plan/try/refine/retry)" >> "$outfile"
echo >> "$outfile"
for d in packages/generic-agents/*/src/prompts; do
  [ -d "$d" ] || continue
  sys=$(rg -n --files "$d" | rg "/system-prompt-.*\.ts$" | wc -l | tr -d ' ')
  plan=$(rg -n --files "$d" | rg "/plan-prompt-.*\.ts$" | wc -l | tr -d ' ')
  tryc=$(rg -n --files "$d" | rg "/try-prompt-.*\.ts$" | wc -l | tr -d ' ')
  ref=$(rg -n --files "$d" | rg "/refine-prompt-.*\.ts$" | wc -l | tr -d ' ')
  ret=$(rg -n --files "$d" | rg "/retry-prompt-.*\.ts$" | wc -l | tr -d ' ')
  missing=()
  [ "$sys" -eq 0 ] && missing+=(system)
  [ "$plan" -eq 0 ] && missing+=(plan)
  [ "$tryc" -eq 0 ] && missing+=(try)
  [ "$ref" -eq 0 ] && missing+=(refine)
  [ "$ret" -eq 0 ] && missing+=(retry)
  if [ ${#missing[@]} -gt 0 ]; then
    echo "- \`$d\` — missing: ${missing[*]}" >> "$outfile"
  fi
done

echo >> "$outfile"
echo "Wrote $outfile" >&2
