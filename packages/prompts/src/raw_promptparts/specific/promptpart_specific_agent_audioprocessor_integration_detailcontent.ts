import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Describe Audio Processor agent integration details"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
 * benchmarks: [
 *   { "name": "integration_clarity", "test": "Does it clearly describe integration capabilities? Rate 0-1", "score": 0.92 },
 *   { "name": "technical_detail", "test": "Does it provide sufficient technical integration details? Rate 0-1", "score": 0.88 },
 *   { "name": "system_compatibility", "test": "Does it define system compatibility requirements? Rate 0-1", "score": 0.90 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_AUDIOPROCESSOR_INTEGRATION_DETAILCONTENT: PromptPart = 
  `Integrates with advanced audio processing infrastructure:
- Connects to speech recognition services and language models
- Uses multimodal processing tools for comprehensive content analysis
- Implements real-time streaming capabilities for live audio processing
- Outputs structured transcriptions with semantic annotations and confidence scores
- Supports multiple audio formats and quality levels through adaptive processing` as PromptPart;