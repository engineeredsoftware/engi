/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Bitcode read constraint promptpart for the canonical identify-read-constraints tool"
 * current_version: "V26.5.bitcode"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_precision", "test": "Does '{{content}}' use Bitcode read, written-asset, asset-pack, and delivery-mechanism semantics where applicable? Rate 0-1" },
 *   { "name": "canonical_boundary", "test": "Does '{{content}}' preserve Bitcode naming as product meaning and isolate delivery mechanisms? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_IDENTIFYREADCONSTRAINTS_DOCCODETOOLCAPABILITIES: PromptPart =
  "Capabilities: find hard blockers and soft constraints; classify technical, business, resource, timeline, compliance, security, proof, and interface constraints; propose validation methods; attach mitigation strategies without expanding scope beyond the expressed read." as PromptPart;
