# ENGI Spec V22

## Status

- Scope: V22 canonical system specification draft for post-V21 runtime, proof, operator, and promotion realignment
- Companion notes file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22_NOTES.md`
- Companion delta file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22_DELTA.md`
- Companion parity ledger: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22_PARITY_MATRIX.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible reports, `.engi/v20-*` operator-quality reports, `.engi/v21-spec-family-report.json`, and `.engi/v21-canonical-input-report.json`; `ENGI_SPEC_V21_PROVEN.md` is the active generated proof appendix
- Current canonical/latest target: `V21`
- Last fully realized canonical target preserved in source: `V21`
- Source parity state: V22 is in pre-implementation drafting; recent audit is grounded in promoted V21 canon, current `engi-demo` core/runtime source, current demo operator shell, and current test stack
- V22 state: full-system V22 drafting has started; V22 is not yet canonical and does not yet claim source closure
- Current realization basis for this pass: promoted V21 full canon, V16-V21 version ladder, current `engi-demo/src`, current `engi-demo/public`, current `engi-demo/test`, and current demo-local docs

## Drafting and acceptance state

V22 is the first version after V21 specifying canon that intentionally returns to ENGI system work rather than metaspecing work.

That means V22 starts from a stronger drafting posture:
- the active full canon is now V21,
- the current spec family rules are already explicit,
- generated canon is already part of the drafting input set,
- and V22 can therefore begin from whole-system audit findings instead of from missing specifying structure.

This file is the V22 full-system drafting target.
It is not yet the final promoted full-canon restatement.
Its first job is to identify what system work is now implementation-derivable from V21 canon and current source.

Current V22 drafting facts:
- the active canon pointer is `V21`,
- the runtime and operator shell still encode stale `V19` / `V20 draft` posture in multiple places,
- demo-local README truth is materially stale and still refers to V15 as active,
- the core runtime and demo shell already carry a much richer system than those stale labels imply,
- and V20's explicitly accepted proof/operator boundaries remain available as the next deeper closure candidates once canon-truth alignment lands.

## Version executive summary

V16 through V21 now form a clear prehistory for V22:
- V16 is still the densest proof-family derivation document,
- V17 closed demo-driven test layering and end-to-end workflow closure,
- V18 closed generated proof exhaustiveness,
- V19 closed reproducible canon, deterministic replay, volatility inventory, and mutation sampling,
- V20 closed operator-quality canon,
- and V21 closed specifying first-gate canon.

The next problem is no longer "how should ENGI be specified?"
The next problem is:
- how does ENGI itself carry current canon truth inside its runtime, public API, demo shell, tests, and repo-facing operator documentation,
- and what next proof/operator closures should follow once that truth is executable instead of handwritten drift?

V22 is therefore a system-facing version.
It should make current canon truth executable in ENGI itself, realign the operator shell and demo docs to the active system, and then drive the next proof/operator closures that the current canon already makes enumerable.

## Canonical ENGI executive summary

ENGI remains a proof-bearing operating system for engineering assetizing.

Its current operating chain remains:
1. authenticated repo supply and candidate deposits are brought into ENGI,
2. a benchmark- and parser-bound need is measured,
3. deposit-to-need fit is made explicit before deeper closure,
4. recall, ranking, verification, and use-tiering select an asset pack,
5. branch artifacts, proof artifacts, and witness artifacts are materialized,
6. projection and disclosure policy determine what each principal may inspect,
7. exact source-to-shares settlement and journal diff materialize contribution/accounting consequences,
8. generated matrices, generated reports, `_PROVEN_`, and current `.engi/vN-*` artifacts make the result auditable,
9. and the canonical system spec must restate all of that completely enough that implementation, audit, and promotion are derivable.

V22 does not change that identity.
It changes how faithfully the running ENGI system carries current canon truth and what next canonical closures it should execute from that aligned base.

## V22 inheritance rule

V22 inherits V21 as the active full-system and specifying baseline.

That means:
- V21 remains the active pointed canon until V22 source closure and promotion are complete,
- V21's full-system restatement remains the current semantic authority,
- V19 reproducible-canon artifacts, V20 operator-quality artifacts, and V21 specifying artifacts remain active canonical drafting inputs,
- and V22 should not reopen V21 specifying as its center unless current implementation proves a concrete specifying contradiction that blocks system work.

V22 also inherits the recent version ladder as concrete implementation guidance:
- V17 layered testing remains canonical,
- V18 proof matrices remain canonical,
- V19 replay/volatility/mutation closure remains canonical,
- and V20 operator-quality closure plus accepted boundaries remain canonical.

## V22 audit findings

### 1. Version-posture drift was real and has now produced a first V22 implementation pass

The stale runtime/demo posture that existed at V22 start has now been partially closed:
- `engi-demo/src/canon-posture.js` is the new executable canon-posture source for active/draft/demo identity,
- `engi-demo/src/engi-demo.js` and `engi-demo/src/demo-shell-state.js` now derive API posture from that source,
- `engi-demo/public/index.html` and `engi-demo/public/app.js` now derive title, hero posture, and status-facing shell copy from that source,
- `engi-demo/test/canon-posture.test.js`, `engi-demo/test/core.test.js`, `engi-demo/test/api.test.js`, and `engi-demo/test/e2e.test.js` now assert the current posture rather than stale V19/V20 literals,
- and `engi-demo/README.md` now states the current V21 canon / V22 draft posture.

This closes the first-order drift defect:
canon posture is now owned by one executable source inside the running system.
The remaining V22 operator truth work is now narrower: deeper explainer/pedagogy cleanup and any further promotion/runtime coupling we choose to add.

### 2. The current runtime is richer than its earlier posture and the first alignment pass preserves that richness

Current source already implements the whole chain V22 should respect:
- `engi-demo/src/engi-demo.js` carries seeded scenarios, need measurement, recall/ranking, verification, branch materialization, projection, proof, and settlement,
- `engi-demo/src/demo-shell-state.js` already projects distinct public/buyer/reviewer/internal views,
- `engi-demo/public/app.js` already renders a system-bearing operator shell across deposit, need, fit, proof, branch, settlement, and policy surfaces,
- and current tests already span subsystem, API, workflow integration, E2E, reproducibility, proof matrices, mutation, operator quality, and specifying.

V22 therefore should align truth without flattening the current operator/runtime richness into a smaller shell.

### 3. V20's accepted boundaries are now the next obvious deeper closures

The current active canon already records three deferred closures that now become realistic V22 candidates:
- full source/projection security matrix closure,
- full mutation cross-product closure,
- and screenshot-backed visual stability closure if deterministic DOM signatures are no longer sufficient.

Those are not speculative future ideas.
They are already enumerated, bounded, and reopenable in current canon.

## V22 accepted initial scope decisions

V22 accepts the following initial drafting decisions:

1. V22 is a system-facing release, not a second specifying-centered release.
2. The first V22 implementation target is executable canon truth inside runtime, API, browser shell, tests, and repo-facing demo docs, and that pass has now landed.
3. V22 should use V21 full canon as the semantic base and avoid reopening V21 specifying unless implementation exposes a concrete blocker.
4. A single source-bearing canon-posture surface should replace scattered runtime/browser/test/documentation version literals.
5. Browser posture, API posture, status messaging, README posture, and test assertions should derive from the same current-canon source.
6. The stale V15/V19/V20 posture in runtime/demo source is a V22 implementation defect, not an accepted boundary; the first posture/alignment pass is closed and any remaining operator work is now refinement rather than stale-canon removal.
7. V22 should keep using both active `V21` canon and historical `V20_PROPER` as specification-validation surfaces where V21-era specifying checks still matter.
8. The next proof/operator closures under active consideration are the three V20 deferred boundaries: projection matrix expansion, mutation cross-product expansion, and screenshot stability promotion.
9. V22 should not invent a new proof family before current canon truth and current deferred proof/operator closures are aligned.
10. V22 should treat current demo/operator docs as part of the implementation truth that must be updated alongside runtime and test posture.

## V22 source-of-truth hierarchy

V22 inherits the V21 rule that current ENGI canon is not carried by one markdown file alone.

Current truth order is:
1. `ENGI_SPEC.txt`
2. the pointed `ENGI_SPEC_V21.md`
3. `ENGI_SPEC_V21_DELTA.md`
4. `ENGI_SPEC_V21_PARITY_MATRIX.md`
5. generated `ENGI_SPEC_V21_PROVEN.md`
6. active canonical `.engi/v19-*`, `.engi/v20-*`, and `.engi/v21-*` artifacts
7. source and test surfaces explicitly referenced by the active canon
8. optional non-canonical notes
9. historical prior specs

V22's immediate system problem is that the runtime/demo shell does not currently reflect that active truth order.
Version posture inside ENGI is still partly derived from stale literals instead of from one source-bearing current-canon surface.

## V22 full-system, re-implementation, and audit rule

V22 inherits V21's requirement that the main `SPEC` be full-system, re-implementable, and auditable.

For V22 that specifically means the main spec must restate:
- the whole ENGI runtime chain,
- the current operator shell and public/API posture,
- the proof/operator/generated-canon surfaces the runtime depends on,
- the runtime/doc/test drift now visible in source,
- and the exact implementation work needed to make current canon executable inside ENGI itself.

Companion files may sharpen or validate that truth.
They may not carry omitted whole-system meaning on behalf of the main `SPEC`.

## V22 totality and precision enforcement rule

V22 keeps the V21 exactness rule and applies it to system work.

That means V22 must make it omission-visible whether the current ENGI system covers:
- runtime canon posture,
- operator-shell canon posture,
- demo-local documentation posture,
- proof/operator deferred boundaries,
- promotion/runtime coupling,
- and all inherited subsystem/proof/generated-artifact surfaces.

V22 therefore continues to require:
- appendix-grade inventories,
- explicit subsystem and proof-family catalogs,
- explicit scenario/workflow/principal/branch coverage matrices,
- explicit fail-closed postures,
- and explicit source-bearing artifact catalogs.

## V22 system goals, non-goals, and design principles

### Goals

1. Make active canon truth executable inside ENGI runtime, API, browser shell, tests, and demo-facing docs.
2. Preserve current ENGI runtime/proof/operator semantics while removing stale version-posture drift.
3. Add fail-closed protection so future canonical promotion cannot silently leave runtime/demo posture behind.
4. Decide and then execute the next proof/operator closure work already enumerated by current canon.

### Non-goals

1. Re-centering V22 on metaspecing.
2. Inventing a new proof family before current canon truth is executable.
3. Replacing the current demo-shell architecture in the first pass.
4. Rewriting current subsystem semantics without first proving a contradiction or gap.

### Design principles

- Current canon truth should be owned by one executable system surface, not by scattered literals.
- Runtime, browser, docs, and tests should agree on canon posture.
- V22 should preserve inherited proof/operator closure unless it is explicitly widened.
- Accepted boundaries remain explicit and reopenable rather than silently lingering.

## V22 system architecture and layer boundaries

The current ENGI system remains layered as follows:

1. Core deterministic primitives
   Current implementation basis: `engi-demo/src/engi-core.js`
   Responsibilities: hashing, canonical json, tokenization, normalization, and allocation helpers.

2. Canonical runtime builders
   Current implementation basis: `engi-demo/src/canonical/*.js`, `engi-demo/src/canonical/type-contracts.ts`
   Responsibilities: need measurement, evaluation/materialization, prompting, projection, settlement, proof annotations, run artifacts, and versioned generated-canon builders.

3. Whole-run composition
   Current implementation basis: `engi-demo/src/engi-demo.js`
   Responsibilities: seed state, scenario corpus, recall/ranking, verification, branch/proof/settlement composition, and public-state inputs.

4. Projection shaping and operator-state exposure
   Current implementation basis: `engi-demo/src/demo-shell-state.js`
   Responsibilities: public/buyer/reviewer/internal projections, profile composition, and latest-run shaping.

5. HTTP/API and persistence shell
   Current implementation basis: `engi-demo/server.js`
   Responsibilities: state bootstrapping, atomic persistence, request validation, and public API posture.

6. Operator browser shell
   Current implementation basis: `engi-demo/public/index.html`, `engi-demo/public/app.js`, `engi-demo/public/styles.css`
   Responsibilities: operator controls, surface rendering, explainers, panel ordering, and operator-quality presentation.

7. Validation and promotion
   Current implementation basis: `engi-demo/test/*`, `scripts/*.mjs`
   Responsibilities: layered runtime tests, generated-canon validation, specifying validation, and canonical promotion.

## V22 canonical domain model

Current V22 drafting treats the following domain objects as active and system-bearing:

| Domain object or class | Current role | Current primary carriers |
| --- | --- | --- |
| canon posture | executable statement of active ENGI version identity and inherited artifact families | currently scattered runtime/browser/test/doc literals; V22 aims to consolidate this |
| scenario | seeded engineering need situation with benchmark/parser evidence | `engi-demo/src/engi-demo.js`, operator shell scenario surfaces |
| realization profile | targeted or normalization deposit/need posture | `engi-demo/src/realization-profile.js`, operator shell profile surfaces |
| projection principal | visibility/authority class | `public`, `buyer`, `reviewer`, `internal` across runtime, shell, and quality matrices |
| need | measured engineering demand | need descriptor, needing surface, prompt/inference surfaces |
| asset pack | selected asset set surviving fit/verification | asset-pack lock, materialization surfaces, settlement preview |
| proof family | one of nine proof-bearing families | family proofs, system proof bundle, witness manifest, `_PROVEN_` |
| generated report family | reproducible-canon, operator-quality, and specifying generated artifacts | `.engi/v19-*`, `.engi/v20-*`, `.engi/v21-*`, `ENGI_SPEC_V21_PROVEN.md` |

## V22 current system center

The strongest current V22 center is executable canon-truth realignment.

Concretely, ENGI should own one runtime-readable and operator-readable posture surface that can answer:
- what canon is active,
- what prior canon is inherited,
- what generated artifact families are active,
- what proof appendix is active,
- what operator/demo shell is showing,
- and what policy/version reference strings are authoritative for the current runtime.

Without that, future canonical promotions can still leave ENGI's actual running posture behind even if the spec family is correct.

## V22 implementation-derivable workstreams

### 1. Executable canon posture

V22 should introduce a source-bearing canon posture module or equivalent runtime truth surface.
That requirement is now implemented by `engi-demo/src/canon-posture.js`.

Minimum responsibilities:
- define active canon version posture,
- define inherited proof/operator family posture where needed,
- define current policy/version label posture,
- define current generated artifact family posture,
- and make that posture consumable by server, public state, browser shell, tests, and demo docs.

Current consequences:
- `SPEC_VERSION` no longer carries a stale handwritten V19/V20 label,
- policy references no longer drift from the active canon posture source,
- API `specVersion` is derived from runtime-owned posture,
- browser title and hero posture now reflect current canon posture,
- and tests assert the runtime-owned canon posture rather than frozen historical literals.

### 2. Demo/operator shell truth realignment

V22 should update the shell so the operator experience describes current ENGI rather than preserved draft posture from earlier versions.
The first version-posture and operator-vocabulary pass is now implemented; remaining work is deeper explainer/pedagogy refinement rather than stale-canon removal.

Affected surfaces in the first pass:
- `engi-demo/public/index.html`,
- `engi-demo/public/app.js`,
- `engi-demo/server.js` route outputs as observed through `GET /api/state`,
- status messages and shell headlines,
- and the demo README/doc set.

This is operator work because version posture, artifact posture, and policy posture are part of what the shell claims to be operating.

### 3. Promotion/runtime coupling

V22 should make it harder for future canon promotion to update specs and generated artifacts without updating the runtime/demo posture.
The current first pass closes this partially through pointer-backed runtime tests; it does not yet add a new V22-specific promotion artifact family.

Likely options:
- derive runtime posture from a maintained source module that is explicitly updated during version work,
- derive runtime posture from the canonical pointer plus a checked posture manifest,
- or extend promotion validation so runtime/browser/API posture is checked against the active pointed canon.

The preferred V22 outcome remains fail-closed posture drift detection, and the current pointer-backed canon-posture tests are the first implemented mechanism toward that outcome.

### 4. Deferred proof/operator closures

Once canon-truth alignment lands, the next implementation-derivable proof/operator work is already named:
- expand projection-security coverage beyond representative smoke,
- expand mutation coverage beyond representative mutation,
- and decide whether screenshot-backed visual closure can replace or supplement DOM/geometry signatures.

These should be treated as V22 candidate second-pass closures rather than as unbounded future brainstorming.

### 5. Operator/system legibility refinement

The current shell already exposes many artifacts.
V22 can improve how that exposure is organized by current system consequence rather than by historical implementation order.

Examples:
- make canon posture a first-class surfaced object,
- make proof family closure and replay obligations easier to inspect by stage,
- and make the current generated artifact families visibly tied to the active canon rather than to old draft narratives.

## V22 whole ENGI operator chain

V22 currently preserves the same whole-system chain that V21 canonized:
1. repo supply and depositing,
2. need measurement and prompt/inference-owned demand,
3. deposit-to-need fit,
4. candidate recall, ranking, and verification,
5. selection, materialization, and branch artifact emission,
6. identity, authorization, and sensitive-flow control,
7. disclosure/projection control by principal,
8. source-to-shares and exact accounting settlement,
9. proof, witness, replay, and generated artifact materialization,
10. and operator-quality/public-shell rendering of the whole system.

V22's initial system change is to make the canon-truth that frames this chain executable and current throughout the runtime and operator shell.

## V22 canonical subsystem surfaces

The current subsystem emphasis for V22 is inherited from V21, with V22-specific focus on canon-truth realignment and the next deferred proof/operator closures.

### Depositing and asset supply

Current canonical objects and emitted artifacts:
- repo supply surface,
- deposit session and selected inventory refs,
- candidate assets,
- and asset-pack selection inputs.

Current algorithms and derivation rules:
- deposit intake is seeded from repo-authenticated inventory or raw fallback content,
- intake becomes admissible only when content or selected inventory survives validation,
- and deposit roots carry into fit, verification, materialization, and settlement.

Current invariants and fail-closed conditions:
- invalid or empty deposit must fail closed,
- deposit truth must remain traceable through later surfaces,
- and operator posture must not present successful closure without surviving intake.

Current proof obligations:
- deposit inputs must be represented in downstream fit/materialization/proof surfaces,
- and selected-source/materialization artifacts must remain traceable back to admitted intake.

Current source-bearing implementation basis:
- `engi-demo/src/engi-demo.js`
- `engi-demo/src/demo-shell-state.js`
- `engi-demo/public/app.js`
- `engi-demo/server.js`

Current validating commands and parity basis:
- `npm --prefix engi-demo run test:unit`
- `npm --prefix engi-demo run test:integration`
- `npm --prefix engi-demo run test:e2e`
- V22 parity rows for runtime/browser/API/doc posture alignment

Current accepted boundaries:
- no new deposit semantics are introduced in the first V22 pass,
- reopen if executable canon posture requires deposit-surface restructuring.

### Needing and prompt/inference ownership

Current canonical objects and emitted artifacts:
- need descriptor,
- needing surface,
- prompt family registry,
- prompt contracts,
- prompt surfaces,
- parsed completion envelopes,
- inference proofs.

Current algorithms and derivation rules:
- benchmark/parser evidence plus scenario seeds produce measured demand,
- prompt/inference ownership governs inferred fields,
- and parsed-envelope admissibility remains fail-closed.

Current invariants and fail-closed conditions:
- measured need cannot silently bypass parser or derivation closure,
- prompt/inference ownership must remain explicit,
- and prompt contract or parsed-envelope drift remains blocking.

Current proof obligations:
- inference-synthesis and prompt-completeness remain fully inherited proof families,
- and V22 shell/docs must continue to render those surfaces truthfully under current canon posture.

Current source-bearing implementation basis:
- `engi-demo/src/engi-demo.js`
- `engi-demo/src/canonical/need-measurement.js`
- `engi-demo/src/canonical/prompting.js`
- `engi-demo/public/app.js`

Current validating commands and parity basis:
- `npm --prefix engi-demo run test:unit`
- proof-member/theorem matrix tests
- V22 parity rows for shell-legibility after canon-truth refresh

Current accepted boundaries:
- no new prompt/inference semantics in first-pass V22,
- reopen if operator-shell or runtime posture changes obscure current prompt/inference truth.

### Fit, recall, ranking, and verification

Current canonical objects and emitted artifacts:
- depositing-to-needing surface,
- match report,
- evaluated candidates,
- verification report,
- verification receipts,
- verification-decisions proof.

Current algorithms and derivation rules:
- fit is made explicit before deeper closure,
- recall/ranking and verification remain distinct,
- and use-tier consequences are carried into later materialization/settlement consequences.

Current invariants and fail-closed conditions:
- no-survivor asset packs fail closed,
- verification outcomes must not silently promote assets,
- and fit/ranking/verification separation remains explicit.

Current proof obligations:
- static-code-analysis and verification-decisions family closure remain inherited,
- and V22 should preserve their operator visibility while updating canon posture.

Current source-bearing implementation basis:
- `engi-demo/src/engi-demo.js`
- `engi-demo/src/canonical/evaluation-materialization.js`
- `engi-demo/public/app.js`

Current validating commands and parity basis:
- `npm --prefix engi-demo run test:unit`
- `npm --prefix engi-demo run test:integration`
- V20 operator transcript and projection-quality checks

Current accepted boundaries:
- no first-pass semantic widening,
- reopen if runtime canon posture becomes inseparable from fit/verification explanation.

### Selection and materialization

Current canonical objects and emitted artifacts:
- asset-pack lock,
- selected-source-material manifest,
- materialization exclusions,
- materialization proof,
- materialization visibility proof,
- selection-consistency proof.

Current algorithms and derivation rules:
- selected assets and units are locked before settlement,
- materialized source and exclusions are explicit,
- and visibility rules are projection-dependent.

Current invariants and fail-closed conditions:
- selection/materialization cannot succeed without surviving candidate closure,
- visible artifact posture must remain principal-bounded,
- and lock/source/exclusion coherence remains blocking.

Current proof obligations:
- selection-and-materialization family closure remains inherited,
- and V22 may later widen projection-closure coverage from the current deferred V20 boundary set.

Current source-bearing implementation basis:
- `engi-demo/src/engi-demo.js`
- `engi-demo/src/canonical/proof-materialization.js`
- `engi-demo/public/app.js`

Current validating commands and parity basis:
- `npm --prefix engi-demo run test:integration`
- `npm --prefix engi-demo run test:e2e`
- V20 visual/projection-quality checks

Current accepted boundaries:
- first-pass V22 keeps current materialization semantics,
- reopen if projection matrix expansion requires stronger materialization grouping.

### Identity, authorization, and sensitive flow

Current canonical objects and emitted artifacts:
- identity bindings,
- authorization decisions,
- sensitive-data-flow records,
- GitHub boundary surface,
- identity/authorization and sensitive-flow proofs.

Current algorithms and derivation rules:
- principal and session bindings determine allowed actions,
- sensitive data classes and policy rules determine visibility,
- and public/reviewer/buyer/internal projections are derived from that spine.

Current invariants and fail-closed conditions:
- authorization denial remains blocking,
- sensitive data cannot silently flow to public surfaces,
- and principal classes remain explicit.

Current proof obligations:
- authorization-and-sensitive-flow family closure remains inherited,
- and V22 may later widen source/projection security coverage from V20's deferred boundary.

Current source-bearing implementation basis:
- `engi-demo/src/engi-demo.js`
- `engi-demo/src/canonical/proof-materialization.js`
- `engi-demo/src/demo-shell-state.js`
- `engi-demo/public/app.js`

Current validating commands and parity basis:
- `npm --prefix engi-demo run test:unit`
- V20 accessibility, projection-quality, and E2E projection flows

Current accepted boundaries:
- no first-pass principal/policy redesign,
- reopen if executable canon posture requires explicit policy posture surfaces in runtime and shell.

### Disclosure and projection

Current canonical objects and emitted artifacts:
- projection policy,
- bounded public proof,
- redaction proof,
- disclosure proof,
- projection visibility summaries,
- principal-scoped latest-run projections.

Current algorithms and derivation rules:
- public projection remains bounded metadata only,
- reviewer/buyer/internal projections expose progressively richer surfaces,
- and public artifact inventories are derived from projection policy plus materialized artifacts.

Current invariants and fail-closed conditions:
- public projection overexposure remains blocking,
- disclosure/redaction posture must stay aligned,
- and bounded public proof cannot depend on forbidden private surfaces.

Current proof obligations:
- disclosure-boundary family closure remains inherited,
- and V22 explicitly considers expanding source/projection-security coverage beyond representative smoke.

Current source-bearing implementation basis:
- `engi-demo/src/canonical/projections.js`
- `engi-demo/src/demo-shell-state.js`
- `engi-demo/public/app.js`
- `engi-demo/src/canonical/v20-quality.js`

Current validating commands and parity basis:
- `npm --prefix engi-demo run test:v20-projection-quality`
- `npm --prefix engi-demo run test:e2e`
- V20 accessibility/visual checks over principal-bounded surfaces

Current accepted boundaries:
- V20 deferred projection-matrix boundary remains open for V22 decision,
- reopen if runtime truth-alignment surfaces expose additional projection leak risks.

### Settlement and exact accounting

Current canonical objects and emitted artifacts:
- source-to-shares artifact,
- settlement participation artifact,
- accounting precision report,
- settlement preview,
- journal diff,
- settlement proof,
- journal completeness proof.

Current algorithms and derivation rules:
- contribution units clip and normalize into settled shares,
- allocations conserve exact micro-units,
- journal debits/credits remain balanced and receipt-bound.

Current invariants and fail-closed conditions:
- settlement conservation drift remains blocking,
- journal proof and settlement proof must remain coherent,
- and zero-credit participation remains explicit rather than silently discarded.

Current proof obligations:
- settlement-source-to-shares family closure remains inherited and active,
- and V22 should preserve operator legibility while keeping exactness replayable.

Current source-bearing implementation basis:
- `engi-demo/src/canonical/settlement.js`
- `engi-demo/src/settlement-structs.js`
- `engi-demo/public/app.js`

Current validating commands and parity basis:
- `npm --prefix engi-demo run test:unit`
- `npm --prefix engi-demo run test:integration`
- V18/V19/V20 inherited proof and quality gates

Current accepted boundaries:
- no first-pass settlement redesign,
- reopen if canon-truth alignment requires settlement posture changes in API/browser/docs.

### Proof contract, witnesses, and replay

Current canonical objects and emitted artifacts:
- proof contract,
- system proof bundle,
- proof witness manifest,
- `_PROVEN_`,
- inherited V19 and V20 generated artifact families,
- V21 specifying reports.

Current algorithms and derivation rules:
- nine proof families emit proofs, theorem verdicts, artifact bindings, and replay steps,
- witness manifests and proof bundles collect whole-run closure,
- generated appendix and report families summarize replayable closure over canonical runs.

Current invariants and fail-closed conditions:
- witness/replay closure remains blocking,
- stale or missing generated artifacts fail closed under promotion checks,
- and theorem/member/replay inventories remain canonical.

Current proof obligations:
- proof-contract family closure remains inherited,
- and V22 explicitly considers whether mutation and screenshot deferred boundaries become new in-version proof/operator closures.

Current source-bearing implementation basis:
- `engi-demo/src/canonical/proof-annotations.js`
- `engi-demo/src/canonical/proof-materialization.js`
- `engi-demo/src/canonical/proven-generator.js`
- `scripts/generate-engi-proven.mjs`

Current validating commands and parity basis:
- inherited V18/V19/V20 report and matrix tests
- `npm --prefix engi-demo run test:unit`
- `npm run promote:canon -- --version V21 --commit <sha>`

Current accepted boundaries:
- no first-pass proof-family redesign,
- reopen when V22 chooses the next deferred proof/operator closure set.

## V22 proof-family canon

V22 currently inherits all nine proof families from active V21 canon without semantic change:
- inference-synthesis,
- prompt-completeness,
- static-code-analysis,
- verification-decisions,
- selection-and-materialization,
- authorization-and-sensitive-flow,
- settlement-source-to-shares,
- disclosure-boundary,
- and proof-contract.

V22's first-pass responsibility is not to redefine those families.
It is to ensure the runtime and operator shell represent the active proof-bearing system truthfully and to decide whether any currently deferred proof/operator closure from V20 should be activated.

## V22 generated canon

The active generated canon inherited into V22 drafting is:
- V19 reproducible-canon reports,
- V20 operator-quality reports,
- V21 specifying reports,
- and `ENGI_SPEC_V21_PROVEN.md`.

V22 should not assume it needs a new runtime/proof/operator artifact family yet.
Whether V22 emits new version-local generated artifacts should depend on the chosen implementation path:
- if executable canon posture is implemented as runtime/source truth only, V22 may not need a new generated family,
- if promotion/runtime coupling adds checked posture artifacts or new proof/operator matrices, then V22 may require a version-local generated family.

## V22 validation canon

The current V22 validation baseline already includes:
- subsystem unit coverage,
- API/integration coverage,
- E2E operator flow coverage,
- V18 matrix coverage,
- V19 replay/volatility/mutation coverage,
- V20 operator-quality coverage,
- and V21 specifying/promotion coverage.

That means V22 can focus its first implementation pass on:
- canon-truth runtime drift checks,
- browser/API/README/test alignment checks,
- and then any newly activated proof/operator closures.

## V22 promotion canon

The current V22 promotion question is narrower than V21's.

V22 must ensure that when the active canon moves again:
- runtime posture,
- API posture,
- browser posture,
- demo-local docs,
- and their validating tests

cannot remain on a stale historical version narrative.

V22 therefore likely needs at least one of:
- a runtime-owned canon posture module,
- a generated or checked runtime posture artifact,
- or promotion-time validation that compares runtime/browser/API truth against the pointed canon.

## V22 accepted boundaries and reopen conditions

1. V22 does not reopen V21 specifying as its primary center.
   Reopen condition: system implementation reveals a concrete blocker or contradiction in the active specifying standard.

2. V22 does not begin with a subsystem redesign.
   Reopen condition: canon-truth alignment work exposes a deeper mismatch in current runtime architecture.

3. The V20 deferred boundaries remain open but not yet accepted into V22 first-pass implementation.
   Reopen condition: V22 explicitly accepts projection-matrix expansion, mutation-cross-product expansion, or screenshot stability as in-version closure work.

## V22 appendices and canonical supporting material

V22 now records the inherited system carriers and the V22-specific truth-alignment work below rather than leaving them implicit.

### Appendix A. Canonical type and surface catalog

#### A.1 Core runtime and operator surfaces

| Surface or artifact | Current role |
| --- | --- |
| seeded shell posture | initial operator-ready state with current active canon and draft target posture |
| scenario selector | chooses seeded scenario |
| branch-mode selector | chooses `patch` or `context` |
| projection selector | chooses `public`, `reviewer`, `buyer`, or `internal` |
| deposit summary | describes what was deposited or selected |
| need summary | shows measured task, failure modes, target artifact kinds, closure criteria |
| fit summary | shows decisive kinds, overlap, and normalization pressure |
| evaluation and ranking surface | shows candidate survivability and verification explanation |
| branch artifact summary | shows branch name and emitted artifacts |
| settlement preview | shows participation and credited versus zero-credit consequences |
| proof-family catalog | shows family closure and theorem-bearing evidence |
| generated appendix and report references | expose generated canon to the operator |

#### A.2 Typed and proof-bearing runtime artifacts

| Artifact | Current role |
| --- | --- |
| `.engi/proof-contract.json` | top-level proof contract and theorem-binding carrier |
| `.engi/system-proof-bundle.json` | full run proof package |
| `.engi/proof-witness-manifest.json` | witness digest inventory and family binding |
| `.engi/verification-report.json` | verification evidence carrier |
| `.engi/source-to-shares.json` | settlement contribution/allocation carrier |
| `.engi/projection-policy.json` | disclosure and visibility policy carrier |
| `.engi/asset-pack.lock.json` | selected asset-pack witness |
| `.engi/selected-source-material.json` | selected source-bearing manifest |

#### A.3 Realization profile and operator-domain surfaces

| Surface | Current role |
| --- | --- |
| `RealizationProfileDefinition` | source definition of targeted versus normalization deposits |
| `BuiltRealizationProfile` | runtime materialized realization profile carried by need and operator surfaces |
| `DepositingSurface` | canonical deposit summary surface |
| `NeedingSurface` | canonical measured-need summary surface |
| `DepositingToNeedingSurface` | fit relation between deposited supply and measured need |
| `ArtifactSelectionSurface` | selected inventory root and branch-intent traceability |
| `SettlementPreviewShape` | settlement preview artifact over source-to-shares and participation |
| `ProjectionPolicyShape` | complete projection/disclosure policy object |

### Appendix B. Proof family closure catalog

The current proof-family catalog is inherited from active `V21` generated canon and remains part of current ENGI canon until V22 source changes it explicitly.

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
- members: `task`, `failureModes`, `constraints`, `targetArtifactKinds`, `closureCriteria`
- theoremIds: `inference_synthesis.coverage_totality`, `inference_synthesis.evaluator_status_truth`, `inference_synthesis.evidence_basis_closure`, `inference_synthesis.ownership_traceability_closure`, `inference_synthesis.witness_materialization_closure`, `inference_synthesis.replay_closure`
- replayStepIds: `inference-synthesis.coverage-reconciliation`, `inference-synthesis.evaluator-status-replay`, `inference-synthesis.evidence-basis-replay`
- witnessArtifactPaths: `.engi/inference-moment-contracts.json`, `.engi/inference-proofs.json`, `.engi/prompt-implementation-surface.json`, `.engi/prompt-surfaces.json`, `.engi/parsed-completion-envelopes.json`, `.engi/inference-synthesis-proof.json`
- current member closure criteria: each inferred field is closed only when one truthful moment contract, one field proof, one parsed envelope, one prompt-bearing surface, and one replayable evidence basis remain mutually consistent.
- current member verdict shape: `field`, `passed`, `fieldProofPresent`, `momentContractPresent`, `promptSurfacePresent`, `parsedEnvelopePresent`, `evaluatorStatusTruthful`, `evidenceBasisClosed`
- current theorem-by-theorem closure reading: `coverage_totality` reconciles classified fields against realized field proofs and exclusions; `evaluator_status_truth` closes only when stand-in/runtime posture agrees across proofs and manifests; `evidence_basis_closure` closes only when the realized evidence basis is singular and replayable; `ownership_traceability_closure` closes only when field ownership and evidence provenance agree; `witness_materialization_closure` closes only when witness surfaces are emitted directly; `replay_closure` closes only when the named replay steps reconstruct the same family verdicts.
- current theorem-to-replay grouping: coverage totality binds to `coverage-reconciliation`; evaluator status truth binds to `evaluator-status-replay`; evidence-basis and ownership traceability bind to `evidence-basis-replay`; witness materialization and replay closure span the full replay set.
- minimum artifact/replay binding set: `.engi/inference-moment-contracts.json`, `.engi/inference-proofs.json`, `.engi/prompt-surfaces.json`, `.engi/parsed-completion-envelopes.json`, `.engi/inference-synthesis-proof.json`, plus replay over coverage reconciliation, evaluator-status replay, and evidence-basis replay.
- current proof-object fields: `memberVerdicts`, `theoremVerdicts`, `artifactBindings`, `replaySteps`, `replayInstructions`, `allCasesPassed`, `allTheoremsPassed`
- generated-artifact and test bindings: `ENGI_SPEC_V21_PROVEN.md`, inherited V19 proof-member/theorem matrices, deterministic replay, negative mutation, `engi-demo/test/core.test.js`, and `engi-demo/test/proven-generator.test.js`
- fail-closed conditions: missing field proofs, missing moment contracts, prompt-surface drift, parsed-envelope omission, evaluator-manifest mismatch, theorem/replay-step drift, or witness-artifact absence.

#### B.2 Prompt-completeness

- proofArtifactPath: `.engi/prompt-completeness-proof.json`
- members: `task`, `failureModes`, `constraints`, `targetArtifactKinds`, `closureCriteria`
- theoremIds: `prompt_completeness.coverage_totality`, `prompt_completeness.no_ghost_coverage`, `prompt_completeness.explicit_exclusion_closure`, `prompt_completeness.contract_closure`, `prompt_completeness.parsed_envelope_admissibility`, `prompt_completeness.downstream_consumer_closure`, `prompt_completeness.provenance_truth`, `prompt_completeness.witness_replay_closure`
- replayStepIds: `prompt-completeness.member-set-reconciliation`, `prompt-completeness.parse-admissibility`, `prompt-completeness.consumer-closure`, `prompt-completeness.provenance-truth`
- witnessArtifactPaths: `.engi/prompt-family-registry.json`, `.engi/prompt-contracts.json`, `.engi/prompt-surfaces.json`, `.engi/parsed-completion-envelopes.json`, `.engi/prompt-completeness-proof.json`
- current member closure criteria: a prompt-owned field is closed only when it is classified or explicitly excluded, registered in the declared family, contract-complete, parse-admissible, provenance-truthful, and closed to every declared downstream consumer.
- current member verdict shape: `field`, `passed`, `classified`, `registered`, `inDeclaredFamilyRegistry`, `explicitlyExcluded`, `contractComplete`, `parsedEnvelopeAdmissible`, `downstreamConsumersClosed`, `provenanceAnnotationsTruthful`
- current theorem-by-theorem closure reading: `coverage_totality` reconciles classified fields against realized prompt members; `no_ghost_coverage` rejects undeclared registered fields; `explicit_exclusion_closure` closes only when every omission is explicit; `contract_closure` closes only when prompt contracts bind all required fields; `parsed_envelope_admissibility` closes only when parsed outputs stay schema-admissible; `downstream_consumer_closure` closes only when every consumer is declared; `provenance_truth` closes only when annotations match actual prompt ownership; `witness_replay_closure` closes only when registry, contract, surface, and parsed-envelope artifacts replay the same family verdicts.
- current theorem-to-replay grouping: coverage/no-ghost/explicit-exclusion closure bind to `member-set-reconciliation`; contract and parsed-envelope admissibility bind to `parse-admissibility`; downstream consumer closure binds to `consumer-closure`; provenance truth binds to `provenance-truth`; witness/replay closure spans all four steps.
- minimum artifact/replay binding set: `.engi/prompt-family-registry.json`, `.engi/prompt-contracts.json`, `.engi/prompt-surfaces.json`, `.engi/parsed-completion-envelopes.json`, `.engi/prompt-completeness-proof.json`, plus replay over member-set reconciliation, parse admissibility, consumer closure, and provenance truth.
- current proof-object fields: `memberVerdicts`, `theoremVerdicts`, `artifactBindings`, `replaySteps`, `replayInstructions`, `allCasesPassed`, `allTheoremsPassed`
- generated-artifact and test bindings: `ENGI_SPEC_V21_PROVEN.md`, inherited V19 proof-member/theorem matrices, deterministic replay, negative mutation, `engi-demo/test/core.test.js`, and direct prompt-contract fail-closed unit coverage in `engi-demo/src/canonical/prompting.js`
- fail-closed conditions: classified fields missing registration, ghost registration, omitted explicit exclusions, incomplete prompt contracts, inadmissible parsed envelopes, undeclared consumers, false provenance surfaces, or missing witness/replay coverage.

#### B.3 Static-code-analysis

- proofArtifactPath: `.engi/static-measurement-proof.json`
- members: `deterministic-parser`, `repo-context`, `content-unit`, `measurement-stages`
- theoremIds: `static_code_analysis.stage_domain_purity`, `static_code_analysis.abstract_to_concrete_stage_mapping`, `static_code_analysis.registry_role_closure`, `static_code_analysis.receipt_report_proof_agreement`, `static_code_analysis.witness_replay_closure`
- replayStepIds: `static-code-analysis.stage-domain`, `static-code-analysis.stage-mapping`, `static-code-analysis.receipt-report-proof`
- witnessArtifactPaths: `.engi/code-analysis-fact-registry.json`, `.engi/static-heuristics-registry.json`, `.engi/measurement-receipts.json`, `.engi/static-measurement-report.json`, `.engi/static-measurement-proof.json`
- current member closure criteria: each measurement member is closed only when its stage ids are stable, the stage domain is explicit, registry roles are coherent, and receipts/report/proof surfaces agree on emitted facts.
- current member verdict shape: `memberId`, `passed`, `stageIds`
- current theorem-by-theorem closure reading: `stage_domain_purity` closes only when stages stay in the static domain; `abstract_to_concrete_stage_mapping` closes only when every abstract stage maps to emitted concrete stages; `registry_role_closure` closes only when fact and heuristic registries keep non-overlapping roles; `receipt_report_proof_agreement` closes only when receipts, report, and proof carry the same totals; `witness_replay_closure` closes only when the named witness artifacts replay those agreements.
- current theorem-to-replay grouping: stage-domain purity binds to `stage-domain`; stage mapping and registry-role closure bind to `stage-mapping`; receipt/report/proof agreement and witness/replay closure bind to `receipt-report-proof`.
- minimum artifact/replay binding set: `.engi/code-analysis-fact-registry.json`, `.engi/static-heuristics-registry.json`, `.engi/measurement-receipts.json`, `.engi/static-measurement-report.json`, `.engi/static-measurement-proof.json`, plus replay over stage-domain, stage-mapping, and receipt-report-proof.
- current proof-object fields: `memberVerdicts`, `theoremVerdicts`, `artifactBindings`, `replaySteps`, `replayInstructions`, `allTheoremsPassed`
- generated-artifact and test bindings: `ENGI_SPEC_V21_PROVEN.md`, inherited V19 proof-member/theorem matrices, deterministic replay, and unit/integration surfaces that exercise static measurement and receipts
- fail-closed conditions: stage-domain drift, missing stage ids, receipt/report disagreement, registry-role mismatch, or witness/replay artifact absence.

#### B.4 Verification-decisions

- proofArtifactPath: `.engi/verification-decisions-proof.json`
- members: `issuance`, `provenance`, `sufficiency`, `issuer-policy`, `use-tier-consequence`
- theoremIds: `verification_decisions.issuance_closure`, `verification_decisions.provenance_closure`, `verification_decisions.sufficiency_closure`, `verification_decisions.issuer_policy_closure`, `verification_decisions.use_tier_consequence_closure`, `verification_decisions.receipt_report_role_closure`, `verification_decisions.witness_replay_closure`
- replayStepIds: `verification-decisions.stage-mapping`, `verification-decisions.use-tier-consequence`
- witnessArtifactPaths: `.engi/verification-report.json`, `.engi/verification-receipts.json`, `.engi/verification-decisions-proof.json`
- current member closure criteria: each verification member is closed only when receipt-stage truth, report truth, theorem grouping, and downstream use-tier consequences remain aligned without silent promotion.
- current member verdict shape: `memberId`, `passed`, `stageIds`
- current theorem-by-theorem closure reading: `issuance_closure`, `provenance_closure`, `sufficiency_closure`, and `issuer_policy_closure` close only when receipt and report stages agree; `use_tier_consequence_closure` closes only when branch behavior matches use-tier truth; `receipt_report_role_closure` closes only when receipts and reports preserve distinct roles; `witness_replay_closure` closes only when the named replay steps reconstruct that same decision surface.
- current theorem-to-replay grouping: issuance/provenance/sufficiency/issuer-policy closure bind to `stage-mapping`; use-tier consequence and receipt/report role closure bind to `use-tier-consequence`; witness/replay closure spans both steps.
- minimum artifact/replay binding set: `.engi/verification-report.json`, `.engi/verification-receipts.json`, `.engi/verification-decisions-proof.json`, plus replay over stage-mapping and use-tier-consequence.
- current proof-object fields: `memberVerdicts`, `theoremVerdicts`, `artifactBindings`, `replaySteps`, `replayInstructions`, `allTheoremsPassed`
- generated-artifact and test bindings: `ENGI_SPEC_V21_PROVEN.md`, inherited V19 theorem-evidence coverage, integration branch-state checks, and operator evaluation surfaces
- fail-closed conditions: receipt/report disagreement, use-tier consequence drift, theorem grouping drift, or missing replay evidence.

#### B.5 Selection-and-materialization

- proofArtifactPath: `.engi/selection-and-materialization-proof.json`
- members: `selected-assets`, `locked-units`, `materialized-source`, `exclusions`, `visibility-rules`
- theoremIds: `selection_and_materialization.selected_asset_closure`, `selection_and_materialization.lock_closure`, `selection_and_materialization.materialized_source_closure`, `selection_and_materialization.exclusion_closure`, `selection_and_materialization.visibility_closure`, `selection_and_materialization.selection_consistency_closure`, `selection_and_materialization.materialization_proof_closure`
- replayStepIds: `selection-and-materialization.selected-set`, `selection-and-materialization.visibility`
- witnessArtifactPaths: `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json`, `.engi/materialization-exclusions.json`, `.engi/materialization-visibility-proof.json`, `.engi/selection-consistency-proof.json`, `.engi/materialization-proof.json`, `.engi/selection-and-materialization-proof.json`
- current member closure criteria: selected assets, locked units, materialized source, exclusions, and visibility rules are closed only when the emitted selection set, lock artifact, source manifest, exclusion artifact, and visibility proof remain mutually coherent.
- current member verdict shape: `memberId`, `passed`
- current theorem-by-theorem closure reading: selected asset closure binds the selected set to the asset-pack lock; lock closure confirms locked content-unit identity; materialized source closure requires selected-source manifest coherence; exclusion closure requires explicit and replayable exclusions; visibility closure requires materialization visibility proof and projection alignment; selection consistency closure requires cross-artifact set agreement; materialization proof closure requires the family proof to summarize the exact emitted source-bearing artifacts.
- current theorem-to-replay grouping: selected-asset, lock, materialized-source, exclusion, and selection-consistency closure bind to `selected-set`; visibility and materialization proof closure bind to `visibility`.
- minimum artifact/replay binding set: `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json`, `.engi/materialization-exclusions.json`, `.engi/materialization-visibility-proof.json`, `.engi/selection-consistency-proof.json`, `.engi/materialization-proof.json`, `.engi/selection-and-materialization-proof.json`, plus replay over selected-set and visibility.
- current proof-object fields: `memberVerdicts`, `theoremVerdicts`, `artifactBindings`, `replaySteps`, `replayInstructions`, `allTheoremsPassed`
- generated-artifact and test bindings: `ENGI_SPEC_V21_PROVEN.md`, inherited V19 matrices, deterministic replay, E2E selection flows, and operator branch-review surfaces
- fail-closed conditions: selected-set drift, lock/source disagreement, silent exclusions, visibility proof mismatch, or missing materialization witness artifacts.

#### B.6 Authorization-and-sensitive-flow

- proofArtifactPath: `.engi/authorization-and-sensitive-flow-proof.json`
- members: `principals`, `authorization-decisions`, `confidentiality-classes`, `retention-disclosure-rules`, `sensitive-data-flows`
- theoremIds: `authorization_and_sensitive_flow.principal_authority_totality`, `authorization_and_sensitive_flow.authorization_decision_closure`, `authorization_and_sensitive_flow.classification_closure`, `authorization_and_sensitive_flow.policy_assignment_closure`, `authorization_and_sensitive_flow.no_unauthorized_public_flow`, `authorization_and_sensitive_flow.witness_replay_closure`
- replayStepIds: `authorization-sensitive-flow.identity`, `authorization-sensitive-flow.flows`
- witnessArtifactPaths: `.engi/identity-bindings.json`, `.engi/authorization-decisions.json`, `.engi/sensitive-data-flow.json`, `.engi/identity-authorization-proof.json`, `.engi/sensitive-data-flow-proof.json`, `.engi/authorization-and-sensitive-flow-proof.json`
- current member closure criteria: principals, authorization decisions, classifications, retention/disclosure rules, and sensitive flows are closed only when identity bindings, decision surfaces, classification records, and flow proofs stay mutually consistent and policy-assigned.
- current member verdict shape: `memberId`, `passed`
- current theorem-by-theorem closure reading: principal-authority totality closes only when every acting principal is explicitly bound; authorization decision closure closes only when allowed or denied actions are rendered and replayable; classification closure closes only when sensitive classes are assigned consistently; policy assignment closure closes only when flows inherit the right rules; no unauthorized public flow closes only when lower-privilege surfaces cannot receive protected material; witness replay closure closes only when identity and flow artifacts reconstruct the same outcome.
- current theorem-to-replay grouping: authority, decision, classification, and policy-assignment closure bind to `identity`; unauthorized-public-flow and witness/replay closure bind to `flows`.
- minimum artifact/replay binding set: `.engi/identity-bindings.json`, `.engi/authorization-decisions.json`, `.engi/sensitive-data-flow.json`, `.engi/identity-authorization-proof.json`, `.engi/sensitive-data-flow-proof.json`, `.engi/authorization-and-sensitive-flow-proof.json`, plus replay over identity and flows.
- current proof-object fields: `memberVerdicts`, `theoremVerdicts`, `artifactBindings`, `replaySteps`, `replayInstructions`, `allTheoremsPassed`
- generated-artifact and test bindings: `ENGI_SPEC_V21_PROVEN.md`, inherited V19 matrices, disclosure and projection-quality checks, and authorization-sensitive unit coverage
- fail-closed conditions: missing principal bindings, authorization drift, classification mismatch, unauthorized public flow, or absent witness/replay coverage.

#### B.7 Settlement-source-to-shares

- proofArtifactPath: `.engi/settlement-source-to-shares-proof.json`
- members: `contribution`, `clipping`, `normalization`, `participation`, `allocation`, `journal`, `settlement-proof`
- theoremIds: `settlement_source_to_shares.contribution_totality`, `settlement_source_to_shares.clipping_determinism`, `settlement_source_to_shares.normalization_exactness`, `settlement_source_to_shares.participation_totality`, `settlement_source_to_shares.allocation_conservation`, `settlement_source_to_shares.journal_completeness`, `settlement_source_to_shares.settlement_theorem_integrity`
- replayStepIds: `settlement-source-to-shares.contribution-allocation`, `settlement-source-to-shares.journal-theorem`
- witnessArtifactPaths: `.engi/source-to-shares.json`, `.engi/settlement-participation.json`, `.engi/accounting-precision-report.json`, `.engi/journal-diff.json`, `.engi/journal-completeness-proof.json`, `.engi/settlement-proof.json`, `.engi/settlement-source-to-shares-proof.json`
- current member closure criteria: contribution, clipping, normalization, participation, allocation, journal, and settlement proof are closed only when source-to-shares, participation, precision, journal, and settlement artifacts remain exact and replayable.
- current member verdict shape: `memberId`, `passed`
- current theorem-by-theorem closure reading: contribution totality closes only when all eligible inputs appear in source-to-shares; clipping determinism closes only when clip behavior remains stable; normalization exactness closes only when normalized shares preserve exact micro-units; participation totality closes only when selected, zero-credit, and excluded cases are explicit; allocation conservation closes only when totals balance exactly; journal completeness closes only when journal diff and journal-completeness proof agree; settlement theorem integrity closes only when settlement proof matches the rest of the accounting chain.
- current theorem-to-replay grouping: contribution, clipping, normalization, participation, and allocation closure bind to `contribution-allocation`; journal completeness and settlement theorem integrity bind to `journal-theorem`.
- minimum artifact/replay binding set: `.engi/source-to-shares.json`, `.engi/settlement-participation.json`, `.engi/accounting-precision-report.json`, `.engi/journal-diff.json`, `.engi/journal-completeness-proof.json`, `.engi/settlement-proof.json`, `.engi/settlement-source-to-shares-proof.json`, plus replay over contribution-allocation and journal-theorem.
- current proof-object fields: `memberVerdicts`, `theoremVerdicts`, `artifactBindings`, `replaySteps`, `replayInstructions`, `allTheoremsPassed`
- generated-artifact and test bindings: `ENGI_SPEC_V21_PROVEN.md`, inherited V19 matrices, contract-ledger coverage, settlement unit/integration tests, and operator settlement preview review
- fail-closed conditions: contribution omission, nondeterministic clipping, conservation drift, journal mismatch, settlement-proof mismatch, or missing replay artifacts.

#### B.8 Disclosure-boundary

- proofArtifactPath: `.engi/disclosure-boundary-proof.json`
- members: `projection-policy`, `bounded-public-proof`, `redaction-proof`, `disclosure-proof`
- theoremIds: `disclosure_boundary.projection_policy_closure`, `disclosure_boundary.bounded_public_metadata_only`, `disclosure_boundary.redaction_alignment`, `disclosure_boundary.disclosure_verdict_alignment`, `disclosure_boundary.witness_replay_closure`
- replayStepIds: `disclosure-boundary.policy-bounded-public`, `disclosure-boundary.redaction-disclosure`
- witnessArtifactPaths: `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/redaction-proof.json`, `.engi/disclosure-proof.json`, `.engi/disclosure-boundary-proof.json`
- current member closure criteria: projection policy, bounded-public proof, redaction proof, and disclosure proof are closed only when policy assignment, bounded-public surfaces, redaction alignment, and disclosure verdicts remain mutually coherent and replayable.
- current member verdict shape: `memberId`, `passed`
- current theorem-by-theorem closure reading: projection policy closure closes only when principal-local rules are explicit and complete; bounded-public metadata only closes only when public exposure remains metadata-bounded; redaction alignment closes only when redaction proofs match projection policy; disclosure verdict alignment closes only when the final disclosure result matches the protected surface set; witness replay closure closes only when the policy, bounded-public, redaction, and disclosure artifacts replay the same verdict.
- current theorem-to-replay grouping: projection-policy and bounded-public closure bind to `policy-bounded-public`; redaction alignment, disclosure verdict alignment, and witness replay closure bind to `redaction-disclosure`.
- minimum artifact/replay binding set: `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/redaction-proof.json`, `.engi/disclosure-proof.json`, `.engi/disclosure-boundary-proof.json`, plus replay over policy-bounded-public and redaction-disclosure.
- current proof-object fields: `memberVerdicts`, `theoremVerdicts`, `artifactBindings`, `replaySteps`, `replayInstructions`, `allTheoremsPassed`
- generated-artifact and test bindings: `ENGI_SPEC_V21_PROVEN.md`, inherited V19 matrices, V20 projection-quality smoke, E2E projection checks, and operator principal review flows
- fail-closed conditions: incomplete projection policy, public projection overexposure, redaction mismatch, disclosure-verdict drift, or missing replay witnesses.

#### B.9 Proof-contract

- proofArtifactPath: `.engi/proof-contract.json`
- members: `proof-contract`, `evidence-chain`, `theorem-checks`, `system-proof-bundle`, `witness-manifest-closure`
- theoremIds: `proof_contract.contract_materialization`, `proof_contract.evidence_chain_closure`, `proof_contract.theorem_check_binding`, `proof_contract.bundle_coherence`, `proof_contract.witness_manifest_coherence`, `proof_contract.replay_closure`
- replayStepIds: `proof-contract.contract-materialization`, `proof-contract.evidence-chain`, `proof-contract.bundle-witness`
- witnessArtifactPaths: `.engi/proof-contract.json`, `.engi/system-proof-bundle.json`, `.engi/proof-witness-manifest.json`
- current member closure criteria: proof contract, evidence chain, theorem checks, system bundle, and witness manifest are closed only when the emitted proof surfaces name exact theorem bindings, artifact paths, and replay instructions without omission.
- current member verdict shape: `memberId`, `passed`
- current theorem-by-theorem closure reading: `contract_materialization` closes only when proof-contract fields are emitted as specified; `evidence_chain_closure` closes only when theorem evidence remains reachable; `theorem_check_binding` closes only when theorem ids and check ids stay aligned; `bundle_coherence` closes only when the system bundle matches family artifacts; `witness_manifest_coherence` closes only when manifest paths cover required witnesses; `replay_closure` closes only when contract-materialization, evidence-chain, and bundle-witness replay reconstruct the same system-proof verdict.
- current theorem-to-replay grouping: contract materialization binds to `contract-materialization`; evidence-chain closure and theorem-check binding bind to `evidence-chain`; bundle coherence, witness-manifest coherence, and replay closure bind to `bundle-witness`.
- minimum artifact/replay binding set: `.engi/proof-contract.json`, `.engi/system-proof-bundle.json`, `.engi/proof-witness-manifest.json`, plus replay over contract-materialization, evidence-chain, and bundle-witness.
- current proof-object fields: `memberVerdicts`, `theoremVerdicts`, `artifactBindings`, `replaySteps`, `replayInstructions`, `allTheoremsPassed`
- generated-artifact and test bindings: `ENGI_SPEC_V21_PROVEN.md`, inherited V19 matrices, deterministic replay, negative mutation, the contract-change ledger, and canonical promotion appendix checks
- fail-closed conditions: missing witness artifact paths, bundle incoherence, replay-step drift, or contract/bundle/witness disagreement.

### Appendix C. Generated artifact contract catalog

#### C.0 Exact generated-artifact inventory matrix

| artifactPath | artifact family | current role |
| --- | --- | --- |
| `.engi/v19-contract-change-ledger.json` | inherited V19 reproducible canon | records V18 to V19 contract-delta truth |
| `.engi/v19-deterministic-replay-report.json` | inherited V19 reproducible canon | proves byte-stable replay |
| `.engi/v19-negative-proof-mutation-matrix.json` | inherited V19 reproducible canon | proves representative fail-closed mutation rejection |
| `.engi/v19-proof-member-semantic-matrix.json` | inherited V19 reproducible canon | proves proof-member semantics across runs |
| `.engi/v19-state-machine-matrix.json` | inherited V19 reproducible canon | proves state-machine coverage |
| `.engi/v19-theorem-evidence-matrix.json` | inherited V19 reproducible canon | proves theorem evidence coverage |
| `.engi/v19-volatility-inventory.json` | inherited V19 reproducible canon | proves volatility control |
| `.engi/v20-operator-acceptance-transcript.json` | inherited V20 operator-quality canon | proves executable operator workflow truth |
| `.engi/v20-visual-regression-report.json` | inherited V20 operator-quality canon | proves deterministic visual stability |
| `.engi/v20-accessibility-report.json` | inherited V20 operator-quality canon | proves deterministic accessibility closure |
| `.engi/v20-performance-budget-report.json` | inherited V20 operator-quality canon | proves normalized local performance budgets |
| `.engi/v20-projection-quality-smoke-matrix.json` | inherited V20 operator-quality canon | proves principal-quality smoke without forbidden artifacts |
| `.engi/v20-quality-summary.json` | inherited V20 operator-quality canon | aggregates quality closure |
| `ENGI_SPEC_V21_PROVEN.md` | active generated appendix | summarizes inherited proof, quality, and specifying canon |
| `.engi/v21-spec-family-report.json` | inherited V21 specifying canon | proves structural and density closure over the V21 family |
| `.engi/v21-canonical-input-report.json` | inherited V21 specifying canon | proves pointed-canon input completeness |
| `.engi/v22-spec-family-report.json` | V22 specifying generated artifacts | will prove structural and density closure over the V22 family |
| `.engi/v22-canonical-input-report.json` | V22 specifying generated artifacts | will prove pointed-canon input completeness for V22 promotion |

#### C.1 Inherited V19 reproducible-canon artifacts

The inherited V19 artifact family preserves:
- deterministic replay,
- volatility classification,
- representative negative mutation fail-closure,
- positive proof matrices over the current family/member/theorem inventory,
- and explicit contract-change tracking.

#### C.2 Inherited V20 operator-quality artifacts

The inherited V20 artifact family preserves:
- executable operator-facing review truth,
- deterministic visual signature truth,
- deterministic accessibility truth,
- normalized local performance-budget truth,
- projection-quality smoke truth,
- and aggregate quality verdict truth.

#### C.3 V22 specifying generated artifacts

V22 keeps the version-local specifying pair because V21 specifying remains active canon even while V22 re-centers on ENGI itself:
- `.engi/v22-spec-family-report.json`
- `.engi/v22-canonical-input-report.json`

Their draft-time role is to ensure that V22 can become a full canon without regressing the V21 file-family, density, and active-input guarantees.

#### C.4 Shared generated-artifact fields

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

#### C.5 Artifact-specific generated payload fields

Current examples include:
- operator transcript `flowCount` and `stepCount`,
- accessibility `checkCount`,
- performance `operationCount`, `budgetMs`, and normalized elapsed classes,
- projection-quality `cellCount`,
- quality summary `qualityReportCount`,
- visual regression `stateCount`, `signatureMode`, and `screenshotMode`,
- spec-family report missing-section and verdict rows,
- and canonical-input report artifact-presence, pointer, and appendix-verdict rows.

#### C.6 Artifact confidentiality and disclosability taxonomy

Current canonical classes visible in generated artifacts include:
- `private-proof-artifact`
- `bounded-public-proof-metadata`
- `licensed-source-material`
- `settlement-preview`
- `verification-evidence`

These classes determine whether a generated artifact may surface publicly, only internally, or only in bounded proof form.

#### C.7 Minimum generated appendix rendered contents

At minimum, `ENGI_SPEC_V22_PROVEN.md` must render:
- aggregate proof verdict,
- exact proof-family inventory,
- exact per-family member inventory,
- exact per-family theorem inventory,
- exact replay-step inventories and theorem bindings,
- witness artifact inventories,
- generated artifact inventories,
- scenario and run coverage matrices,
- proof-source commit,
- inherited V19 reproducible-canon report summaries,
- inherited V20 operator-quality report summaries,
- inherited and current specifying-report summaries,
- run-detail truth for each executed scenario/branch-mode pair,
- proof artifact disclosure classifications,
- and an explicit incomplete-verdict section whenever closure is not total.

#### C.8 Canonical regeneration and fail-closed posture

The V22 generation contract is:
- `ENGI_SPEC_V22_PROVEN.md` is generated-only and not manually authored evidence,
- canonical V22 promotion regenerates it and then re-checks it before pointer advancement,
- V22 promotion blocks if the appendix is stale against generator output,
- and promotion blocks if the required active generated input family is incomplete.

Current fail closed when examples include:
- a required proof family cannot be rendered exactly,
- a required witness artifact inventory is missing,
- a required generated artifact inventory is missing,
- the proof-source commit is absent or inconsistent,
- or check mode finds the committed appendix stale against generator output.

### Appendix D. Validation and checking gate catalog

| Command or gate | What it proves |
| --- | --- |
| `npm --prefix engi-demo run typecheck` | type-surface consistency |
| `npm --prefix engi-demo run test:unit` | local canonical invariants |
| `npm --prefix engi-demo run test:integration` | composed runtime/state behavior |
| `npm --prefix engi-demo run test:e2e` | operator workflow and projection behavior |
| `npm --prefix engi-demo run test:proof-member-matrix` | proof-member semantic coverage |
| `npm --prefix engi-demo run test:theorem-evidence-matrix` | theorem evidence coverage |
| `npm --prefix engi-demo run test:state-machine` | state-machine matrix closure |
| `npm --prefix engi-demo run test:deterministic-replay` | byte-stable generated replay |
| `npm --prefix engi-demo run test:volatility` | volatility discipline |
| `npm --prefix engi-demo run test:negative-mutation-matrix` | representative fail-closed mutation rejection |
| `npm --prefix engi-demo run test:contract-ledger` | contract-change ledger closure |
| `npm --prefix engi-demo run test:v20-operator-transcript` | transcript closure |
| `npm --prefix engi-demo run test:v20-accessibility` | accessibility closure |
| `npm --prefix engi-demo run test:v20-visual` | visual closure |
| `npm --prefix engi-demo run test:v20-performance` | performance closure |
| `npm --prefix engi-demo run test:v20-projection-quality` | projection-quality smoke closure |
| `npm --prefix engi-demo test` | aggregate non-E2E suite |
| `node scripts/check-engi-spec-family.mjs --version V20_PROPER --mode draft --current-target V20` | historical full-canon reconstruction validation |
| `node scripts/check-engi-canonical-inputs.mjs --current-target V21` | active pointed-canon input completeness |
| `node scripts/check-engi-spec-family.mjs --version V22 --mode draft --current-target V21` | V22 hand-authored structural and density closure |

### Appendix E. Current canonical source map

| Source-bearing surface | Current role in V22 drafting |
| --- | --- |
| `engi-demo/src/engi-demo.js` | seeded runtime state, scenario selection, proof-bearing latest-run surfaces, and currently stale version posture |
| `engi-demo/src/demo-shell-state.js` | projection shaping and operator-facing latest-run view-model composition |
| `engi-demo/server.js` | `/api/state` exposure of runtime posture and latest-run state |
| `engi-demo/public/index.html` | operator shell document skeleton and title posture |
| `engi-demo/public/app.js` | operator shell behavior, summary panels, and currently stale active-canon copy |
| `engi-demo/public/styles.css` | operator-quality layout, visibility, and focus styling |
| `engi-demo/README.md` | demo-local narrative and getting-started posture |
| `engi-demo/src/canonical/need-measurement.js` | inference-synthesis materialization |
| `engi-demo/src/canonical/prompting.js` | prompt contracts, prompt surfaces, parsed envelopes |
| `engi-demo/src/canonical/evaluation-materialization.js` | evaluation, selection, static measurement, verification, and branch materialization |
| `engi-demo/src/canonical/proof-materialization.js` | proof families, witness artifacts, materialization proofs |
| `engi-demo/src/canonical/projections.js` | projection policy, bounded-public, redaction, and disclosure proofs |
| `engi-demo/src/canonical/settlement.js` | source-to-shares, journal, settlement proofs, and accounting precision |
| `engi-demo/src/canonical/proven-generator.js` | `_PROVEN_` appendix materialization |
| `engi-demo/src/canonical/v21-specifying.js` | full-canon spec-family and active-input validation profiles |
| `scripts/check-engi-spec-family.mjs` | versioned hand-authored file-family enforcement |
| `scripts/check-engi-canonical-inputs.mjs` | active pointed-canon input enforcement |
| `scripts/promote-engi-canon.mjs` | canonical promotion sequence |
| `scripts/generate-engi-proven.mjs` | generated appendix emission/check |

### Appendix F. Subsystem totality and derivability matrix

| Subsystem or concern | Current canonical contracts or artifacts | Current closure basis | Generated/runtime evidence | Validating commands | Current source basis |
| --- | --- | --- | --- | --- | --- |
| repo supply and depositing | deposit intake, selected inventory refs, asset-pack lock | operator intake and selection flow | operator shell, `.engi/asset-pack.lock.json` | `test:e2e`, transcript flows | `engi-demo/src/engi-demo.js` |
| needing and measured demand | need summaries and inferred demand | prompt/inference closure | prompt proof artifacts and operator summary | proof-member/theorem matrices | `ENGI_SPEC_V21_PROVEN.md` |
| prompt/inference/evaluator ownership | prompt contracts, prompt surfaces, parsed envelopes | prompt-completeness plus inference-synthesis | `.engi/prompt-*.json`, `.engi/inference-*.json` | proof matrices, replay | `ENGI_SPEC_V21_PROVEN.md` |
| depositing-to-needing fit | fit summary and decisive/overlap kinds | operator and verification explanation | operator shell, verification report | `test:e2e`, transcript flows | `engi-demo/public/app.js` |
| recall and ranking | evaluated candidates and ranking scores | verification and selection closure | operator evaluation panel | `test:e2e` | `engi-demo/public/app.js` |
| verification decisions | verification receipts/report/proof | verification-decisions family | `.engi/verification-report.json` | theorem matrices | `ENGI_SPEC_V21_PROVEN.md` |
| selection and materialization | lock, selected-source, exclusions, materialization proofs | selection/materialization family | `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json` | proof matrices and transcript | `ENGI_SPEC_V21_PROVEN.md` |
| branch artifacts and deliverables | branch name, emitted files, deliverable inventory | operator branch review | scenario/run matrix and operator shell | `test:e2e`, visual state checks | `engi-demo/public/app.js` |
| identity, authority, signing, and policy | identity bindings, auth decisions, projection policy | authorization/disclosure families | `.engi/authorization-decisions.json`, `.engi/projection-policy.json` | `test:e2e`, projection-quality smoke | `ENGI_SPEC_V21_PROVEN.md` |
| sensitive data and confidentiality flows | confidentiality classes and sensitive flow proof | authorization/disclosure families | disclosure classification tables | replay and projection-quality smoke | `ENGI_SPEC_V21_PROVEN.md` |
| projection, disclosure, and redaction | public/reviewer/buyer/internal posture | disclosure-boundary family and V20 quality smoke | bounded public proof, redaction proof, smoke matrix | `test:e2e`, `test:v20-projection-quality` | `engi-demo/src/canonical/projections.js` |
| proof families, members, theorems, witnesses, and replay | nine family proofs, witness manifest, replay steps | family inventory and run details | `ENGI_SPEC_V21_PROVEN.md` | proof matrices, replay, mutation | `scripts/generate-engi-proven.mjs` |
| settlement, source-to-shares, journals, and exact accounting | source-to-shares, participation, journal diff, settlement proof | settlement family | settlement artifacts and operator settlement preview | `test:contract-ledger`, settlement unit/integration tests | `engi-demo/src/canonical/settlement.js` |
| telemetry, persistence, state, and failure semantics | quality reports, status surfaces, and fail-closed states | V19/V20/V21 generated reports and current runtime state | `.engi/v19-*`, `.engi/v20-*`, `.engi/v21-*` | replay, volatility, quality summary, spec-family checks | `scripts/promote-engi-canon.mjs` |
| host/runtime capability truth | local browser, deterministic DOM assertions, canonical promotion command | V20 quality and V21 promotion rules | report builders and promotion plan | `promote:canon --dry-run` | `scripts/promote-engi-canon.mjs` |
| operator experience and pedagogy | transcript, ordered panels, explicit version posture | V20 operator-quality canon plus V22 truth-alignment work | transcript, visual report, accessibility report | V20 quality tests and E2E | `engi-demo/public/index.html`, `engi-demo/public/app.js`, `engi-demo/public/styles.css` |
| validation and test stack | layered gate family | V19+V20+V21 gate inventory | gate commands and reports | full gate suite | `ENGI_SPEC_V21.md`, `ENGI_SPEC_V21_PROVEN.md` |
| generated artifacts and canonical promotion | generated appendix and `.engi/vN-*` families | promotion command and appendix check | `ENGI_SPEC_V21_PROVEN.md`, `.engi/v19-*`, `.engi/v20-*`, `.engi/v21-*`, draft `.engi/v22-*` | `promote:canon`, appendix `--check`, spec-family and canonical-input checks | `scripts/promote-engi-canon.mjs` |

### Appendix G. Canonical file-family and promotion contract catalog

#### G.1 Exact V22 canonical family responsibility matrix

| File or family | Current responsibility |
| --- | --- |
| `ENGI_SPEC_V22.md` | V22 full-system draft canon |
| `ENGI_SPEC_V22_DELTA.md` | V22 version-local delta and implementation direction |
| `ENGI_SPEC_V22_PARITY_MATRIX.md` | V22 source/spec/generated/test/promotion parity truth |
| `ENGI_SPEC_V22_NOTES.md` | non-canonical V22 iterative notes |
| `ENGI_SPEC_V22_PROVEN.md` | generated V22 appendix once promotion is executed |
| `.engi/v19-*` | inherited reproducible-canon evidence |
| `.engi/v20-*` | inherited operator-quality evidence |
| `.engi/v21-*` | inherited specifying evidence |
| `.engi/v22-*` | version-local specifying and future V22 promotion evidence |
| `ENGI_SPEC.txt` | active canonical pointer |

#### G.2 Status-truth schema matrix

| Status label | Required in | Draft meaning | Promoted meaning | Enforcement basis |
| --- | --- | --- | --- | --- |
| `Current canonical/latest target` | `SPEC`, `DELTA`, `PARITY_MATRIX` | points to currently active prior canon while V22 remains unpromoted | points to promoted `V22` | `scripts/check-engi-spec-family.mjs` |
| `Canonical proof-source commit` | promoted `SPEC`, `DELTA`, `PARITY_MATRIX` | absent until promotion-time truth is prepared | exact commit rendered into generated appendix and canonical promotion body | promotion preparation plus spec-family checks |
| `Prior canonical anchor` | `SPEC`, `DELTA`, `PARITY_MATRIX` | direct anchor to `V21` | preserved provenance reference | `scripts/check-engi-spec-family.mjs` |
| `Prior generated proof appendix` | `SPEC`, `DELTA`, `PARITY_MATRIX` | active generated appendix inherited while drafting | prior generated appendix preserved as provenance after promotion | `scripts/check-engi-spec-family.mjs` |
| `Generated structured artifact inventory` | `SPEC`, `DELTA`, `PARITY_MATRIX` | current active generated canon plus draft-time V22 generated family | promoted generated canon inventory including V22 artifacts | `scripts/check-engi-spec-family.mjs` |
| `Source parity state` | `SPEC`, `DELTA`, `PARITY_MATRIX` | what implementation/generator/promoter support is already landed | promoted statement of aligned source/generator status | `scripts/check-engi-spec-family.mjs` |
| `V22 state` | `SPEC`, `DELTA`, `PARITY_MATRIX` | draft posture and remaining closure work | no draft/pending language; promoted closure truth only | `scripts/check-engi-spec-family.mjs` |

#### G.3 Promotion phase matrix

| Phase | Pointer state | Mutable surfaces | Required validation or output | Fail-closed reason |
| --- | --- | --- | --- | --- |
| draft-family preflight | `ENGI_SPEC.txt = V21` | none | `check-engi-spec-family --mode draft --current-target V21` | prevents structurally incomplete hand-authored V22 family from entering promotion |
| active-canon preflight | `ENGI_SPEC.txt = V21` | none | `check-engi-canonical-inputs --current-target V21` | prevents promotion from starting when current canon inputs are incomplete |
| inherited proof/quality/specifying gates | `ENGI_SPEC.txt = V21` | generated preview outputs only | inherited test/gate suite plus V22 family draft validation | prevents V22 promotion from skipping depended-on V19/V20/V21 canon |
| hand-authored promotion preparation | `ENGI_SPEC.txt = V21` | V22 `SPEC`, `DELTA`, `PARITY_MATRIX` status blocks | promotion-time status rewrite | prevents promoted-mode checks from failing only because truthful draft status was never rewritten |
| pointer advancement | mutate to `V22` | `ENGI_SPEC.txt` | pointer write only after preconditions pass | prevents premature pointer mutation |
| generated appendix and artifact emission | `ENGI_SPEC.txt = V22` | `ENGI_SPEC_V22_PROVEN.md`, `.engi/v22-*` | generate appendix and V22 generated artifacts | prevents stale or missing generated canon |
| newly pointed canon validation | `ENGI_SPEC.txt = V22` | none | `check-engi-canonical-inputs --current-target V22` | prevents pointing at a version whose generated inputs are incomplete |
| promoted family validation | `ENGI_SPEC.txt = V22` | none | `check-engi-spec-family --mode promoted` | prevents stale promoted status or transitional parity judgments |
| final repository hygiene | `ENGI_SPEC.txt = V22` | none | `git diff --check` and commit-body derivation | prevents malformed diff or unsupported closure claim |

### Appendix H. Operator surface and quality contract catalog

#### H.1 Operator transcript flow inventory

| flowId | Scenario/principal mode | Required visible truth |
| --- | --- | --- |
| `seeded-shell-posture` | `auth-issuer-rollback` / buyer / patch | active canon, draft target, controls, and ordered operator panels are visible |
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
| `.engi/verification-report.json` | verification-decision carrier | `engi-demo/src/canonical/evaluation-materialization.js`, `engi-demo/src/engi-demo.js` | verification proof family, operator evaluation panels |
| `.engi/source-to-shares.json` | settlement contribution/allocation carrier | `engi-demo/src/canonical/settlement.js` | settlement proof family, accounting precision report, operator settlement preview |
| `.engi/projection-policy.json` | projection/disclosure policy contract | `engi-demo/src/canonical/projections.js`, `engi-demo/src/engi-demo.js` | disclosure-boundary proof family, public/reviewer/buyer/internal projections |
| `.engi/system-proof-bundle.json` | whole-system proof bundle | `engi-demo/src/canonical/proof-materialization.js`, `engi-demo/src/engi-demo.js` | `_PROVEN_`, operator proof review, proof replay |

#### K.3 Canonical promotion artifacts

| Artifact path | Current contract role | Current generator/source basis | Primary consumers |
| --- | --- | --- | --- |
| `ENGI_SPEC_V22_PROVEN.md` | generated V22 proof appendix over inherited proof/quality/specifying canon plus V22 system changes | `scripts/generate-engi-proven.mjs`, `engi-demo/src/canonical/proven-generator.js` | canonical readers, promotion validation, future drafting inputs |
| `.engi/v22-spec-family-report.json` | executable structural and density verdict over the hand-authored V22 family | `engi-demo/src/canonical/v21-specifying.js`, `scripts/check-engi-spec-family.mjs` | promotion preflight and postflight, canonical-input family |
| `.engi/v22-canonical-input-report.json` | executable verdict over the active pointed canonical input set during V22 promotion | `engi-demo/src/canonical/v21-specifying.js`, `scripts/check-engi-canonical-inputs.mjs` | promotion preflight/post-generation validation, future drafting inputs |

## V22 completion condition

V22 first-pass completion should mean:
1. active canon truth is executable inside ENGI runtime and demo shell,
2. API, browser, README, and tests are aligned to the same canon posture source,
3. stale V15, V19, and V20-draft runtime/demo posture is removed from runtime/API/browser/README and from the operator explainer corpus,
4. V22 explicitly decides which of the V20 deferred proof/operator boundaries it will close in-version,
5. `ENGI_SPEC_V22.md` is dense enough to re-derive the current system without depending on omitted earlier-version semantics,
6. the V22 file family satisfies the V21-era full-canon checker contract in draft mode,
7. and V22 is then ready to move from pre-implementation into concrete source execution.
