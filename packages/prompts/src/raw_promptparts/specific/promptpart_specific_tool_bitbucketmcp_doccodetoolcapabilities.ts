/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Comprehensive capabilities listing for Bitbucket MCP version control integration"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "version_control_capabilities", "test": "Does '{{content}}' showcase comprehensive version control capabilities? Rate 0-1" },
 *   { "name": "mcp_integration_features", "test": "Does '{{content}}' demonstrate MCP integration features? Rate 0-1" },
 *   { "name": "collaborative_development_depth", "test": "Does '{{content}}' reflect collaborative development depth? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_BITBUCKETMCP_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Repository listing and metadata retrieval, branch and tag management, file content operations and directory browsing, commit creation and history browsing, pull request lifecycle management, issue tracking and commenting, OAuth and basic authentication support, workspace-based operations, role-based access filtering, automated code review workflows, merge conflict resolution, deployment pipeline integration, security scanning integration, code quality metrics, team collaboration analytics, and enterprise compliance auditing.' as PromptPart;