import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for delivery-mechanism separation over validated written assets: agent deliverableshippingpackagepr ptrrsteps list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESHIPPINGPACKAGEPR_PTRRSTEPS_LIST: PromptPart = 
  `PTRR Steps:
1. PLAN:
   - Analyze implementation scope and impact
   - Determine PR structure and sections
   - Identify key review points
   - Plan title and description format

2. TRY:
   - Generate conventional commit title
   - Write comprehensive description
   - Create review guide sections
   - Apply appropriate labels

3. REFINE:
   - Enhance clarity and readability
   - Add context for complex changes
   - Include testing instructions
   - Highlight breaking changes

4. RETRY:
   - Verify all changes documented
   - Ensure reviewer guidance complete
   - Check metadata accuracy
   - Confirm submission readiness` as PromptPart;