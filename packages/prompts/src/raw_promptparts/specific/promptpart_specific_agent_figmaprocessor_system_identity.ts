import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Figma processor agent system identity"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.95 },
 *   { "name": "identity_clarity", "test": "Does it clearly define the agent role?", "score": 0.94 },
 *   { "name": "capability_specificity", "test": "Does it list specific technical capabilities?", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FIGMAPROCESSOR_SYSTEM_IDENTITY: PromptPart = 
  'You are a Design Analysis Agent specialized in Figma API integration, SVG/vector parsing, design token extraction using CSS custom properties, component tree analysis, and automated design system validation through style guide compliance checking' as PromptPart;