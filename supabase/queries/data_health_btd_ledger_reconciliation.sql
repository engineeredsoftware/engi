-- Saved query name: Bitcode Data Health - BTD Ledger Reconciliation
-- Purpose: inspect BTD supply, ranges, anchors, journal coverage, and blocking repairs.

WITH supply AS (
  SELECT *
  FROM public.btd_supply_state
  WHERE id = 'global'
),
range_stats AS (
  SELECT
    count(*)::bigint AS asset_pack_count,
    coalesce(sum(token_count), 0)::bigint AS range_token_count,
    coalesce(max(range_end_exclusive), 0)::bigint AS max_range_end
  FROM public.btd_asset_pack_ranges
),
anchor_stats AS (
  SELECT
    count(*)::bigint AS anchor_count,
    count(*) FILTER (WHERE finality_state = 'confirmed')::bigint AS confirmed_anchor_count,
    count(*) FILTER (WHERE finality_state = 'failed')::bigint AS failed_anchor_count
  FROM public.btd_asset_pack_ledger_anchors
),
journal_stats AS (
  SELECT
    count(*)::bigint AS journal_entry_count,
    coalesce(max(exchange_sequence), 0)::bigint AS max_exchange_sequence
  FROM public.btd_terminal_journal_entries
),
missing_anchors AS (
  SELECT r.asset_pack_id
  FROM public.btd_asset_pack_ranges r
  LEFT JOIN public.btd_asset_pack_ledger_anchors a
    ON a.asset_pack_id = r.asset_pack_id
    AND a.finality_state <> 'failed'
  WHERE a.anchor_id IS NULL
),
missing_journal AS (
  SELECT r.asset_pack_id, r.minted_at_exchange_sequence
  FROM public.btd_asset_pack_ranges r
  LEFT JOIN public.btd_terminal_journal_entries j
    ON j.exchange_sequence = r.minted_at_exchange_sequence
    AND j.transaction_kind IN ('asset_pack_mint', 'measure_mint_tail')
  WHERE j.journal_entry_id IS NULL
),
blocking_repairs AS (
  SELECT repair_id, reconciliation_id, fact_id, repair_kind, issued_at
  FROM public.btd_ledger_database_reconciliation_repairs
  WHERE blocking = true
)
SELECT
  now() AS checked_at,
  supply.max_supply,
  supply.total_minted,
  supply.next_token_id,
  supply.cumulative_admitted_measurement,
  supply.residual_mint_credit,
  supply.curve,
  supply.tail_policy,
  range_stats.asset_pack_count,
  range_stats.range_token_count,
  range_stats.max_range_end,
  anchor_stats.anchor_count,
  anchor_stats.confirmed_anchor_count,
  anchor_stats.failed_anchor_count,
  journal_stats.journal_entry_count,
  journal_stats.max_exchange_sequence,
  (SELECT count(*) FROM missing_anchors)::bigint AS missing_anchor_count,
  (SELECT count(*) FROM missing_journal)::bigint AS missing_journal_count,
  (SELECT count(*) FROM blocking_repairs)::bigint AS blocking_repair_count,
  jsonb_build_object(
    'missing_anchors',
    coalesce((SELECT jsonb_agg(asset_pack_id ORDER BY asset_pack_id) FROM missing_anchors), '[]'::jsonb),
    'missing_journal',
    coalesce((SELECT jsonb_agg(to_jsonb(missing_journal) ORDER BY minted_at_exchange_sequence, asset_pack_id) FROM missing_journal), '[]'::jsonb),
    'blocking_repairs',
    coalesce((SELECT jsonb_agg(to_jsonb(blocking_repairs) ORDER BY issued_at DESC) FROM blocking_repairs), '[]'::jsonb)
  ) AS reconciliation_details
FROM supply
CROSS JOIN range_stats
CROSS JOIN anchor_stats
CROSS JOIN journal_stats;
