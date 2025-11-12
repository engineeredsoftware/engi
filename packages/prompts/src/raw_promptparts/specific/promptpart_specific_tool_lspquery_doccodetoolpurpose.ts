/**
 * PROMPTPART: LSP Query Tool Purpose
 * 
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Tool purpose for Language Server Protocol query operations"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "completeness", "test": "Does '{{content}}' fully describe the tool's purpose?", "score": 0.50 },
 *   { "name": "precision", "test": "Is the purpose specific to LSP operations?", "score": 0.50 },
 *   { "name": "actionability", "test": "Does it guide proper tool usage?", "score": 0.50 }
 * ]
 * 
 * @domain semantic-analysis
 * @intent Describes the core purpose of LSP Query tool for code intelligence
 * @benchmarks v2.0.0 industrial language patterns
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLPURPOSE: PromptPart = 
  'Execute Language Server Protocol queries for symbol resolution, type information, and code navigation across programming languages' as PromptPart;