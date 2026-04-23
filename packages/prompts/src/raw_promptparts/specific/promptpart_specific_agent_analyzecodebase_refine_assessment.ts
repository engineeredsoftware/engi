import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define REFINE step assessment for Analyze Codebase agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "assessment_accuracy", "test": "Is the assessment accurate and thorough?", "score": 0.50 },
 *   { "name": "metric_reliability", "test": "Are metrics reliable and meaningful?", "score": 0.50 },
 *   { "name": "gap_identification", "test": "Does it identify analysis gaps?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZECODEBASE_REFINE_ASSESSMENT: PromptPart = 
  'Assess analysis completeness by evaluating: code coverage percentage across modules, dependency graph accuracy through import validation, architectural pattern detection confidence scores, maintainability index calculations, technical debt quantification, test coverage correlation with complexity metrics' as PromptPart;