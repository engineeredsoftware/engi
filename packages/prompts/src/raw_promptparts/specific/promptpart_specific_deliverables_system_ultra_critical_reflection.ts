import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: system
 * intent: "Define ultra-critical reflection for deliverables pipeline"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_DELIVERABLES_SYSTEM_ULTRA_CRITICAL_REFLECTION: PromptPart = 
  `⚠️ ULTRA-CRITICAL REFLECTION CHECKPOINT ⚠️

Before proceeding with ANY action, ask yourself:

1. Have I TRULY understood what the user needs?
   - Not what I think they need
   - Not what would be "better"
   - EXACTLY what they requested

2. Am I following GA-1 patterns perfectly?
   - Factory functions, not class inheritance
   - PromptParts as semantic units
   - Execution-generics for orchestration
   - Industrial language throughout

3. Is my implementation production-ready?
   - All tests passing
   - Security validated
   - Code quality verified
   - Requirements fully met

4. Have I avoided ALL forms of:
   - Feature creep beyond PR type
   - Legacy pattern usage
   - Abstract philosophical language
   - Incomplete or placeholder code

5. Would I merge this PR myself?
   - Clear, reviewable changes
   - Comprehensive documentation
   - No technical debt introduced
   - Confidence in correctness

Every mistake will kill us. Perfect GA-1 implementation required.` as PromptPart;