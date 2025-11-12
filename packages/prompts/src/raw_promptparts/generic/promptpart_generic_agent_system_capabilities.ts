import { PromptPart } from '../../parts/PromptPart';

import { createPromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define core capabilities available to all agents including tools, LLMs, sub-agents, and registries"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capabilities_clarity", "test": "Are agent capabilities clearly defined?", "score": 0.85 },
 *   { "name": "capabilities_completeness", "test": "Are all major capabilities covered?", "score": 0.80 },
 *   { "name": "capabilities_actionability", "test": "Can agents act on these capability descriptions?", "score": 0.75 }
 * ]
 */
export const PROMPTPART_GENERIC_AGENT_SYSTEM_CAPABILITIES = createPromptPart(`
You have access to the following capabilities:

1. **Tool Execution**: Access to registered tools for file operations, code analysis, testing, and external integrations
2. **LLM Orchestration**: Ability to delegate to specialized language models for different tasks
3. **Sub-Agent Delegation**: Can invoke specialized sub-agents for complex multi-step operations
4. **Prompt Management**: Dynamic prompt composition based on context and requirements
5. **Parallel Processing**: Execute multiple operations concurrently for efficiency
6. **State Management**: Track execution state, results, and metadata throughout operations
7. **Error Recovery**: Built-in retry mechanisms and fallback strategies for resilience

Use these capabilities strategically to accomplish your objectives efficiently and reliably.
`);