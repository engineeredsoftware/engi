SHELL := /bin/bash

.PHONY: help db-reset db-dump db-gen-types db-codegen db-squash

help:
	@echo "Engi Makefile shortcuts"
	@echo "  make db-reset      -> scripts/supabase.sh db:reset"
	@echo "  make db-dump       -> scripts/supabase.sh db:dump -f supabase/migrations/000_squashed.sql"
	@echo "  make db-gen-types  -> scripts/supabase.sh gen:types"
	@echo "  make db-codegen    -> scripts/supabase.sh codegen:db"
	@echo "  make db-squash     -> scripts/db-squash.sh"
	@echo "  make db-verify     -> apply 000_squashed.sql to local psql (requires psql)"

db-reset:
	bash scripts/supabase.sh db:reset

db-dump:
	bash scripts/supabase.sh db:dump -f supabase/migrations/000_squashed.sql

db-gen-types:
	bash scripts/supabase.sh gen:types

db-codegen:
	bash scripts/supabase.sh codegen:db

db-squash:
	bash scripts/db-squash.sh

db-verify:
	@if ! command -v psql >/dev/null 2>&1; then \
		echo "[db-verify] psql not found. Install PostgreSQL client or use 'scripts/supabase.sh start' to start a local stack." >&2; \
		exit 1; \
	fi
	@echo "[db-verify] Checking Postgres at localhost:5432 (db=engi user=postgres)..."
	@PSQL_TEST="psql -h localhost -U postgres -d engi -c '\\q'"; \
	if ! $$PSQL_TEST >/dev/null 2>&1; then \
		echo "[db-verify] Cannot connect to Postgres at localhost:5432."; \
		echo ""; \
		echo "Options to proceed:"; \
		echo "  1) Start Supabase local stack:   scripts/supabase.sh start"; \
		echo "     Then run:                    make db-verify"; \
		echo "  2) Or start a disposable Postgres with Docker:"; \
		echo "     docker run --rm -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=engi -p 5432:5432 postgres:15"; \
		echo "     Then run:                    make db-verify"; \
		echo "  3) Or connect to your local Postgres and create db 'engi' and user 'postgres'."; \
		exit 1; \
	fi
	@echo "[db-verify] Applying supabase/migrations/000_squashed.sql..."
	@psql -h localhost -U postgres -d engi -f supabase/migrations/000_squashed.sql && echo "[db-verify] Applied successfully."
