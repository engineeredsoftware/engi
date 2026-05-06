/**
 * @jest-environment node
 */

const mockGetExternalRealization = jest.fn(
  (input?: { environmentMode?: string | null }) => ({
    ok: true,
    externalRealization: { descriptorId: 'v24_external_realization_test' },
    activeRuntime: {
      configuredEnvironmentMode: input?.environmentMode || 'mock',
      actualityDisposition: 'deterministic-mock-only',
      interfaceRuntimeStates: [
        { interfaceId: 'bitcoin-mainchain-execution', runtimeState: 'mock' },
        { interfaceId: 'repeated-read-payment-execution', runtimeState: 'mock' },
        { interfaceId: 'sidechain-execution', runtimeState: 'mock' },
        { interfaceId: 'compute-container-execution', runtimeState: 'mock' },
        { interfaceId: 'storage-container-execution', runtimeState: 'mock' },
        { interfaceId: 'github-live-interface', runtimeState: 'mock' },
      ],
    },
  }),
);

jest.mock('@/lib/bitcode-app-context', () => ({
  getBitcodeAppContext: () => ({
    getExternalRealization: mockGetExternalRealization,
  }),
  toBitcodeErrorResponse: (error: unknown) =>
    new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    }),
}));

describe('/api/external-realization GET', () => {
  const envBackup = { ...process.env };

  beforeAll(() => {
    delete process.env.BITCODE_V24_ENVIRONMENT_MODE;
  });

  afterAll(() => {
    process.env = envBackup;
  });

  beforeEach(() => {
    jest.resetModules();
    mockGetExternalRealization.mockClear();
  });

  it('returns the app-owned external realization payload used by /application', async () => {
    const { GET } = await import('@/app/api/external-realization/route');

    const response = await GET(new Request('http://localhost/api/external-realization'));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(payload).toHaveProperty('externalRealization');
    expect(payload).toHaveProperty('activeRuntime');
    expect(payload.activeRuntime.configuredEnvironmentMode).toBe('mock');
    expect(payload.activeRuntime.actualityDisposition).toBe('deterministic-mock-only');
    expect(Array.isArray(payload.activeRuntime.interfaceRuntimeStates)).toBe(true);
    expect(payload.activeRuntime.interfaceRuntimeStates).toHaveLength(6);
    expect(payload.activeRuntime.interfaceRuntimeStates[0]).toHaveProperty('interfaceId');
    expect(payload.activeRuntime.interfaceRuntimeStates[0]).toHaveProperty('runtimeState');
    expect(mockGetExternalRealization).toHaveBeenCalledWith({ environmentMode: null });
  });

  it('forwards explicit environment-mode overrides into the runtime context', async () => {
    const { GET } = await import('@/app/api/external-realization/route');

    const response = await GET(
      new Request('http://localhost/api/external-realization?environmentMode=development'),
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.activeRuntime.configuredEnvironmentMode).toBe('development');
    expect(mockGetExternalRealization).toHaveBeenCalledWith({ environmentMode: 'development' });
  });
});
