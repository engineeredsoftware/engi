import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: pipeline
 * intent: "Bitcode AssetPack-run pipeline PromptPart for read-first discovery, synthesis, validation, and Finish delivery-mechanism separation: pipeline assetpackrun divloop detailcontent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.96 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_PIPELINE_ASSETPACKRUN_DIVLOOP_DETAILCONTENT: PromptPart =
  'DIV (Discovery-Implementation-Validation) loop executes with repeat combinator until validation score >= 0.9 or max iterations reached. Discovery refines the expressed read and selects the AssetPack synthesis path. Each iteration stores validation scores for plateau detection. Implementation synthesizes VCS-compatible AssetPack synthesis artifacts and proof evidence. Validation verifies read satisfaction, automated test suites, and security scans before Finish emits pull-request Shippables through delivery mechanisms.' as PromptPart;
