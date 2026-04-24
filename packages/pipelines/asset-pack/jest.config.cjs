/**
 * Jest configuration for the AssetPack pipeline
 */
module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
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
    '^@bitcode/pipelines-generics$': '<rootDir>/../../pipelines-generics/src/index.ts',
    '^@bitcode/pipelines-generics/(.*)$': '<rootDir>/../../pipelines-generics/$1',
    '^@bitcode/execution-generics$': '<rootDir>/../../execution-generics/src/index.ts',
    '^@bitcode/execution-generics/(.*)$': '<rootDir>/../../execution-generics/src/$1',
    '^@bitcode/agent-generics$': '<rootDir>/../../agent-generics/src/index.ts',
    '^@bitcode/agent-generics/(.*)$': '<rootDir>/../../agent-generics/src/$1',
    '^@bitcode/generic-tools/(.*)$': '<rootDir>/../../generic-tools/$1/src/index.ts',
    '^@bitcode/streams$': '<rootDir>/../../streams/src/index.ts',
    '^@bitcode/streams/(.*)$': '<rootDir>/../../streams/src/$1',
    '^@bitcode/generic-llms$': '<rootDir>/../../generic-llms/src/index.ts',
    '^@bitcode/generic-llms/(.*)$': '<rootDir>/../../generic-llms/src/$1',
    '^@bitcode/llm-generics$': '<rootDir>/../../llm-generics/src/index.ts',
    '^@bitcode/llm-generics/(.*)$': '<rootDir>/../../llm-generics/src/$1',
    '^@bitcode/logger$': '<rootDir>/../../logger/src/index.ts',
    '^@bitcode/logger/(.*)$': '<rootDir>/../../logger/src/$1',
    '^@bitcode/tools-generics$': '<rootDir>/../../tools-generics/src/index.ts',
    '^@bitcode/tools-generics/(.*)$': '<rootDir>/../../tools-generics/src/$1',
    '^@bitcode/vcs$': '<rootDir>/../../vcs/src/index.ts',
    '^@bitcode/vcs/(.*)$': '<rootDir>/../../vcs/src/$1',
    '^@bitcode/orm$': '<rootDir>/../../orm/src/index.ts',
    '^@bitcode/orm/(.*)$': '<rootDir>/../../orm/src/$1',
    '^@bitcode/prompts$': '<rootDir>/../../prompts/src/index.ts',
    '^@bitcode/prompts/(.*)$': '<rootDir>/../../prompts/src/$1',
    '^@bitcode/generic-tools/use-computer$': '<rootDir>/../../generic-tools/use-computer/src/index.ts',
    '^@bitcode/generic-tools/use-computer/(.*)$': '<rootDir>/../../generic-tools/use-computer/src/$1',
    '^@bitcode/registry$': '<rootDir>/../../registry/src/index.ts',
    '^@bitcode/registry/(.*)$': '<rootDir>/../../registry/src/$1',
    '^@bitcode/doc-comment$': '<rootDir>/../../doc-comment/src/index.ts',
    '^@bitcode/doc-comment/(.*)$': '<rootDir>/../../doc-comment/src/$1',
  },
};
