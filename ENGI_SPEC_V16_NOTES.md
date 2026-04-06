# ENGI Spec V16 Notes

## Status

V16 is drafting only.
`/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` still points to `V15`.

The current correct reading is:
- `V15` remains the active canonical/latest target,
- `V15` remains the last fully realized canon preserved in source,
- and V16 is being drafted incrementally through proof-family tightening rather than through a single whole-system rewrite.

## Why this V16 draft starts with prompt-completeness

Prompt-completeness is the right first family because it already sits at the intersection of:
- inference legitimacy,
- contract legitimacy,
- parse legitimacy,
- downstream use legitimacy,
- and proof-family honesty.

In other words, if prompt-completeness is underdefined or underproved, prompt-derived content can appear canonical while still escaping full proof closure.

This is already visible in current source through:
- the `closureCriteria` omission,
- the mismatch between theorem language and proof-object strength,
- parse admissibility living outside the family verdict,
- incomplete or inaccurate downstream consumer bindings,
- and false inferencing provenance annotations.

## Why the parity matrix came before the spec draft

The prompt-completeness family needed to be read in the order:

1. current V15 canonical claim,
2. current source realization,
3. confirmed mismatch classes,
4. family closure expectations,
5. then V16 spec tightening.

That order matters because V16 should not solve the wrong problem.
The point is not to write denser theory first.
The point is to formalize the exact closure obligations that current source and current canon fail to align on.

## Current V16 drafting posture for this family

This draft intentionally covers one family only.

That narrowness is deliberate:
- it keeps the closure story auditable,
- it keeps theorem language and proof-object language aligned,
- and it establishes the method that later families should follow.

The intended development pattern is:
- parity matrix first,
- then spec tightening,
- then notes clarifying interpretation and open questions,
- then source implementation,
- then proof execution and audit.

## Prompt-completeness parity debt collection method

For this family, parity debt is being collected through six repeatable passes:

1. Coverage-set equality
   Compare the field sets claimed by classification, prompt ownership, prompt surfaces, parsed envelopes, evaluator interfaces, and family cases.

2. Theorem-to-proof-object comparison
   Compare what the family theorem says to what the proof object can actually fail on.

3. Downstream consumer graph comparison
   Compare declared downstream consumers to real field consumers.

4. Provenance-truth fixtures
   Toggle claimed input sources and verify the produced outputs actually follow the annotated precedence.

5. Artifact, witness, and replay comparison
   Verify that every family case is auditable through emitted artifacts and replay instructions.

6. Test-ratchet comparison
   Encode each confirmed failure class as a failing test before calling the family closed.

This method is important because it keeps prompt-completeness from collapsing back into a shallow string-template check.

## Prompt-completeness specific implementation debts currently in view

The concrete debts currently driving the family are:

1. `closureCriteria` is inferred, carried, and consumed, but not owned by the prompt family.
2. `buildPromptCompletenessProof(...)` does not satisfy the theorem language currently attached to prompt-completeness.
3. Parse-contract resolution and parsed-payload admissibility are not first-class family verdicts.
4. `PromptTemplateContract` is prose-canonical but not runtime-canonical.
5. `ContextInjectableExpectation` is prose-canonical but not runtime-canonical.
6. `downstreamArtifactBindings` are not validated against real consumer truth.
7. Existing downstream bindings already appear incomplete or inaccurate for current fields.
8. Prompt-owned inferencing provenance annotations can claim `scenario.*` precedence that the runtime does not actually honor.
9. Witness structures are too aggregate to expose omitted prompt cases directly.
10. Replay closure is weaker than case-closure needs.
11. Tests do not currently fail on the main omission and false-claim classes.

## Main open finalization questions inside prompt-completeness

The prompt-completeness family is still carrying several decisions that V16 must finalize explicitly:

1. Should `closureCriteria` be prompt-owned or explicitly excluded?
2. Which downstream surfaces count as semantic consumers versus lineage/proof-only surfaces?
3. Should `PromptTemplateContract` and `ContextInjectableExpectation` become standalone emitted artifacts, or is a runtime registry sufficient?
4. How case-granular must witness refs be before the family is considered auditable enough?
5. Should parsed-envelope admissibility be embedded directly into the prompt-completeness proof object, or should the family proof depend on a separately emitted artifact while still failing on its verdicts?

## Why inference-synthesis is the next family

Inference-synthesis is the right next step because it sits immediately underneath prompt-completeness.

Prompt-completeness answers:
- whether prompt-owned outputs are contractually complete,
- parse-bound,
- and truthfully consumed.

Inference-synthesis answers the prior question:
- whether inferred outputs were even legitimately produced and attributed in the first place.

That makes it the correct adjacent family for the next V16 tightening move.

## Early inference-synthesis findings

The first focused discovery pass already surfaced four strong issues:

1. `closureCriteria` is still missing from inference-synthesis coverage just as it is from prompt-completeness coverage.
2. Inference proofs currently identify a deterministic-local evaluator model while their evaluator surfaces report `standIn: false`.
3. The evidence refs carried by current inference proofs appear narrower than the actual prompt context and derivation basis used for several inferred fields.
4. Required witness surfaces for the family are not yet all first-class emitted artifacts; some survive only inside the system bundle or as aggregate witness refs.

This means inference-synthesis has both shared debt with prompt-completeness and its own independent truth debt.

## Why evaluator-status truth is the first inference-synthesis case

`closureCriteria` undercoverage is still important for this family, but it is shared with prompt-completeness.
The better first inference-synthesis drill-down is evaluator-status truth because it is distinctively this family's problem.

The current system already says:
- model execution is a local stand-in boundary,
- eval-manifest prompt evaluators are stand-ins,
- and prompt implementation narrative is stand-in based,

while the field-level inference proofs still present the same prompt evaluators as non-stand-in.

That makes evaluator-status truth the cleanest first case where:
- the family contradicts itself,
- V15 already has explicit language,
- and V16 can derive a stronger closure rule directly from the contradiction.

## Why `task` evidence-basis closure is the second inference-synthesis case

After evaluator-status truth, the next clean case is `task` evidence-basis closure.

This one is useful because:
- it drills directly into V15's declared-evidence requirement,
- it uses the simplest prompt-bearing inferred field,
- and current source already exposes the mismatch concretely.

The field-level task inference proof currently names:
- run id,
- workflow path,
- repo,
- benchmark harness path.

But the prompt that actually produces `task` also uses:
- `baseRef`,
- `failingCases`,
- `weakDimensions`,
- `touchedPaths`,
- and `constraints`.

So the family currently has a real underdeclared-evidence problem, not just a generic “more detail would be nice” problem.

This makes `task` the right second case for forcing V16 to answer:
- what counts as the canonical evidence basis for an inferred field,
- where that basis is owned,
- and how field proof, prompt context, and derivation evidence are supposed to close together.

## Why proof shape is the next inference-synthesis move

After evaluator-status truth and `task` evidence-basis closure, the next useful step is no longer another narrow defect note.

At this point the family already needs named separation between:
- evaluator or moment declaration,
- field-level inferred-output proof,
- and family-level closure verdict.

Without that separation, the drafting would keep rediscovering the same issue in different forms:
- contradictions across surfaces,
- partial evidence stories,
- and witness material hidden inside aggregate bundles.

That is why the current pass introduces a provisional V16 proof shape for inference-synthesis before continuing deeper case expansion.

## Why hybrid evidence ownership is now the preferred direction

The current inference-synthesis work now points to a clearer design choice.

Expected evidence/context truth and realized run-specific evidence truth should not be forced into the same object.
They are related, but they are not the same thing.

The cleaner V16 posture is:
- moment contracts own expected evidence/context/downstream/boundary truth,
- field proofs own the realized evidence basis and realized evaluator status for the run,
- and the family proof owns closure between those two.

That is better than:
- putting all evidence ownership directly on field proofs, which would duplicate expected truth,
- or putting all evidence ownership only on contracts, which would weaken run-specific auditability.

This is the first point where inference-synthesis starts to look less like a loose family name and more like a typed proof program with distinct layers.

## Why witness-materialization and replay closure are next

After choosing the provisional proof shape and the preferred evidence-ownership split, the next pressure point is obvious:
the family still has to become dependably auditable.

Current source still spreads inference-synthesis across:
- witness refs,
- bundle-carried surfaces,
- eval manifest surfaces,
- and prompt artifacts,

without one first-class replay/materialization story for the family itself.

That makes witness-materialization and replay closure the right next specing-side move because it forces V16 to answer:
- which family surfaces must be emitted directly,
- which can remain explicit witness structures,
- how replay reconstructs the family proof story,
- and how deliverables, witness paths, and replay instructions stay aligned.

## Current guidance on first-class artifacts versus witness structures

The current inference-synthesis determination is:

1. first-class artifacts should carry primary proof-bearing and replay-critical truth,
2. explicit witness structures are acceptable only for derivative aggregate surfaces,
3. and bundle-only or hash-only carriage is not enough for primary family surfaces.

That leads to the current provisional split:
- moment contracts, field proofs, family proof, eval manifest, prompt surfaces, and parsed envelopes should be first-class family artifacts,
- prompt implementation surface may remain a witness structure if it stays exactly reconstructible,
- and prompt contracts should stop acting as a surrogate primary witness artifact for inference-synthesis.

This is the first point where the family has a concrete materialization rule rather than only a list of desirable artifacts.

## Reading guidance for the current V16 file family

For this pass:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V16_SYSTEM_PARITY_MATRIX.md` is the debt ledger,
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V16.md` now contains a formal `prompt-completeness` section plus an initial `inference-synthesis` discovery section,
- and this notes file explains why prompt-completeness came first and why inference-synthesis is the next family opened.

This means the V16 file family is intentionally asymmetrical right now.
It is not a full replacement for V15 yet.
It is a proof-family drafting wedge into V16, with one family tighter than the next by design.

## What remains out of scope for now

This pass does not yet draft:
- the remaining proof families beyond `prompt-completeness` and initial `inference-synthesis`,
- the full V16 theorem catalog,
- `_PROVEN_` appendix generation,
- proof-program inventory outside these first two families,
- or the full V16 system spec rewrite.

Those are deferred on purpose.
Prompt-completeness should be made precise first so the same drafting and parity pattern can be applied consistently to the remaining proof surface.
