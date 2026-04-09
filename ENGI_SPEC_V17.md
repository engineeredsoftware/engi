# ENGI Spec V17

## Status

- Scope: current V17 draft starts as the demo-driven canon pass that validates and hardens the full V16 system through layered tests and demonstrable workflows
- Companion notes file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17_NOTES.md`
- Companion parity ledger: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17_SYSTEM_PARITY_MATRIX.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V16.md`
- Current canonical/latest target: `V16`
- Last fully realized canon preserved in source: `V16`
- V17 state: drafting; not yet the canonical pointer target
- Current realization basis for this pass: `engi-demo`

## Version executive summary

V17 begins as the first demo-driven validation canon after the V16 proving-closure pass.

V16 made the proof layer materially tighter:
- proof families,
- member closure,
- theorem catalogs,
- theorem-by-theorem closure,
- proof-bearing artifacts,
- replay surfaces,
- and generated `_PROVEN_` output.

V17 should not begin by inventing new proof language.
It should begin by proving that the now-tightened V16 system can actually be demonstrated as an operator-bearing, workflow-bearing system under layered tests that resemble real use.

The primary V17 sequence is:
1. subsystem unit closure,
2. cross-subsystem workflow integration closure,
3. fully interfaced end-to-end production-workflow closure.

This makes V17 bug-filling and gap-filling by demonstration rather than by abstract review alone.

## V16 audit inheritance rule

V17 should treat the V16 spec set as an audit inheritance surface rather than as completed history to leave behind.

That means:
- the V16 spec remains the best current statement of full-system proof-bearing intent,
- the V16 notes remain a concentrated record of recently tightened or recently fragile areas,
- and the V16 system parity matrix remains a strong review guide for missing components, gaps, bugs, and overclaimed closure.

V17 therefore begins with an audit-first posture:
- read V16 claims,
- compare them to the currently demonstrable system,
- encode the discovered gaps as tests where practical,
- and then harden source until system reality, operator reality, and emitted runtime truth agree.

## Canonical ENGI executive summary

ENGI remains a proof-bearing operating system that turns deposited assets, measured need, candidate evaluation, branch artifacts, settlement, disclosure, and policy into a replayable chain.

V17 does not change that system purpose.
It changes the next development posture.

The question for V17 is not only:
- is the proof layer well specified,

but also:
- can the full V16 system be demonstrated coherently,
- do the sub-systems compose in realistic operator workflows,
- and do tests fail at the same seams where demo truth breaks.

## Current V17 drafting scope

This pass begins with:
- a canonical test-stack model for ENGI,
- a demo-driven implementation posture for `engi-demo`,
- explicit layering between subsystem unit tests, workflow integration tests, and fully interfaced browser E2E tests,
- identification of the current gaps between V16 proof closure and V16 demonstrability,
- and the first implementation ratchets needed to make that layered posture real in source.

The following are intentionally out of scope for the opening V17 pass:
- introducing a new proof-family canon distinct from V16,
- replacing the V16 proof appendix model,
- or broadly rewriting the root system model before demonstration gaps are surfaced by tests.

The correct reading is:
- V16 remains active canon,
- V17 starts as the next canon draft,
- and the first V17 job is to make V16 demonstrable and test-ratcheted enough that new gaps appear through real execution rather than speculation.

## V17 test-stack rule

V17 treats the ENGI validation stack as three distinct canonical layers.

### 1. Subsystem unit layer

This layer proves that individual ENGI subsystem families behave correctly in isolation.

Examples include:
- need measurement and prompt/inference shaping,
- evaluation and verification determinisms,
- selection/materialization builders,
- settlement and exact-accounting invariants,
- disclosure/projection boundaries,
- proof bundle and witness shaping.

Unit tests should fail on:
- local invariant drift,
- theorem/report/proof mismatches,
- malformed subsystem outputs,
- and alias/registry/configuration errors inside one subsystem boundary.

### 2. Workflow integration layer

This layer proves that ENGI subsystems compose correctly in realistic stateful workflows without requiring the full browser shell.

Examples include:
- authenticated repo-artifact deposit to branch realization,
- buyer/public projection changes across the same run,
- normalization-heavy settlement scenarios,
- persistence and reset semantics across multi-step runs,
- and proof/disclosure/accounting surfaces staying coherent after state transitions.

Integration tests should fail on:
- workflow seams between subsystems,
- state persistence drift,
- missing or incoherent emitted artifacts,
- and demo/API flows that look locally valid but fail when composed.

### 3. Fully interfaced end-to-end layer

This layer proves that the operator-facing ENGI demo behaves as a credible production-like interface rather than only as a data harness.

Examples include:
- browser-driven deposit and branch creation,
- scenario switching,
- operator visibility of proof/artifact/settlement state,
- and bounded-public versus richer operator projection surfaces.

E2E tests should fail on:
- operator-ordering regressions,
- broken interaction flows,
- missing surfaced outputs,
- and interface-level contradictions with the underlying system state.

## V17 demo-driven closure rule

A V17 feature or subsystem is not considered demonstrated merely because its proof artifacts exist.

For V17, demonstration closure requires:
- one or more unit tests that prove the local subsystem contract,
- one or more integration tests that prove subsystem composition in a realistic workflow,
- and where operator-facing, one or more E2E tests that prove the surfaced behavior.

If a layer does not apply, that exclusion should be explicit.

## V17 initial implementation themes

The opening V17 implementation themes are:

1. Test taxonomy must become canonical source truth rather than an implicit file naming convention.
2. The current `core` / `api` / `e2e` split should evolve into an explicit `unit` / `integration` / `e2e` stack.
3. Runtime-emitted test coverage surfaces should describe the new stack honestly.
4. V16 spec and parity claims should be reused as V17 audit guides instead of being rewritten from memory.
5. Integration workflows should model closer-to-real ENGI operations, not only isolated endpoint behavior.
6. E2E coverage should grow from shell-ordering plus happy-path checks into production-like operator workflows.
7. Bugs and remaining V16 gaps should be admitted by failing tests first whenever practical.

## V17 initial subsystem/workflow inventory

The initial V17 audit should cover at least:

- prompting and inference
- need measurement
- recall and evaluation
- verification and use-tiering
- selection and materialization
- branch artifact emission
- authorization and sensitive-data flow
- disclosure and projection
- settlement and journal diff
- proof bundle and witness surfaces
- API persistence and reset behavior
- browser demo ordering and operator interaction

The initial integration workflow inventory should include at least:

- public default run from seeded state
- buyer-projection run
- repo-authenticated deposit followed by branch creation
- normalization-heavy settlement flow
- reset after workflow mutation
- failure-safe write behavior under multi-step state changes

The initial E2E workflow inventory should include at least:

- authenticated deposit to targeted settlement
- normalization-oriented scenario switching
- operator visibility of proof/artifact/settlement surfaces
- projection-sensitive visibility where surfaced in the UI

## V17 initial test-bearing source expectations

For `engi-demo`, V17 should converge on:
- package scripts that reflect the layered test stack directly,
- dedicated integration workflow test entrypoints,
- runtime test-coverage reporting that names the layered stack honestly,
- a growing distinction between endpoint validation tests and multi-step workflow tests,
- and an audit loop where V16 family/system parity claims can be checked through demonstrable workflows.

The current opening source state now includes:
- explicit `test:unit`, `test:integration`, and `test:e2e` scripts,
- runtime `testCoverageReport` taxonomy updated to `unit` / `integration` / `e2e`,
- a dedicated `engi-demo/test/workflow.integration.test.js` suite,
- and initial V16-guided workflow audits for:
  - full seeded scenario-matrix family/projection closure across both `patch` and `context`,
  - repo-authenticated deposit to targeted branch closure,
  - normalization workflow projection behavior,
  - privacy-boundary disclosure versus proof-replay visibility,
  - restrictive unsafe-patch verification/materialization exclusion closure,
  - reviewer versus internal projection differences,
  - API failure semantics for unsupported principals, branch modes, and scenarios,
  - browser-visible projection switching across operator principals,
  - browser-visible raw verification/materialization/proof inspection,
  - browser-visible deposit validation failures,
  - browser-visible reset after a realized run,
  - and deeper unit replay-catalog closure over proof families, witness paths, and emitted branch artifacts.

## V17 opening success condition

The opening V17 pass is in good shape when:

1. the root V17 draft states the demo-driven and test-layered posture explicitly,
2. the notes explain why V17 starts from demonstration instead of more proof-family invention,
3. the parity matrix names the current test/demo gaps concretely,
4. source begins to reflect an explicit unit/integration/e2e taxonomy,
5. at least one closer-to-real workflow integration surface exists beyond general endpoint checks,
6. and V16 proof closure remains the base system contract while V17 begins surfacing bugs through actual workflows.
