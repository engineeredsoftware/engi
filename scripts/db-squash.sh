#!/usr/bin/env bash
set -euo pipefail

HERE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE_DIR/.." && pwd)"

echo "[db-squash] Resetting local DB..."
bash "$ROOT/scripts/supabase.sh" db:reset

echo "[db-squash] Dumping schema to supabase/migrations/000_squashed.sql..."
bash "$ROOT/scripts/supabase.sh" db:dump -f supabase/migrations/000_squashed.sql

echo "[db-squash] Regenerating ORM types and runtime schemas..."
bash "$ROOT/scripts/supabase.sh" gen:types
bash "$ROOT/scripts/supabase.sh" codegen:db

echo "[db-squash] Done. Please review git diff and commit changes."

