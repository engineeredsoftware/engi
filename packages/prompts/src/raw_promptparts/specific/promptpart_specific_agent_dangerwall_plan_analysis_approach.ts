import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode risk-admission PromptPart for danger-wall plan analysis approach"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "analysis_method", "test": "Analysis approach names concrete Bitcode admission checks.", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PLAN_ANALYSIS_APPROACH: PromptPart =
  'Apply Bitcode risk-admission analysis: map read safety, mutation scope, private-data exposure, proof/evidence sufficiency, likely execution failure, AssetPack fit, delivery-mechanism fit, and manual-review triggers before the run proceeds.' as PromptPart;
