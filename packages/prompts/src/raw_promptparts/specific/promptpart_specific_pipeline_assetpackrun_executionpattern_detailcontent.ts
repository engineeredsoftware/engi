import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: pipeline
 * intent: "Bitcode AssetPack-run pipeline PromptPart for SDIVF execution, canonical written assets, and Finish delivery-mechanism separation: pipeline assetpackrun executionpattern detailcontent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.96 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_PIPELINE_ASSETPACKRUN_EXECUTIONPATTERN_DETAILCONTENT: PromptPart =
  'SDIVF pattern: sequential(setup, repeat(sequential(discovery, implementation, validation), {until: score >= 0.9}), finish). Setup establishes repository and read context, discovery shapes the AssetPack synthesis approach, implementation produces writtenAssetType = read-satisfaction-asset-pack plus AssetPack synthesis artifacts, validation verifies read satisfaction, and Finish emits connected-interface Shippables through delivery mechanisms. Each phase stores results in namespaced execution storage. Phases retrieve previous results using execution.get(namespace, key).' as PromptPart;
