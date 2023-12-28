import { HamburgerMenuScreen } from "./hamburgerMenuScreen";
import { HomeScreen } from "./homeScreen";

export class LoginScreen {
    homeScreen: HomeScreen;
    hamburgerMenuScreen: HamburgerMenuScreen;

    constructor() {
        this.homeScreen = new HomeScreen();
        this.hamburgerMenuScreen = new HamburgerMenuScreen();
    }

    private locators = {
        userNameInputField: '~Username input field',
        passwordInputField: '~Password input field',
        loginButton: '~Login button',
    }

    public async getUserNameInputFieldEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.userNameInputField);
    }

    public async getPasswordInputFieldEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.passwordInputField);
    }

    public async getLoginButtonEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.loginButton);
    }

    public async login(username: string, password: string) {
        console.log('Trying to login');
        await (await this.homeScreen.getHamburgerMenuIconEle()).click();
        const menuItemLoginEle = await this.hamburgerMenuScreen.getMenuItemLoginEle();
        await menuItemLoginEle.waitForDisplayed();
        await menuItemLoginEle.click();
        const userNameInputFieldEle = await $(this.locators.userNameInputField);
        await userNameInputFieldEle.waitForDisplayed();
        await userNameInputFieldEle.setValue(username);
        const passwordInputFieldEle = await $(this.locators.passwordInputField);
        await passwordInputFieldEle.waitForDisplayed();
        await passwordInputFieldEle.setValue(password);
        await driver.hideKeyboard();
        const loginButtonEle = await $(this.locators.loginButton);
        await loginButtonEle.click();

        await (await this.homeScreen.getProductTextOnHomeScreenEle()).waitForDisplayed();
        console.log('Login successfully');
    }
}