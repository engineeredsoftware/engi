/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: system
 * intent: "Ptrr semantic unit: Refine Substep Prepare Concise Context"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: ptrr
 * intent: "Generic prepare_concise_context substep for refine step"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "substep_clarity", "test": "Clear substep purpose?", "score": 0.95 },
 *   { "name": "execution_guidance", "test": "Provides execution guidance?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_GENERIC_PTRR_REFINE_SUBSTEP_PREPARE_CONCISE_CONTEXT: PromptPart =
  `PTRR Refine · Prepare Concise Context
1. Inspect selector metrics to understand which slices have already been used and which remain relevant for refinement.
2. Select only the deltas needed to reconcile discrepancies (e.g., config overrides, judgment feedback, attachments) and label them with their selector keys.
3. If refinement requires multiple passes, split the payload into deterministic chunks (chunkId ordered, reason for inclusion, estimated size) so retries can resume cleanly.
4. Output the curated \`preparedContexts\` structure exclusively—leave reasoning to the subsequent generation substeps.` as PromptPart;