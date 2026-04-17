# Tracing Prompts End-to-End (GA‑1)

This guide shows how to instantiate deliverables pipeline prompts and render final strings using the registry formatter.

- Import prompt factories from the deliverables pipeline (e.g., `createDeliverablesPipelineValidationPhaseReadyToShipAgentPrompt`).
- Use `Prompt.format(hierarchicalFormatter)` to render the final string.

Example (TypeScript):

```ts
import { hierarchicalFormatter } from '@bitcode/prompts/formatters/hierarchical';
import { createDeliverablesPipelineValidationPhaseReadyToShipAgentPrompt } from 'packages/pipelines/deliverable/src/agents/prompts/ready-to-ship-prompt';

const prompt = createDeliverablesPipelineValidationPhaseReadyToShipAgentPrompt();
// Optionally: prompt.require('agent/identity').requirePattern('ptrr/*/purpose');
const out = prompt.format(hierarchicalFormatter);
console.log(out);
```

Notes:
- All deliverables prompts are scaffolded with `generation:*` and `failsafe:prepare_context` keys and set required fields.
- PromptParts are imported via deep paths under `@bitcode/prompts/raw_promptparts/{generic|specific}/...`.
- All referenced PromptParts carry `current_version: "0.50.0"` and bench scores ≥ 0.50.

