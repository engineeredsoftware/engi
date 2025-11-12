import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan strategy for Understand Requirements agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Is plan strategy effective?", "score": 0.35 },
 *   { "name": "plan_clarity", "test": "Is plan strategy clear?", "score": 0.34 },
 *   { "name": "plan_completeness", "test": "Is plan strategy complete?", "score": 0.33 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_UNDERSTANDREQUIREMENTS_PLAN_STRATEGY: PromptPart = 
  'Plan requirement understanding by determining: analysis methodology, extraction techniques, validation approaches, categorization schemes, priority assignment, traceability setup' as PromptPart;