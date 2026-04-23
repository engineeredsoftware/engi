import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: pipeline
 * intent: "Define core purpose of deliverables pipeline"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_PIPELINE_DELIVERABLE_PURPOSE_CORESTATEMENT: PromptPart = 
  'Use the retained deliverable compatibility pipeline to execute a Bitcode need-satisfying asset-pack run: understand the need, synthesize stable written assets, and hand them to shipping delivery mechanisms through the SDIVS execution pattern' as PromptPart;
