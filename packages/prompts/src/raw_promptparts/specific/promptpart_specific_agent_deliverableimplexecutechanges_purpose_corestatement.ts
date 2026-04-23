import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for written-asset synthesis from asset-pack execution: agent deliverableimplexecutechanges purpose corestatement"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEIMPLEXECUTECHANGES_PURPOSE_CORESTATEMENT: PromptPart = 
  'generate high-quality code changes for PR implementation following established patterns and conventions' as PromptPart;