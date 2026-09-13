module.exports = {
    testEnvironment: "node",

    testMatch: [
        "**/*.test.js"
    ],

    verbose: true,

    collectCoverage: true,

    coverageReporters: [
        "text",
        "html",
        "lcov"
    ]
};