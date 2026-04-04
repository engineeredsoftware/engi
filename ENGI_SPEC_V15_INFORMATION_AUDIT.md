# ENGI Spec V15 Information Audit

Status: updated draft audit for the V15 successor-target pass
Purpose: record what V15 changes relative to the latest prior audit posture and current V14/V12/source truth, with emphasis on system-vs-demo separation, parity-ledger ownership, and canonical source refactor work
Baseline references:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_TEMPLATEGUIDE.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V13_INFORMATION_AUDIT.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V14.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V14_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/SPEC_V14_IMPLEMENTATION_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_SYSTEM_PARITY_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/ENGI_DEMO_SPEC_V15.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/SPEC_V15_IMPLEMENTATION_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/engi-demo.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/realization-profile.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/settlement-structs.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/core.test.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/api.test.js`

---

# 1. Executive summary

V15 is not primarily another density-recovery pass.
That work was already substantially completed by the V13 audit posture and then by the V14 densification pass.

V15 is a structural-correction and source-normalization pass.
Its main jobs are:
- stop system canon, demo canon, and parity tracking from remaining collapsed into one file family,
- make the demo matrix live on one clear canonical path,
- and begin landing the canonical-source refactor in actual repo structure rather than only in prose.

The core audit result is:

> The latest prior audit problem was "what explicit system detail must be restored into canon?" V15's problem is "which layer owns that truth, and how should the source start reflecting that ownership more clearly?"

That means the strongest current V15 reading is:
- V14 still remains the active canonical/latest pointer target,
- V12 still remains the last fully realized canon,
- the V13 audit remains the latest prior audit baseline for density recovery and preserved design truth,
- and V15 now carries that recovered density into a cleaner file family and a first real source refactor step.

The concrete V15 pass result in the current repo is not only documentary.
It now includes:
- a canonical demo matrix path at `engi-demo/SPEC_V15_IMPLEMENTATION_MATRIX.md`,
- an explicit compatibility-alias posture for the longer demo-prefixed matrix filename,
- a new `realization-profile.js` module that makes canonical profile aliasing explicit while preserving legacy demo naming,
- and a new `settlement-structs.js` module that gives source-to-shares and settlement participation more explicit discriminants and dispositions.

---

# 2. Latest prior audit state

The latest prior information audit available in the repo is `ENGI_SPEC_V13_INFORMATION_AUDIT.md`.

That audit established the main carry-forward rule:
- preserve later ENGI design meaning where V12+ changed the system on purpose,
- recover earlier explicitness where middle versions compressed important detail away,
- and promote current source truth into canon instead of letting the spec lag the implementation.

V15 inherits that posture rather than replacing it.

What V15 does differently is narrower:
- V13 asked what information families had to be restored,
- V14 restored most of the major host, inference, proof, and settlement density families,
- V15 now asks which files should own those truths and which source structures should begin reflecting the new ownership model.

So the V13 audit remains the density baseline.
V15 is the structural and parity-ownership successor to that baseline.

---

# 3. Audit questions

The V15 audit asks seven questions:

1. Did the V13 audit plus V14 already make the main host / inference / proof / settlement families canonically serious?
2. Did the repo still conflate system canon and demo canon after that work?
3. Did the parity ledger still live under a demo-local filename in a way that could be mistaken for whole-system closure?
4. Did current source still preserve legacy demo-era naming without a clearer canonical alias posture?
5. Did current settlement and source-to-shares structures still rely too heavily on booleans rather than explicit discriminants?
6. Did docs and tests ratify the same surfaces the refactor was trying to make more explicit?
7. What still remains open after the current V15 pass?

The answers are:
- `1`: substantially yes,
- `2`: yes before V15, less so now,
- `3`: yes before the current pass, corrected now,
- `4`: yes before the current pass, materially improved now,
- `5`: yes before the current pass, materially improved now,
- `6`: yes, after the current pass more strongly than before,
- `7`: non-demo implementation home, broader module decomposition, and a few adjunct/doc/artifact gaps still remain open.

---

# 4. Main result

## 4.1 What V15 keeps from the prior audit lineage

V15 keeps the following as already-correct direction:
- depositing, needing, and fit as the main operator relation,
- profile meaning defined by deposit mode and need mode,
- host capability and execution-truth seriousness,
- exact prompt contracts, parse contracts, and static-measurement appendix posture,
- proof-family catalog and witness-manifest closure,
- zero-credit participation as first-class settlement semantics,
- browser e2e and operator-shell ordering as real parity evidence,
- and matrix honesty as a non-optional requirement.

## 4.2 What V15 changes

V15 changes the ownership model:
- root files now own system canon,
- demo files now own the current local realization,
- system parity and demo parity are no longer the same document,
- the demo matrix now has one canonical maintained path,
- and source structure now begins to reflect the naming/settlement refactor rather than only describing it.

## 4.3 Why the change is necessary

Without the separation and path correction, V14 still risked three recurring misreads:

1. the demo-local implementation matrix could be mistaken for the whole-system parity ledger,
2. the longer demo-prefixed matrix filename could drift alongside another path and split the V15 ledger by accident,
3. legacy demo naming could be mistaken for the only canonical vocabulary instead of one realization-era label set.

Those are not cosmetic issues.
They are file-family and source-shape issues.

---

# 5. Family-by-family audit result

## 5.1 Host capabilities / execution environment / containerization completeness

Prior-state result:
- materially recovered and source-grounded by V14,
- with host truth supported by `HOST_CAPABILITIES.md` and `HOST_CAPABILITIES.json`

V15 action:
- keep canonical host/execution/container truth in the root system spec,
- keep current host docs as demo-family adjuncts,
- avoid implying that demo-local host truth is the only possible future implementation posture

Status:
- carried forward,
- structurally clarified,
- still open only at the level of non-demo implementation-family absence

## 5.2 Inference plus static-measurement appendix completeness

Prior-state result:
- materially recovered by V14 and current source,
- exact prompt-output schemas, parse-contract ids, static receipts, and measurement/provenance surfaces now exist

V15 action:
- preserve the stronger appendix,
- keep deterministic stage ids and evaluator-family ids visible together,
- continue surfacing the parsed-completion artifact gap honestly,
- and keep the new matrix/audit language anchored to current source reality

Status:
- carried forward,
- no semantic regression,
- parsed completion artifact remains a low-risk follow-up

## 5.3 Proof appendix / proof-family completeness

Prior-state result:
- materially recovered,
- proof families, subsystem obligations, theorem checks, witness structures, and witness-manifest closure are explicit

V15 action:
- preserve the stronger proof posture,
- keep proof-family closure in the system layer,
- ensure the demo proof presentation does not redefine system proof obligations

Status:
- carried forward,
- structurally clarified

## 5.4 Zero-point accounting / source-to-shares / settlement exactness

Prior-state result:
- materially recovered,
- selected-versus-participating-versus-credited-versus-zero-credit semantics are explicit in V14 and in current source

V15 action:
- preserve those relations,
- keep exact settlement closure in system canon,
- and strengthen the source shape with explicit settlement/source-to-shares discriminants rather than booleans alone

Current landed source result:
- `settlement-structs.js` now isolates contribution and participation dispositions,
- settlement participation records now carry explicit `selectionStatus`, `settlementStatus`, `creditDisposition`, and `settlementDisposition`,
- source-to-shares entries now carry an explicit `entryKind` and `contributionDisposition`

Status:
- carried forward,
- materially advanced in source shape,
- still not the end of the broader subsystem decomposition

## 5.5 Template-guide refinement and matrix honesty

Prior-state result:
- matrix honesty improved in V14,
- but demo/system matrix naming and maintenance posture were still under-specified

V15 action:
- formalize a root system parity matrix as the default canonical ledger,
- formalize a separate demo matrix,
- formalize `engi-demo/SPEC_V15_IMPLEMENTATION_MATRIX.md` as the preferred maintained demo-matrix path,
- and explicitly demote the longer demo-prefixed matrix filename to compatibility-alias status

Status:
- materially advanced

## 5.6 System-vs-demo separation

Pre-V15 state:
- implicit and blurry,
- with the repo still encouraging readers to treat the demo as the main home of implementation truth

V15 action:
- explicit file-family split,
- explicit ownership split,
- explicit parity split,
- and clearer distinction between system obligations and demo-local shell/persistence/host truth

Status:
- primary V15 contribution,
- materially improved

## 5.7 Canonical source refactor focus

Pre-pass state:
- V15 spec/notes already described the refactor focus,
- but source still reflected that focus only indirectly

Current-pass action:
- `realization-profile.js` now isolates profile ids, aliasing, and preferred naming while preserving legacy demo labels,
- `settlement-structs.js` now isolates settlement/source-to-shares discriminants,
- tests now ratify those new public/source-facing structures,
- and the demo matrix now records the refactor as actual repo truth rather than purely documentary intent

Status:
- materially advanced,
- still partial rather than final

---

# 6. What V15 should not do

V15 should not:
- erase the fact that the strongest current realization is still `engi-demo`,
- pretend a separate non-demo canonical implementation family already exists,
- or claim that the naming/module refactor is complete just because the first explicit modules landed.

The correct posture is:
- the demo remains important because it is the current realization,
- but it no longer gets to masquerade as the whole of future system canon,
- and the current source refactor should be treated as a first explicit landing step rather than the final architecture.

---

# 7. Current V15 closure for this pass

The current V15 pass closes or materially advances all of the following:

1. A V15 information audit now exists in a form anchored to the latest prior audit posture.
2. The demo matrix now exists on the expected canonical path: `engi-demo/SPEC_V15_IMPLEMENTATION_MATRIX.md`.
3. The template guide now encodes the preferred demo-matrix naming rule.
4. Root V15 spec, notes, system parity, and demo-spec references now point at the canonical demo matrix path.
5. Profile aliasing now has a concrete source home in `realization-profile.js`.
6. Zero-credit/source-to-shares discriminants now have a concrete source home in `settlement-structs.js`.
7. Core/API tests now ratify the new alias/discriminant surfaces.

What still remains open is narrower:

1. No non-demo canonical implementation family exists yet.
2. `engi-demo/src/engi-demo.js` is still the dominant orchestration reservoir.
3. Host capability adjunct docs still live only in the demo family and remain V14-governed while V15 stays draft.
4. The deterministic stand-in path still lacks a first-class parsed completion artifact.
5. Some shell/docs wording still preserves V12/V14 trace language even where V15 now carries the cleaner ownership model.

---

# 8. Resulting V15 drafting posture

The right V15 posture is now:
- keep V14 explicit as the current canonical/latest target,
- keep V12 explicit as the last fully realized canon,
- keep the V13 audit posture explicit as the latest prior audit baseline,
- use V15 to encode the better system-vs-demo architecture,
- and treat source refactor, docs/tests parity, and matrix naming as part of that architecture rather than postscript cleanup.

If V15 is later promoted, the promotion decision should be about whether this separated architecture and partial source normalization are now the right canonical target.
V14's density work remains valuable.
V15 is organizing it and starting to land it in source.
