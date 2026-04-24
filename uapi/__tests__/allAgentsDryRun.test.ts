import { testAgent } from './agentTestFactory';

// ------------------------------------------------------------------
// AssetPacks - Setup
// ------------------------------------------------------------------
import { COMPREHEND_TASK_AGENT } from '@bitcode/pipeline-deliverable';
import { FAMILIARIZE_ATTACHMENTS_AGENT } from '@bitcode/pipeline-deliverable';
import { SETUP_DELIVERABLES_AGENT_PREPARE_REPOSITORY } from '@bitcode/pipeline-deliverable';

// ------------------------------------------------------------------
// Discovery (subset)
// ------------------------------------------------------------------
import { SIMPLE_TEXT_SEARCH_AGENT } from '@bitcode/generic-agents-text-search';

// ------------------------------------------------------------------
// Implementation (subset)
// ------------------------------------------------------------------
import { implementationOpenPRAgent } from '@bitcode/pipeline-deliverable';

// ------------------------------------------------------------------
// Shipping (subset)
// ------------------------------------------------------------------
import { SHIPPING_AGENTS } from '@bitcode/generic-agents-git';


// Matrix: [agentConst, phase, [expected tool names]]
const MATRIX: Array<[any, string, string[]]> = [
  [COMPREHEND_TASK_AGENT, 'setup', []],
  [FAMILIARIZE_ATTACHMENTS_AGENT, 'setup', []],
  [SETUP_DELIVERABLES_AGENT_PREPARE_REPOSITORY, 'setup', ['cloneRepository', 'initializeFileTracker']],
  [SIMPLE_TEXT_SEARCH_AGENT, 'discovery', ['simpleSystemTextSearch']],
  [implementationOpenPRAgent, 'implementation', ['textEditorTool', 'deleteFileTool', 'renameFileTool', 'directoryTool']],
  [SHIPPING_AGENTS.open_pr, 'shipping', ['executeOpenPROperations']],
];

MATRIX.forEach(([agent, phase, tools]) => testAgent(agent, phase, tools));
