import { BaseActions } from "../../utilities/actions/baseActions";
import { LOGGER } from "../../utilities/reporting/loggerHelper";
import { XpathUtil } from "../../utilities/xpath/xpathUtil";
import { CardDetails } from "../resources/customTypes/cardDetails";
import { ProductDetails } from "../resources/customTypes/productDetails";
import { ShippingAddressDetails } from "../resources/customTypes/shippingAddressDetails";
import { expect } from "chai";

const platform = process.env.PLATFORM;

export class CheckoutScreen extends BaseActions {
    private locators = {
        checkoutHeader: platform === "ANDROID" ?
            "//android.view.ViewGroup[@content-desc='container header']/android.widget.TextView[@text='Checkout']" :
            "",
        fullNameInputField: platform === "ANDROID" ?
            "~Full Name* input field" :
            "",
        addressLine1InputField: platform === "ANDROID" ?
            "~Address Line 1* input field" :
            "",
        addressLine2InputField: platform === "ANDROID" ?
            "~Address Line 2 input field" :
            "",
        cityInputField: platform === "ANDROID" ?
            "~City* input field" :
            "",
        stateInputField: platform === "ANDROID" ?
            "~State/Region input field" :
            "",
        zipCodeInputField: platform === "ANDROID" ?
            "~Zip Code* input field" :
            "",
        countryInputField: platform === "ANDROID" ?
            "~Country* input field" :
            "",
        toPaymentButton: platform === "ANDROID" ?
            "~To Payment button" :
            "",
        enterPaymentMethodText: platform === "ANDROID" ?
            "//android.widget.TextView[@text='Enter a payment method']" :
            "",
        placeOrderButton: platform === "ANDROID" ?
            "~Place Order button" :
            "",
        cardNumberInputField: platform === "ANDROID" ?
            "~Card Number* input field" :
            "",
        reviewOrderButton: platform === "ANDROID" ?
            "~Review Order button" :
            "",
        expirationDateInputField: platform === "ANDROID" ?
            "~Expiration Date* input field" :
            "",
        securityCodeInputField: platform === "ANDROID" ?
            "~Security Code* input field" :
            "",
        continueShoppingButton: platform === "ANDROID" ?
            "~Continue Shopping button" :
            "",
        reviewYourOrderText: platform === "ANDROID" ?
            "//android.widget.TextView[@text='Review your order']" :
            "",
        selectedColor: platform === "ANDROID" ?
            "//android.widget.TextView[@text='replaceProductName']/parent::android.view.ViewGroup[@content-desc='product row']/child::android.view.ViewGroup[@content-desc='replaceProductColor']" :
            "",
        totalPrice: platform === "ANDROID" ?
            "~total price" :
            "",
        totalItem: platform === "ANDROID" ?
            "~total number" :
            "",
        productLabelText: platform === "ANDROID" ?
            "//android.widget.TextView[@content-desc='product label' and @text='##PLACEHOLDER##']" :
            "",
        productPrice: platform === "ANDROID" ?
            "//android.widget.TextView[@text='##PLACEHOLDER##']/following-sibling::android.widget.TextView[@content-desc='product price']" :
            ""
    };

    private colorsText = {
        BLACK: 'black circle',
        BLUE: 'blue circle',
        GRAY: 'gray circle',
        RED: 'red circle'
    };

    async enterFullName(fullName: string): Promise<void> {
        const fullNameInputFieldEle: WebdriverIO.Element = await $(this.locators.fullNameInputField);
        await fullNameInputFieldEle.setValue(fullName);
    }

    async enterAddressLine1(addressLine1: string): Promise<void> {
        const addressLine1InputFieldEle: WebdriverIO.Element = await $(this.locators.addressLine1InputField);
        await addressLine1InputFieldEle.setValue(addressLine1);
    }

    async enterAddressLine2(addressLine2: string): Promise<void> {
        const addressLine2InputFieldEle: WebdriverIO.Element = await $(this.locators.addressLine2InputField);
        await addressLine2InputFieldEle.setValue(addressLine2);
    }

    async enterCity(cityName: string): Promise<void> {
        const cityInputFieldEle: WebdriverIO.Element = await $(this.locators.cityInputField);
        await cityInputFieldEle.setValue(cityName);
    }

    async enterState(stateName: string): Promise<void> {
        const stateInputFieldEle: WebdriverIO.Element = await $(this.locators.stateInputField);
        await stateInputFieldEle.setValue(stateName);
    }

    async enterZipCode(zipCode: number): Promise<void> {
        const zipCodeInputFieldEle: WebdriverIO.Element = await $(this.locators.zipCodeInputField);
        await zipCodeInputFieldEle.setValue(zipCode.toString());
    }

    async enterCountry(countryName: string): Promise<void> {
        const countryInputFieldEle: WebdriverIO.Element = await $(this.locators.countryInputField);
        await countryInputFieldEle.setValue(countryName);
    }

    async clickToPaymentButton(): Promise<void> {
        const toPaymentButtonEle: WebdriverIO.Element = await $(this.locators.toPaymentButton);
        await toPaymentButtonEle.click();
    }

    async enterCardNumber(cardNumber: string): Promise<void> {
        const cardNumberInputFieldEle: WebdriverIO.Element = await $(this.locators.cardNumberInputField);
        await cardNumberInputFieldEle.setValue(cardNumber);
    }

    async enterExpirationDate(expirationDate: string): Promise<void> {
        const expirationDateInputFieldEle: WebdriverIO.Element = await $(this.locators.expirationDateInputField);
        await expirationDateInputFieldEle.setValue(expirationDate);
    }

    async enterSecurityCode(securityCode: number): Promise<void> {
        const securityCodeInputFieldEle: WebdriverIO.Element = await $(this.locators.securityCodeInputField);
        await securityCodeInputFieldEle.setValue(securityCode.toString());
    }

    async clickReviewOrderButton(): Promise<void> {
        const reviewOrderButtonEle: WebdriverIO.Element = await $(this.locators.reviewOrderButton);
        await reviewOrderButtonEle.click();
    }

    async clickPlaceOrderButton(): Promise<void> {
        const placeOrderButtonEle: WebdriverIO.Element = await $(this.locators.placeOrderButton);
        await placeOrderButtonEle.waitForDisplayed();
        await placeOrderButtonEle.click();
    }

    async clickContinueShoppingButton(): Promise<void> {
        const continueShoppingButtonEle: WebdriverIO.Element = await $(this.locators.continueShoppingButton);
        await continueShoppingButtonEle.click()
    }

    async enterShippingAddressDetails(shippingAddressDetails: ShippingAddressDetails): Promise<void> {
        await this.enterFullName(shippingAddressDetails.fullName);
        await this.enterAddressLine1(shippingAddressDetails.addressLine1);
        await this.enterAddressLine2(shippingAddressDetails.addressLine2);
        await this.enterCity(shippingAddressDetails.cityName);
        await this.enterState(shippingAddressDetails.stateName);
        await this.enterZipCode(shippingAddressDetails.zipCode);
        await this.enterCountry(shippingAddressDetails.countryName);
        await driver.hideKeyboard();
    }

    async enterCardDetails(cardDetails: CardDetails): Promise<void> {
        await this.enterFullName(cardDetails.fullName);
        await this.enterCardNumber(cardDetails.cardNumber);
        await this.enterExpirationDate(cardDetails.expirationDate);
        await this.enterSecurityCode(cardDetails.securityCode);
        await driver.hideKeyboard();
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
            LOGGER.error(`Error while validating selected color on checkout screen: ${product.color}\n${error.stack}`);
            throw error;
        }
    }

    async validateProductDetails(products: ProductDetails[]): Promise<void> {
        try {
            const additionalCharge: number = 5.99;

            let totalPrice: number = 0;
            let totalItem: number = 0;
            for (let product of products) {
                if (product.quantity === undefined) {
                    product.quantity = 1;
                }
                totalPrice += product.price * product.quantity;
                totalItem += product.quantity;
            }
            totalPrice += additionalCharge;

            // total price validation
            const totalPriceUi: number = XpathUtil.extractNumberFromString(await (await $(this.locators.totalPrice)).getText());
            expect(totalPriceUi, 'Total price is not valid').to.be.equal(totalPrice);

            // total item validation
            const totalItemUi: number = XpathUtil.extractNumberFromString(await (await $(this.locators.totalItem)).getText());
            expect(totalItemUi, 'Total item is not valid').to.be.equal(totalItem);

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
            LOGGER.info(`Error while validating product details on checkout screen\n${error.stack}`);
            throw error;
        }
    }

    async valiadetCheckoutScreen(products: ProductDetails[]): Promise<void> {
        try {
            await (await $(this.locators.checkoutHeader)).waitForDisplayed();
            await (await $(this.locators.reviewYourOrderText)).waitForDisplayed({ timeout: 10000 });

            await this.validateProductDetails(products);
        } catch (error) {
            LOGGER.error(`Error while validating chechout screen\n${error.stack}`);
            throw error;
        }
    }
}