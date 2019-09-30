'use strict'

const { resolve } = require('path')

/**
 * @type {import('ts-jest/dist/types').TsJestConfig}
 */
const tsJestConfig = {
  tsConfig: {
    noUnusedLocals: true,
    noUnusedParameters: true,
  },
}

/**
 * @type {Partial<jest.InitialOptions>}
 */
module.exports = {
  rootDir: resolve(__dirname, '../..'),
  setupFiles: ['<rootDir>/.config/jest/jest.setup.js'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // testEnvironment: 'node',
  // transform: {
  // '^.+\\.tsx?$': 'babel-jest',
  // },
  testMatch: ['<rootDir>/**/*.test.{ts,tsx}'],
  collectCoverageFrom: ['<rootDir>/components/**/*.{ts,tsx}', '<rootDir>/pages/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: '<rootDir>/.coverage',

  snapshotSerializers: ['enzyme-to-json/serializer'],
  globals: {
    'ts-jest': tsJestConfig,
  },
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        outputPath: '__reports/report-unit/index.html',
        pageTitle: 'Report',
        includeFailureMsg: true,
        includeConsoleLog: true,
      },
    ],
  ],
}
