/**
 * Jest configuration for deliverable pipeline
 */
module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', 'src/__tests__/deliverable-pipeline.test.ts'],
  roots: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../../../tsconfig.json',
      diagnostics: false,
    },
  },
  // Map workspace aliases used in tests to source files so Jest can resolve them
  moduleNameMapper: {
    '^@engi/pipelines-generics$': '<rootDir>/../../pipelines-generics/src/index.ts',
    '^@engi/pipelines-generics/(.*)$': '<rootDir>/../../pipelines-generics/$1',
    '^@engi/execution-generics$': '<rootDir>/../../execution-generics/src/index.ts',
    '^@engi/execution-generics/(.*)$': '<rootDir>/../../execution-generics/src/$1',
    '^@engi/agent-generics$': '<rootDir>/../../agent-generics/src/index.ts',
    '^@engi/agent-generics/(.*)$': '<rootDir>/../../agent-generics/src/$1',
    '^@engi/streams$': '<rootDir>/../../streams/src/index.ts',
    '^@engi/streams/(.*)$': '<rootDir>/../../streams/src/$1',
    '^@engi/generic-llms$': '<rootDir>/../../generic-llms/src/index.ts',
    '^@engi/generic-llms/(.*)$': '<rootDir>/../../generic-llms/src/$1',
    '^@engi/llm-generics$': '<rootDir>/../../llm-generics/src/index.ts',
    '^@engi/llm-generics/(.*)$': '<rootDir>/../../llm-generics/src/$1',
    '^@engi/logger$': '<rootDir>/../../logger/src/index.ts',
    '^@engi/logger/(.*)$': '<rootDir>/../../logger/src/$1',
    '^@engi/tools-generics$': '<rootDir>/../../tools-generics/src/index.ts',
    '^@engi/tools-generics/(.*)$': '<rootDir>/../../tools-generics/src/$1',
    '^@engi/vcs$': '<rootDir>/../../vcs/src/index.ts',
    '^@engi/vcs/(.*)$': '<rootDir>/../../vcs/src/$1',
    '^@engi/orm$': '<rootDir>/../../orm/src/index.ts',
    '^@engi/orm/(.*)$': '<rootDir>/../../orm/src/$1',
    '^@engi/prompts$': '<rootDir>/../../prompts/src/index.ts',
    '^@engi/prompts/(.*)$': '<rootDir>/../../prompts/src/$1',
    '^@engi/registry$': '<rootDir>/../../registry/src/index.ts',
    '^@engi/registry/(.*)$': '<rootDir>/../../registry/src/$1',
    '^@engi/doc-comment$': '<rootDir>/../../doc-comment/src/index.ts',
    '^@engi/doc-comment/(.*)$': '<rootDir>/../../doc-comment/src/$1',
  },
};
