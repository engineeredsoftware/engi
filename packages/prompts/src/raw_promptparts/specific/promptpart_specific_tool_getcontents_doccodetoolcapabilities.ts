/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Bitcode source content retrieval tool capabilities"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "source_content", "test": "Capabilities support cited source retrieval", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GETCONTENTS_DOCCODETOOLCAPABILITIES: PromptPart =
  'Retrieve specific source URLs, convert cited content to markdown, HTML, or plain text, preserve page metadata, extract relevant links, and support source-quality review for Bitcode read-synthesis evidence' as PromptPart;
