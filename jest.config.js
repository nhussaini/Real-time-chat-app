/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}"
  ],
  coveragePathIgnorePatterns: [
    "node_modules/",
    "vendor/",
    "skillreactor/",
    ".build/",
    "coverage/",
    "jest.config.js",
    "src/reportWebVitals.ts"
  ]
};