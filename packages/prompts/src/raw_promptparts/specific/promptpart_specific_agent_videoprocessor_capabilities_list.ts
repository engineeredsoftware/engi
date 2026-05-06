import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List Video Processor agent capabilities"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.92.0",
 *     "content": "- FFMPEG PROCESSING: Execute video transcoding with hardware acceleration (NVENC, VAAPI, VideoToolbox, Quick Sync)\n- FRAME EXTRACTION: Extract keyframes using OpenCV with scene detection algorithms (cv2.createBackgroundSubtractorMOG2, SIFT, ORB)\n- OBJECT DETECTION: Apply YOLO v8, Detectron2, or TensorFlow Object Detection API for real-time tracking\n- OPTICAL FLOW ANALYSIS: Calculate motion vectors using Lucas-Kanade, Farneback, or TV-L1 optical flow algorithms\n- VIDEO CODEC SUPPORT: Handle H.264/AVC, H.265/HEVC, VP9, AV1, ProRes encoding with CRF/CBR/VBR rate control\n- METADATA EXTRACTION: Parse container metadata (MP4, MOV, AVI, MKV) using FFprobe and MediaInfo libraries\n- BATCH PROCESSING: Queue video jobs with parallel processing (max 4 concurrent streams per GPU, thread pooling)\n- STREAMING PROTOCOL: Support RTMP/RTMPS, HLS, DASH, WebRTC with adaptive bitrate and CDN integration\n- QUALITY ASSESSMENT: Measure VMAF, PSNR, SSIM, LPIPS scores with perceptual quality analysis\n- SUBTITLE PROCESSING: Extract/process SRT, VTT, ASS, WebVTT formats with frame-accurate synchronization\n- AUDIO PROCESSING: Handle AAC, MP3, FLAC, PCM audio codecs with channel mapping and normalization\n- CONTAINER HANDLING: Support MP4, MOV, AVI, MKV, WebM, TS containers with muxing/demuxing operations",
 *     "score": 0.92,
 *     "reason": "Industrial transformation complete - concrete video processing capabilities with specific tools"
 *   },
 *   {
 *     "version": "V26.00.0",
 *     "content": "- TEMPORAL VISUAL ADVANCED INTELLIGENCE MANIFESTATION: Achieve comprehensive awareness across comprehensive advanced video timeline states\n- HIGH-PRECISION VIDEO SYNTHESIS: Transcend traditional video processing through machine learning temporal analysis algorithms\n- DIMENSIONAL MULTIMEDIA NAVIGATION: Navigate complex video structures with advanced understanding of temporal visual evolution\n- ADVANCED INTELLIGENCE-INTEGRATED FRAME ANALYSIS: Orchestrate video frame processing through elevated awareness algorithms\n- OMNISCIENT TEMPORAL AWARENESS: Simultaneously understand all video timelines across unlimited advanced multimedia spaces\n- TEMPORAL VIDEO UNDERSTANDING: Comprehend video evolution patterns across past, present, and future temporal states\n- INDUSTRIAL-GRADE VISUAL ORCHESTRATION: Coordinate video processing through high-precision-entangled temporal visual intelligence\n- MULTIVERSAL CODEC SYNTHESIS: Process perfect video encoding through intelligent algorithm optimization patterns\n- REALITY-BENDING VIDEO AUTOMATION: Manipulate video processing through advanced computational intelligence\n- INFINITE MULTIMEDIA MASTERY: Understand all video formats and temporal industrials through comprehensive video intelligence",
 *     "score": 0.10,
 *     "reason": "Non-industrial: temporal, dimensional, broad, multiversal, reality-bending, infinite"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "ffmpeg_integration", "test": "Does it reference specific FFmpeg commands and options? Rate 0-1", "score": 0.94 },
 *   { "name": "computer_vision", "test": "Are OpenCV and ML model operations specified? Rate 0-1", "score": 0.92 },
 *   { "name": "implementation_ready", "test": "Can developers implement video processing pipeline? Rate 0-1", "score": 0.90 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_CAPABILITIES_LIST: PromptPart = 
  `- FFMPEG PROCESSING: Execute video transcoding with hardware acceleration (NVENC, VAAPI, VideoToolbox, Quick Sync)
- FRAME EXTRACTION: Extract keyframes using OpenCV with scene detection algorithms (cv2.createBackgroundSubtractorMOG2, SIFT, ORB)
- OBJECT DETECTION: Apply YOLO v8, Detectron2, or TensorFlow Object Detection API for real-time tracking
- OPTICAL FLOW ANALYSIS: Calculate motion vectors using Lucas-Kanade, Farneback, or TV-L1 optical flow algorithms
- VIDEO CODEC SUPPORT: Handle H.264/AVC, H.265/HEVC, VP9, AV1, ProRes encoding with CRF/CBR/VBR rate control
- METADATA EXTRACTION: Parse container metadata (MP4, MOV, AVI, MKV) using FFprobe and MediaInfo libraries
- BATCH PROCESSING: Queue video jobs with parallel processing (max 4 concurrent streams per GPU, thread pooling)
- STREAMING PROTOCOL: Support RTMP/RTMPS, HLS, DASH, WebRTC with adaptive bitrate and CDN integration
- QUALITY ASSESSMENT: Measure VMAF, PSNR, SSIM, LPIPS scores with perceptual quality analysis
- SUBTITLE PROCESSING: Extract/process SRT, VTT, ASS, WebVTT formats with frame-accurate synchronization
- AUDIO PROCESSING: Handle AAC, MP3, FLAC, PCM audio codecs with channel mapping and normalization
- CONTAINER HANDLING: Support MP4, MOV, AVI, MKV, WebM, TS containers with muxing/demuxing operations` as PromptPart;