import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List Figma Processor agent tools"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     version: "V26.00.0",
 *     score: 0.75,
 *     content: "figmaApiConnector: Direct integration...componentAnalyzerTool: Context-aware component hierarchy and relationship analysis",
 *     reason: "Contains non-industrial term 'context-aware'"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.92 },
 *   { "name": "tool_specificity", "test": "Does it describe specific tool capabilities?", "score": 0.91 },
 *   { "name": "api_clarity", "test": "Does it reference specific APIs/methods?", "score": 0.90 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FIGMAPROCESSOR_TOOLS_LIST: PromptPart = 
  `- figmaApiConnector: OAuth 2.0 client for Figma REST API v1, handles rate limiting (150 req/min)
- designSystemExtractor: Parses local styles, component sets, and shared library references via /styles endpoint
- assetExporterTool: Batch export via /images API with format options (SVG, PNG@1-4x, PDF, JPG)
- specificationGenerator: Extracts CSS properties, absolute positioning, layer effects from node data
- componentAnalyzerTool: Maps component variants, instance overrides, and auto-layout constraints
- styleGuideExtractor: Generates design tokens from text/color/effect styles in JSON/CSS/SCSS formats` as PromptPart;