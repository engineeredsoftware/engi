/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing pull request creation through VCS and Git interactor tools"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "pr_boundary_clarity", "test": "Does '{{content}}' clearly show provider-generic and Git-shaped PR options? Rate 0-1" },
 *   { "name": "parameter_completeness", "test": "Does '{{content}}' include all key parameters (provider, owner, repo, title, body, head, base)? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VCS_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2 - Pull request delivery: use createPullRequestTool from VCS tools for provider-generic registry flows or from Git interactor when the AssetPack Finish step is explicitly Git-shaped.' as PromptPart;
