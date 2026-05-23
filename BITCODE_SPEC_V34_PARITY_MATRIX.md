# Bitcode Spec V34 Parity Matrix

## Status

- Version: `V34`
- V34 state: Gate 3 distributed execution runtime contracts are closed over promoted V33 canon
- Current canonical/latest target: `V33`
- Prior canonical anchor: `BITCODE_SPEC_V33.md`
- Prior generated proof appendix: `BITCODE_SPEC_V33_PROVEN.md`
- Generated structured artifact inventory: draft V34 specifying artifacts `.bitcode/v34-spec-family-report.json`, `.bitcode/v34-canonical-input-report.json`, Gate 2 artifacts `.bitcode/v34-deployment-host-capability-catalog.json` and `.bitcode/v34-environment-lane-contracts.json`, Gate 3 artifact `.bitcode/v34-distributed-execution-runtime-receipts.json`, and later deployment-depth artifacts as gates close
- Source parity state: Gate 3 closes host capability, environment lane, and distributed execution runtime receipt parity; Gates 4 through 10 remain draft-required deployment-depth parity rows
- Spec companion: `BITCODE_SPEC_V34.md`
- Notes companion: `BITCODE_SPEC_V34_NOTES.md`
- Delta companion: `BITCODE_SPEC_V34_DELTA.md`
- Generated proof appendix: `BITCODE_SPEC_V34_PROVEN.md` only after V34 promotion
- Scope: V34 draft parity ledger for deployment depth over promoted V33 commercial interface canon
- Last fully realized canonical target preserved in source: `V33`

## Purpose

The V34 parity matrix prevents deployment work from becoming dashboard-only assumptions or environment folklore.
Every V34 gate must name the package-owned deployment object, runtime host, environment lane, storage carrier, secret boundary, runtime receipt, approval gate, repair posture, generated artifact, validation command, and source-safe proof required for closure.

## Audit basis

Gate 1 audit basis:

- `BITCODE_SPEC.txt`
- `BITCODE_SPEC_V33.md`
- `BITCODE_SPEC_V33_PROVEN.md`
- `BITCODE_SPEC_V34.md`
- `BITCODE_SPEC_V34_DELTA.md`
- `BITCODE_SPEC_V34_NOTES.md`
- `BITCODE_SPEC_V34_PARITY_MATRIX.md`
- `SPECIFICATIONS_ROADMAP.md`
- `README.md`
- `AGENTS.md`
- `.github/pull_request_template.md`
- `.github/workflows/bitcode-gate-quality.yml`
- `.github/workflows/bitcode-canon-quality.yml`
- `package.json`
- `packages/protocol/README.md`
- `protocol-demonstration/README.md`
- `packages/protocol/src/canon-posture.js`
- `protocol-demonstration/src/canon-posture.js`
- `packages/protocol/data/state.json`
- `scripts/check-v34-gate1-deployment-roadmap-opening.mjs`

No `_legacy/` source is active source truth.

## V34 implementation matrix

| Area | Gate | Source evidence | Judgment | Closure requirement |
| --- | --- | --- | --- | --- |
| Draft family and branch posture | Gate 1 | `BITCODE_SPEC_V34.md`, DELTA, NOTES, PARITY, `BITCODE_SPEC.txt`, branch `v34/gate-1-deployment-roadmap-opening` | closed | V34 family validates in draft mode over active V33 and `check:v34-gate1` passes. |
| Roadmap truth | Gate 1 | `SPECIFICATIONS_ROADMAP.md`, README, PR template, workflow posture | closed | Roadmap states V33 active, V34 draft, and coherent V35-V37 responsibilities. |
| Host capability and environment lane catalog | Gate 2 | `packages/btd/src/deployment-host-capability-catalog.ts`, `.bitcode/v34-deployment-host-capability-catalog.json`, `.bitcode/v34-environment-lane-contracts.json`, `packages/btd/__tests__/deployment-host-capability-catalog.test.ts`, and `check:v34-gate2` | closed | Hosts, services, lanes, storage carriers, and value-bearing blockers have package-owned rows. |
| Distributed execution runtime contracts | Gate 3 | `packages/pipeline-hosts/src/distributed-execution-runtime-receipt.ts`, `.bitcode/v34-distributed-execution-runtime-receipts.json`, `packages/pipeline-hosts/src/__tests__/distributed-execution-runtime-receipt.test.ts`, and `check:v34-gate3` | closed | Pipeline, PTRR agent, ThricifiedGeneration, tool, ledger, wallet, proof, object-storage, and repair work emits typed receipts. |
| Ledger/database/object-storage posture | Gate 4 | planned storage posture source, tests, generated artifact, and `check:v34-gate4` | draft-required | Ledger-derived state, database projection, object storage, proof artifacts, audit logs, backups, and rollback material are durable and repairable. |
| Secret rotation and credential boundaries | Gate 5 | planned secret-family source, tests, generated artifact, and `check:v34-gate5` | draft-required | Secret values stay out of tracked files and logs while rotation, leak response, and runtime availability are provable. |
| Migration CI/CD deployment approval gates | Gate 6 | planned approval gate source, workflows, generated artifact, and `check:v34-gate6` | draft-required | Schema migration, generated types, route scans, builds, deployment approvals, and promotion commits fail closed. |
| Runtime observers, broadcasters, and repair jobs | Gate 7 | planned runtime job source, tests, generated artifact, and `check:v34-gate7` | draft-required | Settlement observers, broadcasters, finality watchers, projection repair, object-storage repair, and proof jobs have receipts. |
| Rollback, upgrade, and data repair playbooks | Gate 8 | planned playbook source/docs, generated artifact, and `check:v34-gate8` | draft-required | Rollback, upgrade, migration rollback, object-storage repair, database repair, ledger repair, and incident response are commandable and proof-rooted. |
| Local and staging-testnet deployment rehearsal | Gate 9 | planned rehearsal artifacts, source-safe logs, screenshots, and `check:v34-gate9` | draft-required | Local and staging-testnet rehearsals exercise commercial runtime without value-bearing mainnet admission. |
| Promotion readiness | Gate 10 | planned promotion readiness report, promotion script support, generated appendix support, and `check:v34-gate10` | draft-required | V34 can promote only after all deployment gates pass and generated canon is source-safe. |

## V34 implementation checklist

| Area | Required V34 result | Judgment |
| --- | --- | --- |
| Active canon pointer | `BITCODE_SPEC.txt` remains `V33` during V34 gate work | closed |
| Gate branch pattern | V34 work happens on `version/v34` or `v34/gate-N-*` branches | closed |
| Spec-family shape | V34 SPEC, DELTA, NOTES, and PARITY satisfy the full spec-family checker | closed |
| Gate 1 script | `pnpm run check:v34-gate1` fails closed on stale posture, missing roadmap truth, or missing deployment-depth scope | closed |
| Gate-quality workflow | Gate workflow validates V33 active / V34 draft posture and the V34 Gate 1 checker | closed |
| Canon-quality workflow | Canon workflow validates promoted V33 canon, V34 draft family when present, and V33/V34 posture | closed |
| Package docs | README, protocol package README, demonstration README, and PR template state V33 active / V34 draft workflow | closed |
| Deployment vocabulary | V34 spec family names `DeploymentHostCapabilityCatalog`, `EnvironmentLaneContract`, `DistributedExecutionRuntimeReceipt`, `DeploymentStoragePosture`, `MigrationApprovalGate`, `SecretRotationPlan`, `RuntimeObserverRepairJob`, `RollbackUpgradeRepairPlaybook`, and `DeploymentReadinessRehearsal` | closed |
| Host/lane catalog package source | `packages/btd/src/deployment-host-capability-catalog.ts` owns `DeploymentHostCapabilityCatalog` and `EnvironmentLaneContract` builders | closed |
| Gate 2 generated artifacts | `.bitcode/v34-deployment-host-capability-catalog.json` and `.bitcode/v34-environment-lane-contracts.json` are deterministic and source-safe | closed |
| Value-bearing mainnet blocker | `value-bearing-mainnet` remains `blocked_future_canon_required` and admits no hosts | closed |
| Gate 3 generated artifact | `.bitcode/v34-distributed-execution-runtime-receipts.json` is deterministic and source-safe | closed |
| Runtime route boundary | Long-running `DistributedExecutionRuntimeReceipt` rows use `request_response_not_required` instead of request/response completion | closed |

## Gate 1 Parity

| Requirement | Source evidence | Current V34 judgment |
| --- | --- | --- |
| Active canon remains V33 during V34 draft opening | `BITCODE_SPEC.txt` contains `V33` | drafted |
| Runtime draft target is V34 | `packages/protocol/src/canon-posture.js` and `protocol-demonstration/src/canon-posture.js` declare V33 active and V34 draft | drafted |
| V34 SPEC family exists as draft | `BITCODE_SPEC_V34.md`, DELTA, NOTES, and PARITY | drafted |
| Roadmap is current | `SPECIFICATIONS_ROADMAP.md` states V33 active canon, V34 active draft target, and V35-V37 scopes | drafted |
| Gate-quality workflow is V34-aware | `.github/workflows/bitcode-gate-quality.yml` | drafted |
| Canon-quality workflow is V34-aware | `.github/workflows/bitcode-canon-quality.yml` | drafted |
| README reflects V33/V34 posture | `README.md` | drafted |
| PR template reflects V34 gate titles | `.github/pull_request_template.md` | drafted |
| V34 Gate 1 checker exists | `scripts/check-v34-gate1-deployment-roadmap-opening.mjs` and package script | drafted |

## Gate 2 Parity

| Requirement | Source evidence | Current V34 judgment |
| --- | --- | --- |
| Package-owned host capability catalog exists | `packages/btd/src/deployment-host-capability-catalog.ts`, `packages/btd/src/index.ts`, `packages/btd/package.json` | closed |
| Environment lanes are explicit | `EnvironmentLaneContract`, `ENVIRONMENT_LANE_CONTRACT_IDS`, and `.bitcode/v34-environment-lane-contracts.json` | closed |
| Value-bearing mainnet is blocked | `value-bearing-mainnet` lane fixture, `blocked_future_canon_required`, focused tests, and checker assertions | closed |
| Generated artifacts are source-safe and deterministic | `.bitcode/v34-deployment-host-capability-catalog.json`, `.bitcode/v34-environment-lane-contracts.json`, and `pnpm run check:v34-host-capability-environment-lanes` | closed |

## Gate 3 Parity

| Requirement | Source evidence | Current V34 judgment |
| --- | --- | --- |
| Distributed execution runtime receipt exists | `packages/pipeline-hosts/src/distributed-execution-runtime-receipt.ts`, `packages/pipeline-hosts/src/index.ts`, and `.bitcode/v34-distributed-execution-runtime-receipts.json` | closed |
| Long-running route boundary is respected | `request_response_not_required` fixtures, focused tests, generated artifact coverage, and `check:v34-gate3` | closed |
| Pipeline, tool, ledger, wallet, proof, storage, and repair receipt roots are covered | `.bitcode/v34-distributed-execution-runtime-receipts.json` covers input roots, output roots, log roots, object-storage roots, ledger/database roots, wallet roots, proof roots, and repair posture | closed |
| PTRR and ThricifiedGeneration receipt precision | `ptrr_agent` and `thricified_generation` receipt rows include PTRR step and ThricifiedGeneration step data without protected prompt or source payloads | closed |
| Storage and repair receipt precision | `object_storage_write` and `repair_job` receipt rows carry source-safe roots, replay commands, and repair posture without serializing protected source | closed |
| Source-safety boundary | Gate 3 tests and checker reject secret-shaped text and protected source markers in receipt fields and generated artifact output | closed |

## Gate 4 Parity

| Requirement | Source evidence | Current V34 judgment |
| --- | --- | --- |
| Storage posture object exists | planned package-owned type and generated artifact | draft-required |
| Ledger/database/object-storage drift is repairable | planned repair fixtures | draft-required |
| Source-bearing AssetPack storage remains locked before settlement | planned storage access tests | draft-required |

## Gate 5 Parity

| Requirement | Source evidence | Current V34 judgment |
| --- | --- | --- |
| Secret family catalog exists without values | planned source-safe generated artifact | draft-required |
| Rotation and leak-response commands are specified | planned docs/tests | draft-required |
| CI and logs reject secret-shaped payloads | planned checker coverage | draft-required |

## Gate 6 Parity

| Requirement | Source evidence | Current V34 judgment |
| --- | --- | --- |
| Migration approval gate exists | planned package-owned type | draft-required |
| CI/CD validates generated artifacts and promotion posture | planned workflow updates | draft-required |
| Vercel/Supabase lane checks are fail-closed | planned scripts | draft-required |

## Gate 7 Parity

| Requirement | Source evidence | Current V34 judgment |
| --- | --- | --- |
| Observers and broadcasters have runtime receipts | planned job registry | draft-required |
| Repair jobs have lane contracts and replay commands | planned repair registry | draft-required |
| Unsafe drift blocks unlock | planned tests | draft-required |

## Gate 8 Parity

| Requirement | Source evidence | Current V34 judgment |
| --- | --- | --- |
| Rollback, upgrade, and repair playbooks exist | planned docs/source artifacts | draft-required |
| Playbooks name commands, approvals, verification, and proof roots | planned generated artifact | draft-required |
| Incident recovery remains source-safe | planned checker coverage | draft-required |

## Gate 9 Parity

| Requirement | Source evidence | Current V34 judgment |
| --- | --- | --- |
| Local rehearsal is proof-rooted | planned source-safe logs/artifacts | draft-required |
| Staging-testnet rehearsal is proof-rooted | planned source-safe logs/artifacts | draft-required |
| Value-bearing mainnet remains blocked | planned rehearsal verdict | draft-required |

## Gate 10 Parity

| Requirement | Source evidence | Current V34 judgment |
| --- | --- | --- |
| Promotion readiness report exists | planned `.bitcode/v34-promotion-readiness-report.json` | draft-required |
| All V34 deployment artifacts are covered | planned promotion readiness generator | draft-required |
| Promotion command supports V34 | planned promotion script update | draft-required |
| Generated appendix supports V34 | planned proven-generator update | draft-required |
| Runtime posture advances to V34 active / V35 draft | planned runtime promotion preparation | draft-required |

## V34 accepted boundaries

- V34 owns deployment-depth and deployment-owned proof hooks.
- V35 owns broad telemetry/documentation programs, dashboards, docs, incidents, operator guides, and rollout material.
- V36 owns deeper Exchange.
- V37 owns website Conversations.
- V34 does not authorize value-bearing production-mainnet launch.
- V34 does not expose protected AssetPack source before settlement through any runtime carrier, generated proof, log, or interface.

## V34 completion condition

V34 parity is complete when each deployment-depth gate row has source evidence, tests, generated artifacts where required, workflow/checker support, and closed parity judgment, and when V34 promotion can rewrite `BITCODE_SPEC.txt` from `V33` to `V34` only after promotion-grade validations pass.
