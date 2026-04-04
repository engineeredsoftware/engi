# ENGI Spec V15 Information Audit

Status: active canonical audit record
Purpose: audit the transition from the V14 canonical/latest target into active V15, focusing on separation of system canon from demonstration canon, canonical source refactor requirements, and the remaining parity debt between the current `engi-demo` implementation and the stronger V15 specification target.

Baseline references:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_TEMPLATEGUIDE.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V14.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V14_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/SPEC_V14_IMPLEMENTATION_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/engi-demo.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/public/app.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/core.test.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/api.test.js`

---

# 1. Executive summary

V15 should be understood as the first version that tries to make the ENGI canon coherent across three layers at once:

1. **system specification**
2. **system implementation**
3. **demonstration implementation**

The key audit result is:

> ENGI now has enough system richness and demonstration richness that the current co-location of those concerns in `engi-demo` and in the spec family is itself a meaningful source of design and parity debt.

V15 therefore needed to do two kinds of work simultaneously:
- complete the stronger formal/system specification work that V14 advanced,
- and separate / refactor the implementation shape so the canonical system is not structurally conflated with the demonstration layer.

This is also the first version where **typing for provability** should be treated as a central canonical implementation concern rather than an implementation nice-to-have.

---

# 2. Current canonical-target nuance

V15 must preserve this distinction explicitly:
- `ENGI_SPEC.txt = V15` means **V15 is the current canonical/latest target**
- **V15 is now the realized canonical baseline for this repo**

This matters because the repo should distinguish between active canonical status and the remaining cleanup debt after promotion.

---

# 3. What V14 advanced successfully

V14 meaningfully advanced:
- host capability / execution-environment coverage
- inference appendix richness
- proof appendix richness
- zero-point accounting / source-to-shares explicitness
- template-guide alignment
- executive-summary separation
- target-vs-last-canon nuance

So V15 should not repeat that work from scratch.
It should absorb it and make it structurally actionable.

---

# 4. Main V15 audit finding: co-location is now debt

## 4.1 Spec-layer co-location debt

The ENGI spec family still tends to let:
- system truth,
- demonstration truth,
- and parity/debt truth

bleed into the same documents too easily.

V15 should therefore force clearer separation among:
- canonical system spec
- demonstration spec / demonstration constraints
- implementation matrix / parity debt
- drafting guide / spec-for-specs

## 4.2 Source-layer co-location debt

The current `engi-demo` source remains the canonical implementation truth for many parts of ENGI, but it also co-locates:
- system/domain logic
- demonstration ordering / UX logic
- projection / explanation logic
- test/demo fixtures
- operational demo shell concerns

The existence of a single large `src/engi-demo.js` remains one of the strongest structural signals that V15’s refactor focus is real and necessary.

## 4.3 Current extracted canonical module state

The co-location debt is no longer abstract.
The repo now has an explicit extracted canonical layer under `engi-demo/src/canonical/`:
- `enums.js` for closed-case runtime-safe subsystem values,
- `types.js` for JSDoc typedef vocabulary and stronger typed intent,
- `surfaces.js` for primary operating-surface and repo-to-settlement builders,
- `run-artifacts.js` for telemetry, manifest, bundle, and coverage-report builders.

That is real structural progress, but it is not full subsystem separation.
The next extraction seams are still concentrated in `src/engi-demo.js`:
- need measurement and inference,
- candidate evaluation and materialization,
- proof and settlement artifact emission,
- projection and disclosure shaping.

---

# 5. Type-system and struct-design audit

## 5.1 Current state

The current implementation already contains rich domain structures for:
- depositing
- needing
- deposit-to-need fit
- proof witnesses
- source-to-shares
- settlement participation
- identity/auth spine
- boundary reality
- projections

The current repo now expresses part of that more explicitly through:
- runtime-safe canonical enums under `src/canonical/enums.js`,
- JSDoc type vocabulary under `src/canonical/types.js`,
- extracted high-information builder families under `src/canonical/surfaces.js` and `src/canonical/run-artifacts.js`.

But this richness is not yet fully expressed through:
- explicit closed-case enums/discriminants
- strong role-specific ids/refs/roots
- system-layer vs demo-layer struct separation
- clean module boundaries
- deeply typed canonical subsystem families

## 5.2 V15 requirement

V15 should treat stronger typing as a provability mechanism.
The audit therefore recommends canonical V15 emphasis on:
- enum-rich subsystem state distinctions
- discriminated unions for major variant families
- stronger role-typed ids / refs / roots
- deliberate composition of domain structs
- explicit separation of demo-only view models from system objects

---

# 6. Information-value organization audit

The implementation has enough information richness now that the main question is no longer only “is the data there?”
It is also:
- is each piece of information located at the right layer,
- in the right struct,
- with the right canonical owner,
- and with the right demonstration projection?

V15 should explicitly reorganize information-value placement around:
- system-layer domain structures
- proof/settlement/measurement structures
- projection-layer structures
- demo-layer explanatory structures

---

# 7. Host capability and execution environment audit

V14 correctly elevated host capabilities into canonical system material.
V15 should now make that actionable in both spec and implementation shape.

Important audit conclusion:
- host capability requirements are not merely ops metadata;
- they are direct dependencies of static measurement, proof programs, machine-local execution truth, and demo/runtime observability.

V15 should therefore preserve and sharpen:
- machine-local program categories
- static-analysis program categories
- proof-program categories
- remote-program boundary categories
- bootstrap/furnishing/configuration expectations
- telemetry and safety expectations
- containerization expectations

---

# 8. Inference and static measuring audit

Current ENGI now treats these as serious canonical subsystems.
But V15 should go further in two ways:

1. ensure the **spec** exhaustively enumerates them
2. ensure the **implementation shape** reflects those distinctions cleanly

Key areas to preserve and deepen:
- prompt contracts
- prompt completeness
- inference moments
- context injectables
- output schemas / parse contracts
- static code-analysis facts
- measurement receipts
- verification receipts
- fit/ranking dependence on measured vs inferred structures

---

# 9. Proof and exactness audit

Current ENGI is strong on:
- system proof bundle
- proof witness manifest
- bounded public proof
- disclosure/redaction proof
- source-to-shares
- settlement participation
- accounting precision reporting

V15 should preserve that and improve the formalization around:
- theorem catalog completeness
- subsystem proof-family separation
- witness-structure typing
- zero-point / zero-credit semantics
- exact-accounting invariants as canonical typed/system obligations

---

# 10. Demonstration separation audit

The demonstration should remain strong, but it should not define the system architecture by accidental co-location.

V15 therefore needs explicit separation rules for:
- what is system-layer truth,
- what is projection-layer truth,
- what is demonstration ordering,
- what is explainer/tooltip pedagogy,
- and what belongs only to the current demo application.

This separation should appear in both:
- the spec family
- the source organization and type model

---

# 11. Matrix implications

The V15 implementation matrix should therefore track at least these parity/debt families:
- system-vs-demo architectural separation
- canonical source refactor status
- extracted canonical module ownership
- next extraction seams and their current owners
- typing-for-provability progress
- information-value organization quality
- module/file organization quality
- naming finalization quality
- host capability/source parity
- inference/static measuring appendix parity
- proof/zero-point exactness appendix parity

The matrix should remain honest and should not mark these closed until the implementation shape materially reflects them.

---

# 12. Final V15 audit conclusion

The main V15 task is no longer only “more spec detail.”

It is:
- stronger system-vs-demo separation,
- stronger canonical source shape,
- explicit recognition of the extracted `src/canonical/` layer,
- explicit naming of the seams still left in `src/engi-demo.js`,
- stronger type-system formalization for provability,
- stronger information-value organization,
- and stronger parity between richly specified ENGI and the actual implementation that now carries it.

That makes V15 the version where ENGI should read like an active migration plan toward a long-lived canonical implementation form, not merely a higher-detail aspiration.
