/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Bitcode implementation-complexity promptpart for the canonical analyze-read-satisfaction-implementation-complexity tool"
 * current_version: "V26.5.bitcode"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_precision", "test": "Does '{{content}}' use Bitcode read, written-asset, asset-pack, and delivery-mechanism semantics where applicable? Rate 0-1" },
 *   { "name": "canonical_boundary", "test": "Does '{{content}}' preserve Bitcode naming as product meaning and isolate delivery mechanisms? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZEREADSATISFACTIONIMPLEMENTATIONCOMPLEXITY_DOCCODETOOLPURPOSE: PromptPart =
  "Analyze implementation complexity for satisfying a Bitcode read through asset-pack written-asset synthesis, including code, spec, proof, persistence, interface, test, and delivery-mechanism effort." as PromptPart;
