/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode read-grounding substep for written-asset / asset-pack execution: assetpacksetupreadytoiterate try substep reason"
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
 * intent: "Bitcode read-grounding substep for written-asset / asset-pack execution: assetpacksetupreadytoiterate try substep reason"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "agent_specific", "test": "Agent-specific guidance?", "score": 0.96 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSETUPREADYTOITERATE_TRY_SUBSTEP_REASON: PromptPart = 
  'assetpacksetupreadytoiterate try substep reason: ground the step in the expressed Bitcode read, current execution state, written-asset target, proof obligations, and delivery-mechanism limits before selecting the next action.' as PromptPart;