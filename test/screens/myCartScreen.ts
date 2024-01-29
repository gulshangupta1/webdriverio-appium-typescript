import { BaseActions } from "../../utilities/actions/baseActions";
import { LOGGER } from "../../utilities/reporting/loggerHelper";
import { XpathUtil } from "../../utilities/xpath/xpathUtil";
import { ProductDetails } from "../resources/customTypes/productDetails";
import { expect } from "chai";

const platform = process.env.PLATFORM;

export class MyCartScreen extends BaseActions {
    private locators = {
        proceedToCheckoutButton: platform === "ANDROID" ?
            "~Proceed To Checkout button" :
            "",
        totalPrice: platform === "ANDROID" ?
            "~total price" :
            "",
        totalItem: platform === "ANDROID" ?
            "~total number" :
            "",
        selectedColor: platform === "ANDROID" ?
            "//android.widget.TextView[@text='replaceProductName']/parent::android.view.ViewGroup[@content-desc='product row']/child::android.view.ViewGroup[@content-desc='replaceProductColor']" :
            "",
        removeItem: platform === "ANDROID" ?
            "//android.view.ViewGroup[@content-desc='remove item']" :
            "",
        noItemsText: platform === "ANDROID" ?
            "//android.widget.TextView[@text='No Items']" :
            "",
        goShoppingButton: platform === "ANDROID" ?
            "~Go Shopping button" :
            "",
        shoppingTrolley: platform === "ANDROID" ?
            "//android.widget.ScrollView[@content-desc='cart screen']/android.view.ViewGroup/android.widget.ImageView" :
            "",
        emptyCartDescription: platform === "ANDROID" ?
            "//android.widget.TextView[@text='Oh no! Your cart is empty. Fill it up with swag to complete your purchase.']" :
            "",
        productLabelText: platform === "ANDROID" ?
            "//android.widget.TextView[@content-desc='product label' and @text='##PLACEHOLDER##']" :
            "",
        productPrice: platform === "ANDROID" ?
            "//android.widget.TextView[@text='##PLACEHOLDER##']/following-sibling::android.widget.TextView[@content-desc='product price']" :
            ""
    }

    private colorsText = {
        BLACK: 'black circle',
        BLUE: 'blue circle',
        GRAY: 'gray circle',
        RED: 'red circle'
    };

    async clickProceedToCheckoutButton() {
        const proceedToCheckoutButtonEle = await $(this.locators.proceedToCheckoutButton);
        await proceedToCheckoutButtonEle.waitForDisplayed();
        await proceedToCheckoutButtonEle.click();
    }

    async clickRemoveItem(): Promise<void> {
        await (await $(this.locators.removeItem)).click();
    }

    async validateSelectedColor(product: ProductDetails): Promise<void> {
        try {
            let xpath: string = this.locators.selectedColor;

            let colorName: string;
            switch (product.color) {
                case 'BLACK':
                    colorName = this.colorsText.BLACK;
                    break;
                case 'BLUE':
                    colorName = this.colorsText.BLUE;
                    break;
                case 'GRAY':
                    colorName = this.colorsText.GRAY;
                    break;
                case 'RED': colorName = this.colorsText.RED;
                    break;
            }

            xpath = xpath.replace(/replaceProductName/g, product.name).replace(/replaceProductColor/g, colorName);
            const isValidSelectedColor: boolean = await (await $(xpath)).isDisplayed();
            expect(isValidSelectedColor, 'Invalid selected color').to.be.true;
        } catch (error) {
            LOGGER.error(`Error while validating selected color: ${product.color}\n${error.stack}`);
            throw error;
        }
    }

    async validateMyCartScreen(products: ProductDetails[]): Promise<void> {
        try {
            let totalPrice: number = 0;
            let totalItem: number = 0;
            for (let product of products) {
                if (product.quantity === undefined) {
                    product.quantity = 1;
                }
                totalPrice += product.price * product.quantity;
                totalItem += product.quantity;
            }
            // total price validation
            const totalPriceUi: number = XpathUtil.extractNumberFromString(await (await $(this.locators.totalPrice)).getText());
            expect(totalPriceUi, 'Total price is not valid').to.be.equal(totalPrice);

            // total item validation
            const totalItemUi: number = XpathUtil.extractNumberFromString(await (await $(this.locators.totalItem)).getText());
            expect(totalItemUi, 'Total item is not valid').to.be.equal(totalItem);

            await (await $(this.locators.proceedToCheckoutButton)).waitForDisplayed({ timeout: 30000 });


            for (let product of products) {
                // Validating product name
                const productLabelEle: WebdriverIO.Element = await $(XpathUtil.getPlaceholderReplaced(this.locators.productLabelText, product.name));
                let isProductNameDisplayed: boolean = await productLabelEle.isDisplayed();
                if (!isProductNameDisplayed) {
                    await this.swipe(productLabelEle);
                }
                expect(await productLabelEle.isDisplayed(), 'Product name does not displayed').to.be.true;

                // Validating product price
                const productPriceEle: WebdriverIO.Element = await $(XpathUtil.getPlaceholderReplaced(this.locators.productPrice, product.name));
                const productPriceUi: number = XpathUtil.extractNumberFromString(await productPriceEle.getText());
                expect(productPriceUi, 'Product price is not matching').to.be.equal(product.price);

                // Validating selected color
                if (product.color !== undefined) {
                    await this.validateSelectedColor(product);
                }
            }
        } catch (error) {
            LOGGER.info(`Error while validating MyCart screen\n${error.stack}`);
            throw error;
        }
    }

    async emptyCart(): Promise<void> {
        try {
            const noItemTextEle: WebdriverIO.Element = await $(this.locators.noItemsText);
            let noItemTextDisplayed: boolean = await noItemTextEle.isDisplayed();

            while (noItemTextDisplayed != true) {
                await this.clickRemoveItem();
                await driver.pause(1000);
                noItemTextDisplayed = await noItemTextEle.isDisplayed();
            }
        } catch (error) {
            LOGGER.error(`Error while removing items from cart\n${error.stack}`);
            throw error;
        }
    }

    async validateEmptyCartScreen(): Promise<void> {
        expect(await (await $(this.locators.noItemsText)).isDisplayed(),
            'No Items text should be displayed when cart will be empty'
        ).to.be.true;
        expect(await (await $(this.locators.shoppingTrolley)).isDisplayed(),
            'Shopping trolley should be display when cart is empty'
        ).to.be.true;
        expect(await (await $(this.locators.emptyCartDescription)).isDisplayed(),
            'Empty cart description should be display when cart is empty'
        ).to.be.true;
        expect(await (await $(this.locators.goShoppingButton)).isDisplayed(),
            'Go Shopping button should be display when cart is empty'
        ).to.be.true;
    }
}