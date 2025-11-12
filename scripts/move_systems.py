import os
import shutil

src = "/Users/g/Developer/engi/engi/packages/prompts/src/raw/systems"
dst = "/Users/g/Developer/engi/engi/packages/prompts/src/raw/generic"

count = 0
for filename in os.listdir(src):
    if filename.endswith('.ts'):
        shutil.move(os.path.join(src, filename), os.path.join(dst, filename))
        count += 1

print(f"Moved {count} files from systems/ to generic/")