/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: system
 * intent: "Ptrr semantic unit: Retry Substep Prepare Concise Context"
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
 * intent: "Generic prepare_concise_context substep for retry step"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "substep_clarity", "test": "Clear substep purpose?", "score": 0.95 },
 *   { "name": "execution_guidance", "test": "Provides execution guidance?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_GENERIC_PTRR_RETRY_SUBSTEP_PREPARE_CONCISE_CONTEXT: PromptPart =
  `PTRR Retry · Prepare Concise Context
1. Re-assess the selector table plus prior chunk metadata to determine which slices the failed Try already consumed.
2. Surface only the corrective context (e.g., missing files, updated task constraints, fresh attachments) and quote selector namespaces/keys verbatim.
3. Guarantee chunk determinism: if chunking is required, reuse prior chunkIds when content matches or create new ids with explicit reasons for change.
4. Deliver nothing but the refreshed \`preparedContexts\` payload—this failsafe feeds the retry plan with clean, deduplicated context.` as PromptPart;