/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Filepick Integration Detailcontent"
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
 * intent: "Describe File Selection Agent integration with concrete technical interfaces"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
 * transformation: "abstract_to_operational"
 */
export const PROMPTPART_SPECIFIC_AGENT_FILEPICK_INTEGRATION_DETAILCONTENT: PromptPart = 
  `Integrates with filesystem APIs and development toolchain via concrete protocols:
- POSIX syscalls (opendir/readdir/stat) and Git libgit2 for repository traversal
- libmagic MIME detection and AST parsers (TypeScript/JavaScript/Python/Java)
- Event-driven processing via inotify/fsevents with worker thread pools
- JSON/CSV output with metadata: filepath, size, mtime, hash, confidence_score
- REST/GraphQL APIs for CI/CD integration and IDE plugin compatibility` as PromptPart;