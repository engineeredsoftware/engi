# Bitcode Spec V40 Parity Matrix

## Status

- Version: `V40`
- V40 state: draft opened; parity tracks exhaustive commercial application testing work over promoted V39
- Current canonical/latest target: `V39`
- Prior canonical anchor: `BITCODE_SPEC_V39.md`
- Prior generated proof appendix: `BITCODE_SPEC_V39_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v40-spec-family-report.json`, `.bitcode/v40-canonical-input-report.json`, and later V40 testing artifacts
- Source parity state: V40 testing parity is drafted

## Purpose

This matrix records the V40 testing surfaces that must become promotion-grade before V40 can replace V39 as active canon.

## Audit basis

- `BITCODE_SPEC.txt` -> `V39`
- `BITCODE_SPEC_V39.md`
- `BITCODE_SPEC_V39_PROVEN.md`
- `BITCODE_SPEC_V40.md`
- existing package, API, UI, workflow, and demonstration tests

## V40 implementation matrix

| Area | Required V40 result | Source evidence | Judgment |
| --- | --- | --- | --- |
| Draft family | V40 SPEC, DELTA, NOTES, and PARITY files exist over active V39 | `BITCODE_SPEC_V40.md` family | drafted |
| Roadmap truth | Roadmap states V39 active, V40 draft, V41 prompt-program future | `SPECIFICATIONS_ROADMAP.md` | drafted |
| Gate workflow | Gate quality knows active V39 and draft V40 | `.github/workflows/bitcode-gate-quality.yml` | drafted |
| Canon workflow | Canon quality knows active V39 and draft V40 | `.github/workflows/bitcode-canon-quality.yml` | drafted |
| Browser E2E | Critical website flows have browser proof | future V40 artifacts | not yet implemented |
| Visual proof | Screenshot comparisons are deterministic and reviewable | future V40 artifacts | not yet implemented |
| API integration | Route and API contracts are parseable and source-safe | future V40 artifacts | not yet implemented |
| Pipeline integration | Primitive and real Reading pipeline implementations are tested | future V40 artifacts | not yet implemented |
| Unit coverage | Packages, primitives, isolated implementations, and real implementations have unit coverage | future V40 artifacts | not yet implemented |
| Prompt benchmark smoke | Prompt and PromptPart benchmarks run before V41 | future V40 artifacts | not yet implemented |

## V40 implementation checklist

| Area | Closure requirement | Judgment |
| --- | --- | --- |
| Gate 1 | Open V40 family and check script | drafted |
| Gate 2 | Test inventory artifact and coverage matrix | not yet implemented |
| Gate 3 | Unit coverage closure artifact | not yet implemented |
| Gate 4 | API/route integration artifact | not yet implemented |
| Gate 5 | Reading pipeline integration artifact | not yet implemented |
| Gate 6 | Conversation/Terminal integration artifact | not yet implemented |
| Gate 7 | Browser/visual/accessibility/responsive artifact | not yet implemented |
| Gate 8 | Ledger/database/storage/wallet/delivery sync artifact | not yet implemented |
| Gate 9 | Local/staging rehearsal artifact | not yet implemented |
| Gate 10 | Prompt benchmark smoke and V41 readiness artifact | not yet implemented |
| Gate 11 | Promotion readiness artifact and workflow | not yet implemented |

## V40 accepted boundaries

V40 may refactor test architecture, fixtures, generated artifacts, workflows, and documentation to make commercial quality greenable.
V40 must not rewrite prompt content as its main work; V41 owns prompt excellence.

## V40 completion condition

V40 closes when exhaustive testing is implemented, documented, generated, and greenable across the commercial product, packages, interfaces, pipelines, state synchronization, local/staging rehearsal, and promotion workflow.
