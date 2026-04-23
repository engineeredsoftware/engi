import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for need discovery and asset-pack planning: agent deliverablesdiscidentifytype purpose corestatement"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESDISCOVERYIDENTIFYTYPE_PURPOSE_CORESTATEMENT: PromptPart = 
  'determine which of the four deliverable types (code-change, code-review, design-change, design-review) to create based on task context and requirements' as PromptPart;