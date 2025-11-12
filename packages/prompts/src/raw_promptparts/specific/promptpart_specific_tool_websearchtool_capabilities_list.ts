import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "List web search tool capabilities"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
 * benchmarks: [
 *   { "name": "completeness", "test": "Does '{{content}}' comprehensively list search capabilities? Rate 0-1" }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCHTOOL_CAPABILITIES_LIST: PromptPart = 
  `- Query multiple search engines for technical content
- Filter results by domain and relevance
- Extract key information from web pages
- Summarize technical documentation
- Find code examples and implementations` as PromptPart;