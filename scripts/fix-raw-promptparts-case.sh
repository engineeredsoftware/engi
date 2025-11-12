#!/usr/bin/env bash
set -euo pipefail

ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
cd "$ROOT"

TARGET_PREFIX="packages/prompts/src/raw_promptparts"

# Collect candidates with uppercase
candidates_file=$(mktemp)
git ls-files "$TARGET_PREFIX" | grep -E '[A-Z]' > "$candidates_file" || true

if [[ ! -s "$candidates_file" ]]; then
  echo "✅ No uppercase paths under $TARGET_PREFIX"
  exit 0
fi

count=$(wc -l < "$candidates_file" | tr -d ' \n')
echo "🔧 Forcing lowercase casing via two-step git mv for ${count} file(s)" 

while IFS= read -r src; do
  dst=$(echo "$src" | tr '[:upper:]' '[:lower:]')
  if [[ "$src" == "$dst" ]]; then
    continue
  fi
  tmp="${src}.casefix_tmp___"
  echo "-> $src  →  $dst"
  # First hop: within the same directory (ensures Git records change on macOS)
  git mv "$src" "$tmp"
  # Ensure lowercased parent dirs exist
  mkdir -p "$(dirname "$dst")"
  # Second hop: to final lowercase path
  git mv "$tmp" "$dst"
done < "$candidates_file"

rm -f "$candidates_file"

echo "✨ Lowercasing complete. Review diffs, then commit and push."
