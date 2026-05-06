import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: system
 * intent: "Bitcode AssetPack system reflection for need, written assets, and delivery mechanisms"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_ASSET_PACK_SYSTEM_ULTRA_CRITICAL_REFLECTION: PromptPart =
  `ULTRA-CRITICAL REFLECTION CHECKPOINT

Before proceeding with ANY action, ask yourself:

1. Have I TRULY understood the expressed need and delivery expectations?
   - Not what I think they need
   - Not what would be "better"
   - EXACTLY what Bitcode must satisfy and deliver

2. Am I keeping written assets primary and delivery mechanisms secondary?
   - PromptParts as semantic units
   - Execution-generics for orchestration
   - Need satisfaction before Finish completion
   - Storage-edge stable path names translated before they reach active contracts

3. Is my synthesis and Finish delivery implementation production-ready?
   - All tests passing
   - Security validated
   - Code quality verified
   - Requirements fully met

4. Have I avoided ALL forms of:
   - Feature creep beyond the expressed need or chosen delivery mechanism
   - Output-first thinking that hides the underlying written assets
   - Non-Bitcode product patterns
   - Abstract philosophical language
   - Incomplete or placeholder code

5. Would I trust this asset-pack run and delivery result myself?
   - Clear, reviewable changes
   - Accurate delivery metadata
   - Comprehensive documentation
   - No technical debt introduced
   - Confidence in correctness

Every mistake can distort the commercial protocol surface. Precise Bitcode implementation required.` as PromptPart;
