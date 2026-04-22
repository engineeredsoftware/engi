/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capabilities description for deprecated git-interactor with migration info"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "deprecation_emphasis", "test": "Does '{{content}}' start with clear deprecation notice? Rate 0-1" },
 *   { "name": "historical_context", "test": "Does '{{content}}' explain what capabilities this toolkit previously provided? Rate 0-1" },
 *   { "name": "provider_support", "test": "Does '{{content}}' clearly list the expanded provider support (GitHub, GitLab, Bitbucket) in VCS tools? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VCS_DOCCODETOOLCAPABILITIES: PromptPart = 
  'DEPRECATED: This toolkit previously provided GitHub-specific operations for repositories, branches, pull requests, issues, and files. All capabilities are now available through VCS tools with support for GitHub, GitLab, and Bitbucket.' as PromptPart;