/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Bitcode need-comprehension validation promptpart for the retained validate-task-comprehension compatibility tool"
 * current_version: "V26.5.compat"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_precision", "test": "Does '{{content}}' use Bitcode need, written-asset, asset-pack, and delivery-mechanism semantics where applicable? Rate 0-1" },
 *   { "name": "compatibility_boundary", "test": "Does '{{content}}' preserve compatibility naming only as a wrapper rather than product meaning? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLEXAMPLE1: PromptPart =
  "Example 1 - Need-first validation: validateNeedComprehension({ needComprehension: { primaryIntent: \"fix stream payload\", writtenAssetExpectations: [\"code changes\", \"tests\"] }, canonicalTerminologyRequired: true }) -> passes only if asset-pack and written-asset semantics are explicit." as PromptPart;
