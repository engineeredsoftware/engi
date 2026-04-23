/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode external-evidence research system context"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "context_boundary", "test": "Frames external research as auxiliary and volatile", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_SYSTEM_CONTEXT: PromptPart =
  'Runs inside Bitcode agentic pipelines as admitted auxiliary-input support. Its context is external, source-attributed, and potentially volatile evidence for needs, proof gaps, third-party interfaces, written assets, and AssetPacks; it is not canonical proof.' as PromptPart;
