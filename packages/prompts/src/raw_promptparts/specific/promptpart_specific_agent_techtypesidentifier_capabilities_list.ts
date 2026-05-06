import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List Tech Types Identifier agent capabilities"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.92.0",
 *     "content": "- STATIC CODE ANALYSIS: Parse source files using AST parsers (Babel, Tree-sitter, ESLint) for language detection\n- DEPENDENCY RESOLUTION: Extract technology stacks from package manifests (package.json, requirements.txt, pom.xml)\n- FRAMEWORK DETECTION: Identify web frameworks through configuration patterns (webpack.config.js, angular.json, next.config.js)\n- BUILD SYSTEM ANALYSIS: Recognize build tools via file patterns (Makefile, Dockerfile, .github/workflows)\n- VERSION COMPATIBILITY: Cross-reference dependency versions against compatibility matrices\n- ECOSYSTEM MAPPING: Generate technology dependency graphs with confidence scoring\n- PATTERN MATCHING: Apply regex-based rules for identifying framework-specific code patterns\n- DATABASE INTEGRATION: Detect database technologies through ORM configurations and connection strings\n- API CLASSIFICATION: Identify REST/GraphQL APIs through endpoint analysis and schema detection\n- DEPLOYMENT TARGET ANALYSIS: Recognize cloud platforms via infrastructure-as-code files (terraform, serverless.yml)",
 *     "score": 0.92,
 *     "reason": "Industrial transformation complete - concrete tech identification capabilities"
 *   },
 *   {
 *     "version": "V26.00.0",
 *     "content": "- TECHNOLOGY ADVANCED INTELLIGENCE MANIFESTATION: Achieve comprehensive awareness across comprehensive advanced technology classification states\n- HIGH-PRECISION IDENTIFICATION MASTERY: Transcend traditional tech categorization through machine learning classification algorithms\n- DIMENSIONAL TECH NAVIGATION: Navigate complex technology landscapes with advanced understanding of innovation evolution\n- ADVANCED INTELLIGENCE-INTEGRATED PATTERN ANALYSIS: Orchestrate technology recognition through elevated awareness algorithms\n- OMNISCIENT STACK AWARENESS: Simultaneously understand all technology stacks across unlimited advanced frameworks\n- TEMPORAL TECH UNDERSTANDING: Comprehend technology evolution patterns across past, present, and future states\n- INDUSTRIAL-GRADE CLASSIFICATION ORCHESTRATION: Coordinate tech identification through high-precision-entangled technology intelligence\n- MULTIVERSAL FRAMEWORK SYNTHESIS: Process perfect technology categorization through intelligent algorithm optimization patterns\n- REALITY-BENDING TECH AUTOMATION: Manipulate technology classification through advanced computational intelligence\n- INFINITE TECHNOLOGY MASTERY: Understand all technological industrials through comprehensive technology intelligence",
 *     "score": 0.15,
 *     "reason": "Non-industrial: abstract, broad, time-aware, multi-context, unsupported-abstraction, broad"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_specificity", "test": "Does it reference specific tech detection tools and libraries? Rate 0-1", "score": 0.94 },
 *   { "name": "implementation_clarity", "test": "Are capabilities clearly actionable for developers? Rate 0-1", "score": 0.92 },
 *   { "name": "industry_standard", "test": "Uses standard technical terminology? Rate 0-1", "score": 0.90 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_TECHTYPESIDENTIFIER_CAPABILITIES_LIST: PromptPart = 
  `- STATIC CODE ANALYSIS: Parse source files using AST parsers (Babel, Tree-sitter, ESLint) for language detection
- DEPENDENCY RESOLUTION: Extract technology stacks from package manifests (package.json, requirements.txt, pom.xml)
- FRAMEWORK DETECTION: Identify web frameworks through configuration patterns (webpack.config.js, angular.json, next.config.js)
- BUILD SYSTEM ANALYSIS: Recognize build tools via file patterns (Makefile, Dockerfile, .github/workflows)
- VERSION COMPATIBILITY: Cross-reference dependency versions against compatibility matrices
- ECOSYSTEM MAPPING: Generate technology dependency graphs with confidence scoring
- PATTERN MATCHING: Apply regex-based rules for identifying framework-specific code patterns
- DATABASE INTEGRATION: Detect database technologies through ORM configurations and connection strings
- API CLASSIFICATION: Identify REST/GraphQL APIs through endpoint analysis and schema detection
- DEPLOYMENT TARGET ANALYSIS: Recognize cloud platforms via infrastructure-as-code files (terraform, serverless.yml)` as PromptPart;