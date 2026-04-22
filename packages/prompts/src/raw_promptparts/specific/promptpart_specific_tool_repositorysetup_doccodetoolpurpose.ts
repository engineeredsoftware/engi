/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Purpose statement for repository setup (clone repository) tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "provider_agnostic_emphasis", "test": "Does '{{content}}' emphasize provider-agnostic capability? Rate 0-1" },
 *   { "name": "authentication_mention", "test": "Does '{{content}}' mention authentication management? Rate 0-1" },
 *   { "name": "comprehensive_nature", "test": "Does '{{content}}' convey comprehensive repository cloning? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLPURPOSE: PromptPart = 
  'Clone repositories from any VCS provider (GitHub, GitLab, Bitbucket) with intelligent caching, authentication management, and safety validation for comprehensive repository setup' as PromptPart;