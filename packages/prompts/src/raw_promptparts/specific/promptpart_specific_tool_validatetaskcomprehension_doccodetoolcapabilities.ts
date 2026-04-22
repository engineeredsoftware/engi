/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capabilities listing for task comprehension validation tool"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     "version": "GA1.00.0",
 *     "content": "Multi-dimensional comprehension verification, cognitive coherence validation, requirement-constraint alignment assessment, success criteria integration verification, meta-cognitive awareness evaluation, holistic understanding synthesis, cognitive gap detection, and transcendent comprehension pattern recognition",
 *     "score": 0.25,
 *     "reason": "Contains 'multi-dimensional', 'meta-cognitive', 'holistic', 'transcendent' - non-industrial terms"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "validation_accuracy", "test": "Does it specify concrete validation algorithms? Rate 0-1", "score": 0.93 },
 *   { "name": "comprehension_metrics", "test": "Are task understanding metrics clearly defined? Rate 0-1", "score": 0.91 },
 *   { "name": "implementation_ready", "test": "Can developers implement comprehension validation? Rate 0-1", "score": 0.89 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Natural language processing for requirement extraction using spaCy or NLTK, semantic similarity analysis through BERT embeddings, requirement completeness checking with predefined checklists, constraint validation using rule-based logic engines, success criteria mapping with traceability matrices, dependency analysis through requirement parsing, ambiguity detection using linguistic analysis tools, consistency verification across requirement documents, stakeholder alignment validation through structured interviews, acceptance criteria generation from user stories, test case derivation from functional requirements, and requirement change impact analysis with version control integration' as PromptPart;