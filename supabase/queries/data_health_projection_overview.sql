-- Saved query name: Bitcode Data Health - Projection Overview
-- Purpose: inspect canonical projection tables, RLS posture, and estimated row counts.

WITH required(table_name) AS (
  VALUES
    ('user_profiles'),
    ('user_connections'),
    ('vcs_repositories'),
    ('notifications'),
    ('pipeline_runs'),
    ('deliverables'),
    ('deliverable_vectors'),
    ('error_logs'),
    ('events'),
    ('btd_supply_state'),
    ('btd_semantic_volume_measurements'),
    ('btd_measure_mint_receipts'),
    ('btd_asset_pack_ranges'),
    ('btd_cells'),
    ('btd_ownership_events'),
    ('btd_read_licenses'),
    ('btd_mint_receipts'),
    ('btd_contributor_allocations'),
    ('btd_ancestor_edges'),
    ('btd_licensed_read_revenue_routes'),
    ('btc_fee_transactions'),
    ('btd_asset_pack_ledger_anchors'),
    ('btd_exchange_orders'),
    ('btd_rights_transfer_receipts'),
    ('btd_terminal_journal_entries'),
    ('btd_ledger_database_reconciliation_repairs'),
    ('btd_protocol_upgrade_receipts'),
    ('btd_crypto_telemetry_events')
),
catalog AS (
  SELECT
    c.relname AS table_name,
    c.relrowsecurity AS rls_enabled,
    greatest(c.reltuples::bigint, 0) AS estimated_rows
  FROM pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = 'public'
    AND c.relkind IN ('r', 'p')
)
SELECT
  required.table_name,
  catalog.table_name IS NOT NULL AS present,
  coalesce(catalog.rls_enabled, false) AS rls_enabled,
  catalog.estimated_rows
FROM required
LEFT JOIN catalog USING (table_name)
ORDER BY required.table_name;
