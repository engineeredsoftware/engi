# Bitcode Spec V42 Parity Matrix

## Status

- Version: `V42`
- V42 state: draft opened; parity tracks reliable MVP experience gaps and closure gates over active V41
- Current canonical/latest target: `V41`
- Prior canonical anchor: `BITCODE_SPEC_V41.md`
- Prior generated proof appendix: `BITCODE_SPEC_V41_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v42-spec-family-report.json`, `.bitcode/v42-canonical-input-report.json`, `.bitcode/v42-canon-posture-drift-report.json`, and later V42 gate artifacts
- Source parity state: Gate 1 parity is documentation/checker/workflow posture; product behavior rows remain draft-required until their gates close
- Scope: V42 parity ledger for reliable MVP product experience

## Purpose

This matrix records the reliable MVP product surfaces that must become promotion-grade before V42 can replace V41 as active canon.

## Audit basis

- `BITCODE_SPEC.txt` -> `V41`
- `BITCODE_SPEC_V41.md`
- `BITCODE_SPEC_V41_PROVEN.md`
- `BITCODE_SPEC_V42.md`
- `BITCODE_SPEC_V42_DELTA.md`
- `BITCODE_SPEC_V42_NOTES.md`
- commercial product routes, packages, pipelines, BTD/ledger code, generated artifacts, workflows, and `protocol-demonstration/`

## V42 implementation matrix

| Area | Required V42 result | Source evidence | Judgment |
| --- | --- | --- | --- |
| Draft family | V42 SPEC, DELTA, NOTES, and PARITY files exist over active V41 | `BITCODE_SPEC_V42.md` family | drafted |
| Roadmap truth | Roadmap states V41 active and V42 draft reliable MVP experience | `SPECIFICATIONS_ROADMAP.md` | drafted |
| Gate workflow | Gate quality knows active V41 / draft V42 posture and V42 Gate 1 | `.github/workflows/bitcode-gate-quality.yml` | drafted |
| Canon workflow | Canon quality knows active V41 / draft V42 posture and V42 Gate 1 | `.github/workflows/bitcode-canon-quality.yml` | drafted |
| Depositing shortest path | Source material can be admitted with Depository proof and compensation visibility | `.bitcode/v42-depositing-shortest-path.json`, `DepositorySupplyCompensationPreview`, `/api/deposits`, Terminal deposit readback | implemented |
| Reading state machine | Five-step Reading UX is route-owned, persistent, and source-safe | `.bitcode/v42-reading-shortest-path-state-machine.json`, `TerminalEnterpriseReadingRouteState`, `readingStage`, route/retry/failure tests | implemented |
| ReadNeed product closure | Need synthesis, review, feedback, resynthesis, accepted-Need admission, rejected Need blockers, source-safe telemetry, and Terminal runtime readback are product-ready | `.bitcode/v42-readneed-review-resynthesis-product-closure.json`, `ReadNeedReviewResynthesisRuntime`, `/api/read-review`, Terminal Need runtime readback | implemented |
| Finding Fits preview and quote | Many-candidate search, selected-fit provenance, source-safe preview, and quote are product-ready | `.bitcode/v42-readfitsfinding-preview-quote.json`, `ReadFitsFindingRuntime`, `AssetPackPreviewBoundary`, harness preview summary, Terminal preview/quote/provenance readback | implemented |
| Settlement and delivery | BTC/BTD settlement, rights transfer, compensation, and repository PR delivery are synchronized | `.bitcode/v42-settlement-rights-delivery.json`, `AssetPackSettlementRightsDeliveryBoundary`, live harness settlement boundary, route summary, Terminal settlement readback | implemented |
| AI-reading demonstration | Standalone demonstration proves AssetPack improves AI beyond public-data-only baseline | later V42 Gate 7 artifact | draft-required |
| Local/staging rehearsal | Full MVP path rehearsed locally and in staging-testnet with mainnet blocked | later V42 Gate 8 artifact | draft-required |
| Promotion readiness | V42 proof and workflow promotion ready | later V42 Gate 9 artifact | draft-required |

## V42 implementation checklist

| Area | Closure requirement | Judgment |
| --- | --- | --- |
| Gate 1 | Open V42 family, roadmap, docs, workflow posture, package script, and checker | drafted |
| Gate 2 | Depositing shortest path and compensation visibility artifact | implemented |
| Gate 3 | Reading shortest path state machine artifact | implemented |
| Gate 4 | ReadNeed review and resynthesis product closure artifact | implemented |
| Gate 5 | ReadFitsFinding AssetPack preview and quote closure artifact | implemented |
| Gate 6 | Settlement rights transfer and repository delivery closure artifact | implemented |
| Gate 7 | AI-reading dominant demonstration MVP artifact | draft-required |
| Gate 8 | Local and staging-testnet full MVP rehearsal artifact | draft-required |
| Gate 9 | Promotion readiness artifact and workflow | draft-required |

## V42 accepted boundaries

V42 Gate 1 may open specification, workflow, docs, and validation posture.
It may not implement route, pipeline, settlement, or demonstration behavior.

V42 later gates may implement product behavior only if source-safe disclosure, Need review, BTD/BTC settlement, depositor compensation, repository delivery, telemetry, and generated proof obligations are represented in tests and artifacts.

V42 may not split `/terminal` into `/read` and `/deposit`, and may not rename `/exchange` to `/packs`; those are V43+ roadmap items unless explicitly reopened.

## V42 completion condition

V42 closes when reliable MVP Depositing, Reading, Finding Fits, AssetPack preview, BTD/BTC settlement, repository delivery, compensation visibility, AI-reading demonstration, local/staging rehearsal, and promotion readiness are all specified, implemented, tested, generated, workflow-bound, source-safe, and promotion-ready.
