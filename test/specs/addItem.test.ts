import { FileUtil } from "../../utilities/file/fileUtil";
import { CardDetails } from "../resources/customTypes/cardDetails";
import { ShippingAddressDetails } from "../resources/customTypes/shippingAddressDetails";
import { CheckoutScreen } from "../screens/checkoutScreen";
import { HomeScreen } from "../screens/homeScreen";
import { MyCartScreen } from "../screens/myCartScreen";
import * as loginDetailsJson from "./../resources/testdata/loginDetails.json";
import * as shippingAddressDetailsJson from "./../resources/testdata/shippingAddressDetails.json";
import * as cardDetailsJson from "./../resources/testdata/cardDetails.json";
import { LoginDetails } from "../resources/customTypes/loginDetails";
import { LoggerHelper } from "../../utilities/reporting/loggerHelper";
import { HomeScreenUtil } from "../commonFunctions/homeScreenUtil";
import { ProductScreen } from "../screens/productScreen";

let homeScreen: HomeScreen;
let myCartScreen: MyCartScreen;
let checkoutScreen: CheckoutScreen;
let homeScreenUtils: HomeScreenUtil;
let productScreen: ProductScreen;

const specName: string = 'Add item to cart tests';
describe('Add item to cart', () => {
    before(async () => {
        LoggerHelper.setupLogger(specName)
        homeScreen = new HomeScreen();
        myCartScreen = new MyCartScreen();
        checkoutScreen = new CheckoutScreen();
        homeScreenUtils = new HomeScreenUtil();
        productScreen = new ProductScreen();
    });

    it('Add first item to cart', async () => {
        const loginDetails: LoginDetails = FileUtil.convertJsonToCustomType(loginDetailsJson);
        const shippingAddressDetails: ShippingAddressDetails = FileUtil.convertJsonToCustomType(shippingAddressDetailsJson);
        const cardDetails: CardDetails = FileUtil.convertJsonToCustomType(cardDetailsJson);

        await homeScreenUtils.login(loginDetails.username, loginDetails.password);
        await homeScreen.tapOnFirstItem();
        await productScreen.addProductToCart();
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