/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack Finish delivery PromptPart for providing validated Need-satisfaction AssetPack written assets through a delivery mechanism: agent assetpackfinishcreatepullrequestdelivery purpose corestatement"
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
 * intent: "Bitcode AssetPack Finish delivery PromptPart for providing validated Need-satisfaction AssetPack written assets through a delivery mechanism: agent assetpackfinishcreatepullrequestdelivery purpose corestatement"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_corestatement_clarity", "test": "Clear purpose corestatement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKFINISHCREATEPULLREQUESTDELIVERY_PURPOSE_CORESTATEMENT: PromptPart = 
  'Core purpose: create a pull-request delivery mechanism for validated Need-satisfaction AssetPack written assets on the VCS platform, with title, description, and metadata ensuring quality, accuracy, and completeness at every step' as PromptPart;
