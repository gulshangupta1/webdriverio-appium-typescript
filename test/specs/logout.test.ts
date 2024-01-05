import { FileUtils } from "../../utilities/fileUtils";
import { LoggerHelper } from "../../utilities/reporting/loggerHelper";
import { LoginDetails } from "../resources/customTypes/loginDetails";
import { HomeScreen } from "../screens/homeScreen";
import { LoginScreen } from "../screens/loginScreen";
import * as loginDetailsJson from "./../resources/testdata/loginDetails.json";

let homeScreen: HomeScreen;
let loginScreen: LoginScreen;


const specName: string = 'Logout test scenarios';
describe('Logout test scenarios', () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        homeScreen = new HomeScreen();
        loginScreen = new LoginScreen();
    });

    it('Logout test', async () => {
        const loginDetails: LoginDetails = FileUtils.convertJsonToCustomType(loginDetailsJson);

        await homeScreen.login(loginDetails.username, loginDetails.password);
        await homeScreen.logout();
        await (await loginScreen.getLoginButtonEle()).waitForDisplayed();
    });
});