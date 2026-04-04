# ENGI Spec V15 Notes

## Status

V15 is a draft successor target to V14.
It is not the active canonical pointer because `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` still points to `V14`.

That status distinction matters.
V15 is the next-target drafting pass, not a silent repoint.

## Why V15 exists

V14 successfully made ENGI dense, source-grounded, and structurally serious.
It carried forward the host, inference, proof, and exact-accounting review families well enough that the next problem became architectural rather than purely informational.

The problem V15 addresses is this:
- system canon was still too entangled with the local demo realization,
- the root ENGI specification and the `engi-demo/` realization were still being read as if they were one file family,
- and the implementation matrix still lived in the demo directory as though demo-local parity could stand in for whole-system parity.

V15 exists to correct that.

## Primary V15 drafting move

The primary V15 move is a three-way separation:

1. system canonical specification
   Root-level ENGI system truth, invariants, subsystem obligations, and closure logic.
2. demo or realization specification
   The current deterministic local prototype under `engi-demo/`, including its operator shell, persistence behavior, host/runtime truth, and demo-local validation obligations.
3. parity and debt tracking
   Separate ledgers for system closure and demo-local closure.

This is the most important V15 change.
It is structural, not cosmetic.

## What V15 preserves

V15 intentionally preserves the later design truths that should no longer drift:
- depositing, needing, and fit remain the center of the operator story,
- Profile A and Profile B remain defined by deposit mode and need mode,
- identity/auth remains one spine,
- repo-to-settlement remains one operating chain,
- proof and settlement remain closure,
- bounded public proof remains derived from private closure,
- boundary reality remains explicit supporting truth rather than hidden implementation detail.

V15 also preserves the V12 section anchors for sections `6` through `13` because the current demo realization still traces to those anchors through UI, explainers, and tests.

## What V15 sharpens

V15 sharpens six families of work:

1. Host capabilities / execution environment / containerization completeness
   The system spec now keeps these as system-canonical concerns while the current host docs remain demo-family adjuncts.
2. Inference plus static-measurement appendix completeness
   V15 keeps the stronger prompt contracts, exact output schemas, context injectables, parse contracts, and deterministic-vs-inferred distinctions.
3. Proof appendix completeness
   V15 preserves proof-family explicitness, theorem catalog expectations, subsystem obligations, witness structures, and witness-manifest closure.
4. Zero-point accounting / source-to-shares / settlement exactness
   V15 keeps the selected-versus-participating-versus-credited-versus-zero-credit distinctions explicit.
5. Template-guide refinement and matrix honesty
   The guide now forbids using a demo-local matrix as the default parity ledger for whole-system canon.
6. System-vs-demo separation
   The template guide, V15 system spec, system parity matrix, demo spec, and demo matrix all now encode the separation directly.

## Important non-decisions

V15 does not:
- repoint `ENGI_SPEC.txt` away from `V14`,
- claim that the demo stopped being the strongest current realization,
- or pretend that a non-demo canonical implementation family already exists in the repo.

The correct reading is narrower:
- V14 remains the active canonical/latest target,
- V12 remains the last fully realized canon,
- V15 is the drafted next target,
- and `engi-demo` remains the current local deterministic realization.

## File-family consequence

V15 deliberately changes the expected file family.

Root system family:
- `ENGI_SPEC_V15.md`
- `ENGI_SPEC_V15_NOTES.md`
- `ENGI_SPEC_V15_INFORMATION_AUDIT.md`
- `ENGI_SPEC_V15_SYSTEM_PARITY_MATRIX.md`

Demo family:
- `engi-demo/ENGI_DEMO_SPEC_V15.md`
- `engi-demo/SPEC_V15_IMPLEMENTATION_MATRIX.md`

This means `engi-demo/` is no longer the primary home for canonical system parity tracking.
It remains the home of the current demo realization and its realization-local parity ledger.

## Naming posture

V15 still encounters source-grounded names such as:
- `buildDemonstrationProfile(...)`
- `demonstrationProfile`
- demo-local shell language around operating order and browser flow

V15 does not rewrite history around those names.
Instead it interprets them as current realization labels for broader canonical concepts such as conformance profile or realization ordering.

That posture is deliberate.
The point is separation without pretending the current source already uses the final ideal vocabulary everywhere.

## Additive canonical-source refactor posture

V15 adds a canonical-source refactor focus on top of the V14 density pass.
That focus is additive.
It is not a hidden demand to rename the repo all at once, and it is not a license to let the system spec drift away from the current demo realization.

The refactor focus exists because the next canonical target now needs more than section completeness.
It also needs a clearer answer to:
- which structures are canonical even before source refactors land,
- which names are preferred concept names versus current realization names,
- which information-bearing surfaces deserve first-class placement,
- how source files should eventually separate by subsystem,
- and how docs/tests parity should keep the refactor honest.

For V15, the right reading by family is:

1. Types and structs
   The spec keeps canonical object shapes explicit even when the current source realizes them through builders in `engi-demo/src/engi-demo.js` and emitted `.engi/*` JSON artifacts.
2. Names
   The current source still exposes `demonstrationProfile` and preserves `buildDemonstrationProfile(...)`, but it now also exposes `buildRealizationProfile(...)`. V15 therefore uses an aliasing posture: it can describe broader canonical concepts such as conformance profile or realization profile, while keeping the legacy demo labels honest instead of pretending the whole source was already renamed.
3. Information-value organization
   High-information artifacts such as need surfaces, fit surfaces, proof bundles, settlement artifacts, and witness manifests should remain visibly distinct from explainer summaries, UI compression, or public projection shorthand.
4. File and module organization
   `engi-demo/src/engi-demo.js` is still the dominant orchestration file, but the repo now also contains `realization-profile.js` and `settlement-structs.js` in addition to helper modules such as `engi-core.js`, `receipt-schemas.js`, `benchmark-model.js`, `proof-log.js`, and `server-ranking.js`. V15 treats that as evidence of partial factorization, not final architecture.
5. Docs/tests parity
   The current core/API/browser test split is already one of the strongest parity surfaces in the repo. V15 therefore treats docs/tests parity as a first-class refactor concern rather than cosmetic cleanup.

The key V15 discipline is:
- the root system family owns canonical target structure,
- the demo family owns current migration truth,
- and the matrices own the gap between them.

## Matrix honesty posture

The right V15 matrix posture is:
- root system parity matrix for system-canonical closure and implementation expectations,
- demo-local matrix for operator-shell, persistence, host-doc, and demo-realization parity,
- explicit `spec closed; source gap` or `accepted boundary` language where appropriate,
- no premature `closed` judgment just because the current demo tells a story well.

False closure became riskier once system and demo were separated, because the docs can now hide less behind one another.

## Practical drafting reminder

If a proposed V15 addition merely repeats V14, it is noise.

If it makes one of these clearer, it is probably proper V15 material:
- what belongs to system canon,
- what belongs to demo canon,
- where parity debt actually lives,
- how host, inference, proof, and settlement closure work,
- or how the next implementation family could exist without being forced into demo-local assumptions.


## Added V15 focus: canonical source refactor

V15 is not only about separation of system canon from demonstration canon.
It also uses that separation as the opportunity for a finalizing canonical source refactor.

The most important refinement here is typing for provability.
That means V15 should explicitly favor:
- richer enum cases,
- stronger type composition,
- clearer struct boundaries,
- more legible information-value placement,
- and file/module organization that mirrors the new system-vs-demo split.

This should be treated as a totalistic co-evolution concern across:
- spec,
- spec notes,
- implementation matrix,
- source,
- docs,
- and tests.


## Additional V15 refactor strategy — JavaScript first, then TypeScript hardening

A useful V15 refinement is to treat the canonical refactor in two stages:
1. clean structural refactor in the current implementation shape,
2. then aggressive TypeScript hardening once the boundaries are cleaner.

This is often better than doing a messy direct TypeScript pass over poorly separated code because:
- the resulting types are cleaner,
- domain boundaries become more obvious,
- and stronger discriminants/enums/composed structs can be introduced with less accidental coupling.

The V15 target is therefore not a shallow TypeScript migration.
It is a deeply typed canonical implementation where the type system itself strengthens provability.
