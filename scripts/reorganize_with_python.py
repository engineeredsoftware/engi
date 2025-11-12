#!/usr/bin/env python3

import os
import shutil
from pathlib import Path

BASE_DIR = Path("/Users/g/Developer/engi/engi/packages/prompts/src/raw")
SRC_DIR = Path("/Users/g/Developer/engi/engi/packages/prompts/src")

def move_files(src_dir, dst_dir):
    """Move all files from src_dir to dst_dir"""
    if not src_dir.exists():
        print(f"Source directory {src_dir} does not exist")
        return
    
    if not dst_dir.exists():
        dst_dir.mkdir(parents=True, exist_ok=True)
    
    files_moved = 0
    for file_path in src_dir.glob("*"):
        if file_path.is_file():
            dst_path = dst_dir / file_path.name
            shutil.move(str(file_path), str(dst_path))
            files_moved += 1
    
    print(f"Moved {files_moved} files from {src_dir.name} to {dst_dir.name}")
    return files_moved

def move_directory(src_dir, dst_dir):
    """Move entire directory from src_dir to dst_dir"""
    if not src_dir.exists():
        print(f"Source directory {src_dir} does not exist")
        return False
    
    shutil.move(str(src_dir), str(dst_dir))
    print(f"Moved directory {src_dir.name} to {dst_dir.parent.name}")
    return True

print("Starting directory reorganization...")

# Task 1: Move all files from systems/ to generic/
print("\nTask 1: Moving files from systems/ to generic/")
move_files(BASE_DIR / "systems", BASE_DIR / "generic")

# Task 2: Move all files from generics/ to generic/
print("\nTask 2: Moving files from generics/ to generic/")
move_files(BASE_DIR / "generics", BASE_DIR / "generic")

# Task 3: Move all files from specifics/ to specific/
print("\nTask 3: Moving files from specifics/ to specific/")
move_files(BASE_DIR / "specifics", BASE_DIR / "specific")

# Task 4: Move directories out of raw/ to parent src/ directory
print("\nTask 4: Moving directories to parent src/ directory")

directories_to_move = ["composers", "compositions", "parts", "templates"]
for dir_name in directories_to_move:
    src_path = BASE_DIR / dir_name
    dst_path = SRC_DIR / dir_name
    if move_directory(src_path, dst_path):
        print(f"Successfully moved {dir_name}/ to src/")

# Clean up empty directories
print("\nCleaning up empty directories...")
for dir_name in ["systems", "generics", "specifics"]:
    dir_path = BASE_DIR / dir_name
    if dir_path.exists() and not any(dir_path.iterdir()):
        dir_path.rmdir()
        print(f"Removed empty directory: {dir_name}")

print("\nDirectory reorganization completed!")

# Show the final structure
print("\nFinal structure of src/raw/:")
for item in sorted(BASE_DIR.iterdir()):
    if item.is_dir():
        file_count = len(list(item.glob("*.ts")))
        print(f"  {item.name}/ ({file_count} .ts files)")
    else:
        print(f"  {item.name}")

print("\nNew directories in src/:")
for dir_name in directories_to_move:
    dir_path = SRC_DIR / dir_name
    if dir_path.exists():
        file_count = len(list(dir_path.glob("*.ts")))
        print(f"  {dir_name}/ ({file_count} .ts files)")