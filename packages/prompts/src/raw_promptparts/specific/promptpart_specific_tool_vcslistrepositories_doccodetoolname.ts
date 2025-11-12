/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Name for VCS list repositories tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "tool_identification_precision", "test": "Given the tool name '{{content}}', can an LLM immediately understand this is for listing repositories from VCS providers? Rate 0-1", "score": 0.50 },
 *   { "name": "naming_convention_compliance", "test": "Does '{{content}}' follow the established tool naming pattern (verb-noun or domain-action)? Rate 0-1", "score": 0.50 },
 *   { "name": "vcs_context_clarity", "test": "Does '{{content}}' clearly indicate it works with version control systems? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_VCSLISTREPOSITORIES_DOCCODETOOLNAME: PromptPart = 
  'VCS List Repositories Tool' as PromptPart;