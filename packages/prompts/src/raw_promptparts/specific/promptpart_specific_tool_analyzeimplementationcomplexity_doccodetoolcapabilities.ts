/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capabilities listing for implementation complexity analysis tool"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     "version": "GA1.00.0",
 *     "content": "Multi-dimensional complexity stratification, strategic pathway analysis, resource optimization intelligence, temporal complexity modeling, architectural complexity assessment, cognitive load evaluation, emergent complexity prediction, risk-complexity correlation analysis, and strategic implementation pattern recognition",
 *     "score": 0.30,
 *     "reason": "Contains 'multi-dimensional', 'temporal', 'emergent' - non-industrial terms"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "complexity_metrics", "test": "Does it reference specific complexity measurement tools? Rate 0-1", "score": 0.93 },
 *   { "name": "code_analysis_depth", "test": "Are code analysis techniques clearly specified? Rate 0-1", "score": 0.91 },
 *   { "name": "implementation_ready", "test": "Can developers implement complexity analysis? Rate 0-1", "score": 0.89 }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZEIMPLEMENTATIONCOMPLEXITY_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Cyclomatic complexity calculation using McCabe metrics, Halstead complexity measures for program difficulty, Lines of Code (LOC) analysis with SLOC and CLOC integration, dependency graph analysis with circular dependency detection, architectural pattern recognition through static analysis, code maintainability index calculation, technical debt estimation using SonarQube rules, performance impact assessment through Conversations notation analysis, resource allocation modeling with time and space complexity, risk assessment matrix with probability and impact scoring, refactoring effort estimation based on code change patterns, and implementation timeline prediction using historical data analysis' as PromptPart;