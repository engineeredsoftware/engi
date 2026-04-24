/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Instruct substep to break large inputs into logical manageable chunks"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.92 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.92 }
 * ]
 */
import { PromptPart } from '../../parts/PromptPart';
export declare const PROMPTPART_GENERIC_AGENT_FAILSAFE_CHUNK: PromptPart;
