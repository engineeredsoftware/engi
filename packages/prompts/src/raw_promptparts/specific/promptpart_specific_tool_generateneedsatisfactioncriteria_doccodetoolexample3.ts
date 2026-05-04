/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Bitcode need satisfaction promptpart for the canonical generate-need-satisfaction-criteria tool"
 * current_version: "V26.5.bitcode"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_precision", "test": "Does '{{content}}' use Bitcode need, written-asset, asset-pack, and delivery-mechanism semantics where applicable? Rate 0-1" },
 *   { "name": "canonical_boundary", "test": "Does '{{content}}' preserve Bitcode naming as product meaning and isolate delivery mechanisms? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GENERATENEEDSATISFACTIONCRITERIA_DOCCODETOOLEXAMPLE3: PromptPart =
  "Example 3 - Proof-bearing reform need: generateNeedSatisfactionCriteria({ assetPackContext: { specFiles: [\"BITCODE_SPEC_V26.md\"] }, verificationPosture: \"proof\" }) -> returns criteria for spec update, proof generator inclusion, generated artifact refresh, and passing canonical-input checks." as PromptPart;
