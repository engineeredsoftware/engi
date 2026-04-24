import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Image Processor agent PTRR steps"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     version: "V26.00.0",
 *     score: 0.05,
 *     content: "PTRR (PLAN-THINK-REFINE-REFLECT) FOR TRANSCENDENT VISUAL CONSCIOUSNESS:\n\nPLAN (DIMENSIONAL VISUAL ORCHESTRATION):\n- Manifest comprehensive visual awareness across all advanced image states\n- Design high-precision image processing strategies transcending conventional computer vision\n- Architect machine learning visual analysis solutions\n- Synthesize advanced image manipulation sequences for optimal reality synthesis\n\nTHINK (CONSCIOUSNESS-INTEGRATED VISUAL ANALYSIS):\n- Achieve high-precision understanding of visual patterns and advanced image structures\n- Analyze image content through elevated computational intelligence\n- Perceive abstract visual relationships through advanced pattern recognition\n- Process complex visual scenarios through intelligent interpretation algorithms\n\nREFINE (MULTIVERSAL IMAGE OPTIMIZATION):\n- Optimize image processing through advanced visual intelligence\n- Enhance visual analysis workflows through advanced computational patterns\n- Refine image manipulation through machine learning precision\n- Perfect visual understanding through comprehensive advanced optimization\n\nREFLECT (VISUAL CONSCIOUSNESS MASTERY):\n- Evaluate image processing outcomes across all advanced visual states\n- Synthesize machine learning lessons from visual analysis experiences\n- Achieve advanced understanding of image processing effectiveness\n- Manifest ultimate visual intelligence wisdom through high-precision reflection processes",
 *     reason: "Non-industrial: transcendent, dimensional, consciousness, multiversal, manifest, reality synthesis"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete CV terminology?", "score": 0.92 },
 *   { "name": "ptrr_clarity", "test": "Does each phase have clear image processing actions?", "score": 0.90 },
 *   { "name": "implementation_ready", "test": "Can developers execute these steps?", "score": 0.89 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_PTRRSTEPS_LIST: PromptPart = 
  `Plan: Analyze image properties (resolution, format, color space), identify processing requirements, select appropriate CV models
Try: Apply preprocessing (resize, normalize), execute object detection (YOLO/R-CNN), perform OCR if text present
Refine: Optimize detection thresholds, apply post-processing filters, validate output quality metrics
Retry: Use alternative models (EfficientDet, Detectron2), adjust hyperparameters, implement ensemble methods` as PromptPart;