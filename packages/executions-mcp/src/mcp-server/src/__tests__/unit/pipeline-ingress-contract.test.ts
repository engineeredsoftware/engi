import { describe, expect, it, jest, beforeEach } from '@jest/globals';

jest.mock('../../pipeline-execution/adapter', () => {
  const actual = jest.requireActual('../../pipeline-execution/adapter');

  return {
    ...actual,
    queuePipelineJob: jest.fn(),
    monitorPipelineExecution: jest.fn(),
    cancelPipelineExecution: jest.fn(),
    getPipelineMetrics: jest.fn(),
  };
});

import { registerPipelineTools } from '../../tools/pipeline-tools';
import {
  DeliverablePipelineToolSchema,
  type MCPAuthContext,
} from '../../types';
import {
  queuePipelineJob,
  monitorPipelineExecution,
} from '../../pipeline-execution/adapter';

const mockedQueuePipelineJob = jest.mocked(queuePipelineJob);
const mockedMonitorPipelineExecution = jest.mocked(monitorPipelineExecution);

const AUTH_CONTEXT: MCPAuthContext = {
  userId: 'user-1',
  organizationId: 'org-1',
  permissions: {
    pipelines: { create: true, read: true, cancel: true, retry: true },
    organization: { manageMembers: true, viewAnalytics: true, manageBtd: true },
    resources: { read: true, export: true },
  },
  btdBalance: 1000,
  mcpCredentials: {},
};

const AUTH_CONTEXT_WITH_GITHUB_CREDENTIAL: MCPAuthContext = {
  ...AUTH_CONTEXT,
  mcpCredentials: {
    github: { token: 'github-token' },
  },
};

const AUTH_CONTEXT_WITHOUT_PIPELINE_CREATE: MCPAuthContext = {
  ...AUTH_CONTEXT,
  permissions: {
    ...AUTH_CONTEXT.permissions,
    pipelines: {
      ...AUTH_CONTEXT.permissions.pipelines,
      create: false,
    },
  },
};

describe('Bitcode MCP pipeline ingress contract', () => {
  beforeEach(() => {
    mockedQueuePipelineJob.mockReset();
    mockedMonitorPipelineExecution.mockReset();
  });

  it('admits explicit repository/provider connections as ingress input', () => {
    const parsed = DeliverablePipelineToolSchema.safeParse({
      task: 'Create a settlement-ready asset pack for a wallet-gated Bitcode transaction flow',
      repository: {
        owner: 'bitcode-labs',
        name: 'application',
        provider: 'github',
      },
      attachments: [
        {
          type: 'figma',
          content: 'https://www.figma.com/file/ABC123/Design-System',
        },
      ],
      connections: [
        {
          kind: 'repository_connection',
          provider: 'github',
          connectionId: 42,
          owner: 'bitcode-labs',
          name: 'application',
          branch: 'main',
        },
      ],
      subtype: 'pull_request',
      streaming: true,
    });

    expect(parsed.success).toBe(true);
    if (!parsed.success) {
      return;
    }

    expect(parsed.data.connections).toHaveLength(1);
    expect(parsed.data.connections[0]).toMatchObject({
      kind: 'repository_connection',
      provider: 'github',
      connectionId: 42,
    });
  });

  it('returns normalized ingress and output meaning for queued MCP writes', async () => {
    mockedQueuePipelineJob.mockResolvedValue({
      runId: 'run-1',
      deliverableId: 'deliv-1',
    });

    const tool = registerPipelineTools().find(
      (candidate) => candidate.name === 'bitcode://pipelines/deliverable/create',
    );

    expect(tool?.execute).toBeDefined();

    const result = await tool!.execute!(
      {
        task: 'Create a settlement-ready asset pack for a wallet-gated Bitcode transaction flow',
        repository: {
          owner: 'bitcode-labs',
          name: 'application',
          provider: 'github',
          branch: 'main',
        },
        attachments: [
          {
            type: 'document',
            content: 'https://docs.example.test/requirements',
          },
        ],
        connections: [
          {
            kind: 'repository_connection',
            provider: 'github',
            connectionId: 42,
            owner: 'bitcode-labs',
            name: 'application',
            branch: 'main',
          },
        ],
        subtype: 'pull_request',
        streaming: true,
      },
      AUTH_CONTEXT,
    );

    expect(result).toMatchObject({
      runId: 'run-1',
      deliverableId: 'deliv-1',
      status: 'queued',
      interfaceSurface: 'bitcode_mcp',
      outputMeaning: 'asset_packs',
    });
    expect(result.inputContext).toMatchObject({
      ingress: 'bitcode_mcp',
      repository: {
        owner: 'bitcode-labs',
        name: 'application',
      },
    });
    expect(result.inputContext.attachments).toHaveLength(1);
    expect(result.inputContext.connections).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: 'repository_connection',
          provider: 'github',
          connectionId: 42,
        }),
      ]),
    );
  });

  it('rejects MCP pipeline writes without pipelines.create permission', async () => {
    const tool = registerPipelineTools().find(
      (candidate) => candidate.name === 'bitcode://pipelines/deliverable/create',
    );

    await expect(
      tool!.execute!(
        {
          task: 'Create a settlement-ready asset pack for a wallet-gated Bitcode transaction flow',
          repository: {
            owner: 'bitcode-labs',
            name: 'application',
            provider: 'github',
          },
          attachments: [],
          connections: [],
          subtype: 'pull_request',
          streaming: true,
        },
        AUTH_CONTEXT_WITHOUT_PIPELINE_CREATE,
      ),
    ).rejects.toThrow(
      'Bitcode MCP write admission requires pipelines.create permission before any pipeline job can be queued.',
    );
    expect(mockedQueuePipelineJob).not.toHaveBeenCalled();
  });

  it('rejects incoherent repository/provider ingress before queueing MCP work', async () => {
    const tool = registerPipelineTools().find(
      (candidate) => candidate.name === 'bitcode://pipelines/deliverable/create',
    );

    await expect(
      tool!.execute!(
        {
          task: 'Create a settlement-ready asset pack for a wallet-gated Bitcode transaction flow',
          repository: {
            owner: 'bitcode-labs',
            name: 'application',
            provider: 'github',
          },
          attachments: [],
          connections: [
            {
              kind: 'repository_connection',
              provider: 'github',
              connectionId: 42,
              owner: 'bitcode-labs',
              name: 'different-repository',
              branch: 'main',
            },
          ],
          subtype: 'pull_request',
          streaming: true,
        },
        AUTH_CONTEXT_WITH_GITHUB_CREDENTIAL,
      ),
    ).rejects.toThrow(
      'Bitcode MCP write admission rejected the repository/provider ingress because no supplied repository_connection matches the requested repository anchor.',
    );
    expect(mockedQueuePipelineJob).not.toHaveBeenCalled();
  });

  it('admits provider-authenticated repository ingress without explicit repository_connection', async () => {
    mockedQueuePipelineJob.mockResolvedValue({
      runId: 'run-credential',
      deliverableId: 'deliv-credential',
    });

    const tool = registerPipelineTools().find(
      (candidate) => candidate.name === 'bitcode://pipelines/deliverable/create',
    );

    const result = await tool!.execute!(
      {
        task: 'Create a settlement-ready asset pack for a wallet-gated Bitcode transaction flow',
        repository: {
          owner: 'bitcode-labs',
          name: 'application',
          provider: 'github',
        },
        attachments: [],
        connections: [],
        subtype: 'pull_request',
        streaming: true,
      },
      AUTH_CONTEXT_WITH_GITHUB_CREDENTIAL,
    );

    expect(result).toMatchObject({
      runId: 'run-credential',
      deliverableId: 'deliv-credential',
      status: 'queued',
      interfaceSurface: 'bitcode_mcp',
      outputMeaning: 'asset_packs',
    });
  });

  it('returns asset-pack-normalized results for completed MCP writes', async () => {
    mockedQueuePipelineJob.mockResolvedValue({
      runId: 'run-2',
      deliverableId: 'deliv-2',
    });
    mockedMonitorPipelineExecution.mockResolvedValue({
      runId: 'run-2',
      status: 'completed',
      result: {
        deliverables: [
          {
            type: 'pull_request',
            url: 'https://github.com/bitcode-labs/application/pull/1',
          },
        ],
      },
      btdUsed: 120,
      startedAt: new Date('2026-04-22T00:00:00.000Z'),
      completedAt: new Date('2026-04-22T00:02:00.000Z'),
      events: [],
    });

    const tool = registerPipelineTools().find(
      (candidate) => candidate.name === 'bitcode://pipelines/deliverable/create',
    );

    const result = await tool!.execute!(
      {
        task: 'Create a settlement-ready asset pack for a wallet-gated Bitcode transaction flow',
        repository: {
          owner: 'bitcode-labs',
          name: 'application',
          provider: 'github',
        },
        attachments: [],
        connections: [],
        subtype: 'pull_request',
        streaming: false,
      },
      AUTH_CONTEXT_WITH_GITHUB_CREDENTIAL,
    );

    expect(result).toMatchObject({
      runId: 'run-2',
      status: 'completed',
      interfaceSurface: 'bitcode_mcp',
      outputMeaning: 'asset_packs',
    });
    expect(result.assetPacks).toEqual([
      expect.objectContaining({
        type: 'pull_request',
        url: 'https://github.com/bitcode-labs/application/pull/1',
      }),
    ]);
    expect(result.deliverables).toEqual(result.assetPacks);
  });
});
