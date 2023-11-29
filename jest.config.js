module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["/node_modules/"],
  collectCoverage: true,
  collectCoverageFrom: ["src/components/**/*.tsx"],
  modulePaths: ["<rootDir>/src/"],
};
