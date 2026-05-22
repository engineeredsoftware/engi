# Bitcode Spec V33 Notes

## Status

- Version: `V33`
- Canonical pointer: `BITCODE_SPEC.txt` -> `V32`
- Active canonical anchor: `BITCODE_SPEC_V32.md`
- Active generated proof appendix: `BITCODE_SPEC_V32_PROVEN.md`
- V33 state: notes-only draft opening
- Current canonical/latest target: `V32`
- Current active draft target: `V33`
- Generated structured artifact inventory: none for V33 yet
- Source parity state: notes-only opening; V33 source parity begins only after the first gate opens implementation.
- Scope: next-version notes for interface, integration, and enterprise shippability depth after V32 provation/testing closure.

This NOTES file does not promote V33 and does not authorize implementation before a scoped V33 gate branch opens.

## Notes-only draft rule

This file is planning memory only while V32 is canon.
Requirements become binding only when V33 is explicitly opened as the draft-target SPEC family on `version/v33` and then through numbered V33 gate branches.
Any V33 implementation must be gate-scoped, never not first-gate work hidden in a promotion repair branch.

## Concise current-system reading

V32 closes provation, testing, promotion proof generation, deterministic replay, and testnet/mainnet readiness rehearsal posture for the commercial Bitcode system.
V33 begins from that V32 canon and should make the interface and operational integration layers more directly enterprise-shippable without weakening the Bitcoin, GitHub, compute, storage, or build/process boundaries proven by V32.

## Deferred from V32

The following work was intentionally deferred from V32 because V32 focused on provation/testing closure and canonical promotion mechanics:

- Bitcoin production-mainnet settlement enablement beyond V32's blocked rehearsal posture;
- GitHub delivery and review ergonomics beyond the V32 source-safe proof surfaces;
- compute execution provider hardening where long-running pipeline hosts, retries, and pushed completion events need production contracts;
- storage retention, replay, and customer-facing evidence lifecycle policies beyond generated proof artifacts;
- build/process automation that keeps version gates, promotion proofs, and deployment proofs green without ad hoc repair;
- enterprise interface depth for non-terminal consumers after V32 validated source-safe canon and proof generation.

## Candidate V33 workstreams

V33 candidate workstreams should be ordered into explicit gates before implementation:

- MCP API maturation beyond the V28 MVP for registry-derived AssetPack range, read-right, wallet, fee, journal, reconciliation, proof, and operational actions;
- ChatGPT App maturation beyond the V28 MVP as the first integratable chatbot application interface;
- non-Auxillaries non-website application interfaces that must ship commercially, primarily API and chatbot-app consumers;
- interface authorization, policy checks, and fail-closed read/license behavior over V27/V28 registry truths;
- API packaging, schemas, examples, compatibility rules, and contract tests;
- interface-specific MCP and ChatGPT App QA, including route/action discovery, denied-state readability, and proof-root surfacing;
- handoff of hosting, distributed execution, CI/CD, broad deployment operations, telemetry depth, and public documentation to V34 and V35.

## Non-goals during V33 opening

V33 deepens commercial interface surfaces beyond the V28 MVP.
It should not reopen V27 tokenomics law, replace V32 provation/testing depth, or absorb V34 deployment and V35 telemetry/documentation work except for narrow interface-owned hooks.

## Return To V32

Do not start V33 implementation during V32 promotion repair.
Record API, MCP, ChatGPT App, customer integration, deployment, telemetry, and documentation gaps beyond V32 as future V33 inputs until `version/v33` and its first gate branch are opened.
