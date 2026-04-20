# Spec V13 Implementation Matrix

## Status
- Repo: `protocol-demonstration`
- Spec draft target: `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V13.md`
- Historical root pointer at authoring time remained on: `V11`
- Baseline preserved: V12 is the current target canonical design baseline
- V13 is primarily a **full canonical spec-structure and formality pass**, not primarily an implementation-expansion pass

## Purpose

This file records where the fully enriched V13 spec may still exceed the current implementation/formalization state.

Ideally, this matrix should stay small.
If it is large, that signals either:
- design information loss that still needs to be recovered into source/parity artifacts,
- or a spec that is outrunning current implementation truth.

## Audit basis

This matrix is grounded in:
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V13_INFORMATION_AUDIT.md`
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V13.md`
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V12.md`
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V12_NOTES.md`
- current `protocol-demonstration` implementation in `src/bitcode-demo.js`

---

## Current expectation

The default expectation for V13 is:
- **spec richness should increase dramatically**
- **spec-structure requirements should be finalized explicitly**
- **implementation change should be minimal unless the richer spec reveals real parity loss or missing canonicalization**

So this matrix is intentionally framed as a **parity/debt matrix**, not as a broad implementation roadmap.

---

## V13 parity / debt map

| Area | Current source state | V13 expectation | Current gap judgment |
|---|---|---|---|
| Canonical file-set structure | partially implicit across recent versions | explicit `_VN_` file-family standard | low/medium |
| Canonical section schema | partly implicit in recent specs | explicit section/subsection pattern standard | medium |
| Dense type/schema appendix | partial in source, not canonical in spec | full appendix required | medium |
| Evaluator/inference appendix | partially explicit in source, historically richer in V6 | fully restored appendix with special handling rules | medium/high |
| Proof obligations appendix | source has strong witnesses, spec can go much denser | full appendix required with special handling rules | medium |
| Code/source reference conventions | ad hoc today | explicit canonical reference pattern | medium |
| Test coverage appendix | implicit in source/tests, not yet canonicalized fully | dedicated appendix required | medium |
| Spec-to-source parity appendix | not yet canonicalized | dedicated appendix required | medium |
| Tooltip/explainer parity specification | emerging in source/UI | should be formalized canonically | medium |
| Scenario/example appendix | partial via tests/state | should be made richer in spec | medium |

---

## Recommended interpretation

If V13 drafting is done well, the likely main work is:
1. writing and organizing dense canonical spec material,
2. aligning appendices to current source truth,
3. only then deciding whether any implementation parity repairs are needed.

So for now this matrix should be read as:
- a checklist of places where full V13 enrichment may still outrun the current formalized implementation description,
- not yet a sign that the system itself requires large redesign.

---

## Initial V13 completion condition

V13 reaches a good initial state when:
1. the information audit is complete,
2. the V13 spec structure is locked,
3. appendix expectations are explicit,
4. the parity/debt matrix is explicit,
5. and only a small set of true implementation/formalization gaps remain.
