#!/usr/bin/env bash
set -euo pipefail

missing=0

check_file() {
  local f="$1"
  if ! rg -n "generation:json_only_header" "$f" -S >/dev/null; then echo "[MISS] json_only_header → $f"; missing=$((missing+1)); fi
  if ! rg -n "generation:use_this_structure" "$f" -S >/dev/null; then echo "[MISS] use_this_structure → $f"; missing=$((missing+1)); fi
  if ! rg -n "generation:reason" "$f" -S >/dev/null; then echo "[MISS] reason → $f"; missing=$((missing+1)); fi
  if ! rg -n "generation:judge" "$f" -S >/dev/null; then echo "[MISS] judge → $f"; missing=$((missing+1)); fi
  if ! rg -n "generation:structured_output" "$f" -S >/dev/null; then echo "[MISS] structured_output → $f"; missing=$((missing+1)); fi
  if ! rg -n "failsafe:prepare_context" "$f" -S >/dev/null; then echo "[MISS] failsafe:prepare_context → $f"; missing=$((missing+1)); fi
}

echo "Checking Generic Agents step prompts…"
for f in $(rg --files -g 'packages/generic-agents/*/src/prompts/*-prompt-*.ts' | grep -E '/(system|plan|try|refine|retry)-prompt-'); do
  check_file "$f"
done

echo "Checking AssetPack prompt overlays..."
for f in packages/pipelines/asset-pack/src/agents/prompts/*.ts; do
  # Skip non-Prompt files if any
  [ -f "$f" ] || continue
  # Only check files that create new Prompt
  if rg -n "new\s+Prompt\(\)" "$f" >/dev/null; then
    check_file "$f"
  fi
done

if [ "$missing" -gt 0 ]; then
  echo "Scaffolding verification failed: $missing missing occurrences" >&2
  exit 1
else
  echo "Scaffolding verification passed."
fi
