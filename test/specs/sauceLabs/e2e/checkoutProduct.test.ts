import { FileUtil } from "../../../../utilities/file/fileUtil";
import { LoggerHelper } from "../../../../utilities/reporting/loggerHelper";
import { CardDetails } from "../../../resources/customTypes/cardDetails";
import { LoginDetails } from "../../../resources/customTypes/loginDetails";
import { ShippingAddressDetails } from "../../../resources/customTypes/shippingAddressDetails";
import { CheckoutScreen } from "../../../screens/checkoutScreen";
import { HomeScreen } from "../../../screens/homeScreen";
import { LoginScreen } from "../../../screens/loginScreen";
import { MyCartScreen } from "../../../screens/myCartScreen";
import * as loginDetailsJson from "../../../resources/testdata/loginDetails.json";
import * as cardDetailsJson from "../../../resources/testdata/cardDetails.json";
import * as shippingAddressDetailsJson from "../../../resources/testdata/shippingAddressDetails.json";
import { ProductScreen } from "../../../screens/productScreen";

let homeScreen: HomeScreen;
let myCartScreen: MyCartScreen;
let loginScreen: LoginScreen;
let checkoutScreen: CheckoutScreen;
let productScreen: ProductScreen;

const specName: string = 'Checkout procuct tests'
describe('Checkout flow scenarios test', () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        homeScreen = new HomeScreen();
        myCartScreen = new MyCartScreen();
        loginScreen = new LoginScreen();
        checkoutScreen = new CheckoutScreen();
        productScreen = new ProductScreen();
    });

    it('Checkout the product without login', async () => {
        const loginDetails: LoginDetails = FileUtil.convertJsonToCustomType(loginDetailsJson);
        const shippingAddressDetails: ShippingAddressDetails = FileUtil.convertJsonToCustomType(shippingAddressDetailsJson);
        const cardDetails: CardDetails = FileUtil.convertJsonToCustomType(cardDetailsJson);
        const productName: string = 'Sauce Labs Onesie';

        await homeScreen.clickOnProduct(productName);
        await productScreen.addProductToCart();
        await homeScreen.clickCartIcon();
        await myCartScreen.clickProceedToCheckoutButton();
        await loginScreen.enterUsername(loginDetails.username);
        await loginScreen.enterPassword(loginDetails.password);
        await loginScreen.clickLoginButton();
        await checkoutScreen.enterShippingAddressDetails(shippingAddressDetails);
        await checkoutScreen.clickToPaymentButton();
        await checkoutScreen.enterCardDetails(cardDetails);
        await checkoutScreen.clickReviewOrderButton();
        await checkoutScreen.clickPlaceOrderButton();
        await checkoutScreen.clickContinueShoppingButton();
    });
});