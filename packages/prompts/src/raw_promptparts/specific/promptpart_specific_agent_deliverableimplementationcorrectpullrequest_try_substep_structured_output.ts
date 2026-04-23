/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode structured-output substep for need satisfaction, writtenAssets, assetPack, and deliveryMechanism fields: deliverableimplementationcorrectpullrequest try substep structured output"
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
 * intent: "Bitcode structured-output substep for need satisfaction, writtenAssets, assetPack, and deliveryMechanism fields: deliverableimplementationcorrectpullrequest try substep structured output"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "agent_specific", "test": "Agent-specific guidance?", "score": 0.96 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEIMPLEMENTATIONCORRECTPULLREQUEST_TRY_SUBSTEP_STRUCTURED_OUTPUT: PromptPart = 
  'deliverableimplementationcorrectpullrequest try substep structured output: return structured output with need satisfaction, writtenAssetType, writtenAssets, assetPack evidence, validation status, and deliveryMechanism wrapper fields when shipping is needed.' as PromptPart;