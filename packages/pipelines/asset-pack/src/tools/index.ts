/**
 * AssetPack Pipeline Tool Registry
 * 
 * Centralized registry of all tools available to AssetPack pipeline agents.
 * Organized by phase and functionality for optimal agent selection.
 */

import { Tool } from '@bitcode/tools-generics';

// VCS and Repository Tools (always available)
import { deliverablePipelineCloneVCSRepositoryTool } from './DeliverablePipelineCloneVCSRepositoryTool';
import { deliverablePipelineUseComputerTool } from './DeliverablePipelineUseComputerTool';
import { deliverablePipelineMultimodalProcessingTool } from './DeliverablePipelineMultimodalProcessingTool';
import { deliverablePipelineImageComprehensionTool } from './DeliverablePipelineImageComprehensionTool';
import { deliverablePipelinePDFComprehensionTool } from './DeliverablePipelinePDFComprehensionTool';
import { deliverablePipelineAudioComprehensionTool } from './DeliverablePipelineAudioComprehensionTool';
import { deliverablePipelineVideoComprehensionTool } from './DeliverablePipelineVideoComprehensionTool';
// VCS tools used during Finish/Delivering
import { createPullRequestTool, createIssueTool, createCommentTool } from '@bitcode/vcs-tools';

// V26 policy:
// - MCP tool wrappers are disabled pending future pipeline configuration.
// - Computer use is internal, server-flagged, and limited to Need measurement.
// - LSP tools are ALWAYS available (not env-gated).

export const BITCODE_COMPUTER_USE_NEED_MEASUREMENT_FLAG =
  'BITCODE_ENABLE_COMPUTER_USE_NEED_MEASUREMENT' as const;

export function isComputerUseNeedMeasurementEnabled(
  env: NodeJS.ProcessEnv = process.env,
): boolean {
  return env.BITCODE_ENABLE_COMPUTER_USE_NEED_MEASUREMENT === 'true';
}

let lspSemanticAnalysisEngine: Tool | undefined;
let lspCodeIntelligenceEngine: Tool | undefined;
let lspWorkspaceNavigationEngine: Tool | undefined;

// Disable all MCP tool arrays for V26 (will be enabled in future releases)
const awsTools: Tool[] = [];
const supabaseTools: Tool[] = [];
const vercelTools: Tool[] = [];

try {
  // Load LSP query tools unconditionally (best-effort)
  const m = require('@bitcode/generic-tools-lsp-query');
  // Map common LSP operations to semantic/code intelligence slots
  lspSemanticAnalysisEngine = m.documentSymbolsTool || m.referencesTool || m.hoverInfoTool;
  lspCodeIntelligenceEngine = m.codeActionsTool || m.completionTool || m.signatureHelpTool;
  lspWorkspaceNavigationEngine = m.workspaceSymbolsTool || m.definitionTool;
} catch { }

const present = (t: Tool | undefined): t is Tool => Boolean(t);
const optionalTools = (...tools: Array<Tool | undefined>): Tool[] => tools.filter(present);

// ==================== PHASE-SPECIFIC TOOL SETS ====================

/**
 * Setup Phase Tools
 * VCS operations, LSP initialization, security scanning
 */
export const SETUP_PHASE_TOOLS: Tool[] = [
  // VCS Operations
  // Use Deliverables wrapper for clone (merged doc-code prompt)
  deliverablePipelineCloneVCSRepositoryTool,
  // Multimodal comprehension (images, pdf, audio, video)
  deliverablePipelineMultimodalProcessingTool,
  deliverablePipelineImageComprehensionTool,
  deliverablePipelinePDFComprehensionTool,
  deliverablePipelineAudioComprehensionTool,
  deliverablePipelineVideoComprehensionTool,
  // Provider MCP tools disabled for GA‑1
  // LSP and Code Intelligence
  //lspSemanticAnalysisEngine,
  //lspCodeIntelligenceEngine,
  //lspWorkspaceNavigationEngine,
  // Additional providers appended later (post-GA‑1)
].filter(present);

/**
 * Discovery Phase Tools
 * File analysis, requirement extraction, complexity assessment
 */
export const DISCOVERY_PHASE_TOOLS: Tool[] = [
  // Code Analysis
  //lspSemanticAnalysisEngine,
  //lspCodeIntelligenceEngine,
  // File Operations
  //lspWorkspaceNavigationEngine,
  // Providers disabled for GA‑1
].filter(present);

/**
 * Internal Need-measurement computer-use registry.
 *
 * This is intentionally not mounted in the V26 Terminal action controls and is
 * not a general implementation/Delivering capability. Later versions may
 * expand the tool surface after the Need measurement contract is fully proven.
 */
export function getComputerUseNeedMeasurementTools(
  env: NodeJS.ProcessEnv = process.env,
): Tool[] {
  return isComputerUseNeedMeasurementEnabled(env)
    ? [deliverablePipelineUseComputerTool]
    : [];
}

/**
 * Implementation Phase Tools
 * File editing, code generation, VCS operations
 */
export const IMPLEMENTATION_PHASE_TOOLS: Tool[] = [
].filter(present);

/**
 * Validation Phase Tools
 * Testing, quality checks, security validation
 */
export const VALIDATION_PHASE_TOOLS: Tool[] = [
].filter(present);

/**
 * Finish/Delivering Tools
 * VCS operations, PR/Issue creation, finalization
 */
export const SHIPPING_PHASE_TOOLS: Tool[] = [
  // VCS provider-agnostic tools
  createPullRequestTool,
  createIssueTool,
  createCommentTool
].filter(present);

// ==================== AGENT-SPECIFIC TOOL MAPPINGS ====================

/**
 * Get tools for specific agent by name
 */
export function getDeliverablePipelineToolsForAgent(agentName: string): Tool[] {
  const agentToolMappings: Record<string, Tool[]> = {
    // Setup Phase
    'deliverable-pipeline-clone-vcs-repository-tools': [deliverablePipelineCloneVCSRepositoryTool],
    'deliverable-pipeline-clone-vcs-repository-agent': [deliverablePipelineCloneVCSRepositoryTool],
    //'initialize-lsp': [lspSemanticAnalysisEngine, lspCodeIntelligenceEngine, lspWorkspaceNavigationEngine],
    //'danger-wall': [],
    'deliverable-pipeline-comprehend-need-definition-agent': [
      deliverablePipelineMultimodalProcessingTool,
      deliverablePipelineImageComprehensionTool,
      deliverablePipelinePDFComprehensionTool,
      deliverablePipelineAudioComprehensionTool,
      deliverablePipelineVideoComprehensionTool,
    ],
    'deliverable-pipeline-ready-to-iterate-agent': [],

    // Discovery Phase
    'deliverable-pipeline-digest-codebase-agent': [],
    'deliverable-pipeline-research-web-agent': [],
    //'deliverable-pipeline-select-files-agent': [],

    // Implementation Phase
    'deliverable-pipeline-implementation-divide-code-change-agent': [],
    'deliverable-pipeline-implementation-conquer-file-agent': [],
    'deliverable-pipeline-implementation-correct-code-change-agent': [],
    'deliverable-pipeline-implementation-review-code-change-agent': [],
    'deliverable-pipeline-implementation-create-design-document-agent': [],
    'deliverable-pipeline-implementation-review-design-document-agent': [],
    //'review-code-change': [lspSemanticAnalysisEngine],
    //'create-design-document': [lspSemanticAnalysisEngine],
    //'review-design-document': [lspSemanticAnalysisEngine],

    // Validation Phase
    'deliverable-pipeline-validation-validate-code-changes-agent': optionalTools(lspSemanticAnalysisEngine),
    'deliverable-pipeline-validation-validate-code-changesreview-agent': optionalTools(lspSemanticAnalysisEngine),
    'deliverable-pipeline-validation-validate-design-document-agent': optionalTools(lspSemanticAnalysisEngine),
    'deliverable-pipeline-validation-validate-design-document-review-agent': optionalTools(lspSemanticAnalysisEngine),
    'deliverable-pipeline-validation-ready-to-ship': [],
    'deliverable-pipeline-validation-ready-to-ship-agent': [],
    'deliverable-pipeline-validation-ready-to-ship-code-change-agent': [],
    'deliverable-pipeline-validation-ready-to-ship-code-change-review-agent': [],
    'deliverable-pipeline-validation-ready-to-ship-design-document-agent': [],
    'deliverable-pipeline-validation-ready-to-ship-design-document-review-agent': [],

    // Internal Need-measurement computer-use option
    'need-measurement:computer-use-evidence-agent': getComputerUseNeedMeasurementTools(),

    // Finish Phase / Delivering destination tools
    'finish:deliver-asset-pack-to-destination-agent': [createPullRequestTool, createIssueTool, createCommentTool],
    'finish:final-work-summary': [],

    // Retained shipping aliases for callers not yet moved to Finish naming
    'shipping:deliverable-pipeline-ship-agent': [createPullRequestTool, createIssueTool, createCommentTool],
    'shipping:deliverable-pipeline-create-pull-request-agent': [createPullRequestTool],
    'shipping:deliverable-pipeline-submit-review-agent': [createCommentTool],
    'shipping:deliverable-pipeline-create-issue-agent': [createIssueTool],
    'shipping:deliverable-pipeline-add-comment-agent': [createCommentTool],
    'shipping:deliverable-pipeline-gather-metrics-agent': [],
    'shipping:deliverable-pipeline-generate-final-response-agent': [],
    'shipping:deliverable-pipeline-finalize-agent': []
  };

  return agentToolMappings[agentName] || [];
}

/**
 * Get all tools for a phase
*
  * TODO: duplicate with ALL_DELIVERABLE_TOOLS? or should use same set?
 */
export function getToolsForPhase(phase: string): Tool[] {
  const phaseToolMappings: Record<string, Tool[]> = {
    setup: SETUP_PHASE_TOOLS,
    //discovery: DISCOVERY_PHASE_TOOLS,
    //implementation: IMPLEMENTATION_PHASE_TOOLS,
    //validation: VALIDATION_PHASE_TOOLS,
    //shipping: SHIPPING_PHASE_TOOLS
  };

  return phaseToolMappings[phase] || [];
}

/**
 * Get tools that support short-circuiting
 */
export function getShortCircuitTools(): Tool[] {
  return [
    //shortCircuitHandler, executionStateManager
  ];
}

/**
 * Export all tools for global registry
 */
export const ALL_DELIVERABLE_TOOLS: Tool[] = [
  ...new Set([
    ...SETUP_PHASE_TOOLS,
    //...DISCOVERY_PHASE_TOOLS,
    ...IMPLEMENTATION_PHASE_TOOLS,
    ...VALIDATION_PHASE_TOOLS,
    ...SHIPPING_PHASE_TOOLS
  ])
];
