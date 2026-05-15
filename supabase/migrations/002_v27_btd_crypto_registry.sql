-- V27 BTD registry and cryptographic receipt projection tables.
-- Ledgers remain the source of truth for cryptographic finality; these tables
-- are ledger/journal-derived projections plus Bitcode-canonical private facts.

CREATE TABLE IF NOT EXISTS public.btd_supply_state (
  id text PRIMARY KEY DEFAULT 'global',
  max_supply integer NOT NULL DEFAULT 21000000,
  total_minted integer NOT NULL DEFAULT 0,
  next_token_id integer NOT NULL DEFAULT 0,
  cumulative_admitted_measurement numeric(38, 0) NOT NULL DEFAULT 0,
  residual_mint_credit numeric(38, 0) NOT NULL DEFAULT 0,
  curve text NOT NULL DEFAULT 'hyperbolic_saturation',
  curve_parameter numeric(38, 0) NOT NULL DEFAULT 21000000,
  tail_policy text NOT NULL DEFAULT 'zero_cell_receipt_then_refit_only',
  exhausted_at_exchange_sequence bigint,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT btd_supply_state_singleton CHECK (id = 'global'),
  CONSTRAINT btd_supply_state_max_supply CHECK (max_supply = 21000000),
  CONSTRAINT btd_supply_state_total_non_negative CHECK (total_minted >= 0),
  CONSTRAINT btd_supply_state_cap CHECK (total_minted <= max_supply),
  CONSTRAINT btd_supply_state_contiguous CHECK (next_token_id = total_minted),
  CONSTRAINT btd_supply_state_cumulative_measurement CHECK (cumulative_admitted_measurement >= 0),
  CONSTRAINT btd_supply_state_residual CHECK (residual_mint_credit >= 0),
  CONSTRAINT btd_supply_state_curve CHECK (curve = 'hyperbolic_saturation'),
  CONSTRAINT btd_supply_state_curve_parameter CHECK (curve_parameter > 0),
  CONSTRAINT btd_supply_state_tail_policy CHECK (tail_policy = 'zero_cell_receipt_then_refit_only')
);

INSERT INTO public.btd_supply_state (id)
VALUES ('global')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.btd_semantic_volume_measurements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  measurement_id text NOT NULL UNIQUE,
  asset_pack_id text NOT NULL,
  normalized_bitcode_volume numeric(38, 0) NOT NULL,
  token_count integer NOT NULL,
  quantization numeric(38, 0) NOT NULL DEFAULT 1000,
  included_units jsonb NOT NULL DEFAULT '[]'::jsonb,
  excluded_units jsonb NOT NULL DEFAULT '[]'::jsonb,
  issued_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT btd_semantic_volume_positive CHECK (normalized_bitcode_volume >= 0),
  CONSTRAINT btd_semantic_volume_token_count CHECK (token_count >= 0)
);

CREATE TABLE IF NOT EXISTS public.btd_measure_mint_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_id text NOT NULL UNIQUE,
  asset_pack_id text NOT NULL,
  normalized_bitcode_volume numeric(38, 0) NOT NULL,
  cumulative_measurement_before numeric(38, 0) NOT NULL,
  cumulative_measurement_after numeric(38, 0) NOT NULL,
  target_minted_before integer NOT NULL,
  target_minted_after integer NOT NULL,
  residual_mint_credit_before numeric(38, 0) NOT NULL,
  residual_mint_credit_after numeric(38, 0) NOT NULL,
  token_count integer NOT NULL,
  range_start integer,
  range_end_exclusive integer,
  zero_cell_reason text,
  total_minted_before integer NOT NULL,
  total_minted_after integer NOT NULL,
  max_supply integer NOT NULL DEFAULT 21000000,
  proof_root text NOT NULL,
  settlement_journal_root text NOT NULL,
  access_policy_hash text NOT NULL,
  exchange_sequence bigint NOT NULL,
  receipt jsonb NOT NULL,
  issued_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT btd_measure_mint_max_supply CHECK (max_supply = 21000000),
  CONSTRAINT btd_measure_mint_volume CHECK (normalized_bitcode_volume > 0),
  CONSTRAINT btd_measure_mint_cumulative CHECK (cumulative_measurement_after > cumulative_measurement_before),
  CONSTRAINT btd_measure_mint_token_count CHECK (token_count >= 0),
  CONSTRAINT btd_measure_mint_total CHECK (total_minted_after = total_minted_before + token_count),
  CONSTRAINT btd_measure_mint_cap CHECK (total_minted_after <= max_supply),
  CONSTRAINT btd_measure_mint_zero_cell_reason CHECK (
    (token_count > 0 AND zero_cell_reason IS NULL AND range_start IS NOT NULL AND range_end_exclusive IS NOT NULL)
    OR
    (token_count = 0 AND zero_cell_reason IN ('below_integer_threshold', 'tail_exhausted', 'refit_only_policy'))
  )
);

CREATE TABLE IF NOT EXISTS public.btd_asset_pack_ranges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_pack_id text NOT NULL UNIQUE,
  range_start integer NOT NULL,
  range_end_exclusive integer NOT NULL,
  token_count integer NOT NULL,
  normalized_bitcode_volume numeric(38, 0) NOT NULL,
  read_id text NOT NULL,
  source_manifest_root text NOT NULL,
  measurement_receipt_root text NOT NULL,
  fit_receipt_root text NOT NULL,
  proof_root text NOT NULL,
  dedupe_receipt_root text NOT NULL,
  settlement_journal_root text NOT NULL,
  exchange_receipt_root text NOT NULL,
  access_policy_id text NOT NULL,
  access_policy_hash text NOT NULL,
  minted_at_exchange_sequence bigint NOT NULL,
  issued_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT btd_asset_pack_ranges_start CHECK (range_start >= 0),
  CONSTRAINT btd_asset_pack_ranges_non_empty CHECK (range_end_exclusive > range_start),
  CONSTRAINT btd_asset_pack_ranges_count CHECK (token_count = range_end_exclusive - range_start),
  CONSTRAINT btd_asset_pack_ranges_cap CHECK (range_end_exclusive <= 21000000),
  CONSTRAINT btd_asset_pack_ranges_policy CHECK (
    length(trim(access_policy_id)) > 0 AND length(trim(access_policy_hash)) > 0
  )
);

ALTER TABLE public.btd_asset_pack_ranges
  ADD CONSTRAINT btd_asset_pack_ranges_no_overlap
  EXCLUDE USING gist (int4range(range_start, range_end_exclusive, '[)') WITH &&);

CREATE TABLE IF NOT EXISTS public.btd_cells (
  token_id integer PRIMARY KEY,
  asset_pack_id text NOT NULL REFERENCES public.btd_asset_pack_ranges(asset_pack_id) ON DELETE RESTRICT,
  source_measurement_id text NOT NULL,
  source_manifest_root text NOT NULL,
  measurement_receipt_root text NOT NULL,
  proof_root text NOT NULL,
  exchange_receipt_root text NOT NULL,
  access_policy_id text NOT NULL,
  access_policy_hash text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT btd_cells_token_id CHECK (token_id >= 0 AND token_id < 21000000),
  CONSTRAINT btd_cells_policy CHECK (
    length(trim(access_policy_id)) > 0 AND length(trim(access_policy_hash)) > 0
  )
);

CREATE TABLE IF NOT EXISTS public.btd_ownership_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ownership_event_id text NOT NULL UNIQUE,
  asset_pack_id text NOT NULL REFERENCES public.btd_asset_pack_ranges(asset_pack_id) ON DELETE RESTRICT,
  range_start integer NOT NULL,
  range_end_exclusive integer NOT NULL,
  from_wallet_id text,
  to_wallet_id text NOT NULL,
  event_kind text NOT NULL,
  source_receipt_id text NOT NULL,
  access_policy_hash text NOT NULL,
  ledger_anchor_id text,
  exchange_sequence bigint NOT NULL,
  receipt jsonb NOT NULL,
  issued_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT btd_ownership_events_non_empty CHECK (range_end_exclusive > range_start),
  CONSTRAINT btd_ownership_events_cap CHECK (range_start >= 0 AND range_end_exclusive <= 21000000),
  CONSTRAINT btd_ownership_events_policy CHECK (length(trim(access_policy_hash)) > 0),
  CONSTRAINT btd_ownership_events_kind CHECK (event_kind IN ('mint_allocation', 'rights_transfer', 'reconciliation_repair'))
);

CREATE TABLE IF NOT EXISTS public.btd_read_licenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id text NOT NULL UNIQUE,
  asset_pack_id text NOT NULL REFERENCES public.btd_asset_pack_ranges(asset_pack_id) ON DELETE RESTRICT,
  wallet_id text NOT NULL,
  access_policy_hash text NOT NULL,
  valid_from timestamp with time zone NOT NULL,
  expires_at timestamp with time zone,
  source_receipt_id text NOT NULL,
  payment_id text,
  receipt jsonb NOT NULL,
  issued_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT btd_read_licenses_window CHECK (expires_at IS NULL OR expires_at > valid_from),
  CONSTRAINT btd_read_licenses_policy CHECK (length(trim(access_policy_hash)) > 0)
);

CREATE TABLE IF NOT EXISTS public.btd_mint_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_id text NOT NULL UNIQUE,
  asset_pack_id text NOT NULL REFERENCES public.btd_asset_pack_ranges(asset_pack_id) ON DELETE RESTRICT,
  receipt jsonb NOT NULL,
  issued_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.btd_contributor_allocations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  allocation_id text NOT NULL UNIQUE,
  asset_pack_id text NOT NULL REFERENCES public.btd_asset_pack_ranges(asset_pack_id) ON DELETE RESTRICT,
  range_start integer NOT NULL,
  range_end_exclusive integer NOT NULL,
  token_count integer NOT NULL,
  allocation_method text NOT NULL DEFAULT 'hare_niemeyer_weighted_fit',
  allocations jsonb NOT NULL,
  receipt jsonb NOT NULL,
  issued_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT btd_contributor_allocations_non_empty CHECK (range_end_exclusive > range_start),
  CONSTRAINT btd_contributor_allocations_count CHECK (token_count = range_end_exclusive - range_start),
  CONSTRAINT btd_contributor_allocations_method CHECK (allocation_method = 'hare_niemeyer_weighted_fit')
);

CREATE TABLE IF NOT EXISTS public.btd_ancestor_edges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  edge_id text NOT NULL UNIQUE,
  review_id text NOT NULL,
  parent_asset_pack_id text NOT NULL,
  child_asset_pack_id text NOT NULL,
  edge_kind text NOT NULL,
  evidence_root text NOT NULL,
  source_fingerprint_root text,
  reviewer_receipt_root text,
  claimant_id text,
  reviewer_id text,
  confidence_bps integer NOT NULL,
  timelessness_bps integer NOT NULL,
  depth integer NOT NULL,
  status text NOT NULL,
  rejection_reason text,
  risk_flags jsonb NOT NULL DEFAULT '[]'::jsonb,
  route_weight numeric(38, 0) NOT NULL DEFAULT 0,
  created_after_child_fit boolean NOT NULL DEFAULT true,
  conflict_disclosure jsonb NOT NULL DEFAULT '[]'::jsonb,
  supply_effect text NOT NULL DEFAULT 'none',
  mint_count_delta integer NOT NULL DEFAULT 0,
  receipt jsonb NOT NULL,
  issued_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT btd_ancestor_edges_not_self CHECK (
    status = 'rejected' OR parent_asset_pack_id <> child_asset_pack_id
  ),
  CONSTRAINT btd_ancestor_edges_kind CHECK (edge_kind IN (
    'implementation_dependency',
    'proof_dependency',
    'source_reuse',
    'conceptual_dependency',
    'teaching_dependency',
    'citation_only'
  )),
  CONSTRAINT btd_ancestor_edges_bps CHECK (
    confidence_bps >= 0 AND confidence_bps <= 10000
    AND timelessness_bps >= 0 AND timelessness_bps <= 10000
  ),
  CONSTRAINT btd_ancestor_edges_depth CHECK (depth >= 0),
  CONSTRAINT btd_ancestor_edges_status CHECK (status IN ('payable', 'recorded_unpaid', 'rejected')),
  CONSTRAINT btd_ancestor_edges_late_bound CHECK (
    status = 'rejected' OR created_after_child_fit = true
  ),
  CONSTRAINT btd_ancestor_edges_non_supply CHECK (
    supply_effect = 'none' AND mint_count_delta = 0
  ),
  CONSTRAINT btd_ancestor_edges_route_weight_status CHECK (
    (status = 'payable' AND route_weight > 0)
    OR (status <> 'payable' AND route_weight = 0)
  ),
  CONSTRAINT btd_ancestor_edges_reviewer_conflict CHECK (
    status = 'rejected'
    OR claimant_id IS NULL
    OR reviewer_id IS NULL
    OR claimant_id <> reviewer_id
  )
);

CREATE TABLE IF NOT EXISTS public.btd_licensed_read_revenue_routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id text NOT NULL UNIQUE,
  asset_pack_id text NOT NULL,
  price_asset text NOT NULL DEFAULT 'BTC',
  gross_sats numeric(38, 0) NOT NULL,
  direct_sats numeric(38, 0) NOT NULL,
  ancestor_sats numeric(38, 0) NOT NULL,
  treasury_sats numeric(38, 0) NOT NULL,
  dispute_holdback_sats numeric(38, 0) NOT NULL DEFAULT 0,
  direct_routes jsonb NOT NULL DEFAULT '[]'::jsonb,
  ancestor_routes jsonb NOT NULL DEFAULT '[]'::jsonb,
  treasury_routes jsonb NOT NULL DEFAULT '[]'::jsonb,
  treasury_wallet_id text NOT NULL,
  dispute_holdback_wallet_id text,
  pending_routes jsonb NOT NULL DEFAULT '[]'::jsonb,
  failed_routes jsonb NOT NULL DEFAULT '[]'::jsonb,
  route_state text NOT NULL DEFAULT 'settled',
  exchange_sequence bigint NOT NULL,
  receipt jsonb NOT NULL,
  issued_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT btd_revenue_route_price_asset CHECK (price_asset = 'BTC'),
  CONSTRAINT btd_revenue_route_positive CHECK (gross_sats > 0),
  CONSTRAINT btd_revenue_route_non_negative CHECK (
    direct_sats >= 0 AND ancestor_sats >= 0 AND treasury_sats >= 0 AND dispute_holdback_sats >= 0
  ),
  CONSTRAINT btd_revenue_route_conserved CHECK (
    gross_sats = direct_sats + ancestor_sats + treasury_sats + dispute_holdback_sats
  ),
  CONSTRAINT btd_revenue_route_holdback_wallet CHECK (
    dispute_holdback_sats = 0 OR length(trim(coalesce(dispute_holdback_wallet_id, ''))) > 0
  ),
  CONSTRAINT btd_revenue_route_state CHECK (route_state IN ('settled', 'pending', 'failed'))
);

CREATE TABLE IF NOT EXISTS public.btc_fee_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_id text NOT NULL UNIQUE,
  fee_purpose text NOT NULL,
  payer_wallet_id text NOT NULL,
  wallet_session_id text NOT NULL,
  network text NOT NULL,
  wallet_authorization_proof jsonb NOT NULL,
  txid text,
  vout integer,
  psbt text,
  sats_paid numeric(38, 0) NOT NULL,
  sats_per_vbyte integer,
  exchange_sequence bigint NOT NULL,
  terminal_journal_root text NOT NULL,
  related_asset_pack_id text,
  related_order_id text,
  finality_state text NOT NULL,
  confirmations integer NOT NULL DEFAULT 0,
  fee_asset text NOT NULL DEFAULT 'BTC',
  server_custody boolean NOT NULL DEFAULT false,
  receipt jsonb NOT NULL,
  issued_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT btc_fee_transactions_network CHECK (network IN ('regtest', 'signet', 'testnet', 'mainnet')),
  CONSTRAINT btc_fee_transactions_asset CHECK (fee_asset = 'BTC'),
  CONSTRAINT btc_fee_transactions_no_custody CHECK (server_custody = false),
  CONSTRAINT btc_fee_transactions_sats CHECK (sats_paid > 0),
  CONSTRAINT btc_fee_transactions_confirmations CHECK (confirmations >= 0),
  CONSTRAINT btc_fee_transactions_state CHECK (finality_state IN ('prepared', 'signed', 'broadcast', 'confirmed', 'replaced', 'reorged', 'failed'))
);

CREATE TABLE IF NOT EXISTS public.btd_asset_pack_ledger_anchors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  anchor_id text NOT NULL UNIQUE,
  asset_pack_id text NOT NULL,
  chain text NOT NULL,
  network text NOT NULL,
  txid_or_hash text,
  output_index integer,
  contract_address text,
  token_id text,
  commitment_method text,
  commitment_root text NOT NULL,
  source_manifest_root text NOT NULL,
  proof_root text NOT NULL,
  access_policy_hash text NOT NULL,
  btd_range_start integer NOT NULL,
  btd_range_end_exclusive integer NOT NULL,
  finality_state text NOT NULL,
  confirmations integer NOT NULL DEFAULT 0,
  receipt jsonb NOT NULL,
  issued_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT btd_asset_pack_ledger_anchors_chain CHECK (chain IN ('bitcoin', 'ethereum', 'bitcode-internal-ledger')),
  CONSTRAINT btd_asset_pack_ledger_anchors_non_empty CHECK (btd_range_end_exclusive > btd_range_start),
  CONSTRAINT btd_asset_pack_ledger_anchors_cap CHECK (btd_range_start >= 0 AND btd_range_end_exclusive <= 21000000),
  CONSTRAINT btd_asset_pack_ledger_anchors_policy CHECK (length(trim(access_policy_hash)) > 0),
  CONSTRAINT btd_asset_pack_ledger_anchors_method CHECK (
    commitment_method IN ('taproot', 'op_return', 'standard_output_commitment', 'ethereum_registry_event', 'internal_journal')
  ),
  CONSTRAINT btd_asset_pack_ledger_anchors_state CHECK (finality_state IN ('prepared', 'broadcast', 'confirmed', 'reorged', 'failed')),
  CONSTRAINT btd_asset_pack_ledger_anchors_confirmations CHECK (confirmations >= 0)
);

CREATE TABLE IF NOT EXISTS public.btd_exchange_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text NOT NULL UNIQUE,
  order_kind text NOT NULL,
  asset_pack_id text NOT NULL,
  range_start integer NOT NULL,
  range_end_exclusive integer NOT NULL,
  maker_wallet_id text NOT NULL,
  taker_wallet_id text,
  price_asset text NOT NULL DEFAULT 'BTC',
  price_sats numeric(38, 0) NOT NULL,
  access_policy_hash text NOT NULL,
  order_state text NOT NULL,
  created_at_exchange_sequence bigint NOT NULL,
  settled_at_exchange_sequence bigint,
  ledger_anchor_id text,
  receipt jsonb,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT btd_exchange_orders_kind CHECK (order_kind IN ('sell', 'buy', 'bid', 'ask')),
  CONSTRAINT btd_exchange_orders_state CHECK (order_state IN ('open', 'accepted', 'cancelled', 'expired', 'settled', 'failed')),
  CONSTRAINT btd_exchange_orders_price_asset CHECK (price_asset = 'BTC'),
  CONSTRAINT btd_exchange_orders_price CHECK (price_sats > 0),
  CONSTRAINT btd_exchange_orders_non_empty CHECK (range_end_exclusive > range_start),
  CONSTRAINT btd_exchange_orders_cap CHECK (range_start >= 0 AND range_end_exclusive <= 21000000),
  CONSTRAINT btd_exchange_orders_policy CHECK (length(trim(access_policy_hash)) > 0)
);

CREATE TABLE IF NOT EXISTS public.btd_rights_transfer_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_id text NOT NULL UNIQUE,
  order_id text NOT NULL REFERENCES public.btd_exchange_orders(order_id) ON DELETE RESTRICT,
  asset_pack_id text NOT NULL,
  range_start integer NOT NULL,
  range_end_exclusive integer NOT NULL,
  from_wallet_id text NOT NULL,
  to_wallet_id text NOT NULL,
  price_asset text NOT NULL DEFAULT 'BTC',
  price_sats numeric(38, 0) NOT NULL,
  access_policy_hash text NOT NULL,
  btc_fee_receipt_id text NOT NULL,
  ledger_anchor_id text NOT NULL,
  exchange_sequence bigint NOT NULL,
  receipt jsonb NOT NULL,
  issued_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT btd_rights_transfer_non_empty CHECK (range_end_exclusive > range_start),
  CONSTRAINT btd_rights_transfer_cap CHECK (range_start >= 0 AND range_end_exclusive <= 21000000),
  CONSTRAINT btd_rights_transfer_policy CHECK (length(trim(access_policy_hash)) > 0),
  CONSTRAINT btd_rights_transfer_ledger_anchor CHECK (length(trim(ledger_anchor_id)) > 0),
  CONSTRAINT btd_rights_transfer_price_asset CHECK (price_asset = 'BTC'),
  CONSTRAINT btd_rights_transfer_price CHECK (price_sats > 0)
);

CREATE TABLE IF NOT EXISTS public.btd_terminal_journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  journal_entry_id text NOT NULL UNIQUE,
  transaction_kind text NOT NULL,
  actor_id text NOT NULL,
  pre_state_root text NOT NULL,
  post_state_root text NOT NULL,
  receipt_roots jsonb NOT NULL DEFAULT '[]'::jsonb,
  ledger_anchor_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
  exchange_sequence bigint NOT NULL,
  issued_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT btd_terminal_journal_kind CHECK (
    transaction_kind IN (
      'read_submission',
      'fit_closure',
      'proof_admission',
      'asset_pack_mint',
      'measure_mint_tail',
      'btc_fee_payment',
      'asset_pack_anchor',
      'licensed_read_purchase',
      'exchange_order',
      'exchange_order_cancel',
      'rights_transfer',
      'dispute_holdback',
      'settlement_finalization',
      'ledger_database_reconciliation'
    )
  ),
  CONSTRAINT btd_terminal_journal_exchange_sequence CHECK (exchange_sequence > 0)
);

CREATE TABLE IF NOT EXISTS public.btd_ledger_database_reconciliation_repairs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  repair_id text NOT NULL UNIQUE,
  reconciliation_id text NOT NULL,
  fact_id text NOT NULL,
  repair_kind text NOT NULL,
  before_value text NOT NULL,
  after_value text NOT NULL,
  blocking boolean NOT NULL,
  issued_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.btd_protocol_upgrade_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  upgrade_id text NOT NULL UNIQUE,
  from_version text NOT NULL,
  to_version text NOT NULL,
  network text NOT NULL,
  migration_root text NOT NULL,
  pre_state_root text NOT NULL,
  post_state_root text,
  approval_receipt_root text NOT NULL,
  rollback_plan_root text NOT NULL,
  ledger_anchor_id text,
  upgrade_state text NOT NULL,
  receipt jsonb NOT NULL,
  issued_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT btd_protocol_upgrade_network CHECK (network IN ('regtest', 'signet', 'testnet', 'mainnet', 'sepolia', 'holesky', 'local')),
  CONSTRAINT btd_protocol_upgrade_state CHECK (upgrade_state IN ('planned', 'applied', 'verified', 'rolled_back', 'failed')),
  CONSTRAINT btd_protocol_upgrade_post_state CHECK (
    upgrade_state NOT IN ('applied', 'verified') OR post_state_root IS NOT NULL
  )
);

CREATE TABLE IF NOT EXISTS public.btd_crypto_telemetry_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event text NOT NULL,
  severity text NOT NULL,
  subject_id text NOT NULL,
  receipt_root text,
  ledger_anchor_id text,
  issued_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT btd_crypto_telemetry_severity CHECK (severity IN ('info', 'warning', 'critical'))
);

ALTER TABLE public.btd_supply_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.btd_semantic_volume_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.btd_measure_mint_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.btd_asset_pack_ranges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.btd_cells ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.btd_ownership_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.btd_read_licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.btd_mint_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.btd_contributor_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.btd_ancestor_edges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.btd_licensed_read_revenue_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.btc_fee_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.btd_asset_pack_ledger_anchors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.btd_exchange_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.btd_rights_transfer_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.btd_terminal_journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.btd_ledger_database_reconciliation_repairs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.btd_protocol_upgrade_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.btd_crypto_telemetry_events ENABLE ROW LEVEL SECURITY;
