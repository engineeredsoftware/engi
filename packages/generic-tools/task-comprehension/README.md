# Need Comprehension Compatibility Tools

## V26 Posture

`@bitcode/generic-tools-task-comprehension` is a retained compatibility package.
The package name, task-named classes, and task-named input fields remain stable for old callers, but V26 interprets the active behavior as Bitcode need comprehension.

This package must not define an independent old-world product model.
It is a prompt-bearing reservoir that accelerates Bitcode inference when it maps every compatibility entry point onto canonical concepts:

- `need`: the expressed target the Bitcode run must satisfy.
- `written asset`: a source-bearing or third-party-facing artifact synthesized from the run.
- `asset pack`: the Bitcode-owned structure that groups the stable output and evidence.
- `shipping wrapper`: a connected-interface delivery mechanism such as a pull request or Jira comment.
- `need satisfaction criteria`: measurable acceptance and verification conditions.

The package remains integrated with Bitcode's prompt primitives architecture through `DocCodeToolPrompt`, `PromptPart`, and raw promptparts exposed through the public `@bitcode/prompts/raw_promptparts/*` boundary.

## Compatibility Mapping

| Retained name | V26 interpretation |
| --- | --- |
| `task_description` | compatibility carrier for `expressedNeed` |
| `task_comprehension` | compatibility carrier for `needComprehension` |
| `analyzeTaskSemanticsTool` | compatibility API for need semantic analysis |
| `extractRequirementsTool` | compatibility API for written-asset and proof requirement extraction |
| `identifyConstraintsTool` | compatibility API for need, repository, proof, and shipping-wrapper constraints |
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
- `shipping_wrapper_boundaries`
- `task_classification` compatibility metadata

### `extractRequirementsTool`

Extracts explicit and implied requirements from the expressed need and semantic analysis.
Requirements must identify whether they constrain stable written assets, proof evidence, product interfaces, persistence, or shipping wrappers.

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
The tool must distinguish repository/package constraints from connected-interface wrapper constraints.

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
It must include proof and shipping-wrapper effort rather than limiting complexity to code changes.

Expected output includes:

- `need_comprehension`
- `complexity_assessment`
- `risk_analysis`
- `strategic_insights`
- `implementation_recommendations`

## Example

```typescript
import {
  analyzeTaskSemanticsTool,
  AnalyzeTaskSemanticsTool
} from '@bitcode/generic-tools-task-comprehension';

const semantics = await analyzeTaskSemanticsTool.use(
  'Fix the OAuth redirect regression and open a pull request',
  {
    repository_type: 'Next.js application',
    technology_stack: ['Next.js', 'Supabase'],
    existing_attachments: ['failed-login-trace.txt']
  }
);

console.log(semantics.need.expressed_need);
console.log(semantics.written_asset_expectations);
console.log(semantics.shipping_wrapper_boundaries);
```

## Prompt Requirements

The DocCode prompt classes in `src/prompts/*` must use the public prompt boundary and must keep `metadata:category` set to `need-comprehension`.

The raw promptpart files under `packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_*` may retain task-named filenames and constants for compatibility, but their content must describe:

- expressed need analysis
- written-asset expectations
- asset-pack context
- shipping-wrapper boundaries
- proof and verification criteria
- compatibility names as wrappers only

The matching JavaScript raw promptpart files must carry the same literal content as the TypeScript sources so runtime imports cannot serve stale old-world prompt text.

## Non-Goals

This package does not make old task-first semantics canonical.
It does not promote generic tooling into the live Exchange/Terminal product path by itself.
Promotion requires explicit V26 proof coverage, package-boundary hardening, and product-surface integration in the active specification family.
