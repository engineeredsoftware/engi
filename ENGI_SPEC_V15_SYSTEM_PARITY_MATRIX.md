# ENGI Spec V15 System Parity Matrix

## Status

- Scope: root system-canonical parity and debt for the V15 draft set
- Draft target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md`
- Notes file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_NOTES.md`
- Information audit: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_INFORMATION_AUDIT.md`
- Demo companion: `/Users/garrettmaring/Developer/ENGI/engi-demo/ENGI_DEMO_SPEC_V15.md`
- Demo matrix: `/Users/garrettmaring/Developer/ENGI/engi-demo/ENGI_DEMO_SPEC_V15_IMPLEMENTATION_MATRIX.md`
- Canonical pointer remains: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V14`
- Current canonical/latest target remains: `V14`
- Last fully realized canon preserved: `V12`
- Structural standard preserved: `V13`

## Purpose

This file is the root parity/debt ledger for V15 system canon.

It is not the demo-local matrix.
Its job is to answer:
- whether V15 system canon is structurally complete,
- whether the repo currently supports that canon,
- where current support is only demo-local,
- and what still remains explicit source or architecture debt.

## Interpretation rule

The correct V15 reading is:
- `V14` remains the active canonical/latest target,
- `V15` is a drafted successor target,
- `engi-demo` remains the strongest current realization,
- but demo-local realization closure is not the same thing as full system-implementation closure.

That is why this root matrix exists separately from the demo matrix.

## Audit basis

This matrix is grounded in:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_TEMPLATEGUIDE.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V14.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V14_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/SPEC_V14_IMPLEMENTATION_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_INFORMATION_AUDIT.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/ENGI_DEMO_SPEC_V15.md`
- current repo realization in `engi-demo/src/engi-demo.js`, `engi-demo/public/app.js`, `engi-demo/server.js`, and `engi-demo/test/`

---

## Current parity / debt map

| Area | Current repo or doc truth | V15 system-spec expectation | Judgment |
|---|---|---|---|
| Pointer status honesty | `ENGI_SPEC.txt` still points to `V14` | V15 must not misstate active canonical status | closed |
| Root system file family | V15 root spec, notes, information audit, and this matrix now exist | system canon must live at repo root | closed |
| Demo family separation | V15 demo spec and demo matrix now exist under `engi-demo/` | demo canon must be separate from system canon | closed |
| Default parity-ledger location | V14 used a demo-local matrix as the main parity ledger | V15 must use a root system parity matrix for system closure | closed |
| System-vs-demo ownership rule | V15 now distinguishes system canon, demo canon, and parity/debt layers | structural separation must be explicit, not inferred | closed |
| Host capability system treatment | V15 keeps host/execution/container truth in system canon while demo host docs remain adjuncts | host truth must be system-canonical, not merely demo-noted | closed |
| Host capability non-demo implementation posture | current concrete host docs still live only under `engi-demo/` | future non-demo implementation families should not be forced into demo-local assumptions | spec closed; source gap |
| Inference appendix completeness | V14/V15 spec and current source expose prompt contracts, schemas, parse contracts, and moment families | inference and static-measurement appendix must remain fully explicit | closed |
| Parsed completion envelope artifact | current stand-in path still lacks a first-class parsed completion artifact instance | explicit artifact debt must remain visible | low-risk follow-up |
| Proof appendix completeness | V14/V15 spec and source cover proof families, witness structures, theorem expectations, and witness-manifest closure | proof obligations must remain fully explicit | closed |
| Zero-point / zero-credit accounting semantics | current source and V15 spec distinguish selected, participating, credited, and zero-credit assets | exact accounting closure must remain explicit and replayable | closed |
| System-to-realization parity appendix | V15 appendix now frames parity as system-to-realization instead of spec-to-demo only | parity language must match separated architecture | closed |
| Demo-local shell requirements | current shell ordering, explainers, browser flow, and persistence are now tracked in the demo family | system spec must not silently absorb demo-local shell details as universal | substantially advanced |
| Canonical system implementation home | no separate non-demo implementation family exists yet | V15 must avoid implying that `engi-demo` is the permanent canonical implementation home | spec closed; source gap |
| Matrix honesty | V15 now allows system closure and demo closure to diverge explicitly | false closure must be avoided | closed |

---

## Accepted boundaries at the system layer

The following remain accepted system boundaries rather than hidden failures:
- no non-demo canonical implementation family exists yet,
- current concrete realization is still demo-local,
- live GitHub, proof-publication, and settlement-network behavior remain external,
- current host capability adjunct docs remain V14-governed until V15 is adopted.

These are acceptable so long as:
- the system spec does not pretend the boundaries disappeared,
- the demo spec does not silently redefine them,
- and future implementation work has a place to land outside the demo family.

---

## Remaining system-level debt

1. A future non-demo implementation family has not yet been created, so the separation is currently documentary and architectural rather than source-factored into multiple implementations.
2. Host capability adjunct docs still live only in the demo family, which is honest for the current realization but not yet ideal for a broader system implementation family.
3. Stand-in prompt execution still lacks a first-class parsed completion artifact despite the stronger schema and parse-contract posture.

---

## V15 system completion condition for this pass

At the system layer, V15 is in a good state for this pass when:
1. the root system file family exists,
2. the demo file family exists separately,
3. the six focus areas are carried forward explicitly,
4. system closure and demo-local closure are no longer collapsed into one matrix,
5. the draft does not misstate pointer status,
6. remaining debt is explicit rather than hidden.

This condition is satisfied for the current drafting pass.
