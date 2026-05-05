/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Tool-specific semantic unit (PROMPTPART_SPECIFIC_TOOL_GITINTERACTOR_DOCCODETOOLPARAMETERS)"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GITINTERACTOR_DOCCODETOOLPARAMETERS: PromptPart = 
  'Require provider plus one authenticated boundary (auth, accessToken, connectionId, installationId, or userId) and repository coordinates (owner/repo, repositoryFullName, or repoUrl). Write operations also require explicit path, message, branch/ref, content, or sha fields as applicable.' as PromptPart;
