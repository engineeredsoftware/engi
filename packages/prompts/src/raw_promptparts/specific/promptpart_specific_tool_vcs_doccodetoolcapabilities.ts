/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capabilities description for provider-generic VCS tools"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "provider_emphasis", "test": "Does '{{content}}' start with clear provider-generic capability language? Rate 0-1" },
 *   { "name": "git_bridge_context", "test": "Does '{{content}}' explain what the Git bridge provides? Rate 0-1" },
 *   { "name": "provider_support", "test": "Does '{{content}}' clearly list the expanded provider support (GitHub, GitLab, Bitbucket) in VCS tools? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VCS_DOCCODETOOLCAPABILITIES: PromptPart = 
  'VCS tools provide provider-generic repository, branch, pull request, issue, comment, and file operations across GitHub, GitLab, and Bitbucket. Git interactor tools remain the Git-shaped bridge for concrete Bitcode repository delivery and evidence flows.' as PromptPart;
