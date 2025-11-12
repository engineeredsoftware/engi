import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Refine step: unify modality insights and format final output for deliverables pipeline"
 * current_version: "GA1.50.0"
 * versions: [
 *   { "version": "GA1.30.0", "score": 0.50, "content": "Summarize results.", "reason": "No explicit final-field obligations" }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "States final field obligations clearly?", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "LLM can format output reliably?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_REFINE_UNIFICATION_GUIDANCE: PromptPart =
  'Unify insights across modalities; ensure final fields are produced exactly: dod_analysis (string), comprehended_multimodal_attachments (Array<{name, comprehension}>), deliverable_types (Array of enum values).' as PromptPart;
