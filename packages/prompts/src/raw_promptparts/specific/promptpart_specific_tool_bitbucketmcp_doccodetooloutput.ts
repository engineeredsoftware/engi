/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Output specifications for Bitbucket MCP version control operations"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "version_control_output_comprehensiveness", "test": "Does '{{content}}' cover comprehensive version control outputs? Rate 0-1" },
 *   { "name": "mcp_response_structure", "test": "Does '{{content}}' demonstrate proper MCP response structure? Rate 0-1" },
 *   { "name": "bitbucket_api_outputs", "test": "Does '{{content}}' include comprehensive Bitbucket API outputs? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_BITBUCKETMCP_DOCCODETOOLOUTPUT: PromptPart = 
  '{ success: boolean, operation: string, result: { repositories?: Array<{ uuid: string, name: string, slug: string, full_name: string, is_private: boolean, project?: object, mainbranch?: object }>, branches?: Array<{ name: string, target: object }>, tags?: Array<{ name: string, target: object }>, content?: string, files?: Array<{ path: string, type: string, size: number }>, commits?: Array<{ hash: string, message: string, author: object, date: string }>, diff?: string, pullRequests?: Array<{ id: number, title: string, state: string, author: object, created_on: string }>, issues?: Array<{ id: number, title: string, kind: string, priority: string, status: string, reporter: object }>, [key: string]: any }, metadata: { workspace: string, repository?: string, timestamp: string } }' as PromptPart;