/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Bitcode need requirement promptpart for the retained extract-requirements compatibility tool"
 * current_version: "V26.5.compat"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_precision", "test": "Does '{{content}}' use Bitcode need, written-asset, asset-pack, and shipping-wrapper semantics where applicable? Rate 0-1" },
 *   { "name": "compatibility_boundary", "test": "Does '{{content}}' preserve compatibility naming only as a wrapper rather than product meaning? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLEXAMPLE3: PromptPart =
  "Example 3 - Shipping-wrapper need: extractNeedRequirements({ expressedNeed: \"Prepare a concise Jira update from the validation findings\", needSemantics: { shippingWrapperBoundaries: [\"Jira comment\"] } }) -> keeps comment payload requirements separate from the underlying diagnostic written asset." as PromptPart;
