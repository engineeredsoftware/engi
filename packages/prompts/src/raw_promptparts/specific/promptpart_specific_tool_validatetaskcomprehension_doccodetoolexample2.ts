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

export const PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLEXAMPLE2: PromptPart =
  "Example 2 - Compatibility residue detection: validateNeedComprehension({ needComprehension: { deliverableType: \"pull-request\", definitionOfNeed: \"ship it\" }, validationCriteria: { completenessThreshold: 0.9 } }) -> flags missing need, satisfaction criteria, proof plan, and wrapper boundaries." as PromptPart;
