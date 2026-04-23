/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Bitcode need constraint promptpart for the retained identify-constraints compatibility tool"
 * current_version: "V26.5.compat"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_precision", "test": "Does '{{content}}' use Bitcode need, written-asset, asset-pack, and shipping-wrapper semantics where applicable? Rate 0-1" },
 *   { "name": "compatibility_boundary", "test": "Does '{{content}}' preserve compatibility naming only as a wrapper rather than product meaning? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_IDENTIFYCONSTRAINTS_DOCCODETOOLPARAMETERS: PromptPart =
  "Parameters: needContext: NeedSemantics | object; repositoryContext?: object; productContext?: object; proofContext?: object; readinessContext?: object; shippingWrapperContext?: object; severityModel?: \"blocking\" | \"riskWeighted\" | \"audit\"." as PromptPart;
