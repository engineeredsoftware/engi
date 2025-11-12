/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Tool semantic unit: Figmamcp Doccodetoolname"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '@engi/prompts';
export const PROMPTPART_SPECIFIC_TOOL_FIGMAMCP_DOCCODETOOLNAME: PromptPart =
  'Figma MCP Tool' as PromptPart;
