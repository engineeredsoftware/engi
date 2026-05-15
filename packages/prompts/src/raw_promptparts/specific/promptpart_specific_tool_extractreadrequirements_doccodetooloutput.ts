/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Bitcode read requirement promptpart for the canonical extract-read-requirements tool"
 * current_version: "V26.5.bitcode"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_precision", "test": "Does '{{content}}' use Bitcode read, written-asset, asset-pack, and delivery-mechanism semantics where applicable? Rate 0-1" },
 *   { "name": "canonical_boundary", "test": "Does '{{content}}' preserve Bitcode naming as product meaning and isolate delivery mechanisms? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_EXTRACTREADREQUIREMENTS_DOCCODETOOLOUTPUT: PromptPart =
  "Returns ReadRequirements with functionalRequirements, nonFunctionalRequirements, businessRequirements, technicalRequirements, proofRequirements, interfaceRequirements, extractionMetadata, evidenceLinks, and writtenAssetRequirementMap." as PromptPart;
