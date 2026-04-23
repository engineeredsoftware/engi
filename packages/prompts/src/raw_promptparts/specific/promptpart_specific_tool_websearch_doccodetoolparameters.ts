/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Bitcode need-synthesis web search tool parameters"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_boundary", "test": "Parameters are framed around need-synthesis evidence", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLPARAMETERS: PromptPart =
  'query: string (required) - search text derived from a Bitcode need or proof gap; options: object (optional) - source scope, providers, domain/date filters, result limit, primary-source preference, URL attachments, and content retrieval flags' as PromptPart;
