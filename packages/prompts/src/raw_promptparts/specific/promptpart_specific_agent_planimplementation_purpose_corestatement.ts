import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of implementation planning agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_quality", "test": "Creates actionable plans?", "score": 0.95 },
 *   { "name": "parallelization", "test": "Identifies parallel opportunities?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_PLANIMPLEMENTATION_PURPOSE_CORESTATEMENT: PromptPart = 
  'Create detailed implementation plan with step sequencing, parallelization strategy, file change ordering, test planning, and rollback procedures' as PromptPart;