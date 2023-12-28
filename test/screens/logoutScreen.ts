import { HamburgerMenuScreen } from "./hamburgerMenuScreen";
import { HomeScreen } from "./homeScreen";
import { LoginScreen } from "./loginScreen";

export class LogoutScreen {
    homeScreen: HomeScreen;
    hamburgerMenuScreen: HamburgerMenuScreen;
    loginScreen: LoginScreen;

    constructor() {
        this.homeScreen = new HomeScreen();
        this.hamburgerMenuScreen = new HamburgerMenuScreen();
        this.loginScreen = new LoginScreen();
    }

    private locators = {
        logOutButton: "//android.widget.Button[@text='LOG OUT']",
        logOutOkButton: "//android.widget.Button[@text='OK']"
    }

    public async getLogOutButtonEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.logOutButton);
    }

    public async getLogOutOkButtonEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.logOutOkButton);
    }

    public async logout(): Promise<void> {
        await (await this.homeScreen.getHamburgerMenuIconEle()).click();
        await (await this.hamburgerMenuScreen.getMenuItemLogOutEle()).click();
        await (await this.getLogOutButtonEle()).waitForDisplayed();
        await (await this.getLogOutButtonEle()).click();
        await (await this.getLogOutOkButtonEle()).waitForDisplayed();
        await (await this.getLogOutOkButtonEle()).click();
        await (await this.loginScreen.getLoginButtonEle()).waitForDisplayed();
    }
}