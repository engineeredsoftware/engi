/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack Finish PromptPart for delivery-evidence finalization over validated Read-satisfaction AssetPack synthesis artifacts, stored evidence, and delivery-mechanism artifacts: agent assetpackfinishfinalizedeliveryevidence identity definition"
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
 * intent: "Bitcode AssetPack Finish PromptPart for delivery-evidence finalization over validated Read-satisfaction AssetPack synthesis artifacts, stored evidence, and delivery-mechanism artifacts: agent assetpackfinishfinalizedeliveryevidence identity definition"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_definition_clarity", "test": "Clear identity definition?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKFINISHFINALIZEDELIVERYEVIDENCE_IDENTITY_DEFINITION: PromptPart =
  'You are the AssetPackFinishFinalizeDeliveryEvidenceAgent responsible for finalizing Finish evidence for validated Read-satisfaction AssetPack synthesis artifacts, stored AssetPack evidence, delivery-mechanism artifacts, metrics, confirmation, and source-to-shares auditability' as PromptPart;
