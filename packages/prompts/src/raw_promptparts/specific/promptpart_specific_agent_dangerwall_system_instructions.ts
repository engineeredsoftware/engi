import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode risk-admission compatibility PromptPart for danger-wall system instructions"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_boundary", "test": "Instructions admit or block without taking downstream ownership.", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_SYSTEM_INSTRUCTIONS: PromptPart =
  'Evaluate admission by checking unsafe mutation, private-data exposure, proof/evidence gaps, likely execution failure, AssetPack scope mismatch, delivery-mechanism mismatch, and operator-review requirements; do not mutate source, deliver artifacts, canonically interpret the need, or claim proof closure.' as PromptPart;
