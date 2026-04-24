import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode AssetPack tool PromptPart for need-first asset-pack setup and written-asset evidence: tool asset-pack imagecomprehension doccodetool capabilities addendum"
 * current_version: "0.50.0"
 * versions: [
 *   { "version": "V26.20.0", "score": 0.50, "content": "Understands images", "reason": "Too vague; lacks industrial specificity" }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete modality terms?", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Can developers implement guidance directly?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_ASSET_PACK_IMAGECOMPREHENSION_DOCCODETOOL_CAPABILITIES_ADDENDUM: PromptPart =
  'Focus: image comprehension (PNG/JPEG/SVG); supports OCR, object/element detection, layout analysis, and task-relevance summarization' as PromptPart;
