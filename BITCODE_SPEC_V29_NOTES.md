# Bitcode Spec V29 Notes

## Status

- Version: `V29`
- V29 state: draft target opened; V29 notes now track active V28 canon and V29 Terminal-depth gate planning
- Current canonical/latest target: `V28`
- Prior canonical anchor: `BITCODE_SPEC_V28.md`
- Prior generated proof appendix: `BITCODE_SPEC_V28_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v29-spec-family-report.json`, draft `.bitcode/v29-canonical-input-report.json`, future `.bitcode/v29-canon-posture-drift-report.json`, and no `BITCODE_SPEC_V29_PROVEN.md` until promotion
- Source parity state: notes opened from V28 handoff; source implementation begins gate-by-gate after Gate 1
- Scope: V29 notes for deeper Terminal workflow, transaction operation, evidence readability, wallet/BTC operation, settlement repair, organization permission, and promotion-readiness work.

## Notes companion rule

This file is a required companion to `BITCODE_SPEC_V29.md`.
It may carry planning detail, QA observations, and simplified reading, but it must not override the main V29 SPEC.
Binding V29 requirements must be reflected in SPEC, DELTA, and PARITY before a gate closes.

## Concise current-system reading

V28 is active canon.
V29 is the current draft target and owns deeper Terminal transaction operation over the promoted V28 commercial Reading system.

The V28 system already defines:

- source Depositing into the Bitcode depository;
- Read Request to reviewed Read-Need comprehension;
- Finding Fits over fit deposits in the depository;
- source-safe AssetPack preview before settlement;
- BTC fee posture, BTD range/read-license/right transfer, and delivery;
- ledger/database reconciliation, telemetry, and promotion governance at MVP depth.

V29's job is to make those flows operationally excellent in Terminal: recoverable, navigable, typed, inspectable, accessible, and promotion-proven.

## Simplified-spec reading rule

For a simplified reading of V29:

1. V28 is the current law.
2. V29 does not change the law of BTD supply, BTC fee asset, or source-safe paid unlock.
3. V29 improves how a commercial operator uses Terminal to carry a transaction from readiness through paid delivery and repair.
4. If a Terminal state is important for money, source visibility, rights, proof, or delivery, it must be visible, typed, and recoverable.
5. `BITCODE_SPEC.txt` must remain `V28` until the V29 promotion workflow commits the canonical pointer change.

## V29 gate plan

1. **Gate 1: V29 Objectives And Gating**
   - Open the V29 spec family.
   - Retarget workflows and branch/readme posture to active V28 / draft V29.
   - Add a Gate 1 checker and define all V29 gates.

2. **Gate 2: Terminal Transaction Read Models And Navigation**
   - Build URL-addressable Terminal transaction state, typed read models, default-low-detail navigation, and expandable detail panes.

3. **Gate 3: Wallet Signer Session And BTC Fee Operations**
   - Deepen signer-session recovery, BTC fee quote, PSBT handoff, broadcast, replacement, reorg, failure, and blocked-readiness states.

4. **Gate 4: Reading Transaction Recovery And Pipeline Observability**
   - Make `ReadNeedComprehensionSynthesis` and `ReadFitsFindingSynthesis` execution telemetry fully readable in Terminal at execution, phase, PTRR agent, PTRR step, ThricifiedGeneration, prompt, tool, raw output, and parsed output levels.

5. **Gate 5: AssetPack Disclosure Rights And Preview Depth**
   - Deepen source-safe preview, AssetPack range detail, owner-read/licensed-read/denied state, disclosure policy review, paid unlock, and source-leakage tests.

6. **Gate 6: Settlement Reconciliation And Repair**
   - Make ledger/database/metaphysical separation, journal diffing, reconciliation repair, proof roots, and delivery recovery ordinary Terminal workflows.

7. **Gate 7: Organization Permissions And Interface Authority**
   - Deepen org holdings, roles, read-license usage, registry-derived permission decisions, and MCP/ChatGPT action authority parity.

8. **Gate 8: Demonstration-Origin Commercial Formalization**
   - Continue moving freshly ported internals into package-native APIs and durable tests while preserving the standalone demonstration boundary.

9. **Gate 9: Terminal UX Quality And Browser Proof**
   - Close accessibility, responsive, copy, loading/empty/error/blocked states, browser checks, and Playwright coverage for the complete Terminal cockpit.

10. **Gate 10: Local And Staging Promotion Readiness**
    - Run non-mocked local validation, staging-testnet readback, generated proof artifacts, promotion dry-run, and `version/v29` promotion readiness.

## Gate 1 closure notes

Gate 1 is complete only when the V29 family exists, validates, and is wired to CI.
It intentionally does not claim Terminal product closure.

Gate 1 accepted evidence:

- `BITCODE_SPEC_V29.md`, DELTA, NOTES, and PARITY exist.
- `BITCODE_SPEC.txt` remains `V28`.
- workflows and README describe V28 active / V29 draft posture.
- `pnpm run check:v29-gate1` validates branch, posture, workflow, docs, and spec-family shape.

## Later-version boundaries

- V30 remains reserved for Protocol/BTD hardening that is not necessary to close Terminal transaction depth.
- V31+ scopes remain future unless a later spec family reopens them.
- Exchange and website Conversations remain outside V29 product depth.
- Value-bearing mainnet remains separately approved.
