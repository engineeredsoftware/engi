# Bitcode Spec V42 Notes

## Status

- Version: `V42`
- V42 state: draft opened; notes track reliable MVP experience planning over active V41
- Current canonical/latest target: `V41`
- Prior canonical anchor: `BITCODE_SPEC_V41.md`
- Prior generated proof appendix: `BITCODE_SPEC_V41_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v42-spec-family-report.json`, `.bitcode/v42-canonical-input-report.json`, `.bitcode/v42-canon-posture-drift-report.json`, and later V42 gate artifacts
- Source parity state: notes are source-facing planning until later gates implement and prove product behavior
- Scope: V42 notes for reliable MVP product experience

## Notes companion rule

This notes companion records the working V42 product plan and simplified reading.
It does not override `BITCODE_SPEC_V42.md`.
Product behavior changes remain blocked until the relevant V42 gate admits and verifies them.

## V42 Gate 1 opening note

Gate 1 is intentionally specification, documentation, workflow, and checker posture only.
It opens the reliable MVP experience version after V41 prompt-program promotion and prepares later gates to implement Depositing, Reading, settlement, delivery, and demonstration behavior without ad hoc scope drift.

## Depositing shortest-path note

The V42 Depositing path should minimize the journey from source material to Depository admission proof.
The user needs to know that the source is admitted, searchable for future Need-Fit work, and eligible for BTC compensation if it contributes to a synthesized AssetPack.
The UX can stay simple, but expandable details must show source authority, admission proof, storage projection, search-document posture, compensation route, and repair state.

## Reading shortest-path note

The V42 Reading path should be a five-step enterprise flow:

1. request read;
2. review synthesized Need;
3. request Finding Fits;
4. review source-safe AssetPack measurements and preview metadata;
5. buy, settle, transfer rights, and receive repository delivery.

The default UI should be guided and low-detail.
The rich execution log, proof roots, telemetry rows, and ledger/storage details remain available on expansion.

## AssetPack source-safety note

V42 must make the preview valuable without leaking the source-bearing AssetPack before settlement.
Readers may see measurements, fit confidence, quote posture, selected-fit provenance summaries, proof roots, and source-safe explanations.
They may not see protected source, raw provider responses, protected prompts, private settlement payloads, wallet private material, or unpaid AssetPack source before BTC settlement and BTD rights transfer.

## AI-reading demonstration note

The standalone demonstration should prove why Bitcode matters for AI-dominant Reading.
A deposited proprietary or otherwise non-public technical intelligence source should contribute to an AssetPack that measurably improves an AI system's training, prompt/context, or evaluation result beyond what a public-data-only baseline can do.
The demonstration must remain minimal, local, deterministic where feasible, and self-contained inside `protocol-demonstration/`.

## V43+ agentic depositing roadmap note

V43 or a later explicitly opened version should evolve the deposit side into an agentic AssetPack option experience for enterprises.
Repository-installed Bitcode Agents should compare a connected enterprise codebase, the current Bitcode Depository, and Reading activity to propose deposit AssetPack options.
Those options should be source-safe, sub-critical, likely positive ROI, and approve/rejectable before Depository admission.
That later version should split `/terminal` into `/read` and `/deposit`, and rename `/exchange` to `/packs` across routes, code naming, docs, and operator vocabulary.

## Concise current-system reading

Bitcode is active at V41.
V42 drafts the next canon: the reliable MVP experience for enterprise Depositing and Reading.
The central product promise is that a user can deposit source, request a read, review a synthesized Need, find fitting Depository sources, preview a source-safe AssetPack, pay in BTC/BTD settlement terms, receive rights, and get repository delivery.

## Simplified-spec reading rule

Read V42 as shortest credible paths over existing protocol law.
If a product step cannot be routed, stored, replayed, telemetered, proven, and source-safely explained, it is not V42-ready.

## Non-goals during V42 opening

- Do not implement product behavior in Gate 1.
- Do not split `/terminal` or rename `/exchange`.
- Do not expose protected source or unpaid AssetPack source.
- Do not bypass Need review before Finding Fits.
- Do not claim settlement, BTD rights transfer, or repository delivery without synchronized ledger/database/storage proof.
