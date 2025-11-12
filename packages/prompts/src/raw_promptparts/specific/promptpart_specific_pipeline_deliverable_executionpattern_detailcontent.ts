import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: pipeline
 * intent: "Describe execution pattern using combinators"
 * current_version: "GA1.50.0"  
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.96 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_PIPELINE_DELIVERABLE_EXECUTIONPATTERN_DETAILCONTENT: PromptPart = 
  'SDIVS pattern: sequential(setup, repeat(sequential(discovery, implementation, validation), {until: score >= 0.9}), shipping). Each phase stores results in namespaced execution storage. Phases retrieve previous results using execution.get(namespace, key).' as PromptPart;