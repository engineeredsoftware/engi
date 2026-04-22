/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Tool-specific semantic unit (PROMPTPART_SPECIFIC_TOOL_GITHUBMCP_DOCCODETOOLCAPABILITIES)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GITHUBMCP_DOCCODETOOLCAPABILITIES: PromptPart = 
  `- REPOSITORY CONTEXT: read repository identity, ownership, and metadata when Bitcode needs repo-grounded context
- ISSUE AND PR CARRIERS: expose issue and pull request operations where GitHub is the admitted fourth-gate settlement and review surface
- INITIAL SETTLE-WRITE BOUNDARY: keep branch and pull-request-oriented settlement available as the first admitted write target for testnet-ready Bitcode
- FAIL-CLOSED RUNTIME: return explicit unavailable results when the retained fourth-gate runtime does not admit live GitHub execution
- STRUCTURED METADATA: preserve owner, repo, params, and operation metadata so Bitcode can audit intended GitHub effects` as PromptPart;
