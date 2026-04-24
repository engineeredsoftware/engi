import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Example 1 for Supabase MCP DocCode"
 * current_version: "V26.50.0"
 * versions: []
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

export const PROMPTPART_SPECIFIC_TOOL_SUPABASEMCP_DOCCODETOOLEXAMPLE1: PromptPart =
  'Example: Execute SELECT query on deliverables table and return rows.' as PromptPart;
