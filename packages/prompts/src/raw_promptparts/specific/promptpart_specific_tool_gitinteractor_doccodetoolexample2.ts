/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Tool-specific semantic unit (PROMPTPART_SPECIFIC_TOOL_GITINTERACTOR_DOCCODETOOLEXAMPLE2)"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GITINTERACTOR_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Deliver an AssetPack by PR: createPullRequestTool.use({ provider: "github", connectionId, owner, repo, title, sourceBranch: "asset-pack/run-123", targetBranch: "main" }) records the repository delivery mechanism.' as PromptPart;
