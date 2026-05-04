# Bitcode Need Comprehension Agent

## V26 Boundary

`@bitcode/generic-agents-need-comprehension` is the PTRR agent owner for Bitcode setup-phase Need comprehension.
It composes the callable tools from `@bitcode/generic-tools-need-comprehension`; it does not redefine those tool contracts.

The package exists because Need comprehension is agentic phase work, not a generic-tool package by itself.
Its canonical fifth-gate role is `setup` / `pre-danger-wall`: synthesize a reviewable, source-bearing Need model before Bitcode risk admission decides whether the run can continue.

## Encapsulation

- `packages/generic-tools/need-comprehension` owns DocCode tool prompts, callable tool classes, pure primitives, and schemas.
- `packages/generic-agents/need-comprehension` owns the PTRR orchestration prompt, step prompts, input/output schema, and tool composition.
- `packages/pipelines/asset-pack` keeps only a pipeline-local adapter that stores setup-phase results under Bitcode Need and written-asset fields.
- `packages/generic-agents/danger-wall` remains the next setup-phase agent and consumes the Need-comprehension output for risk admission.

## Agent Contract

`bitcodeSetupNeedComprehensionAgent`:

- Plans how to understand the expressed Need, attachments, repository context, AssetPack expectation, proof needs, delivery-mechanism boundary, and source-to-shares service questions.
- Uses Need-comprehension tools to analyze semantics, extract requirements, identify constraints, generate satisfaction criteria, validate the model, and estimate implementation complexity.
- Refines ambiguity before risk admission rather than allowing danger-wall to infer canonical Need meaning.
- Emits active Bitcode fields: `need`, `writtenAssetTypes`, `assetPackContext`, `deliveryMechanismBoundaries`, `sourceToSharesServiceQuestions`, `commercialAccountability`, and `needSatisfactionCriteria`.

## Verification

The active V26 proof family checks this package through:

- `protocol-demonstration/test/v26-need-comprehension-reform.test.js`
- `protocol-demonstration/test/v26-prompt-system-boundary.test.js`
- `protocol-demonstration/test/v26-inference-implementation-records.test.js`
- `.bitcode/inference-implementation-records-proof.json`
- `.bitcode/prompt-space-completeness-proof.json`
