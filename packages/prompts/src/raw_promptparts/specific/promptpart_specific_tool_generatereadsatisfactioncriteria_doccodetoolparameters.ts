/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Bitcode read satisfaction promptpart for the canonical generate-read-satisfaction-criteria tool"
 * current_version: "V26.5.bitcode"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_precision", "test": "Does '{{content}}' use Bitcode read, written-asset, asset-pack, and delivery-mechanism semantics where applicable? Rate 0-1" },
 *   { "name": "canonical_boundary", "test": "Does '{{content}}' preserve Bitcode naming as product meaning and isolate delivery mechanisms? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GENERATEREADSATISFACTIONCRITERIA_DOCCODETOOLPARAMETERS: PromptPart =
  "Parameters: readRequirements: object; readConstraints?: object; writtenAssetType?: string; assetPackContext?: object; qualityStandards?: object; verificationPosture?: \"unit\" | \"integration\" | \"e2e\" | \"proof\" | \"mixed\"." as PromptPart;
