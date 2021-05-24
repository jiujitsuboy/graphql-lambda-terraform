// eslint-disable-next-line @typescript-eslint/no-var-requires
const { testDir, typesDir } = require('./paths')

module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.js',
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.d.ts',
    '!**/__tests__/**',
    '!**/__mocks__/**',
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  collectCoverageFrom: [
    'src/**/**.ts',
    '!src/types/**.ts',
    '!src/index.ts',
    '!src/localServer.ts',
    '!src/schema/typeDefs.ts',
  ],
  rootDir: '../',
  moduleFileExtensions: ['js', 'json', 'ts'],
  transformIgnorePatterns: ['/node_modules', '/dist'],
  coverageDirectory: './coverage',
  coverageReporters: ['html', 'text', 'lcovonly'],
  coverageThreshold: {
    global: {
      statements: 78,
      branches: 53,
      functions: 79,
      lines: 79,
    },
  },
  moduleDirectories: ['<rootDir>/node_modules', typesDir],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    ['jest-watch-toggle-config', { setting: 'verbose' }],
    ['jest-watch-toggle-config', { setting: 'collectCoverage' }],
  ],
}
