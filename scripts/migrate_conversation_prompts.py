#!/usr/bin/env python3
import os
import shutil
from pathlib import Path

# Define source and destination paths
source_dir = Path("/Users/g/Developer/engi/engi/packages/pipelines/conversation/src/raw")
dest_dir = Path("/Users/g/Developer/engi/engi/packages/prompts/src/raw/specifics")

# Ensure destination directory exists
dest_dir.mkdir(parents=True, exist_ok=True)

# Get all conversation_*.ts files
conversation_files = list(source_dir.glob("conversation_*.ts"))

print(f"Found {len(conversation_files)} conversation prompt files to migrate")

# Move each file
for file in conversation_files:
    dest_path = dest_dir / file.name
    print(f"Moving {file.name} to {dest_path}")
    shutil.move(str(file), str(dest_path))

print(f"\nSuccessfully moved {len(conversation_files)} files")
print(f"From: {source_dir}")
print(f"To: {dest_dir}")