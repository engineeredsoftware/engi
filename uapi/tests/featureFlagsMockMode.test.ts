describe('mock-mode feature flags', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
    jest.resetModules();
  });

  function expectMasterMockModeActivatesAuxillariesMockData(modulePath: string) {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_MASTER_MOCK_MODE: 'true',
      NEXT_PUBLIC_ENABLE_MOCKS: 'false',
      NEXT_PUBLIC_MOCK_USER_AUXILLARIES: 'false',
    };

    jest.isolateModules(() => {
      const flags = require(modulePath);

      expect(flags.MASTER_MOCK_MODE).toBe(true);
      expect(flags.ENABLE_MOCKS).toBe(true);
      expect(flags.MOCK_USER_AUXILLARIES).toBe(true);
    });
  }

  it('lets master mock mode activate auxillaries mock data for client and server code', () => {
    expectMasterMockModeActivatesAuxillariesMockData('@/config/featureFlags');
  });

  it('keeps the active JavaScript feature flag companion in master mock parity', () => {
    expectMasterMockModeActivatesAuxillariesMockData('../config/featureFlags.js');
  });

  it('keeps auxillaries mock mode disabled when both master and explicit mocks are off', () => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_MASTER_MOCK_MODE: 'false',
      NEXT_PUBLIC_ENABLE_MOCKS: 'false',
      NEXT_PUBLIC_MOCK_USER_AUXILLARIES: 'true',
    };

    jest.isolateModules(() => {
      const flags = require('@/config/featureFlags');

      expect(flags.MASTER_MOCK_MODE).toBe(false);
      expect(flags.ENABLE_MOCKS).toBe(false);
      expect(flags.MOCK_USER_AUXILLARIES).toBe(false);
    });
  });
});
