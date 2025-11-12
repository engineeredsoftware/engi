#!/usr/bin/env python3
"""
Migrate PGRI to PTRR - Semantic Evolution Script

This script helps migrate:
- PGRI → PTRR (Plan-Generate-Refine-Intensify → Plan-Try-Refine-Retry)
- Meta-step → Failsafe-step
- Sub-step → Generation-step
- Generate → Try (in PGRI context)
- Intensify → Retry (in PGRI context)
"""

import os
import re
from pathlib import Path

def migrate_content(content):
    """Migrate PGRI patterns to PTRR"""
    original = content
    
    # Core methodology changes
    content = re.sub(r'\bPGRI\b(?! Excellence Framework)', 'PTRR', content)
    content = re.sub(r'Plan-Generate-Refine-Intensify', 'Plan-Try-Refine-Retry', content)
    content = re.sub(r'Plan, Generate, Refine, Intensify', 'Plan, Try, Refine, Retry', content)
    
    # Step-specific changes in PGRI context
    content = re.sub(r'Generate step', 'Try step', content)
    content = re.sub(r'GENERATE step', 'TRY step', content)
    content = re.sub(r'Intensify step', 'Retry step', content)
    content = re.sub(r'INTENSIFY step', 'RETRY step', content)
    
    # Meta/Sub to Failsafe/Generation
    content = re.sub(r'meta-step', 'failsafe-step', content)
    content = re.sub(r'Meta-step', 'Failsafe-step', content)
    content = re.sub(r'META-STEP', 'FAILSAFE-STEP', content)
    content = re.sub(r'MetaStep', 'FailsafeStep', content)
    content = re.sub(r'meta_step', 'failsafe_step', content)
    
    content = re.sub(r'sub-step', 'generation-step', content)
    content = re.sub(r'Sub-step', 'Generation-step', content)
    content = re.sub(r'SUB-STEP', 'GENERATION-STEP', content)
    content = re.sub(r'SubStep', 'GenerationStep', content)
    content = re.sub(r'sub_step', 'generation_step', content)
    
    # Update doc comments
    content = re.sub(r'@doc-pgri', '@doc-ptrr', content)
    
    return content

def should_migrate_file(filepath):
    """Check if file should be migrated"""
    # Skip the deprecated PGRI framework file
    if 'pgri_excellence_framework_methodology' in str(filepath):
        return False
    
    # Skip already migrated PTRR files
    if 'ptrr' in str(filepath).lower():
        return False
        
    # Skip this migration script
    if filepath.name == 'migrate-pgri-to-ptrr.py':
        return False
        
    return filepath.suffix in ['.ts', '.tsx', '.js', '.jsx', '.md']

def main():
    print("🔄 Migrating PGRI to PTRR - Semantic Evolution")
    print("")
    
    packages_path = Path("/Users/g/Developer/engi/engi/packages")
    modified_files = []
    
    for filepath in packages_path.rglob("*"):
        if not filepath.is_file():
            continue
            
        if not should_migrate_file(filepath):
            continue
            
        try:
            content = filepath.read_text()
            new_content = migrate_content(content)
            
            if content != new_content:
                filepath.write_text(new_content)
                modified_files.append(filepath.relative_to(packages_path))
                print(f"✅ {filepath.relative_to(packages_path)}")
        except Exception as e:
            print(f"❌ Error processing {filepath}: {e}")
    
    print(f"\n📊 Migration Summary:")
    print(f"  Modified {len(modified_files)} files")
    
    if modified_files:
        print("\n🎯 Key Changes Made:")
        print("  - PGRI → PTRR")
        print("  - Generate → Try")
        print("  - Intensify → Retry")
        print("  - Meta-step → Failsafe-step")
        print("  - Sub-step → Generation-step")

if __name__ == "__main__":
    main()