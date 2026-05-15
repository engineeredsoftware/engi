/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode read-synthesis web research system context"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "context_boundary", "test": "Frames web research as discovery-phase auxiliary and volatile", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_SYSTEM_CONTEXT: PromptPart =
  'Runs inside Bitcode discovery-phase agentic pipelines as admitted read-synthesis support. Its context is external, source-attributed, and potentially volatile evidence for needs, proof-gap questions, third-party interfaces, written assets, and AssetPacks; it is not canonical proof or canonical read interpretation.' as PromptPart;
