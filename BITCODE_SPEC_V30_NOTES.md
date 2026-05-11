# Bitcode Spec V30 Notes

## Status

- Version: `V30`
- V30 state: future notes scaffold only
- Current canonical/latest target: `V27`
- Current active draft target: `V28`
- Prior canonical anchor: `BITCODE_SPEC_V27.md`
- Prior generated proof appendix: `BITCODE_SPEC_V27_PROVEN.md`
- Generated structured artifact inventory: none for V30 yet
- Source parity state: not opened; V30 source parity begins only after V30 draft opening
- Scope: future notes for Protocol/BTD hardening after V28 commercial Protocol/Terminal MVP and V29 deeper Terminal work. Exchange is deferred beyond V35.

This NOTES file does not promote V30 and does not open V30 implementation.
It preserves roadmap intent so V28 can remain focused on commercial Protocol/Terminal MVP QA, bugfixing, audit, and hardening.

## Notes companion rule

This file is planning memory only.
Requirements become binding only when V30 is explicitly opened as the draft-target SPEC family.

## Concise current-system reading

V27 is active canon.
V28 is current draft target and owns commercial Protocol implementation, Terminal MVP QA, MCP API/ChatGPT App MVP, BTD/testnet/ledgerization, and demonstration-to-commercial boundary cleanup.
V29 is expected to deepen Terminal workflows.
V30 is expected to harden Protocol/BTD surfaces after V28/V29 reveal implementation pressure.
Exchange is not V30 work.

## Intended V30 focus

V30 owns Protocol/BTD hardening:

- follow-up package extraction and narrower package APIs after V28 removes commercial dependencies on `protocol-demonstration/`;
- Bitcoin/Taproot/PSBT rigor after V28 testnet use;
- BTD-AssetPack mint/read receipt hardening after V28 synthetic measurement and ledgerized journal proof;
- testnet ledger, database projection, and reconciliation hardening;
- bridge-readiness research notes for Taproot, BitVM, BSC/opBNB, Binance Web3 Wallet, and future distribution paths without treating them as current `$BTD` chain-of-record truth;
- source-to-shares proof cleanup revealed by V28/V29;
- Protocol/BTD-specific tests, proofs, and telemetry hooks needed before Exchange returns beyond V35.

## Boundaries

V30 must not redefine `$BTD` supply, BTC fee separation, AssetPack range identity, owner-read/licensed-read law, measureminting, or ancestry.
V30 must not absorb V31 Auxillaries expansion, V32 provation/testing depth, V33 interface depth, V34 deployment depth, or V35 telemetry/documenting depth except for narrow Protocol/BTD-owned hooks.
V30 must not absorb Exchange or website Conversations; those return beyond V35.

## Return To V28

Do not start V30 implementation during V28.
Use this scaffold only to keep V28 focused on commercial Protocol/Terminal MVP QA and hardening.
