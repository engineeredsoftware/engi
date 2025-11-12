-- Add columns required for rich Final Work Summary metadata

-- The GIN trigram index below relies on the pg_trgm extension. Ensure it
-- exists before creating the index so the migration is idempotent on local
-- and remote databases.

create extension if not exists pg_trgm;

alter table if exists public.deliverable_runs
  add column if not exists summary text;

alter table if exists public.deliverable_runs
  add column if not exists processing_stats jsonb;

alter table if exists public.deliverable_runs
  add column if not exists repo_snapshot jsonb;

-- Index for faster querying recent runs with summary present
create index if not exists deliverable_runs_summary_idx
  on public.deliverable_runs using gin (summary gin_trgm_ops);
