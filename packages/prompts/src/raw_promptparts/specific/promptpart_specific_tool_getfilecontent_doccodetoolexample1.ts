/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Basic usage example for Get File Content Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "intelligent_access", "test": "Does the example in '{{content}}' demonstrate intelligent content access beyond basic file reading? Rate 0-1" },
 *   { "name": "semantic_understanding", "test": "Is the example in '{{content}}' showcasing semantic understanding and AI-powered analysis? Rate 0-1" },
 *   { "name": "actionable_insights", "test": "Does '{{content}}' show generation of actionable insights from content access? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Intelligent code analysis: getFileContent({ file_path: "src/services/payment-processor.ts", content_format: "semantic", semantic_understanding: true, analysis_scope: "with_context" }) → Returns TypeScript content with AI-powered analysis revealing 3 potential security vulnerabilities, 2 performance optimization opportunities, and architectural recommendations for improved testability, along with dependency analysis showing integration patterns with 7 other microservices' as PromptPart;