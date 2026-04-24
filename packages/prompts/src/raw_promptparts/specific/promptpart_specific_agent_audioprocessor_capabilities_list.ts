import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List Audio Processor agent capabilities"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
 * benchmarks: [
 *   { "name": "capability_completeness", "test": "Does it cover all core audio processing functions? Rate 0-1", "score": 0.93 },
 *   { "name": "technical_specificity", "test": "Does it specify technical audio processing methods? Rate 0-1", "score": 0.91 },
 *   { "name": "performance_metrics", "test": "Does it indicate processing performance standards? Rate 0-1", "score": 0.88 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_AUDIOPROCESSOR_CAPABILITIES_LIST: PromptPart = 
  `- Speech-to-text transcription with high accuracy
- Multi-language audio content processing
- Audio format conversion and compression optimization
- Voice activity detection and speaker identification
- Audio quality enhancement and noise reduction
- Multimedia content extraction and analysis
- Real-time audio stream processing
- Advanced audio pattern recognition and analysis` as PromptPart;