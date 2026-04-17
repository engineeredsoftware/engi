/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Purpose statement for web search tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_actionability", "test": "Given the purpose '{{content}}', can an LLM understand exactly when and why to use this tool? Rate 0-1" },
 *   { "name": "capability_boundaries", "test": "Does '{{content}}' clearly define what the tool can and cannot do? Rate 0-1" },
 *   { "name": "integration_context", "test": "Does '{{content}}' explain how this tool fits into larger workflows (research, fact-checking, etc)? Rate 0-1" },
 *   { "name": "search_type_clarity", "test": "Is it clear from '{{content}}' that this searches the internet/web (not local files or code)? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLPURPOSE: PromptPart = 
  'Search the internet for current information, research topics, and discover relevant web content using advanced query processing and multi-provider orchestration' as PromptPart;