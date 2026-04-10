# ENGI Spec V21 Notes

## Status

- Scope: non-canonical V21 working notes for specifying-canon hardening
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V20`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_PROVEN.md`
- Current specifying draft: `/Users/garrettmaring/Developer/ENGI/ENGI_SPECIFYING.md`
- Superseded guide pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_TEMPLATEGUIDE.md`
- V21 state: first specifying pass in progress; no V21 canonical `SPEC`, `SPEC_DELTA`, `SPEC_PARITY_MATRIX`, generated appendix, or pointer advancement yet

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

## First Implementation Sequence

Current WIP sequence:

1. Draft `ENGI_SPECIFYING.md`.
2. Convert `ENGI_SPEC_TEMPLATEGUIDE.md` into a compatibility pointer.
3. Add this non-canonical V21 notes file.
4. Commit the first V21 WIP specifying pass.
5. Draft full `ENGI_SPEC_V21.md` as complete current canon.
6. Draft `ENGI_SPEC_V21_DELTA.md` as the version-local decision record.
7. Draft `ENGI_SPEC_V21_PARITY_MATRIX.md` as the source/spec/generated/promotion parity ledger.
8. Add source-side spec-family checks only after the V21 canonical file family is precise enough to implement against.

## Early Risks

- The full-canon requirement will make V21 `SPEC` larger than V17-V20.
- The repo has historical references to `TEMPLATEGUIDE`, `NOTES`, and `SYSTEM_PARITY_MATRIX`; migration must preserve history without creating two active standards.
- V20 canonical promotion left draft-era status wording in V20 files; V21 should treat that as the motivating example for a stale-status gate.
- Optional notes must remain useful without becoming shadow canon.

## Working Success Condition

V21 pre-implementation specifying work is ready when:
- `ENGI_SPECIFYING.md` is accepted as the complete specifying standard,
- V21 optional notes are clearly non-canonical,
- the planned V21 `SPEC`, `SPEC_DELTA`, and `SPEC_PARITY_MATRIX` responsibilities are unambiguous,
- and the next source-side checks can be derived from those documents rather than from ad hoc release habits.
