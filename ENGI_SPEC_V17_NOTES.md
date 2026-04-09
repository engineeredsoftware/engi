# ENGI Spec V17 Notes

## Status

V17 is drafting only.
`/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` still points to `V16`.

The current correct reading is:
- `V16` remains the active canonical/latest target,
- `V16` remains the last fully realized canon preserved in source,
- and V17 is beginning as the next canon draft through demo-driven, test-layered validation of the full V16 system.

## Why V17 starts from demonstration

V16 was the proof-closure pass.
That was necessary because the system needed a materially honest proof-bearing layer before its appendix, witnesses, and theorem claims could be depended on.

V17 should not begin by expanding proof language again immediately.
It should begin by forcing the now-tightened V16 system through demonstrable workflows.

That change in posture matters because a system can be:
- well named,
- well specified,
- and even proof-bearing in isolation,

while still failing when:
- operators actually use it,
- state transitions accumulate,
- projections change,
- persistence semantics are stressed,
- or multiple subsystem families compose inside the same workflow.

## Why the test stack is the first V17 focus

The current test surface is useful but still transitional.

Right now the repo effectively has:
- `core` tests for subsystem and run-level invariants,
- `api` tests for HTTP route behavior and some stateful flows,
- `e2e` tests for browser-driven happy-path walkthroughs.

That is close to a layered test stack, but not yet explicit enough for V17.

V17 needs the stack to become canonical and intentional:
- unit for local subsystem contracts,
- integration for multi-step workflow composition,
- e2e for operator-facing production-like flows.

Once that stack is explicit, bugs and missing closure can be triaged more honestly.

## Why V16 spec and parity remain the first V17 review guide

V17 is not starting from an empty audit surface.

The V16 materials already contain:
- the clearest current statement of full-system proof-bearing intent,
- the most recent gap analysis across proof families and emitted surfaces,
- and the most precise recent reading of where source and claimed closure were still at risk of drift.

That means the V16 spec and V16 system parity matrix should double as the first V17 review guides.

Practically, V17 should use them to ask:
- what is still missing to demonstrate the full system,
- which claims are still under-exercised by realistic workflows,
- which proof/artifact/operator seams are still only lightly tested,
- and where a bug would currently hide because there is no integration or e2e ratchet on the seam.

## Current V17 observations after the opening pass

The current audit pass shows:

1. There is now strong subsystem coverage in `engi-demo/test/core.test.js`, and it is materially operating as the canonical unit layer.
2. `engi-demo/test/api.test.js` is better separated from workflow integration than it was at the opening pass, though it still carries some workflow-adjacent coverage.
3. `engi-demo/test/e2e.test.js` now covers a materially broader set of operator flows, including projection visibility, raw proof inspection, failure feedback, and reset behavior.
4. Runtime `testCoverageReport` now encodes the explicit V17 `unit` / `integration` / `e2e` stack honestly.
5. The demo already has realistic ingredients for integration and E2E testing:
   - authenticated repo artifact selection,
   - buyer/public projections,
   - normalization scenarios,
   - state persistence,
   - failure-safe writes,
   - reviewer/internal replay differences,
   - and bounded-public versus replay-capable proof visibility.
6. The V16 spec and parity matrix already identify strong candidate audit areas, and V17 is now materially converting those guided seams into executable ratchets rather than leaving them as review-only guidance.

This means V17 is no longer only “ready to start source-side.” It is already in the stage where the remaining work is to keep exhausting the inherited V16 audit surface through more scenario/principal/workflow depth.

## V17 drafting posture

The intended V17 development pattern is:

1. identify one demo/test-bearing reality gap,
2. write the V17 system parity row for it,
3. write or strengthen the test that should fail on it,
4. then change source/runtime artifacts so the system and the emitted test/demo story agree.

This is intentionally different from the V16 pattern.

V16 was:
- parity matrix first,
- then family spec tightening,
- then theorem/proof realization.

V17 starts from:
- demonstration gap,
- test taxonomy,
- V16-guided audit,
- workflow realism,
- and only then source hardening as surfaced by those tests.

## Initial V17 debts in view

The current opening debts are:

1. The V16 audit guide is now materially reused, but not yet exhausted scenario-family by scenario-family.
2. Integration workflows are first-class now, but `api.test.js` still carries some workflow-adjacent checks.
3. Runtime-emitted coverage metadata is now honest, but the demo/test stack still needs more family/member-specific demonstrations.
4. E2E flows are materially broader now, but they still do not cover every high-risk operator workflow or failure mode.
5. Projection differences are now exercised all the way into the browser shell, but not every proof/artifact surface has been demonstrated across every principal.
6. Demo-driven bug discovery is now strong enough to surface real seams, and the next V17 passes should keep pushing on those seams rather than reverting to abstract review.

## Immediate V17 target

The first clean V17 move is:
- formalize the layered test stack in spec/notes/parity docs,
- explicitly inherit V16 spec/parity as the first V17 audit guide,
- reflect that taxonomy in source-side test scripts and runtime coverage reporting,
- and add at least one explicit closer-to-real workflow integration path so the integration layer is not only a naming change.

## Current implemented V17 state

That opening move is now materially advanced in source.

The repo now has:
- explicit `test:unit`, `test:integration`, and `test:e2e` scripts,
- runtime coverage metadata updated to `unit` / `integration` / `e2e`,
- a dedicated `workflow.integration.test.js` suite,
- a demo shell aligned to canonical V16 rather than older V15-facing operator labeling,
- a browser-visible projection visibility summary and proof-family catalog,
- public suppression of hidden source-material path enumeration while still surfacing bounded counts,
- reviewer-visible replay/proof artifacts without raw source-material exposure,
- a full seeded scenario-corpus HTTP workflow audit across both `patch` and `context` branch modes,
- principal-bounded projection checks across `internal` / `reviewer` / `buyer` / `public` over that corpus,
- and a browser-visible internal-versus-reviewer source-material visibility seam,
- and corrected static/demo serving for favicon and SVG typing,
- and first V16-guided audit ratchets around:
  - full seeded scenario-matrix closure across both `patch` and `context` branch modes,
  - repo-authenticated workflow composition,
  - normalization/projection workflow composition,
  - privacy-boundary public disclosure boundedness,
  - reviewer-visible proof replay surfaces,
  - reviewer-visible proof-family and replay-artifact closure versus public boundedness,
  - restrictive unsafe-patch verification/materialization exclusion behavior,
  - browser-visible identity/auth plus proof/disclosure panels,
  - browser-visible projection visibility and proof-family catalog inspection,
  - browser-visible raw verification/materialization/proof inspection,
  - browser-visible projection switching across `buyer` / `reviewer` / `public` / `internal`,
  - reviewer versus internal projection differences,
  - API-side client-error handling for unsupported principals / branch modes / scenarios,
  - browser-visible invalid-deposit handling,
  - browser-visible reset-after-run behavior,
  - and unit replay-catalog closure across proof families, witness artifacts, and verifier-required artifact paths.

This is the right shape for the beginning of V17 because it is already doing what the version is supposed to do:
- use V16 as the audit inheritance guide,
- surface real workflow assumptions,
- and tighten the system by making those assumptions executable.

The current verification state is also materially stronger than the opening pass:
- `npm run typecheck` is green,
- `npm run test:unit` is green,
- `npm run test:integration` is green,
- `npm run test:e2e` is green,
- and `npm test` is green at `98/98`.

That does not mean V17 is finished. It means the version has moved from “opening posture established” to “advanced, demonstrable, and now ready to keep exhausting the remaining V16 audit surface through more workflow-driven ratchets.”
