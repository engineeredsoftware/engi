/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Instruct substep to continue and complete partial outputs seamlessly"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.91 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.91 }
 * ]
 */
import { PromptPart } from '../../parts/PromptPart';
export declare const PROMPTPART_GENERIC_AGENT_FAILSAFE_STITCH: PromptPart;
