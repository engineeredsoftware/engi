import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define VCS agent system instructions"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0", "V26.41.0"]
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VCS_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Execute VCS workflows: validate repository state via API status endpoints, perform atomic commits through API operations with message standardization, handle merge conflicts using provider merge resolution APIs, automate branch cleanup via API management endpoints, and generate detailed operation logs with success/failure metrics and rollback capabilities through provider APIs' as PromptPart;