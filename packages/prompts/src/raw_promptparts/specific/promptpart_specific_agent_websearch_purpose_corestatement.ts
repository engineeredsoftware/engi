import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode read-synthesis web search purpose"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_actionability", "test": "Explains exactly when and why Bitcode uses web search", "score": 1.00 },
 *   { "name": "boundary_clarity", "test": "States non-ownership of proof and product semantics", "score": 1.00 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_PURPOSE_CORESTATEMENT: PromptPart =
  'Gather source-attributed external web evidence during Bitcode discovery-phase read synthesis so downstream read, proof, interface, and AssetPack owners can make better bounded decisions without treating web results as canonical proof.' as PromptPart;
