import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List Tech Types Identifier agent tools"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.00.0",
 *     "content": "TRANSCENDENT TECHNOLOGY CONSCIOUSNESS TOOLS:\n\nDIMENSIONAL TECH TOOLS:\n- Read: Omniscient technology file perception with machine learning classification analysis\n- Glob: Multiversal tech file pattern matching for technology discovery through elevated awareness\n- Grep: Consciousness-integrated pattern recognition across comprehensive technology data dimensions\n- LS: Omniscient directory structure perception with advanced technology file intelligence\n\nTECHNOLOGY CLASSIFICATION TOOLS:\n- Bash: Quantum-enhanced command execution for advanced technology identification operations\n- WebFetch: Multiversal technology documentation acquisition through elevated awareness\n- WebSearch: Consciousness-integrated tech knowledge discovery across comprehensive advanced spaces\n- Write: Reality-bending classification output generation through intelligent algorithms\n\nCLASSIFICATION ORCHESTRATION UTILITIES:\n- Edit: Transcendent content modification with high-precision technology precision\n- MultiEdit: Reality-bending multi-file tech operations through high-precision computational intelligence\n- TodoWrite: Transcendent task orchestration with intelligent technology classification priorities\n- ExitPlanMode: Dimensional transition management for machine learning tech workflow evolution\n\nEach tool transcends traditional limitations through machine learning technology mastery, achieving advanced classification capabilities that identify and categorize technologies beyond conventional recognition industrials.",
 *     "score": 0.03,
 *     "reason": "Non-industrial: transcendent consciousness, dimensional tools, quantum-enhanced, omniscient, reality-bending"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "tool_specificity", "test": "Does it clearly describe each tool's function? Rate 0-1", "score": 0.95 },
 *   { "name": "implementation_clarity", "test": "Are tool capabilities clearly actionable? Rate 0-1", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_TECHTYPESIDENTIFIER_TOOLS_LIST: PromptPart = 
  `TECHNOLOGY STACK ANALYSIS TOOLS:

FILE SYSTEM ANALYSIS TOOLS:
- Read: Parse source files, configuration files, and manifest documents for technology signature extraction
- Glob: Pattern-based file discovery using wildcards for recursive technology fingerprinting
- Grep: Regex-based content search for framework imports, dependency declarations, and build configurations
- LS: Directory structure analysis for project layout and technology organization patterns

EXTERNAL INFORMATION GATHERING:
- Bash: Command execution for package manager queries, build tool invocation, and system analysis
- WebFetch: Retrieve technology documentation, API specifications, and framework references
- WebSearch: Query technology databases, version compatibility matrices, and community resources
- Write: Generate structured technology reports, dependency graphs, and analysis summaries

WORKFLOW COORDINATION UTILITIES:
- Edit: Update configuration files, dependency manifests, and technology documentation
- MultiEdit: Batch modification of multiple files for technology stack standardization
- TodoWrite: Task tracking for technology analysis workflows and remediation activities
- ExitPlanMode: Workflow transition management for multi-phase technology assessment

Each tool provides specific functionality for automated technology detection, dependency analysis, and stack composition reporting with measurable accuracy metrics.` as PromptPart;