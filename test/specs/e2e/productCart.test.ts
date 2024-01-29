import { FileUtil } from '../../../utilities/file/fileUtil';
import { LoggerHelper } from '../../../utilities/reporting/loggerHelper';
import { LoginDetails } from '../../resources/customTypes/loginDetails';
import { ProductDetails } from '../../resources/customTypes/productDetails';
import { HomeScreen } from '../../screens/homeScreen';
import { MyCartScreen } from '../../screens/myCartScreen';
import { ProductScreen } from '../../screens/productScreen';
import * as productDetailsJson from './../../resources/testdata/productDetails.json';
import * as loginDetailsJson from "./../../resources/testdata/loginDetails.json";
import { LoginScreen } from '../../screens/loginScreen';
import { CheckoutScreen } from '../../screens/checkoutScreen';
import { ShippingAddressDetails } from '../../resources/customTypes/shippingAddressDetails';
import * as shippingAddressDetailsJson from './../../resources/testdata/shippingAddressDetails.json';
import { CardDetails } from '../../resources/customTypes/cardDetails';
import * as cardDetailsJson from './../../resources/testdata/cardDetails.json';

let homeScreen: HomeScreen;
let productScreen: ProductScreen;
let myCartScreen: MyCartScreen;
let loginScreen: LoginScreen;
let checkoutScreen: CheckoutScreen;

const specName: string = 'Product cart scenarios'
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        homeScreen = new HomeScreen();
        productScreen = new ProductScreen();
        myCartScreen = new MyCartScreen();
        loginScreen = new LoginScreen();
        checkoutScreen = new CheckoutScreen();
    });

    afterEach(async () => {
        // Terminate and Launch the driver again
        await driver.terminateApp("com.saucelabs.mydemoapp.rn");
        await driver.activateApp("com.saucelabs.mydemoapp.rn");
    });

    it.skip('Should add multiple products to cart and empty cart with different quantity', async () => {
        const product1: ProductDetails = FileUtil.convertJsonToCustomType(productDetailsJson);
        product1.color = product1.availableColors[0];
        product1.quantity = 3;

        const product2: ProductDetails = {
            name: 'Sauce Labs Onesie',
            price: 7.99,
            color: 'RED'
        }
        product2.quantity = 2;

        await homeScreen.clickOnProduct(product1.name);
        await productScreen.validateProductScreen(product1);
        await productScreen.selectColor(product1.color);
        await productScreen.addProductToCart(product1.quantity);
        await driver.back();
        await homeScreen.clickOnProduct(product2.name);
        await productScreen.validateProductScreen(product2);
        await productScreen.selectColor(product2.color);
        await productScreen.addProductToCart(product2.quantity);
        await homeScreen.clickCartIcon();
        await myCartScreen.validateMyCartScreen([product1, product2]);
        await myCartScreen.emptyCart();
        await myCartScreen.validateEmptyCartScreen();
    });

    it.skip('Should sort products', async () => {
        let sortingOrder: string = HomeScreen.sortingOrder.NAME_ASCENDING;

        // Sorting produts by name (Ascending order)
        await homeScreen.sortOrder(sortingOrder);
        await homeScreen.validateProductOrder(sortingOrder);

        // Sorting produts by name (Descending order)
        sortingOrder = HomeScreen.sortingOrder.NAME_DESCENDING;
        await homeScreen.sortOrder(sortingOrder);
        await homeScreen.validateProductOrder(sortingOrder);

        // Sorting produts by price (Ascending order)
        sortingOrder = HomeScreen.sortingOrder.PRICE_ASCENDING;
        await homeScreen.sortOrder(sortingOrder);
        await homeScreen.validateProductOrder(sortingOrder);

        // Sorting produts by price (Descending order)
        sortingOrder = HomeScreen.sortingOrder.PRICE_DESCENDING;
        await homeScreen.sortOrder(sortingOrder);
        await homeScreen.validateProductOrder(sortingOrder);
    });

    it('Should add multiple products to cart', async () => {
        const product1: ProductDetails = FileUtil.convertJsonToCustomType(productDetailsJson);

        const product2: ProductDetails = {
            name: 'Sauce Labs Onesie',
            price: 7.99,
        }

        await homeScreen.clickOnProduct(product1.name);
        await productScreen.validateProductScreen(product1);
        await productScreen.addProductToCart();
        await driver.back();
        await homeScreen.clickOnProduct(product2.name);
        await productScreen.validateProductScreen(product2);
        await productScreen.addProductToCart();
        await homeScreen.clickCartIcon();
        await myCartScreen.validateMyCartScreen([product1, product2]);
        await myCartScreen.emptyCart();
        await myCartScreen.validateEmptyCartScreen();
    });

    it('Should be able to empty cart', async () => {
        const product1: ProductDetails = FileUtil.convertJsonToCustomType(productDetailsJson);

        const product2: ProductDetails = {
            name: 'Sauce Labs Onesie',
            price: 7.99,
        }

        await homeScreen.clickOnProduct(product1.name);
        await productScreen.validateProductScreen(product1);
        await productScreen.addProductToCart();
        await driver.back();
        await homeScreen.clickOnProduct(product2.name);
        await productScreen.validateProductScreen(product2);
        await productScreen.addProductToCart();
        await homeScreen.clickCartIcon();
        await myCartScreen.validateMyCartScreen([product1, product2]);
        await myCartScreen.emptyCart();
        await myCartScreen.validateEmptyCartScreen();
    });

    it('Should be able to add product with quantity greater than 1', async () => {
        let product: ProductDetails = FileUtil.convertJsonToCustomType(productDetailsJson);
        product.quantity = 3;

        await homeScreen.clickOnProduct(product.name);
        await productScreen.validateProductScreen(product);
        await productScreen.addProductToCart(product.quantity);
        await homeScreen.clickCartIcon();
        await myCartScreen.validateMyCartScreen([product]);
        await myCartScreen.emptyCart();
        await myCartScreen.validateEmptyCartScreen();
    });

    it('Should be able to sort products by price', async () => {
        const sortingOrder: string = HomeScreen.sortingOrder.PRICE_DESCENDING;
        const noOfProducts: number = 6;

        await homeScreen.sortOrder(sortingOrder);
        await homeScreen.validateProductOrder(sortingOrder, noOfProducts);
    });

    it('Should be able to place a an order with single product', async () => {
        const product: ProductDetails = FileUtil.convertJsonToCustomType(productDetailsJson);
        const loginDetails: LoginDetails = FileUtil.convertJsonToCustomType(loginDetailsJson);
        const shippingAddressDetails: ShippingAddressDetails = FileUtil.convertJsonToCustomType(shippingAddressDetailsJson);
        const cardDetails: CardDetails = FileUtil.convertJsonToCustomType(cardDetailsJson);

        await homeScreen.clickOnProduct(product.name);
        await productScreen.validateProductScreen(product);
        await productScreen.addProductToCart();
        await homeScreen.clickCartIcon();
        await myCartScreen.validateMyCartScreen([product]);
        await myCartScreen.clickProceedToCheckoutButton();
        await loginScreen.enterUsername(loginDetails.username);
        await loginScreen.enterPassword(loginDetails.password);
        await loginScreen.clickLoginButton();
        await checkoutScreen.enterShippingAddressDetails(shippingAddressDetails);
        await checkoutScreen.clickToPaymentButton();
        await checkoutScreen.enterCardDetails(cardDetails);
        await checkoutScreen.clickReviewOrderButton();
        await checkoutScreen.valiadetCheckoutScreen([product]);
        await checkoutScreen.clickPlaceOrderButton();
        await checkoutScreen.clickContinueShoppingButton();
    });
});