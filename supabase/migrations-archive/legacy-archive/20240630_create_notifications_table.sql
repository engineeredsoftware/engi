-- Notifications system scaffold – safe to run multiple times
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  type text not null,
  channel text not null,
  payload jsonb not null,
  read_at timestamptz,
  created_at timestamptz default now() not null
);

create index if not exists notifications_user_unread_idx on public.notifications (user_id) where read_at is null;

-- Add to Supabase realtime publication (if not already present)
alter publication supabase_realtime add table public.notifications;
