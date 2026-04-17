/**
 * Jest configuration for pipelines-generics
 */
module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  roots: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@bitcode/execution-generics$': '<rootDir>/../execution-generics/src/index.ts',
    '^@bitcode/registry$': '<rootDir>/../registry/src/index.ts',
    '^@bitcode/prompts$': '<rootDir>/../prompts/src/index.ts',
    '^@bitcode/doc-comment$': '<rootDir>/src/__mocks__/doc-comment.ts',
    '^@bitcode/tools-generics$': '<rootDir>/src/__mocks__/tools-generics.ts',
    '^@bitcode/llm-generics$': '<rootDir>/../llm-generics/src/index.ts',
    '^@bitcode/orm$': '<rootDir>/../orm/src/index.ts',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../../tsconfig.json',
      diagnostics: false,
    },
  },
};
