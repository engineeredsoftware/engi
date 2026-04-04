# ENGI Spec V13 Notes

## Why V13 exists

V13 exists because ENGI now needs a spec that is both:
- as information-rich as the densest earlier versions,
- and as system-design-correct as the newer demonstration/source-faithful versions.

It should not force a tradeoff between richness and clarity.

More specifically, V13 is the version that finalizes the **formality and structure of ENGI specification files** themselves.
V14 should then be the first version that fully writes the canonical long-form ENGI spec to that finalized structure.

## What V13 should preserve

V13 should preserve the later design gains:
- depositing / needing / fit as the main operator relation
- profile semantics by deposit mode and need mode
- identity/auth spine
- repo-to-settlement path
- proof/settlement as closure
- boundary reality as explicit supporting truth
- source receipts / proof witnesses / current parity-bearing artifacts
- demonstration ordering as canonical system truth

## What V13 should restore

V13 should restore the detail density that compressed versions lost, especially:
- precise schemas/types
- evaluator/inference appendix detail
- proof obligations
- telemetry obligations
- appendix-rich pedagogy
- fuller scenario/example coverage
- a real test appendix

## Important V13 rule

When V13 encounters a conflict between:
- older explicitness,
- and newer design truth,

it should preserve the newer design truth and restore explicitness around that newer truth rather than reverting to the older structure.

## Important new appendix expectation

V13 should include a test coverage appendix that explicitly covers:
- unit tests
- API tests
- browser e2e tests
- scenario family coverage
- proof / settlement / projection coverage
- any operator-experience surfaces whose correctness materially depends on UI interpretation (such as tooltip/explainer parity)

More broadly, V13 should finalize the appendix expectations for future enriched specs. Appendices should no longer be treated as optional overflow; they are part of the canonical file design. At minimum, a future full canonical ENGI spec should expect dedicated appendices for:
- types/schemas
- evaluators/inference
- proof obligations/witnesses
- artifacts/deliverables
- scenarios/examples
- test coverage
- spec-to-source parity

## Implementation matrix philosophy

The V13 implementation matrix should ideally be near-empty because V13 is primarily a full canonical specing pass.

But it should still exist, because if information/design loss exists between earlier dense versions and the current V12 target/source, the matrix should record exactly where implementation parity or formalization still lags the fully enriched spec.

## Current recommended drafting posture

V13 should be drafted as if it is the long-term canonical ENGI reference document.
That means:
- high density is acceptable,
- appendices are expected,
- formalization should be explicit,
- pedagogical structure should be intentional,
- code/source references should be intentionally designed rather than ad hoc,
- special handling areas like inference and proofs should receive dedicated structural treatment,
- and parity with current source should be treated as first-class.
