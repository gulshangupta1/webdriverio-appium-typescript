import { HomeScreen } from "../screens/homeScreen";

describe('Test login scenarios', () => {
    it('Login Test', async () => {
        const homeScreen: HomeScreen = new HomeScreen();
        const username: string = 'bob@example.com';
        const password: string = '10203040';

        await homeScreen.login(username, password);
        await (await homeScreen.getProductTextOnHomeScreen()).isDisplayed();
    });
});