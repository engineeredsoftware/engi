# Spec V14 Implementation Matrix

## Status
- Repo: `engi-demo`
- Template guide: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_TEMPLATEGUIDE.md`
- Spec draft target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V14.md`
- Notes file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V14_NOTES.md`
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V14`
- Current canonical/latest target: `V14`
- Last fully realized canon preserved: `V12`
- Structural standard preserved: `V13`
- Current correction emphasis: tighten spec/template/matrix quality without reopening the design center

## Purpose

This file records current implementation parity relative to the V14 canonical spec after the template-guided tightening pass.

It is not a speculative roadmap.
It is the current ledger of:
- what V14 and the template guide require,
- what the repo already satisfies,
- what this correction path strengthened in docs/spec structure,
- and what remains explicit low-risk doc lag or accepted external boundary rather than a hidden defect.

## Audit basis

This matrix is grounded in:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_TEMPLATEGUIDE.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V14.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V14_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V13.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V13_INFORMATION_AUDIT.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V12.md`
- `HOST_CAPABILITIES.md`
- `HOST_CAPABILITIES.json`
- current `engi-demo` implementation in:
  - `src/engi-demo.js`
  - `server.js`
  - `public/app.js`
  - `test/core.test.js`
  - `test/api.test.js`
  - `test/e2e.test.js`

---

## Current interpretation

The correct reading for this repo is:
- `ENGI_SPEC.txt = V14` means V14 is the current canonical/latest target,
- V12 remains the last fully realized canon and the semantic implementation anchor for the current deterministic demo,
- V13 remains the structural drafting source that the template guide now formalizes for future versions,
- this correction path tightens canonical docs and parity framing rather than redesigning ENGI or forcing source churn.

That means the right outcome for this pass is:
- stronger canonical drafting infrastructure,
- stronger V14 completeness in host, inference, proof, and parity material,
- honest disclosure of any still-lagging adjunct docs.

---

## Earlier V14 parity changes already preserved

The repo already preserves several earlier V14-oriented parity tightenings in source:
1. Branch artifact completeness was tightened:
   - `buildDeliverablesManifest(...)` enumerates additional emitted `.engi/*` artifacts
   - `assertRequiredBranchArtifacts(...)` checks the expanded artifact contract
2. Canonical test coverage reporting was tightened:
   - `buildTestCoverageReport(...)` explicitly records unit, API, and browser e2e suite coverage
   - browser e2e coverage is marked as required for V14
3. Demo traceability already preserved V14-facing surfaces where source changed:
   - explainer spec references in `public/app.js` point to V14 sections

Those earlier source changes remain part of the parity baseline for the current correction path.

## Template-guide tightening landed in this pass

This pass added or strengthened:
1. The standalone canonical drafting guide:
   - `ENGI_SPEC_TEMPLATEGUIDE.md`
2. Explicit V14 alignment to that guide:
   - version summary vs canonical ENGI summary split
   - whole-ENGI coverage expectations
   - disciplined section-schema and appendix expectations
3. Explicit version-status nuance across the V14 file family:
   - `ENGI_SPEC.txt = V14` as the current canonical/latest target
   - `V12` as the last fully realized canon
4. Stronger host capability treatment in the V14 spec:
   - host capability role
   - machine-local/static-analysis/proof-program/remote-program categories
   - bootstrap/furnishing/configuration expectations
   - containerization expectations
   - telemetry/safety expectations
   - relation to measurement and execution truth
5. Stronger inference appendix completeness:
   - inference moment contracts
   - prompt template and prompt contract expectations
   - context injectables and rendered/non-rendered context rules
   - output ownership and parsable completion contracts
6. Stronger proof appendix completeness:
   - proof-family definitions
   - subsystem obligation coverage
   - witness structures
   - theorem catalog material
   - witness-manifest closure expectations
7. Stronger operator-experience parity treatment:
   - explainer/tooltip/visual-vs-raw parity called out in test coverage and parity appendices
8. Stronger exact-accounting treatment:
   - selected vs settlement-participating vs positively credited vs zero-credit semantics
   - source-to-shares, clipping, normalization, and journal invariants

This pass also required targeted source-parity changes in `engi-demo/src/engi-demo.js`:
1. Prompt contracts and prompt surfaces now carry exact output schema and parse-contract metadata instead of only loose `string-or-array` typing.
2. The proof witness manifest now represents `inference-synthesis` as a first-class family and digests more of the proof-bearing artifact surface directly.

---

## Current parity / debt map

| Area | Current source or doc truth | V14 / template-guide expectation | Judgment |
|---|---|---|---|
| Canonical drafting guide | present | standalone guide for future enriched specs | closed |
| V14 file-family alignment | spec, notes, and matrix aligned | coordinated file family | closed |
| Executive-summary split | present in V14 spec | version summary separated from canonical ENGI summary | closed |
| Pointer vs realized-canon nuance | spec, notes, and matrix now agree on `V14` / `V12` split | must remain explicit | closed |
| Whole-ENGI design coverage | present in V14 spec | full operator chain plus appendices | closed |
| Host capability canonical treatment | strengthened in V14 spec; repo host docs exist and already preserve `V14` / `V12` nuance | role, categories, bootstrap, container, telemetry, execution truth explicit | closed |
| Host capability adjunct docs | present and canon-aligned on version nuance; still preserve some current-source `v9` stage-id phrasing | adjunct docs should preserve execution truth without pretending stage ids changed | substantially aligned |
| Evaluator family ids vs deterministic stage ids | V14 Appendix B now records both layers explicitly | family ids and concrete receipt-producing stage ids must remain distinguishable | closed |
| Inference appendix completeness | Appendix B now matches source-grounded moments, exact prompt output schemas, and parse-contract metadata | moments, prompt templates/contracts, context injectables, outputs, parse contracts explicit | closed |
| First-class parsed completion envelope artifact | still not emitted as a standalone branch artifact | acceptable only if explicit and not confused with static evidence | low-risk follow-up |
| Proof appendix completeness | Appendix C now matches source-grounded proof families, obligations, witness structures, and aggregate-witness handling | families, obligations, witnesses, theorem catalog, witness closure explicit | closed |
| Proof witness manifest family coverage | source now includes `inference-synthesis` and digests major proof-bearing artifacts directly | witness-manifest family coverage must not omit core proof families | closed |
| Zero-credit / exact-accounting settlement semantics | spec and source now agree on source-to-shares, participation, positive credit, zero-credit participation, and journal invariants | exact accounting and zero-point semantics must be explicit | closed |
| Test coverage appendix | explicit | unit/API/browser plus operator-experience parity surfaces | closed |
| Spec-to-source parity appendix | explicit | builder maps, UI parity, accepted boundaries | closed |
| Operator-experience parity surfaces | explicit in spec appendices; `public/app.js` remains V14-linked | explainers/tooltips/visual-raw surfaces treated as canonical where material | closed |
| Branch artifact completeness | present in source | emitted artifacts enumerated and required | closed |
| Deliverables manifest completeness | present in source | manifest should not omit emitted artifacts | closed |
| Test coverage artifact richness | present in source | explicit unit/API/browser e2e expectation | closed |
| Browser e2e validation | present and required | canonical conformance evidence | closed |
| Live GitHub, proof publication, and settlement effects | intentionally external | explicit external boundary, not local parity failure | accepted boundary |

---

## Remaining low-risk observations

1. The deterministic stand-in prompt path now carries exact parse-contract metadata, but it still does not emit a first-class parsed completion envelope artifact.
2. `HOST_CAPABILITIES.md` and `HOST_CAPABILITIES.json` are already canon-aligned on V14/V12 status, but they still preserve some current-source `v9` stage-id wording.
3. Source references remain builder-level rather than line-level; that is intentional and sufficient for the current canonical pass.

---

## V14 completion condition for this pass

V14 is in a good state for this correction path when:
1. the standalone template guide exists,
2. the V14 spec, notes, and implementation matrix agree on version-status interpretation,
3. host, inference, proof, and parity surfaces are canonically specified rather than merely mentioned,
4. exact-accounting and zero-credit settlement semantics are source-grounded and explicit,
5. earlier real source parity closures remain preserved,
6. remaining follow-up is low-risk and explicit rather than hidden.

This condition is satisfied for the current pass.
