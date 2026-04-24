/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Describes output format and structure for VCS pull request creation operations"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_completeness", "test": "Does '{{content}}' describe all possible VCS PR creation outputs? Rate 0-1", "score": 0.50 },
 *   { "name": "format_clarity", "test": "Are output formats clearly explained and structured? Rate 0-1", "score": 0.50 },
 *   { "name": "error_handling", "test": "Does it specify error handling and status information? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VCSCREATEPULLREQUEST_DOCCODETOOLOUTPUT: PromptPart = 
  'JSON object with pull request details: id, url, status, created_at, author, reviewers, merge_status, and platform-specific metadata' as PromptPart;