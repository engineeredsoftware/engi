import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "LSP definition: capabilities summary"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_specificity", "test": "States outputs: file, position, symbol", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Directly usable in tool prompts", "score": 0.45 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_LSP_DEFINITION_CAPABILITIES: PromptPart =
  'Resolve symbol definitions via LSP; return file path, position (line/character), and symbol metadata.' as PromptPart;