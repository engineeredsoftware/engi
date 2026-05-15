/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Bitcode read semantics promptpart for the canonical analyze-read-semantics tool"
 * current_version: "V26.5.bitcode"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_precision", "test": "Does '{{content}}' use Bitcode read, written-asset, asset-pack, and delivery-mechanism semantics where applicable? Rate 0-1" },
 *   { "name": "canonical_boundary", "test": "Does '{{content}}' preserve Bitcode naming as product meaning and isolate delivery mechanisms? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZEREADSEMANTICS_DOCCODETOOLPURPOSE: PromptPart =
  "Analyze an expressed Bitcode read to identify intent, scope, constraints, written-asset expectations, asset-pack context, delivery-mechanism boundaries, source-to-shares service questions, commercial accountability evidence, ambiguity, dependencies, and measurable satisfaction criteria for downstream inference." as PromptPart;
