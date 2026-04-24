import { PromptPart } from '../../parts/PromptPart';
/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: formatting
 * intent: "Section label used in DocCodeTool prompts for examples"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     version: "V26.45.0",
 *     score: 0.48,
 *     content: "Examples",
 *     reason: "Baseline industrial label, no ambiguity, ready for reuse"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Is the label semantically precise for examples?", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Can developers import and use directly?", "score": 0.50 }
 * ]
 */
export declare const PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL: PromptPart;
