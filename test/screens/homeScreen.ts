import { LOGGER } from '../../utilities/reporting/loggerHelper';
import { XpathUtil } from '../../utilities/xpath/xpathUtil';
import { BaseActions } from '../../utilities/actions/baseActions';

const platform = process.env.PLATFORM;

export class HomeScreen extends BaseActions {
    private locators = {
        menuIcon: platform === 'ANDROID' ?
            "~open menu" :
            "~tab bar option menu",
        productTextOnHomeScreen: platform === "ANDROID" ?
            "//android.widget.TextView[@text='Products']" :
            "//XCUIElementTypeStaticText[@name='Products']",
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
            "",
        productByName: platform === "ANDROID" ?
            "//android.widget.TextView[@content-desc='store item text' and @text='##PLACEHOLDER##']/parent::android.view.ViewGroup" :
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
        return await $(this.locators.menuIcon);
    }

    async clickMenuButton() {
        const hamburgerMenuIconEle = await $(this.locators.menuIcon);
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

    async clickOnProduct(productName: string): Promise<void> {
        try {
            const product = await $(XpathUtil.getPlaceholderReplaced(this.locators.productByName, productName));
            await this.swipe(product);
            await product.waitForDisplayed({ timeout: 10000 });
            await product.click();
        }
        catch (error) {
            LOGGER.error(`Product: ${productName} not available\n${error.stack}`);
            throw error;
        }
    }
}