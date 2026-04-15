# ENGI Spec V24

## Status

- Scope: V24 full-canon draft for realizing external interfacing after the V23 deployed-infrastructure canon
- Current canonical/latest target: `V23`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*`, `.engi/v20-*`, and `.engi/v23-*` reports remain the current generated baseline; draft-target V24 adds `.engi/v24-spec-family-report.json`, `.engi/v24-canonical-input-report.json`, and `ENGI_SPEC_V24_PROVEN.md` as the required next generated family
- Companion notes file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_NOTES.md`
- Companion delta file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_DELTA.md`
- Companion parity ledger: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_PARITY_MATRIX.md`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_PROVEN.md`
- Current canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V23`
- Source parity state: draft-target source currently includes V24 environment-mode realization profiling, emitted draft-target execution/container/GitHub receipt families, enriched external-boundary and projection summaries, and spec-quality enforcement; live third-party Bitcoin mainchain, sidechain, compute/storage, and GitHub execution remains open V24 work
- Draft posture source: `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canon-posture.js` keeps `ACTIVE_CANON_VERSION = 'V23'` and `DRAFT_TARGET_VERSION = 'V24'`
- V24 state: drafting only; no V24 `_PROVEN_` appendix or `.engi/v24-*` generated reports may exist until V24 source, validation, and promotion close

## Drafting and acceptance state

V23 closed first-gate deployed infrastructure by specifying and prototype-demonstrating:
- Bitcoin-facing commitment, anchor, and settlement carriers,
- sidechain-connected bridge posture,
- prototype compute/storage reality manifests,
- a deterministic stubbed-testnet demonstration service,
- and NGI-denominated settlement binding.

That leaves the next system question.
V24 is not centered on adding more modeled interfaces.
V24 is centered on realizing external interfacing for real ENGI operation:
- real Bitcoin and sidechain network execution,
- real audited compute and storage container execution,
- real GitHub App and repository interaction,
- and proof-bearing receipts for every real external effect ENGI claims.

V24 therefore is realization-facing.
Its job is to turn V23 boundary contracts into live, typed, auditable execution surfaces without relaxing ENGI's fail-closed posture or shrinking the main canon into a delta shell.

## Version executive summary

ENGI remains a proof-bearing operating system for engineering assetizing.

V24 extends V23 from prototype-demonstrated deployment posture to real external realization posture:
- Bitcoin-backed settlement and anchor interfaces move from stubbed-testnet demonstration service toward real network-capable execution classes,
- sidechain bridge posture moves from checkpoint stand-in to real observed bridge execution,
- compute and storage reality move from prototype manifests to auditable execution containers with replay and attestation surfaces,
- GitHub boundaries move from modeled or partial prototype posture to real session, fetch, branch, PR, and artifact interaction receipts,
- and every real external effect must be represented as a proof-bearing artifact that can be replayed, audited, and fail closed if missing or contradictory.

The V24 position is still narrow and explicit:
- Bitcoin remains ENGI's audit and spend substrate, not ENGI's bulk proof-compute or bulk private storage layer,
- sidechain remains the bridge-connected companion to mainchain rather than a replacement for mainchain audit settlement,
- containerized compute and storage remain off-chain but become execution-attested,
- GitHub remains an external operating surface rather than a hidden side effect,
- and no external interface may count as realized unless ENGI emits auditable intent, execution, observation, and proof receipts for it.

## Canonical ENGI executive summary

The ENGI operating chain in V24 remains:
1. authenticated repo supply and candidate deposits are brought into ENGI,
2. measured need is derived from benchmark, parser, and repo reality,
3. deposit-to-need fit is made explicit before deeper closure,
4. recall, ranking, verification, and use-tiering select an asset pack,
5. branch artifacts, proof artifacts, and witness artifacts are materialized,
6. projection and disclosure policy determine what each principal may inspect,
7. exact source-to-shares settlement and journal diff materialize NGI-denominated consequence surfaces,
8. commitment scopes bind bounded-public and private proof surfaces,
9. external spend, anchor, sidechain, compute, storage, and GitHub observations bind real execution to those surfaces,
10. generated reports plus emitted `.engi/` artifacts make the result auditable,
11. validation gates and promotion canon decide whether the system remains canonical,
12. and perpetual canon quality is enforced rather than assumed.

V24 does not replace V23's Bitcoin-facing architecture.
It realizes the external interfaces V23 named and restores the main `SPEC` to a full-canon carrier shape.

## V24 rewrite and no-silent-inheritance rule

V24 is drafted from V23 inputs, but a promoted V24 may not depend on V23 for current-system semantic recovery.

That means:
- V23 remains the drafting anchor while V24 is a draft,
- V24 may cite V23 for provenance during drafting,
- but a promoted V24 must restate the current whole system in full wherever that behavior still matters,
- and no promoted V24 may require an implementer, reviewer, operator, or auditor to open V23 in order to recover current behavior, proof obligations, artifacts, source maps, validation gates, or accepted boundaries.

V24 therefore treats the V22 -> V23 -> V24 metaspec regression as a real draft concern:
- the main `SPEC` size shrank across both V22 -> V23 and V23 -> V24,
- whole-system meaning shifted out of `SPEC` and into `_PROVEN_`, parity, source, and prior versions,
- and the V23 checker profile allowed a narrower carrier set than the complete specifying standard.

V24 includes a metaspec repair because external-realization work would otherwise be under-specified.
But metaspec repair is not the center of V24.
The center of V24 remains real external interfacing for Bitcoin, sidechain, compute, storage, and GitHub.

V24 also preserves the V23 fail-closed posture.
For this version, that means:
- a real network effect without a matching execution receipt is invalid,
- a real container execution without replayable attestation is invalid,
- a real GitHub mutation without authorization, addressing, and execution receipts is invalid,
- a promoted V24 `SPEC` without full-canon restatement is invalid,
- and future V24 promotion must fail closed if draft claims outrun source, tests, generated evidence, or spec-completeness enforcement.

## Why V24 exists

### 1. V23 closed the interface contract but not real execution

V23 already specifies:
- bitcoin settlement intent and observation,
- anchor publication posture,
- sidechain bridge connection points,
- compute and storage reality manifests,
- and explicit external boundary specialization.

But V23 intentionally stops short of live execution.
V24 exists to convert that modeled honesty into real realized honesty.
An initial draft-target source slice is already present:
- `engi-demo/src/canonical/v24-external-realization.js` emits the four-mode environment, isolation, and telemetry descriptor set,
- `engi-demo/src/canonical/v24-external-execution.js` emits draft-target execution, observation, container, storage, and GitHub receipt families,
- `engi-demo/src/engi-demo.js` binds those receipts into deliverables, branch artifacts, proof families, and the external-boundary manifest,
- `engi-demo/src/demo-shell-state.js` projects sanitized realization summaries by principal,
- and tests already fail closed on draft-target execution-receipt drift, telemetry drift, boundary-manifest drift, and projection-summary drift.

### 2. Real ENGI operation requires auditable external execution classes

ENGI cannot remain only locally self-consistent if it claims real infrastructure posture.
Real operation requires:
- real BTC-backed spend and anchor execution,
- real sidechain checkpoint and transfer observation,
- real storage publication and retrieval boundaries,
- real proof-computation execution containers,
- and real GitHub inventory, branch, PR, and artifact operations.

### 3. External execution must be proof-bearing, not merely successful

A live network or container effect is insufficient by itself.
V24 requires each execution class to produce:
- intent surfaces,
- execution receipts,
- observation receipts,
- replay handles,
- policy bindings,
- telemetry,
- and proof-family closure.

### 4. ENGI needs one auditable model for all real external effects

V24 is where ENGI stops treating:
- network execution,
- container execution,
- storage publication,
- and GitHub mutations
as separate integration stories.

They become one external-realization model with shared proof expectations, shared environment-mode isolation, and shared fail-closed validation.

## V24 accepted drafting decisions

V24 accepts the following drafting decisions:

1. V24 is realization-facing rather than another interface-description release.
2. Bitcoin-backed infrastructure moves from stubbed-testnet demonstration service toward real network execution classes.
3. Sidechain connectivity remains inside first-gate V24 because the ENGI:BTC bridge must function across mainchain and sidechain realities.
4. ENGI proof computation remains off-chain, but V24 requires auditable compute containers for all real proof-bearing usages.
5. ENGI storage remains off-chain, but V24 requires auditable storage containers and publication receipts for all real artifact persistence and retrieval expectations.
6. GitHub remains an external boundary, but V24 requires end-to-end real GitHub App interfacings rather than modeled-only or partial prototype posture.
7. Every realized external interface must emit proof-bearing intent, execution, observation, and reconciliation receipts that bind back to existing ENGI artifact, need, bundle, and settlement identities.
8. V24 keeps ENGI as the system name and NGI as the share and settlement denomination.
9. Every realized external interface must support four canonical execution modes: `production`, `staging`, `development`, and `mock`.
10. Canonical execution modes must be isolated by real external identity and resource bindings rather than by labels alone.
11. Exhaustive telemetry, environment-matrix validation, and fail-closed coverage are part of the interface contract rather than optional operational hardening.
12. V24 promotion may only occur after real external execution classes are implemented, validated, and represented in generated evidence.
13. V24 includes a cross-cutting metaspec repair so promoted canon returns to full-system, no-silent-inheritance form.
14. V24 build and release processes must enforce spec quality rather than assuming authors will remember it.

## V24 source-of-truth hierarchy

While V24 is a draft, current truth order is:
1. `ENGI_SPEC.txt`
2. `ENGI_SPEC_V23.md`
3. `ENGI_SPEC_V23_DELTA.md`
4. `ENGI_SPEC_V23_PARITY_MATRIX.md`
5. `ENGI_SPEC_V23_PROVEN.md`
6. active canonical `.engi/v19-*`, `.engi/v20-*`, and `.engi/v23-*` artifacts
7. `ENGI_SPEC_V24.md`
8. `ENGI_SPEC_V24_DELTA.md`
9. `ENGI_SPEC_V24_PARITY_MATRIX.md`
10. `ENGI_SPEC_V24_NOTES.md`
11. current source and tests explicitly referenced by active canon or V24 draft

V24 cannot outrank V23 until promotion.

## full-system, re-implementation, and audit rule

The promoted V24 main specification must be sufficient for:
- full-system re-implementation of current ENGI behavior,
- audit recovery of the current proof contract and artifact model,
- and operator comprehension of the whole ENGI chain without semantic dependence on prior versions.

That requirement applies to:
- repo supply and depositing,
- needing and measured demand,
- prompt/inference/evaluator ownership,
- depositing-to-needing fit,
- recall and ranking,
- verification decisions,
- selection and materialization,
- branch artifacts and deliverables,
- identity, authority, signing, and policy,
- sensitive data and confidentiality flows,
- projection, disclosure, and redaction,
- proof families, members, theorems, witnesses, and replay,
- settlement, source-to-shares, journals, and exact accounting,
- telemetry, persistence, state, and failure semantics,
- host/runtime capability truth,
- operator experience and pedagogy,
- validation and test stack,
- generated artifacts and canonical promotion,
- bitcoin mainchain execution,
- sidechain execution,
- compute-container execution,
- storage-container execution,
- github live interface,
- environment-mode completeness and isolation,
- telemetry and coverage,
- and full-canon specification completeness.

Neither `_PROVEN_`, parity, source, nor older specs are allowed to carry missing current-system meaning for promoted V24.

## totality and precision enforcement rule

V24 requires totality and precision rather than suggestive prose.

That means:
- every realized external effect must map to named artifacts,
- every proof family must map to named witnessArtifactPaths, theoremIds, and replayStepIds,
- every environment mode must map to distinct identity and resource bindings,
- every generated artifact expectation must map to a regeneration and validation contract,
- every fail-closed condition must be named,
- and every boundary must state whether it is implemented, draft-target, or deferred.

When V24 says "realized," it means ENGI can emit intent, execution, observation, telemetry, and proof receipts for that interface in source.
When V24 says "draft-target," it means the carrier is part of the required promotion contract but not yet active canon.

## V24 system goals, non-goals, and design principles

### Goals

1. Realize Bitcoin-backed execution from V23 boundary contracts into real network-capable spend and anchor surfaces.
2. Realize sidechain bridge execution as a proof-bearing external effect rather than a placeholder connection point.
3. Define auditable compute containers for proof computation, verification, evaluation, and other real ENGI execution workloads.
4. Define auditable storage containers for artifact persistence, retrieval, publication, and retention-boundary enforcement.
5. Define end-to-end real GitHub App interfacings for installation sessions, inventory, artifact fetch, branch publication, and PR updates.
6. Require `production`, `staging`, `development`, and `mock` mode coverage across every realized external interface.
7. Require proof-bearing execution receipts and fail-closed validation for all realized external effects.
8. Require exhaustive telemetry and environment-matrix coverage so brittle external behavior remains observable, attributable, and testable.
9. Restore full-canon specification completeness so promoted V24 can stand alone without semantic dependence on V23.
10. Enforce specification quality through local and CI build gates rather than by convention alone.

### Non-goals

1. Moving ENGI bulk compute or private proof storage onto Bitcoin mainchain.
2. Replacing V23 commitment-scope derivation, exact settlement, or disclosure-boundary semantics.
3. Treating containerization as merely operational convenience rather than a proof-bearing interface.
4. Treating GitHub effects as acceptable if they are observable only in GitHub and not in ENGI artifacts.

### Design principles

- Real execution must remain auditable.
- Metaspec repair is a supporting constraint, not the headline feature set.
- Every external effect must have an intent, execution, observation, and proof surface.
- Every external effect must declare its execution mode explicitly and bind to isolated mode-specific identities and resources.
- Containers must be attestable, replayable, and policy-bound.
- Storage publication must preserve principal-scoped disclosure and retention policy.
- Live GitHub interaction must preserve repo-authenticated supply, authorization, and proof closure.
- Telemetry is part of the proof surface whenever external execution is involved.
- A promoted `SPEC` must be a full rewrite of current canon, not a delta-shaped shell around older canon.

## V24 external environment-mode rule

V24 requires one explicit environment-mode matrix across all realized external interfaces:

- `production`
- `staging`
- `development`
- `mock`

No realized external interface may be specified or implemented as single-environment only.
Every realized external interface must declare:
- `environmentMode`,
- `environmentIdentityRef`,
- `environmentResourceRef`,
- `executionPolicyRef`,
- and `telemetryPolicyRef`.

Mode isolation is part of the canonical contract:
- `production` must use production-only chain addresses, accounts, signer or treasury policy, container registries or execution identities, storage namespaces or buckets, and GitHub App or installation identities.
- `staging` must use staging-only external identities and must never reuse production credentials or publication targets.
- `development` must use development-only external identities and targets and must remain safe for frequent operator and test iteration.
- `mock` must remain deterministic, non-broadcasting, and non-destructive while preserving the same artifact and receipt shapes as live modes.

Mode isolation is interface-specific:
- Bitcoin mainchain and sidechain execution must bind to mode-specific address, account, treasury, and network refs. `staging` and `development` must not collapse into one shared test binding.
- GitHub live interfacing must bind to mode-specific GitHub App, installation, webhook, and mutation targets.
- Compute-container execution must bind to mode-specific registries, images, execution identities, queues, and attestation scopes.
- Storage-container execution must bind to mode-specific buckets, namespaces, publication endpoints, retention policies, and retrieval credentials.

## V24 system architecture and layer boundaries

V24 external realization is organized into ten interacting layers:

1. `core deterministic primitives`
2. `canonical runtime builders`
3. `whole-run composition`
4. `projection shaping and disclosure policy`
5. `exact settlement and journal closure`
6. `proof witness and artifact inventory closure`
7. `bitcoin mainchain execution`
8. `sidechain execution`
9. `compute-container execution` and `storage-container execution`
10. `github live interface`

These layers remain external to ENGI's exact accounting and proof core only in the sense that they are execution boundaries.
They are not allowed to remain semantically opaque.

The cross-cutting constraints over every layer are:
- environment-mode completeness and isolation,
- telemetry and coverage,
- and full-canon specification completeness.

## canonical domain model

The V24 canonical domain model includes the following object and surface classes:

- repo supply and depositing: authenticated repositories, deposits, deposit profiles, deposit envelopes, repo bindings, and GitHub installation context.
- needing and measured demand: need scenarios, benchmark/parser-derived demand, licensed query surfaces, and measured demand envelopes.
- prompt/inference/evaluator ownership: prompt families, prompt contracts, prompt surfaces, inference moments, parsed completion envelopes, and evaluator manifests.
- depositing-to-needing fit: fit explanations, candidate match scores, exclusion reasons, and selected-asset eligibility boundaries.
- recall and ranking: retrieval candidates, ranking receipts, use-tier signals, and candidate ordering stability.
- verification decisions: issuance, provenance, sufficiency, and issuer-policy decisions plus supporting receipts.
- selection and materialization: asset-pack locks, selected-source manifests, materialization proofs, and branch artifact outputs.
- branch artifacts and deliverables: `.engi/` outputs, deliverables manifests, witness manifests, generated reports, and publication receipts.
- identity, authority, signing, and policy: identity bindings, authorization decisions, signing roots, treasury policy, GitHub App binding, and external execution policy.
- sensitive data and confidentiality flows: sensitive-data flow maps, disclosure classifications, retention policies, and publication controls.
- projection, disclosure, and redaction: principal-scoped views over public, reviewer, buyer, and internal surfaces.
- proof families, members, theorems, witnesses, and replay: the proof object model, replay steps, artifact bindings, witness inventories, and theorem closure.
- settlement, source-to-shares, journals, and exact accounting: NGI-denominated allocation, settlement participation, accounting precision, journal diff, and settlement proof.
- telemetry, persistence, state, and failure semantics: telemetry summaries, container manifests, storage receipts, external execution state, retries, rollbacks, and reconciliation state.
- host/runtime capability truth: execution environment truth, external capability truth, mode-specific credentials, and runtime posture.
- operator experience and pedagogy: browser shell copy, API surfaces, embedded demo guidance, operator summaries, and quality reports.
- validation and test stack: host-agnostic basics, containerized full tests, mode-matrix tests, and commit-title gated conformance.
- generated artifacts and canonical promotion: generated reports, `_PROVEN_` appendix, canonical input reports, parity ledgers, and promotion rules.

## whole ENGI operator chain

The whole ENGI operator chain in V24 is:
1. configure the external environment profile,
2. bind the correct environment-mode identities and resources,
3. authenticate repo supply and candidate deposits,
4. measure need,
5. establish prompt/inference/evaluator ownership,
6. compute depositing-to-needing fit,
7. execute recall and ranking,
8. issue verification decisions,
9. materialize the selected asset pack,
10. build branch artifacts and deliverables,
11. enforce identity, authority, signing, and policy,
12. enforce sensitive data and confidentiality flows,
13. project the result per principal,
14. settle source-to-shares and journals in NGI,
15. derive proof-family, witness, and replay closure,
16. execute Bitcoin mainchain or sidechain interfaces when required,
17. execute compute-container and storage-container interfaces when required,
18. execute GitHub live interfaces when required,
19. reconcile telemetry, persistence, state, and failure semantics,
20. validate, regenerate, and decide canonical promotion.

The workflow stages remain:
- Openly writable,
- Measurably readable,
- Provable,
- Valuable.

## canonical subsystem surfaces

### Depositing and asset supply

- Current canonical objects and emitted artifacts: repo supply and depositing are represented by authenticated repository bindings, deposit envelopes, `.engi/depositing-surface.json`, `.engi/github-boundary.json`, `.engi/github-live-session.json` (draft-target V24), `.engi/github-inventory-fetch-receipt.json` (draft-target V24), and `.engi/asset-pack.lock.json`.
- Current algorithms and derivation rules: ENGI admits only repo-addressable deposits, normalizes deposit identity against repo-authenticated supply, and carries deposit lineage forward into fit, verification, materialization, proof, and GitHub live mutation surfaces.
- Current invariants and fail-closed conditions: invalid deposit, stale repo addressing, missing GitHub inventory receipt, cross-mode GitHub App drift, or broken deposit lineage fail closed.
- Current proof obligations: deposit provenance, asset identity stability, repo-authenticated supply closure, and deposit-to-asset-pack continuity must be replayable.
- Current source-bearing implementation basis: `engi-demo/src/engi-demo.js`, `engi-demo/src/canonical/run-artifacts.js`, and draft-target `engi-demo/src/canonical/v24-external-realization.js`.
- Current validating commands and parity basis: `node --test engi-demo/test/core.test.js`, `node --test engi-demo/test/api.test.js`, and V24 parity rows for external environment profiling.
- Current accepted boundaries: live GitHub inventory and mutation remain V24 draft-target work until real GitHub session and fetch receipts are emitted.

### Needing and prompt/inference ownership

- Current canonical objects and emitted artifacts: needing and prompt/inference/evaluator ownership are represented by `.engi/needing-surface.json`, `.engi/prompt-family-registry.json`, `.engi/prompt-contracts.json`, `.engi/prompt-surfaces.json`, `.engi/inference-moment-contracts.json`, `.engi/parsed-completion-envelopes.json`, and `.engi/eval-manifest.json`.
- Current algorithms and derivation rules: ENGI measures need from benchmark/parser/repo reality, maps prompts and inference moments to that need, and binds evaluator ownership to replayable contracts.
- Current invariants and fail-closed conditions: prompt contract incompleteness, parsed-envelope inadmissibility, evaluator ambiguity, or need drift fail closed.
- Current proof obligations: prompt family completeness, inference synthesis closure, and evaluator provenance must stay witness-bound and replayable.
- Current source-bearing implementation basis: `engi-demo/src/canonical/prompting.js`, `engi-demo/src/canonical/evaluation-materialization.js`, and `engi-demo/src/engi-demo.js`.
- Current validating commands and parity basis: `node --test engi-demo/test/core.test.js`, prompt and proof-family coverage inside the active demo test suite, and spec-quality proof-family requirements.
- Current accepted boundaries: live third-party model execution remains outside V24's center unless containerized and receipted; V24 requires the container contract first.

### Fit, recall, ranking, and verification

- Current canonical objects and emitted artifacts: fit, recall, ranking, and verification are represented by `.engi/depositing-to-needing-surface.json`, `.engi/match-report.json`, `.engi/verification-report.json`, `.engi/verification-receipts.json`, and `.engi/verification-decisions-proof.json`.
- Current algorithms and derivation rules: ENGI computes depositing-to-needing fit before deeper proof closure, then performs recall and ranking, and only then resolves verification decisions and use-tiering.
- Current invariants and fail-closed conditions: no-survivor asset pack, ranking inconsistency, verification decision drift, or non-replayable verification receipts fail closed.
- Current proof obligations: fit continuity, verification issuance/provenance/sufficiency closure, and ranked-candidate determinism must remain auditable.
- Current source-bearing implementation basis: `engi-demo/src/engi-demo.js`, `engi-demo/src/canonical/evaluation-materialization.js`, and `engi-demo/src/canonical/proof-materialization.js`.
- Current validating commands and parity basis: `node --test engi-demo/test/core.test.js`, `node --test engi-demo/test/workflow.integration.test.js`, and proof-family closure under `verification-decisions`.
- Current accepted boundaries: external ranking services remain acceptable only when receipted and covered by compute-container or GitHub-live interface contracts.

### Selection and materialization

- Current canonical objects and emitted artifacts: selection and materialization are represented by `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json`, `.engi/selection-consistency-proof.json`, `.engi/materialization-proof.json`, `.engi/materialization-exclusions.json`, and `.engi/selection-and-materialization-proof.json`.
- Current algorithms and derivation rules: ENGI materializes only selected assets, preserves exclusion reasons, and binds materialized artifacts to bundle, branch, and proof identities.
- Current invariants and fail-closed conditions: materialization without selection closure, hidden exclusions, or non-replayable selected-source lineage fail closed.
- Current proof obligations: selected-set closure, materialized-source closure, visibility closure, and exclusion closure must all be witness-bound.
- Current source-bearing implementation basis: `engi-demo/src/canonical/evaluation-materialization.js`, `engi-demo/src/canonical/run-artifacts.js`, and `engi-demo/src/canonical/proof-materialization.js`.
- Current validating commands and parity basis: `node --test engi-demo/test/workflow.integration.test.js`, `node --test engi-demo/test/e2e.test.js`, and parity rows for branch artifact closure.
- Current accepted boundaries: real GitHub branch publication is a separate live interface and must not be inferred from local materialization alone.

### Identity, authorization, and sensitive flow

- Current canonical objects and emitted artifacts: identity, authorization, and sensitive flow are represented by `.engi/identity-bindings.json`, `.engi/authorization-decisions.json`, `.engi/sensitive-data-flow.json`, `.engi/identity-authorization-proof.json`, `.engi/sensitive-data-flow-proof.json`, `.engi/authorization-and-sensitive-flow-proof.json`, and draft-target `.engi/github-app-binding.json` plus `.engi/bitcoin-network-intent.json`.
- Current algorithms and derivation rules: ENGI derives authorization from issuer/signer and policy roots, binds external execution to those roots, and routes sensitive data only through classified surfaces.
- Current invariants and fail-closed conditions: authorization denial, stale signing roots, mis-bound treasury or GitHub App identities, or sensitive-flow leakage fail closed.
- Current proof obligations: identity closure, authorization closure, policy closure, and sensitive-flow closure must remain replayable across live interfaces.
- Current source-bearing implementation basis: `engi-demo/src/engi-demo.js`, `engi-demo/src/canonical/proof-materialization.js`, `engi-demo/src/canonical/v23-bitcoin.js`, and draft-target `engi-demo/src/canonical/v24-external-realization.js`.
- Current validating commands and parity basis: `node --test engi-demo/test/core.test.js`, `node --test engi-demo/test/api.test.js`, and V24 parity rows for mode isolation and GitHub App separation.
- Current accepted boundaries: concrete signer topology, sidechain operator topology, and GitHub webhook infrastructure remain implementation choices so long as the receipt and policy contracts are satisfied.

### Disclosure and projection

- Current canonical objects and emitted artifacts: disclosure and projection are represented by `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/redaction-proof.json`, `.engi/disclosure-proof.json`, `.engi/disclosure-boundary-proof.json`, `.engi/bitcoin-bounded-public-anchor.json`, and draft-target storage publication and retrieval receipts.
- Current algorithms and derivation rules: ENGI projects public, reviewer, buyer, and internal surfaces from the same underlying artifact set and preserves bounded-public proof as the only public-safe external projection.
- Current invariants and fail-closed conditions: public projection overexposure, mismatched redaction, storage publication beyond principal rights, or retrieval without disclosure authorization fail closed.
- Current proof obligations: projection policy closure, bounded-public closure, redaction alignment, disclosure verdict alignment, and storage-publication alignment must remain auditable.
- Current source-bearing implementation basis: `engi-demo/src/canonical/projections.js`, `engi-demo/src/demo-shell-state.js`, `engi-demo/src/engi-demo.js`, and draft-target storage-container realization surfaces.
- Current validating commands and parity basis: `node --test engi-demo/test/api.test.js`, `node --test engi-demo/test/e2e.test.js`, and disclosure-boundary proof-family closure.
- Current accepted boundaries: public chains and public storage surfaces may only carry bounded-public receipts or bounded-public anchor material, never licensed source or private proof payloads by default.

### Settlement and exact accounting

- Current canonical objects and emitted artifacts: settlement and exact accounting are represented by `.engi/source-to-shares.json`, `.engi/settlement-participation.json`, `.engi/accounting-precision-report.json`, `.engi/journal-diff.json`, `.engi/journal-completeness-proof.json`, `.engi/settlement-proof.json`, `.engi/settlement-source-to-shares-proof.json`, `.engi/bitcoin-settlement-intent.json`, `.engi/bitcoin-settlement-observation.json`, and draft-target `.engi/bitcoin-network-execution.json` plus `.engi/sidechain-execution-receipt.json`.
- Current algorithms and derivation rules: ENGI allocates exact NGI base units, normalizes basis points deterministically, binds payment intent and observation to bundle and settlement identities, and finalizes journals only under policy-bound execution observation.
- Current invariants and fail-closed conditions: settlement conservation drift, missing execution receipt, journal finalization without observation, or cross-mode treasury drift fail closed.
- Current proof obligations: contribution totality, normalization exactness, journal completeness, settlement theorem integrity, and payment-observation coherence must remain replayable.
- Current source-bearing implementation basis: `engi-demo/src/canonical/settlement.js`, `engi-demo/src/canonical/v23-bitcoin.js`, `engi-demo/src/engi-demo.js`, and draft-target V24 real network execution surfaces.
- Current validating commands and parity basis: `node --test engi-demo/test/core.test.js`, `node --test engi-demo/test/workflow.integration.test.js`, and V23/V24 settlement-interface parity rows.
- Current accepted boundaries: V24 may realize base-layer, sidechain, and repeated-read network execution, but only where execution and observation receipts exist in source.

### Proof contract, witnesses, and replay

- Current canonical objects and emitted artifacts: proof contract, witnesses, and replay are represented by `.engi/proof-contract.json`, `.engi/system-proof-bundle.json`, `.engi/proof-witness-manifest.json`, all proof-family artifacts, draft-target `.engi/external-realization-proof.json`, `.engi/container-reality-proof.json`, `.engi/github-live-interface-proof.json`, and draft-target `.engi/external-telemetry-summary.json`.
- Current algorithms and derivation rules: ENGI binds every proof family to witnessArtifactPaths, theoremIds, replayStepIds, and artifact digests, then carries them into the system proof bundle and witness manifest for replay.
- Current invariants and fail-closed conditions: missing witness artifacts, replay-step drift, container attestation drift, github observation drift, or proof-family omission fail closed.
- Current proof obligations: proof-family closure, theorem closure, replay closure, witness manifest coherence, and proof-contract bundle coherence must remain exact.
- Current source-bearing implementation basis: `engi-demo/src/canonical/proof-materialization.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/engi-demo.js`, and draft-target V24 realization builders.
- Current validating commands and parity basis: `node --test engi-demo/test/proven-generator.test.js`, `node --test engi-demo/test/v21-specifying.test.js`, `node scripts/run-engi-spec-quality.mjs --mode basic`, and later strict V24 conformance.
- Current accepted boundaries: V24 may add proof families, but promotion may not narrow away existing family detail carriers or witness expectations.

## V24 real network execution rule

V24 fixes the realization boundary for Bitcoin-backed infrastructure:

- `audited-base-layer-purchase` must support real spend-intent, execution, broadcast, and confirmation receipts.
- `repeated-read-payment` must support a real payment-network execution class if V24 claims it as realized.
- `checkpointed-sidechain-bridge` must support real bridge and checkpoint observation if V24 claims it as realized.
- `bitcoin-anchor-publication` must support real anchor publication receipts, not only demonstration envelopes.

Mode isolation is mandatory here:
- `production` must use production chain and address bindings only.
- `staging` must use staging testnet or sidechain bindings distinct from development.
- `development` must use development testnet or sidechain bindings distinct from staging.
- `mock` must preserve the same receipt shapes without real broadcast.

No V24 network surface counts as realized unless ENGI can produce:
- an execution policy ref,
- a request envelope,
- an execution receipt,
- an observation receipt,
- a replay handle,
- and proof-family closure over those artifacts.

## V24 compute and storage container rule

V24 converts V23 compute and storage reality from posture manifests into realized execution containers.

For compute containers, V24 requires:
- deterministic or policy-bounded container manifests,
- image or environment attestations,
- input and output sealing,
- execution receipts,
- replay handles,
- and proof linkage back to produced ENGI artifacts.

For storage containers, V24 requires:
- storage publication manifests,
- retrieval receipts,
- retention and deletion policy receipts,
- disclosure-boundary enforcement receipts,
- and proof linkage back to anchored or published ENGI artifacts.

Real ENGI usage may not bypass these container receipts.

## V24 GitHub live interfacing rule

V24 converts GitHub from a prototype or modeled boundary into a realized audited interface.

That includes:
- real installation-session receipts,
- real repo inventory fetch receipts,
- real workflow-artifact fetch receipts,
- real branch publication receipts,
- real PR or issue mutation receipts,
- and observation surfaces that bind GitHub effects back to ENGI need, asset-pack, proof, and settlement identities.

Mode isolation is mandatory here as well:
- `production` must use a production GitHub App and production installation targets.
- `staging` must use a staging GitHub App and staging installation targets.
- `development` must use a development GitHub App and development installation targets.
- `mock` must preserve the same receipt and policy shapes without mutating live repositories.

Any live GitHub operation must preserve:
- repo-authenticated provenance,
- authorization and sensitive-flow posture,
- proof-family closure,
- and fail-closed behavior if GitHub observations drift from ENGI records.

## V24 telemetry and coverage rule

V24 treats external-interface telemetry and coverage as canonical requirements.

Every realized external interface must emit exhaustive telemetry sufficient to reconstruct:
- declared environment mode,
- external identity and resource bindings,
- request envelope and addressing roots,
- execution attempt and execution outcome,
- observation state and reconciliation result,
- retry, timeout, and rollback behavior,
- and the ENGI artifact, need, bundle, proof, and settlement identities affected.

Telemetry must be mode-aware and interface-aware:
- Bitcoin mainchain and sidechain telemetry must cover spend construction, signer coordination, broadcast, confirmation or checkpoint observation, fee and retry posture, and publication reconciliation.
- Compute-container telemetry must cover image selection, attestation, input sealing, execution status, output sealing, replay handles, and failure class.
- Storage-container telemetry must cover publication target, retrieval target, retention target, disclosure-boundary enforcement, and deletion or expiry events.
- GitHub telemetry must cover app identity, installation, repository addressing, fetch or mutation operation class, returned remote identifiers, and reconciliation to ENGI receipts.

Coverage expectations are equally explicit:
- each external interface must have tests in `production`, `staging`, `development`, and `mock` modes,
- each mode must have positive-path and fail-closed-path coverage,
- and telemetry omissions must count as blocking validation failures for realized interfaces.

## V24 metaspec and conformance repair rule

V24 includes one cross-cutting metaspec repair because external-realization canon is only useful if the canon itself is complete and enforceable.

For promotion, V24 must restore the full-canon carrier model required by `ENGI_SPECIFYING.md`.
That means the promoted `ENGI_SPEC_V24.md` must contain, directly or through its own appendices:
- a canonical type and surface catalog,
- a subsystem totality and derivability matrix,
- a proof-family closure catalog,
- a generated artifact contract catalog,
- a validation and checking gate catalog,
- a current canonical source map,
- a scenario, workflow, and cross-product contract catalog,
- a fail-closed contract and error posture matrix,
- and a source-bearing deliverable and artifact contract catalog.

Those carriers are not secondary documentation.
They are part of what makes V24 re-implementable and auditable.

V24 must also repair the conformance profile itself.
The V24 spec-family checker must not narrow away the completeness carriers required by the specifying standard in the way V23 tooling allowed.
V24 promotion must therefore fail closed if:
- the V24 checker profile omits full-canon carrier requirements,
- the promoted V24 `SPEC` relies on prior-version inheritance for current behavior recovery,
- appendix-grade coverage carriers are missing,
- or generated evidence is used to compensate for missing main-spec system meaning.

Build-process enforcement is part of this repair:
- host-agnostic local pre-commit checks must run lightweight spec-family, pointer, and structural basics whenever `ENGI_SPEC*`, `ENGI_SPECIFYING.md`, or spec-family checker code changes,
- CI or CD must run a containerized full conformance and full test suite so spec-quality and implementation-quality judgments are environment-stable,
- commits whose title matches `spec: VN` or `spec: VN...` must trigger the strict spec-conformance suite,
- and promotion commands must rerun the strict V24 conformance profile in a clean environment before allowing `ENGI_SPEC.txt` to advance.

## proof-family canon

The proof-family canon in V24 contains the inherited core families, the V23 Bitcoin-facing families, and the V24 external-realization families.

### Exact proof-family inventory matrix

| proofFamily | proofArtifactPath | memberIds | theoremIds | replayStepIds | witnessArtifactPaths | Current source basis |
| --- | --- | --- | --- | --- | --- | --- |
| inference-synthesis | `.engi/inference-synthesis-proof.json` | moment-contract-closure, inference-payload-closure, parsed-envelope-consistency | inference_synthesis.contract_closure, inference_synthesis.payload_closure | inference-synthesis.moment-contracts, inference-synthesis.payload-replay | `.engi/inference-moment-contracts.json`, `.engi/inference-proofs.json`, `.engi/prompt-implementation-surface.json`, `.engi/parsed-completion-envelopes.json`, `.engi/inference-synthesis-proof.json` | `engi-demo/src/canonical/evaluation-materialization.js`, `engi-demo/src/canonical/proof-materialization.js` |
| prompt-completeness | `.engi/prompt-completeness-proof.json` | member-set-reconciliation, parse-admissibility, consumer-closure, provenance-truth | prompt_completeness.member_set_reconciliation, prompt_completeness.consumer_closure | prompt-completeness.member-set-reconciliation, prompt-completeness.consumer-closure | `.engi/prompt-family-registry.json`, `.engi/prompt-contracts.json`, `.engi/prompt-surfaces.json`, `.engi/prompt-completeness-proof.json` | `engi-demo/src/canonical/prompting.js`, `engi-demo/src/canonical/proof-materialization.js` |
| static-code-analysis | `.engi/static-measurement-proof.json` | stage-domain, stage-mapping, receipt-report-proof | static_code_analysis.stage_domain_purity, static_code_analysis.receipt_report_proof | static-code-analysis.stage-domain, static-code-analysis.receipt-report-proof | `.engi/code-analysis-fact-registry.json`, `.engi/static-heuristics-registry.json`, `.engi/measurement-receipts.json`, `.engi/static-measurement-report.json`, `.engi/static-measurement-proof.json` | `engi-demo/src/engi-demo.js`, `engi-demo/src/canonical/proof-materialization.js` |
| verification-decisions | `.engi/verification-decisions-proof.json` | issuance-closure, provenance-closure, sufficiency-closure, issuer-policy-closure | verification_decisions.issuance_closure, verification_decisions.provenance_closure | verification-decisions.stage-mapping, verification-decisions.use-tier-consequence | `.engi/verification-report.json`, `.engi/verification-receipts.json`, `.engi/verification-decisions-proof.json` | `engi-demo/src/engi-demo.js`, `engi-demo/src/canonical/proof-materialization.js` |
| selection-and-materialization | `.engi/selection-and-materialization-proof.json` | selected-asset-closure, lock-closure, visibility-closure, exclusion-closure | selection_and_materialization.selected_asset_closure, selection_and_materialization.visibility_closure | selection-and-materialization.selected-set, selection-and-materialization.visibility | `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json`, `.engi/selection-consistency-proof.json`, `.engi/materialization-proof.json`, `.engi/materialization-exclusions.json`, `.engi/materialization-visibility-proof.json`, `.engi/selection-and-materialization-proof.json` | `engi-demo/src/engi-demo.js`, `engi-demo/src/canonical/proof-materialization.js` |
| authorization-and-sensitive-flow | `.engi/authorization-and-sensitive-flow-proof.json` | identity-closure, authorization-closure, sensitive-flow-closure | authorization_and_sensitive_flow.identity_closure, authorization_and_sensitive_flow.sensitive_flow_closure | authorization-and-sensitive-flow.identity-bindings, authorization-and-sensitive-flow.sensitive-flow | `.engi/identity-bindings.json`, `.engi/authorization-decisions.json`, `.engi/sensitive-data-flow.json`, `.engi/identity-authorization-proof.json`, `.engi/sensitive-data-flow-proof.json`, `.engi/authorization-and-sensitive-flow-proof.json` | `engi-demo/src/engi-demo.js`, `engi-demo/src/canonical/proof-materialization.js` |
| settlement-source-to-shares | `.engi/settlement-source-to-shares-proof.json` | contribution-totality, normalization-exactness, journal-completeness | settlement_source_to_shares.contribution_totality, settlement_source_to_shares.journal_completeness | settlement-source-to-shares.contribution-allocation, settlement-source-to-shares.journal-theorem | `.engi/source-to-shares.json`, `.engi/settlement-participation.json`, `.engi/accounting-precision-report.json`, `.engi/journal-diff.json`, `.engi/journal-completeness-proof.json`, `.engi/settlement-proof.json`, `.engi/settlement-source-to-shares-proof.json` | `engi-demo/src/canonical/settlement.js`, `engi-demo/src/canonical/proof-materialization.js` |
| disclosure-boundary | `.engi/disclosure-boundary-proof.json` | policy-bounded-public, redaction-alignment, disclosure-verdict-alignment | disclosure_boundary.projection_policy_closure, disclosure_boundary.redaction_alignment | disclosure-boundary.policy-bounded-public, disclosure-boundary.redaction-disclosure | `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/redaction-proof.json`, `.engi/disclosure-proof.json`, `.engi/disclosure-boundary-proof.json` | `engi-demo/src/engi-demo.js`, `engi-demo/src/canonical/proof-materialization.js` |
| proof-contract | `.engi/proof-contract.json` | contract-materialization, evidence-chain, bundle-witness | proof_contract.contract_materialization, proof_contract.bundle_witness | proof-contract.contract-materialization, proof-contract.bundle-witness | `.engi/proof-contract.json`, `.engi/system-proof-bundle.json`, `.engi/proof-witness-manifest.json` | `engi-demo/src/engi-demo.js`, `engi-demo/src/canonical/run-artifacts.js` |
| bitcoin-audit-anchor | `.engi/bitcoin-audit-anchor-proof.json` | bounded-public-root-closure, private-root-closure, anchor-receipt-closure | bitcoin_audit_anchor.public_root_closure, bitcoin_audit_anchor.anchor_receipt_closure | bitcoin-audit-anchor.public-root, bitcoin-audit-anchor.anchor-publication | `.engi/storage-reality-manifest.json`, `.engi/bitcoin-commitment-manifest.json`, `.engi/bitcoin-treasury-policy.json`, `.engi/bitcoin-anchor.json`, `.engi/bitcoin-bounded-public-anchor.json`, `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/disclosure-proof.json`, `.engi/proof-contract.json`, `.engi/system-proof-bundle.json`, `.engi/proof-witness-manifest.json`, `.engi/bitcoin-audit-anchor-proof.json` | `engi-demo/src/canonical/v23-bitcoin.js`, `engi-demo/src/canonical/proof-materialization.js` |
| bitcoin-settlement-interface | `.engi/bitcoin-settlement-interface-proof.json` | settlement-intent-binding, settlement-observation-binding, journal-finalization-binding | bitcoin_settlement_interface.intent_binding, bitcoin_settlement_interface.observation_binding | bitcoin-settlement-interface.intent, bitcoin-settlement-interface.observation | `.engi/compute-reality-manifest.json`, `.engi/bitcoin-settlement-intent.json`, `.engi/bitcoin-settlement-observation.json`, `.engi/bitcoin-treasury-policy.json`, `.engi/source-to-shares.json`, `.engi/settlement-proof.json`, `.engi/external-boundary-manifest.json`, `.engi/bitcoin-settlement-interface-proof.json` | `engi-demo/src/canonical/v23-bitcoin.js`, `engi-demo/src/canonical/proof-materialization.js` |
| external-realization-execution | `.engi/external-realization-proof.json` | mainchain-intent-binding, network-execution-binding, sidechain-observation-binding | external_realization_execution.network_execution_closure, external_realization_execution.mode_isolation_closure | external-realization-execution.intent, external-realization-execution.observation | `.engi/external-environment-profile.json`, `.engi/external-execution-policy.json`, `.engi/external-telemetry-summary.json`, `.engi/bitcoin-network-intent.json`, `.engi/bitcoin-network-execution.json`, `.engi/bitcoin-network-observation.json`, `.engi/sidechain-execution-receipt.json`, `.engi/external-realization-proof.json` | draft-target `engi-demo/src/canonical/v24-external-realization.js` plus pending runtime integration |
| containerized-reality | `.engi/container-reality-proof.json` | compute-attestation-binding, storage-publication-binding, storage-retrieval-binding | containerized_reality.compute_attestation_closure, containerized_reality.storage_policy_closure | containerized-reality.compute-execution, containerized-reality.storage-publication | `.engi/external-environment-profile.json`, `.engi/compute-container-manifest.json`, `.engi/compute-container-execution.json`, `.engi/storage-container-manifest.json`, `.engi/storage-publication-receipt.json`, `.engi/storage-retrieval-receipt.json`, `.engi/container-reality-proof.json` | draft-target V24 runtime integration |
| github-live-interface | `.engi/github-live-interface-proof.json` | app-binding-closure, live-session-closure, branch-publication-closure, pr-mutation-closure | github_live_interface.session_closure, github_live_interface.mutation_closure | github-live-interface.session, github-live-interface.branch-publication | `.engi/external-environment-profile.json`, `.engi/github-app-binding.json`, `.engi/github-live-session.json`, `.engi/github-inventory-fetch-receipt.json`, `.engi/github-artifact-fetch-receipt.json`, `.engi/github-branch-publication-receipt.json`, `.engi/github-pr-update-receipt.json`, `.engi/github-live-interface-proof.json` | draft-target V24 runtime integration |

### Inference-synthesis

- `proofArtifactPath:` `.engi/inference-synthesis-proof.json`
- `members:` `moment-contract-closure`, `inference-payload-closure`, `implementation-surface-closure`, `parsed-envelope-consistency`
- `theoremIds:` `inference_synthesis.contract_closure`, `inference_synthesis.payload_closure`, `inference_synthesis.parsed_envelope_consistency`
- `replayStepIds:` `inference-synthesis.moment-contracts`, `inference-synthesis.payload-replay`, `inference-synthesis.parsed-envelope-replay`
- `witnessArtifactPaths:` `.engi/inference-moment-contracts.json`, `.engi/inference-proofs.json`, `.engi/prompt-implementation-surface.json`, `.engi/parsed-completion-envelopes.json`, `.engi/inference-synthesis-proof.json`
- `current member closure criteria:` all moment contracts, inference payloads, implementation surfaces, and parsed envelopes resolve to the same need and prompt lineage.
- `current member verdict shape:` per-member pass/fail verdict with witness artifact refs, replay step refs, and failure reasons.
- `current theorem-by-theorem closure reading:` each theorem closes only when the same witness set supports contract, payload, and parsed-envelope coherence.
- `current theorem-to-replay grouping:` contract lineage groups under `moment-contracts`; payload and parsed-envelope coherence group under `payload-replay` and `parsed-envelope-replay`.
- `minimum artifact/replay binding set:` the listed witnessArtifactPaths plus the three replayStepIds are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` rendered into `ENGI_SPEC_V24_PROVEN.md` family details and exercised by core/workflow tests.
- `fail-closed conditions:` missing inference proofs, prompt implementation drift, or parsed-envelope inconsistency fail closed.

### Prompt-completeness

- `proofArtifactPath:` `.engi/prompt-completeness-proof.json`
- `members:` `member-set-reconciliation`, `parse-admissibility`, `consumer-closure`, `provenance-truth`
- `theoremIds:` `prompt_completeness.member_set_reconciliation`, `prompt_completeness.consumer_closure`, `prompt_completeness.provenance_truth`
- `replayStepIds:` `prompt-completeness.member-set-reconciliation`, `prompt-completeness.parse-admissibility`, `prompt-completeness.consumer-closure`, `prompt-completeness.provenance-truth`
- `witnessArtifactPaths:` `.engi/prompt-family-registry.json`, `.engi/prompt-contracts.json`, `.engi/prompt-surfaces.json`, `.engi/prompt-completeness-proof.json`
- `current member closure criteria:` every prompt family declared for the run is registered, surfaced, consumed, and provenance-bound.
- `current member verdict shape:` per-member pass/fail verdict with artifact refs, replay refs, and completeness failure reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires family registry, contract, surface, and consumer closure to agree.
- `current theorem-to-replay grouping:` completeness groups across reconciliation, parse admissibility, consumer closure, and provenance truth.
- `minimum artifact/replay binding set:` the listed prompt artifacts and replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` emitted as proof and rendered into generated proof-family inventory and theorem listings.
- `fail-closed conditions:` prompt contract incompleteness, missing surface coverage, or provenance mismatch fail closed.

### Static-code-analysis

- `proofArtifactPath:` `.engi/static-measurement-proof.json`
- `members:` `stage-domain`, `stage-mapping`, `receipt-report-proof`
- `theoremIds:` `static_code_analysis.stage_domain_purity`, `static_code_analysis.stage_mapping_closure`, `static_code_analysis.receipt_report_proof`
- `replayStepIds:` `static-code-analysis.stage-domain`, `static-code-analysis.stage-mapping`, `static-code-analysis.receipt-report-proof`
- `witnessArtifactPaths:` `.engi/code-analysis-fact-registry.json`, `.engi/static-heuristics-registry.json`, `.engi/measurement-receipts.json`, `.engi/static-measurement-report.json`, `.engi/static-measurement-proof.json`
- `current member closure criteria:` static facts, heuristics, receipts, and reports must reconcile to the same extracted code analysis domain.
- `current member verdict shape:` per-member pass/fail verdict with receipt refs, report refs, and failure reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires domain purity, stage mapping coherence, and report proof coherence.
- `current theorem-to-replay grouping:` stage purity groups under `stage-domain`; mapping and report closure group under `stage-mapping` and `receipt-report-proof`.
- `minimum artifact/replay binding set:` measurement receipts, analysis registries, report, and proof are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` surfaced in proof-family reports and exercised by core tests.
- `fail-closed conditions:` measurement receipt absence or report/replay mismatch fail closed.

### Verification-decisions

- `proofArtifactPath:` `.engi/verification-decisions-proof.json`
- `members:` `issuance-closure`, `provenance-closure`, `sufficiency-closure`, `issuer-policy-closure`
- `theoremIds:` `verification_decisions.issuance_closure`, `verification_decisions.provenance_closure`, `verification_decisions.sufficiency_closure`, `verification_decisions.issuer_policy_closure`
- `replayStepIds:` `verification-decisions.stage-mapping`, `verification-decisions.use-tier-consequence`
- `witnessArtifactPaths:` `.engi/verification-report.json`, `.engi/verification-receipts.json`, `.engi/verification-decisions-proof.json`
- `current member closure criteria:` verification report, receipts, and issued decision families must reconcile to the same selected candidates and use-tier outcomes.
- `current member verdict shape:` per-member pass/fail verdict with receipt refs and theorem refs.
- `current theorem-by-theorem closure reading:` issuance, provenance, sufficiency, and issuer-policy all require coherent receipt-backed verification results.
- `current theorem-to-replay grouping:` stage mapping and use-tier consequence replay cover all verification theorems.
- `minimum artifact/replay binding set:` verification report, verification receipts, proof artifact, and both replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` rendered into the generated proof appendix and exercised by workflow tests.
- `fail-closed conditions:` missing verification receipts or contradictory decisions fail closed.

### Selection-and-materialization

- `proofArtifactPath:` `.engi/selection-and-materialization-proof.json`
- `members:` `selected-asset-closure`, `lock-closure`, `materialized-source-closure`, `exclusion-closure`, `visibility-closure`
- `theoremIds:` `selection_and_materialization.selected_asset_closure`, `selection_and_materialization.lock_closure`, `selection_and_materialization.materialized_source_closure`, `selection_and_materialization.exclusion_closure`, `selection_and_materialization.visibility_closure`
- `replayStepIds:` `selection-and-materialization.selected-set`, `selection-and-materialization.visibility`
- `witnessArtifactPaths:` `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json`, `.engi/selection-consistency-proof.json`, `.engi/materialization-proof.json`, `.engi/materialization-exclusions.json`, `.engi/materialization-visibility-proof.json`, `.engi/selection-and-materialization-proof.json`
- `current member closure criteria:` selected assets, locked pack, materialized sources, exclusions, and visibility summaries must all agree.
- `current member verdict shape:` per-member pass/fail verdict with witness refs and selection consistency reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires both selected-set and visibility replay to agree with materialized outputs.
- `current theorem-to-replay grouping:` selection theorems group under `selected-set`; visibility and exclusion theorems group under `visibility`.
- `minimum artifact/replay binding set:` lock, selected-source manifest, materialization proof, exclusions, visibility proof, and replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` generated proof appendix, branch artifact inventory, and e2e flow expectations.
- `fail-closed conditions:` materialization without selected-set closure or unexplained exclusions fail closed.

### Authorization-and-sensitive-flow

- `proofArtifactPath:` `.engi/authorization-and-sensitive-flow-proof.json`
- `members:` `identity-closure`, `authorization-closure`, `sensitive-flow-closure`, `policy-release-closure`
- `theoremIds:` `authorization_and_sensitive_flow.identity_closure`, `authorization_and_sensitive_flow.authorization_closure`, `authorization_and_sensitive_flow.sensitive_flow_closure`, `authorization_and_sensitive_flow.policy_release_closure`
- `replayStepIds:` `authorization-and-sensitive-flow.identity-bindings`, `authorization-and-sensitive-flow.sensitive-flow`
- `witnessArtifactPaths:` `.engi/identity-bindings.json`, `.engi/authorization-decisions.json`, `.engi/sensitive-data-flow.json`, `.engi/identity-authorization-proof.json`, `.engi/sensitive-data-flow-proof.json`, `.engi/authorization-and-sensitive-flow-proof.json`
- `current member closure criteria:` identity, authorization, and sensitive-flow artifacts must reconcile to the same policy and addressing roots.
- `current member verdict shape:` per-member pass/fail verdict with policy refs and witness refs.
- `current theorem-by-theorem closure reading:` theorem closure requires identity, authorization, and sensitive-data flow to agree without leakage.
- `current theorem-to-replay grouping:` identity closure groups under `identity-bindings`; flow and release closure group under `sensitive-flow`.
- `minimum artifact/replay binding set:` identity bindings, authorization decisions, sensitive-data flow, and both replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` generated proof appendix and authorization/disclosure tests.
- `fail-closed conditions:` authorization denial, stale policy roots, or sensitive-flow mismatch fail closed.

### Settlement-source-to-shares

- `proofArtifactPath:` `.engi/settlement-source-to-shares-proof.json`
- `members:` `contribution-totality`, `clipping-determinism`, `normalization-exactness`, `participation-totality`, `allocation-conservation`, `journal-completeness`
- `theoremIds:` `settlement_source_to_shares.contribution_totality`, `settlement_source_to_shares.normalization_exactness`, `settlement_source_to_shares.allocation_conservation`, `settlement_source_to_shares.journal_completeness`
- `replayStepIds:` `settlement-source-to-shares.contribution-allocation`, `settlement-source-to-shares.journal-theorem`
- `witnessArtifactPaths:` `.engi/source-to-shares.json`, `.engi/settlement-participation.json`, `.engi/accounting-precision-report.json`, `.engi/journal-diff.json`, `.engi/journal-completeness-proof.json`, `.engi/settlement-proof.json`, `.engi/settlement-source-to-shares-proof.json`
- `current member closure criteria:` contributions, participation, exact NGI allocation, journals, and settlement proof must reconcile.
- `current member verdict shape:` per-member pass/fail verdict with artifact refs, theorem refs, and conservation failure reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires contribution totality, normalization exactness, conservation, and journal completeness to agree.
- `current theorem-to-replay grouping:` allocation theorems group under `contribution-allocation`; journal theorems group under `journal-theorem`.
- `minimum artifact/replay binding set:` the full settlement artifact set and both replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` active settlement appendix renderings and core/workflow settlement tests.
- `fail-closed conditions:` settlement conservation drift or journal incompleteness fail closed.

### Disclosure-boundary

- `proofArtifactPath:` `.engi/disclosure-boundary-proof.json`
- `members:` `projection-policy-closure`, `bounded-public-closure`, `redaction-alignment`, `disclosure-verdict-alignment`
- `theoremIds:` `disclosure_boundary.projection_policy_closure`, `disclosure_boundary.redaction_alignment`, `disclosure_boundary.disclosure_verdict_alignment`
- `replayStepIds:` `disclosure-boundary.policy-bounded-public`, `disclosure-boundary.redaction-disclosure`
- `witnessArtifactPaths:` `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/redaction-proof.json`, `.engi/disclosure-proof.json`, `.engi/disclosure-boundary-proof.json`
- `current member closure criteria:` projection policy, bounded-public proof, redaction, and disclosure verdicts must remain coherent per principal.
- `current member verdict shape:` per-member pass/fail verdict with witness refs and leakage reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires policy, redaction, and disclosure surfaces to agree without public overexposure.
- `current theorem-to-replay grouping:` policy closure groups under `policy-bounded-public`; redaction/disclosure theorems group under `redaction-disclosure`.
- `minimum artifact/replay binding set:` projection policy, bounded-public proof, redaction proof, disclosure proof, and both replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` disclosure appendix renderings and API/e2e projection tests.
- `fail-closed conditions:` public projection overexposure or redaction mismatch fail closed.

### Proof-contract

- `proofArtifactPath:` `.engi/proof-contract.json`
- `members:` `contract-materialization`, `evidence-chain`, `bundle-witness`, `family-closure`
- `theoremIds:` `proof_contract.contract_materialization`, `proof_contract.evidence_chain_closure`, `proof_contract.bundle_witness`, `proof_contract.family_closure`
- `replayStepIds:` `proof-contract.contract-materialization`, `proof-contract.evidence-chain`, `proof-contract.bundle-witness`
- `witnessArtifactPaths:` `.engi/proof-contract.json`, `.engi/system-proof-bundle.json`, `.engi/proof-witness-manifest.json`
- `current member closure criteria:` proof contract, bundle, and witness manifest must agree over all included proof families.
- `current member verdict shape:` per-member pass/fail verdict with witness refs and missing-family reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires contract materialization, evidence chain integrity, and witness manifest coherence.
- `current theorem-to-replay grouping:` contract and evidence theorems group under `contract-materialization` and `evidence-chain`; witness closure groups under `bundle-witness`.
- `minimum artifact/replay binding set:` proof contract, system proof bundle, witness manifest, and three replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` generated proof appendix plus proof generator and family report checks.
- `fail-closed conditions:` missing witness artifacts, missing family coverage, or bundle incoherence fail closed.

### Bitcoin-audit-anchor

- `proofArtifactPath:` `.engi/bitcoin-audit-anchor-proof.json`
- `members:` `bounded-public-root-closure`, `private-root-closure`, `public-anchor-receipt-closure`, `treasury-policy-closure`
- `theoremIds:` `bitcoin_audit_anchor.public_root_closure`, `bitcoin_audit_anchor.private_root_closure`, `bitcoin_audit_anchor.anchor_receipt_closure`, `bitcoin_audit_anchor.treasury_policy_closure`
- `replayStepIds:` `bitcoin-audit-anchor.public-root`, `bitcoin-audit-anchor.private-root`, `bitcoin-audit-anchor.anchor-publication`
- `witnessArtifactPaths:` `.engi/storage-reality-manifest.json`, `.engi/bitcoin-commitment-manifest.json`, `.engi/bitcoin-treasury-policy.json`, `.engi/bitcoin-anchor.json`, `.engi/bitcoin-bounded-public-anchor.json`, `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/disclosure-proof.json`, `.engi/proof-contract.json`, `.engi/system-proof-bundle.json`, `.engi/proof-witness-manifest.json`, `.engi/bitcoin-audit-anchor-proof.json`
- `current member closure criteria:` bounded-public and private commitment scopes plus anchor receipts and treasury policy must reconcile to the same run.
- `current member verdict shape:` per-member pass/fail verdict with anchor refs, proof refs, and disclosure reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires both commitment scopes and the anchor publication record to be coherent and policy-bound.
- `current theorem-to-replay grouping:` scope derivation groups under `public-root` and `private-root`; publication closure groups under `anchor-publication`.
- `minimum artifact/replay binding set:` commitment manifest, treasury policy, anchor receipts, projection policy, bounded-public proof, proof contract, bundle, witness manifest, and replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` V23/V24 Bitcoin-facing generated appendix surfaces and settlement/anchor tests.
- `fail-closed conditions:` missing public anchor receipt, missing private scope closure, or bounded-public leakage fail closed.

### Bitcoin-settlement-interface

- `proofArtifactPath:` `.engi/bitcoin-settlement-interface-proof.json`
- `members:` `settlement-intent-binding`, `settlement-observation-binding`, `journal-finalization-binding`, `treasury-policy-binding`
- `theoremIds:` `bitcoin_settlement_interface.intent_binding`, `bitcoin_settlement_interface.observation_binding`, `bitcoin_settlement_interface.journal_finalization_binding`, `bitcoin_settlement_interface.treasury_policy_binding`
- `replayStepIds:` `bitcoin-settlement-interface.intent`, `bitcoin-settlement-interface.observation`, `bitcoin-settlement-interface.journal-finalization`
- `witnessArtifactPaths:` `.engi/compute-reality-manifest.json`, `.engi/bitcoin-settlement-intent.json`, `.engi/bitcoin-settlement-observation.json`, `.engi/bitcoin-treasury-policy.json`, `.engi/source-to-shares.json`, `.engi/settlement-proof.json`, `.engi/external-boundary-manifest.json`, `.engi/bitcoin-settlement-interface-proof.json`
- `current member closure criteria:` settlement intent, settlement observation, treasury policy, and journal finalization must reconcile to the same NGI-denominated event.
- `current member verdict shape:` per-member pass/fail verdict with payment refs, settlement refs, and confirmation reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires intent, observation, journal, and policy bindings to agree.
- `current theorem-to-replay grouping:` payment-intent theorem groups under `intent`; observation and journal theorems group under `observation` and `journal-finalization`.
- `minimum artifact/replay binding set:` settlement intent, observation, treasury policy, settlement proof, source-to-shares artifact, and replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` V23/V24 settlement appendix surfaces and settlement-interface tests.
- `fail-closed conditions:` missing execution receipt, confirmation drift, or journal finalization before observation fail closed.

## generated canon

### Inherited V19 reproducible-canon artifacts

V24 inherits the V19 reproducible-canon baseline as active generated evidence requirements for reproducibility, replay, and mutation visibility.

### Inherited V20 operator-quality artifacts

V24 inherits the V20 operator-quality baseline as active generated evidence requirements for operator quality, accessibility, performance, and projection sanity.

### Exact generated-artifact inventory matrix

Current V24 generated artifact inventories must cover:
- active inherited reproducible and operator-quality reports,
- `.engi/v24-spec-family-report.json`,
- `.engi/v24-canonical-input-report.json`,
- and `ENGI_SPEC_V24_PROVEN.md`.

### V24 specifying generated artifacts

V24 draft-target specifying artifacts are:
- `.engi/v24-spec-family-report.json`
- `.engi/v24-canonical-input-report.json`
- `ENGI_SPEC_V24_PROVEN.md`

### Shared generated-artifact fields

Shared generated-artifact fields must include version, proof-source commit, generation timestamp, target version, active pointer, structural verdict, and fail-closed reasons when not clean.

### Artifact-specific generated payload fields

Artifact-specific generated payload fields must include the structural report payload, canonical input report payload, and promoted appendix payload with exact family/run inventories.

### Artifact confidentiality and disclosability taxonomy

Generated artifacts are bounded-public unless they embed private witness inventories; generated proofs that expose private witnessArtifactPaths remain private-proof artifacts.

### Minimum generated appendix rendered contents

The promoted appendix must include:
- aggregate proof verdict,
- exact proof-family inventory,
- exact per-family member inventory,
- exact per-family theorem inventory,
- exact replay-step inventories and theorem bindings,
- witness artifact inventories,
- generated artifact inventories,
- scenario and run coverage matrices,
- proof-source commit,
- and fail closed when generated evidence is stale, missing, or inconsistent.

### Canonical regeneration and fail-closed posture

Canonical regeneration must fail closed when:
- the generated appendix is stale,
- the family report is stale,
- the canonical input report is stale,
- the pointer and target disagree,
- or generated artifacts are used to compensate for missing main-spec meaning.

## validation canon

The V24 validation canon includes:
- host-agnostic local pre-commit basics for spec-sensitive changes,
- strict versioned spec conformance for `spec: VN` commit titles,
- core, API, workflow, and browser tests,
- spec-quality tests for the checker and enforcement scripts,
- environment-mode matrix tests for production, staging, development, and mock,
- containerized CI or CD runs of strict spec conformance and full runtime tests,
- and promotion-time regeneration plus cleanliness checks.

Current validating commands and parity basis include:
- `node scripts/run-engi-spec-quality.mjs --mode basic`
- `node scripts/run-engi-spec-quality.mjs --mode strict-version --version V24`
- `node scripts/run-engi-spec-quality.mjs --mode strict-from-title --commit-title "spec: V24 ..."`
- `node --test engi-demo/test/core.test.js`
- `node --test engi-demo/test/api.test.js`
- `node --test engi-demo/test/workflow.integration.test.js`
- `node --test engi-demo/test/e2e.test.js`
- `node --test engi-demo/test/v21-specifying.test.js engi-demo/test/v22-canon-drift.test.js engi-demo/test/v24-spec-quality.test.js`

## promotion canon

Promotion from V23 to V24 requires:
1. real external interfaces implemented in source,
2. emitted V24 artifact families wired into runtime, projection, deliverables, witness manifest, and proof contract,
3. mode-isolated identity and resource bindings across production, staging, development, and mock,
4. strict V24 full-canon conformance passing,
5. generated V24 reports and `ENGI_SPEC_V24_PROVEN.md` generated,
6. containerized CI or CD green,
7. clean promotion-time pointer update and posture update,
8. and no stale draft language in the promoted file family.

## V24 artifact family additions

V24 draft adds the following candidate artifact family:

- `.engi/external-environment-profile.json`
- `.engi/external-execution-policy.json`
- `.engi/external-telemetry-policy.json`
- `.engi/external-telemetry-summary.json`
- `.engi/network-capability-manifest.json`
- `.engi/bitcoin-network-intent.json`
- `.engi/bitcoin-network-execution.json`
- `.engi/bitcoin-network-observation.json`
- `.engi/sidechain-execution-receipt.json`
- `.engi/compute-container-manifest.json`
- `.engi/compute-container-execution.json`
- `.engi/storage-container-manifest.json`
- `.engi/storage-publication-receipt.json`
- `.engi/storage-retrieval-receipt.json`
- `.engi/github-app-binding.json`
- `.engi/github-live-session.json`
- `.engi/github-inventory-fetch-receipt.json`
- `.engi/github-artifact-fetch-receipt.json`
- `.engi/github-branch-publication-receipt.json`
- `.engi/github-pr-update-receipt.json`
- `.engi/external-realization-proof.json`
- `.engi/container-reality-proof.json`
- `.engi/github-live-interface-proof.json`

The final V24 artifact list may contract or expand, but every realized external interface must map to a concrete emitted artifact.

## V24 proof-family additions

V24 extends the proof-family canon with the following draft-target families:

### External-realization-execution

- `proofArtifactPath:` `.engi/external-realization-proof.json`
- `members:` `mainchain-intent-binding`, `network-execution-binding`, `network-observation-binding`, `sidechain-observation-binding`, `mode-isolation-closure`
- `theoremIds:` `external_realization_execution.intent_binding`, `external_realization_execution.execution_closure`, `external_realization_execution.observation_closure`, `external_realization_execution.mode_isolation_closure`
- `replayStepIds:` `external-realization-execution.intent`, `external-realization-execution.execution`, `external-realization-execution.observation`
- `witnessArtifactPaths:` `.engi/external-environment-profile.json`, `.engi/external-execution-policy.json`, `.engi/external-telemetry-summary.json`, `.engi/bitcoin-network-intent.json`, `.engi/bitcoin-network-execution.json`, `.engi/bitcoin-network-observation.json`, `.engi/sidechain-execution-receipt.json`, `.engi/external-realization-proof.json`
- `current member closure criteria:` the same environment profile, execution policy, network receipts, and sidechain receipt must reconcile to one external execution event.
- `current member verdict shape:` per-member pass/fail verdict with intent refs, execution refs, observation refs, and mode-isolation reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires declared intent, executed network action, observed chain state, and environment isolation to agree.
- `current theorem-to-replay grouping:` intent closure groups under `intent`; execution and observation closure group under `execution` and `observation`.
- `minimum artifact/replay binding set:` external environment profile, execution policy, telemetry summary, network intent/execution/observation, sidechain receipt, and replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` draft-target V24 generated appendix plus environment-mode and network interface tests.
- `fail-closed conditions:` missing execution receipt, sidechain observation drift, or cross-mode isolation drift fail closed.

### Containerized-reality

- `proofArtifactPath:` `.engi/container-reality-proof.json`
- `members:` `compute-manifest-binding`, `compute-attestation-binding`, `storage-manifest-binding`, `storage-publication-binding`, `storage-retrieval-binding`
- `theoremIds:` `containerized_reality.compute_manifest_closure`, `containerized_reality.compute_attestation_closure`, `containerized_reality.storage_publication_closure`, `containerized_reality.storage_policy_closure`
- `replayStepIds:` `containerized-reality.compute-execution`, `containerized-reality.storage-publication`, `containerized-reality.storage-retrieval`
- `witnessArtifactPaths:` `.engi/external-environment-profile.json`, `.engi/compute-container-manifest.json`, `.engi/compute-container-execution.json`, `.engi/storage-container-manifest.json`, `.engi/storage-publication-receipt.json`, `.engi/storage-retrieval-receipt.json`, `.engi/container-reality-proof.json`
- `current member closure criteria:` compute and storage manifests, execution receipts, and retrieval/publication receipts must reconcile to the same environment and artifact set.
- `current member verdict shape:` per-member pass/fail verdict with attestation refs, publication refs, retrieval refs, and disclosure-policy reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires compute attestation, storage publication, retrieval, and policy enforcement to agree.
- `current theorem-to-replay grouping:` compute theorems group under `compute-execution`; storage theorems group under `storage-publication` and `storage-retrieval`.
- `minimum artifact/replay binding set:` external environment profile, compute manifest/execution, storage manifest/publication/retrieval, and replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` draft-target V24 generated appendix plus container and storage interface tests.
- `fail-closed conditions:` container attestation drift, storage policy drift, or retrieval/publication mismatch fail closed.

### GitHub-live-interface

- `proofArtifactPath:` `.engi/github-live-interface-proof.json`
- `members:` `app-binding-closure`, `live-session-closure`, `inventory-fetch-closure`, `artifact-fetch-closure`, `branch-publication-closure`, `pr-mutation-closure`
- `theoremIds:` `github_live_interface.app_binding_closure`, `github_live_interface.session_closure`, `github_live_interface.fetch_closure`, `github_live_interface.mutation_closure`, `github_live_interface.mode_isolation_closure`
- `replayStepIds:` `github-live-interface.session`, `github-live-interface.fetch`, `github-live-interface.branch-publication`, `github-live-interface.pr-mutation`
- `witnessArtifactPaths:` `.engi/external-environment-profile.json`, `.engi/github-app-binding.json`, `.engi/github-live-session.json`, `.engi/github-inventory-fetch-receipt.json`, `.engi/github-artifact-fetch-receipt.json`, `.engi/github-branch-publication-receipt.json`, `.engi/github-pr-update-receipt.json`, `.engi/github-live-interface-proof.json`
- `current member closure criteria:` GitHub App binding, live session, fetch receipts, and mutation receipts must reconcile to the same repository addressing and authorization roots.
- `current member verdict shape:` per-member pass/fail verdict with app refs, installation refs, mutation refs, and reconciliation reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires GitHub reads and writes to remain repo-authenticated, policy-bound, and mode-isolated.
- `current theorem-to-replay grouping:` app/session closure groups under `session`; fetch closure groups under `fetch`; mutation closure groups under `branch-publication` and `pr-mutation`.
- `minimum artifact/replay binding set:` external environment profile, GitHub app binding, live session, fetch receipts, mutation receipts, and replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` draft-target V24 generated appendix plus GitHub live-interface tests and spec-quality enforcement.
- `fail-closed conditions:` github observation drift, GitHub App cross-mode drift, or mutation without receipt closure fail closed.

## V24 principal-scoped execution and disclosure policy

V24 keeps V23 principal-scoped disclosure intact.

That means:
- public surfaces may inspect only bounded-public anchor and bounded-public publication receipts,
- reviewer surfaces may inspect replay-capable summaries and non-sensitive execution receipts,
- buyer surfaces may inspect settlement-, bundle-, and purchase-relevant execution receipts,
- internal surfaces may inspect full execution and container manifests where policy allows.

Live execution does not weaken disclosure policy.
It increases the number of private proof-bearing artifacts ENGI must classify correctly.

## V24 acceptance criteria

The following acceptance criteria are the review gate for V24 drafting:

1. V24 clearly keeps V23 active and does not claim promotion.
2. V24 states that real external execution, not additional modeling, is the center of the version.
3. V24 covers all requested realization axes:
   - BTC-backed real network execution,
   - auditable compute and storage containers,
   - end-to-end real GitHub interfacings.
4. V24 defines concrete artifact families for each realized external effect class.
5. V24 defines concrete proof families for network execution, containers, and GitHub interfacing.
6. V24 preserves V23 commitment, disclosure, settlement, and NGI denomination rules unless explicitly extended.
7. V24 requires `production`, `staging`, `development`, and `mock` modes across Bitcoin, sidechain, compute, storage, and GitHub interfaces.
8. V24 requires environment-isolated external identities and resources rather than shared cross-mode bindings.
9. V24 requires proof-bearing execution and observation receipts rather than informal operational success.
10. V24 requires exhaustive telemetry and mode-aware coverage as part of the interface contract.
11. V24 keeps sidechain execution in scope as a required bridge component.
12. V24 states promotion prerequisites separately from drafting acceptance.
13. V24 states that promoted canon must be a full-system rewrite rather than a semantic dependency on V23.
14. V24 includes explicit build-process enforcement for spec quality, including pre-commit, containerized CI or CD, and commit-title-gated spec conformance.

The following acceptance criteria are the later implementation/promotion gate:

1. Source emits the realized V24 external-execution artifact family.
2. Source emits environment profiles and mode-specific identity and resource bindings for every realized external interface.
3. Source emits real Bitcoin mainchain execution and observation receipts wherever V24 claims mainchain realization.
4. Source emits real sidechain execution receipts wherever V24 claims sidechain realization.
5. Source emits real container manifests and execution receipts for compute and storage.
6. Source emits real GitHub session, fetch, branch, and mutation receipts for end-to-end GitHub interfacings.
7. Deliverables classification and projection policy classify all new V24 artifacts correctly.
8. Proof-witness manifest and proof-contract include all new V24 proof families.
9. Tests fail closed on receipt drift, network drift, container attestation drift, storage policy drift, GitHub observation drift, disclosure leakage, and cross-mode isolation drift.
10. Tests cover `production`, `staging`, `development`, and `mock` paths for Bitcoin, sidechain, compute, storage, and GitHub interfaces.
11. Exhaustive telemetry artifacts exist and validation treats missing telemetry as blocking.
12. Generated V24 reports and `ENGI_SPEC_V24_PROVEN.md` exist.
13. The V24 spec-family checker profile enforces full-canon carriers rather than a narrowed delta-style profile.
14. Local pre-commit checks cover host-agnostic spec basics when spec, specifying, or spec-checker files change.
15. CI or CD runs the containerized strict spec-conformance suite plus the full implementation test suite.
16. Commit titles matching `spec: VN` or `spec: VN...` trigger strict spec-family conformance checks.
17. Only then may `ENGI_SPEC.txt` point to `V24`.

## appendices and canonical supporting material

The appendices in this main `SPEC` are part of canonical system meaning and are not optional supplements.

## Appendix A. Canonical type and surface catalog

The canonical type and surface catalog includes:
- run identity, need identity, deposit identity, bundle identity, projection principal, and settlement identity,
- NGI-denominated share and micro-unit carriers,
- public and private commitment-scope carriers,
- bitcoin mainchain execution carriers,
- sidechain execution carriers,
- compute-container execution carriers,
- storage-container publication and retrieval carriers,
- GitHub App/session/fetch/mutation carriers,
- telemetry-policy and telemetry-summary carriers,
- proof-family objects, theorem verdicts, replay catalogs, and witness inventories.

## Appendix B. Proof family closure catalog

The proof family closure catalog in V24 contains:
- Inference-synthesis
- Prompt-completeness
- Static-code-analysis
- Verification-decisions
- Selection-and-materialization
- Authorization-and-sensitive-flow
- Settlement-source-to-shares
- Disclosure-boundary
- Proof-contract
- Bitcoin-audit-anchor
- Bitcoin-settlement-interface
- External-realization-execution
- Containerized-reality
- GitHub-live-interface

Each family closes only when its witnessArtifactPaths, theoremIds, replayStepIds, and artifact bindings all reconcile.

## Appendix C. Generated artifact contract catalog

The generated artifact contract catalog covers:
- inherited reproducible-canon and operator-quality reports,
- `.engi/v24-spec-family-report.json`,
- `.engi/v24-canonical-input-report.json`,
- and `ENGI_SPEC_V24_PROVEN.md`.

These generated artifact inventories must include generated artifact inventories and scenario and run coverage matrices and must fail closed when regeneration is stale.

## Appendix D. Validation and checking gate catalog

The validation and checking gate catalog includes:
- local pre-commit checks for host-agnostic basics,
- strict version and commit-title spec conformance,
- runtime/API/workflow/browser tests,
- containerized CI or CD full suites,
- promotion-time regeneration checks,
- and clean-environment promotion validation.

## Appendix E. Current canonical source map

The current canonical source map includes:
- `engi-demo/src/engi-demo.js`
- `engi-demo/src/canonical/run-artifacts.js`
- `engi-demo/src/canonical/proof-materialization.js`
- `engi-demo/src/canonical/settlement.js`
- `engi-demo/src/canonical/projections.js`
- `engi-demo/src/canonical/prompting.js`
- `engi-demo/src/canonical/evaluation-materialization.js`
- `engi-demo/src/canonical/v23-bitcoin.js`
- `engi-demo/src/canonical/v24-external-realization.js`
- `engi-demo/src/demo-shell-state.js`
- `engi-demo/server.js`
- `scripts/run-engi-spec-quality.mjs`
- `scripts/check-engi-pre-commit.mjs`
- `scripts/check-engi-commit-msg.mjs`
- `.github/workflows/engi-canon-quality.yml`

## Appendix F. Subsystem totality and derivability matrix

The subsystem totality and derivability matrix explicitly covers:
- repo supply and depositing
- needing and measured demand
- prompt/inference/evaluator ownership
- depositing-to-needing fit
- recall and ranking
- verification decisions
- selection and materialization
- branch artifacts and deliverables
- identity, authority, signing, and policy
- sensitive data and confidentiality flows
- projection, disclosure, and redaction
- proof families, members, theorems, witnesses, and replay
- settlement, source-to-shares, journals, and exact accounting
- telemetry, persistence, state, and failure semantics
- host/runtime capability truth
- operator experience and pedagogy
- validation and test stack
- generated artifacts and canonical promotion
- bitcoin mainchain execution
- sidechain execution
- compute-container execution
- storage-container execution
- github live interface
- environment-mode completeness and isolation
- telemetry and coverage
- full-canon specification completeness

Every one of those subsystems must be derivable from the main `SPEC`, its appendices, and the active generated appendix after promotion.

## Appendix G. Canonical file-family and promotion contract catalog

The canonical file-family and promotion contract catalog includes:
- `ENGI_SPEC.txt`
- `ENGI_SPEC_V24.md`
- `ENGI_SPEC_V24_DELTA.md`
- `ENGI_SPEC_V24_PARITY_MATRIX.md`
- `ENGI_SPEC_V24_NOTES.md`
- `ENGI_SPEC_V24_PROVEN.md`
- `.engi/v24-spec-family-report.json`
- `.engi/v24-canonical-input-report.json`

Promotion requires the pointer, posture, generated reports, `_PROVEN_` appendix, and source parity state to agree.

## Appendix H. Operator surface and quality contract catalog

The operator surface and quality contract catalog includes:
- browser shell explanation surfaces,
- embedded demo pedagogy,
- API exposure for current state and external realization state,
- projection summaries,
- settlement preview and audit views,
- telemetry summaries,
- accessibility, performance, and projection quality expectations,
- and operator-facing error posture for fail-closed conditions.

## Appendix I. Scenario, workflow, and cross-product contract catalog

The scenario, workflow, and cross-product contract catalog includes:
- `auth-issuer-rollback`
- `privacy-boundary-proof-export`
- `polyglot-gateway-benchmark-remediation`
- `auth-many-asset-normalization`
- `Targeted deposit`
- `Normalization deposit`
- `patch`
- `context`
- `public`
- `buyer`
- `reviewer`
- `internal`
- `Openly writable`
- `Measurably readable`
- `Provable`
- `Valuable`

V24 adds a second cross-product over:
- `production`
- `staging`
- `development`
- `mock`

## Appendix J. Fail-closed contract and error posture matrix

The fail-closed contract and error posture matrix includes:
- `invalid deposit`
- `prompt contract incompleteness`
- `parsed-envelope inadmissibility`
- `no-survivor asset pack`
- `authorization denial`
- `public projection overexposure`
- `settlement conservation drift`
- `stale promoted status truth`
- `cross-mode isolation drift`
- `missing execution receipt`
- `container attestation drift`
- `github observation drift`
- `spec checker profile omits full-canon carrier requirements`

Every named failure class is blocking for promotion when it applies to a claimed realized interface.

## Appendix K. Source-bearing deliverable and artifact contract catalog

The source-bearing deliverable and artifact contract catalog includes:
- `.engi/asset-pack.lock.json`
- `.engi/selected-source-material.json`
- `.engi/verification-report.json`
- `.engi/source-to-shares.json`
- `.engi/projection-policy.json`
- `.engi/system-proof-bundle.json`
- `.engi/external-environment-profile.json`
- `.engi/external-execution-policy.json`
- `.engi/external-telemetry-policy.json`
- `.engi/external-telemetry-summary.json`
- `.engi/bitcoin-network-intent.json`
- `.engi/bitcoin-network-execution.json`
- `.engi/bitcoin-network-observation.json`
- `.engi/sidechain-execution-receipt.json`
- `.engi/compute-container-manifest.json`
- `.engi/compute-container-execution.json`
- `.engi/storage-container-manifest.json`
- `.engi/storage-publication-receipt.json`
- `.engi/storage-retrieval-receipt.json`
- `.engi/github-app-binding.json`
- `.engi/github-live-session.json`
- `.engi/github-inventory-fetch-receipt.json`
- `.engi/github-artifact-fetch-receipt.json`
- `.engi/github-branch-publication-receipt.json`
- `.engi/github-pr-update-receipt.json`
- `.engi/external-realization-proof.json`
- `.engi/container-reality-proof.json`
- `.engi/github-live-interface-proof.json`
- `ENGI_SPEC_V24_PROVEN.md`

## accepted boundaries and reopen conditions

V24 accepts the following boundaries during drafting:
- no live mainnet transaction broadcast is claimed until `bitcoin-network-execution` and `bitcoin-network-observation` are emitted,
- no live repeated-read payment processor is claimed until the same receipt model exists for that mode,
- no live sidechain operator is claimed until sidechain execution receipts and observation close,
- no live compute or storage container reality is claimed until attested manifests and receipts are emitted,
- no live GitHub mutation is claimed until live session, mutation, and observation receipts exist,
- and no promoted V24 is accepted until the full-canon rewrite passes strict conformance.

The following reopen conditions apply:
- if any later V24 implementation narrows carriers back into `_PROVEN_` or parity,
- if any realized interface bypasses receipt closure,
- if any environment mode reuses another mode's live identity or resource bindings,
- or if any generated appendix claim diverges from runtime truth.

## Accepted boundaries

Still explicitly outside first-gate V24 drafting and implementation until separately realized:
- moving bulk proof computation to Bitcoin mainchain,
- moving private artifact payloads to public-chain storage,
- claiming threshold or federated policy specifics before source chooses them,
- treating metaspec repair as a substitute for real external-interface realization,
- and claiming any realized network, container, or GitHub path before proof-bearing receipts exist in source.

## V24 completion condition

This V24 draft is structurally first-gate complete only when:
1. the V24 file family exists,
2. the realization center is explicit,
3. artifact and proof-family additions are concrete rather than gestural,
4. review-gate and promotion-gate acceptance criteria are distinct,
5. environment-mode completeness and isolation are explicit across all realized external interfaces,
6. telemetry and coverage requirements are explicit across all realized external interfaces,
7. metaspec repair and strict conformance enforcement are explicit but subordinate to the external-realization center,
8. the main `SPEC` itself carries full-canon system meaning rather than delegating it to prior versions,
9. Appendix A through Appendix K are present inside the main `SPEC`,
10. and the draft can be implemented without ambiguity about what counts as a realized external effect.
