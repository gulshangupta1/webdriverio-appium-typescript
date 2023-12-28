const fs = require("fs");

const ANDROID_CAPABILITIES = [
    {
        'appium:platformName': 'Android',
        'appium:deviceName': 'Pixel_6_Pro',
        'appium:platformVersion': '13.0',
        'appium:automationName': 'UiAutomator2',
        'appium:udid': 'emulator-5554',
        'appium:app': `${process.cwd()}/app/android/android_sauce_lab_app.apk`,
        // 'appium:chromedriverExecutable': `${process.cwd()}/app/chromedriver`
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