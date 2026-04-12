# ENGI Spec V22 Notes

## Status

- Scope: non-canonical V22 working notes for post-V21 canonical development
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V21`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21_PROVEN.md`
- Current specifying standard: `/Users/garrettmaring/Developer/ENGI/ENGI_SPECIFYING.md`
- V22 state: initial non-canonical notes opened after V21 first-gate canonical promotion

## Non-Canonical Notes Rule

This file is intentionally non-canonical.

It may contain:
- draft V22 scope ideas,
- implementation sequencing notes,
- acceptance questions,
- audit findings,
- and candidate decisions.

It must not be treated as current ENGI canon.

Any note that survives as active system truth must be promoted into:
- `ENGI_SPEC_V22.md`,
- `ENGI_SPEC_V22_DELTA.md`,
- `ENGI_SPEC_V22_PARITY_MATRIX.md`,
- `ENGI_SPEC_V22_PROVEN.md`,
- or required generated `.engi/v22-*` artifacts.

## Starting Inheritance From V21

V21 closed the first specifying-canon gate.

The inherited baseline for V22 is:
- `ENGI_SPECIFYING.md` is the singular specifying authority,
- `SPEC` itself must be full-system, re-implementable, and auditable,
- generated `_PROVEN_` and generated `.engi/vN-*` artifacts are active canonical drafting inputs,
- and promotion must fail closed on stale hand-authored status truth, missing file-family members, or missing canonical generated inputs.

## Acceptance-Hardening Rule For V22

Future acceptance and gate hardening should continue using both:
- active `V21` canon as the promoted-current validation surface,
- and `V20_PROPER` as the historical full-canon reconstruction validation surface.

The purpose of keeping both surfaces active is:
- prove that new specifying requirements work against the current promoted canon,
- and prove that those requirements are not accidentally overfit only to the latest version's shape.

## Early V22 Working Center

Initial candidate directions for V22 include:
- extending specifying hardness beyond first-gate closure,
- deciding whether additional historical `*_PROPER` reconstructions are worth adding,
- deciding whether V21's accepted exactness carriers need even denser narrative theorem/member prose,
- and identifying any next-step ENGI runtime, proof, operator, or promotion work that now becomes implementation-derivable from V21 canon.

## Current Audit Findings

### Recent version introductions

The last six system specs now read as a coherent ladder into V22:
- V16 is still the densest proof-family derivation document and the strongest recent example of theorem/member/artifact/replay specificity.
- V17 introduced demo-driven system closure and the unit/integration/E2E test stack as part of canon.
- V18 introduced generated proof exhaustiveness through proof-member, theorem-evidence, and state-machine matrices.
- V19 introduced reproducible canon, deterministic replay, volatility inventories, negative mutation coverage, and generated contract ledgers.
- V20 introduced operator-quality canon through operator transcript, visual regression signatures, accessibility budgets, performance budgets, and projection-quality smoke reports.
- V21 introduced full-canon specifying and exact derivability carriers, which means V22 can now aim directly at ENGI system/runtime closure rather than at metaspec invention.

### Current source reality

The current runtime and operator shell still lag the active canonical truth:
- `engi-demo/src/engi-demo.js` still exports `SPEC_VERSION = 'ENGI Spec V19 active canon / V20 operator-quality draft'`.
- `engi-demo/src/engi-demo.js` still uses `DEFAULT_POLICY_REF = 'policy://engi/spec-v19-active-v20-draft/2026-04-09'`.
- `engi-demo/public/index.html` still titles the browser shell as `V19 canon / V20 quality draft`.
- `engi-demo/public/app.js` still presents the operator shell as `V19 active canon / V20 operator-quality draft`.
- `engi-demo/test/api.test.js`, `engi-demo/test/core.test.js`, and `engi-demo/test/e2e.test.js` still assert the stale V19/V20 posture.
- `engi-demo/README.md` is materially stale and still describes the demo as a V15-governed prototype.

This is not cosmetic only.
It means ENGI's running system, operator shell, public API posture, tests, and repo-facing demo docs no longer derive canon truth from one executable source.

### Current runtime/system strength

The current implementation is stronger than its version posture suggests:
- the core runtime already materializes the whole deposit -> need -> fit -> verification -> branch -> proof -> settlement -> projection chain,
- the demo shell already renders a large artifact-bearing system view rather than a minimal marketing shell,
- buyer/reviewer/public/internal projections are already modeled distinctly,
- proof-family and generated-artifact surfaces are already rich enough to support deeper operator and proof work,
- and the test stack already covers subsystem, integration, E2E, replay, matrix, mutation, quality, and specifying checks.

V22 therefore should not begin by inventing large new system areas.
It should first align the existing system to current canon truth and then deepen the next already-derived proof/operator/runtime closures.

## V22 Candidate System Center

The strongest V22 center from the current audit is:
- make canonical ENGI truth executable inside the runtime and demo shell,
- remove stale canon posture drift across API/browser/README/tests,
- expose current canon and generated-canon posture as a runtime-owned surface rather than scattered string literals,
- and then drive the next deferred proof/operator closures from that aligned system base.

That turns V22 into a system-facing version rather than another metaspec pass.

## Implementation-Derivable V22 Workstreams

### 1. Executable canon posture in runtime and shell

Candidate requirement:
- one source-bearing runtime posture object should define active canonical version, inherited closure families, current proof appendix family, current generated artifact families, and current policy/version labels.

Likely consequences:
- `SPEC_VERSION` stops being a stale handwritten string,
- browser title and hero copy stop being hardcoded historical posture,
- API `specVersion` and operator status messages derive from the same canon posture source,
- tests assert against runtime-owned canon posture rather than frozen historical strings,
- and README/demo docs can be refreshed against the same explicit posture.

### 2. Demo/operator shell truth realignment

Candidate requirement:
- the operator shell should present current ENGI canon truth, current generated-canon families, and current inherited closure truth without speaking in obsolete V15/V19/V20 draft posture.

Likely consequences:
- version/canon copy changes in `public/index.html` and `public/app.js`,
- status strings and hero narrative are refreshed,
- README and demo-local docs are rewritten to current system truth,
- and operator-facing explainers stop coupling the shell narrative to historical draft-version labels.

### 3. Promotion/runtime coupling hardening

Candidate requirement:
- runtime/demo canon posture should be coupled to the canonical pointer and promotion outputs strongly enough that future promotions do not leave the operator shell behind.

Likely consequences:
- promotion may need to emit or update a runtime-readable canon posture artifact,
- or runtime posture should be derived directly from the canonical pointer plus a maintained local posture module,
- and tests should fail if runtime/browser/API posture drifts from the promoted canon.

### 4. Next proof/operator closures inherited from V20 accepted boundaries

V20 left three explicit accepted boundaries that now become realistic V22 candidates:
- `full-source-projection-security-matrix-deferred`
- `full-mutation-cross-product-deferred`
- `screenshot-stability-deferred`

These are now more implementation-derivable because V21 made the current system, generated artifacts, and validation surfaces more enumerable.

### 5. Operator/system derivability refinement

The current demo shell already exposes many proof and artifact surfaces, but V22 can likely improve:
- how current canon posture is surfaced,
- how proof family closure is summarized by stage,
- how replay/witness obligations are explained in the operator flow,
- and how the current artifact families are grouped by system consequence rather than by historical implementation order.

## Implemented First Pass

The first runtime/demo truth-alignment pass is now landed:
- `engi-demo/src/canon-posture.js` is the executable posture source,
- runtime state, public state, browser title/hero copy, README, and posture-sensitive tests now derive from it,
- visible explainer prose no longer teaches stale V15/V19/V20 posture,
- and current-canon explainer footer chips are now sourced from current topical canon references rather than legacy V15 section anchors.

This narrows the remaining V22 operator work:
- deeper explainer/reference precision if we want stronger topical grouping or stronger V22-specific pedagogical structure,
- any additional promotion/runtime coupling beyond pointer-backed posture tests,
- and then the next accepted deferred proof/operator closure from V20.

## Initial V22 Non-Goals

Based on the current audit, V22 should not begin by:
- reopening V21 specifying as the primary version center,
- inventing a brand-new proof family,
- redesigning ENGI's product identity,
- or replacing the current demo shell with a different UI architecture before canon-truth alignment is complete.
