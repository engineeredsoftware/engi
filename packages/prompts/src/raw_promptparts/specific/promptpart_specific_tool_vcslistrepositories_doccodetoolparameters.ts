/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Parameter specification for VCS list repositories tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_completeness", "test": "Does '{{content}}' include all required and optional parameters? Rate 0-1", "score": 0.50 },
 *   { "name": "type_specification", "test": "Are parameter types and constraints clearly specified? Rate 0-1", "score": 0.50 },
 *   { "name": "usage_clarity", "test": "Can developers understand how to use each parameter? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_VCSLISTREPOSITORIES_DOCCODETOOLPARAMETERS: PromptPart = 
  'provider: enum (required) - VCS provider (github/gitlab/bitbucket); connectionId: string (optional) - Specific connection ID; userId: string (optional) - User ID for connection lookup; page: number (optional) - Page number for pagination; perPage: number (optional) - Items per page; sort: enum (optional) - Sort field; direction: enum (optional) - Sort direction' as PromptPart;