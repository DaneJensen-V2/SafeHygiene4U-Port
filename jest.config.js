const { defaults } = require('jest-config');
const config = {
    preset: "jest-expo",
    collectCoverage: true,
    transform: {
        '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
    },
    collectCoverageFrom: [
      "**/src/**",
      "!**/src/index.js",
      "!**/coverage/**",
      "!**/node_modules/**",
      "!**/babel.config.js",
      "!**/jest.setup.js"
    ],
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts', 'cts', 'mjs', 'js', 'jsx', 'ts', 'tsx'],
    setupFilesAfterEnv: [
        '<rootDir>/tst/utils/setup-jest.js'
    ],
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|expo|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
    ]
};

module.exports = config;
