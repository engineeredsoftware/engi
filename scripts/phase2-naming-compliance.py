#!/usr/bin/env python3
"""
PHASE 2B: Naming Compliance - Add PROMPT_ prefix and remove old-world patterns
Bitcode Excellence - prompt-system cleanup freedom
"""

import os
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
PACKAGES_PATH = REPO_ROOT / "packages"

def fix_prompt_naming():
    """Fix all prompt naming to use PROMPT_ prefix"""

    packages_path = PACKAGES_PATH
    changes = {}
    
    # Track all renames for import updates
    renames = {}
    
    # First pass: Find all exports in raw/ files that need renaming
    raw_path = packages_path / "prompts/src/raw"
    for ts_file in raw_path.rglob("*.ts"):
        if ts_file.name == "index.ts":
            continue
            
        content = ts_file.read_text()
        original = content
        
        # Find exports that need PROMPT_ prefix
        # Match: export const SOMETHING = 
        # But not: export const PROMPT_SOMETHING =
        pattern = r'export const ([A-Z][A-Z0-9_]*?)(\s*:\s*(?:PromptPart|Prompt|string))?\s*='
        
        for match in re.finditer(pattern, content):
            const_name = match.group(1)
            
            # Skip if already has PROMPT_ prefix
            if const_name.startswith('PROMPT_'):
                continue
                
            # Build new name
            if const_name.startswith('RAW_PROMPT_'):
                # Remove RAW_ prefix
                new_name = const_name.replace('RAW_PROMPT_', 'PROMPT_')
            else:
                # Add PROMPT_ prefix
                new_name = f'PROMPT_{const_name}'
            
            # Track rename
            renames[const_name] = new_name
            
            # Replace in file
            content = content.replace(f'export const {const_name}', f'export const {new_name}')
        
        if content != original:
            ts_file.write_text(content)
            changes[str(ts_file.relative_to(packages_path))] = len(renames)
    
    # Second pass: Update all imports and references
    for ts_file in packages_path.rglob("*.ts"):
        if "node_modules" in str(ts_file):
            continue
            
        content = ts_file.read_text()
        original = content
        
        # Update imports and references
        for old_name, new_name in renames.items():
            # Update in import statements
            content = re.sub(
                rf'\b{old_name}\b',
                new_name,
                content
            )
        
        if content != original:
            ts_file.write_text(content)
            if str(ts_file.relative_to(packages_path)) not in changes:
                changes[str(ts_file.relative_to(packages_path))] = 0
    
    return changes, renames

def remove_create_prompt_part():
    """Remove createPromptPart usage"""

    packages_path = PACKAGES_PATH
    raw_path = packages_path / "prompts/src/raw"
    removed_count = 0
    
    for ts_file in raw_path.rglob("*.ts"):
        content = ts_file.read_text()
        original = content
        
        if "createPromptPart" in content:
            # Pattern to match createPromptPart calls
            # This captures the string content between backticks
            pattern = r'createPromptPart\s*\([^`]*`([^`]+)`[^)]*\)'
            
            matches = list(re.finditer(pattern, content, re.DOTALL))
            
            for match in reversed(matches):  # Process in reverse to maintain positions
                prompt_content = match.group(1)
                # Replace the entire createPromptPart call with just the string
                content = content[:match.start()] + f'`{prompt_content}`' + content[match.end():]
                removed_count += 1
            
            # Remove the import
            content = re.sub(r'import\s*\{[^}]*createPromptPart[^}]*\}\s*from\s*[\'"][^\'"]+[\'"];?\s*\n', '', content)
            
            # Clean up any type imports that are no longer needed
            content = re.sub(r'import\s*(?:type\s*)?\{\s*PromptDoc\s*\}\s*from\s*[\'"][^\'"]+[\'"];?\s*\n', '', content)
        
        if content != original:
            ts_file.write_text(content)
    
    return removed_count

if __name__ == "__main__":
    print("PHASE 2B: Naming Compliance & Old-World Removal")
    print("Bitcode Excellence Mode Activated!")
    print("")
    
    # Step 1: Fix naming
    print("📦 Step 1: Adding PROMPT_ prefix to exports...")
    changes, renames = fix_prompt_naming()
    print(f"  ✅ Renamed {len(renames)} exports")
    print(f"  ✅ Updated {len(changes)} files")
    
    if renames:
        print("\n  Sample renames:")
        for old, new in list(renames.items())[:5]:
            print(f"    {old} → {new}")
    
    # Step 2: Remove createPromptPart
    print("\n📦 Step 2: Removing createPromptPart usage...")
    removed = remove_create_prompt_part()
    print(f"  ✅ Removed {removed} createPromptPart calls")
    
    print("\n✅ PHASE 2B Complete!")
    print("Next: Commit these changes before Phase 3")
