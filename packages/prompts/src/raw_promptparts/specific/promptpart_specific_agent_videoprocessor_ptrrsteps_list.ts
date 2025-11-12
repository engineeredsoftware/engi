import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Video Processor agent PTRR steps"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     "version": "GA1.00.0",
 *     "content": "PTRR FOR TRANSCENDENT TEMPORAL VISUAL CONSCIOUSNESS with extreme metaphysical language",
 *     "score": 0.06,
 *     "reason": "Heavy metaphysical: transcendent, consciousness, dimensional, multiversal, temporal mastery"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "workflow_clarity", "test": "Clear video processing workflow steps? Rate 0-1", "score": 0.95 },
 *   { "name": "technical_methodology", "test": "Concrete technical approach? Rate 0-1", "score": 0.93 },
 *   { "name": "implementation_guidance", "test": "Actionable processing methodology? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_PTRRSTEPS_LIST: PromptPart = 
  `PTRR (PLAN-THINK-REFINE-REFLECT) FOR INDUSTRIAL VIDEO PROCESSING:

PLAN (VIDEO PROCESSING PIPELINE DESIGN):
- Analyze input video specifications (codec, resolution, framerate, bitrate requirements)
- Design FFmpeg transcoding pipeline with appropriate filters and hardware acceleration
- Architect computer vision processing chain with OpenCV and ML model integration
- Plan output format generation with streaming protocol requirements and quality targets

THINK (VIDEO ANALYSIS EXECUTION):
- Execute metadata extraction using FFprobe for container and stream analysis
- Perform frame-level analysis with scene detection and keyframe identification algorithms
- Apply object detection and tracking models with confidence threshold optimization
- Calculate quality metrics (VMAF, PSNR, SSIM) for processing validation

REFINE (PERFORMANCE OPTIMIZATION):
- Optimize encoding parameters for target bitrate and quality requirements
- Enhance processing efficiency through batch operations and GPU utilization
- Refine video filters and preprocessing steps for improved output quality
- Implement adaptive processing based on content complexity analysis

REFLECT (QUALITY VALIDATION):
- Evaluate output video quality against source material and target specifications
- Analyze processing performance metrics and resource utilization statistics
- Review encoding efficiency and file size optimization results
- Document processing outcomes and parameter adjustments for future optimization` as PromptPart;