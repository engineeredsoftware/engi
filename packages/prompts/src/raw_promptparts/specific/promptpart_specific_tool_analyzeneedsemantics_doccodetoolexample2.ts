/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Bitcode need semantics promptpart for the canonical analyze-need-semantics tool"
 * current_version: "V26.5.bitcode"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_precision", "test": "Does '{{content}}' use Bitcode need, written-asset, asset-pack, and delivery-mechanism semantics where applicable? Rate 0-1" },
 *   { "name": "canonical_boundary", "test": "Does '{{content}}' preserve Bitcode naming as product meaning and isolate delivery mechanisms? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZENEEDSEMANTICS_DOCCODETOOLEXAMPLE2: PromptPart =
  "Example 2 - Comment written asset: analyzeNeedSemantics({ expressedNeed: \"Summarize why the failed deployment is blocked and post it to Jira\", attachmentSummaries: [{ name: \"build.log\", kind: \"log\", summary: \"Typecheck failed in auth route\" }] }) -> separates diagnostic facts, satisfaction criteria, and Jira comment delivery metadata." as PromptPart;
