#!/usr/bin/env bash
set -euo pipefail

# Regenerate exports for all PromptParts under generic/ (excluding index.ts)
# Non-destructive: only rewrites index.ts in the target folder.

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
TARGET_DIR="$ROOT_DIR/packages/prompts/src/raw_promptparts/generic"
INDEX_FILE="$TARGET_DIR/index.ts"

if [[ ! -d "$TARGET_DIR" ]]; then
  echo "Target directory not found: $TARGET_DIR" >&2
  exit 1
fi

TMP_FILE=$(mktemp)

{
  # Enumerate all .ts files except index.ts, sorted
  (cd "$TARGET_DIR" && ls -1 *.ts | grep -v '^index.ts$' | sort) \
    | sed -E 's/^(.*)\.ts$/export * from ".\/\1";/'
} > "$TMP_FILE"

mv "$TMP_FILE" "$INDEX_FILE"
echo "Regenerated: $INDEX_FILE"

