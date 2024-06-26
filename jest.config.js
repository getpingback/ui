const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js", "react-intersection-observer/test-utils"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  // collectCoverage: true,
  // collectCoverageFrom: ["src/components/**/*.tsx"],
  modulePaths: ["<rootDir>/src/"],
};

module.exports = createJestConfig(customJestConfig);
