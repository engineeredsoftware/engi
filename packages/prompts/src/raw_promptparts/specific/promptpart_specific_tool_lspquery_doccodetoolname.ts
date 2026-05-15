/**
 * PROMPTPART: LSP Query Tool Name
 * 
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode LSP measurement tool name for replayable Read and AssetPack evidence"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "clarity", "test": "Does '{{content}}' clearly identify the tool?", "score": 0.50 },
 *   { "name": "consistency", "test": "Is the name consistent with other tool names?", "score": 0.50 },
 *   { "name": "descriptiveness", "test": "Does the name describe the tool's function?", "score": 0.50 }
 * ]
 * 
 * @domain semantic-analysis
 * @intent Identifies the LSP Query tool as Bitcode static measurement infrastructure
 * @benchmarks v2.0.0 industrial language patterns
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLNAME: PromptPart = 
  'Bitcode LSP Read Measurement Query Tool' as PromptPart;
