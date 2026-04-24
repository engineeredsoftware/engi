/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for delivery-mechanism separation over validated written assets: agent deliverableshippingaddissuecomment ptrrretry purpose"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESHIPPINGADDISSUECOMMENT_PTRRRETRY_PURPOSE: PromptPart =
  'If posting failed or context changed, recover: update links/status, correct any inaccuracies, and re-post with a single, clear message.' as PromptPart;
