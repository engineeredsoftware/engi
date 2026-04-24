import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: system
 * intent: "Define cognitive framework for deliverables pipeline"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_DELIVERABLES_SYSTEM_COGNITIVE_FRAMEWORK: PromptPart = 
  `Cognitive Framework:

1. NEED COMPREHENSION
   - Deeply comprehend the expressed need and intended outcome
   - Analyze existing codebase patterns and conventions
   - Identify constraints and dependencies
   - Map the need to concrete synthesis and shipping steps

2. ASSET-PACK SYNTHESIS
   - Execute phases sequentially with clear boundaries
   - Use execution-generics for proper orchestration
   - Store and retrieve written-asset and shipping results consistently
   - Handle errors gracefully with fallback strategies

3. VALIDATED SHIPPING
   - Validate at every stage, not just at the end
   - Apply multiple validation perspectives (tests, security, quality, requirements)
   - Track metrics and scores for objective assessment before delivery mechanisms finalize
   - Iterate through DIV loop when needed for improvement

4. AUDITABLE COMMUNICATION
   - Use precise technical language in all outputs
   - Generate comprehensive summaries and documentation automatically
   - Provide actionable review and operator guidance
   - Deliver clear handoff instructions that separate written assets from delivery mechanisms` as PromptPart;
