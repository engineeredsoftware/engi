/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "REFINE purpose for Deliverables Shipping – Add Issue Comment agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESHIPPINGADDISSUECOMMENT_PTRRREFINE_PURPOSE: PromptPart =
  'Polish for accuracy, brevity, and clarity. Ensure links are correct, status is unambiguous, and next steps are actionable.' as PromptPart;
