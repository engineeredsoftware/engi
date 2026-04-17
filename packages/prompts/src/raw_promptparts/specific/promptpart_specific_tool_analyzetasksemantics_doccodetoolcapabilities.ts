/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capabilities listing for task semantic analysis tool"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     "version": "GA1.00.0",
 *     "content": "Multi-dimensional intent extraction, semantic scope determination, complexity stratification, dependency graph analysis, cognitive pattern recognition, linguistic ambiguity resolution, temporal sequence parsing, conditional logic detection, and emergent behavior identification",
 *     "score": 0.35,
 *     "reason": "Contains 'multi-dimensional', 'cognitive', 'temporal', 'emergent' - non-industrial terms"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "semantic_analysis_accuracy", "test": "Does it accurately parse task intent and meaning? Rate 0-1", "score": 0.93 },
 *   { "name": "dependency_detection", "test": "Are task dependencies clearly identified? Rate 0-1", "score": 0.91 },
 *   { "name": "implementation_ready", "test": "Can developers implement semantic analysis? Rate 0-1", "score": 0.89 }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Intent classification using BERT or RoBERTa models for task purpose identification, scope boundary detection through named entity recognition and dependency parsing, complexity assessment using text analysis metrics and keyword density, dependency relationship mapping through syntactic parsing and coreference resolution, ambiguity detection using linguistic uncertainty markers and modal verb analysis, conditional logic extraction through if-then statement parsing, action sequence identification using temporal markers and verb phrase analysis, priority inference through urgency and importance keyword detection, context analysis using document structure and section hierarchy, task decomposition through logical operator recognition and nested clause parsing, semantic similarity scoring between related tasks using sentence embeddings, and validation rule generation based on task semantic constraints' as PromptPart;