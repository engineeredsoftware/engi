/**
 * PROMPTPART: LSP Query Tool Parameters
 * 
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode LSP measurement parameters for deterministic Need evidence replay"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "completeness", "test": "Does '{{content}}' list all required parameters?", "score": 0.50 },
 *   { "name": "clarity", "test": "Are parameter descriptions clear?", "score": 0.50 },
 *   { "name": "usability", "test": "Do parameters enable effective tool use?", "score": 0.50 }
 * ]
 * 
 * @domain semantic-analysis
 * @intent Specifies the required coordinates for replayable Bitcode LSP measurement
 * @benchmarks v2.0.0 industrial language patterns
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLPARAMETERS: PromptPart = 
  'Accepts evidence file path, replay position with line and character, and measurement operation type (definition|references|hover|signatureHelp|documentSymbols|workspaceSymbols|codeActions|format)' as PromptPart;
