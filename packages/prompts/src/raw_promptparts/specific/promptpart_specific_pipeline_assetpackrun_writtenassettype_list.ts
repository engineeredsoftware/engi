import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: pipeline
 * intent: "Bitcode AssetPack-run pipeline PromptPart for canonical written-asset type ownership and Finish delivery-mechanism separation: pipeline assetpackrun writtenassettype list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.96 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_PIPELINE_ASSETPACKRUN_WRITTENASSETTYPE_LIST: PromptPart =
  'read-satisfaction-asset-pack: Synthesize verified AssetPack synthesis artifacts from the expressed read. V26 Finish currently resolves the pull-request delivery mechanism while keeping delivery-mechanism selection separate from writtenAssetType.' as PromptPart;
