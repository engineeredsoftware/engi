# Bitcode Spec V45 Delta

## Status

- Version: `V45`
- V45 state: formal draft delta consolidated from accepted V45 notes atoms; V44 remains active canon until V45 promotion
- Current canonical/latest target: `V44`
- Prior canonical anchor: `BITCODE_SPEC_V44.md`
- Prior generated proof appendix: `BITCODE_SPEC_V44_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v45-spec-family-report.json`, draft `.bitcode/v45-canonical-input-report.json`, V45 proof-family artifacts, `.bitcode/v45-source-safe-e2e-rehearsal.json`, `.bitcode/v45-promotion-readiness-report.json`, V45 notes atom checkers, V45 formal-spec consolidation checker, `v45-canon-promotion.yml`, and draft `BITCODE_SPEC_V45_PROVEN.md`
- Source parity state: V45 delta records formal protocol-law changes only; implementation parity is pending the next gate and V44 source remains active canon
- Notes companion: `BITCODE_SPEC_V45_NOTES.md`
- Spec companion: `BITCODE_SPEC_V45.md`
- Parity companion: `BITCODE_SPEC_V45_PARITY_MATRIX.md`
- Scope: V45 draft delta from V44 scaled engineering economy to formal knowledge commoditization protocol precision
- Last fully realized canonical target preserved in source: `V44`

## Why V45 exists

V44 made the scaled engineering economy operable. V45 exists to make the
underlying market law precise enough for public protocol comprehension and
implementation parity: Bitcode as knowledge commoditization, AssetPack as the
commodity, BTD as Need-relative scalar knowledge-volume and settled rights, BTC
as settlement money, source-safe interface disclosure, proof-backed state
readback, and gate taxonomy.

## Accepted V45 decisions

- Bitcode is the knowledge commoditization protocol and commercial system.
- AssetPack is the traded commodity; raw source and raw inference artifacts are
  not the commodity.
- Deposit-time measurements may show BTD potential, but final BTD size is
  Need-relative and requires reviewed Need, selected Fit set, synthesized
  Need-Fit AssetPack, deterministic weights, dedupe, and proof roots.
- Settled BTD carries rights, source unlock authority, ownership boundaries,
  and source-to-shares allocation context.
- BTC quote, payment observation, finality, settlement, rights transfer,
  source unlock, delivery, and compensation are distinct states.
- Interfaces are protocol windows; proof-backed readback advances state.
- Notes atoms precede formal specification, formal specification precedes
  parity audit, parity audit precedes grouped implementation, and promotion
  alone may update `BITCODE_SPEC.txt`.

## Explicitly deferred

- Implementation parity audit is deferred to the next V45 gate.
- Grouped implementation changes are deferred until accepted parity gaps exist.
- Proof-only, interface-only, rehearsal, and promotion gates are deferred until
  their owning parity rows and readiness conditions are closed.
- Value-bearing mainnet operation remains deferred.
- `BITCODE_SPEC.txt` remains `V44` until V45 promotion workflow validation.

## Pre-Implementation Sequence

1. Accept notes-specification atoms for protocol identity, AssetPack lifecycle,
   BTD scalar-volume, BTC settlement, interface authority, proof readback, and
   gate taxonomy.
2. Consolidate the formal V45 specification family.
3. Audit implementation parity from `BITCODE_SPEC_V45.md`.
4. Group implementation gates by parity gaps.
5. Harden proof-only and interface-only rows.
6. Rehearse end-to-end source-safe commercial behavior.
7. Close promotion readiness and promote V45 only through workflow validation.

## Gate 18: V45 Promotion Readiness

Gate 18 closes promotion readiness with
`.bitcode/v45-promotion-readiness-report.json`,
`generate:v45-promotion-readiness`, `check:v45-promotion-readiness`,
`check:v45-gate18`, `v45-canon-promotion.yml`; promotion scripts support V45.
It proves the V45 proof-family artifacts, source-safe rehearsal artifact,
draft `BITCODE_SPEC_V45_PROVEN.md`, workflow posture, source-safety exclusions,
direct-main-push block, and value-bearing mainnet block before allowing V45
promotion. After promotion, the accepted runtime posture is active V45 / draft
V46.

## Commit-Body Direction

V45 commit bodies should name the gate class, protocol law affected, evidence
or validation command, source-safety posture, and whether the change is
specification-only, parity-only, proof-only, interface-only, implementation,
rehearsal, or promotion work.
