/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Basic usage example for Create Pull Request Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_clarity", "test": "Does the example in '{{content}}' clearly demonstrate basic PR creation usage? Rate 0-1" },
 *   { "name": "real_world_applicability", "test": "Is the example in '{{content}}' realistic for actual development workflows? Rate 0-1" },
 *   { "name": "parameter_demonstration", "test": "Does '{{content}}' effectively show essential parameter usage? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Simple feature PR: createPullRequest({ repository: "company/webapp", source_branch: "feature/user-authentication", target_branch: "develop", title: "Add OAuth2 authentication system", description: "Implements secure user authentication using OAuth2 providers", reviewers: ["security-team", "backend-lead"], labels: ["feature", "security"] }) → Creates PR #42 with auto-assigned security reviewers and appropriate labels' as PromptPart;