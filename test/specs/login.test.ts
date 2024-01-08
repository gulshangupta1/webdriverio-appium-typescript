import { HomeScreenUtils } from "../../commpnFunctions/homeScreenUtils";
import { FileUtils } from "../../utilities/fileUtils";
import { LoggerHelper, LOGGER } from "../../utilities/reporting/loggerHelper";
import { LoginDetails } from "../resources/customTypes/loginDetails";
import { HomeScreen } from "../screens/homeScreen";
import * as loginDetailsJson from "./../resources/testdata/loginDetails.json";

let homeScreenUtils: HomeScreenUtils;

const specName = 'Test login scenarios';
describe('Test login scenarios', () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        homeScreenUtils = new HomeScreenUtils();
    });

    it('Login Test', async () => {
        const loginDetails: LoginDetails = FileUtils.convertJsonToCustomType(loginDetailsJson);
        const homeScreen: HomeScreen = new HomeScreen();

        LOGGER.info('Trying to login');
        await homeScreenUtils.login(loginDetails.username, loginDetails.password);
        LOGGER.info('Login successful');
        await (await homeScreen.getProductTextOnHomeScreen()).isDisplayed();
    });
});