/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing urgent search with failover"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "urgency_handling", "test": "Does '{{content}}' demonstrate urgent search configuration? Rate 0-1" },
 *   { "name": "resilience_features", "test": "Does '{{content}}' show failover and retry settings? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Example 3 - Urgent resilient search: search({ query: "production outage kubernetes", options: { urgency: "high", retryCount: 3, fallbackProviders: true, timeout: 5000 } })' as PromptPart;