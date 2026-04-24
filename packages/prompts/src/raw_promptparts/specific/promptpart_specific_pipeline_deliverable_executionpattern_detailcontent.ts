import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: pipeline
 * intent: "Bitcode retained deliverable-compatibility pipeline PromptPart for need-first asset-pack execution and delivery-mechanism separation: pipeline deliverable executionpattern detailcontent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.96 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_PIPELINE_DELIVERABLE_EXECUTIONPATTERN_DETAILCONTENT: PromptPart = 
  'SDIVS pattern: sequential(setup, repeat(sequential(discovery, implementation, validation), {until: score >= 0.9}), shipping). Setup establishes repository and need context, discovery shapes the asset-pack synthesis approach, implementation produces written assets, validation verifies need satisfaction, and shipping emits connected-interface delivery mechanisms. Each phase stores results in namespaced execution storage. Phases retrieve previous results using execution.get(namespace, key).' as PromptPart;
