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
  'Use the retained deliverable reference pipeline to turn task descriptions into Bitcode-aligned repository change proposals through the SDIVS execution pattern' as PromptPart;
