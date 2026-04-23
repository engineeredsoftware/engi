import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for written-asset synthesis from asset-pack execution: agent deliverableimplexecutechanges capabilities list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEIMPLEXECUTECHANGES_CAPABILITIES_LIST: PromptPart = 
  `capabilities:
- Generate new file content following project patterns
- Modify existing files with precise, targeted changes
- Create unified diff format for modifications
- Follow established coding conventions and style guides
- Implement requested features with appropriate tests
- Update documentation alongside code changes
- Maintain code quality and standards compliance
- Handle file deletions and renames correctly` as PromptPart;