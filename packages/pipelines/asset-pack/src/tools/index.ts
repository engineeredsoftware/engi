/**
 * AssetPack Pipeline Tool Registry
 * 
 * Centralized registry of all tools available to AssetPack pipeline agents.
 * Organized by phase and functionality for optimal agent selection.
 */

import { Tool } from '@bitcode/tools-generics';

// VCS and Repository Tools (always available)
import { assetPackCloneVCSRepositoryTool } from './AssetPackCloneVCSRepositoryTool';
import { bitcodeNeedMeasurementComputerUseTool } from './BitcodeNeedMeasurementComputerUseTool';
import { assetPackMultimodalProcessingTool } from './AssetPackMultimodalProcessingTool';
import { assetPackImageComprehensionTool } from './AssetPackImageComprehensionTool';
import { assetPackPDFComprehensionTool } from './AssetPackPDFComprehensionTool';
import { assetPackAudioComprehensionTool } from './AssetPackAudioComprehensionTool';
import { assetPackVideoComprehensionTool } from './AssetPackVideoComprehensionTool';
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
  // Use AssetPack wrapper for clone (merged doc-code prompt)
  assetPackCloneVCSRepositoryTool,
  // Multimodal comprehension (images, pdf, audio, video)
  assetPackMultimodalProcessingTool,
  assetPackImageComprehensionTool,
  assetPackPDFComprehensionTool,
  assetPackAudioComprehensionTool,
  assetPackVideoComprehensionTool,
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
    ? [bitcodeNeedMeasurementComputerUseTool]
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
 * Finish/Delivering tools
 * VCS operations, PR/Issue creation, finalization
 */
export const FINISH_DELIVERY_TOOLS: Tool[] = [
  // VCS provider-agnostic tools
  createPullRequestTool,
  createIssueTool,
  createCommentTool
].filter(present);

// ==================== AGENT-SPECIFIC TOOL MAPPINGS ====================

/**
 * Get tools for specific agent by name
 */
export function getAssetPackPipelineToolsForAgent(agentName: string): Tool[] {
  const agentToolMappings: Record<string, Tool[]> = {
    // Setup Phase
    'asset-pack-clone-vcs-repository-tools': [assetPackCloneVCSRepositoryTool],
    'asset-pack-clone-vcs-repository-agent': [assetPackCloneVCSRepositoryTool],
    //'initialize-lsp': [lspSemanticAnalysisEngine, lspCodeIntelligenceEngine, lspWorkspaceNavigationEngine],
    //'danger-wall': [],
    'asset-pack-comprehend-need-definition-agent': [
      assetPackMultimodalProcessingTool,
      assetPackImageComprehensionTool,
      assetPackPDFComprehensionTool,
      assetPackAudioComprehensionTool,
      assetPackVideoComprehensionTool,
    ],
    'asset-pack-ready-to-iterate-agent': [],

    // Discovery Phase
    'asset-pack-digest-codebase-agent': [],
    'asset-pack-research-web-agent': [],
    //'asset-pack-select-files-agent': [],

    // Implementation Phase
    'asset-pack-synthesize-written-assets-agent': [],
    'implementation:asset-pack-synthesize-written-assets-agent': [],

    // Validation Phase
    'asset-pack-validate-last-iterations-validation-phase-agent': optionalTools(lspSemanticAnalysisEngine),
    'asset-pack-validate-discovery-phase-agent': optionalTools(lspSemanticAnalysisEngine),
    'asset-pack-validate-written-assets-agent': optionalTools(lspSemanticAnalysisEngine),
    'asset-pack-validation-ready-to-finish-agent': [],
    'asset-pack-ready-to-finish-agent': [],

    // Internal Need-measurement computer-use option
    'need-measurement:computer-use-evidence-agent': getComputerUseNeedMeasurementTools(),

    // Finish Phase / Delivering destination tools
    'finish:deliver-asset-pack-to-destination-agent': [createPullRequestTool, createIssueTool, createCommentTool],
    'finish:final-work-summary': [],
    'finish:asset-pack-create-pull-request-delivery-agent': [createPullRequestTool],
    'finish:asset-pack-submit-review-delivery-agent': [createCommentTool],
    'finish:asset-pack-create-issue-delivery-agent': [createIssueTool],
    'finish:asset-pack-add-comment-delivery-agent': [createCommentTool],
    'finish:asset-pack-gather-metrics-agent': [],
    'finish:asset-pack-generate-final-response-agent': [],
    'finish:asset-pack-finalize-delivery-evidence-agent': []
  };

  return agentToolMappings[agentName] || [];
}

/**
 * Get all tools for a phase.
 */
export function getToolsForPhase(phase: string): Tool[] {
  const phaseToolMappings: Record<string, Tool[]> = {
    setup: SETUP_PHASE_TOOLS,
    //discovery: DISCOVERY_PHASE_TOOLS,
    //implementation: IMPLEMENTATION_PHASE_TOOLS,
    //validation: VALIDATION_PHASE_TOOLS,
    finish: FINISH_DELIVERY_TOOLS
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
 * Export all tools for the AssetPack pipeline registry.
 */
export const ALL_ASSET_PACK_TOOLS: Tool[] = [
  ...new Set([
    ...SETUP_PHASE_TOOLS,
    //...DISCOVERY_PHASE_TOOLS,
    ...IMPLEMENTATION_PHASE_TOOLS,
    ...VALIDATION_PHASE_TOOLS,
    ...FINISH_DELIVERY_TOOLS
  ])
];
