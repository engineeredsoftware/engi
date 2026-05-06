# Removed Prompt Migration Scripts

## Status

These notes document active-source scripts removed during V26 fifth-gate reform.
They were one-off migration utilities, not canonical Bitcode runtime or
maintenance surfaces.

## Removed Active Scripts

- `scripts/complete-conversation-migration.sh`
- `scripts/migrate_conversation_prompts.py`
- `scripts/safe_migrate.py`
- `scripts/move_files.sh`
- `scripts/move_systems.py`
- `scripts/reorganize_all.py`
- `scripts/reorganize_with_python.py`
- `scripts/reorganize_prompts.sh`
- `scripts/organize_scripts.sh`
- `scripts/update-agents.sh`
- `scripts/update-all-agents-to-ptrr.sh`
- `scripts/fix-all-agents-ptrr.py`
- `scripts/migrate-pgri-to-ptrr.py`
- `scripts/create-missing-system-prompts.sh`
- `scripts/fix-promptpart-filenames.sh`
- `scripts/fix-promptpart-filenames-simple.sh`
- `scripts/check-ga1-status.sh`

## Why They Were Cut

The removed scripts encoded hard-coded local checkout paths, removed
`packages/prompts/src/raw/*` filesystem assumptions, old prompt organization
names, or broad destructive migration behavior. Keeping them under active
`scripts/` would falsely teach that removed migration layout as current
Bitcode tooling.

The V26 active source replacements are the current prompt maintenance,
generation, and verification scripts that operate against
`packages/prompts/src/raw_promptparts/*`, public `@bitcode/prompts` boundaries,
and source-visible fifth-gate proof carriers.
