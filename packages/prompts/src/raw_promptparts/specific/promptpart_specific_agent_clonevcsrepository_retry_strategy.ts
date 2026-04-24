import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define RETRY step recovery strategy for Clone VCS Repository agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "recovery_completeness", "test": "Does it cover all failure recovery paths?", "score": 0.44 },
 *   { "name": "strategy_robustness", "test": "Are retry strategies robust and adaptive?", "score": 0.43 },
 *   { "name": "error_categorization", "test": "Does it properly categorize error types?", "score": 0.42 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CLONEVCSREPOSITORY_RETRY_STRATEGY: PromptPart = 
  'Implement adaptive retry strategy with: exponential backoff for network failures starting at 2 seconds, authentication token refresh on 401/403 responses, protocol fallback from SSH to HTTPS on connection failures, mirror endpoint rotation for geographic redundancy, partial clone resumption using received objects, bandwidth throttling on congestion detection, corruption recovery through packfile reconstruction' as PromptPart;