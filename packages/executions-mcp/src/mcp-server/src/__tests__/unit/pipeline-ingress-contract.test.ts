import { describe, expect, it, jest, beforeEach } from '@jest/globals';

jest.mock('../../pipeline-execution/adapter', () => {
  const asRecord = (value: unknown): Record<string, any> | null =>
    value && typeof value === 'object' && !Array.isArray(value)
      ? (value as Record<string, any>)
      : null;

  const sameConnection = (left: Record<string, any>, right: Record<string, any>) =>
    left.kind === right.kind &&
    left.provider === right.provider &&
    left.connectionId === right.connectionId &&
    left.owner === right.owner &&
    left.name === right.name &&
    left.branch === right.branch &&
    left.path === right.path;

  return {
    buildPipelineInputContext: jest.fn((ingress: string, config: Record<string, any>) => {
      const repository = asRecord(config.repository);
      const attachments = Array.isArray(config.attachments) ? config.attachments : [];
      const explicitConnections = Array.isArray(config.connections)
        ? config.connections.filter((connection: unknown) => {
            const record = asRecord(connection);
            return record?.kind === 'repository_connection' && typeof record?.provider === 'string';
          })
        : [];
      const repositoryConnection = repository
        ? [{
            kind: 'repository_connection',
            provider: repository.provider || 'github',
            connectionId: repository.connectionId,
            owner: repository.owner,
            name: repository.name,
            branch: repository.branch,
            path: repository.path,
          }]
        : [];
      const connections = [...explicitConnections];

      for (const connection of repositoryConnection) {
        if (!connections.some((existing) => sameConnection(existing, connection))) {
          connections.push(connection);
        }
      }

      return {
        ingress,
        repository: repository || undefined,
        attachments,
        connections,
        mcpConfig: asRecord(config.mcpConfig) || {},
      };
    }),
    queuePipelineJob: jest.fn(),
    monitorPipelineExecution: jest.fn(),
    cancelPipelineExecution: jest.fn(),
    getPipelineMetrics: jest.fn(),
  };
});

import { registerPipelineTools } from '../../tools/pipeline-tools.ts';
import {
  AssetPackPipelineToolSchema,
  type MCPAuthContext,
} from '../../types';
import {
  buildPipelineInputContext,
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
    const parsed = AssetPackPipelineToolSchema.safeParse({
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

  it('normalizes third-party MCP repository and attachment ingress as input context only', () => {
    const inputContext = buildPipelineInputContext('third_party_mcp', {
      repository: {
        owner: 'bitcode-labs',
        name: 'application',
        provider: 'github',
        branch: 'main',
      },
      attachments: [
        {
          type: 'url',
          content: 'https://linear.example.test/issue/BIT-26',
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
    });

    expect(inputContext).toMatchObject({
      ingress: 'third_party_mcp',
      repository: {
        owner: 'bitcode-labs',
        name: 'application',
        provider: 'github',
      },
      attachments: [
        {
          type: 'url',
          content: 'https://linear.example.test/issue/BIT-26',
        },
      ],
    });
    expect(inputContext.connections).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: 'repository_connection',
          provider: 'github',
          connectionId: 42,
        }),
      ]),
    );
    expect(inputContext).not.toHaveProperty('assetPacks');
    expect(inputContext).not.toHaveProperty('deliverables');
  });

  it('returns normalized ingress and output meaning for queued MCP writes', async () => {
    mockedQueuePipelineJob.mockResolvedValue({
      runId: 'run-1',
      shippableCompatibilityId: 'ship-compat-1',
    });

    const tool = registerPipelineTools().find(
      (candidate) => candidate.name === 'bitcode://pipelines/asset-pack/create',
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
      shippableCompatibilityId: 'ship-compat-1',
      status: 'queued',
      interfaceSurface: 'bitcode_mcp',
      outputMeaning: 'asset_packs',
      writeAdmission: {
        admitted: true,
        interfaceSurface: 'bitcode_mcp',
        permission: 'pipelines.create',
        ingressBasis: 'matching_repository_connection',
        repositoryProvider: 'github',
        repositoryAnchor: 'github:bitcode-labs/application@main',
        attachmentCount: 1,
        connectionCount: 1,
        outputMeaning: 'asset_packs',
      },
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
    expect(mockedQueuePipelineJob).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata: expect.objectContaining({
          interfaceSurface: 'bitcode_mcp',
          outputMeaning: 'asset_packs',
          writeAdmission: expect.objectContaining({
            admitted: true,
            ingressBasis: 'matching_repository_connection',
            repositoryAnchor: 'github:bitcode-labs/application@main',
          }),
        }),
      }),
    );
  });

  it('rejects MCP pipeline writes without pipelines.create permission', async () => {
    const tool = registerPipelineTools().find(
      (candidate) => candidate.name === 'bitcode://pipelines/asset-pack/create',
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
      (candidate) => candidate.name === 'bitcode://pipelines/asset-pack/create',
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
      shippableCompatibilityId: 'ship-compat-credential',
    });

    const tool = registerPipelineTools().find(
      (candidate) => candidate.name === 'bitcode://pipelines/asset-pack/create',
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
      shippableCompatibilityId: 'ship-compat-credential',
      status: 'queued',
      interfaceSurface: 'bitcode_mcp',
      outputMeaning: 'asset_packs',
      writeAdmission: {
        admitted: true,
        ingressBasis: 'provider_credential',
        repositoryProvider: 'github',
        repositoryAnchor: 'github:bitcode-labs/application',
      },
    });
  });

  it('returns asset-pack-normalized results for completed MCP writes', async () => {
    mockedQueuePipelineJob.mockResolvedValue({
      runId: 'run-2',
      shippableCompatibilityId: 'ship-compat-2',
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
      (candidate) => candidate.name === 'bitcode://pipelines/asset-pack/create',
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
      writeAdmission: {
        admitted: true,
        ingressBasis: 'provider_credential',
        repositoryProvider: 'github',
        repositoryAnchor: 'github:bitcode-labs/application',
      },
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
