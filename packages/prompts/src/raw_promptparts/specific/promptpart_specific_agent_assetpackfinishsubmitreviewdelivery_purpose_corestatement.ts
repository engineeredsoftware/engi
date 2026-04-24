/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack Finish delivery PromptPart for providing validated Need-satisfaction AssetPack synthesis artifacts through a delivery mechanism: agent assetpackfinishsubmitreviewdelivery purpose corestatement"
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
 * intent: "Bitcode AssetPack Finish delivery PromptPart for providing validated Need-satisfaction AssetPack synthesis artifacts through a delivery mechanism: agent assetpackfinishsubmitreviewdelivery purpose corestatement"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_corestatement_clarity", "test": "Clear purpose corestatement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKFINISHSUBMITREVIEWDELIVERY_PURPOSE_CORESTATEMENT: PromptPart = 
  'Core purpose: submitting a review-comment delivery mechanism for validated Need-satisfaction AssetPack synthesis artifacts ensuring quality accuracy and completeness at every step' as PromptPart;