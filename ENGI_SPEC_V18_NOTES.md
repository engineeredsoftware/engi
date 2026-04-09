# ENGI Spec V18 Notes

## Status

- Scope: future generated/formal exhaustiveness and robustness pass after V17 demo-canon closure
- Prior draft anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17.md`
- Prior parity ledger: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17_SYSTEM_PARITY_MATRIX.md`
- Current canonical/latest target at note creation: `V16`
- V18 state: planning notes only

## V18 Intent

V17 closes the operator-facing canon by proving every seeded scenario, branch mode, and projection principal through the browser demo.

V18 should not reopen that demo-canon boundary unless V17 promotion reveals a regression.

The strongest V18 direction is generated/formal exhaustiveness:
- generated proof-member semantic assertions,
- generated theorem evidence assertions,
- state-machine workflow cross-products,
- optional source/integration projection matrix duplication,
- and quality budgets for the now-stable operator shell.

## Deferred Matrix Work

The concrete matrix groups deferred from V17 are:

1. Proof-member semantic payload matrix
   `45` proof-family members x `8` scenarios x `2` branch modes = `720` cells.

2. Theorem evidence matrix
   `57` theorem ids x `8` scenarios x `2` branch modes = `912` cells.

3. Stateful repeated-run matrix
   `8 x 8 = 64` ordered pairs, with `1` representative pair already covered in V17 and `63` remaining if accepted.

4. Reset-after-run matrix
   `8` scenario cells, with `1` representative reset path already covered in V17 and `7` remaining if accepted.

5. Mixed-deposit matrix
   `8` scenarios x `2` branch modes x `4` principals = `64` cells, with `1` representative cell already covered in V17 and `63` remaining if accepted.

6. No-survivor matrix
   `8` scenarios x `2` branch modes x `4` principals = `64` cells, with `2` representative cells already covered in V17 and `62` remaining if accepted.

7. Optional non-public projection duplication
   V17 already checks exact operator-visible projection inventories in the browser matrix. V18 can duplicate or generate those checks at source/integration level if non-browser proof of every path-level non-public projection is desired.

## Recommended V18 Implementation Shape

V18 should prefer generators over hand-written test bloat.

Recommended sequence:

1. Extract the proof-family/member/theorem catalogs into reusable test fixtures.
2. Build generated source/integration assertion matrices for member semantics and theorem evidence.
3. Add state-machine matrix fixtures for repeated-run, reset, mixed-deposit, and no-survivor workflows.
4. Keep E2E focused on the V17 operator matrix and only add browser tests for newly exposed UI regressions.
5. Add optional visual regression, accessibility, and runtime-budget checks after the V17 UI surface is stable.
6. If V17 is canonical by then, use `ENGI_SPEC_V17_PROVEN.md` as a verified input to the V18 proof-audit loop.

## Non-Goals

V18 should not:
- manually edit generated `_PROVEN_` files,
- duplicate the 64-cell browser matrix unless browser behavior changes,
- turn every source-level semantic check into a browser assertion,
- or reopen V17's demo-canon acceptance boundary without a concrete failing proof or test.
