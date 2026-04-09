# ENGI Spec V18 System Parity Matrix

## Status

- Scope: V18 accepted generated/formal proof-exhaustiveness source parity ledger
- Draft target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18_NOTES.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17.md`
- Prior parity ledger: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17_SYSTEM_PARITY_MATRIX.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17_PROVEN.md`
- Current generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18_PROVEN.md`
- Current canonical/latest target: `V18`
- Last fully realized canonical target preserved in source: `V18`
- V18 state: source-side matrix generators and tests implemented; `ENGI_SPEC_V18_PROVEN.md` is generated from proof-source commit `c675116`
- Primary implementation surface to audit for this pass: `engi-demo`

## Purpose

This file records the V18 parity ledger and the source implementation closure state.

V17 closed operator-facing demonstration parity.
V18 starts from the remaining generated/formal proof exhaustiveness debt.

The V18 focus is:
- generated proof-member semantic assertions,
- generated theorem evidence assertions,
- generated state-machine workflow matrices,
- catalog drift elimination,
- matrix summaries that can feed `_PROVEN_`,
- and explicit acceptance boundaries for deferred quality matrices.

## Interpretation rule

The correct V18 reading is:
- `V17` remains the active canonical/latest target,
- V18 is the next draft,
- V17 operator-facing browser canon is accepted unless a failing proof or test reopens it,
- V18 source work must concentrate on generated source/integration matrices,
- and generated `_PROVEN_` output remains a canonical-promotion artifact, not a draft-authored file.

## Audit basis

This matrix is grounded in:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17_SYSTEM_PARITY_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17_PROVEN.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/proven-generator.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/proven-generator.test.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/workflow.integration.test.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/e2e.test.js`

---

## V18 implementation matrix

| Area | Current source truth | V18 implementation expectation | Closure signal | Judgment |
|---|---|---|---|---|
| Root canon posture | `ENGI_SPEC.txt` points to `V18`; V17 canonical commit and V17 `_PROVEN_` remain present as prior canon | V18 promotion prep must advance the pointer only after matrix implementation and V18 `_PROVEN_` regeneration are complete | V18 docs state V18 as current target and record the generated appendix | closed |
| V17 proof appendix input | `ENGI_SPEC_V17_PROVEN.md` records 16 runs, 9 families, 45 members, 57 theorems, and 688 artifact digests | V18 must use this as the arithmetic and audit seed for generated matrix work | V18 spec/notes/matrix cite those counts and derive required matrix sizes from them | closed for draft posture |
| Proven generator structural checks | `buildCanonicalProvenData(...)` validates family catalog stability, member/theorem presence, replay catalog agreement, witness paths, required artifacts, metadata, and digest presence | V18 must extend beyond structural checks into generated semantic/evidence matrices | `buildV18Matrices(...)` consumes normalized proven data and adds proof-member/theorem/state summaries for V18 `_PROVEN_` rendering | closed |
| Hand-maintained proof catalog expectations | `workflow.integration.test.js` formerly contained a literal proof-family/member/theorem expectation table | V18 must replace or subordinate this with generated/imported catalog truth to reduce drift | Workflow integration derives expected proof-family catalog from `collectCanonicalProvenRuns(...)` and `buildCanonicalProvenData(...)` | closed |
| Proof-member semantic matrix | V17 checks member identity and high-risk member semantics through targeted tests; `_PROVEN_` summarizes member field shapes and pass counts | V18 must generate and execute `45 x 8 x 2 = 720` member semantic cells | `test:proof-member-matrix` reports `720 / 720` passing cells with no accepted exclusions | closed |
| Theorem evidence matrix | V17 checks theorem identity, passed verdicts, replay-step ids, and required artifact availability; `_PROVEN_` summarizes theorem pass counts | V18 must generate and execute `57 x 8 x 2 = 912` theorem evidence cells | `test:theorem-evidence-matrix` reports `912 / 912` passing cells with no accepted exclusions | closed |
| Repeated-run state matrix | V17 covers one representative repeated-run ordered pair in browser/integration | V18 must generate all `8 x 8 = 64` ordered scenario pair checks | `test:state-machine` reports all repeated-run ordered pairs passing | closed |
| Reset state matrix | V17 covers one representative reset-after-run path | V18 must generate all `8` reset-after-run scenario checks | `test:state-machine` reports all reset-after-run cells passing | closed |
| Mixed-deposit state matrix | V17 covers one representative mixed repo-backed/raw deposit workflow | V18 must generate all `8 x 2 x 4 = 64` mixed-deposit cells | `test:state-machine` reports all mixed-deposit cells passing across scenario, branch mode, and projection principal | closed |
| No-survivor state matrix | V17 covers representative no-survivor API/browser/integration paths and `409` conflict classification | V18 must generate all `8 x 2 x 4 = 64` no-survivor cells | `test:state-machine` reports all no-survivor cells passing with conflict classification and state preservation | closed |
| Projection duplication | V17 browser matrix already checks exact visible artifact inventories for all scenario/branch/principal cells | V18 does not duplicate non-public projection artifact inventories in the first gate unless projection policy generation changes or stricter non-browser proof is promoted | Decision remains recorded as an accepted boundary or a generated matrix is added after reopen | accepted boundary |
| Browser matrix | V17 E2E covers all `8 x 2 x 4 = 64` operator cells | V18 must keep browser coverage stable and avoid expanding it into proof-member/theorem cross-products | Browser tests remain green; new generated matrices live below the browser unless UI-specific gaps appear | accepted boundary |
| Matrix artifact emission | Branch artifacts remain per-run; V18 matrices are generated from canonical proven data plus state-machine fixtures | V18 must emit or otherwise generate structured matrix JSON consumable by `_PROVEN_` | `buildV18Matrices(...)` returns JSON-compatible generated outputs for proof-member, theorem-evidence, and state-machine matrices; canonical files remain promotion-time outputs if written | closed |
| Runtime coverage report | V17 `testCoverageReport` names unit/integration/e2e and major V17 validations | V18 must add generated matrix coverage honestly without inflating browser claims | Runtime report names generated proof-member, theorem-evidence, and state-machine matrices with cell counts totaling `1832` | closed |
| `_PROVEN_` rendering | V17 `_PROVEN_` renders aggregate verdict, proof-family inventory, member summaries, theorem summaries, replay steps, run matrix, and run details | V18 `_PROVEN_` must add generated matrix summaries and accepted exclusions | `ENGI_SPEC_V18_PROVEN.md` includes V18 matrix totals, failed-cell tables, state-machine group counts, and aggregate matrix proof status | closed |
| Verification commands | V17 canonical verification used typecheck, full tests, generator write, generator check, and diff hygiene | V18 must preserve that stack and add targeted matrix scripts when implemented | Typecheck, targeted matrix tests, workflow integration, full `npm test`, generator write, and generator check pass | closed |

---

## V18 required matrices

| Matrix | Axis expression | Total cells | Required V18 status |
|---|---:|---:|---|
| Proof-member semantic payload | `45 members x 8 scenarios x 2 branch modes` | `720` | required |
| Theorem evidence | `57 theorems x 8 scenarios x 2 branch modes` | `912` | required |
| Repeated-run ordered pairs | `8 previous scenarios x 8 next scenarios` | `64` | required |
| Reset after run | `8 scenarios` | `8` | required |
| Mixed deposit | `8 scenarios x 2 branch modes x 4 principals` | `64` | required |
| No survivor | `8 scenarios x 2 branch modes x 4 principals` | `64` | required |

## Accepted V18 first-draft boundaries

| Boundary | Rationale | Reopen condition |
|---|---|---|
| Do not expand browser tests into proof-member/theorem matrices | Browser is the wrong layer for 1,632 semantic/evidence cells; source/integration generators are more deterministic and maintainable | UI rendering of generated matrix state becomes canonical operator behavior |
| Do not duplicate non-public projection inventories at source level immediately | V17 browser already checks every scenario/branch/principal projection inventory against policy | Projection policy generation changes or a source-level projection bug escapes browser coverage |
| Do not make visual/a11y/performance budgets first-blocking | V18's first proof value is generated/formal exhaustiveness | Operator-shell quality becomes the accepted V18 focus after proof matrices are green |
| Do not generate `ENGI_SPEC_V18_PROVEN.md` during draft design | `_PROVEN_` is canonical-promotion output | V18 implementation/parity closure is accepted and the canonical commit is being prepared |

## V18 debt collection method

V18 parity debt must be collected through five audits:

1. Catalog-source audit
   Find every hand-maintained family/member/theorem expectation and either remove it or prove it is derived from runtime truth.

2. Predicate coverage audit
   For every proof family member and theorem, define the semantic or evidence predicate that turns a pass/fail verdict into inspectable proof.

3. Matrix execution audit
   Confirm every accepted matrix cell is generated, executed, and reported with coordinates.

4. Artifact/reporting audit
   Confirm matrix results are available to runtime coverage reporting and `_PROVEN_` rendering.

5. Boundary audit
   Record every deferred matrix as an accepted boundary with a reopen condition.

## V18 implementation guide

The source-side work must proceed in this order.

| Phase | Required source change | Required tests | Required parity update |
|---|---|---|---|
| 1. Catalog extraction | Add a generated proof-catalog fixture or helper derived from `collectCanonicalProvenRuns(...)` / `buildCanonicalProvenData(...)` | Existing proven-generator tests plus a new catalog-drift test | Mark hand-maintained catalog source gaps as reduced only after workflow tests consume generated truth |
| 2. Member matrix | Add proof-member semantic predicate registry and matrix builder | `test:proof-member-matrix` executes `720` cells | Record per-family predicate coverage and any accepted exclusions |
| 3. Theorem matrix | Add theorem evidence predicate registry and matrix builder | `test:theorem-evidence-matrix` executes `912` cells | Record theorem evidence closure and any failed or narrowed theorem groups |
| 4. State-machine matrix | Add repeated-run, reset, mixed-deposit, and no-survivor matrix builders | `test:state-machine` executes required state cells | Record state-machine cells, pass counts, and any accepted narrowing |
| 5. Runtime reporting | Add matrix counts and verdicts to `testCoverageReport` | Unit/integration assertions verify report truth | Mark runtime coverage report row as closed |
| 6. `_PROVEN_` rendering | Extend generated appendix data/rendering for V18 matrix summaries | Proven generator tests verify matrix sections and check mode stability | Mark `_PROVEN_` rendering row as closed only after generated V18 appendix check passes |

Canonical generated artifact names:
- `.engi/v18-proof-member-semantic-matrix.json`
- `.engi/v18-theorem-evidence-matrix.json`
- `.engi/v18-state-machine-matrix.json`

Canonical test entrypoints:
- `engi-demo/test/proof-member-matrix.test.js`
- `engi-demo/test/theorem-evidence-matrix.test.js`
- `engi-demo/test/state-machine.integration.test.js`

Canonical package scripts:
- `test:proof-member-matrix`
- `test:theorem-evidence-matrix`
- `test:state-machine`

The full `npm test` command must include these tests before V18 can be promoted.

## Required matrix artifact schema

Every generated matrix artifact must include:
- `matrixId`,
- `version`,
- `generatedAt`,
- `sourceRunCount`,
- `cellCount`,
- `passedCellCount`,
- `failedCells`,
- `acceptedExclusions`,
- and deterministic `cells`.

Every cell must include:
- matrix-specific coordinates,
- `predicateId`,
- evidence artifact paths,
- evidence digest refs where available,
- `passed`,
- and `failureReason`.

Matrix artifacts must be deterministic enough for `_PROVEN_` check mode to fail on unexpected changes.

## V18 canonical verification gate

The V18 canonical commit must not be prepared until these commands are green:
- `npm run typecheck`
- `npm run test:unit`
- `npm run test:integration`
- `npm run test:e2e`
- `npm run test:proof-member-matrix`
- `npm run test:theorem-evidence-matrix`
- `npm run test:state-machine`
- `npm test`
- `node scripts/generate-engi-proven.mjs --version V18 --commit <canonical-source-commit> --output ENGI_SPEC_V18_PROVEN.md --allow-dirty`
- `node scripts/generate-engi-proven.mjs --version V18 --commit <canonical-source-commit> --output ENGI_SPEC_V18_PROVEN.md --check --allow-dirty`
- `git diff --check`

## V18 completion condition

The V18 pass is complete when:

1. the spec, notes, and parity matrix agree that V18 is generated/formal proof exhaustiveness,
2. all required proof-member semantic cells are generated and green,
3. all required theorem evidence cells are generated and green,
4. required state-machine matrices are generated and green,
5. hand-maintained proof catalog duplication is removed or made subordinate to generated runtime truth,
6. runtime coverage reporting includes V18 matrix counts,
7. `_PROVEN_` rendering includes V18 matrix summaries,
8. full verification is green,
9. and `ENGI_SPEC_V18_PROVEN.md` is generated as part of canonical V18 promotion prep.
