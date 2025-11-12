/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Agent semantic unit: Deliverablesetupclonerepository Capabilities List"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List capabilities of clone VCS repository agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_coverage", "test": "All VCS operations covered?", "score": 0.50.94 },
 *   { "name": "auth_handling", "test": "Authentication methods clear?", "score": 0.50.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCLONEREPOSITORY_CAPABILITIES_LIST: PromptPart = 
  'Capabilities: authenticate with OAuth tokens or SSH keys, clone public and private repositories, handle sparse checkouts for large repos, verify repository integrity, manage git credentials securely, support branch and tag selection, handle submodules recursively' as PromptPart;