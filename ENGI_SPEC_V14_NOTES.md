# ENGI Spec V14 Notes

## Why V14 exists

V14 is the first full writing pass after V13 finalized the ENGI spec-file structure standard.

With the V14 correction path, it is also the first version explicitly aligned to the standalone cross-version drafting guide at `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_TEMPLATEGUIDE.md`.

The point of V14 is not to reopen ENGI design.
The point is to write the current canon densely enough that:
- the operating model is recoverable,
- the artifact contracts are explicit,
- host/runtime truth is canonical rather than incidental,
- proof and settlement obligations are inspectable,
- test coverage and operator-experience parity are canonical,
- and current source parity is legible.

## What V14 preserves

V14 preserves the later design truths that should no longer drift:
- depositing, needing, and fit are the center of the operator story,
- Profile A and Profile B are distinguished by deposit mode and need mode,
- identity/auth is one spine,
- repo-to-settlement is one operating chain,
- proof and settlement are closure,
- bounded public proof is derived from private closure,
- boundary reality is explicit supporting truth rather than hidden implementation detail.

## What V14 restores

V14 restores the denser explicitness that compressed versions lost, especially:
- fuller schema detail,
- stronger subsystem invariants,
- stronger host capability and execution-truth treatment,
- fuller inference/evaluator contracts,
- fuller proof-family and witness-manifest treatment,
- a real artifact appendix,
- a real proof-obligations appendix,
- a real test-coverage appendix,
- a real spec-to-source parity appendix,
- explicit operator-experience parity treatment where explainers or tooltips are canonical.

## Template-guide alignment

V14 now explicitly follows `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_TEMPLATEGUIDE.md`.

That means this V14 file family now intentionally does all of the following:
- keeps the V14 version executive summary separate from the canonical ENGI executive summary,
- treats the spec, notes file, and implementation matrix as one coordinated file family,
- preserves the latest-target vs last-fully-realized-canon distinction explicitly,
- covers the whole ENGI operating chain rather than only the currently hottest subsystem,
- treats host, inference, proof, test coverage, spec-to-source parity, and operator-experience parity as canonical structural material.

## Important numbering decision

V14 intentionally preserves the V12 semantic anchors for sections 6 through 13.

That is not nostalgia.
It is a practical traceability decision so the demo's explainer and reasoning surfaces can move from V12 references to V14 references without semantic remapping.

## Important version-status nuance

`ENGI_SPEC.txt = V14` means V14 is the current canonical/latest target.

That does not erase the separate truth that V12 remains the last fully realized canon and the semantic implementation anchor for the current deterministic demo source.

Both statements are required together.
Dropping either one makes the repo easier to misread.

## Important non-decision

This tightening pass does not repoint `ENGI_SPEC.txt` away from V14.

It also does not pretend that every V14 formalization is already fully source-realized.
The current implementation is still the V12-target deterministic prototype, now interpreted and formalized through V14.

## Writing posture for V14

The right V14 posture is:
- preserve current strong design truth,
- restore explicitness around that current truth rather than reverting to obsolete framing,
- prefer current builder, artifact, and subsystem names where they are already strong,
- keep appendices purposeful rather than dumping notes,
- record remaining doc/source lag explicitly in the implementation matrix rather than hiding it.

## What should count as a real parity gap in this pass

A real V14 parity gap is something like:
- the spec and notes disagree about canonical pointer status,
- the host/runtime section hand-waves execution truth instead of specifying it,
- the inference appendix omits prompt contracts, context injectables, or parse contracts,
- the proof appendix names proof families but does not map obligations and witnesses clearly,
- the test appendix omits operator-experience parity where the demo depends on explainers,
- the parity appendix fails to identify accepted boundaries or canonical UI interpretation surfaces.

A non-gap is something like:
- live GitHub token minting still being external,
- live branch writes not happening in the local prototype,
- real external settlement effects remaining modeled rather than executed,

so long as those boundaries remain explicitly disclosed.

## V14 validation emphasis

The most important validation emphasis remains that browser e2e coverage is no longer "nice to have".
It is canonical evidence that the operator story actually reads in the intended order.

Where explainers, tooltips, or visual/raw dual renderings materially affect operator interpretation, their parity also counts as canonical validation material.

## Tightening added in this correction path

This correction path added or strengthened the following:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_TEMPLATEGUIDE.md` as the standalone drafting guide for future enriched specs,
- explicit V14 alignment to that guide,
- explicit `ENGI_SPEC.txt = V14` plus `V12 remains the last fully realized canon` wording across the V14 file family,
- stronger host capability treatment covering role, category boundaries, bootstrap/furnishing, containerization, telemetry/safety, and measurement/execution truth,
- stronger inference appendix completeness covering moment contracts, prompt templates, context injectables, output ownership, and parse contracts,
- stronger proof appendix completeness covering proof-family definitions, subsystem obligations, witness structures, theorem catalog material, and witness-manifest closure,
- stronger operator-experience parity treatment in test and parity appendices.

## Practical drafting reminder

If a proposed addition makes the spec longer but not clearer, it is noise.

If it makes:
- subsystem obligations clearer,
- execution truth clearer,
- parity boundaries clearer,
- validation traceability clearer,
- or the operator chain easier to recover,

then it is likely proper V14 material.
