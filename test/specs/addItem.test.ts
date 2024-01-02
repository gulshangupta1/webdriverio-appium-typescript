import { CardDetails } from "../resources/cardDetails";
import { ShippingAddressDetails } from "../resources/shippingAddressDetails";
import { CheckoutScreen } from "../screens/checkoutScreen";
import { HomeScreen } from "../screens/homeScreen";
import { MyCartScreen } from "../screens/myCartScreen";

const homeScreen = new HomeScreen();
const myCartScreen = new MyCartScreen();
const checkoutScreen = new CheckoutScreen();

describe('Add item to cart', () => {
    it('Add first item to cart', async () => {
        const username: string = 'bob@example.com';
        const password: string = '10203040';
        const shippingAddressDetails: ShippingAddressDetails = {
            fullName: 'Rebecca Winter',
            addressLine1: 'Mandorley 112',
            addressLine2: 'Entrance 1',
            cityName: 'Truro',
            stateName: 'Cornwall',
            zipCode: 89750,
            countryName: 'United Kingdom'
        };
        const cardDetails: CardDetails = {
            fullName: 'Rebecca Winter',
            cardNumber: '325812657568789',
            expirationDate: '0325',
            securityCode: 123
        }

        await homeScreen.login(username, password);
        await homeScreen.tapOnFirstItem();
        await homeScreen.clickAddToCartButton();
        await homeScreen.clickCartIcon();
        await myCartScreen.clickProceedToCheckoutButton();
        await checkoutScreen.enterShippingAddressDetails(shippingAddressDetails);
        await checkoutScreen.clickToPaymentButton();
        await checkoutScreen.entercardDetails(cardDetails);
        await checkoutScreen.clickReviewOrderButton();
        await checkoutScreen.clickPlaceOrderButton();
        await checkoutScreen.clickContinueShoppingButton();
    });
});