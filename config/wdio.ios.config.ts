const fs = require("fs");

const IOS_CAPABILITIES = [
    {
        'appium:platformName': 'iOS',
        'appium:deviceName': 'iPhone 15 Pro',
        'appium:automationName': 'XCUITest',
        'appium:udid': '86E68CFA-349F-45F1-84D2-1956419487EE',
        'appium:platformVersion': '17.0',
        'appium:app': `${process.cwd()}/app/ios/ios_sauce_app.app`
    },
];

exports.config = {
    runner: "local",
    port: 4723,
    specs: [`${process.cwd()}/test/specs/**/*.js`],
    capabilities: IOS_CAPABILITIES,
    logLevel: "info",
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ["appium"],
    framework: "mocha",
    reporters: [
        "spec",
        [
            "allure",
            {
                outputDir: "allure-results",
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
            },
        ],
    ],
    mochaOpts: {
        ui: "bdd",
        timeout: 60000,
    },
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!fs.existsSync("./errorShots")) {
            fs.mkdirSync("./errorShots");
        }
        if (!passed) {
            await driver.saveScreenshot(`./errorShots/${test.title.replaceAll(" ", "_")}.png`);
        }
    },
};