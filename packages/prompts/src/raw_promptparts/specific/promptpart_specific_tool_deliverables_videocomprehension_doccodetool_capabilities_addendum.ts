import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Deliverables-specific capabilities addendum describing video comprehension focus"
 * current_version: "GA1.50.0"
 * versions: [
 *   { "version": "GA1.20.0", "score": 0.50, "content": "Understands video", "reason": "Missing mention of frame analysis or audio track extraction" }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Mentions frame sampling and audio?", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides concrete analysis approach?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DELIVERABLES_VIDEOCOMPREHENSION_DOCCODETOOL_CAPABILITIES_ADDENDUM: PromptPart =
  'Focus: video comprehension; supports frame sampling, scene/element detection, transcript extraction from audio track, and task-relevance summarization' as PromptPart;
