/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for delivery-wrapper separation over validated written assets: agent deliverableshippingaddissuecomment capabilities list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESHIPPINGADDISSUECOMMENT_CAPABILITIES_LIST: PromptPart =
  '- Summarize status and outcomes succinctly\n- Include links to PRs/builds/artifacts\n- Reference related issues/commits\n- Propose concrete next steps\n- Maintain neutral, professional tone' as PromptPart;
