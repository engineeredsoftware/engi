/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Output format specification for multi-provider search tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_structure_clarity", "test": "Does '{{content}}' clearly describe the output data structure? Rate 0-1", "score": 0.50 },
 *   { "name": "result_aggregation", "test": "Is the aggregated result format clearly explained? Rate 0-1", "score": 0.50 },
 *   { "name": "provider_attribution", "test": "Is it clear which provider supplied which results? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLOUTPUT: PromptPart = 
  'Aggregated search results with provider attribution, relevance scores, deduplication status, failover history, and comprehensive metadata including timestamps, source URLs, and provider performance metrics' as PromptPart;