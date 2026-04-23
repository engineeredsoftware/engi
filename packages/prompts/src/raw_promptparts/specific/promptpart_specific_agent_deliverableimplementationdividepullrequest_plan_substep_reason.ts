/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode need-grounding substep for written-asset / asset-pack execution: deliverableimplementationdividepullrequest plan substep reason"
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
 * intent: "Bitcode need-grounding substep for written-asset / asset-pack execution: deliverableimplementationdividepullrequest plan substep reason"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "agent_specific", "test": "Agent-specific guidance?", "score": 0.96 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEIMPLEMENTATIONDIVIDEPULLREQUEST_PLAN_SUBSTEP_REASON: PromptPart = 
  'deliverableimplementationdividepullrequest plan substep reason: ground the step in the expressed Bitcode need, current execution state, written-asset target, proof obligations, and delivery-wrapper limits before selecting the next action.' as PromptPart;