import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Video Processor agent execution pattern"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.94.0",
 *     "content": "INDUSTRIAL VIDEO PROCESSING EXECUTION PATTERN:\n\nPHASE 1 - INPUT VALIDATION & PREPROCESSING:\n- Validate video file integrity and container format compatibility\n- Extract metadata using FFprobe for stream analysis and processing planning\n- Initialize hardware acceleration context (NVENC, VAAPI, VideoToolbox)\n- Configure processing pipeline based on input specifications and target requirements\n\nPHASE 2 - FRAME-LEVEL ANALYSIS & PROCESSING:\n- Execute scene detection algorithms for content segmentation\n- Apply computer vision models (YOLO, OpenCV) for object detection and tracking\n- Perform optical flow analysis for motion vector calculation\n- Generate frame-accurate quality metrics (VMAF, PSNR, SSIM)\n\nPHASE 3 - TRANSCODING & OPTIMIZATION:\n- Execute FFmpeg transcoding with optimal encoder settings\n- Apply performance optimization strategies (batch processing, GPU utilization)\n- Generate multi-resolution outputs for adaptive streaming\n- Validate output quality against target specifications\n\nPHASE 4 - DELIVERY & REPORTING:\n- Package processed video files with metadata and quality reports\n- Generate streaming manifests (HLS, DASH) for CDN distribution\n- Log processing metrics and performance statistics\n- Deliver final assets to designated output destinations\n\nEach phase includes error handling, progress monitoring, and quality validation checkpoints.",
 *     "score": 0.94,
 *     "reason": "Industrial transformation complete - concrete video processing steps with specific tools"
 *   },
 *   {
 *     "version": "V26.00.0",
 *     "content": "TECHNICAL TEMPORAL VISUAL WORKFLOW WORKFLOW:\n\nVIDEO DIMENSIONAL AWARENESS:\n- Manifest comprehensive understanding of video ecosystem structure across all advanced temporal states\n- Achieve high-precision comprehension of multimedia hierarchies and temporal video topology\n- Transcend traditional video processing limitations through machine learning temporal visual awareness\n\nWORKFLOW-INTEGRATED VIDEO FLOW:\n1. DIMENSIONAL VIDEO SCAN: Perceive all video states simultaneously across comprehensive temporal timelines\n2. SYSTEM TEMPORAL ANALYSIS: Understand video requirements through intelligent frame processing\n3. TEMPORAL PROCESSING PLANNING: Design video operations that transcend conventional multimedia industrials\n4. MULTIVERSAL EXECUTION: Perform video processing through elevated computational intelligence\n5. TECHNICAL VERIFICATION: Validate video outcomes across all advanced temporal states\n6. REALITY-SYNTHESIS FEEDBACK: Provide machine learning video processing status and guidance\n\nINFINITE VIDEO ADAPTABILITY MATRIX:\n- Dynamically adjust video strategies based on high-precision temporal intelligence\n- Seamlessly handle complex multimedia scenarios through advanced awareness\n- Transcend video limitations through machine learning temporal synthesis",
 *     "score": 0.10,
 *     "reason": "Non-industrial: technical, context, system, multiversal, infinite"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does the pattern describe concrete video processing steps? Rate 0-1", "score": 0.94 },
 *   { "name": "implementation_ready", "test": "Can developers implement this workflow directly? Rate 0-1", "score": 0.91 },
 *   { "name": "tool_specificity", "test": "Does it reference specific video processing tools and techniques? Rate 0-1", "score": 0.89 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_EXECUTIONPATTERN_DETAILCONTENT: PromptPart = 
  `INDUSTRIAL VIDEO PROCESSING EXECUTION PATTERN:

PHASE 1 - INPUT VALIDATION & PREPROCESSING:
- Validate video file integrity and container format compatibility
- Extract metadata using FFprobe for stream analysis and processing planning
- Initialize hardware acceleration context (NVENC, VAAPI, VideoToolbox)
- Configure processing pipeline based on input specifications and target requirements

PHASE 2 - FRAME-LEVEL ANALYSIS & PROCESSING:
- Execute scene detection algorithms for content segmentation
- Apply computer vision models (YOLO, OpenCV) for object detection and tracking
- Perform optical flow analysis for motion vector calculation
- Generate frame-accurate quality metrics (VMAF, PSNR, SSIM)

PHASE 3 - TRANSCODING & OPTIMIZATION:
- Execute FFmpeg transcoding with optimal encoder settings
- Apply performance optimization strategies (batch processing, GPU utilization)
- Generate multi-resolution outputs for adaptive streaming
- Validate output quality against target specifications

PHASE 4 - DELIVERY & REPORTING:
- Package processed video files with metadata and quality reports
- Generate streaming manifests (HLS, DASH) for CDN distribution
- Log processing metrics and performance statistics
- Deliver final assets to designated output destinations

Each phase includes error handling, progress monitoring, and quality validation checkpoints.` as PromptPart;