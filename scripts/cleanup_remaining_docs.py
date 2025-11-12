#!/usr/bin/env python3
"""Clean up remaining outdated documentation files and reorganize docs."""

import os
import sys

# Documentation files to remove (completion reports, WIP, outdated)
files_to_remove = [
    # Completion Reports
    "ENGI-CROWN-JEWEL-THESIS.md",
    "ENGI-EXCELLENCE-DOCUMENTATION.md", 
    "ENGI-EXCELLENCE-PROMPT-PARTS-UPDATE.md",
    "ENGI_FINAL_VERIFICATION_REPORT.md",
    "FINAL_PROMPT_ARCHITECTURE.md",
    "PATCH_PIPELINE_COMPLETE.md",
    "PROMPT-COMPOSER-EXCELLENCE.md",
    "PROMPT-SYSTEM-EVOLUTION-SUMMARY.md",
    "PROMPT_SYSTEM_FINAL_VERIFICATION.md",
    "PROMPT_SYSTEM_TRANSFORMATION.md",
    "TOOL_AGENT_MODERNIZATION_SUMMARY.md",
    "VCS_MIGRATION_SUMMARY.md",
    
    # Work-in-Progress/Planning Docs
    "OTF_CROSS_SYSTEM_IMPLEMENTATION.md",
    "OTF_REMAINGIN.md",
    "OTF_SYSTEM_DEEP_DIVE_ANALYSIS.md",
    "PROMPT_EVOLUTION_OPPORTUNITIES.md",
    "PROMPT_PROMPTS_PROMPTS_LATEST_BESTS.md",
    
    # Outdated/Superseded
    "DOC_COMMENTS_AS_PROMPTS_CYCLE.md",  # Superseded by DOC-COMMENTS-ARE-PROMPTS.md
    "REVOLUTIONARY_CONVERSATION_DOCS_DESIGN.md",  # Likely superseded
    
    # Test checklists that should be in DEVELOPING.md
    "HOMEPAGE_SCREENSHOT_CHECKLIST.md",
    "VISUAL_TEST_CHECKLIST.md",
    
    # Temporary cleanup scripts
    "cleanup-outdated-docs.sh",
    "cleanup_outdated_docs.py"
]

# Files that need content extraction/merging
files_to_merge = {
    "AI.md": "Extract QA checklist to README.md",
    "DOC-COMMENTS-ARE-PROMPTS.md": "Merge into DEVELOPING.md under 'Prompt Architecture'",
    "PIPELINE_ARCHITECTURE_SUMMARY.md": "Merge into DEVELOPING.md under 'Pipeline Architecture'",
    "TESTING_VISUAL.md": "Extract useful content to DEVELOPING.md under 'Testing Guidelines'",
    "EMERALD_DREAM.md": "Extract completed features to new UI_FEATURES.md"
}

print("🧹 Cleaning up remaining outdated documentation files...")
print("=" * 60)

# Remove files
removed_count = 0
not_found_count = 0

print("\n📁 Removing outdated files:")
for file in files_to_remove:
    if os.path.exists(file):
        try:
            os.remove(file)
            print(f"  ✓ Removed: {file}")
            removed_count += 1
        except Exception as e:
            print(f"  ✗ Error removing {file}: {e}")
    else:
        not_found_count += 1

print(f"\n📊 Summary:")
print(f"  - Files removed: {removed_count}")
print(f"  - Files not found: {not_found_count}")
print(f"  - Total processed: {len(files_to_remove)}")

print("\n📝 Files to merge (manual action required):")
for file, action in files_to_merge.items():
    if os.path.exists(file):
        print(f"  - {file}: {action}")

print("\n✅ Final documentation structure will be:")
print("  - README.md (main entry point)")
print("  - DEVELOPING.md (comprehensive guide)")
print("  - TEAM_MANAGEMENT.md (team features)")
print("  - CREDITS_AND_PAYMENTS.md (payment system)")
print("  - ELI5.md (simple guide)")
print("  - UI_FEATURES.md (to be created from EMERALD_DREAM.md)")

print("\n🎯 Next steps:")
print("  1. Run this script to remove outdated files")
print("  2. Manually merge content from files listed above")
print("  3. Create UI_FEATURES.md from EMERALD_DREAM.md")
print("  4. Review and commit the clean documentation structure")