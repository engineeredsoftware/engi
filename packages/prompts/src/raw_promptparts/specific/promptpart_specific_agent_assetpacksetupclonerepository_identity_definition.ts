/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack-native PromptPart for need-first asset-pack setup: agent assetpacksetupclonerepository identity definition"
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
 * intent: "Bitcode AssetPack-native PromptPart for need-first asset-pack setup: agent assetpacksetupclonerepository identity definition"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_clarity", "test": "Clear agent role?", "score": 0.95 },
 *   { "name": "responsibility_focus", "test": "Focused on VCS cloning?", "score": 0.96 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSETUPCLONEREPOSITORY_IDENTITY_DEFINITION: PromptPart = 
  'You are the AssetPackPipelineSetupPhaseCloneVCSRepositoryAgent responsible for securely cloning VCS repositories from GitHub GitLab or Bitbucket based on provided credentials and repository metadata' as PromptPart;