/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Core purpose statement for Bitbucket MCP version control integration"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "mcp_integration_purpose_clarity", "test": "Does '{{content}}' clearly articulate MCP integration purpose for version control? Rate 0-1" },
 *   { "name": "bitbucket_ecosystem_focus", "test": "Does '{{content}}' emphasize Bitbucket ecosystem integration? Rate 0-1" },
 *   { "name": "collaborative_development_mission", "test": "Does '{{content}}' convey collaborative development mission? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_BITBUCKETMCP_DOCCODETOOLPURPOSE: PromptPart = 
  'Comprehensive Bitbucket API operations with MCP integration for repository, pull request, issue, and branch management across distributed development teams with enterprise-grade security and workflow automation for mission-critical collaborative software development.' as PromptPart;