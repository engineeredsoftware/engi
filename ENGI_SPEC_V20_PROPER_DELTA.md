# ENGI Spec V20 Proper Delta

## Status

- Scope: non-canonical V20 historical full-canon reconstruction delta for specifying validation
- Current canonical/latest target: `V20`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible-canon reports, active canonical `.engi/v20-*` operator-quality reports, and `ENGI_SPEC_V20_PROVEN.md`
- Spec companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_PROPER.md`
- Parity companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_PROPER_PARITY_MATRIX.md`
- Source parity state: this reconstruction is authored only to validate V21 specifying against an already-promoted canon; it does not mutate the active pointed canon
- V20_PROPER state: historical full-canon reconstruction drafting is in progress for specifying validation; this family remains non-canonical

## Why V20_PROPER exists

V20's actual promoted canon is materially richer than its hand-authored `SPEC`.

The reconstruction exists to answer one question:
- can `ENGI_SPECIFYING.md` reliably force a complete full-system restatement of an already-promoted version using only that version's canon?

`V20_PROPER` is therefore a validation family, not a new release.

## Accepted V20_PROPER decisions

1. `V20_PROPER` is non-canonical and must never be pointed to by `ENGI_SPEC.txt`.
2. `V20_PROPER` may use only V20 hand-authored canon, `ENGI_SPEC_V20_PROVEN.md`, and active canonical `.engi/v19-*` and `.engi/v20-*` artifacts as truth sources.
3. `V20_PROPER` must restate V20 as a full system, not as an operator-quality-only delta.
4. `V20_PROPER` must carry the same omission-visible appendix families required of a modern full `SPEC`.
5. `V20_PROPER` must not import V21-specific generated artifacts, V21 promotion semantics, or later specifying-only claims as if V20 already depended on them.
6. `V20_PROPER` should be strict enough that `scripts/check-engi-spec-family.mjs` can validate it as a second full-canon family beside V21.

## Explicitly excluded future truth

The reconstruction excludes:
- later version specifying-only generated report pairs
- later version generated appendices
- later version promotion-time status rewriting semantics
- V21-specific stale-status closure as if it were already V20 canon

## Reconstruction sequence

1. read V20 hand-authored canon,
2. read `ENGI_SPEC_V20_PROVEN.md`,
3. read active `.engi/v19-*` and `.engi/v20-*`,
4. restate V20 whole-system semantics in a full-canon structure,
5. validate the reconstruction under the generalized spec-family checker,
6. use failures or gaps to harden `ENGI_SPECIFYING.md` and V21.

## Validation direction

`V20_PROPER` should prove three things about the new specifying standard:
- full-canon structure is not V21-specific,
- appendix-grade omission carriers are reusable against an already-promoted version,
- and future-truth import can be mechanically rejected.
