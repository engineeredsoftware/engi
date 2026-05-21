# Bitcode Spec V30 Notes

## Status

- Version: `V30`
- V30 state: draft target opened; Gate 1 converts this file from planning memory into the V30 notes companion
- Current canonical/latest target: `V29`
- Current active draft target: `V30`
- Canonical pointer: `BITCODE_SPEC.txt` -> `V29`
- Active canonical anchor: `BITCODE_SPEC_V29.md`
- Active generated proof appendix: `BITCODE_SPEC_V29_PROVEN.md`
- Prior canonical anchor: `BITCODE_SPEC_V29.md`
- Prior generated proof appendix: `BITCODE_SPEC_V29_PROVEN.md`
- Generated structured artifact inventory: none for V30 yet
- Source parity state: V30 source parity begins with Gate 1 roadmap/gating and then closes through Protocol/BTD package API, Bitcoin/PSBT, BTD receipt, ledger projection, source-to-shares, bridge-readiness, telemetry/proof, interface-regression, and promotion-readiness gates
- Scope: future notes for Protocol/BTD hardening after V28 commercial Protocol/Terminal MVP and V29 deeper Terminal work. Exchange is deferred beyond V35.

This NOTES file does not promote V30.
Gate 1 opens V30 implementation discipline from promoted V29 without rediscovering deferred Protocol/BTD hardening pressure.

## Notes companion rule

This file is a required companion to `BITCODE_SPEC_V30.md`.
It may carry planning detail, QA observations, and simplified reading, but it must not override the main V30 SPEC.
Binding V30 requirements must be reflected in SPEC, DELTA, and PARITY before a gate closes.

## Concise current-system reading

V29 is active canon.
V30 hardens Protocol/BTD surfaces after V28/V29 revealed implementation pressure.
Exchange is not V30 work.

## Simplified-spec reading rule

For a simplified reading of V30:

1. V29 is the current law.
2. V30 does not change `$BTD` supply, BTC fee asset, source-safe paid unlock, or the five-step Reading journey.
3. V30 makes the underlying Protocol/BTD rails more precise: packages, Bitcoin fee flow, receipts, ledger projection, source-to-shares accounting, bridge boundaries, telemetry, and proof hooks.
4. If a Protocol/BTD fact matters for money, source visibility, rights, proof, delivery, or repair, it must be typed, stored, testable, and source-safe.
5. `BITCODE_SPEC.txt` remains `V29` until V30 promotion automation advances canon.

## Deferred from V29

V29 canonically closes deeper Terminal transaction depth, local/staging promotion readiness, and promotion automation.
V30 inherits deferred hardening pressure around Bitcoin fee boundaries, GitHub delivery evidence, compute/runtime capability truth, storage/readback posture, and build/process proof surfaces.

## Candidate V30 workstreams

V30 owns Protocol/BTD hardening:

- follow-up package extraction and narrower package APIs after V28 removes commercial dependencies on `protocol-demonstration/`;
- Bitcoin/Taproot/PSBT rigor after V28 testnet use;
- BTD-AssetPack mint/read receipt hardening after V28 synthetic measurement and ledgerized journal proof;
- testnet ledger, database projection, and reconciliation hardening;
- bridge-readiness research notes for Taproot, BitVM, BSC/opBNB, Binance Web3 Wallet, and future distribution paths without treating them as current `$BTD` chain-of-record truth;
- source-to-shares proof cleanup revealed by V28/V29;
- Protocol/BTD-specific tests, proofs, and telemetry hooks needed before Exchange returns beyond V35.

## V30 gate plan

1. **Gate 1: V30 Roadmap And Gating**
   - Open the V30 spec family.
   - Refresh `SPECIFICATIONS_ROADMAP.md` to current V29 active / V30 draft truth and V31-V37 progressive scopes.
   - Wire V30 Gate 1 checks, README posture, PR title guidance, gate-quality, and canon-quality posture.

2. **Gate 2: Protocol Package API Boundaries**
   - Narrow package APIs for shared Protocol/BTD objects used by API, Terminal, MCP, ChatGPT App, and future Auxillaries/Exchange work.
   - Require package-owned builders, validators, parsers, tests, and JSON-safe serialization before cross-interface use.

3. **Gate 3: Bitcoin Taproot PSBT Fee Rigor**
   - Harden BTC fee quote, signer recovery, PSBT, Taproot/script posture, broadcast, replacement, reorg, finality, and testnet/mainnet boundaries.

4. **Gate 4: BTD AssetPack Mint And Read Receipts**
   - Make BTD mint, read, and rights-transfer receipts typed, proof-rooted, stored, streamed, and source-safe.

5. **Gate 5: Testnet Ledger Projection Hardening**
   - Harden ledger/database/object-storage projection, repair, proof roots, and staging-testnet readback.

6. **Gate 6: Source-To-Shares Proof Cleanup**
   - Clean contribution measurements, settlement conservation, zero-cell/refit tail, ancestry, and no-overpayment/no-underpayment proof surfaces.

7. **Gate 7: Bridge Readiness Research Boundaries**
   - Document Taproot, BitVM, BSC/opBNB, Binance Web3 Wallet, and future bridge postures without admitting any as current chain-of-record truth.

8. **Gate 8: Protocol Telemetry And Proof Hooks**
   - Add typed Protocol/BTD telemetry and proof hooks needed by V32 provation, V34 deployment, and V35 documentation/observability.

9. **Gate 9: Interface Integration And Regression Proof**
   - Prove existing interfaces consume package-owned Protocol/BTD objects without regressing V29 Terminal transaction behavior.

10. **Gate 10: V30 Promotion Readiness**
    - Close local/staging proof, generated artifacts, V30 promotion workflow, and post-promotion V30 active / V31 draft posture.

## Gate 1 working notes

Gate 1 is complete only when the V30 family exists, validates in draft mode over active V29, and makes the roadmap truthful enough to drive V31 through V37 without stale V27/V28/V29 posture.
Gate 1 does not implement Protocol/BTD product hardening; it creates the exact gate map, checks, and documentation needed to do that hardening safely.

## Non-goals during V30 opening

V30 must not redefine `$BTD` supply, BTC fee separation, AssetPack range identity, owner-read/licensed-read law, measureminting, or ancestry.
V30 must not absorb V31 Auxillaries expansion, V32 provation/testing depth, V33 interface depth, V34 deployment depth, or V35 telemetry/documenting depth except for narrow Protocol/BTD-owned hooks.
V30 must not absorb Exchange or website Conversations; those return beyond V35.
