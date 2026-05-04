/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Bitcode implementation-complexity promptpart for the canonical analyze-need-satisfaction-implementation-complexity tool"
 * current_version: "V26.5.bitcode"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_precision", "test": "Does '{{content}}' use Bitcode need, written-asset, asset-pack, and delivery-mechanism semantics where applicable? Rate 0-1" },
 *   { "name": "canonical_boundary", "test": "Does '{{content}}' preserve Bitcode naming as product meaning and isolate delivery mechanisms? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZENEEDSATISFACTIONIMPLEMENTATIONCOMPLEXITY_DOCCODETOOLEXAMPLE2: PromptPart =
  "Example 2 - Exchange route change: analyzeNeedSatisfactionImplementationComplexity({ writtenAssetType: \"source-change-set\", affectedPackages: [\"packages/api\", \"uapi\"], deliveryMechanism: \"GitHubPullRequest\" }) -> separates route semantics, client stream parsing, persistence, and PR delivery mechanism complexity." as PromptPart;
