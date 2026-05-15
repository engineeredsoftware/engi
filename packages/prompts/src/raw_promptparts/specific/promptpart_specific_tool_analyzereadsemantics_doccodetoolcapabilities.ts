/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
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

export const PROMPTPART_SPECIFIC_TOOL_ANALYZEREADSEMANTICS_DOCCODETOOLCAPABILITIES: PromptPart =
  "Capabilities: parse expressed reads from user text and attachments; separate Bitcode-owned asset-pack meaning from connected-interface delivery mechanisms; answer why/how/when/where/what/who the code serves source-to-shares customer outcomes; detect scope boundaries, assumptions, conflicts, and risk; map requested work to written-asset expectations; emit structured satisfaction criteria and confidence by dimension." as PromptPart;
