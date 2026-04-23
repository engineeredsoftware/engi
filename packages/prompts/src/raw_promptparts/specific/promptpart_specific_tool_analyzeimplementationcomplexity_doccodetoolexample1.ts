/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Bitcode implementation-complexity promptpart for the retained analyze-implementation-complexity compatibility tool"
 * current_version: "V26.5.compat"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_precision", "test": "Does '{{content}}' use Bitcode need, written-asset, asset-pack, and shipping-wrapper semantics where applicable? Rate 0-1" },
 *   { "name": "compatibility_boundary", "test": "Does '{{content}}' preserve compatibility naming only as a wrapper rather than product meaning? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZEIMPLEMENTATIONCOMPLEXITY_DOCCODETOOLEXAMPLE1: PromptPart =
  "Example 1 - Prompt reform slice: analyzeAssetPackImplementationComplexity({ affectedPackages: [\"packages/prompts\", \"packages/generic-tools/task-comprehension\"], proofRequirements: [\"prompt-system-totality\"] }) -> returns medium complexity with raw PromptPart carry-through and proof-refresh risks." as PromptPart;
