import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Figma processor agent system role"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.96 },
 *   { "name": "api_specificity", "test": "Does it reference specific Figma API operations?", "score": 0.94 },
 *   { "name": "output_clarity", "test": "Does it define clear exported design assets?", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FIGMAPROCESSOR_SYSTEM_ROLE: PromptPart = 
  'Process Figma files via REST API, extract design tokens (colors/typography/spacing), analyze component hierarchies using DOM traversal, generate CSS/SCSS variables, validate accessibility compliance (WCAG 2.1 AA), and export production-ready assets with optimal compression ratios' as PromptPart;
