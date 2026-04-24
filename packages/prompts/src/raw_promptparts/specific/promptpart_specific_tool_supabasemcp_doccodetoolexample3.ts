import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Example 3 for Supabase MCP DocCode"
 * current_version: "V26.50.0"
 * versions: []
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

export const PROMPTPART_SPECIFIC_TOOL_SUPABASEMCP_DOCCODETOOLEXAMPLE3: PromptPart =
  'Example: Search MCP templates for a keyword and return matches.' as PromptPart;
