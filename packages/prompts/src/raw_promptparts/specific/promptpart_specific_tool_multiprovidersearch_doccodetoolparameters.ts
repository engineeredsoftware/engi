/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode multi-provider evidence search parameters"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_scope", "test": "Parameters are scoped to Bitcode evidence collection", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLPARAMETERS: PromptPart =
  'query: string (required) - web query derived from the active Bitcode read; urlAttachments: string[] (optional) - source URLs for query targeting; options: object (optional) - provider preferences, source scope, result limits, timeout, and primary-source requirements' as PromptPart;
