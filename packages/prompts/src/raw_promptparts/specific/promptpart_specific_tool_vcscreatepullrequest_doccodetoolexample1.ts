/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Provides example usage for VCS pull request creation tool"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_completeness", "test": "Does '{{content}}' provide a complete, realistic example? Rate 0-1", "score": 0.50 },
 *   { "name": "implementation_clarity", "test": "Can developers follow the example to implement the tool? Rate 0-1", "score": 0.50 },
 *   { "name": "best_practices", "test": "Does the example demonstrate best practices? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VCSCREATEPULLREQUEST_DOCCODETOOLEXAMPLE1: PromptPart = 
  'vcs_create_pull_request({ repository: "owner/repo", title: "Feature: Add user authentication", description: "Implements OAuth 2.0 authentication", source_branch: "feature/auth", target_branch: "main", reviewers: ["alice", "bob"], labels: ["feature", "security"] })' as PromptPart;