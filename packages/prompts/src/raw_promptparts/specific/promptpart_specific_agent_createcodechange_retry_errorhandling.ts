import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry errorhandling for Create Code Change agent with execution state awareness"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_context_utilization", "test": "Does retry errorhandling maximize context value?", "score": 0.35 },
 *   { "name": "retry_state_preservation", "test": "Does retry errorhandling maintain execution continuity?", "score": 0.34 },
 *   { "name": "retry_intelligence_accumulation", "test": "Does retry errorhandling build on accumulated wisdom?", "score": 0.33 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATECODECHANGE_RETRY_ERRORHANDLING: PromptPart = 
  'Handle failures through context preservation: maintain execution state integrity, recover from API failures using cached data, resolve conflicts using implementation history, reconstruct PR from validation artifacts, leverage accumulated wisdom for resolution, preserve context chain continuity' as PromptPart;