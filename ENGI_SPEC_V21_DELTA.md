# ENGI Spec V21 Delta

## Status

- Scope: V21 draft delta for specifying-canon hardening after V20 operator-quality canon
- Current canonical/latest target: `V20`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_PROVEN.md`
- Spec companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21.md`
- Parity companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21_PARITY_MATRIX.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21_NOTES.md`
- V21 state: full-spec drafting and source-side specifying implementation are in progress; structural/density checking, canonical-input validation, V21 appendix generation support, and V21 promotion support with file-family-derived commit-body generation now exist, while canonical promotion closure remains unfinished

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

## Explicitly deferred or unresolved items

Still open in V21 pre-implementation drafting:
- whether V21 promotion should reject compatibility-named files outright or allow aliases temporarily,
- whether active V20 hand-authored docs should be corrected directly or only used as the motivating defect for future promotion checks,
- whether a separate generated promotion report should be added in V21 or left to a later version,
- and whether V21 canonical promotion should generate a dedicated V21 artifact family or inherit V20 generated artifacts unchanged.

## Implementation already landed in this pass

The first V21 source-side specifying rule is now implemented:
- `scripts/check-engi-spec-family.mjs`

Current covered checks:
1. V21+ hand-authored file-family presence,
2. singular specifying-authority support files,
3. consistent `Current canonical/latest target` status lines,
4. required whole-system sections in the main `SPEC`,
5. required appendix-grade totality carriers and proof-family coverage headings in the main `SPEC`,
6. required structural sections in `DELTA` and `PARITY_MATRIX`,
7. and promoted-mode rejection of draft/pending status language.

Current validating test basis:
- `engi-demo/test/v21-specifying.test.js`
- `npm --prefix engi-demo run test:unit`

Additional V21 source-side support now implemented:
- `engi-demo/src/canonical/proven-generator.js` supports `V21` appendix generation,
- `scripts/promote-engi-canon.mjs` supports `--version V21`,
- `scripts/check-engi-canonical-inputs.mjs` validates the current pointed canon's hand-authored and generated input family,
- the V21 promotion path now includes pre-mutation spec-family checks, canonical-input validation, and post-mutation promoted checks in both dry-run planning and non-dry-run execution,
- and `scripts/promote-engi-canon.mjs` now derives the V21 canonical commit-message body from the V21 canonical file family instead of using hard-coded V21 summary prose.

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
10. decide whether V21 should preserve inherited V20 generated artifacts exactly or add any small V21-specific generated support artifact,
11. and only then decide whether V21 is ready for canonical promotion.

## Commit-Body Direction

When V21 later reaches canonical promotion, the commit body should be derived from:
- the V21 center,
- the renamed/spec-disciplined file family,
- the strengthened `SPEC`-alone full-system rule,
- the appendix-grade totality-carrier rule,
- the first implemented structural spec-family checker,
- the generated-canon input rule,
- the stale-status and file-family promotion gates,
- and any implemented V21 source-side specifying checks.
