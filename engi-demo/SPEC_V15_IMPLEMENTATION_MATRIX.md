# ENGI Demo Spec V15 Implementation Matrix

## Status

- Repo: `engi-demo`
- Demo spec target: `/Users/garrettmaring/Developer/ENGI/engi-demo/ENGI_DEMO_SPEC_V15.md`
- Demo matrix target: `/Users/garrettmaring/Developer/ENGI/engi-demo/SPEC_V15_IMPLEMENTATION_MATRIX.md`
- System-spec companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md`
- System parity companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_SYSTEM_PARITY_MATRIX.md`
- Canonical pointer remains: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V14`
- Current canonical/latest target remains: `V14`
- Last fully realized canon preserved in source: `V12`

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
| Demo host docs on V15 status | host docs remain V14-governed because V15 is still draft | acceptable as long as status is disclosed | accepted boundary |
| Browser e2e requirement | `test/e2e.test.js` verifies shell order and two end-to-end flows | demo ordering is canonical for this realization and must stay tested | closed |
| Demo-local artifact coverage | `.engi/*` artifact families are built and tested from `src/engi-demo.js` | demo spec must describe the artifact families it emits | closed |
| Demo-vs-system boundary honesty | demo spec points back to root system spec and avoids claiming whole-system ownership | demo docs must not masquerade as system canon | closed |
| Canonical-source refactor posture | root V15 files define the refactor focus as system-owned and additive rather than demo-redefining | demo matrix must track only the current realization consequences of that refactor | closed |
| Demo type and struct traceability | `src/realization-profile.js` and `src/settlement-structs.js` now isolate profile aliasing plus settlement/source-to-shares discriminants while `.engi/*` artifacts remain explicit | high-information demo structures must stay traceable even before deeper source factoring lands | substantially advanced |
| Current naming vs canonical naming | source now exposes `buildRealizationProfile(...)` while still preserving `buildDemonstrationProfile(...)` and `demonstrationProfile` as honest legacy demo labels | demo docs must preserve current names honestly while mapping them to broader canonical concepts | substantially advanced |
| Information-value organization | source-to-shares and settlement participation artifacts now carry explicit contribution, credit, and participation dispositions rather than only booleans | demo must not hide proof-bearing or settlement-bearing meaning behind explainer-only wording | substantially advanced |
| File/module organization | helper modules now include `realization-profile.js` and `settlement-structs.js` alongside `engi-core.js`, `receipt-schemas.js`, `benchmark-model.js`, `proof-log.js`, and `server-ranking.js`, but `src/engi-demo.js` remains the dominant orchestration module | module-boundary cleanup must remain explicit demo-local debt rather than hidden closure | substantially advanced |
| Docs/tests parity for refactor-sensitive surfaces | `README.md`, `test/core.test.js`, and `test/api.test.js` now assert profile alias/discriminant surfaces and exact settlement dispositions while browser e2e preserves the operator story | demo docs and tests should stay traceable to the same canonical surfaces during refactor work | substantially advanced |

---

## Remaining demo-local observations

1. Host capability adjunct docs still speak in V14 terms because the active pointer remains V14.
2. Some shell and explainer wording still preserves V12/V14 trace language because the realization remains anchored to those preserved section labels.
3. `engi-demo/src/engi-demo.js` is still the main orchestration reservoir even though helper modules now isolate profile and settlement structure concerns more clearly.
4. The legacy `ENGI_DEMO_SPEC_V15_IMPLEMENTATION_MATRIX.md` path remains only as a compatibility alias and should not accumulate independent content.
5. Docs/tests parity is currently stronger than full naming parity or full subsystem decomposition because the test suites ratify the canonical surfaces more directly than the current top-level file layout normalizes them.

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
8. profile aliasing and settlement discriminants stay ratified in tests rather than only implied in prose.

This condition is satisfied for the current drafting pass.


## Core V15 parity / debt families

| Area | Current source reality | V15 target | Gap judgment |
|---|---|---|---|
| System-vs-demo co-location | `src/engi-demo.js` still co-locates major system and demo concerns, though canonical modules are starting to be extracted under `src/canonical/` | cleaner system/demo separation in source and spec architecture | high |
| Canonical source shape | current source is rich but historically accreted; V15 canonical enum/type modules are now present as a first source-canon step | cleaner long-lived canonical structure | medium/high |
| Type-system provability | initial canonical enum and JSDoc type modules now exist, but rich typed separation is still far from complete | rich enums/discriminants/composition and stronger typed separation | high |
| Information-value organization | many values are explicit but not yet clearly layer-owned | clearer role- and layer-based ownership | medium/high |
| Module/file organization | initial `src/canonical/` module split has begun, but most logic still remains in `src/engi-demo.js` | cleaner modular boundaries after separation | medium/high |
| Naming finalization | improved, but likely not fully canonical yet | final canonical names aligned to V15 system model | medium |

## Additional V15 implementation strategy — staged refactor toward maximally typed source

V15 should treat canonical source hardening as a staged process:
1. structural/module/information-value refactor in the current implementation
2. then deeper TypeScript typing/provability hardening

### Additional parity / debt rows

| Area | Current expectation | V15 closure target | Gap judgment |
|---|---|---|---|
| JavaScript structural cleanup before TS hardening | likely still needed | cleaner pre-TypeScript system boundaries | medium |
| Strong enum/discriminant design | partial | rich closed-case typing where appropriate | medium |
| Domain type composition | partial | stronger composed system structs with explicit role separation | medium |
| Typed identifiers / roots / refs | mixed | role-specific typing to reduce invalid mixing | medium |
| System-layer vs demo-layer type separation | target emerging | explicit typed separation in source organization | medium/high |
| Proof/measurement/settlement type hardening | partial | maximally typed canonical subsystem structures | medium/high |
