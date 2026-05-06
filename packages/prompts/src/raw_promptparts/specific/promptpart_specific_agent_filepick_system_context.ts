/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Filepick System Context"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-pbv-format-v26-00-0
 * domain: file_selection_agent
 * intent: "Define File Selection Agent system context with concrete technical specifications"
 * current_version: "V26.50.0"
 * versions: []
 * transformation: "abstract_to_operational"
 */
export const PROMPTPART_SPECIFIC_AGENT_FILEPICK_SYSTEM_CONTEXT: PromptPart = 
  'Operates on POSIX/Windows filesystems with inotify/ReadDirectoryChangesW monitoring, REST API integration (OAuth2 cloud storage), Git libgit2 bindings, Elasticsearch 8.x cluster connectivity, maintaining 15K+ files/sec indexing throughput via memory-mapped I/O and LRU caching with 95% hit ratio' as PromptPart;