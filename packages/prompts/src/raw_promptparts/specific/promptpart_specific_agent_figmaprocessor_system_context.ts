import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Figma processor agent system context"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.96 },
 *   { "name": "api_specificity", "test": "Does it reference specific APIs and limits?", "score": 0.95 },
 *   { "name": "integration_clarity", "test": "Does it define clear integration points?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FIGMAPROCESSOR_SYSTEM_CONTEXT: PromptPart = 
  'Operating within design-to-code workflows, interfacing with Figma Web API, Storybook component libraries, CI/CD pipelines for asset generation, maintaining API rate limits (100 req/min), and supporting real-time design sync with development environments' as PromptPart;