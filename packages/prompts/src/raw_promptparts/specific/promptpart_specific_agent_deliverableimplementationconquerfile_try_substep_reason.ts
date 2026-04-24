/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode need-grounding substep for written-asset / asset-pack execution: deliverableimplementationconquerfile try substep reason"
 * current_version: "0.50.0"
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
 * intent: "Bitcode need-grounding substep for written-asset / asset-pack execution: deliverableimplementationconquerfile try substep reason"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "agent_specific", "test": "Agent-specific guidance?", "score": 0.96 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEIMPLEMENTATIONCONQUERFILE_TRY_SUBSTEP_REASON: PromptPart = 
  'deliverableimplementationconquerfile try substep reason: ground the step in the expressed Bitcode need, current execution state, written-asset target, proof obligations, and delivery-mechanism limits before selecting the next action.' as PromptPart;