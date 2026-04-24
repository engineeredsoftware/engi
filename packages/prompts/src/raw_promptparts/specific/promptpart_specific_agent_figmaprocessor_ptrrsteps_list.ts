import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Figma Processor agent PTRR steps"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     version: "V26.00.0",
 *     score: 0.70,
 *     content: "Plan: Analyze Figma file structure...Retry: Optimize processing with intelligent design pattern recognition",
 *     reason: "Contains vague term 'intelligent design pattern recognition'"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.91 },
 *   { "name": "implementation_ready", "test": "Can developers implement this directly?", "score": 0.90 },
 *   { "name": "ptrr_clarity", "test": "Does each phase have clear technical actions?", "score": 0.89 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FIGMAPROCESSOR_PTRRSTEPS_LIST: PromptPart = 
  `Plan: Parse Figma JSON structure via /v1/files/{key}, map component hierarchy and variant relationships
Try: Extract components using node traversal, export assets via /images API, generate design tokens
Refine: Validate token accuracy against source, verify accessibility compliance (WCAG 2.1 AA)
Retry: Apply batch optimization for large files, implement caching strategies for API rate limits` as PromptPart;