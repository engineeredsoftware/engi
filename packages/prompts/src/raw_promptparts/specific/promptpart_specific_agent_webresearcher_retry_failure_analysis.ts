import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-retry
 * intent: "Analyze failure causes: query mismatch, rate limits, source unavailability, or format errors"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Identifies concrete failure categories", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Feeds recovery action selection", "score": 0.46 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_RETRY_FAILURE_ANALYSIS: PromptPart =
  'Diagnose why results failed (query too broad/narrow, blocked requests, stale endpoints, scraping/parsing error) and map to corrective actions.' as PromptPart;
