# ENGI Spec V21 Parity Matrix

## Status

- Scope: V21 canonical parity ledger for specifying-canon hardening
- Specification target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21.md`
- Delta companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21_DELTA.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21_NOTES.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible reports, `.engi/v20-*` operator-quality reports, `.engi/v21-spec-family-report.json`, and `.engi/v21-canonical-input-report.json`; `ENGI_SPEC_V21_PROVEN.md` is the active generated proof appendix for V21
- Current canonical/latest target: `V21`
- Canonical proof-source commit: `33f3a75734fd6c0213c95b48f2e373c72fb1b735`
- Last fully realized canonical target preserved in source: `V21`
- Source parity state: V21 source-side specifying implementation, appendix generation, specifying artifacts, and promotion sequencing are canonicalized; parity truth is aligned with the promoted V21 file family
- V21 state: canonical promotion complete; parity truth, generated canon, and hand-authored V21 status are aligned
- Primary implementation surfaces to audit for this pass: root spec family, `ENGI_SPECIFYING.md`, `scripts/check-engi-spec-family.mjs`, `scripts/generate-engi-proven.mjs`, `scripts/promote-engi-canon.mjs`, current `.engi/v20-*` artifacts, and current `engi-demo` tests

## Purpose

This file records the V21 parity ledger between:
- the V21 specifying standard,
- the V21 full-spec file family,
- current repository truth,
- current generated V20 canon,
- and the first source-side enforcement that turns V21 specifying from prose into executable repository rules.

## Interpretation rule

The correct V21 reading is:
- `V20` remains the active canonical/latest target,
- V21 is the specifying-canon hardening pass,
- `ENGI_SPECIFYING.md` is the one complete specifying authority,
- the V21 `SPEC` now aims to be a full current-canon system document rather than a narrow version note,
- V20 generated canon is already rich enough to act as a drafting input,
- and the first implementation target is structural checking of the V21+ hand-authored spec family.

## Audit basis

This matrix is grounded in:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPECIFYING.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_TEMPLATEGUIDE.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V16.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_SYSTEM_PARITY_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_PROVEN.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_PROPER.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_PROPER_DELTA.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_PROPER_PARITY_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-operator-acceptance-transcript.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-visual-regression-report.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-accessibility-report.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-performance-budget-report.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-projection-quality-smoke-matrix.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-quality-summary.json`
- `/Users/garrettmaring/Developer/ENGI/scripts/check-engi-spec-family.mjs`
- `/Users/garrettmaring/Developer/ENGI/scripts/generate-engi-proven.mjs`
- `/Users/garrettmaring/Developer/ENGI/scripts/prepare-engi-spec-family-promotion.mjs`
- `/Users/garrettmaring/Developer/ENGI/scripts/promote-engi-canon.mjs`

---

## V21 implementation matrix

| Area | Current source truth | V21 implementation expectation | Closure signal | Judgment |
|---|---|---|---|---|
| Root canon posture | `ENGI_SPEC.txt` points to `V20`; V20 `_PROVEN_` and `.engi/v20-*` artifacts exist | V21 must remain draft until V21 promotion support closes | V21 docs keep `V20` as the active pointer and do not claim V21 promotion | closed |
| Complete specifying authority | `ENGI_SPECIFYING.md` exists and `ENGI_SPEC_TEMPLATEGUIDE.md` is now a pointer | V21 must establish one specifying authority and avoid parallel guide truth | `ENGI_SPECIFYING.md` is the only complete guide; `ENGI_SPEC_TEMPLATEGUIDE.md` is compatibility-only | closed |
| `SPEC`-alone whole-system rule | Earlier V21 drafting still left ambiguity about whether companion files could carry omitted whole-system meaning | V21 must require `SPEC` itself to be full-system, re-implementable, and auditable | `ENGI_SPECIFYING.md` and `ENGI_SPEC_V21.md` now state that `SPEC` cannot outsource omitted system meaning to `DELTA`, parity, generated artifacts, source, or older specs | closed |
| Appendix-grade totality carriers | Earlier V21 drafting still allowed a spec to look whole by section headings alone while omitting exhaustive inventories | V21 must require named appendix-grade catalogs and derivability matrices so omission becomes visible | `ENGI_SPECIFYING.md` and `ENGI_SPEC_V21.md` now require canonical type/surface, subsystem totality, proof-family, generated-artifact, validation, and source-map appendices | closed |
| Exact proof-family inventory carrier | Earlier V21 appendix work still allowed proof-family canon to be summarized without one row-wise exact inventory carrier | V21 must require an explicit matrix that enumerates family id, proof artifact path, member ids, theorem ids, replay step ids, witness artifact paths, and source basis | `ENGI_SPECIFYING.md`, `ENGI_SPEC_V21.md`, and `scripts/check-engi-spec-family.mjs` now require the exact proof-family inventory matrix carrier | implemented |
| Per-family derivability detail | Earlier V21 Appendix B still summarized families mostly as ids and paths without enough current semantic closure detail to rival V16's family pattern | V21 must restate what each family proves, how current closure is carried, exact member-closure criteria, exact theorem-by-theorem closure reading, exact minimum artifact/replay binding set, member verdict shape, theorem-to-replay grouping, generated/test bindings, and fail-closed conditions | `ENGI_SPECIFYING.md` now requires the normalized per-family detail block and `ENGI_SPEC_V21.md` now carries it for all nine proof families | closed |
| Per-subsystem derivability detail | Earlier V21 subsystem sections named required behaviors but still left objects, emitted artifacts, invariants, and fail-closed conditions too compressed | V21 must restate the current subsystem objects/artifacts plus the core invariants and fail-closed conditions for each major subsystem slice | `ENGI_SPEC_V21.md` now extends each subsystem surface section with canonical objects/artifacts and invariants/fail-closed conditions | closed |
| Normalized per-subsystem detail block | Earlier V21 subsystem sections still lacked explicit algorithms/derivation rules, proof obligations, source-bearing implementation basis, validating commands/parity basis, and accepted-boundary truth | V21 must normalize subsystem sections so they carry operationally derivable meaning instead of only object/behavior summaries | `ENGI_SPECIFYING.md`, `ENGI_SPEC_V21.md`, and `engi-demo/src/canonical/v21-specifying.js` now require those subsystem detail carriers | implemented |
| Exact generated-artifact inventory carrier | Earlier V21 artifact cataloging still allowed generated-canon shape to be split across prose and per-family tables without one exact inventory carrier | V21 must require an explicit matrix that enumerates path, id, family, role, generator, and validating command for current generated canon | `ENGI_SPECIFYING.md`, `ENGI_SPEC_V21.md`, and `scripts/check-engi-spec-family.mjs` now require the exact generated-artifact inventory matrix carrier | implemented |
| Scenario/workflow cross-product carrier | Earlier V21 still allowed current scenario ids, realization profiles, branch modes, principals, and operator workflow stages to be inferred from source and inherited artifacts instead of restated canonically | V21 must require an explicit scenario/workflow/cross-product catalog so current coverage axes are mechanically visible | `ENGI_SPECIFYING.md`, `ENGI_SPEC_V21.md`, and `scripts/check-engi-spec-family.mjs` now require Appendix I plus current scenario/profile/branch/principal/workflow content | implemented |
| Fail-closed posture carrier | Earlier V21 still relied too much on source/tests to recover the blocking semantics of invalid deposit, parsed-envelope rejection, no-survivor selection, public overexposure, conservation drift, and stale promotion truth | V21 must require an explicit fail-closed contract/error-posture matrix | `ENGI_SPECIFYING.md`, `ENGI_SPEC_V21.md`, and `scripts/check-engi-spec-family.mjs` now require Appendix J with current fail-closed postures | implemented |
| Source-bearing deliverable/artifact carrier | Earlier V21 named many emitted artifacts across subsystem/proof/generated sections but did not force one explicit catalog of source-bearing deliverables and their generators/consumers | V21 must require an explicit deliverable/artifact catalog | `ENGI_SPECIFYING.md`, `ENGI_SPEC_V21.md`, and `scripts/check-engi-spec-family.mjs` now require Appendix K with current branch/runtime/proof/spec artifacts | implemented |
| Historical full-canon reconstruction validation | Earlier V21 hardening still validated full-canon structure primarily against the active V21 family itself | V21 must validate specifying against at least one historical full-canon reconstruction family built only from prior canon | `ENGI_SPEC_V20_PROPER.md`, `ENGI_SPEC_V20_PROPER_DELTA.md`, `ENGI_SPEC_V20_PROPER_PARITY_MATRIX.md`, and the generalized checker now provide a second strict validation surface | implemented |
| Optional non-canonical notes | `ENGI_SPEC_V21_NOTES.md` exists and states its non-canonical role | V21 must allow iterative notes without letting them become shadow canon | Notes rule is explicit in both guide and notes | closed |
| Required hand-authored canonical file family | V21 draft now includes `ENGI_SPEC_V21.md`, `ENGI_SPEC_V21_DELTA.md`, and `ENGI_SPEC_V21_PARITY_MATRIX.md` | V21 must define and enforce `SPEC`, `SPEC_DELTA`, and `SPEC_PARITY_MATRIX` for V21+ | The V21 file family exists, agrees on direction, and is enforced by `scripts/check-engi-spec-family.mjs` | implemented |
| Status-block precision | Earlier V21 checking only enforced current-target and version-state truth even though the guide already required richer status inventories | V21 must treat generated-artifact inventory and source-parity status lines as checked canonical contract fields across the hand-authored family | `ENGI_SPECIFYING.md` now names stable literal V21+ status labels and `scripts/check-engi-spec-family.mjs` now fails when `Prior canonical anchor`, `Prior generated proof appendix`, `Generated structured artifact inventory`, or `Source parity state` is missing | implemented |
| Promoted parity-judgment closure | Earlier V21 promoted-mode checking could still allow parity tables to say `drafted` or `implemented; promotion pending` if status lines alone were cleaned | V21 promoted-mode validation must fail when required parity rows still carry draft-phase or reopening judgments | `engi-demo/src/canonical/v21-specifying.js` now parses V21 implementation matrix/checklist tables in promoted mode and rejects transitional judgments; fixture tests cover the failure mode | implemented |
| Full-spec structural sections | Earlier V21 drafting lacked explicit goals/design-principles, architecture, domain-model, accepted-boundary, and appendix-grade sections | V21 must make those sections explicit so source checking can validate more than filenames and the main spec can carry more canonical density | `ENGI_SPEC_V21.md` now contains the missing whole-system and appendix sections | closed |
| Subsystem totality matrix | Earlier V21 drafting did not provide a single omission-visible matrix over all required subsystem coverage items | V21 must carry an explicit subsystem totality and derivability matrix in the main `SPEC` | `ENGI_SPEC_V21.md` now includes Appendix F covering all minimum subsystem coverage items from `ENGI_SPECIFYING.md` Section 6 | closed |
| Current-canon drafting input rule | Current drafting historically leaned on the main spec plus memory; V20 generated canon now demonstrates richer active inputs | V21 must define current `SPEC`, `_PROVEN_`, parity matrix, and `.engi/vN-*` artifacts as canonical drafting inputs | V21 spec and specifying guide now state the drafting input rule explicitly | closed |
| Generated artifact shared-schema rule | V20 `.engi/v20-*` artifacts share common fields plus artifact-specific payloads | V21 must require specs to define both shared common fields and artifact-specific fields for generated artifact families | V21 spec and specifying guide state shared-schema plus artifact-specific contract expectations | closed |
| V20 artifact-derived evidence | V20 `_PROVEN_` regenerated identically from proof-source commit `2f3fb17983223d6951c257be9bfa663419bdfd7e`; current `.engi/v20-*` artifacts remain canonical inputs | V21 should treat regenerated canonical artifacts as evidence for specifying requirements, not only as version outputs | Comparison pass regenerated `/tmp/v20-proven-regen.md` and matched committed `ENGI_SPEC_V20_PROVEN.md` | closed |
| Canonical-input validator | Promotion previously assumed the pointed canonical `SPEC`, `_PROVEN_`, parity file, and current generated artifact family were present | V21 must validate active-canon drafting inputs before promotion proceeds | `scripts/check-engi-canonical-inputs.mjs` now validates the active pointed canon input family and V21 promotion plan includes it pre-mutation | implemented |
| Stale promoted-status defect | V20 hand-authored `SPEC`, `NOTES`, and parity matrix still say `V19` is current canon and that V20 promotion is pending | V21 must define and then enforce a stale-status gate for canonical promotion | V21 docs record the defect and `scripts/check-engi-spec-family.mjs --mode promoted` now fail-closes on stale promoted status | implemented |
| Structural spec-family checker | No source-side tool previously verified the V21+ hand-authored file family, required `SPEC` sections, appendix-grade density carriers, or promoted-status discipline | V21 should begin source implementation with a checker that validates required files, section responsibilities, appendix-grade carriers, proof-family coverage headings, and stale promoted status | `scripts/check-engi-spec-family.mjs` plus V21 tests are the first enforcing implementation | implemented |
| V21 appendix generation support | `_PROVEN_` generation previously stopped at V20 | V21 should generate `ENGI_SPEC_V21_PROVEN.md` while summarizing inherited V19/V20 generated closure and emitting the minimal V21 specifying artifact pair | `engi-demo/src/canonical/proven-generator.js` now supports `V21` appendix generation and emits `.engi/v21-spec-family-report.json` plus `.engi/v21-canonical-input-report.json` | implemented |
| Post-generation active-canon validation | Earlier V21 promotion work only validated the pre-mutation pointed canon (`V20`) | V21 promotion must validate the newly pointed `V21` canonical input family after generation so `_PROVEN_` and `.engi/v21-*` cannot drift silently | `scripts/promote-engi-canon.mjs` now runs `scripts/check-engi-canonical-inputs.mjs --current-target V21` after generation and `engi-demo/src/canonical/v21-specifying.js` now requires the V21 specifying artifact pair when `V21` is the pointed canon | implemented |
| Promotion-time hand-authored status rewrite | Earlier V21 promotion support still left the final promoted-mode blockers in the hand-authored V21 target/state lines themselves | V21 promotion must rewrite the hand-authored V21 family from truthful draft posture into truthful promoted posture immediately before pointer advancement | `scripts/prepare-engi-spec-family-promotion.mjs` now rewrites the V21 hand-authored status blocks and `scripts/promote-engi-canon.mjs` now runs it in the real and dry-run V21 promotion plan | implemented |
| File-family promotion gate | `promote:canon` previously stopped at V20 and did not include V21+ file-family checking | V21 must run pre-mutation draft checking and post-mutation promoted checking before final diff validation | `scripts/promote-engi-canon.mjs` now runs both V21 spec-family checks in the actual command plan and in dry-run emission | implemented |
| Commit-message derivation rule | `scripts/promote-engi-canon.mjs` now derives the V21 commit body from the V21 `SPEC`, `DELTA`, and `PARITY_MATRIX`, while V19/V20 remain historical hard-coded branches | V21 must specify commit-body derivation from the canonical file family and generated outputs, and implement it for V21+ | V21 dry-run commit-body text now comes from the V21 file family rather than hard-coded V21 prose | implemented |
| V21 promotion support | `scripts/promote-engi-canon.mjs` previously accepted `V19` and `V20` only | V21 must add source-side promotion support once the V21 file family and gates are settled | `scripts/promote-engi-canon.mjs` now accepts `V21` and emits a full V21 dry-run plan; the remaining blocker is hand-authored status truth, not missing promotion support | implemented |
| Historical compatibility paths | Older versions and repo references still use `TEMPLATEGUIDE`, `NOTES`, and `SYSTEM_PARITY_MATRIX` naming | V21 must preserve historical compatibility without treating old names as the new standard | Compatibility pointer exists; migration strategy is documented but not enforced | accepted boundary |

---

## V21 implementation checklist

| Area | Required V21 result | Current judgment |
|---|---|---|
| Specifying standard | One complete specifying document exists | closed |
| Compatibility guide | Old template path points to the new standard only | closed |
| Notes posture | Optional notes are explicitly non-canonical | closed |
| V21 file family | `SPEC`, `DELTA`, and `PARITY_MATRIX` exist for V21 work | closed |
| Status-block precision | V21 docs and source enforce richer status truth than target/state alone | implemented |
| `SPEC`-alone rule | V21 docs define `SPEC` as whole-system, re-implementable, and auditable on its own | closed |
| Full-spec structure | V21 `SPEC` contains explicit whole-system sections beyond version-summary material | closed |
| Totality carrier structure | V21 `SPEC` contains explicit appendix-grade inventories and derivability matrices rather than only narrative sections | closed |
| Exact proof-family inventory | V21 `SPEC` contains a row-wise exact proof-family inventory carrier rather than only per-family summary prose | implemented |
| Per-family proof semantics | V21 `SPEC` carries normalized per-family derivability detail rather than only family inventory bullets | closed |
| Theorem/member/replay exactness | V21 `SPEC` carries exact member-closure criteria, theorem-by-theorem closure readings, and minimum artifact/replay binding sets for every proof family | implemented |
| Per-subsystem semantics | V21 `SPEC` carries canonical objects/artifacts plus invariants/fail-closed conditions for each major subsystem slice | closed |
| Normalized subsystem detail schema | V21 `SPEC` carries algorithms, proof obligations, source-bearing basis, validating commands/parity basis, and accepted-boundary truth for each major subsystem | implemented |
| Exact generated-artifact inventory | V21 `SPEC` contains a row-wise exact generated-artifact inventory carrier rather than only per-family tables and prose | implemented |
| Scenario/workflow cross-products | V21 `SPEC` carries the current scenario/profile/branch/principal/workflow coverage axes explicitly | implemented |
| Fail-closed posture | V21 `SPEC` carries current blocking/error posture explicitly rather than only by implication from tests or source | implemented |
| Source-bearing deliverables | V21 `SPEC` carries a direct catalog of branch/runtime/proof/spec artifacts plus generators and consumers | implemented |
| Drafting input rule | V21 docs define current `SPEC`, `_PROVEN_`, parity, and `.engi/vN-*` artifacts as canonical drafting inputs | closed |
| Canonical-input validation | V21 source validates that the currently pointed canon actually has the required input family present | implemented |
| Generated artifact rule | V21 docs define common-field plus artifact-specific generated schema requirements | closed |
| V21 generated artifact family | V21 docs and source define the minimal version-local specifying artifact pair explicitly | implemented |
| Structural checker | V21 has at least one source-side checker implementing the new specifying rules | implemented |
| Density checker | V21 checker enforces appendix-grade totality carriers and proof-family coverage headings in addition to top-level section presence | implemented |
| V21 appendix generation | V21 can generate a versioned appendix that truthfully inherits V19/V20 closure | implemented |
| Post-generation active-canon validation | V21 promotion validates the newly pointed V21 canonical input family after generation | implemented |
| Promotion-time hand-authored status rewrite | V21 promotion rewrites the hand-authored family into promoted posture before pointer advancement | implemented |
| Promoted parity-judgment closure | V21 promoted-mode checks reject transitional parity judgments in required tables | implemented |
| Stale-status gate | V21 docs specify a promotion-time stale-status checker and source now runs it in promoted-mode checking | implemented |
| File-family gate | V21 promotion path includes draft and promoted file-family checks in real execution and dry-run output | implemented |
| Commit-body derivation | V21 docs specify canonical commit-body derivation inputs and source now implements them for V21 | implemented |
| V21 promotion support | V21 source-side promotion path exists in dry-run and non-dry-run command sequencing; remaining blockers are the hand-authored draft target/state lines | implemented |
| Historical proper family | A non-canonical V20-only full-canon reconstruction exists and passes the generalized checker | implemented |

## V21 accepted boundaries

| Boundary | Rationale | Reopen condition |
|---|---|---|
| No retroactive V20 canonical rewrite in this pass | V21 is using V20's stale hand-authored status as the motivating defect for new gates | Reopen if the user wants direct cleanup of prior canonical docs |
| Density acceptance is exactness-driven | V21 closure is accepted on exact derivability carriers and executable gate coverage, not line-count parity with V16 | Reopen if later versions require additional narrative theorem/member depth beyond the current exact carriers |
| No new runtime/proof artifact family beyond specifying support | V21 adds only the minimal specifying artifact pair and intentionally preserves inherited V19/V20 runtime/proof artifact families rather than inventing a new runtime-quality family | Reopen if V21 grows additional version-local runtime, proof, or quality artifacts |
| `V20_PROPER` remains non-canonical | the reconstruction exists only to validate specifying hardness against an already-promoted version | Reopen only if a later metaspec version formalizes canonical historical rewrites |
| Gate validation uses both `V20` and `V21` | V21 first-gate promotion validates the active pre-mutation V20 canon and the post-generation V21 canon in one sequence | Reopen if promotion sequencing or gate families materially change in a later version |

## V21 completion condition for first-gate canon

V21 is ready for first-gate canonical promotion when:
1. the V21 spec family exists,
2. the specifying authority is singular,
3. the canonical file-family rename is unambiguous,
4. generated artifacts are treated as canonical drafting inputs,
5. the V21 `SPEC` is explicit enough that a structural checker can validate whole-spec responsibilities rather than only filenames,
6. at least one source-side checker now enforces V21 specifying rules,
7. V21 appendix generation and promotion support exist,
8. the stale-status and file-family gate requirements are precise enough to implement,
9. canonical-input validation exists over the active pointed canon,
10. post-generation active-canon validation exists for the newly pointed V21 family,
11. promoted-mode parity-judgment closure exists for required tables,
12. a historical `V20_PROPER` family exists as a second strict validation surface,
13. the parity matrix records which items are implemented versus still source gaps,
14. exact derivability carriers rather than line count are accepted as the V21 density threshold,
15. the V21 version-local generated artifact family remains limited to the generated appendix plus the specifying report pair,
16. `V20` is used as the required pre-mutation gate target,
17. `V21` is used as the required post-generation gate target,
18. and no retroactive V20 hand-authored canon rewrite is required for V21 closure.
