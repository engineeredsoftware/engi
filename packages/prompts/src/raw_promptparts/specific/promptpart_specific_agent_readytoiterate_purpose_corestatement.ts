import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of ready-to-iterate decision agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "decision_accuracy", "test": "Makes correct go/no-go decisions?", "score": 0.97 },
 *   { "name": "blocker_identification", "test": "Identifies critical blockers?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOITERATE_PURPOSE_CORESTATEMENT: PromptPart = 
  'Evaluate setup phase results to determine pipeline continuation readiness with blocker identification and short-circuit signaling' as PromptPart;