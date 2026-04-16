# ENGI Spec V26

## Status

- Scope: V26 draft target for Bitcode productionizing hardening, demonstration-to-application integration, application-facing UI replacement, interface hardening, and package-first repository refurbishment after V25 rename canon
- Current canonical/latest target: `V25`
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V25`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_PROVEN.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible reports, `.engi/v20-*` operator-quality reports, `.engi/v25-spec-family-report.json`, `.engi/v25-canonical-input-report.json`, and `.engi/v25-canon-posture-drift-report.json`; V26 requires `.engi/v26-spec-family-report.json`, `.engi/v26-canonical-input-report.json`, and `ENGI_SPEC_V26_PROVEN.md` before promotion, but those artifacts are not yet promoted truth
- Draft companion delta: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26_DELTA.md`
- Draft companion parity ledger: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26_PARITY_MATRIX.md`
- Draft companion notes file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26_NOTES.md`
- Draft posture source: `/Users/garrettmaring/Developer/ENGI/packages/bitcode/src/canon-posture.js` keeps `ACTIVE_CANON_VERSION = 'V25'` and `DRAFT_TARGET_VERSION = 'V26'`
- Source parity state: current source now carries first-gate V26 migration under `packages/bitcode`, `uapi/app/application/*`, and app-owned `uapi/app/api/*` routes; second-gate application-facing component refit and later hardening remain open
- V26 state: active draft family opened; V25 remains the only active canonical system specification

## Drafting and acceptance state

V26 is not a rename-first version and it is not a light cleanup pass.
V26 is the productionizing hardening version that reorganizes Bitcode from a transitional demo/site split into a package-owned, application-native, live-operation-ready system.

During V26 drafting:
- V25 remains active canonical truth,
- V26 must not claim promotion or current runtime closure,
- the current source-bearing implementation basis now includes the landed first-gate package/app migration surfaces cited below,
- and the V26 main spec must still be full-system and re-implementation-grade even while some target ownership remains draft-target rather than promoted truth.

## Version executive summary

V25 completed the current-facing rename from ENGI to Bitcode and from NGI to BTD while preserving the prior behavioral chain.

V26 opens because the renamed system still has an architectural split that is too large for a production-ready Bitcode:
- the old standalone demonstration had to be removed as a top-level owner,
- the preserved operator shell had to move into package/app ownership without losing its deterministic UX contract,
- the application route had to replace the embedded-demo posture,
- and several external and internal interfaces still remain short of the level expected of a live application.

V26 therefore centers four coordinated workstreams:
1. demonstration-to-application integration,
2. marketing and application-facing UI refurbishment,
3. interface and subsystem hardening,
4. organizational refurbishment.

The intended result is not "micro-app the demo into `uapi/`."
The intended result is:
- remove `engi-demo/` as a top-level directory owner,
- land first-gate Bitcode ownership under `packages/bitcode` plus app-owned route surfaces,
- preserve the useful Bitcode operator UX chain while replacing demonstration ownership first and deeper UI implementation second,
- remove the homepage embedded-demo posture in favor of a full-page application route,
- and harden auth, GitHub, bitcoin, sidechain, repeated-read, compute, storage, telemetry, and reconciliation to a live-application-ready level.

## V26 first-gate and second-gate structure

V26 is now explicitly split into two gates.

### First-gate

First-gate is the ownership migration gate.
It preserves the Bitcode shell experience while changing where that experience lives.

The current first-gate source file structure is:
- `packages/bitcode/src/*`
- `packages/bitcode/public/*`
- `packages/bitcode/server.js`
- `packages/bitcode/test/*`
- `uapi/app/application/page.tsx`
- `uapi/app/application/ApplicationPageClient.tsx`
- `uapi/app/application/first-gate-styles/route.ts`
- `uapi/app/api/state/route.ts`
- `uapi/app/api/deposits/route.ts`
- `uapi/app/api/make-bitcode-branch/route.ts`
- `uapi/app/api/make-engi-branch/route.ts`
- `uapi/app/api/reset/route.ts`
- `uapi/app/api/bitcoin-demonstration-service/route.ts`
- `uapi/app/api/orbitals/data/route.ts`
- `uapi/app/api/v24/external-realization/route.ts`
- `uapi/app/api/v24/executors/[interfaceId]/route.ts`
- `uapi/lib/bitcode-app-context.ts`

First-gate closure means:
- no `engi-demo/` directory remains,
- `/application` is the app-owned Bitcode carrier,
- the preserved shell DOM, interaction order, and API/state contract run from package/app owners,
- and the homepage no longer embeds or foregrounds a standalone demo surface.

### Second-gate

Second-gate is the application-experience gate.
It does not reopen the first-gate ownership migration.
It replaces the preserved shell implementation with deeper native application-facing composition while keeping Bitcode semantics intact.

## Canonical ENGI executive summary

The heading name remains a historical carrier required by the specifying contract.
The subject of V26 is Bitcode.

In V26, Bitcode remains:
1. a proof-bearing operating system for repo supply, measured need, fit, verification, selection, materialization, disclosure, settlement, and proof closure,
2. a system that already has active V25 rename closure and must preserve Bitcode and BTD posture during further reorganization,
3. a system that already has external-realization, proof, settlement, disclosure, and fail-closed semantics in source,
4. a system whose current operator story is useful but whose current ownership and presentation are transitional,
5. a system that must move from demonstration-owned and marketing-embedded posture to application-native posture,
6. a system that must keep repo supply and depositing, needing and measured demand, prompt/inference/evaluator ownership, depositing-to-needing fit, recall and ranking, verification decisions, selection and materialization, branch artifacts and deliverables, identity, authority, signing, and policy, sensitive data and confidentiality flows, projection, disclosure, and redaction, proof families, members, theorems, witnesses, and replay, settlement, source-to-shares, journals, and exact accounting, telemetry, persistence, state, and failure semantics, host/runtime capability truth, operator experience and pedagogy, validation and test stack, and generated artifacts and canonical promotion all explicitly in scope,
7. and a system that must now be legible as a real application rather than as an adjacent demonstration.

## source-of-truth hierarchy

Current truth order for the V26 draft period is:
1. `ENGI_SPEC.txt`
2. `ENGI_SPEC_V25.md`
3. `ENGI_SPEC_V25_DELTA.md`
4. `ENGI_SPEC_V25_PARITY_MATRIX.md`
5. `ENGI_SPEC_V25_PROVEN.md`
6. active canonical `.engi/v19-*`, `.engi/v20-*`, and `.engi/v25-*` artifacts
7. current source and tests explicitly referenced by active V25 canon
8. `ENGI_SPEC_V26.md`
9. `ENGI_SPEC_V26_DELTA.md`
10. `ENGI_SPEC_V26_PARITY_MATRIX.md`
11. `ENGI_SPEC_V26_NOTES.md`
12. historical prior specs

V26 is therefore the active draft target and the active rewrite surface, but not the active canonical runtime truth until promotion is deliberate.

## full-system, re-implementation, and audit rule

The promoted V26 main specification must be sufficient for:
- full-system re-implementation of current Bitcode behavior and the intended V26 ownership changes,
- audit recovery of the current proof contract, artifact model, and application/operator posture,
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
- repeated-read payment execution,
- compute-container execution,
- storage-container execution,
- GitHub live interface,
- auth and wallet connection,
- application-route integration,
- package extraction and repository ownership,
- marketing/product-surface routing,
- and full-canon specification completeness.

Neither `_PROVEN_`, parity, source, demo code, app code, packages, nor earlier specs are allowed to carry missing current-system meaning for promoted V26.

## totality and precision enforcement rule

V26 requires totality and precision rather than suggestive prose.

That means:
- every realized or target-realized external effect maps to named artifacts,
- every proof family maps to named witnessArtifactPaths, theoremIds, and replayStepIds,
- every route and ownership migration states whether it is current source truth, implemented prerequisite, or draft target,
- every generated artifact expectation maps to a regeneration and validation contract,
- every fail-closed condition is named,
- every acceptance boundary is explicit,
- and no part of the V26 reorganization is allowed to hide behind "integration" without naming the actual owner that will carry the behavior.

When V26 says "current source basis," it means current V25-era repo truth.
When V26 says "draft target owner," it means intended V26 ownership that is not yet promoted.
When V26 says "implemented prerequisite," it means existing source already supplies some of the behavior V26 intends to reorganize rather than invent.

## system goals, non-goals, and design principles

### Goals

1. Move the Bitcode operator experience from demonstration-owned posture to a first-class application page.
2. Remove homepage embedded-demo dependence and replace it with navigate-to product routing.
3. Preserve the current Bitcode operator UX chain while replacing the demonstration UI implementation with application-facing components.
4. Reassign Bitcode system ownership from demo-local concentration into package-owned and app-owned surfaces.
5. Converge GitHub, auth, and API production responsibilities onto the existing package/application architecture where those owners already fit.
6. Harden bitcoin, sidechain, repeated-read, compute, storage, telemetry, reconciliation, and auth/wallet interfaces to live-operation-ready posture.
7. Restore stronger repository-level architectural coherence so the repo again matches the fuller package-first pattern it already advertises.
8. Keep Bitcode and BTD rename closure stable while the system is reorganized.
9. Keep proof-bearing, fail-closed, exact-accounting, and disclosure-bounded semantics intact through the reorganization.
10. Produce a full-canon V26 specification family that can stand alone for re-implementation, audit, and promotion.

### Non-goals

1. Re-opening the Bitcode or BTD rename as the center of the version.
2. Redesigning Bitcode economics or denomination behavior.
3. Treating the current demo UI shell as the long-term owner of the Bitcode application surface.
4. Treating a route move alone as sufficient V26 closure without ownership and hardening work.
5. Treating historical `_legacy/` code as active truth.

### Design principles

- Preserve the operator UX chain while replacing the operator UI owner.
- Prefer package-first ownership and explicit app composition over demo-local concentration.
- Reuse existing packages when the current owner already fits.
- Keep application routing and product posture explicit rather than iframe-dependent.
- Keep every external effect auditable and fail closed.
- Keep disclosure and proof boundaries intact while the app surface becomes more natural.
- Keep compatibility carriers stable unless V26 changes them explicitly.
- Do not derive current truth from `_legacy/`; forward-porting, when later reopened, must normalize into current owners.

## V26 productionizing workstreams

The four V26 workstreams are:

1. demonstration-to-application integration
2. marketing and application-facing UI refurbishment
3. interface and subsystem hardening
4. organizational refurbishment

Those workstreams are coordinated, not alternative options.
V26 is incomplete if any one of them is omitted from the promoted version center.

## system architecture and layer boundaries

V26 productionizing hardening is organized into ten interacting layers:

1. `core deterministic primitives and canonical vocabulary`
2. `package-owned Bitcode operating surfaces`
3. `package-owned artifacts, proof, projection, settlement, and external-realization layers`
4. `API composition and route-owned application orchestration`
5. `application-facing UI composition and operator route surfaces`
6. `marketing and navigation surfaces that lead into the application`
7. `identity, authorization, wallet, signing, and policy`
8. `bitcoin, sidechain, repeated-read, compute, storage, and GitHub live interfaces`
9. `telemetry, reconciliation, runtime posture, and generated evidence`
10. `promotion, validation, and canonical file-family governance`

The current source-bearing split across these layers is still imperfect:
- `engi-demo/` still spans many of them at once,
- `uapi/` carries marketing and app composition,
- `packages/*` already owns some production-grade responsibilities,
- and V26 exists to make those boundaries explicit rather than accidental.

The cross-cutting constraints over every layer are:
- Bitcode/BTD rename invariance,
- application-native operator posture,
- package-first ownership,
- proof-bearing auditable execution,
- fail-closed behavior,
- and generated-artifact plus promotion completeness.

## canonical domain model

The V26 canonical domain model includes the following object and surface classes:

- repo supply and depositing: authenticated repositories, deposits, deposit profiles, deposit envelopes, repo bindings, and GitHub installation context.
- needing and measured demand: need scenarios, benchmark/parser-derived demand, licensed query surfaces, and measured demand envelopes.
- prompt/inference/evaluator ownership: prompt families, prompt contracts, prompt surfaces, inference moments, parsed completion envelopes, evaluator manifests, and prompt lineage.
- depositing-to-needing fit: fit explanations, candidate match scores, exclusion reasons, ranked candidates, and eligibility boundaries.
- recall and ranking: retrieval candidates, ranking receipts, use-tier signals, and candidate ordering stability.
- verification decisions: issuance, provenance, sufficiency, and issuer-policy decisions plus supporting receipts.
- selection and materialization: asset-pack locks, selected-source manifests, materialization proofs, branch artifact outputs, and application-visible operator artifacts.
- branch artifacts and deliverables: `.engi/` outputs, witness manifests, generated reports, route-facing views, and publication receipts.
- identity, authority, signing, and policy: identity bindings, authorization decisions, wallet connection, signer or treasury policy, GitHub App binding, and external execution policy.
- sensitive data and confidentiality flows: sensitive-data flow maps, disclosure classifications, retention policies, and publication controls.
- projection, disclosure, and redaction: principal-scoped views over public, reviewer, buyer, and internal surfaces.
- proof families, members, theorems, witnesses, and replay: proof object models, replay steps, artifact bindings, witness inventories, and theorem closure.
- settlement, source-to-shares, journals, and exact accounting: BTD-denominated allocation, settlement participation, accounting precision, journal diff, and settlement proof.
- telemetry, persistence, state, and failure semantics: telemetry summaries, execution manifests, route state, external execution state, retries, rollbacks, and reconciliation state.
- host/runtime capability truth: application posture, package posture, runtime posture, external capability truth, and mode-specific credentials.
- operator experience and pedagogy: product routing, full-page operator surfaces, proof/settlement inspection, and application-facing explanations.
- validation and test stack: local checks, strict spec conformance, package tests, API tests, application tests, and promotion regeneration.
- generated artifacts and canonical promotion: generated reports, `_PROVEN_` appendix, canonical input reports, parity ledgers, and promotion rules.

## whole ENGI operator chain

The whole ENGI operator chain in V26 is:
1. configure the active V25/V26 posture and route class,
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
14. settle source-to-shares and journals in BTD,
15. derive proof-family, witness, and replay closure,
16. execute Bitcoin mainchain, repeated-read, or sidechain interfaces when required,
17. execute compute-container and storage-container interfaces when required,
18. execute GitHub live interfaces when required,
19. expose the operator experience through the application-native Bitcode page rather than a demo-local shell,
20. reconcile telemetry, persistence, state, and failure semantics,
21. validate, regenerate, and decide canonical promotion.

The workflow stages remain:
- Openly writable,
- Measurably readable,
- Provable,
- Valuable.

## canonical subsystem surfaces

### Depositing and asset supply

- Current canonical objects and emitted artifacts: repo supply and depositing are represented by authenticated repository bindings, deposit envelopes, `.engi/depositing-surface.json`, `.engi/github-boundary.json`, `.engi/github-live-session.json`, `.engi/github-inventory-fetch-receipt.json`, and `.engi/asset-pack.lock.json`.
- Current algorithms and derivation rules: Bitcode admits repo-addressable deposits, normalizes deposit identity against repo-authenticated supply, and carries deposit lineage forward into fit, verification, materialization, proof, and GitHub live mutation surfaces. V26 adds the requirement that the primary operator route consume those surfaces through package-owned and app-owned composition rather than directly through demo-local owners.
- Current invariants and fail-closed conditions: invalid deposit, stale repo addressing, missing GitHub inventory receipt, broken deposit lineage, or route-layer presentation that obscures deposit provenance fail closed.
- Current proof obligations: deposit provenance, asset identity stability, repo-authenticated supply closure, and deposit-to-asset-pack continuity must be replayable.
- Current source-bearing implementation basis: `packages/bitcode/src/engi-demo.js`, `packages/bitcode/src/canonical/run-artifacts.js`, `packages/bitcode/src/canonical/surfaces.js`, `packages/bitcode/src/canonical/v24-external-realization.js`, `packages/bitcode/server.js`, and `packages/github`.
- Current validating commands and parity basis: `node --test packages/bitcode/test/core.test.js`, `node --test packages/bitcode/test/api.test.js`, and the V26 parity rows for application-native routing and package extraction.
- Current accepted boundaries: external GitHub execution remains deployment-configured and policy-bound; V26 accepts deposit supply only through emitted session, fetch, branch, and mutation receipts and does not treat `_legacy/` as active deposit truth.

### Needing and prompt/inference ownership

- Current canonical objects and emitted artifacts: needing and prompt/inference/evaluator ownership are represented by `.engi/needing-surface.json`, `.engi/prompt-family-registry.json`, `.engi/prompt-contracts.json`, `.engi/prompt-surfaces.json`, `.engi/inference-moment-contracts.json`, `.engi/parsed-completion-envelopes.json`, and `.engi/eval-manifest.json`.
- Current algorithms and derivation rules: Bitcode measures need from benchmark, parser, and repo reality, maps prompts and inference moments to that need, and binds evaluator ownership to replayable contracts. V26 preserves those semantics while moving ownership toward package-backed canon and app/API composition.
- Current invariants and fail-closed conditions: prompt contract incompleteness, parsed-envelope inadmissibility, evaluator ambiguity, need drift, or route/UI layers that detach prompt lineage from need lineage fail closed.
- Current proof obligations: prompt family completeness, inference synthesis closure, and evaluator provenance must stay witness-bound and replayable.
- Current source-bearing implementation basis: `packages/bitcode/src/canonical/prompting.js`, `packages/bitcode/src/canonical/evaluation-materialization.js`, `packages/bitcode/src/canonical/need-measurement.js`, `packages/bitcode/src/engi-demo.js`, and the future draft target packages recorded in the V26 extraction matrix.
- Current validating commands and parity basis: `node --test packages/bitcode/test/core.test.js`, proof-family coverage inside the active test suite, and `node scripts/check-engi-spec-family.mjs --version V26`.
- Current accepted boundaries: third-party model execution counts only when it remains receipted, policy-bound, replayable, and normalized back into Bitcode artifacts regardless of whether the final owner is a package or an app/API surface.

### Fit, recall, ranking, and verification

- Current canonical objects and emitted artifacts: fit, recall, ranking, and verification are represented by `.engi/depositing-to-needing-surface.json`, `.engi/match-report.json`, `.engi/verification-report.json`, `.engi/verification-receipts.json`, and `.engi/verification-decisions-proof.json`.
- Current algorithms and derivation rules: Bitcode computes depositing-to-needing fit before deeper proof closure, then performs recall and ranking, and only then resolves verification decisions and use-tiering. V26 preserves that ordering and requires the app-native surface to present it without depending on demo-owned UI.
- Current invariants and fail-closed conditions: no-survivor asset pack, ranking inconsistency, verification decision drift, non-replayable verification receipts, or UI-layer loss of verification provenance fail closed.
- Current proof obligations: fit continuity, verification issuance/provenance/sufficiency closure, and ranked-candidate determinism must remain auditable.
- Current source-bearing implementation basis: `packages/bitcode/src/engi-demo.js`, `packages/bitcode/src/canonical/evaluation-materialization.js`, `packages/bitcode/src/canonical/proof-materialization.js`, and `packages/bitcode/src/canonical/surfaces.js`.
- Current validating commands and parity basis: `node --test packages/bitcode/test/core.test.js`, `node --test packages/bitcode/test/workflow.integration.test.js`, and proof-family closure under `Verification-decisions`.
- Current accepted boundaries: external ranking or inference services remain acceptable only when receipted and recovered into Bitcode artifacts through the current proof and execution contracts.

### Selection and materialization

- Current canonical objects and emitted artifacts: selection and materialization are represented by `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json`, `.engi/selection-consistency-proof.json`, `.engi/materialization-proof.json`, `.engi/materialization-exclusions.json`, and `.engi/selection-and-materialization-proof.json`.
- Current algorithms and derivation rules: Bitcode materializes only selected assets, preserves exclusion reasons, binds materialized artifacts to bundle, branch, and proof identities, and in V26 must expose those outcomes through application-facing components rather than the demo-local UI shell.
- Current invariants and fail-closed conditions: materialization without selection closure, hidden exclusions, non-replayable selected-source lineage, or route/application drift from materialized truth fail closed.
- Current proof obligations: selected-set closure, materialized-source closure, visibility closure, and exclusion closure must all be witness-bound.
- Current source-bearing implementation basis: `packages/bitcode/src/canonical/evaluation-materialization.js`, `packages/bitcode/src/canonical/run-artifacts.js`, `packages/bitcode/src/canonical/proof-materialization.js`, `packages/bitcode/public/app.js`, and the V26 draft target application route owners.
- Current validating commands and parity basis: `node --test packages/bitcode/test/workflow.integration.test.js`, `node --test packages/bitcode/test/e2e.test.js`, and parity rows for app-native UI replacement and package extraction.
- Current accepted boundaries: real GitHub branch publication is a separate live interface and must not be inferred from local materialization alone even after the app surface becomes native.

### Identity, authorization, and sensitive flow

- Current canonical objects and emitted artifacts: identity, authorization, and sensitive flow are represented by `.engi/identity-bindings.json`, `.engi/authorization-decisions.json`, `.engi/sensitive-data-flow.json`, `.engi/identity-authorization-proof.json`, `.engi/sensitive-data-flow-proof.json`, `.engi/authorization-and-sensitive-flow-proof.json`, `.engi/github-app-binding.json`, wallet-auth carriers in `packages/auth` and `packages/api`, and execution policy surfaces.
- Current algorithms and derivation rules: Bitcode derives authorization from issuer, signer, wallet, and policy roots, binds external execution to those roots, and routes sensitive data only through classified surfaces. V26 strengthens wallet connection and production auth posture and requires that the application-native Bitcode page operate inside that auth model.
- Current invariants and fail-closed conditions: authorization denial, stale signing roots, stale wallet verification, mis-bound GitHub App identities, or sensitive-flow leakage fail closed.
- Current proof obligations: identity closure, authorization closure, policy closure, wallet verification closure, and sensitive-flow closure must remain replayable across live interfaces.
- Current source-bearing implementation basis: `packages/bitcode/src/engi-demo.js`, `packages/bitcode/src/canonical/proof-materialization.js`, `packages/bitcode/src/canonical/v24-external-realization.js`, `packages/bitcode/src/canonical/v24-live-execution.js`, `packages/auth`, and `packages/api/src/routes/auth.ts`.
- Current validating commands and parity basis: `node --test packages/bitcode/test/core.test.js`, `node --test packages/bitcode/test/api.test.js`, and V26 parity rows for wallet/auth productionization.
- Current accepted boundaries: concrete signer topology, wallet provider details, and deployment auth infrastructure remain implementation choices so long as the receipt, policy, and fail-closed contracts are satisfied.

### Disclosure and projection

- Current canonical objects and emitted artifacts: disclosure and projection are represented by `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/redaction-proof.json`, `.engi/disclosure-proof.json`, `.engi/disclosure-boundary-proof.json`, public/reviewer/buyer/internal projection views, and storage publication and retrieval receipts.
- Current algorithms and derivation rules: Bitcode projects public, reviewer, buyer, and internal surfaces from the same underlying artifact set and preserves bounded-public proof as the only public-safe external projection. V26 additionally requires that the application-native operator surface and refurbished marketing surfaces present these boundaries clearly.
- Current invariants and fail-closed conditions: public projection overexposure, mismatched redaction, storage publication beyond principal rights, retrieval without disclosure authorization, or product-surface copy that implies broader disclosure than policy allows fail closed.
- Current proof obligations: projection policy closure, bounded-public closure, redaction alignment, disclosure verdict alignment, and storage-publication alignment must remain auditable.
- Current source-bearing implementation basis: `packages/bitcode/src/canonical/projections.js`, `packages/bitcode/src/demo-shell-state.js`, `packages/bitcode/src/engi-demo.js`, `packages/bitcode/src/canonical/v24-external-execution.js`, `packages/bitcode/src/canonical/v24-live-execution.js`, and `uapi/app/(root)/components/MarketingLandingPage.tsx`.
- Current validating commands and parity basis: `node --test packages/bitcode/test/api.test.js`, `node --test packages/bitcode/test/e2e.test.js`, and disclosure-boundary proof-family closure.
- Current accepted boundaries: public chains and public storage surfaces may only carry bounded-public receipts or bounded-public anchor material, never licensed source or private proof payloads by default, and V26 marketing must not reintroduce disclosure ambiguity.

### Settlement and exact accounting

- Current canonical objects and emitted artifacts: settlement and exact accounting are represented by `.engi/source-to-shares.json`, `.engi/settlement-participation.json`, `.engi/accounting-precision-report.json`, `.engi/journal-diff.json`, `.engi/journal-completeness-proof.json`, `.engi/settlement-proof.json`, `.engi/settlement-source-to-shares-proof.json`, repeated-read payment receipts, bitcoin-network execution receipts, and sidechain execution receipts.
- Current algorithms and derivation rules: Bitcode allocates exact BTD base units, normalizes basis points deterministically, binds payment intent and observation to bundle and settlement identities, and finalizes journals only under policy-bound execution observation. V26 preserves that accounting core while moving runtime ownership out of demo-local concentration.
- Current invariants and fail-closed conditions: settlement conservation drift, missing execution receipt, journal finalization without observation, stale reconciliation, or cross-mode treasury drift fail closed.
- Current proof obligations: contribution totality, normalization exactness, journal completeness, settlement theorem integrity, and payment-observation coherence must remain replayable.
- Current source-bearing implementation basis: `packages/bitcode/src/canonical/settlement.js`, `packages/bitcode/src/settlement-structs.js`, `packages/bitcode/src/canonical/v23-bitcoin.js`, `packages/bitcode/src/canonical/v24-external-execution.js`, `packages/bitcode/src/canonical/v24-live-execution.js`, and `packages/bitcode/src/engi-demo.js`.
- Current validating commands and parity basis: `node --test packages/bitcode/test/core.test.js`, `node --test packages/bitcode/test/workflow.integration.test.js`, and parity rows for external hardening and package extraction.
- Current accepted boundaries: V26 may keep base-layer, sidechain, and repeated-read execution behind deployment configuration, but only where execution and observation receipts exist in source and remain tied to exact accounting.

### Proof contract, witnesses, and replay

- Current canonical objects and emitted artifacts: proof contract, witnesses, and replay are represented by `.engi/proof-contract.json`, `.engi/system-proof-bundle.json`, `.engi/proof-witness-manifest.json`, all proof-family artifacts, `.engi/external-realization-proof.json`, `.engi/container-reality-proof.json`, `.engi/github-live-interface-proof.json`, `.engi/external-telemetry-summary.json`, and the future V26 `_PROVEN_` appendix.
- Current algorithms and derivation rules: Bitcode binds every proof family to witnessArtifactPaths, theoremIds, replayStepIds, and artifact digests, then carries them into the system proof bundle and witness manifest for replay. V26 adds the requirement that the proof contract remain coherent while ownership moves from demo-local concentration to package and app layers.
- Current invariants and fail-closed conditions: missing witness artifacts, replay-step drift, container attestation drift, GitHub observation drift, stale generated appendix truth, or proof-family omission fail closed.
- Current proof obligations: proof-family closure, theorem closure, replay closure, witness manifest coherence, and proof-contract bundle coherence must remain exact.
- Current source-bearing implementation basis: `packages/bitcode/src/canonical/proof-materialization.js`, `packages/bitcode/src/canonical/run-artifacts.js`, `packages/bitcode/src/canonical/v24-live-execution.js`, `packages/bitcode/src/engi-demo.js`, and `scripts/check-engi-spec-family.mjs`.
- Current validating commands and parity basis: `node --test packages/bitcode/test/proven-generator.test.js`, `node --test packages/bitcode/test/v21-specifying.test.js`, `node scripts/check-engi-canonical-inputs.mjs`, `node scripts/check-engi-spec-family.mjs --version V26`, and later strict V26 conformance.
- Current accepted boundaries: V26 may reorganize owners and add or merge families, but promotion may not narrow away family detail carriers, witness expectations, or generated appendix obligations.

## V26 second-gate package extraction matrix

First-gate has already consolidated the prior standalone owner into `packages/bitcode` plus app-owned route surfaces.
The following matrix now records the second-gate and later ownership map for splitting that first-gate owner into more deliberate subsystem packages.
These target owners remain draft targets, not yet promoted truth.

| Current source owner | Current responsibility | Draft V26 target owner | V26 extraction expectation | Priority |
| --- | --- | --- | --- | --- |
| `packages/bitcode/src/canon-posture.js` | active-canon and draft-target posture shaping for the current demo runtime | `packages/bitcode-canon` | move Bitcode canon posture builders and shared operator posture labels into package-owned canon utilities consumed by app and tests | P0 |
| `packages/bitcode/src/canonical/enums.js`, `packages/bitcode/src/canonical/types.js`, `packages/bitcode/src/canonical/type-contracts.ts`, `packages/bitcode/src/canonical/proof-annotations.js` | closed-case vocabulary, contracts, theorem/proof helpers | `packages/bitcode-canon` | become the package-owned canonical vocabulary and proof-contract layer for Bitcode implementations | P0 |
| `packages/bitcode/src/canonical/surfaces.js` | depositing, needing, fit, boundary, and GitHub operating surfaces | `packages/bitcode-operating-surfaces` | become package-owned system surface builders consumed by app routes and tests | P0 |
| `packages/bitcode/src/canonical/run-artifacts.js` | pipeline telemetry, prompt implementation, proof bundle, deliverables, scenario fixture, and coverage report builders | `packages/bitcode-artifacts` | become package-owned artifact and report emitters rather than demo-local helpers | P0 |
| `packages/bitcode/src/canonical/need-measurement.js` | need measurement runtime and parser/analysis closure | `packages/bitcode-needs` | become the package-owned need-derivation implementation | P0 |
| `packages/bitcode/src/canonical/evaluation-materialization.js` | ranking, verification, use tiers, materialization, and asset-pack selection | `packages/bitcode-materialization` | become the package-owned selection and materialization runtime | P0 |
| `packages/bitcode/src/canonical/settlement.js`, `packages/bitcode/src/settlement-structs.js` | source-to-shares accounting, settlement participation, journal diff, and settlement artifacts | `packages/bitcode-settlement` | become the package-owned settlement and accounting subsystem | P0 |
| `packages/bitcode/src/canonical/projections.js`, `packages/bitcode/src/demo-shell-state.js` | projection policy, bounded public proof, redaction/disclosure proof, and projection-safe public-state shaping | `packages/bitcode-projections` | become package-owned projection and disclosure builders consumed by the application route and API | P0 |
| `packages/bitcode/src/canonical/proof-materialization.js` | proof witness manifest, materialization proof, visibility proof, and exclusion closure | `packages/bitcode-proof` | become the package-owned proof and materialization subsystem | P0 |
| `packages/bitcode/src/canonical/v23-bitcoin.js`, `packages/bitcode/src/canonical/v23-bitcoin-demonstration-service.js`, `packages/bitcode/src/canonical/v24-external-realization.js`, `packages/bitcode/src/canonical/v24-external-execution.js`, `packages/bitcode/src/canonical/v24-live-execution.js`, `packages/bitcode/src/canonical/v24-local-executors.js`, `packages/bitcode/src/canonical/v24-remote-adapters.js` | bitcoin, sidechain, repeated-read, compute, storage, and GitHub external-realization and execution contracts | `packages/bitcode-external-realization` plus `packages/github` where GitHub provider behavior belongs | move demo-local external-interface ownership into package-backed runtime and adapter layers; GitHub provider logic converges on `packages/github` and related app/API owners | P0 |
| `packages/bitcode/src/realization-profile.js`, `packages/bitcode/src/policy-release.js`, `packages/bitcode/src/receipt-schemas.js` | realization profiles, policy release carriers, and receipt-shape helpers | `packages/bitcode-canon` and `packages/bitcode-artifacts` | split between package-owned canon/profile truth and package-owned receipt and artifact schemas | P1 |
| `packages/bitcode/src/demo-scenario.js`, `packages/bitcode/src/seed.js`, seeded fixture and test-support surfaces | seeded scenarios and deterministic fixture posture | `packages/bitcode-scenarios` | preserve deterministic scenario and fixture truth in package-owned test and demo-fixture surfaces | P1 |
| `packages/bitcode/src/engi-demo.js` | orchestration reservoir spanning the full Bitcode operating chain | distributed across the package owners above, with composition in `packages/api` and `uapi/app/*` | shrink and eventually dissolve the monolithic reservoir into package-owned domain layers plus application/API composition | P0 |
| `packages/bitcode/server.js` | standalone demo HTTP server and API composition | `packages/api` plus `uapi` application routes | move Bitcode API composition into package and app owners; the standalone demo server stops being the primary product surface | P0 |
| `packages/bitcode/public/index.html`, `packages/bitcode/public/app.js`, `packages/bitcode/public/styles.css` | demo-owned UI shell and rendering | `uapi/app/*` plus `uapi/components/base/*` | replace the demo UI implementation with application-facing components while preserving operator UX | P0 |
| `packages/bitcode/test/*` | demo-local runtime, proof, quality, and external-realization validation | package-local tests plus API and app integration tests | follow the extracted ownership model and keep fail-closed validation across package, API, and app layers | P0 |

## proof-family canon

The proof-family canon in V26 retains the core Bitcode families while V26 reorganizes the owners that produce them.
The family names below are the minimum V26 full-canon carriers even before promotion.

### Exact proof-family inventory matrix

| proofFamily | proofArtifactPath | memberIds | theoremIds | replayStepIds | witnessArtifactPaths | Current source basis |
| --- | --- | --- | --- | --- | --- | --- |
| inference-synthesis | `.engi/inference-synthesis-proof.json` | moment-contract-closure, inference-payload-closure, implementation-surface-closure, parsed-envelope-consistency | inference_synthesis.contract_closure, inference_synthesis.payload_closure, inference_synthesis.parsed_envelope_consistency | inference-synthesis.moment-contracts, inference-synthesis.payload-replay, inference-synthesis.parsed-envelope-replay | `.engi/inference-moment-contracts.json`, `.engi/inference-proofs.json`, `.engi/prompt-implementation-surface.json`, `.engi/parsed-completion-envelopes.json`, `.engi/inference-synthesis-proof.json` | `packages/bitcode/src/canonical/evaluation-materialization.js`, `packages/bitcode/src/canonical/proof-materialization.js` |
| prompt-completeness | `.engi/prompt-completeness-proof.json` | member-set-reconciliation, parse-admissibility, consumer-closure, provenance-truth | prompt_completeness.member_set_reconciliation, prompt_completeness.consumer_closure, prompt_completeness.provenance_truth | prompt-completeness.member-set-reconciliation, prompt-completeness.parse-admissibility, prompt-completeness.consumer-closure, prompt-completeness.provenance-truth | `.engi/prompt-family-registry.json`, `.engi/prompt-contracts.json`, `.engi/prompt-surfaces.json`, `.engi/prompt-completeness-proof.json` | `packages/bitcode/src/canonical/prompting.js`, `packages/bitcode/src/canonical/proof-materialization.js` |
| static-code-analysis | `.engi/static-measurement-proof.json` | stage-domain, stage-mapping, receipt-report-proof | static_code_analysis.stage_domain_purity, static_code_analysis.stage_mapping_closure, static_code_analysis.receipt_report_proof | static-code-analysis.stage-domain, static-code-analysis.stage-mapping, static-code-analysis.receipt-report-proof | `.engi/code-analysis-fact-registry.json`, `.engi/static-heuristics-registry.json`, `.engi/measurement-receipts.json`, `.engi/static-measurement-report.json`, `.engi/static-measurement-proof.json` | `packages/bitcode/src/engi-demo.js`, `packages/bitcode/src/canonical/proof-materialization.js` |
| verification-decisions | `.engi/verification-decisions-proof.json` | issuance-closure, provenance-closure, sufficiency-closure, issuer-policy-closure | verification_decisions.issuance_closure, verification_decisions.provenance_closure, verification_decisions.sufficiency_closure, verification_decisions.issuer_policy_closure | verification-decisions.stage-mapping, verification-decisions.use-tier-consequence | `.engi/verification-report.json`, `.engi/verification-receipts.json`, `.engi/verification-decisions-proof.json` | `packages/bitcode/src/engi-demo.js`, `packages/bitcode/src/canonical/proof-materialization.js` |
| selection-and-materialization | `.engi/selection-and-materialization-proof.json` | selected-asset-closure, lock-closure, materialized-source-closure, exclusion-closure, visibility-closure | selection_and_materialization.selected_asset_closure, selection_and_materialization.lock_closure, selection_and_materialization.materialized_source_closure, selection_and_materialization.exclusion_closure, selection_and_materialization.visibility_closure | selection-and-materialization.selected-set, selection-and-materialization.visibility | `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json`, `.engi/selection-consistency-proof.json`, `.engi/materialization-proof.json`, `.engi/materialization-exclusions.json`, `.engi/materialization-visibility-proof.json`, `.engi/selection-and-materialization-proof.json` | `packages/bitcode/src/engi-demo.js`, `packages/bitcode/src/canonical/proof-materialization.js` |
| authorization-and-sensitive-flow | `.engi/authorization-and-sensitive-flow-proof.json` | identity-closure, authorization-closure, sensitive-flow-closure, policy-release-closure | authorization_and_sensitive_flow.identity_closure, authorization_and_sensitive_flow.authorization_closure, authorization_and_sensitive_flow.sensitive_flow_closure, authorization_and_sensitive_flow.policy_release_closure | authorization-and-sensitive-flow.identity-bindings, authorization-and-sensitive-flow.sensitive-flow | `.engi/identity-bindings.json`, `.engi/authorization-decisions.json`, `.engi/sensitive-data-flow.json`, `.engi/identity-authorization-proof.json`, `.engi/sensitive-data-flow-proof.json`, `.engi/authorization-and-sensitive-flow-proof.json` | `packages/bitcode/src/engi-demo.js`, `packages/bitcode/src/canonical/proof-materialization.js`, `packages/auth` |
| settlement-source-to-shares | `.engi/settlement-source-to-shares-proof.json` | contribution-totality, clipping-determinism, normalization-exactness, participation-totality, allocation-conservation, journal-completeness | settlement_source_to_shares.contribution_totality, settlement_source_to_shares.normalization_exactness, settlement_source_to_shares.allocation_conservation, settlement_source_to_shares.journal_completeness | settlement-source-to-shares.contribution-allocation, settlement-source-to-shares.journal-theorem | `.engi/source-to-shares.json`, `.engi/settlement-participation.json`, `.engi/accounting-precision-report.json`, `.engi/journal-diff.json`, `.engi/journal-completeness-proof.json`, `.engi/settlement-proof.json`, `.engi/settlement-source-to-shares-proof.json` | `packages/bitcode/src/canonical/settlement.js`, `packages/bitcode/src/canonical/proof-materialization.js` |
| disclosure-boundary | `.engi/disclosure-boundary-proof.json` | projection-policy-closure, bounded-public-closure, redaction-alignment, disclosure-verdict-alignment | disclosure_boundary.projection_policy_closure, disclosure_boundary.redaction_alignment, disclosure_boundary.disclosure_verdict_alignment | disclosure-boundary.policy-bounded-public, disclosure-boundary.redaction-disclosure | `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/redaction-proof.json`, `.engi/disclosure-proof.json`, `.engi/disclosure-boundary-proof.json` | `packages/bitcode/src/engi-demo.js`, `packages/bitcode/src/canonical/proof-materialization.js`, `packages/bitcode/src/canonical/projections.js` |
| proof-contract | `.engi/proof-contract.json` | contract-materialization, evidence-chain, bundle-witness, family-closure | proof_contract.contract_materialization, proof_contract.evidence_chain_closure, proof_contract.bundle_witness, proof_contract.family_closure | proof-contract.contract-materialization, proof-contract.evidence-chain, proof-contract.bundle-witness | `.engi/proof-contract.json`, `.engi/system-proof-bundle.json`, `.engi/proof-witness-manifest.json` | `packages/bitcode/src/engi-demo.js`, `packages/bitcode/src/canonical/run-artifacts.js`, `packages/bitcode/src/canonical/proof-materialization.js` |

### Inference-synthesis

- `proofArtifactPath:` `.engi/inference-synthesis-proof.json`
- `members:` `moment-contract-closure`, `inference-payload-closure`, `implementation-surface-closure`, `parsed-envelope-consistency`
- `theoremIds:` `inference_synthesis.contract_closure`, `inference_synthesis.payload_closure`, `inference_synthesis.parsed_envelope_consistency`
- `replayStepIds:` `inference-synthesis.moment-contracts`, `inference-synthesis.payload-replay`, `inference-synthesis.parsed-envelope-replay`
- `witnessArtifactPaths:` `.engi/inference-moment-contracts.json`, `.engi/inference-proofs.json`, `.engi/prompt-implementation-surface.json`, `.engi/parsed-completion-envelopes.json`, `.engi/inference-synthesis-proof.json`
- `current member closure criteria:` all moment contracts, inference payloads, implementation surfaces, and parsed envelopes resolve to the same need and prompt lineage even when the application owner changes.
- `current member verdict shape:` per-member pass/fail verdict with witness artifact refs, replay step refs, and failure reasons.
- `current theorem-by-theorem closure reading:` each theorem closes only when the same witness set supports contract, payload, and parsed-envelope coherence.
- `current theorem-to-replay grouping:` contract lineage groups under `moment-contracts`; payload and parsed-envelope coherence group under `payload-replay` and `parsed-envelope-replay`.
- `minimum artifact/replay binding set:` the listed witnessArtifactPaths plus the three replayStepIds are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` rendered into `ENGI_SPEC_V26_PROVEN.md` family details and exercised by core, API, and package extraction validation.
- `fail-closed conditions:` missing inference proofs, prompt implementation drift, or parsed-envelope inconsistency fail closed.

### Prompt-completeness

- `proofArtifactPath:` `.engi/prompt-completeness-proof.json`
- `members:` `member-set-reconciliation`, `parse-admissibility`, `consumer-closure`, `provenance-truth`
- `theoremIds:` `prompt_completeness.member_set_reconciliation`, `prompt_completeness.consumer_closure`, `prompt_completeness.provenance_truth`
- `replayStepIds:` `prompt-completeness.member-set-reconciliation`, `prompt-completeness.parse-admissibility`, `prompt-completeness.consumer-closure`, `prompt-completeness.provenance-truth`
- `witnessArtifactPaths:` `.engi/prompt-family-registry.json`, `.engi/prompt-contracts.json`, `.engi/prompt-surfaces.json`, `.engi/prompt-completeness-proof.json`
- `current member closure criteria:` every prompt family declared for the run is registered, surfaced, consumed, provenance-bound, and exposed through the application-native operator experience without semantic loss.
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
- `current member closure criteria:` static facts, heuristics, receipts, and reports must reconcile to the same extracted code analysis domain regardless of whether the owner is still demo-local or has moved to packages.
- `current member verdict shape:` per-member pass/fail verdict with receipt refs, report refs, and failure reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires domain purity, stage mapping coherence, and report proof coherence.
- `current theorem-to-replay grouping:` stage purity groups under `stage-domain`; mapping and report closure group under `stage-mapping` and `receipt-report-proof`.
- `minimum artifact/replay binding set:` measurement receipts, analysis registries, report, and proof are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` surfaced in proof-family reports and exercised by core tests and specification quality checks.
- `fail-closed conditions:` measurement receipt absence or report and replay mismatch fail closed.

### Verification-decisions

- `proofArtifactPath:` `.engi/verification-decisions-proof.json`
- `members:` `issuance-closure`, `provenance-closure`, `sufficiency-closure`, `issuer-policy-closure`
- `theoremIds:` `verification_decisions.issuance_closure`, `verification_decisions.provenance_closure`, `verification_decisions.sufficiency_closure`, `verification_decisions.issuer_policy_closure`
- `replayStepIds:` `verification-decisions.stage-mapping`, `verification-decisions.use-tier-consequence`
- `witnessArtifactPaths:` `.engi/verification-report.json`, `.engi/verification-receipts.json`, `.engi/verification-decisions-proof.json`
- `current member closure criteria:` verification report, receipts, and issued decision families must reconcile to the same selected candidates and use-tier outcomes across package, API, and application layers.
- `current member verdict shape:` per-member pass/fail verdict with receipt refs and theorem refs.
- `current theorem-by-theorem closure reading:` issuance, provenance, sufficiency, and issuer-policy all require coherent receipt-backed verification results.
- `current theorem-to-replay grouping:` stage mapping and use-tier consequence replay cover all verification theorems.
- `minimum artifact/replay binding set:` verification report, verification receipts, proof artifact, and both replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` rendered into the generated proof appendix and exercised by workflow tests and app-route integration checks.
- `fail-closed conditions:` missing verification receipts or contradictory decisions fail closed.

### Selection-and-materialization

- `proofArtifactPath:` `.engi/selection-and-materialization-proof.json`
- `members:` `selected-asset-closure`, `lock-closure`, `materialized-source-closure`, `exclusion-closure`, `visibility-closure`
- `theoremIds:` `selection_and_materialization.selected_asset_closure`, `selection_and_materialization.lock_closure`, `selection_and_materialization.materialized_source_closure`, `selection_and_materialization.exclusion_closure`, `selection_and_materialization.visibility_closure`
- `replayStepIds:` `selection-and-materialization.selected-set`, `selection-and-materialization.visibility`
- `witnessArtifactPaths:` `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json`, `.engi/selection-consistency-proof.json`, `.engi/materialization-proof.json`, `.engi/materialization-exclusions.json`, `.engi/materialization-visibility-proof.json`, `.engi/selection-and-materialization-proof.json`
- `current member closure criteria:` selected assets, locked pack, materialized sources, exclusions, and visibility summaries must all agree and remain faithfully exposed through the application-native operator route.
- `current member verdict shape:` per-member pass/fail verdict with witness refs and selection consistency reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires both selected-set and visibility replay to agree with materialized outputs.
- `current theorem-to-replay grouping:` selection theorems group under `selected-set`; visibility and exclusion theorems group under `visibility`.
- `minimum artifact/replay binding set:` lock, selected-source manifest, materialization proof, exclusions, visibility proof, and replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` generated proof appendix, branch artifact inventory, and end-to-end Bitcode route expectations.
- `fail-closed conditions:` materialization without selected-set closure or unexplained exclusions fail closed.

### Authorization-and-sensitive-flow

- `proofArtifactPath:` `.engi/authorization-and-sensitive-flow-proof.json`
- `members:` `identity-closure`, `authorization-closure`, `sensitive-flow-closure`, `policy-release-closure`
- `theoremIds:` `authorization_and_sensitive_flow.identity_closure`, `authorization_and_sensitive_flow.authorization_closure`, `authorization_and_sensitive_flow.sensitive_flow_closure`, `authorization_and_sensitive_flow.policy_release_closure`
- `replayStepIds:` `authorization-and-sensitive-flow.identity-bindings`, `authorization-and-sensitive-flow.sensitive-flow`
- `witnessArtifactPaths:` `.engi/identity-bindings.json`, `.engi/authorization-decisions.json`, `.engi/sensitive-data-flow.json`, `.engi/identity-authorization-proof.json`, `.engi/sensitive-data-flow-proof.json`, `.engi/authorization-and-sensitive-flow-proof.json`
- `current member closure criteria:` identity, authorization, wallet, and sensitive-flow artifacts must reconcile to the same policy and addressing roots.
- `current member verdict shape:` per-member pass/fail verdict with policy refs and witness refs.
- `current theorem-by-theorem closure reading:` theorem closure requires identity, authorization, wallet verification, and sensitive-data flow to agree without leakage.
- `current theorem-to-replay grouping:` identity closure groups under `identity-bindings`; flow and release closure group under `sensitive-flow`.
- `minimum artifact/replay binding set:` identity bindings, authorization decisions, sensitive-data flow, and both replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` generated proof appendix and authorization, wallet, and disclosure tests.
- `fail-closed conditions:` authorization denial, stale policy roots, stale wallet verification, or sensitive-flow mismatch fail closed.

### Settlement-source-to-shares

- `proofArtifactPath:` `.engi/settlement-source-to-shares-proof.json`
- `members:` `contribution-totality`, `clipping-determinism`, `normalization-exactness`, `participation-totality`, `allocation-conservation`, `journal-completeness`
- `theoremIds:` `settlement_source_to_shares.contribution_totality`, `settlement_source_to_shares.normalization_exactness`, `settlement_source_to_shares.allocation_conservation`, `settlement_source_to_shares.journal_completeness`
- `replayStepIds:` `settlement-source-to-shares.contribution-allocation`, `settlement-source-to-shares.journal-theorem`
- `witnessArtifactPaths:` `.engi/source-to-shares.json`, `.engi/settlement-participation.json`, `.engi/accounting-precision-report.json`, `.engi/journal-diff.json`, `.engi/journal-completeness-proof.json`, `.engi/settlement-proof.json`, `.engi/settlement-source-to-shares-proof.json`
- `current member closure criteria:` contributions, participation, exact BTD allocation, journals, and settlement proof must reconcile.
- `current member verdict shape:` per-member pass/fail verdict with artifact refs, theorem refs, and conservation failure reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires contribution totality, normalization exactness, conservation, and journal completeness to agree.
- `current theorem-to-replay grouping:` allocation theorems group under `contribution-allocation`; journal theorems group under `journal-theorem`.
- `minimum artifact/replay binding set:` the full settlement artifact set and both replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` active settlement appendix renderings and core and workflow settlement tests.
- `fail-closed conditions:` settlement conservation drift or journal incompleteness fail closed.

### Disclosure-boundary

- `proofArtifactPath:` `.engi/disclosure-boundary-proof.json`
- `members:` `projection-policy-closure`, `bounded-public-closure`, `redaction-alignment`, `disclosure-verdict-alignment`
- `theoremIds:` `disclosure_boundary.projection_policy_closure`, `disclosure_boundary.redaction_alignment`, `disclosure_boundary.disclosure_verdict_alignment`
- `replayStepIds:` `disclosure-boundary.policy-bounded-public`, `disclosure-boundary.redaction-disclosure`
- `witnessArtifactPaths:` `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/redaction-proof.json`, `.engi/disclosure-proof.json`, `.engi/disclosure-boundary-proof.json`
- `current member closure criteria:` projection policy, bounded-public proof, redaction, and disclosure verdicts must remain coherent per principal across packages, API, app, and marketing-facing surfaces.
- `current member verdict shape:` per-member pass/fail verdict with witness refs and leakage reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires policy, redaction, and disclosure surfaces to agree without public overexposure.
- `current theorem-to-replay grouping:` policy closure groups under `policy-bounded-public`; redaction and disclosure theorems group under `redaction-disclosure`.
- `minimum artifact/replay binding set:` projection policy, bounded-public proof, redaction proof, disclosure proof, and both replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` disclosure appendix renderings and API, route, and projection tests.
- `fail-closed conditions:` public projection overexposure or redaction mismatch fail closed.

### Proof-contract

- `proofArtifactPath:` `.engi/proof-contract.json`
- `members:` `contract-materialization`, `evidence-chain`, `bundle-witness`, `family-closure`
- `theoremIds:` `proof_contract.contract_materialization`, `proof_contract.evidence_chain_closure`, `proof_contract.bundle_witness`, `proof_contract.family_closure`
- `replayStepIds:` `proof-contract.contract-materialization`, `proof-contract.evidence-chain`, `proof-contract.bundle-witness`
- `witnessArtifactPaths:` `.engi/proof-contract.json`, `.engi/system-proof-bundle.json`, `.engi/proof-witness-manifest.json`
- `current member closure criteria:` proof contract, bundle, and witness manifest must agree over all included proof families while owners move from demo-local to package and app surfaces.
- `current member verdict shape:` per-member pass/fail verdict with witness refs and missing-family reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires contract materialization, evidence chain integrity, and witness manifest coherence.
- `current theorem-to-replay grouping:` contract and evidence theorems group under `contract-materialization` and `evidence-chain`; witness closure groups under `bundle-witness`.
- `minimum artifact/replay binding set:` proof contract, system proof bundle, witness manifest, and three replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` generated proof appendix plus proof generator and family report checks.
- `fail-closed conditions:` missing witness artifacts, missing family coverage, bundle incoherence, or stale promoted status truth fail closed.

## generated canon

### Inherited V19 reproducible-canon artifacts

V26 inherits the V19 reproducible-canon baseline as active generated evidence requirements for reproducibility, replay, and mutation visibility.

### Inherited V20 operator-quality artifacts

V26 inherits the V20 operator-quality baseline as active generated evidence requirements for operator quality, accessibility, performance, and projection sanity.

### Exact generated-artifact inventory matrix

Current V26 generated artifact inventories must cover:
- active inherited reproducible and operator-quality reports,
- `.engi/v26-spec-family-report.json`,
- `.engi/v26-canonical-input-report.json`,
- any future `.engi/v26-canon-posture-drift-report.json` if V26 reopens posture-drift generation,
- and `ENGI_SPEC_V26_PROVEN.md`.

### V26 specifying generated artifacts

V26 specifying artifacts are:
- `.engi/v26-spec-family-report.json`
- `.engi/v26-canonical-input-report.json`
- `ENGI_SPEC_V26_PROVEN.md`

### Shared generated-artifact fields

Shared generated-artifact fields must include version, proof-source commit, generation timestamp, target version, active pointer, structural verdict, and fail-closed reasons when not clean.

### Artifact-specific generated payload fields

Artifact-specific generated payload fields must include the structural report payload, canonical input report payload, and promoted appendix payload with exact family and run inventories.

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
- generated artifacts are used to compensate for missing main-spec meaning,
- or V26 draft claims exceed the generated evidence that actually exists.

## validation canon

The V26 validation canon includes:
- host-agnostic local pre-commit checks for spec-sensitive changes,
- strict versioned spec conformance for `spec: V26` commit titles,
- core, API, workflow, browser, and route integration tests,
- package extraction and ownership regression tests,
- auth and wallet validation,
- environment-mode matrix tests for production, staging, development, and mock,
- containerized CI or CD runs of strict spec conformance and full runtime tests,
- and promotion-time regeneration plus cleanliness checks.

Current validating commands and parity basis include:
- `node scripts/check-engi-canonical-inputs.mjs`
- `node scripts/check-engi-spec-family.mjs --version V26`
- `node scripts/run-engi-spec-quality.mjs --mode basic`
- `node --test packages/bitcode/test/core.test.js`
- `node --test packages/bitcode/test/api.test.js`
- `node --test packages/bitcode/test/workflow.integration.test.js`
- `node --test packages/bitcode/test/e2e.test.js`
- `node --test packages/bitcode/test/v21-specifying.test.js packages/bitcode/test/v22-canon-drift.test.js`

## promotion canon

V26 promotion requires all of the following:
- `ENGI_SPEC.txt` advancing deliberately and only when V26 is the chosen active canon,
- `ENGI_SPEC_V26.md`, `ENGI_SPEC_V26_DELTA.md`, `ENGI_SPEC_V26_PARITY_MATRIX.md`, and `ENGI_SPEC_V26_PROVEN.md` agreeing,
- `.engi/v26-spec-family-report.json` and `.engi/v26-canonical-input-report.json` existing and matching the promoted V26 structure,
- Bitcode application-native routing existing as source truth rather than as draft-target-only prose,
- package extraction and existing-package convergence being reflected in source sufficiently to satisfy the parity ledger,
- and no fail-closed condition remaining open for any interface V26 claims as hardened.

## appendices and canonical supporting material

The appendices in this main `SPEC` are part of canonical system meaning and are not optional supplements.

## Appendix A. Canonical type and surface catalog

The canonical type and surface catalog includes:
- run identity, need identity, deposit identity, bundle identity, projection principal, and settlement identity,
- BTD-denominated share and micro-unit carriers,
- public and private commitment-scope carriers,
- application-route and operator-surface carriers,
- bitcoin mainchain execution carriers,
- sidechain execution carriers,
- repeated-read payment carriers,
- compute-container execution carriers,
- storage-container publication and retrieval carriers,
- GitHub App, session, fetch, and mutation carriers,
- wallet and auth binding carriers,
- telemetry-policy and telemetry-summary carriers,
- proof-family objects, theorem verdicts, replay catalogs, and witness inventories.

## Appendix B. Proof family closure catalog

The proof family closure catalog in V26 contains:
- Inference-synthesis
- Prompt-completeness
- Static-code-analysis
- Verification-decisions
- Selection-and-materialization
- Authorization-and-sensitive-flow
- Settlement-source-to-shares
- Disclosure-boundary
- Proof-contract

Each family closes only when its witnessArtifactPaths, theoremIds, replayStepIds, and artifact bindings all reconcile.

## Appendix C. Generated artifact contract catalog

The generated artifact contract catalog covers:
- inherited reproducible-canon and operator-quality reports,
- `.engi/v26-spec-family-report.json`,
- `.engi/v26-canonical-input-report.json`,
- and `ENGI_SPEC_V26_PROVEN.md`.

These generated artifact inventories must include generated artifact inventories and scenario and run coverage matrices and must fail closed when regeneration is stale.

## Appendix D. Validation and checking gate catalog

The validation and checking gate catalog includes:
- local pre-commit checks for host-agnostic basics,
- strict version and commit-title spec conformance,
- runtime, API, workflow, browser, and application-route tests,
- package extraction and auth or wallet hardening checks,
- containerized CI or CD full suites,
- promotion-time regeneration checks,
- and clean-environment promotion validation.

## Appendix E. Current canonical source map

The current canonical source map includes:
- `packages/bitcode/src/canon-posture.js`
- `packages/bitcode/src/engi-demo.js`
- `packages/bitcode/src/canonical/run-artifacts.js`
- `packages/bitcode/src/canonical/proof-materialization.js`
- `packages/bitcode/src/canonical/settlement.js`
- `packages/bitcode/src/canonical/projections.js`
- `packages/bitcode/src/canonical/prompting.js`
- `packages/bitcode/src/canonical/evaluation-materialization.js`
- `packages/bitcode/src/canonical/need-measurement.js`
- `packages/bitcode/src/canonical/v23-bitcoin.js`
- `packages/bitcode/src/canonical/v24-external-realization.js`
- `packages/bitcode/src/demo-shell-state.js`
- `packages/bitcode/public/app.js`
- `packages/bitcode/public/styles.css`
- `packages/bitcode/server.js`
- `packages/bitcode/test/*`
- `uapi/app/application/page.tsx`
- `uapi/app/application/ApplicationPageClient.tsx`
- `uapi/app/application/first-gate-styles/route.ts`
- `uapi/app/api/state/route.ts`
- `uapi/app/api/deposits/route.ts`
- `uapi/app/api/make-bitcode-branch/route.ts`
- `uapi/app/api/make-engi-branch/route.ts`
- `uapi/app/api/reset/route.ts`
- `uapi/app/api/bitcoin-demonstration-service/route.ts`
- `uapi/app/api/orbitals/data/route.ts`
- `uapi/app/api/v24/external-realization/route.ts`
- `uapi/app/api/v24/executors/[interfaceId]/route.ts`
- `uapi/lib/bitcode-app-context.ts`
- `uapi/app/(root)/components/MarketingLandingPage.tsx`
- `uapi/components/base/README.md`
- `packages/github`
- `packages/auth`
- `packages/api`
- `scripts/check-engi-canonical-inputs.mjs`
- `scripts/check-engi-spec-family.mjs`

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
- repeated-read payment execution
- compute-container execution
- storage-container execution
- github live interface
- auth and wallet connection
- application-route integration
- marketing and navigation routing
- package extraction and repository ownership

Every one of those subsystems must be derivable from the main `SPEC`, its appendices, and the active generated appendix after promotion.

## Appendix G. Canonical file-family and promotion contract catalog

The canonical file-family and promotion contract catalog includes:
- `ENGI_SPEC.txt`
- `ENGI_SPEC_V26.md`
- `ENGI_SPEC_V26_DELTA.md`
- `ENGI_SPEC_V26_PARITY_MATRIX.md`
- `ENGI_SPEC_V26_NOTES.md`
- `ENGI_SPEC_V26_PROVEN.md`
- `.engi/v26-spec-family-report.json`
- `.engi/v26-canonical-input-report.json`

Promotion requires the pointer, posture, generated reports, `_PROVEN_` appendix, and source parity state to agree.

## Appendix H. Operator surface and quality contract catalog

The operator surface and quality contract catalog includes:
- full-page Bitcode application routing,
- application-facing component ownership under `uapi/components/base/*`,
- operator explanation surfaces for supply, need, fit, verification, proof, and settlement,
- projection summaries and proof inspection views,
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

V26 also crosses those scenarios over:
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
- `application-route ownership drift`
- `wallet verification drift`
- `package extraction parity drift`
- `standalone-demo posture regression`

Every named failure class is blocking for promotion when it applies to a claimed realized interface.

## Appendix K. Source-bearing deliverable and artifact contract catalog

The source-bearing deliverable and artifact contract catalog includes:
- `.engi/asset-pack.lock.json`
- `.engi/selected-source-material.json`
- `.engi/verification-report.json`
- `.engi/source-to-shares.json`
- `.engi/projection-policy.json`
- `.engi/system-proof-bundle.json`
- `.engi/proof-contract.json`
- `.engi/proof-witness-manifest.json`
- `.engi/inference-synthesis-proof.json`
- `.engi/prompt-completeness-proof.json`
- `.engi/static-measurement-proof.json`
- `.engi/verification-decisions-proof.json`
- `.engi/selection-and-materialization-proof.json`
- `.engi/authorization-and-sensitive-flow-proof.json`
- `.engi/settlement-source-to-shares-proof.json`
- `.engi/disclosure-boundary-proof.json`
- `.engi/v26-spec-family-report.json`
- `.engi/v26-canonical-input-report.json`
- `ENGI_SPEC_V26_PROVEN.md`

## accepted boundaries and reopen conditions

V26 accepts the following boundaries during the draft period:
- V25 remains active canonical truth until promotion.
- The useful Bitcode operator UX chain is preserved while the demonstration UI owner is replaced.
- Package extraction may proceed incrementally so long as parity truth keeps the gap explicit.
- Existing packages should be reused when they already fit the responsibility.
- No current source-bearing claim relies on `_legacy/`.

The following reopen conditions apply:
- if the chosen application route class proves wrong in source,
- if the extraction matrix requires materially different package topology,
- if auth, wallet, GitHub, or external hardening requirements force a broader or narrower version center,
- if a compatibility-carrier migration becomes central enough to require its own explicit restatement,
- or if generated evidence and source truth diverge during promotion work.

## completion condition

V26 is complete only when:
1. V25-active discipline is preserved until deliberate promotion.
2. The four V26 workstreams are explicitly present in the promoted canon and reflected in source.
3. The Bitcode operator experience is a first-class application page rather than an embedded or standalone-primary demo.
4. Demonstration UX is preserved while demonstration UI is replaced by application-facing components.
5. Bitcode system ownership is materially re-homed into packages and app/API owners rather than remaining concentrated in `engi-demo/`.
6. GitHub, auth, wallet, bitcoin, sidechain, repeated-read, compute, storage, telemetry, and reconciliation hardening are explicit, fail-closed, and test-backed.
7. `.engi/v26-spec-family-report.json`, `.engi/v26-canonical-input-report.json`, and `ENGI_SPEC_V26_PROVEN.md` exist and agree with the promoted V26 main spec.
8. The promoted V26 main spec stands alone for re-implementation, audit, operator comprehension, and promotion without semantic dependence on prior versions.
