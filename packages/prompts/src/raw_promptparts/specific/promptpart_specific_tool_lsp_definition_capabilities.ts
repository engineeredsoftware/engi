import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode LSP definition measurement capability for Need evidence"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_specificity", "test": "States outputs: file, position, symbol", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Directly usable in tool prompts", "score": 0.45 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_LSP_DEFINITION_CAPABILITIES: PromptPart =
  'Resolve symbol definitions via LSP and return file path, replay position, symbol metadata, and provenance for Need measurement evidence.' as PromptPart;
