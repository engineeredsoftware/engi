import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode guidance for when LSP measurement is admissible Need and AssetPack evidence"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_specificity", "test": "Names concrete LSP operations", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Usable by tool prompts directly", "score": 0.45 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_LSP_BEST_FOR_ANALYSIS: PromptPart =
  'Use LSP measurement when Bitcode needs replayable definitions, references, hovers, symbol resolution, or path evidence to size a Need, rank an AssetPack, or prove static repository fit.' as PromptPart;
