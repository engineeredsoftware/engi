#!/usr/bin/env python3
"""Reorganize directory structure in packages/prompts/src/raw/"""

import os
import shutil
from pathlib import Path

def main():
    base_dir = "/Users/g/Developer/engi/engi/packages/prompts/src/raw"
    src_dir = "/Users/g/Developer/engi/engi/packages/prompts/src"
    
    # Task 1: Move all files from systems/ to generic/
    print("Task 1: Moving files from systems/ to generic/")
    systems_path = os.path.join(base_dir, "systems")
    generic_path = os.path.join(base_dir, "generic")
    
    if os.path.exists(systems_path):
        count = 0
        for filename in os.listdir(systems_path):
            if os.path.isfile(os.path.join(systems_path, filename)):
                shutil.move(
                    os.path.join(systems_path, filename),
                    os.path.join(generic_path, filename)
                )
                count += 1
        print(f"  Moved {count} files from systems/ to generic/")
        
        # Remove empty systems directory
        if not os.listdir(systems_path):
            os.rmdir(systems_path)
            print("  Removed empty systems/ directory")
    
    # Task 2: Move all files from generics/ to generic/
    print("\nTask 2: Moving files from generics/ to generic/")
    generics_path = os.path.join(base_dir, "generics")
    
    if os.path.exists(generics_path):
        count = 0
        for filename in os.listdir(generics_path):
            if os.path.isfile(os.path.join(generics_path, filename)):
                shutil.move(
                    os.path.join(generics_path, filename),
                    os.path.join(generic_path, filename)
                )
                count += 1
        print(f"  Moved {count} files from generics/ to generic/")
        
        # Remove empty generics directory
        if not os.listdir(generics_path):
            os.rmdir(generics_path)
            print("  Removed empty generics/ directory")
    
    # Task 3: Move all files from specifics/ to specific/
    print("\nTask 3: Moving files from specifics/ to specific/")
    specifics_path = os.path.join(base_dir, "specifics")
    specific_path = os.path.join(base_dir, "specific")
    
    # Create specific/ directory if it doesn't exist
    if not os.path.exists(specific_path):
        os.makedirs(specific_path)
        print("  Created specific/ directory")
    
    if os.path.exists(specifics_path):
        count = 0
        for filename in os.listdir(specifics_path):
            if os.path.isfile(os.path.join(specifics_path, filename)):
                shutil.move(
                    os.path.join(specifics_path, filename),
                    os.path.join(specific_path, filename)
                )
                count += 1
        print(f"  Moved {count} files from specifics/ to specific/")
        
        # Remove empty specifics directory
        if not os.listdir(specifics_path):
            os.rmdir(specifics_path)
            print("  Removed empty specifics/ directory")
    
    # Task 4: Move directories out of raw/ to parent src/ directory
    print("\nTask 4: Moving directories to parent src/ directory")
    directories_to_move = ["composers", "compositions", "parts", "templates"]
    
    for dir_name in directories_to_move:
        src_path = os.path.join(base_dir, dir_name)
        dst_path = os.path.join(src_dir, dir_name)
        
        if os.path.exists(src_path):
            shutil.move(src_path, dst_path)
            print(f"  Moved {dir_name}/ to src/")
    
    print("\nReorganization completed successfully!")
    
    # Show final structure
    print("\nFinal structure of src/raw/:")
    for item in sorted(os.listdir(base_dir)):
        item_path = os.path.join(base_dir, item)
        if os.path.isdir(item_path):
            file_count = len([f for f in os.listdir(item_path) if f.endswith('.ts')])
            print(f"  {item}/ ({file_count} .ts files)")
        else:
            print(f"  {item}")
    
    print("\nNew directories in src/:")
    for dir_name in directories_to_move:
        dir_path = os.path.join(src_dir, dir_name)
        if os.path.exists(dir_path):
            file_count = len([f for f in os.listdir(dir_path) if f.endswith('.ts')])
            print(f"  {dir_name}/ ({file_count} .ts files)")

if __name__ == "__main__":
    main()