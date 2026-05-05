/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Tool-specific semantic unit (PROMPTPART_SPECIFIC_TOOL_GITINTERACTOR_DOCCODETOOLEXAMPLE3)"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GITINTERACTOR_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Write source evidence: updateFileContentTool.use({ provider, userId, owner, repo, path, content, message, branch, sha }) writes through the provider boundary and fails closed without required write proof fields.' as PromptPart;
