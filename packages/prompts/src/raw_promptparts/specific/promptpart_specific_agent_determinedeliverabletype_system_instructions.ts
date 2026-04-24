import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode compatibility PromptPart for delivery-mechanism selector instructions"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_completeness", "test": "Do instructions cover all aspects?", "score": 0.39 },
 *   { "name": "technical_precision", "test": "Are technical instructions precise?", "score": 0.38 },
 *   { "name": "workflow_clarity", "test": "Is the workflow clear?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIVERABLETYPE_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Select the delivery-mechanism template by parsing the Need, identifying requested Shippable destinations, checking AssetPack evidence requirements, validating destination-specific receipt fields, preserving implementation and validation independence from delivery, and generating metadata for Finish' as PromptPart;
