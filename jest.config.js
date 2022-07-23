module.exports = {
    moduleNameMapper:{
        '\\.(css|scss)$':'<rootDir>/jestSetup/styleMock.js',
    },
    setupFilesAfterEnv:['<rootDir>/jestSetup/setupTests.js'],
    "verbose": true,
    "testEnvironment": "jsdom"
}