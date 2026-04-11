# ENGI Spec V21 Parity Matrix

## Status

- Scope: V21 parity ledger for specifying-canon hardening
- Specification target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21.md`
- Delta companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21_DELTA.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21_NOTES.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_PROVEN.md`
- Current canonical/latest target: `V20`
- Last fully realized canonical target preserved in source: `V20`
- V21 state: full-spec drafting and source-side specifying implementation are in progress; structural/density checking, canonical-input validation, V21 appendix generation support, and V21 promotion support with file-family-derived commit-body generation now exist, while canonical promotion closure remains unfinished
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
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-operator-acceptance-transcript.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-visual-regression-report.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-accessibility-report.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-performance-budget-report.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-projection-quality-smoke-matrix.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-quality-summary.json`
- `/Users/garrettmaring/Developer/ENGI/scripts/check-engi-spec-family.mjs`
- `/Users/garrettmaring/Developer/ENGI/scripts/generate-engi-proven.mjs`
- `/Users/garrettmaring/Developer/ENGI/scripts/promote-engi-canon.mjs`

---

## V21 implementation matrix

| Area | Current source truth | V21 implementation expectation | Closure signal | Judgment |
|---|---|---|---|---|
| Root canon posture | `ENGI_SPEC.txt` points to `V20`; V20 `_PROVEN_` and `.engi/v20-*` artifacts exist | V21 must remain draft until V21 promotion support closes | V21 docs keep `V20` as the active pointer and do not claim V21 promotion | closed for draft posture |
| Complete specifying authority | `ENGI_SPECIFYING.md` exists and `ENGI_SPEC_TEMPLATEGUIDE.md` is now a pointer | V21 must establish one specifying authority and avoid parallel guide truth | `ENGI_SPECIFYING.md` is the only complete guide; `ENGI_SPEC_TEMPLATEGUIDE.md` is compatibility-only | drafted |
| `SPEC`-alone whole-system rule | Earlier V21 drafting still left ambiguity about whether companion files could carry omitted whole-system meaning | V21 must require `SPEC` itself to be full-system, re-implementable, and auditable | `ENGI_SPECIFYING.md` and `ENGI_SPEC_V21.md` now state that `SPEC` cannot outsource omitted system meaning to `DELTA`, parity, generated artifacts, source, or older specs | drafted |
| Appendix-grade totality carriers | Earlier V21 drafting still allowed a spec to look whole by section headings alone while omitting exhaustive inventories | V21 must require named appendix-grade catalogs and derivability matrices so omission becomes visible | `ENGI_SPECIFYING.md` and `ENGI_SPEC_V21.md` now require canonical type/surface, subsystem totality, proof-family, generated-artifact, validation, and source-map appendices | drafted |
| Optional non-canonical notes | `ENGI_SPEC_V21_NOTES.md` exists and states its non-canonical role | V21 must allow iterative notes without letting them become shadow canon | Notes rule is explicit in both guide and notes | drafted |
| Required hand-authored canonical file family | V21 draft now includes `ENGI_SPEC_V21.md`, `ENGI_SPEC_V21_DELTA.md`, and `ENGI_SPEC_V21_PARITY_MATRIX.md` | V21 must define and enforce `SPEC`, `SPEC_DELTA`, and `SPEC_PARITY_MATRIX` for V21+ | The V21 file family exists, agrees on direction, and is enforced by `scripts/check-engi-spec-family.mjs` | implemented |
| Full-spec structural sections | Earlier V21 drafting lacked explicit goals/design-principles, architecture, domain-model, accepted-boundary, and appendix-grade sections | V21 must make those sections explicit so source checking can validate more than filenames and the main spec can carry more canonical density | `ENGI_SPEC_V21.md` now contains the missing whole-system and appendix sections | drafted |
| Subsystem totality matrix | Earlier V21 drafting did not provide a single omission-visible matrix over all required subsystem coverage items | V21 must carry an explicit subsystem totality and derivability matrix in the main `SPEC` | `ENGI_SPEC_V21.md` now includes Appendix F covering all minimum subsystem coverage items from `ENGI_SPECIFYING.md` Section 6 | drafted |
| Current-canon drafting input rule | Current drafting historically leaned on the main spec plus memory; V20 generated canon now demonstrates richer active inputs | V21 must define current `SPEC`, `_PROVEN_`, parity matrix, and `.engi/vN-*` artifacts as canonical drafting inputs | V21 spec and specifying guide now state the drafting input rule explicitly | drafted |
| Generated artifact shared-schema rule | V20 `.engi/v20-*` artifacts share common fields plus artifact-specific payloads | V21 must require specs to define both shared common fields and artifact-specific fields for generated artifact families | V21 spec and specifying guide state shared-schema plus artifact-specific contract expectations | drafted |
| V20 artifact-derived evidence | V20 `_PROVEN_` regenerated identically from proof-source commit `2f3fb17983223d6951c257be9bfa663419bdfd7e`; current `.engi/v20-*` artifacts remain canonical inputs | V21 should treat regenerated canonical artifacts as evidence for specifying requirements, not only as version outputs | Comparison pass regenerated `/tmp/v20-proven-regen.md` and matched committed `ENGI_SPEC_V20_PROVEN.md` | closed as audit input |
| Canonical-input validator | Promotion previously assumed the pointed canonical `SPEC`, `_PROVEN_`, parity file, and current generated artifact family were present | V21 must validate active-canon drafting inputs before promotion proceeds | `scripts/check-engi-canonical-inputs.mjs` now validates the active pointed canon input family and V21 promotion plan includes it pre-mutation | implemented |
| Stale promoted-status defect | V20 hand-authored `SPEC`, `NOTES`, and parity matrix still say `V19` is current canon and that V20 promotion is pending | V21 must define and then enforce a stale-status gate for canonical promotion | V21 docs record the defect and `scripts/check-engi-spec-family.mjs --mode promoted` now fail-closes on stale promoted status | implemented; promotion pending |
| Structural spec-family checker | No source-side tool previously verified the V21+ hand-authored file family, required `SPEC` sections, appendix-grade density carriers, or promoted-status discipline | V21 should begin source implementation with a checker that validates required files, section responsibilities, appendix-grade carriers, proof-family coverage headings, and stale promoted status | `scripts/check-engi-spec-family.mjs` plus V21 tests are the first enforcing implementation | implemented |
| V21 appendix generation support | `_PROVEN_` generation previously stopped at V20 | V21 should generate `ENGI_SPEC_V21_PROVEN.md` while summarizing inherited V19/V20 generated closure | `engi-demo/src/canonical/proven-generator.js` now supports `V21` appendix generation with no new `.engi/v21-*` artifact family in this pass | implemented |
| File-family promotion gate | `promote:canon` previously stopped at V20 and did not include V21+ file-family checking | V21 must run pre-mutation draft checking and post-mutation promoted checking before final diff validation | `scripts/promote-engi-canon.mjs` now runs both V21 spec-family checks in the actual command plan and in dry-run emission | implemented; promotion pending |
| Commit-message derivation rule | `scripts/promote-engi-canon.mjs` now derives the V21 commit body from the V21 `SPEC`, `DELTA`, and `PARITY_MATRIX`, while V19/V20 remain historical hard-coded branches | V21 must specify commit-body derivation from the canonical file family and generated outputs, and implement it for V21+ | V21 dry-run commit-body text now comes from the V21 file family rather than hard-coded V21 prose | implemented |
| V21 promotion support | `scripts/promote-engi-canon.mjs` previously accepted `V19` and `V20` only | V21 must add source-side promotion support once the V21 file family and gates are settled | `scripts/promote-engi-canon.mjs` now accepts `V21` and emits a full V21 dry-run plan; actual canonical promotion remains pending until V21 hand-authored status truth changes from draft to promoted | implemented; promotion pending |
| Historical compatibility paths | Older versions and repo references still use `TEMPLATEGUIDE`, `NOTES`, and `SYSTEM_PARITY_MATRIX` naming | V21 must preserve historical compatibility without treating old names as the new standard | Compatibility pointer exists; migration strategy is documented but not enforced | substantially advanced |

---

## V21 implementation checklist

| Area | Required V21 result | Current judgment |
|---|---|---|
| Specifying standard | One complete specifying document exists | drafted |
| Compatibility guide | Old template path points to the new standard only | drafted |
| Notes posture | Optional notes are explicitly non-canonical | drafted |
| V21 file family | `SPEC`, `DELTA`, and `PARITY_MATRIX` exist for V21 work | drafted |
| `SPEC`-alone rule | V21 docs define `SPEC` as whole-system, re-implementable, and auditable on its own | drafted |
| Full-spec structure | V21 `SPEC` contains explicit whole-system sections beyond version-summary material | drafted |
| Totality carrier structure | V21 `SPEC` contains explicit appendix-grade inventories and derivability matrices rather than only narrative sections | drafted |
| Drafting input rule | V21 docs define current `SPEC`, `_PROVEN_`, parity, and `.engi/vN-*` artifacts as canonical drafting inputs | drafted |
| Canonical-input validation | V21 source validates that the currently pointed canon actually has the required input family present | implemented |
| Generated artifact rule | V21 docs define common-field plus artifact-specific generated schema requirements | drafted |
| Structural checker | V21 has at least one source-side checker implementing the new specifying rules | implemented |
| Density checker | V21 checker enforces appendix-grade totality carriers and proof-family coverage headings in addition to top-level section presence | implemented |
| V21 appendix generation | V21 can generate a versioned appendix that truthfully inherits V19/V20 closure | implemented |
| Stale-status gate | V21 docs specify a promotion-time stale-status checker and source now runs it in promoted-mode checking | implemented; promotion pending |
| File-family gate | V21 promotion path includes draft and promoted file-family checks in real execution and dry-run output | implemented; promotion pending |
| Commit-body derivation | V21 docs specify canonical commit-body derivation inputs and source now implements them for V21 | implemented |
| V21 promotion support | V21 source-side promotion path exists in dry-run and non-dry-run command sequencing, but V21 is not yet eligible for pointer advancement | implemented; promotion pending |

## V21 accepted boundaries

| Boundary | Rationale | Reopen condition |
|---|---|---|
| No retroactive V20 canonical rewrite in this pass | V21 is using V20's stale hand-authored status as the motivating defect for new gates | Reopen if the user wants direct cleanup of prior canonical docs |
| No new generated V21 artifacts yet | V21 source-side specifying work is only beginning; V21 promotion and generator support are not yet complete | Reopen when V21 promotion and generator decisions are implemented |
| Promotion integration remains partial | V21 now has dry-run promotion support, but actual canonical promotion must still wait for promoted-status truth and any final artifact decision | Reopen when V21 is ready for actual pointer advancement |

## V21 completion condition for the current pass

This V21 pass is ready to continue deeper source implementation when:
1. the V21 spec family exists,
2. the specifying authority is singular,
3. the canonical file-family rename is unambiguous,
4. generated artifacts are treated as canonical drafting inputs,
5. the V21 `SPEC` is explicit enough that a structural checker can validate whole-spec responsibilities rather than only filenames,
6. at least one source-side checker now enforces V21 specifying rules,
7. V21 appendix generation and promotion support exist,
8. the stale-status and file-family gate requirements are precise enough to implement,
9. canonical-input validation exists over the active pointed canon,
10. and the parity matrix records which items are implemented versus still source gaps.
