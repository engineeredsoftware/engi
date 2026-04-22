/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Basic usage example for List Branches Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "discovery_simplicity", "test": "Does the example in '{{content}}' demonstrate straightforward repository branch discovery? Rate 0-1" },
 *   { "name": "common_navigation", "test": "Is the example in '{{content}}' representative of common repository navigation needs? Rate 0-1" },
 *   { "name": "basic_insights", "test": "Does '{{content}}' show basic intelligent analysis features? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Active branch discovery: listBranches({ repository: "company/frontend-app", branch_types: "active", include_metadata: true, sort_criteria: "activity" }) → Returns 23 active branches sorted by recent activity, including feature/user-dashboard (updated 2h ago), hotfix/login-issue (updated 4h ago), and develop (updated 6h ago), with commit counts, author information, and merge status for each branch' as PromptPart;