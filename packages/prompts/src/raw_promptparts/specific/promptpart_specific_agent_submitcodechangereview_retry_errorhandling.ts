import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry errorhandling for Submit Code Change Review agent with execution state awareness"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_context_utilization", "test": "Does retry errorhandling maximize context value?", "score": 0.35 },
 *   { "name": "retry_state_preservation", "test": "Does retry errorhandling maintain execution continuity?", "score": 0.34 },
 *   { "name": "retry_intelligence_accumulation", "test": "Does retry errorhandling build on accumulated wisdom?", "score": 0.33 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_SUBMITCODECHANGEREVIEW_RETRY_ERRORHANDLING: PromptPart = 
  'Handle submission failures preserving context: recover review from execution artifacts, resolve conflicts using historical state, reconstruct feedback from validation cache, maintain comment threading continuity, preserve review context chain, leverage accumulated review intelligence' as PromptPart;