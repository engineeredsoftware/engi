import { createOrUpdateFileTool } from '../src/index';

jest.mock('@bitcode/generic-tools-editing/execution-context', () => ({
  executionContext: {
    getStore: jest.fn(),
  },
}));

jest.mock('@bitcode/pipelines-generics/src/gate-system/file-gates', () => ({
  validateFileOperation: jest.fn(),
}));

jest.mock('@bitcode/supabase/ssr/server', () => ({
  createClient: jest.fn().mockResolvedValue({}),
}));

const mockConnectionManager = {
  getConnectionById: jest.fn(),
  getConnection: jest.fn(),
  getAuthFromConnection: jest.fn(),
};

const mockProvider = {
  createOrUpdateFile: jest.fn(),
};

jest.mock('@bitcode/vcs', () => ({
  VCSConnections: jest.fn().mockImplementation(() => mockConnectionManager),
  VCSProviderFactory: {
    create: jest.fn().mockResolvedValue(mockProvider),
  },
}));

const { executionContext } = require('@bitcode/generic-tools-editing/execution-context');
const { validateFileOperation } = require('@bitcode/pipelines-generics/src/gate-system/file-gates');
const { VCSConnections, VCSProviderFactory } = require('@bitcode/vcs');

const baseInput = {
  provider: 'github' as const,
  owner: 'engi',
  repo: 'repo',
  path: 'src/index.ts',
  content: 'hello',
  message: 'update file',
};

describe('createOrUpdateFileTool gating', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockConnectionManager.getConnectionById.mockResolvedValue({ id: 'conn-1' });
    mockConnectionManager.getConnection.mockResolvedValue({ id: 'conn-1' });
    mockConnectionManager.getAuthFromConnection.mockResolvedValue({ token: 'abc' });
    mockProvider.createOrUpdateFile.mockResolvedValue({ ok: true });
    (executionContext.getStore as jest.Mock).mockReturnValue({
      get: (namespace: string, key: string) => {
        if (namespace === 'gate' && key === 'current') return 'Design';
        if (namespace === 'meta' && key === 'phase') return 'Design';
        return undefined;
      },
      store: jest.fn(),
    });
  });

  it('throws gate violation when file operation not allowed', async () => {
    (validateFileOperation as jest.Mock).mockReturnValue({
      allowed: false,
      reason: 'Design phase can only modify .ai/PRODUCT.md',
    });

    await expect(
      createOrUpdateFileTool.use({ ...baseInput })
    ).rejects.toThrow('Design phase can only modify .ai/PRODUCT.md');

    expect(VCSConnections).not.toHaveBeenCalled();
    expect(VCSProviderFactory.create).not.toHaveBeenCalled();
  });

  it('delegates to provider when gate allows operation', async () => {
    (validateFileOperation as jest.Mock).mockReturnValue({ allowed: true });

    await createOrUpdateFileTool.use({ ...baseInput, connectionId: 'conn-1' });

    expect(validateFileOperation).toHaveBeenCalledWith('write', baseInput.path, 'Design');
    expect(VCSProviderFactory.create).toHaveBeenCalled();
    expect(mockProvider.createOrUpdateFile).toHaveBeenCalledWith(
      expect.any(Object),
      baseInput.owner,
      baseInput.repo,
      baseInput.path,
      expect.objectContaining({ message: baseInput.message })
    );
  });

  it('skips gate check when no execution context', async () => {
    (executionContext.getStore as jest.Mock).mockReturnValue(undefined);
    (validateFileOperation as jest.Mock).mockReturnValue({ allowed: true });

    await createOrUpdateFileTool.use({ ...baseInput, connectionId: 'conn-1' });

    // Without context, we still proceed to provider
    expect(VCSProviderFactory.create).toHaveBeenCalled();
    expect(mockProvider.createOrUpdateFile).toHaveBeenCalled();
  });
});
