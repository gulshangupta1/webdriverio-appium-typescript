import { CheckoutScreen } from "../screens/checkoutScreen";
import { HomeScreen } from "../screens/homeScreen";
import { LoginScreen } from "../screens/loginScreen";
import { MyCartScreen } from "../screens/myCartScreen";

describe('Add item to cart', () => {
    it('Add first item to cart', async () => {
        const username: string = 'bob@example.com';
        const password: string = '10203040';
        const fullName: string = 'Rebecca Winter';
        const addressLine1: string = 'Mandorley 112';
        const addressLine2: string = 'Entrance 1';
        const cityName: string = 'Truro';
        const stateName: string = 'Cornwall';
        const zipCode: string = '89750';
        const countryName: string = 'United Kingdom';
        const cardNumber: string = '325812657568789';
        const expirationDate: string = '0325';
        const securityCode: string = '123';


        const homeScreen = new HomeScreen();
        const myCartScreen = new MyCartScreen();
        const checkoutScreen = new CheckoutScreen();

        await homeScreen.login(username, password);
        // await homeScreen.clickFirstItem();
        await homeScreen.tapOnFirstItem();
        await homeScreen.clickAddToCartButton();
        await homeScreen.clickCartIcon();
        await myCartScreen.clickProceedToCheckoutButton();
        await checkoutScreen.enterShippingAddressDetails(fullName, addressLine1, addressLine2, cityName, stateName, zipCode, countryName);
        await checkoutScreen.clickToPaymentButton();
        await checkoutScreen.entercartDetails(fullName, cardNumber, expirationDate, securityCode);
        await checkoutScreen.clickReviewOrderButton();
        await checkoutScreen.clickPlaceOrderButton();
        await checkoutScreen.clickContinueShoppingButton();
    });
});