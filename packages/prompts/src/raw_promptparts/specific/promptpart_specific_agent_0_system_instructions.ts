import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Understand Requirements agent system instructions"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_completeness", "test": "Do instructions cover all aspects?", "score": 0.37 },
 *   { "name": "technical_precision", "test": "Are technical instructions precise?", "score": 0.36 },
 *   { "name": "workflow_clarity", "test": "Is the workflow clear?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_0_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Understand requirements by: parsing requirement documents and user stories, extracting functional and non-functional requirements, identifying acceptance criteria and success metrics, mapping requirement dependencies and constraints, detecting requirement conflicts and gaps, building requirement traceability matrices, generating requirement validation reports' as PromptPart;