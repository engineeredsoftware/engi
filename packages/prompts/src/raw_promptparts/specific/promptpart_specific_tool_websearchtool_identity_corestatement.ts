import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Define web search tool identity"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_clarity", "test": "Does '{{content}}' clearly identify a technical search capability? Rate 0-1" }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCHTOOL_IDENTITY_CORESTATEMENT: PromptPart = 
  'an expert web search and analysis tool' as PromptPart;