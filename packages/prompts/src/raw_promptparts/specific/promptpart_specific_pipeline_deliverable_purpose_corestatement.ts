import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: pipeline
 * intent: "Bitcode AssetPack compatibility-route pipeline PromptPart for need-first asset-pack execution and delivery-mechanism separation: pipeline deliverable purpose corestatement"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_PIPELINE_DELIVERABLE_PURPOSE_CORESTATEMENT: PromptPart = 
  'Use the AssetPack compatibility route to execute a Bitcode need-satisfying asset-pack run: understand the need, synthesize AssetPack synthesis artifacts, store evidence in Finish, and optionally invoke delivery mechanisms through the SDIVF execution pattern' as PromptPart;
