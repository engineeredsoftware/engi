# Bitcode Spec V29 Notes

## Status

- Version: `V29`
- V29 state: future notes scaffold only
- Current canonical/latest target: `V27`
- Current active draft target: `V28`
- Prior canonical anchor: `BITCODE_SPEC_V27.md`
- Prior generated proof appendix: `BITCODE_SPEC_V27_PROVEN.md`
- Generated structured artifact inventory: none for V29 yet
- Source parity state: not opened; V29 source parity begins only after V29 draft opening
- Scope: future notes for deeper Terminal work after V28 commercial Protocol/Terminal MVP QA.

This NOTES file does not promote V29 and does not open V29 implementation.
It preserves roadmap intent so V28 can remain focused on commercial Protocol/Terminal MVP QA, bugfixing, audit, and hardening.

## Notes companion rule

This file is planning memory only.
Requirements become binding only when V29 is explicitly opened as the draft-target SPEC family.

## Concise current-system reading

V27 is active canon.
V28 is current draft target and owns commercial Protocol implementation, Terminal MVP QA, MCP API/ChatGPT App MVP, BTD/testnet/ledgerization, and demonstration-to-commercial boundary cleanup.
V29 is expected to deepen Terminal after the Terminal/Protocol shell, Auxillaries active shell, BTD disclosure, MCP/ChatGPT MVP, and route QA are stable.

## Intended V29 focus

V29 owns deeper Terminal:

- full Need submission, measurement, review, Fit, proof, dedupe, measuremint, and settlement workflows;
- wallet connection, signer-session recovery, BTC fee preparation, PSBT handoff, broadcast, replacement, reorg, and failure recovery depth;
- AssetPack range detail, owner-read, licensed-read, denied-state, and access-policy review as ordinary operator workflows;
- Terminal journal diffing, reconciliation repair, ledger/database/metaphysical state separation, and proof-root surfacing;
- organization holdings, team roles, read-license usage, and registry-derived Terminal permission decisions;
- Terminal-specific route, UI, accessibility, responsive, error-state, and Playwright coverage.
- Terminal prose, labels, explainers, and read/write guidance refined for clearer commercial comprehension while preserving V27 technical law.

## Inputs deferred from V28 QA

- May 7, 2026 V28 manual QA accepted Terminal as the primary operator surface at MVP level but identified prose clarity as a Terminal-focused improvement.
- V29 should improve Terminal copy, hierarchy, explanatory precision, and operator sequencing around Give, Need, Fit, proof, AssetPack, BTC fee posture, BTD range/read-right posture, and selected activity detail.
- This is not a V28 blocker unless specific wording prevents a user from completing basic V28 MVP navigation or materially misstates Bitcode law.
- May 7, 2026 follow-up QA clarified that Terminal should not present itself as a market-wide master-detail product surface. V28 must fix that MVP architecture and any obvious dead/ambiguous click targets; V29 should then deepen Terminal-specific sequencing, density management, task progression, and richer Give/Need result reading without reintroducing Exchange-style market language.
- V28 introduces a formal `@bitcode/protocol` package and removes direct commercial imports from the standalone `protocol-demonstration`, but some package internals are intentionally fresh ports for parity. V29 must continue commercializing those demonstration-origin internals into formal packages, narrower APIs, durable package tests, and Terminal-owned protocol adapters.
- The standalone `protocol-demonstration` should remain a sibling reference guide and proof witness outside the workspace build graph. V29 should use it to reveal commercial implementation gaps, not as runtime code imported by commercial UAPI, Terminal, Auxillaries, MCP, ChatGPT App, or package consumers.

## Boundaries

V29 deepens Terminal only after V28 establishes commercial Protocol/Terminal MVP coherence.
It must not absorb V30 Protocol/BTD hardening, V31 Auxillaries depth, V32 provation/testing depth, V33 interface finalization, V34 deployment depth, V35 telemetry/documentation depth, or V36+ Exchange/Conversations depth except for narrow Terminal-owned hooks.

V29 must also avoid reopening V28's demonstration/commercial boundary.
Any Terminal feature that currently depends on freshly ported demonstration-origin modules should be formalized in-place inside commercial packages or replaced with package-native primitives, while the standalone demonstration stays a reference implementation.

## Return To V28

Do not start V29 implementation during V28.
Record Terminal gaps found during V28 QA as future V29 inputs unless they block V28 commercial Protocol/Terminal MVP usability.
