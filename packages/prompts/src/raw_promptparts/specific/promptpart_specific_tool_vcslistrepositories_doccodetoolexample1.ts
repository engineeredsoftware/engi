/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Example usage of VCS list repositories tool - basic GitHub listing"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_clarity", "test": "Does '{{content}}' provide a clear, practical example? Rate 0-1", "score": 0.50 },
 *   { "name": "parameter_demonstration", "test": "Does the example show proper parameter usage? Rate 0-1", "score": 0.50 },
 *   { "name": "real_world_applicability", "test": "Is this a realistic use case? Rate 0-1", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VCSLISTREPOSITORIES_DOCCODETOOLEXAMPLE1: PromptPart = 
  'List GitHub repositories with pagination: { provider: "github", userId: "user123", page: 1, perPage: 25, sort: "updated", direction: "desc" }' as PromptPart;