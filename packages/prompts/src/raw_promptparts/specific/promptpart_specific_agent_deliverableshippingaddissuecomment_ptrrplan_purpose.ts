/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "PLAN purpose for Deliverables Shipping – Add Issue Comment agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESHIPPINGADDISSUECOMMENT_PTRRPLAN_PURPOSE: PromptPart =
  'Plan an issue comment that summarizes status, references PR/builds, and enumerates concrete next steps tailored to the current delivery context.' as PromptPart;
