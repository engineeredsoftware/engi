#!/bin/bash

# Migration script to update VCS imports from old packages to new @engi/vcs package

echo "Migrating VCS imports from old packages to @engi/vcs..."

# Find all TypeScript and JavaScript files
find ../.. -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/dist/*" \
  -not -path "*/build/*" | while read -r file; do
  
  # Check if file contains old imports
  if grep -q "@engi/vcs-core\|@engi/vcs-service\|@engi/vcs-generics" "$file"; then
    echo "Updating imports in: $file"
    
    # Create backup
    cp "$file" "$file.bak"
    
    # Replace imports
    sed -i '' \
      -e 's|from ["'"'"']@engi/vcs-core["'"'"']|from "@engi/vcs"|g' \
      -e 's|from ["'"'"']@engi/vcs-service["'"'"']|from "@engi/vcs"|g' \
      -e 's|from ["'"'"']@engi/vcs-generics["'"'"']|from "@engi/vcs"|g' \
      -e 's|import("@engi/vcs-core")|import("@engi/vcs")|g' \
      -e 's|import("@engi/vcs-service")|import("@engi/vcs")|g' \
      -e 's|import("@engi/vcs-generics")|import("@engi/vcs")|g' \
      -e 's|require("@engi/vcs-core")|require("@engi/vcs")|g' \
      -e 's|require("@engi/vcs-service")|require("@engi/vcs")|g' \
      -e 's|require("@engi/vcs-generics")|require("@engi/vcs")|g' \
      "$file"
    
    # Check if changes were made
    if ! diff -q "$file" "$file.bak" > /dev/null; then
      echo "  ✓ Updated imports"
      rm "$file.bak"
    else
      echo "  - No changes needed"
      rm "$file.bak"
    fi
  fi
done

# Update package.json dependencies
echo ""
echo "Updating package.json dependencies..."
find ../.. -name "package.json" -not -path "*/node_modules/*" | while read -r file; do
  if grep -q '"@engi/vcs-core"\|"@engi/vcs-service"\|"@engi/vcs-generics"' "$file"; then
    echo "Updating dependencies in: $file"
    
    # Create backup
    cp "$file" "$file.bak"
    
    # Replace dependencies
    sed -i '' \
      -e 's|"@engi/vcs-core": "[^"]*"|"@engi/vcs": "workspace:*"|g' \
      -e 's|"@engi/vcs-service": "[^"]*"|"@engi/vcs": "workspace:*"|g' \
      -e 's|"@engi/vcs-generics": "[^"]*"|"@engi/vcs": "workspace:*"|g' \
      "$file"
    
    # Remove duplicates if @engi/vcs already exists
    # This is more complex and would need a proper JSON parser
    
    echo "  ✓ Updated dependencies"
    rm "$file.bak"
  fi
done

echo ""
echo "Migration complete! Please review the changes and run tests."
echo ""
echo "Note: Some imports might need manual adjustment if they were importing specific paths like:"
echo "  - @engi/vcs-core/utils"
echo "  - @engi/vcs-service/cache"
echo ""
echo "These should be updated to:"
echo "  - @engi/vcs"
echo ""
echo "Also check for any type-only imports that might need adjustment."