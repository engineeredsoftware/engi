import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Try step: execution details for image comprehension"
 * current_version: "GA1.50.0"
 * versions: [
 *   { "version": "GA1.30.0", "score": 0.50, "content": "Run OCR.", "reason": "Needs detection/layout steps and summarization" }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Sequenced operations present?", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Usable directly in execution?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_TRY_MODALITY_IMAGE_EXECUTION: PromptPart =
  'Execute: if raster → OCR + object/element detection; if vector → layer/node parsing. Extract text, entities, positions; produce task-relevant comprehension.' as PromptPart;
