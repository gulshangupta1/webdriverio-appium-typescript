import { BaseActions } from "../../utilities/baseActions";
import { CardDetails } from "../resources/cardDetails";
import { ShippingAddressDetails } from "../resources/shippingAddressDetails";

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
            ""
    };

    async enterFullName(fullName: string) {
        const fullNameInputFieldEle = await $(this.locators.fullNameInputField);
        await fullNameInputFieldEle.setValue(fullName);
    }

    async enterAddressLine1(addressLine1: string) {
        const addressLine1InputFieldEle = await $(this.locators.addressLine1InputField);
        await addressLine1InputFieldEle.setValue(addressLine1);
    }

    async enterAddressLine2(addressLine2: string) {
        const addressLine2InputFieldEle = await $(this.locators.addressLine2InputField);
        await addressLine2InputFieldEle.setValue(addressLine2);
    }

    async enterCity(cityName: string) {
        const cityInputFieldEle = await $(this.locators.cityInputField);
        await cityInputFieldEle.setValue(cityName);
    }

    async enterState(stateName: string) {
        const stateInputFieldEle = await $(this.locators.stateInputField);
        await stateInputFieldEle.setValue(stateName);
    }

    async enterZipCode(zipCode: number) {
        const zipCodeInputFieldEle = await $(this.locators.zipCodeInputField);
        await zipCodeInputFieldEle.setValue(zipCode.toString());
    }

    async enterCountry(countryName: string) {
        const countryInputFieldEle = await $(this.locators.countryInputField);
        await countryInputFieldEle.setValue(countryName);
    }

    async clickToPaymentButton() {
        const toPaymentButtonEle = await $(this.locators.toPaymentButton);
        await toPaymentButtonEle.click();
    }

    async enterCardNumber(cardNumber: string) {
        const cardNumberInputFieldEle = await $(this.locators.cardNumberInputField);
        await cardNumberInputFieldEle.setValue(cardNumber);
    }

    async enterExpirationDate(expirationDate: string) {
        const expirationDateInputFieldEle = await $(this.locators.expirationDateInputField);
        await expirationDateInputFieldEle.setValue(expirationDate);
    }

    async enterSecurityCode(securityCode: number) {
        const securityCodeInputFieldEle = await $(this.locators.securityCodeInputField);
        await securityCodeInputFieldEle.setValue(securityCode.toString());
    }

    async clickReviewOrderButton() {
        const reviewOrderButtonEle = await $(this.locators.reviewOrderButton);
        await reviewOrderButtonEle.click();
    }

    async clickPlaceOrderButton() {
        const placeOrderButtonEle = await $(this.locators.placeOrderButton);
        await placeOrderButtonEle.waitForDisplayed();
        await placeOrderButtonEle.click();
    }

    async clickContinueShoppingButton() {
        const continueShoppingButtonEle = await $(this.locators.continueShoppingButton);
        await continueShoppingButtonEle.click()
    }

    async enterShippingAddressDetails(shippingAddressDetails: ShippingAddressDetails) {
        await this.enterFullName(shippingAddressDetails.fullName);
        await this.enterAddressLine1(shippingAddressDetails.addressLine1);
        await this.enterAddressLine2(shippingAddressDetails.addressLine2);
        await this.enterCity(shippingAddressDetails.cityName);
        await this.enterState(shippingAddressDetails.stateName);
        await this.enterZipCode(shippingAddressDetails.zipCode);
        await this.enterCountry(shippingAddressDetails.countryName);
        await driver.hideKeyboard();
    }

    async entercardDetails(cardDetails: CardDetails) {
        await this.enterFullName(cardDetails.fullName);
        await this.enterCardNumber(cardDetails.cardNumber);
        await this.enterExpirationDate(cardDetails.expirationDate);
        await this.enterSecurityCode(cardDetails.securityCode);
        await driver.hideKeyboard();
    }
}