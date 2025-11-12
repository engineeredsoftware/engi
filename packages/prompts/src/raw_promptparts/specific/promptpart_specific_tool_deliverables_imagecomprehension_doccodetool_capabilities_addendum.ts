import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Deliverables-specific capabilities addendum describing image comprehension focus"
 * current_version: "GA1.50.0"
 * versions: [
 *   { "version": "GA1.20.0", "score": 0.50, "content": "Understands images", "reason": "Too vague; lacks industrial specificity" }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete modality terms?", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Can developers implement guidance directly?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DELIVERABLES_IMAGECOMPREHENSION_DOCCODETOOL_CAPABILITIES_ADDENDUM: PromptPart =
  'Focus: image comprehension (PNG/JPEG/SVG); supports OCR, object/element detection, layout analysis, and task-relevance summarization' as PromptPart;
