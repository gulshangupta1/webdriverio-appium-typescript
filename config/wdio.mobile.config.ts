import * as fs from "fs";

const androidAppName: string = 'android_sauce_lab_app.apk.apk';
const iosAppName: string = 'MyRNDemoApp.app';

const ANDROID_CAPABILITIES = [
    {
        'appium:platformName': 'Android',
        'appium:deviceName': 'Pixel_6_Pro',
        'appium:platformVersion': '13.0',
        'appium:automationName': 'UiAutomator2',
        'appium:udid': 'emulator-5554',
        'appium:app': `${process.cwd()}/app/android/${androidAppName}`,
        'appium:chromedriverExecutable': `${process.cwd()}/app/chromedriver`,
        // 'appium:noReset': true
    }
];

const IOS_CAPABILITIES = [
    {
        'platformName': 'iOS',
        'appium:deviceName': 'iPhone 15 Pro',
        'appium:automationName': 'XCUITest',
        'appium:udid': '86E68CFA-349F-45F1-84D2-1956419487EE',
        'appium:platformVersion': '17.0',
        'appium:app': `${process.cwd()}/app/ios/${iosAppName}`,
        // 'appium:noReset': true
    }
];

exports.config = {
    runner: "local",
    port: 4723,
    specs: [`${process.cwd()}/test/specs/**/*.test.ts`],
    capabilities: process.env.PLATFORM === "ANDROID" ? ANDROID_CAPABILITIES : IOS_CAPABILITIES,
    maxInstances: 1,
    logLevel: "info",
    waitforTimeout: 30000,
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
                disableMochaHooks: true
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
    }
};