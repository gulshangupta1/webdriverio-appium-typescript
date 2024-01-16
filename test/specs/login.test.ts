import { HomeScreenUtil } from "../commonFunctions/homeScreenUtil";
import { FileUtil } from "../../utilities/fileUtil";
import { LoggerHelper, LOGGER } from "../../utilities/reporting/loggerHelper";
import { LoginDetails } from "../resources/customTypes/loginDetails";
import { HomeScreen } from "../screens/homeScreen";
import * as loginDetailsJson from "./../resources/testdata/loginDetails.json";

let homeScreenUtils: HomeScreenUtil;

const specName = 'Test login scenarios';
describe('Test login scenarios', () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        homeScreenUtils = new HomeScreenUtil();
    });

    it('Login Test', async () => {
        const loginDetails: LoginDetails = FileUtil.convertJsonToCustomType(loginDetailsJson);
        const homeScreen: HomeScreen = new HomeScreen();

        await homeScreenUtils.login(loginDetails.username, loginDetails.password);
        await (await homeScreen.getProductTextOnHomeScreen()).isDisplayed();
    });
});