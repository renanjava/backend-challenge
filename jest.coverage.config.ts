import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),

  testRegex: '.*\\.(spec|int-spec)\\.ts$',

  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.test.ts',
    '!src/**/*mock*.ts',
  ],

  coverageDirectory: './coverage',

  testEnvironment: 'node',

  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],

  collectCoverage: true,
}
