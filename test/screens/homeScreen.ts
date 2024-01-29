import { LOGGER } from '../../utilities/reporting/loggerHelper';
import { XpathUtil } from '../../utilities/xpath/xpathUtil';
import { BaseActions } from '../../utilities/actions/baseActions';
import { expect } from 'chai';

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
        cartIcon: platform === "ANDROID" ?
            "~cart badge" :
            "",
        footer: platform === "ANDROID" ?
            "//android.widget.TextView[@text='© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy.']/parent::android.view.ViewGroup" :
            "",
        productByName: platform === "ANDROID" ?
            "//android.widget.TextView[@content-desc='store item text' and @text='##PLACEHOLDER##']/parent::android.view.ViewGroup" :
            "",
        sortButton: platform === "ANDROID" ?
            "~sort button" :
            "",
        sortType: platform === "ANDROID" ?
            "~##PLACEHOLDER##" :
            "",
        productName: platform === "ANDROID" ?
            "//android.widget.TextView[@content-desc='store item text']" :
            "",
        productPrice: platform === "ANDROID" ?
            "//android.widget.TextView[@content-desc='store item price']" :
            "",
    };

    static sortingOrder = {
        NAME_ASCENDING: 'nameAsc',
        NAME_DESCENDING: 'nameDesc',
        PRICE_ASCENDING: 'priceAsc',
        PRICE_DESCENDING: 'priceDesc'
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

    async clickMenuButton(): Promise<void> {
        const hamburgerMenuIconEle = await $(this.locators.menuIcon);
        await hamburgerMenuIconEle.click();
    }

    async clickFirstItem(): Promise<void> {
        const firstItemEle = await $(this.locators.firstItem);
        await firstItemEle.click();
    }

    async clickCartIcon(): Promise<void> {
        const cartIconEle = await $(this.locators.cartIcon);
        await cartIconEle.click();
    }

    async tapOnFirstItem(): Promise<void> {
        await this.tap(this.locators.firstItem);
    }

    async pressHoldFirstItem(): Promise<void> {
        const firstItemEle = await $(this.locators.firstItem)
        await this.pressAndHold(firstItemEle, 5000);
    }

    async PressHoldOffsetFirstItem(): Promise<void> {
        const firstItemEle = await $(this.locators.firstItem);
        await this.pressAndHoldAtOffset(firstItemEle, 100, 100, 5000);
    }

    async clickSortButton(): Promise<void> {
        await (await $(this.locators.sortButton)).click();
    }

    async clickOnProduct(productName: string): Promise<void> {
        try {
            const product = await $(XpathUtil.getPlaceholderReplaced(this.locators.productByName, productName));
            await this.swipe(product);
            await product.waitForDisplayed({ timeout: 30000 });
            await product.click();
        }
        catch (error) {
            LOGGER.error(`Product ${productName} not available\n${error.stack}`);
            throw error;
        }
    }

    async sortOrder(sortingOrder: string): Promise<void> {
        try {
            await (await $(this.locators.sortButton)).click();
            const sortingTypeEle = await $(XpathUtil.getPlaceholderReplaced(this.locators.sortType, sortingOrder));
            await sortingTypeEle.click();
        } catch (error) {
            LOGGER.error(`Error while sorting orders\n${error.stack}`);
            throw error;
        }
    }

    async isSortedByPrice(sortingOrder: string, noOfProducts: number): Promise<boolean> {
        let previousProductPrice: number;

        for (let i = 1; i <= noOfProducts; i++) {
            const productPriceEle = await $(`(${this.locators.productPrice})[${i}]`);

            // Swipe if product not displayed
            const isProductDisplayed: boolean = await productPriceEle.isDisplayed();
            if (!isProductDisplayed) {
                await this.swipe(productPriceEle);
            }

            const currentProductPrice: number = XpathUtil.extractNumberFromString(await productPriceEle.getText());
            if (previousProductPrice === undefined) {
                previousProductPrice = currentProductPrice;
            }

            if (sortingOrder === HomeScreen.sortingOrder.PRICE_ASCENDING) {
                if (currentProductPrice < previousProductPrice) {
                    return false;
                }
            } else {
                if (currentProductPrice > previousProductPrice) {
                    return false;
                }
            }
        }

        return true;
    }

    async isSortedByName(sortingOrder: string, noOfProducts: number): Promise<boolean> {
        let previousProductName: string;

        for (let i = 1; i <= noOfProducts; i++) {
            const productNameEle = await $(`(${this.locators.productName})[${i}]`);

            // Swipe if product not displayed
            const isProductDisplayed: boolean = await productNameEle.isDisplayed();
            if (!isProductDisplayed) {
                await this.swipe(productNameEle);
            }

            const currentProductName = await productNameEle.getText();
            if (previousProductName === undefined) {
                previousProductName = currentProductName;
            }

            if (sortingOrder === HomeScreen.sortingOrder.NAME_ASCENDING) {
                if (currentProductName < previousProductName) {
                    return false;
                }
            } else {
                if (currentProductName > previousProductName) {
                    return false;
                }
            }
        }

        return true;
    }

    async validateProductOrder(sortingOrder: string, noOfProducts: number = 4): Promise<void> {
        try {
            switch (sortingOrder) {
                case HomeScreen.sortingOrder.NAME_ASCENDING:
                    expect(await this.isSortedByName(sortingOrder, noOfProducts), 'Products are not sorted in ascending order by name').to.be.true;
                    break;
                case HomeScreen.sortingOrder.NAME_DESCENDING:
                    expect(await this.isSortedByName(sortingOrder, noOfProducts), 'Products are not sorted in descending order by name').to.be.true;
                    break;
                case HomeScreen.sortingOrder.PRICE_ASCENDING:
                    expect(await this.isSortedByPrice(sortingOrder, noOfProducts), 'Products are not sorted in ascending order by price').to.be.true;
                    break;
                case HomeScreen.sortingOrder.PRICE_DESCENDING:
                    expect(await this.isSortedByPrice(sortingOrder, noOfProducts), 'Products are not sorted in descending order by price').to.be.true;
                    break;
                default: throw new Error(`Invalid sorting type: ${sortingOrder}`);
            }
        } catch (error) {
            LOGGER.error(`Error while validating products in sorted order: ${sortingOrder} order.\n${error.stack}`);
            throw error;
        }
    }
}