# ENGI Spec V9

Status: draft
Scope: ENGI v1 / V9 upgrade draft
Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` remains `V8` until V9 is explicitly promoted
Baseline: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V8.md`

---

# 1. Executive summary

V9 is the **finality-closure** spec.

V8 made ENGI substantially inspectable:
- prompt surfaces became first-class,
- score groups became inspectable,
- proof closure became explicit,
- identity / authorization / signer separation became visible,
- external boundaries became concretized,
- exact-accounting settlement became legible,
- and the local demo became strong enough to communicate the real system shape.

V9 keeps that shape.
V9 does **not** redesign ENGI.
V9 turns the remaining “shape is correct but the implementation is not yet final enough” surfaces into conformance-critical requirements.

The central V9 rule is:

> If V8 already introduced an artifact, surface, proof object, or contract because it mattered conceptually, then V9 requires that surface to be operationally trustworthy rather than merely structurally present.

Concretely, V9 upgrades:
1. prompt/context completeness from visible to validated,
2. static measurement from modeled to executed,
3. verification from structured claims to receipt-backed decisions,
4. proof closure from assembled to witness-complete,
5. privacy from classified to enforced at projection/export boundaries,
6. settlement/accounting from exact after normalization to exact across the full transacting chain,
7. scenario/test posture from narrow seeded-demo confidence to realistic GitHub-shaped stress confidence.

---

# 2. Why V9 exists

A source-faithful audit of the current canonical V8 demo shows that the remaining weaknesses are mostly **finality gaps**, not architecture failures.

The strongest current V8 gaps are:
- prompt surfaces exist, but prompt/context completeness is not validated,
- static measurement contracts exist, but static-analysis programs are not actually executed,
- verification surfaces are structured, but not receipt-backed,
- proof bundle shape is strong, but some proof claims are weaker than they should be,
- confidentiality classes exist, but public/API projections are not yet fully policy-enforced,
- downstream accounting is exact, but upstream contribution derivation still depends on floating-point scoring,
- tests are strong for seeded deterministic flows, but not yet broad enough for realistic GitHub engineering input shapes.

V9 exists to close those gaps without weakening V8’s strengths.

---

# 3. Source-of-truth and versioning rule

V9 preserves the ENGI versioning rule:
- each new spec version is written as a new versioned file,
- previous versions remain in place,
- `ENGI_SPEC.txt` is the only canonical pointer,
- the local demo’s canonical implementation does not need embedded stale version numbers in primary file names.

Therefore:
- V9 lives in `ENGI_SPEC_V9.md`,
- V8 remains canonical until explicitly promoted,
- implementation work may begin against V9 while the pointer remains on V8.

---

# 4. Normative language

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHOULD**, **SHOULD NOT**, and **MAY** are to be interpreted as normative requirements for V9 conformance.

---

# 5. Conformance profiles

## 5.1 Profile A — local deterministic V9 prototype

Profile A remains the local deterministic repository-contained prototype.

Profile A MAY still stand in for external systems such as:
- real GitHub App auth,
- live workflow fetches,
- external vector stores,
- remote model execution,
- production signer verification,
- networked settlement.

However, Profile A MUST NOT use stand-ins where V9 explicitly requires local closure. In particular, Profile A MUST provide real local implementations for:
- prompt/context completeness validation,
- static-measurement receipts for the local static pipeline,
- policy-enforced projection/redaction within the local app,
- proof witness completeness for claims the local demo says it proves,
- broader fixture/test coverage for local deterministic conformance.

## 5.2 Profile B — external production-boundary intent

Profile B remains the production-boundary profile.

Profile B MAY leave external systems unimplemented inside the local demo, but the boundary contracts MUST remain concrete, schema-compatible, and upgradable from the stronger V9 receipt/proof/artifact surfaces.

---

# 6. Finality-gap model

V9 introduces a formal category of implementation debt:

```ts
type FinalityGap = {
  gapId: string
  surface: string
  gapClass:
    | 'modeled-not-executed'
    | 'present-not-validated'
    | 'classified-not-enforced'
    | 'proof-shaped-not-witness-complete'
    | 'exact-downstream-not-upstream'
    | 'seeded-not-realistic'
  v8ShapePresent: boolean
  v8ImplementationFinal: boolean
  closureRequirement: string
  closureArtifacts: string[]
}
```

A V9 implementation SHOULD maintain an explicit finality-gap inventory.

A V9 implementation claiming closure for a surface MUST be able to show:
1. the surface artifact,
2. the underlying producing mechanism,
3. the receipts/witnesses that justify it,
4. the tests/fixtures that stress it.

---

# 7. Core V9 pipeline

V9 preserves the V8 pipeline structure:
1. need measurement,
2. prompt/evaluator surfacing,
3. recall,
4. ranking,
5. verification / use-tier gating,
6. asset-pack assembly,
7. branch artifact materialization,
8. settlement,
9. bounded public proof.

The V9 change is that each stage now has stronger conformance obligations.

---

# 8. Need measurement

## 8.1 V8 carried forward
V9 preserves:
- canonical GitHub-bound benchmark evidence,
- fail-closed parser normalization,
- explicit derivation closure,
- prompt surfaces for inferred need fields,
- recall-channel contracts,
- signal-lifecycle visibility.

## 8.2 Measurement classes

Every measured need field MUST declare a measurement class:

```ts
type NeedMeasurementClass =
  | 'static-executed'
  | 'inferred-derived'
  | 'hybrid-composed'
```

Every need field MUST also declare whether it is:
- copied,
- normalized,
- inferred,
- composed,
- or policy-derived.

## 8.3 Required V9 upgrades

1. Every prompt/interpolation placeholder MUST be completeness-checked against declared context inputs.
2. Every declared context input MUST either:
   - appear in the static prompt template,
   - appear in the output derivation contract,
   - or be explicitly marked as non-rendered but contractually injected context.
3. Every inferred need field MUST carry:
   - template hash,
   - context hash,
   - evidence-ref digest,
   - output-field binding.
4. Every static need field MUST carry:
   - source parser/tool receipt,
   - normalized output envelope,
   - replay input closure.
5. Any stand-in need field in Profile A MUST be explicitly marked as a stand-in rather than silently emitted as if it were execution-backed.

## 8.4 Required V9 artifacts
- `.engi/need-measurement.json` (expanded)
- `.engi/prompt-contracts.json`
- `.engi/measurement-receipts.json`

---

# 9. Prompt and evaluator contracts

## 9.1 V8 carried forward
V9 preserves:
- prompt surfaces as first-class artifacts,
- explicit interpolation,
- context lineage,
- downstream artifact bindings.

## 9.2 V9 upgrade
If a stage is inferred or hybrid and materially affects:
- need measurement,
- ranking,
- verification,
- selection,
- privacy/disclosure decisions,
- or proof claims,

then the implementation MUST surface either:
1. a full prompt/evaluator contract, or
2. a deterministic evaluator contract with receipts proving why a prompt surface is unnecessary.

## 9.3 Prompt completeness contract

```ts
type PromptContract = {
  promptId: string
  templateVersion: string
  templateHash: string
  contextSchemaHash: string
  outputSchemaHash: string
  placeholderSet: string[]
  declaredContextFields: string[]
  nonRenderedContextFields: string[]
  unusedContextFields: string[]
  missingPlaceholderBindings: string[]
  evidenceRefDigest: string
  downstreamArtifactBindings: string[]
}
```

A prompt surface is V9-conformant only if:
- `missingPlaceholderBindings.length === 0`,
- every required context field is either rendered or explicitly non-rendered,
- the prompt contract hashes are stable and replayable,
- the inferred outputs are bound to output schemas.

## 9.4 V9 required expansion
V9 requires prompt/evaluator surfaces for:
- inferred need-field derivation,
- any future evaluator substitution that is not strictly deterministic-static,
- any hybrid scoring or verification stage that consumes prompt-like context assembly,
- any proof claim that depends on inferred synthesis.

---

# 10. Static measurement execution

## 10.1 V8 carried forward
V9 preserves the V8 distinction between:
- static measurement,
- inferred measurement,
- hybrid composition.

## 10.2 V9 upgrade
Static measurement MUST become an execution-backed subsystem rather than a metadata-only stand-in.

## 10.3 Static evaluator families
A conforming V9 implementation MUST define one or more static evaluator families for at least:
- parser-backed benchmark normalization,
- repo static measurement,
- asset static measurement,
- verification static measurement.

## 10.4 Static execution receipt

```ts
type StaticExecutionReceipt = {
  receiptId: string
  evaluatorId: string
  toolId: string
  toolVersion: string
  argv: string[]
  workingDirectoryRef: string
  inputRefs: string[]
  outputRefs: string[]
  stdoutDigest?: string
  stderrDigest?: string
  exitCode: number
  timeoutMs: number
  producedMeasurements: string[]
  replayable: boolean
}
```

Every static evaluator result that materially affects need measurement, verification, or proof MUST be traceable to at least one `StaticExecutionReceipt` unless explicitly exempted by profile boundary rules.

## 10.5 Static heuristics registry

```ts
type StaticHeuristicRegistryEntry = {
  heuristicId: string
  signalFamily:
    | 'symbol'
    | 'path'
    | 'config-key'
    | 'stack'
    | 'constraint'
    | 'diagnostic'
    | 'api-shape'
    | 'migration-touchpoint'
    | 'proof-artifact'
    | 'privacy-sensitive-surface'
    | 'ownership-boundary'
  producers: string[]
  storedIn: string[]
  consumedBy: string[]
  requiredForProfiles: ('A' | 'B')[]
}
```

If a heuristic family is gathered but not consumed, the implementation MUST either:
- declare it intentionally unused,
- or fail debug coverage checks.

## 10.6 Required V9 artifacts
- `.engi/static-measurement-report.json`
- `.engi/static-heuristics-registry.json`
- `.engi/measurement-receipts.json`

---

# 11. Candidate recall and match making

## 11.1 V8 carried forward
V9 preserves the V8 recall-channel families:
- semantic/vector task search,
- semantic/vector failure-mode search,
- semantic/vector technical-context search,
- lexical search,
- symbol search,
- path search,
- config-key search,
- artifact kind/type filtered search.

## 11.2 V9 upgrade
Every recall and scoring signal family MUST be:
- declared in the heuristic/evaluator inventory,
- traced into downstream ranking/selection usage,
- and test-covered under realistic fixture shapes.

## 11.3 Required V9 rules
1. Every signal family used in ranking MUST record whether it came from:
   - executed static measurement,
   - inferred synthesis,
   - hybrid composition.
2. Every need-match subscore MUST declare which signal families it consumed.
3. Path/config/symbol/stack/constraint scoring SHOULD be independently auditable rather than hidden inside generic “alignment” shortcuts.
4. Match-making outputs SHOULD expose which collected signals materially changed the ranking order.

---

# 12. Verification determinisms and use tiers

## 12.1 V8 carried forward
V9 preserves the separation of:
- ranking,
- issuance verification,
- provenance verification,
- verification sufficiency,
- issuer policy,
- use-tier derivation.

## 12.2 V9 upgrade
Verification MUST become receipt-backed in the same way static measurement becomes receipt-backed.

## 12.3 Verification receipt

```ts
type VerificationReceipt = {
  receiptId: string
  verificationFamily:
    | 'issuance'
    | 'provenance'
    | 'verification-sufficiency'
    | 'issuer-policy'
  evidenceRefs: string[]
  executionReceiptRefs: string[]
  decision: string
  reasons: string[]
}
```

## 12.4 Required V9 rules
1. Verification evidence MUST distinguish:
   - claimed evidence,
   - measured evidence,
   - externally verified evidence,
   - policy-derived ceilings.
2. Verification sufficiency SHOULD record which missing receipts or failed checks cap the use tier.
3. Use-tier gating MUST remain strictly separated from ranking score.

---

# 13. Asset pack assembly and branch materialization

## 13.1 V8 carried forward
V9 preserves:
- asset-pack locking,
- unit locking,
- selected-source-material manifests,
- branch-mode gating,
- source-material materialization.

## 13.2 V9 upgrade
Asset-pack materialization MUST prove visibility and disclosure compliance rather than assert it implicitly.

## 13.3 Required V9 rules
1. Every materialized asset MUST have visibility proof inputs.
2. Every branch artifact MUST be derivably classifiable against disclosure policy.
3. Any asset or unit excluded for policy or visibility reasons SHOULD be recorded in a materialization exclusion manifest.

## 13.4 Required V9 artifacts
- `.engi/materialization-proof.json`
- `.engi/materialization-exclusions.json`

---

# 14. Privacy, disclosure, and projection enforcement

## 14.1 V8 carried forward
V9 preserves:
- sensitive-data classes,
- authorization decisions,
- policy releases,
- bounded public proof concept,
- private-by-default remediation branch semantics.

## 14.2 V9 upgrade
Projection safety becomes part of conformance.

A system that classifies privacy correctly but leaks private fields in public/API projections is **not** V9-conformant.

## 14.3 Projection policy

```ts
type ProjectionPolicy = {
  projectionId: string
  principalClass: string
  allowedArtifactClasses: string[]
  deniedArtifactClasses: string[]
  allowedFields: string[]
  deniedFields: string[]
}
```

## 14.4 Required V9 rules
1. Public/API state projections MUST be principal-scoped.
2. Private branch artifacts MUST NOT appear in public projections.
3. Bounded public proof MUST be emitted as a distinct explicit artifact.
4. Redaction/disclosure decisions MUST be provable.
5. The implementation MUST distinguish:
   - private branch state,
   - reviewer-visible state,
   - buyer-visible state,
   - bounded public proof metadata.

## 14.5 Required V9 artifacts
- `.engi/projection-policy.json`
- `.engi/bounded-public-proof.json`
- `.engi/redaction-proof.json`
- `.engi/disclosure-proof.json`

---

# 15. Settlement, journaling, and accounting precision

## 15.1 V8 carried forward
V9 preserves:
- exact micro-unit allocation,
- debit/credit conservation,
- state-root hashing,
- journal diffs,
- settlement preview surfaces,
- asset-pack lock binding,
- explicit selected vs settlement-participating distinction.

## 15.2 V9 upgrade
Precision MUST close across the **entire** transacting chain, not merely after basis-point normalization.

## 15.3 Required V9 rules
1. Contribution mass derivation SHOULD be fixed-point or rational rather than floating-point.
2. If non-positive marginal contribution is clipped, that clipping MUST be receipt-backed and surfaced explicitly.
3. Every settlement allocation MUST identify whether the asset was:
   - selected,
   - settlement-participating,
   - positively credited,
   - zero-credit participating,
   - excluded from settlement.
4. Tie-break behavior MUST be replayable and explicitly recorded.
5. Zero-credit participation MUST be explicitly legal, illegal, or profile-scoped, never merely accidental.

## 15.4 Settlement participation record

```ts
type SettlementParticipationRecord = {
  assetId: string
  selected: boolean
  settlementParticipating: boolean
  credited: boolean
  rawContributionMass: string
  clippedMassReason?: string
  rawShareBp: number
  settledShareBp: number
  creditedMicroUnits: string
}
```

## 15.5 Required V9 artifacts
- `.engi/settlement-participation.json`
- `.engi/accounting-precision-report.json`

---

# 16. Proof model and proof bundle closure

## 16.1 V8 carried forward
V9 preserves:
- proof contract,
- system proof bundle,
- settlement proof,
- identity/auth proof,
- sensitive-data-flow proof,
- asset measurement proofs,
- bounded public proof concept.

## 16.2 V9 upgrade
Every proof object MUST become witness-complete rather than metadata-complete.

## 16.3 Required V9 rules
1. No proof field MAY be hardcoded as true without witness inputs.
2. Every proof-relevant artifact SHOULD have a digest entry in a proof witness manifest.
3. Prompt completeness, static-measurement replayability, materialization visibility, and disclosure redaction SHOULD each have dedicated proof objects.
4. The system proof bundle SHOULD include a verifier entrypoint contract or replay instructions.

## 16.4 Required V9 artifacts
- `.engi/proof-witness-manifest.json`
- `.engi/prompt-completeness-proof.json`
- `.engi/static-measurement-proof.json`
- `.engi/materialization-visibility-proof.json`
- `.engi/disclosure-proof.json`

---

# 17. Scenarios, fixtures, and test posture

## 17.1 V8 carried forward
V9 preserves the requirement that important artifacts and invariants be tested.

## 17.2 V9 upgrade
V9 requires realistic GitHub-shaped fixture coverage and adversarial scenario diversity.

## 17.3 Required scenario families
A V9 implementation SHOULD maintain scenario families covering at least:
- monorepo auth rollback,
- proof-heavy Rust patching,
- config-policy incident response,
- code review / unsafe patch correction,
- infra / deployment-state mismatch,
- polyglot repo benchmark remediation,
- malformed GitHub artifact / parser failure,
- forged or restricted issuer assets,
- privacy boundary stress cases,
- many-asset settlement normalization/tie cases.

## 17.4 Required fixture families
A V9 fixture corpus SHOULD include:
- GitHub workflow run envelopes,
- check suites,
- artifact manifests,
- parser outputs,
- repo trees,
- code snippets,
- diagnostic outputs,
- expected public/private projections.

## 17.5 Required V9 artifacts
- `.engi/scenario-fixture-manifest.json`
- `.engi/test-coverage-report.json`

---

# 18. Required V9 artifact additions

V9 keeps the V8 branch artifact set and adds the following where the corresponding surfaces are claimed:

- `.engi/prompt-contracts.json`
- `.engi/measurement-receipts.json`
- `.engi/static-measurement-report.json`
- `.engi/static-heuristics-registry.json`
- `.engi/materialization-proof.json`
- `.engi/materialization-exclusions.json`
- `.engi/projection-policy.json`
- `.engi/bounded-public-proof.json`
- `.engi/redaction-proof.json`
- `.engi/disclosure-proof.json`
- `.engi/settlement-participation.json`
- `.engi/accounting-precision-report.json`
- `.engi/proof-witness-manifest.json`
- `.engi/prompt-completeness-proof.json`
- `.engi/static-measurement-proof.json`
- `.engi/materialization-visibility-proof.json`
- `.engi/scenario-fixture-manifest.json`
- `.engi/test-coverage-report.json`

An implementation MAY collapse some of these into larger manifests only if:
- they remain separately queryable,
- proof/witness relationships remain explicit,
- auditability is not weakened.

---

# 19. Conformance gates for V9 promotion

A local demo SHOULD NOT be considered V9-promotable until all of the following are true:

1. prompt/context completeness validation exists and fails correctly on mismatches,
2. static measurement execution produces real receipts for Profile A local measurement stages,
3. heuristic registry + consumption audit is present,
4. verification is receipt-backed,
5. public/API projection is policy-enforced,
6. proof bundle includes witness manifests and no hardcoded proof booleans remain,
7. settlement precision closure is replayable without floating-point ambiguity in critical accounting paths,
8. scenario/fixture corpus materially exceeds the single seeded happy path,
9. tests cover malformed GitHub inputs, privacy boundaries, issuer-policy edges, and multi-asset accounting stress.

---

# 20. Implementation order recommendation

1. prompt/context completeness validation
2. projection/disclosure enforcement
3. static measurement execution receipts
4. heuristic registry + consumption audit
5. verification receipts
6. proof witness expansion
7. fixed-point contribution accounting
8. scenario/fixture corpus and adversarial coverage
9. Profile B contract refresh where needed

---

# 21. Final locked decisions for this V9 draft

1. V9 is not a redesign; it is the finality-closure version.
2. Prompt surfaces remain first-class, but now require completeness validation.
3. Static measurement must become execution-backed.
4. Privacy/disclosure classes must drive actual projections and exports.
5. Proof bundles must become witness-complete, not merely artifact-complete.
6. Settlement precision must become exact across the full transacting chain, not only after downstream normalization.
7. Scenario/test posture must move from seeded-demo confidence to realistic GitHub-shaped stress confidence.
8. V8 remains the canonical pointer until V9 is explicitly promoted.

---

# APPENDIX A — V9 upgrade matrix from current V8 implementation

| Area | Current V8 state | V9 closure target |
|---|---|---|
| Prompt surfaces | present and inspectable | completeness-validated and receipt-bound |
| Static measurement | contracted and heuristically extracted | real executed static evaluators with receipts |
| Heuristic usage | partially visible | fully inventoried, consumed, and coverage-audited |
| Verification evidence | structured booleans + policy outputs | receipt-backed verification families |
| Privacy/projection | classified in artifacts | enforced in actual public/API projections |
| Settlement/accounting | exact allocation, float-derived contribution mass | fixed-point/rational end-to-end precision |
| Proof bundle | structurally strong | witness-complete and replay-verifiable |
| Scenarios/tests | seeded deterministic coverage | realistic GitHub-shaped fixture corpus + adversarial coverage |

---

# APPENDIX B — Concrete V9 implementation-driving questions

The following questions MUST be answerable after V9 closure:

1. For every prompt surface, can the operator prove that all template placeholders and context injectables are complete and correctly bound?
2. For every static measurement, can the operator show the exact execution receipt and normalized output contract?
3. For every heuristic gathered, can the operator show where it is consumed in need measurement, recall, ranking, verification, or proof?
4. For every proof claim, can the operator show the witness inputs rather than only the assembled artifact?
5. For every projected/public artifact, can the operator prove that private fields are redacted by policy rather than merely absent by convention?
6. For every settlement event, can the operator replay contribution, normalization, allocation, and journal invariants without floating-point ambiguity?
7. For every scenario family, can the implementation withstand realistic GitHub workflow/input variations and malformed cases?
