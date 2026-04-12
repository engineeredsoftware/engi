# ENGI Spec V20 Proper

## Status

- Scope: non-canonical historical full-canon reconstruction of V20 using only V20 canonical inputs
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible-canon reports, active canonical `.engi/v20-*` operator-quality reports, and `ENGI_SPEC_V20_PROVEN.md`
- Current canonical/latest target: `V20`
- Source parity state: this family is a non-canonical reconstruction pass that restates V20 as a complete full-system canon from V20 hand-authored canon plus generated V20/V19 canon only
- V20_PROPER state: historical full-canon reconstruction drafting is in progress for specifying validation; this family is not the active pointed canon

## Version executive summary

V20 closed operator-quality canon on top of V19 reproducible canon.

The historical problem is that V20's actual promoted system truth is richer than the hand-authored V20 file family:
- V20 hand-authored files are draft-shaped and focus-shaped,
- V20 `_PROVEN_` plus `.engi/v20-*` carry decisive canonical truth,
- and a reader cannot recover a full current V20 system only from `ENGI_SPEC_V20.md`.

`V20_PROPER` exists to restate V20 as a full canon from that version's own canonical inputs only.
It does not add new V20 semantics.
It makes already-promoted V20 semantics implementation-derivable and audit-derivable in one place so V21 specifying can be tested against a second full canon.

The reconstruction basis is:
- `ENGI_SPEC_V20.md`
- `ENGI_SPEC_V20_NOTES.md`
- `ENGI_SPEC_V20_SYSTEM_PARITY_MATRIX.md`
- `ENGI_SPEC_V20_PROVEN.md`
- `.engi/v19-*`
- `.engi/v20-*`

## Canonical ENGI executive summary

Under V20 canon, ENGI is a proof-bearing operating system for engineering assetizing whose review surface must be operator-legible without weakening proof closure.

The V20 chain is:
1. deposited assets enter through typed or surface-bound intake,
2. a need is measured and expressed as prompt/inference-owned demand,
3. deposits are fit, recalled, ranked, and verified,
4. selection and materialization produce branch artifacts and proof-bearing runtime artifacts,
5. identity, authorization, and projection policy constrain what each principal may observe,
6. source-to-shares and settlement compute exact contribution/accounting consequences,
7. proof families, witness manifests, replay surfaces, generated matrices, and the generated appendix make the run auditable,
8. and V20 adds the rule that the operator shell itself must be reviewable through transcript, visual, accessibility, performance, and projection-quality proof.

V20 does not reopen proof-family semantics.
It canonizes the operator-quality surface through which already-proven ENGI behavior is reviewed.

## V20 source-of-truth hierarchy

For a correct V20 reading, truth order is:
1. `ENGI_SPEC.txt`
2. `ENGI_SPEC_V20.md`
3. `ENGI_SPEC_V20_SYSTEM_PARITY_MATRIX.md`
4. `ENGI_SPEC_V20_PROVEN.md`
5. `.engi/v20-*`
6. inherited `.engi/v19-*`
7. `ENGI_SPEC_V20_NOTES.md`

`V20_PROPER` follows a stricter reconstruction rule:
- it may restate only truths already present in those V20 canonical inputs,
- it may reorganize them into a fuller shape,
- and it may not import future version semantics, future generated artifact families, or later specifying-only claims as if V20 already depended on them.

## V20 full-system, re-implementation, and audit rule

V20 canon already depended on more than one prose file.

A correct V20 implementation and audit must be able to derive:
- the active scenario/branch/principal coverage axes,
- the nine proof families and their artifacts,
- the inherited V19 reproducible-canon reports,
- the V20 operator-quality reports,
- the required operator transcript flows,
- the visual, accessibility, performance, and projection-quality budgets,
- the disclosure and settlement boundaries,
- and the V20 promotion sequence.

`V20_PROPER` therefore treats V20 as a full system, not as an operator-only delta.

## V20 totality and precision enforcement rule

This reconstruction treats omission as a defect.

V20 is only fully restated when this file visibly carries:
- a canonical type and surface catalog,
- a subsystem totality and derivability matrix,
- a proof-family closure catalog,
- an exact proof-family inventory matrix,
- a generated artifact contract catalog,
- an exact generated-artifact inventory matrix,
- a validation gate catalog,
- a current canonical source map,
- a file-family and reconstruction contract catalog,
- an operator surface and quality contract catalog,
- a scenario/workflow/cross-product catalog,
- a fail-closed posture matrix,
- and a source-bearing deliverable/artifact catalog.

## V20 system goals, non-goals, and design principles

### Goals

- preserve V19 proof closure while making review quality provable,
- let a buyer, reviewer, internal operator, or bounded public observer understand the system from the operator shell,
- keep generated proof and quality artifacts deterministic and promotion-safe,
- and ensure quality checks themselves do not require forbidden private surfaces.

### Non-goals

- new proof families,
- full mutation-cross-product expansion,
- full source-level projection-security matrix expansion,
- broad design-system replacement,
- production deployment/SLO canon,
- or external accessibility certification.

### Design principles

- proof-adjacent quality, not cosmetic drift,
- deterministic generated artifacts over volatile telemetry,
- representative operator-quality smoke over uncontrolled matrix multiplication,
- explicit active-canon posture,
- and fail-closed review surfaces.

## V20 system architecture and layer boundaries

V20 canon is layered as follows:

| Layer | Current role | Primary V20 canonical carriers |
| --- | --- | --- |
| deposit and supply | select raw content or repo-authenticated artifacts into an admissible asset supply | operator shell, selected inventory surfaces, selected candidate pack |
| need measurement and prompting | turn scenario and repo context into measured need and prompt-owned inferred demand | need surfaces, prompt/inference artifacts, prompt-completeness and inference-synthesis proof families |
| fit, evaluation, verification | reconcile deposits against need, rank candidates, and record verification consequences | evaluation panels, verification report, verification proof family |
| selection and materialization | lock selected assets, materialize source-bearing outputs, and record exclusions | asset-pack lock, selected-source material, materialization proofs |
| identity, authorization, projection | bind principals to allowed actions and visible artifacts | authorization decisions, projection policy, bounded public proof, disclosure proofs |
| settlement and accounting | compute contribution, participation, allocation, and journal exactness | source-to-shares, settlement participation, accounting precision, journal diff |
| proof and replay | package the run into family proofs, witness manifest, replay catalog, and generated appendix | system-proof bundle, proof-contract, proof-witness manifest, `_PROVEN_` |
| operator-quality review | prove the shell is reviewable through transcript, visual, accessibility, performance, and projection-quality closure | `.engi/v20-*`, `ENGI_SPEC_V20_PROVEN.md`, browser surfaces |

## V20 canonical domain model

| Domain object or class | Current role | Current canonical carriers |
| --- | --- | --- |
| scenario | seeded engineering incident/remediation situation | `scenarioIds` in `ENGI_SPEC_V20_PROVEN.md`, operator transcript rows, scenario/run matrix |
| branch mode | materialization mode for a run | `patch`, `context` in generated appendix and quality reports |
| projection principal | visibility/authority class for review surfaces | `public`, `reviewer`, `buyer`, `internal` in quality reports and projection smoke matrix |
| need | measured engineering demand | scenario/run matrix `needId`, operator summary surfaces, proof family members |
| asset pack | selected set of assets surviving verification/materialization | scenario/run matrix `assetPackId`, `.engi/asset-pack.lock.json` |
| branch | remediation or context-bearing output branch | scenario/run matrix `branchName`, operator shell branch surfaces |
| proof family | one of nine proof-bearing subsystems | proof-family inventory and family details in `ENGI_SPEC_V20_PROVEN.md` |
| proof artifact | family-local proof JSON object | `.engi/*-proof.json` paths in family inventory |
| witness artifact | artifact hashed and classified into proof closure | witness digest inventories in `ENGI_SPEC_V20_PROVEN.md` |
| deliverable artifact | source-bearing, projection-bearing, or settlement-bearing runtime output | `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json`, `.engi/source-to-shares.json`, `.engi/verification-report.json` |
| generated quality report | operator-quality proof object | `.engi/v20-*.json` |
| generated appendix | release-facing summary of inherited and new canon | `ENGI_SPEC_V20_PROVEN.md` |

## V20 whole ENGI operator chain

1. Start from a seeded shell with explicit version posture.
2. Select scenario, branch mode, and projection.
3. Intake raw content or repo-authenticated artifacts into deposit supply.
4. Measure need and show task, failure modes, target artifacts, and closure criteria.
5. Reconcile fit between deposit and need.
6. Rank and verify candidate assets.
7. Materialize branch artifacts and selected source-bearing surfaces.
8. Show proof-family closure and theorem/replay context.
9. Show projection-specific visibility boundaries.
10. Show source-to-shares and settlement consequences.
11. Expose generated report and appendix references.
12. Permit reset/recovery while preserving fail-closed states.

## V20 canonical subsystem surfaces

### Depositing and asset supply

Current canon requires deposit intake to be explicit and fail closed.

Current canonical objects and emitted artifacts:
- deposit session and selected inventory refs in the operator shell,
- raw or repo-authenticated asset selection surfaces,
- selected inventory counts by artifact/origin kind,
- and the later `.engi/asset-pack.lock.json` witness.

Current algorithms and derivation rules:
- intake begins from seeded scenario supply,
- a run remains inadmissible until raw content or repo artifact selection survives,
- and selected supply is carried forward into fit, verification, selection, and settlement views.

Current invariants and fail-closed conditions:
- empty or invalid intake cannot claim a branch run,
- no selected supply means no asset pack,
- and operator status must surface invalid-deposit failure without mutating success state.

Current proof obligations:
- supply must remain traceable into selection/materialization and settlement,
- and selected inputs must be represented in witness artifacts and quality-visible branch review.

Current source-bearing implementation basis:
- `engi-demo/public/index.html`
- `engi-demo/public/app.js`
- `engi-demo/test/e2e.test.js`

Current validating commands and parity basis:
- `npm --prefix engi-demo run test:e2e`
- `npm --prefix engi-demo run test:v20-operator-transcript`
- `npm --prefix engi-demo run test:v20-visual`

Current accepted boundaries:
- V20 does not expand deposit semantics beyond seeded local demo supply,
- but it does require the operator shell to show the intake posture truthfully.

### Needing and prompt/inference ownership

Current canon requires measured need to remain explicit, prompt-owned where inferred, and parse-admissible where inferred fields are used.

Current canonical objects and emitted artifacts:
- need summary surfaces,
- prompt family registry and prompt contracts,
- prompt surfaces and parsed completion envelopes,
- inference proofs and prompt-completeness proof artifacts.

Current algorithms and derivation rules:
- seeded scenario context produces a measured need,
- prompt-owned fields are classified and registered,
- inference closure depends on prompt completeness plus parsed-envelope admissibility.

Current invariants and fail-closed conditions:
- prompt contract incompleteness blocks canonical closure,
- parsed-envelope inadmissibility blocks inferred-field acceptance,
- and undeclared downstream consumers are not allowed.

Current proof obligations:
- prompt-completeness and inference-synthesis families must close over task, failure modes, constraints, target artifact kinds, and closure criteria.

Current source-bearing implementation basis:
- `ENGI_SPEC_V20_PROVEN.md`
- `scripts/generate-engi-proven.mjs`

Current validating commands and parity basis:
- `npm --prefix engi-demo run test:proof-member-matrix`
- `npm --prefix engi-demo run test:theorem-evidence-matrix`
- `npm --prefix engi-demo run test:deterministic-replay`

Current accepted boundaries:
- V20 inherits proof-family semantics here rather than reopening them,
- but operator review must still expose their closure-bearing effect.

### Fit, recall, ranking, and verification

Current canon requires fit and verification to remain distinct from mere asset presence.

Current canonical objects and emitted artifacts:
- fit summaries and decisive/overlap kinds,
- evaluated and ranked candidates,
- verification receipts and verification report,
- verification-decisions proof artifact.

Current algorithms and derivation rules:
- candidates are evaluated against the measured need,
- ranking and verification determine survivability and use tier,
- and verification outcomes feed selection, proof, and settlement.

Current invariants and fail-closed conditions:
- no-survivor asset pack means no branch/materialization success,
- verification insufficiency cannot be promoted into selected output,
- and use-tier consequences must remain explicit.

Current proof obligations:
- issuance, provenance, sufficiency, issuer-policy, and use-tier consequence closure.

Current source-bearing implementation basis:
- `ENGI_SPEC_V20_PROVEN.md`
- `ENGI_SPEC_V20_SYSTEM_PARITY_MATRIX.md`

Current validating commands and parity basis:
- `npm --prefix engi-demo run test:proof-member-matrix`
- `npm --prefix engi-demo run test:theorem-evidence-matrix`
- `npm --prefix engi-demo run test:v20-operator-transcript`

Current accepted boundaries:
- V20 does not change verification family semantics,
- but operator-quality canon requires verification consequences to be reviewable.

### Selection and materialization

Current canon requires selected outputs, exclusions, and visibility rules to stay explicit.

Current canonical objects and emitted artifacts:
- `.engi/asset-pack.lock.json`
- `.engi/selected-source-material.json`
- `.engi/materialization-exclusions.json`
- `.engi/materialization-proof.json`
- `.engi/materialization-visibility-proof.json`
- `.engi/selection-and-materialization-proof.json`

Current algorithms and derivation rules:
- surviving candidates become a selected asset pack,
- selected source material and exclusions are emitted deterministically,
- and visibility/materialization rules are proven as part of the family closure.

Current invariants and fail-closed conditions:
- locked units, selected assets, and materialized sources must agree,
- missing selected-source material blocks buyer/internal source review,
- and exclusion or visibility drift fails closure.

Current proof obligations:
- selected-set closure,
- lock closure,
- materialized-source closure,
- exclusion closure,
- visibility closure,
- and selection consistency.

Current source-bearing implementation basis:
- `ENGI_SPEC_V20_PROVEN.md`
- `ENGI_SPEC_V20_SYSTEM_PARITY_MATRIX.md`

Current validating commands and parity basis:
- `npm --prefix engi-demo run test:proof-member-matrix`
- `npm --prefix engi-demo run test:state-machine`
- `npm --prefix engi-demo run test:v20-operator-transcript`

Current accepted boundaries:
- V20 keeps branch modes at `patch` and `context`,
- and does not add new materialization modes.

### Identity, authorization, and sensitive flow

Current canon requires principal binding, authorization decisions, and confidentiality classes to remain explicit.

Current canonical objects and emitted artifacts:
- `.engi/identity-bindings.json`
- `.engi/authorization-decisions.json`
- `.engi/sensitive-data-flow.json`
- `.engi/identity-authorization-proof.json`
- `.engi/sensitive-data-flow-proof.json`
- `.engi/authorization-and-sensitive-flow-proof.json`

Current algorithms and derivation rules:
- principals are bound before projection,
- authorization decisions are generated against requested actions,
- confidentiality classes determine whether artifacts may surface.

Current invariants and fail-closed conditions:
- authorization denial blocks action success,
- unauthorized public flow is forbidden,
- and sensitive data classes cannot silently degrade.

Current proof obligations:
- principal authority totality,
- authorization decision closure,
- classification closure,
- policy assignment closure,
- and no unauthorized public flow.

Current source-bearing implementation basis:
- `ENGI_SPEC_V20_PROVEN.md`
- `ENGI_SPEC_V20_SYSTEM_PARITY_MATRIX.md`

Current validating commands and parity basis:
- `npm --prefix engi-demo run test:e2e`
- `npm --prefix engi-demo run test:v20-projection-quality`
- `npm --prefix engi-demo run test:negative-mutation-matrix`

Current accepted boundaries:
- V20 does not expand into a full source-level projection-security matrix,
- but principal-specific quality smoke is required.

### Disclosure and projection

Current canon requires public, reviewer, buyer, and internal projections to remain explicitly bounded.

Current canonical objects and emitted artifacts:
- `.engi/projection-policy.json`
- `.engi/bounded-public-proof.json`
- `.engi/redaction-proof.json`
- `.engi/disclosure-proof.json`
- `.engi/disclosure-boundary-proof.json`
- `.engi/v20-projection-quality-smoke-matrix.json`

Current algorithms and derivation rules:
- projection policy classifies artifact visibility,
- bounded-public, redaction, and disclosure proofs enforce principal-local views,
- and V20 quality smoke proves review quality without leaking forbidden surfaces.

Current invariants and fail-closed conditions:
- public projection overexposure fails disclosure closure,
- reviewer projection may show proof review but not raw files,
- buyer projection may show authorized non-source material but not raw files,
- and internal projection is the only principal that may view raw source-bearing surfaces.

Current proof obligations:
- projection-policy closure,
- bounded-public metadata-only closure,
- redaction alignment,
- disclosure verdict alignment.

Current source-bearing implementation basis:
- `engi-demo/public/app.js`
- `engi-demo/test/e2e.test.js`
- `ENGI_SPEC_V20_PROVEN.md`

Current validating commands and parity basis:
- `npm --prefix engi-demo run test:e2e`
- `npm --prefix engi-demo run test:v20-projection-quality`
- `npm --prefix engi-demo run test:v20-accessibility`

Current accepted boundaries:
- V20 retains representative principal-quality smoke instead of a full source projection matrix.

### Settlement and exact accounting

Current canon requires settlement participation, contribution, allocation, clipping, normalization, and journal integrity to remain exact.

Current canonical objects and emitted artifacts:
- `.engi/source-to-shares.json`
- `.engi/settlement-participation.json`
- `.engi/accounting-precision-report.json`
- `.engi/journal-diff.json`
- `.engi/journal-completeness-proof.json`
- `.engi/settlement-proof.json`
- `.engi/settlement-source-to-shares-proof.json`

Current algorithms and derivation rules:
- contribution and clipping feed normalization,
- normalization feeds participation and allocation,
- allocation feeds journal and settlement proof.

Current invariants and fail-closed conditions:
- settlement conservation drift fails closure,
- journal completeness must remain exact,
- and selected but zero-credit participation must remain visible.

Current proof obligations:
- contribution totality,
- clipping determinism,
- normalization exactness,
- participation totality,
- allocation conservation,
- journal completeness,
- settlement theorem integrity.

Current source-bearing implementation basis:
- `ENGI_SPEC_V20_PROVEN.md`
- `ENGI_SPEC_V20.md`

Current validating commands and parity basis:
- `npm --prefix engi-demo run test:contract-ledger`
- `npm --prefix engi-demo run test:proof-member-matrix`
- `npm --prefix engi-demo run test:v20-operator-transcript`

Current accepted boundaries:
- V20 does not change settlement family semantics,
- but it requires settlement explanation to remain operator-reviewable.

### Proof contract, witnesses, and replay

Current canon requires proof families, theorem checks, witness manifests, replay steps, and generated appendix rendering to remain coherent.

Current canonical objects and emitted artifacts:
- `.engi/proof-contract.json`
- `.engi/system-proof-bundle.json`
- `.engi/proof-witness-manifest.json`
- inherited `.engi/v19-*`
- `ENGI_SPEC_V20_PROVEN.md`

Current algorithms and derivation rules:
- a run emits a system-proof bundle over nine families,
- witness digests and replay catalogs bind proof objects to artifacts,
- V19 reproducible-canon reports prove positive matrix, replay, volatility, mutation, and contract-ledger closure,
- V20 generated appendix summarizes inherited V19 and V20 quality reports.

Current invariants and fail-closed conditions:
- missing witness artifact paths fail replay closure,
- unsorted artifact inventory or digest drift fails canonical reports,
- contract-change drift reopens promotion,
- and generated appendix check mode must match the rendered artifact.

Current proof obligations:
- proof-contract materialization,
- evidence-chain closure,
- theorem-check binding,
- bundle coherence,
- witness-manifest coherence,
- replay closure.

Current source-bearing implementation basis:
- `scripts/generate-engi-proven.mjs`
- `scripts/promote-engi-canon.mjs`
- `ENGI_SPEC_V20_PROVEN.md`

Current validating commands and parity basis:
- `npm --prefix engi-demo run test:deterministic-replay`
- `npm --prefix engi-demo run test:volatility`
- `npm --prefix engi-demo run test:negative-mutation-matrix`
- `npm --prefix engi-demo run test:contract-ledger`

Current accepted boundaries:
- V20 inherits representative mutation coverage from V19 rather than expanding every permutation.

## V20 proof-family canon

V20 depends on nine proof families:
- `inference-synthesis`
- `prompt-completeness`
- `static-code-analysis`
- `verification-decisions`
- `selection-and-materialization`
- `authorization-and-sensitive-flow`
- `settlement-source-to-shares`
- `disclosure-boundary`
- `proof-contract`

The family inventory, member counts, theorem counts, replay step ids, and witness artifact paths are canonical because `ENGI_SPEC_V20_PROVEN.md` materially depends on them.

## V20 generated canon

V20 generated canon has two layers.

### Inherited V19 reproducible canon

V20 inherits:
- positive proof-member/theorem/state-machine matrices over `1832` cells,
- deterministic replay over generated canon,
- volatility inventory with zero blocking findings,
- representative negative mutation coverage over `10` mutation classes,
- and the contract-change ledger from `V18` to `V19`.

### V20 operator-quality canon

V20 adds:
- `.engi/v20-operator-acceptance-transcript.json`
- `.engi/v20-visual-regression-report.json`
- `.engi/v20-accessibility-report.json`
- `.engi/v20-performance-budget-report.json`
- `.engi/v20-projection-quality-smoke-matrix.json`
- `.engi/v20-quality-summary.json`
- `ENGI_SPEC_V20_PROVEN.md`

### V20 generated appendix posture

The appendix is generated-only.
It summarizes inherited V19 closure plus V20 operator-quality reports.
It is not manually authored evidence.

## V20 validation canon

The V20 gate family is:
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
- `node scripts/generate-engi-proven.mjs --version V20 --check`

## V20 promotion canon

The V20 promotion command is:
- `npm run promote:canon -- --version V20 --commit <proof-source-commit>`

Promotion must:
1. run inherited runtime and proof gates,
2. run V20 quality gates,
3. run the aggregate non-E2E suite,
4. generate `ENGI_SPEC_V20_PROVEN.md`,
5. re-check the generated appendix,
6. run `git diff --check`,
7. and only then advance the canonical pointer.

## V20 accepted boundaries and reopen conditions

| Boundary | Current rationale | Reopen condition |
| --- | --- | --- |
| full mutation cross-products deferred | V19 representative mutation matrix remains accepted | mutation behavior varies by member, theorem, scenario, branch, principal, or artifact path |
| full source projection-security matrix deferred | V17 browser matrix plus V20 projection-quality smoke remains accepted | projection policy changes or forbidden artifacts leak |
| broad redesign deferred | V20 quality is operator readability and operability, not aesthetic replacement | quality budgets cannot be satisfied without redesign |
| production SLOs deferred | V20 budgets are deterministic local review budgets | hosted/deployed runtime becomes canonical |
| external accessibility certification deferred | deterministic DOM/browser checks are the first gate | local checks no longer prove the required concerns |

## V20 appendices and canonical supporting material

### Appendix A. Canonical type and surface catalog

#### A.1 Core runtime and operator surfaces

| Surface or artifact | Current role |
| --- | --- |
| seeded shell posture | initial operator-ready state with active canon/draft target posture |
| scenario selector | chooses seeded scenario |
| branch-mode selector | chooses `patch` or `context` |
| projection selector | chooses `public`, `reviewer`, `buyer`, or `internal` |
| deposit summary | describes what was deposited or selected |
| need summary | shows measured task, failure modes, target artifact kinds, closure criteria |
| fit summary | shows decisive kinds, overlap, normalization pressure |
| evaluation and ranking surface | shows candidate survivability and verification explanation |
| branch artifact summary | shows branch name and emitted artifacts |
| settlement preview | shows participation, credited vs zero-credit consequences |
| proof-family catalog | shows family closure and theorem-bearing evidence |
| generated appendix/report references | expose generated canon to the operator |

#### A.2 Proof-bearing runtime artifacts

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

### Appendix B. Proof family closure catalog

Current V20 proof closure facts:
- `familyCount = 9`
- `memberCount = 45`
- `theoremCount = 57`
- `runCount = 16`
- `artifactDigestCount = 704`
- `fullyProven = true`

#### B.0 Exact proof-family inventory matrix

| proofFamily | proofArtifactPath | memberCount | theoremCount | replayStepIds | witnessArtifactPaths |
| --- | --- | --- | --- | --- | --- |
| `inference-synthesis` | `.engi/inference-synthesis-proof.json` | 5 | 6 | `inference-synthesis.coverage-reconciliation`, `inference-synthesis.evaluator-status-replay`, `inference-synthesis.evidence-basis-replay` | `.engi/inference-moment-contracts.json`, `.engi/inference-proofs.json`, `.engi/prompt-implementation-surface.json`, `.engi/prompt-surfaces.json`, `.engi/parsed-completion-envelopes.json`, `.engi/inference-synthesis-proof.json` |
| `prompt-completeness` | `.engi/prompt-completeness-proof.json` | 5 | 8 | `prompt-completeness.member-set-reconciliation`, `prompt-completeness.parse-admissibility`, `prompt-completeness.consumer-closure`, `prompt-completeness.provenance-truth` | `.engi/prompt-family-registry.json`, `.engi/prompt-contracts.json`, `.engi/prompt-surfaces.json`, `.engi/parsed-completion-envelopes.json`, `.engi/prompt-completeness-proof.json` |
| `static-code-analysis` | `.engi/static-measurement-proof.json` | 4 | 5 | `static-code-analysis.stage-domain`, `static-code-analysis.stage-mapping`, `static-code-analysis.receipt-report-proof` | `.engi/code-analysis-fact-registry.json`, `.engi/static-heuristics-registry.json`, `.engi/measurement-receipts.json`, `.engi/static-measurement-report.json`, `.engi/static-measurement-proof.json` |
| `verification-decisions` | `.engi/verification-decisions-proof.json` | 5 | 7 | `verification-decisions.stage-mapping`, `verification-decisions.use-tier-consequence` | `.engi/verification-report.json`, `.engi/verification-receipts.json`, `.engi/verification-decisions-proof.json` |
| `selection-and-materialization` | `.engi/selection-and-materialization-proof.json` | 5 | 7 | `selection-and-materialization.selected-set`, `selection-and-materialization.visibility` | `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json`, `.engi/materialization-exclusions.json`, `.engi/materialization-visibility-proof.json`, `.engi/selection-consistency-proof.json`, `.engi/materialization-proof.json`, `.engi/selection-and-materialization-proof.json` |
| `authorization-and-sensitive-flow` | `.engi/authorization-and-sensitive-flow-proof.json` | 5 | 6 | `authorization-sensitive-flow.identity`, `authorization-sensitive-flow.flows` | `.engi/identity-bindings.json`, `.engi/authorization-decisions.json`, `.engi/sensitive-data-flow.json`, `.engi/identity-authorization-proof.json`, `.engi/sensitive-data-flow-proof.json`, `.engi/authorization-and-sensitive-flow-proof.json` |
| `settlement-source-to-shares` | `.engi/settlement-source-to-shares-proof.json` | 7 | 7 | `settlement-source-to-shares.contribution-allocation`, `settlement-source-to-shares.journal-theorem` | `.engi/source-to-shares.json`, `.engi/settlement-participation.json`, `.engi/accounting-precision-report.json`, `.engi/journal-diff.json`, `.engi/journal-completeness-proof.json`, `.engi/settlement-proof.json`, `.engi/settlement-source-to-shares-proof.json` |
| `disclosure-boundary` | `.engi/disclosure-boundary-proof.json` | 4 | 5 | `disclosure-boundary.policy-bounded-public`, `disclosure-boundary.redaction-disclosure` | `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/redaction-proof.json`, `.engi/disclosure-proof.json`, `.engi/disclosure-boundary-proof.json` |
| `proof-contract` | `.engi/proof-contract.json` | 5 | 6 | `proof-contract.contract-materialization`, `proof-contract.evidence-chain`, `proof-contract.bundle-witness` | `.engi/proof-contract.json`, `.engi/system-proof-bundle.json`, `.engi/proof-witness-manifest.json` |

#### B.1 Inference-synthesis

- what it proves: inferred need fields are covered exactly once with truthful evaluator status and closed evidence basis
- how current closure is carried: moment contracts, field proofs, prompt surfaces, parsed envelopes, and evaluator evidence
- what things become proven: task, failure modes, constraints, target artifact kinds, closure criteria
- current generated/test bindings: `_PROVEN_`, inherited V19 matrices, deterministic replay, negative mutation
- fail-closed conditions: missing moment contracts, evaluator drift, prompt-surface drift, parsed-envelope omission

#### B.2 Prompt-completeness

- what it proves: prompt-owned fields are classified, registered, contract-complete, parse-admissible, and downstream-closed
- how current closure is carried: prompt family registry, prompt contracts, prompt surfaces, parsed envelopes, proof object
- what things become proven: task, failure modes, constraints, target artifact kinds, closure criteria
- current generated/test bindings: `_PROVEN_`, inherited V19 matrices, deterministic replay, negative mutation
- fail-closed conditions: ghost coverage, missing exclusions, incomplete contracts, false provenance, inadmissible parsed envelopes

#### B.3 Static-code-analysis

- what it proves: analysis stages remain domain-pure, mapped, registry-backed, and report/proof aligned
- how current closure is carried: fact registry, heuristic registry, receipts, report, proof object
- what things become proven: deterministic parser, repo context, content unit, measurement stages
- current generated/test bindings: `_PROVEN_`, inherited V19 matrices
- fail-closed conditions: stage-domain drift, registry-role drift, receipt/report disagreement

#### B.4 Verification-decisions

- what it proves: issuance, provenance, sufficiency, issuer policy, and use-tier consequences remain explicit
- how current closure is carried: verification report, receipts, proof object
- what things become proven: issuance, provenance, sufficiency, issuer policy, use-tier consequence
- current generated/test bindings: `_PROVEN_`, inherited V19 matrices
- fail-closed conditions: receipt/report disagreement, use-tier consequence drift, theorem grouping drift

#### B.5 Selection-and-materialization

- what it proves: selected assets, locks, materialized source, exclusions, and visibility rules remain coherent
- how current closure is carried: lock, selected-source manifest, exclusion manifest, visibility proof, materialization proof
- what things become proven: selected assets, locked units, materialized source, exclusions, visibility rules
- current generated/test bindings: `_PROVEN_`, inherited V19 matrices, operator transcript
- fail-closed conditions: selected-set drift, exclusion drift, missing selected-source artifact, visibility-rule mismatch

#### B.6 Authorization-and-sensitive-flow

- what it proves: principal authority, authorization decisions, confidentiality classes, and sensitive-data flows remain bounded
- how current closure is carried: identity bindings, authorization decisions, sensitive-data flow, family proof
- what things become proven: principals, authorization decisions, confidentiality classes, retention/disclosure rules, sensitive-data flows
- current generated/test bindings: `_PROVEN_`, inherited V19 matrices, V20 projection-quality smoke
- fail-closed conditions: authorization denial mismatch, unauthorized public flow, classification drift

#### B.7 Settlement-source-to-shares

- what it proves: contribution, clipping, normalization, participation, allocation, and journal exactness remain conserved
- how current closure is carried: source-to-shares, settlement participation, accounting precision report, journal diff, settlement proofs
- what things become proven: contribution, clipping, normalization, participation, allocation, journal, settlement theorem
- current generated/test bindings: `_PROVEN_`, inherited V19 matrices, operator transcript
- fail-closed conditions: conservation drift, journal incompleteness, settlement theorem mismatch

#### B.8 Disclosure-boundary

- what it proves: projection policy, bounded public metadata, redaction, and disclosure verdicts remain aligned
- how current closure is carried: projection policy, bounded public proof, redaction proof, disclosure proof, family proof
- what things become proven: projection policy, bounded public proof, redaction proof, disclosure proof
- current generated/test bindings: `_PROVEN_`, inherited V19 matrices, V20 projection-quality smoke
- fail-closed conditions: public projection overexposure, redaction/disclosure disagreement, policy drift

#### B.9 Proof-contract

- what it proves: system proof bundle, theorem binding, witness manifest, and replay surfaces remain coherent
- how current closure is carried: proof contract, system-proof bundle, witness manifest
- what things become proven: proof contract, evidence chain, theorem checks, system proof bundle, witness-manifest closure
- current generated/test bindings: `_PROVEN_`, inherited V19 matrices, deterministic replay, negative mutation, contract ledger
- fail-closed conditions: missing witness artifact paths, bundle incoherence, replay-step drift

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
| `.engi/v20-operator-acceptance-transcript.json` | V20 operator-quality canon | proves executable operator workflow truth |
| `.engi/v20-visual-regression-report.json` | V20 operator-quality canon | proves deterministic visual stability |
| `.engi/v20-accessibility-report.json` | V20 operator-quality canon | proves deterministic accessibility closure |
| `.engi/v20-performance-budget-report.json` | V20 operator-quality canon | proves normalized local performance budgets |
| `.engi/v20-projection-quality-smoke-matrix.json` | V20 operator-quality canon | proves principal-quality smoke without forbidden artifacts |
| `.engi/v20-quality-summary.json` | V20 operator-quality canon | aggregates quality closure |
| `ENGI_SPEC_V20_PROVEN.md` | generated appendix | summarizes inherited V19 and V20 operator-quality canon |

#### C.1 Inherited V19 reproducible-canon artifacts

The inherited V19 artifact family proves:
- positive proof matrices over `1832` cells,
- deterministic replay over committed generated artifacts,
- zero blocking volatility findings,
- representative negative mutation rejection over `10` classes,
- and a passing contract-change ledger.

#### C.2 V20 operator-quality artifacts

The V20 artifact family proves:
- `flowCount = 10`
- `stateCount = 10`
- `checkCount = 11`
- `operationCount = 9`
- `qualityReportCount = 5`
- `generatedArtifactCount = 6`
- `blockingFailureCount = 0`

#### C.3 Shared generated-artifact fields

| Field | Required meaning |
| --- | --- |
| `reportId` | stable report identity |
| `proofSourceCommit` | proof-source commit binding |
| `generatedAt` | generation instant in canonical replay context |
| `generatorId` | generator identity |
| `worktreeState` | clean/preview posture |
| `passed` | blocking pass/fail verdict |
| `blockingFailureCount` | count of blocking failures |
| `acceptedExclusionCount` | count of accepted exclusions |

#### C.4 Artifact-specific generated payload fields

| Artifact | Artifact-specific fields |
| --- | --- |
| operator transcript | `flowCount`, `stepCount`, transcript table rows |
| visual report | `signatureMode`, `screenshotMode`, `stateCount`, signature digests |
| accessibility report | `engine`, `checkCount`, contrast thresholds, assertion counts |
| performance report | `measurementMode`, `operationCount`, `budgetMs`, `normalizedElapsedClass`, `hardGate` |
| projection-quality smoke | `matrixMode`, `cellCount`, `inheritedBrowserMatrixCells`, principal rows |
| quality summary | `qualityReportCount`, inherited matrix counts, per-report aggregate table |
| generated appendix | aggregate verdict, artifact inventories, family details, scenario/run matrix, run details |

#### C.5 Artifact confidentiality and disclosability taxonomy

Canonical V20 classes visible in the appendix include:
- `private-proof-artifact`
- `bounded-public-proof-metadata`
- `licensed-source-material`
- `settlement-preview`
- `verification-evidence`

These classes determine projection boundaries and whether an artifact may surface publicly, only internally, or only in bounded proof form.

#### C.6 V20 generated appendix posture

`ENGI_SPEC_V20_PROVEN.md` is generated-only and release-bearing.
Its canonical facts include:
- `canonicalCommit = 2f3fb17983223d6951c257be9bfa663419bdfd7e`
- `runCount = 16`
- `familyCount = 9`
- `theoremCount = 57`
- `memberCount = 45`
- `artifactDigestCount = 704`
- `v20QualityPassed = true`

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
| `npm --prefix engi-demo run test:v20-quality-summary` | aggregate quality closure |
| `npm --prefix engi-demo test` | aggregate non-E2E suite |
| `npm run promote:canon -- --version V20 --commit <sha>` | full V20 promotion sequence |

### Appendix E. Current canonical source map

| Source-bearing surface | Current role in V20 canon |
| --- | --- |
| `engi-demo/src/canonical/v20-quality.js` | V20 quality report builders |
| `engi-demo/public/index.html` | operator shell document skeleton |
| `engi-demo/public/app.js` | operator shell behavior and surface posture |
| `engi-demo/public/styles.css` | operator-quality layout, visibility, and focus styling |
| `engi-demo/test/e2e.test.js` | browser workflow/projection assertions |
| `scripts/promote-engi-canon.mjs` | canonical promotion sequence |
| `scripts/generate-engi-proven.mjs` | generated appendix emission/check |
| `ENGI_SPEC_V20.md` | V20 focus-era hand-authored canon |
| `ENGI_SPEC_V20_SYSTEM_PARITY_MATRIX.md` | V20 hand-authored parity ledger |
| `ENGI_SPEC_V20_PROVEN.md` | V20 generated appendix and full family/run inventory |

### Appendix F. Subsystem totality and derivability matrix

| Subsystem or concern | Current canonical contracts or artifacts | Current closure basis | Generated/runtime evidence | Validating commands | Current source basis |
| --- | --- | --- | --- | --- | --- |
| repo supply and depositing | deposit intake, selected inventory refs, asset-pack lock | operator intake and selection flow | operator shell, `.engi/asset-pack.lock.json` | `test:e2e`, `test:v20-operator-transcript` | `engi-demo/public/app.js` |
| needing and measured demand | need summaries and inferred demand | prompt/inference closure | prompt proof artifacts and operator summary | proof-member/theorem matrices | `ENGI_SPEC_V20_PROVEN.md` |
| prompt/inference/evaluator ownership | prompt contracts, prompt surfaces, parsed envelopes | prompt-completeness plus inference-synthesis | `.engi/prompt-*.json`, `.engi/inference-*.json` | proof matrices, replay | `ENGI_SPEC_V20_PROVEN.md` |
| depositing-to-needing fit | fit summary and decisive/overlap kinds | operator and verification explanation | operator shell, verification report | `test:v20-operator-transcript` | `engi-demo/public/app.js` |
| recall and ranking | evaluated candidates and ranking scores | verification and selection closure | operator evaluation panel | `test:e2e` | `engi-demo/public/app.js` |
| verification decisions | verification receipts/report/proof | verification-decisions family | `.engi/verification-report.json` | proof matrices | `ENGI_SPEC_V20_PROVEN.md` |
| selection and materialization | lock, selected-source, exclusions, materialization proofs | selection/materialization family | `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json` | proof matrices, transcript | `ENGI_SPEC_V20_PROVEN.md` |
| branch artifacts and deliverables | branch name, emitted files, deliverable inventory | operator branch review | scenario/run matrix, operator shell | `test:e2e`, `test:v20-visual` | `engi-demo/public/app.js` |
| identity, authority, signing, and policy | identity bindings, auth decisions, projection policy | authorization/disclosure families | `.engi/authorization-decisions.json`, `.engi/projection-policy.json` | `test:e2e`, `test:v20-projection-quality` | `ENGI_SPEC_V20_PROVEN.md` |
| sensitive data and confidentiality flows | confidentiality classes and sensitive flow proof | authorization/disclosure families | disclosure classification tables | replay, projection-quality smoke | `ENGI_SPEC_V20_PROVEN.md` |
| projection, disclosure, and redaction | public/reviewer/buyer/internal posture | disclosure-boundary family and V20 quality smoke | bounded public proof, redaction proof, smoke matrix | `test:e2e`, `test:v20-projection-quality` | `engi-demo/public/app.js` |
| proof families, members, theorems, witnesses, and replay | nine family proofs, witness manifest, replay steps | family inventory and run details | `ENGI_SPEC_V20_PROVEN.md` | proof matrices, replay, mutation | `scripts/generate-engi-proven.mjs` |
| settlement, source-to-shares, journals, and exact accounting | source-to-shares, participation, journal diff, settlement proof | settlement family | settlement artifacts and operator settlement preview | `test:contract-ledger`, transcript | `ENGI_SPEC_V20_PROVEN.md` |
| telemetry, persistence, state, and failure semantics | quality reports and fail-closed states | V19/V20 generated reports | `.engi/v19-*`, `.engi/v20-*` | replay, volatility, quality summary | `scripts/generate-engi-proven.mjs` |
| host/runtime capability truth | local browser, deterministic DOM assertions, canonical promotion command | V20 quality and promotion rules | report builders and promotion plan | `promote:canon --dry-run` | `scripts/promote-engi-canon.mjs` |
| operator experience and pedagogy | transcript, ordered panels, explicit version posture | V20 operator-quality canon | transcript, visual report, accessibility report | V20 quality tests | `engi-demo/public/index.html`, `styles.css`, `app.js` |
| validation and test stack | layered gate family | V19+V20 gate inventory | gate commands and reports | full gate suite | `ENGI_SPEC_V20.md`, `_PROVEN_` |
| generated artifacts and canonical promotion | generated appendix and `.engi/v20-*` family | promotion command and appendix check | `ENGI_SPEC_V20_PROVEN.md`, `.engi/v20-*` | `promote:canon`, appendix `--check` | `scripts/promote-engi-canon.mjs` |

### Appendix G. Canonical file-family and promotion contract catalog

#### G.1 Exact V20 canonical family responsibility matrix

| File or family | Current responsibility |
| --- | --- |
| `ENGI_SPEC_V20.md` | focus-era hand-authored operator-quality canon |
| `ENGI_SPEC_V20_NOTES.md` | non-normative drafting notes |
| `ENGI_SPEC_V20_SYSTEM_PARITY_MATRIX.md` | focus-era source parity and accepted boundaries |
| `ENGI_SPEC_V20_PROVEN.md` | generated inherited-proof plus V20-quality appendix |
| `.engi/v19-*` | inherited reproducible-canon evidence |
| `.engi/v20-*` | V20 operator-quality evidence |

#### G.2 V20_PROPER reconstruction discipline

| Rule | Current meaning |
| --- | --- |
| source discipline | only V20 hand-authored canon plus V19/V20 generated canon may be restated here |
| non-canonical status | `V20_PROPER` is a specifying-validation family, not the active pointer |
| no future import | no V21-specific generated artifacts or later version semantics may be treated as V20 truth |
| density goal | reconstruct V20 as a full canon whose omission is visible by appendix carriers |

### Appendix H. Operator surface and quality contract catalog

#### H.1 Operator transcript flow inventory

| flowId | Required visible truth |
| --- | --- |
| `seeded-shell-posture` | active canon, draft target, controls, and primary panels are visible |
| `targeted-branch-run` | deposit, need, fit, selected pack, settlement, and proof surfaces are visible |
| `normalization-branch-run` | normalization-heavy source-to-shares posture is visible |
| `public-privacy-boundary-projection` | public projection is bounded |
| `reviewer-privacy-boundary-projection` | reviewer proof review is visible without raw files |
| `buyer-targeted-projection` | buyer-authorized selected/settlement view is visible without raw files |
| `internal-privacy-boundary-projection` | internal projection exposes raw-source-bearing surfaces |
| `invalid-deposit-error` | invalid deposit fails without state mutation |
| `no-survivor-conflict-reset` | no-survivor conflict and reset recovery remain visible |
| `generated-appendix-report-discovery` | generated report and appendix references are discoverable |

#### H.2 Visual state inventory

| stateId | Required posture |
| --- | --- |
| `initial-seeded-shell` | seeded review posture is visible |
| `targeted-branch-run` | targeted run surfaces are visible |
| `normalization-branch-run` | normalization run surfaces are visible |
| `public-privacy-boundary-projection` | public projection is visually bounded |
| `reviewer-privacy-boundary-projection` | reviewer projection remains proof-visible |
| `buyer-targeted-projection` | buyer projection remains richer than public |
| `internal-privacy-boundary-projection` | internal projection exposes internal surfaces |
| `invalid-deposit-error` | invalid deposit failure is visually rendered |
| `no-survivor-conflict` | no-survivor state is visually rendered |
| `generated-appendix-report-reference` | generated reference state is visible |

#### H.3 Accessibility check inventory

| checkId | Canonical concern |
| --- | --- |
| `control-names` | controls expose names |
| `form-labeling` | controls are labeled |
| `keyboard-operation` | required workflow is keyboard reachable |
| `focus-order` | focus follows workflow order |
| `focus-visibility` | focus is visually apparent |
| `status-announcements` | status updates are announced |
| `landmarks-and-sections` | major surfaces are navigable |
| `toggle-state` | raw/visual toggles expose selected state |
| `contrast` | contrast thresholds are met |
| `reduced-motion` | motion remains bounded |
| `projection-safety` | lower-privilege checks do not require forbidden artifacts |

#### H.4 Performance operation inventory

| operationId | Current budget posture |
| --- | --- |
| `initial-seeded-shell-ready` | hard-gated |
| `scenario-switch-summary-update` | hard-gated |
| `projection-switch-summary-update` | hard-gated |
| `targeted-branch-creation` | hard-gated |
| `normalization-branch-creation` | hard-gated |
| `proof-family-catalog-render-after-branch` | hard-gated |
| `raw-visual-surface-mode-toggle` | hard-gated |
| `reset-to-ready-state` | hard-gated |
| `full-quality-suite-duration` | telemetry-only |

#### H.5 Projection-quality principal matrix

| principal | Required quality posture |
| --- | --- |
| `public` | no raw files, no source visibility, no auth visibility |
| `reviewer` | no raw files, no source visibility, no auth visibility |
| `buyer` | no raw files, no source visibility, auth-visible |
| `internal` | raw files visible, source visible, auth visible |

### Appendix I. Scenario, workflow, and cross-product contract catalog

#### I.1 Current scenario inventory

| scenarioId | Current contract emphasis |
| --- | --- |
| `auth-issuer-rollback` | representative targeted remediation and buyer-facing review |
| `rust-validator-proof-gap` | proof-heavy remediation without replay drift |
| `config-policy-precedence-incident` | config/policy restoration with explicit receipts |
| `unsafe-patch-review-recovery` | unsafe review containment and reset posture |
| `infra-deployment-mismatch` | infra remediation with rollout explanation |
| `privacy-boundary-proof-export` | disclosure-boundary and projection stress |
| `polyglot-gateway-benchmark-remediation` | cross-language remediation parity |
| `auth-many-asset-normalization` | many-asset normalization and source-to-shares explanation |

#### I.2 Workflow-stage and transcript-flow matrix

| flow or stage | Current surfaced truth |
| --- | --- |
| `seeded-shell-posture` | active canon posture and ready shell |
| `targeted-branch-run` | targeted deposit-to-settlement path |
| `normalization-branch-run` | normalization-heavy source-to-shares path |
| `public-privacy-boundary-projection` | bounded public view |
| `reviewer-privacy-boundary-projection` | reviewer proof-review view |
| `buyer-targeted-projection` | buyer-authorized remediation view |
| `internal-privacy-boundary-projection` | internal raw-material view |
| `generated-appendix-report-discovery` | generated canon discoverability |

#### I.3 Current required cross-product coverage matrix

| Cross-product | Current basis |
| --- | --- |
| `8 scenarios x 2 branch modes` | scenario/run matrix in `ENGI_SPEC_V20_PROVEN.md` |
| `4 principals x representative projection-quality smoke` | V20 projection-quality smoke matrix |
| `10 transcript flows x required visible truths` | V20 operator acceptance transcript |
| `10 visual states x deterministic signatures` | V20 visual regression report |
| `11 accessibility checks x operator shell` | V20 accessibility report |
| `branch modes` | `patch` and `context` remain the only current canonical modes |

### Appendix J. Fail-closed contract and error posture matrix

| Posture id | Trigger | Current fail-closed meaning |
| --- | --- | --- |
| `invalid deposit` | no admissible intake survives | branch run does not start and shell surfaces an error |
| `prompt contract incompleteness` | placeholder or contract drift | prompt-owned inference closure cannot be claimed |
| `parsed-envelope inadmissibility` | parse/schema drift | inferred completion cannot become canonical |
| `no-survivor asset pack` | verification/selection removes every candidate | no branch/materialization/settlement success may be claimed |
| `authorization denial` | principal/action mismatch | denied action remains blocked and private material stays closed |
| `public projection overexposure` | forbidden artifact survives into public view | disclosure closure fails |
| `settlement conservation drift` | contribution/allocation/journal exactness breaks | settlement proof becomes blocking-failed |

### Appendix K. Source-bearing deliverable and artifact contract catalog

#### K.1 Branch/runtime deliverables

| Artifact or surface | Current role |
| --- | --- |
| private remediation branch files | repo-authenticated remediation delivery |
| selected source material | source-bearing buyer/internal/reviewer review artifact |
| settlement preview | contribution and participation explanation |
| bounded public proof | public-facing proof metadata artifact |
| operator latest-run surface | ordered human review surface over the current run |

#### K.2 Current `.engi` proof/runtime artifacts

| Artifact path | Current role |
| --- | --- |
| `.engi/asset-pack.lock.json` | selected asset-pack witness |
| `.engi/selected-source-material.json` | selected source-bearing manifest |
| `.engi/verification-report.json` | verification evidence |
| `.engi/source-to-shares.json` | settlement allocation carrier |
| `.engi/projection-policy.json` | projection/disclosure policy |
| `.engi/system-proof-bundle.json` | whole-system proof bundle |

#### K.3 Canonical promotion artifacts

| Artifact path | Current role |
| --- | --- |
| `ENGI_SPEC_V20_PROVEN.md` | generated appendix for inherited V19 plus V20 quality canon |
| `.engi/v20-operator-acceptance-transcript.json` | operator transcript artifact |
| `.engi/v20-visual-regression-report.json` | visual quality artifact |
| `.engi/v20-accessibility-report.json` | accessibility quality artifact |
| `.engi/v20-performance-budget-report.json` | performance quality artifact |
| `.engi/v20-projection-quality-smoke-matrix.json` | projection-quality smoke artifact |
| `.engi/v20-quality-summary.json` | aggregate quality artifact |

## V20 completion condition

This reconstruction is structurally complete only when:
1. V20 can be read as a full system rather than an operator-quality delta,
2. the reconstruction remains sourced only from V20 canonical inputs,
3. the nine proof families, inherited V19 reports, and V20 quality reports are all visible as current canon,
4. operator-quality canon is restated as part of whole-system behavior rather than as isolated UI detail,
5. scenario, branch-mode, projection, and transcript coverage axes are explicit,
6. fail-closed postures and disclosure/settlement boundaries are explicit,
7. source-bearing deliverables and generated artifacts are enumerated,
8. the file is auditable without future-version imports,
9. and V21 specifying checks can use this family as a second full-canon validation target.
