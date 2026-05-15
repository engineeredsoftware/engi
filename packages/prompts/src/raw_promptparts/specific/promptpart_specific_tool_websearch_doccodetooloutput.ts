/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Bitcode read-synthesis web search tool output"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "output_traceability", "test": "Output describes source attribution and evidence use", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLOUTPUT: PromptPart =
  'Search results containing title, URL, snippet, provider, source class, relevance score, source-quality signal, publication or retrieval metadata, and evidence-use notes for Bitcode read synthesis' as PromptPart;
