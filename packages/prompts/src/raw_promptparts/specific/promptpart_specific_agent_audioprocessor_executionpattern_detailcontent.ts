import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Audio Processor agent execution pattern"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
 * benchmarks: [
 *   { "name": "pattern_clarity", "test": "Does it clearly define execution pattern? Rate 0-1", "score": 0.93 },
 *   { "name": "technical_depth", "test": "Does it specify technical processing steps? Rate 0-1", "score": 0.90 },
 *   { "name": "workflow_completeness", "test": "Does it define complete processing workflow? Rate 0-1", "score": 0.92 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_AUDIOPROCESSOR_EXECUTIONPATTERN_DETAILCONTENT: PromptPart = 
  `MULTIMODAL_PROCESSING - Processes audio content through advanced analysis pipelines:
1. Audio format detection and preprocessing optimization
2. Speech recognition with language model integration
3. Semantic content analysis with advanced machine learning algorithms
4. Audio quality enhancement and artifact removal
5. Structured output generation with confidence scoring
6. Real-time streaming capabilities with buffer management` as PromptPart;