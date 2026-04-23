import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for need discovery and asset-pack planning: agent deliverablediscoveryanalyze purpose corestatement"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.96 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEDISCOVERYANALYZE_PURPOSE_CORESTATEMENT: PromptPart = 
  'Identify relevant files using AST parsing, LSP symbol resolution, and dependency graph analysis to map implementation touchpoints' as PromptPart;