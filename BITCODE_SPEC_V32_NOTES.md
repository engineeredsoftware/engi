# Bitcode Spec V32 Notes

## Status

- Version: `V32`
- V32 state: draft target opened; V32 is not promoted
- Current canonical/latest target: `V31`
- Current active draft target: `V32`
- Prior canonical anchor: `BITCODE_SPEC_V31.md`
- Prior generated proof appendix: `BITCODE_SPEC_V31_PROVEN.md`
- Generated structured artifact inventory: planned `.bitcode/v32-spec-family-report.json`, `.bitcode/v32-canonical-input-report.json`, `.bitcode/v32-canon-posture-drift-report.json`, V32 proof/test coverage artifacts, and `BITCODE_SPEC_V32_PROVEN.md` only at promotion
- Source parity state: V32 proof/test parity begins with Gate 1 and closes only through gate-specific implementation, tests, documentation, and workflow evidence
- Scope: deeper provation and testing over promoted Terminal, Reading, Protocol/BTD, Auxillaries, MCP, ChatGPT App, API, ledger/database/object-storage, and protocol-demonstration surfaces.

This NOTES file does not promote V32.
It binds the working V32 gate plan while `BITCODE_SPEC.txt` remains `V31`.

## Notes companion rule

This file is a working companion to `BITCODE_SPEC_V32.md`.
When a V32 gate finds that proof/test architecture needs a clearer algorithm, object, fixture, command, or failure boundary, the SPEC, DELTA, PARITY, ROADMAP, implementation, and tests must be updated together.

## Simplified-spec reading rule

V32 should be read as: promoted V31 already owns the commercial surfaces; V32 proves those surfaces deeply enough to trust future enterprise shippability.
V32 does not add product surface depth for its own sake.
It adds proof, replay, regression, scenario, failure-state, browser, accessibility, visual, readiness, and promotion evidence where promoted behavior needs stronger confidence.

## Concise current-system reading

The current system is V31 active canon with V32 open as a proof/testing draft target.
Terminal, Reading, Protocol/BTD, Auxillaries, MCP, ChatGPT App, API, ledger/database/object-storage, and the standalone demonstration are already promoted surfaces.
V32 asks whether those promoted surfaces can be replayed, tested, diffed, and promoted with enough source-safe evidence to support enterprise shippability.

## V32 gate plan

### Gate 1: V32 Roadmap And Spec Opening

Open the V32 draft family over active V31:

- create `BITCODE_SPEC_V32.md`, DELTA, NOTES, and PARITY;
- preserve `BITCODE_SPEC.txt -> V31`;
- update roadmap, README, PR template, workflow posture, package scripts, and Gate 1 checker;
- keep V33-V37 scopes coherent after V31 promotion.

### Gate 2: Proof Matrix Inventory And Required Contexts

Inventory all promoted proof/test surfaces and define required V32 coverage:

- Terminal, Reading, Protocol/BTD, Auxillaries, MCP, ChatGPT App, API, ledger, database, object storage, promotion, and protocol-demonstration;
- owner package/interface, fixture, replay command, artifact path, source-safety class, and failure mode per row;
- explicit planned work for every coverage gap.

### Gate 3: Deterministic Replay Harness And Artifact Stability

Harden generated artifact repeatability:

- stable JSON ordering and source-safe payloads;
- volatility inventories for accepted variable fields;
- fail-closed checks for stale, missing, malformed, or non-regenerable artifacts.

### Gate 4: Reading Pipeline Proof Coverage

Deepen `ReadNeedComprehensionSynthesis` and `ReadFitsFindingSynthesis` coverage:

- phase/agent/step/sub-step/tool/prompt telemetry assertions;
- PTRR agent and ThricifiedGeneration typed output coverage;
- mock coverage for every inference point and real-inference seam validation without committing secrets;
- source-safe preview, paid unlock, and PR delivery proof boundaries.

### Gate 5: Ledger BTD Settlement Failure-State Coverage

Deepen proof over economic and ownership state:

- BTC fee quotes, Taproot/PSBT posture, network policy, broadcast/finality states;
- BTD range/read-license/right-transfer receipts;
- ledger/database/object-storage/PR delivery synchronization;
- settlement repair and reconciliation roots.

### Gate 6: Interface Contract Regression Suites

Harden API, MCP, ChatGPT App, Terminal, Auxillaries, and deferred-interface contracts:

- route schemas, tool contracts, auth boundaries, policy denials, and source-safety classes;
- shared fixtures and reusable contract tests;
- Exchange and Conversations remain deferred product-depth hooks with tested blockers.

### Gate 7: Browser Accessibility Responsive Visual Coverage

Expand operator-facing proof:

- Terminal and Auxillaries default/guided/detail states across desktop and mobile;
- keyboard, labels, focus, contrast, reduced motion, overflow, and visual regression evidence;
- semantic browser assertions where they are more stable than screenshots.

### Gate 8: Testnet And Mainnet Readiness Rehearsal

Rehearse environment readiness without admitting value-bearing launch:

- local, staging-testnet, production-mainnet, and disabled/offline lanes;
- secret presence classes, provider connectivity, ledger/database/object-storage posture, BTC network posture, rollback, and repair;
- production-mainnet remains blocked unless a future explicit launch gate admits it.

### Gate 9: Promotion Proof Generation Hardening

Make promotion evidence easier to debug:

- dry-run and check modes for generated V32 proof;
- clear stale-posture and artifact-drift failures;
- source-safe generated artifact diffs;
- branch-protection friendly promotion commits.

### Gate 10: V32 Promotion Readiness

Close V32:

- `check:v32-gate10`;
- V32 promotion workflow;
- V32 generated `.bitcode/v32-*` artifacts;
- `BITCODE_SPEC_V32_PROVEN.md`;
- active V32 / draft V33 runtime posture after promotion.

## Carryforward boundaries

- V32 does not redefine V31 Reading, Finding Fits, AssetPack preview, settlement, delivery, BTD, or BTC fee law.
- V32 does not implement Exchange market depth or website Conversations product depth.
- V32 does not approve production-mainnet value-bearing launch.
- V32 may add test-only fixtures, source-safe proof objects, generated artifacts, scripts, and workflow coverage needed to prove existing behavior.
