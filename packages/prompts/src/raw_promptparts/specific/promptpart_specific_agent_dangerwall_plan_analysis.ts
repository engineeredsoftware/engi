import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode risk-admission compatibility PromptPart for danger-wall plan analysis"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "analysis_scope", "test": "Plan analysis covers need and AssetPack admission scope.", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PLAN_ANALYSIS: PromptPart =
  'Analyze the current Bitcode need, written-asset target, AssetPack intent, repository evidence, external evidence, proof obligations, and delivery mechanism to identify admission blockers and review-only concerns.' as PromptPart;
