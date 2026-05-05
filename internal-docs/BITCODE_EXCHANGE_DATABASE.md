# Bitcode Exchange Database Notes

Status: non-canonical internal note. Database requirements become canonical only after they are promoted into the active V26 SPEC/proof family.

## Purpose

The database supports Bitcode Exchange and Bitcode Terminal state:
- identity and readiness,
- source connections,
- conversations and attachments,
- executions and event streams,
- Need review state,
- AssetPack outputs,
- proof and settlement receipts,
- BTC fee accounting and non-fungible `$BTD` holding reads,
- notifications and operational health.

## Source Of Truth

- SQL migrations live under `supabase/migrations/`.
- ORM/database types live under `packages/orm/*`.
- Supabase access lives under `packages/supabase/*` and server route owners.
- Application code should import database types rather than re-declare table shapes.

## Current Storage Families

Core V26 families:
- user profile, auth, onboarding, wallet/readiness state,
- user/provider connections and VCS repository cache,
- conversations, messages, and attachments,
- executions, execution events, and phase executions,
- generated assets and postprocessed execution output,
- BTC fee usage, measured `$BTD` amount, and payment idempotency records,
- notifications, events, stream logs, and error logs.

Some physical table names still preserve compatibility vocabulary at the storage boundary. In V26 product language these rows must be read as AssetPack templates, AssetPack results, execution records, or compatibility storage corridors. Canonical SPEC text must not teach those table names as product concepts.

## Exchange State Requirements

The Exchange state model must support:
- immediate reread of Terminal writes,
- one activity ledger for source-to-shares events,
- selected-detail reconstruction of Need, fit, AssetPack, proof, history, and delivery evidence,
- explicit accept/reject/remeasure decisions for measured Needs,
- settlement receipts with quantized fit-quality rows,
- fail-closed write admission when wallet, repository, provider, or accepted-Need readiness is absent.

## Schema Reform Requirements

Remaining database work should prioritize:
- eliminating stale null-key drift,
- naming new columns/tables after Need, AssetPack, fit, settlement, Finish, and Exchange activity,
- keeping compatibility table names hidden behind ORM or route adapters,
- generating proof artifacts that show schema, ORM, route, and UI all describe the same Bitcode state.
