#!/usr/bin/env python3
"""
Verify raw PromptPart exports are included in their local raw_promptparts indexes.
"""

import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
RAW_PROMPTPARTS_PATH = REPO_ROOT / "packages/prompts/src/raw_promptparts"

def find_all_prompt_exports():
    """Find all PROMPTPART_ exports in active raw PromptPart directories."""
    exports = {}

    for ts_file in RAW_PROMPTPARTS_PATH.rglob("*.ts"):
        if ts_file.name == "index.ts" or ts_file.name.endswith(".d.ts"):
            continue

        content = ts_file.read_text()

        pattern = r'export const (PROMPTPART_[A-Z0-9_]+)'
        matches = re.findall(pattern, content)

        for match in matches:
            relative_path = ts_file.relative_to(RAW_PROMPTPARTS_PATH)
            exports[match] = str(relative_path)

    return exports

def check_index_exports():
    """Check local raw_promptparts index exports."""
    exported_files = set()

    for index_path in RAW_PROMPTPARTS_PATH.rglob("index.ts"):
        content = index_path.read_text()
        matches = re.findall(r'export \* from ["\']\./([^"\']+)["\']', content)

        for match in matches:
            exported_path = index_path.parent / f"{match}.ts"
            try:
                exported_files.add(str(exported_path.relative_to(RAW_PROMPTPARTS_PATH)))
            except ValueError:
                continue

    return exported_files

def main():
    print("Verifying active raw PromptPart exports")
    print("")

    all_exports = find_all_prompt_exports()
    print(f"Found {len(all_exports)} PROMPTPART_ exports in raw_promptparts directories")

    exported_files = check_index_exports()
    print(f"Found {len(exported_files)} files exported through local raw_promptparts indexes")

    all_files = set(all_exports.values())
    missing_files = all_files - exported_files

    if missing_files:
        print(f"\nFound {len(missing_files)} files not exported through local raw_promptparts indexes:")

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
                print(f"  export * from './{Path(file).stem}';")

        if specific_missing:
            print("\nMissing from specific:")
            for file in specific_missing:
                print(f"  export * from './{Path(file).stem}';")
    else:
        print("\nAll active raw PromptPart exports are included in local indexes.")

    print("\nExport summary:")
    categories = {}
    for export_name, file_path in all_exports.items():
        category = file_path.split('/')[0]
        categories[category] = categories.get(category, 0) + 1

    for category, count in sorted(categories.items()):
        print(f"  {category}: {count} exports")

if __name__ == "__main__":
    main()
