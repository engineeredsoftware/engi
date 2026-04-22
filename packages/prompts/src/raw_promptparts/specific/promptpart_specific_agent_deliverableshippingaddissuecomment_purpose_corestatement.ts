/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Purpose for Deliverables Shipping – Add Issue Comment agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESHIPPINGADDISSUECOMMENT_PURPOSE_CORESTATEMENT: PromptPart =
  'Post a precise issue comment reflecting current delivery status with links to PRs/builds, key findings, and clear next actions. Keep it professional, factual, and brief.' as PromptPart;
