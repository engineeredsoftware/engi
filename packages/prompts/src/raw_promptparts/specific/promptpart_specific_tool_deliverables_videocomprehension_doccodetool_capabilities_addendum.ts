import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode retained deliverable-compatibility tool PromptPart for need-first asset-pack setup and written-asset evidence: tool deliverables videocomprehension doccodetool capabilities addendum"
 * current_version: "0.50.0"
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
