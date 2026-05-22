# Bitcode Spec V34 Notes

## Status

- Version: `V34`
- V34 state: Gate 1 deployment-roadmap opening is active over promoted V33 canon
- Current canonical/latest target: `V33`
- Prior canonical anchor: `BITCODE_SPEC_V33.md`
- Prior generated proof appendix: `BITCODE_SPEC_V33_PROVEN.md`
- Generated structured artifact inventory: draft V34 specifying artifacts `.bitcode/v34-spec-family-report.json`, `.bitcode/v34-canonical-input-report.json`, and later deployment-depth artifacts as gates close
- Source parity state: V34 deployment-depth source parity begins at Gate 1 and remains drafted until each gate closes
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

- `DeploymentHostCapabilityCatalog` must make hosts explicit: website, API, MCP API, ChatGPT App, pipeline workers, observers, broadcasters, proof services, repair jobs, and storage carriers.
- `EnvironmentLaneContract` must distinguish local, regtest, signet, staging-testnet, public testnet, mainnet-ready dry run, and value-bearing mainnet.
- `DistributedExecutionRuntimeReceipt` must represent long-running Reading, settlement, wallet, proof, object-storage, and repair work without relying on route-handler duration.
- `DeploymentStoragePosture` must cover ledger-derived state, database projection, object storage, proof artifacts, audit logs, rollback material, retention, encryption, and repair commands.
- `SecretRotationPlan` must never place secret values in tracked files or generated artifacts.
- `MigrationApprovalGate` must connect schema diffs, generated types, dry-runs, reviewer approvals, and rollback plans.
- `DeploymentReadinessRehearsal` must prove local and staging-testnet readiness without value-bearing mainnet admission.

## Boundaries

V34 deploys and hardens the proven commercial system.
It must not replace V33 interface contracts or V35 telemetry/documentation breadth.
It may expose deployment facts that V35 later documents and monitors.

## Return To V34

Future V34 gates should begin by reading `BITCODE_SPEC.txt`, this notes file, the delta, and the parity matrix.
They should then close one deployment-depth contract slice at a time with source, tests, generated artifacts, workflow support, and clear promotion readiness.
