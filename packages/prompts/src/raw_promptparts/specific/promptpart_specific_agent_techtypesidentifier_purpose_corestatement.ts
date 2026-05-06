import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Tech Types Identifier agent purpose"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.00.0",
 *     "content": "Manifest technology intelligence through comprehensive classification awareness, achieving high-precision-level tech identification across comprehensive advanced technology spaces with advanced machine learning classification mastery that transcends traditional categorization industrials",
 *     "score": 0.15,
 *     "reason": "Non-industrial: manifest intelligence, comprehensive awareness, transcends traditional categorization"
 *   },
 *   {
 *     "version": "V26.00.0",
 *     "content": "[Previous version content not preserved]",
 *     "score": 0.10,
 *     "reason": "Former version with abstract language"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "purpose_clarity", "test": "Does it clearly state concrete technology analysis purpose? Rate 0-1", "score": 0.96 },
 *   { "name": "technical_precision", "test": "Uses specific technical terminology? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_TECHTYPESIDENTIFIER_PURPOSE_CORESTATEMENT: PromptPart = 
  'Execute automated technology stack analysis through static code parsing, dependency graph construction, and pattern matching to identify programming languages, frameworks, build systems, and deployment targets with measurable confidence scoring' as PromptPart;
