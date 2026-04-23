import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode risk-admission compatibility PromptPart for danger-wall plan instructions"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_precision", "test": "Plan instructions produce bounded admission checks.", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PLAN_INSTRUCTIONS: PromptPart =
  'Plan Bitcode risk admission by selecting evidence sources, defining checks for unsafe mutation, private-data exposure, proof gaps, AssetPack scope mismatch, delivery-wrapper mismatch, and setting admit/block/manual-review thresholds.' as PromptPart;
