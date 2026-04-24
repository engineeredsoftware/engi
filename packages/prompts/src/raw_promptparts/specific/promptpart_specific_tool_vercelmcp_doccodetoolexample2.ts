import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Example 2 for Vercel MCP DocCode"
 * current_version: "V26.50.0"
 * versions: []
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

export const PROMPTPART_SPECIFIC_TOOL_VERCELMCP_DOCCODETOOLEXAMPLE2: PromptPart =
  'Example: List deployment events and print messages with timestamps.' as PromptPart;
