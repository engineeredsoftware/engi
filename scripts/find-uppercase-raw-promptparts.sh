#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
TARGET_DIRS=(
  "$ROOT_DIR/packages/prompts/src/raw_promptparts"
)

found=0
for dir in "${TARGET_DIRS[@]}"; do
  if [[ -d "$dir" ]]; then
    while IFS= read -r path; do
      rel="${path#$ROOT_DIR/}"
      if [[ "$rel" =~ [[:upper:]] ]]; then
        echo "⚠️  Uppercase in path: $rel"
        found=1
      fi
    done < <(find "$dir" -type f)
  fi
done

if [[ $found -eq 0 ]]; then
  echo "✅ All raw_promptparts filenames appear lowercase."
  exit 0
else
  cat <<EOT

To fix on macOS (case-insensitive FS), use two-step rename per file:

  git mv path/WithUpper.ts path/tmp.ts
  git mv path/tmp.ts path/withupper.ts

Or run the helper script below with the file path and target lowercase path:

  ./scripts/rename-to-lower.sh path/WithUpper.ts path/withupper.ts

EOT
  exit 1
fi
