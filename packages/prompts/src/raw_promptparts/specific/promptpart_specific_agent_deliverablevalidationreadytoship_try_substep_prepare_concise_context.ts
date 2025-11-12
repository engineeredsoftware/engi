/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Deliverablevalidationreadytoship Try Substep Prepare Concise Context"
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
 * intent: "prepare_concise_context substep for deliverablevalidationreadytoship agent try step"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "agent_specific", "test": "Agent-specific guidance?", "score": 0.96 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEVALIDATIONREADYTOSHIP_TRY_SUBSTEP_PREPARE_CONCISE_CONTEXT: PromptPart = 
  'deliverablevalidationreadytoship try prepare_concise_context: extract and organize relevant context from execution state minimizing noise' as PromptPart;