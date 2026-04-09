# ENGI Spec V18 Notes

## Status

- Scope: accepted pre-implementation generated/formal exhaustiveness and robustness pass after V17 demo-canon closure
- Draft spec: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18.md`
- Draft parity ledger: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18_SYSTEM_PARITY_MATRIX.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17_PROVEN.md`
- Current canonical/latest target: `V17`
- V18 state: pre-implementation specification complete; no V18 source implementation yet

## Why V18 starts from generated matrices

V17 intentionally accepted full operator-facing cross-product coverage as its canon.

That was the right boundary for V17 because the key question was whether the V16 proof system could be demonstrated coherently through a real operator shell.
The answer is now yes:
- eight seeded scenarios,
- two branch modes,
- four projection principals,
- exact browser-visible projection inventories,
- and generated V17 `_PROVEN_` output.

V18 must now move below the browser shell and above isolated hand-written assertions.

The next gap is not "more UI coverage."
The next gap is whether proof exhaustiveness can be generated, executed, and documented without hand-maintained catalog drift.

## Current V17 anchor facts

The V17 generated appendix reports:
- `fullyProven=true`,
- `runCount=16`,
- `familyCount=9`,
- `theoremCount=57`,
- `memberCount=45`,
- `artifactDigestCount=688`.

Those facts define the starting V18 arithmetic:
- `45 x 8 x 2 = 720` proof-member semantic cells,
- `57 x 8 x 2 = 912` theorem evidence cells,
- `8 x 8 = 64` repeated-run ordered scenario cells,
- `8` reset-after-run cells,
- `8 x 2 x 4 = 64` mixed-deposit cells,
- `8 x 2 x 4 = 64` no-survivor cells.

V18 must treat those as named matrices, not as vague "more tests."

## Important distinction from V17

V17's strongest tests intentionally operate through user-facing behavior:
- can the operator select the scenario,
- choose projection and branch mode,
- make the branch,
- inspect proof surfaces,
- and see projection boundaries held in the UI?

V18's strongest tests must operate through generated source/integration matrices:
- can every proof member explain its semantic payload,
- can every theorem bind to concrete evidence,
- can every state transition preserve invariants,
- and can those answers be rendered into generated proof documentation?

The browser may only grow when a generated proof gap reveals an operator-facing seam.

## Catalog drift risk

The main V18 risk is hand-written catalog duplication.

V17 still has useful hand-maintained expectations in tests, especially proof-family/member/theorem catalog expectations used by workflow coverage.
That was acceptable for V17 because the goal was to ratchet visible workflow behavior quickly.

V18 must replace or subordinate those copies.
The target shape is:
- runtime proof bundles define emitted truth,
- the `_PROVEN_` collector normalizes emitted truth,
- generated fixtures expose stable test axes,
- predicates assert semantics,
- and docs render the resulting matrices.

If V18 adds new hand-maintained proof-family tables without a generation path, it will recreate the drift class it is supposed to close.

## Required V18 workstreams

1. Proof-member semantic matrix
   Generate and execute all `720` family/member/scenario/branch cells.

2. Theorem evidence matrix
   Generate and execute all `912` theorem/scenario/branch cells with concrete replay/evidence binding.

3. Stateful workflow matrix
   Generate repeated-run, reset, mixed-deposit, and no-survivor matrices as source/integration tests.

4. Generated matrix artifacts
   Emit structured JSON matrix summaries so `_PROVEN_` can include them without reading test prose.

5. `_PROVEN_` expansion
   Extend the generated proof appendix to summarize matrix totals, failed cells, accepted exclusions, predicate ids, and evidence paths.

## Accepted V18 decisions

The V18 scope decisions are now accepted:

1. V18 is a generated/formal exhaustiveness pass.
2. V18 does not add new proof families unless generated matrices expose a concrete missing proof category.
3. V17's `64`-cell browser operator matrix is accepted as canonical operator-facing coverage.
4. The `720` proof-member semantic cells are mandatory.
5. The `912` theorem-evidence cells are mandatory.
6. Repeated-run, reset-after-run, mixed-deposit, and no-survivor state-machine matrices are mandatory.
7. Proof catalogs must be generated or imported from runtime truth.
8. Generated matrix artifacts must be structured data consumable by `_PROVEN_`.
9. V18 `_PROVEN_` expansion may be version-gated so V17 appendix rendering remains stable.
10. Non-public projection duplication at source/integration level is deferred unless projection policy changes or a projection bug escapes V17 browser coverage.
11. Visual regression, accessibility, and performance budgets are deferred beyond the first V18 completion gate.

## Accepted V18 boundaries

V18 must not require browser execution of the `720` proof-member cells or `912` theorem-evidence cells.
That would be slow, brittle, and conceptually misplaced.

V18 must not treat visual regression, accessibility, or performance budgets as blockers for the first generated/formal pass.
They can be added after the matrix generators are stable.

V18 must not manually edit `ENGI_SPEC_V18_PROVEN.md`.
That file is created only when V18 is promoted canonically.

## Draft implementation sequence

The accepted source-side path is:

1. Add a reusable proof-catalog fixture derived from `collectCanonicalProvenRuns(...)`.
2. Move workflow tests away from hard-coded proof catalog tables where practical.
3. Implement `proof-member-matrix` builder and predicates.
4. Implement `theorem-evidence-matrix` builder and predicates.
5. Implement state-machine matrix fixtures for repeated-run/reset/mixed-deposit/no-survivor paths.
6. Add matrix test entrypoints and package scripts only after the generated builders are stable.
7. Add matrix summaries to `testCoverageReport`.
8. Extend `renderCanonicalProvenMarkdown(...)` for V18 matrix summaries.
9. Generate `ENGI_SPEC_V18_PROVEN.md` only at canonical promotion.

## Final pre-implementation answers

Generated matrix artifacts must be runtime-visible or generated as stable JSON, not trapped in test stdout.
The accepted artifact names are:
- `.engi/v18-proof-member-semantic-matrix.json`,
- `.engi/v18-theorem-evidence-matrix.json`,
- `.engi/v18-state-machine-matrix.json`.

`_PROVEN_` expansion must be version-gated if the renderer shape would otherwise alter V17 output.
V17 generated output is already canonical and must remain stable.

Non-public projection artifact duplication is not part of the first V18 gate.
V17's browser matrix already proves exact operator-visible projection inventories across all principals.

Visual regression, accessibility, and performance budgets are not first-gate blockers.
They can be picked up after generated proof exhaustiveness is implemented and green.

## Pre-implementation finish line

The specification-side V18 pre-implementation work is complete when:
- the main spec names V18's accepted scope,
- the notes record the accepted decisions and final answers,
- the parity matrix lists concrete source gaps and implementation phases,
- no V18 document implies canonical promotion before source implementation,
- and `ENGI_SPEC.txt` remains on `V17`.
