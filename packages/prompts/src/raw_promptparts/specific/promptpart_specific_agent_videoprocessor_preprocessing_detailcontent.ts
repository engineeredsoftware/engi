import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define video preprocessing pipeline"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     "version": "GA1.00.0",
 *     "content": "Basic preprocessing pipeline with limited detail",
 *     "score": 0.78,
 *     "reason": "Limited scope on preprocessing operations"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "ffmpeg_integration", "test": "Does it specify FFmpeg commands and options? Rate 0-1", "score": 0.95 },
 *   { "name": "metadata_extraction", "test": "Are metadata extraction steps clear? Rate 0-1", "score": 0.93 },
 *   { "name": "hardware_acceleration", "test": "Does it reference specific acceleration methods? Rate 0-1", "score": 0.91 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_PREPROCESSING_DETAILCONTENT: PromptPart = 
  `VIDEO PREPROCESSING PIPELINE:
- Extract comprehensive metadata using FFprobe: codec type, resolution, framerate, bitrate, duration, GOP structure
- Validate video container integrity and stream compatibility (MP4, MOV, AVI, MKV, WebM support)
- Decode video streams through FFmpeg with optimal hardware acceleration (NVENC, VAAPI, VideoToolbox, Quick Sync)
- Apply deinterlacing filters for interlaced content using yadif or bwdif algorithms
- Perform color space conversion (YUV420p, YUV444p, RGB) based on processing requirements
- Implement temporal sampling strategies: uniform sampling, keyframe extraction, scene-based sampling
- Audio stream preprocessing: normalize levels, extract channels, synchronization validation
- Subtitle stream detection and extraction for multi-language content processing
- Quality assessment: detect corruption, compression artifacts, and encoding issues
- Generate processing manifest with stream specifications and recommended processing parameters` as PromptPart;