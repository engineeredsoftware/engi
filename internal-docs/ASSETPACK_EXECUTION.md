# Bitcode AssetPack Execution Notes

Status: non-canonical internal note. Canonical requirements live only in `BITCODE_SPEC_V26.md` and its V26 companion proof/specification family after promotion.

## Purpose

AssetPack execution is the retained implementation corridor that turns a measured and accepted Need into source-to-shares outputs.

The operator-facing product meaning is:
- Bitcode Terminal gathers source, repository scope, attachments, and output destination intent.
- Bitcode Exchange measures a Need from that evidence.
- The measured Need is reviewable before fitting.
- Accepted Needs can search for source-to-shares fit.
- Implementation produces AssetPack synthesis artifacts and stored AssetPack evidence.
- Finish saves the result and delivers the V26 Shippable through a GitHub pull request.

## Current Source Carriers

- `uapi/app/executions/*` remains a compatibility execution surface used by the Bitcode Terminal.
- `packages/api/src/routes/shippables.ts` remains the main server execution route while its product meaning is AssetPack execution and PR Shippables.
- `packages/pipelines/asset-pack/*` is the live package path for AssetPack and connected-interface written-asset synthesis; the predecessor package path is no longer an active filesystem owner.
- `packages/execution-generics/*`, `packages/pipelines-generics/*`, `packages/agent-generics/*`, and `packages/prompts/*` provide the reusable execution, registry, and prompt substrate.

Storage-edge compatibility names are not product vocabulary. Any later SPEC promotion should describe the product as Bitcode Need measurement, fit review, AssetPack synthesis, Finish, and delivery mechanisms.

## Product Flow

1. Source anchoring binds provider, repository, branch, commit, attachments, and operator intent.
2. Need measurement synthesizes a reviewable Need from source evidence.
3. Need review emits accept, reject, or remeasure-with-feedback state before fitting is admitted.
4. Fit search ranks candidates with quantized objective qualities visible at review time.
5. AssetPack synthesis produces code diffs, written assets, proofs, receipts, and settlement metadata.
6. Finish saves the AssetPack result and calls delivery-mechanism tools only after validation.
7. Terminal and Exchange history reread the same execution, proof, and settlement state.

## V26 Boundaries

- Removed orchestration and output-selection operator controls are cut from the live V26 path.
- Computer use is not an operator-facing Terminal option in V26.
- `BITCODE_ENABLE_COMPUTER_USE_NEED_MEASUREMENT` is the only admitted computer-use flag, and it is internal server-side evidence support for Need measurement.
- Broad computer-using agents are deferred beyond V26.
- Physical storage names survive only at storage boundaries until migrations are fully renamed or removed; package filesystem ownership is already `asset-pack`.

## SPEC Promotion Obligations

When these notes are lifted into canonical specification, the SPEC must state:
- AssetPacks are the stable output unit.
- Delivery mechanisms are wrappers over stable AssetPacks, not the stable product object.
- Need review is mandatory before fit search.
- Fit-quality receipts shown at present-fit-for-settlement-review time must be persisted into settlement evidence.
- Finish is the canonical final SDIVF phase.
- All retained compatibility names must either be renamed, cut, or explicitly bounded by proof.
