/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing pull request creation migration from deprecated to VCS"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "pr_migration_clarity", "test": "Does '{{content}}' clearly show how to migrate pull request creation to VCS tools? Rate 0-1" },
 *   { "name": "parameter_completeness", "test": "Does '{{content}}' include all key parameters (provider, owner, repo, title, body, head, base)? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_VCS_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2 - DEPRECATED pull request creation: Use vcsTools.createPullRequest({ provider: "github", owner, repo, title, body, head, base }) instead of createPullRequestTool' as PromptPart;