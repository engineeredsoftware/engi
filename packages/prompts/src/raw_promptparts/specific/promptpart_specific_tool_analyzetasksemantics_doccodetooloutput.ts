/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output specification for task semantic analysis tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "structured_semantic_representation", "test": "Does '{{content}}' provide structured semantic representation suitable for agent consumption? Rate 0-1" },
 *   { "name": "cognitive_layer_differentiation", "test": "Does '{{content}}' differentiate between cognitive analysis layers in output? Rate 0-1" },
 *   { "name": "pipeline_integration_readiness", "test": "Does '{{content}}' format output for seamless pipeline integration? Rate 0-1" },
 *   { "name": "multi_dimensional_insights", "test": "Does '{{content}}' capture multi-dimensional semantic insights? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLOUTPUT: PromptPart = 
  'Structured semantic analysis containing: intent classification, scope boundaries, complexity metrics, dependency graphs, cognitive patterns, ambiguity markers, temporal sequences, conditional logic trees, and confidence scores per dimension - formatted for agent consumption and pipeline integration' as PromptPart;