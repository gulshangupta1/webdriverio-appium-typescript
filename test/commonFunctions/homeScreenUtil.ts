import { HamburgerMenuScreen } from "../screens/hamburgerMenuScreen";
import { HomeScreen } from "../screens/homeScreen";
import { LoginScreen } from "../screens/loginScreen";
import { LogoutScreen } from "../screens/logoutScreen";
import { BaseActions } from "../../utilities/baseActions";
import { LOGGER } from "../../utilities/reporting/loggerHelper";

export class HomeScreenUtil extends BaseActions {
    homeScreen: HomeScreen;
    loginScreen: LoginScreen;
    hamburgerMenuScreen: HamburgerMenuScreen;
    logoutScreen: LogoutScreen;

    constructor() {
        super();
        this.homeScreen = new HomeScreen();
        this.loginScreen = new LoginScreen();
        this.hamburgerMenuScreen = new HamburgerMenuScreen();
        this.logoutScreen = new LogoutScreen();
    }

    async login(username: string, password: string) {
        LOGGER.info(`Trying to login with user: ${username}`);
        try {
            await this.homeScreen.clickHamburgerMenuButton();
            await this.hamburgerMenuScreen.clickMenuItemLogin();
            await this.loginScreen.enterUsername(username);
            await this.loginScreen.enterPassword(password);
            await this.loginScreen.clickLoginButton();
            LOGGER.info('Login successfull');
        } catch (err) {
            LOGGER.error(`Error while login with user: ${username}`);
            throw err;
        }
    }

    async logout() {
        LOGGER.info('Tyring to logout');
        try {
            await this.homeScreen.clickHamburgerMenuButton();
            await this.hamburgerMenuScreen.clickMenuItemLogout();
            await this.logoutScreen.clickLogoutButton();
            await this.logoutScreen.clickOkButton();
            LOGGER.info('User logged out');
        } catch (errr) {
            LOGGER.error('Error while trying to log out.');
            throw errr;
        }
    }
}