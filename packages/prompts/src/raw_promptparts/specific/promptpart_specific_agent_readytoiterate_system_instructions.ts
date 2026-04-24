import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Ready to Iterate agent system instructions"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_completeness", "test": "Do instructions cover all aspects?", "score": 0.39 },
 *   { "name": "technical_precision", "test": "Are technical instructions precise?", "score": 0.38 },
 *   { "name": "workflow_clarity", "test": "Is the workflow clear?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOITERATE_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Validate iteration readiness by: checking prerequisite completion status, verifying resource availability and constraints, validating data integrity and consistency, ensuring environment configuration correctness, confirming dependency satisfaction, preparing iteration context and state, signaling readiness or blocking with reasons' as PromptPart;