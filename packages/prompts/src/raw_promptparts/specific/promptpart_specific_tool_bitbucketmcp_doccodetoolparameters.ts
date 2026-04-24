/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Parameter specifications for Bitbucket MCP version control operations"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "version_control_parameter_comprehensiveness", "test": "Does '{{content}}' cover comprehensive version control parameters? Rate 0-1" },
 *   { "name": "mcp_operation_depth", "test": "Does '{{content}}' demonstrate MCP operation parameter depth? Rate 0-1" },
 *   { "name": "bitbucket_api_parameters", "test": "Does '{{content}}' include comprehensive Bitbucket API parameters? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_BITBUCKETMCP_DOCCODETOOLPARAMETERS: PromptPart = 
  'operation: string (required) - Bitbucket operation to perform, workspace: string - Bitbucket workspace name or UUID, repoSlug: string - Repository slug or name, accessToken: string - OAuth access token, username: string - Bitbucket username for basic auth, appPassword: string - App password for basic auth, role: string - Filter by user role (owner|admin|contributor|member), branchName: string - Branch name, tagName: string - Tag name, target: string - Commit hash to branch/tag from, path: string - File or directory path, branch: string - Branch to read from, message: string - Commit message, files: array - Files to commit, pullRequestId: number - Pull request ID, title: string - PR title, description: string - PR description, sourceBranch: string - Source branch, destinationBranch: string - Target branch, closeSourceBranch: boolean - Close source branch on merge, issueId: number - Issue ID, kind: string - Issue type (bug|enhancement|proposal|task), priority: string - Issue priority (trivial|minor|major|critical|blocker), status: string - Issue status (new|open|resolved|on hold|invalid|duplicate|wontfix|closed), assignee: string - Issue assignee, content: string - Comment content, commitHash: string - Commit hash, state: string - Pull request state, mergeStrategy: string - Merge strategy' as PromptPart;