import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Analyze Parallel agent system instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_completeness", "test": "Do instructions cover all aspects?", "score": 0.37 },
 *   { "name": "technical_precision", "test": "Are technical instructions precise?", "score": 0.36 },
 *   { "name": "workflow_clarity", "test": "Is the workflow clear?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZEPARALLEL_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Analyze code in parallel by: spawning concurrent analysis workers for different modules, detecting synchronization primitives and patterns, identifying shared state and data races, mapping parallel execution flows, validating atomic operations and memory ordering, checking deadlock and livelock conditions, generating thread safety reports' as PromptPart;