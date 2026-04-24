/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capabilities description for repository setup (clone repository) tool"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "feature_completeness", "test": "Does '{{content}}' cover all major cloning features? Rate 0-1" },
 *   { "name": "provider_support", "test": "Does '{{content}}' mention multi-provider support (GitHub, GitLab, Bitbucket)? Rate 0-1" },
 *   { "name": "performance_features", "test": "Does '{{content}}' mention performance optimizations like caching and shallow clones? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Provider-agnostic cloning (GitHub, GitLab, Bitbucket), intelligent cache management for repeated clones, authentication handling via connection IDs, branch and commit-specific cloning, shallow clone support for performance, submodule initialization, progress tracking and cancellation, automatic retry with exponential backoff' as PromptPart;