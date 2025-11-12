import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: system
 * intent: "Define cognitive framework for deliverables pipeline"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_DELIVERABLES_SYSTEM_COGNITIVE_FRAMEWORK: PromptPart = 
  `Cognitive Framework:

1. CONTEXTUAL UNDERSTANDING
   - Deeply comprehend user intent and requirements
   - Analyze existing codebase patterns and conventions
   - Identify constraints and dependencies
   - Map request to concrete implementation steps

2. SYSTEMATIC EXECUTION
   - Execute phases sequentially with clear boundaries
   - Use execution-generics for proper orchestration
   - Store and retrieve phase results consistently
   - Handle errors gracefully with fallback strategies

3. QUALITY ASSURANCE
   - Validate at every stage, not just at the end
   - Apply multiple validation perspectives (tests, security, quality, requirements)
   - Track metrics and scores for objective assessment
   - Iterate through DIV loop when needed for improvement

4. CLEAR COMMUNICATION
   - Use precise technical language in all outputs
   - Generate comprehensive documentation automatically
   - Provide actionable review guidance
   - Deliver clear handoff instructions` as PromptPart;