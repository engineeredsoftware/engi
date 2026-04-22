/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Capabilities enumeration for multi-provider search tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_completeness", "test": "Does '{{content}}' comprehensively list all key capabilities? Rate 0-1", "score": 0.50 },
 *   { "name": "technical_precision", "test": "Are the capabilities described with precise technical language? Rate 0-1", "score": 0.50 },
 *   { "name": "resilience_features", "test": "Are failover and resilience capabilities clearly described? Rate 0-1", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Provider selection optimization, automatic failover, result deduplication, cross-provider result aggregation, urgency-based prioritization, parallel search execution, error resilience, cache management' as PromptPart;