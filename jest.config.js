module.exports = {
  testMatch: ['**/?(*.)(spec|test).ts?(x)'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  rootDir: '',
  transform: {
    '.(ts|tsx)': '@swc/jest',
  },
  moduleNameMapper: {
    '^@utils(.*)$': '<rootDir>/src/utils$1',
  },
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  watchAll: false,
  collectCoverage: false,
  coverageDirectory: './docs/jest-coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node'],
};
