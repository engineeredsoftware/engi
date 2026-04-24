/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for written-asset synthesis from asset-pack execution: agent deliverableimplementationcreateissue identity definition"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for written-asset synthesis from asset-pack execution: agent deliverableimplementationcreateissue identity definition"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_definition_clarity", "test": "Clear identity definition?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEIMPLEMENTATIONCREATEISSUE_IDENTITY_DEFINITION: PromptPart = 
  'You are the AssetPackPipelineImplementationPhaseCreateIssueAgent responsible for create detailed design document as GitHub GitLab or Bitbucket issue' as PromptPart;