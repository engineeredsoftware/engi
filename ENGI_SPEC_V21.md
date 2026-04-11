# ENGI Spec V21

## Status

- Scope: V21 draft specification for specifying-canon hardening after V20 operator-quality canon
- Companion notes file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21_NOTES.md`
- Companion delta file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21_DELTA.md`
- Companion parity ledger: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21_PARITY_MATRIX.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible reports and `.engi/v20-*` operator-quality reports; V21 generation now defines `.engi/v21-spec-family-report.json` and `.engi/v21-canonical-input-report.json` for draft-time specifying closure and later promotion
- Current canonical/latest target: `V20`
- Last fully realized canonical target preserved in source: `V20`
- Source parity state: V21 source-side specifying implementation now covers spec-family checking, canonical-input validation, promotion-time hand-authored status preparation, V21 appendix/specifying-artifact generation, and V21 promotion dry-run sequencing; actual pointer advancement remains unexecuted
- V21 state: full-spec drafting and source-side specifying implementation are in progress; `ENGI_SPECIFYING.md`, the V21 file family, the structural/density checker, canonical-input validation, promotion-time hand-authored status preparation, V21 appendix generation plus `.engi/v21-*` specifying artifacts, and V21 promotion support with file-family-derived commit-body generation now exist, while canonical promotion closure remains pending
- Current realization basis for this pass: root system-spec family plus generated V20 proof/quality artifacts and current `engi-demo` promotion surfaces

## Drafting and acceptance state

V21 is a specifying-canon pass.
It does not begin by changing ENGI runtime semantics, proof-family semantics, or operator-quality semantics.

The V21 job is to make current canon more dependably writable, readable, promotable, and implementable by tightening how ENGI itself is specified.

This draft does not yet claim to be the final promoted V21 full-canon restatement.
That later promotion remains a V21 requirement.
The current pass treats the V21 `SPEC` itself as the full-current-canon drafting target rather than as a narrow version note.
Source-side implementation begins in this same pass so the specifying rules stop being prose-only expectations.

The word `draft` in this file family means specification drafting and any later source implementation remain co-located until the V21 canonical promotion is accepted.
Because V21 changes specifying requirements, implementation may reveal stronger file-family, promotion, generator, or parity rules.
Those discoveries must update this spec family before V21 can be treated as closed.

Current V21 drafting facts:
- `ENGI_SPECIFYING.md` now exists as the one complete specifying standard.
- `ENGI_SPEC_TEMPLATEGUIDE.md` is now only a compatibility pointer.
- V20 generated proof and quality artifacts are available as concrete canonical inputs for V21 drafting.
- V20 regeneration from proof-source commit `2f3fb17983223d6951c257be9bfa663419bdfd7e` produced a byte-identical `_PROVEN_` appendix during the V21 comparison pass.
- The current V20 hand-authored spec family still contains draft-era status language even though `ENGI_SPEC.txt` points to `V20`, and V21 treats that as the motivating example for a stale-status promotion gate.

## Version executive summary

V16 remains the last clearly full-canon ENGI spec in structural terms.
It is large, dense, and derivable enough that a reader can recover major proof-family semantics from that file alone.

V17 through V20 then closed important canonical surfaces:
- V17 closed demo-driven workflow and operator behavior,
- V18 closed generated proof exhaustiveness,
- V19 closed reproducible canonical promotion and generated artifact replay hardening,
- and V20 closed operator-quality canon through generated quality reports and generated appendix sections.

Those versions improved ENGI materially.
They also exposed a specifying problem:
- current canon is now distributed across the main spec, the parity matrix, generated `_PROVEN_`, and generated `.engi/vN-*` artifacts,
- but the hand-authored `SPEC` files since V16 have mostly behaved like additive version deltas rather than full current canon,
- and canonical promotion can therefore leave behind stale status language or implicit dependencies on earlier versions.

The central V21 question is:
- can ENGI specify itself so completely and precisely that the next canonical `SPEC` is a full current canon, the supporting file family has disciplined roles, generated canon is treated as a first-class input, and canonical promotion cannot silently preserve stale status truth?

## Canonical ENGI executive summary

ENGI remains a proof-bearing operating system for engineering assetizing.

The canonical chain is:
1. deposited assets enter through typed depositing surfaces,
2. a need is measured and expressed as prompt/inference-owned requirements,
3. assets are recalled, evaluated, verified, selected, and materialized,
4. branch artifacts, proof artifacts, and witness artifacts are emitted,
5. identity, authorization, and projection policy constrain what each principal can see,
6. source-to-shares settlement records exact contribution and accounting consequences,
7. generated matrices, generated reports, witness manifests, replay catalogs, and generated proof appendices make the result auditable,
8. and the canonical spec family must make all of that derivable without requiring a reader to reconstruct missing system truth from earlier specs or source alone.

V21 does not change that product identity.
It changes the standard by which ENGI's canonical documentation is considered complete.

## V21 inheritance rule

V21 inherits V20 as the closed runtime/proof/operator-quality base.

That means:
- `ENGI_SPEC.txt` remains `V20` until V21 source-side specifying checks and canonical promotion support are complete,
- `ENGI_SPEC_V20_PROVEN.md` remains the active generated proof appendix,
- the V20 `.engi/v20-*` quality artifacts remain active canonical generated artifacts,
- V20's inherited V19 proof closure remains accepted,
- and V21 should not reopen proof-family semantics, matrix counts, quality budgets, or projection policy unless specifying hardening reveals a concrete canonical contradiction.

V21 also treats V16 specially:
- V16 is not the active semantic authority,
- but it remains the strongest recent example of a full-canon structural spec pattern,
- and V21 uses that structural strength as a comparison baseline while replacing its missing generated-canon and promotion-specific requirements.

## V21 motivating comparison

V21 is driven by three concrete comparison findings.

### 1. V16 structural strength

V16's strongest contribution is section discipline.
Its proof-family sections repeatedly answer:
- what the family is,
- what it proves,
- what structures it owns,
- what members and theorems exist,
- what artifacts and replay surfaces bind the proof,
- and what closure means.

That pattern is still the best recent derivability model for deeply canonical ENGI material.

### 2. V20 generated-canon strength

V20's strongest contribution is generated canonical shape.

The V20 comparison pass confirms:
- V20 `_PROVEN_` regenerates identically from the canonical proof-source commit,
- V20 generated quality artifacts share strong common fields such as `reportId`, `proofSourceCommit`, `generatedAt`, `blockingFailureCount`, `acceptedExclusionCount`, and `replayContext`,
- and V20 generated artifacts also carry artifact-specific contract fields such as `flowCount`, `checkCount`, `operationCount`, `cellCount`, and `qualityReportCount`.

Those artifacts are not secondary convenience outputs.
They are now canonical inputs to future version drafting.

### 3. V20 hand-authored status weakness

The V20 hand-authored file family still says `V19` is current canon and that V20 promotion is pending, even though:
- `ENGI_SPEC.txt` points to `V20`,
- `ENGI_SPEC_V20_PROVEN.md` exists,
- and the `.engi/v20-*` canonical quality artifacts exist.

V21 therefore treats stale promoted status language as a real canonical defect, not a cosmetic wording issue.

## V21 accepted first-gate decisions

V21 accepts the following specification decisions:

1. `ENGI_SPECIFYING.md` is the one complete specifying standard.
2. `ENGI_SPEC_TEMPLATEGUIDE.md` remains only as a compatibility pointer.
3. V21+ required hand-authored canonical files are `ENGI_SPEC_VN.md`, `ENGI_SPEC_VN_DELTA.md`, and `ENGI_SPEC_VN_PARITY_MATRIX.md`.
4. `ENGI_SPEC_VN_NOTES.md` is optional and explicitly non-canonical.
5. A promoted `SPEC` must be full current canon rather than an additive release note.
6. Current canonical inputs for drafting a new version include the current `SPEC`, current `_PROVEN_`, current parity matrix, and current generated `.engi/vN-*` artifacts.
7. Generated artifact families must be specified both through shared common fields and artifact-specific contract fields.
8. Canonical promotion must include a stale-status gate so promoted specs cannot preserve pending-pointer or pending-promotion language.
9. Canonical promotion must include a file-family gate so required hand-authored and generated canon files are present before a new pointer is accepted.
10. Canonical commit message bodies must be derivable from the version's canonical file family and generated artifacts.
11. Full-canon totality requires named appendix-grade inventories and derivability matrices rather than only high-level whole-system section headings.

## V21 source-of-truth hierarchy

V21 makes the source-of-truth hierarchy explicit because current ENGI canon is not contained in a single markdown file.

The current hierarchy is:
1. `ENGI_SPEC.txt`
2. the pointed `ENGI_SPEC_VN.md`
3. `ENGI_SPEC_VN_DELTA.md`
4. `ENGI_SPEC_VN_PARITY_MATRIX.md`
5. generated `ENGI_SPEC_VN_PROVEN.md`
6. generated `.engi/vN-*` artifacts
7. source implementation and tests referenced by the active file family
8. optional non-canonical `NOTES`
9. historical prior specs

The important V21 clarification is that `_PROVEN_` and `.engi/vN-*` are not merely outputs of canon.
They are also active canonical supporting inputs for future drafting once a version has been promoted.

## V21 full-system, re-implementation, and audit rule

V21 treats the incompleteness you called out as a real specifying failure.

The rule is:
- the main `SPEC` must itself describe the whole ENGI system,
- the main `SPEC` must itself be sufficient for re-implementation planning,
- the main `SPEC` must itself be sufficient for whole-system audit,
- and the companion `DELTA`, `PARITY_MATRIX`, `_PROVEN_`, and generated `.engi/vN-*` artifacts must sharpen or evidence that canon rather than carrying omitted system meaning on its behalf.

For V21, that means this file must directly cover:
- current ENGI identity,
- whole operator chain,
- architectural layers,
- canonical domain objects and emitted artifacts,
- subsystem contracts,
- proof-family and witness obligations,
- generated artifact families,
- validation gates,
- promotion rules,
- accepted boundaries,
- and source-side implementation expectations for the specifying discipline itself.

## V21 totality and precision enforcement rule

The V21 failure you called out is not only that recent specs were shorter than V16.
It is that they could still look structurally acceptable while omitting too much system-bearing inventory.

V21 therefore treats totality and precision as named coverage obligations.
For V21+, a promoted `SPEC` must expose omission by carrying explicit inventories and derivability matrices rather than relying on broad section headings.

At minimum, the promoted V21-style `SPEC` must carry:
- a canonical type and surface catalog,
- a subsystem totality and derivability matrix,
- a proof family closure catalog,
- a generated artifact contract catalog,
- a validation and checking gate catalog,
- a current canonical source map,
- a scenario/workflow/cross-product contract catalog,
- a fail-closed contract and error posture matrix,
- a source-bearing deliverable and artifact contract catalog,
- and an accepted-boundary ledger or equivalent section.

Those carriers are canonical, not editorial conveniences.
If a subsystem, proof family, artifact family, gate, or source-bearing implementation surface exists in current canon but has no inventory row or appendix entry in the current `SPEC`, the current `SPEC` is incomplete.

## V21 system goals, non-goals, and design principles

### Goals

V21 goals are:
1. make the main `SPEC` a full current-canon document again,
2. make `SPEC_DELTA` and `SPEC_PARITY_MATRIX` disciplined companions rather than shadow specs,
3. treat generated `_PROVEN_` and generated `.engi/vN-*` artifacts as first-class canonical inputs,
4. add source-side checks that can fail on structurally incomplete or stale hand-authored canon,
5. and preserve current runtime/proof/operator semantics while hardening the specification system around them.

### Non-goals

V21 does not, in this first implementation pass:
- redesign ENGI runtime semantics,
- reopen V20 operator-quality budgets,
- reopen V19 deterministic replay or mutation scope,
- reopen V18 matrix arithmetic,
- retroactively rename every historical spec artifact,
- or treat optional `NOTES` as canonical.

### Design principles

The governing design principles are:
- `SPEC` carries whole-system meaning; companions do not substitute for it.
- Generated canon is evidence-bearing truth, not a convenience export.
- Promotion must fail closed on structurally incomplete or stale hand-authored canon.
- Proof, projection, and settlement remain first-class system semantics rather than appendix-only concerns.
- Accepted boundaries are explicit and reopenable, never silent.

## V21 system architecture and layer boundaries

The current ENGI implementation is layered as follows.

1. Core deterministic primitives
   Current implementation basis: `engi-demo/src/engi-core.js`
   Responsibilities: canonical json, hashing, tokenization, ranking primitives, normalized measurement math, bundle issuance, and allocation helpers.

2. Canonical model and contract builders
   Current implementation basis: `engi-demo/src/canonical/*.js`, `engi-demo/src/canonical/type-contracts.ts`
   Responsibilities: types, surfaces, need measurement, prompt contracts, inference proofs, proof annotations, projections, settlement runtimes, generated proof/report builders, and V18/V19/V20 canonical report packages.

3. Runtime orchestration
   Current implementation basis: `engi-demo/src/engi-demo.js`
   Responsibilities: asset creation, initial state, need measurement, recall/evaluation, asset-pack assembly, branch runs, settlement, public state shaping, and proof-bearing workflow composition.

4. Operator projection and shell shaping
   Current implementation basis: `engi-demo/src/demo-shell-state.js`
   Responsibilities: projected latest-run views, public summaries, profile compositions, public artifact inventory entries, and principal-bounded operator surfaces.

5. Realization/API/browser layer
   Current implementation basis: `engi-demo/server.js`, `engi-demo/test/api.test.js`, `engi-demo/test/e2e.test.js`
   Responsibilities: shell delivery, API state exposure, browser workflow execution, and operator-quality validation.

6. Canonical generation and promotion layer
   Current implementation basis: `scripts/generate-engi-proven.mjs`, `scripts/check-engi-spec-family.mjs`, `scripts/check-engi-canonical-inputs.mjs`, `scripts/prepare-engi-spec-family-promotion.mjs`, `scripts/promote-engi-canon.mjs`
   Responsibilities: generated `_PROVEN_`, generated `.engi/vN-*` artifact emission/checking, spec-family enforcement, canonical-input validation, promotion-time status rewriting, promotion sequencing, and version-pointer mutation.

V21's specifying work applies to every layer above.
The main `SPEC` must describe the system across those layers rather than letting the current demo realization become the only readable architecture.

## V21 canonical domain model

The current full-system domain model centers the following canonical objects and emitted artifacts.

| Object or artifact | Canonical role | Current implementation basis | Audit significance |
| --- | --- | --- | --- |
| `DepositingSurface` | records deposit session, repo supply root, selection roots, auth/addressing/signing roots, and deposit intent | `engi-demo/src/canonical/types.js`, `engi-demo/src/canonical/surfaces.js` | begins the proof and contribution chain |
| `NeedingSurface` | records need identity, parser kind, task summary, failure modes, artifact targets, and closure criteria | `engi-demo/src/canonical/types.js`, `engi-demo/src/canonical/surfaces.js`, `engi-demo/src/canonical/need-measurement.js` | defines the measured demand the system is trying to satisfy |
| `DepositingToNeedingSurface` | binds deposit supply to need fit, decisive kinds, overlap kinds, normalization pressure, and branch/proof/settlement intent | `engi-demo/src/canonical/types.js`, `engi-demo/src/canonical/surfaces.js` | makes fit a first-class auditable relation |
| `NeedMeasurementRuntime` | materializes prompt-owned, inferred, and static need measurements | `engi-demo/src/canonical/need-measurement.js`, `engi-demo/src/engi-demo.js` | proves how the system moved from scenario to measured need |
| `PromptContract` and prompt surface artifacts | bind prompt placeholders, ownership, parsability, completeness, and downstream use | `engi-demo/src/canonical/prompting.js` | closes prompt-completeness obligations |
| `EvaluatorSurface`, `InferenceProof`, and parsed envelopes | materialize inferred-field evidence, evaluator identity, and parseable completion envelopes | `engi-demo/src/canonical/prompting.js` | closes inference-synthesis obligations |
| evaluated candidates and verification decisions | distinguish recall/ranking from issuance, provenance, policy, sufficiency, and use-tier verdicts | `engi-demo/src/engi-demo.js`, `engi-demo/src/canonical/evaluation-materialization.js` | proves why a candidate can or cannot survive to use |
| `AssetPack`, lock, branch artifacts, and selection outputs | record selected assets, context assets, materialized sources, exclusions, and branch-mode consequences | `engi-demo/src/engi-demo.js`, `engi-demo/src/canonical/evaluation-materialization.js`, `engi-demo/src/canonical/run-artifacts.js` | carries the selected result into execution and later audit |
| `IdentityBinding`, authorization decisions, projection policy, bounded public proof, redaction proof, and disclosure proof | define who may see what and which artifacts remain visible across principals | `engi-demo/src/canonical/surfaces.js`, `engi-demo/src/canonical/projections.js`, `engi-demo/src/demo-shell-state.js` | closes disclosure-boundary and sensitive-flow obligations |
| settlement runtime, settlement preview, source-to-shares, journal, and contribution objects | compute participation, clipping, normalization, credited vs zero-credit assets, and exact accounting | `engi-demo/src/canonical/settlement.js`, `engi-demo/src/settlement-structs.js`, `engi-demo/src/engi-demo.js` | proves conservation and exact accounting consequences |
| proof bundle, proof family verdicts, theorem verdicts, witness manifest, and replay bindings | package the proof-carrying state of a run | `engi-demo/src/canonical/proof-annotations.js`, `engi-demo/src/canonical/proof-materialization.js`, `engi-demo/src/proof-log.js` | makes a run replayable and auditable beyond prose |
| generated `_PROVEN_` and canonical `.engi/vN-*` artifacts | summarize and materialize canonical proof, replay, mutation, quality, and ledger results | `scripts/generate-engi-proven.mjs`, `engi-demo/src/canonical/proven-generator.js`, `engi-demo/src/canonical/v19-canon.js`, `engi-demo/src/canonical/v20-quality.js` | preserves canonical evidence across commits and promotions |

## V21 current-canon input set

V21 treats the following as the minimum current-canon drafting input set.

### Active hand-authored canon

- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_SYSTEM_PARITY_MATRIX.md`

### Active generated canon

- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_PROVEN.md`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-operator-acceptance-transcript.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-visual-regression-report.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-accessibility-report.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-performance-budget-report.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-projection-quality-smoke-matrix.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-quality-summary.json`

### Structural comparison input

- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V16.md`

V21's rule is that future drafts must begin from a complete current-canon input set like this rather than from the main spec file alone.

## V21 operating axes

The current canonical axes are:

### Scenario axis

The active canonical scenario ids are:
- `auth-issuer-rollback`
- `rust-validator-proof-gap`
- `config-policy-precedence-incident`
- `unsafe-patch-review-recovery`
- `infra-deployment-mismatch`
- `privacy-boundary-proof-export`
- `polyglot-gateway-benchmark-remediation`
- `auth-many-asset-normalization`

### Branch-mode axis

The active canonical branch modes are:
- `patch`
- `context`

### Projection axis

The active canonical projection principals are:
- `public`
- `reviewer`
- `buyer`
- `internal`

### Canonical proof-run baseline

The current canonical generated appendix records:
- `runCount = 16`
- `familyCount = 9`
- `memberCount = 45`
- `theoremCount = 57`
- `artifactDigestCount = 704`
- `fullyProven = true`

These are current canonical audit facts and should be treated as depended-on current-state summary values until a later canonical version changes them explicitly.

## V21 whole ENGI operator chain

The full current ENGI chain is:
1. assets are deposited through typed candidate-asset surfaces,
2. a need is measured and materialized into prompt- and inference-owned fields,
3. candidate assets are recalled, ranked, and verified,
4. selected assets and context-only assets are separated by use and visibility rights,
5. materialization emits branch artifacts, manifests, locks, exclusions, and visibility proofs,
6. identity bindings and authorization decisions determine what each principal may see or use,
7. projection and disclosure policy determine which proof and source surfaces remain visible,
8. source-to-shares settlement records exact contribution, participation, normalization, journal, and accounting effects,
9. proof bundles, witness manifests, replay catalogs, and generated reports make the run auditable,
10. the operator-facing interface presents the result for buyer, reviewer, internal, and bounded-public review,
11. and canonical promotion turns those runtime and generated surfaces into the depended-on system canon for the next version.

No step in that chain may be treated as implicit or "obvious from source."
If a step matters for implementation or audit, the current spec family must name it.

## V21 canonical subsystem surfaces

V21 does not redefine subsystem semantics.
It restates the current subsystem surfaces that future full-canon specs must continue to cover directly.

### Depositing and asset supply

Current canon requires:
- candidate assets can come from repo-backed or raw deposited surfaces,
- deposited assets preserve typed metadata, issuer and authorization context, and content-unit identity,
- repo-backed assets remain distinct from raw-only assets,
- depositing is the beginning of the contribution and proof chain rather than a pre-canonical setup step,
- and downstream selection, materialization, settlement, and proof artifacts must stay traceable back to deposited asset identity.

Current canonical objects and emitted artifacts:
- `DepositingSurface`, `RepoSupplyStateShape`, `RepoArtifactInventoryEntryShape`, `ArtifactSelectionSurface`, `CandidateAssetShape`, branch-candidate inventories, and selected-source traceability surfaces.

Current invariants and fail-closed conditions:
- raw and repo-backed intake must remain distinguishable,
- selected/materialized assets must stay traceable back to deposited asset ids and content-unit identity,
- and asset intake must fail closed if issuer, authorization, addressing, or signing roots required by the selected surface are absent.

Current implementation reading remains concentrated in:
- `engi-demo/src/engi-demo.js`
- `engi-demo/test/core.test.js`
- `engi-demo/test/api.test.js`
- `engi-demo/test/e2e.test.js`

### Needing and prompt/inference ownership

Current canon requires:
- need measurement creates prompt-owned and inference-owned fields with explicit ownership,
- prompt surfaces, contracts, parsed envelopes, and inference moment contracts remain proof-bearing,
- deterministic/static measurements remain distinguishable from prompt or evaluator outputs,
- downstream consumers of prompt and inference outputs remain declared and auditable,
- and malformed or insufficient prompt/evaluator outputs fail closed rather than silently becoming canon.

Current canonical objects and emitted artifacts:
- `NeedingSurface`, `NeedShape`, prompt surfaces, prompt contracts, parsed completion envelopes, inference moment contracts, inference proofs, and need-measurement runtime state.

Current invariants and fail-closed conditions:
- every prompt-owned or inferred field must retain explicit ownership,
- prompt and evaluator outputs must remain separable from deterministic/static measurements,
- and malformed, unresolved, or insufficient prompt/evaluator outputs must not pass into need canon without family failure.

Current proof closure lives through:
- `prompt-completeness`
- `inference-synthesis`

### Fit, recall, ranking, and verification

Current canon requires:
- depositing-to-needing fit is first-class and visible,
- recalled candidates preserve ranking and verification separation,
- verification decisions remain stage-distinct and use-tier-significant,
- issuer-policy, provenance, sufficiency, and use-tier consequences remain explicit,
- and ranking strength does not silently override verification or policy constraints.

Current canonical objects and emitted artifacts:
- `DepositingToNeedingSurface`, recall summaries, ranking/fusion surfaces, verification receipts, verification report, evaluated candidate summaries, and use-tier assignments.

Current invariants and fail-closed conditions:
- fit must stay visible as a distinct relation,
- ranking and verification must remain stage-distinct,
- and no candidate may become patch- or settlement-eligible solely because ranking was high while verification or issuer policy remained insufficient.

Current proof closure lives through:
- `static-code-analysis`
- `verification-decisions`

### Selection and materialization

Current canon requires:
- selected assets, locked units, materialized sources, exclusions, and visibility rules remain separable,
- context-only assets remain distinct from patch-mode admitted assets,
- branch artifacts preserve selected-source material and asset-pack lock bindings,
- materialization and visibility proofs remain replayable,
- and operator-facing surfaces distinguish selection, exclusion, and visibility rather than compressing them into one summary.

Current canonical objects and emitted artifacts:
- `AssetPackShape`, `AssetPackLockShape`, `SelectedCandidateShape`, `SelectedSourceMaterialManifest`, materialization exclusions, materialization visibility proof, selection-consistency proof, and branch artifacts.

Current invariants and fail-closed conditions:
- selected assets, lock entries, and materialized source units must stay mutually closed,
- exclusions must stay explicit and reasoned,
- and visibility posture must fail closed if branch artifacts, materialized source, or proof surfaces disagree about what lower-privilege principals may observe.

Current proof closure lives through:
- `selection-and-materialization`

### Identity, authorization, and sensitive flow

Current canon requires:
- principals remain explicit,
- authorization decisions remain materialized,
- confidentiality classes remain explicit,
- retention and disclosure rules remain tied to those classes,
- and no unauthorized public flow is normalized by proof, UI, or quality checks.

Current canonical objects and emitted artifacts:
- `IdentityBindingShape`, `AuthorizationDecisionShape`, identity bindings, authorization decisions, sensitive-data flow records, identity-authorization proof, and sensitive-data-flow proof.

Current invariants and fail-closed conditions:
- principal identity and authority must remain explicit rather than inferred from projection outcome,
- confidentiality classes must stay tied to retention/disclosure rules,
- and any unauthorized public-flow evidence must fail the family rather than being treated as a lower-severity quality issue.

Current proof closure lives through:
- `authorization-and-sensitive-flow`

### Disclosure and projection

Current canon requires:
- projection policy remains explicit,
- bounded-public proof remains metadata-only,
- reviewer projection remains proof-capable without raw source material,
- buyer projection remains richer than public but still bounded,
- internal projection remains the only surface allowed to expose raw source material and full authorization detail,
- and operator or quality checks must not rely on forbidden private surfaces for lower-privilege principals.

Current canonical objects and emitted artifacts:
- `ProjectionPolicyShape`, `ProjectionArtifactRule`, bounded-public proof, redaction proof, disclosure proof, public artifact inventory, and principal-bounded operator projections.

Current invariants and fail-closed conditions:
- bounded-public proof must remain metadata-only,
- reviewer and buyer views must remain richer than public while still bounded away from raw source,
- and quality or operator surfaces must fail closed if they require internal-only artifacts to validate lower-privilege projections.

Current proof closure lives through:
- `disclosure-boundary`

### Settlement and exact accounting

Current canon requires:
- source-to-shares contribution, clipping, normalization, participation, allocation, journal, and settlement proof all remain distinct but coherent,
- selected assets, participating assets, and positively credited assets may differ and must remain explicit,
- zero-credit participation must not disappear from previews or accounting reasoning,
- debit and credit conservation must hold exactly,
- and journal completeness must remain provable from emitted artifacts rather than only from internal computation.

Current canonical objects and emitted artifacts:
- `SettlementPreviewShape`, `SettlementParticipationStruct`, source-to-shares artifact, settlement participation artifact, accounting-precision report, journal diff, journal-completeness proof, and settlement proof.

Current invariants and fail-closed conditions:
- debit/credit conservation must remain exact,
- selected, participating, credited, and zero-credit assets must remain distinguishable,
- and settlement must fail closed if accounting precision, journal completeness, or settlement-proof bindings drift apart.

Current proof closure lives through:
- `settlement-source-to-shares`

### Proof contract, witnesses, and replay

Current canon requires:
- proof contract materialization,
- evidence-chain closure,
- theorem-check binding,
- bundle coherence,
- witness-manifest coherence,
- replay step ids with required artifact paths,
- and generated appendices that render the actual current proof state rather than prose approximations.

Current canonical objects and emitted artifacts:
- proof contract artifact, theorem verdicts, artifact bindings, replay steps, system proof bundle, witness manifest, generated `_PROVEN_`, and inherited matrix/replay/quality artifact families.

Current invariants and fail-closed conditions:
- theorem ids must stay bound to replay steps and required artifact paths,
- witness manifests and proof bundles must agree on proof-family membership and artifact coverage,
- and generated appendices or matrices must fail closed on catalog drift, missing digests, or stale generated output.

Current proof closure lives through:
- `proof-contract`

## V21 accepted boundaries and reopen conditions

The current accepted V21 boundaries are:

1. V21 hardens specifying and first source-side structural enforcement before it attempts new runtime or proof semantics.
   Reopen condition: a specifying implementation change reveals a concrete contradiction in current runtime canon.

2. V21 does not introduce a new runtime quality-report family beyond the inherited V20 generated artifacts in this pass.
   Reopen condition: V21 promotion or checking requires a dedicated new generated spec artifact family.

3. V21 may begin with structural spec-family checking before full V21 promotion support is finished.
   Reopen condition: the checker lands and exposes remaining promotion gaps that should be closed in the same version.

4. Historical `NOTES` and `SYSTEM_PARITY_MATRIX` files remain preserved as history.
   Reopen condition: a later migration version chooses to normalize or alias older historical names.

## V21 proof-family canon

The current proof-family baseline is inherited from the active V20 generated appendix.
The exact current member inventories, theorem inventories, replay steps, witness artifact paths, and failing-run state are rendered in `ENGI_SPEC_V20_PROVEN.md`.

For current-canon restatement purposes, the active family inventory is:

| proofFamily | purpose | proofArtifactPath | memberCount | theoremCount | witnessArtifactCount | replayArtifactCount | replayStepCount |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: |
| `inference-synthesis` | prove evaluator-status, evidence-basis, and ownership closure for inferred fields | `.engi/inference-synthesis-proof.json` | 5 | 6 | 6 | 7 | 3 |
| `prompt-completeness` | prove prompt-owned fields are contract-bound, parsable, attributable, and truthfully consumed | `.engi/prompt-completeness-proof.json` | 5 | 8 | 5 | 5 | 4 |
| `static-code-analysis` | prove static measurement stages, registries, receipts, reports, and proof surfaces agree | `.engi/static-measurement-proof.json` | 4 | 5 | 5 | 5 | 3 |
| `verification-decisions` | prove issuance, provenance, sufficiency, issuer-policy, and use-tier consequences are closed | `.engi/verification-decisions-proof.json` | 5 | 7 | 3 | 3 | 2 |
| `selection-and-materialization` | prove selected-set, lock, materialized-source, exclusion, and visibility closure | `.engi/selection-and-materialization-proof.json` | 5 | 7 | 7 | 7 | 2 |
| `authorization-and-sensitive-flow` | prove principals, authorization decisions, classifications, and sensitive flows remain policy-aligned | `.engi/authorization-and-sensitive-flow-proof.json` | 5 | 6 | 6 | 6 | 2 |
| `settlement-source-to-shares` | prove contribution, normalization, participation, allocation, journal, and settlement theorem integrity | `.engi/settlement-source-to-shares-proof.json` | 7 | 7 | 7 | 7 | 2 |
| `disclosure-boundary` | prove projection policy, bounded-public, redaction, and disclosure verdict alignment | `.engi/disclosure-boundary-proof.json` | 4 | 5 | 5 | 5 | 2 |
| `proof-contract` | prove proof-contract, evidence-chain, theorem-binding, bundle, and witness-manifest coherence | `.engi/proof-contract.json` | 5 | 6 | 3 | 3 | 3 |

The V21 requirement is now stronger than the earlier draft posture.
The promoted V21 full canon must restate enough family-local truth inline that a reader can recover:
- family purpose,
- how current closure is carried,
- member verdict shape,
- theorem-to-replay grouping,
- generated-artifact and test bindings,
- fail-closed conditions,
- and where run-by-run proof state is rendered in generated canon.

`ENGI_SPEC_V20_PROVEN.md` remains the current generated run-state rendering.
Appendix B below now carries the minimum exact family semantics that current full-canon `SPEC` must no longer omit.

## V21 generated canon

Generated canon is part of the current ENGI system and therefore part of the current full spec.

### `_PROVEN_`

The active generated proof appendix:
- is `ENGI_SPEC_V20_PROVEN.md`,
- is generated only,
- is checkable against proof-source commit `2f3fb17983223d6951c257be9bfa663419bdfd7e`,
- and currently records aggregate verdict, V19 reproducible-canon reports, V20 operator-quality reports, proof-family inventory, family details, scenario/run matrix, incomplete verdicts, and run details.

The V21 comparison pass regenerated the appendix to `/tmp/v20-proven-regen.md` and confirmed byte equality with the committed V20 appendix.

### V19 reproducible-canon artifact family

The currently inherited V19 artifact family is:
- `.engi/v19-contract-change-ledger.json`
- `.engi/v19-deterministic-replay-report.json`
- `.engi/v19-negative-proof-mutation-matrix.json`
- `.engi/v19-proof-member-semantic-matrix.json`
- `.engi/v19-state-machine-matrix.json`
- `.engi/v19-theorem-evidence-matrix.json`
- `.engi/v19-volatility-inventory.json`

Their current canonical role is to preserve:
- deterministic replay,
- volatility classification,
- representative negative mutation fail-closure,
- positive proof matrix materialization,
- and explicit contract-change tracking.

### V20 operator-quality artifact family

The active V20 artifact family is:
- `.engi/v20-operator-acceptance-transcript.json`
- `.engi/v20-visual-regression-report.json`
- `.engi/v20-accessibility-report.json`
- `.engi/v20-performance-budget-report.json`
- `.engi/v20-projection-quality-smoke-matrix.json`
- `.engi/v20-quality-summary.json`

Their current canonical role is to preserve:
- executable operator-facing review truth,
- deterministic visual signature truth,
- deterministic accessibility truth,
- normalized local performance-budget truth,
- projection-quality smoke truth,
- and aggregate quality verdict truth.

### V21 specifying artifact family

V21 now defines a small version-local generated artifact family for specifying closure:
- `.engi/v21-spec-family-report.json`
- `.engi/v21-canonical-input-report.json`

Their current canonical role is to preserve:
- executable evidence that the V21 hand-authored file family satisfies the V21 structural and density rules,
- executable evidence that the active pointed canon exposes the required `SPEC`, `_PROVEN_`, parity, and generated artifact inputs,
- and a version-local generated bridge between specifying prose and promotion-time repository enforcement.

### Shared generated-artifact fields

The V21 comparison pass confirms that the V20 quality artifact family shares important common fields.

At minimum, current generated artifact families should be specified with the following common-field concepts where applicable:
- `version`
- `reportId` or `matrixId`
- `generatedAt`
- `proofSourceCommit`
- `generatorId`
- `worktreeState`
- `passed`
- `blockingFailureCount`
- `acceptedExclusionCount`
- `scenarioIds`
- `branchModes`
- `projectionPrincipals`
- and `replayContext`

### Artifact-specific generated fields

The same comparison pass confirms that artifact-specific fields matter just as much as shared fields.

Current examples include:
- operator transcript `flowCount` and `stepCount`,
- accessibility `checkCount`,
- performance `operationCount` and `normalizedElapsedClasses`,
- projection-quality `cellCount`,
- quality summary `qualityReportCount`,
- and visual regression `stateCount`, `signatureMode`, and `screenshotMode`.

The V21 rule is that future full-canon specs must define both:
- the common generated-artifact family fields,
- and the artifact-specific payload fields required to implement and validate each artifact.

## V21 validation canon

The current validation stack is inherited from V17 through V20 and should now be treated as part of full current canon.

### Layered validation responsibilities

1. Unit tests
   Prove local domain, proof, builder, and generator invariants.

2. Integration tests
   Prove workflow composition, state transitions, API surfaces, and persistence/reset behavior.

3. Browser E2E
   Prove operator-facing workflow truth and projection behavior.

4. Generated proof matrices
   Prove member semantics, theorem evidence, and state-machine coverage.

5. Deterministic replay and volatility
   Prove generated canon remains byte-stable and volatility-controlled.

6. Negative mutation
   Prove representative fail-closed mutation behavior.

7. Operator-quality reports
   Prove transcript, visual, accessibility, performance, and projection-quality closure.

### Current canonical gate inventory

The current promoted gate family includes:
- `npm --prefix engi-demo run typecheck`
- `npm --prefix engi-demo run test:unit`
- `npm --prefix engi-demo run test:integration`
- `npm --prefix engi-demo run test:e2e`
- `npm --prefix engi-demo run test:proof-member-matrix`
- `npm --prefix engi-demo run test:theorem-evidence-matrix`
- `npm --prefix engi-demo run test:state-machine`
- `npm --prefix engi-demo run test:deterministic-replay`
- `npm --prefix engi-demo run test:volatility`
- `npm --prefix engi-demo run test:negative-mutation-matrix`
- `npm --prefix engi-demo run test:contract-ledger`
- `npm --prefix engi-demo run test:v20-operator-transcript`
- `npm --prefix engi-demo run test:v20-accessibility`
- `npm --prefix engi-demo run test:v20-visual`
- `npm --prefix engi-demo run test:v20-performance`
- `npm --prefix engi-demo run test:v20-projection-quality`
- `npm --prefix engi-demo run test:v20-quality-summary`
- `npm --prefix engi-demo test`
- `node scripts/check-engi-canonical-inputs.mjs --current-target V21`

V21 does not change those gates in this pre-implementation drafting pass.
It does require later source-side promotion logic to reason about them as canonical promotion inputs rather than as ad hoc script history.

## V21 operator-quality canon

V21 inherits V20 operator-quality canon directly.
The current system therefore still requires:
- truthful active-canon and draft-target version posture,
- executable operator transcript coverage,
- deterministic visual signature coverage,
- deterministic accessibility coverage,
- normalized local performance budgets,
- and projection-quality smoke coverage.

The current accepted first-gate operator-quality counts are:
- transcript `flowCount = 10`
- visual state `stateCount = 10`
- accessibility `checkCount = 11`
- performance `operationCount = 9`
- projection-quality smoke `cellCount = 4`
- quality summary `qualityReportCount = 5`

These counts are current-canon runtime facts and should not drift silently.

## V21 full-canon rule

For V21+, a promoted `SPEC` is complete only when a reader can derive the current ENGI system from that version's canonical file family without needing earlier version files for missing semantics.

That means the promoted `SPEC` must restate current requirements for:
- whole-system design,
- domain objects,
- proof families and verdicts,
- generated artifacts,
- validation gates,
- promotion rules,
- accepted boundaries,
- operator truth,
- and source-of-truth hierarchy.

The `SPEC` may still cite prior versions for provenance.
It must not cite them as required semantic dependencies.

## V21 canonical file-family rule

V21 defines the hand-authored canonical file family as:
1. `SPEC`,
2. `SPEC_DELTA`,
3. `SPEC_PARITY_MATRIX`.

Generated canonical files remain required separately:
4. `_PROVEN_`,
5. `.engi/vN-*` artifacts required by the version's canon,
6. and `ENGI_SPEC.txt` as the only pointer.

Optional `NOTES` remain allowed only as non-canonical iterative working notes.

## V21 generated-canon input rule

Generated canon is now part of specifying.

For any version whose behavior depends on generated proof, matrix, replay, quality, or promotion artifacts, the spec family must define:
- generated artifact names,
- generator identity,
- proof-source commit rules,
- replay context rules,
- common artifact fields,
- artifact-specific fields,
- pass/fail fields,
- accepted exclusion fields,
- blocking-failure fields,
- artifact summaries included in `_PROVEN_`,
- and check-mode expectations.

If generated artifacts are canonical but their shared schema and artifact-specific payloads are not specified, the version is underspecified.

## V21 file-family and status-truth canon

V21 treats file-family truth and status truth as first-class canonical contracts.

### `SPEC`

The main spec must be full current canon rather than additive release notes.

### `SPEC_DELTA`

The delta file exists to carry version-local change truth:
- why the version exists,
- accepted decisions,
- implementation-revealed refinements,
- accepted boundaries,
- reopen conditions,
- changed artifact contracts,
- changed promotion rules,
- and canonical commit-message source material.

### `SPEC_PARITY_MATRIX`

The parity matrix exists to carry source/spec/generated/test/promotion truth:
- what the spec requires,
- what source or generators actually implement,
- which generated artifacts exist,
- which tests or commands validate them,
- and what remains closed, pending, or boundary-accepted.

### Optional `NOTES`

Optional notes remain useful for iterative development only.
They must not be depended-on canon.

### Status-truth requirement

A promoted canonical file family must agree on:
- current canonical/latest target,
- prior canonical anchor,
- promotion state,
- generated appendix state,
- generated artifact state,
- and source parity state.

The canonical promotion workflow for V21 must therefore reject:
- a promoted `SPEC` that still says an older version is current canon,
- a `DELTA` that still says promotion is pending after pointer advancement,
- a `PARITY_MATRIX` that still marks required first-gate rows as pending after promotion,
- or generated artifacts that record dirty-preview context for canonical output.

## V21 promotion canon

V21 source-side implementation has started and the promotion path now exists in draft form.
The required promoted sequence is:

1. run the V21 draft-mode hand-authored spec-family check while `ENGI_SPEC.txt` still points to `V20`,
2. run the active-canon input validation while `ENGI_SPEC.txt` still points to `V20`,
3. run inherited runtime, proof, reproducibility, mutation, and V20 operator-quality gates,
4. run the aggregate non-E2E suite,
5. rewrite the hand-authored V21 status truth into promoted posture through `scripts/prepare-engi-spec-family-promotion.mjs`,
6. advance `ENGI_SPEC.txt` to `V21`,
7. generate `ENGI_SPEC_V21_PROVEN.md` and `.engi/v21-*`,
8. run generated appendix check mode,
9. validate the newly pointed `V21` canonical input family,
10. run the V21 promoted-mode spec-family check,
11. run `git diff --check`,
12. derive the canonical commit message body from the V21 file family and generated outputs,
13. and only then accept the canonical promotion commit.

The V21 source-side promotion implementation therefore now includes:
1. a draft/promoted spec-family checker,
2. a canonical-input validator,
3. a promotion-time hand-authored status preparation step,
4. V21 support in `promote:canon`,
5. post-generation active-canon validation,
6. and commit-body derivation logic rooted in the V21 canonical file family.

## V21 first source-side implementation expectations

The V21 implementation now begins with a structural spec-family checker:
- `scripts/check-engi-spec-family.mjs`

Current implemented checks:
1. required hand-authored V21+ files exist (`SPEC`, `SPEC_DELTA`, `SPEC_PARITY_MATRIX`),
2. `ENGI_SPECIFYING.md` exists as the singular specifying authority and `ENGI_SPEC_TEMPLATEGUIDE.md` remains a pointer,
3. status blocks in the hand-authored V21 family expose a consistent `Current canonical/latest target`,
4. the main `SPEC` contains the required whole-system sections for full-system/current-canon reading,
5. the main `SPEC` contains the required appendix-grade totality carriers and proof-family coverage headings,
6. the `DELTA` and `PARITY_MATRIX` contain the minimum required structural sections,
7. promoted-mode checks fail on draft/pending status language,
8. and promoted-mode checks now also fail if V21 parity tables still carry transitional judgments such as `drafted` or `implemented; promotion pending`.

Current validating test basis:
- `engi-demo/test/v21-specifying.test.js`
- `npm --prefix engi-demo run test:unit`

Current implemented V21 source-side support beyond the checker:
1. `generateCanonicalProvenMarkdown` now supports `V21` by rendering a V21 appendix that summarizes inherited V19 reproducible-canon and V20 operator-quality closure while also emitting `.engi/v21-spec-family-report.json` and `.engi/v21-canonical-input-report.json`,
2. `scripts/promote-engi-canon.mjs` now accepts `--version V21`,
3. `scripts/check-engi-canonical-inputs.mjs` now validates the active pointed canon's `SPEC`, `_PROVEN_`, parity file, and required generated artifact family before V21 promotion proceeds,
4. `scripts/prepare-engi-spec-family-promotion.mjs` now rewrites the hand-authored V21 status block truth into promoted posture immediately before pointer advancement,
5. the V21 promotion path now includes pre-mutation draft spec-family checking, pre-mutation canonical-input validation, promotion-time hand-authored status preparation, post-generation active-canon validation for `V21`, and post-mutation promoted spec-family checking in both dry-run planning and non-dry-run execution,
6. and `scripts/promote-engi-canon.mjs` now derives the V21 canonical commit-message body from the V21 `SPEC`, `DELTA`, and `PARITY_MATRIX` rather than from hard-coded V21 prose.

Remaining implementation sequence:
1. keep tightening the hand-authored V21 `SPEC` until its full-system inventory density is strong enough for total re-derivability rather than only structural acceptance,
2. verify the final V21 draft family and generated outputs together,
3. and only then advance V21 toward canonical promotion.

## V21 appendices and canonical supporting material

The final promoted V21 full canon requires appendix-grade supporting material.
V21 records the current appendix responsibilities directly below rather than leaving them as future placeholders.

### Appendix A. Canonical type and surface catalog

#### A.1 Branded identifiers and discriminants

The current typed-contract layer defines the following branded ids and discriminants in `engi-demo/src/canonical/type-contracts.ts`.

| Contract | Canonical role |
| --- | --- |
| `NeedId` | stable typed identity for measured need and downstream branch derivation |
| `AssetId` | stable typed identity for deposited/evaluated/selected assets |
| `BranchName` | typed branch artifact identity |
| `ContentRoot` | typed root for selected source material and content-unit addressing |
| `UnitHash` | typed content-unit hash identity |
| `PolicyRef` | typed policy/disclosure reference |
| `LedgerAccountId` | typed accounting ledger identity |
| `SignerAddress` | typed signing/authority identity |
| `RealizationProfileId` = `A \| B` | canonical realization-profile discriminant |
| `RealizationProfileKind` = `realization-profile` | typed realization-profile kind tag |

#### A.2 Realization profile contracts

The current realization-profile typed contracts are:

| Contract | Required fields | Current role |
| --- | --- | --- |
| `RealizationIdentity` | `whoItIs`, `operatorRole`, `audienceMeaning` | makes profile identity and audience meaning explicit |
| `RealizationProfileDefinition` | `profileId`, `label`, `shortLabel`, `identity`, `depositMode`, `needMode`, `assetPackShape`, `settlementShape`, `scenarioFamilies`, `composition`, `boundaryRealityNote` | source definition of a profile before runtime materialization |
| `BuiltRealizationProfile` | `profileKind`, `profileDiscriminant`, all profile definition fields with concrete arrays | runtime materialized realization profile carried by need and operator surfaces |
| `RealizationProfileSubject` | string or `{ realizationProfileId?, scenarioFamily? }` | flexible subject selector for profile-aware logic |

#### A.3 Prompt and inference contracts

The current prompt/inference typed contracts are:

| Contract | Required fields or invariants | Fail-closed meaning |
| --- | --- | --- |
| `EvaluatorSurfaceContract` | `evaluatorId`, `evaluatorKind`, `measurementClass`, `mode`, `modelId`, `promptId`, `toolId`, `replayableTrace`, `profile`, `standIn`, `evidenceRefs` | evaluator or tool identity cannot remain implicit |
| `PromptSchemaEntry` | `field`, `type`, `required` | output schema stays typed and field-owned |
| `PromptContextInput` | `field`, `value`, `source`, optional `evidenceRefs`, `artifactBindings`, `notes` | context ownership and evidence provenance stay explicit |
| `PromptContractCompleteness` | `ok`, `missingPlaceholderBindings`, `unusedContextFields`, `undeclaredNonRenderedContextFields` | missing bindings or undeclared hidden context fail completeness |
| `PromptContractShape` | prompt/template hashes, placeholder set, declared/rendered/non-rendered context fields, expected output schema, parse contract, strict parse flags, completeness, contract hash | prompt-owned fields must be contract-bound and parsable |
| `PromptSurfaceLineage` | `derivedFrom`, `evidenceRefs`, `outputFields`, `downstreamArtifacts` | prompt lineage and downstream consumers stay auditable |
| `ParsableCompletionContract` | `contractId`, `evaluatorId`, `payloadType`, `schemaHash`, `ownedOutputFields`, `requiredTopLevelKeys`, strict parse flags, downstream artifacts, fail-closed semantics | parsed completion envelopes must be exact-contract artifacts |
| `BuiltPromptSurface` | prompt surface, interpolated values, ordered context inputs, lineage, prompt contract, parsable completion contract, evaluator surface | prompt execution surface is fully materialized rather than implicit |
| `ParsedCompletionEnvelope` | `envelopeId`, `promptId`, `parseContractId`, `contractHash`, `parsedAt`, `executionMode`, `standIn`, `parseOutcome`, `ownedOutputFields`, `requiredTopLevelKeys`, `normalizedParsedPayload`, `evidenceRefs`, `downstreamArtifacts`, `payloadHash`, `envelopeHash`, `admissible` | malformed or inexact completions are rejected instead of becoming canon |

#### A.4 Projection and settlement contracts

The current typed contracts for projection and settlement are:

| Contract | Required fields or invariants | Current role |
| --- | --- | --- |
| `ProjectionArtifactRule` | `path`, `sensitiveDataClass`, `disclosable` | ties each artifact path to disclosure class |
| `ProjectionPrincipalPolicy` | `allowPrivateArtifacts`, `allowSourceMaterial`, `allowRawBranchFiles`, `visibleSensitiveDataClasses` | defines principal-local visibility and privacy limits |
| `ProjectionPolicyShape` | `conformanceProfile`, `productionIntentProfile`, `defaultPrincipal`, `principals`, `artifactRules`, `privateArtifactPaths`, `publicArtifactPaths`, `materializedBranchFileCount` | complete projection/disclosure policy object |
| `SourceContributionDispositionInput` | `clipped?` | input hint for contribution normalization |
| `SettlementParticipationInput` | selection, settlement, credit, contribution, branch-mode, and use-tier flags | source data for settlement participation classification |
| `SettlementParticipationStruct` | `recordKind`, `selectionStatus`, `settlementStatus`, `creditDisposition`, `settlementDisposition`, `contributionDisposition`, `positivelyCredited`, `zeroCreditParticipating`, `excludedFromSettlement`, `exclusionReason` | makes selected vs participating vs credited distinctions explicit |

#### A.5 Surface-first runtime shapes

The current surface-first shapes from `engi-demo/src/canonical/types.js` and `engi-demo/src/canonical/surfaces.js` are:

| Shape | Key fields | Current role |
| --- | --- | --- |
| `DepositingSurface` | `depositSessionId`, `depositProfile`, `repoSupplyRef`, `selectedInventoryRefs`, `selectedArtifactKindCounts`, `selectedOriginKindCounts`, `addressingRoot`, `signingRoot`, `authRoot`, `depositIntentSummary` | canonical deposit summary surface |
| `NeedingSurface` | `needId`, `realizationProfile`, `parserKind`, `taskSummary`, `failureModeSummary`, `targetArtifactKinds`, `boundednessSummary`, `closureCriteria` | canonical measured-need summary surface |
| `DepositingToNeedingSurface` | `relationId`, `depositSessionId`, `needId`, `fitSummary`, `decisiveKinds`, `overlapKinds`, `normalizationPressure`, `branchIntentSummary`, `proofIntentSummary`, `settlementIntentSummary` | fit relation between deposited supply and measured need |
| `HostCapabilityRequirement` | `capabilityId`, `capabilityFamily`, `executionReality`, `requiredPrograms`, `supportingPrograms`, `telemetrySurfaces`, `safetyNotes` | host/runtime capability truth |
| `CanonicalTypeNote` | `typeId`, `layer`, `purpose`, `invariants` | typed-canon annotation |
| `SessionShape` | `authSessionId`, repo/boundary refs | authenticated repo-session surface |
| `RepoArtifactInventoryEntryShape` | `repo`, `artifactKind`, `originKind`, declared stacks/constraints | repo inventory entry |
| `NeedScenarioShape` | `scenarioId`, `scenarioFamily`, `repo`, benchmark refs, coverage tags | canonical scenario seed |
| `RepoSupplyStateShape` | GitHub app sessions, repo inventory, need scenarios | depositable supply state |
| `GithubAppAuthSurface` | repo, permissions, installation ids, token/auth hashes | repository authorization boundary |
| `AddressingSurface` | `addressingRoot`, `addressingScope`, `repo` | content addressing boundary |
| `SigningSurface` | `payloadHash` | signing boundary |
| `ArtifactSelectionSurface` | selected inventory root/ids/entries, selection label, intake mode | deposit-to-selection traceability |
| `CandidateAssetShape` | `artifactKind`, selection/addressing/signing/auth surfaces, github boundary | candidate asset surface prior to evaluation/selection |
| `SelectedCandidateShape` | `assetId`, `useTier`, `ranking.finalRankingScore`, `asset` | selected-candidate summary |
| `AssetPackShape` | `assetPackId`, `branchMode`, `selectedAssets` | selected asset-pack summary |
| `BranchArtifactsShape` | `branchName`, `confidentiality`, `files` | branch artifact carrier |
| `ProofWitnessManifestShape` | `proofHash`, `proofFamilies` | witness-manifest summary |
| `BoundedPublicProofShape` | `bundleId`, `redactionStatus`, `boundedPublicProofHash` | bounded-public projection proof |
| `SettlementPreviewShape` | bundle/source-to-shares/participation refs and credited/zero-credit ids | settlement preview artifact |
| `IdentityBindingShape` | `principalId`, `principalClass`, `bindingRoot` | identity-binding summary |
| `AuthorizationDecisionShape` | `principalId`, `decision`, `action` | authorization-decision summary |
| `BuyerShape` | `buyerId`, `repo`, `buyerBranch`, `installationId` | buyer/session context |
| `NeedShape` | `needId`, benchmark refs, `task`, `failureModes`, `targetArtifactKinds`, `closureCriteria`, parser contract, constraints, realization profile | runtime need object |

### Appendix B. Proof family closure catalog

The current proof-family catalog is inherited from `ENGI_SPEC_V20_PROVEN.md` and is part of current ENGI canon until a later version changes it explicitly.

Current proof-run basis:
- `familyCount = 9`
- `memberCount = 45`
- `theoremCount = 57`
- `runCount = 16`
- `scenarioCount = 8`
- `branchModeCount = 2`
- `fullyProven = true`

#### B.0 Exact proof-family inventory matrix

| proofFamily | proofArtifactPath | memberIds | theoremIds | replayStepIds | witnessArtifactPaths | Current source basis |
| --- | --- | --- | --- | --- | --- | --- |
| `inference-synthesis` | `.engi/inference-synthesis-proof.json` | `task`, `failureModes`, `constraints`, `targetArtifactKinds`, `closureCriteria` | `inference_synthesis.coverage_totality`, `inference_synthesis.evaluator_status_truth`, `inference_synthesis.evidence_basis_closure`, `inference_synthesis.ownership_traceability_closure`, `inference_synthesis.witness_materialization_closure`, `inference_synthesis.replay_closure` | `inference-synthesis.coverage-reconciliation`, `inference-synthesis.evaluator-status-replay`, `inference-synthesis.evidence-basis-replay` | `.engi/inference-moment-contracts.json`, `.engi/inference-proofs.json`, `.engi/prompt-implementation-surface.json`, `.engi/prompt-surfaces.json`, `.engi/parsed-completion-envelopes.json`, `.engi/inference-synthesis-proof.json` | `engi-demo/src/canonical/need-measurement.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/canonical/proven-generator.js` |
| `prompt-completeness` | `.engi/prompt-completeness-proof.json` | `task`, `failureModes`, `constraints`, `targetArtifactKinds`, `closureCriteria` | `prompt_completeness.coverage_totality`, `prompt_completeness.no_ghost_coverage`, `prompt_completeness.explicit_exclusion_closure`, `prompt_completeness.contract_closure`, `prompt_completeness.parsed_envelope_admissibility`, `prompt_completeness.downstream_consumer_closure`, `prompt_completeness.provenance_truth`, `prompt_completeness.witness_replay_closure` | `prompt-completeness.member-set-reconciliation`, `prompt-completeness.parse-admissibility`, `prompt-completeness.consumer-closure`, `prompt-completeness.provenance-truth` | `.engi/prompt-family-registry.json`, `.engi/prompt-contracts.json`, `.engi/prompt-surfaces.json`, `.engi/parsed-completion-envelopes.json`, `.engi/prompt-completeness-proof.json` | `engi-demo/src/canonical/prompting.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/canonical/proven-generator.js` |
| `static-code-analysis` | `.engi/static-measurement-proof.json` | `deterministic-parser`, `repo-context`, `content-unit`, `measurement-stages` | `static_code_analysis.stage_domain_purity`, `static_code_analysis.abstract_to_concrete_stage_mapping`, `static_code_analysis.registry_role_closure`, `static_code_analysis.receipt_report_proof_agreement`, `static_code_analysis.witness_replay_closure` | `static-code-analysis.stage-domain`, `static-code-analysis.stage-mapping`, `static-code-analysis.receipt-report-proof` | `.engi/code-analysis-fact-registry.json`, `.engi/static-heuristics-registry.json`, `.engi/measurement-receipts.json`, `.engi/static-measurement-report.json`, `.engi/static-measurement-proof.json` | `engi-demo/src/canonical/evaluation-materialization.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/canonical/proven-generator.js` |
| `verification-decisions` | `.engi/verification-decisions-proof.json` | `issuance`, `provenance`, `sufficiency`, `issuer-policy`, `use-tier-consequence` | `verification_decisions.issuance_closure`, `verification_decisions.provenance_closure`, `verification_decisions.sufficiency_closure`, `verification_decisions.issuer_policy_closure`, `verification_decisions.use_tier_consequence_closure`, `verification_decisions.receipt_report_role_closure`, `verification_decisions.witness_replay_closure` | `verification-decisions.stage-mapping`, `verification-decisions.use-tier-consequence` | `.engi/verification-report.json`, `.engi/verification-receipts.json`, `.engi/verification-decisions-proof.json` | `engi-demo/src/canonical/evaluation-materialization.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/canonical/proven-generator.js` |
| `selection-and-materialization` | `.engi/selection-and-materialization-proof.json` | `selected-assets`, `locked-units`, `materialized-source`, `exclusions`, `visibility-rules` | `selection_and_materialization.selected_asset_closure`, `selection_and_materialization.lock_closure`, `selection_and_materialization.materialized_source_closure`, `selection_and_materialization.exclusion_closure`, `selection_and_materialization.visibility_closure`, `selection_and_materialization.selection_consistency_closure`, `selection_and_materialization.materialization_proof_closure` | `selection-and-materialization.selected-set`, `selection-and-materialization.visibility` | `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json`, `.engi/materialization-exclusions.json`, `.engi/materialization-visibility-proof.json`, `.engi/selection-consistency-proof.json`, `.engi/materialization-proof.json`, `.engi/selection-and-materialization-proof.json` | `engi-demo/src/canonical/evaluation-materialization.js`, `engi-demo/src/canonical/proof-materialization.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/canonical/proven-generator.js` |
| `authorization-and-sensitive-flow` | `.engi/authorization-and-sensitive-flow-proof.json` | `principals`, `authorization-decisions`, `confidentiality-classes`, `retention-disclosure-rules`, `sensitive-data-flows` | `authorization_and_sensitive_flow.principal_authority_totality`, `authorization_and_sensitive_flow.authorization_decision_closure`, `authorization_and_sensitive_flow.classification_closure`, `authorization_and_sensitive_flow.policy_assignment_closure`, `authorization_and_sensitive_flow.no_unauthorized_public_flow`, `authorization_and_sensitive_flow.witness_replay_closure` | `authorization-sensitive-flow.identity`, `authorization-sensitive-flow.flows` | `.engi/identity-bindings.json`, `.engi/authorization-decisions.json`, `.engi/sensitive-data-flow.json`, `.engi/identity-authorization-proof.json`, `.engi/sensitive-data-flow-proof.json`, `.engi/authorization-and-sensitive-flow-proof.json` | `engi-demo/src/canonical/proof-materialization.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/canonical/proven-generator.js` |
| `settlement-source-to-shares` | `.engi/settlement-source-to-shares-proof.json` | `contribution`, `clipping`, `normalization`, `participation`, `allocation`, `journal`, `settlement-proof` | `settlement_source_to_shares.contribution_totality`, `settlement_source_to_shares.clipping_determinism`, `settlement_source_to_shares.normalization_exactness`, `settlement_source_to_shares.participation_totality`, `settlement_source_to_shares.allocation_conservation`, `settlement_source_to_shares.journal_completeness`, `settlement_source_to_shares.settlement_theorem_integrity` | `settlement-source-to-shares.contribution-allocation`, `settlement-source-to-shares.journal-theorem` | `.engi/source-to-shares.json`, `.engi/settlement-participation.json`, `.engi/accounting-precision-report.json`, `.engi/journal-diff.json`, `.engi/journal-completeness-proof.json`, `.engi/settlement-proof.json`, `.engi/settlement-source-to-shares-proof.json` | `engi-demo/src/canonical/settlement.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/canonical/proven-generator.js` |
| `disclosure-boundary` | `.engi/disclosure-boundary-proof.json` | `projection-policy`, `bounded-public-proof`, `redaction-proof`, `disclosure-proof` | `disclosure_boundary.projection_policy_closure`, `disclosure_boundary.bounded_public_metadata_only`, `disclosure_boundary.redaction_alignment`, `disclosure_boundary.disclosure_verdict_alignment`, `disclosure_boundary.witness_replay_closure` | `disclosure-boundary.policy-bounded-public`, `disclosure-boundary.redaction-disclosure` | `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/redaction-proof.json`, `.engi/disclosure-proof.json`, `.engi/disclosure-boundary-proof.json` | `engi-demo/src/canonical/projections.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/canonical/proven-generator.js` |
| `proof-contract` | `.engi/proof-contract.json` | `proof-contract`, `evidence-chain`, `theorem-checks`, `system-proof-bundle`, `witness-manifest-closure` | `proof_contract.contract_materialization`, `proof_contract.evidence_chain_closure`, `proof_contract.theorem_check_binding`, `proof_contract.bundle_coherence`, `proof_contract.witness_manifest_coherence`, `proof_contract.replay_closure` | `proof-contract.contract-materialization`, `proof-contract.evidence-chain`, `proof-contract.bundle-witness` | `.engi/proof-contract.json`, `.engi/system-proof-bundle.json`, `.engi/proof-witness-manifest.json` | `engi-demo/src/canonical/proof-annotations.js`, `engi-demo/src/canonical/proof-materialization.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/canonical/proven-generator.js` |

#### B.1 Inference-synthesis

- proofArtifactPath: `.engi/inference-synthesis-proof.json`
- current source basis: `engi-demo/src/canonical/need-measurement.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/canonical/proven-generator.js`
- members: `task`, `failureModes`, `constraints`, `targetArtifactKinds`, `closureCriteria`
- theoremIds: `inference_synthesis.coverage_totality`, `inference_synthesis.evaluator_status_truth`, `inference_synthesis.evidence_basis_closure`, `inference_synthesis.ownership_traceability_closure`, `inference_synthesis.witness_materialization_closure`, `inference_synthesis.replay_closure`
- replayStepIds: `inference-synthesis.coverage-reconciliation`, `inference-synthesis.evaluator-status-replay`, `inference-synthesis.evidence-basis-replay`
- witnessArtifactPaths: `.engi/inference-moment-contracts.json`, `.engi/inference-proofs.json`, `.engi/prompt-implementation-surface.json`, `.engi/prompt-surfaces.json`, `.engi/parsed-completion-envelopes.json`, `.engi/inference-synthesis-proof.json`
- what it proves: inferred need fields are covered exactly once, evaluator status is truthful, evidence basis is closed, ownership remains traceable, and witness/replay material is sufficient to audit the inference path.
- how current closure is carried: inference moment contracts, field proofs, prompt surfaces, parsed envelopes, and the evaluator manifest are reconciled into the family proof object.
- current member verdict shape: `field`, `passed`, `fieldProofPresent`, `momentContractPresent`, `promptSurfacePresent`, `parsedEnvelopePresent`, `evaluatorStatusTruthful`, `evidenceBasisClosed`.
- current theorem-to-replay grouping: coverage totality binds to `coverage-reconciliation`; evaluator status truth binds to `evaluator-status-replay`; evidence-basis and ownership traceability bind to `evidence-basis-replay`; witness materialization and replay closure span the full replay set.
- generated-artifact and test bindings: family proof object, `_PROVEN_` family detail tables, inherited V19 member/theorem matrices, deterministic replay, negative mutation, and `engi-demo/test/core.test.js` plus `engi-demo/test/proven-generator.test.js`.
- fail-closed conditions: missing field proofs, missing moment contracts, prompt-surface drift, parsed-envelope omission, evaluator-manifest mismatch, theorem/replay-step drift, or witness-artifact absence.

#### B.2 Prompt-completeness

- proofArtifactPath: `.engi/prompt-completeness-proof.json`
- current source basis: `engi-demo/src/canonical/prompting.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/canonical/proven-generator.js`
- members: `task`, `failureModes`, `constraints`, `targetArtifactKinds`, `closureCriteria`
- theoremIds: `prompt_completeness.coverage_totality`, `prompt_completeness.no_ghost_coverage`, `prompt_completeness.explicit_exclusion_closure`, `prompt_completeness.contract_closure`, `prompt_completeness.parsed_envelope_admissibility`, `prompt_completeness.downstream_consumer_closure`, `prompt_completeness.provenance_truth`, `prompt_completeness.witness_replay_closure`
- replayStepIds: `prompt-completeness.member-set-reconciliation`, `prompt-completeness.parse-admissibility`, `prompt-completeness.consumer-closure`, `prompt-completeness.provenance-truth`
- witnessArtifactPaths: `.engi/prompt-family-registry.json`, `.engi/prompt-contracts.json`, `.engi/prompt-surfaces.json`, `.engi/parsed-completion-envelopes.json`, `.engi/prompt-completeness-proof.json`
- what it proves: prompt-owned inferred fields are classified, registered, contract-complete, parse-admissible, truthfully attributed, and consumed only through declared downstream surfaces.
- how current closure is carried: the prompt family registry, prompt contracts, prompt surfaces, parsed envelopes, and the prompt-completeness proof reconcile classified fields against registered fields and explicit exclusions.
- current member verdict shape: `field`, `passed`, `classified`, `registered`, `inDeclaredFamilyRegistry`, `explicitlyExcluded`, `contractComplete`, `parsedEnvelopeAdmissible`, `downstreamConsumersClosed`, `provenanceAnnotationsTruthful`.
- current theorem-to-replay grouping: coverage/no-ghost/explicit-exclusion closure bind to `member-set-reconciliation`; contract and parsed-envelope admissibility bind to `parse-admissibility`; downstream consumer closure binds to `consumer-closure`; provenance truth binds to `provenance-truth`; witness/replay closure spans all four steps.
- generated-artifact and test bindings: family proof object, `_PROVEN_` family detail tables, inherited V19 member/theorem matrices, deterministic replay, negative mutation, `engi-demo/test/core.test.js`, and direct prompt-contract fail-closed unit tests in `engi-demo/src/canonical/prompting.js`.
- fail-closed conditions: classified fields missing registration, ghost registration, omitted explicit exclusions, incomplete prompt contracts, inadmissible parsed envelopes, undeclared consumers, false provenance surfaces, or missing witness/replay coverage.

#### B.3 Static-code-analysis

- proofArtifactPath: `.engi/static-measurement-proof.json`
- current source basis: `engi-demo/src/canonical/evaluation-materialization.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/canonical/proven-generator.js`
- members: `deterministic-parser`, `repo-context`, `content-unit`, `measurement-stages`
- theoremIds: `static_code_analysis.stage_domain_purity`, `static_code_analysis.abstract_to_concrete_stage_mapping`, `static_code_analysis.registry_role_closure`, `static_code_analysis.receipt_report_proof_agreement`, `static_code_analysis.witness_replay_closure`
- replayStepIds: `static-code-analysis.stage-domain`, `static-code-analysis.stage-mapping`, `static-code-analysis.receipt-report-proof`
- witnessArtifactPaths: `.engi/code-analysis-fact-registry.json`, `.engi/static-heuristics-registry.json`, `.engi/measurement-receipts.json`, `.engi/static-measurement-report.json`, `.engi/static-measurement-proof.json`
- what it proves: static measurement stages, registries, receipts, and proof/report roles remain domain-pure, consistently mapped, and mutually coherent.
- how current closure is carried: receipt artifacts, fact registries, heuristics registries, the static measurement report, and the family proof are reconciled against shared stage ids.
- current member verdict shape: `memberId`, `passed`, `stageIds`.
- current theorem-to-replay grouping: stage-domain purity binds to `stage-domain`; stage mapping and registry-role closure bind to `stage-mapping`; receipt/report/proof agreement and witness/replay closure bind to `receipt-report-proof`.
- generated-artifact and test bindings: family proof object, `_PROVEN_` family detail tables, inherited V19 member/theorem matrices, deterministic replay, and unit/integration surfaces that exercise static measurement and receipts.
- fail-closed conditions: stage-domain drift, missing stage ids, receipt/report disagreement, registry-role mismatch, or witness/replay artifact absence.

#### B.4 Verification-decisions

- proofArtifactPath: `.engi/verification-decisions-proof.json`
- current source basis: `engi-demo/src/canonical/evaluation-materialization.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/canonical/proven-generator.js`
- members: `issuance`, `provenance`, `sufficiency`, `issuer-policy`, `use-tier-consequence`
- theoremIds: `verification_decisions.issuance_closure`, `verification_decisions.provenance_closure`, `verification_decisions.sufficiency_closure`, `verification_decisions.issuer_policy_closure`, `verification_decisions.use_tier_consequence_closure`, `verification_decisions.receipt_report_role_closure`, `verification_decisions.witness_replay_closure`
- replayStepIds: `verification-decisions.stage-mapping`, `verification-decisions.use-tier-consequence`
- witnessArtifactPaths: `.engi/verification-report.json`, `.engi/verification-receipts.json`, `.engi/verification-decisions-proof.json`
- what it proves: issuance, provenance, sufficiency, issuer-policy, and use-tier outcomes are stage-distinct, truthfully bound to receipts/report data, and carried into branch consequences without silent promotion.
- how current closure is carried: verification receipts and the verification report are reconciled against the family proof and use-tier consequence checks.
- current member verdict shape: `memberId`, `passed`, `stageIds`.
- current theorem-to-replay grouping: issuance/provenance/sufficiency/issuer-policy closure bind to `stage-mapping`; use-tier consequence and receipt/report role closure bind to `use-tier-consequence`; witness/replay closure spans both steps.
- generated-artifact and test bindings: family proof object, `_PROVEN_` detail tables, inherited V19 matrices, deterministic replay, and integration/runtime tests that verify restricted or revoked assets remain non-settlement or rejected.
- fail-closed conditions: receipt/report drift, use-tier consequences not matching verification outcomes, issuer-policy misclassification, or missing replay/witness coverage.

#### B.5 Selection-and-materialization

- proofArtifactPath: `.engi/selection-and-materialization-proof.json`
- current source basis: `engi-demo/src/canonical/evaluation-materialization.js`, `engi-demo/src/canonical/proof-materialization.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/canonical/proven-generator.js`
- members: `selected-assets`, `locked-units`, `materialized-source`, `exclusions`, `visibility-rules`
- theoremIds: `selection_and_materialization.selected_asset_closure`, `selection_and_materialization.lock_closure`, `selection_and_materialization.materialized_source_closure`, `selection_and_materialization.exclusion_closure`, `selection_and_materialization.visibility_closure`, `selection_and_materialization.selection_consistency_closure`, `selection_and_materialization.materialization_proof_closure`
- replayStepIds: `selection-and-materialization.selected-set`, `selection-and-materialization.visibility`
- witnessArtifactPaths: `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json`, `.engi/materialization-exclusions.json`, `.engi/materialization-visibility-proof.json`, `.engi/selection-consistency-proof.json`, `.engi/materialization-proof.json`, `.engi/selection-and-materialization-proof.json`
- what it proves: the selected set, lock, materialized-source manifest, exclusions, and visibility posture remain coherent across branch materialization.
- how current closure is carried: asset-pack lock, selected-source material, materialization exclusions, visibility proof, selection-consistency proof, and the family proof are reconciled against the selected asset set.
- current member verdict shape: `memberId`, `passed`.
- current theorem-to-replay grouping: selected-asset, lock, materialized-source, and selection-consistency closure bind to `selected-set`; exclusion and visibility closure bind to `visibility`; materialization-proof closure depends on both steps.
- generated-artifact and test bindings: family proof object, `_PROVEN_` detail tables, inherited V19 matrices, deterministic replay, and unit/integration/E2E flows that verify patch/context branch differences and source-material closure.
- fail-closed conditions: selected-set drift, lock/source mismatch, unexplained exclusions, visibility leakage, or materialization proof missing required witness artifacts.

#### B.6 Authorization-and-sensitive-flow

- proofArtifactPath: `.engi/authorization-and-sensitive-flow-proof.json`
- current source basis: `engi-demo/src/canonical/proof-materialization.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/canonical/proven-generator.js`
- members: `principals`, `authorization-decisions`, `confidentiality-classes`, `retention-disclosure-rules`, `sensitive-data-flows`
- theoremIds: `authorization_and_sensitive_flow.principal_authority_totality`, `authorization_and_sensitive_flow.authorization_decision_closure`, `authorization_and_sensitive_flow.classification_closure`, `authorization_and_sensitive_flow.policy_assignment_closure`, `authorization_and_sensitive_flow.no_unauthorized_public_flow`, `authorization_and_sensitive_flow.witness_replay_closure`
- replayStepIds: `authorization-sensitive-flow.identity`, `authorization-sensitive-flow.flows`
- witnessArtifactPaths: `.engi/identity-bindings.json`, `.engi/authorization-decisions.json`, `.engi/sensitive-data-flow.json`, `.engi/identity-authorization-proof.json`, `.engi/sensitive-data-flow-proof.json`, `.engi/authorization-and-sensitive-flow-proof.json`
- what it proves: principals, authority, classification, retention/disclosure policy, and sensitive-flow records remain mutually consistent and forbid unauthorized public flow.
- how current closure is carried: identity bindings and authorization decisions close the identity step, while sensitive-data flow records and their proofs close classification and policy assignment.
- current member verdict shape: `memberId`, `passed`.
- current theorem-to-replay grouping: principal-authority and authorization-decision closure bind to `identity`; classification, policy assignment, and no-unauthorized-public-flow bind to `flows`; witness/replay closure spans both steps.
- generated-artifact and test bindings: family proof object, `_PROVEN_` detail tables, inherited V19 matrices, deterministic replay, and projection/operator tests that depend on principled disclosure boundaries.
- fail-closed conditions: missing principal bindings, inconsistent authorization decisions, classification/policy drift, sensitive-flow omission, or evidence that public projection exposes unauthorized private material.

#### B.7 Settlement-source-to-shares

- proofArtifactPath: `.engi/settlement-source-to-shares-proof.json`
- current source basis: `engi-demo/src/canonical/settlement.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/canonical/proven-generator.js`
- members: `contribution`, `clipping`, `normalization`, `participation`, `allocation`, `journal`, `settlement-proof`
- theoremIds: `settlement_source_to_shares.contribution_totality`, `settlement_source_to_shares.clipping_determinism`, `settlement_source_to_shares.normalization_exactness`, `settlement_source_to_shares.participation_totality`, `settlement_source_to_shares.allocation_conservation`, `settlement_source_to_shares.journal_completeness`, `settlement_source_to_shares.settlement_theorem_integrity`
- replayStepIds: `settlement-source-to-shares.contribution-allocation`, `settlement-source-to-shares.journal-theorem`
- witnessArtifactPaths: `.engi/source-to-shares.json`, `.engi/settlement-participation.json`, `.engi/accounting-precision-report.json`, `.engi/journal-diff.json`, `.engi/journal-completeness-proof.json`, `.engi/settlement-proof.json`, `.engi/settlement-source-to-shares-proof.json`
- what it proves: contribution, clipping, normalization, participation, allocation, journal completeness, and settlement proof remain exact and conservation-safe.
- how current closure is carried: source-to-shares, settlement participation, accounting precision, journal diff, journal-completeness proof, and settlement proof are reconciled by the family proof.
- current member verdict shape: `memberId`, `passed`.
- current theorem-to-replay grouping: contribution/clipping/normalization/participation/allocation closure bind to `contribution-allocation`; journal completeness and settlement theorem integrity bind to `journal-theorem`.
- generated-artifact and test bindings: family proof object, `_PROVEN_` detail tables, inherited V19 matrices, deterministic replay, settlement/accounting unit tests, and integration checks over exact journal balance and source-to-shares replay traces.
- fail-closed conditions: conservation drift, normalization mismatch, participation/allocation disagreement, incomplete journal evidence, or settlement-proof artifacts that do not bind back to accounting precision and journal state.

#### B.8 Disclosure-boundary

- proofArtifactPath: `.engi/disclosure-boundary-proof.json`
- current source basis: `engi-demo/src/canonical/projections.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/canonical/proven-generator.js`
- members: `projection-policy`, `bounded-public-proof`, `redaction-proof`, `disclosure-proof`
- theoremIds: `disclosure_boundary.projection_policy_closure`, `disclosure_boundary.bounded_public_metadata_only`, `disclosure_boundary.redaction_alignment`, `disclosure_boundary.disclosure_verdict_alignment`, `disclosure_boundary.witness_replay_closure`
- replayStepIds: `disclosure-boundary.policy-bounded-public`, `disclosure-boundary.redaction-disclosure`
- witnessArtifactPaths: `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/redaction-proof.json`, `.engi/disclosure-proof.json`, `.engi/disclosure-boundary-proof.json`
- what it proves: projection policy, bounded-public proof, redaction proof, and disclosure verdicts remain aligned and keep lower-privilege views inside their contractual boundary.
- how current closure is carried: projection policy and bounded-public proof close the public-policy step, while redaction and disclosure proofs close the redaction/disclosure step.
- current member verdict shape: `memberId`, `passed`.
- current theorem-to-replay grouping: projection policy closure and bounded-public metadata-only bind to `policy-bounded-public`; redaction alignment, disclosure verdict alignment, and witness/replay closure bind to `redaction-disclosure`.
- generated-artifact and test bindings: family proof object, `_PROVEN_` detail tables, inherited V19 matrices, deterministic replay, projection-quality smoke, accessibility posture, and E2E checks over visible artifacts by principal.
- fail-closed conditions: projection-policy drift, bounded-public overexposure, redaction/disclosure inconsistency, or replay evidence that lower-privilege principals can observe forbidden source-bearing artifacts.

#### B.9 Proof-contract

- proofArtifactPath: `.engi/proof-contract.json`
- current source basis: `engi-demo/src/canonical/proof-annotations.js`, `engi-demo/src/canonical/proof-materialization.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/canonical/proven-generator.js`
- members: `proof-contract`, `evidence-chain`, `theorem-checks`, `system-proof-bundle`, `witness-manifest-closure`
- theoremIds: `proof_contract.contract_materialization`, `proof_contract.evidence_chain_closure`, `proof_contract.theorem_check_binding`, `proof_contract.bundle_coherence`, `proof_contract.witness_manifest_coherence`, `proof_contract.replay_closure`
- replayStepIds: `proof-contract.contract-materialization`, `proof-contract.evidence-chain`, `proof-contract.bundle-witness`
- witnessArtifactPaths: `.engi/proof-contract.json`, `.engi/system-proof-bundle.json`, `.engi/proof-witness-manifest.json`
- what it proves: proof contracts, evidence chains, theorem bindings, bundle coherence, and witness-manifest closure remain intact across the whole system proof surface.
- how current closure is carried: theorem verdicts, artifact bindings, replay steps, the system proof bundle, and the proof witness manifest are reconciled by shared ids and artifact paths.
- current member verdict shape: `memberId`, `passed`.
- current theorem-to-replay grouping: contract materialization binds to `contract-materialization`; evidence-chain closure and theorem-check binding bind to `evidence-chain`; bundle coherence, witness-manifest coherence, and replay closure bind to `bundle-witness`.
- generated-artifact and test bindings: proof-contract artifact, system proof bundle, witness manifest, `_PROVEN_` detail tables, inherited V19 matrices, deterministic replay, negative mutation, and `engi-demo/test/proven-generator.test.js`.
- fail-closed conditions: missing theorem bindings, contract/bundle/witness path drift, replay-step omissions, or proof-manifest disagreement about required artifacts.

### Appendix C. Generated artifact contract catalog

#### C.0 Exact generated-artifact inventory matrix

| Artifact path | Id | Family | Canonical role | Source-bearing generator or entrypoint | Primary validating command |
| --- | --- | --- | --- | --- | --- |
| `ENGI_SPEC_V20_PROVEN.md` | `v20-proven-appendix` | generated appendix | active generated proof appendix inherited into V21 drafting | `scripts/generate-engi-proven.mjs`, `engi-demo/src/canonical/proven-generator.js` | `node scripts/generate-engi-proven.mjs --version V20 --commit <sha> --check` |
| `.engi/v19-proof-member-semantic-matrix.json` | `v19-proof-member-semantic-matrix` | V19 reproducible canon | inherited positive proof-member matrix | `engi-demo/src/canonical/v19-canon.js` | `npm --prefix engi-demo run test:proof-member-matrix` |
| `.engi/v19-theorem-evidence-matrix.json` | `v19-theorem-evidence-matrix` | V19 reproducible canon | inherited theorem-evidence matrix | `engi-demo/src/canonical/v19-canon.js` | `npm --prefix engi-demo run test:theorem-evidence-matrix` |
| `.engi/v19-state-machine-matrix.json` | `v19-state-machine-matrix` | V19 reproducible canon | inherited state-machine matrix | `engi-demo/src/canonical/v19-canon.js` | `npm --prefix engi-demo run test:state-machine` |
| `.engi/v19-negative-proof-mutation-matrix.json` | `v19-negative-proof-mutation-matrix` | V19 reproducible canon | representative fail-closed mutation matrix | `engi-demo/src/canonical/v19-canon.js` | `npm --prefix engi-demo run test:negative-mutation-matrix` |
| `.engi/v19-deterministic-replay-report.json` | `v19-deterministic-replay-report` | V19 reproducible canon | byte-equality replay report | `engi-demo/src/canonical/v19-canon.js` | `npm --prefix engi-demo run test:deterministic-replay` |
| `.engi/v19-volatility-inventory.json` | `v19-volatility-inventory` | V19 reproducible canon | volatility classification inventory | `engi-demo/src/canonical/v19-canon.js` | `npm --prefix engi-demo run test:volatility` |
| `.engi/v19-contract-change-ledger.json` | `v19-contract-change-ledger` | V19 reproducible canon | generated contract-delta ledger | `engi-demo/src/canonical/v19-canon.js` | `npm --prefix engi-demo run test:contract-ledger` |
| `.engi/v20-operator-acceptance-transcript.json` | `v20-operator-acceptance-transcript` | V20 operator quality | required operator transcript | `engi-demo/src/canonical/v20-quality.js` | `npm --prefix engi-demo run test:v20-operator-transcript` |
| `.engi/v20-visual-regression-report.json` | `v20-visual-regression-report` | V20 operator quality | deterministic visual signature budget | `engi-demo/src/canonical/v20-quality.js` | `npm --prefix engi-demo run test:v20-visual` |
| `.engi/v20-accessibility-report.json` | `v20-accessibility-report` | V20 operator quality | deterministic accessibility budget | `engi-demo/src/canonical/v20-quality.js` | `npm --prefix engi-demo run test:v20-accessibility` |
| `.engi/v20-performance-budget-report.json` | `v20-performance-budget-report` | V20 operator quality | normalized local performance budget | `engi-demo/src/canonical/v20-quality.js` | `npm --prefix engi-demo run test:v20-performance` |
| `.engi/v20-projection-quality-smoke-matrix.json` | `v20-projection-quality-smoke-matrix` | V20 operator quality | projection-quality smoke matrix | `engi-demo/src/canonical/v20-quality.js` | `npm --prefix engi-demo run test:v20-projection-quality` |
| `.engi/v20-quality-summary.json` | `v20-quality-summary` | V20 operator quality | aggregate quality closure | `engi-demo/src/canonical/v20-quality.js` | `npm --prefix engi-demo run test:v20-quality-summary` |
| `ENGI_SPEC_V21_PROVEN.md` | `v21-proven-appendix` | V21 generated appendix | promoted V21 appendix inheriting V19/V20 closure and inventorying V21 specifying artifacts | `scripts/generate-engi-proven.mjs`, `engi-demo/src/canonical/proven-generator.js` | `node scripts/generate-engi-proven.mjs --version V21 --commit <sha> --check` |
| `.engi/v21-spec-family-report.json` | `v21-spec-family-report` | V21 specifying | executable structural and density verdict over the V21 hand-authored file family | `engi-demo/src/canonical/v21-specifying.js` | `node scripts/check-engi-spec-family.mjs --version V21 --mode draft --current-target V20` |
| `.engi/v21-canonical-input-report.json` | `v21-canonical-input-report` | V21 specifying | executable verdict over the active pointed canonical input family | `engi-demo/src/canonical/v21-specifying.js` | `node scripts/check-engi-canonical-inputs.mjs --current-target V21` |

#### C.1 Inherited V19 reproducible-canon artifacts

| Artifact path | Id | Canonical role | Current source basis |
| --- | --- | --- | --- |
| `.engi/v19-proof-member-semantic-matrix.json` | `v19-proof-member-semantic-matrix` | inherited positive proof-member matrix over V18 baseline | `engi-demo/src/canonical/v19-canon.js` |
| `.engi/v19-theorem-evidence-matrix.json` | `v19-theorem-evidence-matrix` | inherited positive theorem-evidence matrix | `engi-demo/src/canonical/v19-canon.js` |
| `.engi/v19-state-machine-matrix.json` | `v19-state-machine-matrix` | inherited positive state-machine matrix | `engi-demo/src/canonical/v19-canon.js` |
| `.engi/v19-negative-proof-mutation-matrix.json` | `v19-negative-proof-mutation-matrix` | representative fail-closed mutation matrix | `engi-demo/src/canonical/v19-canon.js` |
| `.engi/v19-deterministic-replay-report.json` | `v19-deterministic-replay-report` | byte-equality deterministic replay proof | `engi-demo/src/canonical/v19-canon.js` |
| `.engi/v19-volatility-inventory.json` | `v19-volatility-inventory` | volatility classification over canonical artifacts | `engi-demo/src/canonical/v19-canon.js` |
| `.engi/v19-contract-change-ledger.json` | `v19-contract-change-ledger` | contract-delta ledger from inherited V18 baseline to V19 | `engi-demo/src/canonical/v19-canon.js` |

#### C.2 Inherited V20 operator-quality artifacts

| Artifact path | Id | Canonical role | Current source basis |
| --- | --- | --- | --- |
| `.engi/v20-operator-acceptance-transcript.json` | `v20-operator-acceptance-transcript` | executable operator-review transcript over required flows | `engi-demo/src/canonical/v20-quality.js` |
| `.engi/v20-visual-regression-report.json` | `v20-visual-regression-report` | deterministic DOM/geometry visual signature budget | `engi-demo/src/canonical/v20-quality.js` |
| `.engi/v20-accessibility-report.json` | `v20-accessibility-report` | deterministic accessibility budget | `engi-demo/src/canonical/v20-quality.js` |
| `.engi/v20-performance-budget-report.json` | `v20-performance-budget-report` | normalized local performance-budget report without raw timings | `engi-demo/src/canonical/v20-quality.js` |
| `.engi/v20-projection-quality-smoke-matrix.json` | `v20-projection-quality-smoke-matrix` | representative operator-quality matrix across principals | `engi-demo/src/canonical/v20-quality.js` |
| `.engi/v20-quality-summary.json` | `v20-quality-summary` | aggregate summary over all V20 quality gates and inherited V19 closure | `engi-demo/src/canonical/v20-quality.js` |

#### C.3 Shared generated-artifact fields

At minimum, current generated canonical artifacts use or require the following common fields:
- `version`
- `reportId` or `matrixId`
- `proofSourceCommit`
- `generatedAt`
- `generatorId`
- `worktreeState`
- `replayContext`
- `scenarioIds`
- `branchModes`
- `projectionPrincipals` where projection-aware
- `passed`
- `blockingFailureCount`
- `acceptedExclusionCount`

#### C.4 Artifact-specific generated payload fields

Current required artifact-specific payload fields include:
- V19 positive matrices: `cells`, `failedCells`, `acceptedExclusions`, cell-count summaries, inherited baseline counts
- V19 negative mutation matrix: mutation classes, unexpected pass/error cells, omitted cross-products
- V19 deterministic replay report: first/second artifact digests and byte-equality verdicts
- V19 volatility inventory: classified field findings and blocking volatility inventory
- V19 contract-change ledger: matrix deltas, artifact deltas, proof-catalog delta
- V20 transcript: `flowId`, `stepId`, `visibleTruths`, `proofDependencies`, `generatedEvidenceRefs`, `flowCount`, `stepCount`
- V20 visual report: `stateId`, panel-order signature, state-count summary, signature mode, screenshot mode
- V20 accessibility report: `checkId`, keyboard/focus/landmark/toggle/contrast/reduced-motion/projection-safety findings, `checkCount`
- V20 performance report: `operationId`, budgets, normalized elapsed classes, `operationCount`
- V20 projection-quality smoke matrix: principal cells and `cellCount`
- V20 quality summary: `qualityReportCount`, inherited closure fields, generated artifact count, blocking failure inventory
- V21 spec-family report: `checkedVersion`, `mode`, `currentTarget`, `pointerVersion`, required section/path counts, and failure inventory
- V21 canonical-input report: `checkedTargetVersion`, `pointerVersion`, `specPath`, `provenPath`, `parityPath`, `requiredGeneratedArtifactPaths`, `requiredGeneratedArtifactCount`, and failure inventory

#### C.5 Artifact confidentiality and disclosability taxonomy

The current generated proof/artifact space uses the following confidentiality classes:

| Sensitive-data class | Representative artifact paths | Disclosable |
| --- | --- | --- |
| `private-proof-artifact` | `.engi/proof-contract.json`, `.engi/system-proof-bundle.json`, `.engi/inference-synthesis-proof.json`, `.engi/authorization-decisions.json`, `.engi/source-to-shares.json` | `false` |
| `bounded-public-proof-metadata` | `.engi/bounded-public-proof.json`, `.engi/disclosure-proof.json`, `.engi/projection-policy.json`, `.engi/static-measurement-report.json`, `.engi/prompt-completeness-proof.json` | `true` |
| `licensed-source-material` | `.engi/selected-source-material.json` | `false` |
| `settlement-preview` | `.engi/settlement-participation.json` | `false` |
| `verification-evidence` | `.engi/verification-report.json` | `false` |

#### C.6 V21 specifying generated artifacts

| Artifact path | Id | Canonical role | Current source basis |
| --- | --- | --- | --- |
| `.engi/v21-spec-family-report.json` | `v21-spec-family-report` | executable structural and density verdict over the V21+ hand-authored canonical file family | `engi-demo/src/canonical/v21-specifying.js` |
| `.engi/v21-canonical-input-report.json` | `v21-canonical-input-report` | executable verdict over the active pointed canonical input family before and after V21 promotion | `engi-demo/src/canonical/v21-specifying.js` |

#### C.7 V21 generated appendix posture

The expected V21 generated appendix posture is:
- a new `ENGI_SPEC_V21_PROVEN.md` should be generated for canonical promotion,
- it should summarize inherited V19 and V20 generated closure,
- it should inventory the V21 specifying artifact pair,
- and it should not silently relabel inherited V20 artifact paths as if they were new V21-quality artifact files.

### Appendix D. Validation and checking gate catalog

| Command | Layer | What it proves | Generated or checked surfaces |
| --- | --- | --- | --- |
| `npm --prefix engi-demo run typecheck` | static typing | typed-contract and TS surface consistency | TypeScript program check |
| `npm --prefix engi-demo run test:unit` | unit | domain, proof, generator, and V21 structural spec-family invariants | unit assertions over runtime and checker surfaces |
| `npm --prefix engi-demo run test:integration` | integration | workflow composition, API truth, state transitions | API/integration surfaces |
| `npm --prefix engi-demo run test:e2e` | browser E2E | operator-facing workflow truth and shell posture | browser-visible system behavior |
| `npm --prefix engi-demo run test:proof-member-matrix` | proof matrix | positive proof-member closure | V19 inherited matrix surfaces |
| `npm --prefix engi-demo run test:theorem-evidence-matrix` | proof matrix | theorem-evidence closure | V19 inherited matrix surfaces |
| `npm --prefix engi-demo run test:state-machine` | state machine | state-machine closure | V19 inherited matrix surfaces |
| `npm --prefix engi-demo run test:deterministic-replay` | reproducibility | byte-equality deterministic replay | `.engi/v19-deterministic-replay-report.json` |
| `npm --prefix engi-demo run test:volatility` | reproducibility | volatility classification and fail-closed volatility findings | `.engi/v19-volatility-inventory.json` |
| `npm --prefix engi-demo run test:negative-mutation-matrix` | fail-closed mutation | representative mutation rejection | `.engi/v19-negative-proof-mutation-matrix.json` |
| `npm --prefix engi-demo run test:contract-ledger` | contract delta | generated contract-change ledger and promotion dry-run plan | `.engi/v19-contract-change-ledger.json`, promotion dry-run output |
| `npm --prefix engi-demo run test:v20-operator-transcript` | operator quality | required operator transcript flows | `.engi/v20-operator-acceptance-transcript.json` |
| `npm --prefix engi-demo run test:v20-accessibility` | operator quality | deterministic accessibility budget | `.engi/v20-accessibility-report.json` |
| `npm --prefix engi-demo run test:v20-visual` | operator quality | deterministic visual signature budget | `.engi/v20-visual-regression-report.json` |
| `npm --prefix engi-demo run test:v20-performance` | operator quality | normalized local performance-budget truth | `.engi/v20-performance-budget-report.json` |
| `npm --prefix engi-demo run test:v20-projection-quality` | operator quality | principal-bounded UI quality smoke matrix | `.engi/v20-projection-quality-smoke-matrix.json` |
| `npm --prefix engi-demo run test:v20-quality-summary` | operator quality | aggregate quality-summary closure | `.engi/v20-quality-summary.json` |
| `npm --prefix engi-demo test` | aggregate non-E2E suite | all serial non-E2E system tests | full test aggregation |
| `node scripts/check-engi-spec-family.mjs --version V21 --mode draft --current-target V20` | V21 specifying | current draft V21 file-family completeness and whole-spec structure | hand-authored V21 family |
| `node scripts/check-engi-canonical-inputs.mjs --current-target V20` | V21 specifying | active-canon drafting inputs exist before V21 promotion proceeds | pointed `SPEC`, `_PROVEN_`, parity input, and current generated artifact family |
| `node scripts/prepare-engi-spec-family-promotion.mjs --version V21 --commit <sha>` | V21 specifying | hand-authored V21 status truth is rewritten into promoted posture before pointer advancement | V21 `SPEC`, `DELTA`, and `PARITY_MATRIX` status blocks |
| `node scripts/check-engi-canonical-inputs.mjs --current-target V21` | V21 specifying | newly pointed V21 canon exposes the generated appendix and V21 specifying artifact pair after promotion generation | pointed V21 `SPEC`, `_PROVEN_`, parity input, `.engi/v21-*` specifying artifacts |
| `node scripts/check-engi-spec-family.mjs --version V21 --mode promoted` | V21 specifying | promoted-mode stale-status and family completeness | hand-authored promoted V21 family |
| `node scripts/generate-engi-proven.mjs --version VN --commit <sha> --check` | generated canon | `_PROVEN_` and emitted artifacts are current for the proof-source commit | generated appendix and emitted artifacts |
| `npm run promote:canon -- --version VN --commit <sha>` | promotion | full canonical promotion sequencing | pointer mutation, generated appendix, all configured gates |

### Appendix E. Current canonical source map

| Path | Layer | Current canonical responsibility |
| --- | --- | --- |
| `engi-demo/src/engi-core.js` | core primitives | canonical hashing, canonical json, tokenization, ranking, measurement normalization, issuance, allocation |
| `engi-demo/src/engi-demo.js` | runtime orchestration | deposit, need measurement, recall/evaluation, asset pack assembly, settlement, proof-bearing run orchestration, public state |
| `engi-demo/src/demo-shell-state.js` | operator projection | projected latest-run, public summaries, public artifact inventory, profile composition surfaces |
| `engi-demo/src/canonical/type-contracts.ts` | typed contracts | branded ids, prompt/evaluator contracts, projection policy, settlement participation structs |
| `engi-demo/src/canonical/types.js` | jsdoc types | depositing/needing/fit/host-capability typed vocabulary |
| `engi-demo/src/canonical/surfaces.js` | surface builders | deposit, fit, repo supply, auth, addressing, signing, candidate asset, identity, buyer, and need shapes |
| `engi-demo/src/canonical/need-measurement.js` | need canon | measured-need runtime and prompt/inference/static measurement orchestration |
| `engi-demo/src/canonical/prompting.js` | prompt canon | prompt contracts, prompt surfaces, evaluator surfaces, parsed completion envelopes, prompt-completeness proof |
| `engi-demo/src/canonical/evaluation-materialization.js` | evaluation/materialization | ranking/verification/materialization runtime closure |
| `engi-demo/src/canonical/projections.js` | disclosure/projection | projection policy, bounded-public proof, redaction proof, disclosure proof |
| `engi-demo/src/canonical/settlement.js` | settlement | settlement runtime and source-to-shares exactness |
| `engi-demo/src/canonical/proof-annotations.js` | theorem/proof schema | theorem verdicts, replay steps, artifact bindings, closure computation |
| `engi-demo/src/canonical/proof-materialization.js` | proof bundle | materialized proof bundle and witness structures |
| `engi-demo/src/canonical/run-artifacts.js` | artifact cataloging | proof family catalog entries, telemetry, artifact/witness materialization helpers |
| `engi-demo/src/canonical/v18-matrices.js` | inherited positive matrices | proof-member, theorem-evidence, and state-machine matrix generation |
| `engi-demo/src/canonical/v19-canon.js` | reproducible canon | V19 generated artifacts, deterministic replay, volatility, negative mutation, contract ledger |
| `engi-demo/src/canonical/v20-quality.js` | operator quality | V20 quality replay context and report generation |
| `engi-demo/src/canonical/v21-specifying.js` | V21 specifying support | V21 spec-family reports, canonical-input reports, and `.engi/v21-*` generated artifact contents |
| `engi-demo/src/canonical/proven-generator.js` | appendix generation | aggregate proof collection and markdown rendering for `_PROVEN_` |
| `scripts/generate-engi-proven.mjs` | root generation entrypoint | generated appendix and emitted artifact write/check flow |
| `scripts/check-engi-spec-family.mjs` | V21 specifying enforcement | structural checking of V21+ hand-authored spec family |
| `scripts/check-engi-canonical-inputs.mjs` | V21 specifying enforcement | active-canon input validation for pointed `SPEC`, `_PROVEN_`, parity, and required generated artifact family |
| `scripts/prepare-engi-spec-family-promotion.mjs` | V21 specifying enforcement | promotion-time rewrite of hand-authored V21 status truth before pointer advancement |
| `scripts/promote-engi-canon.mjs` | canonical promotion | promotion sequencing, pointer mutation, generated appendix generation, command-plan emission |
| `engi-demo/test/proven-generator.test.js` | generator verification | `_PROVEN_` rendering stability and fail-closed drift detection |
| `engi-demo/test/v21-specifying.test.js` | V21 specifying verification | checker passes/fails on real and fixture spec families |
| `engi-demo/test/v20-*.test.js` | operator-quality verification | V20 quality artifact correctness |
| `engi-demo/test/api.test.js`, `workflow.integration.test.js`, `state-machine.integration.test.js`, `e2e.test.js` | realization validation | API, integration, state-machine, and browser truth |

### Appendix F. Subsystem totality and derivability matrix

This appendix exists so whole-system omission becomes visible.
Each row names a required subsystem coverage item, its current canonical contracts or artifacts, its current closure basis, its validating commands, and its current source-bearing implementation paths.

| Subsystem or concern | Current canonical contracts or artifacts | Current closure basis | Generated/runtime evidence | Validating commands | Current source basis |
| --- | --- | --- | --- | --- | --- |
| repo supply and depositing | `DepositingSurface`, `RepoSupplyStateShape`, `RepoArtifactInventoryEntryShape`, `ArtifactSelectionSurface`, `CandidateAssetShape` | deposit traceability and asset identity survive into selection, proof, and settlement | selected inventory refs, candidate asset surfaces, repo inventory entries | `npm --prefix engi-demo run test:unit`, `npm --prefix engi-demo run test:integration`, `npm --prefix engi-demo run test:e2e` | `engi-demo/src/engi-demo.js`, `engi-demo/src/canonical/surfaces.js`, `engi-demo/src/canonical/types.js` |
| needing and measured demand | `NeedingSurface`, `NeedShape`, `NeedMeasurementRuntime`, prompt-owned and inferred measurement fields | prompt-completeness and inference-synthesis closure over measured need | prompt contracts, parsed envelopes, inference proofs, need surfaces | `npm --prefix engi-demo run test:unit`, `npm --prefix engi-demo run test:proof-member-matrix`, `npm --prefix engi-demo run test:theorem-evidence-matrix` | `engi-demo/src/canonical/need-measurement.js`, `engi-demo/src/canonical/prompting.js`, `engi-demo/src/engi-demo.js` |
| prompt/inference/evaluator ownership | `EvaluatorSurfaceContract`, `PromptContractShape`, `PromptSurfaceLineage`, `ParsableCompletionContract`, `ParsedCompletionEnvelope` | `prompt-completeness`, `inference-synthesis` | `.engi/prompt-contracts.json`, `.engi/prompt-surfaces.json`, `.engi/parsed-completion-envelopes.json`, `.engi/inference-proofs.json` | `npm --prefix engi-demo run test:unit`, `npm --prefix engi-demo run test:proof-member-matrix`, `npm --prefix engi-demo run test:theorem-evidence-matrix` | `engi-demo/src/canonical/prompting.js`, `engi-demo/src/canonical/type-contracts.ts` |
| depositing-to-needing fit | `DepositingToNeedingSurface`, fit summaries, decisive kinds, overlap kinds, normalization pressure | fit remains explicit rather than absorbed into ranking summaries | deposit-to-need relation surfaces and branch/proof/settlement intent summaries | `npm --prefix engi-demo run test:integration`, `npm --prefix engi-demo run test:e2e` | `engi-demo/src/canonical/surfaces.js`, `engi-demo/src/engi-demo.js` |
| recall and ranking | candidate recall set, ranking scores, use-tier distinction, selection labels | ranking remains distinct from verification and materialization | evaluated candidate summaries and selected candidate surfaces | `npm --prefix engi-demo run test:integration`, `npm --prefix engi-demo run test:e2e` | `engi-demo/src/engi-demo.js`, `engi-demo/src/engi-core.js` |
| verification decisions | verification receipts, verification report, `AuthorizationDecisionShape`-adjacent use decisions, issuance/provenance/sufficiency verdicts | `verification-decisions` | `.engi/verification-report.json`, `.engi/verification-receipts.json`, `.engi/verification-decisions-proof.json` | `npm --prefix engi-demo run test:proof-member-matrix`, `npm --prefix engi-demo run test:theorem-evidence-matrix`, `npm --prefix engi-demo run test:integration` | `engi-demo/src/canonical/evaluation-materialization.js`, `engi-demo/src/engi-demo.js` |
| selection and materialization | `SelectedCandidateShape`, `AssetPackShape`, `BranchArtifactsShape`, lock, selected source material, exclusions, visibility proofs | `selection-and-materialization` | `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json`, `.engi/materialization-exclusions.json`, `.engi/materialization-proof.json` | `npm --prefix engi-demo run test:proof-member-matrix`, `npm --prefix engi-demo run test:integration`, `npm --prefix engi-demo run test:e2e` | `engi-demo/src/canonical/evaluation-materialization.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/engi-demo.js` |
| branch artifacts and deliverables | branch name, confidentiality, emitted files, deliverable inventory, bounded public proof carrier | materialization proof plus disclosure-boundary alignment | branch artifacts, proof manifests, bounded public proof | `npm --prefix engi-demo run test:integration`, `npm --prefix engi-demo run test:e2e`, `npm --prefix engi-demo run test:v20-operator-transcript` | `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/demo-shell-state.js`, `engi-demo/src/engi-demo.js` |
| identity, authority, signing, and policy | `IdentityBindingShape`, `AuthorizationDecisionShape`, `SigningSurface`, `GithubAppAuthSurface`, `ProjectionPrincipalPolicy` | `authorization-and-sensitive-flow`, `disclosure-boundary` | identity bindings, authorization decisions, signing/auth surfaces, projection policy | `npm --prefix engi-demo run test:unit`, `npm --prefix engi-demo run test:e2e`, `npm --prefix engi-demo run test:v20-projection-quality` | `engi-demo/src/canonical/surfaces.js`, `engi-demo/src/canonical/projections.js`, `engi-demo/src/demo-shell-state.js` |
| sensitive data and confidentiality flows | confidentiality classes, retention/disclosure rules, sensitive flow surfaces | `authorization-and-sensitive-flow` | `.engi/sensitive-data-flow.json`, `.engi/sensitive-data-flow-proof.json`, authorization proof artifacts | `npm --prefix engi-demo run test:proof-member-matrix`, `npm --prefix engi-demo run test:theorem-evidence-matrix`, `npm --prefix engi-demo run test:v20-projection-quality` | `engi-demo/src/canonical/projections.js`, `engi-demo/src/canonical/proof-materialization.js` |
| projection, disclosure, and redaction | `ProjectionArtifactRule`, `ProjectionPolicyShape`, bounded public proof, redaction proof, disclosure proof | `disclosure-boundary` | `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/redaction-proof.json`, `.engi/disclosure-proof.json` | `npm --prefix engi-demo run test:e2e`, `npm --prefix engi-demo run test:v20-accessibility`, `npm --prefix engi-demo run test:v20-projection-quality` | `engi-demo/src/canonical/projections.js`, `engi-demo/src/demo-shell-state.js` |
| proof families, members, theorems, witnesses, and replay | system proof bundle, theorem verdicts, family verdicts, witness manifest, replay step ids | `proof-contract` plus full Appendix B family inventory | `.engi/system-proof-bundle.json`, `.engi/proof-witness-manifest.json`, `_PROVEN_` family sections | `npm --prefix engi-demo run test:proof-member-matrix`, `npm --prefix engi-demo run test:theorem-evidence-matrix`, `npm --prefix engi-demo run test:state-machine`, `npm --prefix engi-demo run test:unit` | `engi-demo/src/canonical/proof-annotations.js`, `engi-demo/src/canonical/proof-materialization.js`, `engi-demo/src/canonical/run-artifacts.js` |
| settlement, source-to-shares, journals, and exact accounting | `SettlementParticipationStruct`, settlement preview, source-to-shares, journal diff, accounting precision report | `settlement-source-to-shares` | `.engi/source-to-shares.json`, `.engi/settlement-participation.json`, `.engi/journal-diff.json`, `.engi/accounting-precision-report.json`, `.engi/settlement-proof.json` | `npm --prefix engi-demo run test:unit`, `npm --prefix engi-demo run test:integration`, `npm --prefix engi-demo run test:proof-member-matrix` | `engi-demo/src/canonical/settlement.js`, `engi-demo/src/settlement-structs.js`, `engi-demo/src/engi-demo.js` |
| telemetry, persistence, state, and failure semantics | latest-run state, API state, state-machine truth, failure-mode summaries, reset semantics | V19 state-machine matrix plus runtime/state tests | `.engi/v19-state-machine-matrix.json`, API responses, shell latest-run projections | `npm --prefix engi-demo run test:integration`, `npm --prefix engi-demo run test:state-machine`, `npm --prefix engi-demo run test:e2e` | `engi-demo/src/engi-demo.js`, `engi-demo/server.js`, `engi-demo/src/demo-shell-state.js` |
| host/runtime capability truth | `HostCapabilityRequirement`, execution reality, required/supporting programs, telemetry surfaces | host capability requirement remains explicit in types and realization | host capability surfaces and safety notes | `npm --prefix engi-demo run test:unit`, `npm --prefix engi-demo run typecheck` | `engi-demo/src/canonical/types.js`, `engi-demo/src/canonical/type-contracts.ts` |
| operator experience and pedagogy | operator transcript flows, labels, projected latest-run surfaces, public artifact inventory, role/audience meanings | inherited V20 operator-quality closure | `.engi/v20-operator-acceptance-transcript.json`, `.engi/v20-accessibility-report.json`, `.engi/v20-visual-regression-report.json` | `npm --prefix engi-demo run test:e2e`, `npm --prefix engi-demo run test:v20-operator-transcript`, `npm --prefix engi-demo run test:v20-accessibility`, `npm --prefix engi-demo run test:v20-visual` | `engi-demo/src/demo-shell-state.js`, `engi-demo/server.js`, `engi-demo/test/e2e.test.js` |
| validation and test stack | full gate inventory, proof matrices, replay, volatility, mutation, quality reports, spec-family checks | Appendix D gate catalog and inherited V19/V20 gate closure | `.engi/v19-*`, `.engi/v20-*`, V21 checker output, `_PROVEN_` summaries | `npm --prefix engi-demo run test:unit`, `npm --prefix engi-demo run test:integration`, `npm --prefix engi-demo run test:e2e`, `npm --prefix engi-demo test`, `node scripts/check-engi-spec-family.mjs --version V21 --mode draft --current-target V20` | `engi-demo/test/*.test.js`, `scripts/check-engi-spec-family.mjs`, `scripts/generate-engi-proven.mjs` |
| generated artifacts and canonical promotion | `_PROVEN_`, `.engi/v19-*`, `.engi/v20-*`, `.engi/v21-*`, proof-source commit rule, commit-body rule, pointer mutation rule, post-generation active-canon validation | generated canon plus promotion canon | generated appendix, replay reports, quality reports, V21 specifying reports, promotion dry-run plan | `node scripts/generate-engi-proven.mjs --version VN --commit <sha> --check`, `node scripts/check-engi-canonical-inputs.mjs --current-target V21`, `npm run promote:canon -- --version VN --commit <sha>`, `git diff --check` | `engi-demo/src/canonical/proven-generator.js`, `engi-demo/src/canonical/v19-canon.js`, `engi-demo/src/canonical/v20-quality.js`, `engi-demo/src/canonical/v21-specifying.js`, `scripts/promote-engi-canon.mjs` |

### Appendix G. Canonical file-family and promotion contract catalog

#### G.1 Exact file-family responsibility matrix

| File or artifact family | Canonical role | Must carry | Must not carry |
| --- | --- | --- | --- |
| `ENGI_SPEC_VN.md` | full current system canon | whole-system semantics, current contracts, generated-canon rules, validation gates, promotion rules, accepted boundaries | omitted current system semantics delegated only to companion files |
| `ENGI_SPEC_VN_DELTA.md` | version-local delta and decision record | accepted decisions, refinements, changed contracts, changed gates, accepted boundaries, commit-body inputs | sole copy of enduring current system semantics |
| `ENGI_SPEC_VN_PARITY_MATRIX.md` | source/generated/test/promotion truth ledger | implemented/closed/boundary status, validating commands, promotion truth, source gaps | shadow semantic definitions that the main `SPEC` omitted |
| `ENGI_SPEC_VN_NOTES.md` | optional non-canonical working notes | transient findings, sequencing, candidate decisions, unresolved questions | depended-on canon |
| `ENGI_SPEC_VN_PROVEN.md` | generated proof appendix | rendered proof-family/run/report truth for the proof-source commit | hand-authored semantic authority |
| `.engi/vN-*` | generated structured evidence | versioned matrices/reports/check outputs required by canon | hidden semantic contracts known only from JSON |
| `ENGI_SPEC.txt` | sole canonical pointer | active version id only | any other version truth |

#### G.2 Status-truth schema matrix

| Status label | Required in | Draft meaning | Promoted meaning | Enforcement basis |
| --- | --- | --- | --- | --- |
| `Current canonical/latest target` | `SPEC`, `DELTA`, `PARITY_MATRIX` | points to currently active prior canon while draft remains unpromoted | points to the promoted active version | `scripts/check-engi-spec-family.mjs` |
| `Canonical proof-source commit` | promoted `SPEC`, `DELTA`, `PARITY_MATRIX` | absent until promotion-time truth is prepared | exact commit rendered into generated appendix and canonical promotion body | `scripts/prepare-engi-spec-family-promotion.mjs`, `scripts/check-engi-spec-family.mjs` |
| `Prior canonical anchor` | `SPEC`, `DELTA`, `PARITY_MATRIX` | prior promoted spec used as direct anchor | preserved provenance reference | `scripts/check-engi-spec-family.mjs` |
| `Prior generated proof appendix` | `SPEC`, `DELTA`, `PARITY_MATRIX` | currently active generated appendix inherited while drafting | prior generated appendix preserved as provenance after promotion | `scripts/check-engi-spec-family.mjs` |
| `Generated structured artifact inventory` | `SPEC`, `DELTA`, `PARITY_MATRIX` | current active generated canon plus any draft-time version-local generated family | promoted generated canon inventory including current version artifacts | `scripts/check-engi-spec-family.mjs` |
| `Source parity state` | `SPEC`, `DELTA`, `PARITY_MATRIX` | what implementation/generator/promoter support is already landed | promoted statement of aligned source/generator status | `scripts/check-engi-spec-family.mjs` |
| `V21 state` | `SPEC`, `DELTA`, `PARITY_MATRIX` | draft posture and remaining closure work | no draft/pending language; promoted closure truth only | `scripts/check-engi-spec-family.mjs` |

#### G.3 Promotion phase matrix

| Phase | Pointer state | Mutable surfaces | Required validation or output | Fail-closed reason |
| --- | --- | --- | --- | --- |
| draft-family preflight | `ENGI_SPEC.txt = V20` | none | `check-engi-spec-family --mode draft --current-target V20` | prevents structurally incomplete hand-authored V21 family from entering promotion |
| active-canon preflight | `ENGI_SPEC.txt = V20` | none | `check-engi-canonical-inputs --current-target V20` | prevents promotion from starting when current canon inputs are already incomplete |
| inherited proof/quality gates | `ENGI_SPEC.txt = V20` | generated preview outputs only | full inherited test/gate suite | prevents V21 promotion from skipping depended-on V19/V20 canon |
| hand-authored promotion preparation | `ENGI_SPEC.txt = V20` | V21 `SPEC`, `DELTA`, `PARITY_MATRIX` status blocks | `prepare-engi-spec-family-promotion.mjs --version V21 --commit <sha>` | prevents promoted-mode checks from failing only because truthful draft status was never rewritten |
| pointer advancement | mutate to `V21` | `ENGI_SPEC.txt` | pointer write only after preconditions pass | prevents premature pointer mutation |
| generated appendix and artifact emission | `ENGI_SPEC.txt = V21` | `ENGI_SPEC_V21_PROVEN.md`, `.engi/v21-*` | `generate-engi-proven.mjs` write and check mode | prevents stale or missing generated canon |
| newly pointed canon validation | `ENGI_SPEC.txt = V21` | none | `check-engi-canonical-inputs --current-target V21` | prevents pointing at a version whose generated inputs are incomplete |
| promoted family validation | `ENGI_SPEC.txt = V21` | none | `check-engi-spec-family --mode promoted` | prevents stale promoted status or transitional parity judgments |
| final repository hygiene | `ENGI_SPEC.txt = V21` | none | `git diff --check` and commit-body derivation | prevents committing malformed diff or unsupported closure claim |

#### G.4 Canonical commit-body derivation inputs

| Input source | Required contribution to commit body |
| --- | --- |
| `SPEC` scope/status | promoted version center and proof-source commit framing |
| `DELTA` accepted decisions | canonical semantic change bullets |
| `PARITY_MATRIX` implemented/closed rows | concrete implemented closure bullets |
| generated artifact inventory | generated appendix and `.engi/vN-*` family coverage |
| gate catalog | validation summary and promotion evidence |

### Appendix H. Operator surface and quality contract catalog

#### H.1 Operator transcript flow inventory

| flowId | Scenario/principal mode | Required visible truth |
| --- | --- | --- |
| `seeded-shell-posture` | `auth-issuer-rollback` / buyer / patch | active canon, draft target, controls, and eight ordered operator panels are visible |
| `targeted-branch-run` | `auth-issuer-rollback` / buyer / patch | candidate asset growth, selected asset pack, settlement preview, and source-to-shares chain are visible |
| `normalization-branch-run` | `auth-many-asset-normalization` / buyer / context | normalization profile, profile composition, settlement participation, and zero-credit participation are visible |
| `public-privacy-boundary-projection` | `privacy-boundary-proof-export` / public / patch | public projection label is visible and excludes private proof/source artifacts |
| `reviewer-privacy-boundary-projection` | `privacy-boundary-proof-export` / reviewer / patch | reviewer projection label plus proof-family review surface remain visible without raw files |
| `buyer-targeted-projection` | `auth-issuer-rollback` / buyer / patch | buyer projection label plus selected asset/settlement surfaces remain visible without raw files |
| `internal-privacy-boundary-projection` | `privacy-boundary-proof-export` / internal / patch | internal projection exposes selected source material and authorization detail |
| `invalid-deposit-error` | invalid deposit path / buyer / patch | operator sees fail-closed invalid deposit posture |
| `no-survivor-conflict-reset` | no-survivor path / buyer / patch | operator sees no-survivor conflict and reset posture |
| `generated-appendix-report-discovery` | appendix/report discovery / buyer / patch | generated appendix/report references are discoverable from the operator surface |

#### H.2 Visual state inventory

| stateId | Required posture |
| --- | --- |
| `initial-seeded-shell` | summary, control selectors, and ordered panel layout are visible |
| `targeted-branch-run` | asset, fit, evaluation, branch-artifact, settlement, and ledger surfaces are visible |
| `normalization-branch-run` | normalization context branch state remains distinguishable |
| `public-privacy-boundary-projection` | public projection remains bounded |
| `reviewer-privacy-boundary-projection` | reviewer projection remains proof-visible but raw-source-bounded |
| `buyer-targeted-projection` | buyer projection remains richer than public |
| `internal-privacy-boundary-projection` | internal projection exposes internal-only surfaces |
| `invalid-deposit-error` | fail-closed invalid deposit posture is rendered |
| `no-survivor-conflict` | no-survivor error state is rendered |
| `generated-appendix-report-reference` | generated report reference state is rendered |

#### H.3 Accessibility check inventory

| checkId | Canonical concern |
| --- | --- |
| `control-names` | controls expose names |
| `form-labeling` | form controls have visible or programmatic labels |
| `keyboard-operation` | required operator path is keyboard reachable |
| `focus-order` | focus order follows operator workflow |
| `focus-visibility` | focus-visible styling is present |
| `status-announcements` | polite status live region is present |
| `landmarks-and-sections` | header, main, summary, and panels are navigable |
| `toggle-state` | visual/raw toggles expose selected state |
| `contrast` | text and control contrast meet accepted thresholds |
| `reduced-motion` | nonessential motion remains bounded |
| `projection-safety` | lower-privilege accessibility checks do not require forbidden private surfaces |

#### H.4 Performance operation inventory

| operationId | Hard gate | Accepted posture |
| --- | --- | --- |
| `initial-seeded-shell-ready` | `true` | seeded shell must be ready within budget |
| `scenario-switch-summary-update` | `true` | scenario switching updates summary within budget |
| `projection-switch-summary-update` | `true` | projection switching updates summary within budget |
| `targeted-branch-creation` | `true` | representative targeted branch creation remains within budget |
| `normalization-branch-creation` | `true` | normalization-heavy branch creation remains within budget |
| `proof-family-catalog-render-after-branch` | `true` | proof-family catalog render remains within budget |
| `raw-visual-surface-mode-toggle` | `true` | visual/raw surface toggle remains within budget |
| `reset-to-ready-state` | `true` | reset returns shell to ready state within budget |
| `full-quality-suite-duration` | `false` | telemetry-only accepted boundary until stable local baseline is canonized |

#### H.5 Projection-quality principal matrix

| Principal | Required visible surfaces | Forbidden surfaces |
| --- | --- | --- |
| `public` | projection visibility summary, bounded public proof | raw branch files, authorization decisions, inference proofs, proof witness manifest, system proof bundle |
| `reviewer` | projection visibility summary, proof family catalog, theorem/invariant checks | raw branch files, authorization decisions |
| `buyer` | projection visibility summary, selected asset pack, settlement preview | raw branch files |
| `internal` | projection visibility summary, selected source material manifest, authorization decisions | none |

#### H.6 Operator-quality accepted boundaries

| boundaryId | Current accepted rationale |
| --- | --- |
| `full-source-projection-security-matrix-deferred` | V20 inherits fuller projection-matrix coverage from V17 while quality canon remains representative-smoke at first gate |
| `full-mutation-cross-product-deferred` | V20 inherits representative mutation fail-closed coverage from V19 instead of expanding all cross-products here |
| `screenshot-stability-deferred` | deterministic DOM/geometry signatures remain canonical until local CI screenshot stability is accepted |

### Appendix I. Scenario, workflow, and cross-product contract catalog

#### I.1 Realization profile to scenario-family matrix

| Realization profile | profileId | Current scenario families | Branch-mode expectation | Current contract meaning |
| --- | --- | --- | --- | --- |
| `Targeted deposit` | `A` | `monorepo-auth-rollback`, `proof-heavy-rust-validator`, `config-policy-incident`, `unsafe-patch-review`, `infra-deployment-mismatch`, `privacy-boundary-stress` | `patch` is the default delivery mode; `context` remains a depended-on proof/operator replay mode | ENGI is expected to close one decisive remediation need with a tight pack, narrow proof closure, and direct settlement explanation |
| `Normalization deposit` | `B` | `polyglot-repo-benchmark-remediation`, `many-asset-settlement-normalization` | both `patch` and `context` must remain contractually valid because normalization-heavy replay and explanation depend on broader context visibility | ENGI is expected to normalize several overlapping assets, keep source-to-shares intelligible, and preserve contribution/overlap truth |

#### I.2 Current scenario inventory

| scenarioId | scenarioFamily | repo | realization profile | Target artifact kinds | Current proof/operator emphasis |
| --- | --- | --- | --- | --- | --- |
| `auth-issuer-rollback` | `monorepo-auth-rollback` | `frontier/demo-auth` | `A` | `runbook`, `patch`, `config`, `proof` | decisive auth rollback closure with private remediation branch, audit receipt linkage, and settlement explanation |
| `rust-validator-proof-gap` | `proof-heavy-rust-validator` | `frontier/payments-ledger` | `A` | `patch`, `proof`, `runbook` | proof-heavy repair without weakening overflow or replay protections |
| `config-policy-precedence-incident` | `config-policy-incident` | `frontier/policy-control-plane` | `A` | `config`, `runbook`, `patch` | config/policy precedence restoration with receipt and fallback truth |
| `unsafe-patch-review-recovery` | `unsafe-patch-review` | `frontier/review-gateway` | `A` | `runbook`, `patch`, `proof` | unsafe patch containment with review rationale and rollback preservation |
| `infra-deployment-mismatch` | `infra-deployment-mismatch` | `frontier/deploy-orchestrator` | `A` | `runbook`, `config`, `patch` | Terraform/Helm drift repair with reversible rollout and deployment receipts |
| `privacy-boundary-proof-export` | `privacy-boundary-stress` | `frontier/private-proof-service` | `A` | `proof`, `patch`, `runbook` | bounded public proof export, redaction correctness, and disclosure replay closure |
| `polyglot-gateway-benchmark-remediation` | `polyglot-repo-benchmark-remediation` | `frontier/polyglot-gateway` | `B` | `runbook`, `patch`, `config`, `proof` | cross-language parity, rollback reversibility, and receipt-chain coherence across TypeScript/Python/Rust |
| `auth-many-asset-normalization` | `many-asset-settlement-normalization` | `frontier/demo-auth` | `B` | `runbook`, `patch`, `config`, `proof` | many-asset overlap normalization, workflow-run receipt binding, and source-to-shares replay intelligibility |

#### I.3 Workflow-stage and surfaced-truth matrix

| Workflow stage | Current operator line | Current surfaced truths and evidence |
| --- | --- | --- |
| `Openly writable` | Show public commitments and sealed asset posture | deposit supply can be committed broadly while full payload remains sealed; repo/inventory/artifact identity is explicit |
| `Measurably readable` | Run the licensed query for the buyer need and show measured bundle assembly | measured need, fit relation, selected pack, and verification consequences are visible rather than implied |
| `Provable` | Show issuance, ranking explanation, conservation, schema, policy, proof-log, and attestation surfaces | proof-family verdicts, theorem checks, proof contracts, journal invariants, disclosure/redaction posture, and receipts are inspectable |
| `Valuable` | Finish on utility receipt and benchmark-lift meaning | settlement preview, utility receipt, and operator explanation stay tied to benchmark improvement rather than bundle existence alone |

#### I.4 Current required cross-product coverage matrix

| Cross-product | Current basis | Current closure meaning |
| --- | --- | --- |
| `8 scenarios x 2 branch modes` | inherited V19 proof-member/theorem matrices and deterministic replay over `patch` and `context` | proof and replay canon cannot drift by branch mode |
| `2 realization profiles x 8 scenarios` | realization-profile resolver plus current scenario-family inventory | profile identity cannot be implicit or scenario-local guesswork |
| `4 projection principals x required disclosure surfaces` | `public`, `buyer`, `reviewer`, `internal` against projection policy, bounded-public proof, redaction proof, disclosure proof, and V20 quality reports | principal-bounded operator and artifact visibility must stay explicit |
| `4 operator stages x current surfaced truths` | `buildDemoScenario`, operator shell state, transcript flows, and V20 transcript/quality artifacts | pedagogical order and surfaced review truth are canonical, not UI ornament |
| `10 operator transcript flows x required states` | V20 operator transcript and visual/accessibility/performance reports | operator-review posture remains executable rather than prose-only |

### Appendix J. Fail-closed contract and error posture matrix

| Posture id | Trigger | Fail-closed meaning | Current surfaced evidence | Current source basis |
| --- | --- | --- | --- | --- |
| `invalid deposit` | no raw content or repo-authenticated selection survives intake | ENGI must not start a branch run or claim asset-pack closure | operator status `Raw content or repo artifact selection is required`; no latest-run success state | `engi-demo/src/engi-demo.js`, `engi-demo/src/demo-shell-state.js`, `engi-demo/src/canonical/evaluation-materialization.js` |
| `prompt contract incompleteness` | placeholder binding drift, undeclared non-rendered context, or missing contract field ownership | prompt surface is not admissible into proof or inferred-field canon | prompt contract completeness flags and prompt-completeness proof fail | `engi-demo/src/canonical/prompting.js`, `engi-demo/src/canonical/run-artifacts.js` |
| `parsed-envelope inadmissibility` | parsed completion fails schema or strict top-level key rules | parsed completion is rejected rather than silently normalized | parsed envelope `admissible = false` and prompt-completeness theorem failure | `engi-demo/src/canonical/prompting.js`, `engi-demo/src/canonical/run-artifacts.js` |
| `no-survivor asset pack` | verification/selection removes every candidate | ENGI must not claim branch artifacts, selected source, or settlement success | operator status `No candidates survived into the asset pack`; no selection/materialization closure | `engi-demo/src/engi-demo.js`, `engi-demo/src/demo-shell-state.js`, `engi-demo/src/canonical/evaluation-materialization.js` |
| `authorization denial` | principal binding or policy assignment does not justify the requested action | private material stays closed and the denied action cannot be treated as successful | authorization-decision surfaces, identity/authorization proof, and projection posture remain blocking | `engi-demo/src/engi-demo.js`, `engi-demo/src/canonical/proof-materialization.js`, `engi-demo/src/canonical/projections.js` |
| `public projection overexposure` | a non-disclosable artifact would survive into public projection | disclosure closure fails; public surface must remain bounded metadata only | redaction proof, disclosure proof, bounded public proof, and projection-quality checks block success | `engi-demo/src/canonical/projections.js`, `engi-demo/src/demo-shell-state.js`, `engi-demo/src/canonical/v20-quality.js` |
| `settlement conservation drift` | allocation, journal, or settlement proof loses exact conservation/alignment | settlement proof is blocking-failed and journal completeness cannot be claimed | accounting precision report, journal diff, journal-completeness proof, and settlement proof fail | `engi-demo/src/canonical/settlement.js`, `engi-demo/src/settlement-structs.js`, `engi-demo/src/canonical/run-artifacts.js` |
| `stale promoted status truth` | promoted hand-authored file family still says draft/pending or points at the prior canon | canonical promotion must stop before the pointer can truthfully move | spec-family check fails in promoted mode; promotion plan is blocked | `scripts/check-engi-spec-family.mjs`, `scripts/prepare-engi-spec-family-promotion.mjs`, `scripts/promote-engi-canon.mjs` |

### Appendix K. Source-bearing deliverable and artifact contract catalog

#### K.1 Branch/runtime deliverables

| Deliverable | Current contract role | Emitted by | Primary consumers | Fail-closed meaning |
| --- | --- | --- | --- | --- |
| private remediation branch files | repo-authenticated remediation delivery for buyer/internal/reviewer surfaces | `engi-demo/src/engi-demo.js` branch materialization path | buyer/reviewer/internal projections, operator shell, bounded-public derivation inputs | if branch files are not materially closed, ENGI may not claim remediation delivery |
| operator projected latest-run surface | current review surface over scenario, fit, evaluation, branch, settlement, proofs, and generated canon | `engi-demo/src/demo-shell-state.js` | browser/operator review, V20 transcript/quality checks | missing or role-incoherent surfaces fail operator-quality canon |
| public artifact inventory | bounded public list of disclosable artifacts and summaries | `engi-demo/src/demo-shell-state.js`, `engi-demo/src/canonical/projections.js` | public projection, buyer/reviewer/public explanations | if inventory requires private artifacts to explain itself, bounded-public posture is broken |

#### K.2 Current `.engi` proof/runtime artifacts

| Artifact path | Current contract role | Current generator/source basis | Primary consumers |
| --- | --- | --- | --- |
| `.engi/asset-pack.lock.json` | selected asset-pack lock witness | `engi-demo/src/canonical/evaluation-materialization.js`, `engi-demo/src/canonical/proof-materialization.js` | selection/materialization proof, replay, operator branch review |
| `.engi/selected-source-material.json` | selected source-material manifest | `engi-demo/src/canonical/proof-materialization.js`, `engi-demo/src/engi-demo.js` | buyer/internal/reviewer projections, materialization proof |
| `.engi/materialization-exclusions.json` | explicit exclusions carrier | `engi-demo/src/canonical/proof-materialization.js` | selection/materialization proof and operator explanation |
| `.engi/verification-report.json` | verification-decision carrier | `engi-demo/src/canonical/evaluation-materialization.js`, `engi-demo/src/engi-demo.js` | verification proof family, operator evaluation panels |
| `.engi/source-to-shares.json` | settlement contribution/allocation carrier | `engi-demo/src/canonical/settlement.js` | settlement proof family, accounting precision report, operator settlement preview |
| `.engi/journal-diff.json` | exact journal delta carrier | `engi-demo/src/canonical/settlement.js` | settlement proof, accounting audit, utility explanation |
| `.engi/projection-policy.json` | projection/disclosure policy contract | `engi-demo/src/canonical/projections.js`, `engi-demo/src/engi-demo.js` | disclosure-boundary proof family, public/reviewer/buyer/internal projections |
| `.engi/bounded-public-proof.json` | bounded metadata public proof | `engi-demo/src/canonical/projections.js` | public projection, disclosure proof, operator public review |
| `.engi/redaction-proof.json` | redaction alignment witness | `engi-demo/src/canonical/projections.js` | disclosure proof, projection-quality checks |
| `.engi/proof-contract.json` | proof contract and theorem/evidence chain carrier | `engi-demo/src/canonical/proof-annotations.js`, `engi-demo/src/canonical/proof-materialization.js` | proof-contract family, `_PROVEN_`, replay |
| `.engi/system-proof-bundle.json` | whole-system proof bundle | `engi-demo/src/canonical/proof-materialization.js`, `engi-demo/src/engi-demo.js` | `_PROVEN_`, operator proof review, proof replay |

#### K.3 Canonical promotion artifacts

| Artifact path | Current contract role | Current generator/source basis | Primary consumers |
| --- | --- | --- | --- |
| `ENGI_SPEC_V21_PROVEN.md` | generated V21 proof appendix over inherited V19/V20 closure plus V21 specifying artifacts | `scripts/generate-engi-proven.mjs`, `engi-demo/src/canonical/proven-generator.js` | canonical readers, promotion validation, future drafting inputs |
| `.engi/v21-spec-family-report.json` | executable structural/density verdict over the hand-authored V21 family | `engi-demo/src/canonical/v21-specifying.js`, `scripts/check-engi-spec-family.mjs` | promotion preflight and postflight, canonical-input family |
| `.engi/v21-canonical-input-report.json` | executable verdict over the active pointed canonical input set | `engi-demo/src/canonical/v21-specifying.js`, `scripts/check-engi-canonical-inputs.mjs` | promotion preflight/post-generation validation, future drafting inputs |

## V21 completion condition

V21 is complete only when:
1. `ENGI_SPECIFYING.md` is accepted as the one complete specifying standard,
2. the V21 `SPEC`, `SPEC_DELTA`, and `SPEC_PARITY_MATRIX` exist and agree,
3. the V21 `SPEC` is a materially fuller current-canon restatement rather than a short version note,
4. current-canon drafting inputs include the current `SPEC`, `_PROVEN_`, parity matrix, and generated `.engi/vN-*` artifacts,
5. the V21 `SPEC` itself is whole-system, re-implementable, and auditable rather than depending on companion files for omitted system meaning,
6. subsystem surfaces, proof-family canon, generated canon, validation canon, and promotion canon are all restated directly enough for implementation derivation,
7. canonical architecture and domain-model sections exist and are specific enough to orient a full-system implementer or auditor,
8. generated artifact families are specified at both shared-field and artifact-specific levels,
9. the parity matrix explicitly records the stale promoted-status defect exemplified by V20,
10. source-side spec-family and stale-status gates are specified precisely enough to implement,
11. at least the first source-side V21 specifying check is implemented against the V21 family,
12. appendix-grade coverage carriers make omission visible across subsystem, proof, generated-artifact, validation, and source-map surfaces,
13. scenario/workflow/principal/branch cross-products are explicit in the main `SPEC`,
14. fail-closed contract posture is cataloged rather than implied by tests or source reading,
15. source-bearing deliverables and artifacts are enumerated with generators and consumers,
16. canonical promotion requirements for V21 are specified precisely enough to implement,
17. optional `NOTES` are clearly defined as non-canonical,
18. the V21 current-version generated artifact family is specified directly in the main `SPEC`,
19. post-generation active-canon validation is named as part of promotion closure,
20. and the next source-side implementation pass can be executed directly from the V21 spec family without needing new metaspecing improvisation.
