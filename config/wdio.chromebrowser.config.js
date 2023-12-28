const ANDROID_CAPABILITIES = [
    {
        "appium:platformName": "Android",
        "appium:deviceName": "Pixel_4A_XL",
        "appium:automationName": "UIAutomator2",
        "appium:udid": "emulator-5554",
        "appium:browserName": "chrome",
        "appium:chromedriverExecutable": `${process.cwd()}/app/chromedriver`,
    },
];

exports.config = {
    runner: "local",
    port: 4723,
    specs: [`${process.cwd()}/test/specs/**/*.ts`],
    capabilities: ANDROID_CAPABILITIES,
    logLevel: "info",
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ["appium"],
    framework: "mocha",
    mochaOpts: {
        ui: "bdd",
        timeout: 60000,
    },
};