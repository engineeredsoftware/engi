import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: pipeline
 * intent: "Bitcode retained deliverable-compatibility pipeline PromptPart for need-first asset-pack execution and delivery-mechanism separation: pipeline deliverable divloop detailcontent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.96 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_PIPELINE_DELIVERABLE_DIVLOOP_DETAILCONTENT: PromptPart = 
  'DIV (Discovery-Implementation-Validation) loop executes with repeat combinator until validation score >= 0.9 or max iterations reached. Discovery refines the expressed need and selects the right written-asset synthesis path. Each iteration stores validation scores for plateau detection. Implementation synthesizes VCS-compatible written assets or equivalent asset-pack material. Validation verifies need satisfaction, automated test suites, and security scans before Finish delivery mechanisms run.' as PromptPart;
