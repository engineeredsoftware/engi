/**
 * Jest configuration for the digest package.
 */
module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  roots: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/artifacts$': '<rootDir>/__mocks__/artifacts.ts',
    '^@/lib/logger$': '<rootDir>/__mocks__/logger.ts',
    '^@/lib/engine/constants$': '<rootDir>/__mocks__/lib/engine/constants.ts',
    '^@/digest/streams$': '<rootDir>/__mocks__/streams.ts',
    '^@bitcode/logger$': '<rootDir>/__mocks__/bitcode/logger.ts',
    '^@bitcode/observability$': '<rootDir>/__mocks__/bitcode/observability.ts',
    '^@/llm/geminiClient$': '<rootDir>/__mocks__/llm/geminiClient.ts',
    '^@/llm/anthropicClient$': '<rootDir>/__mocks__/llm/anthropicClient.ts',
    '^@/lib/dryrun$': '<rootDir>/__mocks__/lib/dryrun.ts',
    '^@/lib/git/git$': '<rootDir>/__mocks__/lib/git/git.ts',
    '^@/lib/models$': '<rootDir>/__mocks__/lib/models.ts',
    '^minimatch$': '<rootDir>/__mocks__/minimatch.ts',
    '^dotenv$': '<rootDir>/__mocks__/dotenv.ts',
    '^@/(.*)$': '<rootDir>/../$1',
    '^../streams$': '<rootDir>/__mocks__/streams.ts',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json',
      diagnostics: false,
    },
  },
};
