module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  moduleNameMapper: {
    '^@bitcode/registry$': '<rootDir>/__mocks__/bitcode-registry.ts',
    '^@bitcode/prompts$': '<rootDir>/__mocks__/bitcode-prompts.ts'
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json'
    }
  }
};
