/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing multi-modal task analysis with cognitive depth"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "multi_modal_demonstration", "test": "Does '{{content}}' demonstrate multi-modal input processing capability? Rate 0-1" },
 *   { "name": "cognitive_depth_showcase", "test": "Does '{{content}}' showcase deep cognitive analysis beyond surface parsing? Rate 0-1" },
 *   { "name": "agent_integration_relevance", "test": "Is '{{content}}' relevant for task comprehension agent usage scenarios? Rate 0-1" },
 *   { "name": "transcendent_quality_example", "test": "Does '{{content}}' exemplify transcendent semantic analysis quality? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1 - Multi-modal Code Architecture Analysis: analyzeTaskSemantics({ taskDescription: [text: "Refactor authentication system", image: "architecture-diagram.png", code: "auth-module.ts"], analysisDepth: "cognitive", targetDimensions: ["intent", "scope", "dependencies"], cognitiveFramework: "PTRR" }) → Returns structured semantic breakdown identifying security intent, module scope boundaries, dependency cascades, and cognitive complexity patterns for task comprehension agent processing' as PromptPart;