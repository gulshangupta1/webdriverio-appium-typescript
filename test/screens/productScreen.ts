import { LOGGER } from "../../utilities/reporting/loggerHelper";
import { XpathUtil } from "../../utilities/xpath/xpathUtil";
import { ProductDetails } from "../resources/customTypes/productDetails";
import { expect } from "chai";

const platform = process.env.PLATFORM;

export class ProductScreen {
    private locators = {
        productNameText: platform === "ANDROID" ?
            "//android.widget.TextView[@text='##PLACEHOLDER##']" :
            "",
        productName: platform === "ANDROID" ?
            "//android.view.ViewGroup[@content-desc='container header']/android.widget.TextView" :
            "",
        productPrice: platform === "ANDROID" ?
            "~product price" :
            "",
        productColor: platform === "ANDROID" ?
            "//android.view.ViewGroup[@content-desc='##PLACEHOLDER##']/android.view.ViewGroup" :
            "",
        addToCartButton: platform === "ANDROID" ?
            "~Add To Cart button" :
            "",
        productHighlightText: platform === "ANDROID" ?
            "//android.widget.TextView[@text='Product Highlights']" :
            "",
        productDescription: platform === "ANDROID" ?
            "//android.widget.TextView[@content-desc='product description']" :
            "",
        productDescriptionText: platform === "ANDROID" ?
            "//android.widget.TextView[@text='##PLACEHOLDER##']" :
            "",
        plusButton: platform === "ANDROID" ?
            "//android.view.ViewGroup[@content-desc='counter plus button']/android.widget.ImageView" :
            "",
        minusButton: platform === "ANDROID" ?
            "//android.view.ViewGroup[@content-desc='counter minus button']/android.widget.ImageView" :
            ""
    }

    colorsText = {
        BLACK: 'black circle',
        BLUE: 'blue circle',
        GRAY: 'gray circle',
        RED: 'red circle'
    };

    async validateProductScreen(productDetails: ProductDetails): Promise<void> {
        try {
            // Product name validation
            await (await $(XpathUtil.getPlaceholderReplaced(this.locators.productNameText, productDetails.name))).waitForDisplayed({ timeout: 30000 });;
            const productNameEle: WebdriverIO.Element = await $(this.locators.productName);
            await productNameEle.waitForDisplayed();
            const productName: string = await productNameEle.getText();
            expect(productName, 'Product name is not matching').to.be.equal(productDetails.name);

            // Product price validation
            const productPriceUi: number = XpathUtil.extractNumberFromString(await (await $(this.locators.productPrice)).getText());
            expect(productPriceUi, 'Product price is not matching').to.be.equal(productDetails.price);

            // Product color validation
            if (productDetails.availableColors !== undefined) {
                for (let color of productDetails.availableColors) {
                    let colorText: string;
                    switch (color) {
                        case 'BLACK':
                            colorText = this.colorsText.BLACK;
                            break;
                        case 'BLUE': colorText = this.colorsText.BLUE;
                            break;
                        case 'GRAY':
                            colorText = this.colorsText.GRAY;
                            break;
                        case 'RED': colorText = this.colorsText.RED;
                            break;
                    }
                    const colorEle: WebdriverIO.Element = await $(XpathUtil.getPlaceholderReplaced(this.locators.productColor, colorText));
                    await colorEle.waitForDisplayed({ timeout: 30000 });
                    const isColorAvailable: boolean = await colorEle.isDisplayed();
                    expect(isColorAvailable, `Color ${color} is should display`).to.be.true;
                }
            }

            // Product description validation
            const productHighlightTextEle: WebdriverIO.Element = await $(this.locators.productHighlightText);
            await productHighlightTextEle.waitForDisplayed({ timeout: 30000 });
            if (productDetails.description !== undefined) {
                const productDescriptionTextEle = await $(XpathUtil.getPlaceholderReplaced(this.locators.productDescriptionText, productDetails.description));
                await productDescriptionTextEle.waitForDisplayed({ timeout: 30000 });

                const productDescriptionEle = await $(this.locators.productDescription);
                const productDescription: string = await productDescriptionEle.getText();
                expect(productDescription, 'Product description is not valid').to.be.equal(productDetails.description);
            }
        } catch (error) {
            LOGGER.error(`Error while validating product screen\n${error.stack}`);
            throw error;
        }
    }

    async clickPlusButton(): Promise<void> {
        await (await $(this.locators.plusButton)).click();
    }

    async selectColor(color: string): Promise<void> {
        try {
            let colorText: string;
            switch (color) {
                case 'BLACK':
                    colorText = this.colorsText.BLACK;
                    break;
                case 'BLUE': colorText = this.colorsText.BLUE;
                    break;
                case 'GRAY':
                    colorText = this.colorsText.GRAY;
                    break;
                case 'RED': colorText = this.colorsText.RED;
                    break;
            }
            await (await $(XpathUtil.getPlaceholderReplaced(this.locators.productColor, colorText))).click();
        } catch (error) {
            LOGGER.error(`Error while selecting color for the product\n${error.stack}`);
            throw error;
        }
    }

    async addProductToCart(quantity: number = 1): Promise<void> {
        for (let i = 0; i < quantity - 1; i++) {
            await this.clickPlusButton();
        }
        await (await $(this.locators.addToCartButton)).click();
    }
}