module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@bitcode/tools-generics$': '<rootDir>/__mocks__/engi-tools-generics.ts'
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json'
    }
  }
};
