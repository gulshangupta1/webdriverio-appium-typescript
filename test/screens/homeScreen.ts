import { BaseActions } from './../../utilities/baseActions';
import { HamburgerMenuScreen } from './hamburgerMenuScreen';
import { LoginScreen } from './loginScreen';
import { LogoutScreen } from './logoutScreen';

const platform = process.env.PLATFORM;

export class HomeScreen extends BaseActions {
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
    };

    async getProductTextOnHomeScreen() {
        return await $(this.locators.productTextOnHomeScreen);
    }

    async getFirstItemEle() {
        return await $(this.locators.firstItem);
    }

    async clickHamburgerMenuButton() {
        const hamburgerMenuIconEle = await $(this.locators.hamburgerMenuIcon);
        await hamburgerMenuIconEle.waitForDisplayed();
        await hamburgerMenuIconEle.click();
    }

    async clickFirstItem() {
        const firstItemEle = await $(this.locators.firstItem);
        await firstItemEle.waitForDisplayed();
        await firstItemEle.click();
    }

    async clickAddToCartButton() {
        const addToCartButtonEle = await $(this.locators.addToCartButton);
        await addToCartButtonEle.waitForDisplayed();
        await addToCartButtonEle.click();
    }

    async clickCartIcon() {
        const cartIconEle = await $(this.locators.cartIcon);
        await cartIconEle.waitForDisplayed();
        await cartIconEle.click();
    }

    async tapOnFirstItem() {
        await this.tap(this.locators.firstItem);
    }

    async login(username: string, password: string) {
        const hamburgerMenuScreen: HamburgerMenuScreen = new HamburgerMenuScreen();
        const loginScreen: LoginScreen = new LoginScreen();

        await this.clickHamburgerMenuButton();
        await hamburgerMenuScreen.clickMenuItemLogin();
        await loginScreen.enterUsername(username);
        await loginScreen.enterPassword(password);
        await loginScreen.clickLoginButton();
    }

    async logout() {
        const hamburgerMenuIcon = new HamburgerMenuScreen();
        const logoutScreen: LogoutScreen = new LogoutScreen();

        await this.clickHamburgerMenuButton();
        await hamburgerMenuIcon.clickMenuItemLogout();
        await logoutScreen.clickLogoutButton();
        await logoutScreen.clickOkButton();
    }
}