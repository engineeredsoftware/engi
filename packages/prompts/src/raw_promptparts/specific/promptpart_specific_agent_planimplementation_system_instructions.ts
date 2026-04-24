import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Plan Implementation agent system instructions"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_completeness", "test": "Do instructions cover all aspects?", "score": 0.37 },
 *   { "name": "technical_precision", "test": "Are technical instructions precise?", "score": 0.36 },
 *   { "name": "workflow_clarity", "test": "Is the workflow clear?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_PLANIMPLEMENTATION_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Plan implementation through: decomposing requirements into technical tasks, designing solution architecture and components, establishing implementation phases and milestones, defining interfaces and contracts, allocating resources and estimating effort, identifying risks and mitigation strategies, creating detailed execution roadmap' as PromptPart;