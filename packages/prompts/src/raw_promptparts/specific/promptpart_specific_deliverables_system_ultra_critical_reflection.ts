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
  `ULTRA-CRITICAL REFLECTION CHECKPOINT

Before proceeding with ANY action, ask yourself:

1. Have I TRULY understood the expressed need and shipping expectations?
   - Not what I think they need
   - Not what would be "better"
   - EXACTLY what Bitcode must satisfy and ship

2. Am I keeping written assets primary and shipping wrappers secondary?
   - PromptParts as semantic units
   - Execution-generics for orchestration
   - Need satisfaction before shipping completion
   - Compatibility names only as wrappers when required

3. Is my synthesis and shipping implementation production-ready?
   - All tests passing
   - Security validated
   - Code quality verified
   - Requirements fully met

4. Have I avoided ALL forms of:
   - Feature creep beyond the expressed need or chosen shipping mechanism
   - Deliverable-first thinking that hides the underlying written assets
   - Legacy pattern usage
   - Abstract philosophical language
   - Incomplete or placeholder code

5. Would I trust this asset-pack run and shipping result myself?
   - Clear, reviewable changes
   - Accurate shipping metadata
   - Comprehensive documentation
   - No technical debt introduced
   - Confidence in correctness

Every mistake can distort the commercial protocol surface. Precise Bitcode implementation required.` as PromptPart;
