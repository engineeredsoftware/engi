# ENGI Spec V18

## Status

- Scope: V18 accepted source implementation spec for generated/formal proof exhaustiveness after V17 demo-canon closure
- Companion notes file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18_NOTES.md`
- Companion parity ledger: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18_SYSTEM_PARITY_MATRIX.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17_PROVEN.md`
- Current generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18_PROVEN.md`
- Current canonical/latest target: `V18`
- Last fully realized canonical target preserved in source: `V18`
- V18 state: source-side generated matrix implementation complete; `ENGI_SPEC.txt` points to `V18`; `ENGI_SPEC_V18_PROVEN.md` is generated from proof-source commit `c675116`
- Current realization basis for this pass: `engi-demo`

## Version executive summary

V18 begins after V17 closed the operator-facing demonstration canon.

V17 proved that the V16 proof system can be exercised through a production-like demo surface:
- every seeded scenario,
- both branch modes,
- every projection principal,
- exact browser-visible projection artifact inventories,
- representative stateful recovery flows,
- and generated `_PROVEN_` output for the canonical proof appendix.

V18 must not reopen that acceptance boundary unless a regression is discovered.

The V18 job is generated/formal exhaustiveness.
It turns the remaining deferred proof and workflow matrices into generated, deterministic, source-level and integration-level checks so ENGI can distinguish:
- structurally present proofs,
- semantically proven proof-member payloads,
- theorem verdicts with evidence-bound replay payloads,
- stateful workflow totality,
- and generated documentation that is derived from executable proof data rather than prose duplication.

The central V18 question is:
- can ENGI generate and execute the remaining proof-member, theorem-evidence, and state-machine matrices without hand-written catalog drift?

## Canonical ENGI executive summary

ENGI remains a proof-bearing operating system for engineering assetizing.

The canonical chain is:
1. deposited assets enter through typed depositing surfaces,
2. a need is measured and expressed as prompt/inference-owned requirements,
3. assets are evaluated, verified, selected, and materialized,
4. branch artifacts and proof artifacts are emitted,
5. identity, authorization, and projection policy constrain what each principal can see,
6. source-to-shares settlement records exact contribution and accounting consequences,
7. proof bundles, witness manifests, replay catalogs, and generated appendices make the result auditable.

V18 does not change that product identity.
It changes the level of exhaustiveness required before a proof-closed claim is accepted.

## V18 inheritance rule

V18 inherits V17 as a closed operator-facing base.

That means:
- V17 remains the current canonical/latest target until `ENGI_SPEC.txt` is intentionally advanced,
- V17's generated `_PROVEN_` appendix is the seed artifact for V18 proof-audit design,
- V17's 64-cell browser operator matrix is accepted as complete for operator-facing functional demonstration,
- V17's representative stateful flows become the starting examples for generated state-machine expansion,
- and V18 must use source/integration generators instead of expanding browser tests into unmaintainable cross-products.

V18 must not manually duplicate proof-family catalogs as a new source of truth.
Where a catalog is needed, it must be derived from:
- runtime proof bundles,
- witness manifests,
- `collectCanonicalProvenRuns(...)`,
- `buildCanonicalProvenData(...)`,
- or a generated fixture created from those surfaces.

## V18 accepted scope decisions

V18 accepts the following implementation decisions:

1. V18 is a generated/formal exhaustiveness pass, not a new proof-family design pass.
2. New proof families are out of scope unless generated matrices expose a concrete missing proof category.
3. V17's `8 x 2 x 4 = 64` browser operator matrix is accepted as operator-facing canon.
4. Browser E2E must not expand into proof-member or theorem cross-products unless the generated matrices reveal UI-specific behavior that cannot be proven below the browser.
5. The `720` proof-member semantic cells are required for V18 completion.
6. The `912` theorem-evidence cells are required for V18 completion.
7. Repeated-run, reset-after-run, mixed-deposit, and no-survivor state-machine matrices are required for V18 completion.
8. Proof catalogs used by tests must be generated or imported from runtime truth, not maintained as independent tables.
9. Generated matrix artifacts must be structured data consumable by `_PROVEN_`; test stdout is not an acceptable source for canonical proof documentation.
10. V18 `_PROVEN_` expansion may be version-gated so V17 appendix shape remains stable while V18 adds matrix summaries.
11. Non-public projection duplication at source/integration level is deferred unless projection-policy generation changes or a projection bug escapes V17 browser coverage.
12. Visual regression, accessibility, and performance budgets are deferred beyond the first V18 completion gate unless the user explicitly promotes one into V18 scope.

## V18 acceptance posture

V18 accepts a stricter proof standard than V17.

For V18, a proof surface is not fully closed merely because:
- the proof family exists,
- all theorem verdicts are `passed`,
- member ids are structurally present,
- or `_PROVEN_` records the summary.

V18 closure requires generated assertions that can enumerate the relevant cells and explain:
- which proof family, member, theorem, scenario, and branch mode is under test,
- which runtime artifact and evidence path supports the assertion,
- what semantic predicate was evaluated,
- whether the predicate passed,
- and how any accepted exclusion is justified.

The required V18 proof matrices are:

| Matrix | Required cells | V18 intent |
|---|---:|---|
| Proof-member semantic payload matrix | `45 x 8 x 2 = 720` | Every proof-family member must have a family-specific semantic predicate evaluated for every scenario and branch mode. |
| Theorem evidence matrix | `57 x 8 x 2 = 912` | Every theorem must bind to concrete replay/evidence payloads for every scenario and branch mode. |
| Repeated-run ordered scenario matrix | `8 x 8 = 64` | Every ordered scenario pair must preserve latest-run truth, run-history order, and proof/artifact coherence. |
| Reset-after-run matrix | `8` | Every scenario must reset back to the seeded branchable state after a realized run. |
| Mixed-deposit matrix | `8 x 2 x 4 = 64` | Mixed repo-backed/raw deposits must compose across scenarios, branch modes, and principals. |
| No-survivor matrix | `8 x 2 x 4 = 64` | No-survivor conflicts must fail as request-caused workflow conflicts without corrupting state. |

The accepted V18 exclusions are:
- no browser execution of the `720` proof-member cells,
- no browser execution of the `912` theorem-evidence cells,
- no immediate source/integration duplication of non-public projection artifact inventories already proven by the V17 browser matrix,
- no first-gate visual regression requirement,
- no first-gate accessibility requirement,
- and no first-gate runtime/performance budget requirement.

These exclusions are not permanent system non-goals.
They are V18 boundary decisions that keep the version focused on generated proof exhaustiveness.

## V18 generated proof-member semantic matrix

The proof-member semantic matrix is the first required V18 workstream.

It must produce one assertion cell per:
- proof family,
- member id,
- seeded scenario,
- branch mode.

Each cell must include:
- `scenarioId`,
- `branchMode`,
- `proofFamily`,
- `memberId`,
- `proofArtifactPath`,
- `witnessArtifactPaths`,
- `replayArtifactPaths`,
- `predicateId`,
- `evidencePaths`,
- `evidenceDigestRefs`,
- `passed`,
- and `failureReason`.

Member predicates are family-specific.
Examples:
- prompt members require registry membership, prompt contract completeness, parsed envelope admissibility, downstream consumer closure, and provenance truth.
- inference members require moment-contract presence, field-proof presence, evaluator-status truth, evidence-basis closure, and parsed envelope presence.
- static-code-analysis members require stage-domain purity, abstract-to-concrete mapping, registry role closure, and receipt/report/proof agreement.
- verification members require issuance, provenance, sufficiency, issuer-policy, use-tier consequence, and receipt/report role closure.
- selection/materialization members require selected-asset closure, locked-unit closure, materialized-source closure, exclusion closure, and visibility-rule closure.
- authorization/sensitive-flow members require principal totality, authorization-decision closure, confidentiality class coverage, retention/disclosure rule coverage, and no unauthorized public flow.
- settlement members require contribution totality, clipping determinism, normalization exactness, participation totality, allocation conservation, journal completeness, and settlement-proof closure.
- disclosure members require projection-policy closure, bounded-public metadata-only behavior, redaction alignment, and disclosure verdict alignment.
- proof-contract members require contract materialization, evidence-chain closure, theorem-check binding, bundle coherence, and witness-manifest closure.

V18 implementation must generate these cells from runtime proof data and family predicate definitions, not from a hand-written table inside each test.

The required member matrix artifact shape is:

| Field | Requirement |
|---|---|
| `matrixId` | Stable id, expected `v18-proof-member-semantic-matrix`. |
| `version` | Version label used for matrix generation, expected `V18` during canonical promotion. |
| `sourceRunCount` | Number of canonical scenario/branch runs consumed, expected `16`. |
| `cellCount` | Total generated member cells, expected `720`. |
| `passedCellCount` | Number of passing cells; must equal `720` for V18 completion. |
| `failedCells` | Structured list of failed cells; must be empty for V18 completion. |
| `acceptedExclusions` | Structured list of excluded cells; must be empty unless the parity matrix names the exclusion. |
| `cells` | Deterministically ordered cell list keyed by scenario, branch mode, proof family, and member id. |

## V18 theorem evidence matrix

The theorem evidence matrix is the second required V18 workstream.

It must produce one assertion cell per:
- theorem id,
- proof family,
- seeded scenario,
- branch mode.

Each cell must include:
- `scenarioId`,
- `branchMode`,
- `proofFamily`,
- `theoremId`,
- `replayStepIds`,
- `witnessArtifactPaths`,
- `replayArtifactPaths`,
- `requiredArtifactPaths`,
- `evidencePredicateId`,
- `evidenceDigestRefs`,
- `passed`,
- and `failureReason`.

The theorem evidence matrix must prove more than theorem presence.
It must show that each theorem's declared replay steps and required artifact paths can actually support the theorem-specific verdict.

V18 must therefore extend the current `_PROVEN_` data model or add a companion generated matrix artifact so theorem evidence does not remain only a summarized `passedRuns` count.

The required theorem evidence artifact shape is:

| Field | Requirement |
|---|---|
| `matrixId` | Stable id, expected `v18-theorem-evidence-matrix`. |
| `version` | Version label used for matrix generation, expected `V18` during canonical promotion. |
| `sourceRunCount` | Number of canonical scenario/branch runs consumed, expected `16`. |
| `cellCount` | Total generated theorem cells, expected `912`. |
| `passedCellCount` | Number of passing cells; must equal `912` for V18 completion. |
| `failedCells` | Structured list of failed cells; must be empty for V18 completion. |
| `acceptedExclusions` | Structured list of excluded cells; must be empty unless the parity matrix names the exclusion. |
| `cells` | Deterministically ordered cell list keyed by scenario, branch mode, proof family, and theorem id. |

## V18 state-machine matrix

The state-machine matrix is the third required V18 workstream.

It must cover workflow transitions that V17 proved only through representative cases:
- repeated run after previous run,
- reset after run,
- mixed repo-backed/raw deposit before branch creation,
- and no-survivor conflict with state preservation across branch mode and projection principal.

Invalid-to-valid recovery, projection switching after run, and branch-mode switching remain accepted V17 browser/integration coverage unless a future change reopens them as generated source matrices.

V18 must keep these as source/integration checks unless a state-machine path exposes UI-specific behavior.
The browser suite must remain focused on the V17 operator matrix and new UI regressions.

Every state-machine matrix cell must declare:
- initial state,
- action sequence,
- expected terminal state,
- preserved run-history invariant,
- preserved latest-run invariant,
- preserved projection invariant,
- and failure classification if the action is expected to fail.

The required state-machine artifact shape is:

| Field | Requirement |
|---|---|
| `matrixId` | Stable id, expected `v18-state-machine-matrix`. |
| `version` | Version label used for matrix generation, expected `V18` during canonical promotion. |
| `matrixGroups` | Deterministically ordered groups for repeated-run, reset-after-run, mixed-deposit, and no-survivor. |
| `cellCount` | Sum of required state-machine cells, expected `200`. |
| `passedCellCount` | Number of passing cells; must equal `cellCount` for V18 completion. |
| `failedCells` | Structured list of failed cells; must be empty for V18 completion. |
| `acceptedExclusions` | Structured list of excluded cells; must be empty unless the parity matrix names the exclusion. |
| `cells` | Deterministically ordered state-machine cell list with action sequence and terminal invariant results. |

## V18 generator architecture

V18 must introduce generated matrix machinery with a small number of stable surfaces:

1. Catalog extraction
   A single source extracts scenario ids, branch modes, proof families, member ids, theorem ids, replay steps, witness paths, projection principals, and projection policy paths from runtime truth.

2. Predicate registry
   Family-specific semantic predicates live in one registry and return structured evidence instead of only boolean assertions.

3. Matrix builders
   Matrix builders produce deterministic data for proof-member, theorem-evidence, and state-machine matrices.

4. Matrix tests
   Source/integration tests execute every generated cell and fail with the cell coordinates and predicate id.

5. Matrix artifacts
   Runtime or generated artifacts preserve the pass/fail surface in JSON so `_PROVEN_` can summarize it without reverse-engineering test output.

6. `_PROVEN_` renderer expansion
   The V18 generated appendix includes aggregate proof-family summary, proof-member semantic matrix summary, theorem evidence matrix summary, and state-machine matrix summary.

Canonical artifact names are:
- `.engi/v18-proof-member-semantic-matrix.json`,
- `.engi/v18-theorem-evidence-matrix.json`,
- `.engi/v18-state-machine-matrix.json`.

Canonical test entrypoints are:
- `engi-demo/test/proof-member-matrix.test.js`,
- `engi-demo/test/theorem-evidence-matrix.test.js`,
- `engi-demo/test/state-machine.integration.test.js`.

Canonical package scripts are:
- `test:proof-member-matrix`,
- `test:theorem-evidence-matrix`,
- `test:state-machine`,
- and the existing full `test` script must include the new tests.

## V18 source-side implementation sequence

The required V18 implementation sequence is:

1. Extract proof catalog and scenario/branch axes into reusable fixtures derived from runtime data.
2. Replace hand-maintained proof-family catalog duplication in tests with generated or imported canonical catalog data.
3. Add proof-member semantic predicate registry and generated 720-cell test execution.
4. Add theorem evidence predicate registry and generated 912-cell test execution.
5. Add state-machine matrix fixtures for repeated-run, reset, mixed-deposit, and no-survivor behavior.
6. Add generated matrix artifacts and wire them into runtime coverage reporting.
7. Add targeted package scripts for every generated matrix family.
8. Expand the `_PROVEN_` generator to include V18 matrix summaries.
9. Regenerate `ENGI_SPEC_V18_PROVEN.md` only on canonical V18 promotion.

## V18 non-goals

V18 should not:
- manually edit generated `_PROVEN_` files,
- rewrite the V17 operator shell without a concrete generated proof or demo regression,
- expand the 64-cell browser matrix into every proof-member or theorem cell,
- preserve hand-maintained proof-family catalog copies after a generated catalog exists,
- treat a source-level generated matrix as a replacement for public/reviewer/buyer/internal projection behavior,
- or redefine ENGI proof families unless the generated matrices expose a real family-level contract error.

## V18 completion condition

V18 is complete when:

1. V18 docs define generated/formal proof exhaustiveness as the version focus.
2. The system parity matrix records all required matrix groups and accepted exclusions.
3. Proof-family catalogs are generated or imported from runtime truth rather than duplicated by hand in tests.
4. The proof-member semantic matrix executes all `720` required cells.
5. The theorem evidence matrix executes all `912` required cells.
6. The required state-machine matrices execute and report their remaining cells.
7. Generated matrix artifacts exist as structured data and are consumable by `_PROVEN_`.
8. Runtime coverage reporting includes the generated matrices honestly.
9. `_PROVEN_` generation includes V18 matrix summaries.
10. `npm run typecheck`, layered tests, targeted matrix scripts, full `npm test`, and V18 `_PROVEN_` check mode are green.
11. `ENGI_SPEC_V18_PROVEN.md` is regenerated, not manually edited, as part of the canonical V18 commit.
