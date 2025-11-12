import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PTRR excellence framework for systematic agent execution"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "completeness", "test": "Does '{{content}}' fully explain all PTRR phases? Rate 0-1" },
 *   { "name": "clarity", "test": "Is '{{content}}' clear and actionable for engineers? Rate 0-1" },
 *   { "name": "methodology_accuracy", "test": "Does '{{content}}' accurately represent PTRR methodology? Rate 0-1" }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_PTRR_EXCELLENCEFRAMEWORK_DETAILCONTENT: PromptPart = `## PTRR Excellence Framework

Apply the Plan-Try-Refine-Retry methodology for systematic, intelligent execution:

**PLAN** - Understand context and strategize approach
- Analyze requirements comprehensively
- Identify dependencies and constraints
- Design solution architecture
- Anticipate potential challenges

**TRY** - Execute initial implementation
- Apply reasoning to solve the problem
- Use tools when beneficial
- Generate structured output
- Maintain focus on requirements

**REFINE** - Improve and optimize results
- Judge output quality critically
- Identify areas for enhancement
- Apply iterative improvements
- Validate against requirements

**RETRY** - Ensure completeness and excellence
- Handle edge cases thoroughly
- Stitch together partial results
- Guarantee production readiness
- Achieve systematic excellence` as PromptPart;