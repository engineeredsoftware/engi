# Bitcode Spec V34 Notes

## Status

- Version: `V34`
- V34 state: Gate 10 promotion readiness is closed over promoted V33 canon; V34 is ready for canonical promotion into active V34 / draft V35 posture
- Current canonical/latest target: `V33`
- Prior canonical anchor: `BITCODE_SPEC_V33.md`
- Prior generated proof appendix: `BITCODE_SPEC_V33_PROVEN.md`
- Generated structured artifact inventory: draft V34 specifying artifacts `.bitcode/v34-spec-family-report.json`, `.bitcode/v34-canonical-input-report.json`, Gate 2 artifacts `.bitcode/v34-deployment-host-capability-catalog.json` and `.bitcode/v34-environment-lane-contracts.json`, Gate 3 artifact `.bitcode/v34-distributed-execution-runtime-receipts.json`, Gate 4 artifact `.bitcode/v34-deployment-storage-posture.json`, Gate 5 artifact `.bitcode/v34-secret-rotation-boundary-operations.json`, Gate 6 artifact `.bitcode/v34-migration-cicd-approval-gates.json`, Gate 7 artifact `.bitcode/v34-runtime-observers-broadcasters-repair-jobs.json`, Gate 8 artifact `.bitcode/v34-rollback-upgrade-data-repair-playbooks.json`, Gate 9 artifact `.bitcode/v34-local-staging-testnet-deployment-rehearsal.json`, and Gate 10 artifact `.bitcode/v34-promotion-readiness-report.json`
- Source parity state: Gate 10 closes host capability, environment lane, distributed execution runtime receipt, storage posture, secret rotation, migration CI/CD approval, runtime observer/broadcaster/repair-job source parity, rollback/upgrade/data repair playbook source parity, deployment rehearsal source parity, promotion command planning, generated appendix support, workflow support, runtime posture rewrite support, and `DeploymentPromotionReadinessReport`
- Scope: active draft notes for deployment depth after V33 commercial interface canon

This NOTES file does not promote V34.
It guides V34 drafting while `BITCODE_SPEC.txt` remains `V33`.

## Notes companion rule

This file is planning memory for the active V34 draft family.
Requirements are binding only when they are also represented in `BITCODE_SPEC_V34.md`, `BITCODE_SPEC_V34_DELTA.md`, `BITCODE_SPEC_V34_PARITY_MATRIX.md`, source, tests, generated artifacts, and gate checks.

## Concise current-system reading

V33 is the active canon.
It proved the source-safe external interface layer across MCP API, ChatGPT App, public API, package-owned schemas, interface authorization, Read license and AssetPack rights contracts, compatibility matrices, telemetry/proof hooks, and consumer UX proof.

V34 owns deployment depth.
The commercial Bitcode system must now be deployable, lane-aware, recoverable, proof-producing, and rehearsal-backed without changing V33 Protocol/BTD, Reading, or interface law.

## Simplified-spec reading rule

Read the system as:

1. V33 defines what Bitcode is allowed to do commercially.
2. V34 defines where and how that system may run.
3. A deployment lane is not a source version.
4. A runtime dashboard is not proof unless it produces a `DistributedExecutionRuntimeReceipt` or a generated artifact.
5. Value-bearing mainnet remains blocked until a future canon admits it.

## V34 gate plan

1. Gate 1: V34 Deployment Roadmap And Spec Opening.
2. Gate 2: Host Capability And Environment Lane Catalog.
3. Gate 3: Distributed Execution Runtime Contracts.
4. Gate 4: Ledger Database Object Storage Deployment Posture.
5. Gate 5: Secret Rotation And Credential Boundary Operations.
6. Gate 6: Migration CI/CD Deployment Approval Gates.
7. Gate 7: Runtime Observers Broadcasters Repair Jobs.
8. Gate 8: Rollback Upgrade Data Repair Playbooks.
9. Gate 9: Local Staging Testnet Deployment Rehearsal.
10. Gate 10: V34 Promotion Readiness.

## Deployment-depth notes

- `DeploymentHostCapabilityCatalog` now makes hosts explicit: `website`, `api`, `mcp_api`, `chatgpt_app`, `pipeline_workers`, `runtime_observers`, `ledger_broadcasters`, `proof_services`, `repair_jobs`, `object_storage`, `database_projection`, and `ledger_projection`.
- `EnvironmentLaneContract` now distinguishes `local`, `regtest`, `signet`, `staging-testnet`, `public-testnet`, `mainnet-ready-dry-run`, and `value-bearing-mainnet`, with `value-bearing-mainnet` visible as `blocked_future_canon_required`.
- Gate 2 source truth is `packages/btd/src/deployment-host-capability-catalog.ts`; generated truth is `.bitcode/v34-deployment-host-capability-catalog.json` and `.bitcode/v34-environment-lane-contracts.json`; validation is `pnpm run check:v34-gate2`.
- `DistributedExecutionRuntimeReceipt` now represents long-running Reading, settlement, wallet, proof, object-storage, and repair work without relying on route-handler duration. Gate 3 source truth is `packages/pipeline-hosts/src/distributed-execution-runtime-receipt.ts`; generated truth is `.bitcode/v34-distributed-execution-runtime-receipts.json`; validation is `pnpm run check:v34-gate3`.
- Receipt work kinds are `pipeline_run`, `ptrr_agent`, `thricified_generation`, `tool_call`, `ledger_operation`, `wallet_operation`, `proof_generation`, `object_storage_write`, and `repair_job`; long-running work uses `request_response_not_required` and source-safe roots instead of serialized source, prompt payloads, credentials, or wallet private material.
- `DeploymentStoragePosture` now covers ledger-derived state, database projection, object storage, proof artifacts, audit logs, rollback material, backups, retention, encryption, and repair commands. Gate 4 source truth is `packages/btd/src/deployment-storage-posture.ts`; generated truth is `.bitcode/v34-deployment-storage-posture.json`; validation is `pnpm run check:v34-gate4`; source-bearing AssetPack storage remains locked before settlement.
- `SecretRotationPlan` now covers OpenAI, Supabase, Vercel, GitHub, wallet, object storage, webhook, MCP, and ChatGPT App secret families. Gate 5 source truth is `packages/btd/src/secret-rotation-plan.ts`; generated truth is `.bitcode/v34-secret-rotation-boundary-operations.json`; validation is `pnpm run check:v34-gate5`; no secret values may be placed in tracked files, generated artifacts, logs, interface payloads, or telemetry metadata.
- `MigrationApprovalGate` now connects schema migration approval, generated type refresh, route scans, build/test gates, generated artifact freshness, Vercel lane checks, Supabase lane checks, promotion commit approval, dry-runs, reviewer approval, rollback plans, workflow bindings, and proof roots. Gate 6 source truth is `packages/btd/src/migration-approval-gate.ts`; generated truth is `.bitcode/v34-migration-cicd-approval-gates.json`; validation is `pnpm run check:v34-gate6`; no secret values may be placed in tracked approval artifacts or CI/CD telemetry.
- `RuntimeObserverRepairJob` now connects settlement observers, ledger broadcasters, finality watchers, database projection repair, object-storage repair, generated proof jobs, queue consumers, runtime receipt work kinds, replay commands, repair commands, and unsafe drift blockers. Gate 7 source truth is `packages/btd/src/runtime-observer-repair-job.ts`; generated truth is `.bitcode/v34-runtime-observers-broadcasters-repair-jobs.json`; validation is `pnpm run check:v34-gate7`; unsafe drift blocks unlock, delivery, broadcast, or projection until repaired.
- `RollbackUpgradeRepairPlaybook` now connects rollback, upgrade, migration rollback, object-storage repair, database repair, ledger projection repair, secret rotation incident response, generated artifact repair, operator approval, command sequences, verification commands, proof roots, fail-closed results, and non-value lane admission. Gate 8 source truth is `packages/btd/src/rollback-upgrade-repair-playbook.ts`; generated truth is `.bitcode/v34-rollback-upgrade-data-repair-playbooks.json`; validation is `pnpm run check:v34-gate8`; no playbook may serialize credentials, wallet private material, protected source, source contents, or unpaid source-bearing AssetPack data.
- `DeploymentReadinessRehearsal` now proves local full-stack deployment rehearsal, staging-testnet full-stack deployment rehearsal, and value-bearing mainnet blocked rehearsal. Gate 9 source truth is `packages/btd/src/deployment-readiness-rehearsal.ts`; generated truth is `.bitcode/v34-local-staging-testnet-deployment-rehearsal.json`; validation is `pnpm run check:v34-gate9`; each non-value rehearsal covers Terminal, public API, MCP API, ChatGPT App, Reading pipeline execution receipts, settlement/finality simulation, storage posture, repair posture, source-safe logs, proof-rooted screenshots or logs, validation commands, and proof roots.
- `DeploymentPromotionReadinessReport` now proves V34 promotion readiness without committing source-bearing or secret-bearing values. Gate 10 source truth is `packages/btd/src/deployment-promotion-readiness-report.ts`; generated truth is `.bitcode/v34-promotion-readiness-report.json`; validation is `pnpm run check:v34-gate10`; promotion support covers every V34 deployment artifact, promotion command planning, generated appendix output, V34 promotion workflow support, gate/canon workflow postures, and the active V34 / draft V35 runtime posture after promotion.

## Boundaries

V34 deploys and hardens the proven commercial system.
It must not replace V33 interface contracts or V35 telemetry/documentation breadth.
It may expose deployment facts that V35 later documents and monitors.

## Return To V34

Future V34 gates should begin by reading `BITCODE_SPEC.txt`, this notes file, the delta, and the parity matrix.
They should then close one deployment-depth contract slice at a time with source, tests, generated artifacts, workflow support, and clear promotion readiness.
