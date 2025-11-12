import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "LSP references: capabilities summary"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_specificity", "test": "States outputs: file, range, context", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Directly usable in tool prompts", "score": 0.45 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_LSP_REFERENCES_CAPABILITIES: PromptPart =
  'List symbol references across the workspace using LSP; include file path, range, and several context lines around each reference.' as PromptPart;