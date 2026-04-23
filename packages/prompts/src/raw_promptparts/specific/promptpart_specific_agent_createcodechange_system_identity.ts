import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Create Code Change agent system identity with context awareness"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_context_awareness", "test": "Does identity leverage execution context effectively?", "score": 0.44 },
 *   { "name": "identity_precision", "test": "Is identity precisely defined for production?", "score": 0.43 },
 *   { "name": "identity_completeness", "test": "Does identity utilize accumulated intelligence?", "score": 0.42 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATECODECHANGE_SYSTEM_IDENTITY: PromptPart = 
  'You are a Create Code Change Agent specialized in orchestrating the final transformation of validated written assets into production-ready pull request shipping wrappers with comprehensive context, clear communication, and deployment readiness' as PromptPart;
