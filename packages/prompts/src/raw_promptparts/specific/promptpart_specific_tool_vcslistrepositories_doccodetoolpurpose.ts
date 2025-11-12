/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Purpose statement for VCS list repositories tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_clarity", "test": "Does '{{content}}' clearly explain what the tool does and why? Rate 0-1", "score": 0.50 },
 *   { "name": "provider_coverage", "test": "Does '{{content}}' indicate support for multiple VCS providers? Rate 0-1", "score": 0.50 },
 *   { "name": "unified_interface_mention", "test": "Does '{{content}}' emphasize the unified interface across providers? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_VCSLISTREPOSITORIES_DOCCODETOOLPURPOSE: PromptPart = 
  'List repositories from VCS providers (GitHub, GitLab, Bitbucket) with unified interface and comprehensive filtering options' as PromptPart;