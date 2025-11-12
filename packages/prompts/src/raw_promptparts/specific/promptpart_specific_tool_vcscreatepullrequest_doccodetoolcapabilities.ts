/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Enumerates comprehensive VCS pull request creation capabilities across multiple platforms"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_completeness", "test": "Does '{{content}}' list all major VCS PR creation capabilities? Rate 0-1", "score": 0.50 },
 *   { "name": "platform_coverage", "test": "Are capabilities described across multiple VCS platforms? Rate 0-1", "score": 0.50 },
 *   { "name": "implementation_clarity", "test": "Can developers understand what operations are available? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VCSCREATEPULLREQUEST_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Create pull requests, set reviewers, add labels, configure merge settings, validate branch status, and handle platform-specific metadata across GitHub, GitLab, and Bitbucket' as PromptPart;