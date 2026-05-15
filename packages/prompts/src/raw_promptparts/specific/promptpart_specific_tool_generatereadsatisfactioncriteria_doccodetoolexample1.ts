/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Bitcode read satisfaction promptpart for the canonical generate-read-satisfaction-criteria tool"
 * current_version: "V26.5.bitcode"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_precision", "test": "Does '{{content}}' use Bitcode read, written-asset, asset-pack, and delivery-mechanism semantics where applicable? Rate 0-1" },
 *   { "name": "canonical_boundary", "test": "Does '{{content}}' preserve Bitcode naming as product meaning and isolate delivery mechanisms? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GENERATEREADSATISFACTIONCRITERIA_DOCCODETOOLEXAMPLE1: PromptPart =
  "Example 1 - Code written asset: generateReadSatisfactionCriteria({ writtenAssetType: \"source-change-set\", verificationPosture: \"mixed\" }) -> requires source changes, focused tests, typecheck, rereadable summary, and PR delivery mechanism coherence." as PromptPart;
