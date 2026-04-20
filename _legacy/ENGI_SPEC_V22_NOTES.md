# ENGI Spec V22 Notes

## Status

- Scope: non-canonical V22 working notes for post-V21 canonical development
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V21`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21_PROVEN.md`
- Current specifying standard: `/Users/garrettmaring/Developer/ENGI/ENGI_SPECIFYING.md`
- V22 state: first-gate drift-detection closure is implemented; these notes now track post-first-gate follow-on work only

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

The original V22 source drift has now been closed into first-gate implementation:
- `engi-demo/src/canon-posture.js` is the executable posture source,
- runtime state, public state, browser shell, README, and posture-sensitive tests derive from it,
- `scripts/check-engi-canon-posture-drift.mjs` executes runtime/API/browser/README drift detection,
- `.engi/v22-canon-posture-drift-report.json` is the version-local first-gate drift artifact,
- and `scripts/prepare-engi-runtime-canon-promotion.mjs` prepares runtime/demo posture for promoted active-canon truth.

This means the remaining V22 work is no longer “find and remove stale posture.”
It is now “keep drift detection foundational and decide what, if anything, follows it in a later version.”

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

Implemented requirement:
- runtime/demo canon posture should be coupled to the canonical pointer and promotion outputs strongly enough that future promotions do not leave the operator shell behind.

Implemented consequences:
- promotion now has a runtime-readable posture source plus a generated drift artifact,
- runtime posture is maintained through `engi-demo/src/canon-posture.js`,
- tests and drift checks fail when runtime/browser/API/README posture drifts from the intended canon pair,
- and promotion now has a dedicated runtime/demo preparation step instead of leaving that rewrite implicit.

### 4. Next proof/operator closures inherited from V20 accepted boundaries

V20 left three explicit accepted boundaries that remain realistic post-V22 candidates:
- `full-source-projection-security-matrix-deferred`
- `full-mutation-cross-product-deferred`
- `screenshot-stability-deferred`

These remain more implementation-derivable because V21 made the current system, generated artifacts, and validation surfaces more enumerable.
V22 first gate now explicitly defers all three so the canonical center stays drift-detection closure rather than scope creep.

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
- current-canon explainer footer chips are now sourced from current topical canon references rather than legacy V15 section anchors,
- and V22 now includes generated drift detection plus promotion-time runtime posture preparation.

This narrows the remaining V22 operator work:
- deeper explainer/reference precision if we want stronger topical grouping or stronger V22-specific pedagogical structure,
- and then the next accepted deferred proof/operator closure in a later version.

## Initial V22 Non-Goals

Based on the current audit, V22 should not begin by:
- reopening V21 specifying as the primary version center,
- inventing a brand-new proof family,
- redesigning ENGI's product identity,
- or replacing the current demo shell with a different UI architecture before canon-truth alignment is complete.
