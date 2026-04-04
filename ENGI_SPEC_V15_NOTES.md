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
- `engi-demo/ENGI_DEMO_SPEC_V15_IMPLEMENTATION_MATRIX.md`

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
