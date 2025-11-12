import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Guidance: when to use LSP analysis tooling"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_specificity", "test": "Names concrete LSP operations", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Usable by tool prompts directly", "score": 0.45 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_LSP_BEST_FOR_ANALYSIS: PromptPart =
  'Use for Language Server Protocol operations such as definitions, references, hovers, and symbol resolution across the workspace.' as PromptPart;