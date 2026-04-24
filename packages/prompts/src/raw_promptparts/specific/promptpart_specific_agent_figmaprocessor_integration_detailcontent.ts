import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Describe Figma Processor agent integration details"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     version: "V26.00.0",
 *     score: 0.70,
 *     content: "Integrates with Figma ecosystem...Uses advanced design analysis tools for intelligent pattern recognition",
 *     reason: "Contains vague terms like 'advanced', 'intelligent' without technical specifics"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.92 },
 *   { "name": "api_specificity", "test": "Does it reference specific APIs/protocols?", "score": 0.91 },
 *   { "name": "integration_clarity", "test": "Does it specify concrete integration points?", "score": 0.90 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FIGMAPROCESSOR_INTEGRATION_DETAILCONTENT: PromptPart = 
  `Integrates with design infrastructure via standard protocols:
- Connects to Figma REST API v1 using OAuth 2.0 personal access tokens
- Processes designs using node tree traversal, vector path extraction, style parsing
- Implements batch processing via queue systems (Bull/BullMQ) with Redis backend
- Outputs design tokens in Style Dictionary format (JSON/YAML/SCSS/CSS)
- Integrates with CI/CD pipelines (GitHub Actions, GitLab CI) for automated asset generation` as PromptPart;