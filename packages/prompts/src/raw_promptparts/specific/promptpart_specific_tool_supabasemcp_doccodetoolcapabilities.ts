import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Capabilities for Supabase MCP DocCode"
 * current_version: "V26.50.0"
 * versions: []
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_SUPABASEMCP_DOCCODETOOLCAPABILITIES: PromptPart = 'Execute SQL queries; insert, update, delete rows; search MCP templates; return structured results.' as PromptPart;