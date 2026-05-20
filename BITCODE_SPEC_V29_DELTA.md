# Bitcode Spec V29 Delta

## Status

- Version: `V29`
- V29 state: draft target opened; this delta records V29's planned Terminal-depth changes over promoted V28
- Current canonical/latest target: `V28`
- Prior canonical anchor: `BITCODE_SPEC_V28.md`
- Prior generated proof appendix: `BITCODE_SPEC_V28_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v29-spec-family-report.json`, draft `.bitcode/v29-canonical-input-report.json`, future `.bitcode/v29-canon-posture-drift-report.json`, and no `BITCODE_SPEC_V29_PROVEN.md` until promotion
- Source parity state: V29 delta truth is opened in documentation and gate-quality scripts; product implementation begins only through V29 gate branches
- State: draft target delta opened
- Active canonical pointer during draft opening: `BITCODE_SPEC.txt` -> `V28`
- Scope: V29 delta for deeper Terminal transaction operation after V28 commercial Reading, AssetPack, settlement, delivery, and promotion closure
- Spec companion: `BITCODE_SPEC_V29.md`
- Notes companion: `BITCODE_SPEC_V29_NOTES.md`
- Parity companion: `BITCODE_SPEC_V29_PARITY_MATRIX.md`
- Generated proof appendix: none until V29 promotion

## Why V29 exists

V28 canonically promoted the first commercial Bitcode Protocol and Terminal MVP:

- Depositing creates source-bound depository evidence.
- Read Request to Read-Need comprehension is formalized.
- Finding Fits searches the depository and synthesizes source-safe AssetPack previews.
- Settlement, read-license/right transfer, and PR delivery are specified and implemented at MVP depth.
- Gate, branch, commit, CI, and promotion governance are formalized.

V29 exists because the Terminal now needs enterprise operational depth.
The product must not merely complete the happy path; it must make every transaction state navigable, recoverable, provable, and comprehensible.

## Accepted V29 decisions

- V28 remains active canon during V29 drafting.
- V29 owns deeper Terminal workflows and transaction operation.
- V29 gate branches are opened from `version/v29` and merged back only when their gate acceptance criteria are closed.
- V29 preserves the V28 five-step Reading UX: request Read, review synthesized Need, request Finding Fits, review source-safe AssetPack preview, buy/settle.
- V29 deepens wallet, signer-session, BTC fee, PSBT, broadcast, replacement, reorg, blocked-readiness, and failure recovery in Terminal.
- V29 deepens AssetPack range detail, owner-read, licensed-read, denied-state, source-safe preview, paid unlock, and access-policy review.
- V29 deepens Terminal journal diffing, ledger/database/metaphysical separation, reconciliation repair, and proof-root surfacing.
- V29 deepens organization holdings, roles, read-license usage, and registry-derived permission decisions.
- V29 continues formalizing demonstration-origin commercial internals into packages and narrow APIs without importing `protocol-demonstration/` runtime code.
- V29 workflows and scripts must be retargeted to active V28 and draft V29.

## Explicitly deferred

- Exchange product/market depth remains beyond V29.
- Website Conversations product depth remains beyond V29.
- New `$BTD` supply law remains out of scope.
- Value-bearing mainnet launch remains separately approval-gated.
- Full provider-family completion remains out of scope unless a Terminal transaction gate requires a narrow hook.
- V30 remains the home for Protocol/BTD hardening discovered during V28/V29 when the hardening is not required to complete Terminal transaction depth.
- V31+ scopes remain future unless explicitly reopened by a later spec.

## Pre-Implementation Sequence

1. Open `version/v29` from promoted `main`.
2. Open `v29/gate-1-objectives-and-gating` from `version/v29`.
3. Create the V29 SPEC, DELTA, NOTES, and PARITY family while preserving `BITCODE_SPEC.txt -> V28`.
4. Retarget gate-quality and canon-quality workflow posture checks from V27/V28 to V28/V29.
5. Add a V29 Gate 1 checker and package script.
6. Define V29 gates, acceptance criteria, and carryforward parity rows.
7. Validate spec family, canonical inputs, canon posture, workflows, and diff hygiene.
8. Push the gate branch and open a pull request to `version/v29`.

## Commit-Body Direction

V29 gate commit bodies should describe the closed gate, the spec-family changes, the implementation surfaces, the validation commands, and any accepted boundaries.
The eventual V29 promotion commit body must name the Terminal transaction-depth surfaces, list all closed V29 gates, cite generated proof artifacts, state that `BITCODE_SPEC.txt` advances from `V28` to `V29`, and explicitly defer Exchange/Conversations/value-bearing-mainnet work.

## Gate Delta

### Gate 1: V29 Objectives And Gating

Gate 1 opens V29 correctly:

- V29 SPEC, DELTA, NOTES, and PARITY files exist.
- `BITCODE_SPEC.txt` remains `V28`.
- README and workflows describe V28 active / V29 draft posture.
- `check:v29-gate1` validates branch naming, spec family, notes, parity, workflow posture, and promotion boundaries.
- The V29 gate list is explicit before product implementation begins.

### Gate 2: Terminal Transaction Read Models And Navigation

Gate 2 owns URL-addressable transaction state, Terminal state machine, detail panes, execution-to-transaction read models, low-detail defaults, expandable detail, and no raw-JSON dependency for ordinary operators.

Closure acceptance:

- the Terminal writes a selected transaction id into the route whenever live, projected, or review-fallback activity is selectable;
- former `runId` links continue resolving but are rewritten to `transactionId`;
- a typed `TerminalTransactionReadModel` derives the selected activity's low-detail operator summary, section navigation, active detail focus, and expandable audit posture;
- Shippables, identity, closure, proofs, history, journal, activity stream, and console sections expose availability, target ids, route hrefs, and blocking reasons without raw JSON inspection;
- console detail is blocked outside live execution-history mode rather than presented as an inert or misleading section;
- unit tests cover route recovery, section availability, legacy query migration, low-detail defaults, and filter/pagination preservation;
- V29 SPEC, DELTA, NOTES, PARITY, Terminal README, package scripts, and gate-quality workflow name the Gate 2 closure surface.

### Gate 3: Wallet Signer Session And BTC Fee Operations

Gate 3 owns wallet connection depth, signer-session recovery, BTC fee quote lifecycle, PSBT handoff, broadcast/finality/replacement/reorg/failure states, blocked-readiness receipts, and no server-custody posture.

### Gate 4: Reading Transaction Recovery And Pipeline Observability

Gate 4 owns deep Terminal visibility over `ReadNeedComprehensionSynthesis` and `ReadFitsFindingSynthesis`, including execution, phase, PTRR agent, PTRR step, ThricifiedGeneration, prompt, tool, output, and typed parse telemetry.

### Gate 5: AssetPack Disclosure Rights And Preview Depth

Gate 5 owns AssetPack range detail, owner-read/licensed-read/denied-state flows, source-safe preview, disclosure policy review, paid unlock state, and protected-source leakage tests.

### Gate 6: Settlement Reconciliation And Repair

Gate 6 owns ledger/database/metaphysical separation, journal diffing, reconciliation repair actions, proof-root surfacing, settlement conservation drift handling, and delivery recovery.

### Gate 7: Organization Permissions And Interface Authority

Gate 7 owns organization holdings, roles, read-license usage, registry-derived permission decisions, MCP/ChatGPT action authority alignment, and Terminal permission explainers.

### Gate 8: Demonstration-Origin Commercial Formalization

Gate 8 owns cleanup of freshly ported demonstration-origin internals into package-native APIs, no demonstration runtime imports, durable package tests, and updated internal/public documentation.

### Gate 9: Terminal UX Quality And Browser Proof

Gate 9 owns accessibility, responsive layout, copy/prose clarity, empty/loading/blocked/failed states, Playwright coverage, and visual/browser verification for the complete Terminal transaction cockpit.

### Gate 10: Local And Staging Promotion Readiness

Gate 10 owns non-mocked local validation, staging-testnet readback, generated proof artifacts, V29 promotion workflow support, promotion dry-run, and final version branch readiness.
