/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Bitcode need constraint promptpart for the canonical identify-need-constraints tool"
 * current_version: "V26.5.bitcode"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_precision", "test": "Does '{{content}}' use Bitcode need, written-asset, asset-pack, and delivery-mechanism semantics where applicable? Rate 0-1" },
 *   { "name": "canonical_boundary", "test": "Does '{{content}}' preserve Bitcode naming as product meaning and isolate delivery mechanisms? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_IDENTIFYNEEDCONSTRAINTS_DOCCODETOOLEXAMPLE3: PromptPart =
  "Example 3 - Delivery-mechanism constraint: identifyNeedConstraints({ deliveryMechanismContext: { mechanism: \"GitHubPullRequest\", branchPolicy: \"no-force-push\" } }) -> keeps PR mechanics as delivery-mechanism constraints while preserving asset-pack written-asset scope." as PromptPart;
