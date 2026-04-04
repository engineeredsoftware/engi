# ENGI Spec V15 Information Audit

Status: draft audit for the V15 successor-target pass
Purpose: record what V15 changes relative to V14, with emphasis on closure-family carry-forward and system-vs-demo separation
Baseline references:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_TEMPLATEGUIDE.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V14.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V14_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/SPEC_V14_IMPLEMENTATION_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_SYSTEM_PARITY_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/ENGI_DEMO_SPEC_V15.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/ENGI_DEMO_SPEC_V15_IMPLEMENTATION_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/engi-demo.js`

---

# 1. Executive summary

V15 is not a density-recovery pass in the same sense V13 and V14 were.
V14 already recovered most of the major density families.

V15 is instead a structural-correction pass.
Its main job is to stop system canon, demo canon, and parity tracking from remaining collapsed into one file family.

The core audit result is:

> V14 largely solved the "what is missing from the canon?" problem. V15 is solving the "which layer owns which truth?" problem.

That means V15 should be read as:
- carrying forward the major host / inference / proof / settlement review families,
- preserving later ENGI design meaning,
- and reorganizing the file family so future canonical implementation work is not forced to pretend `engi-demo/` is the permanent home of system realization.

---

# 2. Audit question

The V15 audit asks six questions:

1. Did V14 already make host capability and execution-truth coverage canonically serious?
2. Did V14 already make the inference and static-measurement appendix canonically serious?
3. Did V14 already make the proof appendix canonically serious?
4. Did V14 already make source-to-shares and exact settlement accounting canonically serious?
5. Was the template/matrix posture honest enough?
6. What structural ambiguity remained after all of that?

The first five questions mostly resolve to "substantially yes, with cleanup."
The sixth question is the new V15 driver.

---

# 3. Main result

## 3.1 What V15 keeps from V14

V15 keeps the following as already-correct direction:
- host capability categories and execution-truth treatment,
- prompt contract explicitness,
- exact output-schema and parse-contract expectations,
- proof-family catalog and witness-manifest closure,
- zero-credit participation as first-class settlement semantics,
- browser e2e and operator-experience parity as real validation material,
- matrix honesty as a requirement instead of optional polish.

## 3.2 What V15 changes

V15 changes the ownership model of the docs:
- root files now own system canon,
- demo files now own the current local prototype,
- parity is split into system parity and demo-local parity,
- `engi-demo/` no longer implicitly owns the canonical implementation ledger for the whole system.

## 3.3 Why the change is necessary

Without the separation, V14 still risked two recurring misreads:

1. the demo-local implementation matrix could be mistaken for the whole-system parity ledger
2. demo-local operator-shell and persistence rules could be mistaken for universal system requirements

Those were not just wording issues.
They were file-family issues.

---

# 4. Family-by-family audit result

## 4.1 Host capabilities / execution environment / containerization completeness

V14 result:
- materially recovered and source-grounded
- supported by `HOST_CAPABILITIES.md` and `HOST_CAPABILITIES.json`

V15 action:
- keep the canonical host/execution model in the system spec
- treat the current host docs as demo-family adjuncts to the current realization
- avoid implying that demo-local host truth is the only possible future implementation posture

Status:
- carried forward
- structurally clarified

## 4.2 Inference plus static-measurement appendix completeness

V14 result:
- materially recovered
- exact prompt-output schemas, parse-contract ids, and moment families now exist in the source and spec

V15 action:
- preserve the stronger appendix
- keep deterministic stage ids and evaluator-family ids visible together
- move any remaining stand-in artifact debt into explicit parity matrices rather than fuzzy prose

Status:
- carried forward
- no semantic regression

## 4.3 Proof appendix completeness

V14 result:
- materially recovered
- proof families, subsystem obligations, theorem catalog expectations, and witness-manifest closure are now explicit

V15 action:
- preserve the stronger proof posture
- keep proof-family closure in the system layer
- ensure demo-local proof presentation does not redefine system proof obligations

Status:
- carried forward
- structurally clarified

## 4.4 Zero-point accounting / source-to-shares / settlement exactness

V14 result:
- materially recovered
- selected-versus-participating-versus-credited-versus-zero-credit semantics are explicit

V15 action:
- preserve those relations
- keep exact settlement closure in system canon
- treat current demo previews and operator surfaces as realization expressions of that canon

Status:
- carried forward
- structurally clarified

## 4.5 Template-guide refinement and matrix honesty

V14 result:
- matrix honesty improved
- partial closure language became more disciplined

V15 action:
- formalize a root system parity matrix as the default canonical ledger
- formalize a separate demo matrix
- forbid a demo-local matrix from standing in for whole-system closure

Status:
- materially advanced

## 4.6 System-vs-demo separation

Pre-V15 state:
- implicit and blurry
- the repo effectively encouraged readers to treat the demo as the main home of implementation truth

V15 action:
- explicit file-family split
- explicit ownership split
- explicit parity split

Status:
- new structural correction
- primary V15 contribution

---

# 5. What V15 should not do

V15 should not:
- erase the fact that the current strongest realization is still `engi-demo`,
- pretend a separate non-demo canonical implementation family already exists,
- or overcorrect by making the demo spec feel unimportant.

The correct posture is:
- the demo remains important because it is the current realization,
- but it is no longer allowed to masquerade as the whole of future system canon.

---

# 6. Resulting V15 drafting posture

The right V15 posture is:
- keep V14 as the current pointer truth,
- keep V12 as the last fully realized canon,
- use V15 to encode the next better architecture,
- preserve the carried-forward closure themes,
- and make future implementation growth possible without bending everything back through demo-local assumptions.

If V15 is later promoted, the promotion decision should be about whether this separated architecture is now the right canonical target, not about whether V14's content density was valuable.
V14's density work was valuable.
V15 is organizing it.
