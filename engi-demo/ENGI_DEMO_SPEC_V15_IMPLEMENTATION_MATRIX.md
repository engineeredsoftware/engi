# ENGI Demo Spec V15 Implementation Matrix

## Status

- Repo: `engi-demo`
- Demo spec target: `/Users/garrettmaring/Developer/ENGI/engi-demo/ENGI_DEMO_SPEC_V15.md`
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
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_SYSTEM_PARITY_MATRIX.md`
- `src/engi-demo.js`
- `server.js`
- `public/app.js`
- `public/index.html`
- `test/core.test.js`
- `test/api.test.js`
- `test/e2e.test.js`
- `HOST_CAPABILITIES.md`
- `HOST_CAPABILITIES.json`

---

## Current parity / debt map

| Area | Current source or doc truth | V15 demo-spec expectation | Judgment |
|---|---|---|---|
| Demo-spec file exists | `ENGI_DEMO_SPEC_V15.md` now exists | demo realization must be documented separately | closed |
| Demo-local matrix exists | this file now exists | demo parity must be tracked separately from system parity | closed |
| Operator shell ordering | `public/app.js`, `public/index.html`, and `test/e2e.test.js` preserve ordered panel flow | current demo shell ordering must stay explicit and tested | closed |
| Repo-authenticated deposit flow | UI and browser e2e cover deposit to settlement flow | demo must preserve end-to-end operator story | closed |
| Normalization-heavy flow | scenario switch and browser e2e surface source-to-shares behavior | demo must expose Profile B normalization behavior | closed |
| Explainers and visual/raw surfaces | `public/app.js` carries glossary/explainer surfaces tied to operator panels | explainers must summarize system truth without contradiction | substantially aligned |
| Demo-local persistence semantics | `server.js` uses atomic writes and tests cover persistence behavior | local deterministic state must fail safely | closed |
| Demo host/runtime docs | `HOST_CAPABILITIES.md` and `.json` exist and stay honest about local vs remote truth | demo host truth must remain explicit | closed |
| Demo host docs on V15 status | host docs remain V14-governed because V15 is still draft | acceptable as long as status is disclosed | accepted boundary |
| Browser e2e requirement | `test/e2e.test.js` verifies shell order and two end-to-end flows | demo ordering is canonical for this realization and must stay tested | closed |
| Demo-local artifact coverage | `.engi/*` artifact families are built and tested from `src/engi-demo.js` | demo spec must describe the artifact families it emits | closed |
| Demo-vs-system boundary honesty | demo spec now points back to root system spec and avoids claiming whole-system ownership | demo docs must not masquerade as system canon | closed |

---

## Remaining demo-local observations

1. Host capability adjunct docs still speak in V14 terms because the active pointer remains V14.
2. Current source still uses labels such as `demonstrationProfile` and `buildDemonstrationProfile(...)`; the demo spec keeps those names honest rather than forcing a premature source rename.
3. Some explainer and shell wording still preserve V12/V14 trace language because the realization remains anchored to that preserved section numbering.

---

## Demo completion condition for this pass

The V15 demo-realization layer is in good shape when:
1. demo-local operator ordering remains explicit,
2. end-to-end browser flow remains covered,
3. host/runtime truth stays honest,
4. persistence and failure semantics stay tested,
5. the demo spec stays subordinate to root system canon,
6. remaining demo debt is explicit.

This condition is satisfied for the current drafting pass.
