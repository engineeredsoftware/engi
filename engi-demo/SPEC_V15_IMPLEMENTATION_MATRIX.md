# ENGI Demo Spec V15 Implementation Matrix

## Status

- Repo: `engi-demo`
- Demo spec target: `/Users/garrettmaring/Developer/ENGI/engi-demo/ENGI_DEMO_SPEC_V15.md`
- Demo matrix target: `/Users/garrettmaring/Developer/ENGI/engi-demo/SPEC_V15_IMPLEMENTATION_MATRIX.md`
- System-spec companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md`
- System parity companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_SYSTEM_PARITY_MATRIX.md`
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V15`
- Current canonical/latest target: `V15`
- Last fully realized canon preserved in source: `V15`

## Purpose

This file records demo-local realization parity for `engi-demo/`.

It is not the root system parity ledger.
Its job is to judge:
- operator-shell ordering,
- explainers and demo-local UI parity,
- local persistence and failure semantics,
- demo host/runtime adjunct docs,
- and current demo-local validation evidence.

## Interpretation rule

The correct reading is:
- system canon lives in the root V15 system-spec family,
- demo realization truth lives here under `engi-demo/`,
- a demo-local `closed` judgment does not automatically mean whole-system closure.

## Audit basis

This matrix is grounded in:
- `/Users/garrettmaring/Developer/ENGI/engi-demo/ENGI_DEMO_SPEC_V15.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_INFORMATION_AUDIT.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_SYSTEM_PARITY_MATRIX.md`
- `src/engi-demo.js`
- `src/canonical/enums.js`
- `src/canonical/types.js`
- `src/canonical/surfaces.js`
- `src/canonical/run-artifacts.js`
- `src/realization-profile.js`
- `src/settlement-structs.js`
- `server.js`
- `public/app.js`
- `public/index.html`
- `README.md`
- `test/core.test.js`
- `test/api.test.js`
- `test/e2e.test.js`
- `HOST_CAPABILITIES.md`
- `HOST_CAPABILITIES.json`

---

## Current parity / debt map

| Area | Current source or doc truth | V15 demo-spec expectation | Judgment |
|---|---|---|---|
| Demo-spec file exists | `ENGI_DEMO_SPEC_V15.md` exists and stays explicitly subordinate to root system canon | demo realization must be documented separately | closed |
| Demo-local matrix exists | this file now holds the canonical V15 demo matrix content | demo parity must be tracked separately from system parity | closed |
| Demo-matrix canonical path | `SPEC_V15_IMPLEMENTATION_MATRIX.md` now exists as the primary V15 demo matrix path; the longer demo-prefixed filename is retained only as a compatibility alias | one primary V15 demo matrix path must exist so the demo ledger does not fork under two names | closed |
| Operator shell ordering | `public/app.js`, `public/index.html`, and `test/e2e.test.js` preserve ordered panel flow | current demo shell ordering must stay explicit and tested | closed |
| Repo-authenticated deposit flow | UI and browser e2e cover deposit to settlement flow | demo must preserve end-to-end operator story | closed |
| Normalization-heavy flow | scenario switch and browser e2e surface source-to-shares behavior | demo must expose Profile B normalization behavior | closed |
| Explainers and visual/raw surfaces | `public/app.js` carries glossary/explainer surfaces tied to operator panels | explainers must summarize system truth without contradiction | substantially aligned |
| Demo-local persistence semantics | `server.js` uses atomic writes and tests cover persistence behavior | local deterministic state must fail safely | closed |
| Demo host/runtime docs | `HOST_CAPABILITIES.md` and `.json` exist and stay honest about local vs remote truth | demo host truth must remain explicit | closed |
| Demo host docs on V15 status | host docs now align on active V15 status | demo host truth must match the active pointer | closed |
| Browser e2e requirement | `test/e2e.test.js` verifies shell order and two end-to-end flows | demo ordering is canonical for this realization and must stay tested | closed |
| Demo-local artifact coverage | `.engi/*` artifact families are built and tested from `src/engi-demo.js` | demo spec must describe the artifact families it emits | closed |
| Demo-vs-system boundary honesty | demo spec points back to root system spec and avoids claiming whole-system ownership | demo docs must not masquerade as system canon | closed |
| Canonical-source refactor posture | root V15 files define the refactor focus as system-owned and additive rather than demo-redefining | demo matrix must track only the current realization consequences of that refactor | closed |
| Extracted canonical module layer | `src/canonical/enums.js`, `types.js`, `surfaces.js`, `run-artifacts.js`, `projections.js`, and `proof-materialization.js` now exist and are imported by `src/engi-demo.js` | demo docs must reflect the landed split exactly rather than describing it only as future refactor intent | closed |
| Operating-surface builder extraction | `src/canonical/surfaces.js` now owns repo-supply, depositing, needing, fit, repo-to-settlement, identity/auth, boundary-reality, and GitHub-boundary builders | demo matrix should treat operating-surface extraction as landed progress, not vague aspiration | substantially advanced |
| Run-artifact/report builder extraction | `src/canonical/run-artifacts.js` now owns pipeline telemetry, prompt implementation surface, system proof bundle, artifact upload manifest, deliverables manifest, scenario fixture manifest, and test coverage report builders | demo matrix should treat report-layer factoring as landed progress | substantially advanced |
| Demo type and struct traceability | `src/realization-profile.js` and `src/settlement-structs.js` now isolate realization-profile plus settlement/source-to-shares discriminants while `.engi/*` artifacts remain explicit | high-information demo structures must stay traceable even before deeper source factoring lands | substantially advanced |
| Current naming vs canonical naming | source now uses `buildRealizationProfile(...)` and `realizationProfile` directly, with the older demo-profile alias removed from active source | demo docs must describe the landed naming truth rather than a transition state that no longer exists | closed |
| Information-value organization | source-to-shares and settlement participation artifacts now carry explicit contribution, credit, and participation dispositions rather than only booleans | demo must not hide proof-bearing or settlement-bearing meaning behind explainer-only wording | substantially advanced |
| File/module organization | helper modules now include `src/canonical/surfaces.js`, `run-artifacts.js`, `projections.js`, and `proof-materialization.js` plus `src/demo-shell-state.js`, while `src/engi-demo.js` remains the dominant orchestration module | module-boundary cleanup must remain explicit demo-local debt rather than hidden closure | substantially advanced |
| Next extraction seams | `src/engi-demo.js` still owns need measurement/inference plus evaluation/materialization orchestration, while projection/disclosure and public-state shaping have already been extracted | demo matrix must name the remaining seams clearly so the migration plan stays falsifiable | explicit debt |
| Docs/tests parity for refactor-sensitive surfaces | `README.md`, `test/core.test.js`, and `test/api.test.js` now assert realization-profile/discriminant surfaces and exact settlement dispositions while browser e2e preserves the operator story | demo docs and tests should stay traceable to the same canonical surfaces during refactor work | closed for current JS refactor pass |

---

## Remaining demo-local observations

1. Host capability adjunct docs now speak in V15 terms and match the active pointer.
2. Shell and explainer wording now speaks in V15 terms, but historical comparison material still references predecessor versions where it materially clarifies the design delta.
3. `engi-demo/src/engi-demo.js` is still the main orchestration reservoir even though `src/canonical/surfaces.js`, `src/canonical/run-artifacts.js`, `src/canonical/projections.js`, `src/canonical/proof-materialization.js`, and `src/demo-shell-state.js` now isolate major builder families.
4. The next extraction seams are now concrete rather than fuzzy: need measurement/inference plus evaluation/materialization orchestration still remain in `src/engi-demo.js`.
5. `server.js` and `public/app.js` still hold the persistence/input and operator-shell boundaries, so docs/tests parity has to keep those boundaries tied back to the extracted canonical modules.
6. The legacy `ENGI_DEMO_SPEC_V15_IMPLEMENTATION_MATRIX.md` path remains only as a compatibility alias and should not accumulate independent content.
7. Docs/tests parity is now stronger and naming parity is materially closed for the V15 JavaScript refactor pass, but deeper subsystem decomposition still remains.

---

## Demo completion condition for this pass

The V15 demo-realization layer is in good shape when:
1. demo-local operator ordering remains explicit,
2. end-to-end browser flow remains covered,
3. host/runtime truth stays honest,
4. persistence and failure semantics stay tested,
5. the demo spec stays subordinate to root system canon,
6. remaining demo debt is explicit,
7. naming, module, and docs/tests refactor deltas stay visible instead of being hand-waved as already solved,
8. realization-profile and settlement discriminants stay ratified in tests rather than only implied in prose.

This condition is satisfied for the current drafting pass.


## Core V15 parity / debt families

| Area | Current source reality | V15 target | Gap judgment |
|---|---|---|---|
| System-vs-demo co-location | `src/engi-demo.js` still co-locates major system orchestration concerns, but canonical `src/canonical/` modules plus `src/demo-shell-state.js` now own enum/type vocabulary, operating surfaces, run-level artifact builders, projection/disclosure helpers, proof/materialization helpers, and demo-shell/public-state shaping | cleaner system/demo separation in source and spec architecture | medium |
| Canonical source shape | current source is rich but historically accreted; V15 canonical enum/type modules plus extracted `surfaces.js`, `run-artifacts.js`, `projections.js`, `proof-materialization.js`, and `demo-shell-state.js` now give the source a clearer canonical spine | cleaner long-lived canonical structure | medium |
| Type-system provability | canonical enum and JSDoc type modules now exist and some builders are grouped around them, but rich typed separation is still far from complete | rich enums/discriminants/composition and stronger typed separation | high |
| Information-value organization | many high-information operating and proof/report surfaces now have clearer owners, but broader layer ownership is still incomplete | clearer role- and layer-based ownership | medium |
| Module/file organization | `src/canonical/surfaces.js`, `run-artifacts.js`, `projections.js`, `proof-materialization.js`, and `src/demo-shell-state.js` now hold meaningful builder families, but most orchestration logic still remains in `src/engi-demo.js` and the server/UI boundary files | cleaner modular boundaries after separation | medium |
| Naming finalization | active profile/public naming now aligns to the V15 system model | final canonical names aligned to V15 system model | closed for current JS refactor pass |
| Active seam inventory | the remaining refactor seams are now identifiable by family instead of being a generic "split the monolith" goal | migration plan should stay concrete and falsifiable | substantially advanced |

## Additional V15 implementation strategy — staged refactor toward maximally typed source

V15 should treat canonical source hardening as a staged process:
1. structural/module/information-value refactor in the current implementation
2. then deeper TypeScript typing/provability hardening

### Additional parity / debt rows

| Area | Current expectation | V15 closure target | Gap judgment |
|---|---|---|---|
| JavaScript structural cleanup before TS hardening | landing pass complete: canonical builder families and demo-shell/public-state shaping now live outside `src/engi-demo.js` | cleaner pre-TypeScript system boundaries | closed for current V15 JS pass |
| Strong enum/discriminant design | partial | rich closed-case typing where appropriate | medium |
| Domain type composition | partial | stronger composed system structs with explicit role separation | medium |
| Typed identifiers / roots / refs | mixed | role-specific typing to reduce invalid mixing | medium |
| System-layer vs demo-layer type separation | target emerging | explicit typed separation in source organization | medium/high |
| Proof/measurement/settlement type hardening | partial | maximally typed canonical subsystem structures | medium/high |
| Need measurement / inference seam | `measureNeedFromScenario(...)`, `buildPromptSurface(...)`, `buildRecallChannelContracts(...)`, `buildEvalManifest(...)`, `measurementTrace(...)`, and `inferenceProof(...)` remain in `src/engi-demo.js` | isolate measurement/inference into a dedicated canonical family once the current split stabilizes | medium/high |
| Evaluation / materialization seam | `evaluateCandidates(...)`, `assembleAssetPack(...)`, `buildMatchReport(...)`, `buildVerificationReport(...)`, `buildBranchArtifacts(...)`, and `assertRequiredBranchArtifacts(...)` remain in `src/engi-demo.js` | isolate ranking/verification/materialization without breaking current demo flow | medium/high |
| Proof / settlement emission seam | `buildSourceToSharesArtifact(...)`, `buildSettlementParticipationArtifact(...)`, and `buildSettlementProof(...)` remain in `src/engi-demo.js`, while proof-witness/accounting/materialization builders now live in `src/canonical/proof-materialization.js` | separate the remaining proof/settlement emitters from orchestration after the bundle/report layer | medium |
| Projection / disclosure seam | `buildProjectionPolicy(...)`, `buildBoundedPublicProofArtifact(...)`, `buildRedactionProof(...)`, and `buildDisclosureProof(...)` now live in `src/canonical/projections.js` | isolate projection/disclosure policy builders from the monolith without claiming that split already landed | closed |
