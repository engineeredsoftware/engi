/**
 * PROMPTPART: LSP Query Tool Output
 * 
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode LSP measurement output contract for Need and AssetPack proof evidence"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "precision", "test": "Does '{{content}}' accurately describe outputs?", "score": 0.50 },
 *   { "name": "comprehensiveness", "test": "Are all output types covered?", "score": 0.50 },
 *   { "name": "structure", "test": "Is output format clearly specified?", "score": 0.50 }
 * ]
 * 
 * @domain semantic-analysis
 * @intent Describes the replayable evidence output of Bitcode LSP measurement
 * @benchmarks v2.0.0 industrial language patterns
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLOUTPUT: PromptPart = 
  'Returns structured measurement evidence with symbol locations, hover facts, signature facts, document/workspace symbols, code-action signals, formatting signals, and provenance keyed to the requested operation' as PromptPart;
