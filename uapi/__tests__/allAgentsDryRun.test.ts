import { testAgent } from './agentTestFactory';

// ------------------------------------------------------------------
// Deliverables – Setup
// ------------------------------------------------------------------
import { COMPREHEND_TASK_AGENT } from '@engi/pipeline-deliverable';
import { FAMILIARIZE_ATTACHMENTS_AGENT } from '@engi/pipeline-deliverable';
import { SETUP_DELIVERABLES_AGENT_PREPARE_REPOSITORY } from '@engi/pipeline-deliverable';

// ------------------------------------------------------------------
// Discovery (subset)
// ------------------------------------------------------------------
import { SIMPLE_TEXT_SEARCH_AGENT } from '@engi/generic-agents-text-search';

// ------------------------------------------------------------------
// Implementation (subset)
// ------------------------------------------------------------------
import { implementationOpenPRAgent } from '@engi/pipeline-deliverable';

// ------------------------------------------------------------------
// Shipping (subset)
// ------------------------------------------------------------------
import { SHIPPING_AGENTS } from '@engi/generic-agents-git';


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
