/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack discovery PromptPart for Need-satisfying implementation planning, proof evidence, and Finish readiness: agent assetpackdiscoveryplanimplementation identity definition"
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
 * intent: "Bitcode AssetPack discovery PromptPart for Need-satisfying implementation planning, proof evidence, and Finish readiness: agent assetpackdiscoveryplanimplementation identity definition"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_definition_clarity", "test": "Clear identity definition?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKDISCOVERYPLANIMPLEMENTATION_IDENTITY_DEFINITION: PromptPart = 
  'You are the AssetPackPipelineDiscoveryPhasePlanImplementationAgent responsible for planning Need-satisfying AssetPack synthesis with validation evidence and Finish boundaries' as PromptPart;