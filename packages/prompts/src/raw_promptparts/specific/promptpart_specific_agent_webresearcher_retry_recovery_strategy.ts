/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-retry
 * intent: "Bitcode read-synthesis web research retry recovery"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_boundary", "test": "Uses bounded query/source adjustment without overclaiming", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_RETRY_RECOVERY_STRATEGY: PromptPart =
  'Recover by trying canonical product names, protocol terms, official domains, repository owners, standards bodies, vendor docs, date filters, and narrower source classes; stop when evidence is sufficient for discovery-phase read synthesis or the remaining gap is explicit.' as PromptPart;
