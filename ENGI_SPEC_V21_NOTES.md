# ENGI Spec V21 Notes

## Status

- Scope: non-canonical V21 working notes for specifying-canon hardening
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V20`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_PROVEN.md`
- Current specifying draft: `/Users/garrettmaring/Developer/ENGI/ENGI_SPECIFYING.md`
- Superseded guide pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_TEMPLATEGUIDE.md`
- V21 state: full-spec drafting and source-side specifying implementation are in progress; structural/density checking, canonical-input validation, V21 appendix generation support, and V21 promotion support with file-family-derived commit-body generation now exist, while canonical promotion closure and pointer advancement remain pending

## Non-Canonical Notes Rule

This file is intentionally non-canonical.

It is the WIP scratch surface for V21 scoping, sequencing, questions, implementation findings, and candidate decisions.
It may be committed during iterative development.

No ENGI behavior, proof obligation, artifact contract, generated-output requirement, parity judgment, or promotion rule is canonical merely because it appears here.

Any note that survives as current system truth must be promoted into one of:
- `ENGI_SPEC_V21.md`,
- `ENGI_SPEC_V21_DELTA.md`,
- `ENGI_SPEC_V21_PARITY_MATRIX.md`,
- `ENGI_SPEC_V21_PROVEN.md`,
- or required generated `.engi/v21-*` artifacts.

## V21 Working Center

V21 is currently scoped as specifying-canon hardening.

The likely center is:
- replacing the older template-guide concept with `ENGI_SPECIFYING.md`,
- requiring every promoted `SPEC` to be complete current canon rather than an additive release note,
- renaming canonical version-local notes to `SPEC_DELTA`,
- renaming `SYSTEM_PARITY_MATRIX` to `SPEC_PARITY_MATRIX`,
- keeping optional `NOTES` as non-canonical WIP only,
- defining generated artifacts and `_PROVEN_` as generated canon, not hand-authored specification files,
- and adding promotion/status gates that prevent stale draft language after canonical pointer advancement.

## Current Accepted Direction Candidates

These are not yet canonical decisions.
They are candidate V21 decisions to promote if they remain accepted after the V21 `SPEC` and parity work:

1. `ENGI_SPECIFYING.md` becomes the one complete specifying standard.
2. `ENGI_SPEC_TEMPLATEGUIDE.md` remains only as a compatibility pointer.
3. V21+ required hand-authored canonical files are `SPEC`, `SPEC_DELTA`, and `SPEC_PARITY_MATRIX`.
4. `NOTES` is optional and non-canonical.
5. A promoted `SPEC` must be complete and implementation-derivable without reading older specs for missing semantics.
6. Generated artifacts remain canonical only when generated and checked by the promotion workflow.
7. Canonical promotion must include a status-language gate so promoted specs cannot keep stale draft/pending-pointer claims.

## Comparison-pass findings

The current V21 comparison pass used:
- the active V20 generated appendix,
- the active V20 `.engi/v20-*` artifact family,
- and V16 as the last strong full-canon structural comparison point.

Concrete findings:

1. V20 `_PROVEN_` regenerates identically from proof-source commit `2f3fb17983223d6951c257be9bfa663419bdfd7e`.
2. The V20 generated quality artifact family has shared common schema fields such as `reportId`, `proofSourceCommit`, `generatedAt`, `blockingFailureCount`, `acceptedExclusionCount`, and `replayContext`.
3. The V20 artifact family also has important artifact-specific contract fields such as `flowCount`, `checkCount`, `operationCount`, `cellCount`, and `qualityReportCount`.
4. V16 remains stronger than V17-V20 as a full-canon derivability pattern, even though V20 is stronger in generated-canon precision.
5. The current V20 hand-authored file family still contains stale draft-era status truth, which is the motivating example for V21's stale-status gate.
6. Broad whole-system section presence is still insufficient by itself; V21 needs appendix-grade inventories and a subsystem totality matrix so omission becomes visible.

## First Implementation Sequence

Current WIP sequence:

1. Draft `ENGI_SPECIFYING.md`.
2. Convert `ENGI_SPEC_TEMPLATEGUIDE.md` into a compatibility pointer.
3. Add this non-canonical V21 notes file.
4. Commit the first V21 WIP specifying pass.
5. Draft full `ENGI_SPEC_V21.md`.
6. Draft `ENGI_SPEC_V21_DELTA.md`.
7. Draft `ENGI_SPEC_V21_PARITY_MATRIX.md`.
8. Tighten all three using V20 generated canon and V16 structural comparison.
9. Add the first source-side structural spec-family checker against the V21 canonical file family.
10. Use that checker to tighten V21 docs further before broader promotion integration.
11. Add V21 appendix generation and promotion-path support.
12. Upgrade V21 and `ENGI_SPECIFYING.md` so full-system totality requires named appendix-grade carriers rather than only high-level sections.
13. Replace hard-coded V21 promotion summary text with file-family-derived commit-body generation.
14. Add canonical-input validation over the active pointed canon.
15. Continue tightening V21 density toward a fuller canonical ENGI specification.

## Early Risks

- The full-canon requirement will make V21 `SPEC` larger than V17-V20.
- Even after the latest appendix pass, V21 is still materially shorter than V16 and may need further densification before it feels like a fully complete canonical ENGI spec.
- The repo has historical references to `TEMPLATEGUIDE`, `NOTES`, and `SYSTEM_PARITY_MATRIX`; migration must preserve history without creating two active standards.
- V20 canonical promotion left draft-era status wording in V20 files; V21 should treat that as the motivating example for a stale-status gate.
- Optional notes must remain useful without becoming shadow canon.
- The first checker has now grown into a density-aware checker, the promotion path now consumes it, and active-canon input validation now exists, but final V21 artifact decisions remain open.
- V21 should convert density from an editorial preference into a mechanically checkable requirement through appendix-grade coverage carriers and subsystem totality matrices.

## Working Success Condition

V21 pre-implementation specifying work is ready when:
- `ENGI_SPECIFYING.md` is accepted as the complete specifying standard,
- V21 optional notes are clearly non-canonical,
- the planned V21 `SPEC`, `SPEC_DELTA`, and `SPEC_PARITY_MATRIX` responsibilities are unambiguous,
- the next source-side checks can be derived from those documents rather than from ad hoc release habits,
- the first source-side checker can already fail on structural incompleteness in the V21+ hand-authored file family,
- and V21 promotion-path support, V21 appendix generation, file-family-derived V21 commit-body generation, and active-canon input validation now exist as the next implementation base.
