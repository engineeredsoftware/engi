/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Deliverablesetupdangerwall Plan Substep Prepare Concise Context"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "prepare_concise_context substep for deliverablesetupdangerwall agent plan step"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "agent_specific", "test": "Agent-specific guidance?", "score": 0.96 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPDANGERWALL_PLAN_SUBSTEP_PREPARE_CONCISE_CONTEXT: PromptPart = 
  'Extract security-critical context: check for malicious patterns harmful operations unsafe credentials' as PromptPart;