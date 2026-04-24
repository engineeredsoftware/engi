/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: system
 * intent: "Ptrr semantic unit: Plan Substep Prepare Concise Context"
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
 * intent: "Generic prepare_concise_context substep for plan step"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "substep_clarity", "test": "Clear substep purpose?", "score": 0.95 },
 *   { "name": "execution_guidance", "test": "Provides execution guidance?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_GENERIC_PTRR_PLAN_SUBSTEP_PREPARE_CONCISE_CONTEXT: PromptPart =
  `PTRR Plan · Prepare Concise Context
1. Read the selector table (namespace/key/sizeEstimate) emitted by the execution context. Rank the highest-signal slices required to plan the next Try.
2. Copy selector keys verbatim when choosing data (repository, task, source, Definition of Need, config, attachments, ai_documents, pipeline input, instructions). Never invent new namespaces.
3. If the combined payload exceeds the chunk budget, partition it into labelled chunks (chunkId + rationale + approximate size) so ChunkThenSum can operate deterministically.
4. Output structured \`preparedContexts\` only—no reasoning. The downstream children consume this context snapshot as-is.` as PromptPart;
