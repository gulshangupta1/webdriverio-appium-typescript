import { HomeScreen } from "../screens/homeScreen";
import { LoginScreen } from "../screens/loginScreen";

describe('Logout test scenarios', () => {
    it('Logout test', async () => {
        const username: string = 'bob@example.com';
        const password: string = '10203040';
        const homeScreen: HomeScreen = new HomeScreen();
        const loginScreen: LoginScreen = new LoginScreen();

        // Login
        await homeScreen.login(username, password);
        // Logout
        await homeScreen.logout();
        await (await loginScreen.getLoginButtonEle()).waitForDisplayed();
    });
});