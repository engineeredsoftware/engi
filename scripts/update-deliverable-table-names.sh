#!/bin/bash

# Update all references from deliverable_runs to deliverable_pipeline_runs
# This aligns with our more descriptive naming convention

echo "Updating deliverable_runs to deliverable_pipeline_runs..."

# Find and replace in all TypeScript/TSX files
find /Users/g/Developer/engi/engi -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "deliverable_runs" {} \; | while read file; do
  echo "Updating: $file"
  sed -i '' "s/'deliverable_runs'/'deliverable_pipeline_runs'/g" "$file"
  sed -i '' 's/"deliverable_runs"/"deliverable_pipeline_runs"/g' "$file"
  sed -i '' 's/`deliverable_runs`/`deliverable_pipeline_runs`/g' "$file"
done

echo "Done! Updated all references to use deliverable_pipeline_runs"