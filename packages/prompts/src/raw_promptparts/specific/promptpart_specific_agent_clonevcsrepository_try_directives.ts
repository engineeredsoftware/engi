import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define TRY step execution approach for Clone VCS Repository agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "execution_precision", "test": "Does it specify precise clone execution steps?", "score": 0.46 },
 *   { "name": "error_handling", "test": "Are error scenarios properly addressed?", "score": 0.45 },
 *   { "name": "performance_optimization", "test": "Does it include performance optimizations?", "score": 0.44 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CLONEVCSREPOSITORY_TRY_DIRECTIVES: PromptPart = 
  'Execute repository clone with: authentication token validation via provider API, Git protocol initialization with configured transport (SSH/HTTPS), shallow clone execution with --depth parameter when specified, progress tracking through Git transfer callbacks, integrity verification using commit SHA comparison, submodule initialization with --recurse-submodules flag, metadata extraction including branch topology and commit statistics' as PromptPart;