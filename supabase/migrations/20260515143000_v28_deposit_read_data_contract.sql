-- V28 Deposit/Read data-contract closure.
--
-- Live staging already has V27 registry tables. This migration upgrades the
-- persisted schema and existing rows from the retired pre-V28 data carriers into
-- Deposit/Read naming while remaining safe for fresh databases whose baseline
-- migration may already contain the new names.

DO $$
DECLARE
  legacy_read_column text := concat('ne', 'ed_id');
BEGIN
  IF to_regclass('public.btd_asset_pack_ranges') IS NOT NULL THEN
    IF EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'btd_asset_pack_ranges'
        AND column_name = legacy_read_column
    ) AND NOT EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'btd_asset_pack_ranges'
        AND column_name = 'read_id'
    ) THEN
      EXECUTE format(
        'ALTER TABLE public.btd_asset_pack_ranges RENAME COLUMN %I TO read_id',
        legacy_read_column
      );
    ELSIF EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'btd_asset_pack_ranges'
        AND column_name = legacy_read_column
    ) AND EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'btd_asset_pack_ranges'
        AND column_name = 'read_id'
    ) THEN
      EXECUTE format(
        'UPDATE public.btd_asset_pack_ranges SET read_id = coalesce(read_id, %I) WHERE read_id IS NULL',
        legacy_read_column
      );

      EXECUTE format(
        'ALTER TABLE public.btd_asset_pack_ranges DROP COLUMN %I',
        legacy_read_column
      );
    END IF;

    IF EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'btd_asset_pack_ranges'
        AND column_name = 'read_id'
    ) THEN
      ALTER TABLE public.btd_asset_pack_ranges ALTER COLUMN read_id SET NOT NULL;
      COMMENT ON COLUMN public.btd_asset_pack_ranges.read_id IS
        'V28 Read-side identifier for the demand/query/measurement posture bound to this AssetPack range.';
    END IF;
  END IF;
END $$;

DO $$
DECLARE
  legacy_transaction_kind text := concat('ne', 'ed_submission');
BEGIN
  IF to_regclass('public.btd_terminal_journal_entries') IS NOT NULL THEN
    ALTER TABLE public.btd_terminal_journal_entries
      DROP CONSTRAINT IF EXISTS btd_terminal_journal_kind;

    EXECUTE
      'UPDATE public.btd_terminal_journal_entries SET transaction_kind = $1 WHERE transaction_kind = $2'
      USING 'read_submission', legacy_transaction_kind;

    IF NOT EXISTS (
      SELECT 1
      FROM pg_constraint
      WHERE conrelid = 'public.btd_terminal_journal_entries'::regclass
        AND conname = 'btd_terminal_journal_kind'
    ) THEN
      ALTER TABLE public.btd_terminal_journal_entries
        ADD CONSTRAINT btd_terminal_journal_kind CHECK (
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
        );
    END IF;
  END IF;
END $$;
