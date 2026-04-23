/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Bitcode source content retrieval parameters"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_scope", "test": "Parameters are scoped to source evidence retrieval", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GETCONTENTS_DOCCODETOOLPARAMETERS: PromptPart =
  'url: string (required) - cited source URL to retrieve; format: "markdown"|"html"|"text" (optional) - desired evidence format; options: object (optional) - timeout, headers, metadata, link extraction, and content filters' as PromptPart;
