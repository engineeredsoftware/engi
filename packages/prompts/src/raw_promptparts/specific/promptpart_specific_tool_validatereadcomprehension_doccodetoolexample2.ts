/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Bitcode read-comprehension validation promptpart for the canonical validate-read-comprehension tool"
 * current_version: "V26.5.bitcode"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_precision", "test": "Does '{{content}}' use Bitcode read, written-asset, asset-pack, and delivery-mechanism semantics where applicable? Rate 0-1" },
 *   { "name": "canonical_boundary", "test": "Does '{{content}}' preserve Bitcode naming as product meaning and isolate delivery mechanisms? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VALIDATEREADCOMPREHENSION_DOCCODETOOLEXAMPLE2: PromptPart =
  "Example 2 - Read gap detection: validateReadComprehension({ readComprehension: { writtenAssetType: \"source-change-set\", definitionOfRead: \"done\" }, validationCriteria: { completenessThreshold: 0.9 } }) -> flags missing read, satisfaction criteria, proof plan, and delivery-mechanism boundaries." as PromptPart;
