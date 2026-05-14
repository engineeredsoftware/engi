-- Saved query name: v28_qa_staging_hard_reset
-- Purpose: destructive staging-only reset for early V28 QA.
-- Do not run against production. This preserves schema/migrations and removes
-- Supabase Auth users plus Bitcode-owned public projection rows.

begin;

delete from auth.users;

do $$
declare
  truncate_sql text;
begin
  select
    'truncate table ' ||
    string_agg(format('%I.%I', table_schema, table_name), ', ' order by table_name) ||
    ' restart identity cascade'
  into truncate_sql
  from information_schema.tables
  where table_schema = 'public'
    and table_type = 'BASE TABLE'
    and table_name <> 'spatial_ref_sys';

  if truncate_sql is not null then
    execute truncate_sql;
  end if;
end $$;

insert into public.btd_supply_state (id)
values ('global')
on conflict (id) do nothing;

commit;
