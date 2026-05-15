import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack-native PromptPart for read-first written-asset / asset-pack execution: agent assetpackpipeline clonevcsrepository system constraints"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "constraint_clarity", "test": "Constraints are actionable and precise", "score": 0.5 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKPIPELINE_CLONEVCSREPOSITORY_SYSTEM_CONSTRAINTS: PromptPart =
  'Do not perform destructive operations; remain provider-agnostic; ensure idempotent retries; record repository coordinates for later phases' as PromptPart;
