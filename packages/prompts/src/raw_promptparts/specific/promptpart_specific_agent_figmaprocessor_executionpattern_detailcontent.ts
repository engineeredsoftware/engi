import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Figma Processor agent execution pattern"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     version: "GA1.00.0",
 *     score: 0.80,
 *     content: "DESIGN_ANALYSIS - Processes Figma designs...Design system analysis with intelligent pattern recognition",
 *     reason: "Mostly industrial but contains vague term 'intelligent pattern recognition'"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.93 },
 *   { "name": "implementation_ready", "test": "Can developers implement this directly?", "score": 0.92 },
 *   { "name": "pipeline_clarity", "test": "Does it define clear processing stages?", "score": 0.91 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FIGMAPROCESSOR_EXECUTIONPATTERN_DETAILCONTENT: PromptPart = 
  `DESIGN_ANALYSIS - Processes Figma designs through structured API extraction pipeline:
1. OAuth 2.0 authentication with personal access token validation
2. Node tree traversal via /v1/files/{key} endpoint parsing JSON response
3. Asset export via /v1/images/{key} with format constraints (PNG@2x, SVG, PDF)
4. Design token extraction: colors (hex/rgba), typography (font-family/size/weight), spacing (8px grid)
5. Specification generation with CSS properties, absolute positioning, layer effects
6. Output formatting as JSON tokens, CSS modules, or platform-specific code (iOS/Android)` as PromptPart;