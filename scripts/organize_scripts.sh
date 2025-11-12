#!/bin/bash
# Script to organize all root-level scripts into appropriate subdirectories

echo "🗂️  Organizing scripts into /scripts/ subdirectories..."

# Create subdirectories if they don't exist
mkdir -p scripts/migrations
mkdir -p scripts/cleanup  
mkdir -p scripts/reorganization
mkdir -p scripts/build

# Move migration scripts
echo "📦 Moving migration scripts..."
mv -v migrate_conversation_prompts.py scripts/migrations/ 2>/dev/null
mv -v migrate-conversation-prompts.js scripts/migrations/ 2>/dev/null
mv -v migrate-pgri-to-ptrr.py scripts/migrations/ 2>/dev/null
mv -v safe_migrate.py scripts/migrations/ 2>/dev/null
mv -v complete-conversation-migration.sh scripts/migrations/ 2>/dev/null

# Move cleanup scripts
echo "🧹 Moving cleanup scripts..."
mv -v cleanup-outdated-docs.sh scripts/cleanup/ 2>/dev/null
mv -v cleanup_outdated_docs.py scripts/cleanup/ 2>/dev/null
mv -v cleanup_remaining_docs.py scripts/cleanup/ 2>/dev/null

# Move reorganization scripts
echo "🔄 Moving reorganization scripts..."
mv -v reorganize_all.py scripts/reorganization/ 2>/dev/null
mv -v reorganize_with_python.py scripts/reorganization/ 2>/dev/null
mv -v reorganize_prompts.sh scripts/reorganization/ 2>/dev/null
mv -v move_files.sh scripts/reorganization/ 2>/dev/null
mv -v move_systems.py scripts/reorganization/ 2>/dev/null

# Move build/compliance scripts
echo "🏗️  Moving build/compliance scripts..."
mv -v phase2-complete.sh scripts/build/ 2>/dev/null
mv -v phase2-naming-compliance.py scripts/build/ 2>/dev/null
mv -v verify-prompt-exports.py scripts/build/ 2>/dev/null

echo "✅ Script organization complete!"
echo ""
echo "📁 New structure:"
echo "scripts/"
echo "├── migrations/      # Database and code migration scripts"
echo "├── cleanup/         # Cleanup and removal scripts"
echo "├── reorganization/  # File reorganization scripts"
echo "└── build/          # Build and compliance scripts"
echo ""
echo "🗑️  To clean up:"
echo "rm organize_scripts.sh"
echo "rm SCRIPT_ORGANIZATION_COMPLETE.md"
echo "rm DOCUMENTATION_REORGANIZATION_COMPLETE.md"