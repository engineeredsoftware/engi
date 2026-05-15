#!/bin/bash
# PHASE 2: Complete Import Fixes & Naming Compliance

echo "🚀 PHASE 2: Import Fixes & Naming Compliance"
echo "Pre-commercial freedom - Moving at Bitcode velocity!"

# Base path
PACKAGES_PATH="$(cd "$(dirname "$0")/.." && pwd)/packages"

echo "📦 Step 1: Fixing import paths (44 files)..."

# Fix all three import patterns in one pass
find $PACKAGES_PATH -name "*.ts" -type f | while read file; do
    # Check if file contains any of our patterns
    if grep -E "/raw/(systems|specifics|generics)/" "$file" > /dev/null 2>&1; then
        # Make replacements
        sed -i '' \
            -e 's|/raw/systems/|/raw/generic/|g' \
            -e 's|/raw/specifics/|/raw/specific/|g' \
            -e 's|/raw/generics/|/raw/generic/|g' \
            "$file"
        echo "  Fixed: $(basename $file)"
    fi
done

echo "✅ Import paths fixed!"

echo ""
echo "📦 Step 2: Checking for files to update exports..."

# Count files reading PROMPT_ prefix
RAW_FILES_COUNT=$(find $PACKAGES_PATH/prompts/src/raw -name "*.ts" -type f | wc -l | tr -d ' ')
echo "  Found $RAW_FILES_COUNT raw prompt files to check"

# Check for non-compliant exports
NON_COMPLIANT=$(grep -r "export const [A-Z]" $PACKAGES_PATH/prompts/src/raw --include="*.ts" | grep -v "PROMPT_" | wc -l | tr -d ' ')
echo "  Found $NON_COMPLIANT non-compliant exports to fix"

echo ""
echo "✅ PHASE 2 preparation complete!"
echo ""
echo "Next steps:"
echo "1. Run this script to fix imports"
echo "2. Create a Python script to handle export renaming (more complex regex)"
echo "3. Remove createPromptPart usage"
