export class LoginPage {
    private locators = {
        hamburgerMenuIcon: '~open menu',
        menuItemLogin: '~menu item log in',
        userNameInputField: '~Username input field',
        passwordInputField: '~Password input field',
        loginButton: '~Login button',
        productTextOnHomeScreen: "//android.widget.TextView[@text='Products']"
    }

    public async getHamburgerMenuIconEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.hamburgerMenuIcon);
    }

    public async getMenuItemLoginEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.menuItemLogin);
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

    public async getProductTextOnHomeScreenEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.productTextOnHomeScreen);
    }

    public async login(username: string, password: string) {
        console.log('Trying to login');
        const hamburgerMenuIconEle = await $(this.locators.hamburgerMenuIcon);
        await hamburgerMenuIconEle.click();
        const menuItemLoginEle = await $(this.locators.menuItemLogin);
        await menuItemLoginEle.waitForDisplayed();
        await menuItemLoginEle.click();
        const userNameInputFieldEle = await $(this.locators.userNameInputField);
        await userNameInputFieldEle.waitForDisplayed();
        await userNameInputFieldEle.setValue(username);
        const passwordInputFieldEle = await $(this.locators.passwordInputField);
        await passwordInputFieldEle.waitForDisplayed();
        await passwordInputFieldEle.setValue(password);
        const loginButtonEle = await $(this.locators.loginButton);
        await loginButtonEle.click();
        await driver.pause(3000);
        const productTextOnHomeScreenEle = await $(this.locators.productTextOnHomeScreen);
        await productTextOnHomeScreenEle.isDisplayed();
        console.log('Login successfully');
    }
}