import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for ComprehendTask PLAN step"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it clearly label the PLAN step? Rate 0-1", "score": 0.95 },
 *   { "name": "strategy_reference", "test": "Does it note task comprehension strategy focus? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_PHASE_PLAN_LABEL: PromptPart =
  'PLAN: Task Comprehension Strategy' as PromptPart;
