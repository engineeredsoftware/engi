/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode structured-output substep for read satisfaction, writtenAssets, assetPack, and deliveryMechanism fields: assetpacksetupdangerwall plan substep structured output"
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
 * intent: "Bitcode structured-output substep for read satisfaction, writtenAssets, assetPack, and deliveryMechanism fields: assetpacksetupdangerwall plan substep structured output"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "agent_specific", "test": "Agent-specific guidance?", "score": 0.96 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSETUPDANGERWALL_PLAN_SUBSTEP_STRUCTURED_OUTPUT: PromptPart = 
  'assetpacksetupdangerwall plan substep structured output: return structured output with read satisfaction, writtenAssetType, writtenAssets and assetPack evidence, validation status, and deliveryMechanism fields only when PR Delivering through a GitHub pull-request is required.' as PromptPart;
