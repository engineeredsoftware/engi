import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Plan step: strategy for image attachment comprehension (formats, OCR, detection)"
 * current_version: "GA1.50.0"
 * versions: [
 *   { "version": "GA1.30.0", "score": 0.42, "content": "Analyze images.", "reason": "Too vague; lacks OCR/object/layout guidance" }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Mentions OCR, detection, layout?", "score": 0.49 },
 *   { "name": "implementation_ready", "test": "Actionable strategy steps?", "score": 0.48 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_PLAN_MODALITY_IMAGE_STRATEGY: PromptPart =
  'Images: Detect format (PNG/JPEG/SVG). If raster: perform OCR and element detection; if vector: parse layers/nodes. Extract layout, text, and key visual elements; summarize relevance to the task/DoD.' as PromptPart;
