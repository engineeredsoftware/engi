/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Bitcode read requirement promptpart for the canonical extract-read-requirements tool"
 * current_version: "V26.5.bitcode"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_precision", "test": "Does '{{content}}' use Bitcode read, written-asset, asset-pack, and delivery-mechanism semantics where applicable? Rate 0-1" },
 *   { "name": "canonical_boundary", "test": "Does '{{content}}' preserve Bitcode naming as product meaning and isolate delivery mechanisms? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_EXTRACTREADREQUIREMENTS_DOCCODETOOLEXAMPLE3: PromptPart =
  "Example 3 - Delivery-mechanism read: extractReadRequirements({ expressedRead: \"Prepare a concise Jira update from the validation findings\", readSemantics: { deliveryMechanismBoundaries: [\"Jira comment\"] } }) -> keeps comment payload requirements separate from the underlying diagnostic written asset." as PromptPart;
