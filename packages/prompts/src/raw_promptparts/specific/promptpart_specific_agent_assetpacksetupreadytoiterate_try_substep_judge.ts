/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode judgment substep for need satisfaction, written-asset integrity, delivery-mechanism separation, and proof evidence: assetpacksetupreadytoiterate try substep judge"
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
 * intent: "Bitcode judgment substep for need satisfaction, written-asset integrity, delivery-mechanism separation, and proof evidence: assetpacksetupreadytoiterate try substep judge"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "agent_specific", "test": "Agent-specific guidance?", "score": 0.96 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSETUPREADYTOITERATE_TRY_SUBSTEP_JUDGE: PromptPart = 
  'assetpacksetupreadytoiterate try substep judge: evaluate whether the output satisfies the Bitcode need, preserves written-asset integrity, separates delivery mechanisms, and records enough proof evidence for acceptance.' as PromptPart;