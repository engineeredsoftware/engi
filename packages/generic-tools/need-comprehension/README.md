# Need Comprehension Compatibility Tools

## V26 Posture

`@bitcode/generic-tools-need-comprehension` is the canonical retained generic-tool package for Bitcode need comprehension.
The package path and package name are canonical Bitcode tool owners; task-named classes and input fields remain compatibility wrappers for bounded callers only.
Bitcode does not have tasks as canonical product semantics.
Every remaining task-named class, prompt, or input in this corridor is compatibility residue only and must not be treated as active Bitcode ontology.

This package must not define an independent task-first product model.
It is a prompt-bearing callable tool reservoir, not the setup-phase agent.
It accelerates Bitcode inference when it maps every compatibility entry point onto canonical concepts:

- `need`: the expressed target the Bitcode run must satisfy.
- `written asset`: a source-bearing or third-party-facing artifact synthesized from the run.
- `asset pack`: the Bitcode-owned structure that groups the stable output and evidence.
- `delivery mechanism`: a connected-interface wrapper such as a pull request or Jira comment.
- `need satisfaction criteria`: measurable acceptance and verification conditions.

The package remains integrated with Bitcode's prompt primitives architecture through `DocCodeToolPrompt`, `PromptPart`, and raw promptparts exposed through the public `@bitcode/prompts/raw_promptparts/*` boundary.
This package source is TypeScript-only; generated JavaScript artifacts must be emitted outside `src/` by the build system and must never become specification or proof evidence for this corridor.

Canonical code owners now live in individually defined tool files: `AnalyzeNeedSemanticsTool`, `ExtractNeedRequirementsTool`, `IdentifyNeedConstraintsTool`, `GenerateNeedSatisfactionCriteriaTool`, `ValidateNeedComprehensionTool`, and `AnalyzeNeedSatisfactionImplementationComplexityTool`.
`NeedComprehensionToolset` is only the collection surface used by agents and registries.
Pure behavior and validation remain in `need-comprehension-primitives` and `need-comprehension-schemas`.
The retained task-named tool, primitive, prompt, and schema files remain compatibility wrappers only and must not regain ownership of active Bitcode behavior.

The PTRR agent that composes these tools during setup lives in `@bitcode/generic-agents-need-comprehension`.
That agent runs before `@bitcode/generic-agents-danger-wall`, emits the reviewable Need model, and passes risk-admission inputs downstream.

## Compatibility Mapping

| Retained name | V26 interpretation |
| --- | --- |
| `task_description` | compatibility carrier for `expressedNeed` |
| `task_comprehension` | compatibility carrier for `needComprehension` |
| `analyzeTaskSemanticsTool` | compatibility API for need semantic analysis |
| `extractRequirementsTool` | compatibility API for written-asset and proof requirement extraction |
| `identifyConstraintsTool` | compatibility API for need, repository, proof, and delivery-mechanism constraints |
| `generateSuccessCriteriaTool` | compatibility API for need satisfaction criteria |
| `validateTaskComprehensionTool` | compatibility API for need-comprehension validation |
| `analyzeImplementationComplexityTool` | compatibility API for asset-pack implementation complexity |

## Tool Surfaces

### `analyzeTaskSemanticsTool`

Accepts a retained `task_description` and optional `context_information`.
The runtime interpretation is `expressedNeed` plus context.
Expected output includes:

- `need.expressed_need`
- `need.primary_intent`
- `semantic_analysis.scope_boundaries`
- `written_asset_expectations`
- `asset_pack_context`
- `delivery_mechanism_boundaries`
- `task_classification` compatibility metadata

### `extractRequirementsTool`

Extracts explicit and implied requirements from the expressed need and semantic analysis.
Requirements must identify whether they constrain stable written assets, proof evidence, product interfaces, persistence, or delivery mechanisms.

Expected output includes:

- `need_requirements`
- `functional_requirements`
- `non_functional_requirements`
- `proof_requirements`
- `interface_requirements`
- `written_asset_requirement_map`
- `extraction_metadata`

### `identifyConstraintsTool`

Identifies constraints that govern need satisfaction.
The tool must distinguish repository/package constraints from connected-interface delivery-mechanism constraints.

Expected output includes:

- `technical_constraints`
- `business_constraints`
- `proof_constraints`
- `interface_constraints`
- `constraint_analysis`

### `generateSuccessCriteriaTool`

Generates measurable criteria for when written assets and their evidence satisfy the expressed need.
Criteria should be blocking only when the run cannot safely ship without them.

Expected output includes:

- `need_satisfaction_criteria`
- `functional_criteria`
- `performance_criteria`
- `quality_criteria`
- `proof_criteria`
- `persistence_criteria`
- `interface_criteria`
- `blocking_criteria`

### `validateTaskComprehensionTool`

Validates retained task-named analysis as Bitcode need comprehension.
This tool should flag old compatibility names when they are treated as product semantics instead of carriers.

Expected output includes:

- `validation_results`
- `validation_details`
- `terminology_findings`
- `need_comprehension`
- `written_asset_coherence`
- `proof_coverage`
- `recommendations`
- `validation_passed`

### `analyzeImplementationComplexityTool`

Assesses implementation effort for satisfying a need through asset-pack written-asset synthesis.
It must include proof and delivery-mechanism effort rather than limiting complexity to code changes.

Expected output includes:

- `need_comprehension`
- `complexity_assessment`
- `risk_analysis`
- `strategic_insights`
- `implementation_recommendations`

## Example

```typescript
import {
  analyzeNeedSemanticsTool,
  AnalyzeNeedSemanticsTool,
  analyzeTaskSemanticsTool
} from '@bitcode/generic-tools-need-comprehension';

const semantics = await analyzeNeedSemanticsTool.use(
  'Fix the OAuth redirect regression and open a pull request',
  {
    repository_type: 'Next.js application',
    technology_stack: ['Next.js', 'Supabase'],
    existing_attachments: ['failed-login-trace.txt']
  }
);

console.log(semantics.need.expressed_need);
console.log(semantics.written_asset_expectations);
console.log(semantics.delivery_mechanism_boundaries);
```

## Prompt Requirements

The DocCode prompt classes in `src/prompts/*` must use the public prompt boundary and must keep `metadata:category` set to `need-comprehension`.
Canonical prompt owners now live in `AnalyzeNeedSemanticsDocCodeToolPrompt`, `ExtractNeedRequirementsDocCodeToolPrompt`, `IdentifyNeedConstraintsDocCodeToolPrompt`, `GenerateNeedSatisfactionCriteriaDocCodeToolPrompt`, `ValidateNeedComprehensionDocCodeToolPrompt`, and `AnalyzeNeedSatisfactionImplementationComplexityDocCodeToolPrompt`; the task-named prompt files remain compatibility wrappers only.
Canonical code owners must mirror that posture: the need-first tool files, `NeedComprehensionToolset`, `need-comprehension-primitives`, and `need-comprehension-schemas` stay local to the package, while `AnalyzeTaskSemanticsTool`, `primitives.ts`, and `schemas.ts` remain compatibility wrappers only.

The raw promptpart files under `packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_*` may retain task-named filenames and constants for compatibility, but their content must describe:

- expressed need analysis
- written-asset expectations
- asset-pack context
- delivery-mechanism boundaries
- proof and verification criteria
- compatibility names as wrappers only

The matching JavaScript raw promptpart files must carry the same literal content as the TypeScript sources so runtime imports cannot serve stale pre-Bitcode prompt text.

## Non-Goals

This package does not make task-first semantics canonical.
It does not promote generic tooling into an agent or live Exchange/Terminal product path by itself.
Agent promotion requires `@bitcode/generic-agents-need-comprehension`, explicit V26 proof coverage, package-boundary hardening, and product-surface integration in the active specification family.
