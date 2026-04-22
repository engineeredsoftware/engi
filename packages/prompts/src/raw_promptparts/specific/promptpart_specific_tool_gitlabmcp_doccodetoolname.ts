/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Tool semantic unit: Gitlabmcp Doccodetoolname"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';
export const PROMPTPART_SPECIFIC_TOOL_GITLABMCP_DOCCODETOOLNAME: PromptPart =
  'GitLab MCP Tool' as PromptPart;
