#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <sourcePath> <lowercaseTargetPath>" >&2
  exit 1
fi

src="$1"
dst="$2"

if [[ "$dst" != "${dst,,}" ]]; then
  echo "Target path must be all lowercase: $dst" >&2
  exit 1
fi

tmp="$dst.__tmp_casefix__"

echo "Renaming via two-step move to force case change tracking..."
set -x
git mv "$src" "$tmp"
git mv "$tmp" "$dst"
set +x
echo "Done. Stage + commit the change: git add -A && git commit -m 'fix: lowercase filename'"

