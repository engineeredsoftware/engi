module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json',
      diagnostics: false
    }
  },
  moduleNameMapper: {
    '^@engi/llm-generics$': '<rootDir>/../llm-generics/src/index.ts',
    '^@engi/registry$': '<rootDir>/../registry/src/index.ts'
  }
};
