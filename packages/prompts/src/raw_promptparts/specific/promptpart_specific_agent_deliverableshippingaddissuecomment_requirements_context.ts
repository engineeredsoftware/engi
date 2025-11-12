import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Requirements context for Deliverables Shipping – Add Issue Comment agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESHIPPINGADDISSUECOMMENT_REQUIREMENTS_CONTEXT: PromptPart =
  'Comment must include: current status (pass/fail/blocked), precise links (PR, build, artifacts), brief justification/notes, and explicit next actions or ask. Avoid redundancy.' as PromptPart;
