#!/bin/bash

# Script to reorganize directory structure in packages/prompts/src/raw/

BASE_DIR="/Users/g/Developer/engi/engi/packages/prompts/src/raw"
SRC_DIR="/Users/g/Developer/engi/engi/packages/prompts/src"

echo "Starting directory reorganization..."

# Task 1: Move all files from systems/ to generic/
echo "Task 1: Moving files from systems/ to generic/"
if [ -d "$BASE_DIR/systems" ]; then
    mv "$BASE_DIR/systems/"* "$BASE_DIR/generic/" 2>/dev/null
    echo "Moved files from systems/ to generic/"
fi

# Task 2: Move all files from generics/ to generic/
echo "Task 2: Moving files from generics/ to generic/"
if [ -d "$BASE_DIR/generics" ]; then
    mv "$BASE_DIR/generics/"* "$BASE_DIR/generic/" 2>/dev/null
    echo "Moved files from generics/ to generic/"
fi

# Task 3: Create specific/ directory if it doesn't exist and move files from specifics/
echo "Task 3: Moving files from specifics/ to specific/"
if [ ! -d "$BASE_DIR/specific" ]; then
    mkdir -p "$BASE_DIR/specific"
fi
if [ -d "$BASE_DIR/specifics" ]; then
    mv "$BASE_DIR/specifics/"* "$BASE_DIR/specific/" 2>/dev/null
    echo "Moved files from specifics/ to specific/"
fi

# Task 4: Move directories out of raw/ to parent src/ directory
echo "Task 4: Moving directories to parent src/ directory"

# Move composers/
if [ -d "$BASE_DIR/composers" ]; then
    mv "$BASE_DIR/composers" "$SRC_DIR/"
    echo "Moved composers/ to src/"
fi

# Move compositions/
if [ -d "$BASE_DIR/compositions" ]; then
    mv "$BASE_DIR/compositions" "$SRC_DIR/"
    echo "Moved compositions/ to src/"
fi

# Move parts/
if [ -d "$BASE_DIR/parts" ]; then
    mv "$BASE_DIR/parts" "$SRC_DIR/"
    echo "Moved parts/ to src/"
fi

# Move templates/
if [ -d "$BASE_DIR/templates" ]; then
    mv "$BASE_DIR/templates" "$SRC_DIR/"
    echo "Moved templates/ to src/"
fi

# Clean up empty directories
echo "Cleaning up empty directories..."
rmdir "$BASE_DIR/systems" 2>/dev/null
rmdir "$BASE_DIR/generics" 2>/dev/null
rmdir "$BASE_DIR/specifics" 2>/dev/null

echo "Directory reorganization completed!"

# Show the final structure
echo ""
echo "Final structure of src/raw/:"
ls -la "$BASE_DIR"
echo ""
echo "New directories in src/:"
ls -la "$SRC_DIR" | grep -E "(composers|compositions|parts|templates)"