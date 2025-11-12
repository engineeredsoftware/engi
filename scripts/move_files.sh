#!/bin/bash

# Source and destination directories
SOURCE="/Users/g/Developer/engi/engi/packages/pipelines/conversation/src/raw"
DEST="/Users/g/Developer/engi/engi/packages/prompts/src/raw/specifics"

# Move all conversation_*.ts files
for file in "$SOURCE"/conversation_*.ts; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "Moving $filename"
        mv "$file" "$DEST/"
    fi
done

echo "Migration complete!"