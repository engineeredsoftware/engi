import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Define web search tool purpose"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
 * benchmarks: [
 *   { "name": "actionability", "test": "Does '{{content}}' clearly describe actionable search capabilities? Rate 0-1" }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCHTOOL_PURPOSE_CORESTATEMENT: PromptPart = 
  'Search the web for technical documentation, API references, and programming resources' as PromptPart;