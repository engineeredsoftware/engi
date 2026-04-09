# ENGI Spec V17 System Parity Matrix

## Status

- Scope: root system-canonical implementation/parity and demo-driven validation debt for the V17 drafting pass
- Draft target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17_NOTES.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V16.md`
- Prior system parity ledger: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V16_SYSTEM_PARITY_MATRIX.md`
- Current canonical/latest target: `V16`
- Last fully realized canon preserved in source: `V16`
- V17 state: advanced draft implementation/audit exhaustion; not yet the canonical pointer target
- Primary implementation surface audited for this pass: `engi-demo`

## Purpose

This file begins the V17 root implementation/parity ledger for the demo-driven canon pass.

Its first job is not to restate V16 proof closure.
Its first job is to record, precisely, where the now-tightened V16 system is still under-demonstrated, under-tested, or insufficiently realistic in execution.

The opening V17 focus is:
- canonical unit/integration/e2e test taxonomy,
- V16-guided audit reuse for bug/gap discovery,
- subsystem test coverage realism,
- workflow integration coverage for closer-to-real ENGI operations,
- production-like browser workflow coverage,
- runtime test-coverage-report honesty,
- and bugs/gaps revealed by attempting to demonstrate the full V16 system rather than only inspect its artifacts.

## Interpretation rule

The correct V17 reading is:
- `V16` remains the active canonical/latest target,
- V17 is the next canon draft,
- this matrix records the implementation and validation work needed to make the V16 system demonstrable at production-like fidelity,
- V16 spec/parity materials remain active review guides for this work,
- and rows here describe current gaps, target behavior, and closure signals rather than accomplished V17 closure.

## Audit basis

This matrix is grounded in:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V16.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V16_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V16_SYSTEM_PARITY_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V16_PROVEN.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/engi-demo.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/run-artifacts.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/server.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/public/app.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/core.test.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/api.test.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/e2e.test.js`

---

## V17 opening implementation themes

This drafting pass is centered on seven implementation rules:

1. Test taxonomy should be a canonical runtime truth, not only a file-layout habit.
2. V16 spec and V16 parity should be reused as the first audit/review guide for V17.
3. Unit tests should map to subsystem contracts rather than general confidence.
4. Integration tests should model realistic multi-step ENGI workflows, not only per-endpoint correctness.
5. E2E tests should verify the operator-facing demo as a production-like interface, not only shell order and happy path.
6. Runtime `testCoverageReport` should describe the actual V17 validation stack honestly.
7. Bugs and missing demo closure should be admitted first by failing tests whenever practical.

---

## V17 current implementation matrix

| Area | Current source truth | V17 implementation expectation | Closure signal | Judgment |
|---|---|---|---|---|
| Root canon posture | V16 is active canon and the source tree is proof-closed enough to support generated `_PROVEN_` | V17 should begin by validating V16 through realistic demonstration rather than by inventing a new proof layer immediately | V17 docs and source clearly treat V16 as the demonstrated base system | required posture |
| V16 audit-guide reuse | V16 spec, notes, and parity materials already describe the most recent proof/demo/system seams, and V17 now explicitly reuses them as the opening audit guide | V17 should continue turning those inherited seams into executable tests rather than one-time prose references | V17 docs and workflow audits cite V16 seams directly and continue adding ratchets from them | initially landed |
| Test stack naming | `engi-demo` now exposes explicit `test:unit`, `test:integration`, and `test:e2e` scripts, and runtime `testCoverageReport` emits `unit`, `integration`, and `e2e` | V17 should keep one canonical layered vocabulary across scripts, runtime coverage, and test entrypoints | package scripts, runtime coverage report, and test entrypoints agree on one layered taxonomy | closed for opening pass |
| Subsystem unit coverage | `core.test.js` now covers subsystem and run-level invariants, proof-family replay-catalog closure, emitted witness/replay surfaces, projection-boundary differences, and the full seeded scenario matrix across both `patch` and `context` | V17 should keep expanding unit closure by subsystem rather than treating unit tests as a generic confidence bucket | unit scripts and emitted coverage surfaces name subsystem/unit intent directly and the highest-risk proof/projection seams have direct unit ratchets | strongly advanced |
| Workflow integration coverage | `workflow.integration.test.js` now exists and carries closer-to-real ENGI workflow paths alongside the retained API boundary tests, including a full seeded scenario-corpus audit across both `patch` and `context` with exact proof-family/member/theorem catalog checks plus family-specific prompt/inference, static/verification, selection/auth/disclosure, settlement exactness, repeated-run, mixed-deposit, no-survivor recovery, and principal projection-matrix ratchets | V17 should keep growing workflow integration as a first-class suite rather than letting it collapse back into generic route checks | dedicated workflow integration entrypoint exists, is reflected in scripts/coverage metadata, and now includes internal/reviewer/buyer/public workflow differences, restrictive verification/materialization behavior, full seeded corpus workflow closure with exact family catalogs, stateful recovery seams, and member-semantic workflow closure across the highest-risk proof families | strongly advanced |
| Endpoint validation coverage | `api.test.js` covers malformed input, static serving, favicon/SVG correctness, unknown routes, reset behavior, unsupported-workflow client errors, no-survivor workflow conflict classification, and persistence failures | V17 should preserve endpoint validation while distinguishing it from workflow integration | endpoint-only checks stay present, request-caused no-survivor branch creation returns `409`, and workflow semantics are now also covered in dedicated integration | strongly advanced |
| Runtime test coverage report honesty | `buildTestCoverageReport(...)` now emits `unit`, `integration`, and `e2e` plus the new layered validations | V17 should keep that report aligned with the real suite structure as more workflow-bearing tests are added | runtime report names unit/integration/e2e honestly and the tests assert that structure | closed for opening pass |
| Closer-to-real workflow realism | explicit integration tests now cover repo-authenticated deposit composition, mixed raw/repo-backed deposit composition, normalization/projection behavior, privacy-boundary disclosure vs replay visibility, restrictive unsafe-patch verification/materialization behavior, prompt/inference downstream consumer closure, static-vs-verification receipt-domain separation, selection/auth/disclosure visibility closure, settlement zero-credit exactness, repeated runs without reset, and no-survivor recovery | V17 should continue growing those flows toward fuller production-like coverage and failure-mode depth | workflow integration tests cover deposit -> branch -> proof/artifact/settlement/state behavior across multiple scenario classes, consequence classes, stateful recovery paths, and family-member semantics | strongly advanced |
| Browser E2E breadth | browser tests now cover targeted settlement, normalization/source-to-shares, privacy-boundary identity/auth plus proof/disclosure surfaces, restrictive raw proof inspection with family/member/theorem visibility, projection switching, projection visibility summary, proof-family catalog inspection, prompt/inference audit artifact inspection, static/auth/settlement family proof inspection, internal-versus-reviewer source-material visibility, invalid-to-valid deposit recovery, no-survivor conflict recovery, and repeated scenario runs without reset | V17 should keep growing beyond those flows into broader operator and failure-path behavior | browser suite asserts surfaced proof/artifact/operator states beyond shell order alone and can now exercise principal-bounded visibility, raw proof-family inspection, member/theorem surfaces, source-material visibility boundaries, recovery paths, and latest-run refresh directly in the demo shell | strongly advanced |
| Demo/operator truth | `public/app.js` and `server.js` now expose a canonical V16 operator shell, corrected SVG/favicon serving, proof-family catalog surfacing, projection-aware visibility summaries, and first-class prompt/inference/static/verification/selection/auth/disclosure/settlement proof artifacts | V17 should use that shell as the production-like demonstration surface rather than a thin demo-only afterthought | UI-facing tests and runtime docs treat the demo as the primary demonstration vehicle, and the surfaced shell now makes emitted V16 proof artifacts inspectable instead of hiding them behind the system proof bundle | strongly advanced |
| Projection-difference coverage | source already supports `public`, `buyer`, `reviewer`, and `internal` projections, and V17 now exercises them across unit, API, integration, and browser layers, including reviewer/public proof visibility, full seeded corpus principal checks, and non-internal source-material suppression | V17 should ratchet projection differences directly across unit, API, integration, and demo surfaces | tests verify raw-file visibility, replay-surface visibility, bounded-public omission, reviewer/public proof-family differences, full seeded corpus principal behavior, and browser-visible projection switching across principals | strongly advanced |
| API failure semantics | the server now rejects unsupported principals, branch modes, and missing scenarios as `400` client errors and no-survivor branch creation as `409` instead of surfacing them as generic server failures | V17 should keep operator/input failures classified as client-visible contract errors whenever they are request-caused | API tests pin failure semantics for invalid projection/workflow inputs and empty-asset no-survivor conflicts | strongly advanced |
| Failure-safe stateful execution | API tests cover atomic write failures for deposit and branch creation, no-survivor conflict classification, and browser/integration tests now cover reset, invalid deposit recovery, no-survivor recovery, and repeated runs without reset | V17 integration should continue to stress stateful failure semantics under multi-step workflows | workflow and browser tests verify state coherence before and after failed, reset, recovered, and repeated multi-step operations | strongly advanced |
| Replay-surface closure assertions | V16 proof-bearing replay surfaces existed, but the unit layer did not yet ratchet family-catalog/replay-catalog agreement directly | V17 should make replay closure executable at the same level of rigor as emitted proof-family claims | unit tests assert proof-family catalog, replay catalog, witness paths, verifier-required artifacts, and branch-artifact emission cohere generically, while integration now checks exact family/member/theorem catalogs through HTTP workflows | strongly advanced |
| Browser failure/reset coverage | browser coverage now includes invalid deposit feedback, invalid-to-valid deposit recovery, reset-to-seeded-state, no-survivor conflict recovery, repeated-run refresh, and the projection-bounded visibility consequences that appear after realized runs | V17 should surface operator-visible validation and reset behavior directly in the interface suite | E2E tests cover invalid deposit feedback, valid recovery, no-survivor recovery, reset-to-seeded-state, latest-run replacement, and bounded proof visibility after projection changes | strongly advanced |
| Proof/demo alignment | V17 now has integration and E2E ratchets for proof-contract replay visibility, bounded-public disclosure, surfaced proof/disclosure panels, proof-family catalog rendering, restrictive raw proof/materialization inspection, prompt/inference audit artifacts, static/auth/settlement family proofs, principal projection boundaries, stateful recovery, and reviewer/public replay-artifact boundaries | V17 should continue extending those ratchets across the remaining V16 audit seams | test failures reveal proof/demo drift rather than only static artifact mismatches; this pass found and fixed the stale `ENGI_NEED.md` markdown body before it could masquerade as proof-complete operator documentation, then added stateful recovery/projection ratchets around the demo itself | strongly advanced |

---

## V17 exhaustion matrix

| Exhaustion cell | Required closure | Current executable coverage | Remaining closure condition |
|---|---|---|---|
| Proof families x members | Every V16 proof family must retain stable family names, proof artifact paths, member ids, theorem ids, witness paths, replay artifacts, and passing theorem verdicts | Unit proof/replay catalog checks plus full seeded HTTP corpus checks across both `patch` and `context` for all 9 families | Generate or parameterize every family/member semantic assertion if V17 promotes from high-risk semantic ratchets to full cross-product semantic proof execution |
| Scenario corpus x branch modes | Every seeded scenario must branch successfully in `patch` and `context`, with proof, artifact, settlement, and projection coherence preserved | Workflow integration loops every seeded scenario through both branch modes and checks exact proof-family catalog, witness, replay, and public projection paths | Add browser-level scenario-corpus sampling or generation if operator UI must prove every scenario, not only representative high-risk scenarios |
| Principals x projection surfaces | `internal`, `reviewer`, `buyer`, and `public` must preserve raw-source, replay, authorization, prompt/inference, and bounded-public distinctions | Workflow integration now checks all four principals across the seeded corpus; E2E checks projection switching and internal/reviewer/public visibility consequences | Exercise every individual visible UI surface under every principal if V17 requires a complete browser projection cross-product |
| Stateful workflows | Repeated runs, mixed deposits, failed writes, no-survivor conflicts, and resets must preserve latest-run truth, run history, and persistent state | API, integration, and E2E now cover failed writes, repeated runs without reset, mixed repo-backed/raw deposits, invalid deposit recovery, no-survivor `409`, and reset recovery | Add destructive/interrupted process simulation only if V17 expands into crash-resume guarantees beyond current atomic write safety |
| Browser operator experience | The demo must behave as a production-like operator shell rather than a static artifact viewer | E2E covers panel order, deposit, branch creation, scenario switching, proof inspection, projection switching, failure feedback, recovery, reset, repeated runs, and raw proof inspection | Add visual regression or accessibility-specific suites if V17 treats UX quality as a canonical proof target rather than functional demonstration target |
| API/integration boundary | Endpoint tests should stay focused on request/response, validation, static serving, and persistence safety while workflow semantics live in integration | Boundary is substantially separated; API keeps endpoint and small smoke assertions while workflow integration owns composition semantics | Optional cleanup: migrate remaining workflow-adjacent API smoke checks into integration once the endpoint suite can stay purely boundary-focused |
| Runtime coverage report | Emitted `.engi/test-coverage-report.json` must describe the actual suite taxonomy and high-risk validations | Runtime report names unit/integration/e2e and now includes mixed-deposit, repeated-run, no-survivor, recovery, and browser projection validations | Keep report text synchronized as additional test families are added |
| Generated `_PROVEN_` appendix | V17 `_PROVEN_` must never be manually edited and should be regenerated only on canonical version promotion commits | V16 generator and generated appendix remain the canonical model; V17 docs now preserve the rule instead of regenerating a draft appendix prematurely | Regenerate `ENGI_SPEC_V17_PROVEN.md` only when V17 becomes the canonical bump commit and all implementation/parity closure is accepted |

---

## V17 opening debt collection method

For this pass, demo-driven parity debt should be collected through six repeatable audits:

1. V16 inheritance audit
   Compare V16 spec and V16 parity claims to what is currently demonstrable in source, runtime artifacts, API flows, and browser flows.

2. Test taxonomy audit
   Compare package scripts, runtime `testCoverageReport`, and actual test entrypoints.

3. Subsystem-to-suite audit
   Compare each major ENGI subsystem family to the unit/integration/e2e layers that are supposed to exercise it.

4. Workflow realism audit
   Compare current integration/E2E flows to real operator sequences already supported by the source system.

5. Surfaced-state audit
   Compare what the browser/API surfaces present to operators with what the underlying run artifacts and proofs actually contain.

6. Failure-ratchet audit
   Convert discovered demo and workflow gaps into failing tests before calling the relevant layer closed.

---

## V17 opening implementation debts

The concrete current debts in view are:

1. The V16 spec/parity materials are now materially exercised through unit, integration, and E2E tests, but V17 has not yet generated every possible family/member/scenario/principal/operator cross-product assertion as a parameterized canonical suite.
2. Endpoint validation and workflow integration are now substantially separated, but `api.test.js` still carries limited workflow smoke coverage that could migrate into integration-specific contracts if a pure boundary suite becomes a V17 acceptance criterion.
3. Browser coverage now includes the highest-risk happy, projection, proof-inspection, failure, recovery, and repeated-run paths, but not every seeded scenario and every proof/artifact surface is driven through the browser layer.
4. Projection-difference coverage is now strong across the seeded HTTP corpus and representative browser flows, but complete per-artifact browser projection cross-products remain available if V17 demands UI-level exhaustiveness.
5. Replay-surface closure is ratcheted generically in unit tests, exactly across the seeded corpus, and semantically across the highest-risk families, but a generated semantic assertion matrix for every member remains the next step if V17 moves from strong audit coverage to exhaustive proof execution.
6. V17 `_PROVEN_` has not been generated and should not be generated in draft state; the generation step belongs to the eventual canonical version bump commit after implementation/parity closure.

---

## V17 opening success condition

The opening V17 pass is in good shape when:

1. the root V17 docs clearly define the demo-driven and test-layered posture,
2. the V16 spec/parity inheritance rule is explicit,
3. source reflects an explicit unit/integration/e2e taxonomy,
4. at least one dedicated closer-to-real workflow integration surface exists,
5. runtime test coverage reporting matches the new taxonomy,
6. existing subsystem and browser coverage remain green,
7. and new bugs/gaps begin surfacing through workflow tests rather than speculation alone.
