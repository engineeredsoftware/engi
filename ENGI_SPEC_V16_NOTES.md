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

## Current V16 drafting posture

The draft no longer covers one family only.
It now covers all nine V15 proof families through the same matrix-first and member-tightening method.

That expansion is still deliberate rather than broad for its own sake:
- it keeps each family closure story auditable,
- it keeps theorem language and proof-object language aligned family by family,
- it preserves `prompt-completeness` as the most tightened exemplar,
- and it turns the first family's method into the default pattern for the rest.

The intended development pattern is:
- parity matrix first,
- then spec tightening,
- then notes clarifying interpretation and open questions,
- then source implementation,
- then proof execution and audit.

The current state after the member-tightening and theorem-catalog pass is:
- every V15 proof family is open in V16 drafting,
- every family now has member inventory plus member-closure criteria,
- every family now has a current realization-basis theorem catalog and theorem-by-theorem closure reading,
- and the next pass is no longer enumeration but theorem tightening, proof execution, and then generated appendix formalization.

That theorem-by-theorem pass is now present across the family layer.
The current theorem-binding reading is:
- every family now has realized theorem identifiers in source,
- the spec now binds each family to its current realization-basis theorem catalog,
- the parity matrix now carries theorem-by-theorem closure readings rather than theorem debt only,
- every family now has realized proof-object field and artifact/replay-binding direction,
- and `_PROVEN_` generation is now ready to be formalized because the rest of the V16 proving layer has been tightened far enough to support it.

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

## Why prompt-completeness now gets the same canonical precision treatment

The inference-synthesis work clarified that artifact, witness, and replay determination cannot remain family-specific improvisation.
It has to become part of the generic proof-family precision pattern.

Prompt-completeness therefore now gets the same treatment:
- expected truth objects,
- realized truth objects,
- family closure object,
- artifact determination rule,
- witness rule,
- replay rule.

This does not mean both families have identical artifacts.
It means both families now use the same canonical precision grammar for deciding what must be emitted directly and what may remain reconstructible witness structure.

For prompt-completeness, the current provisional split is:
- first-class: prompt family registry or equivalent runtime registry, prompt contracts, prompt surfaces, parsed envelopes, family proof,
- conditional witness structure only if exactly reconstructible: prompt implementation surface,
- not acceptable as substitute: bundle-only carriage or aggregate-hash-only closure for the primary family surfaces.

## Why prompt-completeness replay and witness closure now need the same explicitness

After adding the generic artifact-determination rule to prompt-completeness, the next obvious question is whether the family's replay and witness story is equally precise.

Current source already emits most of the relevant surfaces, but:
- witness paths still name only a subset,
- replay still centers on prompt contracts plus parsed envelopes,
- and the family can still describe more closure in prose than its replay path directly reconstructs.

So prompt-completeness needs the same explicit replay/witness treatment now for the same reason inference-synthesis did:
- family closure should not outrun family audibility,
- omission-class failures should be replay-visible,
- and expected family truth plus realized prompt truth should both be part of the replay story.

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

Some family-specific sections below preserve the chronological discovery path.
Where an early-findings subsection and the current V16 spec or parity matrix disagree, the later theorem-bearing sections in the spec and parity matrix are the current audit authority.

For this pass:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V16_SYSTEM_PARITY_MATRIX.md` is the debt ledger,
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V16.md` now contains all nine V15 proof families through member closure and theorem-by-theorem family drafting,
- and this notes file explains why the families were opened in this order and what each one still needs.

This means the V16 file family is intentionally asymmetrical right now.
It is not a full replacement for V15 yet.
It is a proof-family drafting wedge into V16, with some families tighter than others by design but all nine now carried past pure family opening into theorem-bearing closure language.

## What remains out of scope for now

This pass still does not yet complete:
- proof-program inventory beyond the family-first closure pass,
- or the full V16 system spec rewrite.

The cross-family family theorem layer is now materially in place.
That is why `_PROVEN_` is no longer deferred as a concept and is now backed by a realized generator path.

## Why static-code-analysis is the next family

After `prompt-completeness` and `inference-synthesis`, the next clean family is `static-code-analysis`.

It is the right next move because:
- it is one of the earliest proof-bearing deterministic families in the system,
- it feeds both need measurement and asset evaluation,
- it already emits multiple proof-bearing artifacts,
- and it is already concrete enough that V16 can reason from real family surfaces rather than from abstractions alone.

It is also a useful contrast case.
`prompt-completeness` and `inference-synthesis` both center on prompt-owned or inferred truth.
`static-code-analysis` centers on deterministic stage truth, receipt truth, and replay truth.

That means it can test whether the V16 method still works when the family is not prompt-centered.

## Early static-code-analysis findings

The initial discovery pass already surfaced several strong issues:

1. The current family proof/report domain is mixed rather than static-only.
   `buildStaticMeasurementReport(...)` includes `verificationReceiptIds`, and `buildStaticMeasurementProof(...)` currently reports `coveredStageIds` that include multiple `verification.*` stages.

2. The family theorem is currently stronger than the family proof object.
   V15 says deterministic parser, repo-context, content-unit, and measurement stages are receipt-bearing and replayable.
   Current family proof object only proves that collected receipt refs resolve.

3. The family emits richer primary artifacts than its witness refs acknowledge.
   The witness family has the right artifact-path set, but its witness refs still collapse the family down to receipt ids rather than naming registry/report/proof truth directly.

4. Replay instructions are not family-specific enough yet.
   Current replay collapses static and verification receipt resolution into one step rather than reconstructing a static-family closure path.

5. Stage naming is already split across abstraction layers.
   Need measurement provenance uses abstract ids such as `github-actions.benchmark-parser.v2` and `github.repo-context.extract.v2`, while receipts prove concrete `...v15` stage ids.

## Why receipt-domain closure is the first static-code-analysis case

The first static-code-analysis case should be receipt-domain closure and family-boundary truth.

That is the right first case because it asks the cleanest question:
- is the family currently proving the right domain at all?

This comes before more detailed questions like:
- how registries should be typed,
- what final family artifact names should be,
- or how static stage contracts should eventually be emitted.

If the family is currently proving a mixed static-plus-verification receipt domain, V16 needs to fix that boundary first.
Otherwise later refinements would only make the wrong proof surface more elaborate.

## Current first-pass V16 direction for static-code-analysis

The current drafting direction is:

1. make the static stage domain explicit,
2. separate static family receipt closure from verification-family receipt closure,
3. make abstract-to-concrete stage mappings explicit where provenance ids and receipt stage ids differ,
4. distinguish registry truth, receipt truth, report truth, and family-proof truth,
5. and only then expand into fuller family proof shapes or artifact determinations.

So unlike prompt-completeness and inference-synthesis, static-code-analysis is still at the first boundary-normalization stage.
That asymmetry is intentional.

## Why artifact-role closure is the second static-code-analysis case

After family-boundary truth, the next useful question is not yet the final proof-shape question.
It is artifact-role closure.

This is the right second case because current source already encodes a role distinction:
- `codeAnalysisFactRegistry` declares a spec artifact alias,
- `staticHeuristicsRegistry` is built by copying the fact registry and adding artifact metadata only,
- but the proof, deliverable, and projection layers still tend to treat both as equally primary family surfaces.

That makes artifact-role closure a better next step than jumping straight to final artifact materialization rules.
The family first needs to say:
- which artifact is the canonical registry surface,
- which artifacts are aliases or projections,
- and which artifacts carry genuinely different proof truth.

## Early static artifact-role findings

The second discovery pass already surfaced these concrete points:

1. The two registries currently share the same underlying registry truth.
   In replay they have the same `registeredFacts`, the same `consumerMatrix`, and the same `audit.registryHash`.

2. The heuristics registry is not currently an independently constructed proof surface.
   It is a copied registry plus:
   - `artifactId`
   - `artifactSemantics`

3. The family witness structure still collapses role distinctions.
   Artifact digests name both registries, the receipts, the report, and the proof, but family `witnessRefs` still contain receipt ids only.

4. Public and deliverable treatment exposes multiple family surfaces but does not yet make their role distinctions canonical.
   Bounded-public proof currently summarizes only report-level truth: receipt count plus receipt-ref closure.

## Current second-pass V16 direction for static-code-analysis

The current direction is now:

1. keep one canonical primary registry surface,
2. make alias/projection status explicit for any derived registry surfaces,
3. distinguish receipt-log truth from report truth and from family-proof truth,
4. make witness structure follow those role distinctions rather than flattening to receipt ids only,
5. and only after that decide the final first-class artifact determination for the family.

So the family has now advanced from:
- one boundary-normalization question,
to
- two concrete normalization questions:
  - stage-domain purity,
  - and artifact-role closure.

## Why provisional artifact determination is now the next move

After the first two cases, the family has enough evidence to move one step beyond discovery.

It is now clear that:
- one registry is primary,
- one registry is at least provisionally an alias/projection surface,
- receipts are not the same thing as a report,
- and the report is not the same thing as the family proof.

At that point the next useful move is not another generic case note.
It is a provisional artifact determination rule.

That matters because it gives the family a default posture for later work on:
- witness refs,
- replay instructions,
- deliverables treatment,
- and public projection treatment.

## Current provisional static artifact determination

The current preferred V16 determination is:

1. primary registry surface
   `.engi/code-analysis-fact-registry.json`

2. alias/projection registry surface unless later work proves independent truth
   `.engi/static-heuristics-registry.json`

3. primary receipt-log surface
   `.engi/measurement-receipts.json`

4. report surface
   `.engi/static-measurement-report.json`

5. family-proof surface
   `.engi/static-measurement-proof.json`

6. likely future stage-domain contract surface
   `.engi/static-stage-domain-contract.json`

This is still provisional.
The point is to stop the family from silently flattening all static artifacts into one witness bucket before replay and witness closure are tightened.

## Why witness-materialization and replay closure are now next

After provisional artifact determination, the next pressure point is immediate.

Current source already:
- digests the family artifacts,
- names the family artifact paths,
- and exposes replay artifacts plus replay instructions.

But it still does not replay or witness the family at the same level of precision that the first two static cases now require.

That makes witness-materialization and replay closure the right next move because it forces V16 to answer:
- whether witness refs should remain receipt-only,
- whether report and proof are replay-critical family surfaces,
- and whether static-family replay is really distinct from verification-family receipt resolution.

## Current first-pass replay/witness direction for static-code-analysis

The current preferred direction is:

1. witness refs should represent registry/report/proof closure as well as receipt closure,
2. replay artifacts should include the report and family proof surfaces, not only registries and receipts,
3. replay instructions should reconstruct alias-role consistency as well as receipt closure,
4. static-family replay should stop depending on a mixed static-plus-verification receipt pass,
5. and tests should fail if any of those replay-critical static surfaces disappear.

This is still not the final family replay recipe.
It is the first point where the family has enough normalized structure to demand one.

## Why SCA is now complete enough to move on

SCA is now in the same drafting state that is sufficient for moving to the next family.

It now has:

1. a first family-boundary case,
2. a second artifact-role case,
3. a provisional artifact determination,
4. a first replay/witness direction,
5. and an expected/realized/family-closure split.

That does not mean SCA is finished in implementation.
It means the family is now complete enough in V16 drafting terms that later source work would not be guessing at its canonical shape.

So the next clean move is to open `verification-decisions` rather than keep elaborating SCA without a new failure class.

## Why verification-decisions is the next family

After SCA, the next adjacent family is `verification-decisions`.

It is the right next move because:
- SCA already feeds it receipt surfaces,
- V15 gives it a sharply stated family claim,
- and current runtime already materializes:
  - verification receipts,
  - verification decision surfaces,
  - verification report entries,
  - use tiers,
  - and branch-mode rights.

That means VD is already rich enough for the same matrix-first method.

## Early verification-decisions findings

The initial discovery pass already surfaced several strong issues:

1. V15 names five family members, but current report vocabulary still names only four.
   `verificationReport.verificationFamilies` lists:
   - `issuance`
   - `provenance`
   - `sufficiency`
   - `issuer-policy`

   It omits use-tier consequence even though current runtime clearly carries that surface.

2. `useTier` really is downstream of verification in code.
   `decideCandidateUseTier(...)` and `upgradeToSettlementEligible(...)` derive it using verification outputs only.

3. Current runtime already carries richer verification family truth than the witness grammar acknowledges.
   Verification receipts artifact emits both:
   - verification receipts,
   - and verification decision surfaces with `useTier` and `finalUseTier`.

4. The report layer already mixes family truth and downstream consequence truth.
   `verification-report.json` includes `useTier` and branch-mode `rights`, but current replay and witness structure do not yet make that distinction canonical.

5. Replay is currently thinner than the family artifact set.
   Replay artifacts include `.engi/verification-receipts.json` but omit `.engi/verification-report.json`.

## Why use-tier consequence closure is the first VD case

The first VD case should be use-tier consequence closure and family completeness.

That is the right first case because it asks whether the family is complete about its own stated scope before V16 expands anything else.

It is stronger than starting with witness flattening alone because:
- V15 already gives explicit family language,
- current source already proves `useTier` is verification-derived,
- and current artifacts already carry `useTier`, `finalUseTier`, and rights.

So the first VD move is to stop treating the fifth family member as implicit runtime truth only.

## Why decision-stage mapping and artifact-role closure are next for VD

After use-tier consequence closure, the next useful VD question is not yet a final family proof type.
It is the mapping and role question.

This is the right next case because current source already shows:
- five concrete `verification.*` stages,
- two emitted family artifacts,
- and richer decision-surface truth than current family summary vocabulary names.

So V16 needs to answer:
- which stage embodies use-tier consequence,
- how the five family members map to concrete stages,
- and what different truth `verification-receipts.json` and `verification-report.json` each own.

## Current second-pass VD findings

The second discovery pass already surfaced these concrete points:

1. The likely fifth runtime stage is `verification.determinisms.v15`.
   Current report entries include a fifth receipt ref beyond the four sub-check receipts, and that extra receipt is the determinisms stage.

2. The two verification artifacts are not redundant.
   `verification-receipts.json` owns raw receipts plus rich decision surfaces.
   `verification-report.json` owns per-asset report summaries, `useTier`, rights, and top-level family summary vocabulary.

3. Witness structure still flattens those differences away.
   The witness manifest names both artifacts but still uses receipt ids only for the family witness refs.

4. Replay is thinner than the emitted family surface.
   Replay includes `.engi/verification-receipts.json` but not `.engi/verification-report.json`, and replay instructions still do not have a verification-family-specific step.

## Current VD direction

VD now has enough structure to follow the same pattern as the earlier families.

The current direction is:

1. make the five-member family-to-stage mapping explicit,
2. distinguish receipt artifact truth from report artifact truth,
3. treat use-tier consequence as a first-class family member,
4. tighten witness and replay around both family artifacts rather than receipt ids only,
5. and then defer further source changes until later implementation work.

## Why selection-and-materialization is the next family

After VD, the next adjacent family is `selection-and-materialization`.

It is the right next move because:
- it is where verification and ranking consequences become material branch state,
- it already has multiple proof-bearing artifacts,
- V15 already gives it a first-class `SelectionConsistencyProof`,
- and it sits directly on the boundary between selected assets, source material, visibility, and later settlement consumption.

That makes it a strong next family for the same matrix-first method.

## Early selection-and-materialization findings

The initial discovery pass already surfaced several strong issues:

1. The family's primary proof object is under-materialized.
   `SelectionConsistencyProof` exists in V15 and current runtime, but there is no dedicated branch artifact path or deliverable for it.

2. Witness and replay treatment are thinner than the family surface.
   Witness refs include the selection-consistency proof hash, but witness artifact paths do not include a dedicated artifact, and replay omits lock, selected-source-material, visibility, and selection-consistency surfaces.

3. The family already emits several non-redundant surfaces with different truth:
   - lock,
   - selected source material,
   - exclusions,
   - visibility proof,
   - aggregate materialization proof,
   - selection consistency proof.

4. The family already carries branch-mode and settlement consequences explicitly.
   The proofs and manifests already encode:
   - selected assets respecting use tiers,
   - excluded assets with `materializationAllowed` and `settlementAllowed`,
   - settlement participants being a subset of selected assets,
   - and settlement consuming only settlement-eligible assets.

## Why selection-consistency proof materialization is the first SAM case

The first SAM case should be selection-consistency proof materialization and family completeness.

That is the right first case because it asks whether the family is materializing its own most explicit canonical proof object directly enough.

It is stronger than starting with generic artifact-role discussion because:
- V15 already gives the proof object a concrete structure,
- current runtime already computes it,
- and the current gap is a direct mismatch between canonical precision and artifact/replay reality.

So the first SAM move is to stop leaving the primary consistency proof mostly in bundle-and-hash space only.

## Current SAM direction

SAM now has enough structure to follow the same pattern as the earlier families.

The current direction is:

1. materialize the primary consistency proof as a first-class family surface,
2. distinguish lock/source/exclusion/visibility/materialization/selection-consistency roles explicitly,
3. tighten witness and replay around those primary family surfaces,
4. keep branch-mode and settlement consequences explicit inside the family,
5. and then defer source-side realization until later implementation work.

## Why authorization-and-sensitive-flow is the next family

After SAM, the next adjacent family is `authorization-and-sensitive-flow`.

It is the right next move because:
- it sits directly on the identity, principal, signer, and policy boundary,
- current runtime already materializes bindings, decisions, and sensitive-data-flow records separately,
- and current witness closure already shows a concrete omission against that richer family surface.

That makes it a strong next family for the same matrix-first method.

## Early authorization-and-sensitive-flow findings

The initial discovery pass already surfaced several strong issues:

1. The family's primary binding surface is undernamed in witness structure.
   `.engi/identity-bindings.json` is a required branch artifact and is digested by the witness manifest, but the family witness artifact paths omit it.

2. Current runtime already models two distinct proof objects inside the family.
   `IdentityAuthorizationProof` and `SensitiveDataFlowProof` carry different truth and should not be treated as one undifferentiated private-proof layer.

3. The family already spans two policy-bearing subpaths.
   One subpath is identity, principal, authorization, signer, and asset-auth-root closure.
   The other is data classification, retention/disclosure-policy assignment, and sensitive-data-flow closure.

4. Replay is thinner than the family artifact set.
   Current replay omits `.engi/identity-bindings.json`, `.engi/authorization-decisions.json`, and `.engi/sensitive-data-flow.json`.

## Why identity-bindings materialization is the first AASF case

The first AASF case should be identity-bindings materialization and family completeness.

That is the right first case because it asks whether the family is naming its own principal-binding surface directly enough before V16 tries to refine the policy and flow side.

It is stronger than starting with generic role discussion because:
- V15 already explicitly names principals,
- current runtime already computes identity-authorization proof from bindings,
- and the current gap is a direct mismatch between emitted family surfaces and witness-family naming.

So the first AASF move is to stop letting principal/binding truth remain undernamed in family witness closure.

## Current AASF direction

AASF now has enough structure to follow the same pattern as the earlier families.

The current direction is:

1. make identity bindings a first-class named family surface,
2. distinguish principal/binding truth from authorization-decision truth,
3. distinguish both of those from sensitive-data-flow policy truth,
4. tighten witness and replay around all three primary family artifacts,
5. and then defer source-side realization until later implementation work.

## Why settlement-source-to-shares is the next family

After AASF, the next adjacent family is `settlement-source-to-shares`.

It is the right next move because:
- it is the first theorem-heavy proof family after the earlier proof-surface families,
- current runtime already materializes multiple exactness-bearing artifacts,
- and the witness/replay story already shows a concrete mismatch between settlement-proof and journal-completeness closure.

That makes it a strong next family for the same matrix-first method.

## Early settlement-source-to-shares findings

The initial discovery pass already surfaced several strong issues:

1. The family carries two distinct proof-bearing closure objects that are not yet represented cleanly together.
   `JournalCompletenessProof` and `SettlementProof` own different truth.

2. Family witness closure currently mismatches its own artifact set.
   Witness artifact paths include `.engi/settlement-proof.json`, but witness refs omit `settlementProof.proofHash`.

3. Journal-completeness proof is still under-materialized.
   It exists as a runtime proof object but has no dedicated branch artifact.

4. Replay is thinner than the family surface.
   Current replay mentions source-to-shares clipping, normalization, and allocation, but omits explicit settlement-proof and journal-completeness replay steps.

5. The family already emits several non-redundant artifacts:
   - source-to-shares,
   - settlement participation,
   - accounting precision,
   - journal diff,
   - settlement proof.

## Why settlement-proof versus journal-completeness is the first SSTS case

The first SSTS case should be settlement-proof versus journal-completeness witness closure.

That is the right first case because it asks whether the family materially distinguishes its two strongest proof-bearing subpaths before V16 refines the rest of settlement role closure.

It is stronger than starting with generic artifact-role discussion because:
- V15 already names both journal and settlement proof surfaces,
- current runtime already computes both proof objects,
- and the current gap is a direct mismatch between witness refs, witness paths, and emitted artifacts.

So the first SSTS move is to stop letting journal closure and theorem closure remain only partially aligned in witness and replay space.

## Current SSTS direction

SSTS now has enough structure to follow the same pattern as the earlier families.

The current direction is:

1. make journal closure and settlement theorem closure explicit subpaths,
2. distinguish source-to-shares, participation, accounting precision, journal, and theorem roles explicitly,
3. tighten witness and replay around all primary family artifacts,
4. keep zero-credit participation and exact allocation explicit inside the family,
5. and then defer source-side realization until later implementation work.

## Why disclosure-boundary is the next family

After SSTS, the next adjacent family is `disclosure-boundary`.

It is the right next move because:
- it is the canonical public/private proof boundary family,
- current runtime already emits all four named family artifacts,
- and the witness layer already shows a concrete omission against that explicit family membership.

That makes it a strong next family for the same matrix-first method.

## Early disclosure-boundary findings

The initial discovery pass already surfaced several strong issues:

1. The family's bounded-public member is undernamed in witness structure.
   `.engi/bounded-public-proof.json` is required, emitted, and digested, but the family witness artifact paths omit it.

2. Current runtime already emits four non-redundant disclosure-family artifacts.
   Projection policy, bounded-public proof, redaction proof, and disclosure proof each own different truth.

3. Witness refs currently flatten the family to bounded-public hashes only.
   That obscures the role split the runtime already models.

4. Replay is thinner than the family surface.
   Current replay omits all disclosure-family artifacts and has no disclosure-family-specific replay step.

## Why bounded-public-proof materialization is the first disclosure case

The first disclosure case should be bounded-public-proof materialization and family completeness.

That is the right first case because it asks whether the family names its own most distinctive bounded-public member directly enough before V16 refines the rest of the disclosure role split.

It is stronger than starting with generic artifact-role discussion because:
- V15 already names bounded-public proof explicitly,
- current runtime already emits the artifact,
- and the current gap is a direct mismatch between family definition and family witness naming.

So the first disclosure move is to stop letting bounded-public proof remain only an indirect hash anchor in family witness closure.

## Current disclosure direction

Disclosure-boundary now has enough structure to follow the same pattern as the earlier families.

The current direction is:

1. make bounded-public proof a first-class named family surface in witness and replay closure,
2. distinguish projection policy, bounded-public proof, redaction proof, and disclosure proof explicitly,
3. tighten witness and replay around all four primary family artifacts,
4. keep disclosure-boundary distinct from authorization-family policy assignment,
5. and then defer source-side realization until later implementation work.

## Why proof-contract is the next family

After disclosure-boundary, the next adjacent family is `proof-contract`.

It is the right next move because:
- it is the cross-family closure family,
- current runtime already computes a distinct proof contract plus a system proof bundle and witness manifest,
- and the family grammar currently undernames all of that except the bundle.

That makes it the right last family for the same matrix-first method before theorem and appendix work.

## Early proof-contract findings

The initial discovery pass already surfaced several strong issues:

1. The proof contract itself is under-materialized.
   Current runtime computes `proofContract`, but there is no dedicated `.engi/proof-contract.json` artifact.

2. The family witness layer is far too thin for what the family claims to bind.
   Witness artifact paths name only `.engi/system-proof-bundle.json`, and witness refs are only `proofContract.contractId` plus `settlementProof.assetPackLockHash`.

3. The witness manifest is adjacent but not yet visibly inside family closure.
   `.engi/proof-witness-manifest.json` is required and emitted, but the family witness artifact paths omit it.

4. Replay is thinner than the family's own closure artifacts.
   Current replay omits the system proof bundle, proof-witness-manifest, and any proof-contract artifact.

5. The family already spans several non-redundant closure surfaces:
   - proof contract,
   - evidence chain,
   - theorem checks,
   - system proof bundle,
   - witness-manifest closure.

## Why proof-contract materialization is the first proof-contract case

The first proof-contract case should be proof-contract materialization and bundle-only carriage.

That is the right first case because it asks whether the family names its own contract surface directly enough before V16 refines the rest of cross-family closure structure.

It is stronger than starting with theorem catalog discussion because:
- V15 already names proof contract explicitly,
- current runtime already computes the object,
- and the current gap is a direct mismatch between family definition and artifact/witness reality.

So the first proof-contract move is to stop leaving the proof contract in bundle-only carriage.

## Current proof-contract direction

Proof-contract now has enough structure to follow the same pattern as the earlier families.

The current direction is:

1. make proof contract a first-class family surface rather than bundle-only carriage,
2. distinguish proof contract, evidence chain, theorem checks, system proof bundle, and witness-manifest closure explicitly,
3. tighten witness and replay around those primary family surfaces,
4. keep proof-contract family replay distinct from any one underlying proof family,
5. and then defer source-side realization until later implementation work.

## Current family-pass state

All nine V15 proof families are now opened in V16 drafting at the same broad closure level:
- family-specific cases,
- artifact and witness/replay direction,
- expected versus realized versus family-closure split,
- member-coverage inventory,
- member-closure criteria,
- theorem-binding and proof-shape direction,
- and theorem-by-theorem closure reading tied to realized source theorem ids.

The next work after this family pass is not to open more families.
It is to translate this audited family layer into source-side implementation completion and proof execution, and then use that tightened runtime surface to implement `_PROVEN_` appendix generation and broader proof-program inventory.

The current audit conclusion is:

1. every V15 proof family now has an explicit member inventory in the spec and parity matrix,
2. every family member now also has explicit closure criteria and ratchetable debt language,
3. every family now has a realized theorem catalog and theorem-by-theorem closure reading aligned to current source,
4. source-side theorem/proof execution tightening is now strong enough to support generated appendix work,
5. `_PROVEN_` can now be specified as a generated-only canonical artifact rather than a deferred concept,
6. and the generator plus canonical-commit regeneration ratchet can now be treated as realized source/process behavior rather than as a next-step note.

## `_PROVEN_` interpretation

The correct V16 reading for `_PROVEN_` is now:

1. `_PROVEN_` is a canonical generated appendix, not a hand-maintained markdown note,
2. it must render directly from proof-bearing runtime surfaces,
3. it must never be edited manually,
4. it must be regenerated when a commit takes on canonical-version authority,
5. and the regenerated file must be committed in the same canonical version commit.

The important operational consequence is:

1. `_PROVEN_` is not part of everyday drift churn,
2. `_PROVEN_` is part of canonical version materialization,
3. and a canonical version commit without regenerated `_PROVEN_` should be treated as incomplete.
