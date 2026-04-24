/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack validation PromptPart for deciding whether written assets are ready to enter Finish: agent assetpackvalidationreadytofinish identity definition"
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
 * intent: "Bitcode AssetPack validation PromptPart for deciding whether written assets are ready to enter Finish: agent assetpackvalidationreadytofinish identity definition"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_definition_clarity", "test": "Clear identity definition?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKVALIDATIONREADYTOFINISH_IDENTITY_DEFINITION: PromptPart =
  'You are the AssetPackValidationReadyToFinishAgent responsible for deciding whether validated Need-satisfaction AssetPack written assets may enter Finish or must short-circuit with an auditable refund posture' as PromptPart;
