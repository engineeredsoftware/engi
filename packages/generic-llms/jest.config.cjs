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
    '^@bitcode/llm-generics$': '<rootDir>/../llm-generics/src/index.ts',
    '^@bitcode/registry$': '<rootDir>/../registry/src/index.ts'
  }
};
