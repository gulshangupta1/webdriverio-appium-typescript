import { HamburgerMenuScreen } from "../screens/hamburgerMenuScreen"
import { HomeScreen } from "../screens/homeScreen";
import { LogoutScreen } from "../screens/logoutScreen";
import { LoginScreen } from "../screens/loginScreen";

describe('Logout test scenarios', () => {
    it('Logout test', async () => {
        const username: string = 'bob@example.com';
        const password: string = '10203040';
        const loginScreen = new LoginScreen();
        await loginScreen.login(username, password);

        const logoutScreen = new LogoutScreen();
        await logoutScreen.logout();
    });
});