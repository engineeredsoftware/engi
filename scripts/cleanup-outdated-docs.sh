#!/bin/bash
# Script to clean up outdated documentation files

echo "Cleaning up outdated Bitcode documentation files..."

# List of files to remove
files_to_remove=(
    "BITCODE_EVOLUTIONARY_EXCELLENCE.md"
    "PIPELINE_DEVELOPMENT.md"
    "DOCUMENTATION_INDEX.md"
    "PIPELINE_OVERVIEW.md"
    "EXECUTION_ARCHITECTURE.md"
    "PROMPT_ARCHITECTURE_FIX_SUMMARY.md"
    "PROMPT_REORGANIZATION_SUMMARY.md"
    "LEGACY_CODE_REMOVAL_PLAN.md"
    "AGENT_TRANSFORMATION_STRATEGY.md"
    "V1_MODERNIZATION_SUMMARY.md"
    "TOOL_AGENT_MODERNIZATION_INVENTORY.md"
    "CONVERSATION_README.md"
    "CONVERSATION_STREAMING_INTEGRATION_GUIDE.md"
    "CONVERSATION_CONVERSATION_EXAMPLE.md"
    "CONVERSATIONS_REFACTOR_SUMMARY.md"
    "THE-CROWN-JEWEL-IS-COMPLETE.md"
    "PROMPT-SYSTEM-PRODUCTION-CHECKLIST.md"
    "PIPELINE_PROMPT_SURVEY.md"
    "SCRIPTS_MIGRATION.md"
)

# Remove each file
for file in "${files_to_remove[@]}"; do
    if [ -f "$file" ]; then
        echo "Removing: $file"
        rm -f "$file"
    else
        echo "Not found: $file"
    fi
done

echo "Cleanup complete!"
