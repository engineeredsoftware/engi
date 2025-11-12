import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Determine Deliverable Type agent system instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_completeness", "test": "Do instructions cover all aspects?", "score": 0.39 },
 *   { "name": "technical_precision", "test": "Are technical instructions precise?", "score": 0.38 },
 *   { "name": "workflow_clarity", "test": "Is the workflow clear?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIVERABLETYPE_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Determine deliverable type by: parsing request content for type indicators, matching patterns against deliverable templates, identifying required outputs and artifacts, validating type-specific requirements, classifying complexity and resource needs, routing to specialized processing pipelines, generating type-specific metadata' as PromptPart;