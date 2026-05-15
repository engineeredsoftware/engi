with migration_state as (
  select exists (
    select 1
    from supabase_migrations.schema_migrations
    where version = '20260515143000'
  ) as migration_applied
),
range_columns as (
  select
    count(*) filter (where column_name = 'read_id') as read_column_count,
    count(*) filter (where column_name = concat('ne', 'ed_id')) as retired_column_count
  from information_schema.columns
  where table_schema = 'public'
    and table_name = 'btd_asset_pack_ranges'
    and column_name in ('read_id', concat('ne', 'ed_id'))
),
journal_constraint as (
  select
    pg_get_constraintdef(oid) as definition
  from pg_constraint
  where conrelid = 'public.btd_terminal_journal_entries'::regclass
    and conname = 'btd_terminal_journal_kind'
),
journal_rows as (
  select
    count(*) filter (where transaction_kind = 'read_submission') as read_submission_rows,
    count(*) filter (where transaction_kind = concat('ne', 'ed_submission')) as retired_submission_rows
  from public.btd_terminal_journal_entries
)
select
  migration_state.migration_applied,
  range_columns.read_column_count = 1 as range_read_column_present,
  range_columns.retired_column_count = 0 as retired_range_column_absent,
  journal_constraint.definition like '%read_submission%' as journal_accepts_read_submission,
  journal_constraint.definition not like concat('%', 'ne', 'ed_submission', '%') as journal_rejects_retired_submission,
  journal_rows.read_submission_rows,
  journal_rows.retired_submission_rows,
  case
    when migration_state.migration_applied
      and range_columns.read_column_count = 1
      and range_columns.retired_column_count = 0
      and journal_constraint.definition like '%read_submission%'
      and journal_constraint.definition not like concat('%', 'ne', 'ed_submission', '%')
      and journal_rows.retired_submission_rows = 0
      then 'v28_deposit_read_data_contract_closed'
    else 'blocking:v28_deposit_read_data_contract_not_closed'
  end as data_contract_state
from migration_state
cross join range_columns
cross join journal_constraint
cross join journal_rows;
