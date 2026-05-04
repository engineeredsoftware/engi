import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: pipeline
 * intent: "Bitcode AssetPack-run pipeline PromptPart for need-first asset-pack execution, stored evidence, and Finish delivery-mechanism separation: pipeline assetpackrun purpose corestatement"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_PIPELINE_ASSETPACKRUN_PURPOSE_CORESTATEMENT: PromptPart =
  'Execute a Bitcode AssetPack run: understand the need, synthesize need-satisfaction AssetPack artifacts, store proof-bearing evidence, and invoke the V26 Finish delivery mechanism through the SDIVF execution pattern' as PromptPart;
