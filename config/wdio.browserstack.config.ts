import * as fs from 'fs';

const ANDROID_CAPABILITIES = [
    {
        'bstack:options': {
            platformName: 'android',
            deviceName: 'Google Pixel 8 Pro',
            platformVersion: '14.0',
        }
    },
];

const IOS_CAPABILITIES = [
    {
        'bstack:options': {
            platformName: 'ios',
            deviceName: 'iPhone 14 Pro Max',
            platformVersion: '16'
        }
    },
];

exports.config = {
    user: process.env.BROWSERSTACK_USERNAME || 'priyankahs_ESljGO',
    key: process.env.BROWSERSTACK_ACCESS_KEY || 'qTpfkmcJsugKDHyShJ5t',
    hostname: 'hub.browserstack.com',
    specs: [`${process.cwd()}/test/specs/**/*.test.ts`],
    maxInstances: 1,
    coloredLogs: true,
    logLevel: "info",
    waitforTimeout: 30000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 1,
    services: [
        [
            'browserstack',
            {
                app: 'bs://557ea258f0c4b9233af2588d4bbfc05dabfa6445',
                // buildIdentifier: "${BUILD_NUMBER}",
                browserstackLocal: false
            },
        ]
    ],
    capabilities: process.env.PLATFORM === "ANDROID" ? ANDROID_CAPABILITIES : IOS_CAPABILITIES,
    commonCapabilities: {
        'bstack:options': {
            projectName: "BrowserStack Samples",
            buildName: 'bstack-demo',
            sessionName: 'BStack parallel webdriverio-appium',
            debug: true,
            networkLogs: true
        }
    },
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
    },
}