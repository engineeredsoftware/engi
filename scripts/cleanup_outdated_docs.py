#!/usr/bin/env python3
"""Clean up outdated Bitcode documentation files."""

import os
import sys

# List of files to remove
files_to_remove = [
    "BITCODE_EVOLUTIONARY_EXCELLENCE.md",
    "PIPELINE_DEVELOPMENT.md",
    "DOCUMENTATION_INDEX.md",
    "PIPELINE_OVERVIEW.md",
    "EXECUTION_ARCHITECTURE.md",
    "PROMPT_ARCHITECTURE_FIX_SUMMARY.md",
    "PROMPT_REORGANIZATION_SUMMARY.md",
    "LEGACY_CODE_REMOVAL_PLAN.md",
    "AGENT_TRANSFORMATION_STRATEGY.md",
    "V1_MODERNIZATION_SUMMARY.md",
    "TOOL_AGENT_MODERNIZATION_INVENTORY.md",
    "CONVERSATION_README.md",
    "CONVERSATION_STREAMING_INTEGRATION_GUIDE.md",
    "CONVERSATION_CONVERSATION_EXAMPLE.md",
    "CONVERSATIONS_REFACTOR_SUMMARY.md",
    "THE-CROWN-JEWEL-IS-COMPLETE.md",
    "PROMPT-SYSTEM-PRODUCTION-CHECKLIST.md",
    "PIPELINE_PROMPT_SURVEY.md",
    "SCRIPTS_MIGRATION.md"
]

print("Cleaning up outdated documentation files...")
removed_count = 0
not_found_count = 0

for file in files_to_remove:
    if os.path.exists(file):
        try:
            os.remove(file)
            print(f"✓ Removed: {file}")
            removed_count += 1
        except Exception as e:
            print(f"✗ Error removing {file}: {e}")
    else:
        print(f"- Not found: {file}")
        not_found_count += 1

print(f"\nSummary:")
print(f"- Files removed: {removed_count}")
print(f"- Files not found: {not_found_count}")
print(f"- Total processed: {len(files_to_remove)}")
