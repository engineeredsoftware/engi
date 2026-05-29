# Bitcode Spec V43 Parity Matrix

## Status

- Version: `V43`
- V43 state: draft parity matrix opened over active V42
- Current canonical/latest target: `V42`
- Prior canonical anchor: `BITCODE_SPEC_V42.md`
- Prior generated proof appendix: `BITCODE_SPEC_V42_PROVEN.md`
- Generated structured artifact inventory: `.bitcode/v43-spec-family-report.json`, `.bitcode/v43-canonical-input-report.json`, and future V43 gate artifacts
- Source parity state: V43 Gate 1 parity is documentation/workflow posture; implementation parity is pending

## Purpose

This matrix tracks V43 parity from product-route specification through source implementation, tests, generated artifacts, and promotion readiness.

## Audit basis

Audit V43 against `BITCODE_SPEC_V43.md`, V42 active canon, route source, package source, generated artifacts, workflow checks, and local/staging rehearsal receipts.

## V43 implementation matrix

| Area | Required V43 result | Source evidence | Judgment |
| --- | --- | --- | --- |
| Gate 1 roadmap | Active V42 / draft V43 posture, route vocabulary, gate plan, docs, checker, workflows | `BITCODE_SPEC_V43.md`, `scripts/check-v43-gate1-packs-read-deposit-roadmap.mjs` | drafted |
| Route vocabulary | `/exchange` renamed to `/packs`; `/terminal` split into `/read` and `/deposit` default paths | future Gate 2 artifact | draft-required |
| Packs master-detail | Searchable, sortable, filterable pack activity table and source-safe detail route | future Gate 3 artifact | draft-required |
| Read route | Five-step Reading UX owns Read Request through settlement/delivery | future Gate 4 artifact | draft-required |
| Deposit route | Connected-source deposit AssetPack option synthesis and review | future Gate 5 artifact | draft-required |
| Criticality/ROI policy | Source criticality, demand, ROI, BTD potential, and compensation posture | future Gate 6 artifact | draft-required |
| Admission sync | Approved deposit options enter Depository and `/packs` activity | future Gate 7 artifact | draft-required |
| UX excellence | Self-explanatory, polished, progressive-detail UI without self-referential product copy | future Gate 8 artifact | draft-required |
| Rehearsal | Local/staging-testnet cross-route path verifies deposit, read, packs, settlement, compensation, delivery | future Gate 9 artifact | draft-required |
| Promotion readiness | V43 generated proof and active V43 / draft V44 posture ready | future Gate 10 artifact | draft-required |

## V43 implementation checklist

| Area | Closure requirement | Current judgment |
| --- | --- | --- |
| Specification family | V43 SPEC, DELTA, NOTES, PARITY files exist and pass spec-family check | drafted |
| Package script | `check:v43-gate1` exists | drafted |
| Workflows | Gate/canon quality know active V42 / draft V43 | drafted |
| Documentation | README and roadmap name V43 route/product scope | drafted |
| Implementation | Route and pipeline source changes are not part of Gate 1 | accepted boundary |

## V43 accepted boundaries

Gate 1 is allowed to specify and wire validation posture only. It must not rename application routes or add deposit option synthesis behavior before the migration inventory is complete.

## V43 completion condition

The matrix is complete when every V43 gate row is closed with source, tests, documentation, generated artifacts, and promotion proof.
