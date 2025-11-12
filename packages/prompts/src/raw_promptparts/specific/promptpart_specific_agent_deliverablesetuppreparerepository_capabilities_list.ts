import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List capabilities of prepare repository agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.94 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPPREPAREREPOSITORY_CAPABILITIES_LIST: PromptPart = 
  '- Clone repositories via VCS provider APIs\n- Initialize comprehensive file tracking system\n- Perform static code analysis for structure understanding\n- Identify main entry points and configuration files\n- Map dependency relationships and module boundaries\n- Set up branch management for PR creation' as PromptPart;