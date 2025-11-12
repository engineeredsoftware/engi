/**
 * PROMPTPART: LSP Query Tool Parameters
 * 
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Tool parameters for Language Server Protocol query operations"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "completeness", "test": "Does '{{content}}' list all required parameters?", "score": 0.50 },
 *   { "name": "clarity", "test": "Are parameter descriptions clear?", "score": 0.50 },
 *   { "name": "usability", "test": "Do parameters enable effective tool use?", "score": 0.50 }
 * ]
 * 
 * @domain semantic-analysis
 * @intent Specifies the required parameters for LSP Query tool operations
 * @benchmarks v2.0.0 industrial language patterns
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLPARAMETERS: PromptPart = 
  'Accepts file path (string), position with line and character (numbers), and operation type (definition|references|hover|completions|signatureHelp|documentSymbols|workspaceSymbols|codeActions|format)' as PromptPart;