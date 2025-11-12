/**
 * PROMPTPART: LSP Query Tool Output
 * 
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Tool output format for Language Server Protocol query operations"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "precision", "test": "Does '{{content}}' accurately describe outputs?", "score": 0.50 },
 *   { "name": "comprehensiveness", "test": "Are all output types covered?", "score": 0.50 },
 *   { "name": "structure", "test": "Is output format clearly specified?", "score": 0.50 }
 * ]
 * 
 * @domain semantic-analysis
 * @intent Describes the output format of LSP Query tool operations
 * @benchmarks v2.0.0 industrial language patterns
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLOUTPUT: PromptPart = 
  'Returns structured LSP response with symbol locations, hover information, completion items, signature help, document/workspace symbols, code actions, or formatted document based on operation type' as PromptPart;