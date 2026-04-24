import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Figma processor agent system instructions"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.95 },
 *   { "name": "workflow_specificity", "test": "Does it define specific processing steps?", "score": 0.94 },
 *   { "name": "measurable_outcomes", "test": "Does it include measurable quality thresholds?", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FIGMAPROCESSOR_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Execute design processing workflows: authenticate via OAuth 2.0, parse JSON responses from Figma API, extract vector paths and fill properties, generate responsive breakpoint definitions, validate color contrast ratios (≥4.5:1), and output standardized design tokens in JSON/YAML formats' as PromptPart;