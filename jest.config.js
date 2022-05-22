const path = require('path');

module.exports = {
  setupFilesAfterEnv: [`<rootDir>/.jest/setup-test-env.js`],
  transform: {
    '\\.svg': '<rootDir>/.jest/__mocks__/svgTransform.js',
    '^.+\\.(tsx?|jsx?)$': `<rootDir>/.jest/jest-preprocess.js`,
  },
  moduleNameMapper: {
    '\\.svg': `<rootDir>/.jest/__mocks__/svgTransform.js`,
    'typeface-*': 'identity-obj-proxy',
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/.jest/__mocks__/file-mocks.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`, `public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`, `\\.svg`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  testMatch: ['**/__tests__/**/?(*.)+(spec|test)(*.)+(js|ts|tsx)'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverage: false,
  coverageReporters: ['lcov', 'text', 'html'],
  collectCoverageFrom: ['src/**/*.{js|ts|tsx}'],
};
