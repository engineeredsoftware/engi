/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Demonstrates source-grounding proof and delivery-wrapper terminology in a package boundary"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "targeting_precision", "test": "Does '{{content}}' show precise directory targeting? Rate 0-1", "score": 0.50 },
 *   { "name": "import_pattern_accuracy", "test": "Is the import pattern accurate and comprehensive? Rate 0-1", "score": 0.50 },
 *   { "name": "asset_pack_grounding_value", "test": "Does the example support effective AssetPack source-grounding? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Example 3 - Ground proof and delivery-wrapper terminology: simpleSystemTextSearch({ pattern: "proof|deliveryMechanism|writtenAsset", cwd: "/repo/packages/pipelines", maxResults: 75, ignoreCase: true })' as PromptPart;
