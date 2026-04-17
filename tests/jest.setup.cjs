// Provide a default mock for the shared logger so tests can safely depend on it.
if (typeof jest !== 'undefined') {
  jest.mock('@bitcode/logger', () => ({
    log: jest.fn(async () => ({ level: 'info', handled: true }))
  }));
}
