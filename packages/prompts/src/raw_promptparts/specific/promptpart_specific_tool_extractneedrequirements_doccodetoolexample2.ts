/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Bitcode need requirement promptpart for the canonical extract-need-requirements tool"
 * current_version: "V26.5.bitcode"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_precision", "test": "Does '{{content}}' use Bitcode need, written-asset, asset-pack, and delivery-mechanism semantics where applicable? Rate 0-1" },
 *   { "name": "canonical_boundary", "test": "Does '{{content}}' preserve Bitcode naming as product meaning and isolate delivery mechanisms? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_EXTRACTNEEDREQUIREMENTS_DOCCODETOOLEXAMPLE2: PromptPart =
  "Example 2 - Design-attached need: extractNeedRequirements({ expressedNeed: \"Implement this settings screen\", attachmentContext: [{ name: \"settings.fig\", kind: \"design\", summary: \"Account, billing, repository connection tabs\" }] }) -> produces UI, accessibility, state, and reread requirements tied to the attachment." as PromptPart;
