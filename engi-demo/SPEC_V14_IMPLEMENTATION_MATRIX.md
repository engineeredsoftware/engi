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

No source-code changes were required for this correction path.

---

## Current parity / debt map

| Area | Current source or doc truth | V14 / template-guide expectation | Judgment |
|---|---|---|---|
| Canonical drafting guide | present | standalone guide for future enriched specs | closed |
| V14 file-family alignment | spec, notes, and matrix aligned | coordinated file family | closed |
| Executive-summary split | present in V14 spec | version summary separated from canonical ENGI summary | closed |
| Pointer vs realized-canon nuance | spec, notes, and matrix now agree on `V14` / `V12` split | must remain explicit | closed |
| Whole-ENGI design coverage | present in V14 spec | full operator chain plus appendices | closed |
| Host capability canonical treatment | strengthened in V14 spec; repo host docs exist | role, categories, bootstrap, container, telemetry, execution truth explicit | spec closed; adjunct docs lag |
| Inference appendix completeness | strengthened in Appendix B | moments, prompt templates/contracts, context injectables, outputs, parse contracts explicit | closed |
| Proof appendix completeness | strengthened in Appendix C | families, obligations, witnesses, theorem catalog, witness closure explicit | closed |
| Test coverage appendix | explicit | unit/API/browser plus operator-experience parity surfaces | closed |
| Spec-to-source parity appendix | explicit | builder maps, UI parity, accepted boundaries | closed |
| Operator-experience parity surfaces | explicit in spec appendices; `public/app.js` remains V14-linked | explainers/tooltips/visual-raw surfaces treated as canonical where material | closed |
| Branch artifact completeness | present in source | emitted artifacts enumerated and required | closed |
| Deliverables manifest completeness | present in source | manifest should not omit emitted artifacts | closed |
| Test coverage artifact richness | present in source | explicit unit/API/browser e2e expectation | closed |
| Browser e2e validation | present and required | canonical conformance evidence | closed |
| Host capability adjunct docs | present but still V9-labeled | human-readable and structured host docs should eventually reflect V14 latest-target / V12 last-realized nuance | low-risk follow-up |
| README version-status wording | current README still says pointer `V11` | repo docs should reflect current V14 / V12 split | low-risk follow-up |
| Parsed completion envelope artifact for stand-in prompts | still modeled rather than first-class emitted artifact | acceptable if disclosed explicitly | low-risk follow-up |
| Live GitHub, proof publication, and settlement effects | intentionally external | explicit external boundary, not local parity failure | accepted boundary |

---

## Remaining low-risk observations

1. `HOST_CAPABILITIES.md` and `HOST_CAPABILITIES.json` still preserve useful execution truth, but they are labeled as V9-era adjunct docs rather than V14/latest-target documents.
2. `README.md` still states the old pointer value and should be aligned in a later small doc cleanup.
3. Source references remain builder-level rather than line-level; that is intentional and sufficient for the current canonical pass.
4. The deterministic stand-in prompt path still models parse-contract discipline without emitting a first-class parsed completion envelope artifact; V14 now states that distinction explicitly instead of hiding it.

---

## V14 completion condition for this pass

V14 is in a good state for this correction path when:
1. the standalone template guide exists,
2. the V14 spec, notes, and implementation matrix agree on version-status interpretation,
3. host, inference, proof, and parity surfaces are canonically specified rather than merely mentioned,
4. earlier real source parity closures remain preserved,
5. remaining doc lag is explicit and low-risk rather than hidden.

This condition is satisfied for the current pass.
