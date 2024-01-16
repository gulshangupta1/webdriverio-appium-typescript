import { BaseActions } from "../../utilities/actions/baseActions";


const platform = process.env.PLATFORM;

export class LoginScreen extends BaseActions {
    private locators = {
        userNameInputField: platform === 'ANDROID' ?
            '~Username input field' :
            "",
        passwordInputField: platform === 'ANDROID' ?
            '~Password input field' :
            "",
        loginButton: platform === 'ANDROID' ?
            '~Login button' :
            ""
    };

    async getLoginButtonEle() {
        return await $(this.locators.loginButton);
    }

    async enterUsername(userName: string) {
        const userNameInputFieldEle = await $(this.locators.userNameInputField);
        await userNameInputFieldEle.waitForDisplayed();
        await userNameInputFieldEle.setValue(userName);
    }

    async enterPassword(password: string) {
        const passwordInputFieldEle = await $(this.locators.passwordInputField);
        await passwordInputFieldEle.waitForDisplayed();
        await passwordInputFieldEle.setValue(password);
    }

    async clickLoginButton() {
        const loginButtonEle = await $(this.locators.loginButton);
        await loginButtonEle.waitForDisplayed();
        await loginButtonEle.click();
    }
}