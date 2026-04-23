import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Create Code Change agent system instructions with context awareness"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instructions_context_awareness", "test": "Does instructions leverage execution context effectively?", "score": 0.42 },
 *   { "name": "instructions_precision", "test": "Is instructions precisely defined for production?", "score": 0.41 },
 *   { "name": "instructions_completeness", "test": "Does instructions utilize accumulated intelligence?", "score": 0.40 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATECODECHANGE_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Create a pull request shipping wrapper by leveraging full execution context: extract key written assets and file changes from prior phases, synthesize validation results into confidence metrics, transform implementation decisions into clear rationale, aggregate test results into quality indicators, compile reviewer guidance from danger wall analysis, generate a comprehensive shipping description from accumulated state, and establish merge criteria from validation gates' as PromptPart;
