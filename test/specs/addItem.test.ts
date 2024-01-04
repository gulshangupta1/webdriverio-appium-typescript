import { FileUtils } from "../../utilities/fileUtils";
import { CardDetails } from "../resources/customTypes/cardDetails";
import { ShippingAddressDetails } from "../resources/customTypes/shippingAddressDetails";
import { CheckoutScreen } from "../screens/checkoutScreen";
import { HomeScreen } from "../screens/homeScreen";
import { MyCartScreen } from "../screens/myCartScreen";
import * as loginDetailsJson from "./../resources/testdata/loginDetails.json";
import * as shippingAddressDetailsJson from "./../resources/testdata/shippingAddressDetails.json";
import * as cardDetailsJson from "./../resources/testdata/cardDetails.json";
import { LoginDetails } from "../resources/customTypes/loginDetails";

const homeScreen = new HomeScreen();
const myCartScreen = new MyCartScreen();
const checkoutScreen = new CheckoutScreen();

describe('Add item to cart', () => {
    it('Add first item to cart', async () => {
        const loginDetails: LoginDetails = FileUtils.convertJsonToCustomType(loginDetailsJson);
        const shippingAddressDetails: ShippingAddressDetails = FileUtils.convertJsonToCustomType(shippingAddressDetailsJson);
        const cardDetails: CardDetails = FileUtils.convertJsonToCustomType(cardDetailsJson);

        await homeScreen.login(loginDetails.username, loginDetails.password);
        await homeScreen.tapOnFirstItem();
        await homeScreen.clickAddToCartButton();
        await homeScreen.clickCartIcon();
        await myCartScreen.clickProceedToCheckoutButton();
        await checkoutScreen.enterShippingAddressDetails(shippingAddressDetails);
        await checkoutScreen.clickToPaymentButton();
        await checkoutScreen.enterCardDetails(cardDetails);
        await checkoutScreen.clickReviewOrderButton();
        await checkoutScreen.clickPlaceOrderButton();
        await checkoutScreen.clickContinueShoppingButton();
    });
});