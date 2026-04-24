import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Figma Processor agent purpose"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
 * benchmarks: [
 *   { "name": "design_clarity", "test": "Does it clearly define design processing capabilities? Rate 0-1", "score": 0.91 },
 *   { "name": "figma_specificity", "test": "Does it specify Figma file handling methods? Rate 0-1", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FIGMAPROCESSOR_PURPOSE_CORESTATEMENT: PromptPart = 
  'Process and analyze Figma design files to extract design systems, components, and specifications with advanced design understanding algorithms' as PromptPart;