import { LoggerHelper } from "../../utilities/reporting/loggerHelper";
import { SwitchContextUtils } from "../../utilities/switchContextUtils";
import { HamburgerMenuScreen } from "../screens/hamburgerMenuScreen";
import { HomeScreen } from "../screens/homeScreen";
import { WebviewScreen } from "../screens/webviewScreen";

let homeScreen: HomeScreen;
let hamburgerMenuScreen: HamburgerMenuScreen;
let webviewScreen: WebviewScreen;
let switchContextUtils: SwitchContextUtils;

const specName: string = 'Switching Between Contexts Tests';
describe('Switching Between Native and Web Views', () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        homeScreen = new HomeScreen();
        hamburgerMenuScreen = new HamburgerMenuScreen();
        webviewScreen = new WebviewScreen();
        switchContextUtils = new SwitchContextUtils();
    });

    afterEach(async () => {
        // Terminate and Launch the driver again
        await driver.terminateApp("com.saucelabs.mydemoapp.rn");
        await driver.activateApp("com.saucelabs.mydemoapp.rn");
    });

    it('Should switch between native and web views successfully', async () => {
        const url: string = 'https://www.ultralesson.ai';

        await homeScreen.clickHamburgerMenuButton();
        await hamburgerMenuScreen.clickMenuItemWebview();
        await webviewScreen.enterUrl(url);
        await webviewScreen.clickGoToSiteButton();

        await driver.waitUntil(
            async () => {
                return ((await driver.getContexts()).length) > 1;
            },
            { timeout: 50000, }
        );

        const contexts = await driver.getContexts();
        const nativeView = contexts[0];
        const webviewContext = contexts[1];
        await driver.switchContext(webviewContext.toString());
        console.log('The webview url: ' + await browser.getUrl());
        await driver.switchContext(nativeView.toString());
        await driver.back();
        await homeScreen.clickHamburgerMenuButton();
    });

    it('Should switch between native and web views successfully (using SwitchContextUtils)', async () => {
        const url: string = 'https://www.ultralesson.ai';

        await homeScreen.clickHamburgerMenuButton();
        await hamburgerMenuScreen.clickMenuItemWebview();
        await webviewScreen.enterUrl(url);
        await webviewScreen.clickGoToSiteButton();

        await switchContextUtils.switchToWebContext();
        console.log('The webview url: ' + await browser.getUrl());
        await switchContextUtils.switchToNativeContext();
        await driver.back();
        await homeScreen.clickHamburgerMenuButton();
    });
});