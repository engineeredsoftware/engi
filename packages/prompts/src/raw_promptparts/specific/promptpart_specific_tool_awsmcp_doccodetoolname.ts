/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: name
 * intent: "Tool name for comprehensive AWS MCP integration"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "name_clarity", "test": "Does '{{content}}' clearly identify the AWS MCP tool? Rate 0-1" },
 *   { "name": "branding_consistency", "test": "Does '{{content}}' maintain AWS branding consistency? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLNAME: PromptPart = 
  'AWS MCP Integration Tool' as PromptPart;