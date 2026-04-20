# ENGI Spec V21 Delta

## Status

- Scope: V21 canonical delta for specifying-canon hardening after V20 operator-quality canon
- Current canonical/latest target: `V21`
- Canonical proof-source commit: `33f3a75734fd6c0213c95b48f2e373c72fb1b735`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible reports, `.engi/v20-*` operator-quality reports, `.engi/v21-spec-family-report.json`, and `.engi/v21-canonical-input-report.json`; `ENGI_SPEC_V21_PROVEN.md` is the active generated proof appendix for V21
- Spec companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21.md`
- Parity companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21_PARITY_MATRIX.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21_NOTES.md`
- Source parity state: V21 source-side specifying implementation, appendix generation, specifying artifacts, and promotion sequencing are canonicalized; this delta records the V20-to-V21 closure
- V21 state: canonical promotion complete; V21 specifying canon is active and this delta records the promoted closure set

## Why V21 exists

V20 closed operator-quality canon and promoted generated quality reports plus an expanded generated proof appendix.

That success revealed the next canonical problem:
- ENGI now depends on more canonical inputs than the main spec file alone,
- but recent hand-authored specs have often behaved like additive deltas rather than full current canon,
- and canonical promotion can therefore produce a pointed version whose hand-authored status truth is stale.

V21 exists to harden specifying itself before that drift becomes the new normal.

## Comparison findings that drive V21

### V16 structural strength

V16 remains the strongest recent full-canon structural example.
Its proof-family sections repeatedly bind:
- purpose,
- canonical terms,
- obligations,
- structures,
- member coverage,
- theorem coverage,
- artifact direction,
- witness/replay direction,
- and closure criteria.

V21 keeps that derivability standard.

### V20 generated-canon strength

The V21 comparison pass regenerated:
- `ENGI_SPEC_V20_PROVEN.md`

from proof-source commit:
- `2f3fb17983223d6951c257be9bfa663419bdfd7e`

and the regenerated appendix matched the committed V20 appendix byte-for-byte.

The same pass also confirmed the V20 quality artifact family has strong shared schema surfaces:
- `reportId`,
- `proofSourceCommit`,
- `generatedAt`,
- `acceptedExclusionCount`,
- `blockingFailureCount`,
- and `replayContext`.

It also confirmed artifact-specific fields that the spec must be able to derive:
- transcript `flowCount`,
- accessibility `checkCount`,
- performance `operationCount`,
- projection-quality `cellCount`,
- and summary `qualityReportCount`.

V21 therefore treats generated artifacts as first-class specifying inputs.

### V20 motivating defect

The current V20 hand-authored file family still states:
- `Current canonical/latest target: V19`,
- and that V20 promotion is pending,

even though the pointer and generated canon are already V20.

V21 treats that as a canonical-specifying defect.
The fix is not only better wording discipline.
The fix is required source-side stale-status gates.

## Accepted V21 decisions in this delta

The current accepted V21 drafting decisions are:

1. `ENGI_SPECIFYING.md` is the one complete specifying standard.
2. `ENGI_SPEC_TEMPLATEGUIDE.md` is a compatibility pointer only.
3. `SPEC`, `SPEC_DELTA`, and `SPEC_PARITY_MATRIX` are the required hand-authored canonical system-spec files for V21+.
4. Optional `NOTES` remain allowed but are explicitly non-canonical.
5. A promoted `SPEC` must itself be full-system, re-implementable, and auditable current canon rather than a focus-only release note.
6. The canonical input set for drafting a new version includes the current `SPEC`, current `_PROVEN_`, current parity matrix, and current generated `.engi/vN-*` artifacts.
7. Generated artifact families must be specified with both shared common fields and artifact-specific contract fields.
8. V21 begins source-side implementation with a structural spec-family checker that can fail on missing required files, missing required `SPEC` sections, and stale promoted status.
9. Canonical promotion must gain a stale-status gate and a file-family gate.
10. Canonical commit message bodies must be derivable from the version's canonical file family and generated outputs.
11. Full-canon totality requires named appendix-grade inventories and derivability matrices rather than only major section presence.
12. V21 defines a minimal version-local generated artifact family: `.engi/v21-spec-family-report.json` and `.engi/v21-canonical-input-report.json`.
13. V21 promotion must validate the newly pointed canonical input family after generation, not only the inherited pre-mutation input family.
14. V21 hardens total precision further by requiring exact proof-family and generated-artifact inventory carriers inside the main `SPEC`, not only high-level appendix headings.
15. V21 also restores a V16-style per-family derivability block in Appendix B so each proof family states what it proves, how closure is carried, exact member-closure criteria, exact theorem-by-theorem closure reading, exact minimum artifact/replay binding set, current verdict shape, theorem/replay grouping, generated/test bindings, and fail-closed conditions.
16. V21 extends subsystem sections beyond behavioral bullets by restating the current subsystem objects/artifacts, invariants, and fail-closed conditions inline.
17. V21 now treats scenario/profile/branch/principal/workflow cross-products as mandatory explicit canon rather than recoverable context.
18. V21 now requires a fail-closed contract/error-posture matrix so blocking semantics are visible without source excavation.
19. V21 now requires a source-bearing deliverable/artifact catalog so emitted branch/proof/spec artifacts are implementation-derivable from `SPEC` alone.
20. V21 now normalizes subsystem sections further so each major subsystem carries algorithms/derivation rules, proof obligations, source-bearing implementation basis, validating commands/parity basis, and accepted-boundary truth rather than only behavior/object summaries.
21. V21 now requires specifying hardening to validate against at least one historical full-canon reconstruction family rather than only the active V21 family.
22. The first historical reconstruction family is `V20_PROPER`, a non-canonical V20-only restatement used to validate full-canon structure and future-truth rejection.
23. V21 first-gate acceptance is based on exact derivability carriers and executable gate closure, not line-count parity with V16.
24. V21 remains a specifying-canon hardening release rather than a new runtime/operator-semantics release.
25. V21 does not retroactively rewrite V20 hand-authored canon in this pass.
26. The V21 version-local generated artifact family is limited to `ENGI_SPEC_V21_PROVEN.md`, `.engi/v21-spec-family-report.json`, and `.engi/v21-canonical-input-report.json`.
27. V21 first-gate promotion must exercise both `V20` pre-mutation canon and `V21` post-generation canon as executable gate targets.

## Explicitly deferred or unresolved items

Still open in V21 pre-implementation drafting:
- whether V21 promotion should reject compatibility-named files outright or allow aliases temporarily,
- whether active V20 hand-authored docs should be corrected directly or only used as the motivating defect for future promotion checks,
- and whether a separate generated promotion report should be added in V21 or left to a later version.

## Implementation already landed in this pass

The first V21 source-side specifying rule is now implemented:
- `scripts/check-engi-spec-family.mjs`

Current covered checks:
1. V21+ hand-authored file-family presence,
2. singular specifying-authority support files,
3. required status-block truth including `Current canonical/latest target`, prior-anchor/provenance lines, generated-artifact inventory, and source-parity state,
4. required whole-system sections in the main `SPEC`,
5. required appendix-grade totality carriers and proof-family coverage headings in the main `SPEC`,
6. required scenario/workflow cross-product appendix content, fail-closed posture content, and deliverable/artifact catalog content in the main `SPEC`,
7. normalized per-subsystem detail labels/content in the main `SPEC`,
8. exact per-family member-closure, theorem-by-theorem, and artifact/replay binding carriers in the main `SPEC`,
9. required structural sections in `DELTA` and `PARITY_MATRIX`,
10. promoted-mode rejection of draft/pending status language,
11. and promoted-mode rejection of transitional parity judgments such as `drafted`, `implemented; promotion pending`, and `spec closed; source gap`.

Current validating test basis:
- `engi-demo/test/v21-specifying.test.js`
- `npm --prefix engi-demo run test:unit`

Additional V21 source-side support now implemented:
- `engi-demo/src/canonical/proven-generator.js` supports `V21` appendix generation plus `.engi/v21-spec-family-report.json` and `.engi/v21-canonical-input-report.json`,
- `scripts/check-engi-spec-family.mjs` now also supports `V20_PROPER` as a second strict validation profile for historical full-canon reconstruction,
- `scripts/promote-engi-canon.mjs` supports `--version V21`,
- `scripts/check-engi-canonical-inputs.mjs` validates the current pointed canon's hand-authored and generated input family,
- `scripts/prepare-engi-spec-family-promotion.mjs` now rewrites the hand-authored V21 status truth into promoted posture immediately before pointer advancement,
- the V21 promotion path now includes pre-mutation spec-family checks, pre-mutation canonical-input validation, promotion-time hand-authored status preparation, post-generation active-canon validation for `V21`, and post-mutation promoted checks in both dry-run planning and non-dry-run execution,
- and `scripts/promote-engi-canon.mjs` now derives the V21 canonical commit-message body from the V21 canonical file family instead of using hard-coded V21 summary prose.

Current promoted-mode preflight result:
- the remaining blockers are the hand-authored V21 status truth lines themselves (`Current canonical/latest target: V20` plus draft/pending `V21 state` text),
- not missing gate/support implementation.

## Pre-Implementation Sequence

The accepted pre-implementation sequence is:

1. finalize `ENGI_SPECIFYING.md`,
2. finalize V21 `SPEC`, `DELTA`, and `PARITY_MATRIX`,
3. ensure those files agree on V21 accepted decisions,
4. derive source-side checker requirements from those docs,
5. implement the first structural V21 spec-family checker,
6. use that checker to tighten the V21 file family further,
7. use the stronger appendix-grade density requirements to make omission visible,
8. wire file-family and stale-status promotion checks into the promotion path,
9. add canonical-input validation over the active pointed canon,
10. align the V21 hand-authored family with the now-implemented V21 specifying artifact pair,
11. add post-generation active-canon validation for the newly pointed V21 family,
12. align V21 parity judgments with promoted-mode closure requirements,
13. finish density closure for scenario/workflow cross-products, fail-closed posture, and source-bearing deliverables,
14. normalize per-subsystem detail blocks against the stronger specifying schema,
15. validate `V20_PROPER` as a second full-canon family against the generalized checker,
16. record the accepted first-gate boundaries for density, generated-artifact scope, and historical reconstruction posture,
17. and only then run canonical promotion using both `V20` pre-mutation and `V21` post-generation gate validation.

## Commit-Body Direction

When V21 later reaches canonical promotion, the commit body should be derived from:
- the V21 center,
- the renamed/spec-disciplined file family,
- the strengthened `SPEC`-alone full-system rule,
- the appendix-grade totality-carrier rule,
- the explicit scenario/workflow/principal/branch cross-product rule,
- the explicit fail-closed posture matrix,
- the explicit source-bearing deliverable/artifact catalog,
- the first implemented structural spec-family checker,
- the `V20_PROPER` historical reconstruction validation track,
- the generated-canon input rule,
- the minimal V21 specifying artifact family,
- the post-generation active-canon validation rule,
- promoted-mode parity-judgment closure,
- the stale-status and file-family promotion gates,
- and any implemented V21 source-side specifying checks.
