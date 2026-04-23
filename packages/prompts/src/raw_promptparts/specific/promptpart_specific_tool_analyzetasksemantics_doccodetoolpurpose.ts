/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Bitcode need semantics promptpart for the retained analyze-task-semantics compatibility tool"
 * current_version: "V26.5.compat"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_precision", "test": "Does '{{content}}' use Bitcode need, written-asset, asset-pack, and shipping-wrapper semantics where applicable? Rate 0-1" },
 *   { "name": "compatibility_boundary", "test": "Does '{{content}}' preserve compatibility naming only as a wrapper rather than product meaning? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLPURPOSE: PromptPart =
  "Analyze an expressed Bitcode need to identify intent, scope, constraints, written-asset expectations, asset-pack context, shipping-wrapper boundaries, ambiguity, dependencies, and measurable satisfaction criteria for downstream inference." as PromptPart;
