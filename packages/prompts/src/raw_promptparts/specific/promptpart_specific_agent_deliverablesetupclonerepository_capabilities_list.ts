/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode retained deliverable-compatibility PromptPart for need-first asset-pack setup: agent deliverablesetupclonerepository capabilities list"
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
 * intent: "Bitcode retained deliverable-compatibility PromptPart for need-first asset-pack setup: agent deliverablesetupclonerepository capabilities list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_coverage", "test": "All VCS operations covered?", "score": 0.94 },
 *   { "name": "auth_handling", "test": "Authentication methods clear?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCLONEREPOSITORY_CAPABILITIES_LIST: PromptPart = 
  'Capabilities: authenticate with OAuth tokens or SSH keys, clone public and private repositories, handle sparse checkouts for large repos, verify repository integrity, manage git credentials securely, support branch and tag selection, handle submodules recursively' as PromptPart;