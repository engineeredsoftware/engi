import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode LSP reference measurement capability for AssetPack fit evidence"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_specificity", "test": "States outputs: file, range, context", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Directly usable in tool prompts", "score": 0.45 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_LSP_REFERENCES_CAPABILITIES: PromptPart =
  'List symbol references across the workspace using LSP and include file path, range, context lines, and provenance for AssetPack fit evidence.' as PromptPart;
