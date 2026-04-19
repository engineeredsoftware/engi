import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Tool-specific semantic unit (PROMPTPART_SPECIFIC_TOOL_GITHUBMCP_DOCCODETOOLPURPOSE)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GITHUBMCP_DOCCODETOOLPURPOSE: PromptPart = 
  'Expose retained GitHub MCP operations for Bitcode repository reads and the initial Git/GH-centric settle-write boundary, while failing closed whenever the fourth-gate runtime does not admit live GitHub execution.' as PromptPart;
