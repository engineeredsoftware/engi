import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode LSP hover measurement capability for proof-replay facts"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_specificity", "test": "States outputs: signature, docs", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Directly usable in tool prompts", "score": 0.45 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_LSP_HOVER_CAPABILITIES: PromptPart =
  'Return hover evidence for a symbol with type signature, concise documentation summary, and provenance for proof replay when available.' as PromptPart;
