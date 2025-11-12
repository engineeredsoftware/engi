import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define frame-level analysis workflow"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "computer_vision_specificity", "test": "Does it reference specific CV models and techniques? Rate 0-1", "score": 0.94 },
 *   { "name": "analysis_depth", "test": "Are analysis steps technically comprehensive? Rate 0-1", "score": 0.92 },
 *   { "name": "output_format", "test": "Are output formats and structures clear? Rate 0-1", "score": 0.90 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_FRAMEANALYSIS_DETAILCONTENT: PromptPart = 
  `FRAME-LEVEL ANALYSIS:
1. KEYFRAME EXTRACTION: Identify I-frames and scene transitions using OpenCV scene detection
2. MOTION VECTOR ANALYSIS: Calculate optical flow between frames for movement tracking
3. OBJECT DETECTION: Apply YOLO/Detectron2 models for object identification and tracking
4. SCENE CLASSIFICATION: Use ResNet/EfficientNet for scene understanding and categorization
5. QUALITY ASSESSMENT: Measure VMAF scores, detect artifacts, analyze compression quality
6. METADATA GENERATION: Output JSON/XML with timestamps, detections, quality metrics` as PromptPart;