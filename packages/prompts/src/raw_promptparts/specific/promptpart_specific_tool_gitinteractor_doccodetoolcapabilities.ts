/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Tool-specific semantic unit (PROMPTPART_SPECIFIC_TOOL_GITINTERACTOR_DOCCODETOOLCAPABILITIES)"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GITINTERACTOR_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Supports repository metadata reads, file listing, branch/reference reads, pull request creation, issue/comment operations, file content writes, file deletes, commit reads, and issue-with-comments evidence retrieval through admitted Bitcode repository anchors.' as PromptPart;
