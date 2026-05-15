# Specifications Roadmap

## Status

- Current active canonical pointer: `BITCODE_SPEC.txt` -> `V27`
- Current active canon: `BITCODE_SPEC_V27.md`
- Current draft target: `BITCODE_SPEC_V28.md`
- Purpose: concise running index of Bitcode/ENGI specification history, current work, and planned work.

This roadmap is not an active system specification.
It summarizes the version ladder so current and future drafting can preserve historical continuity without reopening superseded canon.

Historical ENGI specification sources live under `_legacy/`.
They are referenced here for specification history only; active implementation work must use the current Bitcode canon and draft-target family.

## Source Families

- Legacy ENGI specifications: `_legacy/ENGI_SPEC_V1.md` through `_legacy/ENGI_SPEC_V25.md`, with companion `NOTES`, `DELTA`, `PARITY_MATRIX`, `SYSTEM_PARITY_MATRIX`, `PROVEN`, and audit files where present.
- Active Bitcode specifications: `BITCODE_SPEC_V26.md`, `BITCODE_SPEC_V27.md`, their companion `DELTA`, `NOTES`, `PARITY_MATRIX`, and `PROVEN` files.
- Draft and future Bitcode specifications: `BITCODE_SPEC_V28.md`, `BITCODE_SPEC_V28_DELTA.md`, `BITCODE_SPEC_V28_NOTES.md`, `BITCODE_SPEC_V28_PARITY_MATRIX.md`, and `BITCODE_SPEC_V29_NOTES.md` through `BITCODE_SPEC_V37_NOTES.md`.
- Specification discipline references: `BITCODE_SPECIFYING.md` and `BITCODE_SPEC_TEMPLATEGUIDE.md`.

## Roadmap

| Version | Specification source | State | Focus |
| --- | --- | --- | --- |
| V1 | `_legacy/ENGI_SPEC_V1.md` | historical | Initial ENGI v1 full draft: GitHub-native measured engineering read, candidate recall/ranking, verification determinisms, private remediation branches, asset packs, source-to-shares settlement, and exact journal accounting. |
| V2 | `_legacy/ENGI_SPEC_V2.md` | historical | Expanded ENGI v1 frozen snapshot: stronger parser failure, universal measurement provenance, vector retrieval/fusion, candidate scoring, verification, LLM evaluator roles, branch creation, settlement proofs, and type/pseudocode appendices. |
| V3 | `_legacy/ENGI_SPEC_V3.md` | historical | Preserved frozen ENGI v1 snapshot with the GitHub-only trusted-integration model and branch-centered buyer workflow kept as baseline. |
| V4 | `_legacy/ENGI_SPEC_V4.md` | historical | Continued frozen ENGI v1 specification snapshot under `ENGI_SPEC.txt`, retaining read measurement, candidate ranking, asset-pack assembly, branch artifact, and settlement invariants. |
| V5 | `_legacy/ENGI_SPEC_V5.md` | historical | Expanded frozen ENGI v1 snapshot with detailed function signatures, inference/prompt appendices, context injectables, parsable completion contracts, and enterprise scenario examples. |
| V6 | `_legacy/ENGI_SPEC_V6.md` | historical | Final frozen ENGI v1 baseline used by V7; preserves the GitHub-native proof-bearing asset-pack and settlement model before source-up profile separation. |
| V7 | `_legacy/ENGI_SPEC_V7.md` | historical | Source-up draft: separates local deterministic prototype from production-boundary intent, tightens read descriptors, candidate/content contracts, use tiers, confidentiality, authorization, failure contracts, proof bundles, and profile honesty. |
| V8 | `_legacy/ENGI_SPEC_V8.md` | historical | Demonstration inspectability: finalizes recall-channel contracts, score-group explainability, prompt surfaces, proof closure, identity/auth/signer separation, artifact upload precision, and explicit Profile A/Profile B boundaries. |
| V9 | `_legacy/ENGI_SPEC_V9.md` | historical | Finality closure: validates prompt/context completeness, executes static measurement, makes verification receipt-backed, strengthens privacy projections, exact accounting, proof witnesses, and realistic GitHub-shaped tests. |
| V10 | `_legacy/ENGI_SPEC_V10.md` | historical | Artifact intake and identity/auth finalization: moves from textarea-first intake toward repo-addressable artifact inventory, artifact-kind parity, addressing, signing, GitHub App auth, and installation-scoped authorization. |
| V11 | `_legacy/ENGI_SPEC_V11.md` | historical | Operating-picture and system spine: makes repo supply, artifact-kind parity, identity/auth, boundary honesty, and repo-to-settlement flow read as one coherent operator chain. |
| V12 | `_legacy/ENGI_SPEC_V12.md` | historical | Demonstration-purpose canon: makes depositing against measured read the natural operating model, with selecting, branching, proving, identity/auth, settlement, and UX pacing as necessary closure. |
| V13 | `_legacy/ENGI_SPEC_V13.md` | historical | Fully enriched specification-structure standard: defines the dense canonical file-set, appendix, source-reference, parity, validation, and pedagogical shape expected of future full specs. |
| V14 | `_legacy/ENGI_SPEC_V14.md` | historical | First full canonical realization to the V13 standard: restores host capabilities, container/runtime expectations, inference/prompt contracts, proof obligations, validation, source parity, and long-form whole-system recoverability. |
| V15 | `_legacy/ENGI_SPEC_V15.md` | historical | System-canon versus demo-canon separation: moves root system specification away from a single demo owner, tightens typing, proof appendices, host capability material, and canonical source-refactor expectations. |
| V16 | `_legacy/ENGI_SPEC_V16.md` | historical | Proof-family precision pass: tightens prompt-completeness and all nine proof families through member closure, theorem catalogs, proof-shape realization, witness/replay direction, and generated `_PROVEN_` expectations. |
| V17 | `_legacy/ENGI_SPEC_V17.md` | historical | Demo-driven validation canon: hardens V16 through subsystem unit tests, workflow integration tests, browser E2E, production-like operator workflows, and demo-truth bug filling. |
| V18 | `_legacy/ENGI_SPEC_V18.md` | historical | Generated/formal proof exhaustiveness: materializes proof-member, theorem-evidence, and state-machine matrices from source truth, with generated documentation derived from executable proof data. |
| V19 | `_legacy/ENGI_SPEC_V19.md` | historical | Reproducible canon: deterministic replay, byte-stable generated proof artifacts, canonical promotion workflow, volatility inventory, negative proof mutation coverage, and generated contract-change ledgers. |
| V20 | `_legacy/ENGI_SPEC_V20.md`, `_legacy/ENGI_SPEC_V20_PROPER.md` | historical | Operator-quality canon: visual regression, accessibility, performance, operator acceptance, projection-quality smoke checks, and generated quality reports over the proof-bearing interface. |
| V21 | `_legacy/ENGI_SPEC_V21.md` | historical | Specifying-canon hardening: makes the canonical spec family full-current-canon again, tightens file-family roles, generated-canon inputs, promotion truth, stale-status checks, and specifying discipline. |
| V22 | `_legacy/ENGI_SPEC_V22.md` | historical | Runtime/operator drift detection: aligns runtime, API, browser shell, tests, demo docs, and generated drift reports to active canon posture; re-centers system work after metaspec hardening. |
| V23 | `_legacy/ENGI_SPEC_V23.md` | historical | Bitcoin-backed audit and deployed-infrastructure canon: defines public/private commitment scopes, BTC audit/spend substrate, sidechain-connected settlement interfaces, compute/storage reality, and confirmation/journal finalization. |
| V24 | `_legacy/ENGI_SPEC_V24.md` | historical | External realization: moves modeled Bitcoin, sidechain, compute, storage, and GitHub interfaces toward real typed execution receipts, exhaustive telemetry, live adapter contracts, and full-canon conformance repair. |
| V25 | `_legacy/ENGI_SPEC_V25.md` | historical | Rename canon: full project rename from ENGI to Bitcode and NGI to BTD while preserving V24 behavior, proof obligations, settlement, disclosure, fail-closed posture, generated evidence, and runtime/API/site alignment. |
| V26 | `BITCODE_SPEC_V26.md` | promoted historical Bitcode canon | First commercial Bitcode promotion: productionizing hardening, demonstration-to-application integration, app-native UI replacement, package-first refurbishment, retained-system purification, Exchange/Terminal minimum functionality, MVP elevation, commercial testnet readiness, and whole-repository provation. |
| V27 | `BITCODE_SPEC_V27.md` | active canon | `$BTD` tokenomics and practical cryptotechnological commercialization: 21,000,000 non-fungible source-share cells, AssetPack ranges, Read-Fit-Prove-Settle mint admission, measureminting decay, zero-cell/refit tail receipts, BTC fee separation, wallet/PSBT paths, ledgerized anchors, minimal AssetPack Exchange, Terminal journals, reconciliation, telemetry, upgrades, access rights, revenue, and optional evidence-based ancestry. |
| V28 | `BITCODE_SPEC_V28.md` | active draft target | Commercial Protocol implementation and Terminal MVP over V27: Terminal readiness over wallet/BTC/Read-Fit-measuremint primitives, realistic testnet BTD-AssetPack minting, synthetic measurements journaled and ledgerized, BTD range disclosure, read-right state, journal/reconciliation readability, MCP API and ChatGPT App MVP, Auxillaries contained readiness cleanup, removal of commercial runtime dependencies on `protocol-demonstration/`, and unversioned route discipline. Exchange and website Conversations are deferred beyond V35. |
| V29 | `BITCODE_SPEC_V29_NOTES.md` | future notes | Deeper Terminal: full Read/Fit/proof/dedupe/measuremint/settlement workflows, wallet recovery, BTC fee lifecycle depth, AssetPack range/read-right reviews, journal diffing, reconciliation repair, organization permissions, and Terminal-specific UI/test coverage. |
| V30 | `BITCODE_SPEC_V30_NOTES.md` | future notes | Protocol/BTD hardening after V28/V29: follow-up package extraction, Bitcoin/Taproot/PSBT rigor, BTD-AssetPack mint/read receipts, testnet ledger/projection hardening, bridge-readiness research notes, and source-to-shares proof cleanup. Exchange is not V30. |
| V31 | `BITCODE_SPEC_V31_NOTES.md` | future notes | Deeper Auxillaries: profile, connects, interfaces, BTD panes, provider readiness, account state, team/org/wallet/multi-sig/role/policy controls, readiness diagnostics, recovery flows, responsive/accessibility QA, and Auxillaries-specific tests/proofs. |
| V32 | `BITCODE_SPEC_V32_NOTES.md` | future notes | Deeper provation and testing: broader proof-family replay across Terminal, Exchange, Auxillaries, BTD registry, and protocol-demonstration; E2E/failure-state breadth, regression suites, promotion-proof generation hardening, scenario expansion, visual/accessibility/responsive tests, and testnet/mainnet-readiness rehearsal. |
| V33 | `BITCODE_SPEC_V33_NOTES.md` | future notes | Deeper Interfaces beyond V28 MVP: mature MCP API, ChatGPT App, API packaging, schemas, examples, contract tests, interface auth, policy checks, fail-closed read/license behavior, and commercial non-Auxillaries non-website application interfaces. |
| V34 | `BITCODE_SPEC_V34_NOTES.md` | future notes | Deeper Deployment: host capabilities, real executions, distributed compute aligned with provations, runtime/storage expectations, ledger/database/object-storage/proof-artifact posture, CI/CD for canonical promotions, environment lanes, deployment approvals, rollback, upgrades, secret rotation, and repair playbooks. |
| V35 | `BITCODE_SPEC_V35_NOTES.md` | future notes | Deeper telemetry and documenting: internal codebase docs, public `/docs`, telemetry taxonomy, dashboards, alert runbooks, incident response, operator escalation, documentation QA across code/spec/proofs/deployments, developer onboarding, operator guides, and testnet-rollout readiness material. |
| V36 | `BITCODE_SPEC_V36_NOTES.md` | future notes | Deeper Exchange after V35: Exchange MVP/deepening, market-wide activity master-detail, buy/sell/bid/ask/cancel/accept/settle/history flows, AssetPack range trading, rights-transfer review, liquidity/wrapper analysis, dispute/repair/revenue-route operations, and Exchange-specific tests/proofs. |
| V37 | `BITCODE_SPEC_V37_NOTES.md` | future notes | Website Conversations after V35: website conversation interface, stream UI, fullscreen writing mode, conversation-to-Terminal handoff, source selectors, route-local chat history, and any conversational UX not covered by the V28 ChatGPT App MVP. |

## Current Planning Spine

1. V26 converted the renamed repository into commercial Bitcode: package-owned, app-owned, proof-bearing, MVP-ready enough for V27 tokenomics.
2. V27 made `$BTD` and practical crypto rails exact enough to serve as active law.
3. V28 must harden the commercial Protocol implementation and Terminal MVP so V27 law is usable by operators without fighting visual, route, readiness, wallet/BTC/testnet, MCP, ChatGPT App, or demonstration-boundary defects.
4. V29 through V31 deepen Terminal, Protocol/BTD hardening, and Auxillaries in order.
5. V32 deepens provation and testing after those surfaces are stable enough to prove.
6. V33 deepens commercial interfaces outside the website/Auxillaries frame beyond the V28 MCP API and ChatGPT App MVP.
7. V34 makes deployment, host capability, distributed execution, storage, CI/CD, and promotion operations robust enough for testnet-facing reality.
8. V35 deepens telemetry and documentation as the prelude to full commercial application testnet rollout.
9. V36+ returns to deferred Exchange and website Conversations after the Protocol/Terminal/interface/deployment/documentation spine is mature.

## Boundary Rules

- Do not treat `_legacy/` ENGI specifications as active implementation authority.
- Do use `_legacy/` specifications to understand why current Bitcode concepts exist and what must not regress.
- V28+ work must build on V27 `$BTD` law unless a future promoted spec explicitly supersedes it.
- No implementation route should be versioned by spec number; source should move in place with the active canon.
- Future notes files are planning memory only until their version is explicitly opened as the draft-target SPEC family.
