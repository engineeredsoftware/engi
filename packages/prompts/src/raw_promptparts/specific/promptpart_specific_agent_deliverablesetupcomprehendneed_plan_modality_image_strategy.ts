import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Canonical deliverables setup comprehend-need image comprehension plan strategy"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_semantics", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "compatibility_ready", "test": "Retained deliverable corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PLAN_MODALITY_IMAGE_STRATEGY: PromptPart =
  "Images: detect format (PNG/JPEG/SVG). If raster: perform OCR and element detection; if vector: parse layers/nodes. Extract layout, text, and key visual elements; summarize relevance to the expressed need, written assets, and asset-pack context." as PromptPart;
