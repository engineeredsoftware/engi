# V26 Prompt Surfaces

## Status

- Scope: supplementary V26 architecture map for prompt-bearing systems
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC.txt -> V26`
- Purpose: make prompt ownership, consumer corridors, and retained prompt ports explicit package-by-package while fifth-gate reform stays active

## Prompt rope

`PromptPart`, `Prompt`, and `PromptExecution` are not incidental utilities.
They are one of the strongest repository-level ropes for following Bitcode inference:

- `PromptPart` defines the smallest typed semantic unit of inference
- `Prompt` defines the registry/composition shape of inference
- `PromptExecution` defines the execution-side carrier that binds prompts to runtime work

If a corridor meaningfully shapes Bitcode inference, it should either:
- consume these abstractions through the public prompt contract,
- expose raw promptparts through the explicit prompt package subpaths,
- or be classified as reference-only residue rather than silently owning live behavior

## Public prompt contract

The public Bitcode prompt contract is:

- `@bitcode/prompts`
  `PromptPart`, `createPromptPart`, `Prompt`, `createPrompt`, `PromptExecution`, `createPromptExecution`
- `@bitcode/prompts/prompt`, `@bitcode/prompts/parts/PromptPart`, `@bitcode/prompts/execution/PromptExecution`
  narrow public runtime-safe prompt primitive subpaths for consumers that should not load the full root barrel
- `@bitcode/prompts/formatters`
  shared prompt formatters such as `hierarchicalFormatter`
- `@bitcode/prompts/raw_promptparts/*`
  explicit raw prompt content families

Operational rules:

- active prompt-bearing inference carriers must import prompt primitives through the public contract above
- active app/package configs must not preserve `@bitcode/prompts/src/*` compatibility aliases
- raw promptparts may stay explicit and file-granular, but route-local ad hoc strings may not silently replace prompt-owned product logic
- prompt behavior that remains old-world, experimental, or pre-Bitcode may survive only as reference-only or auxiliary-input corridors

## Active fifth-gate prompt consumers

These corridors currently participate in the live Bitcode or admitted fifth-gate inference substrate.

| Corridor | Current active owners | Current role |
| --- | --- | --- |
| Prompt primitives and prompt execution | `packages/prompts/src/{parts/PromptPart.ts,prompt.ts,execution/PromptExecution.ts,formatters/*}` | canonical prompt contract and execution-side prompt carrier |
| Execution prompt hierarchy | `packages/execution-generics/src/prompts/ExecutionPrompt.ts` | active execution prompt registry with Bitcode hierarchy rules |
| Pipeline prompt hierarchy | `packages/pipelines-generics/src/prompts/PipelinePrompt.ts` | active pipeline/phase/agent prompt registry |
| Agent prompt composition | `packages/agent-generics/src/{prompts/*,execution/prompt-overlays.ts,substeps/factories.ts}` | active agent prompt composition, structured-output, and tool-doc injection |
| Conversation prompt system | `packages/conversations-generics/src/{prompts/ConversationSystemPrompt.ts,agent/ConversationAgent.ts}` | active conversations system prompt and conversation-agent prompt posture |
| Tool prompt composition | `packages/tools-generics/src/doc-code-tool/DocCodeToolPrompt.ts` | active prompt-bearing tool documentation composition |
| Deliverable prompt ports | `packages/pipelines/deliverable/src/{agents/prompts/*,tools/*}` | retained-but-admitted deliverable prompt ports shaping active execution compatibility |
| Deliverable prompt rendering support | `packages/pipelines/deliverable/scripts/render-prompts.ts` | retained prompt rendering support through the public formatter boundary |
| Product-level prompt binding | `uapi/prompts/conversations-system-prompt.ts` | app-facing binding of the canonical conversations prompt |

## Support prompt consumers

These corridors do not define the live product center directly, but they remain admitted support or proof-bearing consumers.

| Corridor | Current owners | Current role |
| --- | --- | --- |
| Digest and analysis prompt helpers | `packages/digest/prompts/*` | support prompt composition for repository guidance/digest output through the public `@bitcode/prompts` and `@bitcode/prompts/raw_promptparts/*` boundary rather than sibling source reach-through |
| Prompt contracts and theorem language | `protocol-demonstration/src/canonical/type-contracts.ts`, `protocol-demonstration/src/canonical/proven-generator.js` | prompt contract/proof interpretation and generated witness language |
| Prompt proof/test surfaces | `protocol-demonstration/test/{v26-prompt-system-boundary.test.js,v26-prompt-surface-map.test.js}` | procedural witnesses that the prompt corridor stays explicit |

## Reference-only or retained old-world prompt ports

These corridors still consume prompt abstractions or raw promptparts, but they are not allowed to silently own the live Bitcode product path.

| Corridor | Current owners | Current role |
| --- | --- | --- |
| Generic retained agents | `packages/generic-agents/*` including `jira-processor`, `web-search`, `web-researcher`, `danger-wall`, `ready-to-short-circuit` | reference-only/retained acceleration corridors; Jira remains reader-first need-ingestion/reference posture rather than live Bitcode product ownership |
| Generic retained tools | `packages/generic-tools/*` including `mcps-tools/*`, `task-comprehension`, `lsp-query`, `web-search`, `vcs`, `use-computer`, `repository-setup` | retained prompt-bearing tool reservoirs and doc-code ports |
| ChatGPT-era prompt documentation | `packages/chatgptapp/src/prompts/*` | retained prompt documentation/reference corridor |
| Prompt/doc-comment experimentation | `packages/doc-comment/*`, `packages/generic-doc-comment-plugins/*`, `packages/prompts/src/developing/*` | experimental/reference prompt authoring and prompt-doc tooling |

Operational rule:

- reference-only prompt corridors may keep older prompt inventories where they accelerate reform work
- they may not define live Exchange/Terminal semantics unless they are explicitly repurposed and promoted into the active rows above
- if a retained corridor becomes necessary for live product behavior, it must move into the active or support tables and satisfy the public prompt contract

## Current fifth-gate prompt residues

The remaining honest prompt-side closure work is:

1. prompt-space completeness across retained consumer families, not just active boundary hygiene
2. package-by-package admissibility for retained prompt-bearing generic agents/tools
3. narrowing or cutting prompt reservoirs that still imply parallel old-world product logic
4. proving that app- and MCP-facing inference behavior is fully explainable from the explicit prompt substrate rather than hidden composition seams

## Verification posture

The current prompt surface map is expected to align with:

- `BITCODE_SPEC_V26.md`
- `BITCODE_SPEC_V26_PARITY_MATRIX.md`
- `protocol-demonstration/V26_APPLICATION_SYSTEMS.md`
- `.bitcode/prompt-system-totality-proof.json`
- `protocol-demonstration/test/v26-prompt-system-boundary.test.js`
- `protocol-demonstration/test/v26-prompt-surface-map.test.js`
