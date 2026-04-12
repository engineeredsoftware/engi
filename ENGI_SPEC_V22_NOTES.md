# ENGI Spec V22 Notes

## Status

- Scope: non-canonical V22 working notes for post-V21 canonical development
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V21`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21_PROVEN.md`
- Current specifying standard: `/Users/garrettmaring/Developer/ENGI/ENGI_SPECIFYING.md`
- V22 state: initial non-canonical notes opened after V21 first-gate canonical promotion

## Non-Canonical Notes Rule

This file is intentionally non-canonical.

It may contain:
- draft V22 scope ideas,
- implementation sequencing notes,
- acceptance questions,
- audit findings,
- and candidate decisions.

It must not be treated as current ENGI canon.

Any note that survives as active system truth must be promoted into:
- `ENGI_SPEC_V22.md`,
- `ENGI_SPEC_V22_DELTA.md`,
- `ENGI_SPEC_V22_PARITY_MATRIX.md`,
- `ENGI_SPEC_V22_PROVEN.md`,
- or required generated `.engi/v22-*` artifacts.

## Starting Inheritance From V21

V21 closed the first specifying-canon gate.

The inherited baseline for V22 is:
- `ENGI_SPECIFYING.md` is the singular specifying authority,
- `SPEC` itself must be full-system, re-implementable, and auditable,
- generated `_PROVEN_` and generated `.engi/vN-*` artifacts are active canonical drafting inputs,
- and promotion must fail closed on stale hand-authored status truth, missing file-family members, or missing canonical generated inputs.

## Acceptance-Hardening Rule For V22

Future acceptance and gate hardening should continue using both:
- active `V21` canon as the promoted-current validation surface,
- and `V20_PROPER` as the historical full-canon reconstruction validation surface.

The purpose of keeping both surfaces active is:
- prove that new specifying requirements work against the current promoted canon,
- and prove that those requirements are not accidentally overfit only to the latest version's shape.

## Early V22 Working Center

Initial candidate directions for V22 include:
- extending specifying hardness beyond first-gate closure,
- deciding whether additional historical `*_PROPER` reconstructions are worth adding,
- deciding whether V21's accepted exactness carriers need even denser narrative theorem/member prose,
- and identifying any next-step ENGI runtime, proof, operator, or promotion work that now becomes implementation-derivable from V21 canon.
