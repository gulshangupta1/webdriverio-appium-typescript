import { LOGGER } from '../../utilities/reporting/loggerHelper';
import { BaseActions } from './../../utilities/baseActions';
import { HamburgerMenuScreen } from './hamburgerMenuScreen';
import { LoginScreen } from './loginScreen';
import { LogoutScreen } from './logoutScreen';

const platform = process.env.PLATFORM;

export class HomeScreen extends BaseActions {
    hamburgerMenuScreen: HamburgerMenuScreen;
    logoutScreen: LogoutScreen;

    constructor() {
        super();
        this.hamburgerMenuScreen = new HamburgerMenuScreen();
        this.logoutScreen = new LogoutScreen();
    }

    private locators = {
        hamburgerMenuIcon: platform === 'ANDROID' ?
            "~open menu" :
            "",
        productTextOnHomeScreen: platform === "ANDROID" ?
            "//android.widget.TextView[@text='Products']" :
            "",
        firstItem: platform === 'ANDROID' ?
            "(//android.view.ViewGroup[@content-desc='store item'])[1]/android.view.ViewGroup[1]/android.widget.ImageView" :
            "",
        addToCartButton: platform === "ANDROID" ?
            "~Add To Cart button" :
            "",
        cartIcon: platform === "ANDROID" ?
            "~cart badge" :
            "",
        footer: platform === "ANDROID" ?
            "//android.widget.TextView[@text='© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy.']/parent::android.view.ViewGroup" :
            ""
    };

    async getProductTextOnHomeScreen(): Promise<WebdriverIO.Element> {
        return await $(this.locators.productTextOnHomeScreen);
    }

    async getFirstItemEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.firstItem);
    }

    async getFooterEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.footer);
    }

    async getHamburgerMenuIconEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.hamburgerMenuIcon);
    }

    async clickHamburgerMenuButton() {
        const hamburgerMenuIconEle = await $(this.locators.hamburgerMenuIcon);
        await hamburgerMenuIconEle.click();
    }

    async clickFirstItem() {
        const firstItemEle = await $(this.locators.firstItem);
        await firstItemEle.click();
    }

    async clickAddToCartButton() {
        const addToCartButtonEle = await $(this.locators.addToCartButton);
        await addToCartButtonEle.click();
    }

    async clickCartIcon() {
        const cartIconEle = await $(this.locators.cartIcon);
        await cartIconEle.click();
    }

    async tapOnFirstItem() {
        await this.tap(this.locators.firstItem);
        await (await $(this.locators.addToCartButton)).waitForDisplayed();
    }

    async pressHoldFirstItem() {
        const firstItemEle = await $(this.locators.firstItem)
        await this.pressAndHold(firstItemEle, 5000);
    }

    async PressHoldOffsetFirstItem() {
        const firstItemEle = await $(this.locators.firstItem);
        await this.pressAndHoldAtOffset(firstItemEle, 100, 100, 5000);
    }

    async login(username: string, password: string) {
        LOGGER.info(`Trying to login with username: ${username}`);

        const loginScreen: LoginScreen = new LoginScreen();
        try {
            await this.clickHamburgerMenuButton();
            await this.hamburgerMenuScreen.clickMenuItemLogin();
            await loginScreen.enterUsername(username);
            await loginScreen.enterPassword(password);
            await loginScreen.clickLoginButton();
            LOGGER.info('Login successfull');
        } catch (err) {
            LOGGER.error(`Error while login with user: ${username}`);
            throw err;
        }
    }

    async logout() {
        LOGGER.info('Tyring to logout');
        try {
            await this.clickHamburgerMenuButton();
            await this.hamburgerMenuScreen.clickMenuItemLogout();
            await this.logoutScreen.clickLogoutButton();
            await this.logoutScreen.clickOkButton();
            LOGGER.info('User logged out');
        } catch (errr) {
            LOGGER.error('Error while trying to log out.');
            throw errr;
        }

    }
}