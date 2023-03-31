// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  collectCoverage: false,
  coverageReporters: ["text-summary", "html"],
};
