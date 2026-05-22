# Bitcode Spec V31 Delta

## Status

- Version: `V31`
- V31 state: draft target delta opened for Auxillaries deepening over promoted V30
- Current canonical/latest target: `V30`
- Prior canonical anchor: `BITCODE_SPEC_V30.md`
- Prior generated proof appendix: `BITCODE_SPEC_V30_PROVEN.md`
- Generated structured artifact inventory: none until V31 gates admit V31 generated artifacts
- Source parity state: V31 source parity begins with Auxillaries spec-family, roadmap, workflow, and gate-checker opening
- State: draft target delta opened
- Active canonical pointer during draft opening: `BITCODE_SPEC.txt` -> `V30`
- Scope: V31 canonical delta for Auxillaries Profile, Connects, Interfaces, Wallet/BTD panes, provider readiness, account state, team/organization/wallet/multi-sig/role/policy controls, readiness diagnostics, recovery flows, responsive/accessibility QA, Auxillaries proof hooks, and promotion-ready workflow proof over V30
- Spec companion: `BITCODE_SPEC_V31.md`
- Notes companion: `BITCODE_SPEC_V31_NOTES.md`
- Parity companion: `BITCODE_SPEC_V31_PARITY_MATRIX.md`
- Generated proof appendix: none until V31 promotion

## Why V31 exists

V30 canonically promoted Protocol/BTD hardening beneath the commercial Reading and Terminal system.
It made package APIs, Bitcoin/Taproot/PSBT posture, BTD receipts, ledger projection, source-to-shares proof, bridge-readiness research boundaries, telemetry/proof hooks, interface regression, and promotion automation stronger.

V31 exists because the enterprise account/support plane now needs the same level of precision.
Auxillaries must stop being a collection of support panes and become a typed, source-safe, auditable user and organization control surface that Terminal, future Exchange, MCP, ChatGPT App, and API integrations can trust.
The focus is not Terminal transaction law, Exchange market depth, or new BTD tokenomics.
The focus is Profile, Connects, Interfaces, Wallet/BTD support, provider readiness, account state, organization/team/role/policy controls, readiness diagnostics, recovery flows, responsive/accessibility QA, and Auxillaries proof hooks.

## Accepted V31 decisions

- V30 remains active canon during V31 drafting.
- V31 gate branches are opened from `version/v31` and merged back only when their gate acceptance criteria are closed.
- V31 owns Auxillaries deepening, not another Terminal redesign.
- V31 preserves the V30 Reading journey: request Read, review synthesized Need, request Finding Fits, review source-safe AssetPack preview, buy/settle, and receive paid delivery.
- V31 narrows Auxillaries shared contracts before they become Exchange, interface, deployment, or documentation dependencies.
- V31 makes Profile, Connects, Interfaces, Wallet, BTD, organization, team, role, policy, readiness, and recovery state typed and testable.
- V31 preserves V30 BTD/settlement law while making Auxillaries support panes consume that law through package-owned objects.
- V31 makes provider readiness and recovery source-safe without storing or displaying secrets.
- V31 records Auxillaries telemetry and proof hooks without exposing protected source, provider tokens, private prompts, wallet secrets, service-role keys, or database credentials.
- V31 workflows and scripts must validate V30 active / V31 draft posture.

## Explicitly deferred

- V32 proof-family/provation expansion remains V32.
- V33 interface/MCP/ChatGPT/API depth remains V33 except for Protocol/BTD hooks needed by V31.
- V34 deployment/runtime/storage depth remains V34 except for host-capability facts needed by V31.
- V35 telemetry/documentation depth remains V35 except for Auxillaries telemetry hooks needed by V31.
- Exchange product/market depth remains beyond V35.
- Website Conversations product depth remains beyond V35.
- New `$BTD` supply law remains out of scope.
- Value-bearing mainnet launch remains separately approval-gated.
- Bridge integrations remain research posture, not chain-of-record implementation.

## Pre-Implementation Sequence

1. Open `version/v31` from promoted `main`.
2. Open `v31/gate-1-spec-roadmap-opening` from `version/v31`.
3. Create the V31 SPEC, DELTA, NOTES, and PARITY family while preserving `BITCODE_SPEC.txt -> V30`.
4. Refresh `SPECIFICATIONS_ROADMAP.md` so V30 is active canon, V31 is draft target, and V32-V37 scopes remain coherent after recent V28-V30 work.
5. Retarget gate-quality and canon-quality workflow posture checks to V30 active / V31 draft.
6. Add `check:v31-gate1` and a V31 Gate 1 checker.
7. Define V31 gates, acceptance criteria, carryforward parity rows, and post-V31 roadmap responsibilities.
8. Validate spec family, canonical inputs, canon posture, workflows, roadmap truth, README/docs, and diff hygiene.
9. Push the gate branch and open a pull request to `version/v31`.

## Commit-Body Direction

V31 gate commit bodies should describe the closed gate, specification changes, implementation surfaces, tests, proof commands, and accepted boundaries.
The eventual V31 promotion commit body must name all closed V31 gates, generated proof artifacts, Auxillaries support/control surfaces, and the `BITCODE_SPEC.txt` pointer change from `V30` to `V31`.
It must explicitly defer V32+ scopes, Exchange, Conversations, bridge chain-of-record implementation, and value-bearing mainnet launch.

## Gate Delta

### Gate 1: V31 Roadmap And Spec Opening

Gate 1 opens V31 correctly:

- V31 SPEC, DELTA, NOTES, and PARITY files exist.
- `BITCODE_SPEC.txt` remains `V30`.
- README, roadmap, PR template, and workflows describe V30 active / V31 draft posture.
- `check:v31-gate1` validates branch naming, spec family, notes, parity, roadmap truth, workflow posture, and promotion boundaries.
- The V31 gate list is explicit before product implementation begins.

### Gate 2: Auxillaries Package And Route Contracts

Gate 2 makes the Auxillaries API surface package-owned instead of route-local.

Closure acceptance:

- shared Auxillaries objects have package-owned builders, parsers, validators, tests, and JSON-safe serializers;
- Profile, Connects, Interfaces, Wallet, BTD, organization, readiness, and recovery routes delegate policy/readiness derivation to packages;
- no commercial runtime code imports `protocol-demonstration/src/*`;
- package and Auxillaries READMEs name ownership boundaries and accepted imports.

Gate 2 implementation centers:

- `packages/api/src/routes/auxillaries-contract.ts` owns `AuxillariesContractSnapshot`, `AuxillariesProfileState`, `AuxillariesConnectionReadiness`, `AuxillariesInterfaceAdmission`, `AuxillariesWalletBtdPaneState`, `OrganizationPolicyAuthority`, `AuxillariesReadinessDiagnostic`, `AuxillariesRecoveryRun`, JSON-safe serialization, parsing, validation, and proof-root derivation.
- `packages/api/src/routes/auxillaries.ts` remains the route-orchestration owner and delegates live and mock Auxillaries data to the package contract builders before response serialization.
- `packages/api/src/routes/__tests__/auxillaries-contract.test.ts` proves source-safe redaction, alias preservation, contract validation, diagnostic generation, and recovery-run roots.
- `scripts/check-v31-gate2-auxillaries-package-route-contracts.mjs` proves route-package boundaries, documentation/spec parity, commercial-runtime demonstration separation, and workflow coverage.

### Gate 3: Profile And Account State

Gate 3 deepens Profile and account support.

Closure acceptance:

- user profile, account identity, wallet binding, model/template preferences, notifications, and data-sharing posture are typed;
- incomplete profile/account state names blockers and recovery routes;
- focused package, route, and pane tests prove persistence, hydration, projection, and source-safety.

Gate 3 implementation centers:

- `AuxillariesProfileState` carries `accountIdentity`, `profileCompleteness.issues`, `profileCompleteness.repairRoutes`, `walletBinding`, `preferences`, `notificationPosture`, and `dataSharingPosture` as package-owned source-safe state.
- `/api/auxillaries/data` hydrates profile, GitHub connection, wallet status, BTD holdings, model preferences, template preferences, recent notifications, and repository inventory before delegating the read model to `buildAuxillaryDataPayload`.
- The Profile pane consumes `profileState` instead of locally deriving readiness, rendering account readiness, wallet, notification, data-sharing, and repair actions from the package contract.
- Focused tests prove account hydration, route projection, unread-notification posture, template preference posture, repair routes, and JSON-safe contract roots.

### Gate 4: Connects Provider Readiness And Recovery

Gate 4 deepens provider connection readiness.

Closure acceptance:

- provider readiness records name provider id, installation/account state, credential posture without secrets, scopes class, last readback, blocker, and repair action;
- GitHub and provider connection routes emit source-safe readiness/recovery evidence;
- recovery runs record before/after readiness roots and never leak tokens.

Gate 4 implementation centers:

- `AuxillariesConnectionReadiness` now names provider id/name, token presence class, scopes class, readback state, blocker, repair action, source-safe metadata, and `providerReadinessRoot`.
- VCS connection and GitHub Auxillaries routes emit `providerReadiness` and source-safe `recoveryRun` evidence while keeping access tokens out of responses.
- The Externals pane consumes `connectionReadiness` and `recoveryRuns` from `/api/auxillaries/data`, rendering classified provider posture and compact proof roots without local readiness rederivation.
- Focused package, route, and pane tests prove classified provider readiness, before/after recovery roots, UI projection, and response redaction.

### Gate 5: Wallet And BTD Pane Readiness

Gate 5 connects Wallet and BTD panes to V30 wallet/BTD primitives.

Closure acceptance:

- Wallet pane state consumes no-custody signer posture, wallet capability, and network readiness;
- BTD pane state consumes range/read-right/treasury/settlement readiness without protected source;
- treasury and organization BTD support remain distinct from Exchange market state.

Gate 5 implementation centers:

- `packages/btd/src/auxillaries-support.ts` owns `BtdWalletBtdSupportProjection`, deriving no-custody wallet capability, signer posture, network readiness, BTD range/read-right counts, account treasury posture, settlement blockers, and source-safe roots;
- `packages/api/src/routes/auxillaries-contract.ts` maps that BTD package projection into `AuxillariesWalletBtdPaneState` so `/api/auxillaries/data` returns one package-owned Wallet/BTD support object;
- `uapi/app/auxillaries/components/AuxillariesWalletPane.tsx` renders signer, network, range, read-right, settlement, treasury-boundary, and proof-root readouts from `walletBtdPaneState` rather than locally rederiving BTD law;
- focused BTD, API, route, and pane tests prove no-custody posture, range/read-right summary, protected-source non-disclosure, and explicit non-Exchange treasury classification.

### Gate 6: Organization Team Role Policy Authority

Gate 6 deepens organization and policy authority.

Closure acceptance:

- organization, team, member role, explicit grant, multi-sig readiness, wallet binding, policy decision, denial reason, and recovery route are typed;
- protected-source and settlement-adjacent actions fail closed unless all authority inputs admit them;
- Terminal organization authority and Auxillaries organization surfaces consume the same package-owned authority object.

### Gate 7: Interfaces Pane Admission And Cross-Surface Contracts

Gate 7 makes the Interfaces pane a source-safe admission catalog.

Closure acceptance:

- admitted Terminal, API, MCP, ChatGPT App, Exchange, and future hooks are represented as interface-admission records;
- each record names auth mode, supported actions, source-safety class, policy requirements, blockers, and readiness;
- V31 does not implement deferred Exchange market law or Conversations product depth.

### Gate 8: Auxillaries UX Accessibility And Responsive Proof

Gate 8 proves the user experience.

Closure acceptance:

- Auxillaries defaults to guided low-detail state with expandable audit detail;
- Profile, Connects, Interfaces, Wallet/BTD, and organization panes work across mobile and desktop without overlap;
- keyboard, focus, labels, state announcement, contrast, and reduced-motion posture are tested.

### Gate 9: Auxillaries Telemetry Proof And Recovery Runs

Gate 9 adds Auxillaries telemetry and recovery proof.

Closure acceptance:

- telemetry subjects include profile, account, provider connection, interface admission, wallet, BTD pane, organization authority, policy decision, readiness diagnostic, and recovery run;
- proof hooks bind theorem id, replay step id, evidence root, telemetry root, source-safety class, and blocker/repair outcome;
- recovery runs are executions with source-safe before/after evidence and route/UI readback.

### Gate 10: V31 Promotion Readiness

Gate 10 owns final local/staging proof, generated artifacts, and V31 promotion workflow support.

Closure acceptance:

- `check:v31-gate10` validates promoted-readiness posture;
- V31 promotion workflow validates source branch, local proof commands, Auxillaries evidence, generated `.bitcode/v31-*` reports, and `BITCODE_SPEC_V31_PROVEN.md`;
- promotion scripts support V31 and rewrite post-promotion active V31 / draft V32 posture;
- `version/v31` can be requested into `main` only after all V31 gates close.

Gate 10 implementation centers:

- `scripts/check-v31-gate10-promotion-readiness.mjs`;
- `.github/workflows/v31-canon-promotion.yml`;
- V31 support in `scripts/promote-bitcode-canon.mjs`;
- V31 status rewriting in `scripts/prepare-bitcode-spec-family-promotion.mjs`;
- V31 generated appendix/artifact support in `packages/protocol/src/canonical/proven-generator.js`;
- generated `.bitcode/v31-*` artifacts and source-safe `BITCODE_V31_QA.md`.
