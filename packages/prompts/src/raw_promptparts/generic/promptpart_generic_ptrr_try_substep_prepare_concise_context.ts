/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: system
 * intent: "Ptrr semantic unit: Try Substep Prepare Concise Context"
 * current_version: "GA1.50.0"
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
 * intent: "Generic prepare_concise_context substep for try step"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "substep_clarity", "test": "Clear substep purpose?", "score": 0.95 },
 *   { "name": "execution_guidance", "test": "Provides execution guidance?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_GENERIC_PTRR_TRY_SUBSTEP_PREPARE_CONCISE_CONTEXT: PromptPart =
  `PTRR Try · Prepare Concise Context
1. Re-use the ranked selector table to pull only the context slices required to execute the attempted solution. Cite namespaces + keys exactly.
2. Preserve provenance: for every slice note why it is needed for this Try so reviewers can audit context lift.
3. When the payload is too large, shard it into ordered chunks with chunkId, rationale, and selector references so ChunkThenSum can stream each piece reliably.
4. Emit only the serialized \`preparedContexts\` array—no opinions, no plans. This failsafe’s role is pure context curation.` as PromptPart;