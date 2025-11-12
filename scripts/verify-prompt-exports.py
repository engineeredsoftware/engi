#!/usr/bin/env python3
"""
Verify all PROMPT_ exports are included in index.ts
"""

import os
import re
from pathlib import Path

def find_all_prompt_exports():
    """Find all PROMPT_ exports in raw directories"""
    packages_path = Path("/Users/g/Developer/engi/engi/packages")
    raw_path = packages_path / "prompts/src/raw"
    
    exports = {}
    
    for ts_file in raw_path.rglob("*.ts"):
        if ts_file.name == "index.ts":
            continue
            
        content = ts_file.read_text()
        
        # Find all PROMPT_ exports
        pattern = r'export const (PROMPT_[A-Z0-9_]+)'
        matches = re.findall(pattern, content)
        
        for match in matches:
            relative_path = ts_file.relative_to(raw_path)
            exports[match] = str(relative_path)
    
    return exports

def check_index_exports():
    """Check what's exported in index.ts"""
    index_path = Path("/Users/g/Developer/engi/engi/packages/prompts/src/index.ts")
    content = index_path.read_text()
    
    # Find all export * from statements
    exported_files = set()
    pattern = r"export \* from '\./raw/([^']+)'"
    matches = re.findall(pattern, content)
    
    for match in matches:
        exported_files.add(match + '.ts')
    
    return exported_files

def main():
    print("🔍 Verifying PROMPT_ exports in index.ts")
    print("")
    
    # Find all PROMPT_ exports
    all_exports = find_all_prompt_exports()
    print(f"Found {len(all_exports)} PROMPT_ exports in raw directories")
    
    # Check what's exported
    exported_files = check_index_exports()
    print(f"Found {len(exported_files)} files exported in index.ts")
    
    # Find missing files
    all_files = set(all_exports.values())
    missing_files = all_files - exported_files
    
    if missing_files:
        print(f"\n⚠️  Found {len(missing_files)} files not exported in index.ts:")
        
        # Group by directory
        generic_missing = []
        specific_missing = []
        
        for file in sorted(missing_files):
            if file.startswith('generic/'):
                generic_missing.append(file)
            else:
                specific_missing.append(file)
        
        if generic_missing:
            print("\nMissing from generic:")
            for file in generic_missing:
                print(f"  export * from './raw/{file[:-3]}';")
        
        if specific_missing:
            print("\nMissing from specific:")
            for file in specific_missing:
                print(f"  export * from './raw/{file[:-3]}';")
    else:
        print("\n✅ All PROMPT_ exports are included in index.ts!")
    
    # Show summary by category
    print("\n📊 Export Summary:")
    categories = {}
    for export_name, file_path in all_exports.items():
        category = file_path.split('/')[0]
        categories[category] = categories.get(category, 0) + 1
    
    for category, count in sorted(categories.items()):
        print(f"  {category}: {count} exports")

if __name__ == "__main__":
    main()