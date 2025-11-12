import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define classification methodology for tech identification"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "classification_accuracy", "test": "Are classification steps technically precise? Rate 0-1", "score": 0.94 },
 *   { "name": "version_detection", "test": "Does it handle version extraction properly? Rate 0-1", "score": 0.92 },
 *   { "name": "dependency_mapping", "test": "Are dependency relationships clear? Rate 0-1", "score": 0.90 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_TECHTYPESIDENTIFIER_CLASSIFICATION_DETAILCONTENT: PromptPart = 
  `CLASSIFICATION METHODOLOGY:
1. LANGUAGE DETECTION: Use file extensions, shebang lines, and syntax patterns
2. FRAMEWORK IDENTIFICATION: Match config files (webpack.config.js, tsconfig.json, etc)
3. VERSION EXTRACTION: Parse lock files (package-lock.json, yarn.lock) for exact versions
4. BUILD TOOL ANALYSIS: Detect Make, Gradle, Maven, npm scripts, Docker configurations
5. DEPENDENCY MAPPING: Create directed graph of package dependencies
6. STACK COMPOSITION: Generate technology profile with confidence scores` as PromptPart;