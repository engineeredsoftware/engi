/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Bitcode implementation-complexity promptpart for the retained analyze-implementation-complexity compatibility tool"
 * current_version: "V26.5.compat"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_precision", "test": "Does '{{content}}' use Bitcode need, written-asset, asset-pack, and delivery-mechanism semantics where applicable? Rate 0-1" },
 *   { "name": "compatibility_boundary", "test": "Does '{{content}}' preserve compatibility naming only as a wrapper rather than product meaning? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZEIMPLEMENTATIONCOMPLEXITY_DOCCODETOOLPURPOSE: PromptPart =
  "Analyze implementation complexity for satisfying a Bitcode need through asset-pack written-asset synthesis, including code, spec, proof, persistence, interface, test, and delivery-mechanism effort." as PromptPart;
