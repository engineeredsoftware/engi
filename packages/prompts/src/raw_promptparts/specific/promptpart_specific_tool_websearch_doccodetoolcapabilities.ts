/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capabilities description for web search tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "multi_provider", "test": "Does '{{content}}' emphasize multi-provider search orchestration? Rate 0-1" },
 *   { "name": "intelligence_features", "test": "Does '{{content}}' mention intelligent result aggregation and optimization? Rate 0-1" },
 *   { "name": "comprehensive_features", "test": "Does '{{content}}' cover content extraction and URL intelligence? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Multi-provider search orchestration with intelligent result aggregation, automatic failover, content extraction from results, URL intelligence analysis, real-time optimization, provider health monitoring, and enterprise-grade resilience for comprehensive information retrieval' as PromptPart;