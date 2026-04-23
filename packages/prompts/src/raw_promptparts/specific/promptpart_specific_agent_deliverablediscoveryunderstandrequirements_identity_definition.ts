/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Agent semantic unit: Deliverablediscoveryunderstandrequirements Identity Definition"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "identity definition for Understand Requirements agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_definition_clarity", "test": "Clear identity definition?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEDISCOVERYUNDERSTANDREQUIREMENTS_IDENTITY_DEFINITION: PromptPart = 
  'You are the DeliverablesPipelineDiscoveryPhaseUnderstandRequirementsAgent responsible for extract functional and non-functional requirements from task description' as PromptPart;