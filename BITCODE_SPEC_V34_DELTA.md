# Bitcode Spec V34 Delta

## Status

- Version: `V34`
- V34 state: Gate 5 secret rotation and credential boundary operations are closed over promoted V33 canon
- Current canonical/latest target: `V33`
- Prior canonical anchor: `BITCODE_SPEC_V33.md`
- Prior generated proof appendix: `BITCODE_SPEC_V33_PROVEN.md`
- Generated structured artifact inventory: draft V34 specifying artifacts `.bitcode/v34-spec-family-report.json`, `.bitcode/v34-canonical-input-report.json`, Gate 2 artifacts `.bitcode/v34-deployment-host-capability-catalog.json` and `.bitcode/v34-environment-lane-contracts.json`, Gate 3 artifact `.bitcode/v34-distributed-execution-runtime-receipts.json`, Gate 4 artifact `.bitcode/v34-deployment-storage-posture.json`, Gate 5 artifact `.bitcode/v34-secret-rotation-boundary-operations.json`, and later deployment-depth artifacts as gates close
- Source parity state: Gate 5 closes host capability, environment lane, distributed execution runtime receipt, storage posture, and secret rotation contracts; approval, repair-job registry, rehearsal, and promotion contracts remain drafted until their gates close
- Spec companion: `BITCODE_SPEC_V34.md`
- Notes companion: `BITCODE_SPEC_V34_NOTES.md`
- Parity companion: `BITCODE_SPEC_V34_PARITY_MATRIX.md`
- Generated proof appendix: `BITCODE_SPEC_V34_PROVEN.md` only after V34 promotion
- Scope: V34 draft delta for deployment depth over promoted V33 commercial interface canon

## Why V34 exists

V33 promoted commercial interface depth across MCP API, ChatGPT App, public API, package-owned schemas, interface authorization, Read license and AssetPack rights contracts, compatibility matrices, telemetry/proof hooks, consumer UX proof, and promotion readiness.
That made external interface boundaries source-safe and contract-owned.

V34 exists because those interfaces and the Reading/BTD system must now be operator-deployable with explicit runtime truth.
Deployment cannot be a dashboard assumption: host capability, environment lane, distributed execution receipts, storage posture, migration approvals, secret rotation, observer/broadcaster/repair jobs, rollback, upgrade, rehearsal, and promotion readiness must be specified and tested as Bitcode protocol reality.

## Accepted V34 decisions

- V33 remains active canon during V34 drafting.
- V34 gate branches are opened from `version/v34` and merged back only when their gate acceptance criteria are closed.
- V34 owns deployment-depth: `DeploymentHostCapabilityCatalog`, `EnvironmentLaneContract`, `DistributedExecutionRuntimeReceipt`, `DeploymentStoragePosture`, `MigrationApprovalGate`, `SecretRotationPlan`, `RuntimeObserverRepairJob`, `RollbackUpgradeRepairPlaybook`, `DeploymentReadinessRehearsal`, and `DeploymentPromotionReadinessReport`.
- V34 deployment contracts must be package-owned before they are exposed by route handlers, workers, MCP tools, ChatGPT App actions, observers, broadcasters, repair jobs, or UI status surfaces.
- Environment lanes distinguish local, regtest, signet, staging-testnet, public testnet, mainnet-ready dry run, and value-bearing mainnet; value-bearing mainnet remains blocked.
- Distributed execution receipts are required for long-running Reading pipeline, ledger, wallet, settlement, proof, object-storage, and repair work.
- Source-bearing AssetPack storage, proof artifacts, audit logs, and rollback material must have explicit storage posture and disclosure policy.

## Explicitly deferred

- V35 owns broad telemetry/documentation programs, dashboards, alert runbooks, public docs breadth, incidents, operator guides, and rollout material beyond V34 deployment contracts.
- V36 owns deeper Exchange market behavior.
- V37 owns deeper website Conversations product behavior.
- Production-mainnet value-bearing launch remains explicitly blocked until a future promoted canon admits it.
- Bridge chain-of-record implementation remains out of V34.
- V34 does not reopen BTD supply law, Reading pipeline product law, or V33 interface contract law.

## Pre-Implementation Sequence

1. Open `version/v34` from promoted `main`.
2. Open `v34/gate-1-deployment-roadmap-opening` from `version/v34`.
3. Create the V34 SPEC, DELTA, NOTES, and PARITY family while preserving `BITCODE_SPEC.txt -> V33`.
4. Refresh `SPECIFICATIONS_ROADMAP.md` so V33 is active canon, V34 is draft target, and V35-V37 scopes remain coherent.
5. Retarget gate-quality and canon-quality workflow posture checks to V33 active / V34 draft.
6. Add `check:v34-gate1` and a V34 Gate 1 checker.
7. Define V34 gates, acceptance criteria, carryforward parity rows, and post-V34 roadmap responsibilities.
8. Validate spec family, canonical inputs, canon posture, workflows, roadmap truth, README/docs, and diff hygiene.
9. Push the gate branch and open a pull request to `version/v34`.

## Commit-Body Direction

V34 gate commit bodies should describe the closed gate, specification changes, implementation surfaces, tests, proof commands, and accepted boundaries.
The eventual V34 promotion commit body must name all closed V34 gates, generated deployment proof artifacts, host capability and lane contracts, runtime receipt evidence, storage posture evidence, deployment approval evidence, rehearsal proof, and the `BITCODE_SPEC.txt` pointer change from `V33` to `V34`.
It must explicitly defer V35 telemetry/documentation breadth, V36 Exchange depth, V37 Conversations depth, bridge chain-of-record implementation, and value-bearing mainnet launch.

## Gate Delta

### Gate 1: V34 Deployment Roadmap And Spec Opening

Gate 1 opens V34 correctly:

- V34 SPEC, DELTA, NOTES, and PARITY files exist.
- `BITCODE_SPEC.txt` remains `V33`.
- README, roadmap, PR template, package docs, demonstration docs, and workflows describe V33 active / V34 draft posture.
- `check:v34-gate1` validates branch naming, spec family, notes, parity, roadmap truth, workflow posture, deployment-depth vocabulary, and promotion boundaries.
- The V34 gate list is explicit before deployment-depth implementation begins.

### Gate 2: Host Capability And Environment Lane Catalog

Gate 2 inventories deployable runtime truth.

Closure acceptance:

- website, API, MCP API, ChatGPT App, pipeline workers, observers, broadcasters, proof services, repair jobs, object storage, database projection, and ledger projection are enumerated;
- local, regtest, signet, staging-testnet, public testnet, mainnet-ready dry run, and value-bearing mainnet lanes are represented;
- `value-bearing-mainnet` is visible as `blocked_future_canon_required`, not hidden confidence;
- `.bitcode/v34-deployment-host-capability-catalog.json` and `.bitcode/v34-environment-lane-contracts.json` are source-safe generated artifacts.

Closure evidence:

- `packages/btd/src/deployment-host-capability-catalog.ts` owns `DeploymentHostCapabilityCatalog` and `EnvironmentLaneContract` builders.
- `packages/btd/__tests__/deployment-host-capability-catalog.test.ts` proves required hosts, lanes, value-bearing mainnet blocking, duplicate/missing failures, and source-safety rejection.
- `scripts/generate-v34-host-capability-environment-lanes.mjs` emits deterministic `.bitcode/v34-deployment-host-capability-catalog.json` and `.bitcode/v34-environment-lane-contracts.json`.
- `scripts/check-v34-gate2-host-capability-environment-lanes.mjs` and `pnpm run check:v34-gate2` fail closed on stale artifacts, hidden value-bearing mainnet, missing rows, docs drift, package-script drift, and workflow drift.

### Gate 3: Distributed Execution Runtime Contracts

Gate 3 defines `DistributedExecutionRuntimeReceipt`.

Closure acceptance:

- pipeline runs, PTRR agents, ThricifiedGenerations, tool calls, ledger operations, wallet operations, proof generation, object-storage writes, and repair jobs emit typed receipt shapes;
- long-running work is not required to finish inside a request/response route handler;
- receipts contain input roots, output roots, log roots, storage roots, ledger/database roots, status, and repair posture without serializing secrets or protected source.

Closure evidence:

- `packages/pipeline-hosts/src/distributed-execution-runtime-receipt.ts` owns `DistributedExecutionRuntimeReceipt` and catalog builders for `pipeline_run`, `ptrr_agent`, `thricified_generation`, `tool_call`, `ledger_operation`, `wallet_operation`, `proof_generation`, `object_storage_write`, and `repair_job`.
- `packages/pipeline-hosts/src/__tests__/distributed-execution-runtime-receipt.test.ts` proves root coverage, `request_response_not_required`, PTRR/ThricifiedGeneration step data, tool ids, ledger/wallet/proof/object-storage roots, terminal completion/output roots, and source-safety rejection.
- `scripts/generate-v34-distributed-execution-runtime-receipts.mjs` emits deterministic `.bitcode/v34-distributed-execution-runtime-receipts.json`.
- `scripts/check-v34-gate3-distributed-execution-runtime-contracts.mjs` and `pnpm run check:v34-gate3` fail closed on stale artifacts, missing work kinds, request/response completion assumptions, missing roots, source-safety drift, docs drift, package-script drift, and workflow drift.

### Gate 4: Ledger Database Object Storage Deployment Posture

Gate 4 defines durable storage posture.

Closure acceptance:

- ledger-derived state, canonical database projection, object storage, proof artifacts, audit logs, rollback material, backups, retention, encryption posture, and repair commands are specified and tested through `DeploymentStoragePosture`;
- source-bearing AssetPack storage remains locked before settlement;
- database and ledger projection drift has a repair posture;
- generated storage posture proof is source-safe in `.bitcode/v34-deployment-storage-posture.json`.

### Gate 5: Secret Rotation And Credential Boundary Operations

Gate 5 defines credential operations.

Closure acceptance:

- OpenAI, Supabase, Vercel, GitHub, wallet, object storage, webhook, MCP, and ChatGPT App secret families are cataloged without tracked values;
- rotation commands, cadence, CI masking, leak response, and blast-radius notes exist;
- generated artifacts and logs prove no secret-shaped values are serialized.

Closure evidence:

- `packages/btd/src/secret-rotation-plan.ts` owns `SecretRotationPlan`, required secret family ids, family builders, value-bearing mainnet blocking, no secret values serialization checks, CI masking posture, leak response, runtime availability, and audit event coverage.
- `packages/btd/__tests__/secret-rotation-plan.test.ts` proves all nine required families, required operational fields, CI masking failure, missing/duplicate families, value-bearing mainnet blocking, and serialized secret-shaped value rejection.
- `scripts/generate-v34-secret-rotation-boundary-operations.mjs` emits deterministic `.bitcode/v34-secret-rotation-boundary-operations.json` with OpenAI, Supabase, Vercel, GitHub, wallet, object storage, webhook, MCP, and ChatGPT App coverage and no secret values.
- `scripts/check-v34-gate5-secret-rotation-boundary-operations.mjs` and `pnpm run check:v34-gate5` fail closed on stale artifacts, missing families, unmasked CI posture, missing leak response, secret-shaped artifact text, docs drift, package-script drift, and workflow drift.

### Gate 6: Migration CI/CD Deployment Approval Gates

Gate 6 hardens release automation.

Closure acceptance:

- schema migration approval, generated type refresh, route scans, build/test gates, generated artifact freshness, Vercel/Supabase lane checks, and promotion commits are fail-closed;
- deployment approvals carry proof roots and reviewer posture;
- gate-quality and canon-quality workflows remain greenable and promotion workflows remain version-aware.

### Gate 7: Runtime Observers Broadcasters Repair Jobs

Gate 7 makes background deployment work explicit.

Closure acceptance:

- settlement observers, ledger broadcasters, finality watchers, database projection repair jobs, object-storage repair jobs, generated proof jobs, and queue consumers have host capabilities, lane contracts, receipts, and replay commands;
- observer/broadcaster drift is repairable and blocks unlock when unsafe.

### Gate 8: Rollback Upgrade Data Repair Playbooks

Gate 8 defines operator playbooks.

Closure acceptance:

- rollback, upgrade, migration rollback, object-storage repair, database repair, ledger projection repair, secret rotation incident response, and generated artifact repair playbooks exist;
- each playbook names entry condition, operator approval, commands, proof roots, verification, and fail-closed result.

### Gate 9: Local Staging Testnet Deployment Rehearsal

Gate 9 proves deployability before promotion.

Closure acceptance:

- local and staging-testnet rehearsals exercise Terminal, public API, MCP API, ChatGPT App contract surfaces, Reading pipeline execution receipts, settlement/finality simulation, storage posture, repair posture, and source-safe logs;
- screenshots or logs are source-safe and proof-rooted;
- value-bearing mainnet remains blocked.

### Gate 10: V34 Promotion Readiness

Gate 10 owns final generated proof, promotion workflow support, source-safe `.bitcode/v34-promotion-readiness-report.json`, and V34 closure.

Closure acceptance:

- V34 promotion checks validate all deployment artifacts, host/lane contracts, runtime receipts, storage posture, secret rotation posture, migration approvals, observer/repair jobs, rehearsal proof, and generated proof appendix support;
- promotion scripts support V34 command planning, dry-run, generated proof output, and derived promotion commit body generation;
- promotion rewrites runtime posture to active V34 / draft V35 only after validations pass.

## Completion condition

This delta is complete for Gate 5 when `version/v34` contains the Gate 5 `SecretRotationPlan`, source-safe generated artifact, focused tests, workflow wiring, and `pnpm run check:v34-gate5` closure. Remaining delta closure advances through Gates 6 through 10.
