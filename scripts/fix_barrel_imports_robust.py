#!/usr/bin/env python3

import re
import os
import sys

def promptpart_name_to_filename(name):
    """Convert PROMPTPART_GENERIC_AGENT_SYSTEM_CAPABILITIES to promptpart_generic_agent_system_capabilities"""
    return name.lower()

def fix_imports_in_file(file_path):
    """Fix barrel imports in a single file"""
    try:
        with open(file_path, 'r') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return False
    
    original_content = content
    
    # Pattern to match barrel imports from generic or specific (single and multi-line)
    barrel_pattern = r"import\s*\{\s*((?:[^{}]+|\{[^{}]*\})*)\s*\}\s*from\s*['\"]@engi/prompts/raw_promptparts/(generic|specific)['\"];"
    
    def replace_barrel_import(match):
        imports_text = match.group(1)
        directory = match.group(2)  # 'generic' or 'specific'
        
        # Clean up the imports text and split by commas
        # Handle multi-line imports and extra whitespace
        imports_text = re.sub(r'\s+', ' ', imports_text.strip())
        import_names = [name.strip() for name in imports_text.split(',') if name.strip()]
        
        # Convert to individual imports
        new_imports = []
        for import_name in import_names:
            filename = promptpart_name_to_filename(import_name)
            new_import = f"import {{ {import_name} }} from '@engi/prompts/raw_promptparts/{directory}/{filename}';"
            new_imports.append(new_import)
        
        return '\n'.join(new_imports)
    
    # Replace all barrel imports
    new_content = re.sub(barrel_pattern, replace_barrel_import, content, flags=re.MULTILINE | re.DOTALL)
    
    if new_content != original_content:
        try:
            with open(file_path, 'w') as f:
                f.write(new_content)
            print(f"Fixed imports in {file_path}")
            return True
        except Exception as e:
            print(f"Error writing {file_path}: {e}")
            return False
    
    return False

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 fix_barrel_imports_robust.py <file_path>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    if fix_imports_in_file(file_path):
        print(f"Successfully fixed imports in {file_path}")
    else:
        print(f"No changes needed in {file_path}")

if __name__ == "__main__":
    main()
