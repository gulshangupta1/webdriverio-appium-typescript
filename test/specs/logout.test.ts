import { FileUtils } from "../../utilities/fileUtils";
import { LoginDetails } from "../resources/customTypes/loginDetails";
import { HomeScreen } from "../screens/homeScreen";
import { LoginScreen } from "../screens/loginScreen";
import * as loginDetailsJson from "./../resources/testdata/loginDetails.json";

describe('Logout test scenarios', () => {
    it('Logout test', async () => {
        const loginDetails: LoginDetails = FileUtils.convertJsonToCustomType(loginDetailsJson);

        const homeScreen: HomeScreen = new HomeScreen();
        const loginScreen: LoginScreen = new LoginScreen();

        // Login
        await homeScreen.login(loginDetails.username, loginDetails.password);
        // Logout
        await homeScreen.logout();
        await (await loginScreen.getLoginButtonEle()).waitForDisplayed();
    });
});