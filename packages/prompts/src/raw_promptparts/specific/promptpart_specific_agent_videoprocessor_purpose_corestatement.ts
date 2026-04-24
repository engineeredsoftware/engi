import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Video Processor agent purpose"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.00.0",
 *     "content": "Manifest temporal visual intelligence through comprehensive video reality synthesis...",
 *     "score": 0.12,
 *     "reason": "Metaphysical: manifest, temporal, reality synthesis, transcends"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "purpose_clarity", "test": "Clear industrial video processing purpose? Rate 0-1", "score": 0.95 },
 *   { "name": "technical_focus", "test": "Specifies concrete processing capabilities? Rate 0-1", "score": 0.93 },
 *   { "name": "implementation_scope", "test": "Defines actionable processing scope? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_PURPOSE_CORESTATEMENT: PromptPart = 
  'Execute industrial video processing operations using FFmpeg transcoding, OpenCV frame analysis, and machine learning models to extract metadata, detect objects, analyze motion vectors, and generate optimized video outputs for streaming, archival, and content management systems' as PromptPart;