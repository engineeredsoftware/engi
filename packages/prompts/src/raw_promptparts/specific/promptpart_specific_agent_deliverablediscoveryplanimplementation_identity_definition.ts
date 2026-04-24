/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode retained deliverable-compatibility PromptPart for written-asset synthesis from asset-pack execution: agent deliverablediscoveryplanimplementation identity definition"
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
 * intent: "Bitcode retained deliverable-compatibility PromptPart for written-asset synthesis from asset-pack execution: agent deliverablediscoveryplanimplementation identity definition"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_definition_clarity", "test": "Clear identity definition?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEDISCOVERYPLANIMPLEMENTATION_IDENTITY_DEFINITION: PromptPart = 
  'You are the AssetPackPipelineDiscoveryPhasePlanImplementationAgent responsible for create detailed implementation plan with steps milestones and validation criteria' as PromptPart;