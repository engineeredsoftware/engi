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
    '^@engi/execution-generics$': '<rootDir>/../execution-generics/src/index.ts',
    '^@engi/registry$': '<rootDir>/../registry/src/index.ts',
    '^@engi/prompts$': '<rootDir>/../prompts/src/index.ts',
    '^@engi/doc-comment$': '<rootDir>/src/__mocks__/doc-comment.ts',
    '^@engi/tools-generics$': '<rootDir>/src/__mocks__/tools-generics.ts',
    '^@engi/llm-generics$': '<rootDir>/../llm-generics/src/index.ts',
    '^@engi/orm$': '<rootDir>/../orm/src/index.ts',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../../tsconfig.json',
      diagnostics: false,
    },
  },
};
