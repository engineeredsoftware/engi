#!/usr/bin/env bash
set -euo pipefail

# Update retained legacy table references from deliverable_runs to
# deliverable_pipeline_runs. This is a compatibility maintenance helper for the
# Bitcode asset-pack pipeline corridor; it must never encode a local old-world
# checkout path.

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Updating deliverable_runs to deliverable_pipeline_runs under $repo_root..."

while IFS= read -r file; do
  echo "Updating: $file"
  perl -0pi -e 's/'\''deliverable_runs'\''/'\''deliverable_pipeline_runs'\''/g; s/"deliverable_runs"/"deliverable_pipeline_runs"/g; s/`deliverable_runs`/`deliverable_pipeline_runs`/g' "$file"
done < <(
  rg -l "deliverable_runs" "$repo_root" \
    --glob '*.ts' \
    --glob '*.tsx' \
    --glob '!_legacy/**' \
    --glob '!node_modules/**' || true
)

echo "Done. Updated matching active TypeScript references to use deliverable_pipeline_runs."
