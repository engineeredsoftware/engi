-- Create run_otf_instructions table for on-the-fly user instructions (2025-05-01)
create table if not exists public.run_otf_instructions (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null,
  run_kind text not null,
  user_id uuid not null,
  content text not null,
  attachments jsonb,
  state text not null,
  created_at timestamptz default now() not null
);

alter table if exists public.run_otf_instructions
  add constraint run_otf_instructions_user_id_fkey
    foreign key (user_id)
    references auth.users(id)
    on delete cascade;