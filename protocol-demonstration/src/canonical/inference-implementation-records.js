// @ts-check

export const V26_INFERENCE_IMPLEMENTATION_RECORD_REQUIRED_FIELDS = Object.freeze([
  'recordId',
  'canonicalNeed',
  'promptImplementation',
  'toolImplementation',
  'agentImplementation',
  'executionImplementation',
  'assetPackImplementation',
  'boundaryPosture',
  'verificationSet'
]);

export const V26_INFERENCE_BOUNDARY_POSTURES = Object.freeze([
  'active',
  'admitted support',
  'ingress',
  'compatibility',
  'reference-only',
  'cut-target'
]);

export const V26_INFERENCE_IMPLEMENTATION_RECORDS = Object.freeze([
  {
    recordId: 'prompt-primitives',
    canonicalNeed: 'Provide the canonical prompt substrate that makes Bitcode inference describable, composable, executable, and replayable.',
    promptImplementation: {
      owners: [
        'packages/prompts/src/parts/PromptPart.ts',
        'packages/prompts/src/prompt.ts',
        'packages/prompts/src/execution/PromptExecution.ts',
        'packages/prompts/src/formatters/index.ts'
      ],
      rawPromptPartBoundary: '@bitcode/prompts/raw_promptparts/*',
      runtimeCarryThrough: 'PromptPart TypeScript content and runtime JavaScript carry-through must remain equivalent.'
    },
    toolImplementation: {
      owners: [],
      contract: 'Prompt primitives do not call tools directly; tools consume this substrate through public prompt package boundaries.'
    },
    agentImplementation: {
      owners: [],
      contract: 'Agent prompt overlays compose from prompt primitives but do not redefine PromptPart or PromptExecution.'
    },
    executionImplementation: {
      owners: ['packages/prompts/src/execution/PromptExecution.ts'],
      carriers: ['PromptExecution']
    },
    assetPackImplementation: {
      outputKind: 'prompt evidence',
      effect: 'Prompt material is bound to execution evidence and generated proof witnesses.'
    },
    boundaryPosture: 'active',
    verificationSet: [
      'pnpm -C packages/prompts exec jest --runInBand src/__tests__/prompt.test.ts',
      'node --test protocol-demonstration/test/v26-prompt-runtime-loadability.test.js',
      '.bitcode/prompt-system-totality-proof.json'
    ],
    sourceEvidenceRefs: [
      'packages/prompts/package.json',
      'packages/prompts/README.md',
      'packages/prompts/src/index.ts',
      'packages/prompts/src/parts/PromptPart.ts',
      'packages/prompts/src/prompt.ts',
      'packages/prompts/src/execution/PromptExecution.ts',
      'packages/prompts/src/__tests__/prompt.test.ts'
    ]
  },
  {
    recordId: 'tool-prompt-infrastructure',
    canonicalNeed: 'Attach tool descriptions, callable contracts, and tool execution evidence into Bitcode agentic runs without hidden prompt strings.',
    promptImplementation: {
      owners: [
        'packages/tools-generics/src/doc-code-tool/DocCodeToolPrompt.ts',
        'packages/tools-generics/src/doc-code-tool/formatUsableTools.ts',
        'packages/doc-code/src/transformDocCodeTools.ts'
      ],
      rawPromptPartBoundary: 'doc-code labels and DocCodeToolPrompt paths',
      runtimeCarryThrough: 'DocCode tool prompts must load through public doc-code, doc-comment, registry, execution, and prompt package subpaths.'
    },
    toolImplementation: {
      owners: [
        'packages/tools-generics/src/Tool.ts',
        'packages/tools-generics/src/execution/ToolExecution.ts',
        'packages/tools-generics/src/execution/ToolPromptRegistry.ts'
      ],
      contract: 'Tool functions, parameters, output, prompt descriptions, and fail-closed boundaries are explicit support primitives.'
    },
    agentImplementation: {
      owners: ['packages/tools-generics/src/doc-code-tool/DocCodeToolDecorator.ts'],
      contract: 'Tool prompt injection supports agent runs but does not become an independent agent.'
    },
    executionImplementation: {
      owners: [
        'packages/tools-generics/src/execution/ToolExecution.ts',
        'packages/tools-generics/src/execution/ToolPromptRegistry.ts'
      ],
      carriers: ['ToolExecution', 'ToolPromptRegistry']
    },
    assetPackImplementation: {
      outputKind: 'tool prompt support',
      effect: 'Tool descriptions become auditable prompt material available to agentic Bitcode runs.'
    },
    boundaryPosture: 'admitted support',
    verificationSet: [
      'node --test protocol-demonstration/test/v26-prompt-runtime-loadability.test.js',
      'node --test protocol-demonstration/test/v26-prompt-system-boundary.test.js',
      'packages/doc-code/src/__tests__/transform.test.ts'
    ],
    sourceEvidenceRefs: [
      'packages/tools-generics/package.json',
      'packages/tools-generics/src/Tool.ts',
      'packages/tools-generics/src/execution/ToolExecution.ts',
      'packages/tools-generics/src/execution/ToolPromptRegistry.ts',
      'packages/tools-generics/src/doc-code-tool/DocCodeToolPrompt.ts',
      'packages/tools-generics/src/doc-code-tool/formatUsableTools.ts',
      'packages/doc-code/src/transformDocCodeTools.ts',
      'packages/doc-comment/src/build-plugin.ts'
    ]
  },
  {
    recordId: 'agent-infrastructure',
    canonicalNeed: 'Represent Bitcode agent roles, steps, substeps, prompt overlays, tool registries, retries, and diagnostics as explicit execution-bearing infrastructure.',
    promptImplementation: {
      owners: [
        'packages/agent-generics/src/prompts/AgentPrompt.ts',
        'packages/agent-generics/src/prompts/AgentStepPrompt.ts',
        'packages/agent-generics/src/prompts/AgentGenerationSubStepPrompt.ts',
        'packages/agent-generics/src/prompts/FailsafeMetaSubStepPrompt.ts',
        'packages/agent-generics/src/prompts/ToolExecutionPrompt.ts'
      ],
      rawPromptPartBoundary: '@bitcode/prompts/parts/PromptPart and narrow prompt subpaths',
      runtimeCarryThrough: 'Agent prompt overlays must compose through public prompt primitives.'
    },
    toolImplementation: {
      owners: ['packages/agent-generics/src/execution/AgentToolsRegistry.ts'],
      contract: 'Agent tool usage is mediated through registries and bounded structured outputs.'
    },
    agentImplementation: {
      owners: [
        'packages/agent-generics/src/agents/factories.ts',
        'packages/agent-generics/src/substeps/factories.ts',
        'packages/agent-generics/src/steps/factories.ts'
      ],
      contract: 'Agent roles, steps, substeps, structured outputs, diagnostics, and retries/refinement are named and bounded.'
    },
    executionImplementation: {
      owners: [
        'packages/agent-generics/src/execution/AgentExecution.ts',
        'packages/agent-generics/src/execution/AgentPromptsRegistry.ts',
        'packages/agent-generics/src/execution/AgentToolsRegistry.ts',
        'packages/agent-generics/src/execution/AgentLLMsRegistry.ts',
        'packages/agent-generics/src/execution/AgentAgentsRegistry.ts'
      ],
      carriers: ['AgentExecution', 'AgentPromptsRegistry', 'AgentToolsRegistry', 'AgentLLMsRegistry', 'AgentAgentsRegistry']
    },
    assetPackImplementation: {
      outputKind: 'agent execution evidence',
      effect: 'Agent execution can produce bounded intermediate evidence, diagnostics, file-diff integration, and downstream pipeline inputs.'
    },
    boundaryPosture: 'active',
    verificationSet: [
      'pnpm -C packages/agent-generics run typecheck',
      'node --test protocol-demonstration/test/v26-prompt-system-boundary.test.js',
      '.bitcode/prompt-system-totality-proof.json'
    ],
    sourceEvidenceRefs: [
      'packages/agent-generics/src/prompts/AgentPrompt.ts',
      'packages/agent-generics/src/prompts/AgentStepPrompt.ts',
      'packages/agent-generics/src/execution/AgentExecution.ts',
      'packages/agent-generics/src/execution/AgentPromptsRegistry.ts',
      'packages/agent-generics/src/execution/AgentToolsRegistry.ts',
      'packages/agent-generics/src/agents/factories.ts',
      'packages/agent-generics/src/substeps/factories.ts',
      'packages/agent-generics/src/diagnostics/trace.ts'
    ]
  },
  {
    recordId: 'pipeline-infrastructure',
    canonicalNeed: 'Represent Bitcode runs, phases, prompts, tool registries, streaming, resume, metrics, and phase orchestration as explicit pipeline execution infrastructure.',
    promptImplementation: {
      owners: [
        'packages/pipelines-generics/src/prompts/PipelinePrompt.ts',
        'packages/pipelines-generics/src/execution/PipelinePromptRegistry.ts'
      ],
      rawPromptPartBoundary: '@bitcode/prompts and @bitcode/prompts/parts/PromptPart through public subpaths',
      runtimeCarryThrough: 'Pipeline prompts must not depend on route-local strings or private prompt source paths.'
    },
    toolImplementation: {
      owners: ['packages/pipelines-generics/src/execution/PipelineToolRegistry.ts'],
      contract: 'Pipeline tools are registry-owned and available to phase/agent execution without hidden package reach-through.'
    },
    agentImplementation: {
      owners: [
        'packages/pipelines-generics/src/phases/phase-factory.ts',
        'packages/pipelines-generics/src/phases/sdivs-factory.ts',
        'packages/pipelines-generics/src/gate-system/meta-phase-orchestrator.ts'
      ],
      contract: 'Pipeline phases and meta-phases bind setup, discovery, implementation, validation, shipping, and gate orchestration.'
    },
    executionImplementation: {
      owners: [
        'packages/pipelines-generics/src/execution/PipelineExecution.ts',
        'packages/pipelines-generics/src/execution/pipeline-types.ts',
        'packages/pipelines-generics/src/execution/resume.ts',
        'packages/pipelines-generics/src/streaming/pipeline-stream-integration.ts'
      ],
      carriers: ['PipelineExecution', 'PipelinePromptRegistry', 'PipelineToolRegistry', 'PipelineLLMRegistry', 'PipelineAgentRegistry']
    },
    assetPackImplementation: {
      outputKind: 'pipeline run evidence',
      effect: 'Pipeline runs can carry phase evidence, metrics, streams, resume records, and downstream asset-pack synthesis state.'
    },
    boundaryPosture: 'active',
    verificationSet: [
      'pnpm -C packages/pipelines-generics run typecheck',
      'node --test protocol-demonstration/test/v26-prompt-system-boundary.test.js',
      '.bitcode/runs-pipelines-totality-proof.json'
    ],
    sourceEvidenceRefs: [
      'packages/pipelines-generics/src/prompts/PipelinePrompt.ts',
      'packages/pipelines-generics/src/execution/PipelineExecution.ts',
      'packages/pipelines-generics/src/execution/PipelinePromptRegistry.ts',
      'packages/pipelines-generics/src/execution/PipelineToolRegistry.ts',
      'packages/pipelines-generics/src/phases/phase-factory.ts',
      'packages/pipelines-generics/src/phases/sdivs-factory.ts',
      'packages/pipelines-generics/src/gate-system/meta-phase-orchestrator.ts',
      'packages/pipelines-generics/src/streaming/pipeline-stream-integration.ts'
    ]
  },
  {
    recordId: 'conversation-inference',
    canonicalNeed: 'Provide the rich-input Bitcode write surface that binds conversation prompts, attachments, tool registration, streams, and ad hoc execution continuity.',
    promptImplementation: {
      owners: [
        'packages/conversations-generics/src/prompts/ConversationSystemPrompt.ts',
        'uapi/prompts/conversations-system-prompt.ts'
      ],
      rawPromptPartBoundary: 'conversation system prompt plus app-level binding',
      runtimeCarryThrough: 'Conversation prompt binding must stay aligned with rich-input execution and app route state.'
    },
    toolImplementation: {
      owners: ['packages/conversations-generics/src/agent/ConversationAgent.ts'],
      contract: 'Conversation tools are registered through the conversation agent and app-facing rich-input surface.'
    },
    agentImplementation: {
      owners: ['packages/conversations-generics/src/agent/ConversationAgent.ts'],
      contract: 'ConversationAgent owns conversation bootstrap, tool registration, and rich-input inference posture.'
    },
    executionImplementation: {
      owners: [
        'packages/api/src/conversations/conversations.ts',
        'packages/api/src/conversations/streaming.ts',
        'uapi/app/api/conversations/stream/route.ts'
      ],
      carriers: ['conversation persistence', 'conversation stream events', 'ad hoc execution continuity']
    },
    assetPackImplementation: {
      outputKind: 'conversation write intent',
      effect: 'Conversation inputs can produce execution intent, attachments, output destinations, and downstream asset-pack synthesis.'
    },
    boundaryPosture: 'active',
    verificationSet: [
      'uapi/tests/api/conversationsRoute.test.ts',
      'uapi/tests/api/chatStreamRoute.test.ts',
      '.bitcode/conversations-continuity-proof.json'
    ],
    sourceEvidenceRefs: [
      'packages/conversations-generics/src/prompts/ConversationSystemPrompt.ts',
      'packages/conversations-generics/src/agent/ConversationAgent.ts',
      'uapi/prompts/conversations-system-prompt.ts',
      'packages/api/src/conversations/conversations.ts',
      'packages/api/src/conversations/streaming.ts',
      'uapi/app/api/conversations/stream/route.ts'
    ]
  },
  {
    recordId: 'asset-pack-synthesis-compatibility',
    canonicalNeed: 'Use retained deliverable corridor machinery as Bitcode asset-pack written-asset synthesis plus shipping-wrapper compatibility.',
    promptImplementation: {
      owners: [
        'packages/pipelines/deliverable/src/agents/prompts/comprehend-need-prompt.ts',
        'packages/pipelines/deliverable/src/agents/prompts/deliverable-pipeline-comprehend-need-agent-prompts.ts',
        'packages/pipelines/deliverable/scripts/render-prompts.ts'
      ],
      rawPromptPartBoundary: 'COMPREHENDNEED and DELIVERABLESETUPCOMPREHENDNEED PromptParts before compatibility COMPREHENDTASK wrappers',
      runtimeCarryThrough: 'Deliverable-corridor runtime promptparts must teach need-first asset-pack synthesis and shipping wrappers.'
    },
    toolImplementation: {
      owners: [
        'packages/pipelines/deliverable/src/tools/DeliverablePipelineCloneVCSRepositoryTool.ts',
        'packages/pipelines/deliverable/src/tools/search.ts'
      ],
      contract: 'Retained VCS/PR/comment/review tools are shipping mechanisms on top of stable written assets.'
    },
    agentImplementation: {
      owners: [
        'packages/pipelines/deliverable/src/agents/setup/deliverable-pipeline-comprehend-need-agent.ts',
        'packages/pipelines/deliverable/src/agents/setup/deliverable-pipeline-ready-to-iterate-agent.ts',
        'packages/pipelines/deliverable/src/agents/shipping/deliverable-pipeline-final-work-summary-agent.ts'
      ],
      contract: 'Setup, iteration, validation, and shipping agents must resolve semantic need/writtenAsset fields before compatibility deliverable fields.'
    },
    executionImplementation: {
      owners: [
        'packages/pipelines/deliverable/src/index.ts',
        'packages/pipelines/deliverable/src/postprocess.ts',
        'packages/pipelines/deliverable/src/types/PipelineSchemas.ts'
      ],
      carriers: ['PipelineExecution compatibility entry', 'postprocess read model', 'execution history projections']
    },
    assetPackImplementation: {
      outputKind: 'asset pack and shipping wrapper',
      effect: 'Stable written assets and asset-pack snapshots are primary; PRs, Jira comments, reviews, and route payloads are delivery mechanisms.'
    },
    boundaryPosture: 'compatibility',
    verificationSet: [
      'node --test protocol-demonstration/test/v26-deliverable-reform.test.js',
      '.bitcode/runs-pipelines-totality-proof.json',
      '.bitcode/prompt-system-totality-proof.json'
    ],
    sourceEvidenceRefs: [
      'protocol-demonstration/V26_DELIVERABLE_REFORM.md',
      'protocol-demonstration/test/v26-deliverable-reform.test.js',
      'packages/pipelines/deliverable/src/index.ts',
      'packages/pipelines/deliverable/src/postprocess.ts',
      'packages/pipelines/deliverable/src/types/PipelineSchemas.ts',
      'packages/pipelines/deliverable/src/agents/prompts/comprehend-need-prompt.ts',
      'packages/pipelines/deliverable/src/agents/setup/deliverable-pipeline-comprehend-need-agent.ts'
    ]
  },
  {
    recordId: 'need-comprehension-compatibility',
    canonicalNeed: 'Repurpose task-named retained tool prompts into Bitcode need, written-asset, asset-pack, proof, and shipping-wrapper comprehension.',
    promptImplementation: {
      owners: [
        'packages/generic-tools/task-comprehension/src/prompts/AnalyzeTaskSemanticsDocCodeToolPrompt.ts',
        'packages/generic-tools/task-comprehension/src/prompts/ExtractRequirementsDocCodeToolPrompt.ts',
        'packages/generic-tools/task-comprehension/src/prompts/GenerateSuccessCriteriaDocCodeToolPrompt.ts',
        'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_analyzetasksemantics_doccodetoolpurpose.ts'
      ],
      rawPromptPartBoundary: '@bitcode/prompts/raw_promptparts/* with task-named compatibility filenames',
      runtimeCarryThrough: 'Task-named PromptPart TypeScript and JavaScript must carry canonical need-comprehension text.'
    },
    toolImplementation: {
      owners: [
        'packages/generic-tools/task-comprehension/src/AnalyzeTaskSemanticsTool.ts',
        'packages/generic-tools/task-comprehension/src/primitives.ts',
        'packages/generic-tools/task-comprehension/src/schemas.ts'
      ],
      contract: 'Retained task-named APIs remain compatibility carriers for canonical needComprehension outputs.'
    },
    agentImplementation: {
      owners: [],
      contract: 'No independent live agent; outputs may feed setup/comprehension agents as admitted support.'
    },
    executionImplementation: {
      owners: [
        'packages/generic-tools/task-comprehension/tsconfig.json',
        'packages/generic-tools/task-comprehension/src/types/tools-generics.ts'
      ],
      carriers: ['parent ToolExecution or pipeline execution evidence']
    },
    assetPackImplementation: {
      outputKind: 'need-comprehension support evidence',
      effect: 'Compatibility analysis produces need, written-asset, asset-pack, proof, and shipping-wrapper hints for parent runs.'
    },
    boundaryPosture: 'compatibility',
    verificationSet: [
      'pnpm -C packages/generic-tools/task-comprehension run build',
      'node --test protocol-demonstration/test/v26-prompt-system-boundary.test.js',
      'node --test protocol-demonstration/test/v26-deliverable-reform.test.js'
    ],
    sourceEvidenceRefs: [
      'packages/generic-tools/task-comprehension/README.md',
      'packages/generic-tools/task-comprehension/package.json',
      'packages/generic-tools/task-comprehension/tsconfig.json',
      'packages/generic-tools/task-comprehension/src/AnalyzeTaskSemanticsTool.ts',
      'packages/generic-tools/task-comprehension/src/primitives.ts',
      'packages/generic-tools/task-comprehension/src/prompts/AnalyzeTaskSemanticsDocCodeToolPrompt.ts',
      'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_analyzetasksemantics_doccodetoolpurpose.ts'
    ]
  },
  {
    recordId: 'mcp-external-ingress',
    canonicalNeed: 'Admit Exchange-facing MCP and external interface operations as fail-closed ingress into Bitcode execution state, not as sibling product logic.',
    promptImplementation: {
      owners: [
        'packages/executions-mcp/README.md',
        'packages/executions-mcp/src/index.ts'
      ],
      rawPromptPartBoundary: 'MCP tool descriptions only where admitted by V26 prompt/tool records',
      runtimeCarryThrough: 'MCP descriptions must not promote non-admitted tool families into live Bitcode behavior.'
    },
    toolImplementation: {
      owners: [
        'packages/executions-mcp/src/index.ts',
        'packages/tools-generics/src/mcp/MCPToolWrapper.ts'
      ],
      contract: 'Admitted Exchange-facing tool families are narrowed and create admission fails closed on permission, repository, and provider readiness.'
    },
    agentImplementation: {
      owners: [],
      contract: 'MCP ingress does not promote hidden agents without a separate inference implementation record.'
    },
    executionImplementation: {
      owners: [
        'packages/executions-mcp/src/index.ts',
        'uapi/components/base/bitcode/execution/BitcodeExecutionStreamPanel.tsx'
      ],
      carriers: ['queue/run/execution creation', 'provider ingress', 'operator reread']
    },
    assetPackImplementation: {
      outputKind: 'external ingress state transition',
      effect: 'MCP tools may create or read execution state only through admitted Exchange-facing boundaries.'
    },
    boundaryPosture: 'ingress',
    verificationSet: [
      '.bitcode/retained-package-admissibility-proof.json',
      '.bitcode/system-reform-admissibility-proof.json',
      'package-local executions-mcp typecheck boundary'
    ],
    sourceEvidenceRefs: [
      'packages/executions-mcp/package.json',
      'packages/executions-mcp/README.md',
      'packages/executions-mcp/src/index.ts',
      'packages/tools-generics/src/mcp/MCPToolWrapper.ts',
      'uapi/components/base/bitcode/execution/BitcodeExecutionStreamPanel.tsx',
      'protocol-demonstration/V26_APPLICATION_SYSTEMS.md'
    ]
  }
]);

function hasMeaningfulValue(value) {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'string') return value.trim().length > 0;
  if (value && typeof value === 'object') return Object.keys(value).length > 0;
  return Boolean(value);
}

/**
 * @param {{ fileExists?: (filePath: string) => boolean }} [options]
 */
export function validateV26InferenceImplementationRecords(options = {}) {
  const fileExists = options.fileExists || (() => true);
  const recordChecks = V26_INFERENCE_IMPLEMENTATION_RECORDS.map((record) => {
    const missingFields = V26_INFERENCE_IMPLEMENTATION_RECORD_REQUIRED_FIELDS
      .filter((field) => !hasMeaningfulValue(record[field]));
    const invalidBoundaryPosture = V26_INFERENCE_BOUNDARY_POSTURES.includes(record.boundaryPosture)
      ? null
      : record.boundaryPosture;
    const sourceEvidenceRefs = Array.from(new Set(record.sourceEvidenceRefs || []));
    const missingSourceEvidenceRefs = sourceEvidenceRefs.filter((filePath) => !fileExists(filePath));
    const verificationSet = Array.from(new Set(record.verificationSet || []));
    const passed = missingFields.length === 0
      && invalidBoundaryPosture === null
      && sourceEvidenceRefs.length > 0
      && missingSourceEvidenceRefs.length === 0
      && verificationSet.length > 0;

    return {
      recordId: record.recordId,
      canonicalNeed: record.canonicalNeed,
      boundaryPosture: record.boundaryPosture,
      missingFields,
      invalidBoundaryPosture,
      sourceEvidenceRefs,
      missingSourceEvidenceRefs,
      verificationSet,
      passed
    };
  });
  const boundaryPostureCounts = recordChecks.reduce((counts, check) => {
    counts[check.boundaryPosture] = (counts[check.boundaryPosture] || 0) + 1;
    return counts;
  }, {});

  return {
    reportId: 'v26-inference-implementation-record-registry',
    version: 'V26',
    requiredFields: V26_INFERENCE_IMPLEMENTATION_RECORD_REQUIRED_FIELDS,
    requiredBoundaryPostures: V26_INFERENCE_BOUNDARY_POSTURES,
    recordCount: V26_INFERENCE_IMPLEMENTATION_RECORDS.length,
    boundaryPostureCounts,
    passed: recordChecks.every((check) => check.passed === true),
    records: V26_INFERENCE_IMPLEMENTATION_RECORDS,
    recordChecks
  };
}
