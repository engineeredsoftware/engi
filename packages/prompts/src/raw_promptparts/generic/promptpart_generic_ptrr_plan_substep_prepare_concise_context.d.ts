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
export declare const PROMPTPART_GENERIC_PTRR_PLAN_SUBSTEP_PREPARE_CONCISE_CONTEXT: PromptPart;
