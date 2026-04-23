/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Bitcode need-comprehension validation promptpart for the retained validate-task-comprehension compatibility tool"
 * current_version: "V26.5.compat"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_precision", "test": "Does '{{content}}' use Bitcode need, written-asset, asset-pack, and shipping-wrapper semantics where applicable? Rate 0-1" },
 *   { "name": "compatibility_boundary", "test": "Does '{{content}}' preserve compatibility naming only as a wrapper rather than product meaning? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLPURPOSE: PromptPart =
  "Validate that a retained compatibility analysis has correctly understood the Bitcode need, written-asset expectations, asset-pack boundaries, constraints, satisfaction criteria, and shipping-wrapper limits before synthesis proceeds." as PromptPart;
